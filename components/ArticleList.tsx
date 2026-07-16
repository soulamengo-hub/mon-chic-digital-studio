'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type ImageRow = { public_url: string; sort_order: number };
type Product = {
  id: string;
  sku: string;
  brand?: string;
  category?: string;
  subcategory?: string;
  size?: string;
  original_size?: string;
  status?: string;
  sale_price?: number | null;
  occasions?: string[];
  created_at: string;
  product_images?: ImageRow[];
};

export default function ArticleList({ inventoryMode = false }: { inventoryMode?: boolean }) {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Alle');
  const [category, setCategory] = useState('Alle');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/products?ts=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) throw new Error(await response.text());
      const data = (await response.json()) as Product[];
      setItems(Array.isArray(data) ? data : []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unbekannter Ladefehler');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void load(); }, [load]);

  const categories = useMemo(
    () => Array.from(new Set(items.map(item => item.category).filter(Boolean) as string[])).sort(),
    [items],
  );
  const statuses = useMemo(
    () => Array.from(new Set(items.map(item => item.status || 'Entwurf'))).sort(),
    [items],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('de');
    return items.filter(item => {
      const haystack = [item.sku, item.brand, item.category, item.subcategory, ...(item.occasions || [])]
        .filter(Boolean).join(' ').toLocaleLowerCase('de');
      return (!normalized || haystack.includes(normalized))
        && (status === 'Alle' || (item.status || 'Entwurf') === status)
        && (category === 'Alle' || item.category === category);
    });
  }, [items, query, status, category]);

  if (loading) return <section className="panel empty-state"><h2>Artikel werden geladen …</h2><p>Verbindung zu Supabase wird geprüft.</p></section>;
  if (error) return <section className="panel empty-state"><h2>Artikel konnten nicht geladen werden</h2><p>{error}</p><button className="primary-button centered-button" onClick={() => void load()}>Erneut laden</button></section>;

  return <>
    <section className="catalog-toolbar panel">
      <div className="catalog-summary"><strong>{items.length}</strong><span>{inventoryMode ? 'Artikel im Gesamtlager' : 'gespeicherte Artikel'}</span></div>
      <input aria-label="Artikel suchen" value={query} onChange={event => setQuery(event.target.value)} placeholder="SKU, Marke, Kategorie oder Anlass suchen" />
      <select aria-label="Status filtern" value={status} onChange={event => setStatus(event.target.value)}><option>Alle</option>{statuses.map(value => <option key={value}>{value}</option>)}</select>
      <select aria-label="Kategorie filtern" value={category} onChange={event => setCategory(event.target.value)}><option>Alle</option>{categories.map(value => <option key={value}>{value}</option>)}</select>
      <button className="secondary-button refresh-button" type="button" onClick={() => void load()}>Aktualisieren</button>
    </section>

    {filtered.length === 0 ? <section className="panel empty-state"><h2>Keine passenden Artikel</h2><p>{items.length ? 'Bitte Suchbegriff oder Filter ändern.' : 'In dieser Supabase-Datenbank wurden noch keine Artikel gefunden.'}</p></section> :
      <section className="article-list-grid">{filtered.map(item => {
        const image = [...(item.product_images || [])].sort((a, b) => a.sort_order - b.sort_order)[0];
        const size = item.original_size || item.size;
        return <article className="inventory-card" key={item.id}>
          {image ? <img src={image.public_url} alt={`${item.brand || ''} ${item.subcategory || item.category || 'Artikel'}`} /> : <div className="inventory-placeholder">MON CHIC</div>}
          <div className="inventory-card-body">
            <span className="inventory-sku">{item.sku}</span>
            <h2>{[item.brand, item.subcategory || item.category].filter(Boolean).join(' · ') || 'Artikel ohne Bezeichnung'}</h2>
            <p className="inventory-meta">{[item.category, size ? `Größe ${size}` : null].filter(Boolean).join(' · ') || 'Noch nicht vollständig klassifiziert'}</p>
            <p>{item.occasions?.slice(0, 3).join(' · ') || 'Keine Anlässe ausgewählt'}</p>
            <footer><strong>{item.sale_price != null ? `${Number(item.sale_price).toFixed(2).replace('.', ',')} €` : 'Preis offen'}</strong><span className="status-pill">{item.status || 'Entwurf'}</span></footer>
          </div>
        </article>;
      })}</section>}
  </>;
}

'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Nav } from '../components/Nav';
import type { Product, Expense } from '../lib/types';
import { eur } from '../lib/format';
import { getStats } from '../lib/analytics';

const aiTools = [
  ['◫', 'Artikel analysieren', '/product-capture'],
  ['▤', 'Beschreibung erstellen', '/content-studio'],
  ['◎', 'SEO optimieren', '/content-studio'],
  ['⌘', 'Übersetzen', '/content-studio'],
  ['♧', 'Preisvorschlag', '/trend-hunter'],
] as const;

const tasks = [
  ['Neue Kollektion fotografieren', 'Heute'],
  ['Artikel #1002 Beschreibung', 'Heute'],
  ['Lagerbestand überprüfen', 'Morgen'],
  ['Monatsabschluss erstellen', '30. Mai'],
  ['Rechnungen prüfen', '31. Mai'],
] as const;

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [error, setError] = useState('');

  async function load() {
    setError('');
    try {
      const [productsResponse, expensesResponse] = await Promise.all([
        fetch('/api/products', { cache: 'no-store' }),
        fetch('/api/expenses', { cache: 'no-store' }),
      ]);
      const productsData = await productsResponse.json();
      const expensesData = await expensesResponse.json();
      if (!productsResponse.ok) throw new Error(productsData.error || 'Artikel konnten nicht geladen werden.');
      if (!expensesResponse.ok) throw new Error(expensesData.error || 'Ausgaben konnten nicht geladen werden.');
      setProducts(productsData.products || []);
      setExpenses(expensesData.expenses || []);
    } catch (err: any) {
      setError(err.message || 'Daten konnten nicht geladen werden.');
    }
  }

  useEffect(() => { load(); }, []);
  const stats = useMemo(() => getStats(products, expenses), [products, expenses]);
  const recentProducts = products.slice(0, 5);

  return (
    <>
      <Nav />
      <main className="app-main dashboard-layout">
        <div className="dashboard-center">
          <section className="welcome-card">
            <div className="welcome-row">
              <div>
                <div className="welcome-title"><span>⚜</span><div><h1>Willkommen zurück, Mon Chic</h1><p>Hier ist Ihr aktueller Überblick.</p></div></div>
              </div>
              <button className="date-button">▣ <span>Heute</span>⌄</button>
            </div>

            <div className="kpi-grid">
              <div className="kpi-card"><div className="kpi-icon">♧</div><div><strong>{products.length}</strong><span>Artikel</span><small>+{Math.min(products.length, 12)} neu</small></div></div>
              <div className="kpi-card"><div className="kpi-icon">◇</div><div><strong>{stats.active}</strong><span>Im Lager</span><small>{Math.max(0, products.length - stats.active)} niedrig</small></div></div>
              <div className="kpi-card"><div className="kpi-icon">€</div><div><strong>{eur(stats.revenue)}</strong><span>Umsatz (Heute)</span><small>+18,5%</small></div></div>
              <div className="kpi-card"><div className="kpi-icon">↗</div><div><strong>{eur(stats.netProfit)}</strong><span>Gewinn (Heute)</span><small>+21,3%</small></div></div>
            </div>
          </section>

          {error && <section className="panel-card error-card">Fehler: {error}</section>}

          <section className="products-section panel-card">
            <div className="section-title-row"><h2>Kürzlich hinzugefügte Artikel</h2><Link href="/products">Alle anzeigen</Link></div>
            <div className="product-showcase-grid">
              {recentProducts.length === 0 ? (
                <div className="empty-products"><p>Noch keine Artikel vorhanden.</p><Link href="/products/new" className="primary-button">Ersten Artikel erfassen</Link></div>
              ) : recentProducts.map((product, index) => (
                <article key={product.id || product.sku} className="showcase-card">
                  <div className={`product-visual product-visual-${index + 1}`}><span>{product.category || 'Vintage Piece'}</span><button>•••</button></div>
                  <div className="showcase-body">
                    <h3>{product.brand || 'MON CHIC'} {product.category || 'Artikel'}</h3>
                    <p>{product.size ? `Gr. ${product.size}` : 'Größe offen'} · {product.color || 'Farbe offen'}</p>
                    <strong>{product.sale_price ? eur(product.sale_price) : 'Preis offen'}</strong>
                    <div className="showcase-meta"><span>ID: {product.sku || '–'}</span><span className="active-status">● Aktiv</span></div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="ai-banner panel-card">
            <div className="ai-banner-copy"><div className="ai-banner-icon">✦</div><div><h2>AI Studio</h2><p>Nutzen Sie die Kraft der KI, um Artikel gezielt zu analysieren und Texte auf Knopfdruck zu erstellen.</p></div></div>
            <Link href="/ai-studio" className="primary-button"><span>✦</span> AI Studio öffnen</Link>
          </section>
        </div>

        <aside className="dashboard-right">
          <section className="right-panel panel-card">
            <h2>AI Studio – Schnellzugriff</h2>
            <div className="tool-list">
              {aiTools.map(([icon, label, href]) => <Link key={label} href={href}><span className="tool-icon">{icon}</span><span>{label}</span><b>›</b></Link>)}
            </div>
            <Link href="/ai-studio" className="panel-footer-link">Alle AI Tools anzeigen</Link>
          </section>

          <section className="right-panel panel-card">
            <h2>Aufgaben</h2>
            <div className="task-list">
              {tasks.map(([label, due]) => <div key={label}><span className="task-check">✓</span><span>{label}</span><b>{due}</b></div>)}
            </div>
            <Link href="/business" className="panel-footer-link">Alle Aufgaben anzeigen</Link>
          </section>
        </aside>
      </main>
    </>
  );
}

import AppShell from '@/components/AppShell';
import ArticleList from '@/components/ArticleList';

export default function InventoryPage() {
  return <AppShell>
    <div className="page-header"><div><p className="eyebrow">LAGER</p><h1>Lagerbestand</h1><p>Alle in Supabase gespeicherten Artikel mit Status, Preis, Kategorie und Produktfoto.</p></div></div>
    <ArticleList inventoryMode />
  </AppShell>;
}

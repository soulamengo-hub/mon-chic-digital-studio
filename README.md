# MON CHIC PARIS · Digital Studio 6.3.2

Produktionsfähige Next.js-Anwendung mit CI-Navy `#061B49`, automatischer SKU nach Unterkategorie, Artikelbearbeitung, Lagerimport, Verkaufsbuchung und finalem MON CHIC PARIS DIGITAL STUDIO Logo.

## Enthalten
- SKU-Schema `MCP-KL-12345` auf Basis der Unterkategorie
- zentrale Supabase-Sequenz gegen doppelte laufende Nummern
- Artikel öffnen, bearbeiten und löschen
- öffentliche Produkttexte und interne Notizen getrennt
- Lagerort, Regal und Fach jederzeit änderbar
- Lagerhistorie und Inventurdatum
- Excel-/CSV-Import bis 1.000 Zeilen
- Sales-Modul mit Status „Verkauft“
- finales Logo unter `public/mon-chic-logo.png`
- Master-Logo unter `public/mon-chic-logo-master.png`

## Vor Deployment
1. `supabase/migration_6_3.sql`
2. `supabase/migration_6_3_1_storage_history.sql`

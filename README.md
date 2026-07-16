# MON CHIC PARIS · Digital Studio 6.0

Produktionsfähige Next.js-Anwendung für Smartphone-Fotoaufnahme, Artikel-DNA und Supabase-Workflows.

## Neu in 6.0

- automatische Artikelnummer bei jeder neuen Erfassung
- Hauptkategorien mit passenden Unterkategorien
- Designer-Vorschlagsliste mit weiterhin freier Eingabe
- echte Artikelliste aus Supabase mit Foto, Status, Preis und Anlässen
- CI-Blau näher am MON-CHIC-Logo (`#2B286F`)
- direkter Upload von bis zu 9 Fotos zu Supabase Storage

## Start

```bash
npm ci
cp .env.example .env.local
npm run dev
```

## Vercel

- Preset: `Next.js`
- Root Directory: `./`
- Variablen: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Die bestehende Supabase-Datenbank aus Version 5.1.2 benötigt für 6.0 keine neue Migration.

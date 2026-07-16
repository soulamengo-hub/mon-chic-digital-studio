# Verifizierungsbericht – Version 6.0.0

Prüfdatum: 2026-07-15

Tatsächlich ausgeführt:

- `npm ci --no-audit --no-fund`: erfolgreich
- `npm run typecheck`: erfolgreich
- `npm run build`: erfolgreich
- Next.js 16.2.10: 15 Seiten/API-Routen erfolgreich erzeugt

Zusätzlich geprüft:

- keine nummerierten `page (x).tsx`- oder `route (x).ts`-Dateien
- kein `node_modules`, `.next` oder `tsconfig.tsbuildinfo` im Release
- direkter Browser-Upload zu Supabase bleibt erhalten
- Artikel-GET-API und reale Artikelliste enthalten
- automatische Artikelnummer und abhängige Unterkategorien enthalten

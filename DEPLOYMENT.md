# Deployment – MON CHIC PARIS · Digital Studio 6.0

1. ZIP entpacken und den Inhalt in das bestehende GitHub-Repository laden.
2. Direkt im Root müssen `app`, `components`, `lib`, `public`, `supabase`, `package.json` und `package-lock.json` liegen.
3. Commit: `Release 6.0 - automatic SKU, catalog and live article list`.
4. Vercel deployt den neuen Commit automatisch.
5. Environment Variables unverändert lassen.
6. Nach dem Deployment prüfen: `/`, `/articles`, `/articles/new`, `/api/health`.
7. Einen Artikel mit 2–3 Fotos speichern und anschließend in der Artikelliste kontrollieren.

Für eine bereits funktionierende Datenbank aus 5.1.2 ist keine neue SQL-Migration nötig.

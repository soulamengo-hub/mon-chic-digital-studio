# Deployment – MON CHIC PARIS · Digital Studio 6.3.2

1. In Supabase zuerst `supabase/migration_6_3.sql` ausführen, falls noch nicht geschehen.
2. Danach `supabase/migration_6_3_1_storage_history.sql` vollständig ausführen.
3. ZIP entpacken und den Inhalt in das saubere GitHub-Repository laden.
4. Commit: `Release 6.3.2 - final logo and stable article management`.
5. Vercel deployt automatisch.
6. `/api/health` muss Version `6.3.2` anzeigen.
7. Artikel öffnen, bearbeiten, Lagerort ändern und speichern.

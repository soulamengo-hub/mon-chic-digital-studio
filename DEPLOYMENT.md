# Deployment – MON CHIC PARIS · Digital Studio 6.1

1. ZIP entpacken und den Inhalt in das bestehende GitHub-Repository laden.
2. Commit: `Release 6.1 - camera workflow, AI analysis and digital showcase`.
3. Vercel deployt den Commit automatisch.
4. Bestehende Supabase-Variablen unverändert lassen.
5. Für die optionale KI in Vercel zusätzlich `OPENAI_API_KEY` setzen.
6. Optional `OPENAI_MODEL` setzen; ohne Angabe verwendet die App `gpt-4.1-mini`.
7. Keine neue SQL-Migration notwendig.

## Prüfung nach Deployment

- `/`
- `/articles`
- `/articles/new`
- `/showcase`
- `/api/health`
- Kamera mehrmals nacheinander öffnen und 2–3 Fotos ergänzen
- Mehrfachauswahl aus der Mediathek testen
- Artikel mit Status `Aktiv` speichern und im Schaufenster prüfen
- KI erst nach Einrichtung des API-Keys testen

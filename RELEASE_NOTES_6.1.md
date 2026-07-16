# MON CHIC PARIS · Digital Studio 6.1

## Kamera & Fotos

- eigener Kamera-Button für das iPhone
- nach jeder Aufnahme kann direkt ein weiteres Foto ergänzt werden
- separate Mehrfachauswahl aus der Mediathek
- weiterhin direkter Upload zu Supabase Storage

## KI-Assistent

- bewusste, kostenpflichtige Aktion per Button
- Analyse des ersten Fotos in komprimierter Form
- strukturierte Vorschläge für die Artikel-DNA
- keine automatische Echtheitsbestätigung
- funktioniert nur, wenn `OPENAI_API_KEY` in Vercel gesetzt ist

## Digitales Schaufenster

- neue Route `/showcase`
- verwendet dieselben Produkt- und Bilddaten aus Supabase
- zeigt ausschließlich Artikel mit Status `Aktiv`

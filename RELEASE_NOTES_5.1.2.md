# MON CHIC PARIS · Digital Studio 5.1.2

## Direkter Foto-Upload

- Fotos werden direkt vom Browser bzw. iPhone zu Supabase Storage übertragen.
- Die Vercel Function liegt nicht mehr im Übertragungsweg; dadurch entfällt `FUNCTION_PAYLOAD_TOO_LARGE` für Mehrfachuploads.
- Bis zu 9 Fotos pro Artikel.
- Maximal 8 MB pro Foto entsprechend dem Supabase-Bucket-Limit.
- Unterstützt: JPG, PNG, WEBP, HEIC und HEIF.
- Reihenfolge und Bildmetadaten werden weiterhin in `product_images` gespeichert.

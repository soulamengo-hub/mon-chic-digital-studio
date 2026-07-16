import { NextResponse } from 'next/server';
import { getSupabaseConfig, supabaseHeaders } from '@/lib/supabase';
import type { ProductInput } from '@/lib/types';


export async function GET() {
  try {
    const { url } = getSupabaseConfig();
    const response = await fetch(`${url}/rest/v1/products?select=*,product_images(public_url,sort_order)&order=created_at.desc&limit=100`, {
      headers: supabaseHeaders(), cache: 'no-store',
    });
    const text = await response.text();
    if (!response.ok) return new NextResponse(text, { status: response.status });
    return new NextResponse(text, { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unbekannter Fehler' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ProductInput;
    if (!body.sku?.trim()) return NextResponse.json({ error: 'SKU ist erforderlich.' }, { status: 400 });
    const { url } = getSupabaseConfig();
    const response = await fetch(`${url}/rest/v1/products`, {
      method: 'POST',
      headers: supabaseHeaders({ 'Content-Type': 'application/json', Prefer: 'return=representation' }),
      body: JSON.stringify({ ...body, sku: body.sku.trim(), updated_at: new Date().toISOString() }),
      cache: 'no-store',
    });
    const text = await response.text();
    if (!response.ok) return new NextResponse(text, { status: response.status });
    const rows = JSON.parse(text) as Array<Record<string, unknown>>;
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unbekannter Fehler' }, { status: 500 });
  }
}

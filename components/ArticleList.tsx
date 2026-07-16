'use client';
import { useEffect, useState } from 'react';

type ImageRow={public_url:string;sort_order:number};
type Product={id:string;sku:string;brand?:string;category?:string;subcategory?:string;status?:string;sale_price?:number;occasions?:string[];created_at:string;product_images?:ImageRow[]};

export default function ArticleList(){
  const [items,setItems]=useState<Product[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState('');
  useEffect(()=>{fetch('/api/products').then(async r=>{if(!r.ok) throw new Error(await r.text()); return r.json()}).then(setItems).catch(e=>setError(e.message)).finally(()=>setLoading(false))},[]);
  if(loading) return <section className="panel empty-state"><h2>Artikel werden geladen …</h2></section>;
  if(error) return <section className="panel empty-state"><h2>Artikel konnten nicht geladen werden</h2><p>{error}</p></section>;
  if(!items.length) return <section className="panel empty-state"><h2>Bereit für den ersten Artikel</h2><p>Nach dem Speichern erscheint der Artikel hier.</p></section>;
  return <section className="article-list-grid">{items.map(item=>{const image=[...(item.product_images||[])].sort((a,b)=>a.sort_order-b.sort_order)[0];return <article className="inventory-card" key={item.id}>{image?<img src={image.public_url} alt={`${item.brand||''} ${item.subcategory||item.category||'Artikel'}`}/>:<div className="inventory-placeholder">MON CHIC</div>}<div className="inventory-card-body"><span className="inventory-sku">{item.sku}</span><h2>{[item.brand,item.subcategory||item.category].filter(Boolean).join(' · ')||'Artikel'}</h2><p>{item.occasions?.slice(0,3).join(' · ')||'Keine Anlässe'}</p><footer><strong>{item.sale_price!=null?`${Number(item.sale_price).toFixed(2).replace('.',',')} €`:'Preis offen'}</strong><span className="status-pill">{item.status||'Entwurf'}</span></footer></div></article>})}</section>
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { wixClient } from "../../../lib/wixClient";
import { useCart, fmt } from "../../../components/store";

const sized = (u, s = 900) => (u ? u.replace(/\/w_\d+,h_\d+,/, `/w_${s},h_${s},`) : u);

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState({});
  const [acc, setAcc] = useState("desc");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await wixClient.products.queryProducts().eq("slug", decodeURIComponent(slug)).find();
        const prod = res.items?.[0] || null;
        setP(prod);
        if (prod?.productOptions?.length) {
          setSel(prod.productOptions.reduce((s, o) => ({ ...s, [o.name]: o.choices?.[0]?.description }), {}));
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    })();
  }, [slug]);

  if (loading) return <main className="container pdp"><p className="empty">Cargando…</p></main>;
  if (!p) return <main className="container pdp"><p className="empty">Producto no encontrado. <Link href="/" className="it">Volver</Link></p></main>;

  const gallery = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const price = p.price?.price, disc = p.price?.discountedPrice;
  const hasDisc = disc != null && disc < price;

  async function handleAdd() { await addToCart(p, Object.keys(sel).length ? sel : null); setAdded(true); setTimeout(() => setAdded(false), 1600); }

  return (
    <main className="container pdp">
      <Link href="/" className="pdp__back">← Volver a la tienda</Link>
      <div className="pdp__grid">
        <div className="pdp__gallery">
          <div className="pdp__main">
            {gallery[active] ? <img src={sized(gallery[active])} alt={p.name} /> : <div className="card__ph">BS</div>}
            {hasDisc && <span className="ribbon">Oferta</span>}
          </div>
          {gallery.length > 1 && (
            <div className="pdp__thumbs">
              {gallery.map((g, i) => (
                <button key={i} className={`pdp__thumb ${i === active ? "on" : ""}`} onClick={() => setActive(i)}>
                  <img src={sized(g, 200)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp__info">
          <h1>{p.name}</h1>
          <div className="price pdp__price">
            <span className="now">{fmt(hasDisc ? disc : price)}</span>
            {hasDisc && <span className="was">{fmt(price)}</span>}
          </div>

          {(p.productOptions || []).map((o) => (
            <div className="pdp__opt" key={o.name}>
              <label>{o.name}</label>
              <div className="pdp__choices">
                {o.choices.map((c) => (
                  <button key={c.description} className={`pdp__choice ${sel[o.name] === c.description ? "on" : ""}`}
                    onClick={() => setSel((s) => ({ ...s, [o.name]: c.description }))}>{c.description}</button>
                ))}
              </div>
            </div>
          ))}

          <button className="pdp__add" onClick={handleAdd}>{added ? "Añadido ✓" : "Añadir a la cesta"}</button>

          <div className="pdp__acc">
            {[
              { k: "desc", t: "Descripción", c: <div dangerouslySetInnerHTML={{ __html: p.description || "" }} /> },
              { k: "envio", t: "Envío y entregas", c: <p>Envío a toda España peninsular. Plazo estimado de entrega: 7 a 14 días hábiles. Recibirás el número de seguimiento por email en cuanto tu pedido salga.</p> },
              { k: "dev", t: "Cambios y devoluciones", c: <p>Dispones de 14 días naturales desde la recepción para solicitar una devolución. Escríbenos y te indicamos el proceso. El producto debe estar sin usar y en su embalaje original.</p> },
            ].map((row) => (
              <div className="pdp__row" key={row.k}>
                <button className="pdp__rowh" onClick={() => setAcc(acc === row.k ? "" : row.k)}>
                  {row.t}<span>{acc === row.k ? "−" : "+"}</span>
                </button>
                {acc === row.k && <div className="pdp__rowc">{row.c}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

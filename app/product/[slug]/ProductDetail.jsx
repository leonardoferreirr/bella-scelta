"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart, fmt } from "../../../components/store";
import { SITE } from "../../../lib/site";

const sized = (u, s = 900) => (u ? u.replace(/\/w_\d+,h_\d+,/, `/w_${s},h_${s},`) : u);

export default function ProductDetail({ product: p }) {
  const { addToCart } = useCart();
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState(() =>
    p.productOptions?.length
      ? p.productOptions.reduce((s, o) => ({ ...s, [o.name]: o.choices?.[0]?.description }), {})
      : {}
  );
  const [acc, setAcc] = useState("desc");
  const [added, setAdded] = useState(false);

  const gallery = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const price = p.price?.price;
  const disc = p.price?.discountedPrice;
  const hasDisc = disc != null && disc < price;

  async function handleAdd() {
    await addToCart(p, Object.keys(sel).length ? sel : null);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const envio = `Envío a ${SITE.shippingZone}${
    SITE.shippingCost === "gratuito" ? ", gratuito" : ""
  }. Plazo estimado de entrega: ${SITE.deliveryTime}. Recibirás el número de seguimiento por email en cuanto tu pedido salga.`;
  const dev = `Dispones de ${SITE.returnDays} días naturales desde la recepción para solicitar una devolución. Escríbenos y te indicamos el proceso. El producto debe estar sin usar y en su embalaje original.`;

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
              { k: "envio", t: "Envío y entregas", c: <p>{envio}</p> },
              { k: "dev", t: "Cambios y devoluciones", c: <p>{dev}</p> },
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

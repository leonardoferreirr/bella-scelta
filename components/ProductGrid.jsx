"use client";

import Link from "next/link";
import { useCart, fmt } from "./store";

const sized = (u) => (u ? u.replace(/\/w_\d+,h_\d+,/, "/w_600,h_600,") : u);
function imgs(p) {
  const items = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const main = p.media?.mainMedia?.image?.url;
  const a = items[0] || main || null;
  const b = items[1] || a;
  return { a: sized(a), b: sized(b) };
}

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();
  return (
    <div className="grid">
      {products.map((p, i) => {
        const price = p.price?.price, disc = p.price?.discountedPrice;
        const hasDisc = disc != null && disc < price;
        const { a, b } = imgs(p);
        const eager = i < 4;
        return (
          <article className="card" key={p._id}>
            <Link href={`/product/${p.slug}`} className="card__link">
              <div className="card__media">
                {hasDisc && <span className="ribbon">Oferta</span>}
                {a ? (
                  <>
                    <img className="a" src={a} alt={p.name} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} />
                    <img className="b" src={b} alt="" loading="lazy" />
                  </>
                ) : (<div className="card__ph">BS</div>)}
              </div>
              <div className="card__name">{p.name}</div>
            </Link>
            <div className="price">
              <span className="now">{fmt(hasDisc ? disc : price)}</span>
              {hasDisc && <span className="was">{fmt(price)}</span>}
            </div>
            <button className="add" onClick={() => addToCart(p)}>Añadir a la cesta</button>
          </article>
        );
      })}
    </div>
  );
}

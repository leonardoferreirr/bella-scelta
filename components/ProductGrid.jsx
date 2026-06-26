"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart, fmt } from "./store";

function imgs(p) {
  const items = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const main = p.media?.mainMedia?.image?.url;
  const a = items[0] || main || null;
  const b = items[1] || a;
  return { a, b };
}

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();
  return (
    <div className="grid">
      {products.map((p, i) => {
        const price = p.price?.price, disc = p.price?.discountedPrice;
        const hasDisc = disc != null && disc < price;
        const { a, b } = imgs(p);
        const eager = i < 2;
        return (
          <article className="card" key={p._id}>
            <Link href={`/product/${p.slug}`} className="card__link">
              <div className="card__media">
                {hasDisc && <span className="ribbon">Oferta</span>}
                {a ? (
                  <>
                    <Image className="a" src={a} alt={p.name} fill sizes="(max-width:680px) 46vw, (max-width:1000px) 31vw, 23vw" style={{ objectFit: "cover" }} priority={eager} />
                    <Image className="b" src={b} alt="" fill sizes="(max-width:680px) 46vw, (max-width:1000px) 31vw, 23vw" style={{ objectFit: "cover" }} />
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

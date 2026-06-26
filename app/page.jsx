"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { wixClient } from "../lib/wixClient";
import { useCart, fmt } from "../components/store";

const sized = (u) => (u ? u.replace(/\/w_\d+,h_\d+,/, "/w_600,h_600,") : u);
function imgs(p) {
  const items = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const main = p.media?.mainMedia?.image?.url;
  const a = items[0] || main || null;
  const b = items[1] || a;
  return { a: sized(a), b: sized(b) };
}

export default function Page() {
  const { addToCart } = useCart();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try { const res = await wixClient.products.queryProducts().find(); setList(res.items || []); }
    catch (e) { console.error("products", e); }
    finally { setLoading(false); }
  }
  useEffect(() => { fetchProducts(); }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero__in">
          <h1>La belleza<br />es una <span className="it">elección</span></h1>
          <p>Productos seleccionados para tu rutina de cuidado, con envío a toda España.</p>
          <a className="btn" href="#tienda">Comprar ahora</a>
        </div>
      </section>

      <main className="container" id="tienda">
        <div className="shead">
          <h2>Nuestra <span className="it">selección</span></h2>
          <p>Lo esencial del cuidado, elegido pieza por pieza.</p>
        </div>

        {loading ? (
          <p className="empty">Cargando productos…</p>
        ) : (
          <div className="grid">
            {list.map((p) => {
              const price = p.price?.price, disc = p.price?.discountedPrice;
              const hasDisc = disc != null && disc < price;
              const { a, b } = imgs(p);
              return (
                <article className="card" key={p._id}>
                  <Link href={`/product/${p.slug}`} className="card__link">
                    <div className="card__media">
                      {hasDisc && <span className="ribbon">Oferta</span>}
                      {a ? (<><img className="a" src={a} alt={p.name} loading="lazy" /><img className="b" src={b} alt="" loading="lazy" /></>) : (<div className="card__ph">BS</div>)}
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
        )}

        <div className="band">
          <div className="tile tile--a">
            <h3>Tu piel,<br />tu ritual</h3>
            <p>Mascarillas, contorno y autobronceador para un cuidado completo en casa.</p>
            <a href="#tienda">Ver productos</a>
          </div>
          <div className="tile tile--b">
            <h3>Cabello<br />de salón</h3>
            <p>Rizos definidos y retoque de raíz, con resultado profesional.</p>
            <a href="#tienda">Ver productos</a>
          </div>
        </div>

        <div className="benes">
          <div className="bene"><b>Envío a España</b><span>Entrega a toda la península</span></div>
          <div className="bene"><b>Pago seguro</b><span>Compra protegida</span></div>
          <div className="bene"><b>Selección premium</b><span>Productos elegidos uno a uno</span></div>
        </div>
      </main>
    </>
  );
}

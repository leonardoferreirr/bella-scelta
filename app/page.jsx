"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { wixClient, STORES_APP_ID, currentCart } from "../lib/wixClient";

const COLLECTIONS = [
  { id: "all", label: "Todos" },
  { id: "cd64e0f5-6eeb-4c03-80b2-49b040827897", label: "Cuidado de la Piel" },
  { id: "c1c92989-a9c8-4a75-9caa-c66367304aa9", label: "Cabello" },
  { id: "b5185c95-e546-44cf-8430-61fc443cb08f", label: "Sonrisa" },
];

function fmt(n) {
  if (n == null) return "";
  try { return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n); }
  catch { return `€${Number(n).toFixed(2)}`; }
}
const sized = (u) => (u ? u.replace(/\/w_\d+,h_\d+,/, "/w_600,h_600,") : u);
function imgs(p) {
  const items = (p.media?.items || []).map((m) => m?.image?.url).filter(Boolean);
  const main = p.media?.mainMedia?.image?.url;
  const a = items[0] || main || null;
  const b = items[1] || a;
  return { a: sized(a), b: sized(b) };
}

export default function Page() {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState({});
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function saveSession() { Cookies.set("session", JSON.stringify(wixClient.auth.getTokens())); }

  async function fetchProducts() {
    try {
      const res = await wixClient.products.queryProducts().find();
      setList(res.items || []);
    } catch (e) { console.error("products", e); }
    finally { setLoading(false); }
  }
  async function fetchCart() { try { setCart(await wixClient.currentCart.getCurrentCart()); } catch {} }
  async function addToCart(p) {
    const options = (p.productOptions || []).reduce(
      (sel, o) => ({ ...sel, [o.name]: o.choices?.[0]?.description }), {});
    const { cart } = await wixClient.currentCart.addToCurrentCart({
      lineItems: [{ catalogReference: { appId: STORES_APP_ID, catalogItemId: p._id, options: { options } }, quantity: 1 }],
    });
    saveSession(); setCart(cart); setOpen(true);
  }
  async function checkout() {
    const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({ channelType: currentCart.ChannelType.WEB });
    const r = await wixClient.redirects.createRedirectSession({ ecomCheckout: { checkoutId }, callbacks: { postFlowUrl: window.location.href } });
    window.location = r.redirectSession.fullUrl;
  }

  useEffect(() => { fetchProducts(); fetchCart(); }, []);

  const shown = cat === "all" ? list : list.filter((p) => (p.collectionIds || []).includes(cat));
  const count = cart?.lineItems?.length || 0;

  return (
    <>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__t">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>Envío a toda España · Selección premium de belleza · Autocuidado que se nota · Pago seguro · </span>
          ))}
        </div>
      </div>

      <header className="hd">
        <div className="container hd__in">
          <span className="brand">Bella <em>Scelta</em></span>
          <nav className="hd__nav">
            {COLLECTIONS.slice(1).map((c) => (
              <button key={c.id} onClick={() => { setCat(c.id); document.getElementById("tienda")?.scrollIntoView({ behavior: "smooth" }); }}>{c.label}</button>
            ))}
          </nav>
          <button className="cartbtn" onClick={() => setOpen(true)}>Cesta {count > 0 && <b>{count}</b>}</button>
        </div>
      </header>

      <section className="hero">
        <img className="hero__art" src="/banners/hero.webp" alt="" fetchPriority="high" />
        <div className="container hero__in">
          <div className="hero__kicker">Belleza · Autocuidado · España</div>
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

        <div className="cats">
          {COLLECTIONS.map((c) => (
            <button key={c.id} className={`chip ${cat === c.id ? "active" : ""}`} onClick={() => setCat(c.id)}>{c.label}</button>
          ))}
        </div>

        {loading ? (
          <p className="empty">Cargando productos…</p>
        ) : (
          <div className="grid" style={{ marginTop: 24 }}>
            {shown.map((p) => {
              const price = p.price?.price, disc = p.price?.discountedPrice;
              const hasDisc = disc != null && disc < price;
              const { a, b } = imgs(p);
              return (
                <article className="card" key={p._id}>
                  <div className="card__media">
                    {hasDisc && <span className="ribbon">Oferta</span>}
                    {a ? (
                      <>
                        <img className="a" src={a} alt={p.name} loading="lazy" />
                        <img className="b" src={b} alt="" loading="lazy" />
                      </>
                    ) : (
                      <div className="card__ph">BS</div>
                    )}
                  </div>
                  <div className="card__name">{p.name}</div>
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
            <a onClick={() => setCat("cd64e0f5-6eeb-4c03-80b2-49b040827897")} style={{ cursor: "pointer" }}>Ver cuidado de la piel</a>
          </div>
          <div className="tile tile--b">
            <h3>Cabello<br />de salón</h3>
            <p>Rizos definidos y retoque de raíz, con resultado profesional.</p>
            <a onClick={() => setCat("c1c92989-a9c8-4a75-9caa-c66367304aa9")} style={{ cursor: "pointer" }}>Ver cabello</a>
          </div>
        </div>

        <div className="benes">
          <div className="bene"><b>Envío a España</b><span>Entrega a toda la península</span></div>
          <div className="bene"><b>Pago seguro</b><span>Compra protegida</span></div>
          <div className="bene"><b>Selección premium</b><span>Productos elegidos uno a uno</span></div>
        </div>
      </main>

      <footer className="ft">
        <div className="container ft__grid">
          <div className="ft__col">
            <div className="ft__brand">Bella <em>Scelta</em></div>
            <p style={{ maxWidth: 240, marginTop: 10, opacity: .85 }}>Belleza y autocuidado, con envío a toda España.</p>
          </div>
          <div className="ft__col">
            <h4>Tienda</h4>
            <p><a href="#tienda">Más vendidos</a></p>
            <p><a href="#tienda">Cuidado de la piel</a></p>
            <p><a href="#tienda">Cabello</a></p>
          </div>
          <div className="ft__col">
            <h4>Ayuda</h4>
            <p><a href="#">Envíos y entregas</a></p>
            <p><a href="#">Contacto</a></p>
          </div>
        </div>
        <div className="container"><small>© 2026 Bella Scelta. Todos los derechos reservados.</small></div>
      </footer>

      <div className={`scrim ${open ? "open" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer__h">
          <h3>Tu cesta</h3>
          <button className="x" onClick={() => setOpen(false)}>×</button>
        </div>
        <div className="drawer__items">
          {count === 0 ? (
            <p className="empty">Tu cesta está vacía.</p>
          ) : (
            cart.lineItems.map((li) => (
              <div className="li" key={li._id}>
                <div>
                  <div>{li.productName?.translated || li.productName?.original}</div>
                  <small>Cantidad: {li.quantity}</small>
                </div>
                <div>{li.price?.formattedAmount}</div>
              </div>
            ))
          )}
        </div>
        {count > 0 && (
          <div className="drawer__f">
            <div className="subtotal"><span>Subtotal</span><span>{cart.subtotal?.formattedAmount}</span></div>
            <button className="checkout" onClick={checkout}>Finalizar compra</button>
          </div>
        )}
      </aside>
    </>
  );
}

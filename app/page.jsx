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

function fmt(n, currency = "EUR") {
  if (n == null) return "";
  try {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency }).format(n);
  } catch {
    return `€${Number(n).toFixed(2)}`;
  }
}

export default function Page() {
  const [list, setList] = useState([]);
  const [cart, setCart] = useState({});
  const [cat, setCat] = useState("all");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function saveSession() {
    Cookies.set("session", JSON.stringify(wixClient.auth.getTokens()));
  }

  async function fetchProducts() {
    try {
      const res = await wixClient.products.queryProducts().find();
      setList(res.items || []);
    } catch (e) {
      console.error("products", e);
    } finally {
      setLoading(false);
    }
  }
  async function fetchCart() {
    try {
      setCart(await wixClient.currentCart.getCurrentCart());
    } catch {}
  }
  async function addToCart(p) {
    const options = (p.productOptions || []).reduce(
      (sel, o) => ({ ...sel, [o.name]: o.choices?.[0]?.description }),
      {}
    );
    const { cart } = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: { appId: STORES_APP_ID, catalogItemId: p._id, options: { options } },
          quantity: 1,
        },
      ],
    });
    saveSession();
    setCart(cart);
    setOpen(true);
  }
  async function checkout() {
    const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({
      channelType: currentCart.ChannelType.WEB,
    });
    const r = await wixClient.redirects.createRedirectSession({
      ecomCheckout: { checkoutId },
      callbacks: { postFlowUrl: window.location.href },
    });
    window.location = r.redirectSession.fullUrl;
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const shown = cat === "all" ? list : list.filter((p) => (p.collectionIds || []).includes(cat));
  const count = cart?.lineItems?.length || 0;

  return (
    <>
      <header className="hd">
        <div className="container hd__in">
          <span className="brand">Bella Scelta</span>
          <nav className="hd__nav">
            {COLLECTIONS.slice(1).map((c) => (
              <a key={c.id} onClick={() => setCat(c.id)} style={{ cursor: "pointer" }}>{c.label}</a>
            ))}
          </nav>
          <button className="cartbtn" onClick={() => setOpen(true)}>
            Cesta {count > 0 && <b>{count}</b>}
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h1>La belleza<br />es una elección</h1>
          <p>Tu rutina de cuidado, en casa. Productos seleccionados, envío a toda España.</p>
          <a className="btn" href="#tienda">Comprar ahora</a>
        </div>
      </section>

      <main className="container" id="tienda">
        <div className="cats">
          {COLLECTIONS.map((c) => (
            <button key={c.id} className={`chip ${cat === c.id ? "active" : ""}`} onClick={() => setCat(c.id)}>
              {c.label}
            </button>
          ))}
        </div>

        <h2 className="sec-title">Nuestra selección</h2>

        {loading ? (
          <p className="empty">Cargando productos…</p>
        ) : (
          <div className="grid">
            {shown.map((p) => {
              const price = p.price?.price;
              const disc = p.price?.discountedPrice;
              const hasDisc = disc != null && disc < price;
              const img = p.media?.mainMedia?.image?.url;
              return (
                <article className="card" key={p._id}>
                  <div className="card__img">{img ? <img src={img} alt={p.name} /> : "BS"}</div>
                  <div className="card__b">
                    <div className="card__name">{p.name}</div>
                    <div className="price">
                      <span className="now">{fmt(hasDisc ? disc : price)}</span>
                      {hasDisc && <span className="was">{fmt(price)}</span>}
                    </div>
                    <button className="add" onClick={() => addToCart(p)}>Añadir a la cesta</button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      <footer className="ft">
        <div className="container ft__grid">
          <div>
            <div className="ft__brand">Bella Scelta</div>
            <p style={{ maxWidth: 240, opacity: 0.85 }}>Belleza y autocuidado, con envío a toda España.</p>
          </div>
          <div>
            <p><a href="#tienda">Tienda</a></p>
            <p><a href="#tienda">Más vendidos</a></p>
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
            <div className="subtotal">
              <span>Subtotal</span>
              <span>{cart.subtotal?.formattedAmount}</span>
            </div>
            <button className="checkout" onClick={checkout}>Finalizar compra</button>
          </div>
        )}
      </aside>
    </>
  );
}

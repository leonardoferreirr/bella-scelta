"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { wixClient, STORES_APP_ID, currentCart } from "../lib/wixClient";
import CookieBanner from "./CookieBanner";

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

export function fmt(n) {
  if (n == null) return "";
  try { return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n); }
  catch { return `€${Number(n).toFixed(2)}`; }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const save = () => Cookies.set("session", JSON.stringify(wixClient.auth.getTokens()));

  async function fetchCart() { try { setCart(await wixClient.currentCart.getCurrentCart()); } catch {} }
  useEffect(() => { fetchCart(); }, []);

  async function addToCart(p, selected) {
    const options = selected || (p.productOptions || []).reduce(
      (s, o) => ({ ...s, [o.name]: o.choices?.[0]?.description }), {});
    const { cart } = await wixClient.currentCart.addToCurrentCart({
      lineItems: [{ catalogReference: { appId: STORES_APP_ID, catalogItemId: p._id, options: { options } }, quantity: 1 }],
    });
    save(); setCart(cart); setOpen(true);
  }
  async function checkout() {
    const { checkoutId } = await wixClient.currentCart.createCheckoutFromCurrentCart({ channelType: currentCart.ChannelType.WEB });
    const r = await wixClient.redirects.createRedirectSession({ ecomCheckout: { checkoutId }, callbacks: { postFlowUrl: window.location.href } });
    window.location = r.redirectSession.fullUrl;
  }
  const count = cart?.lineItems?.length || 0;
  return <Ctx.Provider value={{ cart, open, setOpen, addToCart, checkout, count }}>{children}</Ctx.Provider>;
}

export function Chrome({ children }) {
  const { count, open, setOpen, cart, checkout } = useCart();
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
          <Link className="brand" href="/" aria-label="Bella Scelta"><img src="/bella-logo.svg" alt="Bella Scelta" width="150" height="41" /></Link>
          <nav className="hd__nav">
            <Link href="/#tienda">Tienda</Link>
            <Link href="/#tienda">Cuidado de la Piel</Link>
            <Link href="/#tienda">Cabello</Link>
          </nav>
          <button className="cartbtn" onClick={() => setOpen(true)}>Cesta {count > 0 && <b>{count}</b>}</button>
        </div>
      </header>

      {children}

      <footer className="ft">
        <div className="container ft__grid">
          <div className="ft__col">
            <div className="ft__brand"><img src="/bella-logo-light.svg" alt="Bella Scelta" width="172" height="47" /></div>
            <p style={{ maxWidth: 240, marginTop: 10, opacity: .85 }}>Belleza y autocuidado, con envío a toda España.</p>
          </div>
          <div className="ft__col">
            <h4>Tienda</h4>
            <p><Link href="/#tienda">Más vendidos</Link></p>
            <p><Link href="/#tienda">Cuidado de la piel</Link></p>
            <p><Link href="/#tienda">Cabello</Link></p>
          </div>
          <div className="ft__col">
            <h4>Ayuda</h4>
            <p><Link href="/envios">Envíos y entregas</Link></p>
            <p><Link href="/contacto">Contacto</Link></p>
          </div>
          <div className="ft__col">
            <h4>Legal</h4>
            <p><Link href="/aviso-legal">Aviso legal</Link></p>
            <p><Link href="/privacidad">Privacidad</Link></p>
            <p><Link href="/terminos">Términos y condiciones</Link></p>
            <p><Link href="/cookies">Cookies</Link></p>
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

      <CookieBanner />
    </>
  );
}

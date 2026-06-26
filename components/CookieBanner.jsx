"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const KEY = "bs_consent";

// Útil para más adelante: cargar Meta Pixel / analítica sólo si hasConsent() === true.
export function hasConsent() {
  return Cookies.get(KEY) === "all";
}

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!Cookies.get(KEY)) setShow(true);
  }, []);

  function choose(value) {
    Cookies.set(KEY, value, { expires: 180, sameSite: "Lax" });
    setShow(false);
    // Cuando se añadan cookies de análisis/publicidad (p. ej. Meta Pixel),
    // cargarlas únicamente cuando value === "all".
  }

  if (!show) return null;

  return (
    <div className="cookie" role="dialog" aria-live="polite" aria-label="Aviso de cookies">
      <p>
        Usamos cookies propias necesarias para el funcionamiento de la tienda y, con tu
        permiso, cookies de análisis y publicidad para mejorar tu experiencia. Consulta
        nuestra <Link href="/cookies">Política de Cookies</Link>.
      </p>
      <div className="cookie__row">
        <button className="cookie__btn cookie__btn--no" onClick={() => choose("essential")}>
          Rechazar
        </button>
        <button className="cookie__btn cookie__btn--yes" onClick={() => choose("all")}>
          Aceptar
        </button>
      </div>
    </div>
  );
}

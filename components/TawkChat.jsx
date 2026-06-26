"use client";

import Script from "next/script";
import { SITE } from "../lib/site";

// Chat de soporte (Tawk.to). No renderiza nada hasta que SITE.tawk.propertyId
// esté relleno. Se carga con strategy="lazyOnload" para no afectar el LCP.
export default function TawkChat() {
  const id = SITE.tawk?.propertyId;
  const widget = SITE.tawk?.widgetId || "default";
  if (!id) return null;

  return (
    <Script id="tawk-to" strategy="lazyOnload">{`
      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
      (function(){
        var s1=document.createElement("script"), s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/${id}/${widget}';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
      })();
    `}</Script>
  );
}

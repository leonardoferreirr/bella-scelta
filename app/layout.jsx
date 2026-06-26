import "./globals.css";
import { Fraunces, Archivo } from "next/font/google";
import { CartProvider, Chrome } from "../components/store";
import TawkChat from "../components/TawkChat";
import { SITE } from "../lib/site";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

const TITLE = "Bella Scelta | Belleza y autocuidado";
const DESC = "Tu rutina de belleza y autocuidado, en casa. Selección premium de cuidado de la piel y cabello con envíos a toda España.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s · Bella Scelta" },
  description: DESC,
  applicationName: SITE.brand,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE.url,
    siteName: SITE.brand,
    title: TITLE,
    description: DESC,
  },
  twitter: { card: "summary", title: TITLE, description: DESC },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "OnlineStore",
  name: SITE.brand,
  url: SITE.url,
  email: SITE.email,
  description: DESC,
  areaServed: "ES",
  inLanguage: "es-ES",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <Chrome>{children}</Chrome>
        </CartProvider>
        <TawkChat />
      </body>
    </html>
  );
}

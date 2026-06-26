import "./globals.css";
import { Fraunces, Archivo } from "next/font/google";
import { CartProvider, Chrome } from "../components/store";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
  variable: "--font-display",
});
const body = Archivo({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const metadata = {
  title: "Bella Scelta | Belleza y autocuidado",
  description: "Tu rutina de belleza y autocuidado, en casa. Envíos a toda España.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>
        <CartProvider>
          <Chrome>{children}</Chrome>
        </CartProvider>
      </body>
    </html>
  );
}

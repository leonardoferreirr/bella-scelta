import "./globals.css";
import { Montserrat, Open_Sans } from "next/font/google";

const display = Montserrat({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-display" });
const body = Open_Sans({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-body" });

export const metadata = {
  title: "Bella Scelta | Belleza y autocuidado",
  description: "Tu rutina de belleza y autocuidado, en casa. Envíos a toda España.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}

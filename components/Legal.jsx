import Link from "next/link";
import { SITE } from "../lib/site";

// Marco visual compartido para páginas legales y de contenido.
export function LegalShell({ title, subtitle, updated = true, children }) {
  return (
    <main className="container legal">
      <Link href="/" className="legal__back">← Volver a la tienda</Link>
      <h1>{title}</h1>
      {updated && <p className="legal__updated">Última actualización: {SITE.updated}</p>}
      {subtitle && <p className="legal__lead">{subtitle}</p>}
      {children}
    </main>
  );
}

import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../lib/wixServer";

export const revalidate = 300;

export default async function Page() {
  const products = await getProducts();

  return (
    <>
      <section className="hero" aria-label="Bella Scelta, belleza y autocuidado">
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

        <ProductGrid products={products} />

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

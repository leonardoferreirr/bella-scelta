import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Términos y Condiciones | Bella Scelta",
  description: "Condiciones generales de compra de la tienda Bella Scelta: pagos, envíos, devoluciones y garantía.",
};

export default function Page() {
  return (
    <LegalShell title="Términos y Condiciones">
      <p>
        Estas condiciones generales regulan la compra de productos en {SITE.domain}. Al realizar un
        pedido, el usuario declara haberlas leído y aceptado.
      </p>

      <h2>1. Identificación del vendedor</h2>
      <ul>
        <li><strong>Titular:</strong> {SITE.legalName}</li>
        <li><strong>NIF / CIF:</strong> {SITE.nif}</li>
        <li><strong>Domicilio:</strong> {SITE.address}</li>
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
      </ul>

      <h2>2. Productos y proceso de compra</h2>
      <p>
        Los productos ofrecidos, con su descripción y precio, se muestran en la tienda. Para comprar,
        añade los artículos a la cesta y sigue los pasos del proceso de pago. Una vez confirmado el
        pedido, recibirás un correo electrónico de confirmación.
      </p>

      <h2>3. Precios e impuestos</h2>
      <p>
        Todos los precios se muestran en euros (€) e incluyen los impuestos aplicables. Los gastos de
        envío, si los hubiera, se indican antes de finalizar la compra.
      </p>

      <h2>4. Formas de pago</h2>
      <p>
        El pago se realiza de forma segura a través de la pasarela de pago integrada en la tienda. El
        cargo se efectúa en el momento de confirmar el pedido.
      </p>

      <h2>5. Envío y plazos de entrega</h2>
      <p>
        Realizamos envíos a {SITE.shippingZone}. El plazo estimado de entrega es de {SITE.deliveryTime}.
        Puedes consultar todos los detalles en nuestra página de <a href="/envios">Envíos y entregas</a>.
      </p>

      <h2>6. Derecho de desistimiento</h2>
      <p>
        Como consumidor, dispones de un plazo de {SITE.returnDays} días naturales, desde la recepción
        del producto, para desistir de la compra sin necesidad de justificación. Para ejercerlo,
        comunícanoslo por correo electrónico a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. El
        producto debe devolverse sin usar y en su embalaje original.
      </p>
      <p>
        Una vez recibido y verificado, te reembolsaremos el importe abonado en un plazo máximo de 14
        días naturales, por el mismo medio de pago utilizado en la compra.
      </p>
      <div className="legal__note">
        <strong>Modelo de formulario de desistimiento</strong>
        <p style={{ margin: "8px 0 0" }}>
          A la atención de {SITE.legalName} ({SITE.email}): por la presente le comunico que desisto de
          mi contrato de compra del siguiente producto [referencia y descripción], pedido el [fecha] y
          recibido el [fecha]. Nombre del consumidor, dirección, fecha y firma (si se presenta en papel).
        </p>
      </div>

      <h2>7. Garantía legal</h2>
      <p>
        Los productos cuentan con la garantía legal de conformidad de 3 años prevista en la normativa
        española de consumidores y usuarios. Si un producto presenta una falta de conformidad,
        contáctanos y te indicaremos cómo proceder a su reparación, sustitución o reembolso.
      </p>

      <h2>8. Devoluciones y reembolsos</h2>
      <p>
        Encontrarás el procedimiento de devolución y los plazos de reembolso en la sección de{" "}
        <a href="/envios">Envíos y entregas</a> y en el apartado anterior sobre el derecho de
        desistimiento.
      </p>

      <h2>9. Atención al cliente y reclamaciones</h2>
      <p>
        Para cualquier consulta o reclamación, escríbenos a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Además, conforme a la normativa europea,
        tienes a tu disposición la plataforma de resolución de litigios en línea de la Comisión
        Europea:{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2>10. Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. En caso de conflicto, será de
        aplicación la normativa de protección de los consumidores y usuarios.
      </p>
    </LegalShell>
  );
}

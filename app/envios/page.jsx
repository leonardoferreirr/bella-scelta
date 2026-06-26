import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Envíos y entregas | Bella Scelta",
  description: "Plazos, zona de envío y seguimiento de pedidos en Bella Scelta.",
};

export default function Page() {
  return (
    <LegalShell
      title="Envíos y entregas"
      updated={false}
      subtitle="Todo lo que necesitas saber sobre cómo y cuándo llega tu pedido."
    >
      <h2>Zona de envío</h2>
      <p>Realizamos envíos a {SITE.shippingZone}.</p>

      <h2>Gastos de envío</h2>
      <p>El envío es {SITE.shippingCost} en todos los pedidos. El precio que ves es el precio final.</p>

      <h2>Plazo de entrega</h2>
      <p>
        El plazo estimado de entrega es de {SITE.deliveryTime} desde la confirmación del pedido.
        Preparamos cada pedido con cuidado y trabajamos para que llegue cuanto antes.
      </p>

      <h2>Seguimiento de tu pedido</h2>
      <p>
        En cuanto tu pedido salga, recibirás por correo electrónico el número de seguimiento para que
        puedas consultar su estado en todo momento.
      </p>

      <h2>Cambios y devoluciones</h2>
      <p>
        Dispones de {SITE.returnDays} días naturales desde la recepción para solicitar una devolución.
        El producto debe estar sin usar y en su embalaje original. Escríbenos a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> y te indicamos el proceso. Puedes consultar
        todos los detalles en nuestros <a href="/terminos">Términos y Condiciones</a>.
      </p>

      <h2>¿Tienes dudas?</h2>
      <p>
        Estamos a tu disposición en la página de <a href="/contacto">Contacto</a>.
      </p>
    </LegalShell>
  );
}

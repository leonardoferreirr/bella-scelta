import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Política de Privacidad | Bella Scelta",
  description: "Cómo tratamos tus datos personales en Bella Scelta conforme al RGPD y la LOPDGDD.",
};

export default function Page() {
  return (
    <LegalShell title="Política de Privacidad">
      <p>
        En {SITE.brand} nos tomamos en serio la protección de tus datos. Esta política explica qué
        datos personales recogemos, con qué finalidad, sobre qué base legal y qué derechos tienes,
        conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {SITE.legalName}</li>
        {SITE.nif ? <li><strong>Identificación fiscal:</strong> {SITE.nif}</li> : null}
        {SITE.address ? <li><strong>Domicilio:</strong> {SITE.address}</li> : null}
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
      </ul>

      <h2>2. Datos que tratamos</h2>
      <ul>
        <li><strong>Datos de identificación y contacto:</strong> nombre, apellidos, correo electrónico y teléfono.</li>
        <li><strong>Datos de envío y facturación:</strong> dirección postal y datos necesarios para procesar el pedido.</li>
        <li><strong>Datos de la transacción:</strong> productos adquiridos e historial de pedidos. Los datos de pago se gestionan directamente por la pasarela de pago; no almacenamos los datos completos de tu tarjeta.</li>
        <li><strong>Datos de navegación:</strong> información técnica y de uso recogida mediante cookies (ver <a href="/cookies">Política de Cookies</a>).</li>
      </ul>

      <h2>3. Finalidades y base jurídica</h2>
      <ul>
        <li><strong>Gestionar tus pedidos y envíos</strong> y prestarte atención al cliente. Base: ejecución del contrato de compraventa.</li>
        <li><strong>Cumplir obligaciones legales</strong> (fiscales, contables y de consumo). Base: obligación legal.</li>
        <li><strong>Enviarte comunicaciones comerciales</strong> sobre productos y ofertas, si nos das tu permiso. Base: consentimiento, que puedes retirar en cualquier momento.</li>
        <li><strong>Mejorar la tienda y medir su rendimiento.</strong> Base: consentimiento (cookies de análisis y publicidad) o interés legítimo.</li>
      </ul>

      <h2>4. Conservación de los datos</h2>
      <p>
        Conservamos tus datos mientras exista una relación comercial y, después, durante los plazos
        legalmente exigidos (por ejemplo, los plazos fiscales y mercantiles). Los datos tratados con
        base en tu consentimiento se conservarán hasta que lo retires.
      </p>

      <h2>5. Destinatarios de los datos</h2>
      <p>
        Para prestarte el servicio compartimos los datos imprescindibles con proveedores que actúan
        como encargados del tratamiento, entre ellos:
      </p>
      <ul>
        <li>La plataforma tecnológica que da soporte a la tienda y al proceso de compra.</li>
        <li>La pasarela de pago, para procesar el cobro de forma segura.</li>
        <li>Las empresas de transporte y logística, para entregar tu pedido.</li>
        <li>Proveedores que intervienen en la preparación y el envío de los productos.</li>
      </ul>

      <h2>6. Transferencias internacionales</h2>
      <p>
        Algunos de nuestros proveedores logísticos o de preparación de pedidos pueden estar situados
        fuera del Espacio Económico Europeo. En esos casos, garantizamos que la transferencia se
        realiza con las garantías adecuadas previstas en el RGPD (decisiones de adecuación o
        cláusulas contractuales tipo).
      </p>

      <h2>7. Tus derechos</h2>
      <p>Puedes ejercer en cualquier momento los siguientes derechos:</p>
      <ul>
        <li>Acceso a tus datos personales.</li>
        <li>Rectificación de los datos inexactos.</li>
        <li>Supresión de los datos cuando ya no sean necesarios.</li>
        <li>Oposición y limitación del tratamiento.</li>
        <li>Portabilidad de los datos a otro responsable.</li>
        <li>Retirar el consentimiento prestado, sin que ello afecte a la licitud del tratamiento previo.</li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Si consideras que no hemos atendido
        correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de
        Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2>8. Seguridad</h2>
      <p>
        Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos frente a
        accesos no autorizados, pérdida o alteración.
      </p>

      <h2>9. Cambios en esta política</h2>
      <p>
        Podemos actualizar esta Política de Privacidad para adaptarla a cambios legales o operativos.
        La versión vigente será siempre la publicada en esta página.
      </p>
    </LegalShell>
  );
}

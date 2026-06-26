import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Política de Cookies | Bella Scelta",
  description: "Qué cookies usamos en Bella Scelta y cómo puedes gestionarlas.",
};

export default function Page() {
  return (
    <LegalShell title="Política de Cookies">
      <p>
        Una cookie es un pequeño archivo que se descarga en tu dispositivo al visitar una página web.
        En {SITE.domain} utilizamos cookies para garantizar el funcionamiento de la tienda y, con tu
        consentimiento, para analizar el uso del sitio y mostrarte publicidad relevante.
      </p>

      <h2>1. Tipos de cookies que utilizamos</h2>
      <ul>
        <li>
          <strong>Cookies técnicas (necesarias):</strong> imprescindibles para que la tienda funcione,
          como mantener tu sesión y los productos de la cesta. No requieren consentimiento.
        </li>
        <li>
          <strong>Cookies de análisis:</strong> nos ayudan a entender cómo se usa la tienda para
          mejorarla. Sólo se activan si las aceptas.
        </li>
        <li>
          <strong>Cookies de publicidad:</strong> permiten medir la eficacia de nuestros anuncios y
          mostrarte contenido relevante. Sólo se activan si las aceptas.
        </li>
      </ul>

      <h2>2. Cookies en uso</h2>
      <table className="legal__table">
        <thead>
          <tr><th>Cookie</th><th>Tipo</th><th>Finalidad</th><th>Duración</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>session</td>
            <td>Técnica</td>
            <td>Mantener la sesión y la cesta de la compra.</td>
            <td>Sesión</td>
          </tr>
          <tr>
            <td>bs_consent</td>
            <td>Técnica</td>
            <td>Recordar tu elección sobre el uso de cookies.</td>
            <td>180 días</td>
          </tr>
        </tbody>
      </table>
      <p>
        Cuando activemos herramientas de análisis o publicidad (por ejemplo, píxeles de medición),
        actualizaremos esta tabla con el detalle de cada cookie.
      </p>

      <h2>3. Cómo gestionar las cookies</h2>
      <p>
        Al entrar por primera vez, puedes aceptar o rechazar las cookies no necesarias mediante el
        aviso que se muestra en pantalla. Además, puedes configurar o eliminar las cookies en
        cualquier momento desde la configuración de tu navegador. Ten en cuenta que desactivar las
        cookies técnicas puede afectar al funcionamiento de la tienda.
      </p>

      <h2>4. Consentimiento</h2>
      <p>
        Las cookies de análisis y publicidad sólo se instalan si das tu consentimiento. Puedes
        retirarlo cuando quieras eliminando las cookies de tu navegador. Para más información sobre el
        tratamiento de tus datos, consulta nuestra <a href="/privacidad">Política de Privacidad</a>.
      </p>
    </LegalShell>
  );
}

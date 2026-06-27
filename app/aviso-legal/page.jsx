import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Aviso Legal | Bella Scelta",
  description: "Información legal del titular de la tienda Bella Scelta conforme a la LSSI-CE.",
};

export default function Page() {
  return (
    <LegalShell title="Aviso Legal">
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
        Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se ponen a disposición de
        los usuarios los siguientes datos del titular de este sitio web:
      </p>
      <ul>
        <li><strong>Titular:</strong> {SITE.legalName}</li>
        {SITE.nif ? <li><strong>Identificación fiscal:</strong> {SITE.nif}</li> : null}
        {SITE.address ? <li><strong>Domicilio:</strong> {SITE.address}</li> : null}
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
        <li><strong>Sitio web:</strong> {SITE.domain}</li>
        {SITE.registro ? <li><strong>Datos registrales:</strong> {SITE.registro}</li> : null}
      </ul>

      <h2>1. Objeto</h2>
      <p>
        El presente Aviso Legal regula el uso del sitio web {SITE.domain} (en adelante, «el sitio
        web»), cuya finalidad es la venta en línea de productos de belleza y autocuidado y la
        difusión de información relacionada con dichos productos.
      </p>

      <h2>2. Condiciones de uso</h2>
      <p>
        El acceso y la navegación por el sitio web atribuyen la condición de usuario e implican la
        aceptación de este Aviso Legal. El usuario se compromete a hacer un uso adecuado de los
        contenidos y servicios, y a no emplearlos para incurrir en actividades ilícitas, contrarias
        a la buena fe o al orden público, ni para dañar el funcionamiento del sitio.
      </p>

      <h2>3. Propiedad intelectual e industrial</h2>
      <p>
        Todos los contenidos del sitio web (textos, fotografías, gráficos, imágenes, diseño,
        logotipos, marcas y código fuente) son titularidad del titular o de terceros que han
        autorizado su uso, y están protegidos por la normativa de propiedad intelectual e
        industrial. Queda prohibida su reproducción, distribución o transformación sin autorización
        expresa.
      </p>

      <h2>4. Exclusión de responsabilidad</h2>
      <p>
        El titular no se responsabiliza de los daños derivados de un uso inadecuado del sitio web ni
        de las interrupciones, errores o fallos técnicos ajenos a su control. El titular procura
        mantener la información actualizada y libre de errores, pero no garantiza la inexistencia de
        los mismos.
      </p>

      <h2>5. Enlaces a terceros</h2>
      <p>
        El sitio web puede contener enlaces a páginas de terceros. El titular no asume
        responsabilidad alguna sobre el contenido, las políticas o los servicios de dichos sitios.
      </p>

      <h2>6. Protección de datos</h2>
      <p>
        El tratamiento de los datos personales de los usuarios se rige por nuestra{" "}
        <a href="/privacidad">Política de Privacidad</a> y por nuestra{" "}
        <a href="/cookies">Política de Cookies</a>.
      </p>

      <h2>7. Legislación aplicable y jurisdicción</h2>
      <p>
        Este Aviso Legal se rige por la legislación española. Para la resolución de cualquier
        controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a
        la normativa aplicable en materia de consumidores y usuarios.
      </p>

      <h2>8. Modificaciones</h2>
      <p>
        El titular se reserva el derecho de modificar este Aviso Legal en cualquier momento. Las
        modificaciones entrarán en vigor desde su publicación en el sitio web.
      </p>
    </LegalShell>
  );
}

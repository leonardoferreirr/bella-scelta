import { LegalShell } from "../../components/Legal";
import { SITE } from "../../lib/site";

export const metadata = {
  title: "Contacto | Bella Scelta",
  description: "Ponte en contacto con el equipo de Bella Scelta. Te respondemos lo antes posible.",
};

export default function Page() {
  const wa = SITE.whatsapp
    ? `https://wa.me/${SITE.whatsapp}`
    : null;

  return (
    <LegalShell
      title="Contacto"
      updated={false}
      subtitle="¿Tienes una pregunta sobre tu pedido o sobre un producto? Estamos aquí para ayudarte."
    >
      <div className="contact">
        <div className="contact__card">
          <h3>Correo electrónico</h3>
          <p>La forma más rápida de llegar a nosotros.</p>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>

        <div className="contact__card">
          <h3>WhatsApp</h3>
          {wa ? (
            <>
              <p>Escríbenos y te atendemos por mensaje.</p>
              <a href={wa} target="_blank" rel="noopener noreferrer">Abrir WhatsApp</a>
            </>
          ) : (
            <p>[Añade aquí tu número de WhatsApp en lib/site.js para activar este canal.]</p>
          )}
        </div>

        <div className="contact__card">
          <h3>Horario de atención</h3>
          <p>{SITE.hours}.</p>
          <p>Tiempo de respuesta: {SITE.responseTime}.</p>
        </div>
      </div>

      <h2>Antes de escribirnos</h2>
      <p>
        Puede que encuentres la respuesta más rápido en nuestra página de{" "}
        <a href="/envios">Envíos y entregas</a>, donde explicamos plazos, seguimiento y devoluciones.
      </p>
    </LegalShell>
  );
}

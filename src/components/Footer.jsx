import { CalendarPlus } from "lucide-react";

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    focusable="false"
    viewBox="0 0 12 12"
  >
    <path
      fill="currentColor"
      d="M6 0a6 6 0 11-3.002 11.196l-2.34.778a.5.5 0 01-.632-.632l.779-2.339A6 6 0 016 0zm0 1a5 5 0 00-4.226 7.674.5.5 0 01.053.426l-.537 1.61 1.611-.536a.5.5 0 01.426.052A5 5 0 106 1zM3.93 3.003c.099 0 .197 0 .282.004.09.006.212-.038.333.272.123.319.418 1.104.455 1.183.037.078.062.172.013.278-.05.107-.075.173-.148.264-.074.094-.155.209-.222.28-.074.079-.15.164-.064.324.085.158.382.68.821 1.101.564.543 1.04.712 1.188.791.147.08.234.064.319-.04.086-.105.368-.464.467-.624.098-.158.197-.133.332-.079.135.053.862.437 1.009.516.148.081.247.121.283.188.038.066.038.385-.085.755-.123.373-.712.712-.996.757a1.91 1.91 0 01-.931-.064 7.96 7.96 0 01-.84-.335c-1.482-.69-2.45-2.296-2.523-2.4-.074-.106-.603-.863-.603-1.646 0-.782.38-1.167.516-1.325.135-.16.296-.2.394-.2z"
    />
  </svg>
);

const SupportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle
      cx="17.5"
      cy="6.5"
      r="0.5"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
);

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 3v10.2a4.2 4.2 0 1 1-4-4.2" />
    <path d="M14 3c.7 2.2 2.1 3.7 4 4.2" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="main-footer main-footer-compact">
      <div className="footer-container">
        <div className="footer-header">
          <img
            src="/logo.svg"
            alt="Rumba77"
            loading="lazy"
            className="footer-logo-img"
          />
          <h3 className="footer-slogan">¡Haz tu evento inolvidable!</h3>
          <a
            href="https://rumba77.com/crear-evento-gratis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary footer-cta"
          >
            <CalendarPlus size={18} strokeWidth={2.2} aria-hidden="true" />
            Crea tu evento gratis
          </a>
        </div>

        <div className="footer-content">
          <div className="footer-section">
            <h4>Centro de Ayuda</h4>
            <div className="footer-item">
              <MailIcon />
              <a href="mailto:hola@rumba77.com">hola@rumba77.com</a>
            </div>
            <div className="footer-item">
              <WhatsAppIcon />
              <a
                href="https://wa.me/51999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                Envíanos un WhatsApp
              </a>
            </div>
            <div className="footer-item">
              <FacebookIcon />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Síguenos en Facebook
              </a>
            </div>
            <div className="footer-item">
              <InstagramIcon />
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Síguenos en Instagram
              </a>
            </div>
            <div className="footer-item">
              <TikTokIcon />
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Síguenos en TikTok
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Legales</h4>
            <div className="footer-legal-links">
              <a href="/terminos-y-condiciones">Términos y condiciones</a>
              <a href="/politicas-de-privacidad">Políticas de privacidad</a>
            </div>
            <a
              href="/libro-reclamaciones"
              className="libro-reclamaciones-link"
              style={{
                display: "inline-block",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                transition: "transform 0.2s",
                marginTop: "16px",
                alignSelf: "flex-start",
              }}
            >
              <img
                src="https://www.munisanjeronimocusco.gob.pe/wp-content/uploads/2023/07/libro-de-reclamaciones.jpg.webp"
                alt="Libro de Reclamaciones"
                style={{ width: "130px", display: "block" }}
              />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Rumba77. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

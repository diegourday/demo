import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';

function InfoSvgIcon({ name }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.35',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'bag') {
    return (
      <svg {...props}>
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    );
  }

  if (name === 'kids') {
    return (
      <svg {...props}>
        <circle cx="8" cy="9" r="2.2" />
        <circle cx="16" cy="9" r="2.2" />
        <path d="M5.5 18c.5-2.7 2-4 4.5-4s4 1.3 4.5 4" />
        <path d="M13.5 18c.4-2 1.6-3.2 3.5-3.2 1.2 0 2.2.5 2.9 1.6" />
      </svg>
    );
  }

  if (name === 'shirt') {
    return (
      <svg {...props}>
        <path d="M8 5 12 7l4-2 3 3-2 3v8H7v-8L5 8l3-3Z" />
        <path d="M10 7h4" />
      </svg>
    );
  }

  if (name === 'gamepad') {
    return (
      <svg {...props}>
        <path d="M7 14h10a3 3 0 0 1 3 3 2.5 2.5 0 0 1-4.3 1.8L14.8 17h-5.6l-1.9 1.8A2.5 2.5 0 0 1 3 17a3 3 0 0 1 4-3Z" />
        <path d="M9 13v-3" />
        <path d="M7.5 11.5h3" />
        <circle cx="16.8" cy="12.8" r="0.8" />
        <circle cx="18.8" cy="14.8" r="0.8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M8 6h8" />
      <path d="M9 6v-1.2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6" />
      <path d="M6.5 9.5h11l-1 10h-9l-1-10Z" />
      <path d="M9.5 12h5" />
    </svg>
  );
}

export default function Inicio() {
  const navigate = useNavigate();
  const { completed, markComplete } = useProgress();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (completed.inicio) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markComplete('inicio');
        }
      },
      { threshold: 0.5 }
    );
    if (bottomRef.current) observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [completed.inicio, markComplete]);

  return (
    <div className="page-content">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-emoji">🐭</div>
          <p className="hero-subtitle">Mi primer añito</p>
          <h2>Joe Mateo</h2>
          <p className="hero-extra">Faltan</p>
          <div className="countdown">
            <div className="countdown-item">
              <span>15</span>
              <small>Días</small>
            </div>
            <div className="countdown-item">
              <span>12</span>
              <small>Horas</small>
            </div>
            <div className="countdown-item">
              <span>34</span>
              <small>Min</small>
            </div>
            <div className="countdown-item">
              <span>56</span>
              <small>Seg</small>
            </div>
          </div>
        </div>
      </section>

      <section className="section invite-section">
        <h2 className="section-title">Te invitamos</h2>
        <div className="invite-card">
          <div className="invite-photo" aria-label="Foto de invitación" role="img">
            <span>Foto</span>
          </div>
          <p className="section-text">
            Un día lleno de risas y diversión.
            Nuestro pequeño cumple su primer añito y
            queremos compartir esta gran alegría
            contigo. 🎈🎁🎂
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Celebración</h2>
        <div className="celebration-chips">
          <div className="celebration-chip">
            <span className="chip-icon">📅</span>
            <strong>Día</strong>
            <p>Sábado, 15 de Marzo 2025</p>
          </div>
          <div className="celebration-chip">
            <span className="chip-icon">🕐</span>
            <strong>Hora</strong>
            <p>4:00 PM</p>
          </div>
          <div className="celebration-chip">
            <span className="chip-icon">📍</span>
            <strong>Dirección</strong>
            <p>Salón Las Estrellas, Av. Principal 123</p>
          </div>
        </div>

        <div className="map-placeholder">
          📍 Mapa de ubicación
        </div>

        <div className="map-buttons-center">
          <a href="https://www.google.com/maps/search/Salón+Las+Estrellas+Av+Principal+123" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">📍 Cómo llegar</a>
          <a href="https://waze.com/ul?q=Salón+Las+Estrellas+Av+Principal+123" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">🗺️ Waze</a>
        </div>

        <button className="btn btn-calendar">
          📅 Agendar en calendario
        </button>
      </section>

      <section className="section">
        <div className="itinerary-top-cta">
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/regalos')}>
            🎁 Lista de regalos
          </button>
        </div>
        <h2 className="section-title">Itinerario</h2>
        <div className="itinerary-list">
          <div className="itinerary-item">
            <div className="itinerary-time">04:00 pm</div>
            <div className="itinerary-icon">✦</div>
            <div className="itinerary-content">
              <h4>Inicio</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">04:00 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Caritas pintadas</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">05:00 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Show infantil</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">06:30 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Feliz cumpleaños</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">08:00 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Entrada del Rey</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">08:20 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Corte de pelo</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">08:40 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Juegos divertidos para los grandes</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">09:30 pm</div>
            <div className="itinerary-icon">◎</div>
            <div className="itinerary-content">
              <h4>Cena</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-time">10:30 pm</div>
            <div className="itinerary-icon">✓</div>
            <div className="itinerary-content">
              <h4>Y sigue la fiesta...</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Más información</h2>
        <div className="info-scroll">
          <div className="info-card-new">
            <div className="info-card-icon"><InfoSvgIcon name="bag" /></div>
            <span>Recuerditos</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon"><InfoSvgIcon name="kids" /></div>
            <span>Juegos Infantiles</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon"><InfoSvgIcon name="shirt" /></div>
            <span>Dress Code</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon"><InfoSvgIcon name="gamepad" /></div>
            <span>Juegos grandes</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon"><InfoSvgIcon name="drink" /></div>
            <span>Barra Libre</span>
          </div>
        </div>
      </section>

      <section className="section family-section">
        <h2 className="section-title">Familia</h2>
        <div className="family-group">
          <h3 className="family-label">Padres</h3>
          <div className="family-names">
            <p>👩 Jhonatan Echevarría</p>
            <p>👨 Karenn Hernández</p>
          </div>
        </div>
        <div className="family-divider"></div>
        <div className="family-group">
          <h3 className="family-label">Padrinos</h3>
          <div className="family-names">
            <p>👩 Beatriz Flores</p>
            <p>👨 Andrés Hernández</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Fotos</h2>
        <div className="photo-grid">
          <div className="photo-item">📸</div>
          <div className="photo-item">🖼️</div>
          <div className="photo-item">📷</div>
          <div className="photo-item">🎞️</div>
          <div className="photo-item">🌄</div>
          <div className="photo-item">📸</div>
          <div className="photo-item">🖼️</div>
          <div className="photo-item">📷</div>
          <div className="photo-item">🎞️</div>
        </div>
      </section>

      <div ref={bottomRef} style={{ height: 1 }} />
    </div>
  );
}

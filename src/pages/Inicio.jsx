import { useEffect, useRef, useState } from 'react';
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

function CelebrationSvgIcon({ name }) {
  const props = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'calendar_month') {
    return (
      <svg {...props}>
        <rect x="4" y="5" width="16" height="15" rx="3" />
        <path d="M8 3v4" />
        <path d="M16 3v4" />
        <path d="M4 9h16" />
      </svg>
    );
  }

  if (name === 'alarm') {
    return (
      <svg {...props}>
        <circle cx="12" cy="13" r="6.5" />
        <path d="M12 10.5V13l2 1.2" />
        <path d="M7.5 4.8 5 3" />
        <path d="M16.5 4.8 19 3" />
        <path d="M8 18.5 6.3 20" />
        <path d="M16 18.5 17.7 20" />
      </svg>
    );
  }

  if (name === 'location_on') {
    return (
      <svg {...props}>
        <path d="M12 21s5.5-4.6 5.5-10A5.5 5.5 0 0 0 12 5.5 5.5 5.5 0 0 0 6.5 11c0 5.4 5.5 10 5.5 10Z" />
        <circle cx="12" cy="11" r="2.2" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M4 12h16" />
      <path d="M12 4v16" />
    </svg>
  );
}

function ItinerarySvgIcon({ name }) {
  const props = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2.4',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'inicio') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.9" />
        <path d="M7.5 9.5A4.7 4.7 0 0 1 12 6.7a4.7 4.7 0 0 1 4.5 2.8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8.2 13.5c1 .7 2.3 1.2 3.8 1.2s2.8-.4 3.8-1.2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 10.5h.01M14 10.5h.01" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'caritas') {
    return (
      <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path d="M18 26c2.8-6.5 8.3-10 14-10s11.2 3.5 14 10" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 42c3.5 3 7.3 4.5 12 4.5S40.5 45 44 42" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="25" cy="31" r="1.8" fill="currentColor" />
        <circle cx="39" cy="31" r="1.8" fill="currentColor" />
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'show') {
    return (
      <svg {...props}>
        <rect x="14" y="14" width="36" height="30" rx="2" />
        <path d="M20 44V18h24v26" />
        <path d="M20 27h24" />
        <path d="M28 44l4-8 4 8" />
        <path d="M28 24l4 4 4-4" />
        <path d="M18 18l4 4" />
        <path d="M46 18l-4 4" />
      </svg>
    );
  }

  if (name === 'cake') {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 11h16v8H4z" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M7 11V7.5A5 5 0 0 1 12 3a5 5 0 0 1 5 4.5V11" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 11V3" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M8 16h8" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M9 11c0 1.1-.9 2-2 2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M15 11c0 1.1.9 2 2 2" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === 'king') {
    return (
      <svg {...props}>
        <path d="M14 44h36" />
        <path d="M18 44V28l8 7 6-12 6 12 8-7v16" />
        <path d="M18 28l6 6" />
        <path d="M46 28l-6 6" />
        <path d="M24 22l8 6 8-6" />
        <path d="M28 20h8" />
        <path d="M32 16l2 4-2 2-2-2z" />
        <circle cx="32" cy="26" r="2" />
      </svg>
    );
  }

  if (name === 'haircut') {
    return (
      <svg {...props}>
        <path d="M18 42c2.5-7.5 7.2-11.5 14-11.5S43.5 34.5 46 42" />
        <circle cx="32" cy="24" r="10" />
        <path d="M24 21c1.2 1.2 3 1.9 5.1 1.9s3.8-.7 5.1-1.9" />
        <path d="M42 16l6-6" />
        <path d="M40 18l8-8" />
        <path d="M45 12l3 3" />
        <path d="M21 28c1.7 2 3.8 3 6.1 3s4.4-1 6.1-3" />
      </svg>
    );
  }

  if (name === 'games') {
    return (
      <svg {...props}>
        <path d="M16 40c2-10 6-16 16-16s14 6 16 16" />
        <path d="M20 24c0 7 4 14 12 14s12-7 12-14" />
        <path d="M22 24l-4-6" />
        <path d="M42 24l4-6" />
        <circle cx="24" cy="30" r="1.4" />
        <circle cx="40" cy="30" r="1.4" />
        <path d="M30 34h4" />
        <path d="M24 40l4-4" />
        <path d="M40 40l-4-4" />
      </svg>
    );
  }

  if (name === 'dinner') {
    return (
      <svg {...props}>
        <path d="M16 18v28" />
        <path d="M20 18v28" />
        <path d="M16 22h4" />
        <path d="M24 18v28" />
        <path d="M28 18v28" />
        <path d="M24 28h4" />
        <circle cx="42" cy="31" r="12" />
        <path d="M42 19a12 12 0 0 1 0 24" />
        <path d="M42 27v4l3 3" />
      </svg>
    );
  }

  if (name === 'party') {
    return (
      <svg {...props}>
        <circle cx="32" cy="34" r="12" />
        <path d="M32 22v24" />
        <path d="M20 34h24" />
        <path d="M24 26l-4-8" />
        <path d="M40 26l4-8" />
        <path d="M24 42l-4 8" />
        <path d="M40 42l4 8" />
        <path d="M26 30l-4-4" />
        <path d="M38 30l4-4" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="M16 32h32" />
    </svg>
  );
}

const itineraryItems = [
  { time: '04:00 pm', label: 'Inicio', icon: 'inicio' },
  { time: '04:00 pm', label: 'Caritas pintadas', icon: 'caritas' },
  { time: '05:00 pm', label: 'Show infantil', icon: 'show' },
  { time: '06:30 pm', label: 'Feliz cumpleaños', icon: 'cake' },
  { time: '08:00 pm', label: 'Entrada del Rey', icon: 'king' },
  { time: '08:20 pm', label: 'Corte de pelo', icon: 'haircut' },
  { time: '08:40 pm', label: 'Juegos divertidos para los grandes', icon: 'games' },
  { time: '09:30 pm', label: 'Cena', icon: 'dinner' },
  { time: '10:30 pm', label: 'Y sigue la fiesta...', icon: 'party' },
];

const familyGroups = [
  {
    role: 'Padres',
    names: ['Jhonatan Echevarría', 'Karenn Hernández'],
  },
  {
    role: 'Padrinos',
    names: ['Beatriz Flores', 'Andrés Hernández'],
  },
];

const photoItems = [
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4351_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4357_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4352_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4356_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4353_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4350_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4354_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4354_1767402982.jpg',
  'https://rumba77.s3.us-east-2.amazonaws.com/public/events/4355_1767402982.jpg',
];

export default function Inicio() {
  const { completed, markComplete } = useProgress();
  const bottomRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

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

      <section className="section invite-section" style={{ background: 'transparent' }}>
        <h2 className="section-title">Te invitamos</h2>
        <div className="invite-card">
          <img 
            src="https://rumba77.s3.us-east-2.amazonaws.com/public/events/profiles/435_1767402918.jpg" 
            alt="Foto de invitación" 
            className="invite-photo" 
          />
          <p className="section-text">
            👑🏰 ¡Un día lleno de risas y diversión! 🎉✨
            Nuestro pequeño cumple su primer añito y
            queremos compartir esta gran alegría
            contigo. 🎈🎂🏰
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Celebración</h2>
        <div className="celebration-chips">
          <div className="celebration-chip">
            <span className="chip-icon"><CelebrationSvgIcon name="calendar_month" /></span>
            <strong>Día</strong>
            <p>Martes 31 de marzo</p>
          </div>
          <div className="celebration-chip">
            <span className="chip-icon"><CelebrationSvgIcon name="alarm" /></span>
            <strong>Hora</strong>
            <p>04:00 pm</p>
          </div>
          <div className="celebration-chip">
            <span className="chip-icon"><CelebrationSvgIcon name="location_on" /></span>
            <strong>Dirección</strong>
            <p>Local Redenk, San Luis - Cañete</p>
          </div>
        </div>

        <div className="map-embed">
          <iframe
            title="Mapa de ubicación"
            src="https://www.google.com/maps?q=-13.056473,-76.42911&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="map-buttons-center">
          <a href="https://www.google.com/maps?q=-13.056473,-76.42911&z=15" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-map">
            <span className="btn-icon" aria-hidden="true">
              <img className="btn-logo" src="https://rumba77.com/img/system_icons/google-maps.svg" alt="" />
            </span>
            Google Maps
          </a>
          <a href="https://waze.com/ul?q=-13.056473,-76.42911" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-map">
            <span className="btn-icon" aria-hidden="true">
              <img className="btn-logo" src="https://rumba77.com/img/system_icons/waze.svg" alt="" />
            </span>
            Waze
          </a>
        </div>

        <button className="btn btn-calendar btn-calendar-large">
          <span className="btn-icon"><CelebrationSvgIcon name="calendar_month" /></span>
          Agendar en calendario
        </button>
      </section>

      <section className="section">
        <h2 className="section-title">Itinerario</h2>
        <div className="itinerary-list">
          {itineraryItems.map((item, index) => (
            <div key={item.label} className="itinerary-item">
              <div className={`itinerary-icon-wrapper ${index === 0 ? 'first' : ''} ${index === itineraryItems.length - 1 ? 'last' : ''}`}>
                <div className="itinerary-icon">
                  <ItinerarySvgIcon name={item.icon} />
                </div>
              </div>
              <div className={`itinerary-dot ${index === 0 ? 'first' : ''} ${index === itineraryItems.length - 1 ? 'last' : ''}`} />
              <div className="itinerary-content">
                <span className="itinerary-time">{item.time}</span>
                <span className="itinerary-activity">{item.label}</span>
              </div>
            </div>
          ))}
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
        <div className="family-grid">
          {familyGroups.map((group) => (
            <article key={group.role} className="family-card">
              <div className="family-card-header">
                <span className="family-badge">{group.role}</span>
              </div>
              <div className="family-names">
                {group.names.map((name) => (
                  <p key={name}>{name}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Fotos</h2>
        <div className="photo-grid masonry-grid">
          {photoItems.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className="photo-item"
              onClick={() => setSelectedPhoto(src)}
              style={{ aspectRatio: index % 3 === 0 ? '0.88' : index % 3 === 1 ? '1.08' : '0.78' }}
            >
              <img src={src} alt={`Foto ${index + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {selectedPhoto && (
        <div className="photo-modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="photo-modal-close" onClick={() => setSelectedPhoto(null)}>
              ✕
            </button>
            <img src={selectedPhoto} alt="Foto ampliada" className="photo-modal-image" />
          </div>
        </div>
      )}

      <div ref={bottomRef} style={{ height: 1 }} />
    </div>
  );
}

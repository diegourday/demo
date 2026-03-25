import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useProgress } from '../context/ProgressContext';

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
        <div className="invite-badge">🎉</div>
        <h2 className="section-title">Te invitamos</h2>
        <p className="section-text">
          Un día lleno de risas y diversión.
          Nuestro pequeño cumple su primer añito y
          queremos compartir esta gran alegría
          contigo. 🎈🎁🎂
        </p>
      </section>

      <section className="section">
        <div className="celebration-emoji-header">👑</div>
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
        <h2 className="section-title">Itinerario</h2>
        <div className="itinerary-list">
          <div className="itinerary-item">
            <div className="itinerary-icon">🎉</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">2:00 PM</span>
              <h4>Inicio</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🎨</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">3:00 PM</span>
              <h4>Castillos Inflables</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🎭</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">4:00 PM</span>
              <h4>Show Infantil</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🎂</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">5:00 PM</span>
              <h4>Feliz cumpleaños</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">👑</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">5:30 PM</span>
              <h4>Entrada del Rey</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🍰</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">6:00 PM</span>
              <h4>Corte de pastel</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🎮</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">6:30 PM</span>
              <h4>Juegos divertidos para los grandes</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🍽️</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">7:15 PM</span>
              <h4>Cena</h4>
            </div>
          </div>
          <div className="itinerary-item">
            <div className="itinerary-icon">🎊</div>
            <div className="itinerary-detail">
              <span className="itinerary-time">9:30 PM</span>
              <h4>Y sigue la fiesta...</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Más información</h2>
        <div className="info-scroll">
          <div className="info-card-new">
            <div className="info-card-icon">🎒</div>
            <span>Recuerditos</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon">🎠</div>
            <span>Juegos Infantiles</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon">👔</div>
            <span>Dress Code</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon">🎮</div>
            <span>Juegos grandes</span>
          </div>
          <div className="info-card-new">
            <div className="info-card-icon">🍺</div>
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

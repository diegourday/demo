import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

const tabs = [
  { path: '/', key: 'inicio', icon: '🏠', label: 'Inicio' },
  { path: '/asistencia', key: 'asistencia', icon: '✅', label: 'Asistencia' },
  { path: '/regalos', key: 'regalos', icon: '🎁', label: 'Regalo' },
  { path: '/dedicatorias', key: 'dedicatorias', icon: '💌', label: 'Dedicatoria' },
  { path: '/juego', key: 'juego', icon: '🎮', label: 'Juego' },
];

const helpSteps = [
  { icon: '🏠', label: 'Inicio', desc: 'Desplázate hasta el final de la página para completarlo.' },
  { icon: '✅', label: 'Asistencia', desc: 'Llena y envía el formulario de confirmación.' },
  { icon: '🎁', label: 'Regalo', desc: 'Elige y reserva un regalo de la lista.' },
  { icon: '💌', label: 'Dedicatoria', desc: 'Escribe y publica un mensaje para Joe Mateo.' },
  { icon: '🎮', label: 'Juego', desc: 'Participa en el juego y presiona "Listo".' },
];

export default function TabBar() {
  const { completed, completedCount, totalSteps } = useProgress();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <div className="tab-bar-wrapper">
        <div className="progress-section">
          <div className="progress-bar-container">
            <span className="progress-bar-label">Progreso</span>
            <div className="progress-bar-right">
              <span className="progress-bar-count">{completedCount}/{totalSteps}</span>
              <button className="progress-help-btn" onClick={() => setShowHelp(true)} aria-label="Ayuda">?</button>
            </div>
          </div>
          <div className="progress-bar-track-wrapper">
            {tabs.map((tab) => (
              <div
                key={tab.key}
                className={`progress-segment ${completed[tab.key] ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
        <nav className="tab-bar">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `tab-item ${isActive ? 'active' : ''} ${completed[tab.key] ? 'completed' : ''}`
              }
              end={tab.path === '/'}
            >
              <div className="tab-icon-wrapper">
                <span className="tab-icon">{tab.icon}</span>
                {completed[tab.key] && (
                  <span className="tab-check">✓</span>
                )}
              </div>
              <span>{tab.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {showHelp && (
        <div className="help-modal-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-modal" onClick={(e) => e.stopPropagation()}>
            <div className="help-modal-header">
              <h3>¿Cómo completar el 100%?</h3>
              <button className="help-modal-close" onClick={() => setShowHelp(false)}>✕</button>
            </div>
            <p className="help-modal-subtitle">Completa cada sección para llenar la barra de progreso:</p>
            <div className="help-steps-list">
              {helpSteps.map((step, i) => (
                <div key={i} className={`help-step-item ${completed[tabs[i].key] ? 'done' : ''}`}>
                  <div className="help-step-icon">
                    {completed[tabs[i].key] ? '✅' : step.icon}
                  </div>
                  <div className="help-step-info">
                    <strong>{step.label}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setShowHelp(false)}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}

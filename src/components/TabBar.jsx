import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';

const tabs = [
  { path: '/', key: 'inicio', icon: 'home', label: 'Inicio' },
  { path: '/asistencia', key: 'asistencia', icon: 'check', label: 'Asistencia' },
  { path: '/regalos', key: 'regalos', icon: 'gift', label: 'Regalo' },
  { path: '/dedicatorias', key: 'dedicatorias', icon: 'message', label: 'Dedicatoria' },
  { path: '/juego', key: 'juego', icon: 'gamepad', label: 'Juego' },
];

const helpSteps = [
  { icon: 'home', key: 'inicio', label: 'Inicio', desc: 'Desplázate hasta el final de la invitación para completar este paso.' },
  { icon: 'check', key: 'asistencia', label: 'Asistencia', desc: 'Llena y envía el formulario de confirmación.' },
  { icon: 'gift', key: 'regalos', label: 'Regalo', desc: 'Elige y reserva un regalo de la lista.' },
  { icon: 'message', key: 'dedicatorias', label: 'Dedicatoria', desc: 'Escribe y publica un mensaje para Joe Mateo.' },
  { icon: 'gamepad', key: 'juego', label: 'Juego', desc: 'Participa en el juego y presiona "Listo".' },
];

function TabSvgIcon({ name }) {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  if (name === 'home') {
    return (
      <svg {...commonProps}>
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V20h14V9.5" />
      </svg>
    );
  }

  if (name === 'check') {
    return (
      <svg {...commonProps}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M8 12l2.5 2.5L16 9" />
      </svg>
    );
  }

  if (name === 'gift') {
    return (
      <svg {...commonProps}>
        <path d="M3 9h18v4H3z" />
        <path d="M5 13h14v8H5z" />
        <path d="M12 9v12" />
        <path d="M8.5 9s-2.5 0-2.5-2.2C6 5.4 7 5 7.8 5c1.7 0 4.2 4 4.2 4" />
        <path d="M15.5 9s2.5 0 2.5-2.2c0-1.4-1-1.8-1.8-1.8-1.7 0-4.2 4-4.2 4" />
      </svg>
    );
  }

  if (name === 'message') {
    return (
      <svg {...commonProps}>
        <path d="M4 5h16v11H8l-4 3V5z" />
        <path d="M8 9h8" />
        <path d="M8 12h6" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M6 12l3-3h6l3 3" />
      <path d="M6 12l-1 4a2 2 0 002 2h1l2-3h4l2 3h1a2 2 0 002-2l-1-4" />
      <path d="M9 9l1-2h4l1 2" />
    </svg>
  );
}

export default function TabBar() {
  const { completed, completedCount, totalSteps } = useProgress();
  const [showHelp, setShowHelp] = useState(false);
  const navigate = useNavigate();
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <>
      <div className="tab-bar-wrapper">
        <div className="progress-section">
          <div className="progress-bar-container">
            <span className="progress-bar-label">Progreso</span>
            <div className="progress-bar-right">
              <span className="progress-bar-count">{progressPercent}%</span>
              <button className="progress-help-btn" onClick={() => setShowHelp(true)} aria-label="Ayuda">?</button>
            </div>
          </div>
          <div className="progress-bar-track-wrapper">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
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
                <span className="tab-icon"><TabSvgIcon name={tab.icon} /></span>
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
            <p className="help-modal-subtitle">Acceso rápido y estado de cada paso para completar toda la invitación:</p>
            <div className="help-steps-list">
              {helpSteps.map((step) => (
                <div key={step.key} className={`help-step-item ${completed[step.key] ? 'done' : ''}`}>
                  <div className="help-step-icon">
                    {completed[step.key] ? '✓' : <TabSvgIcon name={step.icon} />}
                  </div>
                  <div className="help-step-info">
                    <strong>{step.label}</strong>
                    <p>{step.desc}</p>
                  </div>
                  <div className="help-step-actions">
                    <span className={`help-step-status ${completed[step.key] ? 'done' : 'pending'}`}>
                      {completed[step.key] ? 'Completado' : 'Pendiente'}
                    </span>
                    <button
                      className="help-step-go"
                      onClick={() => {
                        setShowHelp(false);
                        navigate(tabs.find((tab) => tab.key === step.key)?.path || '/');
                      }}
                    >
                      Ir
                    </button>
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

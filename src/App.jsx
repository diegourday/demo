import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import TabBar from './components/TabBar';
import Inicio from './pages/Inicio';
import Asistencia from './pages/Asistencia';
import Dedicatorias from './pages/Dedicatorias';
import Juego from './pages/Juego';
import Regalos from './pages/Regalos';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const STEP_ROUTE = {
  inicio: '/',
  asistencia: '/asistencia',
  regalos: '/regalos',
  dedicatorias: '/dedicatorias',
  juego: '/juego',
};

function CongratsModal() {
  const { showCongrats, setShowCongrats } = useProgress();

  useEffect(() => {
    if (showCongrats) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => document.body.classList.remove('modal-open');
  }, [showCongrats]);

  if (!showCongrats) return null;

  return (
    <div className="modal-overlay" onClick={() => setShowCongrats(false)}>
      <div className="congrats-modal" onClick={(e) => e.stopPropagation()}>
        <div className="congrats-emoji">🎉</div>
        <h2>¡Invitación completada!</h2>
        <p>
          Has completado todos los pasos de la invitación. ¿Te gustó la invitación?
          Tú también puedes hacer una.
        </p>
        <button
          className="btn btn-primary congrats-create-btn"
          onClick={() => window.open('https://rumba77.com', '_blank', 'noopener,noreferrer')}
        >
          Crear invitación
        </button>
        <button className="btn btn-outline congrats-close-btn" onClick={() => setShowCongrats(false)}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

function NextStepsModal() {
  const { nextStepsModal, closeNextStepsModal, stepMeta } = useProgress();
  const navigate = useNavigate();

  if (!nextStepsModal.open) return null;

  return (
    <div className="modal-overlay" onClick={closeNextStepsModal}>
      <div className="next-steps-modal" onClick={(e) => e.stopPropagation()}>
        <div className="next-steps-header">
          <h3>¡Paso completado!</h3>
          <button className="help-modal-close" onClick={closeNextStepsModal}>✕</button>
        </div>
        <p className="next-steps-subtitle">
          Completaste <strong>{stepMeta[nextStepsModal.completedStep]?.label}</strong>. Te faltan {nextStepsModal.remainingSteps.length} pasos para llegar al 100%.
        </p>
        <div className="next-steps-list">
          {nextStepsModal.remainingSteps.map((step) => (
            <button
              key={step}
              className="next-step-btn"
              onClick={() => {
                closeNextStepsModal();
                navigate(STEP_ROUTE[step]);
              }}
            >
              <span>{stepMeta[step]?.label}</span>
              <span>Ir</span>
            </button>
          ))}
        </div>
        <button className="btn btn-primary" onClick={closeNextStepsModal}>Continuar luego</button>
      </div>
    </div>
  );
}

function CompletionToast() {
  const { completionToast, closeCompletionToast } = useProgress();

  useEffect(() => {
    if (!completionToast.open) return;
    const timer = setTimeout(() => closeCompletionToast(), 2800);
    return () => clearTimeout(timer);
  }, [completionToast.open, closeCompletionToast]);

  if (!completionToast.open) return null;

  return <div className="success-toast">{completionToast.message}</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ProgressProvider>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/asistencia" element={<Asistencia />} />
            <Route path="/dedicatorias" element={<Dedicatorias />} />
            <Route path="/juego" element={<Juego />} />
            <Route path="/regalos" element={<Regalos />} />
          </Routes>
          <TabBar />
          <CompletionToast />
          <NextStepsModal />
          <CongratsModal />
        </div>
      </ProgressProvider>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProgressProvider, useProgress } from './context/ProgressContext';
import TabBar from './components/TabBar';
import Inicio from './pages/Inicio';
import Asistencia from './pages/Asistencia';
import Dedicatorias from './pages/Dedicatorias';
import Juego from './pages/Juego';
import Regalos from './pages/Regalos';
import { useEffect } from 'react';

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
        <h2>¡Felicitaciones!</h2>
        <p>Has completado todos los pasos de la invitación. ¡Te esperamos con mucha alegría en la fiesta de Joe Mateo!</p>
        <div className="congrats-icons">🎂🎈🎁🎊</div>
        <button className="btn btn-primary" onClick={() => setShowCongrats(false)}>
          ¡Genial!
        </button>
      </div>
    </div>
  );
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
          <CongratsModal />
        </div>
      </ProgressProvider>
    </BrowserRouter>
  );
}

import { useProgress } from "../context/ProgressContext";
import { useNavigate } from "react-router-dom";

export default function Juego() {
  const { completed, markComplete, showStepSuccessToast } = useProgress();
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <div className="juego-page">
        <div className="juego-emoji">🎮</div>
        <h2 className="section-title">Juego</h2>
        <p className="section-text">
          Próximamente... ¡Prepárate para divertirte con un juego interactivo!
        </p>
        {completed.juego ? (
          <>
            <div className="completion-inline">
              <span>✅</span> ¡Listo! Ya revisaste esta sección
            </div>
            <button
              className="btn btn-primary completion-action-btn"
              onClick={() => navigate("/")}
            >
              Entendido
            </button>
          </>
        ) : (
          <button
            className="btn btn-primary"
            style={{ marginTop: 24 }}
            onClick={() => {
              showStepSuccessToast("juego");
              markComplete("juego");
            }}
          >
            ✅ Listo
          </button>
        )}
      </div>
    </div>
  );
}

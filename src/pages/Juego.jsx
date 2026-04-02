import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Badge,
  Camera,
  Check,
  Clock,
  Gift,
  Image,
  MapPin,
  Sparkles,
  Trophy,
  Upload,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

const BASE_SCORE = 110;

const RANKING_PLAYERS = [
  { id: "carlos", name: "Carlos Rojas", role: "Invitado", points: 90 },
  { id: "maria", name: "María López", role: "Invitada", points: 80 },
  { id: "sofia", name: "Sofía Torres", role: "Invitada", points: 70 },
];

const BONUS_STEPS = {
  inicio: {
    label: "Completar inicio",
    description: "Vuelve a la portada y revisa todos los detalles del evento.",
    points: 20,
    route: "/",
    icon: Users,
  },
  asistencia: {
    label: "Confirmar asistencia",
    description: "Confirma tu asistencia para sumar puntos extra.",
    points: 20,
    route: "/asistencia",
    icon: Check,
  },
  regalos: {
    label: "Reservar un regalo",
    description: "Elige un regalo disponible y suma puntos.",
    points: 20,
    route: "/regalos",
    icon: Gift,
  },
  dedicatorias: {
    label: "Dejar dedicatoria",
    description: "Escribe un mensaje bonito para la familia.",
    points: 20,
    route: "/dedicatorias",
    icon: Sparkles,
  },
};

const QUESTIONS = [
  {
    id: 1,
    icon: Camera,
    title: "¿A qué hora nació Joe Mateo?",
    options: ["10:45 AM", "02:30 PM", "06:15 AM", "11:00 PM"],
    correctIndex: 1,
    explanation: "Joe Mateo nació a las 02:30 PM.",
  },
  {
    id: 2,
    icon: MapPin,
    title: "¿Dónde será la celebración?",
    options: [
      "Parque de la ciudad",
      "Casa de los abuelos",
      "Local Redenk, San Luis - Cañete",
      "Club privado",
    ],
    correctIndex: 2,
    explanation: "La celebración será en Local Redenk, San Luis - Cañete.",
  },
  {
    id: 3,
    icon: Trophy,
    title: "¿Qué celebración es este evento?",
    options: [
      "Primer añito de Joe Mateo",
      "Cumpleaños de mamá",
      "Bautizo de familia",
      "Fiesta de fin de año",
    ],
    correctIndex: 0,
    explanation: "Cada respuesta correcta suma 20 puntos.",
  },
];

function ProfileAvatar({ name, photo }) {
  if (photo) {
    return <img src={photo} alt={name} className="juego-avatar-preview" />;
  }

  return (
    <div className="juego-avatar-placeholder" aria-hidden="true">
      <User size={34} strokeWidth={2} />
    </div>
  );
}

function RankingRow({ rank, name, role, points, highlighted, photo }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <article className={`juego-rank-item ${highlighted ? "highlighted" : ""}`}>
      <div className="juego-rank-position">#{rank}</div>
      <div className="juego-rank-avatar">
        {photo ? <img src={photo} alt={name} /> : <span>{initials}</span>}
      </div>
      <div className="juego-rank-meta">
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
      <div className="juego-rank-points">
        <strong>{points}</strong>
        <span>pts</span>
      </div>
    </article>
  );
}

export default function Juego() {
  const { completed, markComplete, showStepSuccessToast } = useProgress();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const gameCompletionHandledRef = useRef(false);

  const [stage, setStage] = useState("ranking");
  const [profileName, setProfileName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileError, setProfileError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [revealState, setRevealState] = useState(null);
  const [score, setScore] = useState(BASE_SCORE);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    return () => {
      if (profilePhoto?.startsWith("blob:")) {
        URL.revokeObjectURL(profilePhoto);
      }
    };
  }, [profilePhoto]);

  const playerDisplayName = profileName.trim() || "Ana Martínez";

  const bonusTasks = useMemo(
    () =>
      Object.entries(BONUS_STEPS)
        .filter(([step]) => !completed[step])
        .map(([step, meta]) => ({ step, ...meta })),
    [completed],
  );

  const rankingPlayers = useMemo(() => {
    const player = {
      id: "you",
      name: "Tú",
      role: playerDisplayName,
      points: score,
      highlighted: true,
      photo: profilePhoto || null,
    };

    return [player, ...RANKING_PLAYERS]
      .slice()
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [playerDisplayName, profilePhoto, score]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const QuestionIcon = currentQuestion.icon;
  const isQuizComplete = currentQuestionIndex === QUESTIONS.length - 1;
  const answered = revealState !== null;
  const currentProgress = currentQuestionIndex + 1;
  const totalQuestions = QUESTIONS.length;

  const handleProfileContinue = () => {
    if (!profileName.trim()) {
      setProfileError("Escribe tu nombre para continuar.");
      return;
    }

    setProfileError("");
    setStage("quiz");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (profilePhoto?.startsWith("blob:")) {
      URL.revokeObjectURL(profilePhoto);
    }

    const nextUrl = URL.createObjectURL(file);
    setProfilePhoto(nextUrl);
  };

  const handleSelectAnswer = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || answered) return;

    const isCorrect = selectedAnswer === currentQuestion.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 20);
      setCorrectCount((prev) => prev + 1);
    }

    setRevealState({
      selectedIndex: selectedAnswer,
      correctIndex: currentQuestion.correctIndex,
      isCorrect,
    });
  };

  const handleNextQuestion = () => {
    if (!answered) return;

    if (isQuizComplete) {
      setStage("result");
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setRevealState(null);
  };

  const handleFinish = () => {
    setStage("ranking");
  };

  const handleStartAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setRevealState(null);
    setProfileError("");
    gameCompletionHandledRef.current = false;
    setStage("profile");
  };

  useEffect(() => {
    if (stage !== "result" || gameCompletionHandledRef.current) return;

    gameCompletionHandledRef.current = true;
    showStepSuccessToast("juego");
    if (!completed.juego) {
      markComplete("juego");
    }
  }, [completed.juego, markComplete, showStepSuccessToast, stage]);

  return (
    <div className="page-content game-page-content">
      <div className="juego-page quiz-game-page">
        {stage === "ranking" && (
          <>
            <section className="juego-hero-card">
              <div className="juego-hero-badge">
                <Sparkles size={18} strokeWidth={2.2} />
                <span>Juego para invitados</span>
              </div>
              <div className="juego-hero-title">
                <Trophy size={28} strokeWidth={2.1} />
                <div>
                  <h2>Ranking de invitados</h2>
                  <p>Juega, suma puntos y escala posiciones.</p>
                </div>
              </div>
            </section>

            <section className="juego-ranking-card">
              <div className="juego-section-heading">
                <div>
                  <h3>Ranking</h3>
                  <p>Así van los invitados</p>
                </div>
                <Users size={18} strokeWidth={2.1} />
              </div>

              <div className="juego-ranking-list">
                {rankingPlayers.map((player) => (
                  <RankingRow key={player.id} {...player} />
                ))}
              </div>
            </section>

            <section className="juego-bonus-card">
              <div className="juego-section-heading">
                <div>
                  <h3>Suma puntos extra</h3>
                  <p>Completa lo que te falta y gana +20 pts por paso.</p>
                </div>
                <Badge size={18} strokeWidth={2.1} />
              </div>

              {bonusTasks.length > 0 ? (
                <div className="juego-bonus-list">
                  {bonusTasks.map((task) => {
                    const TaskIcon = task.icon;
                    return (
                      <article key={task.step} className="juego-bonus-item">
                        <div className="juego-bonus-icon">
                          <TaskIcon size={18} strokeWidth={2.2} />
                        </div>
                        <div className="juego-bonus-copy">
                          <strong>{task.label}</strong>
                          <p>{task.description}</p>
                        </div>
                        <button
                          type="button"
                          className="juego-bonus-action"
                          onClick={() => navigate(task.route)}
                        >
                          +20 pts
                        </button>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="juego-bonus-empty">
                  <Check size={18} strokeWidth={2.4} />
                  <span>Ya completaste todos los pasos extra.</span>
                </div>
              )}
            </section>

            <button
              type="button"
              className="btn btn-primary juego-main-cta"
              onClick={handleStartAgain}
            >
              Jugar ahora
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </>
        )}

        {stage === "profile" && (
          <section className="juego-profile-card">
            <div className="juego-profile-topbar">
              <button
                type="button"
                className="juego-icon-btn"
                onClick={() => setStage("ranking")}
                aria-label="Volver al ranking"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <div className="juego-profile-pill">
                <Sparkles size={14} strokeWidth={2.4} />
                <span>Crea tu perfil</span>
              </div>
              <button
                type="button"
                className="juego-icon-btn"
                onClick={() => setStage("ranking")}
                aria-label="Cerrar"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="juego-profile-hero">
              <div className="juego-profile-hero-icon">
                <Image size={28} strokeWidth={2.1} />
              </div>
              <h2>Crea tu perfil</h2>
              <p>Sube una foto y escribe tu nombre para entrar al juego.</p>
            </div>

            <div className="juego-avatar-uploader">
              <div className="juego-avatar-frame">
                <ProfileAvatar name={playerDisplayName} photo={profilePhoto} />
                <button
                  type="button"
                  className="juego-avatar-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={18} strokeWidth={2.3} />
                </button>
              </div>
              <button
                type="button"
                className="juego-text-link"
                onClick={() => fileInputRef.current?.click()}
              >
                Subir foto
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </div>

            <label className="juego-field">
              <span>Tu nombre</span>
              <div className="juego-input-wrap">
                <input
                  className="juego-input"
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  placeholder="Ana Martínez"
                />
              </div>
            </label>

            {profileError && <p className="juego-error">{profileError}</p>}

            <button
              type="button"
              className="btn btn-primary juego-main-cta profile-continue-btn"
              onClick={handleProfileContinue}
            >
              Continuar
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </section>
        )}

        {stage === "quiz" && (
          <section className="juego-quiz-card">
            <div className="juego-quiz-topbar">
              <button
                type="button"
                className="juego-icon-btn"
                onClick={() => setStage("profile")}
                aria-label="Volver al perfil"
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
              </button>
              <div className="juego-quiz-pill">
                Pregunta {currentProgress} de {totalQuestions}
              </div>
              <button
                type="button"
                className="juego-icon-btn"
                onClick={() => setStage("ranking")}
                aria-label="Cerrar juego"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="juego-question-card">
              <div className="juego-question-icon">
                <QuestionIcon size={30} strokeWidth={2.1} />
              </div>
              <h2>{currentQuestion.title}</h2>
              <div className="juego-question-meta">
                <span>
                  <Clock size={14} strokeWidth={2.4} /> 20 pts por acierto
                </span>
                <span>
                  <Sparkles size={14} strokeWidth={2.4} /> Responde y luego
                  confirma
                </span>
              </div>
              <div className="juego-progress-bar">
                <span
                  style={{
                    width: `${((currentProgress - 1) / totalQuestions) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="juego-options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = revealState?.correctIndex === index;
                const isWrongSelected =
                  answered &&
                  revealState?.selectedIndex === index &&
                  !revealState?.isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`juego-option ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrongSelected ? "incorrect" : ""}`}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={answered}
                  >
                    <span className="juego-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="juego-option-text">{option}</span>
                    {answered && isCorrect && (
                      <Check size={18} strokeWidth={2.6} />
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <div
                className={`juego-feedback ${revealState?.isCorrect ? "correct" : "incorrect"}`}
              >
                {revealState?.isCorrect ? (
                  <>
                    <Check size={18} strokeWidth={2.6} />
                    <span>¡Correcto! +20 pts</span>
                  </>
                ) : (
                  <>
                    <span>Respuesta correcta:</span>
                    <strong>
                      {currentQuestion.options[currentQuestion.correctIndex]}
                    </strong>
                  </>
                )}
              </div>
            )}

            <button
              type="button"
              className="btn btn-primary juego-main-cta"
              onClick={answered ? handleNextQuestion : handleSubmitAnswer}
              disabled={selectedAnswer === null && !answered}
            >
              {answered
                ? isQuizComplete
                  ? "Ver resultado"
                  : "Siguiente pregunta"
                : "Responder"}
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>

            <div className="juego-score-chip">
              <Trophy size={16} strokeWidth={2.3} />
              <span>{score} pts acumulados</span>
            </div>
          </section>
        )}

        {stage === "result" && (
          <section className="juego-result-card">
            <div className="juego-result-top">
              <div className="juego-result-badge">
                <Trophy size={16} strokeWidth={2.3} />
                <span>Puntos acumulados</span>
              </div>
              <button
                type="button"
                className="juego-icon-btn"
                onClick={handleFinish}
                aria-label="Cerrar resultado"
              >
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>

            <div className="juego-result-score">
              <strong>{score}</strong>
              <span>pts</span>
            </div>

            <h2>¡Juego completado!</h2>
            <p>
              Respondiste {correctCount} de {totalQuestions} preguntas
              correctamente.
            </p>

            <div className="juego-result-grid">
              <div>
                <span>Base</span>
                <strong>{BASE_SCORE} pts</strong>
              </div>
              <div>
                <span>Quiz</span>
                <strong>{score - BASE_SCORE} pts</strong>
              </div>
              <div>
                <span>Correctas</span>
                <strong>{correctCount}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary juego-main-cta result-finish-btn"
              onClick={handleFinish}
            >
              Terminar
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

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

const playGameSound = (type = "success") => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;
    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === "levelup") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.setValueAtTime(554, now + 0.1);
      osc.frequency.setValueAtTime(659, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.setValueAtTime(0.2, now + 0.1);
      gain.gain.setValueAtTime(0.2, now + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {
    // ignore
  }
};

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

  const rankIcon =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank;
  const rankClass = rank <= 3 ? `rank-${rank}` : "rank-other";

  return (
    <article
      className={`juego-rank-item ${highlighted ? "highlighted" : ""} ${rankClass}`}
    >
      <div className="juego-rank-position">{rankIcon}</div>
      <div className="juego-rank-avatar">
        {photo ? <img src={photo} alt={name} /> : <span>{initials}</span>}
      </div>
      <div className="juego-rank-meta">
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
      <div className="juego-rank-points">
        <strong>{points}</strong>
        <span>XP</span>
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
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    let timer;
    if (stage === "quiz" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (stage === "quiz" && timeLeft === 0) {
      // Auto-submit as skipped or null
      handleTimeOut();
    }
    return () => clearTimeout(timer);
  }, [stage, timeLeft, currentQuestionIndex]);

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

  const correctCount = userAnswers.filter(
    (ans, idx) => ans === QUESTIONS[idx].correctIndex,
  ).length;
  const score = BASE_SCORE + correctCount * 20;

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
  const currentProgress = currentQuestionIndex + 1;
  const totalQuestions = QUESTIONS.length;

  const handleProfileContinue = () => {
    if (!profileName.trim()) {
      setProfileError("Escribe tu nombre para continuar.");
      return;
    }

    setProfileError("");
    setStage("quiz");
    setTimeLeft(30);
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
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    // Save answer and determine next stage
    const nextAnswers = [...userAnswers, selectedAnswer];
    setUserAnswers(nextAnswers);

    if (isQuizComplete) {
      playGameSound("levelup");
      setStage("result");
    } else {
      playGameSound("success");
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    }
  };

  const handleTimeOut = () => {
    if (stage !== "quiz") return;

    // Auto-advance with null answer
    const nextAnswers = [...userAnswers, null];
    setUserAnswers(nextAnswers);

    if (isQuizComplete) {
      setStage("result");
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    }
  };

  const handleFinish = () => {
    setStage("ranking");
  };

  const handleStartAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setProfileError("");
    setTimeLeft(30);
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
            <div className="page-header-copy juego-header-copy">
              <h2 className="section-title">Ranking de invitados</h2>
              <p className="dedications-subtitle">
                Juega, suma XP y escala posiciones.
              </p>
            </div>

            <section className="juego-ranking-card primary-ranking">
              <div className="juego-ranking-list">
                {rankingPlayers.map((player) => (
                  <RankingRow key={player.id} {...player} />
                ))}
              </div>
            </section>

            <button
              type="button"
              className="btn btn-primary juego-main-cta"
              onClick={handleStartAgain}
              style={{ marginTop: "16px", marginBottom: "20px" }}
            >
              JUGAR AHORA
              <ArrowRight size={20} strokeWidth={2.8} />
            </button>

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
              <h2>Crea tu perfil</h2>
              <p>Sube una foto y escribe tu nombre para entrar al juego.</p>
            </div>

            <div className="juego-profile-row">
              <ProfileAvatar name={playerDisplayName} photo={profilePhoto} />
              <button
                type="button"
                className="juego-upload-btn-compact"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={16} strokeWidth={2.4} />
                Agregar foto de perfil
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />
            </div>

            <div className="juego-input-wrap">
              <input
                className="juego-input"
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Nombre y Apellido"
              />
            </div>

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
              <h2>{currentQuestion.title}</h2>

              <div className="juego-timer-container">
                <div className="juego-timer-bar">
                  <span
                    className="juego-timer-fill"
                    style={{
                      width: `${(timeLeft / 30) * 100}%`,
                      background:
                        timeLeft <= 5
                          ? "#ef4444"
                          : timeLeft <= 10
                            ? "#f59e0b"
                            : "#58cc02",
                    }}
                  />
                </div>
                <div
                  className="juego-timer-text"
                  style={{ color: timeLeft <= 5 ? "#ef4444" : "" }}
                >
                  <Clock size={16} strokeWidth={2.5} />
                  {timeLeft}s
                </div>
              </div>
            </div>

            <div className="juego-options">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;

                return (
                  <button
                    key={option}
                    type="button"
                    className={`juego-option ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectAnswer(index)}
                  >
                    <span className="juego-option-letter">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="juego-option-text">{option}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="btn btn-primary juego-main-cta"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              {isQuizComplete ? "Ver resultado" : "Siguiente pregunta"}
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
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

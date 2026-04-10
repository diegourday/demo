/*
import {
  ArrowRight,
  Badge,
    emoji: "🍼",
    bg: "linear-gradient(135deg, #1e293b, #2563eb)",
  Gift,
  MapPin,
  Sparkles,
      Camera,
      Check,
      Clock,
} from "lucide-react";
    bg: "linear-gradient(135deg, #64748b, #0f172a)",

const playGameSound = (type = "success") => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
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
    const QUIZ_TOTAL_TIME = 45;

    const AVATAR_OPTIONS = [
      {
        id: "sun",
        label: "Biberón",
        emoji: "🍼",
        bg: "linear-gradient(135deg, #1e293b, #2563eb)",
        scale: 1.08,
      },
      {
        id: "tux",
        label: "Terno",
        emoji: "🤵",
        bg: "linear-gradient(135deg, #64748b, #0f172a)",
        scale: 1.05,
      },
      {
        id: "dress",
        label: "Vestido",
        emoji: "👗",
        bg: "linear-gradient(135deg, #fb7185, #c026d3)",
        scale: 1.1,
      },
      {
        id: "cap",
        label: "Gorra",
        emoji: "🧢",
        bg: "linear-gradient(135deg, #0f766e, #111827)",
        scale: 1.08,
      },
      {
        id: "crown",
        label: "Corona",
        emoji: "👑",
        bg: "linear-gradient(135deg, #4c1d95, #1e1b4b)",
        scale: 1.12,
      },
      {
        id: "balloon",
        label: "Globo",
        emoji: "🎈",
        bg: "linear-gradient(135deg, #312e81, #06b6d4)",
        scale: 1.1,
      },
      {
        id: "spark",
        label: "Brillo",
        emoji: "✨",
        bg: "linear-gradient(135deg, #a855f7, #4c1d95)",
        scale: 1.12,
      },
      {
        id: "party",
        label: "Fiesta",
        emoji: "🥳",
        bg: "linear-gradient(135deg, #34d399, #059669)",
        scale: 1.12,
      },
      {
        id: "moon",
        label: "Luna",
        emoji: "🌙",
        bg: "linear-gradient(135deg, #7dd3fc, #2563eb)",
        scale: 1.05,
      },
      {
        id: "star",
        label: "Estrella",
        emoji: "⭐",
        bg: "linear-gradient(135deg, #1e1b4b, #0f766e)",
        scale: 1.12,
      },
      {
        id: "teddy",
        label: "Oso",
        emoji: "🧸",
        bg: "linear-gradient(135deg, #fde68a, #b45309)",
        scale: 1.08,
      },
      {
        id: "music",
        label: "Música",
        emoji: "🎵",
        bg: "linear-gradient(135deg, #86efac, #16a34a)",
        scale: 1.08,
      },
      {
        id: "camera",
        label: "Foto",
        emoji: "📷",
        bg: "linear-gradient(135deg, #a78bfa, #4338ca)",
        scale: 1.08,
      },
      {
        id: "cake",
        label: "Pastel",
        emoji: "🎂",
        bg: "linear-gradient(135deg, #581c87, #db2777)",
        scale: 1.1,
      },
      {
        id: "gift",
        label: "Regalo",
        emoji: "🎁",
        bg: "linear-gradient(135deg, #67e8f9, #0891b2)",
        scale: 1.08,
      },
      {
        id: "lion",
        label: "León",
        emoji: "🦁",
        bg: "linear-gradient(135deg, #fbbf24, #b45309)",
        scale: 1.18,
      },
      {
        id: "cat",
        label: "Gato",
        emoji: "🐱",
        bg: "linear-gradient(135deg, #f472b6, #be185d)",
        scale: 1.16,
      },
      {
        id: "dog",
        label: "Perro",
        emoji: "🐶",
        bg: "linear-gradient(135deg, #60a5fa, #1e40af)",
        scale: 1.16,
      },
      {
        id: "car",
        label: "Carrito",
        emoji: "🚗",
        bg: "linear-gradient(135deg, #22c55e, #0f766e)",
        scale: 1.12,
      },
      {
        id: "panda",
        label: "Panda",
        emoji: "🐼",
        bg: "linear-gradient(135deg, #e2e8f0, #64748b)",
        scale: 1.14,
      },
      {
        id: "rocket",
        label: "Cohete",
        emoji: "🚀",
        bg: "linear-gradient(135deg, #38bdf8, #0f172a)",
        scale: 1.12,
      },
      {
        id: "fox",
        label: "Zorro",
        emoji: "🦊",
        bg: "linear-gradient(135deg, #064e3b, #0f172a)",
        scale: 1.14,
      },
    ];

    const DEFAULT_AVATAR_ID = AVATAR_OPTIONS[0].id;
*/
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Badge,
  Camera,
  Check,
  Clock,
  Gift,
  MapPin,
  Sparkles,
  Trophy,
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
  } catch {
    // ignore
  }
};

const BASE_SCORE = 110;
const QUIZ_TOTAL_TIME = 45;

const AVATAR_OPTIONS = [
  // --- Personas (Piel neutra/amarilla por defecto) ---
  {
    id: "man1",
    label: "Chico 1",
    emoji: "👨",
    bg: "linear-gradient(135deg, #dbeafe, #60a5fa)",
    scale: 1.5,
  },
  {
    id: "man2",
    label: "Chico 2",
    emoji: "🧔",
    bg: "linear-gradient(135deg, #e0e7ff, #6366f1)",
    scale: 1.5,
  },
  {
    id: "woman1",
    label: "Chica 1",
    emoji: "👩",
    bg: "linear-gradient(135deg, #ffe4ea, #fb7185)",
    scale: 1.5,
  },
  {
    id: "woman2",
    label: "Chica 2",
    emoji: "👱‍♀️",
    bg: "linear-gradient(135deg, #fce7f3, #ec4899)",
    scale: 1.5,
  },
  {
    id: "boy",
    label: "Niño",
    emoji: "👦",
    bg: "linear-gradient(135deg, #cffafe, #22d3ee)",
    scale: 1.5,
  },
  {
    id: "girl",
    label: "Niña",
    emoji: "👧",
    bg: "linear-gradient(135deg, #fdf4ff, #e879f9)",
    scale: 1.5,
  },
  // --- Mascotas ---
  {
    id: "dog",
    label: "Perro",
    emoji: "🐶",
    bg: "linear-gradient(135deg, #fef3c7, #f59e0b)",
    scale: 1.55,
  },
  {
    id: "cat",
    label: "Gato",
    emoji: "🐱",
    bg: "linear-gradient(135deg, #ffedd5, #f43f5e)",
    scale: 1.55,
  },
  // --- Objetos de Fiesta ---
  {
    id: "crown",
    label: "Corona",
    emoji: "👑",
    bg: "linear-gradient(135deg, #f3e8ff, #c084fc)",
    scale: 1.55,
  },
  {
    id: "balloon",
    label: "Globo",
    emoji: "🎈",
    bg: "linear-gradient(135deg, #ffe4e6, #fb7185)",
    scale: 1.5,
  },
  {
    id: "cake",
    label: "Pastel",
    emoji: "🎂",
    bg: "linear-gradient(135deg, #ffe4e6, #fda4af)",
    scale: 1.5,
  },
  {
    id: "confetti",
    label: "Confeti",
    emoji: "🎊",
    bg: "linear-gradient(135deg, #fae8ff, #d946ef)",
    scale: 1.55,
  },
  {
    id: "mic",
    label: "Micrófono",
    emoji: "🎤",
    bg: "linear-gradient(135deg, #e0e7ff, #6366f1)",
    scale: 1.5,
  },
  {
    id: "star",
    label: "Estrella",
    emoji: "⭐",
    bg: "linear-gradient(135deg, #e0e7ff, #6366f1)",
    scale: 1.55,
  },
  {
    id: "gift",
    label: "Regalo",
    emoji: "🎁",
    bg: "linear-gradient(135deg, #cffafe, #22d3ee)",
    scale: 1.45,
  },
  {
    id: "champagne",
    label: "Champaña",
    emoji: "🍾",
    bg: "linear-gradient(135deg, #dcfce7, #10b981)",
    scale: 1.55,
  },
  // --- Comodines ---
  {
    id: "biberon",
    label: "Biberón",
    emoji: "🍼",
    bg: "linear-gradient(135deg, #fff1b8, #f59e0b)",
    scale: 1.5,
  },
  {
    id: "moon",
    label: "Luna",
    emoji: "🌙",
    bg: "linear-gradient(135deg, #e0f2fe, #7dd3fc)",
    scale: 1.4,
  },
  {
    id: "rocket",
    label: "Cohete",
    emoji: "🚀",
    bg: "linear-gradient(135deg, #e0f2fe, #38bdf8)",
    scale: 1.55,
  },
  {
    id: "rainbow",
    label: "Arcoíris",
    emoji: "🌈",
    bg: "linear-gradient(135deg, #e0f2fe, #ec4899)",
    scale: 1.55,
  },
];

const DEFAULT_AVATAR_ID = AVATAR_OPTIONS[0].id;

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

function RankingRow({ rank, name, role, points, highlighted, avatar }) {
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
      <AvatarBubble avatar={avatar} initials={initials} />
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

function AvatarBubble({ avatar, initials, size = 48 }) {
  const style = avatar
    ? {
        width: size,
        height: size,
        background: avatar.bg,
        fontSize: size * 0.45,
        "--avatar-icon-scale": avatar.scale ?? 1.08,
      }
    : {
        width: size,
        height: size,
        fontSize: size * 0.35,
      };

  return (
    <div
      className={`juego-avatar-bubble ${avatar ? "" : "fallback"}`}
      style={style}
      aria-hidden="true"
    >
      {avatar ? <span>{avatar.emoji}</span> : <span>{initials}</span>}
    </div>
  );
}

export default function Juego() {
  const { completed, markComplete, showStepSuccessToast } = useProgress();
  const navigate = useNavigate();
  const gameCompletionHandledRef = useRef(false);

  const [stage, setStage] = useState("ranking");
  const [alias, setAlias] = useState("");
  const [selectedAvatarId, setSelectedAvatarId] = useState(DEFAULT_AVATAR_ID);
  const [profileError, setProfileError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TOTAL_TIME);

  useEffect(() => {
    let timer;
    if (stage === "quiz" && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (stage === "quiz" && timeLeft === 0) {
      timer = setTimeout(() => {
        setUserAnswers((prev) => [...prev, selectedAnswer]);
        setSelectedAnswer(null);
        setStage("profile");
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [stage, timeLeft, selectedAnswer]);

  const playerAlias = alias.trim() || "Alias";
  const selectedAvatar =
    AVATAR_OPTIONS.find((avatar) => avatar.id === selectedAvatarId) ??
    AVATAR_OPTIONS[0];

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
      role: playerAlias,
      points: score,
      highlighted: true,
      avatar: selectedAvatar,
    };

    return [player, ...RANKING_PLAYERS]
      .slice()
      .sort((a, b) => b.points - a.points)
      .map((item, index) => ({ ...item, rank: index + 1 }));
  }, [playerAlias, score, selectedAvatar]);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const isQuizComplete = currentQuestionIndex === QUESTIONS.length - 1;
  const currentProgress = currentQuestionIndex + 1;
  const totalQuestions = QUESTIONS.length;

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    setUserAnswers((prev) => [...prev, selectedAnswer]);

    if (isQuizComplete) {
      playGameSound("levelup");
      setSelectedAnswer(null);
      setStage("profile");
    } else {
      playGameSound("success");
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const handleProfileSubmit = () => {
    if (!alias.trim()) {
      setProfileError("Escribe tu alias para continuar.");
      return;
    }

    setProfileError("");
    setStage("score");
  };

  const handleGoToRanking = () => {
    setStage("ranking");
  };

  const handleStartAgain = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setProfileError("");
    setAlias("");
    setSelectedAvatarId(DEFAULT_AVATAR_ID);
    setTimeLeft(QUIZ_TOTAL_TIME);
    gameCompletionHandledRef.current = false;
    setStage("quiz");
  };

  useEffect(() => {
    if (stage !== "score" || gameCompletionHandledRef.current) return;

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

        {stage === "quiz" && (
          <section className="juego-quiz-card">
            <div className="juego-quiz-topbar">
              <div className="juego-quiz-pill">
                Pregunta {currentProgress} de {totalQuestions}
              </div>
            </div>

            <div className="juego-question-card">
              <h2>{currentQuestion.title}</h2>

              <div className="juego-timer-container">
                <div className="juego-timer-bar">
                  <span
                    className="juego-timer-fill"
                    style={{
                      width: `${(timeLeft / QUIZ_TOTAL_TIME) * 100}%`,
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

        {stage === "profile" && (
          <section className="juego-result-card">
            <div className="juego-profile-hero">
              <h2 className="juego-profile-hero-title">Crea tu perfil</h2>
              <p className="juego-profile-hero-subtitle">
                Elige un avatar y escribe tu alias para guardar tu partida.
              </p>
            </div>

            <div className="juego-avatar-preview-card">
              <AvatarBubble avatar={selectedAvatar} initials="T" size={54} />
              <div className="juego-avatar-preview-copy">
                <strong>{selectedAvatar.label}</strong>
                <span>Tu avatar actual</span>
              </div>
            </div>

            <div className="juego-avatar-picker">
              {AVATAR_OPTIONS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    className={`juego-avatar-option ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => setSelectedAvatarId(avatar.id)}
                  >
                    <AvatarBubble avatar={avatar} initials="T" size={54} />
                  </button>
                );
              })}
            </div>

            <div className="juego-field">
              <div className="juego-input-wrap">
                <input
                  className="juego-input"
                  type="text"
                  value={alias}
                  onChange={(e) => {
                    setAlias(e.target.value);
                    if (profileError) setProfileError("");
                  }}
                  placeholder="Escribe tu alias"
                />
              </div>
            </div>

            {profileError && <p className="juego-error">{profileError}</p>}

            <button
              type="button"
              className="btn btn-primary juego-main-cta result-finish-btn"
              onClick={handleProfileSubmit}
            >
              Terminar
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </section>
        )}

        {stage === "score" && (
          <section className="juego-result-card">
            <div
              className="juego-result-score"
              style={{
                marginBottom: "12px",
                minHeight: "auto",
                padding: "16px",
              }}
            >
              <div
                className="juego-result-score-label"
                style={{ marginBottom: "8px" }}
              >
                <Trophy size={16} strokeWidth={2.3} />
                <span style={{ textTransform: "none" }}>Puntos acumulados</span>
              </div>
              <strong style={{ fontSize: "4rem" }}>{score}</strong>
              <span className="pts-label">PTS</span>
            </div>

            <div className="juego-result-grid" style={{ marginTop: "0" }}>
              <div style={{ padding: "12px 8px" }}>
                <span>Base</span>
                <strong>{BASE_SCORE} pts</strong>
              </div>
              <div style={{ padding: "12px 8px" }}>
                <span>Quiz</span>
                <strong>{score - BASE_SCORE} pts</strong>
              </div>
              <div style={{ padding: "12px 8px" }}>
                <span>Correctas</span>
                <strong>{correctCount}</strong>
              </div>
            </div>

            <button
              type="button"
              className="btn btn-primary juego-main-cta result-finish-btn"
              onClick={handleGoToRanking}
              style={{ marginTop: "16px", textTransform: "none" }}
            >
              Ver ranking
              <ArrowRight size={18} strokeWidth={2.2} />
            </button>
          </section>
        )}
      </div>
    </div>
  );
}

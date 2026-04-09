import { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

const ProgressContext = createContext();

const STEP_ORDER = ["inicio", "asistencia", "regalos", "dedicatorias", "juego"];

const SUCCESS_TOAST_BY_STEP = {
  inicio: "✅ ¡Ya completaste el inicio con éxito!",
  asistencia: "✅ ¡Asistencia confirmada con éxito!",
  regalos: "🎁 ¡Regalo reservado con éxito!",
  dedicatorias: "💌 ¡Dedicatoria enviada con éxito!",
  juego: "🎮 ¡Juego completado con éxito!",
};

function fireCelebrationConfetti() {
  if (typeof window === "undefined") return;

  const burst = {
    particleCount: 36,
    spread: 42,
    startVelocity: 18,
    scalar: 0.7,
    decay: 0.92,
    gravity: 1.15,
    origin: { x: 0.5, y: 0.88 },
    colors: ["#0051df", "#5a32ff", "#ff6fae", "#ffd700", "#ffffff"],
  };

  confetti({ ...burst, angle: 90 });
  confetti({ ...burst, angle: 60, origin: { x: 0.44, y: 0.88 } });
  confetti({ ...burst, angle: 120, origin: { x: 0.56, y: 0.88 } });
}

function playSuccessSound() {
  if (typeof window === "undefined") return;

  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    const tones = [784, 988, 1319];
    tones.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.value = freq;
      osc.connect(gain);

      const start = ctx.currentTime + index * 0.085;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.16, start + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.14);
      osc.start(start);
      osc.stop(start + 0.16);
    });
  } catch {
    // ignore sound failures
  }
}

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    const fallback = {
      inicio: false,
      asistencia: false,
      dedicatorias: false,
      juego: false,
      regalos: false,
    };

    try {
      const saved = localStorage.getItem("progress");
      if (!saved) return fallback;

      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== "object") return fallback;

      return { ...fallback, ...parsed };
    } catch {
      return fallback;
    }
  });
  const [showCongrats, setShowCongrats] = useState(false);
  const [completionToast, setCompletionToast] = useState({
    open: false,
    message: "",
  });
  const [miniCelebration, setMiniCelebration] = useState({
    open: false,
    key: 0,
  });

  useEffect(() => {
    try {
      localStorage.setItem("progress", JSON.stringify(completed));
    } catch {
      // Ignore storage failures.
    }
    const allDone = STEP_ORDER.every((s) => completed[s]);
    if (allDone) {
      setShowCongrats(true);
    }
  }, [completed]);

  const markComplete = (step) => {
    setCompleted((prev) => {
      if (prev[step]) return prev;

      fireCelebrationConfetti();
      playSuccessSound();
      setMiniCelebration((current) => ({
        open: true,
        key: current.key + 1,
      }));

      return { ...prev, [step]: true };
    });
  };

  const showStepSuccessToast = (step) => {
    const message = SUCCESS_TOAST_BY_STEP[step];
    if (!message) return;
    setCompletionToast({
      open: true,
      message,
    });
  };

  const closeCompletionToast = () => {
    setCompletionToast({ open: false, message: "" });
  };

  const closeMiniCelebration = () => {
    setMiniCelebration((current) => ({ ...current, open: false }));
  };

  const completedCount = STEP_ORDER.filter((s) => completed[s]).length;
  const totalSteps = STEP_ORDER.length;

  return (
    <ProgressContext.Provider
      value={{
        completed,
        markComplete,
        completedCount,
        totalSteps,
        showCongrats,
        setShowCongrats,
        completionToast,
        closeCompletionToast,
        miniCelebration,
        closeMiniCelebration,
        showStepSuccessToast,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

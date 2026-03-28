import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const STEP_ORDER = ['inicio', 'asistencia', 'regalos', 'dedicatorias', 'juego'];

const SUCCESS_TOAST_BY_STEP = {
  asistencia: '✅ ¡Asistencia confirmada con éxito!',
  regalos: '🎁 ¡Regalo reservado con éxito!',
  dedicatorias: '💌 ¡Dedicatoria enviada con éxito!',
};

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
      const saved = localStorage.getItem('progress');
      if (!saved) return fallback;

      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object') return fallback;

      return { ...fallback, ...parsed };
    } catch {
      return fallback;
    }
  });
  const [showCongrats, setShowCongrats] = useState(false);
  const [completionToast, setCompletionToast] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    try {
      localStorage.setItem('progress', JSON.stringify(completed));
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
    setCompletionToast({ open: false, message: '' });
  };

  const completedCount = STEP_ORDER.filter((s) => completed[s]).length;
  const totalSteps = STEP_ORDER.length;

  return (
    <ProgressContext.Provider value={{
      completed,
      markComplete,
      completedCount,
      totalSteps,
      showCongrats,
      setShowCongrats,
      completionToast,
      closeCompletionToast,
      showStepSuccessToast,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const STEP_ORDER = ['inicio', 'asistencia', 'regalos', 'dedicatorias', 'juego'];

const STEP_META = {
  inicio: { label: 'Inicio' },
  asistencia: { label: 'Asistencia' },
  regalos: { label: 'Regalo' },
  dedicatorias: { label: 'Dedicatoria' },
  juego: { label: 'Juego' },
};

const SUCCESS_TOAST_BY_STEP = {
  asistencia: '✅ ¡Asistencia confirmada con éxito!',
  regalos: '🎁 ¡Regalo reservado con éxito!',
  dedicatorias: '💌 ¡Dedicatoria enviada con éxito!',
};

export function ProgressProvider({ children }) {
  const [completed, setCompleted] = useState(() => {
    const saved = localStorage.getItem('progress');
    return saved ? JSON.parse(saved) : {
      inicio: false,
      asistencia: false,
      dedicatorias: false,
      juego: false,
      regalos: false,
    };
  });
  const [showCongrats, setShowCongrats] = useState(false);
  const [nextStepsModal, setNextStepsModal] = useState({
    open: false,
    completedStep: null,
    remainingSteps: [],
  });
  const [completionToast, setCompletionToast] = useState({
    open: false,
    message: '',
  });

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(completed));
    const allDone = STEP_ORDER.every((s) => completed[s]);
    if (allDone) {
      setShowCongrats(true);
    }
  }, [completed]);

  const markComplete = (step) => {
    setCompleted((prev) => {
      if (prev[step]) return prev;

      const updated = { ...prev, [step]: true };
      const remainingSteps = STEP_ORDER.filter((stepKey) => !updated[stepKey]);

      if (step !== 'inicio' && remainingSteps.length > 0) {
        setNextStepsModal({
          open: true,
          completedStep: step,
          remainingSteps,
        });
      }

      return updated;
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

  const closeNextStepsModal = () => {
    setNextStepsModal((prev) => ({ ...prev, open: false }));
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
      nextStepsModal,
      closeNextStepsModal,
      stepMeta: STEP_META,
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

import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext();

const STEPS = ['inicio', 'asistencia', 'dedicatorias', 'juego', 'regalos'];

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

  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(completed));
    const allDone = STEPS.every((s) => completed[s]);
    if (allDone) {
      setShowCongrats(true);
    }
  }, [completed]);

  const markComplete = (step) => {
    setCompleted((prev) => ({ ...prev, [step]: true }));
  };

  const completedCount = STEPS.filter((s) => completed[s]).length;
  const totalSteps = STEPS.length;

  return (
    <ProgressContext.Provider value={{
      completed,
      markComplete,
      completedCount,
      totalSteps,
      showCongrats,
      setShowCongrats,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface ScoreContextType {
  lastScore: number;
  highScore: number;
  updateScores: (newScore: number, isSignedIn: boolean) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [lastScore, setLastScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  const updateScores = (newScore: number, isSignedIn: boolean) => {
    // Toujours mettre à jour le dernier score
    setLastScore(newScore);

    // Mettre à jour le meilleur score uniquement si l'utilisateur est connecté
    if (isSignedIn && newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <ScoreContext.Provider value={{ lastScore, highScore, updateScores }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
}

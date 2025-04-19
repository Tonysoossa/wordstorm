"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";

interface ScoreContextType {
  lastScore: number;
  highScore: number;
  updateScores: (newScore: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, user } = useUser();
  const [lastScore, setLastScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedLastScore = localStorage.getItem("lastScore");
    if (storedLastScore) {
      setLastScore(parseInt(storedLastScore, 10));
    }

    if (isSignedIn && user) {
      const storedHighScore = localStorage.getItem(`highScore_${user.id}`);
      if (storedHighScore) {
        setHighScore(parseInt(storedHighScore, 10));
      }
    }
  }, [isSignedIn, user]);

  const updateScores = (newScore: number) => {
    setLastScore(newScore);
    localStorage.setItem("lastScore", newScore.toString());
    if (isSignedIn && user) {
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem(`highScore_${user.id}`, newScore.toString());
      }
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

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
  updateScores: (newScore: number) => Promise<void>;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const { isSignedIn, user } = useUser();
  const [lastScore, setLastScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);

  // Charger les scores au montage du composant
  useEffect(() => {
    // Si un utilisateur est connecté, charger son meilleur score depuis l'API
    if (isSignedIn && user) {
      fetchUserScores(user.id);
    } else {
      // Pour les utilisateurs non connectés, essayer de charger depuis localStorage
      const storedLastScore = localStorage.getItem("lastScore");
      if (storedLastScore) {
        setLastScore(parseInt(storedLastScore, 10));
      }
    }
  }, [isSignedIn, user]);

  const fetchUserScores = async (userId: string) => {
    try {
      const response = await fetch(`/api/scores?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setHighScore(data.highScore || 0);
        setLastScore(data.lastScore || 0);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des scores:", error);
    }
  };

  const updateScores = async (newScore: number) => {
    // Toujours mettre à jour le dernier score
    setLastScore(newScore);

    if (isSignedIn && user) {
      // Pour les utilisateurs connectés, sauvegarder dans la base de données
      try {
        const response = await fetch("/api/scores", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            newScore,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Mettre à jour le highScore si le serveur l'a mis à jour
          setHighScore(data.highScore);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour des scores:", error);
      }
    } else {
      // Pour les utilisateurs non connectés, sauvegarder dans localStorage
      localStorage.setItem("lastScore", newScore.toString());
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

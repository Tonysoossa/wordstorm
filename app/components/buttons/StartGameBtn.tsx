import { useState, useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import {
  fetchNewWord,
  handleValidation,
  resetScore,
} from "../../assets/function/gameLogic";
import { useScore } from "../../context/ScoreContext";

export default function StartGameBtn() {
  const { isSignedIn } = useUser();
  const { updateScores } = useScore();

  const [word, setWord] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gestion du compte à rebours initial puis du timer de jeu
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        // Phase de compte à rebours
        timerRef.current = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        // Fin du compte à rebours, démarrage du jeu
        setCountdown(null);
        setIsPlaying(true);
      }
    } else if (isPlaying && timeLeft > 0) {
      // Phase de jeu
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft, countdown]);

  const startGame = async () => {
    resetScore();
    setScore(0);
    setTimeLeft(60);
    setGameEnded(false);

    // Démarrer le compte à rebours
    setCountdown(3);

    // Préparer le premier mot
    const newWord = await fetchNewWord();
    setWord(newWord);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameEnded(true);

    // Mettre à jour les scores dans le contexte
    updateScores(score, isSignedIn || false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { newWord, newScore } = await handleValidation(input, word);
      setWord(newWord);
      setScore(newScore);

      // On efface l'input dans tous les cas
      setInput("");
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderCountdown = () => {
    if (countdown === 0)
      return <div className="text-3xl font-bold text-green-500">Partez !</div>;
    return <div className="text-3xl font-bold text-red-500">{countdown}</div>;
  };

  const renderScoreInfo = () => {
    if (!gameEnded) return null;

    return (
      <div className="mt-4 p-4 rounded-lg text-center">
        <h3 className="font-bold text-xl mb-2">Partie terminée !</h3>
        <button
          onClick={startGame}
          className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-40 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10 mt-4"
        >
          Restart !
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isPlaying && countdown === null && !gameEnded ? (
        <button
          onClick={startGame}
          className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10"
        >
          Go !
        </button>
      ) : countdown !== null ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl mb-4">Préparez-vous !</p>
          {renderCountdown()}
        </div>
      ) : (
        isPlaying && (
          <>
            <div className="text-xl font-bold">
              Temps restant: {formatTime(timeLeft)}
            </div>
            {typeof word === "string" && (
              <p className="text-xl font-bold">{word}</p>
            )}
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="border-2 text-black border-black rounded px-4 py-2"
              placeholder="Tape le mot"
              autoFocus
            />
            <p>Score actuel: {score}</p>
          </>
        )
      )}

      {renderScoreInfo()}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import {
  fetchNewWord,
  handleValidation,
  resetScore,
} from "../../assets/function/gameLogic";

export default function StartGameBtn() {
  const [word, setWord] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 secondes = 1 minute
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Gestion du timer
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }

    // Nettoyage au démontage
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, timeLeft]);

  const startGame = async () => {
    resetScore(); // Réinitialisation du score global
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    const newWord = await fetchNewWord();
    setWord(newWord);
  };

  const endGame = () => {
    setIsPlaying(false);
    alert(`Temps écoulé ! Votre score final est de ${score}`);
    setWord("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { newWord, newScore } = await handleValidation(input, word);
      setWord(newWord);
      setScore(newScore);
      // On efface l'input seulement si la validation a réussi (le mot a changé)
      if (newWord !== word) {
        setInput("");
      } else {
        // Si le mot n'a pas changé, on efface quand même l'input pour réessayer
        setInput("");
      }
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {!isPlaying ? (
        <button
          onClick={startGame}
          className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10"
        >
          Go !
        </button>
      ) : (
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
          <p>Score: {score}</p>
        </>
      )}
    </div>
  );
}

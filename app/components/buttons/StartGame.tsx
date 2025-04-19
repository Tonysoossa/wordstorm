// components/buttons/StartGame.tsx
import { useState, useEffect, useRef } from "react";
import {
  fetchNewWord,
  handleValidation,
  resetScore,
} from "../../assets/function/gameLogic";
import { useScore } from "../../context/ScoreContext";
import capitalize from "@/app/assets/function/firstLetterUpperCase";

export default function StartGame() {
  const { updateScores } = useScore();
  const [word, setWord] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        timerRef.current = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
      } else {
        setCountdown(null);
        setIsPlaying(true);
      }
    } else if (isPlaying && timeLeft > 0) {
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
    setCountdown(3);
    const newWord = await fetchNewWord();
    setWord(capitalize(newWord));
  };

  const endGame = async () => {
    setIsPlaying(false);
    setGameEnded(true);
    await updateScores(score);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(capitalize(e.target.value));
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const { newWord, newScore } = await handleValidation(input, word);
      setWord(capitalize(newWord));
      setScore(newScore);
      setInput("");
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const renderCountdown = () => {
    if (countdown !== 0)
      return <div className="text-3xl font-bold text-red-500">{countdown}</div>;
  };

  const renderScoreInfo = () => {
    if (!gameEnded) return null;

    return (
      <div className=" p-4 text-center">
        <h3 className="font-bold text-xl mb-8">Partie terminée !</h3>
        <button
          onClick={startGame}
          className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-40 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10 font-normal"
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
          className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10 font-normal"
        >
          Go !
        </button>
      ) : countdown !== null ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl pb-2">Préparez-vous !</p>
          {renderCountdown()}
        </div>
      ) : (
        isPlaying && (
          <>
            {typeof word === "string" && (
              <p className="text-3xl font-bold">{word}:</p>
            )}
            <div className="flex justify-center items-center gap-4 pl-12">
              <input
                type="text"
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="border-2 text-black border-black rounded px-4 py-2"
                placeholder="Tape le mot"
                autoFocus
              />{" "}
              <div className="">{formatTime(timeLeft)}</div>
            </div>
            <p>Score actuel: {score}</p>
          </>
        )
      )}
      {renderScoreInfo()}
    </div>
  );
}

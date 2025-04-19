// components/ScoreDisplay.tsx
import { useScore } from "../../context/ScoreContext";
import { useUser } from "@clerk/nextjs";

export default function ScoreDisplay() {
  const { lastScore, highScore } = useScore();
  const { isSignedIn } = useUser();

  return (
    <div className="py-4 bg-white text-black rounded-lg shadow-xl px-10">
      <h2 className="text-2xl font-bold mb-4">Mes Scores</h2>
      <p className="">Dernier score: {lastScore}</p>
      {isSignedIn && <p>Meilleur score: {highScore}</p>}
    </div>
  );
}

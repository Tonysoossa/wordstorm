import { useScore } from "../../context/ScoreContext";
import { useUser } from "@clerk/nextjs";

export default function ScoreDisplay() {
  const { lastScore, highScore } = useScore();
  const { isSignedIn } = useUser();

  return (
    <div className="p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-2">Vos Scores</h2>
      <p className="mb-1">Dernier score: {lastScore}</p>
      {isSignedIn && <p>Meilleur score: {highScore}</p>}
    </div>
  );
}
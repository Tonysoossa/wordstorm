import { useScore } from "../../context/ScoreContext";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "../../assets/languages/LanguagesContext";

export default function ScoreDisplay() {
  const { lastScore, highScore } = useScore();
  const { isSignedIn } = useUser();
  const { translations } = useLanguage();

  return (
    <div className="py-4 bg-white text-black rounded-lg shadow-xl px-10 ">
      <h2 className="text-2xl font-bold mb-4">
      {translations.displayScore.myScores}
      </h2>
      <p>
        {translations.displayScore.lastScore}
        {lastScore}
      </p>
      {isSignedIn && (
        <p>
          {translations.displayScore.highScore} {highScore}
        </p>
      )}
    </div>
  );
}

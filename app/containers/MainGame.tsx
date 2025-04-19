"use client";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import capitalize from "@/app/assets/function/firstLetterUpperCase";
import { SignedOut } from "@clerk/nextjs";
import StartGame from "@/app/components/game/StartGame";
import ScoreDisplay from "@/app/components/game/ScoreDisplay";

export default function MainGame() {
  const { isSignedIn, user } = useUser();
  const { translations } = useLanguage();

  return (
    <div className="flex-col flex justify-center items-center gap-y-12 pt-12 text-xl font-bold">
      <SignedOut>
        <p>
          {translations.indexNotCoo.preStart} {translations.indexCoo.ready}
        </p>
      </SignedOut>
      {isSignedIn && (
        <p>
          {translations.indexCoo.helloUser}{" "}
          {user?.username ? capitalize(user.username) : ""},{" "}
          {translations.indexCoo.ready}
        </p>
      )}
      <StartGame />
      <ScoreDisplay />
    </div>
  );
}

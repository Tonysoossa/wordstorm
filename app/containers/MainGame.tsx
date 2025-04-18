"use client";
import { useUser } from "@clerk/nextjs";
// import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import capitalize from "../assets/function/firstLetterUpperCase";
import { SignedOut } from "@clerk/nextjs";
import StartGameBtn from "../components/buttons/StartGameBtn";
import ScoreDisplay from "../components/game/ScoreDisplay";

export default function MainGame() {
  const { isSignedIn, user } = useUser();
  // const { translations } = useLanguage();

  return (
    <div className="flex-col flex justify-center items-center gap-y-12 pt-28 text-xl font-bold">
      <SignedOut>
        <p>Alright stranger, Let&apos;s start a game !</p>
      </SignedOut>
      {isSignedIn && (
        <p>
          {user?.username ? capitalize(user.username) : ""}, Let&apos;s start a
          game !
        </p>
      )}
      <StartGameBtn />
      <ScoreDisplay />
    </div>
  );
}

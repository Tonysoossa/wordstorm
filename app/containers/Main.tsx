"use client";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import MainBtn from "../components/buttons/MainBtn";

export default function Main() {
  const { isSignedIn, user } = useUser();
  const { translations } = useLanguage();

  const isNewUser: boolean =
    Date.now() - new Date(user?.createdAt ?? 0).getTime() < 30000;

  return (
    <section>
      {!isSignedIn && (
        <div>
          <p>
            Please register to your account or sign up if you&apos;re a new user
            ! Or play as a guest but scores couldn&apos;t be saved. Have fun !
          </p>
          <MainBtn />
        </div>
      )}
      {isSignedIn && (
        <div className="flex-col flex justify-center gap-y-12">
          {translations.index.helloUser} {user.username} !
          <MainBtn />
        </div>
      )}
      {isNewUser && isSignedIn && (
        <p>
          Bienvenue sur la plateforme ! Je suis ravi de t’accueillir{" "}
          {user.username}
        </p>
      )}
    </section>
  );
}

"use client";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import MainBtn from "../components/buttons/MainBtn";
import capitalize from "../assets/function/firstLetterUpperCase";

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
      {isSignedIn && !isNewUser && (
        <div className="flex-col flex justify-center gap-y-12">
          {translations.indexCoo.helloUser} {user?.username ? capitalize(user.username) : ''} !
          <MainBtn />
        </div>
      )}
      {isNewUser && user && (
        <div className="flex-col flex justify-center gap-y-12">
          Bienvenue sur la plateforme ! Je suis ravi de t’accueillir{" "}
          {user?.username ? capitalize(user.username) : ''}
          <MainBtn />
        </div>
      )}
    </section>
  );
}

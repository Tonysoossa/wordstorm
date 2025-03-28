"use client";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import MainBtn from "../components/buttons/MainBtn";
import capitalize from "../assets/function/firstLetterUpperCase";

export default function Main() {
  const { isSignedIn, user } = useUser();
  const { translations } = useLanguage();

  const isNewUser: boolean =
    Date.now() - new Date(user?.createdAt ?? 0).getTime() < 100000;

  return (
    <section>
      {!isSignedIn && (
        <div className="flex flex-col pt-20">
          <p className="text-lg">{translations.indexCoo.textPreBtn}</p>
          <MainBtn />
        </div>
      )}
      {isSignedIn && !isNewUser && (
        <div className="flex-col flex justify-center gap-y-12">
          {translations.indexCoo.helloUser}{" "}
          {user?.username ? capitalize(user.username) : ""} !
          <MainBtn />
        </div>
      )}
      {isNewUser && user && (
        <div className="flex-col flex justify-center gap-y-12">
          {translations.indexCoo.textPreBtnNewUser}{" "}
          {user?.username ? capitalize(user.username) : ""}
          <MainBtn />
        </div>
      )}
    </section>
  );
}

"use client";
import { useUser } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import MainBtn from "@/app/components/buttons/MainBtn";
import capitalize from "@/app/assets/function/firstLetterUpperCase";

export default function Main() {
  const { isSignedIn, user } = useUser();
  const { translations } = useLanguage();

  const isNewUser: boolean =
    Date.now() - new Date(user?.createdAt ?? 0).getTime() < 100000;

  return (
    <section className="pt-14 mx-4">
      {!isSignedIn && (
        <div className="flex gap-20 flex-col">
          <p className="text-lg">{translations.indexNotCoo.textPreBtn}</p>
          <MainBtn />
        </div>
      )}
      {isSignedIn && !isNewUser && (
        <div className="flex gap-20 flex-col text-xl font-bold">
          {translations.indexCoo.helloUser}{" "}
          {user?.username ? capitalize(user.username) : ""} !{" "}
          {translations.indexCoo.afterUsername}
          <MainBtn />
        </div>
      )}
      {isNewUser && user && (
        <div className="flex-col flex justify-center gap-y-12 text-xl font-bold">
          {translations.indexCoo.textPreBtnNewUser}{" "}
          {user?.username ? capitalize(user.username) : ""}
          <MainBtn />
        </div>
      )}
    </section>
  );
}

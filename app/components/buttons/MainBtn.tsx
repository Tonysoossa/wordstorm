import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import Link from "next/link";

export default function MainBtn() {
  const { translations } = useLanguage();
  return (
    <div>
      <SignedOut>
        <div className="flex justify-center pt-20 gap-16 mx-auto ">
          <Link href="/game">
            <button className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10">
              Play !
            </button>
          </Link>
          <SignInButton mode="modal">
            <button className="shadow-[3px_3px_5px_0.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg min-w28 px-4 hover:scale-110 hover:shadow-[-3px_3px_5px_0.5px_#fff6af] h-10">
              {translations.indexNotCoo.logBtn}
            </button>
          </SignInButton>
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <p className="pb-12">Maintenant connecter, il est temps de jouer !</p>
          <Link href="/game">
            <button className="shadow-[0px_3px_5px_1.5px_#fff6af] bg-gradient-to-b from-[#ffed64] to-[#ffab23] rounded-3xl cursor-pointer text-black font-silkscreen text-lg w-28 hover:scale-110 hover:shadow-[0px_3px_5px_1px_#fff6af] h-10 font-normal">
              Play !
            </button>
          </Link>
        </div>
      </SignedIn>
    </div>
  );
}

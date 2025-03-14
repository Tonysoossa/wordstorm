"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../assets/languages/LanguagesContext";
import AboutModal from "@/app/components/modals/AboutModal";
import RulesModal from "../components/modals/RulesModal";

export default function NavBar() {
  const { translations, toggleLanguage } = useLanguage();
  return (
    <nav className="flex items-center justify-between pt-4 pl-10 pr-10 font-silkscreen h-24 z-50 fixed top-0 left-0 right-0 bg-black max-lg:flex-col max-md:pl-6 max-md:pr-6 max-w-[1440px] mx-auto">
      <div className="flex items-center gap-2">
        <Image
          src="/wordstormLogo.png"
          alt="Wordstorm Logo"
          width={40}
          height={40}
        />
        <p className="text-3xl font-bold cursor-default">Wordstorm</p>
        <button
          onClick={toggleLanguage}
          className="flex items-center rounded-lg text-lg pb-1 hover:text-yellowCustom hover:scale-125"
        >
          {translations.navBar.languageBTN}
          <Image
            src="/globe.png"
            alt="Globe logo"
            width={18}
            height={18}
            className="pt-[0.5px]"
          />
        </button>
      </div>

      <div className="flex text-lg gap-8 max-md:text-md">
        <RulesModal>{translations.navBar.rules}</RulesModal>
        <AboutModal> {translations.navBar.about} </AboutModal>
        <Link
          href="/login"
          className="cursor-pointer hover:text-yellowCustom hover:scale-110"
        >
          {translations.navBar.log}
        </Link>
      </div>
    </nav>
  );
}

"use client";
import Image from "next/image";
import { useLanguage } from "@/app/assets/languages/LanguagesContext";
import AboutModal from "@/app/components/modals/AboutModal";
import RulesModal from "@/app/components/modals/RulesModal";
import CheckAuthNav from "@/app/components/auth/CheckAuthNav";
import AccountModal from "@/app/components/modals/AccountModal";
import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";

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
        <Link href="/">
          <button className="text-3xl font-bold cursor-pointer">
            Wordstorm
          </button>
        </Link>
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
      <div className="flex flex-wrap justify-center text-lg gap-x-8 gap-y-4 max-md:text-md max-lg:pt-2">
        <RulesModal>{translations.navBar.rules}</RulesModal>
        <AboutModal> {translations.navBar.about}</AboutModal>
        <CheckAuthNav />
        <SignedIn>
          <AccountModal>
            {translations.account.accountModal.accountNavBtn}
          </AccountModal>
        </SignedIn>
      </div>
    </nav>
  );
}

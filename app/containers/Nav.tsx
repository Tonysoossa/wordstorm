import Image from "next/image";
import Link from "next/link";
// import AboutAnimatedModal from "@/app/components/modals/AboutModal";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between pt-4 pl-10 pr-10 font-silkscreen h-24 fixed top-0 left-0 right-0 bg-black ">
      <div className="flex items-center gap-2">
        <Image
          src="/wordstormLogo.png"
          alt="Wordstorm Logo"
          width={40}
          height={40}
        />
        <p className="text-2xl font-bold cursor-default">Wordstorm</p>
      </div>

      <div className="flex text-lg gap-8 ">
        <Link
          href="/rules"
          className="cursor-pointer hover:text-yellowCustom hover:scale-110"
        >
          Rules
        </Link>
        <Link
          href="/"
          className="cursor-pointer hover:text-yellowCustom hover:scale-110"
        >
          Home
        </Link>
      <button className="cursor-pointer hover:text-yellowCustom hover:scale-110">
        About
      </button>
        <Link
          href="/login"
          className="cursor-pointer hover:text-yellowCustom hover:scale-110"
        >
          Log in
        </Link>
      </div>
    </nav>
  );
}

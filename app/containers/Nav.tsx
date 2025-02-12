import Image from "next/image";
import Link from "next/link";
import { silkscreen } from "../assets/fonts";

export default function NavBar() {
  return (
    <nav
      className={`flex items-center justify-between p-4 ${silkscreen.variable}`}
    >
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
          href="/pages/rules"
          className="cursor-pointer hover:text-blue-400 hover:scale-110"
        >
          Rules
        </Link>
        <Link
          href="/pages/landing"
          className="cursor-pointer hover:text-blue-400 hover:scale-110"
        >
          Home
        </Link>
        <Link
          href="/pages/about"
          className="cursor-pointer hover:text-blue-400 hover:scale-110"
        >
          About
        </Link>
        <Link
          href="/pages/login"
          className="cursor-pointer hover:text-blue-400 hover:scale-110"
        >
          Log in
        </Link>
      </div>
    </nav>
  );
}

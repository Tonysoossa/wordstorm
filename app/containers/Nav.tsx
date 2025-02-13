import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex items-center justify-between p-4 font-silkscreen">
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
        <Link
          href="/about"
          className="cursor-pointer hover:text-yellowCustom hover:scale-110"
        >
          About
        </Link>
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

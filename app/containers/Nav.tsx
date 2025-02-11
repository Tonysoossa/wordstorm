import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="flex justify-end gap-14">
      <Link href="/pages/rules" className="cursor-pointer">
        Rules
      </Link>
      <Link href="/pages/landing" className="cursor-pointer">
        Home
      </Link>
      <Link href="/pages/login" className="cursor-pointer">
        Log in
      </Link>
    </nav>
  );
}

import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="flex justify-end gap-14">
      <Link href="/" className="cursor-pointer">
        Rules
      </Link>
      <Link href="/" className="cursor-pointer">
        Home
      </Link>
      <Link href="" className="cursor-pointer">
        Log in
      </Link>
    </nav>
  );
}

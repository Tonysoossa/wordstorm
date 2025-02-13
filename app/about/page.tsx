import Link from "next/link";

export default function About() {
  return (
    <div className="font-geistMono">
      <p>This is About Page</p>
      <Link
        href="https://github.com/Tonysoossa/wordstorm"
        className="block hover:scale-110  hover:text-yellowCustom"
        target="_blank"
      >
        Repo Github
      </Link>
    </div>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <div className="font-geistMono flex flex-col items-center">
      <p>This is About Page</p>
      <Link
        href="https://github.com/Tonysoossa/wordstorm"
        className=" hover:scale-110  hover:text-yellowCustom w-fit"
        target="_blank"
      >
        Repo Github
      </Link>
    </div>
  );
}

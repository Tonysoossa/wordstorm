import {  silkscreen } from "@/app/assets/fonts";

import Link from "next/link";

export default function About() {
  return (
    <div className={`${silkscreen.variable}`}>
      <p>this is About Page</p>
      <Link
        href="https://github.com/Tonysoossa/wordstorm"
        className=" hover:scale-110 hover:text-blue-400"
        target="_blank"
      >
        Repo Github
      </Link>
    </div>
  );
}

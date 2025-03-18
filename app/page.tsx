"use client";
import CheckAuthIndex from "@/clerk/CheckAuthIndex";

export default function Home() {

  return (
    <section className="flex-col pt-18">
      <div className="pt-10 max-w-xl text-md">
        <CheckAuthIndex />
      </div>
    </section>
  );
}

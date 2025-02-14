import type { Metadata } from "next";
import { geistMono, doto, silkscreen } from "./assets/fonts";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import Footer from "@/app/containers/Footer";
import NavBar from "@/app/containers/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "WordStorm Game",
  description: "WordStorm Game made by Servanin Tony",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${doto.variable} ${silkscreen.variable} ${geistMono.variable} `}
    >
      <body className="font-geistMono flex text-center mx-auto flex-grow max-w-[1440px]">
        <BackgroundBeamsWithCollision>
          <NavBar />
          <main className="px-4 py-40 flex justify-center">{children}</main>
        </BackgroundBeamsWithCollision>
        <Footer />
      </body>
    </html>
  );
}

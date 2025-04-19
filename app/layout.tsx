import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { geistMono, silkscreen } from "../public/fonts";
import { BackgroundBeamsWithCollision } from "@/app/components/ui/background-beams-with-collision";
import { LanguageProvider } from "./assets/languages/LanguagesContext";
import { ScoreProvider } from "@/app/context/ScoreContext";
import Footer from "@/app/containers/Footer";
import NavBar from "@/app/containers/Nav";
import "./globals.css";

import CharacterCursor from "@/app/components/ui/cursor";

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
    <ClerkProvider>
      <html
        lang="fr"
        className={`${silkscreen.variable} ${geistMono.variable}`}
      >
        <LanguageProvider>
          <ScoreProvider>
            <body className="font-geistMono flex">
              <BackgroundBeamsWithCollision>
                <NavBar />
                <main className="py-28 flex justify-center text-center">
                  {children}
                </main>
              </BackgroundBeamsWithCollision>
              <Footer />
              <CharacterCursor />
            </body>
          </ScoreProvider>
        </LanguageProvider>
      </html>
    </ClerkProvider>
  );
}

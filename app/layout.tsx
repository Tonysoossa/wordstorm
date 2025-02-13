import type { Metadata } from "next";
import { geistMono, doto, silkscreen} from "./assets/fonts";
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
    <html lang="en" className={`${doto.variable} ${silkscreen.variable} ${geistMono.variable}`}>
      <body className="antialiased pr-12 pl-12 pt-2 font-geistMono">
        <NavBar />
        <main className="flex-grow text-center container mx-auto px-4 py-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

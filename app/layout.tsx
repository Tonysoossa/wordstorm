import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/app/containers/Footer";
import NavBar from "./containers/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pr-12 pl-12 pt-2`}
      >
        <NavBar />
        <main className="flex-grow text-center container mx-auto px-4 py-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

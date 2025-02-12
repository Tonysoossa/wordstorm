import { Geist_Mono } from "next/font/google";
import { Doto, Silkscreen } from "next/font/google";

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const silkscreen = Silkscreen({
  variable: "--font-silkscreen",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

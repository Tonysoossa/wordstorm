import { Geist_Mono, Doto, Silkscreen } from "next/font/google";

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-geist-mono",
});

export const doto = Doto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-doto",
});

export const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-silkscreen",
});

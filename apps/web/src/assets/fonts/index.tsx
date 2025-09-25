import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontBarrio = localFont({
  src: "./Barrio-Regular.otf",
  variable: "--font-barrio",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

export const fontGothamBook = localFont({
  src: "./GothamRounded-Book.otf",
  variable: "--font-gothambook",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

export const fontHouse = localFont({
  src: "./house-a-rama-league-night.ttf",
  variable: "--font-house",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

export const fontPeace = localFont({
  src: "./peace_sans.otf",
  variable: "--font-peace",
  weight: "300 900",
  display: "swap",
  style: "normal",
});

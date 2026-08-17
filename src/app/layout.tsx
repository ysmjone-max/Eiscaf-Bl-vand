import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/context/LangContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blåvand Eiscafé Kiel – Italienisches Gelato & dänische Atmosphäre",
  description:
    "Blåvand Eiscafé in Kiel: Italienisches Gelato, dänische Atmosphäre, Kaffee und entspannte Momente am Knooper Weg. Entdecke unsere Eissorten und besuche uns.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen flex flex-col font-sans bg-cream text-warm-brown">
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}

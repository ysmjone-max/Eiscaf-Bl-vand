"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { translations, Lang } from "@/data/translations";

type T = (typeof translations)[Lang];

type LangContextType = {
  lang: Lang;
  t: T;
  toggle: () => void;
};

const LangContext = createContext<LangContextType>({
  lang: "de",
  t: translations.de,
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("de");
  const toggle = () => setLang((l) => (l === "de" ? "en" : "de"));
  return (
    <LangContext.Provider value={{ lang, t: translations[lang], toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

"use client";
import React, { createContext, useState, useContext } from "react";

import fr from "./fr";
import eng from "./eng";

type Translations = typeof fr;

type LanguageContextType = {
  language: "fr" | "eng";
  translations: Translations;
  toggleLanguage: () => void;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  translations: fr,
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"fr" | "eng">("fr");

  const translations = language === "fr" ? fr : eng;

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "fr" ? "eng" : "fr"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

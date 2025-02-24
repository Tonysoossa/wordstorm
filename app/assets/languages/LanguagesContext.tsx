"use client";
import React, { createContext, useState, useContext } from "react";

// Import des fichiers de traductions
import fr from "./fr";
import eng from "./eng";

// Type pour les traductions
type Translations = typeof fr;

// Type pour le contexte de langue
type LanguageContextType = {
  language: "fr" | "eng";
  translations: Translations;
  toggleLanguage: () => void;
};

// Initialisation du contexte
export const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  translations: fr,
  toggleLanguage: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<"fr" | "eng">("fr");

  // Traductions basées sur la langue actuelle
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

// Hook personnalisé pour utiliser le contexte
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

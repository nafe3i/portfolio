import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import en from "@/data/en";
import fr from "@/data/fr";
import type { Language, TranslationKey, Translations } from "@/data/translations";

const LANGUAGE_STORAGE_KEY = "portfolio-language";
const DEFAULT_LANGUAGE: Language = "en";

const translations: Record<Language, Translations> = { en, fr };

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function isSupportedLanguage(language: string | null): language is Language {
  return language === "en" || language === "fr";
}

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

  if (isSupportedLanguage(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase().split("-")[0];

  return isSupportedLanguage(browserLanguage) ? browserLanguage : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.title = translations[language]["meta.title"];
    document.documentElement.lang = language;

    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", translations[language]["meta.description"]);

    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    openGraphTitle?.setAttribute("content", translations[language]["meta.title"]);

    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    openGraphDescription?.setAttribute("content", translations[language]["meta.description"]);
  }, [language]);

  function t(key: TranslationKey) {
    return translations[language][key];
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}

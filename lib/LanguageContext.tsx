"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { type Locale, translations, type Translations } from "@/lib/i18n";

const LANG_STORAGE_KEY = "sn_lang";
const VALID_LOCALES: Locale[] = ["ca", "es", "en"];

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "ca",
  setLocale: () => {},
  t: translations.ca,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ca");

  useEffect(() => {
    const stored = localStorage.getItem(LANG_STORAGE_KEY) as Locale;
    if (stored && VALID_LOCALES.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem(LANG_STORAGE_KEY, l);
    document.documentElement.lang = l;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

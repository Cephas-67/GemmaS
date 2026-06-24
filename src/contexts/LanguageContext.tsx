import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// i18n minimal — deux langues (fr/en), dictionnaire plat avec clés en kebab-case.
// Persistance dans localStorage pour conserver le choix entre sessions.

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  fr: {
    "nav.services": "Services",
    "nav.how": "Comment ça marche",
    "nav.impact": "Impact",
    "nav.about": "À propos",
    "nav.openMenu": "Ouvrir le menu",
    "nav.closeMenu": "Fermer le menu",
    "announce.text": "Démarrez votre projet avec Zara Labs · réponse sous 24h",
    "cookies.text": "En utilisant ce site, vous acceptez nos",
    "cookies.link": "cookies",
    "cookies.accept": "Accepter",
    "cookies.prefs": "Préférences cookies",
    "lang.switchTo": "Passer en anglais",
    "faq.title": "Questions fréquentes",
    "faq.eyebrow": "FAQ",
  },
  en: {
    "nav.services": "Services",
    "nav.how": "How it works",
    "nav.impact": "Impact",
    "nav.about": "About",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "announce.text": "Start your project with Zara Labs · reply within 24h",
    "cookies.text": "By using this site, you accept our",
    "cookies.link": "cookies",
    "cookies.accept": "Accept",
    "cookies.prefs": "Cookie preferences",
    "lang.switchTo": "Switch to French",
    "faq.title": "Frequently asked questions",
    "faq.eyebrow": "FAQ",
  },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dictionaries.fr) => string;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "zara-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "fr" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    localStorage.setItem(STORAGE_KEY, l);
    setLangState(l);
  };

  const t = (key: keyof typeof dictionaries.fr) =>
    dictionaries[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}

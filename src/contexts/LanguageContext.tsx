"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// i18n maison · deux langues (fr/en), dictionnaire plat avec clés en kebab-case.
// Persistance dans localStorage pour conserver le choix entre sessions.
// Toute chaîne visible à l'écran doit passer par `t(key)`.

export type Lang = "fr" | "en";

type Dict = Record<string, string>;

const dictionaries: Record<Lang, Dict> = {
  fr: {
    // Navigation
    "nav.services": "Services",
    "nav.how": "Méthode",
    "nav.about": "Équipe",
    "nav.poles": "Pôles",
    "nav.openMenu": "Ouvrir le menu",
    "nav.closeMenu": "Fermer le menu",

    // Barre d'annonce + cookies + switch langue
    "announce.text": "GemmaS · réponse à votre projet sous 24h ouvrées",
    "cookies.text": "En utilisant ce site, vous acceptez nos",
    "cookies.link": "cookies",
    "cookies.accept": "Accepter",
    "cookies.prefs": "Préférences cookies",
    "lang.switchTo": "Passer en anglais",

    // Hero · positionnement référence africaine
    "hero.title": "Concevoir, depuis Cotonou, les solutions numériques que l'Afrique mérite.",
    "hero.pitch": "GemmaS construit ses propres méthodes pour concevoir des sites, des applications mobiles natives, des logiciels sur mesure et des solutions d'intelligence artificielle. Pensés en Afrique, livrés en Afrique, pour les structures qui voient loin.",
    "hero.cta": "Démarrer un projet",

    // Services · trois familles
    "services.eyebrow": "Services",
    "services.title": "Ce que nous construisons.",
    "services.intro": "Trois pôles d'expertise, une méthode commune : exigence du livrable, ancrage local, vision long terme.",
    "services.introShort": "Trois pôles, une exigence.",
    "services.tech.title": "Tech & Développement",
    "services.tech.desc": "Sites, applications mobiles natives, logiciels sur mesure. Qualité, maintenabilité et sécurité comme standards non négociables.",
    "services.ai.title": "IA & Automatisation",
    "services.ai.desc": "Agents conversationnels, intégrations LLM, automatisations métier. L'intelligence artificielle au service de votre opérationnel.",
    "services.studio.title": "Studio & Image de marque",
    "services.studio.desc": "Identités visuelles, contenus, portfolios professionnels, formation aux outils numériques. Une présence en ligne qui inspire confiance.",

    // About · récit
    "about.title": "Une agence pensée en Afrique, conçue pour l'Afrique, ouverte au monde.",
    "about.text": "GemmaS construit ses propres méthodes, ses propres réflexes et ses propres outils. L'agence ne se contente pas de suivre les standards venus d'ailleurs : elle les redéfinit pour le terrain africain, avec une exigence de qualité, de maintenabilité et de sécurité que toute structure sérieuse attend.",

    // Recherche & R&D
    "research.eyebrow": "Recherche & R&D",
    "research.title": "Comprendre les outils avant de les déployer.",
    "research.lead": "L'IA évolue plus vite que les méthodes pour l'utiliser. GemmaS évalue, mesure et compare les modèles disponibles pour ne déployer que ceux qui apportent une vraie valeur. La même exigence s'applique à la modélisation 3D : logos, objets, drones, robots, prototypes virtuels. Chaque outil est testé, scoré et documenté avant d'arriver dans un livrable client.",
    "research.axis1.title": "Évaluation des modèles d'IA",
    "research.axis1.desc": "Benchmarks maison, tests sur cas d'usage réels, comparaison des coûts d'inférence et de la latence. Aucun modèle ne passe en production sans avoir prouvé sa pertinence sur le terrain.",
    "research.axis2.title": "Modélisation 3D",
    "research.axis2.desc": "Identités visuelles en volume, prototypes d'objets, drones et robots, rendus photoréalistes. Du croquis au support de pitch, brevet ou campagne, tout est conçu en interne.",
    "research.axis3.title": "Limites du numérique africain",
    "research.axis3.desc": "Connexion lente, devices d'entrée de gamme, coûts d'infrastructure. Travailler ces contraintes réelles, c'est repousser les limites de ce que le numérique peut faire sur le continent.",

    // Manifesto
    "manifesto.text": "Prouver que les meilleures solutions numériques pour l'Afrique peuvent être pensées, conçues et livrées depuis l'Afrique.",

    // Human brilliance · section juste avant le footer
    "brilliance.eyebrow": "Notre cap",
    "brilliance.title": "Human brilliance is more important than ever.",
    "brilliance.subtitle": "L'IA n'est pas la vedette. Elle est l'outil. La vedette, c'est la réflexion humaine qu'elle libère.",
    "brilliance.body": "GemmaS construit une communauté où chaque tâche se rend à la perfection : la pensée humaine au centre, les outils d'IA à disposition. Notre engagement va au-delà des services rendus. Il s'agit de permettre aux Africains de profiter de solutions locales, adaptées au marché, à des coûts réalistes, et de former à l'usage des outils du 21e siècle pour débloquer la créativité augmentée par l'IA.",
    "brilliance.quote": "Les meilleurs savent se procurer et se servir des bons outils.",
    "brilliance.cta": "Démarrer un projet",

    // Comment ça marche
    "how.title": "Comment ça marche.",
    "how.step1": "Diagnostic du besoin",
    "how.step2": "Cadrage du projet",
    "how.step3": "Conception & design",
    "how.step4": "Build itératif et MVP",
    "how.step5": "Mesure d'impact et suite",

    // Pôles
    "poles.title": "Trois pôles. Une seule exigence.",
    "poles.intro": "Du code aux agents IA, de l'identité de marque aux contenus, nous croisons les expertises. Chaque pôle nourrit les deux autres et renforce ce que nous livrons.",

    // Impact · secteurs cibles
    "impact.sector.1": "Entreprises africaines",
    "impact.sector.2": "Startups & scale-ups",
    "impact.sector.3": "Institutions & administrations",
    "impact.sector.4": "ONG & organisations internationales",
    "impact.sector.5": "Diaspora",
    "impact.sector.6": "Cabinets de conseil",
    "impact.sector.7": "Indépendants & cabinets libéraux",
    "impact.sector.8": "Porteurs de projets",

    // Contact
    "contact.eyebrow": "Contact",
    "contact.title": "Parlons de votre projet.",
    "contact.intro": "Une transformation à conduire, une plateforme à bâtir, un audit à mener ? Décrivez brièvement votre besoin, nous revenons vers vous sous 48h ouvrées.",
    "contact.field.name": "Nom complet",
    "contact.field.namePh": "Prénom Nom",
    "contact.field.email": "Email",
    "contact.field.emailPh": "vous@entreprise.com",
    "contact.field.org": "Organisation",
    "contact.field.orgPh": "Nom de votre structure",
    "contact.field.source": "Comment nous avez-vous trouvés ?",
    "contact.field.message": "Votre message",
    "contact.field.messagePh": "Contexte, objectifs, contraintes.",
    "contact.field.optional": "optionnel",
    "contact.submit": "Envoyer",
    "contact.submitting": "Envoi en cours…",
    "contact.success": "Message envoyé. Nous revenons vers vous sous 48h.",
    "contact.thanks": "Merci",
    "contact.err.short": "Au moins 2 caractères.",
    "contact.err.email": "Email invalide.",
    "contact.err.msg": "Au moins 20 caractères.",
    "contact.src.linkedin": "LinkedIn",
    "contact.src.google": "Google",
    "contact.src.reco": "Recommandation",
    "contact.src.event": "Événement",
    "contact.src.other": "Autre",

    // Footer
    "footer.col.services": "Services",
    "footer.col.method": "Méthode",
    "footer.col.studio": "Maison",
    "footer.link.web": "Sites web & vitrines",
    "footer.link.mobile": "Applications mobiles",
    "footer.link.custom": "Logiciels sur mesure",
    "footer.link.aiAuto": "Automatisation IA",
    "footer.link.how": "Comment ça marche",
    "footer.link.poles": "Nos pôles",
    "footer.link.impact": "Impact",
    "footer.link.team": "L'équipe",
    "footer.link.manifesto": "Manifeste",
    "footer.link.faq": "FAQ",
    "footer.legal.terms": "Mentions légales",
    "footer.legal.privacy": "Politique de confidentialité",
    "footer.legal.sitemap": "Sitemap",

    // FAQ
    "faq.title": "Questions fréquentes",
    "faq.eyebrow": "FAQ",
  },
  en: {
    // Navigation
    "nav.services": "Services",
    "nav.how": "Method",
    "nav.about": "Team",
    "nav.poles": "Areas",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",

    // Announcement bar + cookies + language switch
    "announce.text": "GemmaS · we reply to your project within 24 business hours",
    "cookies.text": "By using this site, you accept our",
    "cookies.link": "cookies",
    "cookies.accept": "Accept",
    "cookies.prefs": "Cookie preferences",
    "lang.switchTo": "Switch to French",

    // Hero
    "hero.title": "Building, from Cotonou, the digital solutions Africa deserves.",
    "hero.pitch": "GemmaS builds its own methods to design websites, native mobile apps, custom software and applied AI solutions. Conceived in Africa, delivered from Africa, for organizations that look long-term.",
    "hero.cta": "Start a project",

    // Services
    "services.eyebrow": "Services",
    "services.title": "What we build.",
    "services.intro": "Three areas of expertise, one shared method: uncompromising delivery, local roots, long-term vision.",
    "services.introShort": "Three areas, one standard.",
    "services.tech.title": "Tech & Development",
    "services.tech.desc": "Websites, native mobile apps, custom software. Quality, maintainability and security as non-negotiable standards.",
    "services.ai.title": "AI & Automation",
    "services.ai.desc": "Conversational agents, LLM integrations, business automations. Artificial intelligence in service of your operations.",
    "services.studio.title": "Studio & Brand Identity",
    "services.studio.desc": "Visual identities, content, professional portfolios, digital tools training. An online presence that inspires trust.",

    // About
    "about.title": "An agency thought in Africa, designed for Africa, open to the world.",
    "about.text": "GemmaS builds its own methods, its own reflexes and its own tools. The agency does not merely follow the standards set elsewhere: it redefines them for the African field, with the level of quality, maintainability and security that any serious organization expects.",

    // Research & R&D
    "research.eyebrow": "Research & R&D",
    "research.title": "Understand the tools before deploying them.",
    "research.lead": "AI evolves faster than the methods to use it. GemmaS evaluates, measures and compares available models to deploy only those that bring real value. The same rigor applies to 3D modeling: logos, objects, drones, robots, virtual prototypes. Each tool is tested, scored and documented before it ever reaches a client deliverable.",
    "research.axis1.title": "AI model evaluation",
    "research.axis1.desc": "In-house benchmarks, real use-case testing, comparing inference cost and latency. No model goes to production without first proving its worth in the field.",
    "research.axis2.title": "3D modeling",
    "research.axis2.desc": "Volumetric visual identities, object prototypes, drones and robots, photorealistic renders. From sketch to pitch deck, patent file or campaign asset, all designed in-house.",
    "research.axis3.title": "African digital limits",
    "research.axis3.desc": "Slow connections, entry-level devices, infrastructure costs. Working with these real constraints is how we push the limits of what digital can achieve on the continent.",

    // Manifesto
    "manifesto.text": "Proving that the best digital solutions for Africa can be conceived, designed and delivered from Africa.",

    // Human brilliance · section right above the footer
    "brilliance.eyebrow": "Our north star",
    "brilliance.title": "Human brilliance is more important than ever.",
    "brilliance.subtitle": "AI is not the star of the show. It is the tool. The star is the human thinking it sets free.",
    "brilliance.body": "GemmaS is building a community where every task is brought to perfection: human reflection at the center, AI tools at hand. Our commitment goes beyond the services we sell. It is about giving Africans access to local solutions that fit the market, at realistic costs, and training people to use 21st-century tools to unlock AI-augmented creativity.",
    "brilliance.quote": "The best know how to acquire and wield the right tools.",
    "brilliance.cta": "Start a project",

    // How it works
    "how.title": "How it works.",
    "how.step1": "Needs diagnosis",
    "how.step2": "Project scoping",
    "how.step3": "Concept & design",
    "how.step4": "Iterative build and MVP",
    "how.step5": "Impact measurement and follow-up",

    // Areas
    "poles.title": "Three areas. One single standard.",
    "poles.intro": "From code to AI agents, from brand identity to content, we cross expertise. Each area feeds the other two and reinforces what we deliver.",

    // Impact · target audiences
    "impact.sector.1": "African enterprises",
    "impact.sector.2": "Startups & scale-ups",
    "impact.sector.3": "Institutions & public sector",
    "impact.sector.4": "NGOs & international organizations",
    "impact.sector.5": "Diaspora",
    "impact.sector.6": "Consulting firms",
    "impact.sector.7": "Independents & professional practices",
    "impact.sector.8": "Project leaders",

    // Contact
    "contact.eyebrow": "Contact",
    "contact.title": "Let's talk about your project.",
    "contact.intro": "A transformation to lead, a platform to build, an audit to run? Briefly describe your need, we will get back to you within 48 business hours.",
    "contact.field.name": "Full name",
    "contact.field.namePh": "First name Last name",
    "contact.field.email": "Email",
    "contact.field.emailPh": "you@company.com",
    "contact.field.org": "Organization",
    "contact.field.orgPh": "Your organization name",
    "contact.field.source": "How did you find us?",
    "contact.field.message": "Your message",
    "contact.field.messagePh": "Context, goals, constraints.",
    "contact.field.optional": "optional",
    "contact.submit": "Send",
    "contact.submitting": "Sending…",
    "contact.success": "Message sent. We will get back to you within 48h.",
    "contact.thanks": "Thank you",
    "contact.err.short": "At least 2 characters.",
    "contact.err.email": "Invalid email.",
    "contact.err.msg": "At least 20 characters.",
    "contact.src.linkedin": "LinkedIn",
    "contact.src.google": "Google",
    "contact.src.reco": "Referral",
    "contact.src.event": "Event",
    "contact.src.other": "Other",

    // Footer
    "footer.col.services": "Services",
    "footer.col.method": "Method",
    "footer.col.studio": "Studio",
    "footer.link.web": "Websites",
    "footer.link.mobile": "Mobile apps",
    "footer.link.custom": "Custom software",
    "footer.link.aiAuto": "AI automation",
    "footer.link.how": "How it works",
    "footer.link.poles": "Our areas",
    "footer.link.impact": "Impact",
    "footer.link.team": "The team",
    "footer.link.manifesto": "Manifesto",
    "footer.link.faq": "FAQ",
    "footer.legal.terms": "Legal notice",
    "footer.legal.privacy": "Privacy policy",
    "footer.legal.sitemap": "Sitemap",

    // FAQ
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

const STORAGE_KEY = "gemmas-lang";

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
    dictionaries[lang][key] ?? dictionaries.fr[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}

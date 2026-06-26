export type Pole = {
  id: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  description: string;
  descriptionEn: string;
  image: string;
};

// Trois pôles GemmaS, structure conservée. Champs `*En` consommés quand
// `lang === "en"` dans les composants qui rendent ces items (FlowingMenu Poles,
// etc.). Visuels Picsum en attendant les images définitives, seed stable.
export const poles: Pole[] = [
  {
    id: "tech",
    title: "Tech & Développement",
    titleEn: "Tech & Development",
    tagline: "Sites, applis mobiles natives, logiciels sur mesure.",
    taglineEn: "Websites, native mobile apps, custom software.",
    description:
      "Sites web, applications mobiles natives, plateformes et back-offices. Qualité, maintenabilité et sécurité comme standards non négociables, du premier commit à la mise en production.",
    descriptionEn:
      "Websites, native mobile apps, platforms and back-offices. Quality, maintainability and security as non-negotiable standards, from the first commit to production rollout.",
    image: "https://picsum.photos/seed/gemmas-tech/800/500",
  },
  {
    id: "ai",
    title: "IA & Automatisation",
    titleEn: "AI & Automation",
    tagline: "Agents conversationnels, intégrations LLM, automatisations métier.",
    taglineEn: "Conversational agents, LLM integrations, business automations.",
    description:
      "Agents conversationnels intégrés à vos données, automatisations n8n et Make, intégrations LLM dans vos outils métier. L'intelligence artificielle au service de votre opérationnel, pas l'inverse.",
    descriptionEn:
      "Conversational agents wired to your data, n8n and Make automations, LLM integrations in your business tools. Artificial intelligence in service of your operations, not the other way around.",
    image: "https://picsum.photos/seed/gemmas-ai/800/500",
  },
  {
    id: "studio",
    title: "Studio & Image de marque",
    titleEn: "Studio & Brand Identity",
    tagline: "Identités, contenus, portfolios, formation aux outils numériques.",
    taglineEn: "Identities, content, portfolios, digital tools training.",
    description:
      "Identités visuelles, contenus pour les réseaux, portfolios professionnels, sessions de formation aux outils numériques. Une présence en ligne pensée pour inspirer confiance.",
    descriptionEn:
      "Visual identities, social content, professional portfolios, digital tools training. An online presence designed to inspire trust.",
    image: "https://picsum.photos/seed/gemmas-studio/800/500",
  },
];

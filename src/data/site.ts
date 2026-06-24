// Méta du site et coordonnées Zara Labs.
export const site = {
  name: "Zara Labs",
  wordmark: "ZARA LABS",
  tagline: "Innovation tech, conseil et impact.",
  description:
    "Start-up tech béninoise. Plateformes numériques, IA, accompagnement de PME et startups, HealthTech et AgriTech.",
  country: "Bénin",
  year: new Date().getFullYear(),
  contact: {
    email: "contact@zaralabs.bj",
    phone: "+229 00 00 00 00",
    address: "Cotonou, Bénin",
  },
  nav: [
    { label: "Pôles", href: "#poles" },
    { label: "Services", href: "#services" },
    { label: "Impact", href: "#impact" },
    { label: "À propos", href: "#about" },
  ],
  // Colonnes du footer (pattern micro1 : 4 catégories + base bottom).
  footerColumns: [
    {
      heading: "Pôles",
      links: [
        { label: "Tech & Innovation", href: "#poles" },
        { label: "Conseil & Accompagnement", href: "#poles" },
        { label: "HealthTech & AgriTech", href: "#poles" },
      ],
    },
    {
      heading: "Services",
      links: [
        { label: "Plateformes numériques", href: "#services" },
        { label: "Solutions IA", href: "#services" },
        { label: "Audits techniques", href: "#services" },
        { label: "Coaching & incubation", href: "#services" },
      ],
    },
    {
      heading: "Maison",
      links: [
        { label: "À propos", href: "#about" },
        { label: "Impact", href: "#impact" },
        { label: "Comment ça marche", href: "#how" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  legal: [
    { label: "Mentions légales", href: "#" },
    { label: "Politique de confidentialité", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
};

export const stats = [
  { value: "3", suffix: "", label: "Pôles d'expertise" },
  { value: "12", suffix: "+", label: "Services proposés" },
  { value: "100", suffix: "%", label: "Ancrage Bénin" },
  { value: "24", suffix: "/7", label: "Engagement client" },
];

export const sectors = [
  "Santé",
  "Agriculture",
  "Énergie",
  "Logistique",
  "Éducation",
  "Finance",
  "Administration publique",
  "ONG & développement",
];

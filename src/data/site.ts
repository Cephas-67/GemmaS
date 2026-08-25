// Méta du site et coordonnées GemmaS.
export const site = {
  name: "GemmaS",
  wordmark: "GEMMAS",
  tagline: "Référence africaine du numérique. Conçue et livrée depuis Cotonou.",
  description:
    "GemmaS est une agence digitale fondée à Cotonou. Elle conçoit, depuis l'Afrique, des sites web, applications mobiles natives, logiciels sur mesure et solutions d'intelligence artificielle pour les entreprises, institutions et porteurs de projets qui visent une présence numérique sérieuse.",
  country: "Bénin",
  year: new Date().getFullYear(),
  contact: {
    email: "contact@gemmas.africa",
    phone: "+229 00 00 00 00",
    address: "Cotonou, Bénin",
  },
  nav: [
    { label: "Services", href: "#services" },
    { label: "Méthode", href: "#how" },
    { label: "Équipe", href: "#about" },
    { label: "Pôles", href: "#poles" },
  ],
  // Colonnes du footer · pattern 4 catégories + base bottom.
  footerColumns: [
    {
      heading: "Services",
      links: [
        { label: "Sites web & vitrines", href: "#services" },
        { label: "Applications mobiles", href: "#services" },
        { label: "Logiciels sur mesure", href: "#services" },
        { label: "Automatisation IA", href: "#services" },
      ],
    },
    {
      heading: "Méthode",
      links: [
        { label: "Comment ça marche", href: "#how" },
        { label: "Nos pôles", href: "#poles" },
        { label: "Impact", href: "#impact" },
      ],
    },
    {
      heading: "Maison",
      links: [
        { label: "L'équipe", href: "#about" },
        { label: "Manifeste", href: "#manifesto" },
        { label: "FAQ", href: "#faq" },
      ],
    },
  ],
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/gemmasbj/" },
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
  { value: "5", suffix: "j", label: "Délai moyen site vitrine" },
  { value: "5", suffix: "", label: "Co-fondateurs engagés" },
  { value: "100", suffix: "%", label: "Basés à Cotonou" },
  { value: "0", suffix: "", label: "Bug critique toléré" },
];

export const sectors = [
  "PME béninoises",
  "Startups africaines",
  "Diaspora",
  "ONG & associations",
  "Indépendants",
  "Cabinets de conseil",
  "Commerces locaux",
  "Porteurs de projets",
];

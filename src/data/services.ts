export type Service = {
  id: string;
  category: "tech" | "conseil" | "impact";
  title: string;
  description: string;
};

// Catégories conservées telles quelles pour ne pas casser les filtres
// existants de la section Services. Le contenu reflète l'offre GemmaS.
export const services: Service[] = [
  // Tech & dev
  {
    id: "websites",
    category: "tech",
    title: "Sites web & vitrines",
    description: "Site rapide, sobre, livré en 5 jours. Pensé mobile d'abord, optimisé pour le référencement.",
  },
  {
    id: "mobile",
    category: "tech",
    title: "Applications mobiles natives",
    description: "Android et iOS, avec un vrai souci de l'expérience locale : connexion lente, devices d'entrée de gamme.",
  },
  {
    id: "custom",
    category: "tech",
    title: "Logiciels sur mesure",
    description: "Plateformes web, back-offices, outils internes. Architecture sobre, code maintenable.",
  },
  {
    id: "automation",
    category: "tech",
    title: "Automatisation IA",
    description: "Workflows n8n, Make, intégrations LLM. Vous récupérez les heures perdues sur les tâches répétitives.",
  },
  // Conseil & accompagnement
  {
    id: "agents",
    category: "conseil",
    title: "Agents IA & chatbots",
    description: "Assistants conversationnels branchés sur vos données. Service client, qualification de prospects, support interne.",
  },
  {
    id: "audit",
    category: "conseil",
    title: "Audit digital",
    description: "État des lieux de votre présence en ligne et de vos outils. Plan d'action priorisé, sans jargon.",
  },
  {
    id: "portfolios",
    category: "conseil",
    title: "Portfolios & CV pro",
    description: "Pour indépendants, créatifs et porteurs de projets. Un vrai support de candidature, pas juste un CV.",
  },
  {
    id: "maintenance",
    category: "conseil",
    title: "Maintenance & évolutions",
    description: "Contrats mensuels pour garder votre site à jour, sécurisé et performant.",
  },
  // Impact (placeholders alimentés au fur et à mesure)
  {
    id: "training",
    category: "impact",
    title: "Formation outils numériques",
    description: "Sessions courtes pour vos équipes : prise en main d'un CMS, bonnes pratiques IA, hygiène numérique.",
  },
  {
    id: "branding",
    category: "impact",
    title: "Identité de marque",
    description: "Logo, charte couleurs, typographie, gabarits réseaux. La base visuelle d'une présence cohérente.",
  },
  {
    id: "content",
    category: "impact",
    title: "Production de contenu",
    description: "Visuels IA, vidéos courtes, posts LinkedIn et Instagram pensés pour votre audience.",
  },
  {
    id: "ecommerce",
    category: "impact",
    title: "E-commerce local",
    description: "Boutique en ligne adaptée aux moyens de paiement africains, livraison locale incluse.",
  },
];

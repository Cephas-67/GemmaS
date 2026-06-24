export type Service = {
  id: string;
  category: "tech" | "conseil" | "impact";
  title: string;
  description: string;
};

export const services: Service[] = [
  // Tech & Innovation
  {
    id: "platforms",
    category: "tech",
    title: "Plateformes numériques",
    description: "Web, mobile, back-office. Architectures cloud, scalables, sécurisées.",
  },
  {
    id: "logistics",
    category: "tech",
    title: "Applications logistiques",
    description: "Suivi de flotte, gestion d'inventaire, traçabilité terrain.",
  },
  {
    id: "ai",
    category: "tech",
    title: "Solutions IA",
    description: "Vision, NLP, prédiction. Modèles entraînés sur données métier locales.",
  },
  {
    id: "rd",
    category: "tech",
    title: "R&D produit",
    description: "Prototypage rapide, MVP testables, expérimentations contrôlées.",
  },
  // Conseil
  {
    id: "audit",
    category: "conseil",
    title: "Audits techniques",
    description: "Diagnostic d'existant, cartographie risques, plan de remédiation.",
  },
  {
    id: "engineering",
    category: "conseil",
    title: "Ingénierie de projets",
    description: "Cadrage, planification, livrables. De l'idée au déploiement.",
  },
  {
    id: "coaching",
    category: "conseil",
    title: "Coaching & incubation",
    description: "Mentorat fondateurs, structuration produit, accès aux marchés.",
  },
  {
    id: "strategy",
    category: "conseil",
    title: "Stratégie opérationnelle",
    description: "Accompagnement long terme pour PME, startups, porteurs de projets.",
  },
  // Impact
  {
    id: "healthtech",
    category: "impact",
    title: "Outils HealthTech",
    description: "Gestion médicale, dossiers patients, télémédecine adaptée au contexte local.",
  },
  {
    id: "agritech",
    category: "impact",
    title: "Solutions AgriTech",
    description: "Suivi cultures, prévision, traçabilité chaîne de valeur agricole.",
  },
  {
    id: "circular",
    category: "impact",
    title: "Économie circulaire",
    description: "Outils de mesure, valorisation des flux, modèles éco-responsables.",
  },
  {
    id: "energy",
    category: "impact",
    title: "Transition énergétique",
    description: "Pilotage consommation, énergies renouvelables, optimisation des usages.",
  },
];

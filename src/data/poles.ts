export type Pole = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
};

// Images placeholders thématiques (à remplacer par des visuels client).
// Picsum avec seed = même image à chaque chargement.
export const poles: Pole[] = [
  {
    id: "tech",
    title: "Tech & Innovation",
    tagline: "Plateformes numériques, IA appliquée, R&D produit.",
    description:
      "Plateformes web et mobile sur-mesure, applications logistiques, solutions IA entraînées sur données métier, prototypage rapide de MVP.",
    image: "https://picsum.photos/seed/zara-tech/800/500",
  },
  {
    id: "conseil",
    title: "Conseil & Accompagnement",
    tagline: "Études, audits, ingénierie de projets, coaching, incubation.",
    description:
      "Diagnostic d'existant, cartographie des risques, plan de remédiation. Mentorat fondateurs, accès aux marchés, accompagnement long terme.",
    image: "https://picsum.photos/seed/zara-conseil/800/500",
  },
  {
    id: "impact",
    title: "HealthTech & AgriTech",
    tagline: "Santé, agriculture durable, transition énergétique.",
    description:
      "Outils de gestion médicale, suivi cultures, traçabilité chaîne de valeur agricole, mesure et valorisation des flux pour l'économie circulaire.",
    image: "https://picsum.photos/seed/zara-impact/800/500",
  },
];

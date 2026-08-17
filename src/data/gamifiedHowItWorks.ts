export type Step = {
  id: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
};

// content identique sur les 3 étapes : placeholder en attente de la vraie
// copy par étape, pas une erreur de centralisation. contentEn traduit ce
// même placeholder, il ne l'enrichit pas.
export const steps: Step[] = [
  {
    id: 0,
    title: "Immersion & Diagnostic",
    titleEn: "Immersion & Diagnosis",
    content: "Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.",
    contentEn: "In-depth analysis of your challenges and modeling of your functional needs.",
  },
  {
    id: 1,
    title: "Conception & Prototypage",
    titleEn: "Design & Prototyping",
    content: "Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.",
    contentEn: "In-depth analysis of your challenges and modeling of your functional needs.",
  },
  {
    id: 2,
    title: "Déploiement & Suivi",
    titleEn: "Deployment & Follow-up",
    content: "Analyse approfondie de vos enjeux et modélisation de vos besoins fonctionnels.",
    contentEn: "In-depth analysis of your challenges and modeling of your functional needs.",
  },
];

export type Step = {
  id: number;
  title: string;
  titleEn: string;
  content: string;
  contentEn: string;
};

export const steps: Step[] = [
  {
    id: 0,
    title: "Immersion & Diagnostic",
    titleEn: "Immersion & Diagnosis",
    content: "On étudie votre activité avant d'écrire une ligne de code. Périmètre cadré, zéro ambiguïté sur ce qui sera livré.",
    contentEn: "We study your business before writing a single line of code. Clear scope, zero ambiguity on what gets delivered.",
  },
  {
    id: 1,
    title: "Conception & Prototypage",
    titleEn: "Design & Prototyping",
    content: "Maquettes et architecture validées avec vous avant le développement. Vous voyez le produit avant qu'il n'existe.",
    contentEn: "Mockups and architecture validated with you before development starts. You see the product before it exists.",
  },
  {
    id: 2,
    title: "Déploiement & Suivi",
    titleEn: "Deployment & Follow-up",
    content: "Mise en ligne selon nos standards non négociables, puis suivi actif : votre projet ne devient pas une boîte noire abandonnée.",
    contentEn: "Launched to our non-negotiable standards, then actively monitored: your project never becomes an abandoned black box.",
  },
];

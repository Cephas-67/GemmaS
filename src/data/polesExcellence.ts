import { BrainCircuit, Laptop, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Accent = "blue" | "green" | "amber";

export type PoleExcellence = {
  id: string;
  icon: LucideIcon;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  accent: Accent;
};

// 3 pôles d'excellence, distincts des `poles` existants (Tech & Développement /
// IA & Automatisation / Studio) : ceux-ci décrivent des domaines techniques
// précis (web, mobile, IA) plutôt que des offres commerciales.
export const polesExcellence: PoleExcellence[] = [
  {
    id: "web",
    icon: Laptop,
    title: "Ingénierie Web & Plateformes écosystémiques",
    titleEn: "Web Engineering & Ecosystem Platforms",
    description:
      "Conception d'infrastructures web hautement performantes, scalables et dotées d'interfaces d'une clarté remarquable.",
    descriptionEn:
      "Design of highly performant, scalable web infrastructures with remarkably clear interfaces.",
    accent: "blue",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Écosystèmes Mobiles Natifs",
    titleEn: "Native Mobile Ecosystems",
    description:
      "Développement d'applications immersives pour iOS et Android, garantissant une expérience utilisateur ergonomique et sans friction.",
    descriptionEn:
      "Development of immersive iOS and Android apps, delivering an ergonomic, frictionless user experience.",
    accent: "green",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "Intelligence Artificielle & Algorithmes sur mesure",
    titleEn: "Artificial Intelligence & Custom Algorithms",
    description:
      "Automatisation avancée des processus métiers, modélisation de données et intégration d'IA pour catalyser votre productivité.",
    descriptionEn:
      "Advanced business process automation, data modeling and AI integration to catalyze your productivity.",
    accent: "amber",
  },
];

import { Cpu, MonitorCheck, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ValueItem = {
  id: string;
  title: string;
  titleEn: string;
  icon: LucideIcon;
};

export const values: ValueItem[] = [
  {
    id: "agility",
    title: "Agilité et réactivité stratégiques",
    titleEn: "Strategic agility and responsiveness",
    icon: Zap,
  },
  {
    id: "technology",
    title: "Technologies d'avant-garde",
    titleEn: "Cutting-edge technologies",
    icon: Cpu,
  },
  {
    id: "impact",
    title: "Culture du résultat et de l'impact",
    titleEn: "A culture of results and impact",
    icon: MonitorCheck,
  },
];

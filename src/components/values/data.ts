import { Cpu, MonitorCheck, Zap } from "lucide-react";
import type { ValueItem } from "./types";

export const values: ValueItem[] = [
  {
    id: "agility",
    title: "Agilité et réactivité stratégiques",
    icon: Zap,
  },
  {
    id: "technology",
    title: "Technologies d'avant-garde",
    icon: Cpu,
  },
  {
    id: "impact",
    title: "Culture du résultat et de l'impact",
    icon: MonitorCheck,
  },
];

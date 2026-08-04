import type { TeamMember } from "./types";

// Mêmes 5 fondateurs et mêmes portraits que src/components/sections/About.tsx.
// portfolioUrl est un placeholder "#" en attendant les vrais liens.
export const team: TeamMember[] = [
  {
    id: "duvalier",
    name: "Duvalier",
    role: "CSO · Commercial & Clients",
    avatar: "/founders/DuvIllustrated.png",
    focus: "top",
    portfolioUrl: "#",
  },
  {
    id: "enock",
    name: "Enock",
    role: "CTO · Tech & IA",
    avatar: "/founders/MarthIllustrated.png",
    focus: "top",
    portfolioUrl: "#",
  },
  {
    id: "prudence",
    name: "Prudence",
    role: "CEO · Vision & Stratégie",
    avatar: "/founders/PrudenceIllustrated.png",
    focus: "center",
    portfolioUrl: "#",
  },
  {
    id: "simeon",
    name: "Siméon",
    role: "CMO · Marketing & Contenu",
    avatar: "/founders/simeonillustrated.jpg",
    focus: "center",
    portfolioUrl: "#",
  },
  {
    id: "gaby",
    name: "Gaby",
    role: "COO · Opérations & Process",
    avatar: "/founders/gabyillustrated.jpg",
    focus: "topZoom",
    portfolioUrl: "#",
  },
];

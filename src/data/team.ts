// Même logique de crop que About.tsx (Folder des fondateurs) : ce champ règle
// l'object-position/scale du portrait pour qu'il ne soit pas mal cadré une
// fois dans le rond ou dans la miniature de la card.
export type TeamFocus = "top" | "center" | "topZoom";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  focus: TeamFocus;
  portfolioUrl: string;
};

// Mêmes 5 fondateurs et mêmes portraits que src/components/sections/About.tsx.
// portfolioUrl est un placeholder "#" en attendant les vrais liens.
export const team: TeamMember[] = [
  {
    id: "duvalier",
    name: "Duvalier",
    role: "CSO · Commercial & Clients",
    avatar: "/founders/DuvIllustrated.png",
    focus: "top",
    portfolioUrl: "https://duvaliersewade.vercel.app/",
  },
  {
    id: "enock",
    name: "Enock",
    role: "CTO · Tech & IA",
    avatar: "/founders/MarthIllustrated.png",
    focus: "top",
    portfolioUrl: "https://portfolio-ely514.vercel.app/",
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
    portfolioUrl: "http://simeonamoussou.com/",
  },
  {
    id: "gaby",
    name: "Gaby",
    role: "COO · Opérations & Process",
    avatar: "/founders/gabyillustrated.jpg",
    focus: "topZoom",
    portfolioUrl: "http://dossagaby.vercel.app/",
  },
];

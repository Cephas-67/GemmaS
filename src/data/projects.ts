export type Project = {
  id: string;
  name: string;
  image: string;
  href?: string;
};

// Le premier projet est mis en avant (grande carte), les suivants
// alimentent la colonne de miniatures. e-freeshop.com est notre seul
// produit propre en ligne à ce jour, mis en avant en featured avec un lien
// et un visuel réels ; les autres restent des placeholders picsum
// (href="#") en attendant les vraies réalisations clients.
export const defaultProjects: Project[] = [
  {
    id: "e-freeshop",
    name: "e-freeshop.com",
    image: "/images/projects/e-freeshop.com.png",
    href: "https://e-freeshop.com",
  },
  {
    id: "finn7",
    name: "Finn7",
    image: "https://picsum.photos/seed/gemmas-finn7/1200/675",
    href: "#",
  },
  {
    id: "hindsloop-focus",
    name: "Hindsloop · Focus",
    image: "https://picsum.photos/seed/gemmas-hindsloop-focus/600/300",
    href: "#",
  },
  {
    id: "hindsloop-copilot",
    name: "Hindsloop · Co-Pilot",
    image: "https://picsum.photos/seed/gemmas-hindsloop-copilot/600/300",
    href: "#",
  },
  {
    id: "hindsloop-mindful",
    name: "Hindsloop · Mindful",
    image: "https://picsum.photos/seed/gemmas-hindsloop-mindful/600/300",
    href: "#",
  },
];

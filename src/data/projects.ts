export type Project = {
  id: string;
  name: string;
  image: string;
  href?: string;
  /** Pas encore en ligne : l'image est floutée jusqu'à ne plus rien montrer,
   *  la carte porte la mention « bientôt » et ne mène nulle part. */
  bientot?: boolean;
};

// Le premier projet est mis en avant (grande carte), les suivants
// alimentent la colonne de miniatures. e-freeshop.com est en ligne, avec son
// lien et son visuel réels. Les trois autres sont de vrais projets du studio,
// pas encore sortis : leurs images ne servent que de matière de couleur sous
// le flou, rien ne doit s'y reconnaître.
export const defaultProjects: Project[] = [
  {
    id: "e-freeshop",
    name: "e-freeshop.com",
    image: "/images/projects/e-freeshop.com.png",
    href: "https://e-freeshop.com",
  },
  {
    id: "god2",
    name: "GOD2",
    image: "/images/projects/bientot-god2.jpg",
    bientot: true,
  },
  {
    id: "raven",
    name: "R.A.V.E.N",
    image: "/images/projects/bientot-raven.jpg",
    bientot: true,
  },
  {
    id: "event-guru",
    name: "Event GURU",
    image: "/images/projects/bientot-event-guru.jpg",
    bientot: true,
  },
];

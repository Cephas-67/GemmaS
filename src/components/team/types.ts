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

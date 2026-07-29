import type { Project } from "./types";

type ProjectThumbnailProps = {
  project: Project;
};

// Petite carte de la colonne de droite · même traitement visuel que la
// carte principale, en réduit, sans le bouton de coin.
export function ProjectThumbnail({ project }: ProjectThumbnailProps) {
  return (
    <a
      href={project.href}
      className="group relative block aspect-[2/1] w-full overflow-hidden rounded-2xl bg-muted"
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
      />
    </a>
  );
}

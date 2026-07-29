import { ArrowUpRight } from "lucide-react";
import type { Project } from "./types";

type FeaturedProjectProps = {
  project: Project;
};

// Grande carte de gauche · visuel plein cadre + bouton rond "voir le projet"
// ancré dans le coin bas-droit, superposé à l'image.
export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <a
      href={project.href}
      className="group relative block w-full h-full overflow-hidden rounded-3xl bg-muted"
    >
      <img
        src={project.image}
        alt={project.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 ease-smooth group-hover:scale-110"
      >
        <ArrowUpRight className="h-5 w-5" />
      </span>
    </a>
  );
}

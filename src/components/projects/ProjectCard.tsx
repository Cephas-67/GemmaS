"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "./types";

type ProjectCardProps = {
  project: Project;
  variant: "featured" | "thumbnail";
  onSelect?: () => void;
  style?: CSSProperties;
};

// Ressort partagé avec le morph de la navbar (Navbar.tsx) · même sensation
// dans toute l'UI pour les transitions de layout.
const cardSpring = { type: "spring" as const, stiffness: 300, damping: 32, mass: 0.8 };

// Carte de projet unique, utilisée pour la grande vignette (featured) comme
// pour les miniatures. L'instance ne démonte jamais : seule sa `grid-area`
// (assignée par le parent via `style`) change quand on clique une miniature.
// `layout` anime alors le déplacement/redimensionnement en FLIP, sans les
// artefacts qu'un `layoutId` produit quand l'élément change de parent DOM.
export function ProjectCard({ project, variant, onSelect, style }: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      layout
      transition={cardSpring}
      style={style}
      className={cn(
        "group relative w-full overflow-hidden bg-muted",
        isFeatured ? "aspect-[16/9] rounded-3xl lg:aspect-auto" : "aspect-[2/1] rounded-2xl lg:aspect-auto",
      )}
    >
      {isFeatured ? (
        <a href={project.href} className="absolute inset-0 block">
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
      ) : (
        <button
          type="button"
          onClick={onSelect}
          aria-label={`Afficher le projet ${project.name}`}
          className="absolute inset-0 block"
        >
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          />
        </button>
      )}
    </motion.div>
  );
}

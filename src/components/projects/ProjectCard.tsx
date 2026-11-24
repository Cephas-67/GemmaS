"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";
import { useLang } from "@/contexts/LanguageContext";

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
  const { t, lang } = useLang();
  const isFeatured = variant === "featured";
  const bientot = Boolean(project.bientot);

  // Un projet à venir : l'image n'est plus qu'une matière de couleur. Le
  // flou déborde des bords, d'où l'agrandissement qui garde les coins pleins.
  const image = (
    <img
      src={project.image}
      alt={bientot ? "" : project.name}
      loading="lazy"
      className={cn(
        "h-full w-full object-cover transition-transform duration-500 ease-smooth",
        bientot ? "scale-150 blur-[48px] saturate-150" : "group-hover:scale-105",
      )}
    />
  );

  // Le nom au centre, la mention « bientôt » rangée en bas à droite, à la
  // place qu'occupe la flèche sur un projet en ligne.
  const mention = bientot && (
    <div className="absolute inset-0 bg-black/25 text-white">
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center text-center font-display font-medium tracking-[-0.03em]",
          isFeatured ? "text-[clamp(2.5rem,6vw,4.5rem)] leading-none" : "text-xl leading-tight",
        )}
      >
        {project.name}
      </span>
      <span
        className={cn(
          // En casse normale : les petites capitales espacées sont un tic
          // d'interface générée (règles de typographie du studio).
          "absolute rounded-full border border-white/40 bg-white/10 font-medium",
          isFeatured ? "bottom-4 right-4 px-4 py-1.5 text-sm" : "bottom-3 right-3 px-3 py-1 text-xs",
        )}
      >
        {t("projects.soon")}
      </span>
    </div>
  );

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
        bientot ? (
          <div className="absolute inset-0" role="img" aria-label={`${project.name}, ${t("projects.soon")}`}>
            {image}
            {mention}
          </div>
        ) : (
          <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block">
            {image}
            <span
              aria-hidden="true"
              className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-foreground text-background transition-transform duration-300 ease-smooth group-hover:scale-110"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </a>
        )
      ) : (
        <button
          type="button"
          onClick={onSelect}
          aria-label={lang === "en" ? `Show project ${project.name}` : `Afficher le projet ${project.name}`}
          className="absolute inset-0 block"
        >
          {image}
          {mention}
        </button>
      )}
    </motion.div>
  );
}

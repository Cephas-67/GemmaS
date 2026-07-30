"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectPagination } from "@/components/projects/ProjectPagination";
import { defaultProjects } from "@/components/projects/data";
import type { Project } from "@/components/projects/types";

type RecentProjectsProps = {
  title?: string;
  projects?: Project[];
  ctaLabel?: string;
  ctaHref?: string;
};

// Section "Projets récents" · une seule ProjectCard par projet visible,
// jamais démontée. Cliquer une miniature échange sa place avec la featured :
// state = quel id occupe le slot "featured" + quels ids occupent les 3 slots
// "thumb-N". Comme chaque carte garde la même clé react à travers les
// rendus, `layout` (voir ProjectCard) anime le déplacement en douceur.
export default function RecentProjects({
  title = "Projets récents",
  projects = defaultProjects,
  ctaLabel = "Explorer le portfolio",
  ctaHref = "#",
}: RecentProjectsProps) {
  const [featuredId, setFeaturedId] = useState(projects[0]?.id);
  const [thumbIds, setThumbIds] = useState(() => projects.slice(1, 4).map((p) => p.id));

  const featured = projects.find((p) => p.id === featuredId) ?? projects[0];
  const activeIndex = projects.findIndex((p) => p.id === featured.id);

  const visible = [featuredId, ...thumbIds]
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is Project => Boolean(p));

  function selectThumbnail(clickedId: string) {
    setThumbIds((prev) => prev.map((id) => (id === clickedId ? featuredId : id)));
    setFeaturedId(clickedId);
  }

  return (
    <section
      id="recent-projects"
      aria-labelledby="recent-projects-title"
      className="bg-background py-20 text-foreground sm:py-24 lg:py-28"
    >
      <Container size="wide">
        <h2
          id="recent-projects-title"
          className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium tracking-[-0.025em]"
        >
          {title}
        </h2>

        <div className="recent-projects-grid mt-10">
          {visible.map((project) => {
            const isFeatured = project.id === featuredId;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                variant={isFeatured ? "featured" : "thumbnail"}
                onSelect={() => selectThumbnail(project.id)}
                style={{
                  gridArea: isFeatured ? "featured" : `thumb-${thumbIds.indexOf(project.id)}`,
                  order: isFeatured ? 0 : 2,
                }}
              />
            );
          })}

          <ProjectPagination
            total={projects.length}
            activeIndex={activeIndex}
            label={featured.name}
            style={{ gridArea: "pagination", order: 1 }}
          />
        </div>

        <div className="mt-10 flex w-full gap-5">
          <CTAButton
            as="a"
            href={ctaHref}
            className="mt-1 ml-auto bg-brand-green text-white hover:bg-brand-green-deep"
          >
            {ctaLabel}
          </CTAButton>
        </div>
      </Container>
    </section>
  );
}

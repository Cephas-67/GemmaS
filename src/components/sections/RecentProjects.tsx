import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { FeaturedProject } from "@/components/projects/FeaturedProject";
import { ProjectThumbnail } from "@/components/projects/ProjectThumbnail";
import { ProjectPagination } from "@/components/projects/ProjectPagination";
import { defaultProjects } from "@/components/projects/data";
import type { Project } from "@/components/projects/types";

type RecentProjectsProps = {
    title?: string;
    projects?: Project[];
    activeIndex?: number;
    ctaLabel?: string;
    ctaHref?: string;
};

// Section "Projets récents" · grande carte du projet actif à gauche,
// colonne de miniatures à droite, pagination sous la carte principale.
export default function RecentProjects({
    title = "Projets récents",
    projects = defaultProjects,
    activeIndex = 0,
    ctaLabel = "Explorer le portfolio",
    ctaHref = "#",
}: RecentProjectsProps) {
    const featured = projects[activeIndex] ?? projects[0];
    const thumbnails = projects.filter((_, index) => index !== activeIndex).slice(0, 3);

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

                <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_320px] lg:gap-6">
                    <div className="flex flex-col gap-5">
                        <FeaturedProject project={featured} />
                        {/* <ProjectPagination total={projects.length} activeIndex={activeIndex} label={featured.name} /> */}
                    </div>

                    <div className="flex flex-col gap-4">
                        {thumbnails.map((project) => (
                            <ProjectThumbnail key={project.id} project={project} />
                        ))}

                    </div>
                </div>
                <div className="mt-10 flex gap-5 w-full">
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

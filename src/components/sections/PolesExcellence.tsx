"use client";

import { Container } from "@/components/ui/Container";
import { GlassG } from "../values/GlassG";
import { cn } from "@/lib/utils";
import { polesExcellence, type Accent, type PoleExcellence as Pole } from "@/data/polesExcellence";
import { useLang } from "@/contexts/LanguageContext";

// Classes Tailwind statiques par accent (une couleur de marque par carte).
// On passe par cette table plutôt que par une classe générée dynamiquement
// (ex. `bg-brand-${accent}`), que le scanner Tailwind ne détecterait pas.
const accentGlow: Record<Accent, string> = {
  blue: "bg-brand-blue",
  green: "bg-brand-green",
  amber: "bg-brand-amber",
};

const accentBorder: Record<Accent, string> = {
  blue: "group-hover:border-brand-blue/30",
  green: "group-hover:border-brand-green/30",
  amber: "group-hover:border-brand-amber/30",
};

// Arcs concentriques décoratifs, dans l'esprit de ValuesConnector : de simples
// cercles (bordure seule, très discrets) plutôt qu'un asset SVG dédié, faute
// d'export précis pour ce motif.
function DecorativeArcs() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-[36rem] w-[36rem] shrink-0">
        <div className="absolute inset-0 rounded-full border border-foreground/[0.06]" />
        <div className="absolute inset-[15%] rounded-full border border-foreground/[0.06]" />
        <div className="absolute inset-[30%] rounded-full border border-foreground/[0.06]" />
      </div>
    </div>
  );
}

function PoleCard({ pole }: { pole: Pole }) {
  const Icon = pole.icon;
  const { lang } = useLang();
  const title = lang === "en" ? pole.titleEn : pole.title;
  const description = lang === "en" ? pole.descriptionEn : pole.description;

  return (
    <div className="group relative">
      {/* Lueur unie (une seule couleur de marque par carte, cf. accentGlow) :
          masquée par défaut, seul le survol la révèle, en restant discrète
          (opacity-0 → group-hover:opacity-20). Transition CSS classique,
          pas de souci de conflit avec Framer ici puisque rien d'autre
          n'anime `transform` sur ces cartes. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute -inset-2 rounded-[2rem] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20",
          accentGlow[pole.accent]
        )}
      />
      <div
        className={cn(
          "relative overflow-hidden flex h-full flex-col items-center gap-8 rounded-[45px] border border-border bg-card px-6 py-14 text-center transition-colors duration-300",
          accentBorder[pole.accent]
        )}
      >
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-12 text-foreground" />
        <span className={cn("absolute size-[21rem] ",
          pole.id === "web" && " bottom-0 right-0 translate-x-[6rem] translate-y-[3rem]",
          pole.id === "mobile" && " top-0 left-0 -translate-x-[6rem] -translate-y-[3rem]",
          pole.id === "ai" && " bottom-0 left-0 translate-x-[10rem] translate-y-[1rem]"
        )}>
          <GlassG />
        </span>
        <h3 className="max-w-[16rem] font-display text-lg font-medium leading-snug text-foreground">
          {title}
        </h3>
        <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export function PolesExcellence() {
  const { t } = useLang();

  return (
    <section
      id="poles-excellence"
      aria-labelledby="poles-excellence-title"
      className="relative overflow-hidden bg-background py-20 text-foreground sm:py-28 lg:py-36"
    >
      <DecorativeArcs />

      <Container size="wide" className="relative">
        <h2
          id="poles-excellence-title"
          className="text-center font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]"
        >
          {t("polesExcellence.title")}
        </h2>

        <div className="mt-14 grid gap-10 sm:mt-16 md:grid-cols-3">
          {polesExcellence.map((pole) => (
            <PoleCard key={pole.id} pole={pole} />
          ))}
        </div>
      </Container>
    </section>
  );
}

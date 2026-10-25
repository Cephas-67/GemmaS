"use client";

import { Container } from "@/components/ui/Container";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { polesExcellence, type Accent, type PoleExcellence as Pole } from "@/data/polesExcellence";
import { useLang } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import SplitText from "@/components/effects/SplitText";

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

// Le mot GemmaS, posé une seule fois sur toute la rangée, mais qui ne se voit
// qu'à travers les cartes : les espaces entre elles coupent les lettres, et on
// lit le mot d'une carte à l'autre. Chaque carte porte la même bande, aussi
// grande que toute la rangée et décalée de sa propre position, en pourcentage
// de la carte, sans mesure en JS.
//
// Les pourcentages se lisent sans la bordure de 1px : une carte fait 100%+2px,
// et son intérieur commence 1px après son bord. Les cartes sont séparées de
// 2.5rem (gap-10) et ont toutes la même taille (auto-rows-fr sur la grille).
//
// À partir de md, trois cartes côte à côte : le mot est couché.
// En dessous, elles s'empilent : le mot se redresse et se lit de haut en bas.
const COUCHE = [
  "md:left-[-1px]",
  "md:left-[calc(-100%-2.5rem-3px)]",
  "md:left-[calc(-200%-5rem-5px)]",
];
const DEBOUT = [
  "top-[-1px]",
  "top-[calc(-100%-2.5rem-3px)]",
  "top-[calc(-200%-5rem-5px)]",
];

function masque(fichier: string): CSSProperties {
  return {
    WebkitMaskImage: `url('${fichier}')`,
    maskImage: `url('${fichier}')`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
  };
}

function MotTraversant({ rang }: { rang: number }) {
  return (
    <>
      <span
        aria-hidden="true"
        style={masque("/wordmark-gemmas.svg")}
        className={cn(
          "pointer-events-none absolute top-1/2 hidden aspect-[3137/663] w-[calc(300%+5rem+6px)] -translate-y-1/2 select-none md:block",
          "bg-gradient-to-b from-foreground/[0.09] to-foreground/[0.03]",
          COUCHE[rang],
        )}
      />
      <span
        aria-hidden="true"
        style={masque("/wordmark-gemmas-vertical.svg")}
        className={cn(
          "pointer-events-none absolute left-1/2 aspect-[663/3137] h-[calc(300%+5rem+6px)] -translate-x-1/2 select-none md:hidden",
          "bg-gradient-to-l from-foreground/[0.09] to-foreground/[0.03]",
          DEBOUT[rang],
        )}
      />
    </>
  );
}

function PoleCard({ pole, rang }: { pole: Pole; rang: number }) {
  const Icon = pole.icon;
  const { lang } = useLang();
  const title = lang === "en" ? pole.titleEn : pole.title;
  const description = lang === "en" ? pole.descriptionEn : pole.description;

  return (
    <div className="group relative h-full">
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
        <MotTraversant rang={rang} />
        <Icon aria-hidden="true" strokeWidth={1.5} className="relative size-12 text-foreground" />
        <h3 className="relative max-w-[16rem] font-display text-lg font-medium leading-snug text-foreground">
          {title}
        </h3>
        <p className="relative max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
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
          <SplitText text={t("polesExcellence.title")} />
        </h2>

        <div className="mt-14 grid auto-rows-fr gap-10 sm:mt-16 md:grid-cols-3">
          {polesExcellence.map((pole, index) => (
            <Reveal key={pole.id} delay={index * 0.1} className="h-full">
              <PoleCard pole={pole} rang={index} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

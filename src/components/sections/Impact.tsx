"use client";

import { useLang } from "@/contexts/LanguageContext";
import LignesQuiRemontent from "@/components/effects/LignesQuiRemontent";

// Pour qui GemmaS construit : une phrase d'ouverture, puis chaque public avec
// ce que le studio fait pour lui. Au défilement, chaque bloc remonte ligne par
// ligne de sous son masque, le nom puis sa phrase ; tout se rejoue quand on
// remonte au-dessus de la section et qu'on redescend.
// Les libellés sont résolus via t() pour suivre la langue active.
const PUBLICS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export function Impact() {
  const { t } = useLang();

  return (
    <section id="impact" className="relative bg-background py-20 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-page px-5 sm:px-8 lg:px-12">
        <LignesQuiRemontent
          as="h2"
          texte={t("impact.title" as never)}
          className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground"
        />

        <ul className="mt-12 grid gap-x-12 gap-y-10 sm:mt-16 md:grid-cols-2 lg:gap-x-20 lg:gap-y-14">
          {PUBLICS.map((n, i) => (
            <li key={n} className="border-t border-border pt-6">
              <LignesQuiRemontent
                as="h3"
                delai={(i % 2) * 0.1}
                texte={t(`impact.sector.${n}` as never)}
                className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground"
              />
              <LignesQuiRemontent
                as="p"
                delai={(i % 2) * 0.1 + 0.15}
                texte={t(`impact.phrase.${n}` as never)}
                className="mt-3 max-w-[34rem] text-base leading-relaxed text-muted-foreground"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

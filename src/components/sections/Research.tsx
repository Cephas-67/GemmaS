"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { useLang } from "@/contexts/LanguageContext";

// Recherche & R&D · placée juste après l'équipe, avant le Manifesto.
// Trois axes en grille, un eyebrow, un titre fort, un paragraphe d'intro.
// Aucun fond animé : sobriété pour faire respirer entre les sections riches.
const AXES = [
  { titleKey: "research.axis1.title", descKey: "research.axis1.desc", index: "01" },
  { titleKey: "research.axis2.title", descKey: "research.axis2.desc", index: "02" },
  { titleKey: "research.axis3.title", descKey: "research.axis3.desc", index: "03" },
] as const;

export function Research() {
  const { t } = useLang();

  return (
    <section
      id="research"
      className="relative bg-background py-20 text-foreground sm:py-28 lg:py-36"
    >
      <Container size="wide">
        {/* En-tête · eyebrow + titre + lead, gabarit cohérent avec About/Poles. */}
        <div className="mb-14 grid gap-8 sm:mb-20 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">{t("research.eyebrow")}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.02em] text-foreground">
                {t("research.title")}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("research.lead")}
            </p>
          </Reveal>
        </div>

        {/* Trois axes · cartes minimales, numéro en mono, divider top. */}
        <ul className="grid gap-px border-y border-foreground/10 bg-foreground/10 sm:grid-cols-3">
          {AXES.map((axis, i) => (
            <li key={axis.titleKey} className="bg-background">
              <Reveal delay={0.1 + i * 0.06}>
                <article className="flex h-full flex-col gap-4 p-6 sm:p-8 lg:p-10">
                  <span className="font-display text-sm font-medium text-muted-foreground/80 tracking-tight">
                    {axis.index}
                  </span>
                  <h3 className="font-display text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                    {t(axis.titleKey as never)}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {t(axis.descKey as never)}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

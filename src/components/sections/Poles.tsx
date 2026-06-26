"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import FlowingMenu from "@/components/FlowingMenu";
import { poles } from "@/data/poles";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useLang } from "@/contexts/LanguageContext";

// Section Pôles : titre + courte intro, puis FlowingMenu (3 items en grand).
// Au hover, un voile horizontal entre par l'arête la plus proche du curseur
// et fait défiler le nom du pôle + une image circulaire (effet React Bits).
export function Poles() {
  const { t, lang } = useLang();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // En dark : fond noir, texte blanc, marquee inverse. En light : l'inverse.
  const isDark = mounted && resolvedTheme === "dark";
  const bgColor = isDark ? "#000000" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#0b1220";
  const marqueeBgColor = isDark ? "#ffffff" : "#0b1220";
  const marqueeTextColor = isDark ? "#0b1220" : "#ffffff";
  const borderColor = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.08)";

  const items = poles.map((p) => ({
    link: `#services`,
    text: lang === "en" ? p.titleEn : p.title,
    image: p.image,
  }));

  return (
    <section id="poles" className="relative bg-background py-20 sm:py-28 lg:py-36">
      <Container size="wide">
        <div className="mb-10 grid gap-6 sm:mb-14 sm:gap-10 md:mb-20 md:grid-cols-[1.1fr_1fr] md:items-end">
          <Reveal>
            <h2 className="font-display font-normal tracking-[-0.025em] text-foreground text-[clamp(2.25rem,7vw,3.5rem)] leading-[1.05]">
              {t("poles.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              {t("poles.intro")}
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="h-[55vh] overflow-hidden rounded-2xl ring-1 ring-border sm:h-[65vh] sm:rounded-3xl md:h-[70vh]">
            {mounted && (
              <FlowingMenu
                items={items}
                speed={20}
                bgColor={bgColor}
                textColor={textColor}
                marqueeBgColor={marqueeBgColor}
                marqueeTextColor={marqueeTextColor}
                borderColor={borderColor}
              />
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
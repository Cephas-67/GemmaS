"use client";

import { motion } from "framer-motion";
import Strands from "@/components/backgrounds/Strands";
import { useInViewport } from "@/hooks/useInViewport";
import { useLang } from "@/contexts/LanguageContext";
import BgNeon from "../ui/BgNeon";
import GLogo from "../ui/G_Logo";
import LiquidGlass from "liquid-glass-react";
import GlassPOC from "../ui/GlassPOC";

// Grain · SVG feTurbulence inline répété (équivalent d'un .webp répété).
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.4 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`,
  );

// Hero · disposition de référence (.h_h_main + .h_h_wrap) :
// - section min-h-screen, flex center, padding vertical asymétrique (5vh top, 20vh bottom)
// - colonne centrée, max-w 53rem (≈848px), text-center
// - H1 grand "thin" : font-weight 400, tracking serré, line-height 1.3, taille fluide
// - sous-titre court, CTA pill, trait vertical décoratif bas-centre
// - 3 couches de fond : strands animé · grain · voile lisibilité bas
export function Hero() {
  const ease = [0.16, 1, 0.3, 1] as const;
  const { t } = useLang();
  // Strands est un canvas WebGL. `once: true` → une fois monté il reste vivant
  // (sur mobile certains navigateurs perdent le contexte WebGL lors d'un
  // remount rapide via IO, ce qui rendait le fond invisible). On préfère
  // garder le canvas et compter sur la pause RAF côté Strands.
  const { ref, inView } = useInViewport<HTMLElement>("200px", { once: true });

  return (
    <section
      ref={ref}
      id="top"
      aria-label="GemmaS"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-background bg-cover"
    >

      {/* Filter */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>



      <div className="absolute w-[50vw] h-screen flex flex-col items-center justify-center z-0 right-0 translate-x-1/2" aria-hidden>
        <BgNeon />
      </div>
      <div className="absolute w-[50vw] h-screen flex flex-col items-center justify-center z-0 left-0 -translate-x-1/2" aria-hidden>
        <BgNeon />
      </div>

      <div className="absolute w-[50vw] h-screen flex flex-col top-1/2 left-1/2 -translate-y-1/2 items-center justify-center z-100 right-[45vw]">
        {/* <GLogo size={300}/> */}
        {/* <GlassPOC /> */}
      </div>

      {/* z-[1] · grain répété, version atténuée : on garde la texture mais
          sans charger la lecture du titre. si ce n'est plus "Ancien* chez toi c'est a cause de ce noise que t'avais mis avant. Je l'ai desactivé avec "hidden"*/}
      <div
        aria-hidden
        className="pointer-events-none hidden absolute inset-0 z-[1] opacity-25 mix-blend-soft-light sm:opacity-20 sm:mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "240px 240px",
        }}
      />

      {/* z-[2] — voile bas pour amener le trait décoratif et asseoir le CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-background/0 via-background/0 to-background/50"
      />

      {/* CONTENU — Mobile-first :
          - mobile : flex column simple, titre + pitch + CTA empilés, padding fluide.
          - md+    : on bascule sur la maquette de référence (titre poussé à 42vh,
                     pitch+CTA flottants en bas à droite). */}

      {/* TITRE — centré, padding fluide.
          Mobile : pt-[20vh] pb-12, taille clamp pour lisibilité.
          Desktop : pt-[42vh] pb-[20vh] (retour à la compo desktop). */}
      <div className="relative z-10 mx-auto flex w-full max-w-[53rem] flex-col items-center px-5 pt-[32vh] text-center sm:px-6 sm:pt-[28vh] md:pt-[42vh] pb-10 md:text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="font-display font-normal tracking-[-0.02em] text-foreground
                     text-[clamp(2rem,8.5vw,3rem)] leading-[1.1]
                     md:text-[clamp(2.5rem,5vw,4rem)] md:leading-[1.15]"
        >
          {t("hero.title")}
        </motion.h1>
      </div>

      {/* PITCH + CTA :
          - mobile : flot normal sous le titre, centré, padding bas confortable
          - md+    : absolute bottom-right comme la maquette de référence */}
      <div className="relative z-10 px-5 sm:px-6">
        <div className="mx-auto flex max-w-md flex-col items-center gap-5 text-left ">
          <motion.a
            href={`mailto:${"contact@gemmas.africa"}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground
                       py-1 pl-5 pr-1 text-sm font-medium text-background
                       transition-all duration-300 ease-smooth hover:gap-3 sm:text-base"
          >
            {t("hero.cta")}
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground transition-transform group-hover:scale-110 sm:h-10 sm:w-10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </motion.a>
        </div>
      </div>

      {/* trait vertical décoratif, bas-centre — équivalent .h_h_line */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 z-[3] h-48 w-px -translate-x-1/2
                   bg-gradient-to-b from-transparent via-foreground/15 to-transparent"
      />
    </section>
  );
}
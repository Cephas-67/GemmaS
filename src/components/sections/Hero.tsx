import { motion } from "framer-motion";
import Strands from "@/components/backgrounds/Strands";
import { useInViewport } from "@/hooks/useInViewport";

// Grain — SVG feTurbulence inline répété (équivalent du .webp de micro1).
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`,
  );

// Hero — disposition micro1 (.h_h_main + .h_h_wrap) :
// - section min-h-screen, flex center, padding vertical asymétrique (5vh top, 20vh bottom)
// - colonne centrée, max-w 53rem (≈848px), text-center
// - H1 grand "thin" : font-weight 400, tracking serré, line-height 1.3, taille fluide
// - sous-titre court, CTA pill, trait vertical décoratif bas-centre
// - 3 couches de fond : strands animé · grain · voile lisibilité bas
export function Hero() {
  const ease = [0.16, 1, 0.3, 1] as const;
  // Strands est un canvas WebGL. `once: true` → une fois monté il reste vivant
  // (sur mobile certains navigateurs perdent le contexte WebGL lors d'un
  // remount rapide via IO, ce qui rendait le fond invisible). On préfère
  // garder le canvas et compter sur la pause RAF côté Strands.
  const { ref, inView } = useInViewport<HTMLElement>("200px", { once: true });

  return (
    <section
      ref={ref}
      id="top"
      aria-label="Zara Labs"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-background"
    >
      {/* z-0 — fond animé, éclat tempéré */}
      <div className="absolute inset-0 z-0 opacity-70" aria-hidden>
        {inView && <Strands
          colors={["#3D2EE0", "#7C3AED", "#F57F1F", "#FFB36B"]}
          count={5}
          speed={0.4}
          amplitude={1.2}
          waviness={1}
          thickness={0.85}
          glow={1.8}
          taper={2.4}
          spread={1.1}
          intensity={0.45}
          saturation={1.15}
          opacity={0.85}
          scale={1.4}
        />}
      </div>

      {/* z-[1] — grain répété */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-50 mix-blend-soft-light sm:opacity-40 sm:mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* z-[2] — voile bas pour amener le trait décoratif et asseoir le CTA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-background/0 via-background/0 to-background/50"
      />

      {/* CONTENU — Mobile-first :
          - mobile : flex column simple, titre + pitch + CTA empilés, padding fluide.
          - md+    : on bascule sur la maquette micro1 (titre poussé à 42vh,
                     pitch+CTA flottants en bas à droite). */}

      {/* TITRE — centré, padding fluide.
          Mobile : pt-[20vh] pb-12, taille clamp pour lisibilité.
          Desktop : pt-[42vh] pb-[20vh] (retour à la compo desktop). */}
      <div className="relative z-10 mx-auto flex w-full max-w-[53rem] flex-col items-center px-5 pt-[32vh] pb-10 text-center sm:px-6 sm:pt-[28vh] md:pt-[42vh] md:pb-[20vh] md:text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="font-display font-normal tracking-[-0.02em] text-foreground
                     text-[clamp(2rem,8.5vw,3rem)] leading-[1.1]
                     md:text-[clamp(2.5rem,5vw,4rem)] md:leading-[1.15]"
        >
          Innovation tech, conseil et impact, depuis le Bénin.
        </motion.h1>
      </div>

      {/* PITCH + CTA :
          - mobile : flot normal sous le titre, centré, padding bas confortable
          - md+    : absolute bottom-right comme la maquette micro1 */}
      <div className="relative z-10 px-5 pb-12 sm:px-6 md:absolute md:bottom-0 md:right-0 md:px-[5%] md:pb-10">
        <div className="mx-auto flex max-w-md flex-col items-start gap-5 text-left md:ml-auto md:mr-0">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Nous concevons des plateformes numériques, des solutions IA et des
            outils HealthTech · AgriTech, et nous accompagnons PME, startups et
            acteurs publics dans leur transformation.
          </motion.p>

          <motion.a
            href={`mailto:${"contact@zaralabs.bj"}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease }}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-foreground
                       py-1 pl-5 pr-1 text-sm font-medium text-background
                       transition-all duration-300 ease-smooth hover:gap-3 sm:text-base"
          >
            Démarrer un projet
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

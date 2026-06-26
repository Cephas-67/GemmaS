"use client";

import { Silk } from "@/components/backgrounds/Silk";
import { useInViewport } from "@/hooks/useInViewport";
import { useLang } from "@/contexts/LanguageContext";

// Manifesto · réplique stricte du banner .h_l_main de la maquette de référence.
// Le canvas Silk n'est monté qu'une fois la section dans le viewport
// (rootMargin 300px en avance) puis démonté quand on s'éloigne :
// économise ~60fps quand l'utilisateur est ailleurs sur la page.
const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.95 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)'/>
     </svg>`,
  );

export function Manifesto() {
  const { t } = useLang();
  // `once: true` → mount-one-shot du canvas Silk. Sans ça, un démontage/
  // remontage rapide pendant le scroll laisse 1-3 frames blanches le temps
  // que le shader recompile → "le bg disparaît parfois".
  const { ref, inView } = useInViewport<HTMLElement>("400px", { once: true });
  // visible = section réellement à l'écran → on coupe l'animation sinon.
  const { ref: visRef, inView: visible } = useInViewport<HTMLElement>("0px");

  return (
    <section
      ref={(el) => {
        ref.current = el;
        visRef.current = el;
      }}
      className="relative overflow-hidden bg-background p-[0.5rem] sm:p-[0.75rem]"
    >
      {/* z:-2 → Silk plein cover, monté une seule fois et mis en pause hors viewport */}
      <div aria-hidden className="absolute inset-0 z-0 bg-[#3a3540]">
        {inView && (
          <Silk
            speed={5}
            scale={1}
            color="#7B7481"
            noiseIntensity={1.5}
            rotation={0}
            paused={!visible}
          />
        )}
      </div>

      {/* z:1 → voile noir 15% pour asseoir le texte */}
      <div className="relative z-[1] flex items-center justify-center bg-black/15 px-[5%] py-20 sm:py-28 md:py-32">
        <h2 className="mx-auto max-w-[41rem] text-center font-display text-[clamp(1.75rem,4vw,3rem)] font-normal leading-[1.2] tracking-[-0.02em] text-white">
          {t("manifesto.text")}
        </h2>
      </div>

      {/* z:2 → grain par-dessus (.h_l_overlay) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-80 mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        }}
      />
    </section>
  );
}
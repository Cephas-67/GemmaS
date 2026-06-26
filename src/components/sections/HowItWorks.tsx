"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Silk } from "@/components/backgrounds/Silk";
import { useInViewport } from "@/hooks/useInViewport";
import { useLang } from "@/contexts/LanguageContext";
import diagnosticImg from "@/commentcamarche/diagnostic.webp";
import cadrageImg from "@/commentcamarche/cadrage.webp";
import conceptionImg from "@/commentcamarche/conception-design.webp";
import iterationImg from "@/commentcamarche/iteration-mvp.webp";
import impactImg from "@/commentcamarche/mesure-impact.webp";

// ⚡ Perf : zéro setState pendant le scroll. La liste à gauche fade via
// useTransform (motion values), donc aucune re-render pendant que Silk
// fait tourner son canvas WebGL.

type Step = {
  n: string;
  label: string;
  image: string;
};

// Step structurel · numéro + image figés. Le libellé est résolu via t() pour
// suivre la langue active. `.src` parce qu'un import statique Next renvoie
// un StaticImageData (objet avec width/height/src) et on rend en <img>.
type StepSpec = { n: string; labelKey: string; image: string };

const stepSpecs: StepSpec[] = [
  { n: "01.", labelKey: "how.step1", image: diagnosticImg.src },
  { n: "02.", labelKey: "how.step2", image: cadrageImg.src },
  { n: "03.", labelKey: "how.step3", image: conceptionImg.src },
  { n: "04.", labelKey: "how.step4", image: iterationImg.src },
  { n: "05.", labelKey: "how.step5", image: impactImg.src },
];

function StepRow({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const center = total <= 1 ? 0.5 : index / (total - 1);
  const w = 0.5 / Math.max(1, total - 1);

  // Keyframes doivent rester dans [0,1] et strictement croissantes
  // (Web Animations API), donc bornes adaptées aux étapes de bord.
  let input: number[];
  let output: number[];
  if (index === 0) {
    input = [0, w, 2 * w];
    output = [1, 1, 0.4];
  } else if (index === total - 1) {
    input = [1 - 2 * w, 1 - w, 1];
    output = [0.4, 1, 1];
  } else {
    input = [center - w, center, center + w];
    output = [0.4, 1, 0.4];
  }

  const opacity = useTransform(progress, input, output, { clamp: true });

  return (
    <motion.li
      style={{ opacity, willChange: "opacity" }}
      className="flex items-center gap-2 text-white"
    >
      <span className="font-display text-[1.25rem]">{step.n}</span>
      <span className="font-display text-[1.25rem]">{step.label}</span>
    </motion.li>
  );
}

export function HowItWorks() {
  const { t } = useLang();
  // Steps résolus depuis les specs + dictionnaire courant.
  const steps: Step[] = stepSpecs.map((s) => ({
    n: s.n,
    label: t(s.labelKey as never),
    image: s.image,
  }));
  const ref = useRef<HTMLDivElement>(null);
  // `once: true` → une fois monté, Silk reste vivant. Combiné à `paused`,
  // on coupe juste l'animation hors viewport sans démonter le canvas
  // (sinon le bg disparaît un instant au retour : le shader doit re-init).
  const { ref: viewRef, inView } = useInViewport<HTMLDivElement>("400px", {
    once: true,
  });
  const { ref: visRef, inView: visible } = useInViewport<HTMLDivElement>("0px");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["0rem", "-162rem"]);
  const lineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how" ref={viewRef} className="relative bg-background">
      {/* DESKTOP — sticky-scroll dans une carte arrondie */}
      <div ref={ref} className="relative hidden h-[500vh] md:block">
        <div
          ref={visRef}
          className="sticky top-0 flex h-screen items-center px-3 py-3 sm:px-4 sm:py-4"
        >
          <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[#3a3540] [contain:layout_paint] [transform:translateZ(0)]">
            {/* z:0 — Silk monté une fois, mis en pause hors viewport */}
            <div aria-hidden className="absolute inset-0 z-0">
              {inView && (
                <Silk
                  speed={2}
                  scale={1}
                  color="#7B7481"
                  noiseIntensity={0.8}
                  rotation={0}
                  paused={!visible}
                />
              )}
            </div>

            {/* z:1 — voile noir pour asseoir le contenu */}
            <div aria-hidden className="absolute inset-0 z-[1] bg-black/15" />

            {/* z:2 — contenu */}
            <div className="relative z-[2] grid h-full grid-cols-2 items-center">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[80%] w-px -translate-x-1/2 -translate-y-1/2"
              >
                <div className="absolute inset-0 bg-white/15" />
                <motion.div
                  style={{ height: lineFill, willChange: "height" }}
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-transparent via-[hsl(var(--brand-blue))] to-[hsl(var(--brand-orange))]"
                />
              </div>

              <div className="relative flex h-full items-center justify-center px-[10%]">
                <div className="relative w-full max-w-[29rem]">
                  <h2 className="absolute -top-20 left-0 font-display text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.15] tracking-[-0.02em] text-white">
                    {t("how.title")}
                  </h2>

                  <ol className="flex flex-col gap-[1.7rem] pt-4">
                    {steps.map((s, i) => (
                      <StepRow
                        key={s.n}
                        step={s}
                        index={i}
                        total={steps.length}
                        progress={scrollYProgress}
                      />
                    ))}
                  </ol>
                </div>
              </div>

              <div className="relative flex h-full items-center justify-center overflow-hidden px-[5%]">
                <div className="relative aspect-[1.6/1] w-full max-w-[36rem] overflow-hidden">
                  <motion.div
                    style={{ y: imgY, willChange: "transform" }}
                    className="flex flex-col gap-[18rem]"
                  >
                    {steps.map((s, i) => (
                      <div
                        key={s.n}
                        className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-2xl bg-[#1a1620]"
                      >
                        <img
                          src={s.image}
                          alt=""
                          loading={i === 0 ? "eager" : "lazy"}
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — stack, rythme aligné sur Container.tsx (px-4 sm:px-6) */}
      <div className="md:hidden px-4 py-20 sm:px-6 sm:py-28">
        <h2 className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
          Comment ça marche ?
        </h2>

        <ol className="mt-12 flex flex-col gap-10 sm:gap-12">
          {steps.map((s) => (
            <li key={s.n} className="flex flex-col gap-4">
              <div className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10 bg-[#1a1620]">
                <img
                  src={s.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-display text-[1.25rem] text-foreground">{s.n}</span>
                <span className="font-display text-[1.25rem] text-foreground">{s.label}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

// Services — section "Intelligence" de micro1, version Zara Labs.
// Sticky-scroll : titre EN HAUT (horizontal), puis 2 colonnes (texte gauche
// qui translate Y · visuels droite qui cross-fade au scroll).

type ServiceFamily = {
  id: "tech" | "conseil" | "impact";
  title: string;
  description: string;
  gradient: string;
  image?: string; // WebP détouré · sert le visuel droite quand présent
};

const families: ServiceFamily[] = [
  {
    id: "tech",
    title: "Tech & Innovation",
    description:
      "Plateformes web et mobile, applications logistiques, solutions IA, R&D produit. Des architectures sobres, scalables, pensées pour le terrain.",
    gradient: "from-[#3D2EE0] via-[#5B45E8] to-[#7C3AED]",
    image: "/services/tech.webp",
  },
  {
    id: "conseil",
    title: "Conseil & Accompagnement",
    description:
      "Audits techniques, ingénierie de projets, coaching et incubation. Nous écoutons avant de coder : diagnostic, cartographie, plan d'action.",
    gradient: "from-[#7C3AED] via-[#A14BD0] to-[#F57F1F]",
    image: "/services/conseil.webp",
  },
  {
    id: "impact",
    title: "HealthTech · AgriTech",
    description:
      "Outils de gestion médicale, suivi des cultures, économie circulaire, transition énergétique. L'innovation au service des terrains qui transforment.",
    gradient: "from-[#F57F1F] via-[#FFA255] to-[#FFB36B]",
    image: "/services/impact.webp",
  },
];

// Flèche dégradée — bleu (--brand-blue) → bleu deep → orange (--brand-orange).
// Translate-X au hover via la classe parente .group → group-hover:translate-x-1.
function GradientArrow() {
  return (
    <span
      aria-hidden
      className="ml-1 inline-flex h-7 w-7 items-center justify-center transition-transform duration-300 ease-smooth group-hover:translate-x-1"
    >
      <svg viewBox="0 0 28 28" fill="none" className="h-full w-full">
        <defs>
          <linearGradient id="zl-arrow-gradient" x1="7" y1="22" x2="22" y2="7" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="hsl(var(--brand-blue))" />
            <stop offset="55%" stopColor="hsl(var(--brand-blue-deep))" />
            <stop offset="100%" stopColor="hsl(var(--brand-orange))" />
          </linearGradient>
        </defs>
        <path
          d="M10.5 21L17.5 14L10.5 7"
          stroke="url(#zl-arrow-gradient)"
          strokeWidth="2.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function ServiceTextItem({ item }: { item: ServiceFamily }) {
  return (
    <div className="group flex flex-col gap-3">
      <div className="flex items-center">
        <h3 className="font-display text-3xl font-normal tracking-[-0.02em] text-foreground md:text-4xl">
          {item.title}
        </h3>
        <GradientArrow />
      </div>
      <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
        {item.description}
      </p>
    </div>
  );
}

// Visuel : swap discret au lieu d'un cross-fade continu. Seul l'item actif
// est en opacity 1, les autres en 0. Transition CSS .3s comme .h_ip_img.
function ServiceVisual({
  item,
  active,
}: {
  item: ServiceFamily;
  active: boolean;
}) {
  // Image cadrée au centre, scale 1.4 pour déborder, et translateY -8% pour
  // remonter vers le haut du conteneur (placement micro1).
  const common = "absolute inset-0 h-full w-full object-contain scale-[1.4] -translate-y-[8%] transition-opacity duration-300 ease-in-out";

  if (item.image) {
    return (
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className={cn(common, active ? "opacity-100" : "opacity-0")}
      />
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 rounded-3xl bg-gradient-to-br ring-1 ring-foreground/10 shadow-2xl transition-opacity duration-300 ease-in-out",
        item.gradient,
        active ? "opacity-100" : "opacity-0",
      )}
    >
      <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute bottom-6 left-6 right-6 font-display text-2xl font-medium text-white/90">
        {item.title}
      </div>
    </div>
  );
}

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Chaque item est positionné absolument au CENTRE du conteneur et translaté.
  // Formule pour N=3 : y_i(p) = (i - 2·p) · STEP   ⇒ item i centré quand p = i/2.
  //   - item 0 : +0   → -2·STEP   (centré à p=0)
  //   - item 1 : +STEP → -STEP    (centré à p=0.5)
  //   - item 2 : +2·STEP → 0      (centré à p=1)
  // STEP = 18rem · distance entre deux centres d'items.
  const y0 = useTransform(scrollYProgress, [0, 1], [`0rem`, `-36rem`]);
  const y1 = useTransform(scrollYProgress, [0, 1], [`18rem`, `-18rem`]);
  const y2 = useTransform(scrollYProgress, [0, 1], [`36rem`, `0rem`]);
  const ys = [y0, y1, y2];

  // Index actif : 0 / 1 / 2 selon la progression. Seul ce visuel sera
  // visible — pas de cross-fade continu, plus de "morphing" gênant.
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
    if (i !== active) setActive(i);
  });

  return (
    <section id="services" className="relative bg-background">
      {/* ────────────  DESKTOP : sticky-scroll  ──────────── */}
      {/* runway 450vh = ~4.5 écrans de scroll → la section se vit plus longue,
          chaque famille a plus de temps "à l'écran" avant de céder la place. */}
      <div ref={ref} className="relative hidden h-[450vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[1300px] px-[5%]">
            {/* ── TITRE CENTRÉ EN HAUT (équivalent .section-title-wraper.is-h-ip) ── */}
            <div className="absolute left-1/2 top-[10%] z-10 w-full max-w-[45rem] -translate-x-1/2 px-[5%] text-center">
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
                Ce que nous construisons et accompagnons.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                Trois familles d'expertise, une seule méthode : écouter le
                terrain, livrer petit, mesurer l'impact.
              </p>
            </div>

            {/* ── 2 COLONNES PLEINE HAUTEUR ── */}
            <div className="grid h-full grid-cols-2 items-center gap-12 pt-[28vh]">
              {/* col gauche : 3 items positionnés au CENTRE du conteneur,
                  chacun translaté selon son propre useTransform → l'item 1
                  commence centré, scroll → item 2 vient au centre, etc. */}
              <div className="relative h-[55vh] overflow-hidden">
                {families.map((f, i) => (
                  <motion.div
                    key={f.id}
                    style={{ y: ys[i] }}
                    className="absolute left-0 right-0 top-1/2 -translate-y-1/2 max-w-[28rem]"
                  >
                    <ServiceTextItem item={f} />
                  </motion.div>
                ))}

                {/* voiles top / bottom (équivalent .h_engine_shadow) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[12vh] bg-gradient-to-b from-background to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[8vh] bg-gradient-to-t from-background to-transparent"
                />
              </div>

              {/* col droite : conteneur élargi (≈ 48rem × 44rem) et
                  overflow-visible — les visuels peuvent déborder de la
                  colonne, pas confinés à une boîte stricte. */}
              <div className="relative mx-auto h-[44rem] w-full max-w-[48rem] overflow-visible">
                {families.map((f, i) => (
                  <ServiceVisual key={f.id} item={f} active={i === active} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ────────────  MOBILE : stack simple  ────────────
          Rythme aligné sur le reste (py-20 sm:py-28), padding fluide
          (px-4 sm:px-6) — même langage que Container.tsx. */}
      <div className="md:hidden px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
            Ce que nous construisons et accompagnons.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Trois familles d'expertise, une seule méthode.
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-10 sm:gap-12">
          {families.map((f) => (
            <li key={f.id} className="flex flex-col gap-5">
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  className="w-full object-contain"
                />
              ) : (
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br ring-1 ring-foreground/10",
                    f.gradient,
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                  <div className="absolute bottom-4 left-4 right-4 font-display text-xl font-medium text-white/90">
                    {f.title}
                  </div>
                </div>
              )}
              <ServiceTextItem item={f} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

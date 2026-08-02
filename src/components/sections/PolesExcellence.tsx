import { BrainCircuit, Laptop, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GlassG } from "../values/GlassG";
import { cn } from "@/lib/utils";

type Pole = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

// 3 pôles d'excellence, distincts des `poles` existants (Tech & Développement /
// IA & Automatisation / Studio) : ceux-ci décrivent des domaines techniques
// précis (web, mobile, IA) plutôt que des offres commerciales. Composant
// isolé, pas encore branché dans app/page.tsx.
const poles: Pole[] = [
  {
    id: "web",
    icon: Laptop,
    title: "Ingénierie Web & Plateformes écosystémiques",
    description:
      "Conception d'infrastructures web hautement performantes, scalables et dotées d'interfaces d'une clarté remarquable.",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Écosystèmes Mobiles Natifs",
    description:
      "Développement d'applications immersives pour iOS et Android, garantissant une expérience utilisateur ergonomique et sans friction.",
  },
  {
    id: "ai",
    icon: BrainCircuit,
    title: "Intelligence Artificielle & Algorithmes sur mesure",
    description:
      "Automatisation avancée des processus métiers, modélisation de données et intégration d'IA pour catalyser votre productivité.",
  },
];

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

  return (
    <div className="group relative">
      {/* Lueur multicolore : masquée par défaut, seul le survol la révèle
          (opacity-0 → group-hover:opacity-100). Transition CSS classique,
          pas de souci de conflit avec Framer ici puisque rien d'autre
          n'anime `transform` sur ces cartes. */}
      <div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-blue via-brand-green to-brand-amber opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
      />
      <div className="relative overflow-hidden flex h-full flex-col items-center gap-8 rounded-[45px] border border-border bg-card px-6 py-14 text-center transition-colors duration-300 group-hover:border-white/10">
        <Icon aria-hidden="true" strokeWidth={1.5} className="size-12 text-foreground" />
        <span className={cn("absolute size-[21rem] ",
          pole.id === "web" && " bottom-0 right-0 translate-x-[6rem] translate-y-[3rem]",
          pole.id === "mobile" && " top-0 left-0 -translate-x-[6rem] -translate-y-[3rem]",
          pole.id === "ai" && " bottom-0 left-0 translate-x-[10rem] translate-y-[1rem]"
        )}>
          <GlassG />
        </span>
        <h3 className="max-w-[16rem] font-display text-lg font-medium leading-snug text-foreground">
          {pole.title}
        </h3>
        <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground">
          {pole.description}
        </p>
      </div>
    </div>
  );
}

export function PolesExcellence() {
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
          Nos pôles d&apos;excellence
        </h2>

        <div className="mt-14 grid gap-10 sm:mt-16 md:grid-cols-3">
          {poles.map((pole) => (
            <PoleCard key={pole.id} pole={pole} />
          ))}
        </div>
      </Container>
    </section>
  );
}

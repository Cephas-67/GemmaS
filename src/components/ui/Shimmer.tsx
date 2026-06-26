import { cn } from "@/lib/utils";

// Shimmer · skeleton sobre style Linear/Vercel pour les zones encore vides.
// Fond gris muted + balayage diagonal blanc translucide qui traverse de
// gauche à droite, 1.6s. Le composant fait skeleton et animation à la fois.
//
// Usage :
//   <Shimmer className="h-4 w-32" />              → pour une ligne de texte
//   <Shimmer className="h-12 w-full rounded-xl" /> → pour une carte plate
//   <Shimmer variant="pill" />                     → bloc pilule par défaut

type Props = {
  className?: string;
  variant?: "default" | "pill" | "card";
};

export function Shimmer({ className, variant = "default" }: Props) {
  const base =
    "relative isolate overflow-hidden bg-muted/60 dark:bg-white/[0.04]";
  const variants: Record<NonNullable<Props["variant"]>, string> = {
    default: "rounded-md",
    pill: "h-4 w-24 rounded-full",
    card: "h-32 w-full rounded-2xl",
  };

  return (
    <span
      aria-hidden
      role="presentation"
      className={cn(base, variants[variant], "block", className)}
    >
      {/* Balayage diagonal · gradient blanc translucide qui glisse en boucle. */}
      <span className="shimmer-sweep absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10" />
    </span>
  );
}

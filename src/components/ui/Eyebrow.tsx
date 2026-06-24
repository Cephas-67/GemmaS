import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Kicker sobre, gris muted, uppercase tracking large.
// Pas de point coloré, pas de chip, pas d'accent : juste du texte.
type Props = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: Props) {
  return (
    <span
      className={cn(
        "inline-block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

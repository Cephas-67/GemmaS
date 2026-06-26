import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// Gradients HSL pour la couche back colorée · alignés sur la palette GemmaS
// (brand-blue, brand-green, brand-amber) + neutres utiles dans une UI dark/light.
const gradients: Record<string, string> = {
  brand: "linear-gradient(hsl(220 33% 46%), hsl(122 39% 49%))",
  orange: "linear-gradient(hsl(45 100% 51%), hsl(35 100% 47%))",
  ink: "linear-gradient(hsl(222 30% 18%), hsl(222 30% 8%))",
  light: "linear-gradient(hsl(0 0% 96%), hsl(0 0% 86%))",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: keyof typeof gradients | string;
  size?: "sm" | "md";
  children: ReactNode;
};

// Petit bouton d'icône avec effet verre (3D hover). Adapté à un usage inline
// (nav, toolbar) à l'inverse de la grille pleine page du composant React Bits.
export const GlassIconButton = forwardRef<HTMLButtonElement, Props>(
  function GlassIconButton(
    { color = "brand", size = "md", className, children, ...rest },
    ref,
  ) {
    const bg = gradients[color] ?? color;
    const dims = size === "sm" ? "size-8 rounded-xl" : "size-9 rounded-xl";

    return (
      <button
        ref={ref}
        type="button"
        {...rest}
        className={cn("glass-btn", dims, className)}
      >
        <span className="glass-btn__back" style={{ background: bg }} />
        <span className="glass-btn__front">
          <span className="glass-btn__icon">{children}</span>
        </span>
      </button>
    );
  },
);

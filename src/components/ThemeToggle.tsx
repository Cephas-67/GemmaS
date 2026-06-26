"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { animateThemeToggle } from "@/lib/animateThemeToggle";
import { cn } from "@/lib/utils";

// Bouton sun/moon nu — pas de carte derrière, juste l'icône avec hover
// discret (couleur qui passe au foreground plein).
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  const onClick = (e: MouseEvent) => {
    animateThemeToggle(e, isDark ? "light" : "dark", setTheme);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className={cn(
        "grid size-8 place-items-center rounded-full text-foreground/60 transition-colors hover:text-foreground",
        className,
      )}
    >
      {mounted ? (
        isDark ? <Sun className="size-4" /> : <Moon className="size-4" />
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
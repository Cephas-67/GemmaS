// Animation de bascule de thème, inspirée d'Amoussouportfolio.
// Sur Chrome/Edge : un cercle s'agrandit depuis le point cliqué
// (View Transitions API). Sur Firefox/Safari ou prefers-reduced-motion :
// bascule instantanée sans flash mi-clair/mi-sombre (classe theme-instant).
import type { MouseEvent as ReactMouseEvent } from "react";

type SetThemeFn = (theme: string) => void;

export function animateThemeToggle(
  event: ReactMouseEvent | MouseEvent,
  nextTheme: "light" | "dark",
  setTheme: SetThemeFn,
) {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };
  const root = document.documentElement;

  const reduce =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!doc.startViewTransition || reduce) {
    root.classList.add("theme-instant");
    setTheme(nextTheme);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => root.classList.remove("theme-instant")),
    );
    return;
  }

  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const transition = doc.startViewTransition(() => setTheme(nextTheme));
  transition.ready.then(() => {
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 1200,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  });
}

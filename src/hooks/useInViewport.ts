import { useEffect, useRef, useState } from "react";

// Observe un élément et bascule `inView` selon sa visibilité.
// Sert à monter / démonter les canvas WebGL coûteux (Silk, Strands).
//
// - `rootMargin` : marge IO. Défaut "200px" → on rend un peu AVANT que la
//   section entre dans le viewport pour éviter le pop-in.
// - `once` : si true, une fois passé à true `inView` reste true. Indispensable
//   pour les fonds WebGL persistants : démonter/remonter un canvas Silk
//   provoque un flash (le shader n'a pas eu le temps de rendre sa 1re frame),
//   ce qui se manifeste par "le fond disparaît au scroll". On préfère garder
//   le canvas vivant, quitte à mettre l'animation en pause via `paused`.
export function useInViewport<T extends Element>(
  rootMargin: string = "200px",
  options: { once?: boolean } = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.once) io.disconnect();
        } else if (!options.once) {
          setInView(false);
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, options.once]);

  return { ref, inView };
}

"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLang } from "@/contexts/LanguageContext";
import "./MobileMenu.css";

// Menu mobile fullscreen. Une seule timeline GSAP construite au mount,
// jouée en avant à l'ouverture, en arrière à la fermeture → la fermeture
// est exactement le miroir de l'ouverture (items qui retombent, panneau qui
// repart, couches qui sortent en cascade inverse).

type Item = { label: string; href: string };

type Props = {
  open: boolean;
  onClose: () => void;
  items: Item[];
  layers?: [string, string];
  accent?: string;
};

export function MobileMenu({
  open,
  onClose,
  items,
  // Défauts alignés sur la charte GemmaS · couche bleue marque puis noire,
  // accent ambre pour la numérotation des items.
  layers = ["hsl(220 33% 46%)", "hsl(0 0% 0%)"],
  accent = "hsl(45 100% 51%)",
}: Props) {
  const { t } = useLang();
  const panelRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<HTMLDivElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const togglesRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Timeline construite une seule fois, en pause à t=0 (état initial fermé).
  // Ensuite on play() à l'ouverture, reverse() à la fermeture.
  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // États initiaux : tout hors écran à droite.
    gsap.set([panel, ...layerRefs.current], { xPercent: 100 });
    if (labelRefs.current.length) {
      gsap.set(labelRefs.current, { yPercent: 140, rotate: 8 });
    }
    if (itemRefs.current.length) {
      gsap.set(itemRefs.current, { "--num-opacity": 0 });
    }
    if (togglesRef.current) {
      gsap.set(togglesRef.current, { opacity: 0, y: 20 });
    }

    const tl = gsap.timeline({ paused: true });

    // 1. Couches de couleur en cascade
    layerRefs.current.forEach((el, i) => {
      tl.to(
        el,
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.08,
      );
    });
    const panelStart = layerRefs.current.length * 0.08;

    // 2. Panneau qui glisse derrière
    tl.to(
      panel,
      { xPercent: 0, duration: 0.65, ease: "power4.out" },
      panelStart,
    );

    const itemsStart = panelStart + 0.1;

    // 3. Labels qui remontent en stagger
    if (labelRefs.current.length) {
      tl.to(
        labelRefs.current,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
        },
        itemsStart,
      );
    }

    // 4. Numéros qui s'allument
    if (itemRefs.current.length) {
      tl.to(
        itemRefs.current,
        {
          "--num-opacity": 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.07,
        },
        itemsStart + 0.1,
      );
    }

    // 5. Toggles (bas du panneau) qui apparaissent en dernier
    if (togglesRef.current) {
      tl.to(
        togglesRef.current,
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        itemsStart + 0.2,
      );
    }

    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  // play / reverse selon `open`. Reverse = mirror exact de l'ouverture.
  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    if (open) {
      tl.timeScale(1).play();
      document.documentElement.style.overflow = "hidden";
    } else {
      // Fermeture un peu plus rapide pour la nervosité.
      tl.timeScale(1.4).reverse();
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Clic en dehors du panneau (sur les couches de couleur visibles) → ferme.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open, onClose]);

  return (
    <div
      className="mobile-menu-wrap pointer-events-none fixed inset-0 z-[70] overflow-hidden"
      style={{ ["--menu-accent" as string]: accent }}
      data-open={open ? "true" : undefined}
      aria-hidden={!open ? "true" : "false"}
    >
      {/* Couches de préfond qui défilent en cascade derrière le panneau */}
      <div className="pointer-events-none absolute inset-y-0 right-0 w-full">
        {layers.map((c, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) layerRefs.current[i] = el;
            }}
            className="absolute inset-y-0 right-0 h-full w-full"
            style={{ background: c }}
            aria-hidden
          />
        ))}
      </div>

      {/* Panneau principal — adaptatif au thème, plein écran sur mobile */}
      <aside
        ref={panelRef}
        className={
          "pointer-events-auto absolute inset-y-0 right-0 flex h-full w-full flex-col " +
          "bg-background text-foreground"
        }
      >
        {/* Header du panneau : logo gauche + croix fermeture droite */}
        <div className="flex items-center justify-between px-6 pt-6">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label={t("nav.closeMenu")}
            className="grid size-11 place-items-center rounded-full ring-1 ring-foreground/15 text-foreground transition-colors hover:bg-foreground/10"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Liste des items, gros titres staggered */}
        <ul className="mobile-menu-list mt-12 flex flex-col gap-2 px-6">
          {items.map((it, idx) => (
            <li key={it.href} className="overflow-hidden leading-none">
              <a
                ref={(el) => {
                  if (el) itemRefs.current[idx] = el;
                }}
                href={it.href}
                onClick={onClose}
                data-num={String(idx + 1).padStart(2, "0")}
                className="mobile-menu-item relative block py-2 pr-16 font-display text-[13vw] font-semibold uppercase leading-[0.95] tracking-[-0.04em] sm:text-[clamp(3rem,9vw,5.5rem)]"
              >
                <span
                  ref={(el) => {
                    if (el) labelRefs.current[idx] = el;
                  }}
                  className="inline-block origin-bottom will-change-transform"
                >
                  {t(it.label as Parameters<typeof t>[0])}
                </span>
              </a>
            </li>
          ))}
        </ul>

        {/* Footer du panneau : toggles thème + langue */}
        <div
          ref={togglesRef}
          className="mt-auto flex items-center justify-center gap-4 px-6 pb-10 pt-8"
        >
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </aside>
    </div>
  );
}
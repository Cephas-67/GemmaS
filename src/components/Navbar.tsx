"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { useLang } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Pill navbar morphable. Au scroll vers le bas, la pill se contracte en un
// cercle avec uniquement le logo. Sur device avec souris : hover ré-étire.
// Sur device tactile : tap sur le cercle ouvre directement le menu mobile
// (le cercle joue le rôle de burger).

export function Navbar() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastY = useRef(0);

  // Détecte la capacité hover. Lu une fois au mount — pas besoin d'écouter
  // les changements (un device ne devient pas tactile en cours de session).
  const [supportsHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover)").matches
      : true,
  );

  const expanded = !collapsed || hovered;

  const links = [
    { key: "nav.services", href: "#services" },
    { key: "nav.how", href: "#how" },
    { key: "nav.about", href: "#about" },
    { key: "nav.poles", href: "#poles" },
  ] as const;

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (y < 80) setCollapsed(false);
      else if (delta > 6) setCollapsed(true);
      else if (delta < -6) setCollapsed(false);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const morphSpring = {
    type: "spring" as const,
    stiffness: 300,
    damping: 32,
    mass: 0.8,
  };

  // Quand la nav est en bulle : tap → ouvre directement le menu mobile.
  // preventDefault sur la cible (logo = <a href="#top">) pour éviter le saut
  // de scroll vers le haut avant ouverture.
  const onBubbleTap = (e: React.MouseEvent) => {
    if (!expanded) {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-9 z-50 flex justify-center px-3 pt-2 sm:px-4">
        <motion.div
          layout
          transition={morphSpring}
          onMouseEnter={supportsHover ? () => setHovered(true) : undefined}
          onMouseLeave={supportsHover ? () => setHovered(false) : undefined}
          onClick={!expanded ? onBubbleTap : undefined}
          className={cn(
            "liquid-glass pointer-events-auto relative flex items-center rounded-full",
            expanded
              ? "h-12 w-full max-w-[820px] pl-4 pr-1.5"
              : "size-16 cursor-pointer justify-center px-0",
          )}
          role={!expanded ? "button" : undefined}
          aria-label={!expanded ? t("nav.openMenu") : undefined}
        >
          {/* Logo — ancre du morph. En mode bulle, on le positionne en absolute
              au centre du carré pour un centrage pixel-exact (le flex flow
              de la pill expanded laisse un léger biais à gauche sur certaines
              tailles à cause du ratio du SVG). */}
          <motion.div
            layout="position"
            className={cn(
              "flex shrink-0 items-center",
              !expanded && "pointer-events-none absolute inset-0 justify-center",
            )}
          >
            <Logo showLabel={false} />
          </motion.div>

          {/* Contenu expanded — apparaît/disparaît en fondu */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="nav-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.08, duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="flex flex-1 items-center overflow-hidden"
              >
                {/* Liens desktop */}
                <nav className="ml-6 hidden flex-1 items-center gap-6 whitespace-nowrap text-[13px] font-medium text-foreground/70 md:flex">
                  {links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="transition-colors hover:text-foreground"
                    >
                      {t(l.key)}
                    </a>
                  ))}
                </nav>

                {/* Toggles desktop */}
                <div className="ml-auto hidden items-center gap-1 md:flex">
                  <ThemeToggle />
                  <LanguageToggle />
                </div>

                {/* Burger mobile — bouton plat, pas de carte glass derrière */}
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={t("nav.openMenu")}
                  className="ml-auto grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/10 md:hidden"
                >
                  <Menu className="size-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={links.map((l) => ({ label: l.key, href: l.href }))}
      />
    </>
  );
}
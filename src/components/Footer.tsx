"use client";

import { useRef, useState } from "react";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";
import { useLang } from "@/contexts/LanguageContext";

// Colonnes du footer construites à partir de clés de dictionnaire.
// `headingKey` et `links[].labelKey` sont résolus via t() à l'usage,
// pour que le contenu suive la langue active sans dupliquer la structure.
type FooterCol = { headingKey: string; links: { labelKey: string; href: string }[] };

// Préfixées par `/` : voir la note équivalente dans Navbar.tsx, même raison
// (Footer est monté sur toutes les routes, pas seulement `/`).
const FOOTER_COLS: FooterCol[] = [
  {
    headingKey: "footer.col.services",
    links: [
      { labelKey: "footer.link.web", href: "/#services" },
      { labelKey: "footer.link.mobile", href: "/#services" },
      { labelKey: "footer.link.custom", href: "/#services" },
      { labelKey: "footer.link.aiAuto", href: "/#services" },
    ],
  },
  {
    headingKey: "footer.col.method",
    links: [
      { labelKey: "footer.link.how", href: "/#how" },
      { labelKey: "footer.link.poles", href: "/#poles-excellence" },
      { labelKey: "footer.link.impact", href: "/#impact" },
    ],
  },
  {
    headingKey: "footer.col.studio",
    links: [
      { labelKey: "footer.link.team", href: "/#team" },
      { labelKey: "footer.link.manifesto", href: "/#manifesto" },
      { labelKey: "footer.link.faq", href: "/#faq" },
    ],
  },
];

const LEGAL_KEYS: { labelKey: string; href: string }[] = [
  { labelKey: "footer.legal.terms", href: "/mentions-legales" },
  { labelKey: "footer.legal.privacy", href: "/politique-confidentialite" },
  { labelKey: "footer.legal.sitemap", href: "/sitemap" },
];

// Wordmark géant GemmaS · SVG fourni par le client, posé en bas du footer.
// Effet "torche" : deux exemplaires du même SVG superposés, le bas reste dimmé,
// le haut (en pleine opacité) est révélé par un radial-gradient qui suit le
// curseur. Aucun rendu texte ici, c'est le tracé SVG officiel de la marque.
function TorchWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const onLeave = () => setPos((p) => ({ ...p, active: false, x: -9999, y: -9999 }));
  const mask = `radial-gradient(circle 360px at ${pos.x}px ${pos.y}px, black 0%, black 35%, transparent 85%)`;
  const imgBase = "block h-auto w-full select-none";

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full"
      aria-hidden
    >
      {/* Couche basse · wordmark dimmé, présence constante. */}
      <img
        src="/wordmark-gemmas.svg"
        alt=""
        draggable={false}
        className={cn(imgBase, "opacity-[0.18] dark:opacity-[0.22]")}
      />
      {/* Couche haute · même SVG, plus dense, révélée par la torche. */}
      <img
        src="/wordmark-gemmas.svg"
        alt=""
        draggable={false}
        className={cn(
          imgBase,
          "absolute inset-0 transition-opacity duration-300",
          pos.active ? "opacity-100" : "opacity-0",
        )}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      />
    </div>
  );
}

// Mapping label → icône Lucide. Si pas d'icône, on garde le label texte.
const socialIcons: Record<string, typeof Linkedin> = {
  LinkedIn: Linkedin,
  X: Twitter,
  Instagram: Instagram,
  YouTube: Youtube,
};

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative w-full overflow-hidden bg-background text-foreground/80">
      <div className="mx-auto max-w-page px-4 sm:px-6 lg:px-10 pt-16 sm:pt-20 lg:pt-24 pb-6">
        {/* Grille principale : identité + 3 colonnes de liens.
            Sur mobile 1 colonne, à partir de md 4 colonnes équilibrées. */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-10">
          {/* COL 1 — identité */}
          <div>
            <Logo size="lg" />
            <p className="mt-6 text-sm text-foreground/65">
              {site.contact.address}
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className="mt-1 block text-sm text-foreground/75 transition-colors hover:text-foreground"
            >
              {site.contact.email}
            </a>
          </div>

          {/* COL 2/3/4 · chaque catégorie résolue depuis t(). */}
          {FOOTER_COLS.map((col) => (
            <div key={col.headingKey}>
              <p className="mb-5 text-[15px] font-medium text-foreground/55">
                {t(col.headingKey as never)}
              </p>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.labelKey}>
                    <a
                      href={l.href}
                      className="text-[15px] text-foreground transition-colors hover:text-foreground/60"
                    >
                      {t(l.labelKey as never)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barre legal : copyright + liens à gauche, icônes sociales à droite */}
        <div className="mt-16 flex flex-col gap-6 border-t border-foreground/10 pt-6 text-[13px] text-foreground/55 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {site.year} {site.name}</span>
            {LEGAL_KEYS.map((l) => (
              <a
                key={l.labelKey}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {t(l.labelKey as never)}
              </a>
            ))}
          </div>

          <ul className="flex items-center gap-5">
            {site.socials.map((s) => {
              const Icon = socialIcons[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="block text-foreground/55 transition-colors hover:text-foreground"
                  >
                    {Icon ? <Icon className="size-5" /> : <span className="text-sm">{s.label}</span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Wordmark collé au bord bas — padding latéral uniquement */}
      <div className="px-4 sm:px-6 lg:px-10">
        <TorchWordmark />
      </div>
    </footer>
  );
}
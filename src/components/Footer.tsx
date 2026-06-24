import { useRef, useState } from "react";
import { Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/Logo";

// Wordmark géant avec effet "torche" : deux couches de texte superposées,
// la couche révélée par un radial-gradient suit le curseur.
function TorchWordmark({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999, active: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };

  const onLeave = () => setPos((p) => ({ ...p, active: false, x: -9999, y: -9999 }));
  const mask = `radial-gradient(circle 360px at ${pos.x}px ${pos.y}px, black 0%, black 35%, transparent 85%)`;

  const wordmarkClasses = cn(
    "font-display font-bold tracking-[-0.05em]",
    "whitespace-nowrap text-center block",
    "text-[clamp(3.5rem,19vw,18rem)] leading-[0.78]",
  );

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative w-full select-none"
      aria-hidden
    >
      <span className={cn(wordmarkClasses, "text-foreground/[0.12]")}>{text}</span>
      <span
        className={cn(
          wordmarkClasses,
          "absolute inset-0 text-foreground/90 transition-opacity duration-300",
          pos.active ? "opacity-100" : "opacity-0",
        )}
        style={{
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        {text}
      </span>
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

          {/* COL 2/3/4 — chaque catégorie du site */}
          {site.footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="mb-5 text-[15px] font-medium text-foreground/55">
                {col.heading}
              </p>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[15px] text-foreground transition-colors hover:text-foreground/60"
                    >
                      {l.label}
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
            {site.legal.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="transition-colors hover:text-foreground"
              >
                {l.label}
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
        <TorchWordmark text="ZaraLabs" />
      </div>
    </footer>
  );
}

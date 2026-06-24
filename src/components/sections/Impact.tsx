import Marquee from "react-fast-marquee";
import { sectors } from "@/data/site";

// Secteurs d'intervention — bandeau marquee en grand display, sans cadre.
// Pleine largeur, dégradés gauche/droite pour fondre les extrémités.
export function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-background py-20 sm:py-28 lg:py-36">
      <div className="relative">
        <Marquee gradient={false} speed={45} pauseOnHover>
          {sectors.map((s) => (
            <span
              key={s}
              className="mx-6 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-semibold tracking-tight text-foreground/25 hover:text-foreground transition-colors duration-500"
            >
              {s}
            </span>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent sm:w-32" />
      </div>
    </section>
  );
}

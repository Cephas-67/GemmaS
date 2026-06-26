"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Folder } from "@/components/Folder";
import { useLang } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// L'équipe GemmaS · 5 co-fondateurs rangés dans le dossier qui s'ouvre.
// Click sur le dossier → ouverture · click sur une carte → elle se centre.
// L'ordre suit la position dans l'éventail, du plus à gauche au plus à droite.
//
// Le champ `focus` règle le crop du portrait dans le rond :
//   · "top"      → tête en haut (portraits verticaux où le visage est haut)
//   · "topZoom"  → zoom + ancrage haut (sources carrées où la tête est dans
//                  le tiers supérieur et serait clippée par le masque rond)
//   · "center"   → défaut, pour les portraits déjà cadrés visage centré
type Focus = "top" | "center" | "topZoom";
type Member = {
  name: string;
  role: string;
  avatar: string;
  focus: Focus;
};

const team: Member[] = [
  {
    name: "Duvalier",
    role: "CSO · Commercial & Clients",
    avatar: "/founders/DuvIllustrated.png",
    focus: "top",
  },
  {
    name: "Enock",
    role: "CTO · Tech & IA",
    avatar: "/founders/MarthIllustrated.png",
    focus: "top",
  },
  {
    name: "Prudence",
    role: "CEO · Vision & Stratégie",
    avatar: "/founders/PrudenceIllustrated.png",
    focus: "center",
  },
  {
    name: "Siméon",
    role: "CMO · Marketing & Contenu",
    avatar: "/founders/simeonillustrated.jpg",
    focus: "center",
  },
  {
    name: "Gaby",
    role: "COO · Opérations & Process",
    avatar: "/founders/gabyillustrated.jpg",
    focus: "topZoom",
  },
];

// Contenu d'une carte avatar · portrait + nom + rôle.
// Wrapper rond avec overflow-hidden pour que le scale du portrait puisse
// dépasser le cercle et se faire clipper proprement (le simple `border-radius`
// sur <img> ne tient pas avec `scale` quand on veut zoomer).
function TeamPaper({ name, role, avatar, focus }: Member) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-[#0b0d18]">
      <div className="h-9 w-9 overflow-hidden rounded-full bg-[#f4f0e8] ring-1 ring-black/10">
        <img
          src={avatar}
          alt=""
          loading="lazy"
          className={cn(
            "h-full w-full object-cover origin-top",
            focus === "top" && "object-top",
            focus === "topZoom" && "object-top scale-[1.25]",
            focus === "center" && "object-center",
          )}
        />
      </div>
      <h3 className="mt-0.5 text-center font-display text-[0.45rem] font-semibold leading-tight tracking-tight">
        {name}
      </h3>
      <p className="text-center text-[0.35rem] leading-tight opacity-60">
        {role}
      </p>
    </div>
  );
}

export function About() {
  const { t } = useLang();
  return (
    // Bg adaptatif · suit le thème global (light → blanc, dark → noir).
    <section
      id="about"
      className="relative bg-background py-20 text-foreground sm:py-28 lg:py-36"
    >
      <Container size="wide">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          {/* ── COL GAUCHE · récit ── */}
          <div>
            <Reveal>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
                {t("about.title")}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("about.text")}
              </p>
            </Reveal>
          </div>

          {/* ── COL DROITE · dossier reactbits avec 5 avatars ── */}
          <Reveal delay={0.12}>
            <div className="flex h-[320px] items-center justify-center sm:h-[420px]">
              <div className="origin-center scale-[0.65] sm:scale-90 md:scale-100">
                <Folder
                  color="#4F679E"
                  size={3}
                  items={team.map((m) => (
                    <TeamPaper key={m.name} {...m} />
                  ))}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

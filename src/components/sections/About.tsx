import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/Reveal";
import { Folder } from "@/components/Folder";

// L'équipe : 3 cartes-avatars dans le dossier reactbits.
// Click sur le dossier → ouverture · click sur une carte → elle se centre.
// La carte du milieu (index 1) = AMOUSSOU Siméon, fondateur.
// Avatars : SVG DiceBear "notionists" (libre, généré par seed, sans clé API).
const team = [
  { name: "Membre équipe", role: "CTO · Tech & Innovation", seed: "zara-cto" },
  { name: "AMOUSSOU Siméon", role: "Fondateur · CEO", seed: "siméon-amoussou" },
  { name: "Membre équipe", role: "COO · Opérations", seed: "zara-coo" },
];

function avatarUrl(seed: string) {
  // DiceBear "notionists" → portraits stylisés clean, fond transparent.
  const params = new URLSearchParams({ seed, backgroundType: "solid", backgroundColor: "f4f0e8" });
  return `https://api.dicebear.com/9.x/notionists/svg?${params.toString()}`;
}

// Contenu d'une carte avatar : portrait + nom + rôle.
function TeamPaper({ name, role, seed }: { name: string; role: string; seed: string }) {
  return (
    // Les papiers du dossier sont toujours clairs (blanc / ivoire), donc le
    // texte doit rester sombre indépendamment du thème système.
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-1 text-[#0b0d18]">
      <img
        src={avatarUrl(seed)}
        alt=""
        loading="lazy"
        className="h-9 w-9 rounded-full bg-[#f4f0e8] object-cover ring-1 ring-black/10"
      />
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
  return (
    // Bg adaptatif : suit le thème global (light → blanc, dark → noir).
    <section
      id="about"
      className="relative bg-background py-20 text-foreground sm:py-28 lg:py-36"
    >
      <Container size="wide">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          {/* ── COL GAUCHE : récit ── */}
          <div>
            <Reveal>
              <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.15] tracking-[-0.02em] text-foreground">
                Équipe dynamique, nous sommes attentifs sur le terrain avec la main dans le code pour satisfaire les clients.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Zara Labs est née d'une conviction simple : l'innovation
                technologique en Afrique de l'Ouest ne doit pas être un
                catalogue de buzzwords importés. Trois personnes, une seule
                méthode : écouter le terrain avant de coder.
              </p>
            </Reveal>
          </div>

          {/* ── COL DROITE : dossier reactbits avec 3 avatars ──
              Folder size=3 = ~480px sur l'écran. Sur mobile <380px ça déborde
              et ça écrase la grille. On scale-down via wrapper CSS plutôt que
              de prop-driller un breakpoint dans le composant. */}
          <Reveal delay={0.12}>
            <div className="flex h-[320px] items-center justify-center sm:h-[420px]">
              <div className="origin-center scale-[0.65] sm:scale-90 md:scale-100">
                <Folder
                  color="#3D2EE0"
                  size={3}
                  items={team.map((m) => (
                    <TeamPaper key={m.seed} {...m} />
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

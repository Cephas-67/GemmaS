import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Sitemap · GemmaS",
};

// Sections listées dans l'ordre réel de app/page.tsx. Manifesto et
// GamifiedHowItWorks n'ont pas d'id ancrable pour l'instant : listées en
// texte simple plutôt qu'en lien mort.
const sections = [
  { label: "Accueil", href: "/#top" },
  { label: "Pôles d'excellence", href: "/#poles-excellence" },
  { label: "Valeurs", href: "/#values" },
  { label: "Projets récents", href: "/#recent-projects" },
  { label: "Équipe", href: "/#team" },
  { label: "Recherche & R&D", href: "/#research" },
  { label: "Manifeste", href: null },
  { label: "Notre workflow", href: null },
  { label: "FAQ", href: "/#faq" },
  { label: "Human brilliance", href: "/#brilliance" },
];

const legal = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-32 text-foreground sm:pb-28 sm:pt-36">
      <Container size="tight">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.02em]">
          Plan du site
        </h1>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Accueil
          </h2>
          <ul className="mt-4 space-y-3">
            {sections.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a href={s.href} className="text-foreground underline-offset-4 hover:underline">
                    {s.label}
                  </a>
                ) : (
                  <span className="text-muted-foreground">{s.label}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium uppercase tracking-[0.1em] text-muted-foreground">
            Informations légales
          </h2>
          <ul className="mt-4 space-y-3">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-foreground underline-offset-4 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}

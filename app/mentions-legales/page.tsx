import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Mentions légales · GemmaS",
};

// Page à valider avant mise en production : les champs marqués
// [À COMPLÉTER] demandent une information juridique réelle (forme sociale,
// numéro RCCM/IFU, hébergeur, directeur de publication) que je n'ai pas et
// que je ne dois pas inventer sur une page à valeur légale.
function Field({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-foreground/60">{label} : </span>
      <span>{value}</span>
    </p>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-32 text-foreground sm:pb-28 sm:pt-36">
      <Container size="tight">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.02em]">
          Mentions légales
        </h1>

        <section className="mt-10 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">Éditeur du site</h2>
          <Field label="Dénomination" value={site.name} />
          <Field label="Forme juridique" value="[À COMPLÉTER]" />
          <Field label="Numéro RCCM" value="[À COMPLÉTER]" />
          <Field label="Numéro IFU" value="[À COMPLÉTER]" />
          <Field label="Siège social" value={site.contact.address} />
          <Field label="Email" value={site.contact.email} />
        </section>

        <section className="mt-10 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">
            Directeur de la publication
          </h2>
          <Field label="Nom" value="[À COMPLÉTER]" />
        </section>

        <section className="mt-10 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">Hébergement</h2>
          <Field label="Hébergeur" value="[À COMPLÉTER]" />
          <Field label="Adresse" value="[À COMPLÉTER]" />
        </section>

        <section className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos, code) est la
            propriété de {site.name} ou de ses partenaires, sauf mention contraire. Toute
            reproduction ou représentation, totale ou partielle, sans autorisation préalable est
            interdite.
          </p>
        </section>

        <section className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">Contact</h2>
          <p>
            Pour toute question relative à ces mentions légales, écrivez à{" "}
            <a href={`mailto:${site.contact.email}`} className="text-foreground underline-offset-4 hover:underline">
              {site.contact.email}
            </a>
            .
          </p>
        </section>
      </Container>
    </main>
  );
}

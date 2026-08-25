import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité · GemmaS",
};

// Page à valider avant mise en production. Le contenu ci-dessous décrit
// fidèlement ce que fait le code à ce jour (formulaire de contact non
// connecté à un backend, aucun traceur tiers, uniquement du localStorage
// fonctionnel) plutôt que d'affirmer des pratiques génériques non vérifiées.
// Les points nécessitant une validation juridique (base légale précise,
// durée de conservation, contact DPO) restent marqués [À COMPLÉTER].
export default function PolitiqueConfidentialitePage() {
  return (
    <main className="min-h-screen bg-background pb-20 pt-32 text-foreground sm:pb-28 sm:pt-36">
      <Container size="tight">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.02em]">
          Politique de confidentialité
        </h1>

        <section className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">
            Données collectées via le formulaire de contact
          </h2>
          <p>
            Le formulaire de contact du site demande votre nom, votre email, votre organisation
            (optionnel) et un message. Ces informations servent uniquement à répondre à votre
            demande.
          </p>
          <p>[À COMPLÉTER : durée de conservation, destinataire(s) exact(s), base légale.]</p>
        </section>

        <section id="cookies" className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">
            Cookies et stockage local
          </h2>
          <p>
            Le site n&apos;utilise aucun cookie publicitaire ou traceur tiers (pas d&apos;outil
            d&apos;analyse d&apos;audience à ce jour). Il stocke uniquement, dans le stockage local
            de votre navigateur (localStorage), votre préférence de langue, votre préférence
            d&apos;affichage clair/sombre, et le fait que vous ayez accepté ce bandeau. Ces
            préférences restent sur votre appareil et ne sont jamais transmises à {site.name}.
          </p>
        </section>

        <section className="mt-10 space-y-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <h2 className="font-display text-lg font-medium text-foreground">Vos droits</h2>
          <p>
            Vous pouvez demander l&apos;accès, la rectification ou la suppression des informations
            que vous nous avez transmises via le formulaire de contact, en écrivant à{" "}
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

// FAQ GemmaS · questions adaptées à l'offre agence digitale.
// Réponses courtes, ton direct, jamais de tiret cadratin.
export type FAQItem = {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
};

export const faqs: FAQItem[] = [
  {
    q: "Comment démarrer un projet avec GemmaS ?",
    qEn: "How do I start a project with GemmaS?",
    a: "Un premier appel de 30 minutes pour comprendre votre besoin, puis une proposition écrite sous 48h avec périmètre, délai et budget.",
    aEn: "A 30-minute call to understand your need, then a written proposal within 48h covering scope, timeline and budget.",
  },
  {
    q: "Combien de temps pour livrer un site vitrine ?",
    qEn: "How long does a showcase site take?",
    a: "5 jours en moyenne une fois le contenu reçu. Notre maîtrise des outils modernes nous permet de livrer en une semaine ce qu'une agence classique fait en trois.",
    aEn: "5 days on average once we have the content. Our modern toolchain lets us ship in a week what a traditional agency takes three to deliver.",
  },
  {
    q: "Vous travaillez avec qui ?",
    qEn: "Who are your clients?",
    a: "PME béninoises, startups, indépendants, diaspora africaine, ONG. Toute structure qui veut une présence numérique sérieuse, sans usine à gaz.",
    aEn: "Beninese SMEs, startups, freelancers, African diaspora, NGOs. Anyone who wants a serious digital presence without the bloat.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    qEn: "Which technologies do you use?",
    a: "Stack moderne : React, Next.js, TypeScript pour le web, React Native pour le mobile, Python et Supabase côté backend. Le choix dépend du contexte, jamais d'un effet de mode.",
    aEn: "Modern stack: React, Next.js, TypeScript for web, React Native for mobile, Python and Supabase on the backend. The choice depends on context, never trends.",
  },
  {
    q: "Vous faites aussi de l'IA ?",
    qEn: "Do you work with AI?",
    a: "Oui, c'est même un de nos pôles. Agents conversationnels, automatisations n8n, intégrations OpenAI ou Anthropic dans vos outils internes.",
    aEn: "Yes, it's one of our core areas. Chatbots, n8n automations, OpenAI or Anthropic integrations into your internal tools.",
  },
  {
    q: "Travaillez-vous en dehors du Bénin ?",
    qEn: "Do you work outside Benin?",
    a: "Oui. Nos clients sont en Afrique de l'Ouest, mais aussi dans la diaspora en France, Belgique et Canada. Tout se fait à distance, avec des points réguliers.",
    aEn: "Yes. Our clients are in West Africa, but also in the diaspora in France, Belgium and Canada. Everything happens remotely, with regular check-ins.",
  },
  {
    q: "Comment se passe la facturation ?",
    qEn: "How does billing work?",
    a: "Forfait pour un livrable défini, ou abonnement mensuel pour la maintenance et les évolutions. Devis sans engagement après l'appel de découverte.",
    aEn: "Fixed-price for a defined deliverable, or monthly subscription for maintenance and updates. No-commitment quote after the discovery call.",
  },
  {
    q: "Êtes-vous une agence ou un studio ?",
    qEn: "Are you an agency or a studio?",
    a: "Un studio de développement logiciel. On ne fait pas que des projets clients : on développe aussi nos propres produits, comme e-freeshop.com, notre marketplace de composants et templates pensée pour les créateurs africains, avec paiement Mobile Money intégré. La même exigence s'applique aux deux.",
    aEn: "A software development studio. We don't just handle client projects: we also build our own products, like e-freeshop.com, our marketplace for components and templates built for African creators, with native Mobile Money payments. The same standard applies to both.",
  },
];

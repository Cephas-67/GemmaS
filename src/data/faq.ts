// FAQ Zara Labs — questions adaptées au contexte conseil + tech.
// Réponses courtes, ton direct, jamais de tiret cadratin.
export type FAQItem = {
  q: string;
  qEn: string;
  a: string;
  aEn: string;
};

export const faqs: FAQItem[] = [
  {
    q: "Comment démarrer un projet avec Zara Labs ?",
    qEn: "How do I start a project with Zara Labs?",
    a: "Un premier échange de 30 minutes pour cadrer le besoin, puis une note de cadrage sous 48h avec périmètre, livrables et budget indicatif.",
    aEn: "A 30-minute discovery call to scope the need, followed by a written brief within 48h covering scope, deliverables and indicative budget.",
  },
  {
    q: "Quels secteurs accompagnez-vous ?",
    qEn: "Which sectors do you work with?",
    a: "Santé, agriculture, énergie, logistique, éducation, finance, administration publique et ONG. Notre méthode reste la même : terrain d'abord, code ensuite.",
    aEn: "Healthcare, agriculture, energy, logistics, education, finance, public administration and NGOs. The method stays the same: fieldwork first, code second.",
  },
  {
    q: "Quel est le délai moyen d'un audit ?",
    qEn: "How long does an audit take on average?",
    a: "Entre 2 et 4 semaines selon la complexité. L'audit inclut entretiens, revue de l'existant et restitution sous forme d'un rapport actionnable.",
    aEn: "Between 2 and 4 weeks depending on complexity. The audit covers interviews, review of existing systems, and a final actionable report.",
  },
  {
    q: "Travaillez-vous en dehors du Bénin ?",
    qEn: "Do you work outside Benin?",
    a: "Oui, notamment en Afrique de l'Ouest et auprès d'ONG internationales. Nos équipes se déplacent ou opèrent à distance selon le besoin.",
    aEn: "Yes, particularly across West Africa and with international NGOs. Our teams travel on-site or operate remotely depending on the need.",
  },
  {
    q: "Proposez-vous de l'incubation pour startups ?",
    qEn: "Do you offer startup incubation?",
    a: "Oui, via un parcours de 3 à 6 mois : diagnostic, mentorat tech et stratégique, accès à notre réseau partenaire et accompagnement à la levée.",
    aEn: "Yes, through a 3 to 6-month program: diagnostic, tech and strategic mentoring, partner network access, and fundraising support.",
  },
  {
    q: "Comment se passe la facturation ?",
    qEn: "How does billing work?",
    a: "Forfait pour un livrable défini, ou régie au mois pour un accompagnement continu. Devis sans engagement après la phase de cadrage.",
    aEn: "Fixed-price for defined deliverables, or monthly retainer for ongoing support. No-commitment quote after the scoping phase.",
  },
  {
    q: "Quelles technologies utilisez-vous ?",
    qEn: "Which technologies do you use?",
    a: "Stack moderne et pérenne : TypeScript, React, Node, Python pour la data et l'IA, Postgres pour le stockage. Le choix dépend du contexte, jamais d'un effet de mode.",
    aEn: "Modern and durable stack: TypeScript, React, Node, Python for data and AI, Postgres for storage. The choice depends on context, never trends.",
  },
  {
    q: "Êtes-vous une agence ou un cabinet de conseil ?",
    qEn: "Are you an agency or a consulting firm?",
    a: "Les deux. Zara Labs croise ingénierie produit et conseil stratégique : on diagnostique, on recommande, puis on construit avec le client.",
    aEn: "Both. Zara Labs blends product engineering and strategic consulting: we diagnose, advise, then build alongside the client.",
  },
];

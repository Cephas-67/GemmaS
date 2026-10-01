// Contenu des 3 pages légales, structuré et bilingue (même pattern que
// PoleExcellence/ValueItem : un champ `*En` par texte, résolu via useLang()
// dans src/components/legal/LegalPage.tsx). Les valeurs marquées
// [À COMPLÉTER] / [TO BE COMPLETED] demandent une information juridique
// réelle que je n'ai pas et que je ne dois pas inventer sur une page à
// valeur légale.

const TBD_FR = "[À COMPLÉTER]";
const TBD_EN = "[TO BE COMPLETED]";

export type LegalField = {
  label: string;
  labelEn: string;
  /** Champ dynamique résolu depuis `site.ts` plutôt qu'une valeur figée. */
  dynamic?: "denomination" | "address" | "email";
  value?: string;
  valueEn?: string;
};

export type LegalSection = {
  heading: string;
  headingEn: string;
  /** Ancre optionnelle (ex. `#cookies` référencé par CookieBanner.tsx). */
  id?: string;
  paragraphs?: string[];
  paragraphsEn?: string[];
  fields?: LegalField[];
  /** Ajoute "Pour toute question ..., écrivez à {email}." en fin de section. */
  contactIntro?: string;
  contactIntroEn?: string;
};

export type LegalPageData = {
  title: string;
  titleEn: string;
  sections: LegalSection[];
};

export const mentionsLegales: LegalPageData = {
  title: "Mentions légales",
  titleEn: "Legal notice",
  sections: [
    {
      heading: "Éditeur du site",
      headingEn: "Site publisher",
      fields: [
        { label: "Dénomination", labelEn: "Legal name", dynamic: "denomination" },
        { label: "Forme juridique", labelEn: "Legal form", value: "Etablissement", valueEn: TBD_EN },
        { label: "Numéro RCCM", labelEn: "RCCM number", value: "RB/PNO/26 A 128959", valueEn: "RB/PNO/26 A 128959" },
        { label: "Numéro IFU", labelEn: "IFU number", value: "02024384000142", valueEn: "02024384000142" },
        { label: "Siège social", labelEn: "Registered address", dynamic: "address" },
        { label: "Email", labelEn: "Email", dynamic: "email" },
      ],
    },
    {
      heading: "Directeur de la publication",
      headingEn: "Publication director",
      fields: [{ label: "Nom", labelEn: "Name", value: "Prudence MOUZOUN", valueEn: "Prudence MOUZOUN" }],
    },
    {
      heading: "Hébergement",
      headingEn: "Hosting",
      fields: [
        {
          label: "Hébergeur",
          labelEn: "Host",
          value: "Vercel Inc.",
          valueEn: "Vercel Inc.",
        },
        {
          label: "Adresse",
          labelEn: "Address",
          value: "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
          valueEn: "440 N Barranca Ave #4133, Covina, CA 91723, USA",
        },
      ],
    },
    {
      heading: "Propriété intellectuelle",
      headingEn: "Intellectual property",
      paragraphs: [
        "L'ensemble des contenus présents sur ce site (textes, visuels, logos, code) est la propriété de GemmaS ou de ses partenaires, sauf mention contraire. Toute reproduction ou représentation, totale ou partielle, sans autorisation préalable est interdite.",
      ],
      paragraphsEn: [
        "All content on this site (text, visuals, logos, code) is the property of GemmaS or its partners, unless otherwise stated. Any reproduction or representation, in whole or in part, without prior authorization is prohibited.",
      ],
    },
    {
      heading: "Contact",
      headingEn: "Contact",
      contactIntro: "Pour toute question relative à ces mentions légales, écrivez à",
      contactIntroEn: "For any question about this legal notice, write to",
    },
  ],
};

export const politiqueConfidentialite: LegalPageData = {
  title: "Politique de confidentialité",
  titleEn: "Privacy policy",
  sections: [
    {
      heading: "Données collectées via le formulaire de contact",
      headingEn: "Data collected through the contact form",
      paragraphs: [
        "Le formulaire de contact du site demande votre nom, votre email, votre organisation (optionnel) et un message. Ces informations servent uniquement à répondre à votre demande.",
        "• Base légale : Intérêt légitime (répondre à vos demandes de renseignements) et mesures précontractuelles.\n• Destinataires : L'équipe interne de GemmaS (gemmas.pro@gmail.com).\n• Durée de conservation : 3 ans maximum à compter de votre dernier échange.",
      ],
      paragraphsEn: [
        "The site's contact form asks for your name, email, organization (optional) and a message. This information is used solely to respond to your request.",
        "• Legal basis: Legitimate interest (responding to your inquiries) and pre-contractual measures.\n• Recipients: GemmaS internal team (gemmas.pro@gmail.com).\n• Retention period: Maximum of 3 years from your last interaction.",
      ],
    },
    {
      heading: "Cookies et stockage local",
      headingEn: "Cookies and local storage",
      id: "cookies",
      paragraphs: [
        "Le site n'utilise aucun cookie publicitaire ou traceur tiers (pas d'outil d'analyse d'audience à ce jour). Il stocke uniquement, dans le stockage local de votre navigateur (localStorage), votre préférence de langue, votre préférence d'affichage clair/sombre, et le fait que vous ayez accepté ce bandeau. Ces préférences restent sur votre appareil et ne sont jamais transmises à GemmaS.",
      ],
      paragraphsEn: [
        "The site does not use any advertising cookie or third-party tracker (no audience analytics tool at this time). It only stores, in your browser's local storage (localStorage), your language preference, your light/dark display preference, and whether you accepted this banner. These preferences stay on your device and are never transmitted to GemmaS.",
      ],
    },
    {
      heading: "Vos droits",
      headingEn: "Your rights",
      contactIntro:
        "Vous pouvez demander l'accès, la rectification ou la suppression des informations que vous nous avez transmises via le formulaire de contact, en écrivant à",
      contactIntroEn:
        "You can request access to, correction of, or deletion of the information you have submitted through the contact form, by writing to",
    },
  ],
};

export const termsOfUse: LegalPageData = {
  title: "Conditions d'utilisation",
  titleEn: "Terms of use",
  sections: [
    {
      heading: "Article 1. Objet du site",
      headingEn: "1. Purpose of the website",
      paragraphs: [
        "Ce site a un objet principalement informationnel et vitrine : il présente GemmaS, ses activités, son équipe et ses réalisations. Il ne constitue pas, à lui seul, une plateforme de vente en ligne.",
      ],
      paragraphsEn: [
        "This site is primarily informational and serves as a showcase: it presents GemmaS, its activities, team and work. It does not, by itself, constitute an online sales platform.",
      ],
    },
    {
      heading: "Article 2. Acceptation des conditions",
      headingEn: "2. Acceptance of the Terms",
      paragraphs: [
        "En accédant à ce site ou en l'utilisant, vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.",
      ],
      paragraphsEn: [
        "By accessing or using this site, you agree to these terms of use in their entirety. If you do not accept these terms, please do not use this site.",
      ],
    },
    {
      heading: "Article 3. Usage autorisé",
      headingEn: "3. Permitted use",
      paragraphs: [
        "Vous pouvez consulter ce site et son contenu à des fins personnelles et non commerciales. Vous vous engagez à ne pas tenter d'accéder de façon non autorisée à tout ou partie du site, à ne pas perturber son fonctionnement (attaques par déni de service, extraction automatisée massive de contenu, etc.), et à ne pas l'utiliser à des fins illégales ou frauduleuses.",
      ],
      paragraphsEn: [
        "You may browse this site and its content for personal, non-commercial purposes. You agree not to attempt unauthorized access to all or part of the site, not to disrupt its operation (denial-of-service attacks, large-scale automated scraping, etc.), and not to use it for illegal or fraudulent purposes.",
      ],
    },
    {
      heading: "Article 4. Propriété intellectuelle",
      headingEn: "4. Intellectual property",
      paragraphs: [
        "L'ensemble des contenus présents sur ce site (textes, visuels, logos, code) est la propriété de GemmaS ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation, modification, redistribution ou exploitation commerciale, totale ou partielle, sans autorisation écrite préalable, est interdite.",
      ],
      paragraphsEn: [
        "All content on this site (text, visuals, logos, code) is the property of GemmaS or its partners, unless otherwise stated. Any reproduction, representation, modification, redistribution or commercial use, in whole or in part, without prior written authorization, is prohibited.",
      ],
    },
    {
      heading: "Article 5. Contenu du site",
      headingEn: "5. Website content",
      paragraphs: [
        "Les informations publiées sur ce site sont fournies à titre indicatif et général. GemmaS s'efforce d'en assurer l'exactitude, mais ne peut garantir l'absence d'erreurs, d'omissions ou d'informations devenues obsolètes. Ces informations peuvent être corrigées ou mises à jour à tout moment, sans préavis.",
      ],
      paragraphsEn: [
        "Information published on this site is provided for general, indicative purposes. GemmaS strives to ensure its accuracy but cannot guarantee the absence of errors, omissions or outdated information. This information may be corrected or updated at any time, without notice.",
      ],
    },
    {
      heading: "Article 6. Disponibilité du site",
      headingEn: "6. Website availability",
      paragraphs: [
        "GemmaS s'efforce d'assurer l'accès au site en continu, mais ne garantit pas une disponibilité ininterrompue. Le site peut être temporairement indisponible pour maintenance, mise à jour, ou en raison de problèmes techniques indépendants de notre volonté.",
      ],
      paragraphsEn: [
        "GemmaS strives to keep the site accessible at all times but does not guarantee uninterrupted availability. The site may be temporarily unavailable for maintenance, updates, or due to technical issues beyond our control.",
      ],
    },
    {
      heading: "Article 7. Liens externes",
      headingEn: "7. External links",
      paragraphs: [
        "Ce site peut contenir des liens vers des sites tiers (réseaux sociaux, portfolios, e-freeshop.com...). GemmaS ne contrôle pas ces sites et n'est pas responsable de leur contenu, de leur politique de confidentialité ou de leurs pratiques. L'inclusion d'un lien ne vaut pas approbation de son contenu.",
      ],
      paragraphsEn: [
        "This site may contain links to third-party websites (social media, portfolios, e-freeshop.com...). GemmaS does not control these sites and is not responsible for their content, privacy practices, or policies. The inclusion of a link does not imply endorsement of its content.",
      ],
    },
    {
      heading: "Article 8. Contenu soumis par l'utilisateur",
      headingEn: "8. User-submitted content",
      paragraphs: [
        "Le formulaire de contact vous permet de nous transmettre des informations (nom, email, organisation, message). Vous vous engagez à ne soumettre que des informations exactes et à ne pas transmettre de contenu illégal, diffamatoire ou portant atteinte aux droits de tiers. Le traitement de ces données est détaillé dans notre politique de confidentialité.",
      ],
      paragraphsEn: [
        "The contact form lets you send us information (name, email, organization, message). You agree to submit only accurate information and not to submit content that is illegal, defamatory, or infringes on third-party rights. The handling of this data is detailed in our privacy policy.",
      ],
    },
    {
      heading: "Article 9. Limitation de responsabilité",
      headingEn: "9. Limitation of liability",
      paragraphs: [
        "Dans la limite permise par la loi applicable, GemmaS ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation ou de l'impossibilité d'utiliser ce site, y compris en cas de perte de données, d'interruption d'activité ou de préjudice commercial.",
      ],
      paragraphsEn: [
        "To the extent permitted by applicable law, GemmaS shall not be liable for any direct or indirect damages resulting from the use or inability to use this site, including data loss, business interruption, or commercial harm.",
      ],
    },
    {
      heading: "Article 10. Modification des conditions",
      headingEn: "10. Changes to the Terms",
      paragraphs: [
        "GemmaS se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les modifications prennent effet dès leur publication sur cette page. Il vous appartient de consulter régulièrement cette page pour prendre connaissance des éventuelles mises à jour.",
      ],
      paragraphsEn: [
        "GemmaS reserves the right to modify these terms of use at any time. Changes take effect as soon as they are published on this page. It is your responsibility to check this page regularly for any updates.",
      ],
    },
    {
      heading: "Article 11. Droit applicable et résolution des litiges",
      headingEn: "11. Applicable law and dispute resolution",
      fields: [
        {
          label: "Droit applicable",
          labelEn: "Governing law",
          value:
            "\nLes présentes Conditions Générales ainsi que l'utilisation du site web et des services fournis par GemmaS sont régies, interprétées et exécutées conformément au droit béninois et au cadre juridique des affaires de l'OHADA. Dans le cadre des prestations de services B2B réalisées pour des clients internationaux (notamment situés au Canada, en France, en Belgique ou en Suisse), les présentes dispositions s'appliquent à titre de loi d'autonomie choisie par les parties, sous réserve d'un accord contractuel spécifique écrit conclu entre GemmaS et son client.",
          valueEn:
            "\nThese General Terms and Conditions, as well as the use of the website and services provided by GemmaS, are governed by, construed, and enforced in accordance with Beninese law and the OHADA legal framework. For B2B service engagements provided to international clients (in particular those located in Canada, France, Belgium, or Switzerland), these provisions apply as the governing law chosen by the parties, subject to any specific written contractual agreement executed between GemmaS and its client.",
        },
        {
          label: "Procédure de règlement amiable",
          labelEn: "Amicable settlement procedure",
          value:
            "\nEn cas de différend, contestation ou réclamation découlant de l'interprétation, de la validité, de la conclusion ou de l'exécution des présentes conditions ou des services fournis par GemmaS, les parties s'engagent prioritairement à chercher une solution amiable de bonne foi.\n\nToute réclamation doit être notifiée par écrit à GemmaS (à l'adresse gemmas.pro@gmail.com). À compter de la réception de cette notification, les parties disposent d'un délai de trente (30) jours calendaires pour mener des négociations amiables.",
          valueEn:
            "\nIn the event of any dispute, controversy, or claim arising out of or relating to the interpretation, validity, performance, or termination of these terms or the services provided by GemmaS, the parties agree to first attempt to settle the matter amicably in good faith.\n\nAny claim must be submitted in writing to GemmaS (at gemmas.pro@gmail.com). From the date of receipt of such notice, the parties shall have a period of thirty (30) calendar days to engage in good-faith negotiations.",
        },
        {
          label: "Juridiction compétente et arbitrage",
          labelEn: "Competent jurisdiction and arbitration",
          value:
            "\nÀ défaut d'accord amiable dans le délai de trente (30) jours prévu ci-dessus :\n\n- Juridiction de droit commun (B2B) : Tout litige sera soumis à la compétence exclusive des tribunaux compétents du ressort du siège social de GemmaS (Cotonou, République du Bénin).\n\n- Option d'arbitrage (Litiges internationaux) : Pour les relations d'affaires et contrats transfrontaliers, GemmaS se réserve la faculté, ou les parties peuvent convenir d'un commun accord, de soumettre le litige à un arbitrage définitif conformément au règlement d'arbitrage du Centre d'Arbitrage, de Médiation et de Conciliation (CAMEC) de Cotonou ou de la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA. La sentence arbitrale sera finale et exécutoire pour l'ensemble des parties.",
          valueEn:
            "\nFailing an amicable resolution within the thirty (30) day period specified above:\n\n- Standard Jurisdiction (B2B): Any dispute shall be subject to the exclusive jurisdiction of the competent courts within the territorial jurisdiction of GemmaS's registered office (Cotonou, Republic of Benin).\n\n- Arbitration Option (International Disputes): For cross-border business relations and contracts, GemmaS reserves the right, or the parties may mutually agree, to submit the dispute to binding arbitration in accordance with the Arbitration Rules of the Center for Arbitration, Mediation and Conciliation (CAMEC) of Cotonou or the Common Court of Justice and Arbitration (CCJA) of OHADA. The arbitral award shall be final and binding on all parties.",
        },
        {
          label: "Conformité et protection des données personnelles",
          labelEn: "Compliance and personal data protection",
          value:
            "\nBien que le présent contrat soit soumis au droit béninois, GemmaS s'engage à respecter les réglementations d'ordre public relatives à la protection des données personnelles en fonction des marchés desservis :\n\n- Union Européenne (France, Belgique) : Traitement des données à caractère personnel réalisé en conformité avec le Règlement Général sur la Protection des Données (RGPD).\n\n- Canada et Québec : Respect des exigences légales relatives à la protection des renseignements personnels du secteur privé (Loi 25 au Québec) et à la réglementation anti-pourriel (LCAP).",
          valueEn:
            "\nAlthough this agreement is governed by Beninese law, GemmaS undertakes to comply with mandatory public policy regulations regarding personal data protection in the markets served:\n\n- European Union (France, Belgium): Personal data processing complies with the General Data Protection Regulation (GDPR).\n\n- Canada and Quebec: Compliance with statutory obligations regarding the protection of personal information in the private sector (Act 25 in Quebec) and anti-spam legislation (CASL).",
        },
      ],
    },
    {
      heading: "Contact",
      headingEn: "12. Contact",
      contactIntro: "Pour toute question relative à ces conditions d'utilisation, écrivez à",
      contactIntroEn: "For any question about these terms of use, write to",
    },
  ],
};

// Contenu des 3 pages légales, structuré et bilingue (même pattern que
// PoleExcellence/ValueItem : un champ `*En` par texte, résolu via useLang()
// dans src/components/legal/LegalPage.tsx).
//
// Les données d'identification (RCCM, IFU, forme, exploitant) reprennent
// l'annonce légale, l'attestation IFU et la déclaration d'établissement du
// 14 septembre 2026. Elles ne s'inventent pas : toute modification part de
// ces documents.

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
  /** Date affichée sous le titre : une page légale dit de quand elle date. */
  miseAJour: string;
  miseAJourEn: string;
  sections: LegalSection[];
};

const MISE_A_JOUR = "Dernière mise à jour : 24 novembre 2026";
const MISE_A_JOUR_EN = "Last updated: November 24, 2026";

export const mentionsLegales: LegalPageData = {
  title: "Mentions légales",
  titleEn: "Legal notice",
  miseAJour: MISE_A_JOUR,
  miseAJourEn: MISE_A_JOUR_EN,
  sections: [
    {
      heading: "Éditeur du site",
      headingEn: "Site publisher",
      fields: [
        { label: "Nom commercial", labelEn: "Trade name", dynamic: "denomination" },
        {
          label: "Forme juridique",
          labelEn: "Legal form",
          value: "Établissement (entreprise individuelle, personne physique)",
          valueEn: "Établissement (sole proprietorship, natural person)",
        },
        { label: "Exploitant", labelEn: "Owner", value: "Siméon Cephas AMOUSSOU", valueEn: "Siméon Cephas AMOUSSOU" },
        {
          label: "Activité",
          labelEn: "Business activity",
          value: "Activités informatiques et activités connexes",
          valueEn: "IT and related activities",
        },
        {
          label: "Numéro RCCM",
          labelEn: "RCCM number",
          value: "RB/PNO/26 A 128959 du 14 septembre 2026",
          valueEn: "RB/PNO/26 A 128959, dated September 14, 2026",
        },
        { label: "Numéro IFU", labelEn: "IFU (tax ID) number", value: "0202438400014", valueEn: "0202438400014" },
        { label: "Adresse", labelEn: "Address", dynamic: "address" },
        { label: "Email", labelEn: "Email", dynamic: "email" },
        {
          label: "Téléphone",
          labelEn: "Phone",
          value: "+229 01 57 03 58 70 / +229 01 66 68 68 66",
          valueEn: "+229 01 57 03 58 70 / +229 01 66 68 68 66",
        },
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
      paragraphs: [
        "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis. Site : vercel.com.",
      ],
      paragraphsEn: [
        "The site is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. Website: vercel.com.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      headingEn: "Intellectual property",
      paragraphs: [
        "Les textes, visuels, logos et le code de ce site appartiennent à GemmaS ou à ses partenaires, sauf mention contraire. Les marques et logos des clients présentés restent la propriété de leurs titulaires. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite.",
      ],
      paragraphsEn: [
        "The text, visuals, logos and code of this site belong to GemmaS or its partners, unless otherwise stated. The brands and logos of clients shown remain the property of their owners. Any reproduction or representation, in whole or in part, without prior written permission is prohibited.",
      ],
    },
    {
      heading: "Données personnelles",
      headingEn: "Personal data",
      paragraphs: [
        "Le site ne collecte aucune donnée personnelle : il ne comporte ni formulaire, ni compte utilisateur, ni cookie, ni outil de mesure d'audience. L'usage que nous faisons des emails que vous nous envoyez est décrit dans la politique de confidentialité.",
      ],
      paragraphsEn: [
        "The site collects no personal data: it has no form, no user account, no cookies and no audience measurement tool. How we use the emails you send us is described in the privacy policy.",
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
  miseAJour: MISE_A_JOUR,
  miseAJourEn: MISE_A_JOUR_EN,
  sections: [
    {
      heading: "Qui est responsable",
      headingEn: "Who is responsible",
      paragraphs: [
        "Le responsable est GemmaS, établissement exploité par Siméon Cephas AMOUSSOU, immatriculé au RCCM sous le numéro RB/PNO/26 A 128959. Pour toute question sur vos données, écrivez à gemmas.pro@gmail.com.",
        "Cette politique est établie au regard du Code du numérique de la République du Bénin (loi n° 2017-20). Elle ne restreint en rien les droits que vous tenez des règles de votre pays de résidence, notamment le RGPD dans l'Union européenne ou la Loi 25 au Québec.",
      ],
      paragraphsEn: [
        "The party responsible is GemmaS, a business owned by Siméon Cephas AMOUSSOU, registered with the RCCM under number RB/PNO/26 A 128959. For any question about your data, write to gemmas.pro@gmail.com.",
        "This policy is drawn up with regard to the Digital Code of the Republic of Benin (Law No. 2017-20). It does not limit the rights you hold under the rules of your country of residence, in particular the GDPR in the European Union or Law 25 in Quebec.",
      ],
    },
    {
      heading: "Ce que nous recevons",
      headingEn: "What we receive",
      paragraphs: [
        "Le site ne collecte aucune donnée : il ne comporte ni formulaire de contact, ni compte utilisateur. Nous ne recevons que ce que vous choisissez de nous envoyer par email : votre adresse, votre nom, le contenu de votre message et ses pièces jointes éventuelles.",
        "Ces emails servent à une seule chose : l'échange que vous avez ouvert avec nous. Nous les lisons pour vous répondre, comprendre votre besoin et vous faire une proposition adaptée, puis, si nous travaillons ensemble, pour mener le projet.",
        "En dehors de cet échange, nous n'en faisons rien : aucun fichier de prospects ou de clients n'est constitué à partir de ces messages, aucune analyse ni aucun profilage n'en est tiré, aucune liste de diffusion n'est alimentée, et rien n'est vendu, loué ou cédé à qui que ce soit. Nous ne vous écrivons que pour répondre à ce que vous nous avez demandé.",
        "• Fondement : votre propre demande, puis, le cas échéant, le contrat qui nous lie.\n• Conservation : vos emails restent dans notre messagerie au plus 3 ans après notre dernier échange si aucun projet n'en découle. Pour un client, pendant la relation, puis pendant la durée imposée par la loi pour les documents comptables et contractuels. Vous pouvez demander leur suppression plus tôt.",
      ],
      paragraphsEn: [
        "The site collects no data: it has no contact form and no user account. We only receive what you choose to send us by email: your address, your name, the content of your message and any attachments.",
        "These emails serve one purpose only: the exchange you opened with us. We read them to answer you, understand your need and make you a suitable proposal, then, if we work together, to run the project.",
        "Outside that exchange, we do nothing with them: no prospect or client file is built from these messages, no analysis or profiling is drawn from them, no mailing list is fed, and nothing is sold, rented or passed on to anyone. We only write to you to answer what you asked us.",
        "• Basis: your own request, then, where applicable, the contract between us.\n• Retention: your emails stay in our mailbox for at most 3 years after our last exchange if no project follows. For a client, for the duration of the relationship, then for the period required by law for accounting and contractual records. You can ask for them to be deleted sooner.",
      ],
    },
    {
      heading: "Données techniques de l'hébergeur",
      headingEn: "Hosting provider's technical data",
      paragraphs: [
        "Comme tout hébergeur, Vercel enregistre des journaux techniques lors de vos visites (adresse IP, type de navigateur, page demandée, date et heure). Ils servent au fonctionnement et à la sécurité du site, relèvent de Vercel et ne nous servent pas à vous identifier. Le site n'utilise aucun outil de mesure d'audience ni de publicité.",
      ],
      paragraphsEn: [
        "Like any hosting provider, Vercel records technical logs when you visit (IP address, browser type, requested page, date and time). They are used to keep the site running and secure, belong to Vercel and are not used by us to identify you. The site uses no audience measurement or advertising tool.",
      ],
    },
    {
      heading: "Qui y a accès",
      headingEn: "Who has access",
      paragraphs: [
        "Vos messages ne sont lus que par l'équipe GemmaS. Deux prestataires techniques interviennent : Google, qui fournit notre messagerie, et Vercel, qui héberge le site. Leurs serveurs peuvent se trouver hors du Bénin, notamment aux États-Unis. Aucun autre tiers n'y a accès.",
      ],
      paragraphsEn: [
        "Your messages are read only by the GemmaS team. Two technical providers are involved: Google, which provides our email, and Vercel, which hosts the site. Their servers may be located outside Benin, in particular in the United States. No other third party has access to them.",
      ],
    },
    {
      heading: "Cookies et stockage local",
      headingEn: "Cookies and local storage",
      id: "cookies",
      paragraphs: [
        "Le site n'utilise aucun cookie. Il garde seulement, dans le stockage local de votre navigateur, votre langue, votre choix d'affichage clair ou sombre, et le fait que vous ayez fermé le bandeau d'information. Ces préférences restent sur votre appareil et ne nous sont jamais transmises. Vous pouvez les effacer à tout moment depuis les réglages de votre navigateur.",
      ],
      paragraphsEn: [
        "The site uses no cookies. It only keeps, in your browser's local storage, your language, your light or dark display choice, and whether you closed the information banner. These preferences stay on your device and are never sent to us. You can clear them at any time from your browser settings.",
      ],
    },
    {
      heading: "Vos droits",
      headingEn: "Your rights",
      paragraphs: [
        "Vous pouvez demander à accéder à vos données, à les faire corriger ou supprimer, vous opposer à leur usage ou en demander la limitation. Lorsque le RGPD s'applique, vous pouvez aussi en demander une copie dans un format réutilisable. Nous vous répondons dans les délais prévus par la loi qui vous protège.",
        "Si notre réponse ne vous satisfait pas, vous pouvez saisir l'Autorité de Protection des Données à caractère Personnel (APDP) du Bénin, ou l'autorité de votre pays : la CNIL en France, l'Autorité de protection des données en Belgique, la Commission d'accès à l'information au Québec.",
      ],
      paragraphsEn: [
        "You can ask to access your data, have it corrected or deleted, object to its use or ask for it to be restricted. Where the GDPR applies, you can also ask for a copy in a reusable format. We answer within the time limits set by the law that protects you.",
        "If our answer does not satisfy you, you can contact Benin's personal data protection authority (APDP), or the authority in your country: the CNIL in France, the Data Protection Authority in Belgium, the Commission d'accès à l'information in Quebec.",
      ],
      contactIntro: "Pour exercer ces droits, écrivez à",
      contactIntroEn: "To exercise these rights, write to",
    },
    {
      heading: "Modifications",
      headingEn: "Changes",
      paragraphs: [
        "Si le site venait à collecter des données (un formulaire, un outil de mesure d'audience), cette politique serait mise à jour avant leur mise en service. La date de dernière mise à jour figure en haut de cette page.",
      ],
      paragraphsEn: [
        "Should the site ever collect data (a form, an audience measurement tool), this policy would be updated before they go live. The date of the last update is shown at the top of this page.",
      ],
    },
  ],
};

export const termsOfUse: LegalPageData = {
  title: "Conditions d'utilisation",
  titleEn: "Terms of use",
  miseAJour: MISE_A_JOUR,
  miseAJourEn: MISE_A_JOUR_EN,
  sections: [
    {
      heading: "Article 1. Objet du site",
      headingEn: "1. Purpose of the website",
      paragraphs: [
        "Ce site présente GemmaS, ses activités, son équipe et ses réalisations. Il ne vend rien en ligne : toute prestation fait l'objet d'une proposition et d'un accord écrits, distincts des présentes conditions.",
      ],
      paragraphsEn: [
        "This site presents GemmaS, its activities, team and work. It sells nothing online: every service is subject to a written proposal and agreement, separate from these terms.",
      ],
    },
    {
      heading: "Article 2. Acceptation des conditions",
      headingEn: "2. Acceptance of the Terms",
      paragraphs: [
        "En accédant à ce site ou en l'utilisant, vous acceptez les présentes conditions d'utilisation dans leur intégralité. Si vous ne les acceptez pas, veuillez ne pas utiliser ce site.",
      ],
      paragraphsEn: [
        "By accessing or using this site, you agree to these terms of use in their entirety. If you do not accept them, please do not use this site.",
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
        "Les textes, visuels, logos et le code de ce site appartiennent à GemmaS ou à ses partenaires, sauf mention contraire. Toute reproduction, représentation, modification, redistribution ou exploitation commerciale, totale ou partielle, sans autorisation écrite préalable, est interdite.",
      ],
      paragraphsEn: [
        "The text, visuals, logos and code of this site belong to GemmaS or its partners, unless otherwise stated. Any reproduction, representation, modification, redistribution or commercial use, in whole or in part, without prior written permission, is prohibited.",
      ],
    },
    {
      heading: "Article 5. Contenu du site",
      headingEn: "5. Website content",
      paragraphs: [
        "Les informations publiées sur ce site sont données à titre indicatif. Les délais et exemples cités ne valent pas engagement : seul l'accord écrit conclu pour un projet engage GemmaS. Nous veillons à l'exactitude de ces informations, sans pouvoir garantir l'absence d'erreur ou d'information devenue obsolète, et pouvons les corriger à tout moment.",
      ],
      paragraphsEn: [
        "Information published on this site is indicative. The timelines and examples given are not commitments: only the written agreement made for a project binds GemmaS. We take care that this information is accurate, without being able to guarantee it is free of errors or outdated content, and may correct it at any time.",
      ],
    },
    {
      heading: "Article 6. Disponibilité du site",
      headingEn: "6. Website availability",
      paragraphs: [
        "GemmaS s'efforce de garder le site accessible en continu, sans garantir une disponibilité ininterrompue. Il peut être momentanément indisponible pour maintenance, mise à jour, ou en raison de problèmes techniques indépendants de notre volonté.",
      ],
      paragraphsEn: [
        "GemmaS strives to keep the site accessible at all times, without guaranteeing uninterrupted availability. It may be temporarily unavailable for maintenance, updates, or due to technical issues beyond our control.",
      ],
    },
    {
      heading: "Article 7. Liens externes",
      headingEn: "7. External links",
      paragraphs: [
        "Ce site contient des liens vers des sites tiers (réseaux sociaux, portfolios de l'équipe, e-freeshop.com). GemmaS ne contrôle pas ces sites et n'est pas responsable de leur contenu ni de leurs pratiques en matière de données. Un lien ne vaut pas approbation de son contenu.",
      ],
      paragraphsEn: [
        "This site contains links to third-party websites (social media, team portfolios, e-freeshop.com). GemmaS does not control these sites and is not responsible for their content or their data practices. A link does not imply endorsement of its content.",
      ],
    },
    {
      heading: "Article 8. Messages que vous nous envoyez",
      headingEn: "8. Messages you send us",
      paragraphs: [
        "Le site ne comporte pas de formulaire : vous nous écrivez par email. Vous vous engagez à ne transmettre que des informations exactes, et aucun contenu illégal, diffamatoire ou portant atteinte aux droits de tiers. Ce que nous faisons de ces messages est décrit dans la politique de confidentialité.",
      ],
      paragraphsEn: [
        "The site has no form: you write to us by email. You agree to send only accurate information, and no content that is illegal, defamatory or infringes the rights of others. What we do with these messages is described in the privacy policy.",
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
        "GemmaS peut modifier les présentes conditions à tout moment. Les modifications prennent effet dès leur publication sur cette page, dont la date de dernière mise à jour figure en haut.",
      ],
      paragraphsEn: [
        "GemmaS may modify these terms at any time. Changes take effect as soon as they are published on this page, whose last update date is shown at the top.",
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
            "\nLes présentes conditions et l'utilisation du site sont régies par le droit béninois et par le droit des affaires de l'OHADA. Pour les prestations réalisées pour des clients étrangers (notamment au Canada, en France, en Belgique ou en Suisse), le même droit s'applique, sauf stipulation contraire du contrat écrit conclu entre GemmaS et son client.",
          valueEn:
            "\nThese terms and the use of the site are governed by Beninese law and OHADA business law. For services provided to clients abroad (in particular in Canada, France, Belgium or Switzerland), the same law applies, unless the written contract between GemmaS and its client provides otherwise.",
        },
        {
          label: "Procédure de règlement amiable",
          labelEn: "Amicable settlement procedure",
          value:
            "\nEn cas de différend sur l'interprétation, la validité ou l'exécution des présentes conditions ou des services fournis par GemmaS, les parties cherchent d'abord une solution amiable, de bonne foi.\n\nToute réclamation est adressée par écrit à gemmas.pro@gmail.com. À compter de sa réception, les parties disposent de trente (30) jours calendaires pour négocier.",
          valueEn:
            "\nIn the event of a dispute about the interpretation, validity or performance of these terms or of the services provided by GemmaS, the parties first seek an amicable solution, in good faith.\n\nAny claim is sent in writing to gemmas.pro@gmail.com. From its receipt, the parties have thirty (30) calendar days to negotiate.",
        },
        {
          label: "Juridiction compétente et arbitrage",
          labelEn: "Competent jurisdiction and arbitration",
          value:
            "\nÀ défaut d'accord amiable dans ce délai :\n\n- Entre professionnels : tout litige relève de la compétence exclusive des tribunaux de Cotonou, République du Bénin, ville où l'équipe de GemmaS exerce son activité.\n\n- Litiges internationaux : pour les contrats transfrontaliers, les parties peuvent convenir de soumettre le litige à un arbitrage définitif, selon le règlement du Centre d'Arbitrage, de Médiation et de Conciliation (CAMeC) de la Chambre de Commerce et d'Industrie du Bénin ou de la Cour Commune de Justice et d'Arbitrage (CCJA) de l'OHADA. La sentence arbitrale est définitive et s'impose aux parties.\n\n- Si vous agissez en tant que consommateur, ces clauses ne vous privent pas de la protection des règles impératives de votre pays de résidence, ni de la possibilité de saisir le tribunal que ces règles désignent.",
          valueEn:
            "\nFailing an amicable agreement within that period:\n\n- Between businesses: any dispute falls under the exclusive jurisdiction of the courts of Cotonou, Republic of Benin, the city where the GemmaS team carries out its work.\n\n- International disputes: for cross-border contracts, the parties may agree to submit the dispute to binding arbitration under the rules of the Center for Arbitration, Mediation and Conciliation (CAMeC) of the Benin Chamber of Commerce and Industry or of the OHADA Common Court of Justice and Arbitration (CCJA). The arbitral award is final and binding on the parties.\n\n- If you act as a consumer, these clauses do not deprive you of the protection of the mandatory rules of your country of residence, nor of the right to bring a claim before the court those rules designate.",
        },
        {
          label: "Protection des données personnelles",
          labelEn: "Personal data protection",
          value:
            "\nLe site ne collecte aucune donnée personnelle. Les emails que vous nous adressez ne servent qu'à vous répondre, dans les conditions décrites par la politique de confidentialité. Nous ne vous adressons aucun message commercial non sollicité, et les règles impératives de votre pays de résidence (notamment le RGPD, la Loi 25 au Québec et la loi canadienne anti-pourriel) restent applicables.",
          valueEn:
            "\nThe site collects no personal data. The emails you send us are only used to answer you, under the conditions set out in the privacy policy. We send you no unsolicited commercial messages, and the mandatory rules of your country of residence (in particular the GDPR, Quebec's Law 25 and Canada's Anti-Spam Legislation) remain applicable.",
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

# AMELIORATIONS.md, Journal Vivant · Site Zara Labs

> **INSTRUCTION** : Lire ce fichier AVANT de coder dans toute nouvelle session.
> Mettre à jour APRÈS chaque tâche accomplie.

```
Projet         : Site Zara Labs
Mainteneur     : AMOUSSOU Siméon Céphas
Journal ouvert : 2026-06-23
```

---

## Format d'une Entrée

```markdown
### [YYYY-MM-DD] · [Titre court]

**Contexte** :
**Ce qui a été fait** :
**Erreurs / pièges** :
**Solution appliquée** :
**Leçon retenue** :
**Fichiers** :
```

---

## Entrées

### [2026-08-17] · Centralisation du contenu dans `src/data/`

**Contexte** : deux composants activement rendus définissaient encore leurs données en dur dans le fichier composant (`PolesExcellence.tsx`, `GamifiedHowItWorks.tsx`), et un second pattern de centralisation coexistait en parallèle de `src/data/` : données co-localisées dans `src/components/{team,projects,values}/{data,types}.ts`. Décision : un seul centre de données pour tout le site.

**Ce qui a été fait** :
- `src/data/polesExcellence.ts` créé (type `PoleExcellence`, `Accent`, tableau `polesExcellence`) ; `PolesExcellence.tsx` importe désormais ce tableau, ne garde localement que les tables de classes Tailwind (`accentGlow`/`accentBorder`, présentation, pas contenu).
- `src/data/gamifiedHowItWorks.ts` créé (type `Step`, tableau `steps`) ; `GamifiedHowItWorks.tsx` importe depuis ce fichier.
- Fusion des 3 paires `types.ts` + `data.ts` co-localisées en fichiers uniques dans `src/data/` : `team.ts`, `projects.ts`, `values.ts`. Les 6 anciens fichiers (`src/components/{team,projects,values}/{data,types}.ts`) supprimés après migration de tous les imports (`TeamSection`, `TeamMemberCard`, `RecentProjects`, `ProjectCard`, `Values`, `ValueCard`).
- Composants désactivés dans `app/page.tsx` (`About.tsx`, `Services.tsx`, `HowItWorks.tsx`) volontairement exclus de la centralisation (pas de valeur à traiter du contenu non affiché) : `About.tsx` duplique encore `team.ts` en dur, à corriger si le composant est un jour réactivé.
- Système i18n (`LanguageContext.tsx` / `t()`) non touché, restait hors périmètre par décision explicite.

**Pièges** :
- `src/data/poles.ts` exporte déjà un type `Pole` (pôles commerciaux Tech/IA/Studio) sans rapport avec les pôles techniques de `PolesExcellence.tsx` (web/mobile/IA) : le nouveau type a été appelé `PoleExcellence` pour éviter toute confusion/collision.
- Les 3 items de `steps` dans `gamifiedHowItWorks.ts` partagent le même texte `content` ("Analyse approfondie de vos enjeux…") : placeholder pré-existant, pas une erreur introduite ici. À signaler côté copywriting.
- L'outil `rm` du shell est aliasé (`exec_scmb_expand_args`) et échoue silencieusement (exit 127) dans ce contexte non interactif ; utiliser `/usr/bin/rm` directement pour supprimer des fichiers en session agent.

**Solution appliquée** : voir "Ce qui a été fait".

**Leçon retenue** : avant toute nouvelle section avec données répétées (icônes, titres, images), créer directement le fichier dans `src/data/` plutôt qu'un tableau local dans le composant — évite la resynchronisation a posteriori faite ici.

**Fichiers** : `src/data/{polesExcellence,gamifiedHowItWorks,team,projects,values}.ts` (créés), `src/components/sections/{PolesExcellence,GamifiedHowItWorks,RecentProjects,Values}.tsx`, `src/components/team/{TeamSection,TeamMemberCard}.tsx`, `src/components/projects/ProjectCard.tsx`, `src/components/values/ValueCard.tsx` (imports mis à jour), `src/components/{team,projects,values}/{data,types}.ts` (supprimés).

**Complément même jour** : ajout du support i18n sur `PoleExcellence` (`titleEn`/`descriptionEn`, même pattern que `poles.ts`). `PolesExcellence.tsx` passé en `"use client"` et branché sur `useLang()` (comme `Poles.tsx`) pour choisir FR/EN. Le `<h2>` "Nos pôles d'excellence" reste en dur en FR pour l'instant (pas encore passé par `t()`), à traiter si besoin plus tard.

Même traitement appliqué à `ValueItem` (`titleEn`) : résolution FR/EN faite directement dans `ValueCard.tsx` (passé en `"use client"` + `useLang()`). Le `<h2>` "L'exigence de la performance" dans `Values.tsx` reste en dur en FR, même remarque que pour `PolesExcellence`.

**Piège** : passer `ValueCard` en `"use client"` sans faire pareil pour son parent `Values.tsx` casse au runtime → "Only plain objects can be passed to Client Components from Server Components", car `Values.tsx` (resté composant serveur) passait `value` (contenant `icon: LucideIcon`, une référence de composant) en prop à travers la frontière serveur/client. Un composant React n'est pas sérialisable à travers cette frontière. Solution : `Values.tsx` passé en `"use client"` lui aussi, comme `PolesExcellence.tsx`. **Leçon** : dès qu'un composant enfant qui reçoit un item de données avec un champ `icon`/composant devient client, vérifier que tous ses parents jusqu'à la racine du composant serveur le sont aussi (ou déplacer le hook plus haut).

---

### [2026-08-17] · Balayage i18n complet, texte en dur → `t()` / champs `*En`

**Contexte** : suite à la centralisation, plusieurs textes visibles restaient en dur en français uniquement (jamais passés par `t()`/`LanguageContext`, ou par un champ `*En` dans `src/data/`), repérés au fil de la session (`ThemeToggle`, `TeamSection`, `TeamMemberCard`, `RecentProjects`, `Values`, `PolesExcellence`, `app/not-found.tsx`, `GamifiedHowItWorks`). Décision : balayage complet plutôt que correctifs isolés.

**Ce qui a été fait** :
- Nouvelles clés FR/EN dans `LanguageContext.tsx` : `theme.toLight/toDark`, `team.title/intro/hint`, `teamCard.portfolio`, `recentProjects.title/cta`, `values.title`, `polesExcellence.title`, `notFound.title/cta`, `workflow.title`.
- `ThemeToggle.tsx`, `TeamSection.tsx`, `TeamMemberCard.tsx`, `Values.tsx`, `PolesExcellence.tsx`, `GamifiedHowItWorks.tsx` (heading uniquement) : textes routés via `useLang().t(...)`.
- `RecentProjects.tsx` : les props `title`/`ctaLabel` n'ont plus de valeur par défaut française en dur ; résolues via `title ?? t("recentProjects.title")` (même logique pour `ctaLabel`), pour rester overridable si un jour la section est appelée avec des props explicites.
- `app/not-found.tsx` : passé en `"use client"` (rendu à l'intérieur de `<Providers><LanguageProvider>`, donc `useLang()` y fonctionne) pour router titre + lien retour.
- `src/data/gamifiedHowItWorks.ts` : `Step` gagne `titleEn`/`contentEn`, même pattern que `PoleExcellence`/`ValueItem`. `StepItem` (dans `GamifiedHowItWorks.tsx`) résout via `useLang()`.
- Aria-label dynamique `Voir le profil de ${member.name}` (TeamSection) : résolu par `lang === "en" ? ... : ...` directement dans le composant plutôt que par une clé `t()`, car le dictionnaire ne supporte pas l'interpolation.

**Volontairement laissé de côté** :
- `Folder.tsx` (aria-label "Fermer/Ouvrir le dossier") : seul consommateur est `About.tsx`, désactivé dans `app/page.tsx` → cohérent avec la décision antérieure d'ignorer les composants inactifs.
- `app/layout.tsx` (metadata `title`/`description`) : l'API `Metadata` de Next tourne côté serveur avant tout hook client, `useLang()` n'y est pas utilisable tel quel ; nécessiterait un mécanisme de détection de langue côté serveur (cookie/header), hors périmètre de ce balayage.
- `member.role` dans `src/data/team.ts` (ex. "CSO · Commercial & Clients") : texte éditorial en dur non signalé dans cette passe, candidat pour un futur `roleEn` sur le modèle `PoleExcellence`/`ValueItem` si besoin.
- `ProjectPagination.tsx` : aria-label déjà jugé acceptable dans l'audit (embarque `project.name`, un nom propre), pas retouché.

**Type-check** : `npx tsc --noEmit` exit 0 après chaque étape.

**Fichiers** : `src/contexts/LanguageContext.tsx`, `src/components/{ThemeToggle,team/TeamSection,team/TeamMemberCard,sections/RecentProjects,sections/Values,sections/PolesExcellence,sections/GamifiedHowItWorks}.tsx`, `app/not-found.tsx`, `src/data/gamifiedHowItWorks.ts`.

---

### [2026-08-24] · Copywriting Hero : recadrage positionnement « studio, double modèle »

**Contexte** : `hero.title` (« Human Brilliance Worths everything ») était de l'anglais cassé et un doublon dégradé du vrai tagline de la section HumanBrilliance, sans rapport avec l'offre. Passage par le skill `copywriting-master` (questionnaire de découverte) : Céphas précise que GemmaS n'est pas une simple agence mais un **studio de développement logiciel à double modèle** (prestations clients + produits propres développés en parallèle), info absente de la doc jusqu'ici.

**Ce qui a été fait** : `hero.title`/`hero.pitch` réécrits en FR/EN dans `LanguageContext.tsx` autour de ce positionnement (variante retenue : « Studio de développement logiciel. Vos projets, et les nôtres, avec la même exigence. »). `hero.cta` inchangé.

**Point de vigilance signalé, pas corrigé** : le nouveau titre est nettement plus long (~85 caractères vs ~34) que l'ancien. Le H1 du Hero (`text-[clamp(2.5rem,5vw,4rem)]`, conteneur `max-w-[53rem]`) est dimensionné pour un titre court sur 1-2 lignes ; à vérifier visuellement (`npm run dev`), un ajustement de taille de police ou une reformulation plus courte pourrait être nécessaire si le rendu est trop lourd.

**Leçon retenue** : le positionnement du client (catégorie, différenciateurs) peut évoluer au fil des sessions et ne pas être capté par CLAUDE.md/le code existant — toujours faire confirmer le positionnement en amont de toute copy plutôt que de le déduire uniquement du contenu déjà en place.

**Fichiers** : `src/contexts/LanguageContext.tsx`.

---

### [2026-08-24] · Copywriting steps GamifiedHowItWorks

**Contexte** : les 3 étapes (`src/data/gamifiedHowItWorks.ts`) avaient le même texte placeholder (« Analyse approfondie de vos enjeux... ») sur les 3, repéré lors du balayage i18n de la session précédente et volontairement laissé en l'état à l'époque (pas de copy à inventer hors du cadre du skill copywriting).

**Ce qui a été fait** : `content`/`contentEn` individualisés par étape (titres `title`/`titleEn` inchangés, déjà corrects). La dernière étape (Déploiement & Suivi) répond explicitement à la douleur client identifiée pendant le questionnaire Hero (« site livré et abandonné »).

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `src/data/gamifiedHowItWorks.ts`.

---

### [2026-08-24] · Copywriting TeamSection (titre + intro)

**Contexte** : `team.title` valait littéralement « GemmaS : Team » dans le dictionnaire FR (jamais traduit, résidu repéré lors du balayage i18n). `team.intro` s'appuyait sur du jargon générique (« compétences synergiques et complémentaires », « produits numériques d'exception ») sans lien avec le positionnement studio/double-modèle établi pour le Hero.

**Ce qui a été fait** : titre remplacé par « Cinq fondateurs. Un seul studio. » (reprend le rythme « X. Y. » déjà utilisé pour `poles.title`). Intro réécrite en s'appuyant sur les rôles déjà publiés dans `team.ts` (stratégie/tech-IA/business/opérations) plutôt que sur du superlatif vague, et relie explicitement à la promesse « même exigence » posée dans `hero.title`.

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `src/contexts/LanguageContext.tsx`.

---

### [2026-08-24] · Copywriting FAQ : cohérence du positionnement studio

**Contexte** : en revoyant la FAQ après le Hero/TeamSection, la question `« Êtes-vous une agence ou un studio ? »` répondait encore avec l'ancien positionnement (jamais le mot « studio », aucune mention du double modèle) — contradiction directe avec `hero.title`/`team.intro` fraîchement réécrits. Repéré en auditant `src/data/faq.ts` en entier, pas seulement la question ciblée.

**Ce qui a été fait** : réponse FR/EN réécrite pour affirmer explicitement le studio + double modèle. Premier jet appuyé sur l'équipe (5 co-fondateurs, Cotonou) ; Céphas a demandé de recentrer sur les produits propres plutôt que la composition de l'équipe, avec e-freeshop.com en exemple. Vérifié via WebFetch (pas d'invention) : e-freeshop.com est une vraie marketplace GemmaS de composants/templates digitaux pour créateurs africains, paiement Mobile Money natif (MTN, Moov, Wave, Orange, Celtiis), créateurs gardent 95 % des revenus. Réponse finale cite ce produit concret et vérifiable au lieu de la taille de l'équipe.

**Leçon retenue** : après tout changement de positionnement, relire la FAQ en entier — c'est l'endroit où les anciennes formulations survivent le plus souvent sans qu'on y pense, puisqu'elle n'est pas structurée par section comme le reste du site. Autre leçon : une preuve produit concrète et vérifiable (nom de produit, URL) est un argument plus fort qu'un fait sur l'équipe (taille, localisation) — toujours demander s'il existe un produit/projet nommable avant de se rabattre sur des faits d'équipe.

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `src/data/faq.ts`.

---

### [2026-08-24] · RecentProjects : ajout e-freeshop.com en featured

**Contexte** : suite à la découverte d'e-freeshop.com, Céphas a confirmé vouloir l'ajouter au portfolio (`src/data/projects.ts`), qui ne contenait jusqu'ici que des placeholders picsum avec `href="#"` (Finn7, Hindsloop x3, « en attendant les vraies réalisations »).

**Ce qui a été fait** : nouvelle entrée `e-freeshop` insérée en tête de `defaultProjects` (donc en featured, `RecentProjects.tsx` prend `projects[0]` comme featured par défaut). `href` réel (`https://e-freeshop.com`), `image` d'abord posée en placeholder picsum puis remplacée par la vraie capture fournie par Céphas : `public/images/projects/e-freeshop.com.png` (1367×772, déjà proche du ratio 16:9 de la carte featured).

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `src/data/projects.ts`.

---

### [2026-08-24] · Pages légales (mentions, confidentialité, sitemap) + fix ancres cross-route

**Contexte** : demande de corriger les liens du site. `Footer.tsx` avait son propre `LEGAL_KEYS` (Mentions légales/Confidentialité/Sitemap) en `href="#"`, aucune des 3 pages n'existait dans `app/`. `src/data/site.ts` a un array `legal` équivalent mais **jamais importé nulle part** (mort, `Footer.tsx` maintient sa propre liste locale).

**Découverte en creusant** : `Navbar.tsx`/`Footer.tsx` utilisent des ancres nues (`href="#services"`) qui ne fonctionnent que si on est déjà sur `/` — cassé sur toute autre route (`/team-test`, `/not-found`, et désormais mes 3 nouvelles pages). Préfixées par `/` (`/#services`) pour fonctionner depuis n'importe quelle route.

**Découverte plus large, signalée mais PAS corrigée** (hors périmètre de cette tâche, décision produit à trancher par Céphas) : Navbar/Footer pointent vers `#services`, `#how`, `#about`, `#poles`, `#impact` — des ids qui appartiennent à `Services.tsx`/`HowItWorks.tsx`/`About.tsx`/`Poles.tsx`/`Impact.tsx`, **tous désactivés** dans `app/page.tsx` (remplacés par `PolesExcellence`, `GamifiedHowItWorks`, `TeamSection`, etc., cf. commentaire dans `page.tsx` : "le temps du rebrand GemmaS"). Concrètement, plusieurs liens de nav/footer ne mènent nulle part sur la home actuelle. Le préfixe `/` corrige le bug "ne marche pas hors de `/`", pas ce décalage de fond.

**Ce qui a été fait** :
- `app/sitemap/page.tsx` : liste les sections réellement montées (`app/page.tsx`), avec ancre seulement pour celles qui en ont une (`Manifesto`/`GamifiedHowItWorks` n'ont aucun `id` sur leur `<section>`, listées en texte simple plutôt qu'en lien mort).
- `app/mentions-legales/page.tsx` : structure standard (éditeur, directeur de publication, hébergement, propriété intellectuelle, contact). Champs à valeur légale réelle (forme juridique, RCCM, IFU, hébergeur, directeur de publication) marqués `[À COMPLÉTER]` plutôt qu'inventés — une mention légale fausse est un risque, pas juste une mauvaise copy.
- `app/politique-confidentialite/page.tsx` : contenu vérifié dans le code plutôt que générique. Formulaire Contact confirmé non connecté à un backend (`setTimeout` simulé, cf. TODO historique). Aucun traceur tiers trouvé (grep GA/Plausible/PostHog/etc. : rien). Cookies décrits honnêtement : uniquement `localStorage` fonctionnel (langue, thème, consentement bandeau), pas de cookie traceur. Ancre `#cookies` pour le lien du `CookieBanner`.
- `CookieBanner.tsx` : lien "cookies" pointait vers `#cookies`, une ancre qui n'a jamais existé nulle part sur le site → pointe maintenant vers `/politique-confidentialite#cookies`.
- `Footer.tsx` `LEGAL_KEYS` → les 3 nouvelles routes.
- `ProjectCard.tsx` (fait juste avant dans la session) : lien featured passé en `target="_blank" rel="noopener noreferrer"`.

**Recherché mais non trouvé** : Finn7 et les 3 Hindsloop (`src/data/projects.ts`) restent des projets de démo sans existence en ligne trouvée (recherche web infructueuse) → `href="#"` conservé, pas d'invention d'URL.

**Leçon retenue** : sur un site qui n'est pas mono-page pure (plusieurs routes `app/*`), toute ancre `#id` dans un composant monté globalement (Navbar/Footer) doit être préfixée par le chemin de la page qui contient réellement cet id, sinon elle ne marche que "par coïncidence" tant qu'on reste sur `/`.

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `app/{sitemap,mentions-legales,politique-confidentialite}/page.tsx` (créés), `src/components/{Navbar,Footer,CookieBanner,projects/ProjectCard}.tsx`.

---

### [2026-08-24] · Recâblage des liens footer vers les vraies sections + réactivation d'Impact

**Contexte** : suite de la tâche précédente. Céphas a demandé de corriger 5 liens footer précis (How it works / Our areas / Impact / The team / Manifesto), confirmant qu'il fallait bien recâbler vers les sections réellement montées plutôt que laisser pointer vers du contenu désactivé.

**Ce qui a été fait** :
- `id="how"` ajouté sur la `<section>` de `GamifiedHowItWorks.tsx` (n'en avait aucun).
- `id="manifesto"` ajouté sur la `<section>` de `Manifesto.tsx` (idem).
- `Footer.tsx` : `footer.link.poles` → `/#poles-excellence` (au lieu de `/#poles`, id de l'ancien `Poles.tsx` désactivé), `footer.link.team` → `/#team` (au lieu de `/#about`, id de l'ancien `About.tsx` désactivé). `footer.link.how`/`footer.link.manifesto` gardaient déjà le bon href, il manquait juste l'id côté section.
- `Impact` (stats/secteurs) n'avait aucun équivalent monté → question posée à Céphas plutôt que de deviner ; réponse : réactiver la section. `Impact.tsx` avait déjà `id="impact"` et son propre `t()`, aucune modification du composant nécessaire. Montée dans `app/page.tsx` entre `Values` et `RecentProjects`.

**Reste non traité, signalé la fois précédente** : `nav.services`/`footer.link.web/mobile/custom/aiAuto` (colonne "Services") pointent toujours vers `/#services`, qui n'existe pas sur la home actuelle (`Services.tsx` désactivé) — même décision à prendre que pour Impact, pas demandé cette fois.

**Type-check** : `npx tsc --noEmit` exit 0.

**Fichiers** : `src/components/sections/{GamifiedHowItWorks,Manifesto}.tsx`, `src/components/Footer.tsx`, `app/page.tsx`.

**Complément même jour** : mêmes liens `nav.about`/`nav.poles` dans `Navbar.tsx` (dupliqués de la logique du footer, cf. audit initial "Navbar rebuilds its own local links array") → `/#team` et `/#poles-excellence`. `nav.services` laissé en `/#services`, même décision que la colonne footer Services, non traitée cette fois.

**Fichiers (complément)** : `src/components/Navbar.tsx`.

---

### [2026-08-04] · Intégration branche `gaby` + travaux `main` (MarthEly514)

**Contexte** : le travail local de Céphas (Hero GemmaS, Workflow, portfolio, TeamGemmaS…) n'était plus d'actualité. Objectif : repartir des contributions de Gaby (branche `gaby`, 7 commits) et de MarthEly514 (`main`, commits `94c1fb4` + `f9ac39c`).

**Ce qui a été fait** :
- Travail local (14 fichiers modifiés + 11 non suivis) mis en sécurité : `git stash push -u -m "sauvegarde local Cephas avant recup gaby+main (2026-08-04)"`. Rien supprimé.
- `main` fast-forward vers `f9ac39c`, puis merge de `origin/gaby`.
- Apports de gaby : `sections/{PolesExcellence,Values,RecentProjects}`, dossiers `team/`, `projects/`, `values/`, assets `public/shapes/`, grille `.recent-projects-grid` dans `globals.css`, pages de test `/poles-test`, `/team-test`, `/glass-test`.
- Apports de main : `sections/GamifiedHowItWorks`, `ui/{BgNeon,G_Logo,GlassPOC}`.
- Remote mis à jour : le repo GitHub a été renommé `zara-labs-site` → `GemmaS`.

**Pièges** :
- Conflit unique sur `app/page.tsx`, mais **structurel** et non textuel : gaby avait commenté Services/About/Impact et remplacé `Poles` par `PolesExcellence`, pendant que main ajoutait `GamifiedHowItWorks`. Résolu par l'intention (structure de gaby + composant de main placé après `Manifesto`), jamais par `--ours`/`--theirs`.
- `src/index.css` n'existe plus : supprimé par gaby (commit `2838ceb`). C'était un reliquat Vite mort, aucun import côté code. **La source de vérité des tokens est désormais `app/globals.css`** · les docs `skills_MD/*.md` et `CLAUDE.md` pointent encore sur l'ancien chemin, à corriger.
- Fichiers parasites commités à la racine par gaby : `background.svg`, `big.png`, `green-blue-gradient.svg`, `translucide-g.svg` (doublons de `public/shapes/`). `public/shapes/p.png` pèse 9 Mo, à convertir en WebP/AVIF avant mise en prod (LCP).

**Type-check** : `npx tsc --noEmit` exit 0, aucune erreur.

**Fichiers** : `app/page.tsx` (résolution), merge `d86255e` poussé sur `origin/main`.

---

### [2026-06-26] · Migration Zara Labs → GemmaS (rebrand complet)

**Contexte** : Céphas a réutilisé la base Zara Labs pour son agence réelle, GemmaS (Cotonou, 5 co-fondateurs : Prudence CEO, Enock CTO, Siméon CMO, Duvalier CSO, Gaby COO). Migration sans toucher à la structure du site, uniquement contenu + charte + équipe.

**Sources** : `GemmaSinformation/gemmas-portfolio.pdf` (architecture du site), `Roles_5_Fondateurs_Drive.docx.pdf` (équipe), `20_03_2026.docx` (PV), avatars dans `Founders/`. Documents lus, `gemmas_proposition_partenariat.pdf` et `tp_cycle_de_vie...pdf` ignorés à la demande.

**Ce qui a été fait** :
- **Charte** : tokens HSL bleu+orange → bleu marque (220 33% 46%), vert (122 39% 49%), ambre (45 100% 51%). `--brand-orange` conservé en alias pour ne pas casser les refs. `tailwind.config.ts` ajoute `brand.green` et `brand.amber`.
- **Logo** : `Logo.tsx` réécrit avec le SVG monogramme G GemmaS (anneau bleu, barre verte, deux points ambre). Wordmark "GemmaS" en simple ligne au lieu de "Zara"/"Labs" empilés. Favicon remplacé.
- **Wordmark footer** : `TorchWordmark text="GemmaS"`.
- **Contenus data** : `site.ts`, `services.ts`, `poles.ts`, `faq.ts` réécrits pour l'offre GemmaS (sites en 5j, applis mobiles, sur mesure, IA, portfolios). Stats : 5j délai, 5 fondateurs, 100% Cotonou, 0 bug toléré.
- **Sections** : Hero (tagline, pitch, mailto, Strands palette GemmaS), About (récit + 5 fondateurs), Services (3 familles renommées), Manifesto, Poles. Aucun changement de structure.
- **Équipe** : `Folder.tsx` MAX_ITEMS 3 → 5, `Folder.css` étendue avec :nth-child(4) et (5). Éventail rééquilibré sur 5 papiers (angles -22°/-10°/0°/10°/22°). Avatars `public/founders/` mappés sur les 5 co-fondateurs.
- **Shimmer** : `src/components/ui/Shimmer.tsx` + keyframes `shimmer-sweep` dans globals.css. Sobre, balayage diagonal blanc translucide, `prefers-reduced-motion` géré. Prêt à poser sur les zones encore vides quand besoin.
- **Divers** : `gemmas-lang` storage key, `gemmas-cookies-accepted`, commentaires Strands/Aurora/GlassIconButton rafraîchis.

**Pièges** :
- `Folder.css` hardcodait `:nth-child(1..3)`. Bumper `MAX_ITEMS` sans étendre la CSS aurait fait que les papiers 4 et 5 restent empilés au centre, invisibles. Solution : ajout des positions CSS pour 4 et 5, élargissement de l'éventail.
- Le PV nomme "Enock" alors que l'avatar s'appelle "Marth". Marth = Marthelly = surnom d'Enock (confirmé par Céphas).
- Aucun tiret cadratin `—` toléré : tous les commentaires retouchés utilisent `·`.

**Type-check** : `npx tsc --noEmit` exit 0, aucune erreur.

**Fichiers** : `app/{layout,globals.css}`, `tailwind.config.ts`, `src/index.css`, `src/data/{site,services,poles,faq}.ts`, `src/contexts/LanguageContext.tsx`, `src/components/{Logo,Footer,CookieBanner,Folder,Folder.css}.tsx?`, `src/components/sections/{Hero,About,Services,Manifesto,Poles}.tsx`, `src/components/backgrounds/{Strands,Aurora}.tsx`, `src/components/ui/{GlassIconButton,Shimmer}.tsx`, `public/{favicon.svg,logo-gemmas.svg,logo-gemmas-dark.svg,wordmark-gemmas.svg,founders/*}`.

---

### [2026-06-24] · Pass mobile-first (patterns Amoussouportfolio)

**Contexte** : Céphas a constaté que le mobile n'était pas vraiment opérationnel sur certaines sections. Il m'a demandé de m'inspirer de Amoussouportfolio (E:\\Amoussouportfolio) pour les conventions mobile-first.

**Patterns repris du portfolio** :
- `min-h-[100dvh]` au lieu de `100vh` (déjà en place dans Hero).
- Padding fluide mobile-first systématique : `px-4 sm:px-6 lg:px-10` (déjà standardisé dans `Container.tsx`).
- `clamp(min, vw, max)` pour typo : min adapté au plus petit écran (`1.75rem`/`2rem`), pas `text-[7.5vw]` qui peut donner 14px sur un 360px.
- Scale CSS sur composants 3D/canvas qui ne savent pas se redimensionner par prop (Folder, Carousel) : `origin-center scale-[0.65] sm:scale-90 md:scale-100`.
- Layouts qui changent de topologie au breakpoint : `absolute bottom-right` desktop ↔ flux normal mobile, via `md:absolute md:bottom-0 md:right-0` (Hero).

**Ce qui a été fait** :
- **Hero** : refonte mobile-first. Sur mobile, plus de `pt-[42vh]` + abs bottom-right qui collisionnaient avec le titre. Le titre vit en haut avec `pt-[18vh]`, le pitch+CTA viennent en flot normal en-dessous. À `md+`, retour exact à la compo micro1 (titre 42vh, pitch+CTA flottants en bas à droite). H1 passe de `text-[7.5vw]` (illisible <380px) à `clamp(2rem,8.5vw,3rem)` mobile / `clamp(2.5rem,5vw,4rem)` desktop. CTA reçoit `min-h-11` (tap target 44px iOS).
- **About** : le `Folder` (taille 3 ≈ 480px) débordait en `<sm`. Wrapper `origin-center scale-[0.65] sm:scale-90 md:scale-100` + height responsive `h-[320px] sm:h-[420px]`.
- **Services + HowItWorks (mobile stack)** : alignement du rythme sur le reste (`px-4 py-20 sm:px-6 sm:py-28` au lieu de `px-[5%] py-20`), titres `clamp(1.75rem,7vw,2.5rem)` (min plus petit), gap items `gap-10 sm:gap-12`.
- Reste cohérent avec ce qui était déjà mobile-first : Container, Footer, Navbar (drawer plein écran), AnnouncementBar, Impact (marquee), Poles (clamp + grid responsive), Manifesto (clamp).

**Leçon retenue** :
- **`text-[Xvw]` pur est un anti-pattern mobile-first** : sur 360px, 7.5vw = 27px (lisible) mais 4vw = 14px (illisible). Toujours `clamp(min, vw, max)`.
- **Changer la topologie au breakpoint > redimensionner**. Sur Hero, passer de "absolute bottom-right" à "flot normal" est bien plus lisible que de bidouiller la taille du bloc absolu.
- **Scale CSS pour composants 3D / interactifs hardcodés** : c'est le moins invasif, pas besoin de prop-driller un breakpoint dans le composant tiers.
- **Conventions Amoussouportfolio à garder** : `clamp` typo, `dvh` height, `Container` avec `px-4 sm:px-6 lg:px-10`, padding sections `py-20 sm:py-28 lg:py-36`, `min-h-11` tap targets.

**Fichiers** : `src/components/sections/Hero.tsx`, `About.tsx`, `Services.tsx`, `HowItWorks.tsx`.

---

### [2026-06-24] · HowItWorks/Manifesto · fix Silk qui disparaît + perf globale + Lenis lerp

**Contexte** : Sur le scroll, le fond Silk de Manifesto et de HowItWorks « disparaissait parfois ». En plus, le site était globalement lourd au scroll. Céphas voulait un feel proche de lenis.dev. Et il voulait virer le grain *au-dessus des images* du HowItWorks ainsi que les numéros/labels gravés sur ces images.

**Ce qui a été fait** :
- **Numéros + labels supprimés** des cartes images de HowItWorks (desktop + mobile). Les images parlent d'elles-mêmes, le numéro/label restent dans la liste à gauche (desktop) et sous la card (mobile).
- **Grain global supprimé** dans HowItWorks (la version Manifesto reste, c'était sa signature). Le grain z:[3] couvrait aussi les images → texture parasite.
- **Bug du fond qui disparaît résolu** : la cause était le pattern `inView && <Silk />` qui *démontait* le canvas WebGL à la sortie du viewport puis le *remontait* à l'entrée. Recompiler le shader + faire la 1re frame prend 1-3 frames → flash visible.
  - `useInViewport` reçoit une option `once: true` (mount-one-shot, IO déconnecté après 1er hit).
  - `Silk` accepte un prop `paused` : on garde le canvas vivant mais on n'avance plus `uTime` quand la section est hors viewport. Zéro travail GPU utile, zéro flash.
  - HowItWorks et Manifesto combinent les deux : `once` pour décider quand monter Silk la 1re fois (rootMargin 400px), `paused={!visible}` (rootMargin 0px) pour figer l'animation quand on n'est plus dessus.
  - DPR de Silk passé de `[1, 1.5]` à `1` : le shader est volontairement flou (sin + noise), rendre au-delà du logical pixel ne se voit pas et coûte 2-4× plus cher.
- **Code-splitting agressif** : `Manifesto` et `HowItWorks` lazy-loadés via `React.lazy()` + `Suspense` (skeleton bg `#3a3540` pour éviter le CLS). Nouveau chunk `three-vendor` (three + @react-three/fiber, 217 KB gz) sorti de l'initial bundle. Initial path ramené à index 68 + react-vendor 53 + motion-vendor 79 = **200 KB gz** avant tout JS d'animation lourd.
- **Lenis en mode `lerp: 0.1`** au lieu de `duration + easing` : c'est la config exacte de lenis.dev, donne le trail typique et un ressenti indépendant de la vitesse du wheel. `syncTouch: false` (sur mobile on reste sur scroll natif via `pointer:coarse`).

**Erreurs / pièges** :
- Tenter de partager le même ref entre deux instances de `useInViewport` : la 2e instance s'attendait à `ref.current` mais perdait l'élément. → Pattern ref-callback qui assigne aux deux refs en mount.
- Silk avec `frameloop="demand"` + `invalidate()` : marche mais plus complexe. La version `useFrame` qui `return` tôt si `paused` est suffisante et garde la même frame visible.

**Leçon retenue** :
- **Ne JAMAIS démonter un canvas WebGL au scroll**. Toujours pause-via-prop. Démonter coûte la recompilation du shader + l'allocation de buffers, c'est la garantie d'un flash visible.
- **Lazy-load les sections WebGL** : ce sont les chunks les plus gros et l'utilisateur n'en a pas besoin pour le LCP. Combo `lazy()` + `manualChunks` met three.js hors du chemin critique.
- **`lerp` > `duration+easing` sur Lenis** quand on veut le ressenti lenis.dev. Le duration force une courbe ; le lerp suit la vitesse de la roue, c'est plus naturel.
- **Slugifier les imports d'images** : déjà noté hier, confirmé aujourd'hui en branchant les WebP.

**Fichiers** : `src/hooks/useInViewport.ts`, `src/hooks/useLenis.ts`, `src/components/backgrounds/Silk.tsx`, `src/components/sections/HowItWorks.tsx`, `src/components/sections/Manifesto.tsx`, `src/pages/Index.tsx`, `vite.config.ts`.

---

### [2026-06-24] · HowItWorks · visuels réels (WebP optimisés)

**Contexte** : Les 5 cartes de la section « Comment ça marche ? » étaient des dégradés génériques. Céphas a déposé 5 JPG métier dans `src/commentcamarche/`.

**Ce qui a été fait** :
- Conversion sharp → WebP : `width: 1600`, `quality: 80`, `effort: 6`. Gain massif (1.4–2.1 MB → 33–103 KB, ratio ~95 %).
- Renommage en slugs ASCII sûrs (`itéraption…` / espace → `iteration-mvp.webp`, `mesure-impact.webp`, etc.) pour des imports propres.
- Import statique Vite dans `HowItWorks.tsx`, fingerprinting + lazy chunk gratuits.
- Remplacement des `bg-gradient-to-br` + radial overlay par `<img object-cover>` + voile sombre `from-black/70 … to-black/30` pour garder la lisibilité du numéro et du label en blanc.
- `loading="eager"` sur la 1re image seulement (visible au scroll-in du sticky), `lazy` sur les 4 autres + mobile.

**Leçon retenue** :
- Sharp côté Node + Vite static import = pipeline image le plus simple ici. Pas besoin de `vite-imagetools` tant qu'on n'a qu'un format/taille par image.
- Toujours slugifier les noms de fichiers : accents et espaces dans un import TS marchent souvent mais cassent au moindre changement de bundler/CI.

**Fichiers** : `src/commentcamarche/*.webp` (créés), `src/components/sections/HowItWorks.tsx`.

---

### [2026-06-23] · Scaffold complet + V1 (Hero / Pôles / Services / Impact / About / Contact)

**Contexte** : Bootstrap du site institutionnel Zara Labs depuis zéro. Charte tirée du logo (bleu indigo + orange). Inspirations : projets BDE (E:\BDE\frontend) et portfolioEHOUD (D:\portfolioEHOUD), composants Aceternity dans `My_ui_components/`, règles `skills_MD/`. React Bits Strands en background du Hero.

**Ce qui a été fait** :
- Réécriture de `CLAUDE.md` et `README.md` pour Zara Labs (client tech, 3 pôles, charte bleu+orange, stack).
- Scaffold Vite + React 18 + TS 5 + Tailwind 3. Dépendances mirroir de Ehoud (framer-motion 12, gsap 3, lenis 1, ogl, radix, RHF, zod, sonner, lucide, marquee, tanstack-query, next-themes). 162 paquets.
- Tokens HSL centralisés `src/index.css` : brand-blue/orange + deep/soft, mapping primary/accent/destructive, gradient `bg-gradient-brand`.
- Polices : Inter remplacé par **Geist** (body) + Bricolage Grotesque (display) + Geist Mono. Règle skills_MD (Inter banni).
- Easings nommés Tailwind : `ease-out-expo` et `ease-agency` (cubic-bezier signature 0.32/0.72/0/1).
- Strands React Bits (OGL) en TSX dans `src/components/backgrounds/Strands.tsx` + CSS, palette marque.
- `useLenis` avec opt-out `prefers-reduced-motion` + `pointer:coarse`. Lerp 0.08.
- Composants partagés : `Reveal` (whileInView, once, easing out-expo), `CTAButton` (button-in-button avec ArrowUpRight dans cercle orange), `Eyebrow` (kicker tracking-[0.2em]), `Container`, `Logo` (crop bg-position du PNG planche-contact), `CountUp` (RAF, easeOutCubic, tabular-nums).
- Navbar pill flottante sticky, condensation au scroll 16px, drawer plein écran mobile.
- Footer 3 colonnes sobre + barre legal.
- Hero : Strands BG, voile dégradé + vignette radiale, titre word-by-word (mask overflow-hidden + translateY), double CTA.
- Pôles : grille 4+2+2, double-bezel cards (shell `p-1.5 ring-1` + core radius interne), spotlight souris (radial-gradient piloté `onMouseMove`).
- Services : tabs avec `layoutId` (spring), filtre catégorie, grille reveal blur+y, underline animé bottom au hover.
- Impact : 4 stats CountUp, marquee secteurs en gros display avec opacité hover, manifeste long.
- About : section foreground (inversion), barre verticale `scaleY` via `useScroll`, 3 piliers.
- Contact : formulaire RHF + Zod (onBlur), chips budget rounded-md (pas pills), submit simulé + toast Sonner.
- Wire-up `App.tsx` : Lenis + Navbar + Routes + Footer + Toaster.

**Erreurs / pièges** :
- Tailwind warning "ambiguous class" sur `ease-[cubic-bezier(0.32,0.72,0,1)]` : virgules dans la valeur arbitraire perturbent le parser.
- `noUnusedLocals` ne tolère pas les `import type` non référencés.

**Solution appliquée** :
- Easings enregistrés en tokens Tailwind, puis sed sur les 4 fichiers concernés. Build clean, zéro warning. Bundle final : `index 156kB`, `motion 158kB`, `react 162kB`, `form 81kB`, CSS 25kB / 5.3kB gzip.

**Leçon retenue** :
- **Toujours nommer les easings custom dans Tailwind** au lieu de l'arbitrary value : plus court, pas de warning, refactorable en un point.
- **Geist + Bricolage Grotesque** = combo solide B2B tech, Inter trahit immédiatement.
- **Lenis opt-out sur pointer:coarse** : sur mobile, le scroll natif est meilleur que tout smooth simulé.
- Le pattern **button-in-button** (pill + cercle interne avec icône) est trop signature pour s'en passer sur les CTA.
- Logo planche-contact : crop via `background-position` + `background-size: 380%` pour n'afficher qu'une variante. Provisoire jusqu'à un SVG isolé.

**Fichiers produits** :
- Docs : `CLAUDE.md`, `README.md`, `skills_MD/AMELIORATIONS.md`
- Config : `package.json`, `vite.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`, `index.html`
- Base : `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/lib/utils.ts`
- Hook : `src/hooks/useLenis.ts`
- Data : `src/data/site.ts`, `poles.ts`, `services.ts`
- Composants : `src/components/Logo.tsx`, `Reveal.tsx`, `CountUp.tsx`, `Navbar.tsx`, `Footer.tsx`
- UI : `src/components/ui/Container.tsx`, `Eyebrow.tsx`, `CTAButton.tsx`
- Background : `src/components/backgrounds/Strands.tsx` (+ CSS)
- Sections : `src/components/sections/Hero.tsx`, `Poles.tsx`, `Services.tsx`, `Impact.tsx`, `About.tsx`, `Contact.tsx`
- Pages : `src/pages/Index.tsx`, `NotFound.tsx`

**À brancher / TODO suivants** :
- Backend formulaire Contact (Formspree, Resend, ou API perso) pour remplacer le `setTimeout` simulé.
- Logo SVG isolé pour remplacer le crop background-position.
- Self-host des polices Geist (gain LCP).
- Section partenaires / références (idée : `InfiniteMovingCards` Aceternity).
- Pages `/mentions-legales` et `/politique-confidentialite` (liens Footer).
- Tests viewport iOS Safari (dvh, position fixed pendant Lenis).
- Audit Lighthouse cible : LCP < 2.5s, CLS < 0.1.

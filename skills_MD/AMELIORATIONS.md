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

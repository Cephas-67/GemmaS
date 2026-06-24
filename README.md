# Site Zara Labs

Site institutionnel premium de **Zara Labs**, start-up béninoise d'innovation technologique, de conseil stratégique et d'impact (HealthTech / AgriTech / ingénierie écologique).

---

## 🎯 Vision

Vitrine professionnelle d'un acteur tech ouest-africain qui combine :
- **Tech & Innovation** : plateformes numériques, applications logistiques, solutions IA, R&D.
- **Conseil & Accompagnement** : études, audits, ingénierie de projets, diagnostic, coaching, incubation de PME et startups.
- **Pôles d'avenir** : HealthTech (gestion médicale, numérique santé) et AgriTech / ingénierie écologique (agriculture durable, économie circulaire, transition énergétique).

Le site doit refléter une identité **tech, africaine, chaleureuse**, à la hauteur des standards Anthropic / Linear / Vercel.

---

## 🏢 Client

| Champ | Valeur |
|---|---|
| **Nom** | Zara Labs |
| **Pays** | Bénin 🇧🇯 |
| **Cibles** | Entités publiques et privées, PME, startups, porteurs de projets, ONG |

---

## 🎨 Charte graphique (issue du logo)

| Token | Valeur HSL | Rôle |
|---|---|---|
| `--brand-blue` | `244 75% 53%` | Couleur signature, primaire (boutons, liens, focus) |
| `--brand-blue-deep` | `246 78% 38%` | Hover, accents profonds |
| `--brand-orange` | `25 92% 54%` | CTA secondaires, énergie, soulignement |
| `--brand-orange-soft` | `30 96% 64%` | Highlights, badges |

> **Règle stricte** : pas de couleur hardcodée. Toujours `hsl(var(--*))` ou les utilitaires Tailwind dérivés.

---

## 🛠️ Stack

```
Vite 5 + React 18 + TypeScript 5
Tailwind CSS 3 + tailwindcss-animate
Framer Motion 12 + GSAP 3 + Lenis 1 (scroll smooth)
React Router 6 · @tanstack/react-query 5
React Hook Form + Zod
Radix UI + shadcn-ui · lucide-react · sonner
OGL (WebGL léger optionnel) · react-fast-marquee
```

---

## 🚀 Démarrage

```bash
npm install
npm run dev          # http://localhost:5173
npm run build
npm run preview
```

---

## 📁 Structure

```
src/
├── pages/              Index, NotFound
├── components/
│   ├── ui/             primitives shadcn (à ajouter au besoin)
│   ├── hero/
│   └── sections/       Poles, Services, Impact, About, Contact
├── contexts/
├── data/               poles.ts, services.ts, team.ts
├── hooks/
├── lib/                utils.ts (cn)
├── assets/
├── App.tsx
├── index.css           tokens HSL Zara Labs
└── main.tsx
skills_MD/              skills réutilisables (UI-UX, GSAP, performance, etc.)
```

---

## 📚 Documentation interne

- [`CLAUDE.md`](./CLAUDE.md), mémoire persistante du projet (à lire en premier).
- [`skills_MD/`](./skills_MD/), skills Markdown réutilisables (UI-UX, GSAP, frontend-design, etc.).
- [`skills_MD/AMELIORATIONS.md`](./skills_MD/AMELIORATIONS.md), journal vivant des leçons apprises.

---

## 👤 Auteur

**AMOUSSOU Siméon Céphas** (`Gblewa`), développeur Full Stack & designer UI/UX.
Cotonou, Bénin 🇧🇯.

---

*Projet client · Site Zara Labs · 2026.*

# Portfolio — Ivan Bosso

Site perso (portfolio + CV + services + contact). Conçu pour être **modulable** :
on édite du contenu, pas du code. Première brique d'une présence web plus large.

## Lancer en local
```bash
npm install      # une fois
npm run dev      # → http://localhost:4321
npm run build    # build de production (dossier dist/)
npm run preview  # prévisualiser le build
```

## Où modifier quoi (les 3 seuls fichiers de contenu)

| Je veux… | Fichier à éditer |
|---|---|
| Ajouter / modifier un **projet** | `src/data/projects.ts` |
| Changer mes **infos perso** (email, tél, LinkedIn, domaine) | `src/config/site.ts` |
| Activer le **compteur de visites** (analytics) | `src/config/site.ts` → bloc `ANALYTICS` |
| Changer les **couleurs / polices** | `src/styles/global.css` → bloc `@theme` |

### Ajouter un projet
Dans `src/data/projects.ts`, copier un objet du tableau `PROJECTS` et l'adapter.
La page `/portfolio/<slug>` se génère **automatiquement** à partir du `slug`.
Champs : `client`, `monogram` (logo de substitution), `domain` ('IA' | 'Data'),
`tags`, `title`, `task` (la phrase d'accroche), `headline` (métrique de la carte),
`metrics`, puis le fil `probleme` → `contrainte` → `approche` → `resultat` → `stack`.
Mettre `featured: true` pour l'afficher sur la page d'accueil.

> Aucune autre modification nécessaire : la grille, la page détail, le « projet suivant »
> et les logos clients se mettent à jour tout seuls.

### Mettre les vrais logos clients
Déposer les images dans `public/logos/` et remplacer l'affichage du `monogram`
par une `<img>` dans `src/components/ProjectCard.astro` (un seul endroit).

### Mettre le CV en téléchargement
Déposer le PDF dans `public/cv/` et vérifier `SITE.cvPdf` dans `src/config/site.ts`.

## Architecture (rapide)
```
src/
  config/site.ts        → infos perso + analytics (source unique)
  data/projects.ts      → contenu des projets (source unique)
  layouts/Base.astro    → en-tête HTML, nav, footer, analytics, reveal au scroll
  components/            → Nav, Footer, ProjectCard, FlowNarrative, NeuralBg (signature), Analytics
  pages/                → /, /portfolio, /portfolio/[slug], /cv, /services, /contact
  styles/global.css     → tokens de design (couleurs/polices) + animations
```

## Déploiement (hébergement simple)
Site **statique** → déployable gratuitement sur **Cloudflare Pages**, **Netlify** ou **Vercel** :
build = `npm run build`, dossier de sortie = `dist/`. Brancher le nom de domaine acheté.
Penser à mettre `SITE.url` à jour avec le vrai domaine.

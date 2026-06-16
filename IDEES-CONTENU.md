# Pistes de contenu — apporter de la valeur au grand public

> Note de travail (non déployée : ce fichier n'est ni dans `src/pages` ni dans `public`).
> Objectif : faire vivre le site au-delà du portfolio, en **donnant de la valeur** (pas en se vendant).
> Principe directeur issu de la veille 2026 : *value-first*, authenticité, formats visuels,
> et un espace de contenu régulier qui construit **autorité + référencement (SEO/GEO) + backlinks**.

## Principe

- On ne parle pas de soi : on **rend service**. Le branding vient en bonus, pas en intention.
- Vulgariser sans jargon (cohérent avec le ton du site : « l'humain d'abord »).
- Chaque contenu doit pouvoir tenir seul et être partageable (LinkedIn, lien direct).
- Réutiliser l'existant : la charte, les composants `glass`, les icônes, le moteur d'anim.

## Idées, par effort / impact

### 🟢 Quick wins (faible effort, bon impact)

1. **Page « Astuces / TIL »** (Today I Learned)
   Courts tips concrets (data, IA, prompt, archi). 3–6 lignes chacun, format carte `glass`.
   *Valeur public* : applicable tout de suite. *SEO* : longue traîne de requêtes précises.

2. **Recueil de citations** (extension de ce qu'on a déjà dans le bandeau)
   Une page dédiée « Inspirations » : citations tech vérifiées (Turing, Dijkstra, Box,
   Saint-Exupéry, Asimov…) avec une phrase de mise en contexte. Filtrable par thème
   (fiabilité, simplicité, données, éthique). *Réutilise* le tableau de citations déjà constitué.

3. **Mini-glossaire « l'IA en clair »**
   Jargon → définition simple + analogie (RAG, embeddings, fine-tuning, hallucination,
   token, agent…). *Valeur public* : un non-technique comprend enfin. *GEO* : très repris par les LLM.

4. **FAQ « l'IA pour les entreprises »**
   « L'IA va-t-elle remplacer mes équipes ? », « Combien ça coûte ? », « Mes données sont-elles en sécurité ? ».
   Réponses honnêtes et nuancées. *Bonus* : désamorce les objections, utile aussi pour les prospects.

### 🟡 Moyen terme (effort modéré)

5. **Infographies / visuels pédagogiques**
   Ex. « Le cycle de vie d'un projet IA : du problème à la valeur » (réutilise le fil `FLOW`),
   « RAG en un schéma », « Où l'IA aide vs où elle n'a pas sa place ». Format image partageable.
   *Valeur public* : compréhension immédiate. *Réseaux* : fort potentiel de partage.

6. **Articles de vulgarisation** (mini-blog `/ressources`)
   1 sujet = 1 question concrète. Ex. « Pourquoi un chatbot invente des réponses (et comment l'éviter) »,
   « Anonymiser des données avant un LLM, concrètement ». Ton accessible, exemples réels (sans confidentialité).
   *SEO* : la pièce maîtresse pour l'autorité et les backlinks.

7. **Veille commentée**
   Reprendre une actu IA/data + 3 lignes de ton point de vue. Faible effort, montre que tu suis le terrain.
   Peut alimenter LinkedIn ET une page « Veille » du site.

### 🔴 Ambitieux (plus d'effort, fort différenciateur)

8. **Newsletter** (capture email + envoi régulier)
   Le canal qui crée une vraie audience dans la durée. À coupler avec les articles.

9. **Démo interactive / playground**
   Un petit outil jouable directement sur le site (ex. mini-extraction de doc, mini-RAG sur un texte).
   *Valeur public* : on touche au lieu de lire. *Différenciateur* : montre le faire, pas le dire.

10. **Études de cas « pédagogiques »**
    Variante des projets, mais orientée « ce que vous pouvez en apprendre » plutôt que « ce que j'ai fait ».

## Notes techniques (Astro, site statique)

- **Content Collections Astro** (`src/content/`) = idéal pour Tips / Articles / Citations en Markdown :
  on écrit du `.md`, le site génère les pages au build. Aucun back-end, reste 100 % statique.
- Réutiliser `ClientLogo`, `Icon`, `.glass`, le moteur `anim.ts`, et le système de reveals.
- Ajouter les nouvelles pages au **sitemap** et à **`llms.txt`** (sauf celles à garder discrètes, cf. `/services`).
- Penser **GEO** (referencement pour les LLM) : le glossaire et la FAQ sont très « citables » par les IA.
- Garder la cohérence charte (Outfit, indigo/citron, fond noir, ton humain, zéro red flag IA).

## Priorisation suggérée

1. Glossaire « IA en clair » + FAQ (rapides, fort GEO, utiles aussi en entretien).
2. Page Astuces/TIL (alimentable petit à petit).
3. 2–3 infographies réutilisant le fil `FLOW`.
4. Mini-blog `/ressources` (1 article/mois) → autorité + SEO sur la durée.
5. Newsletter quand il y a assez d'articles pour nourrir l'envoi.

## Sources (veille)

- Robert Walters — Build a strong personal brand in 2026 : https://www.robertwalters.com.au/insights/career-advice/blog/how-to-build-a-strong-personal-brand.html
- BrandMender — How to build a personal brand in 2026 : https://www.brandmender.com/blog/how-to-build-a-personal-brand-in-2026/
- DEV — Technical SEO wins for developer portfolios : https://dev.to/rossellafer/beyond-keywords-technical-seo-wins-for-developer-portfolios-4ko8
- Shipixen — SEO checklist for developer portfolios : https://shipixen.com/blog/seo-checklist-for-developer-portfolios-and-landing-pages

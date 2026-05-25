# Documentation Portfolio — Loulia

> Référence complète pour modifier, maintenir et reprendre le portfolio.
> Garde ce fichier ouvert dans VS Code quand tu travailles sur le site.
> Dernière mise à jour : mai 2026

---

## Structure des fichiers

```
mon-portfolio/
│
├── index.html                        ← Point d'entrée HTML (titre, polices Google)
├── vite.config.js                    ← Config Vite (ne pas toucher)
├── package.json                      ← Scripts npm
├── .env                              ← Token GitHub (NE PAS committer)
├── .gitignore                        ← Ignore node_modules, dist, .env
│
├── public/
│   ├── favicon.svg                   ← Icône onglet navigateur
│   └── cv.pdf                        ← À placer ici pour le bouton "Télécharger mon CV"
│
├── scripts/
│   └── fetch-github-data.js          ← Fetch automatique GitHub → projects.json
│
└── src/
    ├── main.jsx                      ← Point d'entrée React (ne pas toucher)
    ├── App.jsx                       ← Assemble tous les composants
    ├── index.css                     ← Tokens de design (couleurs, polices, etc.)
    │
    ├── data/
    │   ├── github-config.js          ← Dossiers GitHub à scanner
    │   ├── skills.js                 ← Compétences (éditer manuellement)
    │   └── projects.json             ← Généré automatiquement — NE PAS éditer
    │
    └── components/
        ├── Navbar.jsx / .css         ← Barre de navigation fixe
        ├── Hero.jsx / .css           ← Section d'accueil + carte alternance
        ├── About.jsx / .css          ← Présentation personnelle ("Mon parcours")
        ├── Skills.jsx / .css         ← Grille de compétences avec icônes SVG
        ├── Projects.jsx / .css       ← Grille projets + filtres + modal + lightbox
        └── Contact.jsx / .css        ← Liens GitHub / email / LinkedIn + footer
```

Note : la section Journey a été supprimée. App.jsx suit cet ordre : Navbar → Hero → About → Skills → Projects → Contact.

---

## Design — palette violette claire

Tout le design passe par des variables CSS dans `src/index.css`.

```css
:root {
  /* Couleurs principales */
  --accent:        #8055A2;   /* violet principal */
  --accent-hover:  #6A4389;   /* violet foncé au survol */
  --accent-light:  #E8D5F5;   /* fond violet très clair */

  /* Fonds (tout clair, pas de dark mode) */
  --bg:            #F5F0FA;   /* fond général */
  --bg-alt:        #EDE5F7;   /* fond sections alternées */
  --bg-card:       #FFFFFF;   /* fond des cartes */

  /* Textes */
  --ink:           #2D1B4E;   /* texte principal */
  --ink-2:         #6B5880;   /* texte secondaire */
  --ink-3:         #9B7BB8;   /* texte discret (labels, dates) */

  /* Bordures & ombres */
  --border:        #E2D5F0;
  --shadow-sm:     0 1px 4px rgba(128,85,162,0.10);
  --shadow-md:     0 4px 16px rgba(128,85,162,0.18);

  /* Polices — NE PAS CHANGER (chargées dans index.html) */
  --font-display:  'Fraunces', Georgia, serif;   /* titres */
  --font-body:     'Lora', Georgia, serif;        /* corps */
  --font-mono:     'JetBrains Mono', monospace;   /* labels, code */

  --radius:        8px;
  --radius-lg:     16px;
  --max-w:         1160px;
}
```

Il n'y a plus de `--bg-tinted`, `--green`, `--green-light` — ces anciens tokens sont supprimés.

---

## Modifier le contenu

### Hero — `src/components/Hero.jsx`

Structure actuelle :
- Prénom "Loulia" en grand (font-display)
- Sous-titre : "Étudiante en 2ᵉ année en informatique"
- Tagline : *Je construis, je rate, je recommence.*
- Description courte
- Carte alternance blanche avec bordure violette :
  - "Disponible dès / Septembre 2026 / Recherche alternance"
  - Détails : "2 sem. entreprise / 1 sem. école" + "Contrat 1 an ou 3 ans"
  - Bouton "Télécharger mon CV" (lien `/cv.pdf`)

Pour changer la date ou le rythme, édite directement les textes dans `Hero.jsx`.

---

### À propos — `src/components/About.jsx`

Titre : "Mon parcours" (avec `<br /><em>parcours</em>`)

Contenu : 3 paragraphes (économie → UX/design → code) + 1 carte "Formation" sans emoji.

---

### Compétences — `src/data/skills.js`

Format de chaque compétence (pas de champ `level`) :

```js
{ name: 'Python', icon: 'python', category: 'language' }
```

Catégories disponibles : `language` · `frontend` · `backend` · `bdd` · `infra` · `outils` · `design` · `cms` · `gestion`

Les icônes sont des SVG chargés depuis le CDN devicons :
```
https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{icon}/{icon}-original.svg
```

Cas spécial — Notion utilise svgl.app (pas dans devicons) :
```js
{ name: 'Notion', icon: 'notion', category: 'gestion' }
// → https://svgl.app/library/notion.svg
```

Si une icône ne se charge pas, elle est simplement masquée (`onError` sur l'`<img>`).

Liste complète des icônes utilisées :
`python`, `javascript`, `typescript`, `java`, `csharp`, `go`, `php`,
`html5`, `react`, `nextjs`, `tailwindcss`,
`nodejs`, `fastapi`,
`mysql`, `postgresql`, `mongodb`,
`linux`, `windows8`, `apache`, `cisco`,
`git`, `vscode`,
`figma`, `canva`, `illustrator`,
`wordpress`, `google` (×2),
`notion`, `jira` (×2)

---

### Projets — `src/components/Projects.jsx`

Fonctionnalités actuelles :
- Filtres par catégorie (Tous, Backend, Frontend, Programmation, Base de données, Projets complets)
- Cartes avec icônes SVG inline (code, calendar, image, video, map)
- Clic sur une carte → modal de détail
- Flèches gauche/droite sur les côtés du modal pour naviguer entre projets (touches ← → aussi)
- Screenshots cliquables → Lightbox avec navigation (← →) et compteur "1 / 4"
- Fermeture avec Echap ou clic sur le fond

Les données viennent de `src/data/projects.json` (généré automatiquement).

---

### Contact — `src/components/Contact.jsx`

Infos actuelles :
- GitHub : https://github.com/Loulia-06
- Email : loulia.tsui@outlook.com
- LinkedIn : https://www.linkedin.com/in/louliatsui/
- Bouton "Télécharger mon CV" → `/cv.pdf`
- Texte alternance : septembre 2026, 2 sem/1 sem, 1 an ou 3 ans

---

## Configurer les dossiers GitHub — `src/data/github-config.js`

```js
export const GITHUB_CONFIG = {
  username: 'Loulia-06',
  repo:     'dev-learning-portfolio',
  branch:   'main',

  domains: [
    { path: 'backend/api-rest',        category: 'backend',       lang: 'Node.js'    },
    { path: 'backend/nodejs',          category: 'backend',       lang: 'Node.js'    },
    { path: 'backend/php',             category: 'backend',       lang: 'PHP'        },
    { path: 'frontend/html-css',       category: 'frontend',      lang: 'HTML/CSS'   },
    { path: 'frontend/javascript',     category: 'frontend',      lang: 'JavaScript' },
    { path: 'frontend/tailwind',       category: 'frontend',      lang: 'Tailwind'   },
    { path: 'programmation/python',    category: 'programmation', lang: 'Python'     },
    { path: 'programmation/java',      category: 'programmation', lang: 'Java'       },
    { path: 'programmation/csharp',    category: 'programmation', lang: 'C#'         },
    { path: 'programmation/go',        category: 'programmation', lang: 'Go'         },
    { path: 'base-de-donnees/sql',     category: 'bdd',           lang: 'SQL'        },
    { path: 'projets-complets',        category: 'projets',       lang: 'Divers'     },
  ],
}
```

Si un dossier n'existe pas encore dans le repo → pas d'erreur, juste ignoré.

Pour ajouter un nouveau dossier, ajoute une ligne ici puis `npm run fetch` pour tester.

---

## Token GitHub — éviter la limite de taux

Sans token, l'API GitHub autorise seulement 60 requêtes/heure. Avec un build qui lit
plusieurs dossiers, ça s'épuise vite.

### Fichier `.env` (à la racine de `mon-portfolio/`)

```
GITHUB_TOKEN=ghp_xxxxx_TON_TOKEN
```

Ce fichier est dans `.gitignore` — il ne sera jamais commité.

### Comment ça marche

`package.json` utilise `node --env-file=.env` (fonctionnalité native Node 24, pas besoin de dotenv) :

```json
"build": "node --env-file=.env scripts/fetch-github-data.js && vite build",
"fetch": "node --env-file=.env scripts/fetch-github-data.js"
```

### Sur Vercel (production)

Ajouter le token dans les variables d'environnement Vercel :
- Dashboard Vercel → ton projet → Settings → Environment Variables
- Clé : `GITHUB_TOKEN`, Valeur : ton token

### Créer un nouveau token (si l'ancien expire)

1. GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Permissions requises : `public_repo` suffit
3. Colle la valeur dans `.env` et dans Vercel

---

## Ajouter des captures d'écran à un projet

Les screenshots sont hébergés dans `dev-learning-portfolio` sur GitHub.

Structure attendue dans le repo dev :
```
projets-complets/
└── recette-du-monde/
    ├── README.md
    └── screenshots/
        ├── accueil.png
        ├── connexion.png
        ├── creation-recette.png
        └── details-recette.png
```

Dans le `README.md` du projet :
```markdown
## Captures d'écran
![Description](screenshots/nom-du-fichier.png)
```

Le script `fetch-github-data.js` lit ces liens relatifs et les convertit en URLs GitHub brutes
(`raw.githubusercontent.com/...`). Les photos s'affichent dans le modal et sont cliquables
pour s'agrandir en lightbox.

Nommage conseillé : tout en minuscules, tirets à la place des espaces (`page-accueil.png`).

---

## Commandes utiles

```bash
# Installer les dépendances (une seule fois)
cd mon-portfolio
npm install

# Récupérer les projets GitHub + build complet
npm run build

# Voir le résultat du build en local
npm run preview
# → http://localhost:4173

# Dev avec rechargement automatique (sans refetch GitHub)
npm run fetch      # génère projects.json une fois
npm run dev        # → http://localhost:5173

# Pousser sur GitHub → Vercel redéploie automatiquement
git add -p         # ou git add <fichier>
git commit -m "portfolio: description du changement"
git push
```

---

## Workflow quotidien

### Après un exercice dans `dev-learning-portfolio`
```
1. git push sur dev-learning-portfolio
2. Sur Vercel → Redeploy (ou attendre le prochain push sur mon-portfolio)
→ Le projet apparaît automatiquement
```

### Pour modifier le design
```
1. Édite le fichier dans VS Code
2. npm run dev pour voir en direct
3. git push quand c'est bon → Vercel redéploie
```

### Pour ajouter une compétence
```
1. Ouvre src/data/skills.js
2. Ajoute une ligne { name, icon, category }
3. git push → Vercel redéploie
```

### Pour ajouter un nouveau dossier de projets
```
1. Crée le dossier dans dev-learning-portfolio
2. Ajoute le path dans src/data/github-config.js
3. npm run fetch pour vérifier
4. git push sur mon-portfolio
```

---

## Problèmes fréquents

| Erreur | Cause | Solution |
|--------|-------|----------|
| `0 projets affichés` | Paths github-config erronés | Vérifie les `path` dans `github-config.js` vs la vraie structure du repo |
| `0 projets` après build | Rate limit GitHub (60 req/h) | Ajoute GITHUB_TOKEN dans `.env` |
| Token non chargé | `node` sans `--env-file` | Vérifie que `package.json` a `node --env-file=.env` |
| `npm run build` plante | Erreur fetch GitHub | Ouvre DevTools (`F12`) → Console pour voir l'erreur |
| Page blanche | Erreur JS | Ouvre DevTools (`F12`) → onglet Console |
| Photos pas visibles | Screenshots pas commités | `git add screenshots/ && git push` dans dev-learning-portfolio |
| CV pas téléchargeable | `cv.pdf` manquant | Place le fichier dans `mon-portfolio/public/cv.pdf` |
| Vercel build sans token | Variable env manquante | Ajouter GITHUB_TOKEN dans Vercel → Settings → Env Variables |

---

## À faire (todo)

- Ajouter `cv.pdf` dans `public/`
- Ajouter `GITHUB_TOKEN` dans les variables d'environnement Vercel
- Vérifier que les screenshots de `recette-du-monde` s'affichent bien après le dernier push

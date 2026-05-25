# 📖 Documentation Portfolio — Loulia

> Référence complète pour modifier, personnaliser et maintenir le portfolio.
> Garde ce fichier ouvert dans VS Code quand tu travailles sur le site.

---

## 🗂️ Structure des fichiers

```
mon-portfolio/
│
├── index.html                        ← Point d'entrée HTML (titre, polices Google)
├── vite.config.js                    ← Config Vite (ne pas toucher)
├── package.json                      ← Scripts npm
│
├── public/
│   └── favicon.svg                   ← Icône onglet navigateur (L rouge)
│
├── scripts/
│   └── fetch-github-data.js          ← ⭐ Fetch automatique GitHub → projects.json
│
└── src/
    ├── main.jsx                      ← Point d'entrée React (ne pas toucher)
    ├── App.jsx                       ← Assemble tous les composants
    ├── index.css                     ← ⭐ Tokens de design (couleurs, polices, etc.)
    │
    ├── data/
    │   ├── github-config.js          ← ✏️ Dossiers GitHub à scanner
    │   ├── skills.js                 ← ✏️ Compétences et niveaux (éditer manuellement)
    │   └── projects.json             ← ⚙️ Généré automatiquement — NE PAS éditer
    │
    └── components/
        ├── Navbar.jsx / .css         ← Barre de navigation fixe
        ├── Hero.jsx / .css           ← Section d'accueil (nom, tagline, carte)
        ├── About.jsx / .css          ← Présentation personnelle
        ├── Skills.jsx / .css         ← Grille de compétences
        ├── Projects.jsx / .css       ← Grille projets + filtres + modal détail
        ├── Journey.jsx / .css        ← Timeline du parcours
        └── Contact.jsx / .css        ← Liens GitHub / email / LinkedIn + footer
```

---

## 🎨 Modifier le design

### Couleurs & polices — `src/index.css`

**Tout le design passe par des variables CSS.**
Modifie uniquement ce bloc en haut du fichier :

```css
:root {
  --bg:           #F9F5EE;   /* fond général (beige chaud) */
  --bg-card:      #FFFFFF;   /* fond des cartes */
  --bg-tinted:    #F0E8D8;   /* fond sections alternées */
  --ink:          #1A1208;   /* texte principal */
  --ink-2:        #6B5840;   /* texte secondaire */
  --ink-3:        #A89078;   /* texte discret (labels, dates) */
  --accent:       #C84B0A;   /* couleur principale (orange-rouge) */
  --accent-hover: #A83D08;   /* accent au survol */
  --accent-light: #FAE8DE;   /* fond léger accent */
  --green:        #3D6B56;   /* couleur "appris" */
  --border:       #E2D8CA;   /* bordures */

  --font-display: 'Fraunces', Georgia, serif;   /* titres */
  --font-body:    'Lora', Georgia, serif;        /* texte courant */
  --font-mono:    'JetBrains Mono', monospace;   /* code, labels */
}
```

**Exemples de changements rapides :**

| Envie | Variable à changer |
|-------|-------------------|
| Fond plus blanc | `--bg: #FFFFFF` |
| Accent bleu | `--accent: #1D6FD8` |
| Fond sombre (dark mode) | `--bg: #0F0F0F`, `--ink: #F0F0F0` |
| Autre police titre | `--font-display: 'Playfair Display', serif` |

> 💡 Pour changer les polices, édite aussi `index.html` → lien Google Fonts.

---

### Polices disponibles (déjà chargées)

| Nom | Usage | Variable |
|-----|-------|----------|
| **Fraunces** | Titres, nom hero | `--font-display` |
| **Lora** | Corps de texte | `--font-body` |
| **JetBrains Mono** | Labels, code, dates | `--font-mono` |

Pour en changer, remplace dans `index.html` :
```html
<link href="https://fonts.googleapis.com/css2?family=TaPolice:wght@400;700&display=swap" rel="stylesheet" />
```
Et dans `index.css` :
```css
--font-display: 'TaPolice', serif;
```

---

## ✏️ Modifier le contenu

### Section Hero — `src/components/Hero.jsx`

```jsx
// Ligne 13 — Ton prénom affiché en grand
<h1 className="hero__name">Loulia</h1>

// Ligne 16 — Tagline sous le prénom
<p className="hero__tagline">
  Étudiante en 2ᵉ année d'informatique —<br />
  <em>exploratrice de code, amoureuse des défis.</em>
</p>

// Ligne 21 — Phrase de description
<p className="hero__desc">
  J'apprends à construire des choses...
</p>

// Lignes 32-34 — Carte "En ce moment j'apprends"
<li>Node.js + Express</li>
<li>React</li>
<li>SQL</li>

// Ligne 38 — Depuis quand
<span className="hero__card-since">Depuis octobre 2024</span>
<span className="hero__card-months">~7 mois de pratique</span>
```

---

### Section À propos — `src/components/About.jsx`

```jsx
// Lignes 10-11 — Titre
<h2 className="section-title">Une reconversion<br /><em>par curiosité</em></h2>

// Lignes 13-25 — 3 paragraphes de présentation
<p>Avant l'informatique...</p>
<p>Aujourd'hui en 2ᵉ année...</p>
<p>Ce qui me motive...</p>

// Lignes 28-46 — 4 cartes (icône, titre, description)
{ icon: '🎓', title: 'Formation', desc: '...' }
{ icon: '⏱️', title: 'Pratique',  desc: '...' }
{ icon: '🌱', title: 'Philosophie', desc: '...' }
{ icon: '🎯', title: 'Objectif',  desc: '...' }
```

---

### Section Compétences — `src/data/skills.js`

**Seul fichier de données à éditer manuellement.**

```js
{ name: 'Python', level: 'débutant', icon: '🐍', since: '2024-10', category: 'language' }
```

| Champ | Valeurs possibles |
|-------|------------------|
| `level` | `'débutant'` · `'moyen'` · `'avancé'` |
| `category` | `'language'` · `'backend'` · `'frontend'` · `'bdd'` · `'outils'` |
| `since` | Format `'AAAA-MM'` |

**Faire progresser un niveau :**
```js
// Avant
{ name: 'Python', level: 'débutant', ... }
// Après
{ name: 'Python', level: 'moyen', ... }
```
Puis `git push` → Vercel redéploie.

---

### Section Parcours — `src/components/Journey.jsx`

```js
const MILESTONES = [
  {
    date:  'Sept. 2024',          // ← date affichée
    title: 'Le démarrage',        // ← titre de l'étape
    desc:  'Première rentrée...', // ← description
    icon:  '🌱',                  // ← emoji
  },
  // ... ajoute une étape en dupliquant un objet
  {
    date:    'Aujourd\'hui',
    title:   'En cours…',
    current: true,                // ← met le point en rouge/accent
  }
]
```

---

### Section Contact — `src/components/Contact.jsx`

```jsx
// Ligne 13 — Titre
<h2>Discutons<br /><em>ensemble</em></h2>

// Ligne 17-21 — Texte
<p>Tu es recruteur·se...</p>

// Ligne 27 — Lien GitHub (déjà bon)
href="https://github.com/Loulia-06"

// Ligne 36 — ✏️ TON EMAIL
href="mailto:loulia@example.com"   ← remplace ici

// Ligne 46 — ✏️ TON LINKEDIN
href="https://www.linkedin.com/in/"  ← ajoute ton profil
```

---

## ⚙️ Configurer les dossiers GitHub — `src/data/github-config.js`

```js
export const GITHUB_CONFIG = {
  username: 'Loulia-06',             // ← ton username GitHub
  repo:     'dev-learning-portfolio', // ← ton repo d'exercices
  branch:   'main',

  domains: [
    // Ajoute un objet par dossier dans dev-learning-portfolio
    { path: 'backend/api-rest', category: 'backend', lang: 'Node.js' },
    { path: 'programmation/python', category: 'programmation', lang: 'Python' },
    // etc.
  ]
}
```

**Si un dossier n'existe pas encore dans ton repo → pas d'erreur, juste ignoré.**

---

## 🚀 Commandes utiles

```bash
# Installer les dépendances (une seule fois)
npm install

# Récupérer les projets GitHub + build complet
npm run build

# Voir le résultat en local
npm run preview
# → http://localhost:4173

# Dev avec rechargement automatique (sans refetch GitHub)
npm run fetch   # génère projects.json une fois
npm run dev     # → http://localhost:5173

# Pousser sur GitHub → déclenche Vercel
git add .
git commit -m "portfolio: description du changement"
git push
```

---

## 🔄 Workflow quotidien

### Après un exercice dans `dev-learning-portfolio`
```
1. git push sur dev-learning-portfolio
2. Vercel → Redeploy
→ Le projet apparaît automatiquement ✅
```

### Pour modifier le design
```
1. Édite le fichier dans VS Code
2. npm run dev (pour voir en direct)
3. git push quand c'est bon → Vercel redéploie
```

### Pour ajouter une compétence
```
1. Ouvre src/data/skills.js
2. Ajoute une ligne ou change le level
3. git push → Vercel redéploie
```

---

## 🐛 Problèmes fréquents

| Erreur | Cause | Solution |
|--------|-------|----------|
| `0 projets affichés` | Dossiers GitHub pas trouvés | Vérifie les `path` dans `github-config.js` |
| `npm run build` plante | Erreur fetch GitHub | Normal si repo vide — continue |
| Page blanche | Erreur JS | Ouvre DevTools (`F12`) → onglet Console |
| Polices pas chargées | Pas de connexion internet | Normal en offline — OK sur Vercel |
| `cd: no such file` | Mauvais dossier | `pwd` pour voir où tu es |

---

## 🎨 Idées de personnalisation

- **Changer la couleur accent** → `--accent` dans `index.css`
- **Dark mode** → inverser `--bg` et `--ink`
- **Ajouter une photo** → dans `Hero.jsx`, remplace la carte par une `<img>`
- **Ajouter une section** → crée `MonSection.jsx` + `.css`, importe dans `App.jsx`
- **Changer la police titre** → remplace `Fraunces` dans `index.html` + `index.css`

---

*Dernière mise à jour : mai 2026*
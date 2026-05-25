# Portfolio — Loulia

Portfolio personnel construit avec **React + Vite**, déployé sur **Vercel**.
Les projets sont récupérés automatiquement depuis `dev-learning-portfolio` via l'API GitHub.

---

## Installation

```bash
git clone https://github.com/Loulia-06/portfolio
cd portfolio
npm install
```

## Développement local

```bash
npm run build   # fetch GitHub + build
npm run preview # voir sur http://localhost:4173
```

> Pour le dev sans fetch GitHub à chaque fois :
> ```bash
> npm run fetch   # génère projects.json une seule fois
> npm run dev     # HMR sur http://localhost:5173
> ```

## Personnaliser

| Fichier | Quoi modifier |
|---------|--------------|
| `src/data/github-config.js` | Dossiers à scanner dans dev-learning-portfolio |
| `src/data/skills.js` | Compétences et niveaux |
| `src/components/About.jsx` | Texte de présentation |
| `src/components/Journey.jsx` | Étapes du parcours |
| `src/components/Contact.jsx` | Email, liens LinkedIn |

## Déployer sur Vercel

1. Push sur GitHub : `git push`
2. Sur [vercel.com](https://vercel.com) → **Add New Project** → importer `portfolio`
3. Build command : `node scripts/fetch-github-data.js && vite build`
4. **Deploy** ✅

### Variable d'environnement (optionnel)
Si l'API GitHub rate-limite (>60 exercices) :
- Vercel → Settings → Environment Variables
- Ajouter `GITHUB_TOKEN` avec un token GitHub (sans scope)

## Mise à jour du portfolio

Après un exercice dans `dev-learning-portfolio` :
1. `git push` sur `dev-learning-portfolio`
2. Vercel → **Redeploy** → portfolio mis à jour ✅

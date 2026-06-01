# Déployer le portfolio sur Vercel

## Prérequis
- Compte Vercel : https://vercel.com
- Repo GitHub `mon-portfolio` poussé (déjà fait)

---

## 1. Importer le projet sur Vercel

1. Va sur https://vercel.com → **Add New Project**
2. Connecte ton compte GitHub si ce n'est pas déjà fait
3. Cherche et sélectionne le repo `Loulia-06/mon-portfolio`
4. Vercel détecte automatiquement que c'est un projet Vite → **Framework : Vite**
5. **Build Command** : `node --env-file=.env scripts/fetch-github-data.js && vite build`
   → Si Vercel ne permet pas `--env-file`, utilise à la place :
   `node -r dotenv/config scripts/fetch-github-data.js && vite build`
   (voir section Token ci-dessous)
6. **Output Directory** : `dist`
7. **Install Command** : `npm install`

---

## 2. Ajouter le token GitHub (obligatoire)

Sans token, le build Vercel va dépasser la limite de 60 requêtes/h de l'API GitHub et récupérer 0 projets.

1. Sur Vercel → ton projet → **Settings** → **Environment Variables**
2. Ajouter :
   - **Name** : `GITHUB_TOKEN`
   - **Value** : ton token (celui du fichier `.env` local)
   - **Environment** : cocher `Production`, `Preview`, `Development`
3. Cliquer **Save**

### Créer un nouveau token si nécessaire
1. GitHub → **Settings** → **Developer Settings** → **Personal Access Tokens** → **Tokens (classic)**
2. **Generate new token (classic)**
3. Permissions à cocher : `public_repo` suffit
4. Copier la valeur → la coller dans Vercel

---

## 3. Lancer le premier déploiement

1. Vercel → ton projet → **Deployments** → **Redeploy**
   (ou simplement faire un `git push` sur `main`)
2. Vérifier dans les logs que le fetch GitHub fonctionne :
   ```
   ✅ recette-du-monde
   ✅ Projet SQL
   ✅ Projet PHP
   ✨ X projet(s) écrits dans src/data/projects.json
   ```
3. Si `0 projet(s)` → le token n'est pas chargé, vérifier l'étape 2

---

## 4. Ajouter un domaine personnalisé (optionnel)

1. Vercel → ton projet → **Settings** → **Domains**
2. Entrer ton domaine (ex: `loulia.dev`)
3. Suivre les instructions DNS chez ton registrar

---

## 5. Workflow après déploiement

### Mise à jour du portfolio (design, contenu)
```
git add .
git commit -m "description"
git push
→ Vercel redéploie automatiquement
```

### Nouveau projet dans dev-learning-portfolio
```
1. git push sur dev-learning-portfolio
2. git push sur mon-portfolio (même un fichier vide)
→ Vercel relance le build et refetch les projets
```

Ou forcer un redéploiement sans changement :
```
git commit --allow-empty -m "build: refresh projets"
git push
```

---

## Problèmes fréquents

| Problème | Cause | Solution |
|----------|-------|----------|
| `0 projets` sur le site en prod | `GITHUB_TOKEN` absent dans Vercel | Ajouter la variable d'env (étape 2) |
| Build échoue sur `--env-file` | Node < 20 sur Vercel | Changer le Build Command (voir étape 1) |
| Site déployé mais vide | Output directory incorrect | Vérifier que c'est bien `dist` |
| Anciennes captures d'écran | Cache Vercel | Redeploy depuis le dashboard |

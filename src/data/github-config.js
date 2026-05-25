/**
 * github-config.js
 * ─────────────────────────────────────────────────
 * ✏️  Seul fichier à éditer pour configurer le fetch.
 *
 * domains : liste des dossiers à scanner dans dev-learning-portfolio.
 *   - path     : chemin dans le repo (ex: "backend/api-rest")
 *   - category : nom affiché dans le portfolio
 *   - lang     : langage principal du domaine
 *
 * Ajoute un objet par "thème" d'exercices.
 * ─────────────────────────────────────────────────
 */

export const GITHUB_CONFIG = {
  username: 'Loulia-06',
  repo: 'dev-learning-portfolio',
  branch: 'main',

  domains: [
    // ── Backend ──────────────────────────────────
    { path: 'backend/api-rest',      category: 'backend',        lang: 'Node.js'     },
    { path: 'backend/express',       category: 'backend',        lang: 'Node.js'     },

    // ── Programmation ────────────────────────────
    { path: 'programmation/python',  category: 'programmation',  lang: 'Python'      },
    { path: 'programmation/javascript', category: 'programmation', lang: 'JavaScript' },
    { path: 'programmation/c',       category: 'programmation',  lang: 'C'           },
    { path: 'programmation/java',    category: 'programmation',  lang: 'Java'        },

    // ── Algorithmique ────────────────────────────
    { path: 'algo',                  category: 'algo',           lang: 'Python'      },

    // ── Frontend ─────────────────────────────────
    { path: 'frontend',              category: 'frontend',       lang: 'JavaScript'  },

    // ── Base de données ──────────────────────────
    { path: 'bdd',                   category: 'bdd',            lang: 'SQL'         },
  ],
}

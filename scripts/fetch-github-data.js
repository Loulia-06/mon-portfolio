// scripts/fetch-github-data.js
// ─────────────────────────────────────────────────────────────────────────────
// Lance avant vite build : "node scripts/fetch-github-data.js && vite build"
// Lit les README de dev-learning-portfolio et génère src/data/projects.json
// ─────────────────────────────────────────────────────────────────────────────

import { writeFileSync, mkdirSync } from 'fs'
import { GITHUB_CONFIG } from '../src/data/github-config.js'

const { username, repo, branch, domains } = GITHUB_CONFIG

const BASE_URL = `https://api.github.com/repos/${username}/${repo}/contents`

// Ajoute ton GITHUB_TOKEN dans les variables d'env Vercel pour éviter le rate limit
const HEADERS = {
  'Accept': 'application/vnd.github+json',
  ...(process.env.GITHUB_TOKEN
    ? { 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
}

// ── Helpers API GitHub ────────────────────────────────────────────────────────

async function fetchFile(path) {
  const res = await fetch(`${BASE_URL}/${path}?ref=${branch}`, { headers: HEADERS })
  if (!res.ok) return null
  const data = await res.json()
  if (!data.content) return null
  return Buffer.from(data.content, 'base64').toString('utf-8')
}

async function listDirs(path) {
  const res = await fetch(`${BASE_URL}/${path}?ref=${branch}`, { headers: HEADERS })
  if (!res.ok) return []
  const items = await res.json()
  if (!Array.isArray(items)) return []
  return items.filter(i => i.type === 'dir')
}

// ── Parsers README ────────────────────────────────────────────────────────────

/** Extrait le contenu d'une section ## par son emoji ou titre */
function extractSection(content, ...headings) {
  for (const heading of headings) {
    const regex = new RegExp(
      `##[^#][^\n]*${heading}[^\n]*\n([\\s\\S]*?)(?=\n##[^#]|$)`,
      'i'
    )
    const match = content.match(regex)
    if (match) {
      return match[1].replace(/<!--[\s\S]*?-->/g, '').trim()
    }
  }
  return null
}

/** Parse une liste markdown en tableau de strings */
function parseList(text) {
  if (!text) return []
  return text
    .split('\n')
    .filter(l => l.trim().match(/^[-*]/))
    .map(l => l.replace(/^[-*]\s*/, '').replace(/\*\*/g, '').trim())
    .filter(Boolean)
}

/** Extrait le premier bloc de code (schéma ASCII) */
function extractSchema(content) {
  const match = content.match(/```[^\n]*\n([\s\S]*?)```/)
  return match ? match[1].trim() : null
}

/** Extrait le lien YouTube */
function extractVideoUrl(content) {
  const section = extractSection(content, '🎥', 'Démo vidéo', 'Demo video')
  if (!section) return null
  const match = section.match(/https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+/)
  return match ? match[0] : null
}

/** Extrait les URLs des captures d'écran */
function extractScreenshots(content, exercisePath) {
  const urls = []
  const section = extractSection(content, '🖼️', 'Captures', 'Screenshots')
  if (!section) return urls
  const imgRegex = /!\[.*?\]\((screenshots\/[^)]+)\)/g
  let m
  while ((m = imgRegex.exec(section)) !== null) {
    const encodedFile = m[1].split('/').map(encodeURIComponent).join('/')
    const encodedPath = exercisePath.split('/').map(encodeURIComponent).join('/')
    urls.push(
      `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${encodedPath}/${encodedFile}`
    )
  }
  return urls
}

/** Détecte le niveau depuis le contenu */
function detectLevel(content) {
  if (!content) return 'débutant'
  if (content.includes('🔴') || /expert/i.test(content)) return 'expert'
  if (content.includes('🟡') || /moyen|intermédiaire/i.test(content)) return 'moyen'
  return 'débutant'
}

/** Extrait la date (plusieurs formats) */
function extractDate(content) {
  if (!content) return new Date().toISOString().slice(0, 7)

  // Format "**Date** : 17/05/2026" ou "> Réalisé le 17/05/2026"
  const frMatch = content.match(/(\d{2})\/(\d{2})\/(\d{4})/)
  if (frMatch) return `${frMatch[3]}-${frMatch[2]}`

  // Format ISO "2026-05"
  const isoMatch = content.match(/(\d{4})-(\d{2})/)
  if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}`

  return new Date().toISOString().slice(0, 7)
}

/** Parse complet d'un README */
function parseReadme(content, exercisePath) {
  const description =
    extractSection(content, 'Énoncé') ||
    extractSection(content, 'Objectif') ||
    ''

  const notionsRaw =
    extractSection(content, 'Notions travaillées') ||
    extractSection(content, 'Notions abordées') ||
    extractSection(content, 'Notions appliquées') ||
    ''

  const whatILearned =
    extractSection(content, "Ce que j'ai appris") ||
    extractSection(content, 'Points clés appris') ||
    extractSection(content, 'Points clés') ||
    ''

  return {
    description,
    notions:      parseList(notionsRaw),
    whatILearned,
    schema:       extractSchema(content),
    screenshots:  extractScreenshots(content, exercisePath),
    videoUrl:     extractVideoUrl(content),
  }
}

// ── Traitement d'un domaine ───────────────────────────────────────────────────

async function processDomain(domain) {
  const exercises = await listDirs(domain.path)
  const projects = []

  for (const ex of exercises) {
    const exPath = `${domain.path}/${ex.name}`
    const content = await fetchFile(`${exPath}/README.md`)

    if (!content) {
      console.log(`     ⚠️  Pas de README dans ${exPath}`)
      continue
    }

    // Titre : H1 du README ou nom de dossier nettoyé
    const h1Match = content.match(/^#\s+(.+)/m)
    const title = h1Match
      ? h1Match[1].replace(/^[^\p{L}\p{N}\s]+\s*/u, '').replace(/\s*—.*$/, '').trim()
      : ex.name.replace(/-/g, ' ').replace(/^ex\d+\s*/i, '').trim()

    const parsed = parseReadme(content, exPath)

    // Liens vers d'autres repos (projets complets)
    const repoSection = extractSection(content, 'Repos du projet', '🔗 Repos')
    const repoLinks = repoSection
      ? [...repoSection.matchAll(/\[([^\]]+)\]\((https:\/\/github\.com\/[^)]+)\)/g)]
          .map(m => ({ label: m[1], url: m[2] }))
      : []

    // Démo en ligne
    const demoSection = extractSection(content, 'Démo en ligne', '🌐 Démo')
    const demoUrl = demoSection
      ? (demoSection.match(/https?:\/\/[^\s\)]+/) || [])[0] || null
      : null

    projects.push({
      id:           ex.name,
      title:        title || ex.name,
      category:     domain.category,
      path:         exPath,
      lang:         domain.lang,
      level:        detectLevel(content),
      date:         extractDate(content),
      description:  parsed.description,
      whatILearned: parsed.whatILearned,
      notions:      parsed.notions,
      techs:        [domain.lang].filter(Boolean),
      schema:       parsed.schema,
      screenshots:  parsed.screenshots,
      videoUrl:     parsed.videoUrl,
      demoUrl,
      repoLinks,
      githubUrl:    `https://github.com/${username}/${repo}/tree/${branch}/${exPath}`,
      highlight:    false,
    })

    console.log(`     ✅ ${ex.name}`)
  }

  return projects
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n📡 Récupération des données depuis GitHub...')
  console.log(`   Repo : ${username}/${repo} (branche : ${branch})\n`)

  const allProjects = []

  for (const domain of domains) {
    console.log(`  📁 ${domain.path} [${domain.lang}]`)
    try {
      const projects = await processDomain(domain)
      allProjects.push(...projects)
      console.log(`     → ${projects.length} exercice(s)\n`)
    } catch (err) {
      console.error(`  ❌ Erreur sur ${domain.path}: ${err.message}\n`)
    }
  }

  // Tri par date décroissante
  allProjects.sort((a, b) => b.date.localeCompare(a.date))

  // Écriture du fichier
  mkdirSync('src/data', { recursive: true })
  writeFileSync('src/data/projects.json', JSON.stringify(allProjects, null, 2), 'utf-8')

  console.log(`✨ ${allProjects.length} projet(s) écrits dans src/data/projects.json`)
  console.log('   Build Vite en cours...\n')
}

main().catch(err => {
  console.error('❌ Erreur fatale:', err.message)
  // Ne pas bloquer le build — générer un fichier vide
  mkdirSync('src/data', { recursive: true })
  writeFileSync('src/data/projects.json', '[]', 'utf-8')
  console.log('⚠️  projects.json vide généré (le site affichera "aucun projet")')
})

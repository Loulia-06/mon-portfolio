import { useState, useMemo } from 'react'
import projects from '../data/projects.json'
import './Projects.css'

const CATEGORY_LABELS = {
  backend:       'Backend',
  programmation: 'Programmation',
  frontend:      'Frontend',
  algo:          'Algorithmique',
  bdd:           'Base de données',
}

function LevelBadge({ level }) {
  const cls = `level-badge level-${level.replace(/[éè]/g, 'e')}`
  return <span className={cls}>{level}</span>
}

function ProjectModal({ project, onClose }) {
  if (!project) return null

  const youtubeEmbed = project.videoUrl
    ? project.videoUrl
        .replace('youtube.com/watch?v=', 'youtube.com/embed/')
        .replace('youtu.be/', 'youtube.com/embed/')
    : null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal__header">
          <div>
            <span className="modal__category">{CATEGORY_LABELS[project.category] || project.category}</span>
            <h2 className="modal__title">{project.title}</h2>
          </div>
          <LevelBadge level={project.level} />
        </div>

        <div className="modal__meta">
          <span className="badge badge-notion">🗓️ {project.date}</span>
          <span className="badge badge-notion">🔤 {project.lang}</span>
        </div>

        {project.description && (
          <div className="modal__section">
            <h3>🎯 Objectif</h3>
            <p>{project.description}</p>
          </div>
        )}

        {project.notions?.length > 0 && (
          <div className="modal__section">
            <h3>📚 Notions travaillées</h3>
            <div className="modal__tags">
              {project.notions.map(n => (
                <span key={n} className="badge badge-notion">{n}</span>
              ))}
            </div>
          </div>
        )}

        {project.whatILearned && (
          <div className="modal__section">
            <h3>💡 Ce que j'ai appris</h3>
            <p className="modal__learned">{project.whatILearned}</p>
          </div>
        )}

        {project.schema && (
          <div className="modal__section">
            <h3>🗺️ Schéma</h3>
            <pre className="modal__schema">{project.schema}</pre>
          </div>
        )}

        {project.screenshots?.length > 0 && (
          <div className="modal__section">
            <h3>🖼️ Captures d'écran</h3>
            <div className="modal__screenshots">
              {project.screenshots.map((url, i) => (
                <img key={i} src={url} alt={`Capture ${i+1}`} loading="lazy" />
              ))}
            </div>
          </div>
        )}

        {youtubeEmbed && (
          <div className="modal__section">
            <h3>🎥 Démo</h3>
            <div className="modal__video">
              <iframe
                src={youtubeEmbed}
                title="Démo vidéo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        <div className="modal__footer">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
            Voir sur GitHub →
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              🌐 Démo live
            </a>
          )}
          {project.repoLinks?.map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="btn btn-ghost">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter]     = useState('all')
  const [selected, setSelected] = useState(null)

  const categories = useMemo(() => {
    const cats = [...new Set(projects.map(p => p.category))]
    return cats
  }, [])

  const filtered = useMemo(() =>
    filter === 'all' ? projects : projects.filter(p => p.category === filter),
    [filter]
  )

  if (projects.length === 0) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <span className="section-label">Projets</span>
          <h2 className="section-title">Mes exercices & projets</h2>
          <div className="projects__empty">
            <p>
              Les projets se chargent depuis <strong>dev-learning-portfolio</strong> sur GitHub.
              <br />Lance <code>npm run build</code> pour les récupérer.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="projects">
      <div className="container">
        <span className="section-label">Projets</span>
        <h2 className="section-title">Mes exercices & projets</h2>
        <p className="section-intro">
          {projects.length} exercice{projects.length > 1 ? 's' : ''} — récupérés automatiquement
          depuis GitHub à chaque déploiement.
        </p>

        {/* Filtres */}
        <div className="projects__filters">
          <button
            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Tous ({projects.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_LABELS[cat] || cat} ({projects.filter(p => p.category === cat).length})
            </button>
          ))}
        </div>

        {/* Grille */}
        <div className="projects__grid stagger">
          {filtered.map(project => (
            <article
              key={project.id}
              className="project-card fade-up"
              onClick={() => setSelected(project)}
            >
              <div className="project-card__top">
                <span className="project-card__category">
                  {CATEGORY_LABELS[project.category] || project.category}
                </span>
                <LevelBadge level={project.level} />
              </div>

              <h3 className="project-card__title">{project.title}</h3>

              {project.description && (
                <p className="project-card__desc">{project.description}</p>
              )}

              <div className="project-card__meta">
                <span className="project-card__lang">{project.lang}</span>
                <span className="project-card__date">{project.date}</span>
              </div>

              {project.notions?.length > 0 && (
                <div className="project-card__notions">
                  {project.notions.slice(0, 3).map(n => (
                    <span key={n} className="badge badge-notion">{n}</span>
                  ))}
                  {project.notions.length > 3 && (
                    <span className="badge badge-notion">+{project.notions.length - 3}</span>
                  )}
                </div>
              )}

              <div className="project-card__footer">
                {project.screenshots?.length > 0 && <span>🖼️</span>}
                {project.videoUrl && <span>🎥</span>}
                {project.schema && <span>🗺️</span>}
                <span className="project-card__cta">Voir le détail →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

import { useState, useMemo, useEffect } from 'react'
import projects from '../data/projects.json'
import './Projects.css'

const CATEGORY_LABELS = {
  backend:       'Backend',
  frontend:      'Frontend',
  programmation: 'Programmation',
  bdd:           'Base de données',
  projets:       'Projets complets',
}

// ── Icônes SVG ───────────────────────────────────────────────────────────────
function Icon({ name, size = 16 }) {
  const paths = {
    calendar:   <path d="M8 2v2M16 2v2M3 8h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>,
    code:       <path d="M8 6L2 12l6 6M16 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    image:      <><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/><circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/><path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
    video:      <><path d="M15 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/><rect x="2" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/></>,
    map:        <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6zM9 3v15M15 6v15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>,
    target:     <><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.8" fill="none"/><circle cx="12" cy="12" r="2" fill="currentColor"/></>,
    book:       <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5V4a2 2 0 0 1 2-2h14v15H6.5A2.5 2.5 0 0 0 4 19.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>,
    bulb:       <><path d="M9 21h6M12 3a6 6 0 0 1 6 6c0 2.2-1.2 4.1-3 5.2V17H9v-2.8C7.2 13.1 6 11.2 6 9a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
    chevLeft:   <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    chevRight:  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ flexShrink: 0 }}>
      {paths[name]}
    </svg>
  )
}

// ── Lightbox (photos agrandies + navigation) ─────────────────────────────────
function Lightbox({ screenshots, index, onClose, onSetIndex }) {
  if (index === null || index === undefined || !screenshots?.length) return null

  const hasPrev = index > 0
  const hasNext = index < screenshots.length - 1

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft'  && hasPrev) onSetIndex(index - 1)
      if (e.key === 'ArrowRight' && hasNext) onSetIndex(index + 1)
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, hasPrev, hasNext])

  return (
    <div className="lightbox" onClick={onClose}>
      {hasPrev && (
        <button className="lightbox__nav lightbox__nav--prev" onClick={e => { e.stopPropagation(); onSetIndex(index - 1) }}>
          <Icon name="chevLeft" size={28} />
        </button>
      )}

      <img
        src={screenshots[index]}
        alt={`Capture ${index + 1}`}
        onClick={e => e.stopPropagation()}
      />

      {hasNext && (
        <button className="lightbox__nav lightbox__nav--next" onClick={e => { e.stopPropagation(); onSetIndex(index + 1) }}>
          <Icon name="chevRight" size={28} />
        </button>
      )}

      <button className="lightbox__close" onClick={onClose}>✕</button>

      {screenshots.length > 1 && (
        <div className="lightbox__counter">{index + 1} / {screenshots.length}</div>
      )}
    </div>
  )
}

// ── Modal projet ─────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose, onPrev, onNext }) {
  const [lightboxIdx, setLightboxIdx] = useState(null)

  useEffect(() => {
    const onKey = (e) => {
      if (lightboxIdx !== null) return
      if (e.key === 'ArrowLeft'  && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIdx, onPrev, onNext])

  // Reset lightbox when project changes
  useEffect(() => { setLightboxIdx(null) }, [project])

  if (!project) return null

  const youtubeEmbed = project.videoUrl
    ? project.videoUrl
        .replace('youtube.com/watch?v=', 'youtube.com/embed/')
        .replace('youtu.be/', 'youtube.com/embed/')
    : null

  return (
    <div className="modal-overlay" onClick={onClose}>

      {onPrev && (
        <button className="modal__nav modal__nav--prev" onClick={e => { e.stopPropagation(); onPrev() }}>
          <Icon name="chevLeft" size={24} />
        </button>
      )}

      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Fermer">✕</button>

        <div className="modal__header">
          <div>
            <span className="modal__category">{CATEGORY_LABELS[project.category] || project.category}</span>
            <h2 className="modal__title">{project.title}</h2>
          </div>
        </div>

        <div className="modal__meta">
          <span className="badge badge-notion">
            <Icon name="calendar" size={13} /> {project.date}
          </span>
          <span className="badge badge-notion">
            <Icon name="code" size={13} /> {project.lang}
          </span>
        </div>

        {project.description && (
          <div className="modal__section">
            <h3><Icon name="target" size={16} /> Objectif</h3>
            <p>{project.description}</p>
          </div>
        )}

        {project.notions?.length > 0 && (
          <div className="modal__section">
            <h3><Icon name="book" size={16} /> Notions travaillées</h3>
            <div className="modal__tags">
              {project.notions.map(n => (
                <span key={n} className="badge badge-notion">{n}</span>
              ))}
            </div>
          </div>
        )}

        {project.whatILearned && (
          <div className="modal__section">
            <h3><Icon name="bulb" size={16} /> Ce que j'ai appris</h3>
            <p className="modal__learned">{project.whatILearned}</p>
          </div>
        )}

        {project.schema && (
          <div className="modal__section">
            <h3><Icon name="map" size={16} /> Schéma</h3>
            <pre className="modal__schema">{project.schema}</pre>
          </div>
        )}

        {project.screenshots?.length > 0 && (
          <div className="modal__section">
            <h3><Icon name="image" size={16} /> Captures d'écran</h3>
            <div className="modal__screenshots">
              {project.screenshots.map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt={`Capture ${i + 1}`}
                  loading="lazy"
                  className="modal__screenshot-thumb"
                  onClick={() => setLightboxIdx(i)}
                />
              ))}
            </div>
          </div>
        )}

        {youtubeEmbed && (
          <div className="modal__section">
            <h3><Icon name="video" size={16} /> Démo</h3>
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
          <a
            href={project.category === 'projets' && project.repoLinks?.[0]?.url
              ? project.repoLinks[0].url
              : project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary"
          >
            Voir sur GitHub →
          </a>
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icon name="video" size={15} /> Démo live
            </a>
          )}
        </div>
      </div>

      {onNext && (
        <button className="modal__nav modal__nav--next" onClick={e => { e.stopPropagation(); onNext() }}>
          <Icon name="chevRight" size={24} />
        </button>
      )}

      <Lightbox
        screenshots={project.screenshots}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onSetIndex={setLightboxIdx}
      />
    </div>
  )
}

// ── Section Projets ───────────────────────────────────────────────────────────
export default function Projects() {
  const [filter, setFilter]       = useState('all')
  const [selectedIdx, setSelectedIdx] = useState(null)

  const categories = useMemo(() => [...new Set(projects.map(p => p.category))], [])

  const filtered = useMemo(() =>
    filter === 'all' ? projects : projects.filter(p => p.category === filter),
    [filter]
  )

  // Reset selection si le projet n'existe plus dans le filtre actif
  useEffect(() => { setSelectedIdx(null) }, [filter])

  if (projects.length === 0) {
    return (
      <section id="projects" className="projects">
        <div className="container">
          <span className="section-label">Projets</span>
          <h2 className="section-title">Mes exercices et projets</h2>
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
        <h2 className="section-title">Mes exercices et projets</h2>
        <p className="section-intro">
          {projects.length} projet{projects.length > 1 ? 's' : ''} — récupérés automatiquement
          depuis GitHub à chaque déploiement.
        </p>

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

        <div className="projects__grid stagger">
          {filtered.map((project, idx) => (
            <article
              key={project.id}
              className="project-card fade-up"
              onClick={() => setSelectedIdx(idx)}
            >
              <div className="project-card__top">
                <span className="project-card__category">
                  {CATEGORY_LABELS[project.category] || project.category}
                </span>
              </div>

              <h3 className="project-card__title">{project.title}</h3>

              {project.description && (
                <p className="project-card__desc">{project.description}</p>
              )}

              <div className="project-card__meta">
                <span className="project-card__lang">
                  <Icon name="code" size={13} /> {project.lang}
                </span>
                <span className="project-card__date">
                  <Icon name="calendar" size={13} /> {project.date}
                </span>
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
                {project.screenshots?.length > 0 && <Icon name="image" size={15} />}
                {project.videoUrl && <Icon name="video" size={15} />}
                {project.schema && <Icon name="map" size={15} />}
                <span className="project-card__cta">Voir le détail →</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedIdx !== null ? filtered[selectedIdx] : null}
        onClose={() => setSelectedIdx(null)}
        onPrev={selectedIdx > 0 ? () => setSelectedIdx(i => i - 1) : null}
        onNext={selectedIdx < filtered.length - 1 ? () => setSelectedIdx(i => i + 1) : null}
      />
    </section>
  )
}

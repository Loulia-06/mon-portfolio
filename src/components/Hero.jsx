import './Hero.css'

export default function Hero() {
  const scrollTo = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="hero" className="hero">
      <div className="hero__bg-lines" aria-hidden />

      <div className="container hero__inner">
        <div className="hero__content fade-up">
          <span className="section-label">Bonjour, je suis</span>

          <h1 className="hero__name">Loulia</h1>

          <p className="hero__sub">Étudiante en 2ᵉ année en informatique</p>

          <p className="hero__tagline">
            <em>Je construis, je rate, je recommence.</em>
          </p>

          <p className="hero__desc">
            Le bon script prend parfois du temps à s'écrire.
            Aujourd'hui je code, je rate, je recommence.
          </p>

          <div className="hero__actions">
            <button className="btn btn-primary" onClick={() => scrollTo('#projects')}>
              Voir mes projets
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo('#contact')}>
              Me contacter
            </button>
          </div>
        </div>

        <div className="hero__deco fade-up" style={{ animationDelay: '0.2s' }}>

          <div className="hero__stage-card">
            <p className="hero__alternance-label">Disponible pour un stage</p>
            <h3 className="hero__stage-title">Mi-juin — Fin sept.</h3>
            <div className="hero__alternance-details">
              <div className="hero__alternance-item">
                <span className="hero__alternance-value">~3 mois</span>
                <span className="hero__alternance-key">Durée du stage</span>
              </div>
            </div>
          </div>

          <div className="hero__alternance-card">
            <p className="hero__alternance-label">Disponible dès</p>
            <h3 className="hero__alternance-title">Octobre 2026</h3>
            <p className="hero__alternance-sub">Recherche alternance</p>
            <div className="hero__alternance-details">
              <div className="hero__alternance-item">
                <span className="hero__alternance-value">2 sem. / 1 sem.</span>
                <span className="hero__alternance-key">Rythme entreprise / école</span>
              </div>
              <div className="hero__alternance-item">
                <span className="hero__alternance-value">1 an ou 3 ans</span>
                <span className="hero__alternance-key">Durée du contrat</span>
              </div>
            </div>
            <p className="hero__alternance-cta-label">Travaillons ensemble</p>
            <a href="/cv.pdf" download="cv-loulia-tsui.pdf" className="btn btn-primary hero__alternance-btn">
              Télécharger mon CV
            </a>
          </div>

        </div>
      </div>

      <div className="hero__scroll-hint" onClick={() => scrollTo('#about')}>
        <span>Découvrir</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}

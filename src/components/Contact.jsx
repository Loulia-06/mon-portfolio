import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container contact__inner">

        <div className="contact__text fade-up">
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Travaillons<br /><em>ensemble</em>
          </h2>
          <p>
            Je suis disponible pour un <strong>stage dès mi-juin</strong> jusqu'à fin septembre (~2 ou 3 mois),
            et je recherche une <strong>alternance à partir d'octobre 2026</strong> sur un rythme de 2 semaines en entreprise / 1 semaine à l'école (1 an ou 3 ans).
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <a href="/cv_loulia_tsui_stage.pdf" download="cv-loulia-tsui-stage.pdf" className="btn btn-primary">
              Mon CV — Stage
            </a>
            <a href="/cv_loulia_tsui_alternance.pdf" download="cv-loulia-tsui-alternance.pdf" className="btn btn-primary">
              Mon CV — Alternance
            </a>
          </div>
        </div>

        <div className="contact__links fade-up" style={{ animationDelay: '0.15s' }}>

          <a
            href="https://github.com/Loulia-06"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85 0 1.7.11 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.33-.01 2.41-.01 2.74 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/>
              </svg>
            </span>
            <div>
              <span className="contact__link-label">GitHub</span>
              <span className="contact__link-sub">Loulia-06</span>
            </div>
            <span className="contact__link-arrow">→</span>
          </a>

          <a
            href="mailto:loulia.tsui@outlook.com"
            className="contact__link"
          >
            <span className="contact__link-icon">✉️</span>
            <div>
              <span className="contact__link-label">Email</span>
              <span className="contact__link-sub">M'écrire directement</span>
            </div>
            <span className="contact__link-arrow">→</span>
          </a>

          <a
            href="https://www.linkedin.com/in/louliatsui/"
            target="_blank"
            rel="noreferrer"
            className="contact__link"
          >
            <span className="contact__link-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z"/>
              </svg>
            </span>
            <div>
              <span className="contact__link-label">LinkedIn</span>
              <span className="contact__link-sub">Mon profil</span>
            </div>
            <span className="contact__link-arrow">→</span>
          </a>

        </div>

      </div>

      <footer className="contact__footer">
        <p>
          © {new Date().getFullYear()} Loulia — Portfolio fait avec React & Vite, déployé sur Vercel.
          <br />
          <span>Code source disponible sur <a href="https://github.com/Loulia-06/portfolio" target="_blank" rel="noreferrer">GitHub</a>.</span>
        </p>
      </footer>
    </section>
  )
}

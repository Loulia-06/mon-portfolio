import './About.css'

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container about__inner">

        <div className="about__text fade-up">
          <span className="section-label">À propos</span>
          <h2 className="section-title">Mon<br /><em>parcours</em></h2>

          <p>
            Un premier parcours en économie m'a appris une chose : ce qui me motive vraiment,
            c'est créer des choses concrètes.
          </p>

          <p>
            J'ai exploré l'UX, puis le code m'a attrapée — et je n'ai pas lâché.
          </p>

          <p>
            Ce portfolio ne montre pas un parcours parfait. Il montre <strong>un apprentissage honnête</strong>.
          </p>
        </div>

        <div className="about__cards fade-up" style={{ animationDelay: '0.15s' }}>
          <div className="about__card">
            <h3>Formation</h3>
            <p>2ᵉ année en informatique — formation généraliste (développement, infrastructure, et tout ce qui entoure l'informatique)</p>
          </div>
        </div>

      </div>
    </section>
  )
}

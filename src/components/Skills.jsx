import { skills } from '../data/skills.js'
import './Skills.css'

const CATEGORIES = [
  { key: 'language',  label: 'Langages'          },
  { key: 'frontend',  label: 'Frontend'           },
  { key: 'backend',   label: 'Backend'            },
  { key: 'bdd',       label: 'Base de données'    },
  { key: 'infra',     label: 'Infrastructure'     },
  { key: 'outils',    label: 'Outils dev'         },
  { key: 'design',    label: 'Design / UX'        },
  { key: 'cms',       label: 'CMS / Analytics'    },
  { key: 'gestion',   label: 'Gestion de projet'  },
]

const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons'

const SPECIAL_ICONS = {
  notion: 'https://svgl.app/library/notion.svg',
}

function SkillIcon({ icon, name }) {
  if (SPECIAL_ICONS[icon]) {
    return (
      <img
        src={SPECIAL_ICONS[icon]}
        alt={name}
        width="36"
        height="36"
        className="skill-item__img"
      />
    )
  }
  return (
    <img
      src={`${DEVICON_BASE}/${icon}/${icon}-original.svg`}
      alt={name}
      width="36"
      height="36"
      className="skill-item__img"
      onError={(e) => { e.currentTarget.style.display = 'none' }}
    />
  )
}

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="container">
        <span className="section-label">Compétences</span>
        <h2 className="section-title">Ce que j'apprends</h2>

        <div className="skills__grid fade-up stagger">
          {CATEGORIES.map(cat => {
            const catSkills = skills.filter(s => s.category === cat.key)
            if (!catSkills.length) return null

            return (
              <div key={cat.key} className="skills__group">
                <h3 className="skills__group-title">{cat.label}</h3>
                <div className="skills__list">
                  {catSkills.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <SkillIcon icon={skill.icon} name={skill.name} />
                      <span className="skill-item__name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

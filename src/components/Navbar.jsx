import { useState, useEffect } from 'react'
import './Navbar.css'

const LINKS = [
  { label: 'À propos',    href: '#about'    },
  { label: 'Compétences', href: '#skills'   },
  { label: 'Projets',     href: '#projects' },
  { label: 'Parcours',    href: '#journey'  },
  { label: 'Contact',     href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <a href="#hero" className="navbar__logo" onClick={e => handleLink(e, '#hero')}>
          <span className="navbar__logo-name">Loulia</span>
          <span className="navbar__logo-dot">·</span>
          <span className="navbar__logo-sub">portfolio</span>
        </a>

        <nav className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}>
          {LINKS.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="navbar__link"
              onClick={e => handleLink(e, l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

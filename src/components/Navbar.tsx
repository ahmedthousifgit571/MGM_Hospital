import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Phone, ArrowRight, Menu, X } from 'lucide-react'

interface Props {
  cinematicRef: React.RefObject<HTMLElement | null>
}

const LINKS: { label: string; id: string }[] = [
  { label: 'Services', id: 'specialities' },
  { label: 'Doctors', id: 'doctors' },
  { label: 'Departments', id: 'departments' },
  { label: 'About Us', id: 'about' },
  { label: 'Contact', id: 'appointment' },
]

export function Navbar({ cinematicRef }: Props) {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [condensed, setCondensed] = useState(false)
  const [lightMode, setLightMode] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!navRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -28,
        opacity: 0,
        duration: 1.1,
        delay: 0.5,
        ease: 'power3.out',
      })
    })
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!cinematicRef.current) return
    const el = cinematicRef.current
    const onScroll = () => {
      const y = window.scrollY
      setCondensed(y > 80)
      // Stay dark over cinematic + Centres (01, #000) only;
      // Doctors (02) is light so the pill switches to white as soon as Doctors begins.
      const centresEl = document.getElementById('centres')
      const darkBottom = el.offsetHeight + (centresEl?.offsetHeight ?? 0)
      setLightMode(y >= darkBottom - 120)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [cinematicRef])

  useEffect(() => {
    if (!menuRef.current) return
    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -12, pointerEvents: 'none' },
        { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.28, ease: 'power2.out' },
      )
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -8,
        pointerEvents: 'none',
        duration: 0.2,
        ease: 'power2.in',
      })
    }
  }, [menuOpen])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    gsap.to(window, { scrollTo: `#${id}`, duration: 1.2, ease: 'power3.inOut' })
  }

  /* ── Adaptive tokens ──────────────────────────────────────────── */
  const pillStyle = {
    maxWidth: '1080px',
    height: '64px',
    borderRadius: '999px',
    background: lightMode ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${lightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: lightMode
      ? '0 4px 32px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.04)'
      : '0 20px 60px rgba(0,0,0,0.25)',
    transition: 'background 0.45s ease, border-color 0.45s ease, box-shadow 0.45s ease',
  }

  const linkColor = lightMode ? 'rgba(17,24,39,0.82)' : 'rgba(255,255,255,0.92)'
  const logoTextColor = lightMode ? '#111827' : '#F5F2EB'
  const emergencyColor = lightMode ? 'rgba(17,24,39,0.82)' : 'rgba(255,255,255,0.92)'

  const hamburgerStyle = lightMode
    ? { background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.09)', color: '#111827' }
    : { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#F5F2EB' }

  const dropdownStyle = {
    background: lightMode ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${lightMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
    boxShadow: lightMode ? '0 8px 40px rgba(0,0,0,0.1)' : '0 20px 60px rgba(0,0,0,0.25)',
    borderRadius: '24px',
    padding: '8px',
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-10"
      style={{ paddingTop: condensed ? '8px' : '16px' }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Main pill */}
      <div className="flex items-center justify-center">
        <div
          className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 transition-all duration-500"
          style={pillStyle}
        >
          {/* Logo */}
          <button
            onClick={() => { setMenuOpen(false); gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' }) }}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0 shrink-0"
            aria-label="MGM Hospitals — scroll to top"
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <circle cx="16" cy="16" r="14" stroke="#f7b93b" strokeWidth="1.5" fill="none" />
              <path d="M11 21V11h2l3 5 3-5h2v10" stroke="#f7b93b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M16 11v10" stroke="#f7b93b" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
            </svg>
            <span className="flex items-baseline gap-1.5">
              <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '17px', color: logoTextColor, transition: 'color 0.45s ease' }}>
                MGM
              </span>
              <span
                className="hidden sm:inline"
                style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: logoTextColor, textTransform: 'uppercase' as const, transition: 'color 0.45s ease', opacity: 0.7 }}
              >
                Hospitals
              </span>
            </span>
          </button>

          {/* Centre links — desktop only */}
          <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
            {LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="nav-underline bg-transparent border-0 cursor-pointer px-4 py-2 rounded-full transition-colors duration-200"
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '15px',
                    color: linkColor,
                    transition: 'color 0.45s ease, background 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = lightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Emergency — desktop only */}
            <a
              href="tel:+911800000000"
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full transition-colors duration-200"
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px', color: emergencyColor, textDecoration: 'none', transition: 'color 0.45s ease' }}
              aria-label="Call emergency line"
            >
              <Phone size={15} strokeWidth={1.9} className="text-accent" aria-hidden />
              Emergency
            </a>

            {/* Book button */}
            <button
              onClick={() => scrollTo('appointment')}
              className="group flex items-center gap-1.5 sm:gap-2 transition-all duration-200 active:scale-[0.97] hover:scale-[1.03]"
              style={{
                background: '#f7b93b',
                color: '#111111',
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '13px',
                padding: '10px 14px',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(247,185,59,0.22)',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="hidden sm:inline" style={{ fontSize: '14px' }}>Book Consultation</span>
              <span className="inline sm:hidden">Consult</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 shrink-0" aria-hidden />
            </button>

            {/* Hamburger — mobile/tablet only */}
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200"
              style={{ ...hamburgerStyle, cursor: 'pointer', transition: 'background 0.45s ease, border-color 0.45s ease, color 0.45s ease' }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div
        ref={menuRef}
        className="lg:hidden mt-2 mx-auto"
        style={{ maxWidth: '1080px', opacity: 0, pointerEvents: 'none' }}
      >
        <div style={dropdownStyle}>
          {LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-full text-left px-5 py-3.5 rounded-2xl flex items-center justify-between"
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '15px', color: lightMode ? 'rgba(17,24,39,0.82)' : 'rgba(255,255,255,0.92)', background: 'transparent', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = lightMode ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {label}
              <ArrowRight size={14} style={{ color: '#f7b93b', opacity: 0.7 }} aria-hidden />
            </button>
          ))}
          <a
            href="tel:+911800000000"
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl"
            style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '15px', color: lightMode ? 'rgba(17,24,39,0.82)' : 'rgba(255,255,255,0.92)', textDecoration: 'none' }}
          >
            <Phone size={15} strokeWidth={1.9} style={{ color: '#f7b93b' }} aria-hidden />
            Emergency
          </a>
        </div>
      </div>
    </nav>
  )
}

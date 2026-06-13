import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone } from 'lucide-react'

interface Props {
  cinematicRef: React.RefObject<HTMLElement | null>
}

export function Navbar({ cinematicRef }: Props) {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!navRef.current || !cinematicRef.current) return

    const ctx = gsap.context(() => {
      // Smoothly transition to glass nav over the first ~15% of the flythrough
      ScrollTrigger.create({
        trigger: cinematicRef.current,
        start: 'top top',
        end: '15% top',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          if (!navRef.current) return
          const bg = `rgba(0,0,0,${p * 0.4})`
          const blur = `blur(${p * 20}px)`
          const borderOpacity = p * 0.12
          navRef.current.style.background = bg
          navRef.current.style.backdropFilter = blur
          ;(navRef.current.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = blur
          navRef.current.style.borderBottomColor = `rgba(255,255,255,${borderOpacity})`
        },
      })
    })

    return () => ctx.revert()
  }, [cinematicRef])

  const scrollTo = (id: string) => {
    gsap.to(window, { scrollTo: `#${id}`, duration: 1.2, ease: 'power3.inOut' })
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-transparent transition-none"
      style={{ willChange: 'background, backdrop-filter' }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Wordmark */}
      <button
        onClick={() => gsap.to(window, { scrollTo: 0, duration: 1.2, ease: 'power3.inOut' })}
        className="font-display font-black text-xl tracking-[0.12em] text-white cursor-pointer bg-transparent border-0 p-0"
        aria-label="MGM Hospitals — scroll to top"
      >
        MGM
        <span className="font-body font-light text-[10px] tracking-[0.4em] ml-2 align-middle" style={{ color: '#94A3B8' }}>
          HOSPITALS
        </span>
      </button>

      {/* Nav links — hidden on mobile */}
      <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
        {['Specialities', 'Doctors', 'About'].map((item) => (
          <li key={item}>
            <button
              onClick={() => scrollTo(item.toLowerCase())}
              className="font-body text-sm text-white/70 hover:text-white transition-colors duration-200 bg-transparent border-0 cursor-pointer p-0 tracking-wide"
            >
              {item}
            </button>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex items-center gap-3">
        <a
          href="tel:+911800000000"
          className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-body font-medium tracking-wide transition-colors duration-200 hover:bg-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}
          aria-label="Call emergency line"
        >
          <Phone size={13} aria-hidden />
          Emergency
        </a>
        <button
          onClick={() => scrollTo('appointment')}
          className="px-5 py-2 rounded-full text-xs font-body font-semibold tracking-wide transition-all duration-200 hover:brightness-110 hover:scale-105"
          style={{ background: '#D4AF37', color: '#000' }}
        >
          Book Appointment
        </button>
      </div>
    </nav>
  )
}

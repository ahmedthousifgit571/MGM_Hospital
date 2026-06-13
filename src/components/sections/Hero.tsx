import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'

interface Props {
  cinematicRef: RefObject<HTMLElement | null>
}

/**
 * Hero overlay — the only content shown during the cinematic flythrough.
 * Entrance animates in on load, then the whole block fades + blurs out over
 * the first ~25% of the cinematic scroll so the user watches the camera
 * travel into the building.
 */
export function Hero({ cinematicRef }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cinematicRef.current || !rootRef.current) return

    const ctx = gsap.context(() => {
      // Entrance (after loader fade)
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(headlineRef.current, { y: 40, opacity: 0, duration: 1.2, delay: 0.6 })
        .from(subRef.current, { y: 30, opacity: 0, duration: 1 }, '-=0.7')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(indicatorRef.current, { opacity: 0, duration: 0.6 }, '-=0.3')

      // Fade + blur out across the first 25% of the flythrough
      gsap.to(rootRef.current, {
        opacity: 0,
        y: -40,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: {
          trigger: cinematicRef.current,
          start: 'top top',
          end: '25% top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [cinematicRef])

  const scrollToAppointment = () => {
    gsap.to(window, { scrollTo: '#appointment', duration: 1.4, ease: 'power3.inOut' })
  }

  const scrollDown = () => {
    // Jump past the cinematic block into the content
    gsap.to(window, { scrollTo: window.innerHeight * 6.2, duration: 1.4, ease: 'power3.inOut' })
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {/* Label */}
      <p className="font-body text-[10px] tracking-[0.5em] mb-6 select-none" style={{ color: '#D4AF37' }}>
        MGM HOSPITALS
      </p>

      {/* Headline */}
      <h1
        ref={headlineRef}
        className="font-display font-black text-white leading-[0.95] mb-5 select-none"
        style={{
          fontSize: 'clamp(2.75rem, 8.5vw, 7rem)',
          letterSpacing: '-0.03em',
          textShadow: '0 2px 40px rgba(0,0,0,0.5)',
        }}
      >
        Advanced Healthcare.
        <br />
        <span style={{ color: '#D4AF37' }}>Human Compassion.</span>
      </h1>

      {/* Subheading */}
      <p
        ref={subRef}
        className="font-body text-white/70 max-w-lg text-base leading-relaxed mb-10 select-none"
        style={{ textShadow: '0 1px 20px rgba(0,0,0,0.6)' }}
      >
        World-class specialists, cutting-edge technology, and care that treats
        you as a person — not a patient number.
      </p>

      {/* CTAs */}
      <div ref={ctaRef} className="flex items-center gap-4 mb-16">
        <button
          onClick={scrollToAppointment}
          className="px-8 py-3.5 rounded-full font-body font-semibold text-sm tracking-wide transition-all duration-200 hover:brightness-110 hover:scale-105"
          style={{ background: '#D4AF37', color: '#000' }}
        >
          Book Appointment
        </button>
        <button
          onClick={scrollDown}
          className="px-8 py-3.5 rounded-full font-body font-medium text-sm tracking-wide border transition-colors duration-200 hover:bg-white/10"
          style={{ borderColor: 'rgba(255,255,255,0.35)', color: '#fff' }}
        >
          Explore
        </button>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={scrollDown}
        role="button"
        aria-label="Scroll to explore"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && scrollDown()}
      >
        <span className="font-body text-[9px] tracking-[0.35em] select-none" style={{ color: 'rgba(255,255,255,0.5)' }}>
          SCROLL
        </span>
        <ChevronDown size={16} className="scroll-bounce" style={{ color: 'rgba(255,255,255,0.5)' }} aria-hidden />
      </div>
    </div>
  )
}

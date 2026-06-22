import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ArrowRight, Play } from 'lucide-react'

interface Props {
  cinematicRef: RefObject<HTMLElement | null>
}

export function Hero({ cinematicRef }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const lineARef = useRef<HTMLSpanElement>(null)
  const lineBRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cinematicRef.current || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.6 })
        .from(labelRef.current, { y: 24, opacity: 0, duration: 0.8 })
        .from(lineARef.current, { y: 60, opacity: 0, duration: 1.2 }, '-=0.4')
        .from(lineBRef.current, { y: 60, opacity: 0, duration: 1.2 }, '-=0.75')
        .from(subRef.current, { y: 24, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')

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
  const explore = () => {
    gsap.to(window, { scrollTo: window.innerHeight * 6.2, duration: 1.4, ease: 'power3.inOut' })
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 flex items-center px-6 md:px-10"
      style={{ willChange: 'opacity, transform, filter' }}
    >
      {/* Aligned to match the navbar pill's internal left edge */}
      <div className="w-full max-w-[1080px] mx-auto pl-4 sm:pl-6 md:pl-10 pt-16">
        {/* Label */}
        <div ref={labelRef} className="flex items-center gap-4 mb-6 select-none">
          <span
            style={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase' as const,
              color: '#f7b93b',
            }}
          >
            Compassionate Care. Advanced Medicine.
          </span>
          <span className="hidden sm:block h-px w-12" style={{ background: 'rgba(247,185,59,0.6)' }} />
        </div>

        {/* Headline */}
        <h1 className="select-none mb-6" style={{ lineHeight: 0.88 }}>
          <span
            ref={lineARef}
            className="block"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(72px, 9.5vw, 180px)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase' as const,
              color: '#F5F2EB',
              textShadow: '0 4px 60px rgba(0,0,0,0.55)',
            }}
          >
            Healthcare
          </span>
          <span
            ref={lineBRef}
            className="block"
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(72px, 9.5vw, 180px)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase' as const,
              color: '#f7b93b',
            }}
          >
            Redefined
          </span>
        </h1>

        {/* Subheading — same label style, same current size */}
        <p
          ref={subRef}
          className="select-none mb-10"
          style={{
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 'clamp(14px, 2vw, 26px)',
            letterSpacing: 'clamp(0.06em, 1vw, 0.2em)',
            textTransform: 'uppercase',
            lineHeight: 1.6,
            color: '#F5F2EB',
            textShadow: '0 2px 24px rgba(0,0,0,0.7)',
          }}
        >
          Precision Medicine.<br />Human-First Care.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-5">
          {/* Primary — Book Consultation */}
          <button
            onClick={scrollToAppointment}
            className="group flex items-center gap-3 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: '#f7b93b',
              color: '#111111',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '14px',
              padding: '16px 32px',
              borderRadius: '16px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 15px 40px rgba(247,185,59,0.35)',
            }}
          >
            Book Consultation
            <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
          </button>

          {/* Secondary — Watch Our Video (liquid glass, same size as primary) */}
          <button
            onClick={explore}
            className="group flex items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
            style={{
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.28)',
              backdropFilter: 'blur(28px) saturate(160%)',
              WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              borderRadius: '16px',
              padding: '16px 32px',
              color: '#ffffff',
              boxShadow: '0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.18)',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: 1,
            }}
            aria-label="Watch our video"
          >
            <Play size={15} className="ml-0.5 fill-white text-white shrink-0" aria-hidden />
            Watch Our Video
          </button>
        </div>
      </div>
    </div>
  )
}

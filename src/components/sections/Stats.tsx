import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SPECIALITIES = [
  'Cardiac Sciences',
  'Neurosurgery',
  'Oncology',
  'Orthopedics',
  'Emergency Medicine',
  'Gastro Sciences',
  'Paediatrics & Neonatology',
  'Pulmonology',
  'Renal Sciences',
  'Heart & Lung Transplant',
  'Liver Diseases & Transplant',
  "Women's Health & Obstetrics",
  'Internal Medicine',
  'Anaesthesiology & SICU',
  'Multi-Visceral Organ Transplant',
]

const PILL_BASE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.6rem 1.25rem',
  borderRadius: '999px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  color: 'rgba(255,255,255,0.75)',
  background: 'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.03) 100%)',
  border: '1px solid rgba(255,255,255,0.12)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  outline: 'none',
  userSelect: 'none',
}

export function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const st = (start: string) => ({
        trigger: sectionRef.current,
        start,
        once: true,
      })

      if (!prefersReduced) {
        // Eyebrow row
        gsap.from('[data-eyebrow]', {
          opacity: 0, y: 16, filter: 'blur(4px)',
          duration: 0.7, ease: 'power3.out',
          scrollTrigger: st('top 80%'),
        })

        // Headline word stagger
        gsap.from('[data-headline-word]', {
          opacity: 0, y: 32, filter: 'blur(6px)',
          duration: 0.9, stagger: 0.08, ease: 'power4.out',
          delay: 0.1,
          scrollTrigger: st('top 80%'),
        })

        // Gold hairline scaleX left → right
        gsap.from('[data-divider]', {
          scaleX: 0, transformOrigin: 'left center',
          duration: 1.1, ease: 'power3.inOut', delay: 0.35,
          scrollTrigger: st('top 80%'),
        })

        // Sub-copy
        gsap.from('[data-subcopy]', {
          opacity: 0, y: 20,
          duration: 0.8, ease: 'power3.out', delay: 0.5,
          scrollTrigger: st('top 80%'),
        })

        // Pills cascade
        gsap.from('[data-spec-pill]', {
          opacity: 0, y: 16, scale: 0.92, filter: 'blur(4px)',
          duration: 0.5, stagger: 0.04, ease: 'power3.out', delay: 0.55,
          scrollTrigger: st('top 75%'),
        })
      }

      // Count-up on "15" (instant when reduced motion)
      const counter = { val: 0 }
      gsap.to(counter, {
        val: 15,
        duration: prefersReduced ? 0 : 1.8,
        ease: 'power2.out',
        onUpdate() {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(counter.val))
          }
        },
        scrollTrigger: st('top 70%'),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onPillEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      background: 'linear-gradient(135deg,rgba(247,185,59,0.15) 0%,rgba(247,185,59,0.05) 100%)',
      borderColor: 'rgba(247,185,59,0.45)',
      color: '#FFFFFF',
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const onPillLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      background: 'linear-gradient(135deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.03) 100%)',
      borderColor: 'rgba(255,255,255,0.12)',
      color: 'rgba(255,255,255,0.75)',
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <section
      id="centres"
      ref={sectionRef}
      style={{
        background: '#000',
        padding: 'clamp(6rem, 12vh, 10rem) clamp(2rem, 8vw, 8rem)',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>

        {/* ── ACT 1: Statement ─────────────────────────────── */}
        <div
          className="grid grid-cols-12 gap-x-8 items-end"
          style={{ marginBottom: 'clamp(2rem, 4vh, 3rem)' }}
        >
          {/* Eyebrow row — full width */}
          <div
            data-eyebrow
            className="col-span-12 flex items-center justify-between"
            style={{ marginBottom: '2.5rem' }}
          >
            <div className="flex items-center gap-4">
              <span
                style={{
                  fontFamily: '"JetBrains Mono","Courier New",monospace',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.25em',
                }}
              >
                01
              </span>
              <span
                style={{
                  fontFamily: 'Inter,sans-serif',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.32em',
                  color: 'rgba(255,255,255,0.4)',
                }}
              >
                Centres of excellence
              </span>
            </div>

            {/* Department count — top right */}
            <div className="flex items-baseline gap-2">
              <span
                ref={countRef}
                style={{
                  fontFamily: '"Bebas Neue",sans-serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                  color: '#f7b93b',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}
              >
                0
              </span>
              <span
                style={{
                  fontFamily: 'Inter,sans-serif',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.26em',
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                Departments
              </span>
            </div>
          </div>

          {/* Headline — occupies cols 1–7 */}
          <div className="col-span-12 lg:col-span-7">
            <h2
              style={{
                fontFamily: '"Bebas Neue",sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: 0,
              }}
            >
              <span data-headline-word style={{ display: 'inline-block' }}>DEPTH</span>{' '}
              <span data-headline-word style={{ display: 'inline-block' }}>ACROSS</span>{' '}
              <span data-headline-word style={{ display: 'inline-block' }}>EVERY</span>
              <br />
              <span
                data-headline-word
                style={{ display: 'inline-block', color: '#f7b93b', fontStyle: 'italic' }}
              >
                SPECIALITY.
              </span>
            </h2>
          </div>

          {/* Sub-copy — cols 9–12, pinned to headline baseline (desktop) */}
          <div
            data-subcopy
            className="hidden lg:flex lg:col-span-4 lg:col-start-9 items-end"
            style={{ paddingBottom: '0.4rem' }}
          >
            <p
              style={{
                fontFamily: 'Inter,sans-serif',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Senior specialists. Advanced technology.<br />
              Every condition treated at the highest standard.
            </p>
          </div>

          {/* Sub-copy — mobile (below headline) */}
          <p
            className="col-span-12 lg:hidden"
            style={{
              fontFamily: 'Inter,sans-serif',
              fontSize: '0.95rem',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.65,
              margin: '1.5rem 0 0',
            }}
          >
            Senior specialists. Advanced technology.
            Every condition treated at the highest standard.
          </p>
        </div>

        {/* Gold hairline — scaleX reveals left → right */}
        <div
          data-divider
          style={{
            width: '100%',
            height: '1px',
            background: '#f7b93b',
            marginBottom: 'clamp(3rem, 6vh, 4rem)',
          }}
        />

        {/* ── ACT 2: Glassmorphism pills ───────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {SPECIALITIES.map((name) => (
            <button
              key={name}
              data-spec-pill
              style={PILL_BASE}
              onMouseEnter={onPillEnter}
              onMouseLeave={onPillLeave}
            >
              {name}
            </button>
          ))}
        </div>

      </div>
    </section>
  )
}

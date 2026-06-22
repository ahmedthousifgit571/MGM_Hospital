import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/hooks/useReveal'
import SplitText from '@/components/SplitText'

gsap.registerPlugin(ScrollTrigger)

const STORY_PARAGRAPHS = [
  'Mr. Ramesh Kumar, a 58-year-old businessman, visited MGM Hospitals after experiencing frequent chest discomfort, fatigue, and shortness of breath during routine activities.',
  'After a comprehensive cardiac evaluation — including ECG, Echocardiography, and advanced diagnostic testing — our team identified an early-stage coronary artery condition requiring immediate attention.',
  'Under the guidance of our experienced cardiologists, Mr. Ramesh received personalised treatment, lifestyle counselling, and continuous monitoring. Within weeks, he experienced significant improvement in energy, cardiovascular health, and overall quality of life.',
  'Today, Mr. Ramesh leads an active and healthy lifestyle and remains grateful for the timely diagnosis and compassionate care he received at MGM Hospitals.',
]

export function About() {
  const ref = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  useReveal(ref)

  useEffect(() => {
    if (!imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          opacity: 1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 82%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      data-theme="dark"
      className="relative min-h-screen flex items-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="relative w-full max-w-350 mx-auto grid lg:grid-cols-2 gap-x-20 gap-y-16 items-center">

        {/* ── Left: gold spine + patient story ─────────────────── */}
        <div className="relative">
          <span aria-hidden className="absolute left-0 top-0 bottom-0 w-0.75 bg-accent/70" />

          <div className="pl-8 md:pl-14">

            {/* Section index + eyebrow */}
            <div data-reveal className="flex items-center gap-4 mb-4">
              <span className="font-body text-xs text-muted">03</span>
              <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">Who we are</span>
            </div>

            {/* Patient story tag */}
            <p
              data-reveal
              className="font-body uppercase text-accent mb-8"
              style={{ fontSize: '10px', letterSpacing: '0.32em' }}
            >
              Patient Success Story
            </p>

            {/* Headline — "Heart Health" in gold with SplitText */}
            <h2
              className="font-display font-medium text-soft mb-10"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            >
              Regaining{' '}
              <SplitText
                tag="span"
                text="Heart Health"
                className="text-accent"
                delay={50}
                duration={0.7}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 32 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.15}
                rootMargin="-50px"
                textAlign="left"
              />
              {' '}with Expert Cardiac Care
            </h2>

            {/* Story paragraphs */}
            <div className="space-y-5">
              {STORY_PARAGRAPHS.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  className="font-body font-light leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.9rem, 1.25vw, 1.02rem)',
                    color: i === STORY_PARAGRAPHS.length - 1 ? 'var(--color-muted)' : 'var(--color-body)',
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* View All Stories CTA */}
            <div data-reveal className="mt-12">
              <Link
                href="/stories"
                className="group inline-flex items-center gap-3"
                style={{ textDecoration: 'none' }}
                onMouseEnter={e => {
                  const btn = e.currentTarget.querySelector<HTMLElement>('[data-btn]')
                  if (btn) btn.style.background = '#e5a82a'
                }}
                onMouseLeave={e => {
                  const btn = e.currentTarget.querySelector<HTMLElement>('[data-btn]')
                  if (btn) btn.style.background = '#f7b93b'
                }}
              >
                {/* Solid gold pill */}
                <span
                  data-btn
                  className="inline-flex items-center gap-2.5"
                  style={{
                    background: '#f7b93b',
                    color: '#111111',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '14px 28px',
                    borderRadius: '14px',
                    transition: 'background 0.25s ease',
                    boxShadow: '0 8px 32px rgba(247,185,59,0.35), 0 2px 8px rgba(247,185,59,0.2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  View All Stories
                  <ArrowRight
                    size={15}
                    strokeWidth={2.5}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>

                {/* Ghost counter badge */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid rgba(247,185,59,0.3)',
                    background: 'rgba(247,185,59,0.07)',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: 'rgba(247,185,59,0.8)',
                    flexShrink: 0,
                  }}
                >
                  6
                </span>
              </Link>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '10px',
                  letterSpacing: '0.04em',
                }}
              >
                6 patient stories across all specialities
              </p>
            </div>

          </div>
        </div>

        {/* ── Right: cardio image ───────────────────────────────── */}
        <div className="w-full overflow-hidden rounded-2xl" style={{ minHeight: '520px' }}>
          <img
            ref={imgRef}
            src="/assets/cardio.png"
            alt="Cardiac care at MGM Hospitals"
            className="w-full h-full object-cover"
            style={{ minHeight: '520px', opacity: 0 }}
          />
        </div>

      </div>
    </section>
  )
}

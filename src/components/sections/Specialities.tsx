import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

gsap.registerPlugin(ScrollTrigger)

export function Specialities() {
  const ref = useRef<HTMLElement>(null)
  const imgWrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  useReveal(ref)

  /* Horizontal wipe reveal for the image */
  useEffect(() => {
    if (!imgWrapRef.current || !imgRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgWrapRef.current,
        { clipPath: 'inset(0% 100% 0% 0% round 1.5rem)' },
        {
          clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
          duration: 1.5,
          ease: 'power4.inOut',
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 82%', once: true },
        },
      )
      /* Subtle Ken-Burns zoom on the image itself */
      gsap.fromTo(
        imgRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: imgWrapRef.current, start: 'top 82%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="specialities"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto">

        <SectionHeader
          index="04"
          eyebrow="Our specialities"
          title="Depth in every department."
          className="mb-14"
        />

        {/* ── Featured image ────────────────────────────────────── */}
        <div
          ref={imgWrapRef}
          className="relative w-full overflow-hidden"
          style={{
            borderRadius: '1.5rem',
            height: 'clamp(300px, 58vh, 560px)',
            marginBottom: '3.5rem',
          }}
        >
          <img
            ref={imgRef}
            src="/assets/doctorsLife.png"
            alt="MGM Hospitals team"
            className="w-full h-full object-cover"
            style={{ transformOrigin: 'center center' }}
          />

          {/* Left-to-right gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(5,8,13,0.68) 0%, rgba(5,8,13,0.3) 45%, rgba(5,8,13,0.05) 100%)',
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to top, rgba(5,8,13,0.5) 0%, transparent 50%)',
            }}
          />

          {/* Overlay copy */}
          <div
            className="absolute bottom-0 left-0"
            style={{ padding: 'clamp(1.75rem, 4vw, 3rem)' }}
          >
            <p
              className="font-body uppercase text-white/50"
              style={{ fontSize: '10px', letterSpacing: '0.3em', marginBottom: '0.75rem' }}
            >
              MGM Hospitals
            </p>
            <h3
              className="font-display font-medium text-white"
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                maxWidth: '20ch',
              }}
            >
              Where expertise meets{' '}
              <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>compassion.</span>
            </h3>
          </div>

          {/* Corner badge */}
          <div
            className="absolute top-5 right-5 flex items-center gap-2"
            style={{
              background: 'rgba(255,255,255,0.09)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.14)',
              borderRadius: '999px',
              padding: '8px 16px',
            }}
          >
            <span
              className="font-body text-white/70"
              style={{ fontSize: '11px', letterSpacing: '0.12em' }}
            >
              15 Departments
            </span>
            <span
              className="block rounded-full"
              style={{ width: '6px', height: '6px', background: '#f7b93b' }}
            />
          </div>
        </div>

        {/* ── Bottom row: tagline + CTA ─────────────────────────── */}
        <div
          data-reveal
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
        >
          <p
            className="font-body font-light text-muted leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)', maxWidth: '52ch' }}
          >
            From cardiology and neurology to orthopaedics and paediatrics — MGM brings
            specialists, technology, and compassionate care together under one roof.
          </p>

          {/* CTA button */}
          <Link
            to="/gallery"
            className="group shrink-0"
            style={{ textDecoration: 'none' }}
          >
            <span
              className="inline-flex items-center gap-3"
              style={{
                background: '#0B0F14',
                color: '#F5F2EB',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '16px 28px',
                borderRadius: '14px',
                transition: 'background 0.25s ease, box-shadow 0.25s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = '#f7b93b'
                ;(e.currentTarget as HTMLElement).style.color = '#111'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(247,185,59,0.3)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = '#0B0F14'
                ;(e.currentTarget as HTMLElement).style.color = '#F5F2EB'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,0,0,0.14)'
              }}
            >
              Explore Hospital Facilities
              <ArrowRight
                size={15}
                strokeWidth={2.2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </Link>
        </div>

      </div>
    </section>
  )
}

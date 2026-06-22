'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  { src: '/assets/hospitalinfra1.png',  label: 'Main Entrance & Reception' },
  { src: '/assets/hostpitalinfra2.png', label: 'Advanced Diagnostic Centre' },
  { src: '/assets/hospitalinfra3.png',  label: 'Surgical Suite' },
  { src: '/assets/hostpitalinfra4.png', label: 'Patient Care Wards' },
  { src: '/assets/hospitalinfra5.png',  label: 'Rehabilitation & Recovery' },
]

/* ─────────────────────────────────────────────────────────────── */
/*  Lightbox                                                       */
/* ─────────────────────────────────────────────────────────────── */
function Lightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(imgRef.current, { scale: 0.94, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.06 })
    })
    return () => ctx.revert()
  }, [])

  /* Animate image swap on index change */
  useEffect(() => {
    if (!imgRef.current) return
    gsap.fromTo(imgRef.current, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' })
  }, [index])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const item = IMAGES[index]

  return (
    <div
      ref={overlayRef}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(5,8,13,0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1.5rem', right: '1.5rem',
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 10, transition: 'background 0.2s ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.18)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
      >
        <X size={18} strokeWidth={2} color="white" />
      </button>

      {/* Prev */}
      <button
        onClick={onPrev}
        style={{
          position: 'absolute', left: 'clamp(0.75rem, 3vw, 2rem)', top: '50%', transform: 'translateY(-50%)',
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background 0.2s ease',
          opacity: index === 0 ? 0.3 : 1,
        }}
        disabled={index === 0}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(247,185,59,0.18)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)')}
      >
        <ChevronLeft size={20} strokeWidth={1.8} color="white" />
      </button>

      {/* Next */}
      <button
        onClick={onNext}
        style={{
          position: 'absolute', right: 'clamp(0.75rem, 3vw, 2rem)', top: '50%', transform: 'translateY(-50%)',
          width: '48px', height: '48px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background 0.2s ease',
          opacity: index === IMAGES.length - 1 ? 0.3 : 1,
        }}
        disabled={index === IMAGES.length - 1}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(247,185,59,0.18)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)')}
      >
        <ChevronRight size={20} strokeWidth={1.8} color="white" />
      </button>

      {/* Image + caption */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', maxWidth: '1000px', width: '100%' }}>
        <img
          ref={imgRef}
          src={item.src}
          alt={item.label}
          style={{
            width: '100%',
            maxHeight: '72vh',
            objectFit: 'contain',
            borderRadius: '1rem',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <p style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.88)', letterSpacing: '0.02em' }}>
            {item.label}
          </p>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.12em' }}>
            {index + 1} / {IMAGES.length}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Page                                                           */
/* ─────────────────────────────────────────────────────────────── */
export function GalleryPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  /* Hero entrance */
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll('[data-hero]'),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* Grid entrance */
  useEffect(() => {
    if (!gridRef.current) return
    const items = gridRef.current.querySelectorAll('[data-img]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.8, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true },
        },
      )
    }, gridRef)
    return () => ctx.revert()
  }, [])

  const handlePrev = () => setLightboxIndex(i => (i !== null ? Math.max(0, i - 1) : 0))
  const handleNext = () => setLightboxIndex(i => (i !== null ? Math.min(IMAGES.length - 1, i + 1) : 0))

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Dark Hero ──────────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          background: '#0B0F14',
          padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 8vw, 8rem)',
          minHeight: '48vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top bar */}
        <div data-hero style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0 }}>
          <Link
            href="/"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back to Home
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#f7b93b" strokeWidth="1.5" fill="none" />
              <path d="M11 21V11h2l3 5 3-5h2v10" stroke="#f7b93b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ color: '#F5F2EB', fontWeight: 700, fontSize: '15px' }}>MGM</span>
            <span style={{ color: 'rgba(245,242,235,0.45)', fontWeight: 300, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase' }}>Hospitals</span>
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ marginTop: 'clamp(4rem, 8vh, 7rem)' }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>04</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>Our Facilities</span>
          </div>
          <div data-hero style={{ width: '4rem', height: '1px', background: '#f7b93b', marginBottom: '2rem', opacity: 0 }} />
          <h1
            data-hero
            style={{
              fontFamily: 'var(--font-display, "Playfair Display", serif)',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 500,
              color: '#F5F2EB',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              maxWidth: '18ch',
              margin: 0,
              opacity: 0,
            }}
          >
            Built for the{' '}
            <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>moments that matter.</span>
          </h1>
          <p
            data-hero
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              marginTop: '1.5rem',
              maxWidth: '44ch',
              lineHeight: 1.75,
              opacity: 0,
            }}
          >
            A look inside MGM Hospitals — the infrastructure, technology, and spaces designed to deliver world-class care.
          </p>
        </div>
      </div>

      {/* ── Gallery Grid ───────────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(4rem, 8vh, 7rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div
          ref={gridRef}
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows: 'auto',
            gap: '1rem',
          }}
        >
          {/* Large feature: col 1-8, row 1 */}
          <div
            data-img
            onClick={() => setLightboxIndex(0)}
            style={{
              gridColumn: '1 / 9',
              gridRow: '1',
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              cursor: 'pointer',
              height: 'clamp(260px, 42vh, 440px)',
              opacity: 0,
            }}
          >
            <GalleryItem src={IMAGES[0].src} label={IMAGES[0].label} />
          </div>

          {/* Right stack: col 9-12, row 1 (two stacked) */}
          <div
            data-img
            onClick={() => setLightboxIndex(1)}
            style={{
              gridColumn: '9 / 13',
              gridRow: '1',
              position: 'relative',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              cursor: 'pointer',
              height: 'clamp(260px, 42vh, 440px)',
              opacity: 0,
            }}
          >
            <GalleryItem src={IMAGES[1].src} label={IMAGES[1].label} />
          </div>

          {/* Bottom row: 3 equal cols */}
          {[2, 3, 4].map((imgIdx, colIdx) => (
            <div
              key={imgIdx}
              data-img
              onClick={() => setLightboxIndex(imgIdx)}
              style={{
                gridColumn: `${colIdx * 4 + 1} / ${colIdx * 4 + 5}`,
                gridRow: '2',
                position: 'relative',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                cursor: 'pointer',
                height: 'clamp(200px, 30vh, 320px)',
                opacity: 0,
              }}
            >
              <GalleryItem src={IMAGES[imgIdx].src} label={IMAGES[imgIdx].label} />
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            maxWidth: '1400px',
            margin: '3rem auto 0',
            fontFamily: 'Inter',
            fontSize: '12px',
            color: 'rgba(13,17,23,0.35)',
            letterSpacing: '0.06em',
            textAlign: 'center',
          }}
        >
          Click any image to view full screen · {IMAGES.length} facilities
        </p>

        {/* Back to home */}
        <div style={{ maxWidth: '1400px', margin: '4rem auto 0', textAlign: 'center' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: '#0B0F14', color: '#F5F2EB',
              fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Gallery item with hover overlay                               */
/* ─────────────────────────────────────────────────────────────── */
function GalleryItem({ src, label }: { src: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={label}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'transform 0.6s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
      />
      {/* Label overlay */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(5,8,13,0.72) 0%, transparent 55%)',
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.4s ease',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.5rem',
          transform: hovered ? 'translateY(0)' : 'translateY(6px)',
          opacity: hovered ? 1 : 0,
          transition: 'transform 0.4s ease, opacity 0.4s ease',
        }}
      >
        <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 500, color: 'white', letterSpacing: '0.02em' }}>
          {label}
        </p>
        <p style={{ fontFamily: 'Inter', fontSize: '10px', color: '#f7b93b', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '4px' }}>
          View Full Size
        </p>
      </div>
    </div>
  )
}

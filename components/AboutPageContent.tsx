'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STORY_PARAGRAPHS = [
  'Mr. Ramesh Kumar, a 58-year-old businessman, visited MGM Hospitals after experiencing frequent chest discomfort, fatigue, and shortness of breath during routine activities.',
  'After a comprehensive cardiac evaluation — including ECG, Echocardiography, and advanced diagnostic testing — our team identified an early-stage coronary artery condition requiring immediate attention.',
  'Under the guidance of our experienced cardiologists, Mr. Ramesh received personalised treatment, lifestyle counselling, and continuous monitoring. Within weeks, he experienced significant improvement in energy, cardiovascular health, and overall quality of life.',
  'Today, Mr. Ramesh leads an active and healthy lifestyle and remains grateful for the timely diagnosis and compassionate care he received at MGM Hospitals.',
]

const VALUES = [
  { title: 'Compassionate Care', body: 'Every patient is treated as family — with empathy, dignity, and round-the-clock attention.' },
  { title: 'Clinical Excellence', body: 'Multispeciality expertise backed by advanced diagnostics and evidence-based treatment.' },
  { title: 'Always Open', body: 'Emergency and critical care services available 24 hours, every day of the year.' },
]

export function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)

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

        <div style={{ marginTop: 'clamp(4rem, 8vh, 7rem)' }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>01</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>About Us</span>
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
              maxWidth: '20ch',
              margin: 0,
              opacity: 0,
            }}
          >
            Compassionate care, <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>advanced medicine.</span>
          </h1>
          <p
            data-hero
            style={{
              fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              marginTop: '1.5rem',
              maxWidth: '50ch',
              lineHeight: 1.75,
              opacity: 0,
            }}
          >
            MGM Hospitals brings together specialists, technology, and human-first care to deliver
            precision medicine across every department.
          </p>
        </div>
      </div>

      {/* ── Values ─────────────────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: 'clamp(4rem, 8vh, 6rem)' }}>
            {VALUES.map(v => (
              <div key={v.title} style={{ borderTop: '2px solid #f7b93b', paddingTop: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontSize: '1.3rem', color: '#0D1117', marginBottom: '0.6rem' }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: '0.92rem', color: 'rgba(13,17,23,0.6)', lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>

          {/* ── Patient story ──────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center' }} className="grid lg:grid-cols-2">
            <div>
              <p style={{ fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: '#f7b93b', marginBottom: '1rem' }}>
                Patient Success Story
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display, "Playfair Display", serif)',
                  fontSize: 'clamp(1.9rem, 3.6vw, 2.6rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  color: '#0D1117',
                  marginBottom: '1.5rem',
                }}
              >
                Regaining <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>Heart Health</span> with Expert Cardiac Care
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {STORY_PARAGRAPHS.map((p, i) => (
                  <p
                    key={i}
                    style={{
                      fontSize: '0.95rem',
                      lineHeight: 1.75,
                      color: i === STORY_PARAGRAPHS.length - 1 ? 'rgba(13,17,23,0.5)' : 'rgba(13,17,23,0.75)',
                      fontWeight: i === STORY_PARAGRAPHS.length - 1 ? 300 : 400,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
              <Link
                href="/stories"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginTop: '2rem',
                  background: '#f7b93b', color: '#111111', fontWeight: 700, fontSize: '13px',
                  letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 26px',
                  borderRadius: '14px', textDecoration: 'none',
                }}
              >
                View All Stories
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
            <div style={{ width: '100%', minHeight: '420px', borderRadius: '1.5rem', overflow: 'hidden' }}>
              <img src="/assets/cardio.png" alt="Cardiac care at MGM Hospitals" style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '420px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

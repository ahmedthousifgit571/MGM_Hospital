'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, Brain, Bone, Baby, Siren, Stethoscope } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DEPARTMENTS = [
  { name: 'Cardiology', icon: Heart, desc: 'Comprehensive heart care — from diagnostics to interventional cardiology.' },
  { name: 'Neurology', icon: Brain, desc: 'Stroke care, neuro-rehabilitation, and management of complex neurological conditions.' },
  { name: 'Orthopedics', icon: Bone, desc: 'Joint replacement, sports injury, and trauma care to restore mobility.' },
  { name: 'Pediatrics', icon: Baby, desc: 'Round-the-clock newborn and child care from infancy through adolescence.' },
  { name: 'Emergency Medicine', icon: Siren, desc: '24x7 critical and emergency care with rapid response teams.' },
  { name: 'General Medicine', icon: Stethoscope, desc: 'Holistic diagnosis and treatment for everyday and chronic conditions.' },
]

export function DepartmentsPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-card]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: gridRef.current, start: 'top 80%', once: true } },
      )
    }, gridRef)
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
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>02</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>Services</span>
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
            Depth in <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>every department.</span>
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
            From cardiology and neurology to orthopaedics and paediatrics — MGM brings specialists,
            technology, and compassionate care together under one roof.
          </p>
        </div>
      </div>

      {/* ── Department grid ───────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div
          ref={gridRef}
          style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
        >
          {DEPARTMENTS.map(({ name, icon: Icon, desc }) => (
            <div
              key={name}
              data-card
              style={{ background: '#fff', borderRadius: '1.25rem', padding: '2rem', border: '1px solid rgba(0,0,0,0.06)', opacity: 0 }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(247,185,59,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Icon size={20} strokeWidth={1.6} color="#f7b93b" />
              </div>
              <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontSize: '1.2rem', color: '#0D1117', marginBottom: '0.6rem' }}>
                {name}
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'rgba(13,17,23,0.6)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '1200px', margin: '3rem auto 0', textAlign: 'center' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: '#0B0F14', color: '#F5F2EB',
              fontWeight: 600, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
            }}
          >
            Book a Consultation
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </div>
  )
}

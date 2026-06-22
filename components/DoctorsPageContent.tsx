'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DOCTORS = [
  { name: 'Dr. Vivek Chaitanya',        dept: 'Cardiology & Diabetology',   qual: 'M.D., P.G.D.C.C.F.C.DIAB',    grad: ['#0C1B3A', '#1A3A6B'] },
  { name: 'Dr. Aiswarya Karuppasamy',   dept: 'Emergency & Critical',       qual: 'MBBS, MEM, FITB',               grad: ['#1A0A2E', '#3D1A6E'] },
  { name: 'Dr. Pavan Kumar Chilakala',  dept: 'Emergency & Critical',       qual: 'MBBS, DNB, FCCM',               grad: ['#0F2545', '#183566'] },
  { name: 'Dr. Umamaheswar Rao',        dept: 'Paediatrics',                qual: 'M.D.',                          grad: ['#0C2318', '#164430'] },
  { name: 'Dr. Archana',                dept: 'Cosmetic Dental Surgery',    qual: 'B.D.S',                         grad: ['#1C0A20', '#3D1444'] },
  { name: 'Dr. Rapuru Sumanth',         dept: 'General Surgery',            qual: 'MBBS, Lap & General Surgery',   grad: ['#1A2010', '#2E3A1A'] },
  { name: 'Dr. D. Muni Rajya Lakshmi', dept: 'Gynaecology & Obstetrics',   qual: 'MBBS, MS (OBGYN) AIIMS',       grad: ['#2A0A1A', '#5C1A3A'] },
  { name: 'Dr. Karthik',                dept: 'Orthopedic',                 qual: 'M.S Ortho',                     grad: ['#0A1A2A', '#1A3A5A'] },
  { name: 'Dr. Mounika',                dept: 'Anesthesia',                 qual: 'MBBS, DA',                      grad: ['#1A100A', '#3A200A'] },
  { name: 'Dr. Ponni',                  dept: 'Senior Medical Officer',     qual: 'MBBS',                          grad: ['#0A2020', '#1A4040'] },
  { name: 'Dr. Kiran Kumar',            dept: 'Senior Medical Officer',     qual: 'MBBS',                          grad: ['#201A0A', '#40340A'] },
  { name: 'Dr. Razak',                  dept: 'Senior Medical Officer',     qual: 'MBBS',                          grad: ['#0A0A20', '#1A1A40'] },
  { name: 'Dr. Mallikarjun Raju',       dept: 'Senior Medical Officer',     qual: 'MBBS',                          grad: ['#1A0A0A', '#3A1010'] },
  { name: 'Dr. Parthiban',              dept: 'Duty Medical Officer',       qual: 'MBBS',                          grad: ['#0A201A', '#1A4034'] },
  { name: 'Dr. Naveen',                 dept: 'Duty Medical Officer',       qual: 'Pharm.D',                       grad: ['#1A0A20', '#341A40'] },
  { name: 'Dr. Pavan Kumar',            dept: 'Duty Medical Officer',       qual: 'Pharm.D',                       grad: ['#201A0A', '#403410'] },
  { name: 'Dr. Prasanth',               dept: 'Duty Medical Officer',       qual: 'Pharm.D',                       grad: ['#0A1A20', '#1A3440'] },
  { name: 'Dr. Sweetha',                dept: 'Duty Medical Officer',       qual: 'Pharm.D',                       grad: ['#200A1A', '#401A30'] },
  { name: 'Dr. Abishek',                dept: 'Duty Medical Officer',       qual: 'Pharm.D',                       grad: ['#0A200A', '#1A401A'] },
]

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.|G\.)\s*/i, '')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('')
}

export function DoctorsPage() {
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
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.04, scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true } },
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
          minHeight: '40vh',
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

        <div style={{ marginTop: 'clamp(3rem, 6vh, 5rem)' }}>
          <div data-hero style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', opacity: 0 }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>03</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>The Team</span>
          </div>
          <div data-hero style={{ width: '4rem', height: '1px', background: '#f7b93b', marginBottom: '2rem', opacity: 0 }} />
          <h1
            data-hero
            style={{
              fontFamily: 'var(--font-display, "Playfair Display", serif)',
              fontSize: 'clamp(2.6rem, 6vw, 5rem)',
              fontWeight: 500,
              color: '#F5F2EB',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              maxWidth: '22ch',
              margin: 0,
              opacity: 0,
            }}
          >
            Meet the <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>people behind your care.</span>
          </h1>
        </div>
      </div>

      {/* ── Doctor grid ────────────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
          style={{ maxWidth: '1300px', margin: '0 auto', gap: '1rem' }}
        >
          {DOCTORS.map(({ name, dept, qual, grad }) => (
            <article key={name} data-card style={{ borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 1px 2px rgba(0,0,0,0.04)', opacity: 0 }}>
              <div style={{ height: '11rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}>
                <span style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontWeight: 600, fontSize: '2.8rem', color: 'rgba(212,175,55,0.2)' }}>
                  {getInitials(name)}
                </span>
              </div>
              <div style={{ background: '#fff', padding: '1rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontSize: '0.95rem', color: '#0D1117', lineHeight: 1.3 }}>{name}</h3>
                <p style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#f7b93b', marginTop: '6px' }}>{dept}</p>
                <p style={{ fontSize: '10px', color: 'rgba(13,17,23,0.45)', marginTop: '4px' }}>{qual}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

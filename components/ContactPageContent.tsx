'use client'

import { useEffect, useRef, useState, FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Phone, MapPin, Clock } from 'lucide-react'
import gsap from 'gsap'

const DEPARTMENTS = [
  'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Emergency Medicine', 'General Medicine',
]

interface FormState {
  name: string
  phone: string
  department: string
  date: string
  message: string
}

interface FieldError {
  name?: string
  phone?: string
  department?: string
  date?: string
}

export function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState<FormState>({ name: '', phone: '', department: '', date: '', message: '' })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)

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

  const validate = (): boolean => {
    const e: FieldError = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.match(/^\+?[\d\s\-()]{8,}$/)) e.phone = 'Enter a valid phone number'
    if (!form.department) e.department = 'Select a department'
    if (!form.date) e.date = 'Select a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const err = (msg?: string) =>
    msg ? <p style={{ marginTop: '6px', fontSize: '11px', color: '#f87171' }} role="alert">{msg}</p> : null

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: '1px solid rgba(0,0,0,0.12)',
    borderRadius: '0.6rem',
    padding: '12px 14px',
    fontSize: '0.9rem',
    color: '#0D1117',
    fontFamily: 'Inter, sans-serif',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'rgba(13,17,23,0.5)',
    marginBottom: '6px',
  }

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
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>04</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>Get Started</span>
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
              margin: 0,
              opacity: 0,
            }}
          >
            Book an <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>appointment.</span>
          </h1>
        </div>
      </div>

      {/* ── Contact info + form ────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div className="grid lg:grid-cols-2" style={{ maxWidth: '1100px', margin: '0 auto', gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'start' }}>

          {/* Left: contact details */}
          <div>
            <p style={{ fontSize: '0.95rem', color: 'rgba(13,17,23,0.6)', lineHeight: 1.75, maxWidth: '40ch', marginBottom: '2rem' }}>
              Tell us what you need. Our team calls back within two hours to confirm your visit.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <li>
                <a href="tel:+917288877300" style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#0D1117', textDecoration: 'none', fontSize: '0.95rem' }}>
                  <Phone size={16} color="#f7b93b" style={{ marginTop: '2px' }} />
                  072888 77300
                </a>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#0D1117', fontSize: '0.95rem' }}>
                <Clock size={16} color="#f7b93b" style={{ marginTop: '2px' }} />
                Open 24 hours, 7 days a week
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=MGM+HOSPITALS+Thottambedu+Andhra+Pradesh"
                  target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', color: '#0D1117', textDecoration: 'none', fontSize: '0.95rem' }}
                >
                  <MapPin size={16} color="#f7b93b" style={{ marginTop: '2px' }} />
                  Thottambedu, C. Khandriga, Andhra Pradesh — 517640
                </a>
              </li>
            </ul>
            <a
              href="tel:+911800000000"
              style={{ display: 'inline-block', marginTop: '2rem', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,17,23,0.45)', textDecoration: 'none' }}
            >
              Emergency? Call 1800 000 000
            </a>
          </div>

          {/* Right: form card */}
          <div style={{ background: '#fff', borderRadius: '1.25rem', padding: 'clamp(1.75rem, 3vw, 2.5rem)', border: '1px solid rgba(0,0,0,0.06)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#f7b93b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Check size={24} color="#000" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display, "Playfair Display", serif)', fontSize: '1.4rem', color: '#0D1117', marginBottom: '0.6rem' }}>
                  Appointment requested
                </h3>
                <p style={{ color: 'rgba(13,17,23,0.55)', fontSize: '0.9rem' }}>Our team will call you within two hours to confirm.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }} aria-label="Appointment booking form">
                <div>
                  <label htmlFor="c-name" style={labelStyle}>Full name</label>
                  <input id="c-name" type="text" style={inputStyle} aria-invalid={!!errors.name}
                    value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {err(errors.name)}
                </div>
                <div>
                  <label htmlFor="c-phone" style={labelStyle}>Phone number</label>
                  <input id="c-phone" type="tel" style={inputStyle} aria-invalid={!!errors.phone}
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  {err(errors.phone)}
                </div>
                <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                  <div>
                    <label htmlFor="c-dept" style={labelStyle}>Department</label>
                    <select id="c-dept" style={inputStyle} aria-invalid={!!errors.department}
                      value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}>
                      <option value="" disabled hidden></option>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    {err(errors.department)}
                  </div>
                  <div>
                    <label htmlFor="c-date" style={labelStyle}>Preferred date</label>
                    <input id="c-date" type="date" style={inputStyle} aria-invalid={!!errors.date}
                      min={new Date().toISOString().split('T')[0]}
                      value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                    {err(errors.date)}
                  </div>
                </div>
                <div>
                  <label htmlFor="c-notes" style={labelStyle}>Notes (optional)</label>
                  <textarea id="c-notes" rows={2} style={{ ...inputStyle, resize: 'none' }}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <button
                  type="submit"
                  style={{
                    marginTop: '0.5rem', width: '100%', padding: '14px', borderRadius: '0.6rem',
                    background: '#f7b93b', color: '#111', border: 'none', fontWeight: 700, fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', cursor: 'pointer',
                  }}
                >
                  Confirm appointment
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

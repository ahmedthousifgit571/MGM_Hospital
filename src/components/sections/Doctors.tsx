import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { useReveal } from '@/hooks/useReveal'
import SplitText from '@/components/SplitText'

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

function shortName(name: string): string {
  return name.replace(/^(Dr\.|G\.)\s*/i, '').trim()
}

export function Doctors() {
  const ref = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState<number>(0)
  useReveal(ref)

  /* Gold line scaleX reveal — mirrors SectionHeader */
  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 90%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="doctors"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto">

        {/* ── Section header (inlined so h2 has no data-reveal conflict) ─── */}
        <div className="mb-16">
          <div data-reveal className="flex items-center gap-4 mb-6">
            <span className="font-body text-xs text-muted">02</span>
            <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">The team</span>
          </div>
          <span ref={lineRef} className="block h-px w-20 mb-8 origin-left bg-accent" />
          <h2
            className="font-display text-soft leading-[0.95]"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Meet the{' '}
            <SplitText
              tag="span"
              text="people"
              className="text-accent"
              delay={55}
              duration={0.75}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 36 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-60px"
              textAlign="left"
            />
            {' '}behind your{' '}
            <SplitText
              tag="span"
              text="care"
              className="text-accent"
              delay={55}
              duration={0.75}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 36 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.15}
              rootMargin="-60px"
              textAlign="left"
            />
            
          </h2>
        </div>

        {/* ── Desktop: hover-expand accordion ─────────────────────── */}
        <div
          className="hidden xl:flex items-stretch gap-1.5"
          style={{ height: '22rem' }}
          onMouseLeave={() => setActive(0)}
        >
          {DOCTORS.map((doc, i) => {
            const isActive = active === i
            return (
              <div
                key={doc.name}
                className="relative cursor-pointer overflow-hidden rounded-2xl"
                style={{
                  flex: isActive ? '0 0 18rem' : '1 1 0',
                  minWidth: isActive ? '18rem' : '1.8rem',
                  transition: 'flex 0.38s cubic-bezier(0.4, 0, 0.2, 1), min-width 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
                  background: `linear-gradient(160deg, ${doc.grad[0]}, ${doc.grad[1]})`,
                }}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-label={doc.name}
              >
                {/* Collapsed: rotated short name */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    opacity: isActive ? 0 : 1,
                    transition: 'opacity 0.18s ease',
                    pointerEvents: 'none',
                  }}
                >
                  <span
                    className="font-body whitespace-nowrap text-white/40"
                    style={{
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {shortName(doc.name)}
                  </span>
                </div>

                {/* Expanded: initials + details */}
                <div
                  className="absolute inset-0 flex flex-col justify-between p-6"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.22s ease 0.12s',
                  }}
                >
                  <span
                    className="font-display font-semibold select-none leading-none"
                    style={{ fontSize: '5rem', color: 'rgba(212,175,55,0.18)' }}
                  >
                    {getInitials(doc.name)}
                  </span>

                  <div
                    className="rounded-xl p-4 -mx-2 -mb-2"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent)' }}
                  >
                    <p
                      className="font-body uppercase text-accent mb-1.5"
                      style={{ fontSize: '9px', letterSpacing: '0.24em' }}
                    >
                      {doc.dept}
                    </p>
                    <h3
                      className="font-display font-medium text-white leading-tight mb-1"
                      style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)' }}
                    >
                      {doc.name}
                    </h3>
                    <p className="font-body text-white/45" style={{ fontSize: '10px' }}>
                      {doc.qual}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Mobile / tablet: responsive grid ────────────────────── */}
        <div className="xl:hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {DOCTORS.map(({ name, dept, qual, grad }) => (
            <article key={name} className="group relative rounded-2xl overflow-hidden shadow-sm">
              <div
                className="h-44 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
              >
                <span
                  className="font-display font-semibold select-none"
                  style={{ fontSize: '2.8rem', color: 'rgba(212,175,55,0.2)' }}
                >
                  {getInitials(name)}
                </span>
              </div>
              <div className="bg-surface-2 p-4 nameplate-border">
                <h3 className="font-display font-medium text-soft text-sm leading-tight">{name}</h3>
                <p
                  className="font-body text-accent mt-1.5"
                  style={{ fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase' }}
                >
                  {dept}
                </p>
                <p className="font-body text-muted mt-1" style={{ fontSize: '10px' }}>{qual}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

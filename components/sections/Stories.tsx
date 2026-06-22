import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

const LEAD = {
  quote: 'The doctors explained every step before they took it. I never once felt like a number.',
  name: 'Rohan Sharma',
  condition: 'Cardiac Bypass Surgery',
}

const SUPPORTING = [
  {
    quote: 'I travelled 400 km for this team. Every bit of the reputation is deserved.',
    name: 'Meena Pillai',
    condition: 'Neurosurgery',
  },
  {
    quote: 'From admission to discharge, my family was never left in the dark.',
    name: 'David Thomas',
    condition: 'Orthopedic Care',
  },
]

const AWARDS = ['NABH Accredited', 'JCI Certified', 'ISO 9001', '15+ Specialities']

export function Stories() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto">
        <SectionHeader index="06" eyebrow="Patient stories" title="Lives changed, in their words." className="mb-16" />


        <div className="grid lg:grid-cols-12 gap-5">
          {/* Lead testimonial */}
          <blockquote
            data-reveal
            className="glass-card lg:col-span-7 p-10 md:p-14 flex flex-col"
            style={{ background: '#F8FAFF' }}
          >
            <p
              className="font-display font-medium text-soft leading-[1.2]"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)', letterSpacing: '-0.02em' }}
            >
              &ldquo;{LEAD.quote}&rdquo;
            </p>
            <footer className="mt-auto pt-10">
              <p className="font-display font-medium text-soft">{LEAD.name}</p>
              <p className="font-body text-[11px] uppercase tracking-[0.16em] mt-2 text-muted">{LEAD.condition}</p>
            </footer>
          </blockquote>

          {/* Two quieter supporting quotes */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {SUPPORTING.map(({ quote, name, condition }) => (
              <blockquote
                key={name}
                data-reveal
                className="flex-1 rounded-2xl border border-black/8 p-8 flex flex-col bg-surface-1"
              >
                <p className="font-body font-light text-body leading-relaxed">&ldquo;{quote}&rdquo;</p>
                <footer className="mt-auto pt-6">
                  <p className="font-display font-medium text-soft text-sm">{name}</p>
                  <p className="font-body text-[11px] uppercase tracking-[0.16em] mt-1.5 text-muted">{condition}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Accreditations — quiet mono row */}
        <div data-reveal className="mt-14 flex flex-wrap items-center gap-x-5 gap-y-3">
          {AWARDS.map((award, i) => (
            <span key={award} className="flex items-center gap-5">
              {i > 0 && <span className="text-muted/40" aria-hidden>·</span>}
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-muted">{award}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

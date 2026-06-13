import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

const DOCTORS = [
  {
    initials: 'AK', name: 'Dr. Arjun Kumar', specialty: 'Cardiothoracic Surgery',
    bio: 'Leads our cardiothoracic program. 22 years and thousands of bypass and valve procedures.',
    grad: ['#1a1a2e', '#16213e'],
  },
  {
    initials: 'PR', name: 'Dr. Priya Reddy', specialty: 'Neurology & Neuroscience',
    bio: 'Neurologist focused on stroke and movement disorders, in practice for 18 years.',
    grad: ['#0f3460', '#1a1a2e'],
  },
  {
    initials: 'SM', name: 'Dr. Suresh Menon', specialty: 'Orthopedic Surgery',
    bio: 'Orthopedic surgeon specializing in joint replacement, with 25 years operating.',
    grad: ['#1e3a2f', '#0f3460'],
  },
  {
    initials: 'LN', name: 'Dr. Lakshmi Nair', specialty: 'Pediatrics',
    bio: 'Trusted by families for 15 years of gentle, attentive care for children.',
    grad: ['#2a1a3e', '#16213e'],
  },
]

export function Doctors() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="doctors"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <SectionHeader index="05" eyebrow="The team" title="Meet the people behind your care." className="mb-16" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {DOCTORS.map(({ initials, name, specialty, bio, grad }) => (
            <article
              key={name}
              data-reveal
              className="group relative rounded-2xl overflow-hidden cursor-default"
            >
              {/* Portrait field */}
              <div
                className="h-72 flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
              >
                <span
                  className="font-display font-semibold text-7xl select-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                  style={{ color: 'rgba(212,175,55,0.26)' }}
                >
                  {initials}
                </span>
              </div>

              {/* Always-visible name plate */}
              <div className="bg-surface-2 p-5">
                <h3 className="font-display font-medium text-soft text-base leading-tight">{name}</h3>
                <p className="font-body text-[11px] uppercase tracking-[0.16em] mt-2 text-accent">{specialty}</p>
              </div>

              {/* Bio — masked vertical reveal (clip-path, not opacity) */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:[clip-path:inset(0_0_0_0)]"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 55%, rgba(0,0,0,0.4))' }}
              >
                <h3 className="font-display font-medium text-soft text-lg leading-tight mb-3">{name}</h3>
                <p className="font-body font-light text-body text-sm leading-relaxed">{bio}</p>
                <p className="font-body text-[11px] uppercase tracking-[0.16em] mt-4 text-accent">{specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

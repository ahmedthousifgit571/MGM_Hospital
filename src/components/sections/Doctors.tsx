import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

const DOCTORS = [
  { initials: 'AK', name: 'Dr. Arjun Kumar',  specialty: 'Cardiothoracic Surgery',  exp: '22 years', grad: ['#1a1a2e', '#16213e'] },
  { initials: 'PR', name: 'Dr. Priya Reddy',  specialty: 'Neurology & Neuroscience', exp: '18 years', grad: ['#0f3460', '#1a1a2e'] },
  { initials: 'SM', name: 'Dr. Suresh Menon', specialty: 'Orthopedic Surgery',       exp: '25 years', grad: ['#1e3a2f', '#0f3460'] },
  { initials: 'LN', name: 'Dr. Lakshmi Nair', specialty: 'Pediatrics',               exp: '15 years', grad: ['#2a1a3e', '#16213e'] },
]

export function Doctors() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="doctors"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
    >
      <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-3" style={{ color: '#D4AF37' }}>
        OUR SPECIALISTS
      </p>
      <h2
        data-reveal
        className="font-display font-black text-white mb-12"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
      >
        Meet the Team Behind Your Care
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {DOCTORS.map(({ initials, name, specialty, exp, grad }) => (
          <div
            key={name}
            data-reveal
            className="rounded-2xl overflow-hidden group cursor-default"
          >
            {/* Portrait placeholder */}
            <div
              className="h-56 flex items-center justify-center relative"
              style={{ background: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
            >
              <span className="font-display font-black text-6xl select-none" style={{ color: 'rgba(212,175,55,0.28)' }}>
                {initials}
              </span>
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }}
              >
                <span className="font-body text-xs text-white/85">{exp} of experience</span>
              </div>
            </div>

            <div className="glass p-5">
              <h3 className="font-display font-bold text-white text-base">{name}</h3>
              <p className="font-body text-xs mt-1" style={{ color: '#D4AF37' }}>{specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

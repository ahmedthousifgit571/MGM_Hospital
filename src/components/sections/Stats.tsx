import { useRef } from 'react'
import { Stethoscope, Clock, Users, Award } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const STATS = [
  { icon: Stethoscope, value: '500+',    label: 'Expert Doctors' },
  { icon: Clock,       value: '24/7',    label: 'Emergency Care' },
  { icon: Users,       value: '50,000+', label: 'Patients Treated' },
  { icon: Award,       value: '15+',     label: 'Specialities' },
]

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-4" style={{ color: '#D4AF37' }}>
        BY THE NUMBERS
      </p>
      <h2
        data-reveal
        className="font-display font-black text-white text-center mb-14"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
      >
        Trusted by Generations
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            data-reveal
            className="glass rounded-2xl p-7 flex flex-col items-center text-center hover:bg-white/12 transition-colors duration-300"
          >
            <Icon size={22} className="mb-3" style={{ color: '#D4AF37' }} aria-hidden />
            <span className="font-display font-black text-4xl md:text-5xl leading-none mb-2" style={{ color: '#D4AF37' }}>
              {value}
            </span>
            <span className="font-body text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.6)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

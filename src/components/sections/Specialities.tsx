import { useRef } from 'react'
import { Heart, Brain, Bone, Baby, Zap } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const SPECS = [
  { icon: Heart, name: 'Cardiology',        desc: 'Advanced cardiac care & interventional procedures' },
  { icon: Brain, name: 'Neurology',          desc: 'Comprehensive brain & nervous system treatment' },
  { icon: Bone,  name: 'Orthopedics',        desc: 'Joint replacement, spine & sports medicine' },
  { icon: Baby,  name: 'Pediatrics',         desc: 'Compassionate care for children of all ages' },
  { icon: Zap,   name: 'Emergency Medicine', desc: '24/7 critical care & trauma response' },
]

export function Specialities() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="specialities"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
    >
      <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-3" style={{ color: '#D4AF37' }}>
        OUR SPECIALITIES
      </p>
      <h2
        data-reveal
        className="font-display font-black text-white mb-12"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
      >
        World-Class Clinical Excellence
      </h2>

      <div
        data-reveal
        className="flex gap-5 overflow-x-auto pb-4 -mx-1 px-1"
        style={{ scrollbarWidth: 'none' }}
      >
        {SPECS.map(({ icon: Icon, name, desc }) => (
          <div
            key={name}
            className="glass rounded-2xl p-7 flex-shrink-0 w-60 md:w-72 flex flex-col gap-4
                       hover:bg-white/12 hover:-translate-y-1 transition-all duration-300"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.12)' }}
            >
              <Icon size={20} style={{ color: '#D4AF37' }} aria-hidden />
            </div>
            <h3 className="font-display font-bold text-white text-lg leading-tight">{name}</h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

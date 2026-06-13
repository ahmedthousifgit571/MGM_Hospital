import { useRef } from 'react'
import { Heart, Brain, Bone, Baby, Zap } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

const SPECS = [
  { icon: Heart, name: 'Cardiology',         desc: 'Diagnosis, intervention, and recovery for the heart.' },
  { icon: Brain, name: 'Neurology',          desc: 'Care for the brain, spine, and nervous system.' },
  { icon: Bone,  name: 'Orthopedics',        desc: 'Joint replacement, spine, and sports-injury recovery.' },
  { icon: Baby,  name: 'Pediatrics',         desc: 'Calm, careful medicine for children of every age.' },
  { icon: Zap,   name: 'Emergency Medicine', desc: 'Trauma and critical care, ready every hour of the day.' },
]

export function Specialities() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="specialities"
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto">
        <SectionHeader index="04" eyebrow="Our specialities" title="Depth in every department." className="mb-16" />

        {/* 5 wide cells — 2 + 2 + 1 full-width (bento rhythm) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SPECS.map(({ icon: Icon, name, desc }, i) => (
            <div
              key={name}
              data-reveal
              className={`glass-card p-8 md:p-10 flex flex-col gap-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${
                i === SPECS.length - 1 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <Icon size={26} strokeWidth={1.5} className="text-soft" aria-hidden />
                <span className="font-body text-xs text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3
                  className="font-display font-medium text-soft mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', letterSpacing: '-0.02em' }}
                >
                  {name}
                </h3>
                <p className="font-body font-light text-muted leading-relaxed max-w-md">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

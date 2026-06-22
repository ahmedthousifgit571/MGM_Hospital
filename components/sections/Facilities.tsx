import { useRef } from 'react'
import { Cpu, Building2, Activity, Microscope } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

const FACILITIES = [
  { icon: Cpu,        title: 'Advanced Technology',  desc: 'AI-assisted diagnostics, robotic surgery, and precision imaging.' },
  { icon: Building2,  title: 'Modern Infrastructure', desc: 'A 500-bed campus built for healing, comfort, and fast response.' },
  { icon: Activity,   title: 'Critical Care',         desc: 'ICUs and emergency floors staffed by specialists around the clock.' },
  { icon: Microscope, title: 'Accredited Labs',       desc: 'Labs and equipment held to global accreditation standards.' },
]

function ImagePlaceholder() {
  return (
    <div
      className="img-placeholder mt-10"
      aria-hidden="true"
      style={{ minHeight: '260px' }}
    >
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" style={{ opacity: 0.22 }}>
        <rect x="4" y="8" width="36" height="28" rx="5" stroke="#6366F1" strokeWidth="1.5" />
        <circle cx="22" cy="22" r="7" stroke="#6366F1" strokeWidth="1.5" />
        <circle cx="33" cy="13" r="2.5" fill="#6366F1" />
      </svg>
      <span className="img-placeholder-label">Image</span>
    </div>
  )
}

export function Facilities() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="departments"
      ref={ref}
      data-theme="dark"
      className="relative min-h-screen flex items-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto grid lg:grid-cols-12 gap-x-12 gap-y-16 items-start">
        <div className="lg:col-span-5">
          <SectionHeader index="05" eyebrow="Facilities & technology" title="Built for the moments that matter." />
          <ImagePlaceholder />
        </div>

        {/* Numbered editorial list */}
        <div className="lg:col-span-6 lg:col-start-7">
          {FACILITIES.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              data-reveal
              className={`flex gap-8 py-9 ${i > 0 ? 'border-t theme-divider' : ''}`}
            >
              <span className="font-body text-sm text-accent pt-1 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Icon size={20} strokeWidth={1.5} className="text-soft" aria-hidden />
                  <h3
                    className="font-display font-medium text-soft"
                    style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)', letterSpacing: '-0.02em' }}
                  >
                    {title}
                  </h3>
                </div>
                <p className="font-body font-light text-muted leading-relaxed max-w-md">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

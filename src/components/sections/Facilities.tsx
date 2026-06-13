import { useRef } from 'react'
import { Cpu, Building2, Activity, Microscope } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const FACILITIES = [
  { icon: Cpu,        title: 'Advanced Technology',  desc: 'AI-assisted diagnostics, robotic surgery suites, and precision imaging.' },
  { icon: Building2,  title: 'Modern Infrastructure', desc: '500-bed campus designed for healing, comfort, and rapid response.' },
  { icon: Activity,   title: 'Critical Care',         desc: 'Fully-equipped ICUs and 24/7 emergency departments staffed by specialists.' },
  { icon: Microscope, title: 'World-Class Equipment',  desc: 'Cutting-edge labs and equipment meeting global accreditation standards.' },
]

export function Facilities() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
    >
      <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-3" style={{ color: '#D4AF37' }}>
        FACILITIES & TECHNOLOGY
      </p>
      <h2
        data-reveal
        className="font-display font-black text-white mb-12 max-w-2xl"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
      >
        The Future of Healthcare, Today
      </h2>

      <div className="grid md:grid-cols-2 gap-5 max-w-4xl">
        {FACILITIES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            data-reveal
            className="glass rounded-2xl p-8 flex gap-5 items-start hover:bg-white/12 transition-colors duration-300"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(212,175,55,0.12)' }}
            >
              <Icon size={20} style={{ color: '#D4AF37' }} aria-hidden />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-lg mb-2">{title}</h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

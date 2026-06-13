import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center px-8 md:px-20 py-24"
    >
      <div className="max-w-3xl">
        <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-6" style={{ color: '#D4AF37' }}>
          OUR PHILOSOPHY
        </p>
        <div data-reveal className="h-px w-16 mb-10" style={{ background: '#D4AF37' }} />

        <h2
          data-reveal
          className="font-display font-black text-white leading-[1.02] mb-10"
          style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)', letterSpacing: '-0.02em' }}
        >
          Healthcare Built
          <br />
          Around <span style={{ color: '#D4AF37' }}>People.</span>
        </h2>

        <p
          data-reveal
          className="font-body text-lg leading-relaxed max-w-xl"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          At MGM Hospitals, every decision begins and ends with the patient.
          Our physicians combine decades of expertise with the warmth of genuine
          human connection — because world-class care means treating the whole
          person, not just the condition.
        </p>

        <p
          data-reveal
          className="font-body text-base leading-relaxed max-w-xl mt-6"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          From your first consultation to your full recovery, you are surrounded
          by a team that listens, explains, and stays with you every step.
        </p>
      </div>
    </section>
  )
}

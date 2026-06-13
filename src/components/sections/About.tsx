import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="about"
      ref={ref}
      className="relative min-h-screen flex items-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="relative w-full max-w-[1400px] mx-auto">
        {/* 4px gold rule running the full height of the content — the spread's spine */}
        <span
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent/70"
        />

        <div className="pl-8 md:pl-16">
          <div data-reveal className="flex items-center gap-4 mb-10">
            <span className="font-body text-xs text-muted">02</span>
            <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">
              Who we are
            </span>
          </div>

          <h2
            data-reveal
            className="font-display text-soft max-w-[16ch]"
            style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.01em' }}
          >
            Medicine is a craft,{' '}
            <span className="italic text-accent" style={{ lineHeight: 1.1 }}>
              not a service.
            </span>
          </h2>

          {/* Supporting copy, offset right — asymmetric, magazine-style */}
          <div className="mt-20 md:mt-28 md:ml-[40%] max-w-xl">
            <h3
              data-reveal
              className="font-display font-medium text-soft mb-6"
              style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              We built MGM around the parts most hospitals skip.
            </h3>
            <p data-reveal className="font-body font-light text-body leading-relaxed mb-5">
              Every decision starts with the patient in front of us. Our physicians pair
              decades of training with the patience to listen, explain, and stay present
              from the first consultation to a full recovery.
            </p>
            <p data-reveal className="font-body font-light text-muted leading-relaxed">
              You are treated as a whole person, not a condition on a chart.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

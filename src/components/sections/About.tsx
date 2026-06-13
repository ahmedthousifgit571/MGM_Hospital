import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'

function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`img-placeholder ${className}`}
      aria-hidden="true"
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

export function About() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="about"
      ref={ref}
      data-theme="dark"
      className="relative min-h-screen flex items-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="relative w-full max-w-350 mx-auto grid lg:grid-cols-2 gap-x-20 gap-y-16 items-center">

        {/* Left — editorial copy with gold spine */}
        <div className="relative">
          {/* 4px gold rule — the spread's spine */}
          <span
            aria-hidden
            className="absolute left-0 top-0 bottom-0 w-0.75 bg-accent/70"
          />

          <div className="pl-8 md:pl-14">
            <div data-reveal className="flex items-center gap-4 mb-10">
              <span className="font-body text-xs text-muted">03</span>
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

            <div className="mt-14">
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

        {/* Right — image placeholder */}
        <ImagePlaceholder className="w-full" style={{ minHeight: '480px' } as React.CSSProperties} />
      </div>
    </section>
  )
}

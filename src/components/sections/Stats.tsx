import { useRef } from 'react'
import { useReveal } from '@/hooks/useReveal'
import { useCountUp } from '@/hooks/useCountUp'

interface StatProps {
  target: number
  format: (n: number) => string
  label: string
}

/** Single counting numeral + mono label. The numbers ARE the design — no cards. */
function Stat({ target, format, label }: StatProps) {
  const numRef = useRef<HTMLSpanElement>(null)
  useCountUp(numRef, target, format)
  return (
    <div data-reveal className="flex flex-col">
      <span
        ref={numRef}
        className="font-display font-semibold text-accent leading-[0.85] tabular-nums"
        style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}
      >
        {format(0)}
      </span>
      <span className="font-body text-[11px] uppercase tracking-[0.28em] text-muted mt-4">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div data-reveal className="flex items-center gap-4 mb-16">
          <span className="font-body text-xs text-muted">01</span>
          <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">
            MGM in numbers
          </span>
        </div>

        {/* Single hairline; the row of giant numerals sits beneath it */}
        <div className="h-px w-full bg-white/12" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14 pt-14">
          <Stat target={500} format={(n) => `${Math.round(n)}+`} label="Specialists" />
          {/* 24/7 is not a count — render statically in the same visual key */}
          <div data-reveal className="flex flex-col">
            <span
              className="font-display font-semibold text-accent leading-[0.85] tabular-nums"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}
            >
              24/7
            </span>
            <span className="font-body text-[11px] uppercase tracking-[0.28em] text-muted mt-4">
              Emergency response
            </span>
          </div>
          <Stat target={50} format={(n) => `${Math.round(n)}K+`} label="Patients served" />
          <Stat target={15} format={(n) => `${Math.round(n)}`} label="Clinical departments" />
        </div>
      </div>
    </section>
  )
}

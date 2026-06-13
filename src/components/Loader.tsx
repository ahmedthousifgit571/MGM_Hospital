import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface Props {
  progress: number
  ready: boolean
}

export function Loader({ progress, ready }: Props) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const hasExited = useRef(false)

  const pct = Math.min(Math.round(progress * 100), 100)
  // Circumference of SVG circle r=38: 2π×38 ≈ 238.76
  const CIRC = 238.76
  const dashOffset = CIRC * (1 - progress)

  useEffect(() => {
    if (ready && !hasExited.current && loaderRef.current) {
      hasExited.current = true
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          if (loaderRef.current) loaderRef.current.style.display = 'none'
        },
      })
    }
  }, [ready])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center"
      aria-live="polite"
      aria-label={`Loading MGM Hospitals experience: ${pct}%`}
    >
      {/* Ring progress */}
      <div className="relative mb-10">
        <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
          {/* Track */}
          <circle
            cx="50" cy="50" r="38"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />
          {/* Progress arc */}
          <circle
            cx="50" cy="50" r="38"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dashoffset 0.2s linear' }}
          />
        </svg>

        {/* Numeric percentage centered inside ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-body text-sm font-medium tabular-nums"
            style={{ color: '#D4AF37' }}
          >
            {pct}%
          </span>
        </div>
      </div>

      {/* Wordmark */}
      <p className="font-display text-4xl font-black tracking-[0.15em] text-white select-none">
        MGM
      </p>
      <p
        className="font-body text-[10px] tracking-[0.45em] mt-1 select-none"
        style={{ color: '#94A3B8' }}
      >
        HOSPITALS
      </p>

      {/* Progress bar */}
      <div className="mt-10 w-48 h-px" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-full"
          style={{
            width: `${pct}%`,
            background: '#D4AF37',
            transition: 'width 0.2s linear',
          }}
        />
      </div>

      <p
        className="font-body text-[9px] tracking-[0.4em] mt-3 select-none"
        style={{ color: 'rgba(255,255,255,0.3)' }}
      >
        PREPARING EXPERIENCE
      </p>
    </div>
  )
}

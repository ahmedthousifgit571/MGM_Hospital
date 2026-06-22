import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import gsap from 'gsap'

interface Props {
  index: string
  eyebrow: string
  title: ReactNode
  className?: string
  titleClassName?: string
}

export function SectionHeader({ index, eyebrow, title, className = '', titleClassName = '' }: Props) {
  const lineRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: lineRef.current, start: 'top 90%', once: true },
        },
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className={className}>
      <div data-reveal className="flex items-center gap-4 mb-6">
        <span className="font-body text-xs text-muted">{index}</span>
        <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">
          {eyebrow}
        </span>
      </div>
      <span ref={lineRef} className="block h-px w-20 mb-8 origin-left bg-accent" />
      <h2
        data-reveal
        className={`font-display text-soft leading-[0.95] ${titleClassName}`}
        style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}
      >
        {title}
      </h2>
    </div>
  )
}

import { useEffect, RefObject } from 'react'
import gsap from 'gsap'

/**
 * Standalone entrance reveal for normal-flow content sections.
 * Animates every [data-reveal] descendant in, staggered, the first time the
 * section scrolls into view. These are NOT tied to the cinematic frame scroll.
 */
export function useReveal(
  ref: RefObject<HTMLElement | null>,
  opts: { start?: string } = {},
) {
  const start = opts.start ?? 'top 75%'
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 40,
        filter: 'blur(6px)',
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start },
      })
    }, el)

    return () => ctx.revert()
  }, [ref, start])
}

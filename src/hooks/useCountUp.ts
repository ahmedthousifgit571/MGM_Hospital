import { useEffect, RefObject } from 'react'
import gsap from 'gsap'

/**
 * Counts an element's text from 0 to `target` the first time it enters view.
 * GSAP tween on a proxy object writing textContent each frame — the micro-detail
 * that separates the Stats row from a static template. Respects reduced motion.
 */
export function useCountUp(
  ref: RefObject<HTMLElement | null>,
  target: number,
  format: (n: number) => string = (n) => String(Math.round(n)),
  opts: { duration?: number } = {},
) {
  const duration = opts.duration ?? 2
  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(target)
      return
    }

    el.textContent = format(0)
    const proxy = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.to(proxy, {
        v: target,
        duration,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate: () => {
          el.textContent = format(proxy.v)
        },
      })
    }, el)

    return () => ctx.revert()
  }, [ref, target, duration, format])
}

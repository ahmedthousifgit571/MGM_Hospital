import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Initialise Lenis smooth scroll and bridge it to the GSAP ticker.
 * One ticker bridge only — never run a separate rAF loop alongside this.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
    }
  }, [])
}

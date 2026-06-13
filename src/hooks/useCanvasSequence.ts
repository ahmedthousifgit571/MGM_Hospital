import { useEffect, useRef, RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { drawImageCover } from '@/lib/cover'

interface Options {
  frames: HTMLImageElement[]
  canvasRef: RefObject<HTMLCanvasElement | null>
  scrollContainerRef: RefObject<HTMLElement | null>
}

const MAX_PARALLAX = 20
const PARALLAX_LERP = 0.08

/**
 * Scrub the canvas image sequence with scroll using the fixed-canvas + tall-spacer
 * pattern. NO ScrollTrigger pin (pinning fights Lenis); the canvas stays put because
 * it is position:fixed in App. We animate a plain object (never React state) and only
 * redraw when the rounded frame index changes.
 */
export function useCanvasSequence({ frames, canvasRef, scrollContainerRef }: Options) {
  const rafRef = useRef<number>(0)
  const parallax = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (!frames.length || !canvasRef.current || !scrollContainerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const seq = { frame: 0 }
    let last = -1
    const p = parallax.current

    const draw = (i: number) => {
      const img = frames[i]
      if (!img) return
      drawImageCover(ctx, canvas, img, p.x, p.y)
    }

    const render = () => {
      const i = Math.round(seq.frame)
      if (i === last) return
      last = i
      draw(i)
    }

    // Paint first frame immediately so there's never a blank canvas
    draw(0)
    last = 0

    const ctx2 = gsap.context(() => {
      gsap.to(seq, {
        frame: frames.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: scrollContainerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          // NO pin — fixed canvas handles staying in place
        },
        onUpdate: render,
      })
    })

    // Positions depend on the tall spacer's layout — recalc once it's mounted
    ScrollTrigger.refresh()

    // Mouse parallax — desktop (fine pointer) only
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const onMouseMove = (e: MouseEvent) => {
      p.targetX = (e.clientX / window.innerWidth - 0.5) * 2 * MAX_PARALLAX
      p.targetY = (e.clientY / window.innerHeight - 0.5) * 2 * MAX_PARALLAX
    }
    const parallaxLoop = () => {
      const prevX = p.x
      const prevY = p.y
      p.x += (p.targetX - p.x) * PARALLAX_LERP
      p.y += (p.targetY - p.y) * PARALLAX_LERP
      if (Math.abs(p.x - prevX) > 0.05 || Math.abs(p.y - prevY) > 0.05) {
        draw(Math.round(seq.frame))
      }
      rafRef.current = requestAnimationFrame(parallaxLoop)
    }
    if (isFinePointer) {
      window.addEventListener('mousemove', onMouseMove, { passive: true })
      rafRef.current = requestAnimationFrame(parallaxLoop)
    }

    // Resize: recompute backing store (drawImageCover does this) and re-fit current frame
    let resizeTimer: number
    const onResize = () => {
      draw(Math.round(seq.frame))
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      ctx2.revert()
      cancelAnimationFrame(rafRef.current)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
    }
  }, [frames, canvasRef, scrollContainerRef])
}

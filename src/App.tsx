import { useRef } from 'react'
import type { RefObject } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { useImageSequence } from '@/hooks/useImageSequence'
import { useCanvasSequence } from '@/hooks/useCanvasSequence'
import { Loader } from '@/components/Loader'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/sections/Hero'
import { ContentSections } from '@/components/ContentSections'
import { CINEMATIC_VH } from '@/lib/constants'

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cinematicRef = useRef<HTMLElement>(null)

  // Lenis first (ticker bridge), then image load, then the scroll-scrub engine.
  useLenis()
  const { frames, progress, ready } = useImageSequence()
  useCanvasSequence({
    frames,
    canvasRef,
    scrollContainerRef: cinematicRef,
  })

  return (
    <div className="bg-black">
      {/* Loading screen */}
      <Loader progress={progress} ready={ready} />

      {/* Navigation */}
      <Navbar cinematicRef={cinematicRef as RefObject<HTMLElement | null>} />

      {/* ===== CINEMATIC BLOCK: sticky canvas + hero only ===== */}
      <section ref={cinematicRef} className="relative" style={{ height: `${CINEMATIC_VH}vh` }}>
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Flythrough canvas — pinned by sticky, scrolls away when the section ends */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            aria-hidden="true"
            role="presentation"
          />

          {/* Scrim for hero-text legibility over the bright facade */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 42%, rgba(0,0,0,0.62) 100%)',
            }}
          />

          {/* Hero overlay — the ONLY content in the cinematic block */}
          <Hero cinematicRef={cinematicRef as RefObject<HTMLElement | null>} />
        </div>
      </section>

      {/* ===== CONTENT: normal flow, begins after the flythrough ===== */}
      <ContentSections />
    </div>
  )
}

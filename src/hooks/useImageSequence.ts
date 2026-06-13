import { useState, useEffect } from 'react'
import { buildFrameUrls } from '@/lib/constants'

function detectMobile(): boolean {
  return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches
}

/**
 * Preload + decode the frame sequence from /hospitalFrames/ (served statically
 * from public/). Surfaces 404s via console.error so a broken path is obvious.
 * Only flips `ready` once every frame is decoded.
 */
export function useImageSequence() {
  const [frames, setFrames] = useState<HTMLImageElement[]>([])
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const urls = buildFrameUrls(detectMobile())
    const imgs: HTMLImageElement[] = new Array(urls.length)
    let loaded = 0

    Promise.all(
      urls.map(
        (url, i) =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = async () => {
              try {
                await img.decode()
              } catch {
                /* decode can reject on some browsers even when usable */
              }
              loaded++
              if (!cancelled) setProgress(loaded / urls.length)
              resolve()
            }
            img.onerror = () => {
              console.error('[useImageSequence] FRAME FAILED TO LOAD:', url)
              loaded++
              if (!cancelled) setProgress(loaded / urls.length)
              resolve()
            }
            img.src = url
            imgs[i] = img
          }),
      ),
    ).then(() => {
      if (cancelled) return
      // Keep only frames that actually decoded (naturalWidth > 0)
      const valid = imgs.filter((img) => img && img.naturalWidth > 0)
      console.log(`[useImageSequence] loaded ${valid.length}/${urls.length} frames`)
      setFrames(valid)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [])

  return { frames, progress, ready }
}

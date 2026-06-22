export const ZOOM_FACTOR = 1.15

/**
 * Height of the cinematic flythrough section (the tall sticky-canvas block).
 * The frame sequence scrubs across these 600vh; afterwards the canvas scrolls
 * away and the normal content sections begin.
 */
export const CINEMATIC_VH = 600

/**
 * Frame sequence config — frames live in public/hospitalFrames/ and are served
 * statically by Vite at /hospitalFrames/. No manifest fetch, no dev plugin.
 *
 * 270 source frames at 1280x720. Decoded RAM ≈ width*height*4 per frame:
 *   1280*720*4 ≈ 3.7MB. 270 frames ≈ 1.0GB (too high).
 * We sample every Nth frame to stay within the memory budget:
 *   desktop step 2 → 135 frames ≈ 0.5GB
 *   mobile  step 4 → 68 frames  ≈ 0.25GB
 */
export const FRAMES = {
  basePath: '/hospitalFrames/',
  prefix: 'ezgif-frame-',
  ext: 'jpg',
  pad: 3,
  total: 270,
  desktopStep: 2,
  mobileStep: 4,
  width: 1280,
  height: 720,
} as const

/** Build the ordered list of frame URLs for the given device tier. */
export function buildFrameUrls(isMobile: boolean): string[] {
  const step = isMobile ? FRAMES.mobileStep : FRAMES.desktopStep
  const urls: string[] = []
  for (let n = 1; n <= FRAMES.total; n += step) {
    const padded = String(n).padStart(FRAMES.pad, '0')
    urls.push(`${FRAMES.basePath}${FRAMES.prefix}${padded}.${FRAMES.ext}`)
  }
  return urls
}

export const COLORS = {
  bg: '#000000',
  primary: '#FFFFFF',
  accent: '#D4AF37',
  secondary: '#94A3B8',
  glass: 'rgba(255,255,255,0.08)',
  glassBorder: 'rgba(255,255,255,0.12)',
} as const

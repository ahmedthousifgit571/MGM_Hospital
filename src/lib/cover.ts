import { ZOOM_FACTOR } from './constants'

/**
 * Draw an image onto the canvas using cover-fit math + zoom factor.
 * The zoom slightly enlarges the frame to hide AI-generation edge artifacts
 * and provides headroom for mouse parallax without revealing canvas edges.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  parallaxX = 0,
  parallaxY = 0,
): void {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const cw = canvas.clientWidth
  const ch = canvas.clientHeight

  // Resize backing store only when needed (avoids expensive re-allocation on every draw)
  if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
    canvas.width = cw * dpr
    canvas.height = ch * dpr
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const iw = img.naturalWidth
  const ih = img.naturalHeight

  if (iw === 0 || ih === 0) return

  const scale = Math.max(cw / iw, ch / ih) * ZOOM_FACTOR
  const dw = iw * scale
  const dh = ih * scale
  const dx = (cw - dw) / 2 + parallaxX
  const dy = (ch - dh) / 2 + parallaxY

  ctx.clearRect(0, 0, cw, ch)
  ctx.drawImage(img, dx, dy, dw, dh)
}

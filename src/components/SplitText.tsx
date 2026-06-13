import { useRef, useEffect, useState } from 'react'
import type React from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText)

export interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  ease?: string | ((t: number) => number)
  splitType?: 'chars' | 'words' | 'lines' | 'words, chars'
  from?: gsap.TweenVars
  to?: gsap.TweenVars
  threshold?: number
  rootMargin?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  textAlign?: React.CSSProperties['textAlign']
  onLetterAnimationComplete?: () => void
}

const SplitText = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null)
  const doneRef = useRef(false)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true)
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true))
    }
  }, [])

  useEffect(() => {
    if (!ref.current || !text || !fontsLoaded) return
    if (doneRef.current) return

    const el = ref.current as HTMLElement & { _split?: GSAPSplitText }

    // Clean up any prior split
    if (el._split) {
      try { el._split.revert() } catch (_) {}
      delete el._split
    }

    // 1. Split the text
    const split = new GSAPSplitText(el, {
      type: splitType,
      linesClass: 'split-line',
      wordsClass: 'split-word',
      charsClass: 'split-char',
    })
    el._split = split

    // 2. Resolve targets
    let targets: Element[] = []
    if (splitType.includes('chars') && split.chars?.length) targets = split.chars
    else if (splitType.includes('words') && split.words?.length) targets = split.words
    else if (splitType.includes('lines') && split.lines?.length) targets = split.lines
    else targets = (split.chars ?? split.words ?? split.lines ?? []) as Element[]

    if (!targets.length) return

    // 3. Build ScrollTrigger start string from threshold + rootMargin
    const startPct = (1 - threshold) * 100
    const m = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin)
    const mv = m ? parseFloat(m[1]) : 0
    const mu = m ? (m[2] ?? 'px') : 'px'
    const offset = mv === 0 ? '' : mv < 0 ? `-=${Math.abs(mv)}${mu}` : `+=${mv}${mu}`
    const start = `top ${startPct}%${offset}`

    // 4. Animate — set from-state immediately, then tween to target on scroll
    gsap.set(targets, { ...from })
    const tween = gsap.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
        fastScrollEnd: true,
      },
      onComplete() {
        doneRef.current = true
        onLetterAnimationComplete?.()
      },
      willChange: 'transform, opacity',
      force3D: true,
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach(st => { if (st.trigger === el) st.kill() })
      try { split.revert() } catch (_) {}
      delete el._split
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration, splitType, threshold, rootMargin, fontsLoaded])

  const Tag = (tag || 'p') as React.ElementType
  return (
    <Tag
      ref={ref}
      style={{ textAlign, wordWrap: 'break-word', willChange: 'transform, opacity' }}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
    >
      {text}
    </Tag>
  )
}

export default SplitText

import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './index.css'
import App from './App'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const root = document.getElementById('root')
if (!root) throw new Error('Root element not found')

// Note: StrictMode intentionally omitted. Its double-mount re-runs the GSAP/Lenis
// imperative effects and is a known source of ScrollTrigger scrub init glitches
// for canvas-sequence apps. Effects still clean up properly via gsap.context().
createRoot(root).render(<App />)

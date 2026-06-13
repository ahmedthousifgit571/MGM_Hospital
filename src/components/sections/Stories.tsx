import { useRef } from 'react'
import { Quote } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const TESTIMONIALS = [
  {
    quote: 'The care I received at MGM was extraordinary. The doctors explained everything clearly and the staff made me feel genuinely valued.',
    name: 'Rohan Sharma',
    condition: 'Cardiac Bypass Surgery',
  },
  {
    quote: "World-class technology paired with doctors who actually listen. I traveled 400 km because MGM's reputation is that good — and it's every bit deserved.",
    name: 'Meena Pillai',
    condition: 'Neurosurgery',
  },
  {
    quote: 'From admission to discharge, every detail was handled with compassion. My family never felt alone through the entire journey.',
    name: 'David Thomas',
    condition: 'Orthopedic Care',
  },
]

const AWARDS = ['NABH Accredited', 'JCI Certified', 'Top Hospital 2024', 'ISO 9001', '15+ Specialities']

export function Stories() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center px-8 md:px-20 py-24"
    >
      <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-3" style={{ color: '#D4AF37' }}>
        PATIENT STORIES
      </p>
      <h2
        data-reveal
        className="font-display font-black text-white mb-12"
        style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', letterSpacing: '-0.02em' }}
      >
        Lives Changed
      </h2>

      <div className="grid md:grid-cols-3 gap-5 mb-12">
        {TESTIMONIALS.map(({ quote, name, condition }) => (
          <div
            key={name}
            data-reveal
            className="glass rounded-2xl p-7 flex flex-col gap-4"
          >
            <Quote size={22} style={{ color: '#D4AF37' }} aria-hidden />
            <p className="font-body text-sm leading-relaxed italic" style={{ color: 'rgba(255,255,255,0.78)' }}>
              &ldquo;{quote}&rdquo;
            </p>
            <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-display font-bold text-white text-sm">{name}</p>
              <p className="font-body text-xs mt-0.5" style={{ color: '#D4AF37' }}>{condition}</p>
            </div>
          </div>
        ))}
      </div>

      <div data-reveal className="flex flex-wrap gap-3">
        {AWARDS.map((award) => (
          <span
            key={award}
            className="rounded-full px-5 py-2 font-body text-xs font-medium"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37',
            }}
          >
            {award}
          </span>
        ))}
      </div>
    </section>
  )
}

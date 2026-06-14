import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Heart, Brain, Bone, Baby, Activity, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────── */
/*  Stories data                                                   */
/* ─────────────────────────────────────────────────────────────── */
const STORIES = [
  {
    id: 'ramesh-cardiac',
    patient: 'Mr. Ramesh Kumar',
    age: 58,
    specialty: 'Cardiology',
    icon: Heart,
    title: 'Regaining Heart Health with Expert Cardiac Care',
    excerpt:
      'After experiencing chest discomfort and fatigue, Mr. Ramesh received a timely diagnosis of an early-stage coronary artery condition. Expert cardiologists guided him to a full recovery within weeks.',
    image: '/assets/cardio.png',
    tag: 'Cardiac Care',
    paragraphs: [
      'Mr. Ramesh Kumar, a 58-year-old businessman, visited MGM Hospitals after experiencing frequent chest discomfort, fatigue, and shortness of breath during routine activities. Concerned about his symptoms, he sought expert consultation from our Cardiology Department.',
      'After a comprehensive cardiac evaluation, including ECG, Echocardiography, and advanced diagnostic testing, our cardiology team identified an early-stage coronary artery condition that required immediate medical attention.',
      'Under the guidance of our experienced cardiologists, Mr. Ramesh received personalized treatment, lifestyle counseling, and continuous monitoring. Within a few weeks, he experienced significant improvement in his energy levels, cardiovascular health, and overall quality of life.',
      'Today, Mr. Ramesh leads an active and healthy lifestyle and remains grateful for the timely diagnosis and compassionate care he received at MGM Hospitals.',
    ],
  },
  {
    id: 'srinivas-ortho',
    patient: 'Mr. Srinivas',
    age: null,
    specialty: 'Orthopedics',
    icon: Bone,
    title: 'Restoring Mobility with Expert Orthopedic Care',
    excerpt:
      "For many years, Mr. Srinivas struggled with persistent knee pain that gradually affected his daily life. Expert orthopedic care at MGM Hospitals restored his mobility and confidence.",
    image: '/assets/ortho2.png',
    tag: 'Orthopedic Surgery',
    paragraphs: [
      "For many years, Mr. Srinivas struggled with persistent knee pain that gradually affected his daily life. Simple activities such as walking, climbing stairs, and spending time with family became increasingly difficult due to discomfort and limited mobility.",
      "Seeking a long-term solution, he consulted the Orthopedics Department at MGM Hospitals, where he was evaluated by Dr. Dinesh Kumar and the orthopedic care team. After a comprehensive assessment and detailed treatment planning, a personalized approach was recommended to address his condition and restore functional movement.",
      "Throughout his treatment journey, Mr. Srinivas received expert medical guidance, continuous monitoring, and compassionate support from the hospital staff. The team's commitment to patient care ensured a smooth recovery process and helped him regain confidence in his mobility.",
      "Today, Mr. Srinivas enjoys an active lifestyle with significantly improved comfort and movement, allowing him to return to the activities he values most.",
    ],
  },
  {
    id: 'arjun-neuro',
    patient: 'Mr. Arjun Reddy',
    age: 42,
    specialty: 'Neurology',
    icon: Brain,
    title: 'Back to Work After a Rapid Stroke Recovery',
    excerpt:
      'Rushed to the MGM emergency unit within the golden hour, Mr. Arjun received clot-busting therapy and neuro-rehabilitation that returned him to full cognitive function.',
    image: null,
    tag: 'Neurology',
    paragraphs: [
      'Mr. Arjun Reddy, a 42-year-old software professional, was brought to the MGM emergency unit after a sudden onset of weakness on his left side and slurred speech — classic signs of an acute stroke.',
      'Admitted within the critical golden hour, the neurology team immediately initiated clot-busting therapy and round-the-clock monitoring. Advanced imaging guided a precise treatment plan that minimised brain damage.',
      'Following the acute phase, Mr. Arjun underwent an intensive neuro-rehabilitation programme covering physiotherapy, speech therapy, and cognitive exercises. His progress exceeded expectations.',
      'Today, Mr. Arjun has returned to his professional role with full cognitive and physical function, crediting the speed and expertise of the MGM neurology team.',
    ],
  },
  {
    id: 'meena-paeds',
    patient: 'Baby Meena (8 months)',
    age: null,
    specialty: 'Paediatrics',
    icon: Baby,
    title: "A Tiny Fighter's Journey Through Paediatric Critical Care",
    excerpt:
      'Baby Meena was admitted with a severe respiratory infection. Our paediatric intensive care team monitored and treated her around the clock until she was healthy enough to go home.',
    image: null,
    tag: 'Paediatric Care',
    paragraphs: [
      'Baby Meena, just 8 months old, was brought to MGM Hospitals in acute respiratory distress. Her oxygen levels were critically low and she required immediate intervention.',
      "The paediatric intensive care team placed Meena on respiratory support and began targeted antibiotic therapy. Her parents were kept informed and supported by the nursing team throughout the critical phase.",
      "Over the following days Meena responded positively to treatment. Her breathing steadied, her temperature normalised, and her feeding improved — small victories that her family treasured with every passing hour.",
      "After a 12-day stay, Baby Meena was discharged healthy and smiling. Her parents expressed deep gratitude for the round-the-clock care and compassion shown by every member of the team.",
    ],
  },
  {
    id: 'ravi-emergency',
    patient: 'Mr. Ravi Shankar',
    age: 35,
    specialty: 'Emergency Medicine',
    icon: Activity,
    title: 'Surviving a Severe Road-Traffic Injury',
    excerpt:
      'Brought in with multiple trauma injuries from a road accident, Mr. Ravi was stabilised in the emergency unit and underwent reconstructive surgery. He made a full recovery in six weeks.',
    image: null,
    tag: 'Emergency & Trauma',
    paragraphs: [
      'Mr. Ravi Shankar, 35, was rushed to MGM Hospitals following a high-speed road accident that left him with multiple fractures, internal bleeding, and a head injury.',
      'The emergency and trauma team activated a code-red protocol immediately upon arrival. Within minutes, he was stabilised in the trauma bay and taken for emergency imaging to assess internal injuries.',
      'A multidisciplinary team of surgeons — including orthopaedic, general surgery, and neurosurgery specialists — collaborated on a staged reconstruction plan carried out over two surgeries in the first 48 hours.',
      'Mr. Ravi completed his inpatient rehabilitation in six weeks and was discharged walking independently. He returned for a follow-up three months later in excellent health.',
    ],
  },
  {
    id: 'lakshmi-gyne',
    patient: 'Mrs. Lakshmi Rao',
    age: 31,
    specialty: 'Gynaecology',
    icon: Heart,
    title: 'A Safe Delivery After a High-Risk Pregnancy',
    excerpt:
      'Mrs. Lakshmi was closely monitored throughout a high-risk pregnancy by our obstetrics team. A carefully planned delivery ensured both mother and baby remained healthy.',
    image: null,
    tag: 'Obstetrics & Gynaecology',
    paragraphs: [
      'Mrs. Lakshmi Rao, 31, was referred to MGM Hospitals at 16 weeks of pregnancy after being classified as high-risk due to gestational hypertension and a prior complicated delivery.',
      "The obstetrics team designed a tailored antenatal care plan with fortnightly monitoring, dietary guidance, and specialist consultations. Lakshmi felt reassured at every appointment by the team's thorough attention.",
      "As she neared term, a multidisciplinary review was conducted. The team planned a closely managed delivery with anaesthesiology and neonatal care on standby to ensure the safest possible outcome.",
      "Both mother and baby were discharged in perfect health. Mrs. Lakshmi describes the MGM team as her family through those months — a sentiment her husband echoes wholeheartedly.",
    ],
  },
]

type Story = typeof STORIES[0]

/* ─────────────────────────────────────────────────────────────── */
/*  Modal                                                          */
/* ─────────────────────────────────────────────────────────────── */
function StoryModal({ story, onClose }: { story: Story; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  /* Open animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.fromTo(panelRef.current, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.08 })
    })
    return () => ctx.revert()
  }, [])

  /* ESC key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const Icon = story.icon

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5,8,13,0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1rem, 4vw, 2.5rem)',
      }}
    >
      <div
        ref={panelRef}
        style={{
          background: '#ffffff',
          borderRadius: '1.5rem',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.06)',
            border: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.12)')}
          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.06)')}
          aria-label="Close"
        >
          <X size={16} strokeWidth={2} color="#0D1117" />
        </button>

        {/* Content scroll area */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {/* Image header */}
          {story.image ? (
            <div style={{ width: '100%', height: '280px', overflow: 'hidden' }}>
              <img
                src={story.image}
                alt={story.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div
              style={{
                width: '100%',
                height: '160px',
                background: 'linear-gradient(135deg, #0B0F14 0%, #1a2030 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={40} strokeWidth={1.2} color="rgba(247,185,59,0.35)" />
            </div>
          )}

          {/* Body */}
          <div style={{ padding: 'clamp(2rem, 4vw, 3rem)' }}>
            {/* Tag */}
            <span
              style={{
                display: 'inline-block',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#f7b93b',
                marginBottom: '1rem',
              }}
            >
              {story.tag}
            </span>

            {/* Gold rule */}
            <div style={{ width: '3rem', height: '1px', background: '#f7b93b', marginBottom: '1.25rem' }} />

            {/* Title */}
            <h2
              style={{
                fontFamily: 'var(--font-display, "Playfair Display", serif)',
                fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                fontWeight: 500,
                color: '#0D1117',
                lineHeight: 1.15,
                letterSpacing: '-0.025em',
                marginBottom: '0.75rem',
              }}
            >
              {story.title}
            </h2>

            {/* Patient */}
            <p
              style={{
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: 'rgba(13,17,23,0.4)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
              }}
            >
              {story.patient}{story.age ? `, ${story.age}` : ''} · {story.specialty}
            </p>

            {/* Story paragraphs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', marginBottom: '2.5rem' }}>
              {story.paragraphs.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                    fontWeight: i === story.paragraphs.length - 1 ? 300 : 400,
                    color: i === story.paragraphs.length - 1 ? 'rgba(13,17,23,0.5)' : 'rgba(13,17,23,0.72)',
                    lineHeight: 1.75,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Footer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0C1B3A, #1A3A6B)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} strokeWidth={1.5} color="rgba(247,185,59,0.7)" />
              </div>
              <div>
                <p style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '0.875rem', color: '#0D1117' }}>
                  {story.patient}
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#f7b93b', marginTop: '2px' }}>
                  {story.tag}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Image placeholder for cards without photos                     */
/* ─────────────────────────────────────────────────────────────── */
function ImagePlaceholder({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '220px',
        background: 'linear-gradient(135deg, #F0F4FF 0%, #F8FAFF 100%)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon size={32} strokeWidth={1.2} style={{ color: 'rgba(0,0,0,0.10)' }} />
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────── */
/*  Page                                                           */
/* ─────────────────────────────────────────────────────────────── */
export function StoriesPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [activeStory, setActiveStory] = useState<Story | null>(null)

  /* Hero entrance */
  useEffect(() => {
    if (!heroRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current!.querySelectorAll('[data-hero]'),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 },
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  /* Cards stagger */
  useEffect(() => {
    if (!cardsRef.current) return
    const cards = cardsRef.current.querySelectorAll('[data-card]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
        },
      )
    }, cardsRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Dark Hero ──────────────────────────────────────────── */}
      <div
        ref={heroRef}
        style={{
          background: '#0B0F14',
          padding: 'clamp(3rem, 6vh, 5rem) clamp(1.5rem, 8vw, 8rem)',
          minHeight: '52vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Top bar */}
        <div data-hero className="flex items-center justify-between" style={{ opacity: 0 }}>
          <Link
            to="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-70"
            style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '13px', letterSpacing: '0.04em' }}
          >
            <ArrowLeft size={14} strokeWidth={1.8} />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" stroke="#f7b93b" strokeWidth="1.5" fill="none" />
              <path d="M11 21V11h2l3 5 3-5h2v10" stroke="#f7b93b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span style={{ color: '#F5F2EB', fontWeight: 700, fontSize: '15px' }}>MGM</span>
            <span style={{ color: 'rgba(245,242,235,0.45)', fontWeight: 300, fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase' }}>Hospitals</span>
          </div>
        </div>

        {/* Hero copy */}
        <div style={{ marginTop: 'clamp(4rem, 8vh, 7rem)' }}>
          <div data-hero className="flex items-center gap-4 mb-6" style={{ opacity: 0 }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.04em' }}>06</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.34em', color: 'rgba(255,255,255,0.3)' }}>Patient Stories</span>
          </div>
          <div data-hero style={{ width: '4rem', height: '1px', background: '#f7b93b', marginBottom: '2rem', opacity: 0 }} />
          <h1
            data-hero
            style={{
              fontFamily: 'var(--font-display, "Playfair Display", serif)',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 500,
              color: '#F5F2EB',
              lineHeight: 1.0,
              letterSpacing: '-0.025em',
              maxWidth: '18ch',
              margin: 0,
              opacity: 0,
            }}
          >
            Stories of{' '}
            <span style={{ color: '#f7b93b', fontStyle: 'italic' }}>Care.</span>
          </h1>
          <p
            data-hero
            style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.4)',
              marginTop: '1.5rem',
              maxWidth: '44ch',
              lineHeight: 1.75,
              opacity: 0,
            }}
          >
            Real patients. Real recoveries. Every story at MGM begins with trust and ends with a life transformed.
          </p>
        </div>
      </div>

      {/* ── Story Cards Grid ───────────────────────────────────── */}
      <div style={{ background: '#F8FAFF', padding: 'clamp(5rem, 10vh, 8rem) clamp(1.5rem, 8vw, 8rem)' }}>
        <div
          ref={cardsRef}
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))',
            gap: '1.5rem',
          }}
        >
          {STORIES.map(story => (
            <article
              key={story.id}
              data-card
              style={{
                background: '#ffffff',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                opacity: 0,
                transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {story.image ? (
                <img src={story.image} alt={story.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              ) : (
                <ImagePlaceholder icon={story.icon} />
              )}

              <div style={{ padding: '1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#f7b93b', marginBottom: '0.75rem', display: 'block' }}>
                  {story.tag}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display, "Playfair Display", serif)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
                    fontWeight: 500,
                    color: '#0D1117',
                    lineHeight: 1.25,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                  }}
                >
                  {story.title}
                </h2>
                <p style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(13,17,23,0.38)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  {story.patient}{story.age ? `, ${story.age}` : ''}
                </p>
                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(13,17,23,0.58)', lineHeight: 1.72, flex: 1, marginBottom: '1.75rem' }}>
                  {story.excerpt}
                </p>

                <div style={{ height: '1px', background: 'rgba(0,0,0,0.06)', marginBottom: '1.25rem' }} />

                <button
                  onClick={() => setActiveStory(story)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#0D1117',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#f7b93b')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#0D1117')}
                >
                  Read Story
                  <ArrowRight size={13} strokeWidth={2.2} style={{ color: '#f7b93b' }} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Back to home */}
        <div style={{ maxWidth: '1400px', margin: '5rem auto 0', textAlign: 'center' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: '#0B0F14',
              color: '#F5F2EB',
              fontWeight: 600,
              fontSize: '12px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '14px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.8')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Story Modal ────────────────────────────────────────── */}
      {activeStory && <StoryModal story={activeStory} onClose={() => setActiveStory(null)} />}
    </div>
  )
}

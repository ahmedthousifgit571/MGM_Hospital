import { useRef } from 'react'
import { Star } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'
import { SectionHeader } from '@/components/SectionHeader'

const REVIEWS = [
  {
    id: '01',
    name: 'Sravini Mudusu',
    rating: 5,
    text: "My brother was in a critical situation that night. Dr Pavan Kumar and Dr Vivek Chaithanya treated us like family. Doctors visited 2–3 times a day. Excellent treatment and maintenance. My brother's health is really good now — doing his daily activities.",
  },
  {
    id: '02',
    name: 'Kumar Lakshmigaari',
    rating: 5,
    text: "A great experience every time! Exceptional doctors — Vivek Bangam (Cardiologist), Dinesh Kumar (Orthopedic), Tejaswini (General Medicine). As I live outside the country, I always trust these doctors and want to thank them from the bottom of my heart.",
  },
  {
    id: '03',
    name: 'Raja Boyangari',
    rating: 5,
    text: "The vaccination process is smooth with a separate area — no non-covid person needs to step inside the hospital. When we had a certificate issue, the team proactively responded via emails and calls. Commendable given the busy situation.",
  },
  {
    id: '04',
    name: 'Lakshmi Narayana',
    rating: 5,
    text: "The staff were incredibly compassionate and professional. Facilities were clean and modern. From nurses to doctors, everyone worked together seamlessly. Five stars isn't enough — I'd give them ten stars if I could!",
  },
  {
    id: '05',
    name: 'Surya N',
    rating: 5,
    text: "My dad received orthopedic care under Dr. Dinesh. From start to finish, exceptional! The surgeon's expertise made the procedure smooth and successful, while the hospital provided a comfortable and supportive environment for recovery.",
  },
  {
    id: '06',
    name: 'Nagendra',
    rating: 5,
    text: "The best hospital in and around Srikalahasthi with excellent standards. Located at the outskirts with no pollution or traffic, with the best accessibility. Doctors provide excellent treatments. My best wishes to the management and staff.",
  },
  {
    id: '07',
    name: 'Arul',
    rating: 4,
    text: "Good doctors and equipment. Parking space is fantastic but parking sheds for cars and bikes would be a great addition — vehicles have to stay in the hot sun throughout the day.",
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          fill={i < count ? '#f7b93b' : 'transparent'}
          stroke={i < count ? '#f7b93b' : '#D1D5DB'}
          strokeWidth={2}
        />
      ))}
    </div>
  )
}

export function Reviews() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)',
        background: '#F8FAFF',
      }}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative w-full max-w-350 mx-auto">
        {/* Section header */}
        <div className="mb-20">
          <SectionHeader
            index="05"
            eyebrow="Patient Reviews"
            title={
              <>
                What our
                <br />
                patients say.
              </>
            }
          />
          <p
            data-reveal
            className="font-body font-light mt-6 max-w-md"
            style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1rem)', color: '#6B7280', lineHeight: 1.7 }}
          >
            Real experiences from real patients — sourced from Google Reviews.
          </p>
        </div>

        {/* 3-column staggered grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14 items-start">
          {REVIEWS.map((review, i) => {
            const isMiddle = i % 3 === 1
            const isLast = i === REVIEWS.length - 1
            return (
              <div
                key={review.id}
                data-reveal
                className={`relative flex flex-col${isLast ? ' lg:col-start-2' : ''}`}
                style={{ marginTop: isMiddle ? '40px' : '0' }}
              >
                {/* Gold pushpin */}
                <div
                  aria-hidden="true"
                  className="absolute -top-4 left-1/2 z-10"
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 38% 35%, #f9c75a, #d99f22)',
                    transform: 'translateX(-50%)',
                    boxShadow: '0 3px 10px rgba(247,185,59,0.45), inset 0 1px 2px rgba(255,255,255,0.5)',
                  }}
                />

                {/* Card */}
                <div
                  className="glass-card flex flex-col"
                  style={{ padding: '1.6rem 1.75rem' }}
                >
                  {/* Number + rating */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-display font-bold"
                      style={{ fontSize: '1.3rem', color: '#f7b93b', lineHeight: 1 }}
                    >
                      {review.id}
                    </span>
                    <StarRating count={review.rating} />
                  </div>

                  {/* Review text */}
                  <p
                    className="font-body flex-1"
                    style={{
                      fontSize: 'clamp(0.82rem, 1.05vw, 0.9rem)',
                      color: '#4B5563',
                      lineHeight: 1.75,
                    }}
                  >
                    {review.text}
                  </p>

                  {/* Author row */}
                  <div
                    className="flex items-center gap-3 mt-5 pt-4"
                    style={{ borderTop: '1px solid rgba(0,0,0,0.07)' }}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-body font-bold"
                      style={{ background: '#0D1117', color: '#f7b93b', fontSize: '13px' }}
                    >
                      {review.name[0]}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-sm" style={{ color: '#0D1117' }}>
                        {review.name}
                      </p>
                      <p className="font-body text-xs" style={{ color: '#9CA3AF', marginTop: '1px' }}>
                        Google Review
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Phone, MapPin, Clock, Instagram, Linkedin, Facebook, Youtube, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Services', id: 'specialities' },
  { label: 'Our Doctors', id: 'doctors' },
  { label: 'About Us', id: 'about' },
  { label: 'Patient Stories', id: 'stories' },
  { label: 'Book Appointment', id: 'appointment' },
]

const DEPARTMENTS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Emergency Medicine',
  'General Medicine',
]

const SOCIALS = [
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Facebook', href: '#', Icon: Facebook },
  { label: 'YouTube', href: '#', Icon: Youtube },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export function Footer() {
  return (
    <footer data-theme="dark" className="relative">
      {/* Top divider accent */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div
        className="max-w-screen-xl mx-auto"
        style={{ padding: 'clamp(4rem, 8vh, 6rem) clamp(1.5rem, 6vw, 6rem) clamp(2rem, 4vh, 3rem)' }}
      >
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">

          {/* ── Column 1: Brand ─────────────────────────────────────── */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" stroke="#f7b93b" strokeWidth="1.5" fill="none" />
                <path d="M11 21V11h2l3 5 3-5h2v10" stroke="#f7b93b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M16 11v10" stroke="#f7b93b" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
              </svg>
              <span className="flex items-baseline gap-1.5">
                <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px', color: '#F5F2EB' }}>MGM</span>
                <span style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: '10px', letterSpacing: '0.35em', color: '#F5F2EB', textTransform: 'uppercase', opacity: 0.65 }}>Hospitals</span>
              </span>
            </div>

            <p className="font-body font-light text-muted leading-relaxed text-sm mb-6 max-w-xs">
              Trusted multispeciality care in Andhra Pradesh — open 24 hours, every day of the year.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.55)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(247,185,59,0.12)'
                    e.currentTarget.style.borderColor = 'rgba(247,185,59,0.4)'
                    e.currentTarget.style.color = '#f7b93b'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Quick Links ───────────────────────────────── */}
          <div>
            <h3
              className="font-body font-semibold text-soft mb-5 text-xs uppercase tracking-[0.22em]"
              style={{ color: 'rgba(245,242,235,0.5)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {NAV_LINKS.map(({ label, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="group flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer font-body text-sm text-muted hover:text-soft transition-colors duration-200"
                  >
                    <ArrowRight
                      size={11}
                      className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden
                    />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 3: Departments ───────────────────────────────── */}
          <div>
            <h3
              className="font-body font-semibold mb-5 text-xs uppercase tracking-[0.22em]"
              style={{ color: 'rgba(245,242,235,0.5)' }}
            >
              Departments
            </h3>
            <ul className="space-y-3 list-none p-0 m-0">
              {DEPARTMENTS.map((dept) => (
                <li key={dept}>
                  <button
                    onClick={() => scrollTo('specialities')}
                    className="group flex items-center gap-2 bg-transparent border-0 p-0 cursor-pointer font-body text-sm text-muted hover:text-soft transition-colors duration-200"
                  >
                    <ArrowRight
                      size={11}
                      className="text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden
                    />
                    {dept}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Column 4: Contact ───────────────────────────────────── */}
          <div>
            <h3
              className="font-body font-semibold mb-5 text-xs uppercase tracking-[0.22em]"
              style={{ color: 'rgba(245,242,235,0.5)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4 list-none p-0 m-0">
              <li>
                <a
                  href="tel:+917288877300"
                  className="flex items-start gap-3 font-body text-sm text-muted hover:text-soft transition-colors duration-200 no-underline"
                >
                  <Phone size={14} className="text-accent mt-0.5 shrink-0" aria-hidden />
                  <span>072888 77300</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-body text-sm text-muted">
                  <Clock size={14} className="text-accent mt-0.5 shrink-0" aria-hidden />
                  <span>Open 24 hours, 7 days a week</span>
                </div>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=MGM+HOSPITALS+Thottambedu+Andhra+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-body text-sm text-muted hover:text-soft transition-colors duration-200 no-underline"
                >
                  <MapPin size={14} className="text-accent mt-0.5 shrink-0" aria-hidden />
                  <span>Thottambedu, C. Khandriga,<br />Andhra Pradesh — 517640</span>
                </a>
              </li>
            </ul>

            {/* CTA */}
            <button
              onClick={() => scrollTo('appointment')}
              className="group mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-body font-semibold text-[13px] text-black transition-all duration-200 active:scale-[0.97] hover:scale-[1.02]"
              style={{ background: '#f7b93b', boxShadow: '0 6px 20px rgba(247,185,59,0.2)' }}
            >
              Book Appointment
              <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </button>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <div
          className="mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 theme-divider border-t"
        >
          <p className="font-body text-xs text-muted">
            © {new Date().getFullYear()} MGM Hospitals. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted">
            Thottambedu, C. Khandriga, Andhra Pradesh 517640
          </p>
        </div>
      </div>
    </footer>
  )
}

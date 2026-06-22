import { useRef, useState, FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useReveal } from '@/hooks/useReveal'

const DEPARTMENTS = [
  'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Emergency Medicine', 'General Medicine',
]

interface FormState {
  name: string
  phone: string
  department: string
  date: string
  message: string
}

interface FieldError {
  name?: string
  phone?: string
  department?: string
  date?: string
}

const fixedLabel: React.CSSProperties = {
  top: 0,
  fontSize: '0.62rem',
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}

export function Appointment() {
  const ref = useRef<HTMLElement>(null)
  useReveal(ref)

  const [form, setForm] = useState<FormState>({ name: '', phone: '', department: '', date: '', message: '' })
  const [errors, setErrors] = useState<FieldError>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = (): boolean => {
    const e: FieldError = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.match(/^\+?[\d\s\-()]{8,}$/)) e.phone = 'Enter a valid phone number'
    if (!form.department) e.department = 'Select a department'
    if (!form.date) e.date = 'Select a date'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    if (validate()) setSubmitted(true)
  }

  const err = (msg?: string) =>
    msg ? <p className="mt-1.5 font-body text-[11px] text-red-400" role="alert">{msg}</p> : null

  return (
    <section
      id="appointment"
      ref={ref}
      data-theme="dark"
      className="relative min-h-screen flex items-center"
      style={{ padding: 'clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem)' }}
    >
      <div className="w-full max-w-350 mx-auto grid lg:grid-cols-2 gap-x-20 gap-y-14 items-center">
        {/* Left: copy */}
        <div>
          <div data-reveal className="flex items-center gap-4 mb-8">
            <span className="font-body text-xs text-muted">07</span>
            <span className="font-body text-[11px] uppercase tracking-[0.32em] text-muted">Get started</span>
          </div>
          <h2
            data-reveal
            className="font-display font-semibold text-soft leading-[0.95] mb-7"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.5rem)', letterSpacing: '-0.03em' }}
          >
            Book an <span className="text-accent">appointment.</span>
          </h2>
          <p data-reveal className="font-body font-light text-body leading-relaxed max-w-md">
            Tell us what you need. Our team calls back within two hours to confirm your visit.
          </p>
          <a
            data-reveal
            href="tel:+911800000000"
            className="inline-block mt-10 font-body text-[12px] uppercase tracking-[0.18em] text-muted hover:text-soft transition-colors"
          >
            Emergency? Call 1800 000 000
          </a>
        </div>

        {/* Right: form card */}
        <div data-reveal className="glass-card p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6 bg-accent">
                <Check size={24} className="text-black" aria-hidden />
              </div>
              <h3 className="font-display font-medium text-soft text-2xl mb-3">Appointment requested</h3>
              <p className="font-body font-light text-muted">Our team will call you within two hours to confirm.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-7" aria-label="Appointment booking form">
              <div className="surgical-field">
                <input
                  id="ap-name" type="text" placeholder=" " className="surgical-input"
                  aria-label="Full name" aria-invalid={!!errors.name}
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <label htmlFor="ap-name" className="surgical-label">Full name</label>
                {err(errors.name)}
              </div>

              <div className="surgical-field">
                <input
                  id="ap-phone" type="tel" placeholder=" " className="surgical-input"
                  aria-label="Phone number" aria-invalid={!!errors.phone}
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <label htmlFor="ap-phone" className="surgical-label">Phone number</label>
                {err(errors.phone)}
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="surgical-field">
                  <select
                    id="ap-dept" className="surgical-input" aria-label="Department" aria-invalid={!!errors.department}
                    value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })}
                  >
                    <option value="" disabled hidden></option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d} style={{ background: '#0b0b0c', color: '#f2ecdd' }}>{d}</option>
                    ))}
                  </select>
                  <label
                    htmlFor="ap-dept" className="surgical-label"
                    style={{ ...fixedLabel, color: form.department ? '#f7b93b' : '#9CA3AF' }}
                  >
                    Department
                  </label>
                  {err(errors.department)}
                </div>
                <div className="surgical-field">
                  <input
                    id="ap-date" type="date" className="surgical-input" aria-label="Preferred date" aria-invalid={!!errors.date}
                    min={new Date().toISOString().split('T')[0]}
                    value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ colorScheme: 'dark' }}
                  />
                  <label
                    htmlFor="ap-date" className="surgical-label"
                    style={{ ...fixedLabel, color: form.date ? '#f7b93b' : '#9CA3AF' }}
                  >
                    Preferred date
                  </label>
                  {err(errors.date)}
                </div>
              </div>

              <div className="surgical-field">
                <textarea
                  id="ap-notes" rows={2} placeholder=" " className="surgical-input resize-none"
                  aria-label="Additional notes"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <label htmlFor="ap-notes" className="surgical-label">Notes (optional)</label>
              </div>

              <button
                type="submit"
                className="group mt-3 w-full py-4 rounded-md font-body font-semibold text-sm tracking-wide flex items-center justify-center gap-3 bg-accent text-black transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98]"
              >
                Confirm appointment
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

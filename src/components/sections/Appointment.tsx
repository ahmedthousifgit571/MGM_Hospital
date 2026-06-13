import { useRef, useState, FormEvent } from 'react'
import { Send } from 'lucide-react'
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

  const inputBase =
    'w-full bg-transparent border rounded-xl px-4 py-3 font-body text-sm text-white placeholder-white/30 outline-none transition-colors duration-200 focus:border-[#D4AF37]'
  const borderNormal = 'border-white/15'
  const borderError = 'border-red-400/60'

  return (
    <section
      id="appointment"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left: copy */}
        <div>
          <p data-reveal className="font-body text-[10px] tracking-[0.5em] mb-3" style={{ color: '#D4AF37' }}>
            GET IN TOUCH
          </p>
          <h2
            data-reveal
            className="font-display font-black text-white mb-6 leading-[1.05]"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', letterSpacing: '-0.02em' }}
          >
            Book an Appointment
          </h2>
          <p data-reveal className="font-body text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Schedule a consultation with our specialists. Our team will call you
            within 2 hours to confirm your visit.
          </p>
          <a
            data-reveal
            href="tel:+911800000000"
            className="inline-flex items-center gap-2 mt-8 font-body text-sm font-medium"
            style={{ color: '#D4AF37' }}
          >
            Emergency? Call 1800-000-000
          </a>
        </div>

        {/* Right: form */}
        <div
          data-reveal
          className="glass rounded-3xl p-8 md:p-10"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {submitted ? (
            <div className="text-center py-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}
              >
                <Send size={22} style={{ color: '#D4AF37' }} aria-hidden />
              </div>
              <h3 className="font-display font-bold text-white text-xl mb-2">Appointment Requested</h3>
              <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                Our team will call you within 2 hours to confirm.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4" aria-label="Appointment booking form">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  aria-label="Full Name"
                  aria-invalid={!!errors.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputBase} ${errors.name ? borderError : borderNormal}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400" role="alert">{errors.name}</p>}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  aria-invalid={!!errors.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={`${inputBase} ${errors.phone ? borderError : borderNormal}`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-400" role="alert">{errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <select
                    aria-label="Department"
                    aria-invalid={!!errors.department}
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className={`${inputBase} ${errors.department ? borderError : borderNormal}`}
                    style={{ color: form.department ? '#fff' : 'rgba(255,255,255,0.3)' }}
                  >
                    <option value="" disabled style={{ background: '#0a0a0a' }}>Department</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d} value={d} style={{ background: '#0a0a0a', color: '#fff' }}>{d}</option>
                    ))}
                  </select>
                  {errors.department && <p className="mt-1 text-xs text-red-400" role="alert">{errors.department}</p>}
                </div>
                <div>
                  <input
                    type="date"
                    aria-label="Preferred date"
                    aria-invalid={!!errors.date}
                    value={form.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`${inputBase} ${errors.date ? borderError : borderNormal}`}
                    style={{ colorScheme: 'dark' }}
                  />
                  {errors.date && <p className="mt-1 text-xs text-red-400" role="alert">{errors.date}</p>}
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Additional notes (optional)"
                aria-label="Additional notes"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputBase} ${borderNormal} resize-none`}
              />

              <button
                type="submit"
                className="mt-2 w-full py-3.5 rounded-xl font-body font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
                style={{ background: '#D4AF37', color: '#000' }}
              >
                <Send size={15} aria-hidden />
                Confirm Appointment
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

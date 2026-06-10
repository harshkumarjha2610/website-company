'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const inputStyle = {
  backgroundColor: 'var(--bg-input)',
  border: '1px solid var(--border-input)',
  color: 'var(--text-primary)',
  borderRadius: '0.75rem',
  padding: '0.875rem 1rem',
  fontSize: '0.875rem',
  width: '100%',
  outline: 'none',
  fontFamily: 'inherit',
}

const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  color: 'var(--text-muted)',
  fontWeight: 700,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  marginBottom: '0.5rem',
}

const contactInfo = [
  { icon: Mail,   label: 'Email Us',  value: 'hello@enterprise.com' },
  { icon: Phone,  label: 'Call Us',   value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Visit Us',  value: 'San Francisco, CA' },
]

export default function CTA() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => setSubmitted(true), 600)
  }

  const getInputStyle = (field: string) => ({
    ...inputStyle,
    borderColor: focusedField === field ? '#22d3ee' : 'var(--border-input)',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(34,211,238,0.15)' : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  })

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#22d3ee] blur-[150px] rounded-full -z-10" style={{ opacity: 'var(--glow-opacity)' }} />
      <div className="absolute top-10 left-0 w-96 h-96 bg-[#a78bfa] blur-[120px] rounded-full -z-10" style={{ opacity: 'var(--glow-opacity)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-heading)' }}>
                Ready to Transform Your <span className="gradient-text">Business?</span>
              </h2>
              <p className="text-lg mb-10 leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
                Let&apos;s discuss your project and discover how we can help you build custom technology solutions to scale your operations.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl p-5 cursor-pointer group transition-smooth"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(34,211,238,0.4)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card-hover)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
                  }}
                >
                  <div className="bg-[#22d3ee]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#22d3ee] flex-shrink-0 group-hover:scale-110 transition-smooth">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold font-sans uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-base font-sans mt-0.5" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl p-8 md:p-10 relative"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-glass)',
            }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-16 h-16 bg-[#22d3ee]/10 border border-[#22d3ee] text-[#22d3ee] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold mb-3" style={{ color: 'var(--text-heading)' }}>Message Sent!</h3>
                <p className="font-sans max-w-sm mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Thank you for reaching out. A partner from our solution engineering team will follow up within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-display font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>Send a Message</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Your Name</label>
                    <input required type="text" id="name" placeholder="John Doe" value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField(null)}
                      style={{ ...getInputStyle('name'), '::placeholder': { color: 'var(--text-placeholder)' } } as any}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                    <input required type="email" id="email" placeholder="john@example.com" value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)}
                      style={getInputStyle('email')}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" style={labelStyle}>Subject / Interest</label>
                  <input required type="text" id="subject" placeholder="e.g. Custom SaaS development" value={formState.subject}
                    onChange={e => setFormState({ ...formState, subject: e.target.value })}
                    onFocus={() => setFocusedField('subject')} onBlur={() => setFocusedField(null)}
                    style={getInputStyle('subject')}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Message Details</label>
                  <textarea required id="message" rows={4} placeholder="Describe your goals, requirements, or timelines..." value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle('message'), resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#22d3ee] hover:bg-[#0891b2] font-bold transition-smooth text-sm flex items-center justify-center gap-2 group py-4 rounded-xl hover:-translate-y-1"
                  style={{ color: 'var(--text-inverse)', boxShadow: '0 0 20px rgba(34,211,238,0.3)' }}
                >
                  Send Inquiry
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-smooth" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

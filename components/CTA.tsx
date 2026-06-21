'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight, Shield, Calendar, X, Check } from 'lucide-react'

const inputStyle = {
  backgroundColor: 'var(--bg-input)',
  border: '1px solid var(--border-input)',
  color: 'var(--text-primary)',
  borderRadius: '1rem',
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
  { icon: Mail,   label: 'Email Us',  value: 'hello@techflow.com' },
  { icon: Phone,  label: 'Call Us',   value: '+1 (555) 123-4567' },
  { icon: MapPin, label: 'Visit Us',  value: 'San Francisco, CA' },
]

export default function CTA() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  
  // Calendly Modal State
  const [isCalOpen, setIsCalOpen] = useState(false)
  const [calStep, setCalStep] = useState<1 | 2 | 3>(1) // 1: Date, 2: Time + Info, 3: Success
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [calName, setCalName] = useState('')
  const [calEmail, setCalEmail] = useState('')

  useEffect(() => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent
      setIsCalOpen(customEvent.detail?.open ?? !isCalOpen)
      setCalStep(1)
      setSelectedDate(null)
      setSelectedTime(null)
    }
    window.addEventListener('toggle-calendly-modal', handleToggle)
    return () => window.removeEventListener('toggle-calendly-modal', handleToggle)
  }, [isCalOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTimeout(() => setSubmitted(true), 600)
  }



  const getInputStyle = (field: string) => ({
    ...inputStyle,
    borderColor: focusedField === field ? '#ff5f1f' : 'var(--border-input)',
    boxShadow: focusedField === field ? '0 0 0 3px rgba(255, 95, 31, 0.15)' : 'none',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
  })

  // Date selection calculation helper for mock Calendly (current month)
  const daysInMonth = Array.from({ length: 28 }, (_, i) => i + 1)
  const timeSlots = ['09:00 AM', '10:30 AM', '01:00 PM', '02:30 PM', '04:00 PM']

  const handleBookMeeting = (e: React.FormEvent) => {
    e.preventDefault()
    setCalStep(3)
  }

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Glow shapes */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#ff5f1f]/5 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-0 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* Left Side: Contact Information & Meeting CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
                Ready to Transform Your <span className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 bg-clip-text text-transparent">Business?</span>
              </h2>
              <p className="text-base md:text-lg mb-10 leading-relaxed font-sans text-gray-500 dark:text-gray-400">
                Let&apos;s discuss your project and discover how we can help you build custom technology solutions to scale your operations.
              </p>

              {/* Calendly Inline Trigger */}
              <div className="mb-10 p-6 rounded-2xl border border-dashed border-[#ff5f1f]/30 bg-[#ff5f1f]/5 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#ff5f1f]" size={24} />
                  <div>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white text-sm">Need a direct video consultation?</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Book a slot on our engineers calendar instantly.</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCalOpen(true)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ff5f1f] to-purple-600 hover:from-[#ff7f50] hover:to-purple-700 text-white font-bold transition-all text-xs flex items-center justify-center gap-2 shadow-glow"
                >
                  <span>Schedule Calendar Consultation</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Direct contact entries */}
            <div className="space-y-4">
              {contactInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 rounded-2xl p-5 transition-smooth border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur-md shadow-sm hover:border-[#ff5f1f]/40 hover:shadow-md cursor-pointer group"
                >
                  <div className="bg-[#ff5f1f]/10 w-12 h-12 rounded-xl flex items-center justify-center text-[#ff5f1f] flex-shrink-0 group-hover:scale-110 transition-smooth">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold font-sans uppercase tracking-wider text-gray-400">{label}</p>
                    <p className="text-sm font-sans mt-0.5 text-gray-800 dark:text-gray-200">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Contact Form with extended options */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 rounded-3xl p-8 md:p-10 border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur-md shadow-xl relative"
          >
            {/* Header info badges */}
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 px-2.5 py-1 rounded-full">
                <Shield size={10} className="text-[#ff5f1f]" />
                <span>NDA Protected</span>
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/5 border border-green-500/15 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>Response: ~15m</span>
              </span>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-16 h-16 bg-[#ff5f1f]/10 border border-[#ff5f1f] text-[#ff5f1f] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={28} />
                </div>
                <h3 className="text-2xl font-display font-bold mb-3 text-gray-900 dark:text-white">Inquiry Received!</h3>
                <p className="font-sans text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Thank you for reaching out. A partner from our solution engineering team will follow up within 15 minutes.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-display font-bold tracking-tight text-gray-900 dark:text-white">Send a Message</h3>

                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" style={labelStyle}>Your Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      style={getInputStyle('name') as any}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" style={labelStyle}>Business Email</label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="john@company.com"
                      value={formState.email}
                      onChange={e => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      style={getInputStyle('email') as any}
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" style={labelStyle}>Your Message</label>
                  <textarea
                    required
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project or how we can help..."
                    value={formState.message}
                    onChange={e => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...getInputStyle('message'), resize: 'none' } as any}
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#ff5f1f] hover:bg-[#ff7f50] font-bold transition-smooth text-sm flex items-center justify-center gap-2 group py-4 rounded-xl hover:-translate-y-1 text-white shadow-glow"
                >
                  Send Message
                  <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-smooth" />
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      {/* Global Interactive Meeting Booker Dialog (Calendly overlay) */}
      <AnimatePresence>
        {isCalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#070A0F] shadow-2xl p-6 md:p-8 z-10 text-gray-900 dark:text-white"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsCalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-display font-extrabold text-gray-900 dark:text-white">Consultation Booker</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Book a free 30-min discovery session with an engineering lead.</p>
              </div>

              {/* Step 1: Select Date */}
              {calStep === 1 && (
                <div className="space-y-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Step 1: Select Date</h4>
                  
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold font-sans">
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                      <span key={i} className="text-gray-400 py-1">{day}</span>
                    ))}
                    {daysInMonth.map((day) => {
                      const isAvailable = day % 3 !== 0 // Mock availability logic
                      return (
                        <button
                          key={day}
                          disabled={!isAvailable}
                          onClick={() => setSelectedDate(day)}
                          className={`py-2.5 rounded-lg text-xs font-bold transition-all ${
                            selectedDate === day
                              ? 'bg-[#ff5f1f] text-white'
                              : isAvailable
                              ? 'bg-gray-50 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200'
                              : 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      disabled={selectedDate === null}
                      onClick={() => setCalStep(2)}
                      className="px-6 py-3 rounded-xl bg-[#ff5f1f] disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#ff7f50] disabled:cursor-not-allowed transition-all"
                    >
                      <span>Next Step</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Time Slot & Information details */}
              {calStep === 2 && (
                <form onSubmit={handleBookMeeting} className="space-y-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Step 2: Select Time & Provide Info</h4>
                  
                  <div className="space-y-2">
                    <label style={labelStyle}>Available Time Slots</label>
                    <div className="flex flex-wrap gap-2">
                      {timeSlots.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold transition-all border ${
                            selectedTime === time
                              ? 'border-[#ff5f1f] bg-[#ff5f1f]/10 text-[#ff5f1f]'
                              : 'border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cal-name" style={labelStyle}>Your Name</label>
                      <input
                        required
                        type="text"
                        id="cal-name"
                        placeholder="John Doe"
                        value={calName}
                        onChange={e => setCalName(e.target.value)}
                        style={inputStyle as any}
                      />
                    </div>
                    <div>
                      <label htmlFor="cal-email" style={labelStyle}>Business Email</label>
                      <input
                        required
                        type="email"
                        id="cal-email"
                        placeholder="john@company.com"
                        value={calEmail}
                        onChange={e => setCalEmail(e.target.value)}
                        style={inputStyle as any}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setCalStep(1)}
                      className="text-xs text-gray-400 hover:text-[#ff5f1f] font-bold"
                    >
                      Back to Calendar
                    </button>
                    <button
                      type="submit"
                      disabled={!selectedTime || !calName || !calEmail}
                      className="px-6 py-3 rounded-xl bg-[#ff5f1f] disabled:bg-gray-300 dark:disabled:bg-gray-800 text-white font-bold text-xs flex items-center gap-1.5 hover:bg-[#ff7f50] disabled:cursor-not-allowed transition-all"
                    >
                      <span>Book Consultation</span>
                      <Check size={14} />
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Meeting Confirmation Screen */}
              {calStep === 3 && (
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500 text-emerald-500 flex items-center justify-center mx-auto shadow-glow">
                    <Check size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold text-gray-900 dark:text-white">Discovery Meeting Confirmed!</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 max-w-sm mx-auto">
                      A calendar invite and Zoom link has been dispatched to <span className="font-bold text-gray-800 dark:text-white">{calEmail}</span>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 max-w-xs mx-auto text-xs text-left space-y-2">
                    <p className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">Session Details</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">Topic:</span> TechFlow Discovery Call (30m)</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">Date:</span> June {selectedDate}, 2026</p>
                    <p className="text-gray-700 dark:text-gray-300"><span className="font-bold">Time:</span> {selectedTime} (UTC-8 / Pacific Time)</p>
                  </div>

                  <button
                    onClick={() => setIsCalOpen(false)}
                    className="px-8 py-3 rounded-xl bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-bold text-xs transition-all"
                  >
                    Done & Close
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

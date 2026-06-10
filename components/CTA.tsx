'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function CTA() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate API request
    setTimeout(() => {
      setSubmitted(true)
    }, 600)
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-secondary to-primary relative overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-accent/5 blur-[150px] rounded-full -z-10" />
      <div className="absolute top-10 left-0 w-96 h-96 bg-accent-violet/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Column 1: Info and Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-between h-full"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-6 tracking-tight">
                Ready to Transform Your <span className="gradient-text">Business?</span>
              </h2>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed font-sans">
                Let&apos;s discuss your project and discover how we can help you build custom technology solutions to scale your operations.
              </p>
            </div>

            {/* Visual Contact Cards list */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-secondary/50 border border-white/10 rounded-2xl p-5 hover:border-accent/40 transition-smooth group cursor-pointer shadow-glass">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-smooth">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold font-sans uppercase tracking-wider">Email Us</p>
                  <p className="text-base text-white font-sans mt-0.5">hello@enterprise.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-secondary/50 border border-white/10 rounded-2xl p-5 hover:border-accent/40 transition-smooth group cursor-pointer shadow-glass">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-smooth">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold font-sans uppercase tracking-wider">Call Us</p>
                  <p className="text-base text-white font-sans mt-0.5">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-secondary/50 border border-white/10 rounded-2xl p-5 hover:border-accent/40 transition-smooth group cursor-pointer shadow-glass">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center text-accent flex-shrink-0 group-hover:scale-110 transition-smooth">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold font-sans uppercase tracking-wider">Visit Us</p>
                  <p className="text-base text-white font-sans mt-0.5">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Custom Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 bg-secondary/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-10 shadow-glass relative"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-accent/20 border border-accent text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 font-sans max-w-sm mx-auto">
                  Thank you for reaching out. A partner from our solution engineering team will follow up within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-white tracking-tight">Send a Message</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs text-gray-400 font-bold font-sans uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      required
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-primary transition-smooth font-sans text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs text-gray-400 font-bold font-sans uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-primary transition-smooth font-sans text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs text-gray-400 font-bold font-sans uppercase tracking-wider mb-2">Subject / Interest</label>
                  <input
                    required
                    type="text"
                    id="subject"
                    placeholder="e.g. Custom SaaS development"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-primary transition-smooth font-sans text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs text-gray-400 font-bold font-sans uppercase tracking-wider mb-2">Message Details</label>
                  <textarea
                    required
                    id="message"
                    rows={4}
                    placeholder="Describe your goals, requirements, or timelines..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-primary/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-accent/50 focus:bg-primary transition-smooth font-sans text-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-hover text-primary font-bold transition-smooth text-sm flex items-center justify-center gap-2 group shadow-glow-cyan py-4 rounded-xl hover:-translate-y-1"
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


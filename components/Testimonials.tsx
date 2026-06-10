'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, TechStartup Inc',
    content: 'TechFlow transformed our complex digital vision into a polished reality. The engineering team was highly responsive, professional, and delivered well beyond our initial expectations.',
    rating: 5,
    initials: 'SJ',
    avatarBg: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Michael Chen',
    title: 'CTO, FinanceHub',
    content: 'Their expert guidance in high-throughput scalable database architecture helped our core platform seamlessly handle a 10x surge in user traffic. Highly recommended for enterprise projects.',
    rating: 5,
    initials: 'MC',
    avatarBg: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Emma Rodriguez',
    title: 'Product Manager, HealthCare Solutions',
    content: 'The SaaS software suite they researched and developed is now our primary revenue-driving product. Incredible attention to detail, sleek design aesthetics, and user experience.',
    rating: 5,
    initials: 'ER',
    avatarBg: 'from-cyan-500 to-blue-600',
  },
]

export default function Testimonials() {
  return (
    <section
      className="py-24 relative"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-500 blur-[120px] rounded-full -z-10 pointer-events-none"
        style={{ opacity: 'var(--glow-opacity)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans" style={{ color: 'var(--text-secondary)' }}>
            Trusted by leading engineering teams and executives worldwide
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-hover flex"
            >
              <div
                className="rounded-3xl p-8 flex flex-col justify-between w-full relative transition-smooth group"
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
                {/* Quote decorative */}
                <div className="absolute top-6 right-8 pointer-events-none" style={{ color: 'var(--border)', opacity: 0.4 }}>
                  <Quote size={56} className="fill-current" />
                </div>

                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-6">
                    {Array(testimonial.rating).fill(0).map((_, i) => (
                      <Star key={i} size={15} className="fill-[#22d3ee] text-[#22d3ee]" />
                    ))}
                  </div>

                  <p className="mb-8 leading-relaxed font-sans text-[15px] italic" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div
                  className="flex items-center gap-4 pt-6 mt-auto"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center text-white font-display font-bold text-sm shadow-md`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-base" style={{ color: 'var(--text-heading)' }}>{testimonial.name}</p>
                    <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import AnalyticsAnimation from '@/components/3d/AnalyticsAnimation'
import SecurityAnimation from '@/components/3d/SecurityAnimation'
import IntegrationsAnimation from '@/components/3d/IntegrationsAnimation'

const features = [
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Gain real-time insights into your operations with our highly customizable, enterprise-grade analytics engine. Monitor KPIs and drive data-backed decisions.',
    image: 'bg-gradient-to-br from-[#22d3ee]/20 to-[#a78bfa]/20',
    points: ['Real-time data synchronization', 'Custom report generation', 'Predictive ML modeling'],
  },
  {
    title: 'Secure Cloud Infrastructure',
    description: 'Deploy with confidence on our zero-trust cloud architecture. We provide military-grade encryption and compliance with global data protection standards.',
    image: 'bg-gradient-to-bl from-[#a78bfa]/20 to-[#22d3ee]/20',
    points: ['End-to-end encryption', 'SOC2 & GDPR Compliant', 'Automated threat detection'],
  },
  {
    title: 'Seamless Integrations',
    description: 'Connect your existing ecosystem effortlessly. Our robust API and pre-built connectors ensure that your tools talk to each other without friction.',
    image: 'bg-gradient-to-tr from-[#22d3ee]/20 to-[#a78bfa]/20',
    points: ['REST & GraphQL APIs', '50+ pre-built connectors', 'Webhooks & event streaming'],
  },
]

export default function Features() {
  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans" style={{ color: 'var(--text-secondary)' }}>
            Everything you need to scale your enterprise, built into one powerful platform.
          </p>
        </motion.div>

        <div className="space-y-24">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 0
            return (
              <div key={idx} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}>
                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <div
                    className={`aspect-video rounded-2xl relative overflow-hidden group p-4`}
                    style={{
                      border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-card)',
                      backgroundColor: 'var(--bg-card)',
                    }}
                  >
                    <div className={`absolute inset-0 ${feature.image} opacity-50 group-hover:opacity-90 transition-smooth`} />
                    <div
                      className="w-full h-full rounded-xl flex items-center justify-center relative z-10 overflow-hidden group-hover:scale-[1.02] transition-smooth animate-fade-in"
                      style={{
                        border: '1px solid var(--border)',
                        backgroundColor: 'var(--bg-secondary)',
                      }}
                    >
                      {idx === 0 && <AnalyticsAnimation />}
                      {idx === 1 && <SecurityAnimation />}
                      {idx === 2 && <IntegrationsAnimation />}
                    </div>
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="w-full lg:w-1/2"
                >
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 tracking-tight" style={{ color: 'var(--text-heading)' }}>
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-relaxed font-sans mb-8" style={{ color: 'var(--text-secondary)' }}>
                    {feature.description}
                  </p>
                  <ul className="space-y-4">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-3 font-sans" style={{ color: 'var(--text-primary)' }}>
                        <CheckCircle2 className="text-[#22d3ee] flex-shrink-0" size={20} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

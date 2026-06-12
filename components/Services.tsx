'use client'

import { motion } from 'framer-motion'
import { Code2, Smartphone, Database, Cloud, Brain, Zap } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Enterprise Web Apps',
    description: 'Scalable, high-performance web applications engineered for complex business requirements.',
    accentColor: '#22d3ee',
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Native and cross-platform mobile ecosystems delivering seamless user experiences.',
    accentColor: '#a78bfa',
  },
  {
    icon: Database,
    title: 'Data Architecture',
    description: 'Robust database systems and secure backend infrastructure for heavy data processing.',
    accentColor: '#22d3ee',
  },
  {
    icon: Cloud,
    title: 'Cloud Orchestration',
    description: 'Multi-cloud strategy, cost optimization, and resilient serverless architecture design.',
    accentColor: '#a78bfa',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent automation, predictive analytics, and bespoke machine learning models.',
    accentColor: '#22d3ee',
  },
  {
    icon: Zap,
    title: 'DevOps Automation',
    description: 'Streamlined CI/CD pipelines ensuring continuous delivery and high availability.',
    accentColor: '#a78bfa',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#22d3ee] blur-[150px] rounded-full -z-10 pointer-events-none"
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
            Enterprise <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive technology solutions engineered to scale and streamline your business operations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card-hover group"
              >
                <div
                  className="rounded-2xl p-8 h-full flex flex-col items-start relative overflow-hidden transition-smooth"
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = service.accentColor + '66'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `var(--shadow-card-hover), 0 0 20px ${service.accentColor}22`
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
                  }}
                >
                  {/* Top gradient glow bar on hover */}
                  <div
                    className="absolute top-0 inset-x-0 h-px w-1/2 mx-auto bg-gradient-to-r from-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth"
                    style={{ backgroundImage: `linear-gradient(to right, transparent, ${service.accentColor}, transparent)` }}
                  />

                  <div
                    className="p-4 rounded-xl mb-6 group-hover:scale-105 transition-smooth"
                    style={{
                      backgroundColor: service.accentColor + '15',
                      border: `1px solid ${service.accentColor}33`,
                      color: service.accentColor,
                    }}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="text-xl font-display font-bold mb-3 tracking-tight" style={{ color: 'var(--text-heading)' }}>
                    {service.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

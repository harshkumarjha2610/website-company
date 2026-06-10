'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const features = [
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Gain real-time insights into your operations with our highly customizable, enterprise-grade analytics engine. Monitor KPIs and drive data-backed decisions.',
    image: 'bg-gradient-to-br from-accent/20 to-accent-violet/20',
    points: ['Real-time data synchronization', 'Custom report generation', 'Predictive ML modeling'],
  },
  {
    title: 'Secure Cloud Infrastructure',
    description: 'Deploy with confidence on our zero-trust cloud architecture. We provide military-grade encryption and compliance with global data protection standards.',
    image: 'bg-gradient-to-bl from-accent-violet/20 to-accent/20',
    points: ['End-to-end encryption', 'SOC2 & GDPR Compliant', 'Automated threat detection'],
  },
  {
    title: 'Seamless Integrations',
    description: 'Connect your existing ecosystem effortlessly. Our robust API and pre-built connectors ensure that your tools talk to each other without friction.',
    image: 'bg-gradient-to-tr from-accent/20 to-accent-violet/20',
    points: ['REST & GraphQL APIs', '50+ pre-built connectors', 'Webhooks & event streaming'],
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-primary relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Platform <span className="gradient-text">Features</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans">
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
                  <div className={`aspect-video rounded-2xl border border-white/10 shadow-glass relative overflow-hidden group bg-secondary/50 backdrop-blur-sm p-4`}>
                    <div className={`absolute inset-0 ${feature.image} opacity-50 group-hover:opacity-80 transition-smooth`} />
                    {/* Placeholder for actual UI screenshot/visual */}
                    <div className="w-full h-full border border-white/10 rounded-xl bg-primary/80 backdrop-blur-md flex items-center justify-center relative z-10 overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-smooth">
                      <div className="w-32 h-32 bg-accent/20 blur-3xl rounded-full absolute" />
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
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-gray-400 leading-relaxed font-sans mb-8">
                    {feature.description}
                  </p>
                  <ul className="space-y-4">
                    {feature.points.map((point, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300 font-sans">
                        <CheckCircle2 className="text-accent flex-shrink-0" size={20} />
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

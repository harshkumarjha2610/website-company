'use client'

import { motion } from 'framer-motion'
import { Code2, Smartphone, Database, Cloud, Brain, Zap } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies, optimized for speed and scale.',
    badgeColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    description: 'High-performance native and cross-platform mobile solutions for iOS and Android.',
    badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
  },
  {
    icon: Database,
    title: 'Backend Systems',
    description: 'Robust database systems, architecture, and secure backend solutions for heavy data.',
    badgeColor: 'text-pink-400 bg-pink-500/10 border-pink-500/20'
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    description: 'Cloud architecture design, cost optimization, and multi-cloud server orchestration.',
    badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
  },
  {
    icon: Brain,
    title: 'AI & ML',
    description: 'Intelligent automation algorithms and tailored machine learning integration.',
    badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/20'
  },
  {
    icon: Zap,
    title: 'DevOps & CI/CD',
    description: 'Automated software delivery pipelines and cloud infrastructure optimization.',
    badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-primary to-secondary relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans">
            Comprehensive technology solutions engineered to scale and streamline your business operations
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
                <div className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 h-full hover:border-accent/40 hover:bg-slate-900/50 transition-smooth shadow-glass flex flex-col items-start">
                  <div className={`p-4 rounded-xl border ${service.badgeColor} mb-6 group-hover:scale-105 transition-smooth`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-[15px] text-gray-400 leading-relaxed font-sans">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


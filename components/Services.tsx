'use client'

import { motion } from 'framer-motion'
import { Code2, Smartphone, Database, Cloud, Brain, Zap } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Enterprise Web Apps',
    description: 'Scalable, high-performance web applications engineered for complex business requirements.',
    badgeColor: 'text-accent bg-accent/10 border-accent/20'
  },
  {
    icon: Smartphone,
    title: 'Mobile Solutions',
    description: 'Native and cross-platform mobile ecosystems delivering seamless user experiences.',
    badgeColor: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20'
  },
  {
    icon: Database,
    title: 'Data Architecture',
    description: 'Robust database systems and secure backend infrastructure for heavy data processing.',
    badgeColor: 'text-accent bg-accent/10 border-accent/20'
  },
  {
    icon: Cloud,
    title: 'Cloud Orchestration',
    description: 'Multi-cloud strategy, cost optimization, and resilient serverless architecture design.',
    badgeColor: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20'
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Intelligent automation, predictive analytics, and bespoke machine learning models.',
    badgeColor: 'text-accent bg-accent/10 border-accent/20'
  },
  {
    icon: Zap,
    title: 'DevOps Automation',
    description: 'Streamlined CI/CD pipelines ensuring continuous delivery and high availability.',
    badgeColor: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20'
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
            Enterprise <span className="gradient-text">Capabilities</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans">
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
                <div className="bg-secondary/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 h-full hover:border-accent/40 transition-smooth shadow-glass flex flex-col items-start relative overflow-hidden">
                  {/* Subtle top gradient glow on hover */}
                  <div className="absolute top-0 inset-x-0 h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                  
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


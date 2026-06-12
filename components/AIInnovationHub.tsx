'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Bot, Cog, Database, Network, MessageSquare, Eye, LineChart, ArrowRight } from 'lucide-react'

const aiServices = [
  { title: 'Generative AI', description: 'Create novel content, code, and designs autonomously with fine-tuned foundation models.', icon: <BrainCircuit className="w-8 h-8 text-cyan-400" />, gradient: 'from-cyan-500/20 to-blue-500/20', iconColor: '#22d3ee' },
  { title: 'AI Agents', description: 'Deploy autonomous agents that reason, plan, and execute complex multi-step enterprise workflows.', icon: <Bot className="w-8 h-8 text-violet-400" />, gradient: 'from-violet-500/20 to-fuchsia-500/20', iconColor: '#a78bfa' },
  { title: 'Enterprise Automation', description: 'Streamline legacy processes with intelligent RPA and cognitive automation pipelines.', icon: <Cog className="w-8 h-8 text-blue-400" />, gradient: 'from-blue-500/20 to-indigo-500/20', iconColor: '#60a5fa' },
  { title: 'Retrieval-Augmented Gen', description: 'Ground LLM responses in your proprietary enterprise data for hallucination-free insights.', icon: <Database className="w-8 h-8 text-emerald-400" />, gradient: 'from-emerald-500/20 to-cyan-500/20', iconColor: '#34d399' },
  { title: 'LLM Integration', description: 'Seamlessly embed state-of-the-art language models into your existing applications and products.', icon: <Network className="w-8 h-8 text-purple-400" />, gradient: 'from-purple-500/20 to-violet-500/20', iconColor: '#c084fc' },
  { title: 'AI Chatbots', description: 'Deliver 24/7 intelligent customer and employee support with context-aware conversational AI.', icon: <MessageSquare className="w-8 h-8 text-pink-400" />, gradient: 'from-pink-500/20 to-rose-500/20', iconColor: '#f472b6' },
  { title: 'Computer Vision', description: 'Extract actionable intelligence from images and video for quality control and security.', icon: <Eye className="w-8 h-8 text-sky-400" />, gradient: 'from-sky-500/20 to-blue-500/20', iconColor: '#38bdf8' },
  { title: 'Predictive Analytics', description: 'Forecast trends, detect anomalies, and optimize supply chains with advanced machine learning.', icon: <LineChart className="w-8 h-8 text-indigo-400" />, gradient: 'from-indigo-500/20 to-purple-500/20', iconColor: '#818cf8' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function AIInnovationHub() {
  return (
    <section
      id="ai-hub"
      className="py-24 relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-600 rounded-full blur-[120px]" style={{ opacity: 'var(--glow-opacity)' }} />
        <div className="absolute top-1/3 -left-20 w-72 h-72 bg-[#22d3ee] rounded-full blur-[100px]" style={{ opacity: 'var(--glow-opacity)' }} />
        <div className="absolute -bottom-20 right-1/3 w-80 h-80 bg-blue-600 rounded-full blur-[120px]" style={{ opacity: 'var(--glow-opacity)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              backgroundColor: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-sm font-medium font-sans tracking-wide uppercase" style={{ color: 'var(--text-secondary)' }}>AI & Innovation</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] via-blue-500 to-violet-500">Unleashed</span>
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-sans leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Transform your enterprise with state-of-the-art artificial intelligence. We build custom AI solutions that drive exponential growth and operational dominance.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {aiServices.map((service, index) => (
            <motion.div key={index} variants={cardVariants} className="group relative">
              <div
                className="h-full rounded-3xl p-8 relative overflow-hidden transition-smooth hover:-translate-y-2"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = service.iconColor + '40'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `var(--shadow-card-hover), 0 0 20px ${service.iconColor}15`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
                  ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-card)'
                }}
              >
                {/* Internal gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div
                  className="mb-6 relative z-10 p-3 rounded-2xl inline-block group-hover:scale-110 transition-smooth"
                  style={{
                    backgroundColor: service.iconColor + '12',
                    border: `1px solid ${service.iconColor}25`,
                  }}
                >
                  {service.icon}
                </div>

                <h3 className="text-xl font-display font-bold mb-3 tracking-tight relative z-10" style={{ color: 'var(--text-heading)' }}>
                  {service.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed relative z-10" style={{ color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#22d3ee] to-violet-600 text-white font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
            style={{ boxShadow: '0 0 40px rgba(34,211,238,0.2)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              Explore AI Solutions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

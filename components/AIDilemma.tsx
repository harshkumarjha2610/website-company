'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { RefreshCw, Coins, ShieldCheck, Users, ArrowRight } from 'lucide-react'

const dilemmaCards = [
  {
    num: '01',
    title: 'Process Optimization & Value Chains',
    desc: 'Identify bottlenecks in your operational workflows, automate routine manual tasks, and introduce real-time predictive scheduling to streamline production pipelines.',
    icon: RefreshCw,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    num: '02',
    title: 'Minimize In-house AI Costs & Risks',
    desc: 'Building custom infrastructure from scratch is highly capital-intensive. We leverage field-tested integrations and SaaS middleware models to deliver rapid enterprise ROI.',
    icon: Coins,
    color: 'from-orange-500 to-amber-500',
    glowColor: 'rgba(249, 115, 22, 0.15)',
  },
  {
    num: '03',
    title: 'Break Scale & Adoption Barriers',
    desc: 'Overcome strict security guidelines, compliance requirements, and compute scaling bottlenecks with our enterprise-grade private LLM fine-tuning pipelines.',
    icon: ShieldCheck,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    num: '04',
    title: 'Elite Dedicated Engineering Squads',
    desc: 'Avoid recruitment delays. Instantly access our senior prompt engineers, machine learning scientists, and certified architects to accelerate product engineering.',
    icon: Users,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.15)',
  },
]

export default function AIDilemma() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="ai-dilemma"
      className="py-24 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff5f1f] bg-[#ff5f1f]/10 px-3 py-1 rounded-full">
              Enterprise Solution Strategy
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold mt-6 mb-6 tracking-tight text-gray-900 dark:text-white leading-tight">
              Solving Your <span className="gradient-text">Enterprise AI Dilemma</span>
            </h2>
            <p className="text-base md:text-lg font-sans leading-relaxed text-gray-500 dark:text-gray-400">
              Taking an industry-first approach, we combine agility, deep technical expertise, and secure custom integrations to accelerate your digital maturity and unlock true business value.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Dilemma Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {dilemmaCards.map((card, idx) => {
            const Icon = card.icon
            const isHovered = hoveredIndex === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative rounded-3xl p-8 border transition-all duration-500 group overflow-hidden cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  borderColor: isHovered ? 'transparent' : 'var(--border)',
                  boxShadow: isHovered ? `var(--shadow-card-hover), 0 0 35px ${card.glowColor}` : 'var(--shadow-card)',
                }}
              >
                {/* Gradient background glow on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500`}
                />

                {/* Corner light shine */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${card.color} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-500 group-hover:scale-150`}
                />

                <div className="flex flex-col justify-between h-full relative z-10">
                  <div>
                    {/* Card Top Row */}
                    <div className="flex justify-between items-start mb-8">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 group-hover:text-white bg-gradient-to-br group-hover:${card.color} transition-all duration-500 shadow-sm`}
                      >
                        <Icon size={20} className="group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                      <span className="text-3xl font-display font-extrabold text-gray-200 dark:text-white/10 group-hover:text-white/20 transition-colors">
                        {card.num}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-4 tracking-tight text-gray-900 dark:text-white group-hover:text-[#ff5f1f] dark:group-hover:text-white transition-colors">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="font-sans text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {card.desc}
                    </p>
                  </div>

                  {/* CTA Link inside Card */}
                  <div className="mt-8 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-[#ff5f1f] transition-all">
                    <span>Learn our approach</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

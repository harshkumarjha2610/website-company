'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { caseStudies, CaseStudy } from '@/data/caseStudies'
import { ArrowRight, ChevronRight, Activity, TrendingUp, Users, DollarSign, Sparkles } from 'lucide-react'

/* ── colour palette per card index ── */
const PALETTE = [
  { gradient: 'from-cyan-500 via-blue-600 to-indigo-700',   accent: '#22d3ee', glow: 'rgba(34,211,238,0.18)'   },
  { gradient: 'from-violet-500 via-purple-600 to-fuchsia-700', accent: '#a78bfa', glow: 'rgba(167,139,250,0.18)' },
  { gradient: 'from-emerald-500 via-teal-600 to-cyan-700',  accent: '#34d399', glow: 'rgba(52,211,153,0.18)'   },
]

/* ── animated counter ── */
function AnimatedCounter({ value, prefix = '', suffix = '' }: { value: string; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const target = parseFloat(value)
  useEffect(() => {
    let startTime: number
    const animate = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / 2000, 1)
      setCount(target * (1 - Math.pow(1 - progress, 4)))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target])
  return <span className="font-display font-bold tabular-nums">{prefix}{target % 1 === 0 ? Math.round(count) : count.toFixed(1)}{suffix}</span>
}

/* ── Left Side Indicator (Slides in from slight left) ── */
function LeftCaseStudyIndicator({
  index,
  total,
  palette,
  industry,
}: {
  index: number
  total: number
  palette: typeof PALETTE[0]
  industry: string
}) {
  return (
    <div
      className="p-8 sm:p-10 rounded-[32px] relative overflow-hidden backdrop-blur-xl h-full flex flex-col justify-between transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${palette.accent}30`,
        boxShadow: `0 20px 50px -15px ${palette.glow}, 0 4px 20px rgba(0,0,0,0.3)`,
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl pointer-events-none"
        style={{ background: palette.accent, opacity: 0.2 }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        style={{ background: palette.accent, opacity: 0.1 }}
      />

      {/* Top tag */}
      <div className="relative z-10">
        <span
          className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.25em] rounded-full mb-3"
          style={{
            background: `${palette.accent}15`,
            border: `1px solid ${palette.accent}35`,
            color: palette.accent,
          }}
        >
          {industry}
        </span>
        <h3
          className="text-2xl sm:text-3xl font-display font-black tracking-tight"
          style={{ color: 'var(--text-heading)' }}
        >
          Case Study
        </h3>
      </div>

      {/* Center large number */}
      <div className="my-8 relative z-10">
        <div className="flex items-baseline gap-2">
          <span
            className="font-display font-black text-6xl sm:text-7xl lg:text-8xl tabular-nums leading-none tracking-tight"
            style={{ color: palette.accent }}
          >
            0{index + 1}
          </span>
          <span
            className="text-2xl font-display font-bold opacity-30"
            style={{ color: 'var(--text-secondary)' }}
          >
            / 0{total}
          </span>
        </div>
        <div className="w-16 h-1 rounded-full mt-4" style={{ backgroundColor: palette.accent }} />
      </div>

      {/* Bottom badge */}
      <div className="relative z-10 pt-4 border-t border-white/5 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ backgroundColor: palette.accent }} />
        <span className="text-xs font-semibold tracking-wide uppercase" style={{ color: 'var(--text-secondary)' }}>
          Enterprise Transformation
        </span>
      </div>
    </div>
  )
}

/* ── Right Side Rich Card (Slides in from slight right) ── */
function RightCaseStudyCard({ study, palette }: { study: CaseStudy; palette: typeof PALETTE[0] }) {
  return (
    <div
      className="w-full rounded-[32px] overflow-hidden transition-all duration-300"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${palette.accent}30`,
        boxShadow: `0 0 0 1px ${palette.accent}15, 0 30px 80px ${palette.glow}, 0 8px 30px rgba(0,0,0,0.35)`,
      }}
    >
      {/* ── gradient header ── */}
      <div className={`relative bg-gradient-to-br ${palette.gradient} p-8 md:p-12 overflow-hidden`}>
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-black/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/20 text-white/95 backdrop-blur-sm mb-4">
              {study.industry}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white leading-tight max-w-xl">
              {study.projectName}
            </h3>
          </div>

          {/* Metrics row in header */}
          <div className="flex gap-6 flex-wrap">
            {Object.entries(study.metrics).map(([key, m]) =>
              m ? (
                <div key={key} className="text-left md:text-center min-w-[75px]">
                  <p className="text-2xl md:text-3xl font-display font-bold text-white">
                    <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[11px] text-white/80 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* ── body ── */}
      <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8 md:gap-10">
        {/* Left col */}
        <div className="space-y-7">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-2.5 font-sans" style={{ color: palette.accent }}>
              The Challenge
            </h4>
            <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
              {study.challenge}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-2.5 font-sans" style={{ color: palette.accent }}>
              Our Solution
            </h4>
            <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
              {study.solution}
            </p>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-7">
          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-2.5 font-sans" style={{ color: palette.accent }}>
              Key Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map(t => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium"
                  style={{
                    background: `${palette.accent}12`,
                    border: `1px solid ${palette.accent}30`,
                    color: palette.accent,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Key outcomes */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-2.5 font-sans" style={{ color: palette.accent }}>
              Key Outcomes
            </h4>
            <ul className="space-y-2">
              {study.keyOutcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-sans" style={{ color: 'var(--text-secondary)' }}>
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Main Section ── */
export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative overflow-hidden py-24 md:py-32"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Background ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[650px] h-[650px] bg-gradient-to-br from-violet-600 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ opacity: 'var(--glow-opacity)' }}
        />
        <div
          className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#22d3ee] to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"
          style={{ opacity: 'var(--glow-opacity)' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header (No overlap with any card) ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-white/5">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4"
              style={{
                background: 'rgba(34,211,238,0.1)',
                border: '1px solid rgba(34,211,238,0.25)',
                color: '#22d3ee',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Proven Impact
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
              Featured <span className="gradient-text">Success Stories</span>
            </h2>
            <p className="text-base sm:text-lg font-sans leading-relaxed mt-3" style={{ color: 'var(--text-secondary)' }}>
              Engineered digital transformation for global enterprises — delivering measurable business value through advanced technology.
            </p>
          </div>

          <div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all group shadow-sm hover:shadow-cyan-500/20"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#22d3ee'
                e.currentTarget.style.color = '#22d3ee'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.color = 'var(--text-primary)'
              }}
            >
              View All Case Studies
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* ── Case Studies List: Coordinated Slide Animations ── */}
        <div className="space-y-16 md:space-y-24">
          {caseStudies.map((study, index) => {
            const palette = PALETTE[index % PALETTE.length]

            return (
              <div
                key={study.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
              >
                {/* ── LEFT: Case Study 1, 2, 3 slides in from slight left ── */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="lg:col-span-4"
                >
                  <LeftCaseStudyIndicator
                    index={index}
                    total={caseStudies.length}
                    palette={palette}
                    industry={study.industry}
                  />
                </motion.div>

                {/* ── RIGHT: Card slides in from slight right ── */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="lg:col-span-8"
                >
                  <RightCaseStudyCard study={study} palette={palette} />
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

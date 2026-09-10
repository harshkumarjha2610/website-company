'use client'

import { useEffect, useState } from 'react'

import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { caseStudies, CaseStudy } from '@/data/caseStudies'
import { ArrowRight, ChevronRight, Activity, TrendingUp, Users, DollarSign } from 'lucide-react'

/* ── colour palette per card index ── */
const PALETTE = [
  { gradient: 'from-cyan-500 via-blue-600 to-indigo-700',   accent: '#22d3ee', glow: 'rgba(34,211,238,0.12)'   },
  { gradient: 'from-violet-500 via-purple-600 to-fuchsia-700', accent: '#a78bfa', glow: 'rgba(167,139,250,0.12)' },
  { gradient: 'from-emerald-500 via-teal-600 to-cyan-700',  accent: '#34d399', glow: 'rgba(52,211,153,0.12)'   },
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

/* ── metric icon helper ── */
function MetricIcon({ metricKey }: { metricKey: string }) {
  if (metricKey.includes('revenue'))    return <DollarSign className="w-4 h-4" />
  if (metricKey.includes('cost'))       return <DollarSign className="w-4 h-4" />
  if (metricKey.includes('efficiency')) return <Activity className="w-4 h-4" />
  if (metricKey.includes('user'))       return <Users className="w-4 h-4" />
  return <TrendingUp className="w-4 h-4" />
}

/* ── the rich card that sits inside ContainerScroll ── */
function CaseStudyCard({ study, palette }: { study: CaseStudy; palette: typeof PALETTE[0] }) {
  return (
    <div
      className="w-full rounded-[28px] overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${palette.accent}25`,
        boxShadow: `0 0 0 1px ${palette.accent}10, 0 32px 80px ${palette.glow}, 0 8px 24px rgba(0,0,0,0.3)`,
      }}
    >
      {/* ── gradient header ── */}
      <div className={`relative bg-gradient-to-br ${palette.gradient} p-8 md:p-12 overflow-hidden`}>
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-20 w-32 h-32 rounded-full bg-black/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full bg-white/20 text-white/90 backdrop-blur-sm mb-4">
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
                <div key={key} className="text-center">
                  <p className="text-2xl md:text-3xl font-display font-bold text-white">
                    <AnimatedCounter value={m.value} prefix={m.prefix} suffix={m.suffix} />
                  </p>
                  <p className="text-[11px] text-white/70 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>

      {/* ── body ── */}
      <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10">
        {/* Left col */}
        <div className="space-y-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-3 font-sans" style={{ color: palette.accent }}>
              The Challenge
            </h4>
            <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
              {study.challenge}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-3 font-sans" style={{ color: palette.accent }}>
              Our Solution
            </h4>
            <p className="text-sm leading-relaxed font-sans" style={{ color: 'var(--text-secondary)' }}>
              {study.solution}
            </p>
          </div>
        </div>

        {/* Right col */}
        <div className="space-y-8">
          {/* Tech stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-3 font-sans" style={{ color: palette.accent }}>
              Key Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {study.technologies.map(t => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-sans font-medium"
                  style={{
                    background: `${palette.accent}10`,
                    border: `1px solid ${palette.accent}25`,
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
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] mb-3 font-sans" style={{ color: palette.accent }}>
              Key Outcomes
            </h4>
            <ul className="space-y-2">
              {study.keyOutcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm font-sans" style={{ color: 'var(--text-secondary)' }}>
                  <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: palette.accent }} />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── section ── */
export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Background glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gradient-to-br from-violet-600 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" style={{ opacity: 'var(--glow-opacity)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#22d3ee] to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" style={{ opacity: 'var(--glow-opacity)' }} />
      </div>

      {/* HeroScrollDemo pattern: flex flex-col overflow-hidden wrapping all ContainerScrolls */}
      <div className="flex flex-col overflow-hidden relative z-10">
        {caseStudies.map((study, index) => {
          const palette = PALETTE[index % PALETTE.length]
          const isFirst = index === 0

          return (
            <ContainerScroll
              key={study.id}
              titleComponent={
                isFirst ? (
                  /* Section heading above first card */
                  <div className="px-4 mb-2">
                    <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-3 tracking-tight" style={{ color: 'var(--text-heading)' }}>
                      Featured <span className="gradient-text">Success Stories</span>
                    </h2>
                    <p className="text-lg font-sans leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                      Engineered digital transformation for global enterprises — delivering measurable business value through advanced technology.
                    </p>
                    <div className="flex items-center justify-center mt-4">
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 font-sans font-medium text-sm hover:text-[#22d3ee] transition-colors group"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        View All Case Studies
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Label for 2nd and 3rd cards */
                  <p
                    className="text-sm font-bold uppercase tracking-[0.2em] mb-2"
                    style={{ color: palette.accent }}
                  >
                    Case Study {index + 1} of {caseStudies.length}
                  </p>
                )
              }
            >
              <CaseStudyCard study={study} palette={palette} />
            </ContainerScroll>
          )
        })}
      </div>
    </section>
  )
}


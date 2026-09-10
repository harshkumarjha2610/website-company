'use client'

import { motion } from 'framer-motion'
import CardSwap, { Card } from '@/components/ui/CardSwap'

/* ── Icons ── */
const FrontendIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
const BackendIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
const CloudIcon     = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>
const AIIcon        = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 22A2.5 2.5 0 0 1 12 19.5v-15a2.5 2.5 0 0 1 5 0v15a2.5 2.5 0 0 1-2.5 2z"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>
const DatabaseIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>

/* ── Ecosystem data ── */
const ecosystem = [
  {
    category: 'Frontend',
    tagline: 'Pixel-perfect interfaces at scale',
    Icon: FrontendIcon,
    gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
    accentColor: '#22d3ee',
    glowColor: 'rgba(34,211,238,0.15)',
    tech: [
      { name: 'React',       sub: 'UI Library'       },
      { name: 'Next.js',     sub: 'SSR Framework'    },
      { name: 'TypeScript',  sub: 'Type Safety'      },
      { name: 'Angular',     sub: 'Enterprise SPA'   },
      { name: 'Tailwind',    sub: 'Utility CSS'      },
      { name: 'Framer',      sub: 'Animations'       },
    ],
  },
  {
    category: 'Backend',
    tagline: 'Resilient APIs powering complex systems',
    Icon: BackendIcon,
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    accentColor: '#34d399',
    glowColor: 'rgba(52,211,153,0.15)',
    tech: [
      { name: 'Node.js',  sub: 'JS Runtime'       },
      { name: 'Python',   sub: 'AI & Scripting'   },
      { name: 'Java',     sub: 'Enterprise JVM'   },
      { name: '.NET',     sub: 'Microsoft Stack'  },
      { name: 'GraphQL',  sub: 'Query Language'   },
      { name: 'REST',     sub: 'API Standard'     },
    ],
  },
  {
    category: 'Cloud & DevOps',
    tagline: 'Infrastructure that scales without limits',
    Icon: CloudIcon,
    gradient: 'from-blue-500 via-sky-500 to-indigo-500',
    accentColor: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.15)',
    tech: [
      { name: 'AWS',        sub: 'Cloud Leader'      },
      { name: 'Azure',      sub: 'Microsoft Cloud'   },
      { name: 'GCP',        sub: 'Google Cloud'      },
      { name: 'Docker',     sub: 'Containerisation'  },
      { name: 'Kubernetes', sub: 'Orchestration'     },
      { name: 'Terraform',  sub: 'IaC'               },
    ],
  },
  {
    category: 'AI & Data',
    tagline: 'Intelligent systems that learn and adapt',
    Icon: AIIcon,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    accentColor: '#a78bfa',
    glowColor: 'rgba(167,139,250,0.15)',
    tech: [
      { name: 'OpenAI',      sub: 'GPT Models'       },
      { name: 'Claude',      sub: 'Anthropic AI'     },
      { name: 'Gemini',      sub: 'Google AI'        },
      { name: 'LangChain',   sub: 'LLM Orchestration'},
      { name: 'PyTorch',     sub: 'Deep Learning'    },
      { name: 'Pinecone',    sub: 'Vector DB'        },
    ],
  },
  {
    category: 'Database',
    tagline: 'Data architecture built for the long run',
    Icon: DatabaseIcon,
    gradient: 'from-rose-500 via-orange-500 to-amber-500',
    accentColor: '#fb923c',
    glowColor: 'rgba(251,146,60,0.15)',
    tech: [
      { name: 'PostgreSQL', sub: 'Relational DB'  },
      { name: 'MongoDB',    sub: 'Document Store' },
      { name: 'Redis',      sub: 'In-Memory Cache'},
      { name: 'Snowflake',  sub: 'Data Warehouse' },
      { name: 'Cassandra',  sub: 'Wide Column'    },
      { name: 'Supabase',   sub: 'BaaS'           },
    ],
  },
]

/* ── Single stack card ── */
function EcosystemCard({
  category, tagline, Icon, gradient, accentColor, glowColor, tech,
}: typeof ecosystem[0]) {
  return (
    <div
      className="w-full h-full rounded-[28px] overflow-hidden flex flex-col relative"
      style={{
        background: 'var(--bg-card)',
        border: `1px solid ${accentColor}30`,
        boxShadow: `0 0 0 1px ${accentColor}15, 0 24px 60px ${glowColor}, 0 8px 24px rgba(0,0,0,0.25)`,
      }}
    >
      {/* ── Gradient header strip ── */}
      <div className={`relative h-36 flex-shrink-0 bg-gradient-to-br ${gradient} flex flex-col justify-end p-7 overflow-hidden`}>
        {/* Decorative blobs */}
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-12 w-20 h-20 rounded-full bg-black/10 blur-xl" />

        {/* Category badge */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-sm text-white">
            <Icon />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">Tech Stack</p>
            <h3 className="text-2xl font-bold text-white leading-tight">{category}</h3>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 flex flex-col p-7 gap-6">
        {/* Tagline */}
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {tagline}
        </p>

        {/* Tech pills grid */}
        <div className="grid grid-cols-2 gap-2.5 flex-1">
          {tech.map(({ name, sub }) => (
            <div
              key={name}
              className="flex flex-col gap-0.5 rounded-xl px-4 py-3 transition-all duration-200 group/pill"
              style={{
                background: `${accentColor}08`,
                border: `1px solid ${accentColor}20`,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = `${accentColor}18`
                el.style.borderColor = `${accentColor}50`
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = `${accentColor}08`
                el.style.borderColor = `${accentColor}20`
              }}
            >
              <span
                className="text-[13px] font-bold leading-tight"
                style={{ color: accentColor }}
              >
                {name}
              </span>
              <span className="text-[11px] leading-tight" style={{ color: 'var(--text-secondary)' }}>
                {sub}
              </span>
            </div>
          ))}
        </div>

        {/* Accent bar at bottom */}
        <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${gradient} opacity-40`} />
      </div>
    </div>
  )
}

/* ── Section ── */
export default function TechnologyEcosystem() {
  return (
    <section
      id="ecosystem"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--border) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight"
            style={{ color: 'var(--text-heading)' }}
          >
            Technology{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Ecosystem
            </span>
          </h2>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            We architect future-proof digital platforms utilizing a curated stack of world-class
            frameworks and cloud infrastructure.
          </p>
        </motion.div>

        {/* Card swap + side stat list */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── CardSwap stack (left / centered on mobile) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[420px] flex-shrink-0"
            style={{ height: '520px' }}
          >
            <CardSwap
              cardDistance={55}
              verticalDistance={65}
              delay={4500}
              pauseOnHover={true}
            >
              {ecosystem.map(cat => (
                <Card key={cat.category}>
                  <EcosystemCard {...cat} />
                </Card>
              ))}
            </CardSwap>
          </motion.div>

          {/* ── Right: category list ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex-1 w-full grid sm:grid-cols-2 gap-4"
          >
            {ecosystem.map((cat, idx) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 + idx * 0.07 }}
                className="flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 group"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${cat.accentColor}40`
                  el.style.boxShadow   = `0 0 20px ${cat.glowColor}`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--border)'
                  el.style.boxShadow   = 'none'
                }}
              >
                {/* Icon bubble */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${cat.accentColor}15`,
                    border: `1px solid ${cat.accentColor}30`,
                    color: cat.accentColor,
                  }}
                >
                  <cat.Icon />
                </div>

                <div className="min-w-0">
                  <h4
                    className="text-sm font-bold mb-1 tracking-tight"
                    style={{ color: 'var(--text-heading)' }}
                  >
                    {cat.category}
                  </h4>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {cat.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {cat.tech.slice(0, 3).map(t => (
                      <span
                        key={t.name}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: `${cat.accentColor}12`,
                          border: `1px solid ${cat.accentColor}25`,
                          color: cat.accentColor,
                        }}
                      >
                        {t.name}
                      </span>
                    ))}
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{ color: 'var(--text-secondary)', background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                      +{cat.tech.length - 3} more
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { Check, X, ShieldAlert, Sparkles, Zap, Shield, Clock } from 'lucide-react'

interface FeatureRow {
  name: string
  icon: React.ReactNode
  techflow: { text: string; sub: string; success: boolean }
  traditional: { text: string; sub: string; success: boolean }
}

export default function WhyChooseUs() {
  const rows: FeatureRow[] = [
    {
      name: 'Development & Delivery Speed',
      icon: <Zap className="text-[#ff5f1f]" size={20} />,
      techflow: {
        text: 'AI-Accelerated (4x Faster)',
        sub: 'Production ready codebases deployed in weeks via automated workflows.',
        success: true
      },
      traditional: {
        text: 'Legacy Iterations (Slow)',
        sub: 'Months of manual drafting, coding, and waterfall review cycles.',
        success: false
      }
    },
    {
      name: 'System Architecture',
      icon: <Sparkles className="text-purple-500" size={20} />,
      techflow: {
        text: 'AI-First & Scalable Microservices',
        sub: 'Embedded generative cognitive layers, vector storage, and neural integrations.',
        success: true
      },
      traditional: {
        text: 'Standard Boilerplates',
        sub: 'Basic database-to-UI templates lacking autonomous capabilities.',
        success: false
      }
    },
    {
      name: 'Security & Enterprise Compliance',
      icon: <Shield className="text-emerald-500" size={20} />,
      techflow: {
        text: 'Advanced Compliance (SOC2/GDPR/NDA)',
        sub: 'Strict sandboxing, end-to-end data encryption, and corporate IP protection.',
        success: true
      },
      traditional: {
        text: 'Ad-hoc Basic Firewalls',
        sub: 'Standard TLS encryption without formal regulatory credentials.',
        success: false
      }
    },
    {
      name: 'Dedicated Staff & Domain Experts',
      icon: <ShieldAlert className="text-blue-500" size={20} />,
      techflow: {
        text: 'Senior Software Engineers & Architects',
        sub: 'Full access to specialized tech leads, data scientists, and DevOps practitioners.',
        success: true
      },
      traditional: {
        text: 'Outsourced Shared Juniors',
        sub: 'Resources shared across multiple projects, leading to coordination lags.',
        success: false
      }
    },
    {
      name: 'Support & Global Deployment',
      icon: <Clock className="text-pink-500" size={20} />,
      techflow: {
        text: '24/7 SLA & Multi-Region Squads',
        sub: 'Constant coverage, zero downtime deployments, and proactive site monitoring.',
        success: true
      },
      traditional: {
        text: 'Single Timezone Support',
        sub: 'Offline during weekends, response delays, and operational bottlenecks.',
        success: false
      }
    }
  ]

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Background decoration grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, var(--border) 1px, transparent 0)',
          backgroundSize: '48px 48px',
          opacity: 0.3,
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white/10 dark:from-black/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight text-gray-900 dark:text-white">
            Why Choose <span className="bg-gradient-to-r from-[#ff5f1f] to-purple-600 bg-clip-text text-transparent">TechFlow</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto font-sans text-gray-500 dark:text-gray-400">
            A modern collaborative engineering partnership vs. traditional outsourcing development agencies.
          </p>
        </motion.div>

        {/* Matrix Container */}
        <div className="overflow-x-auto rounded-3xl border border-gray-200/80 dark:border-white/10 shadow-2xl backdrop-blur-md bg-white/60 dark:bg-black/30">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-gray-400">Capabilities</th>
                
                {/* TechFlow Premium Column Header */}
                <th className="p-6 text-sm font-extrabold tracking-wide text-[#ff5f1f] relative">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f1f] animate-ping" />
                    <span>TechFlow SaaS Partnership</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#ff5f1f]" />
                </th>
                
                <th className="p-6 text-sm font-bold tracking-wide text-gray-500 dark:text-gray-400">Traditional Agencies</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-200 dark:divide-white/10 font-sans">
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50/30 dark:hover:bg-white/5 transition-colors"
                >
                  {/* Capabilities Category Name */}
                  <td className="p-6 max-w-xs align-top">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-gray-100 dark:bg-white/5">
                        {row.icon}
                      </div>
                      <span className="font-display font-bold text-gray-800 dark:text-white text-sm md:text-base">
                        {row.name}
                      </span>
                    </div>
                  </td>

                  {/* TechFlow Column Content */}
                  <td className="p-6 bg-[#ff5f1f]/5 dark:bg-[#ff5f1f]/5 align-top border-x border-[#ff5f1f]/10">
                    <div className="flex gap-2">
                      <Check className="text-emerald-500 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {row.techflow.text}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                          {row.techflow.sub}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Traditional Agencies Content */}
                  <td className="p-6 align-top">
                    <div className="flex gap-2">
                      <X className="text-gray-400 dark:text-gray-600 mt-0.5 flex-shrink-0" size={18} />
                      <div>
                        <p className="font-bold text-gray-500 dark:text-gray-400 text-sm">
                          {row.traditional.text}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 leading-relaxed">
                          {row.traditional.sub}
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  )
}

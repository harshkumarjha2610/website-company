'use client'

import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import SphereAnimation from './3d/SphereAnimation'

const products = [
  {
    name: 'CloudSync',
    description: 'Real-time data synchronization and secure team collaboration platform.',
    price: '$49',
    features: [
      'Real-time syncing & backups',
      'Up to 10 team members',
      'Version history (30 days)',
      'Basic API access',
      '24/7 Email support',
    ],
  },
  {
    name: 'AnalyticsPro',
    description: 'Advanced analytics, visual charts, and predictive business intelligence.',
    price: '$99',
    features: [
      'Custom dashboards & analytics',
      'Unlimited team members',
      'Predictive machine learning models',
      'Full REST API integration',
      'Priority slack & video support',
    ],
    featured: true,
  },
  {
    name: 'SecureVault',
    description: 'Enterprise-grade encryption, data compliance, and role access auditing.',
    price: '$199',
    features: [
      'End-to-end client-side encryption',
      'Comprehensive audit logs & security checks',
      'HIPAA & GDPR compliance reports',
      'SSO & SAML integration',
      'Dedicated accounts manager support',
    ],
  },
]

export default function SaaS() {
  return (
    <section
      id="saas"
      className="py-24 relative overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* 3D sphere background */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] -z-10 opacity-40 pointer-events-none">
        <SphereAnimation />
      </div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-[#22d3ee] blur-[120px] rounded-full -z-10 pointer-events-none" style={{ opacity: 'var(--glow-opacity)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight" style={{ color: 'var(--text-heading)' }}>
            Our <span className="gradient-text">SaaS Products</span>
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto font-sans" style={{ color: 'var(--text-secondary)' }}>
            Scalable, secure, and smart cloud applications built to empower modern workflows
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-20">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card-hover flex ${product.featured ? 'md:scale-[1.03] z-10' : ''}`}
            >
              <div
                className="rounded-3xl p-8 flex flex-col justify-between w-full transition-smooth relative overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: product.featured ? '2px solid #22d3ee' : '1px solid var(--border)',
                  boxShadow: product.featured ? 'var(--shadow-glow), var(--shadow-card)' : 'var(--shadow-card)',
                }}
              >
                {product.featured && (
                  <>
                    {/* Top accent bar */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#22d3ee] to-purple-500" />
                    <div className="bg-gradient-to-r from-[#22d3ee] to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-6 w-fit">
                      Most Popular
                    </div>
                  </>
                )}

                <div>
                  <h3 className="text-2xl font-display font-bold mb-2 tracking-tight" style={{ color: 'var(--text-heading)' }}>
                    {product.name}
                  </h3>
                  <p className="text-[14px] leading-relaxed font-sans mb-8" style={{ color: 'var(--text-secondary)' }}>
                    {product.description}
                  </p>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-display font-extrabold tracking-tight" style={{ color: 'var(--text-heading)' }}>
                      {product.price}
                    </span>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>/month</span>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 pt-8 mb-8" style={{ borderTop: '1px solid var(--border)' }}>
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full border text-[#22d3ee] flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(34,211,238,0.08)', borderColor: 'rgba(34,211,238,0.25)' }}>
                          <Check size={14} />
                        </div>
                        <span className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  className={`w-full py-3.5 rounded-xl font-bold transition-smooth text-sm flex items-center justify-center gap-2 group ${
                    product.featured ? 'bg-gradient-to-r from-[#22d3ee] to-purple-600 hover:from-[#0891b2] hover:to-purple-700 text-white hover:scale-[1.02]' : ''
                  }`}
                  style={!product.featured ? {
                    border: '1px solid #22d3ee',
                    color: '#22d3ee',
                    backgroundColor: 'rgba(34,211,238,0.06)',
                  } : { boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
                  onMouseEnter={e => {
                    if (!product.featured) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,211,238,0.12)'
                      ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.02)'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!product.featured) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(34,211,238,0.06)'
                      ;(e.currentTarget as HTMLElement).style.transform = ''
                    }
                  }}
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-smooth" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--shadow-glass)',
          }}
        >
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#22d3ee]/5 to-transparent -z-10" />
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 tracking-tight" style={{ color: 'var(--text-heading)' }}>
              Looking for custom Enterprise solutions?
            </h3>
            <p className="font-sans text-[15px] leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
              We engineer tailor-made SaaS frameworks and custom private clouds, including dedicated customer success agents and high SLA support packages.
            </p>
          </div>
          <button
            className="bg-gradient-to-r from-[#22d3ee] to-purple-600 hover:from-[#0891b2] hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-smooth flex-shrink-0 hover:scale-[1.02]"
            style={{ boxShadow: '0 0 20px rgba(34,211,238,0.2)' }}
          >
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  )
}

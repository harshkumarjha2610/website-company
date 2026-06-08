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
      '24/7 Email support'
    ]
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
      'Priority slack & video support'
    ],
    featured: true
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
      'Dedicated accounts manager support'
    ]
  },
]

export default function SaaS() {
  return (
    <section id="saas" className="py-24 bg-gradient-to-b from-secondary to-primary relative overflow-hidden">
      {/* 3D Sphere Animation Background */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] -z-10 opacity-40 pointer-events-none">
        <SphereAnimation />
      </div>
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-extrabold mb-4 tracking-tight">
            Our <span className="gradient-text">SaaS Products</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-sans">
            Scalable, secure, and smart cloud applications built to empower modern workflows
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
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
              <div className={`border rounded-3xl p-8 flex flex-col justify-between w-full transition-smooth relative overflow-hidden ${
                product.featured
                  ? 'border-accent bg-slate-900/60 backdrop-blur-xl glow shadow-glass'
                  : 'border-white/5 bg-slate-900/30 backdrop-blur-md hover:border-accent/40'
              }`}>
                {product.featured && (
                  <>
                    {/* Featured glow bar */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-accent to-purple-500" />
                    <div className="bg-gradient-to-r from-accent to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-6 w-fit shadow-glow-indigo">
                      Most Popular
                    </div>
                  </>
                )}
                
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2 tracking-tight">{product.name}</h3>
                  <p className="text-[14px] text-gray-400 leading-relaxed font-sans mb-8">{product.description}</p>
                  
                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-display font-extrabold text-white tracking-tight">{product.price}</span>
                    <span className="text-gray-400 text-sm font-medium">/month</span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-4 border-t border-white/5 pt-8 mb-8">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="p-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent flex-shrink-0 mt-0.5">
                          <Check size={14} />
                        </div>
                        <span className="text-sm text-gray-300 font-sans leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <button className={`w-full py-3.5 rounded-xl font-bold transition-smooth text-sm flex items-center justify-center gap-2 group ${
                    product.featured
                      ? 'bg-gradient-to-r from-accent to-purple-600 hover:from-accent-hover hover:to-purple-700 text-white shadow-glow-indigo hover:scale-[1.02]'
                      : 'border border-accent text-accent bg-accent/5 hover:bg-accent/10 hover:scale-[1.02]'
                  }`}>
                    Get Started
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-smooth" />
                  </button>
                </div>
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
          className="bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8 shadow-glass relative overflow-hidden"
        >
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-accent/5 to-transparent blur-3xl rounded-full -z-10" />
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3 tracking-tight">Looking for custom Enterprise solutions?</h3>
            <p className="text-gray-400 font-sans text-[15px] leading-relaxed max-w-2xl">
              We engineer tailor-made SaaS frameworks and custom private clouds, including dedicated customer success agents and high SLA support packages.
            </p>
          </div>
          <button className="bg-gradient-to-r from-accent to-purple-600 hover:from-accent-hover hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-smooth shadow-glow-indigo flex-shrink-0 hover:scale-[1.02]">
            Contact Sales
          </button>
        </motion.div>
      </div>
    </section>
  )
}


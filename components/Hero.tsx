'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import FloatingCube from './3d/FloatingCube'

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden z-0"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#22d3ee] blur-[140px] rounded-full -z-10 animate-pulse-slow" style={{ opacity: 'var(--glow-opacity)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#a78bfa] blur-[140px] rounded-full -z-10 animate-pulse-slow" style={{ opacity: 'var(--glow-opacity)', animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[#22d3ee] w-fit mb-6"
            style={{
              backgroundColor: 'var(--badge-bg)',
              border: '1px solid var(--badge-border)',
            }}
          >
            <Sparkles size={16} />
            <span>Enterprise-Grade SaaS Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 tracking-tight">
            <span style={{ color: 'var(--text-heading)' }}>Elevate Your</span>
            <br />
            <span className="gradient-text">Digital Ecosystem</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 leading-relaxed font-sans max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            World-class software infrastructure and innovative SaaS products designed to scale operations and accelerate enterprise growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button
              className="bg-[#22d3ee] hover:bg-[#0891b2] px-8 py-4 rounded-xl font-bold transition-smooth flex items-center justify-center gap-2 group hover:-translate-y-1"
              style={{ color: 'var(--bg-base)', boxShadow: '0 0 20px rgba(34,211,238,0.3)' }}
            >
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1.5 transition-smooth" size={20} />
            </button>
            <button
              className="px-8 py-4 rounded-xl font-semibold transition-smooth hover:-translate-y-1"
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-primary)',
              }}
            >
              View Enterprise Work
            </button>
          </div>

          {/* Stats Bar */}
          <div
            className="grid grid-cols-3 gap-6 p-6 rounded-2xl max-w-xl"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {[
              { value: '99.9%', label: 'Uptime SLA' },
              { value: '500+', label: 'Global Clients', middle: true },
              { value: '24/7', label: 'Premium Support' },
            ].map(({ value, label, middle }) => (
              <div
                key={label}
                className={`text-center md:text-left ${middle ? 'border-x px-4' : ''}`}
                style={middle ? { borderColor: 'var(--border)' } : {}}
              >
                <p className="text-3xl md:text-4xl font-display font-bold tracking-tight" style={{ color: 'var(--text-heading)' }}>{value}</p>
                <p className="text-xs md:text-sm font-medium mt-1" style={{ color: 'var(--text-muted)' }}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* 3D Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block md:col-span-5 h-[500px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#22d3ee]/10 to-[#a78bfa]/10 rounded-full blur-[60px] -z-10" />
          <FloatingCube />
        </motion.div>
      </div>
    </section>
  )
}

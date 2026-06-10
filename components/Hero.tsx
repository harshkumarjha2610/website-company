'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import FloatingCube from './3d/FloatingCube'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-primary z-0">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent-violet/10 blur-[120px] rounded-full -z-10 animate-pulse-slow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 flex flex-col justify-center text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-secondary border border-white/10 rounded-full px-4 py-1.5 text-sm font-semibold text-accent-light w-fit mb-6 shadow-sm">
            <Sparkles size={16} />
            <span>Enterprise-Grade SaaS Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-display font-extrabold leading-[1.1] mb-6 tracking-tight">
            <span className="text-white">Elevate Your</span>
            <br />
            <span className="gradient-text">Digital Ecosystem</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed font-sans max-w-xl">
            World-class software infrastructure and innovative SaaS products designed to scale operations and accelerate enterprise growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <button className="bg-accent hover:bg-accent-hover text-primary px-8 py-4 rounded-xl font-bold transition-smooth flex items-center justify-center gap-2 group shadow-glow-cyan hover:-translate-y-1">
              Start Your Project
              <ArrowRight className="group-hover:translate-x-1.5 transition-smooth" size={20} />
            </button>
            <button className="border border-white/10 bg-secondary/50 backdrop-blur-sm hover:bg-white/[0.06] hover:border-accent/40 text-white px-8 py-4 rounded-xl font-semibold transition-smooth hover:-translate-y-1">
              View Enterprise Work
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-secondary/60 backdrop-blur-md border border-white/10 rounded-2xl shadow-glass max-w-xl">
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">99.9%</p>
              <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">Uptime SLA</p>
            </div>
            <div className="text-center md:text-left border-x border-white/10 px-4">
              <p className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">500+</p>
              <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">Global Clients</p>
            </div>
            <div className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight">24/7</p>
              <p className="text-xs md:text-sm text-gray-400 font-medium mt-1">Premium Support</p>
            </div>
          </div>
        </motion.div>

        {/* 3D Visual Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="hidden md:block md:col-span-5 h-[500px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-accent-violet/10 rounded-full blur-[60px] -z-10" />
          <FloatingCube />
        </motion.div>
      </div>
    </section>
  )
}


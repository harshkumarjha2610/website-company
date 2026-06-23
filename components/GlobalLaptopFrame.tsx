'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GlobalLaptopFrame({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // To ensure no hydration mismatch, we only render the animated part after mount.
  // Before mount, we render the static frame so the site is visible immediately.
  return (
    <div className="min-h-screen bg-[#0f1115] dark:bg-[#050505] flex items-center justify-center p-2 sm:p-6 md:p-10 relative overflow-hidden perspective-[2000px]">
      
      {/* Fullscreen Animated Iframe Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <iframe 
          src="/animated-bg.html" 
          className="w-full h-full border-none opacity-60"
          title="Animated Background"
        />
      </div>
      
      {/* Dynamic ambient spotlight behind the laptop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div className="w-[80vw] h-[80vh] bg-gradient-to-tr from-blue-600/20 via-purple-600/10 to-orange-500/20 blur-[120px] rounded-full" />
      </motion.div>
      
      {/* Laptop Mockup Container */}
      <motion.div 
        initial={{ rotateX: 15, y: 50, scale: 0.9, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 40, 
          damping: 15,
          mass: 1,
          delay: 0.2 
        }}
        className="relative w-full max-w-[1440px] h-[92vh] flex flex-col z-10 drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Laptop Screen / Lid */}
        <div className="relative flex-1 bg-black rounded-t-2xl md:rounded-t-[2rem] border-[#1a1c23] border-[6px] md:border-[12px] border-b-0 overflow-hidden flex flex-col ring-1 ring-white/10 shadow-inner">
          
          {/* Glass Bezel reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/10 pointer-events-none z-40 rounded-t-xl md:rounded-t-[1.5rem]" />
          
          {/* Camera Notch Area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 md:h-7 bg-[#1a1c23] rounded-b-xl md:rounded-b-2xl z-50 flex items-center justify-center border-b border-x border-white/5 shadow-md">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#0a0a0c] rounded-full border border-white/10 flex items-center justify-center">
              <div className="w-0.5 h-0.5 bg-blue-500/50 rounded-full" />
            </div>
            <div className="w-1 h-1 bg-green-500/80 rounded-full ml-3 blur-[0.5px] shadow-[0_0_5px_rgba(34,197,94,1)] animate-pulse" />
          </div>
          
          {/* Screen Content Wrapper (The actual website) */}
          <div 
            id="laptop-wrapper"
            className="flex-1 w-full bg-[var(--bg-base)] relative overflow-y-auto overflow-x-hidden rounded-b-sm scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent"
            style={{ transform: 'translate3d(0,0,0)' }} // Creates containing block for fixed navbar
          >
            <div id="laptop-content" className="min-h-full flex flex-col">
              {/* Screen "Power On" Flash Effect */}
              <AnimatePresence>
                {!mounted && (
                  <motion.div 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-black z-[9999]" 
                  />
                )}
              </AnimatePresence>
              
              {children}
            </div>
          </div>
          
          {/* MacBook Pro Logo / Text at bottom of screen */}
          <div className="h-6 md:h-8 bg-[#1a1c23] w-full flex items-center justify-center z-50 border-t border-white/5">
            <span className="text-[8px] md:text-[10px] text-gray-500 font-medium tracking-widest uppercase opacity-70">
              TechFlow Pro
            </span>
          </div>
        </div>
        
        {/* Laptop Base / Keyboard Deck */}
        <div className="relative h-4 md:h-6 bg-gradient-to-b from-[#2a2d36] to-[#1e2028] rounded-b-2xl md:rounded-b-[2rem] rounded-t-sm flex items-start justify-center border border-t-0 border-[#3a3d46] z-20 shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          {/* Thumb groove to open lid */}
          <div className="w-24 md:w-40 h-1.5 md:h-2 bg-[#15171c] rounded-b-xl shadow-inner border-b border-white/5" />
          
          {/* Bottom edge reflection */}
          <div className="absolute bottom-0 w-[95%] h-[1px] bg-white/5 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}

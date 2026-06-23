'use client'

import React, { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const wrapper = document.getElementById('laptop-wrapper') as HTMLElement
    const content = document.getElementById('laptop-content') as HTMLElement

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      wrapper: wrapper || window,
      content: content || document.documentElement,
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    // requestAnimationFrame scroll trigger loop
    let rafId: number
    
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Cleanup scrolling instance on unmount
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

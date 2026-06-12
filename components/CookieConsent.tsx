'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user already consented
    const consent = localStorage.getItem('tf_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2500) // delay slide-in
      return () => clearTimeout(timer)
    }
    return undefined
  }, [])

  const handleConsent = (type: 'accept' | 'decline') => {
    localStorage.setItem('tf_cookie_consent', type)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50 p-5 rounded-2xl border border-gray-200/80 dark:border-white/10 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl flex flex-col gap-4 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#ff5f1f]/10 text-[#ff5f1f] flex-shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-gray-900 dark:text-white">GDPR & Cookie Policy</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                We use cookies to analyze web traffic, optimize site loading times, and personalize your experience. Learn more in our Privacy Policy.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 font-sans text-xs">
            <button
              onClick={() => handleConsent('decline')}
              className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 font-semibold transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => handleConsent('accept')}
              className="px-4 py-2.5 rounded-lg bg-[#ff5f1f] hover:bg-[#ff7f50] text-white font-bold transition-all"
            >
              Accept Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

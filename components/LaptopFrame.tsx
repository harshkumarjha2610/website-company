'use client'

import { useEffect, useState } from 'react'

export default function LaptopFrame() {
  const [isIframe, setIsIframe] = useState(false)

  useEffect(() => {
    // Prevent infinite iframes if the website loads itself
    if (window.self !== window.top) {
      setIsIframe(true)
    }
  }, [])

  if (isIframe) {
    return (
      <div className="w-full h-full flex items-center justify-center text-gray-500">
        Demo Mode
      </div>
    )
  }

  return (
    <div className="relative mx-auto w-full max-w-[700px] perspective-1000 group">
      {/* Laptop Screen */}
      <div className="relative rounded-t-2xl bg-gray-900 border-gray-900 border-[8px] md:border-[12px] border-b-[16px] md:border-b-[24px] aspect-video overflow-hidden shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
        {/* Camera Dot */}
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-700 rounded-full z-20"></div>
        
        {/* The Iframe */}
        <div className="w-full h-full bg-white relative z-10 overflow-hidden rounded-sm">
          <iframe 
            src="https://website-company-e75ncr1wc-unnatim501-3027s-projects.vercel.app?demo=true"
            className="w-full h-full border-none"
            title="Live Website Demo"
            loading="lazy"
          />
        </div>
      </div>
      
      {/* Laptop Base */}
      <div className="relative h-4 md:h-6 bg-gray-300 dark:bg-gray-700 rounded-b-2xl rounded-t-sm shadow-xl flex items-center justify-center border border-t-0 border-gray-400 dark:border-gray-600 transition-transform duration-700 group-hover:-translate-y-2">
        {/* Trackpad Notch */}
        <div className="w-20 md:w-32 h-1.5 md:h-2 bg-gray-400 dark:bg-gray-500 rounded-b-lg absolute top-0" />
      </div>

      {/* Shadow underneath */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/20 dark:bg-black/50 blur-xl rounded-full transition-opacity duration-700 opacity-50 group-hover:opacity-20" />
    </div>
  )
}

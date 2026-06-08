'use client'

import React from 'react'

const row1Clients = [
  {
    name: 'Magento',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm7 14.3l-7 3.9-7-3.9V8.7l7-3.9 7 3.9v7.6zM8 9.5l4-2.2 4 2.2v4.8l-1.5-.8v-3.2l-2.5-1.4-2.5 1.4v3.2L8 14.3V9.5z" />
      </svg>
    ),
  },
  {
    name: 'Databricks',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500 group-hover:text-red-400 transition-colors">
        <path d="M12 2L2.5 7.5V13L12 18.5L21.5 13V7.5L12 2ZM4.5 8.5L12 4.1L19.5 8.5L12 12.9L4.5 8.5ZM12 16.3V14.1L19.5 9.7V11.9L12 16.3Z" />
      </svg>
    ),
  },
  {
    name: 'Snowflake',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M16 8l4 4-4 4M8 8L4 12l4 4M12 6l-3-3-3 3M12 18l3 3 3-3" />
      </svg>
    ),
  },
  {
    name: 'HubSpot',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-orange-400 group-hover:text-orange-300 transition-colors">
        <path d="M18.8 8.6c-.5 0-.9.2-1.2.6l-2.7-1.3c.1-.3.1-.6.1-.9 0-1.7-1.3-3-3-3s-3 1.3-3 3c0 .6.2 1.1.5 1.5l-1.3 2.7c-.4-.1-.7-.1-.9-.1-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.4-.1-.7-.2-1.1l1.4-2.7c.3.1.6.2 1 .2 1.7 0 3-1.3 3-3 0-.3 0-.6-.1-.9l2.7-1.3c.3.4.8.6 1.3.6 1 0 1.8-.8 1.8-1.8s-.8-1.8-1.8-1.8z" />
      </svg>
    ),
  },
  {
    name: 'Moengage',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-500 group-hover:text-blue-400 transition-colors">
        <path d="M2 19h20V5H2v14zM4 7h16v10H4V7zm3 8h10l-5-6-5 6z" />
      </svg>
    ),
  },
  {
    name: 'Boomi',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors">
        <circle cx="8" cy="8" r="4" />
        <circle cx="16" cy="16" r="4" />
        <line x1="10" y1="10" x2="14" y2="14" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-cyan-500 group-hover:text-cyan-400 transition-colors">
        <path d="M3 11h3v2H3zm4-4h3v2H7zm4-2h3v2h-3zm4 2h3v2h-3zm-4 4h3v2h-3zm4 0h3v2h-3zm-8 0h3v2H7zm12-4h3v2h-3z" />
        <path d="M2 13.5V17c0 .6.4 1 1 1h12c1.7 0 3.3-.7 4.5-2L22 13.5v-1l-2.5 1c-1 .4-2.1.5-3.1.2l-4.9-1.5c-1-.3-2.1-.3-3.1 0L3.5 13.7c-.8.2-1.5-.2-1.5-1v.8z" />
      </svg>
    ),
  },
  {
    name: 'Amazon Web Services',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-amber-500 group-hover:text-amber-400 transition-colors">
        <path d="M2 15c4.5 3 10.5 3 15 0l2 2v-6h-6l2 2c-3.5 2-8.5 2-12 0l-1 2z" />
        <path d="M17 11.5c.8-.5 1.5-1.2 2-2h-3.5c-.5.8-1.2 1.5-2 2h3.5z" />
      </svg>
    ),
  },
]

const row2Clients = [
  {
    name: 'Salesforce',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors">
        <path d="M19.3 11.3c.1-.4.2-.9.2-1.4 0-2.8-2.2-5-4.9-5-.9 0-1.7.3-2.4.7C11.3 4.3 9.8 3 8 3 5.2 3 3 5.2 3 8c0 .3 0 .7.1 1-.9.6-1.5 1.7-1.5 2.9 0 2 1.6 3.6 3.6 3.6h12.8c2.2 0 4-1.8 4-4 0-1.8-1.2-3.3-2.7-3.8z" />
      </svg>
    ),
  },
  {
    name: 'Red Hat',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-600 group-hover:text-red-500 transition-colors">
        <path d="M12 2C6.5 2 2 4.5 2 7c0 1.2 1 2.3 2.8 3C4 11.5 3.5 13.2 3.5 15c0 3.9 3.8 7 8.5 7s8.5-3.1 8.5-7c0-1.8-.5-3.5-1.3-5 1.8-.7 2.8-1.8 2.8-3 0-2.5-4.5-5-10-5zm0 2.5c4.1 0 7.5 1.6 7.5 3.5 0 .9-.7 1.7-2 2.3-.9-1-2.4-1.8-4.3-2.1-.7-.1-1.3-.2-2-.2-3.1 0-5.8 1.1-7.1 2.7C3.4 10 3 9.1 3 8c0-1.9 3.4-3.5 7.5-3.5h1.5z" />
      </svg>
    ),
  },
  {
    name: 'Sabre',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-red-500 group-hover:text-red-400 transition-colors">
        <path d="M3 3l18 9-18 9V3zm3 3v10l10-5L6 6z" />
      </svg>
    ),
  },
  {
    name: 'Stripe',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-400 group-hover:text-indigo-300 transition-colors">
        <path d="M13.543 5.864c0-.9-.728-1.393-1.984-1.393-1.22 0-2.327.398-3.155.856l-.683-2.146C8.749 2.57 10.373 2 12.012 2c2.723 0 4.867 1.458 4.867 4.148v6.257c0 .963.13 1.83.454 2.378H13.79c-.114-.3-.195-.73-.195-1.19-.893 1.042-2.128 1.636-3.784 1.636-2.583 0-4.331-1.574-4.331-3.992 0-3.298 2.956-4.39 6.262-4.39v-.274c0-.24-.032-.47-.13-.654-.26-.53-.943-.755-1.625-.755a3.86 3.86 0 0 0-2.372.772l-.683-2.072c1.072-.731 2.648-1.096 4.143-1.096c2.73 0 4.47 1.472 4.47 4.16v6.242c0 .964.132 1.83.454 2.378h-3.535a6.45 6.45 0 0 1-.197-1.19c-.892 1.042-2.127 1.636-3.784 1.636-2.583 0-4.33-1.574-4.33-3.992 0-3.298 2.955-4.39 6.26-4.39v-.274c0-.24-.032-.47-.13-.654z" />
      </svg>
    ),
  },
  {
    name: 'Cloudinary',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors">
        <path d="M19.3 11.3c.1-.4.2-.9.2-1.4 0-2.8-2.2-5-4.9-5-.9 0-1.7.3-2.4.7C11.3 4.3 9.8 3 8 3 5.2 3 3 5.2 3 8c0 .3 0 .7.1 1-.9.6-1.5 1.7-1.5 2.9 0 2 1.6 3.6 3.6 3.6h12.8c2.2 0 4-1.8 4-4 0-1.8-1.2-3.3-2.7-3.8zM12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
      </svg>
    ),
  },
  {
    name: 'AWS Sagemaker',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-8 h-8 text-teal-400 group-hover:text-teal-350 transition-colors">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-5 0v-15A2.5 2.5 0 0 1 9.5 2z" />
        <path d="M14.5 22A2.5 2.5 0 0 1 12 19.5v-15a2.5 2.5 0 0 1 5 0v15a2.5 2.5 0 0 1-2.5 2z" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'AWS Bedrock',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
      </svg>
    ),
  },
]

// Duplicate the arrays for seamless loop scrolling tickers
const marqueeRow1 = [...row1Clients, ...row1Clients, ...row1Clients, ...row1Clients]
const marqueeRow2 = [...row2Clients, ...row2Clients, ...row2Clients, ...row2Clients]

export default function Clients() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden z-10 border-y border-white/5">
      {/* Edge fading overlays */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mb-4 tracking-tight">
          Strategic Alliances that <span className="gradient-text">Power Innovation</span>
        </h2>
        <p className="text-base md:text-lg text-gray-400 font-sans max-w-2xl mx-auto">
          We collaborate with leading global technology providers to engineer robust cloud ecosystems
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Row 1: Flowing Left to Right (animate-marquee) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap gap-6 py-2">
            {marqueeRow1.map((logo, idx) => (
              <div
                key={`r1-${idx}`}
                className="w-48 h-40 bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-between text-center flex-shrink-0 group hover:border-accent/40 hover:bg-slate-900/50 transition-smooth shadow-glass cursor-pointer"
              >
                <div className="flex-grow flex items-center justify-center">
                  {logo.icon}
                </div>
                <span className="text-[13px] font-display font-bold text-gray-400 group-hover:text-white transition-colors tracking-wide">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Flowing Right to Left (animate-marquee-reverse) */}
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap gap-6 py-2">
            {marqueeRow2.map((logo, idx) => (
              <div
                key={`r2-${idx}`}
                className="w-48 h-40 bg-slate-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-between text-center flex-shrink-0 group hover:border-accent/40 hover:bg-slate-900/50 transition-smooth shadow-glass cursor-pointer"
              >
                <div className="flex-grow flex items-center justify-center">
                  {logo.icon}
                </div>
                <span className="text-[13px] font-display font-bold text-gray-400 group-hover:text-white transition-colors tracking-wide">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

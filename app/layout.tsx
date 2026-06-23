import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleBackground from '@/components/3d/ParticleBackground'
import { ThemeProvider } from '@/components/ThemeProvider'
import AuthModal from '@/components/AuthModal'
import CookieConsent from '@/components/CookieConsent'
import LiveChatWidget from '@/components/LiveChatWidget'
import AIAssistantDrawer from '@/components/AIAssistantDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TechFlow - Custom Software & SaaS Solutions',
  description: 'Enterprise software development and innovative SaaS products for modern businesses',
}

// Inline script to prevent flash of wrong theme on page load
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch(e) {}
})();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Anti-flash script: runs synchronously before paint */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        suppressHydrationWarning
        style={{
          backgroundColor: 'var(--bg-base)',
          color: 'var(--text-primary)',
        }}
        className="overflow-x-hidden font-sans antialiased"
      >
        <ThemeProvider>
          <div className="min-h-screen bg-gray-300 dark:bg-[#050505] flex items-center justify-center p-2 sm:p-6 md:p-10 relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-orange-500/10 pointer-events-none" />
            
            {/* Laptop Mockup */}
            <div className="relative w-full max-w-[1400px] h-[90vh] flex flex-col perspective-1000 z-10">
              
              {/* Laptop Screen Area */}
              <div className="relative flex-1 bg-gray-900 rounded-t-2xl md:rounded-t-[2rem] border-gray-900 border-[8px] md:border-[16px] border-b-0 overflow-hidden shadow-2xl flex flex-col">
                {/* Camera */}
                <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-700 rounded-full z-50"></div>
                
                {/* Screen Content (Scrollable Container) */}
                <div 
                  id="laptop-wrapper"
                  className="flex-1 w-full bg-[var(--bg-base)] relative overflow-y-auto overflow-x-hidden"
                  style={{ transform: 'translate3d(0,0,0)' }} // Creates containing block for fixed navbar
                >
                  <div id="laptop-content" className="min-h-full flex flex-col">
                    <SmoothScroll>
                      <ParticleBackground />
                      <Navbar />
                      <AuthModal />
                      {children}
                      <Footer />
                      <CookieConsent />
                      <LiveChatWidget />
                      <AIAssistantDrawer />
                    </SmoothScroll>
                  </div>
                </div>
              </div>
              
              {/* Laptop Base / Keyboard Deck */}
              <div className="relative h-6 md:h-10 bg-gray-400 dark:bg-gray-800 rounded-b-2xl md:rounded-b-[2rem] rounded-t-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center border border-t-0 border-gray-500 dark:border-gray-700 z-20 shrink-0">
                <div className="w-24 md:w-40 h-1.5 md:h-2 bg-gray-500 dark:bg-gray-600 rounded-b-lg absolute top-0" />
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

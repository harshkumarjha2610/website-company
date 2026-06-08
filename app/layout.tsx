import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import ParticleBackground from '@/components/3d/ParticleBackground'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TechFlow - Custom Software & SaaS Solutions',
  description: 'Enterprise software development and innovative SaaS products for modern businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-primary text-white overflow-x-hidden font-sans antialiased">
        <SmoothScroll>
          <ParticleBackground />
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}




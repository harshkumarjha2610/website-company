'use client'

import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import Features from '@/components/Features'
import SaaS from '@/components/SaaS'
import CTA from '@/components/CTA'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Services />
      <Features />
      <SaaS />
      <Testimonials />
      <CTA />
    </main>
  )
}


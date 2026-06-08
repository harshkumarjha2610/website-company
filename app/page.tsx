'use client'

import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import SaaS from '@/components/SaaS'
import CTA from '@/components/CTA'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Services />
      <Projects />
      <SaaS />
      <Testimonials />
      <CTA />
    </main>
  )
}


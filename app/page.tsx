'use client'

import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Services from '@/components/Services'
import AIInnovationHub from '@/components/AIInnovationHub'
import TechnologyEcosystem from '@/components/TechnologyEcosystem'
import CaseStudies from '@/components/CaseStudies'
import Features from '@/components/Features'
import SaaS from '@/components/SaaS'
import CTA from '@/components/CTA'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <AIInnovationHub />
      <TechnologyEcosystem />
      <Services />
      <CaseStudies />
      <Features />
      <SaaS />
      <Testimonials />
      <CTA />
    </main>
  )
}


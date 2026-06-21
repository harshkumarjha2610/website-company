'use client'

import Hero from '@/components/Hero'
import Clients from '@/components/Clients'
import Stats from '@/components/Stats'
import AIDilemma from '@/components/AIDilemma'
import Services from '@/components/Services'
import AIInnovationHub from '@/components/AIInnovationHub'
import TechnologyEcosystem from '@/components/TechnologyEcosystem'
import CaseStudies from '@/components/CaseStudies'
import Features from '@/components/Features'
import WhyChooseUs from '@/components/WhyChooseUs'
import SaaS from '@/components/SaaS'
import CTA from '@/components/CTA'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <main>
      <Hero />
      <Clients />
      <Stats />
      <AIDilemma />
      <AIInnovationHub />
      <TechnologyEcosystem />
      <Services />
      <CaseStudies />
      <Features />
      <WhyChooseUs />
      <SaaS />
      <Testimonials />
      <CTA />
    </main>
  )
}


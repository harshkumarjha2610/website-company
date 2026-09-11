'use client'

import React, { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────────────────
   ContainerScroll  (Aceternity UI pattern)
   — tall wrapper (~60–80rem) so the browser has scroll range to work with
   — inner content is sticky while the card rotates from 20° → 0°
───────────────────────────────────────────────────────────────────────── */
export function ContainerScroll({
  titleComponent,
  children,
}: {
  titleComponent: React.ReactNode
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({ target: containerRef })

  const [isMobile, setIsMobile] = React.useState(false)
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const rotate    = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale     = useTransform(scrollYProgress, [0, 1], isMobile ? [0.7, 0.9] : [1.05, 1])
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="h-[48rem] md:h-[58rem] flex items-start justify-center relative p-2 md:p-10"
    >
      <div
        className="py-6 md:py-14 w-full relative"
        style={{ perspective: '1000px' }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} translate={translate}>
          {children}
        </Card>
      </div>
    </div>
  )
}

/* ── Animated title ── */
function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: React.ReactNode
}) {
  return (
    <motion.div
      style={{ translateY: translate }}
      className="max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  )
}

/* ── The 3-D rotating card shell ── */
function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  translate?: MotionValue<number>
  children: React.ReactNode
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="max-w-5xl -mt-12 mx-auto h-auto w-full p-1 md:p-2 rounded-[30px]"
    >
      <div className="h-full w-full overflow-hidden rounded-[26px]">
        {children}
      </div>
    </motion.div>
  )
}

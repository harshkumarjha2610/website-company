'use client'

import { useRef, useEffect } from 'react'

export default function SphereAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let rotation = 0

    const particles: Array<{
      x: number
      y: number
      z: number
      vx: number
      vy: number
      vz: number
      size: number
    }> = []

    // Create particles in sphere
    for (let i = 0; i < 100; i++) {
      const phi = Math.random() * Math.PI * 2
      const theta = Math.random() * Math.PI
      const r = 100 + Math.random() * 50

      particles.push({
        x: r * Math.sin(theta) * Math.cos(phi),
        y: r * Math.sin(theta) * Math.sin(phi),
        z: r * Math.cos(theta),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      })
    }

    function rotateX(p: typeof particles[0], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const y = p.y * cos - p.z * sin
      const z = p.y * sin + p.z * cos
      p.y = y
      p.z = z
    }

    function rotateY(p: typeof particles[0], angle: number) {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      const x = p.x * cos + p.z * sin
      const z = -p.x * sin + p.z * cos
      p.x = x
      p.z = z
    }

    function animate() {
      if (!canvas || !ctx) return
      rotation += 0.005

      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Update velocity
        p.vx += (Math.random() - 0.5) * 0.02
        p.vy += (Math.random() - 0.5) * 0.02
        p.vz += (Math.random() - 0.5) * 0.02

        // Apply damping
        p.vx *= 0.98
        p.vy *= 0.98
        p.vz *= 0.98

        // Update position
        p.x += p.vx
        p.y += p.vy
        p.z += p.vz

        // Rotate
        rotateX(p, rotation * 0.3)
        rotateY(p, rotation * 0.5)

        // Project to 2D
        const scale = 500 / (300 + p.z)
        const x2d = p.x * scale + canvas.width / 2
        const y2d = p.y * scale + canvas.height / 2

        // Draw particle
        const brightness = (p.z + 200) / 400
        ctx.fillStyle = `rgba(59, 130, 246, ${brightness * 0.8})`
        ctx.beginPath()
        ctx.arc(x2d, y2d, p.size * brightness, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.2))' }}
    />
  )
}

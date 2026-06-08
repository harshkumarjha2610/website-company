'use client'

import { useRef, useEffect } from 'react'

export default function FloatingCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationFrameId: number
    let rotation = 0

    // Define cube vertices
    const vertices: number[][] = [
      [-1, -1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, 1, 1],
    ]

    // Define cube edges
    const edges: number[][] = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ]

    // Rotation matrices
    function rotateX(point: number[], angle: number): number[] {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0],
        point[1] * cos - point[2] * sin,
        point[1] * sin + point[2] * cos,
      ]
    }

    function rotateY(point: number[], angle: number): number[] {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0] * cos + point[2] * sin,
        point[1],
        -point[0] * sin + point[2] * cos,
      ]
    }

    function rotateZ(point: number[], angle: number): number[] {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0] * cos - point[1] * sin,
        point[0] * sin + point[1] * cos,
        point[2],
      ]
    }

    function project(point: number[], scale: number, offsetX: number, offsetY: number): [number, number] {
      return [
        point[0] * scale + offsetX,
        point[1] * scale + offsetY,
      ]
    }

    function animate() {
      if (!canvas || !ctx) return
      rotation += 0.01

      // Clear canvas
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Transform vertices
      const projected = vertices.map((vertex) => {
        let point = [...vertex]
        point = rotateX(point, rotation * 0.5)
        point = rotateY(point, rotation)
        point = rotateZ(point, rotation * 0.3)

        // Add perspective
        const scale = 200 / (5 + point[2])
        return project(point, scale, canvas.width / 2, canvas.height / 2)
      })

      // Draw edges
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)'
      ctx.lineWidth = 2

      edges.forEach((edge) => {
        const [from, to] = edge
        const p1 = projected[from]
        const p2 = projected[to]

        ctx.beginPath()
        ctx.moveTo(p1[0], p1[1])
        ctx.lineTo(p2[0], p2[1])
        ctx.stroke()
      })

      // Draw vertices
      projected.forEach((point) => {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.8)'
        ctx.beginPath()
        ctx.arc(point[0], point[1], 5, 0, Math.PI * 2)
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
      style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))' }}
    />
  )
}

'use client'

import { useRef, useEffect } from 'react'

export default function FloatingCube() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Resize canvas to fill container ──────────────────────
    const resize = () => {
      canvas.width  = container.offsetWidth
      canvas.height = container.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Cube geometry ─────────────────────────────────────────
    const baseVertices: number[][] = [
      [-1, -1, -1], [ 1, -1, -1], [ 1,  1, -1], [-1,  1, -1],
      [-1, -1,  1], [ 1, -1,  1], [ 1,  1,  1], [-1,  1,  1],
    ]
    const edges: number[][] = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ]

    // ── Rotation math ─────────────────────────────────────────
    const rotX = (p: number[], a: number) => [
      p[0],
      p[1] * Math.cos(a) - p[2] * Math.sin(a),
      p[1] * Math.sin(a) + p[2] * Math.cos(a),
    ]
    const rotY = (p: number[], a: number) => [
      p[0] * Math.cos(a) + p[2] * Math.sin(a),
      p[1],
      -p[0] * Math.sin(a) + p[2] * Math.cos(a),
    ]
    const project = (p: number[], scale: number, ox: number, oy: number): [number, number] => [
      p[0] * scale + ox,
      p[1] * scale + oy,
    ]

    // ── Mouse tracking ────────────────────────────────────────
    // targetAngle: the angle we want to reach
    // currentAngle: smoothly interpolated toward target
    const target  = { x: 0.4, y: -0.6 }   // default resting tilt
    const current = { x: 0.4, y: -0.6 }

    const onMouseMove = (e: MouseEvent) => {
      // Map global cursor to [-1..1] range
      const nx = (e.clientX / window.innerWidth)  * 2 - 1   // -1 left, +1 right
      const ny = (e.clientY / window.innerHeight) * 2 - 1   // -1 top,  +1 bottom

      // Map to rotation range  ±1.2 rad
      target.y =  nx * 1.2
      target.x = -ny * 0.8
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Theme colors ──────────────────────────────────────────
    const getThemeColors = () => {
      const isDark = document.documentElement.classList.contains('dark')
      return isDark
        ? {
            edge:       'rgba(99,  179, 237, 0.75)',  // sky-blue
            edgeGlow:   'rgba(99,  179, 237, 0.25)',
            vertex:     'rgba(167, 139, 250, 0.95)',  // violet
            vertexGlow: 'rgba(167, 139, 250, 0.35)',
            glow:       'rgba(99,  179, 237, 0.25)',
          }
        : {
            edge:       'rgba(255,  95,  31, 0.80)',  // brand orange
            edgeGlow:   'rgba(255,  95,  31, 0.20)',
            vertex:     'rgba(99,   60, 210, 0.95)',  // indigo
            vertexGlow: 'rgba(99,   60, 210, 0.30)',
            glow:       'rgba(255,  95,  31, 0.18)',
          }
    }

    // ── Render loop ───────────────────────────────────────────
    let raf: number
    const LERP = 0.06  // smoothing factor — lower = more inertia

    const draw = () => {
      if (!canvas || !ctx) return

      // Smooth interpolation toward cursor target
      current.x += (target.x - current.x) * LERP
      current.y += (target.y - current.y) * LERP

      const w = canvas.width
      const h = canvas.height
      const cx = w / 2
      const cy = h / 2
      const SCALE = Math.min(w, h) * 0.22   // responsive cube size

      // Clear
      ctx.clearRect(0, 0, w, h)

      const colors = getThemeColors()

      // Project all vertices
      const projected = baseVertices.map(v => {
        let p = [...v]
        p = rotX(p, current.x)
        p = rotY(p, current.y)
        const fov = SCALE * 3.5 / (3.5 + p[2])
        return project(p, fov, cx, cy)
      })

      // ── Draw glow-halo behind edges ───────────────────────
      ctx.save()
      ctx.shadowBlur   = 24
      ctx.shadowColor  = colors.glow
      ctx.strokeStyle  = colors.edgeGlow
      ctx.lineWidth    = 6
      edges.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(projected[a][0], projected[a][1])
        ctx.lineTo(projected[b][0], projected[b][1])
        ctx.stroke()
      })
      ctx.restore()

      // ── Draw sharp edges ──────────────────────────────────
      ctx.save()
      ctx.strokeStyle = colors.edge
      ctx.lineWidth   = 1.8
      ctx.lineCap     = 'round'
      edges.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.moveTo(projected[a][0], projected[a][1])
        ctx.lineTo(projected[b][0], projected[b][1])
        ctx.stroke()
      })
      ctx.restore()

      // ── Draw vertex dots with glow ───────────────────────
      projected.forEach(([px, py]) => {
        // Outer glow halo
        ctx.save()
        ctx.shadowBlur  = 16
        ctx.shadowColor = colors.vertexGlow
        ctx.fillStyle   = colors.vertexGlow
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Crisp dot
        ctx.fillStyle = colors.vertex
        ctx.beginPath()
        ctx.arc(px, py, 3.5, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  )
}

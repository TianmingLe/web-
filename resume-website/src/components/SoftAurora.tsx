import { useEffect, useRef } from 'react'

/* ─── Soft Aurora Background (inspired by react-bits) ─── */
export default function SoftAurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let animationId = 0
    let time = 0

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      w = parent.clientWidth
      h = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Warm earthy palette matching the magazine theme
    const blobs = [
      { x: 0.3, y: 0.4, r: 0.35, color: '196, 108, 84', speed: 0.0003, phase: 0 },      // terracotta
      { x: 0.7, y: 0.5, r: 0.4, color: '139, 157, 120', speed: 0.00025, phase: 2 },    // sage
      { x: 0.5, y: 0.7, r: 0.3, color: '123, 107, 158', speed: 0.00035, phase: 4 },    // slate purple
      { x: 0.2, y: 0.6, r: 0.25, color: '196, 163, 90', speed: 0.0002, phase: 1 },     // gold
    ]

    const draw = () => {
      time += 1
      ctx.clearRect(0, 0, w, h)

      // Base warm cream gradient
      const baseGrad = ctx.createLinearGradient(0, 0, w, h)
      baseGrad.addColorStop(0, 'rgba(250, 248, 245, 0.4)')
      baseGrad.addColorStop(1, 'rgba(245, 242, 237, 0.3)')
      ctx.fillStyle = baseGrad
      ctx.fillRect(0, 0, w, h)

      blobs.forEach((blob) => {
        const bx = w * (blob.x + Math.sin(time * blob.speed + blob.phase) * 0.15)
        const by = h * (blob.y + Math.cos(time * blob.speed * 0.7 + blob.phase) * 0.1)
        const br = Math.min(w, h) * blob.r * (1 + Math.sin(time * blob.speed * 0.5) * 0.1)

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0, `rgba(${blob.color}, 0.18)`)
        grad.addColorStop(0.5, `rgba(${blob.color}, 0.06)`)
        grad.addColorStop(1, `rgba(${blob.color}, 0)`)

        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      })

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

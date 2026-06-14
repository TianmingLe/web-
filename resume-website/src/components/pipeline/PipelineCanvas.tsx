import { useRef, useState, useEffect, useCallback } from 'react'
import { Gauge } from 'lucide-react'
import { capabilityData } from '@data/capabilityMap'
import { useDeviceTier } from './useDeviceTier'
import { usePipelineLayout } from './usePipelineLayout'
import { useCanvasRenderer } from './useCanvasRenderer'

const energyNode = capabilityData.mainNodes.find((n) => n.id === 'energy')!

export default function PipelineCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isWarm, setIsWarm] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const tier = useDeviceTier()
  const layout = usePipelineLayout(isMobile)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const warmObserver = new IntersectionObserver(
      ([entry]) => setIsWarm(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0 }
    )
    const visibleObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    warmObserver.observe(sectionRef.current)
    visibleObserver.observe(sectionRef.current)
    return () => {
      warmObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx?.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()
    return () => ro.disconnect()
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 2)
    const x = (e.clientX - rect.left) * dpr
    const y = (e.clientY - rect.top) * dpr

    const { viewBox, nodePositions } = layout
    const scaleX = canvas.width / viewBox.width
    const scaleY = canvas.height / viewBox.height
    const scale = Math.min(scaleX, scaleY)

    for (let i = 0; i < nodePositions.length; i++) {
      const pos = nodePositions[i]
      const dist = Math.hypot(x / scale - pos.x, y / scale - pos.y)
      if (dist < 28) {
        const skills = energyNode.subNodes ?? []
        setHoveredNode(skills[i]?.id || null)
        setHoveredIndex(i)
        return
      }
    }
    setHoveredNode(null)
    setHoveredIndex(-1)
  }, [layout])

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null)
    setHoveredIndex(-1)
  }, [])

  useCanvasRenderer({
    canvasRef,
    layout,
    tier,
    isVisible,
    isWarm,
    hoveredNode,
    hoveredIndex,
  })

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Gauge size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">技能流程图</h2>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div
          className="relative rounded-xl border border-warm-ghost/10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f1218 0%, #1a1f28 100%)',
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(192,74,26,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(192,74,26,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <canvas
            ref={canvasRef}
            className="relative w-full block"
            style={{ height: isMobile ? '1050px' : '720px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  )
}

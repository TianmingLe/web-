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
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })
  const dragOffsetRef = useRef({ x: 0, y: 0 })

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

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x
      const dy = e.clientY - dragStartRef.current.y
      dragOffsetRef.current = {
        x: dragOffset.x + dx,
        y: dragOffset.y + dy,
      }
      setDragOffset(dragOffsetRef.current)
      dragStartRef.current = { x: e.clientX, y: e.clientY }
      return
    }

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
      const dist = Math.hypot(
        x / scale - pos.x - dragOffsetRef.current.x / scale,
        y / scale - pos.y - dragOffsetRef.current.y / scale
      )
      if (dist < 20) {
        const skills = energyNode.subNodes ?? []
        setHoveredNode(skills[i]?.id || null)
        setHoveredIndex(i)
        return
      }
    }
    setHoveredNode(null)
    setHoveredIndex(-1)
  }, [layout, isDragging, dragOffset])

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    setIsDragging(true)
  }, [])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null)
    setHoveredIndex(-1)
    setIsDragging(false)
  }, [])

  useCanvasRenderer({
    canvasRef,
    layout,
    tier,
    isVisible,
    isWarm,
    hoveredNode,
    hoveredIndex,
    dragOffset,
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
            style={{
              height: isMobile ? '1050px' : '720px',
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  )
}

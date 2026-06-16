import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudioStore } from '@store/audio'
import { useIntersection } from '@hooks/useIntersection'
import SoftAurora from './SoftAurora'

/* ─── Types ─── */
interface CapabilityNode {
  id: string
  label: string
  icon: React.ReactNode
  description: string
  color: string
  bgColor: string
  borderColor: string
  hoverColor: string
  route: string
  position: { x: number; y: number }
  size: number
}

/* ─── Data ─── */
const nodes: CapabilityNode[] = [
  {
    id: 'energy',
    label: '能源动力',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    description: '能源与动力工程核心技能',
    color: 'text-b-terracotta',
    bgColor: 'bg-b-terracotta-dim',
    borderColor: 'border-b-terracotta/30',
    hoverColor: 'hover:bg-b-terracotta-dim',
    route: '/energy',
    position: { x: 50, y: 20 },
    size: 120,
  },
  {
    id: 'ai',
    label: 'AI 技术',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2.27A2 2 0 0 1 3 16h1a7 7 0 0 1 7-7h1V5.73A2 2 0 0 1 11 4a2 2 0 0 1 1-2z" />
      </svg>
    ),
    description: '人工智能与大模型技术',
    color: 'text-b-sage',
    bgColor: 'bg-b-sage-dim',
    borderColor: 'border-b-sage/30',
    hoverColor: 'hover:bg-b-sage-dim',
    route: '/ai',
    position: { x: 80, y: 50 },
    size: 100,
  },
  {
    id: 'media',
    label: '自媒体',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    description: '内容创作与平台运营',
    color: 'text-b-slate',
    bgColor: 'bg-b-slate-dim',
    borderColor: 'border-b-slate/30',
    hoverColor: 'hover:bg-b-slate-dim',
    route: '/media',
    position: { x: 65, y: 80 },
    size: 100,
  },
  {
    id: 'thought',
    label: '思想领域',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
        <path d="M9 21h6" />
      </svg>
    ),
    description: '职业规划与思维方式',
    color: 'text-b-terracotta',
    bgColor: 'bg-b-terracotta-dim',
    borderColor: 'border-b-terracotta/30',
    hoverColor: 'hover:bg-b-terracotta-dim',
    route: '/thought',
    position: { x: 35, y: 80 },
    size: 100,
  },
  {
    id: 'other',
    label: '其他',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    description: '获奖、证书与联系方式',
    color: 'text-b-sage',
    bgColor: 'bg-b-sage-dim',
    borderColor: 'border-b-sage/30',
    hoverColor: 'hover:bg-b-sage-dim',
    route: '/other',
    position: { x: 20, y: 50 },
    size: 100,
  },
]

/* ─── Particle type for exit animation ─── */
interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
}

/* ─── Galaxy Collapse Exit Animation ─── */
function ExitParticles({ centerX, centerY, color, onComplete }: { centerX: number; centerY: number; color: string; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w
    canvas.height = h

    // Create particles
    const count = 60
    const particles: Particle[] = []
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4
      particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.6 + Math.random() * 0.4,
        size: 2 + Math.random() * 4,
        color,
      })
    }
    particlesRef.current = particles

    let animId = 0
    const animate = () => {
      ctx.clearRect(0, 0, w, h)
      let alive = false

      particles.forEach((p) => {
        if (p.life <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life -= 0.015

        const alpha = Math.max(0, p.life / p.maxLife)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace('0.12)', `${alpha * 0.5})`).replace('0.10)', `${alpha * 0.4})`).replace('0.08)', `${alpha * 0.3})`)
        ctx.fill()
      })

      if (alive) {
        animId = requestAnimationFrame(animate)
      } else {
        onComplete()
      }
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [centerX, centerY, color, onComplete])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 60 }}
    />
  )
}

/* ─── Node Detail Panel ─── */
function NodeDetail({ node, onClose }: { node: CapabilityNode; onClose: () => void }) {
  const navigate = useNavigate()
  const { isPlaying } = useAudioStore()

  const handleNavigate = useCallback(() => {
    if (isPlaying) {
      // Keep playing
    }
    navigate(node.route)
  }, [navigate, node.route, isPlaying])

  return (
    <div
      className="absolute z-50 bg-b-card/95 backdrop-blur-xl border border-b-border rounded-2xl p-6 shadow-2xl max-w-xs transition-all duration-400"
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
        transform: 'translate(-50%, -120%)',
        animation: 'fadeScaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${node.bgColor} ${node.color}`}>
          {node.icon}
        </div>
        <div>
          <h3 className="font-b-serif text-lg text-b-ink">{node.label}</h3>
          <p className="font-b-sans text-xs text-b-muted">{node.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleNavigate}
          className="flex-1 px-4 py-2 rounded-lg bg-b-terracotta text-white font-b-sans text-sm hover:bg-b-terracotta-dark transition-colors"
        >
          进入
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg border border-b-border font-b-sans text-sm text-b-muted hover:bg-b-sand/30 transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  )
}

/* ─── Connection Lines ─── */
function ConnectionLines({ activeIndex }: { activeIndex: number }) {
  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const isActive = activeIndex === i || activeIndex === j
        result.push({
          x1: nodes[i].position.x,
          y1: nodes[i].position.y,
          x2: nodes[j].position.x,
          y2: nodes[j].position.y,
          opacity: isActive ? 0.3 : 0.08,
        })
      }
    }
    return result
  }, [activeIndex])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="var(--color-b-terracotta)"
          strokeWidth="0.15"
          opacity={line.opacity}
          style={{
            strokeDasharray: 100,
            strokeDashoffset: 0,
            animation: `dashDraw 1.2s ease-in-out ${i * 0.1}s both`,
          }}
        />
      ))}
    </svg>
  )
}

/* ─── Main Component ─── */
export default function CapabilityMapB() {
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1)
  const [exitingNode, setExitingNode] = useState<{ index: number; x: number; y: number; color: string } | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [sectionRef, sectionVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 })

  useEffect(() => {
    if (sectionVisible) {
      const timer = setTimeout(() => setIsVisible(true), 100)
      return () => clearTimeout(timer)
    }
  }, [sectionVisible])

  const handleNodeClick = useCallback((index: number) => {
    if (activeNodeIndex === index) {
      // Exit animation
      const node = nodes[index]
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = rect.left + (node.position.x / 100) * rect.width
        const y = rect.top + (node.position.y / 100) * rect.height
        setExitingNode({ index, x, y, color: node.bgColor.replace('bg-', 'var(--color-b-').replace('-dim', '') })
      }
      setActiveNodeIndex(-1)
    } else {
      setActiveNodeIndex(index)
    }
  }, [activeNodeIndex])

  const handleExitComplete = useCallback(() => {
    setExitingNode(null)
  }, [])

  const handleCloseDetail = useCallback(() => {
    const node = nodes[activeNodeIndex]
    if (node) {
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        const x = rect.left + (node.position.x / 100) * rect.width
        const y = rect.top + (node.position.y / 100) * rect.height
        setExitingNode({ index: activeNodeIndex, x, y, color: node.bgColor.replace('bg-', 'var(--color-b-').replace('-dim', '') })
      }
    }
    setActiveNodeIndex(-1)
  }, [activeNodeIndex])

  return (
    <div ref={sectionRef} className="relative w-full min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Soft Aurora Background */}
      <SoftAurora />

      {/* Connection Lines */}
      <ConnectionLines activeIndex={activeNodeIndex} />

      {/* Nodes Container */}
      <div ref={containerRef} className="relative w-full max-w-2xl aspect-square">
        {nodes.map((node, index) => {
          const isActive = activeNodeIndex === index
          const isOtherActive = activeNodeIndex !== -1 && activeNodeIndex !== index

          return (
            <div
              key={node.id}
              className="absolute cursor-pointer transition-all duration-500"
              style={{
                left: `${node.position.x}%`,
                top: `${node.position.y}%`,
                width: node.size,
                height: node.size,
                marginLeft: -node.size / 2,
                marginTop: -node.size / 2,
                zIndex: isActive ? 40 : 10,
                opacity: isVisible ? (isOtherActive ? 0.3 : 1) : 0,
                transform: isVisible
                  ? `scale(${isActive ? 1.15 : 1}) translateY(0)`
                  : 'scale(0) translateY(20px)',
                transitionDelay: `${index * 0.1}s`,
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onClick={() => handleNodeClick(index)}
            >
              {/* Glow ring */}
              <div
                className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${node.bgColor}`}
                style={{
                  opacity: isActive ? 0.6 : 0.2,
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Main circle */}
              <div
                className={`relative w-full h-full rounded-full border-2 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 ${node.bgColor} ${node.borderColor} ${node.hoverColor} ${isActive ? 'shadow-2xl border-opacity-60' : ''}`}
              >
                <div className={`transition-transform duration-300 ${node.color} ${isActive ? 'scale-110' : ''}`}>
                  {node.icon}
                </div>
                <span className={`font-b-sans text-xs font-medium transition-all duration-300 ${node.color}`}>
                  {node.label}
                </span>
              </div>

              {/* Orbiting dots */}
              {isActive && (
                <>
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${node.bgColor.replace('-dim', '')}`}
                      style={{
                        left: '50%',
                        top: '50%',
                        animation: `orbitDot 2s ease-in-out ${i * 0.3}s infinite`,
                        ['--orbit-angle' as any]: `${(i * 360) / 3}deg`,
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          )
        })}

        {/* Detail Panel */}
        {activeNodeIndex !== -1 && (
          <NodeDetail
            node={nodes[activeNodeIndex]}
            onClose={handleCloseDetail}
          />
        )}
      </div>

      {/* Exit Particles */}
      {exitingNode && (
        <ExitParticles
          key={exitingNode.index}
          centerX={exitingNode.x}
          centerY={exitingNode.y}
          color={exitingNode.color}
          onComplete={handleExitComplete}
        />
      )}
    </div>
  )
}

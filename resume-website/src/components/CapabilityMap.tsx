import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import {
  Cog, Brain, Code2, Clapperboard, Lightbulb,
  type LucideIcon
} from 'lucide-react'
import { capabilityData, MainNode, SubNode } from '@data/capabilityMap'

const iconMap: Record<string, LucideIcon> = {
  energy: Cog,
  ai: Brain,
  dev: Code2,
  media: Clapperboard,
  thinking: Lightbulb,
}

interface CaseStudyModalProps {
  node: MainNode
  onClose: () => void
}

function CaseStudyModal({ node, onClose }: CaseStudyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-surface border border-border rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-ghost/50 flex items-center justify-center text-warm-faint hover:text-warm transition-colors"
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${node.color}20` }}
          >
            {(() => {
              const Icon = iconMap[node.id]
              return Icon ? <Icon size={20} style={{ color: node.color }} /> : null
            })()}
          </div>
          <div>
            <h3 className="text-warm font-semibold font-sans">{node.label}</h3>
            <p className="text-warm-faint text-sm font-sans">{node.caseStudy?.title}</p>
          </div>
        </div>

        <p className="text-warm-muted text-sm mb-4 font-sans leading-relaxed">
          {node.caseStudy?.description}
        </p>

        {node.caseStudy?.metrics && (
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(node.caseStudy.metrics).map(([key, value]) => (
              <div key={key} className="text-center p-3 rounded-lg bg-warm-ghost/5">
                <p className="text-xs text-warm-faint font-mono mb-1">{key}</p>
                <p className="text-sm text-energy-light font-semibold font-sans">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// SpiderWeb sub-nodes component
function SpiderWebSubNodes({
  node,
  onCaseStudy,
}: {
  node: MainNode
  onCaseStudy: (node: MainNode) => void
}) {
  const subCount = node.subNodes.length
  const subRadius = 90

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] pointer-events-none">
      {/* Web lines from center to each sub-node */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {node.subNodes.map((_, i) => {
          const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const x2 = 110 + Math.cos(angle) * subRadius
          const y2 = 110 + Math.sin(angle) * subRadius
          return (
            <line
              key={`line-${i}`}
              x1="110"
              y1="110"
              x2={x2}
              y2={y2}
              stroke={node.color}
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="3,3"
            />
          )
        })}
        {/* Connect sub-nodes to form web ring */}
        {node.subNodes.map((_, i) => {
          const angle1 = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const angle2 = (((i + 1) % subCount) / subCount) * 2 * Math.PI - Math.PI / 2
          const x1 = 110 + Math.cos(angle1) * subRadius
          const y1 = 110 + Math.sin(angle1) * subRadius
          const x2 = 110 + Math.cos(angle2) * subRadius
          const y2 = 110 + Math.sin(angle2) * subRadius
          return (
            <line
              key={`ring-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={node.color}
              strokeWidth="0.5"
              opacity="0.2"
            />
          )
        })}
      </svg>

      {/* Sub-nodes */}
      {node.subNodes.map((sub: SubNode, i: number) => {
        const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
        const x = Math.cos(angle) * subRadius
        const y = Math.sin(angle) * subRadius

        return (
          <div
            key={sub.id}
            className="absolute pointer-events-auto"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          >
            <div
              className="flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg border backdrop-blur-sm"
              style={{
                backgroundColor: `${node.color}10`,
                borderColor: `${node.color}30`,
                minWidth: '80px',
              }}
            >
              <span className="text-[10px] text-warm-muted font-sans text-center leading-tight whitespace-nowrap">
                {sub.label}
              </span>
              {sub.level && (
                <span className="text-[10px] font-mono">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className={j < sub.level ? 'text-energy' : 'text-warm-ghost'}>
                      ★
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        )
      })}

      {/* Case study button at bottom */}
      {node.caseStudy && (
        <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-8px', zIndex: 2 }}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCaseStudy(node)
            }}
            className="text-[10px] text-energy hover:text-energy-light font-sans px-2 py-1 rounded-full border border-energy/20 hover:border-energy/40 bg-surface/80 backdrop-blur-sm transition-colors pointer-events-auto"
          >
            查看案例 →
          </button>
        </div>
      )}
    </div>
  )
}

export default function CapabilityMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.center-node', {
        scale: [1, 1.05, 1],
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        '.map-connection',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.5 }
      )

      gsap.fromTo(
        '.main-node',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.1, delay: 0.8 }
      )

      setTimeout(() => setIsLoaded(true), 1500)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const radius = isLoaded ? 140 : 0
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-serif text-warm mb-2">能力地图</h2>
        <p className="text-warm-faint text-sm font-sans">核心能力星系 · Core Capabilities</p>
      </div>

      <div className="relative w-[400px] h-[400px] md:w-[480px] md:h-[480px] mx-auto">
        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="center-node relative w-20 h-20 md:w-24 md:h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-energy to-ai animate-pulse opacity-50" />
            <div className="absolute inset-1 rounded-full bg-surface border-2 border-energy/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-xl md:text-2xl mb-0.5">👤</div>
                <p className="text-[9px] text-warm font-mono">{capabilityData.center.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[9px] font-mono text-energy-light">{capabilityData.center.mbti}</span>
            </div>
          </div>
        </div>

        {/* Main nodes */}
        {capabilityData.mainNodes.map((node, index) => {
          const pos = getNodePosition(index, capabilityData.mainNodes.length)
          const isHovered = hoveredNode === node.id
          const Icon = iconMap[node.id]

          return (
            <div
              key={node.id}
              className="main-node absolute z-10"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
                transition: isLoaded ? 'left 0.5s ease-out, top 0.5s ease-out' : 'none',
              }}
            >
              {/* Connection line to center */}
              <svg
                className="map-connection absolute pointer-events-none"
                style={{
                  width: `${Math.abs(pos.x)}px`,
                  height: '2px',
                  left: pos.x > 0 ? `-${Math.abs(pos.x)}px` : `${60}px`,
                  top: '32px',
                  transform: pos.x < 0 ? 'scaleX(-1)' : 'none',
                  transformOrigin: pos.x < 0 ? 'right' : 'left',
                }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke={node.color}
                  strokeWidth="2"
                  strokeDasharray="4,4"
                  opacity="0.4"
                />
              </svg>

              <button
                onClick={() => node.caseStudy && setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer z-30 ${
                  isHovered ? 'scale-110 shadow-lg' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: isHovered ? `${node.color}15` : 'rgba(255,255,255,0.05)',
                  borderColor: isHovered ? node.color : 'rgba(255,255,255,0.1)',
                  boxShadow: isHovered ? `0 0 30px ${node.glowColor}` : 'none',
                }}
              >
                {Icon && <Icon size={20} style={{ color: isHovered ? node.color : '#94A3B8' }} />}
              </button>

              {/* Label below node */}
              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium font-sans transition-colors"
                style={{ color: isHovered ? node.color : '#94A3B8' }}
              >
                {node.label}
              </span>

              {/* Spider web sub-nodes */}
              {isHovered && (
                <SpiderWebSubNodes node={node} onCaseStudy={setSelectedNode} />
              )}
            </div>
          )
        })}
      </div>

      {selectedNode && (
        <CaseStudyModal node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  )
}

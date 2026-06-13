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

function CaseStudyModalB({ node, onClose }: CaseStudyModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-b-cream border border-b-border rounded-2xl p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-b-cream-dark flex items-center justify-center text-b-muted hover:text-b-ink transition-colors"
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
            <h3 className="font-b-serif text-lg text-b-ink">{node.label}</h3>
            <p className="font-b-sans text-sm text-b-muted">{node.caseStudy?.title}</p>
          </div>
        </div>

        <p className="font-b-sans text-sm text-b-ink-light mb-4 leading-relaxed">
          {node.caseStudy?.description}
        </p>

        {node.caseStudy?.metrics && (
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(node.caseStudy.metrics).map(([key, value]) => (
              <div key={key} className="text-center p-3 rounded-xl bg-b-cream-dark">
                <p className="font-b-mono text-xs text-b-muted mb-1">{key}</p>
                <p className="font-b-serif text-sm text-b-terracotta font-medium">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function CapabilityMapB() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.center-node-b', {
        scale: [1, 1.05, 1],
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })

      gsap.fromTo(
        '.map-connection-b',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: 'power2.out', stagger: 0.15, delay: 0.5 }
      )

      gsap.fromTo(
        '.main-node-b',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.1, delay: 0.8 }
      )

      setTimeout(() => setIsLoaded(true), 1500)
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const radius = isLoaded ? 150 : 0
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  const renderStars = (level: number = 0) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < level ? 'text-b-terracotta' : 'text-b-sand'}>★</span>
    ))
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-16">
      <div className="text-center mb-10">
        <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle mb-4" />
        <h2 className="font-b-serif text-2xl md:text-3xl text-b-ink mb-3">能力地图</h2>
        <p className="font-b-sans text-sm text-b-muted">核心能力星系 · Core Capabilities</p>
        <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle mt-4" />
      </div>

      <div className="relative w-[380px] h-[380px] md:w-[460px] md:h-[460px] mx-auto">
        {/* Center node */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="center-node-b relative w-28 h-28 md:w-32 md:h-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-b-terracotta to-b-sage animate-pulse opacity-40" />
            <div className="absolute inset-1 rounded-full bg-b-cream border-2 border-b-terracotta/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-1">👤</div>
                <p className="font-b-mono text-[10px] text-b-ink">{capabilityData.center.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-b-mono text-[10px] text-b-terracotta">{capabilityData.center.mbti}</span>
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
              className="main-node-b absolute z-10"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
                transition: isLoaded ? 'left 0.5s ease-out, top 0.5s ease-out' : 'none',
              }}
            >
              {/* Connection line */}
              <svg
                className="map-connection-b absolute pointer-events-none"
                style={{
                  width: `${Math.abs(pos.x)}px`,
                  height: '2px',
                  left: pos.x > 0 ? `-${Math.abs(pos.x)}px` : `${80}px`,
                  top: '40px',
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
                className={`relative w-18 h-18 md:w-22 md:h-22 rounded-xl border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer ${
                  isHovered ? 'scale-110 shadow-xl' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: isHovered ? `${node.color}12` : '#FAF8F5',
                  borderColor: isHovered ? node.color : '#E8E4DF',
                  boxShadow: isHovered ? `0 0 30px ${node.glowColor}` : '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {Icon && <Icon size={24} style={{ color: isHovered ? node.color : '#9B9590' }} />}
              </button>

              {/* Label below node */}
              <span
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-b-serif text-xs transition-colors"
                style={{ color: isHovered ? node.color : '#9B9590' }}
              >
                {node.label}
              </span>

              {/* Sub-nodes popup */}
              {isHovered && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-8 w-64 md:w-72 z-30">
                  <div className="bg-b-cream/95 backdrop-blur-lg rounded-xl border border-b-border p-4 shadow-xl">
                    <div className="space-y-2">
                      {node.subNodes.map((sub: SubNode) => (
                        <div
                          key={sub.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-b-sand/30 transition-colors"
                        >
                          <span className="font-b-sans text-xs text-b-ink-light">{sub.label}</span>
                          <span className="font-b-mono text-xs">{renderStars(sub.level)}</span>
                        </div>
                      ))}
                    </div>
                    {node.caseStudy && (
                      <div className="mt-3 pt-3 border-t border-b-border">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedNode(node)
                          }}
                          className="font-b-sans text-xs text-b-terracotta hover:text-b-terracotta/80 flex items-center gap-1"
                        >
                          查看案例 →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {selectedNode && (
        <CaseStudyModalB node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  )
}

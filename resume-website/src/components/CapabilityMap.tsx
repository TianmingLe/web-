import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { capabilityData, MainNode, SubNode } from '@data/capabilityMap'

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
          <span className="text-2xl">{node.icon}</span>
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

export default function CapabilityMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({})

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.center-node', {
        scale: [1, 1.05, 1],
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
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
      y: Math.sin(angle) * radius
    }
  }

  const renderStars = (level: number = 0) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < level ? 'text-energy' : 'text-warm-ghost'}>★</span>
    ))
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto py-12">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-serif text-warm mb-2">能力地图</h2>
        <p className="text-warm-faint text-sm font-sans">核心能力星系 · Core Capabilities</p>
      </div>

      <div className="relative aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="center-node relative z-20">
            <div className="relative w-24 h-24 md:w-28 md:h-28">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-energy to-ai animate-pulse opacity-50" />
              <div className="absolute inset-1 rounded-full bg-surface border-2 border-energy/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl mb-1">👤</div>
                  <p className="text-xs text-warm font-mono">{capabilityData.center.title}</p>
                </div>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs font-mono text-energy-light">{capabilityData.center.mbti}</span>
              </div>
            </div>
          </div>
        </div>

        {capabilityData.mainNodes.map((node, index) => {
          const pos = getNodePosition(index, capabilityData.mainNodes.length)
          const isHovered = hoveredNode === node.id
          const isActive = hoveredNode === node.id

          return (
            <div key={node.id} className="absolute left-1/2 top-1/2">
              <svg
                className="map-connection absolute"
                style={{
                  width: Math.abs(pos.x) + 'px',
                  height: '2px',
                  left: pos.x > 0 ? '150px' : 'auto',
                  right: pos.x < 0 ? Math.abs(pos.x) + 120 + 'px' : 'auto',
                  top: '140px',
                  transform: pos.x < 0 ? 'scaleX(-1)' : 'none'
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

              <div
                ref={(el) => { nodeRefs.current[node.id] = el }}
                className="main-node relative"
                style={{
                  transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
                  transition: isLoaded ? 'transform 0.3s ease-out' : 'none'
                }}
              >
                <button
                  onClick={() => node.caseStudy && setSelectedNode(node)}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer group ${
                    isHovered 
                      ? 'scale-110 shadow-lg' 
                      : 'hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: isHovered ? `${node.color}15` : 'rgba(255,255,255,0.05)',
                    borderColor: isHovered ? node.color : 'rgba(255,255,255,0.1)',
                    boxShadow: isHovered ? `0 0 30px ${node.glowColor}` : 'none'
                  }}
                >
                  <span className="text-2xl md:text-3xl">{node.icon}</span>
                  <span 
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium font-sans transition-colors"
                    style={{ color: isHovered ? node.color : '#94A3B8' }}
                  >
                    {node.label}
                  </span>
                </button>

                {isActive && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64">
                    <div className="bg-surface/95 backdrop-blur-lg rounded-xl border border-white/10 p-4 shadow-xl">
                      <div className="space-y-2">
                        {node.subNodes.map((sub: SubNode) => (
                          <div
                            key={sub.id}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors"
                          >
                            <span className="text-xs text-warm-muted font-sans">{sub.label}</span>
                            <span className="text-xs font-mono">{renderStars(sub.level)}</span>
                          </div>
                        ))}
                      </div>
                      {node.caseStudy && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedNode(node)
                            }}
                            className="text-xs text-energy hover:text-energy-light font-sans flex items-center gap-1"
                          >
                            查看案例 →
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
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

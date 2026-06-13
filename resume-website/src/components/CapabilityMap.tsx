import { useState, useEffect, useRef, useCallback } from 'react'
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

// SpiderWeb sub-nodes - all nodes expand together
function SpiderWebSubNodes({
  node,
  expanded,
  onCaseStudy,
}: {
  node: MainNode
  expanded: boolean
  onCaseStudy: (node: MainNode) => void
}) {
  const subCount = node.subNodes.length
  const subRadius = 110
  const webRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!webRef.current || !expanded) return

    const lines = webRef.current.querySelectorAll('.web-line')
    const ringLines = webRef.current.querySelectorAll('.web-ring')
    const subNodes = webRef.current.querySelectorAll('.sub-node-item')

    gsap.fromTo(
      lines,
      { strokeDashoffset: 200, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.3, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.2 }
    )

    gsap.fromTo(
      ringLines,
      { strokeDashoffset: 100, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.2, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.6 }
    )

    gsap.fromTo(
      subNodes,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)', delay: 0.5 }
    )
  }, [expanded])

  if (!expanded) return null

  return (
    <div
      ref={webRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: '260px',
        height: '260px',
        marginLeft: '-130px',
        marginTop: '-130px',
      }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {node.subNodes.map((_, i) => {
          const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const x2 = 130 + Math.cos(angle) * subRadius
          const y2 = 130 + Math.sin(angle) * subRadius
          return (
            <line
              key={`line-${i}`}
              className="web-line"
              x1="130"
              y1="130"
              x2={x2}
              y2={y2}
              stroke={node.color}
              strokeWidth="1"
              opacity="0"
              strokeDasharray="200"
              strokeDashoffset="200"
            />
          )
        })}
        {node.subNodes.map((_, i) => {
          const angle1 = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const angle2 = (((i + 1) % subCount) / subCount) * 2 * Math.PI - Math.PI / 2
          const x1 = 130 + Math.cos(angle1) * subRadius
          const y1 = 130 + Math.sin(angle1) * subRadius
          const x2 = 130 + Math.cos(angle2) * subRadius
          const y2 = 130 + Math.sin(angle2) * subRadius
          return (
            <line
              key={`ring-${i}`}
              className="web-ring"
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={node.color}
              strokeWidth="0.5"
              opacity="0"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
          )
        })}
      </svg>

      {node.subNodes.map((sub: SubNode, i: number) => {
        const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
        const x = Math.cos(angle) * subRadius
        const y = Math.sin(angle) * subRadius

        return (
          <div
            key={sub.id}
            className="sub-node-item absolute pointer-events-auto"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%) scale(0)',
              zIndex: 2,
            }}
          >
            <div
              className="flex flex-col items-center gap-0.5 px-1.5 py-0.5 rounded-md border backdrop-blur-sm"
              style={{
                backgroundColor: `${node.color}12`,
                borderColor: `${node.color}35`,
                minWidth: '60px',
              }}
            >
              <span className="text-[8px] text-warm-muted font-sans text-center leading-tight whitespace-nowrap">
                {sub.label}
              </span>
              {sub.level && (
                <span className="text-[8px] font-mono">
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

      <div className="absolute left-1/2 -translate-x-1/2" style={{ bottom: '-6px', zIndex: 2 }}>
        {node.caseStudy ? (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onCaseStudy(node)
            }}
            className="text-[9px] text-energy hover:text-energy-light font-sans px-2 py-0.5 rounded-full border border-energy/20 hover:border-energy/40 bg-surface/80 backdrop-blur-sm transition-colors pointer-events-auto"
          >
            查看案例 →
          </button>
        ) : (
          <span className="text-[9px] text-warm-ghost/50 font-sans px-2 py-0.5">
            {node.subNodes.length} 项技能
          </span>
        )}
      </div>
    </div>
  )
}

// Animated center icon that rotates and pulses
function AnimatedCenterIcon({ active }: { active: boolean }) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iconRef.current) return
    if (active) {
      gsap.to(iconRef.current, {
        rotation: 360,
        duration: 3,
        ease: 'none',
        repeat: -1,
      })
      gsap.to(iconRef.current, {
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.out',
        yoyo: true,
        repeat: -1,
      })
    } else {
      gsap.killTweensOf(iconRef.current)
      gsap.to(iconRef.current, { rotation: 0, scale: 1, duration: 0.5 })
    }
  }, [active])

  return (
    <div
      ref={iconRef}
      className="text-3xl md:text-4xl"
      style={{ display: 'inline-block' }}
    >
      👤
    </div>
  )
}

export default function CapabilityMap() {
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1)
  const [allExpanded, setAllExpanded] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Spotlight sequence: each node highlighted one by one, then all expand together
  const runSpotlightSequence = useCallback(() => {
    const nodes = capabilityData.mainNodes
    let current = 0

    const highlightNext = () => {
      if (current >= nodes.length) {
        // All nodes shown, now expand all spider webs together
        setActiveNodeIndex(-1)
        setAllExpanded(true)
        setTimeout(() => {
          setShowAll(true)
        }, 2000)
        return
      }

      setActiveNodeIndex(current)

      // Animate the active node growing from small with spotlight
      const btn = nodeRefs.current[current]
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0.5, opacity: 0.3 },
          { scale: 1.2, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }
        )
      }

      current++
      setTimeout(highlightNext, 2000) // 2s per node spotlight
    }

    highlightNext()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  // Scroll-triggered spotlight sequence
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            setTimeout(() => {
              runSpotlightSequence()
            }, 600)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [runSpotlightSequence])

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const radius = isLoaded ? 190 : 0
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  const isNodeActive = (index: number) => activeNodeIndex === index
  const isNodeDimmed = (index: number) => activeNodeIndex >= 0 && activeNodeIndex !== index && !showAll && !allExpanded

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-12">
      {/* Strong spotlight overlay - dims everything except active node area */}
      {(activeNodeIndex >= 0 || allExpanded) && !showAll && (
        <div
          className="absolute inset-0 z-5 pointer-events-none"
          style={{
            background: 'rgba(0, 0, 0, 0.82)',
            transition: 'background 0.8s ease',
          }}
        />
      )}

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-xl md:text-2xl font-serif text-warm mb-2">能力地图</h2>
        <p className="text-warm-faint text-sm font-sans">核心能力星系 · Core Capabilities</p>
      </div>

      <div className="relative w-[560px] h-[560px] md:w-[660px] md:h-[660px] mx-auto">
        {/* Center node - always on top during spotlight */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            opacity: activeNodeIndex >= 0 && !showAll ? 1 : 1,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="center-node relative w-20 h-20 md:w-24 md:h-24">
            <div
              className="absolute inset-0 rounded-full animate-pulse"
              style={{
                background: activeNodeIndex >= 0 && !showAll
                  ? 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(6,182,212,0.2) 50%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%)',
                animationDuration: activeNodeIndex >= 0 ? '1s' : '2s',
              }}
            />
            <div className="absolute inset-1 rounded-full bg-surface border-2 border-energy/40 flex items-center justify-center shadow-lg"
              style={{
                boxShadow: activeNodeIndex >= 0 && !showAll
                  ? '0 0 30px rgba(249,115,22,0.5), 0 0 60px rgba(6,182,212,0.3), inset 0 0 20px rgba(249,115,22,0.1)'
                  : '0 0 15px rgba(249,115,22,0.2)',
                transition: 'box-shadow 0.5s ease',
              }}
            >
              <div className="text-center">
                <AnimatedCenterIcon active={activeNodeIndex >= 0 && !showAll} />
                <p className="text-[9px] text-warm font-mono mt-0.5">{capabilityData.center.title}</p>
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
          const active = isNodeActive(index)
          const dimmed = isNodeDimmed(index)
          const Icon = iconMap[node.id]

          return (
            <div
              key={node.id}
              className="main-node absolute"
              style={{
                left: `calc(50% + ${pos.x}px)`,
                top: `calc(50% + ${pos.y}px)`,
                transform: 'translate(-50%, -50%)',
                transition: isLoaded ? 'left 0.5s ease-out, top 0.5s ease-out' : 'none',
                zIndex: active ? 25 : 10,
              }}
            >
              {/* Connection line to center */}
              <svg
                className="absolute pointer-events-none transition-opacity duration-700"
                style={{
                  width: `${Math.abs(pos.x)}px`,
                  height: '2px',
                  left: pos.x > 0 ? `-${Math.abs(pos.x)}px` : `${60}px`,
                  top: '32px',
                  transform: pos.x < 0 ? 'scaleX(-1)' : 'none',
                  transformOrigin: pos.x < 0 ? 'right' : 'left',
                  opacity: dimmed ? 0.05 : active ? 0.8 : 0.4,
                  zIndex: 1,
                }}
              >
                <line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke={active ? node.color : '#475569'}
                  strokeWidth={active ? 3 : 2}
                  strokeDasharray="4,4"
                />
              </svg>

              <button
                ref={(el) => { nodeRefs.current[index] = el }}
                onClick={() => node.caseStudy && setSelectedNode(node)}
                className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 backdrop-blur-md transition-all duration-700 flex items-center justify-center cursor-pointer"
                style={{
                  backgroundColor: active ? `${node.color}30` : dimmed ? 'rgba(30,30,40,0.6)' : 'rgba(255,255,255,0.05)',
                  borderColor: active ? node.color : dimmed ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                  boxShadow: active
                    ? `0 0 50px ${node.glowColor}, 0 0 100px ${node.glowColor}, 0 0 150px ${node.glowColor}`
                    : dimmed ? 'none' : 'none',
                  opacity: dimmed ? 0.15 : 1,
                  transform: active ? 'scale(1.25)' : dimmed ? 'scale(0.8)' : 'scale(1)',
                  zIndex: active ? 30 : 10,
                }}
              >
                {Icon && (
                  <Icon
                    size={active ? 28 : 20}
                    style={{
                      color: active ? node.color : dimmed ? '#334155' : '#94A3B8',
                      transition: 'all 0.7s ease',
                      filter: active ? `drop-shadow(0 0 8px ${node.color})` : 'none',
                    }}
                  />
                )}
              </button>

              {/* Label */}
              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium font-sans transition-all duration-700"
                style={{
                  color: active ? node.color : dimmed ? '#1e293b' : '#94A3B8',
                  opacity: dimmed ? 0.2 : 1,
                  transform: active ? 'scale(1.15)' : 'scale(1)',
                  textShadow: active ? `0 0 10px ${node.glowColor}` : 'none',
                }}
              >
                {node.label}
              </span>

              {/* Spider web - shown for active node during spotlight, or all nodes when allExpanded */}
              <SpiderWebSubNodes
                node={node}
                expanded={active || allExpanded}
                onCaseStudy={setSelectedNode}
              />
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

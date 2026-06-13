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

// SpiderWeb sub-nodes - Magazine Edition
function SpiderWebSubNodesB({
  node,
  revealed,
  onCaseStudy,
}: {
  node: MainNode
  revealed: boolean
  onCaseStudy: (node: MainNode) => void
}) {
  const subCount = node.subNodes.length
  const subRadius = 85
  const webRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!webRef.current || !revealed) return

    const lines = webRef.current.querySelectorAll('.web-line-b')
    const ringLines = webRef.current.querySelectorAll('.web-ring-b')
    const subNodes = webRef.current.querySelectorAll('.sub-node-item-b')

    gsap.fromTo(
      lines,
      { strokeDashoffset: 200, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.3, duration: 0.6, stagger: 0.08, ease: 'power2.out', delay: 0.1 }
    )

    gsap.fromTo(
      ringLines,
      { strokeDashoffset: 100, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.2, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 0.4 }
    )

    gsap.fromTo(
      subNodes,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.07, ease: 'back.out(1.7)', delay: 0.3 }
    )
  }, [revealed])

  if (!revealed) return null

  return (
    <div
      ref={webRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: '200px',
        height: '200px',
        marginLeft: '-100px',
        marginTop: '-100px',
      }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {node.subNodes.map((_, i) => {
          const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const x2 = 100 + Math.cos(angle) * subRadius
          const y2 = 100 + Math.sin(angle) * subRadius
          return (
            <line
              key={`line-${i}`}
              className="web-line-b"
              x1="100"
              y1="100"
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
          const x1 = 100 + Math.cos(angle1) * subRadius
          const y1 = 100 + Math.sin(angle1) * subRadius
          const x2 = 100 + Math.cos(angle2) * subRadius
          const y2 = 100 + Math.sin(angle2) * subRadius
          return (
            <line
              key={`ring-${i}`}
              className="web-ring-b"
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
            className="sub-node-item-b absolute pointer-events-auto"
            style={{
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`,
              transform: 'translate(-50%, -50%) scale(0)',
              zIndex: 2,
            }}
          >
            <div
              className="flex flex-col items-center gap-0.5 px-2 py-1 rounded-md border backdrop-blur-sm"
              style={{
                backgroundColor: `${node.color}08`,
                borderColor: `${node.color}25`,
                minWidth: '72px',
              }}
            >
              <span className="font-b-sans text-[9px] text-b-ink-light text-center leading-tight whitespace-nowrap">
                {sub.label}
              </span>
              {sub.level && (
                <span className="font-b-mono text-[9px]">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className={j < sub.level ? 'text-b-terracotta' : 'text-b-sand'}>
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
            className="font-b-sans text-[9px] text-b-terracotta hover:text-b-terracotta/80 px-2 py-0.5 rounded-full border border-b-terracotta/20 hover:border-b-terracotta/40 bg-b-cream/80 backdrop-blur-sm transition-colors pointer-events-auto"
          >
            查看案例 →
          </button>
        ) : (
          <span className="font-b-sans text-[9px] text-b-sand/60 px-2 py-0.5">
            {node.subNodes.length} 项技能
          </span>
        )}
      </div>
    </div>
  )
}

export default function CapabilityMapB() {
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [revealedNodes, setRevealedNodes] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

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

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            const nodeIds = capabilityData.mainNodes.map((n) => n.id)
            nodeIds.forEach((id, index) => {
              setTimeout(() => {
                setRevealedNodes((prev) => new Set([...prev, id]))
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const getNodePosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2
    const radius = isLoaded ? 170 : 0
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    }
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-16">
      <div className="text-center mb-10">
        <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle mb-4" />
        <h2 className="font-b-serif text-2xl md:text-3xl text-b-ink mb-3">能力地图</h2>
        <p className="font-b-sans text-sm text-b-muted">核心能力星系 · Core Capabilities</p>
        <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle mt-4" />
      </div>

      <div className="relative w-[500px] h-[500px] md:w-[580px] md:h-[580px] mx-auto">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="center-node-b relative w-24 h-24 md:w-28 md:h-28">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-b-terracotta to-b-sage animate-pulse opacity-40" />
            <div className="absolute inset-1 rounded-full bg-b-cream border-2 border-b-terracotta/40 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-0.5">👤</div>
                <p className="font-b-mono text-[9px] text-b-ink">{capabilityData.center.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="font-b-mono text-[9px] text-b-terracotta">{capabilityData.center.mbti}</span>
            </div>
          </div>
        </div>

        {capabilityData.mainNodes.map((node, index) => {
          const pos = getNodePosition(index, capabilityData.mainNodes.length)
          const isRevealed = revealedNodes.has(node.id)
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
              <svg
                className="map-connection-b absolute pointer-events-none"
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
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-xl border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center cursor-pointer z-30 ${
                  isRevealed ? 'scale-110 shadow-xl' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: isRevealed ? `${node.color}12` : '#FAF8F5',
                  borderColor: isRevealed ? node.color : '#E8E4DF',
                  boxShadow: isRevealed ? `0 0 30px ${node.glowColor}` : '0 4px 20px rgba(0,0,0,0.05)',
                }}
              >
                {Icon && <Icon size={20} style={{ color: isRevealed ? node.color : '#9B9590' }} />}
              </button>

              <span
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-b-serif text-[11px] transition-colors"
                style={{ color: isRevealed ? node.color : '#9B9590' }}
              >
                {node.label}
              </span>

              <SpiderWebSubNodesB
                node={node}
                revealed={isRevealed}
                onCaseStudy={setSelectedNode}
              />
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

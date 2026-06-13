import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import {
  Cog, Brain, Code2, Clapperboard, Lightbulb,
  type LucideIcon
} from 'lucide-react'
import { capabilityData, MainNode, SubNode } from '@data/capabilityMap'
import { useMediaQuery } from '@hooks/useMediaQuery'

const iconMap: Record<string, LucideIcon> = {
  energy: Cog,
  ai: Brain,
  dev: Code2,
  media: Clapperboard,
  thinking: Lightbulb,
}

/* ------------------------------------------------------------------ */
/*  Shared constants (derived from container size)                     */
/* ------------------------------------------------------------------ */
const CONTAINER_SM = 360   // mobile base (px)
const CONTAINER_MD = 720   // desktop base (px)
const CONTAINER_LG = 860   // desktop large (px)

function useContainerSize() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  return {
    size: isLg ? CONTAINER_LG : isMd ? CONTAINER_MD : CONTAINER_SM,
    isMobile: !isMd,
  }
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Text Scramble Effect                                               */
/* ------------------------------------------------------------------ */
function useTextScramble(text: string, active: boolean) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
    let iteration = 0
    const total = text.length * 4

    const tick = () => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' '
            if (iteration / 4 > idx) return text[idx]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      iteration++
      if (iteration <= total) {
        frameRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [active, text])

  return display
}

/* ------------------------------------------------------------------ */
/*  Floating Particles                                                 */
/* ------------------------------------------------------------------ */
function FloatingParticles({ activeNodeIndex, allExpanded, showAll, nodePositions }: {
  activeNodeIndex: number
  allExpanded: boolean
  showAll: boolean
  nodePositions: { x: number; y: number }[]
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement[]>([])
  const animRef = useRef<gsap.core.Tween[]>([])

  useEffect(() => {
    if (!containerRef.current) return
    const particles = particlesRef.current.filter(Boolean)
    if (!particles.length) return

    animRef.current.forEach(t => t.kill())
    animRef.current = []

    const active = activeNodeIndex >= 0 && !showAll
    const targetX = active ? nodePositions[activeNodeIndex]?.x ?? 0 : 0
    const targetY = active ? nodePositions[activeNodeIndex]?.y ?? 0 : 0
    const color = active ? capabilityData.mainNodes[activeNodeIndex]?.color : '#94A3B8'

    particles.forEach((p, i) => {
      if (active) {
        const angle = Math.random() * Math.PI * 2
        const dist = 80 + Math.random() * 100
        const tx = targetX + Math.cos(angle) * dist
        const ty = targetY + Math.sin(angle) * dist
        const t1 = gsap.to(p, {
          x: tx,
          y: ty,
          duration: 1.5 + Math.random(),
          ease: 'power2.out',
          repeat: -1,
          yoyo: true,
        })
        const t2 = gsap.to(p, {
          opacity: 0.4 + Math.random() * 0.4,
          scale: 1.2 + Math.random() * 0.8,
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
          duration: 0.8,
        })
        animRef.current.push(t1, t2)
      } else if (allExpanded && !showAll) {
        const angle = (i / particles.length) * Math.PI * 2
        const radius = 120 + (i % 3) * 80
        const t1 = gsap.to(p, {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        const t2 = gsap.to(p, {
          opacity: 0.2,
          scale: 1,
          backgroundColor: '#475569',
          boxShadow: 'none',
          duration: 0.8,
        })
        animRef.current.push(t1, t2)
      } else {
        const t1 = gsap.to(p, {
          x: (Math.random() - 0.5) * 600,
          y: (Math.random() - 0.5) * 600,
          duration: 8 + Math.random() * 4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
        const t2 = gsap.to(p, {
          opacity: 0.15,
          scale: 1,
          backgroundColor: '#475569',
          boxShadow: 'none',
          duration: 0.8,
        })
        animRef.current.push(t1, t2)
      }
    })

    return () => {
      animRef.current.forEach(t => t.kill())
    }
  }, [activeNodeIndex, allExpanded, showAll, nodePositions])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) particlesRef.current[i] = el }}
          className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full opacity-0"
          style={{
            backgroundColor: '#475569',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Center Rings                                                       */
/* ------------------------------------------------------------------ */
function CenterRings({ active }: { active: boolean }) {
  const ringsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ringsRef.current) return
    const rings = ringsRef.current.querySelectorAll('.center-ring')
    if (active) {
      rings.forEach((ring, i) => {
        gsap.fromTo(ring,
          { scale: 0.8, opacity: 0 },
          {
            scale: 2.2 + i * 0.6,
            opacity: 0.15 - i * 0.03,
            duration: 2 + i * 0.5,
            ease: 'power2.out',
            repeat: -1,
            delay: i * 0.4,
          }
        )
      })
    } else {
      rings.forEach((ring) => {
        gsap.killTweensOf(ring)
        gsap.to(ring, { scale: 0.8, opacity: 0, duration: 0.5 })
      })
    }
  }, [active])

  return (
    <div ref={ringsRef} className="absolute inset-0 pointer-events-none">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="center-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-energy/30"
          style={{
            width: '80px',
            height: '80px',
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Rotating Hexagon Mesh                                              */
/* ------------------------------------------------------------------ */
function HexagonMesh({ active, containerSize }: { active: boolean; containerSize: number }) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const group = svgRef.current.querySelector('.hex-group')
    if (!group) return
    if (active) {
      gsap.to(group, {
        rotation: 360,
        duration: 60,
        ease: 'none',
        repeat: -1,
        transformOrigin: '50% 50%',
      })
      gsap.fromTo(group, { opacity: 0 }, { opacity: 0.25, duration: 1 })
    } else {
      gsap.killTweensOf(group)
      gsap.to(group, { opacity: 0, duration: 0.6 })
    }
  }, [active])

  const cx = containerSize / 2
  const cy = containerSize / 2
  const r = 120
  const hexPoints = Array.from({ length: 6 }).map((_, i) => {
    const a = (i * 60 - 30) * (Math.PI / 180)
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')

  return (
    <svg
      ref={svgRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: containerSize,
        height: containerSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 2,
      }}
    >
      <g className="hex-group" opacity="0">
        <polygon
          points={hexPoints}
          fill="none"
          stroke="#F97316"
          strokeWidth="1"
          opacity="0.6"
        />
        <polygon
          points={hexPoints}
          fill="none"
          stroke="#06B6D4"
          strokeWidth="0.5"
          opacity="0.4"
          transform={`rotate(30 ${cx} ${cy})`}
        />
      </g>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Shooting Stars                                                     */
/* ------------------------------------------------------------------ */
function ShootingStars({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!containerRef.current || !active) return
    const container = containerRef.current

    const spawn = () => {
      const star = document.createElement('div')
      const angle = Math.random() * Math.PI * 2
      const len = 60 + Math.random() * 80
      star.style.position = 'absolute'
      star.style.left = '50%'
      star.style.top = '50%'
      star.style.width = `${len}px`
      star.style.height = '2px'
      star.style.borderRadius = '1px'
      star.style.background = 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)'
      star.style.boxShadow = '0 0 6px rgba(255,255,255,0.6)'
      star.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`
      star.style.opacity = '0'
      star.style.pointerEvents = 'none'
      container.appendChild(star)

      const dist = 200 + Math.random() * 250
      const tx = Math.cos(angle) * dist
      const ty = Math.sin(angle) * dist

      gsap.fromTo(star,
        { x: 0, y: 0, opacity: 1, scale: 0.5 },
        {
          x: tx,
          y: ty,
          opacity: 0,
          scale: 1.2,
          duration: 0.8 + Math.random() * 0.6,
          ease: 'power2.out',
          onComplete: () => star.remove(),
        }
      )
    }

    timerRef.current = setInterval(spawn, 1200)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      container.innerHTML = ''
    }
  }, [active])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 6 }} />
}

/* ------------------------------------------------------------------ */
/*  Glowing Node Halos                                                 */
/* ------------------------------------------------------------------ */
function NodeHalo({ active, color }: { active: boolean; color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (active) {
      gsap.fromTo(ref.current,
        { scale: 1, opacity: 0.6 },
        { scale: 1.6, opacity: 0, duration: 1.5, ease: 'power2.out', repeat: -1 }
      )
    } else {
      gsap.killTweensOf(ref.current)
      gsap.to(ref.current, { scale: 1, opacity: 0, duration: 0.4 })
    }
  }, [active])

  return (
    <div
      ref={ref}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: 56,
        height: 56,
        background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`,
        opacity: 0,
        zIndex: 0,
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Particle Burst on Activation                                       */
/* ------------------------------------------------------------------ */
function ParticleBurst({ active, color }: { active: boolean; color: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !active) return
    const container = containerRef.current
    container.innerHTML = ''

    const count = 12
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'absolute left-1/2 top-1/2 rounded-full pointer-events-none'
      p.style.width = '3px'
      p.style.height = '3px'
      p.style.backgroundColor = color
      p.style.boxShadow = `0 0 4px ${color}`
      container.appendChild(p)

      const angle = (i / count) * Math.PI * 2
      const dist = 30 + Math.random() * 40
      gsap.fromTo(p,
        { x: 0, y: 0, opacity: 1, scale: 1 },
        {
          x: Math.cos(angle) * dist,
          y: Math.sin(angle) * dist,
          opacity: 0,
          scale: 0,
          duration: 0.6 + Math.random() * 0.4,
          ease: 'power2.out',
          delay: Math.random() * 0.1,
          onComplete: () => p.remove(),
        }
      )
    }
  }, [active, color])

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 15 }} />
}

/* ------------------------------------------------------------------ */
/*  Energy Beam with Traveling Light                                   */
/* ------------------------------------------------------------------ */
function EnergyBeam({ active, fromX, fromY, toX, toY, color, containerSize }: {
  active: boolean
  fromX: number
  fromY: number
  toX: number
  toY: number
  color: string
  containerSize: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current || !active) return
    const line = svgRef.current.querySelector('.energy-line')
    const glow = svgRef.current.querySelector('.energy-glow')
    const travel = svgRef.current.querySelector('.energy-travel')
    if (!line || !glow || !travel) return

    gsap.fromTo(line,
      { strokeDashoffset: 300, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.8, duration: 0.6, ease: 'power2.out' }
    )
    gsap.fromTo(glow,
      { strokeDashoffset: 300, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.4, duration: 0.6, ease: 'power2.out', delay: 0.1 }
    )

    const pulse = gsap.to(line, {
      opacity: 0.4,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    const len = Math.hypot(toX - fromX, toY - fromY)
    const travelAnim = gsap.fromTo(travel,
      { strokeDashoffset: len, opacity: 1 },
      { strokeDashoffset: -len, opacity: 1, duration: 1.2, ease: 'none', repeat: -1 }
    )

    return () => {
      pulse.kill()
      travelAnim.kill()
    }
  }, [active, fromX, fromY, toX, toY])

  if (!active) return null

  const half = containerSize / 2

  return (
    <svg
      ref={svgRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: containerSize,
        height: containerSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 5,
      }}
    >
      <line
        className="energy-glow"
        x1={fromX + half}
        y1={fromY + half}
        x2={toX + half}
        y2={toY + half}
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0"
        strokeDasharray="300"
        strokeDashoffset="300"
        filter="blur(4px)"
      />
      <line
        className="energy-line"
        x1={fromX + half}
        y1={fromY + half}
        x2={toX + half}
        y2={toY + half}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0"
        strokeDasharray="8,4"
        strokeDashoffset="300"
      />
      <line
        className="energy-travel"
        x1={fromX + half}
        y1={fromY + half}
        x2={toX + half}
        y2={toY + half}
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0"
        strokeDasharray="20,200"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Constellation Lines                                                */
/* ------------------------------------------------------------------ */
function ConstellationLines({ positions, showAll, allExpanded, containerSize }: {
  positions: { x: number; y: number }[]
  showAll: boolean
  allExpanded: boolean
  containerSize: number
}) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return
    const lines = svgRef.current.querySelectorAll('.constellation-line')
    const visible = showAll || allExpanded

    lines.forEach((line, i) => {
      if (visible) {
        gsap.fromTo(line,
          { opacity: 0, strokeDashoffset: 200 },
          { opacity: 0.12, strokeDashoffset: 0, duration: 1, delay: i * 0.1, ease: 'power2.out' }
        )
      } else {
        gsap.to(line, { opacity: 0, duration: 0.5 })
      }
    })
  }, [showAll, allExpanded])

  if (!positions.length) return null

  const half = containerSize / 2
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
  for (let i = 0; i < positions.length; i++) {
    const next = (i + 1) % positions.length
    lines.push({
      x1: positions[i].x + half,
      y1: positions[i].y + half,
      x2: positions[next].x + half,
      y2: positions[next].y + half,
    })
  }

  return (
    <svg
      ref={svgRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: containerSize,
        height: containerSize,
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
      }}
    >
      {lines.map((line, i) => (
        <line
          key={i}
          className="constellation-line"
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="#94A3B8"
          strokeWidth="1"
          strokeDasharray="200"
          strokeDashoffset="200"
          opacity="0"
        />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Orbiting Labels                                                    */
/* ------------------------------------------------------------------ */
function OrbitingLabels({ node, active, dimmed }: {
  node: MainNode
  active: boolean
  dimmed: boolean
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const labels = containerRef.current.querySelectorAll('.orbit-label')
    labels.forEach((label, i) => {
      const angle = (i / labels.length) * 360
      const radius = 42 + (i % 2) * 10
      const duration = 4 + (i % 3) * 1.5
      gsap.to(label, {
        rotation: angle + 360,
        duration,
        ease: 'none',
        repeat: -1,
        transformOrigin: `0px ${radius}px`,
      })
    })
  }, [])

  const labels = ['01', '02', '03']
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {labels.map((text, i) => (
        <div
          key={i}
          className="orbit-label absolute left-1/2 top-1/2 opacity-0"
          style={{
            marginLeft: '-3px',
            marginTop: '-3px',
            opacity: active ? 0.5 : dimmed ? 0.05 : 0.2,
            transition: 'opacity 0.7s ease',
          }}
        >
          <span
            className="text-[7px] font-mono"
            style={{
              color: active ? node.color : '#475569',
            }}
          >
            {text}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Ripple Wave                                                        */
/* ------------------------------------------------------------------ */
function RippleWave({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !active) return
    const ripples = containerRef.current.querySelectorAll('.ripple-ring')

    ripples.forEach((ripple, i) => {
      gsap.fromTo(ripple,
        { scale: 0, opacity: 0.6 },
        {
          scale: 3.5,
          opacity: 0,
          duration: 2.5,
          delay: i * 0.8,
          ease: 'power2.out',
          repeat: -1,
        }
      )
    })

    return () => {
      ripples.forEach((r) => gsap.killTweensOf(r))
    }
  }, [active])

  if (!active) return null

  return (
    <div ref={containerRef} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ zIndex: 4 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="ripple-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-energy/40"
          style={{
            width: '100px',
            height: '100px',
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Spider Web Sub-Nodes (curved lines)                                */
/* ------------------------------------------------------------------ */
function SpiderWebSubNodes({
  node,
  expanded,
  onCaseStudy,
  isMobile,
  nodeRadius,
  webSize,
}: {
  node: MainNode
  expanded: boolean
  onCaseStudy: (node: MainNode) => void
  isMobile: boolean
  nodeRadius: number
  webSize: number
}) {
  const subCount = node.subNodes.length
  const subRadius = nodeRadius
  const webRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!webRef.current || !expanded) return

    const lines = webRef.current.querySelectorAll('.web-line')
    const ringLines = webRef.current.querySelectorAll('.web-ring')
    const subNodes = webRef.current.querySelectorAll('.sub-node-item')
    const secLines = webRef.current.querySelectorAll('.sec-web-line')
    const secNodes = webRef.current.querySelectorAll('.sec-sub-node-item')

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

    gsap.fromTo(
      secLines,
      { strokeDashoffset: 60, opacity: 0 },
      { strokeDashoffset: 0, opacity: 0.2, duration: 0.5, stagger: 0.06, ease: 'power2.out', delay: 1.2 }
    )

    gsap.fromTo(
      secNodes,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)', delay: 1.4 }
    )
  }, [expanded])

  if (!expanded) return null

  const generateSecSubNodes = (sub: SubNode, parentIndex: number) => {
    const secCount = isMobile ? 2 : 2 + (parentIndex % 2)
    const result: { label: string; angle: number; parentAngle: number }[] = []
    for (let i = 0; i < secCount; i++) {
      result.push({
        label: `${sub.label.split(' ')[0]}·${i + 1}`,
        angle: ((i / secCount) * Math.PI) - Math.PI / 2,
        parentAngle: (parentIndex / subCount) * 2 * Math.PI - Math.PI / 2,
      })
    }
    return result
  }

  const half = webSize / 2

  return (
    <div
      ref={webRef}
      className="absolute pointer-events-none"
      style={{
        left: '50%',
        top: '50%',
        width: webSize,
        height: webSize,
        marginLeft: -half,
        marginTop: -half,
      }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
        {node.subNodes.map((_, i) => {
          const angle = (i / subCount) * 2 * Math.PI - Math.PI / 2
          const x2 = half + Math.cos(angle) * subRadius
          const y2 = half + Math.sin(angle) * subRadius
          return (
            <line
              key={`line-${i}`}
              className="web-line"
              x1={half}
              y1={half}
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
          const x1 = half + Math.cos(angle1) * subRadius
          const y1 = half + Math.sin(angle1) * subRadius
          const x2 = half + Math.cos(angle2) * subRadius
          const y2 = half + Math.sin(angle2) * subRadius
          const mx = (x1 + x2) / 2 + Math.cos((angle1 + angle2) / 2) * 10
          const my = (y1 + y2) / 2 + Math.sin((angle1 + angle2) / 2) * 10
          return (
            <path
              key={`ring-${i}`}
              className="web-ring"
              d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
              stroke={node.color}
              strokeWidth="0.5"
              fill="none"
              opacity="0"
              strokeDasharray="100"
              strokeDashoffset="100"
            />
          )
        })}
        {node.subNodes.map((sub, pi) => {
          const parentAngle = (pi / subCount) * 2 * Math.PI - Math.PI / 2
          const px = half + Math.cos(parentAngle) * subRadius
          const py = half + Math.sin(parentAngle) * subRadius
          const secNodes = generateSecSubNodes(sub, pi)
          return secNodes.map((sec, si) => {
            const secAngle = parentAngle + sec.angle * 0.6
            const sx = px + Math.cos(secAngle) * (isMobile ? 30 : 45)
            const sy = py + Math.sin(secAngle) * (isMobile ? 30 : 45)
            const mx = (px + sx) / 2 + Math.cos((parentAngle + secAngle) / 2) * 6
            const my = (py + sy) / 2 + Math.sin((parentAngle + secAngle) / 2) * 6
            return (
              <path
                key={`sec-line-${pi}-${si}`}
                className="sec-web-line"
                d={`M ${px} ${py} Q ${mx} ${my} ${sx} ${sy}`}
                stroke={node.color}
                strokeWidth="0.5"
                fill="none"
                opacity="0"
                strokeDasharray="60"
                strokeDashoffset="60"
              />
            )
          })
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
                minWidth: isMobile ? '44px' : '60px',
              }}
            >
              <span className="text-[8px] text-warm-muted font-sans text-center leading-tight whitespace-nowrap">
                {sub.label}
              </span>
              {sub.level && (
                <span className="text-[8px] font-mono">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className={j < (sub.level ?? 0) ? 'text-energy' : 'text-warm-ghost'}>
                      ★
                    </span>
                  ))}
                </span>
              )}
            </div>
          </div>
        )
      })}

      {node.subNodes.map((sub, pi) => {
        const parentAngle = (pi / subCount) * 2 * Math.PI - Math.PI / 2
        const px = Math.cos(parentAngle) * subRadius
        const py = Math.sin(parentAngle) * subRadius
        const secNodes = generateSecSubNodes(sub, pi)
        return secNodes.map((sec, si) => {
          const secAngle = parentAngle + sec.angle * 0.6
          const sx = px + Math.cos(secAngle) * (isMobile ? 30 : 45)
          const sy = py + Math.sin(secAngle) * (isMobile ? 30 : 45)
          return (
            <div
              key={`sec-${pi}-${si}`}
              className="sec-sub-node-item absolute pointer-events-none"
              style={{
                left: `calc(50% + ${sx}px)`,
                top: `calc(50% + ${sy}px)`,
                transform: 'translate(-50%, -50%) scale(0)',
                zIndex: 2,
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: node.color,
                  boxShadow: `0 0 4px ${node.color}`,
                }}
              />
              <span className="text-[6px] text-warm-ghost font-mono whitespace-nowrap absolute -bottom-3 left-1/2 -translate-x-1/2">
                {sec.label}
              </span>
            </div>
          )
        })
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

/* ------------------------------------------------------------------ */
/*  Center Orbiting Particles                                          */
/* ------------------------------------------------------------------ */
function CenterOrbitingParticles({ active }: { active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const particles = containerRef.current.querySelectorAll('.orbit-particle')
    if (active) {
      particles.forEach((p, i) => {
        const angle = (i / particles.length) * 360
        const radius = 45 + (i % 3) * 12
        const duration = 2 + (i % 3) * 0.8
        gsap.to(p, {
          rotation: angle + 360,
          duration,
          ease: 'none',
          repeat: -1,
          transformOrigin: `0px ${radius}px`,
        })
        gsap.to(p, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: i * 0.1,
        })
      })
    } else {
      particles.forEach((p) => {
        gsap.killTweensOf(p)
        gsap.to(p, { opacity: 0, scale: 0, duration: 0.3 })
      })
    }
  }, [active])

  const colors = ['#F97316', '#06B6D4', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B']
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      {colors.map((c, i) => (
        <div
          key={i}
          className="orbit-particle absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full opacity-0"
          style={{
            backgroundColor: c,
            boxShadow: `0 0 6px ${c}, 0 0 12px ${c}`,
            marginLeft: '-3px',
            marginTop: '-3px',
          }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Static Center Icon                                                 */
/* ------------------------------------------------------------------ */
function StaticCenterIcon() {
  return (
    <div className="text-2xl md:text-3xl" style={{ display: 'inline-block' }}>
      👤
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Node Item (extracted to allow hooks per node)                */
/* ------------------------------------------------------------------ */
function MainNodeItem({
  node,
  index,
  isLoaded,
  activeNodeIndex,
  allExpanded,
  showAll,
  nodeRefs,
  setSelectedNode,
  isMobile,
}: {
  node: MainNode
  index: number
  isLoaded: boolean
  activeNodeIndex: number
  allExpanded: boolean
  showAll: boolean
  nodeRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>
  setSelectedNode: (node: MainNode | null) => void
  isMobile: boolean
}) {
  const total = capabilityData.mainNodes.length
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2
  const radius = isLoaded ? (isMobile ? 140 : 260) : 0
  const pos = { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
  const active = activeNodeIndex === index
  const dimmed = activeNodeIndex >= 0 && activeNodeIndex !== index && !showAll && !allExpanded
  const Icon = iconMap[node.id]
  const labelText = useTextScramble(node.label, active)
  const nodeRadiusWeb = isMobile ? 70 : 110
  const webSize = isMobile ? 220 : 320

  return (
    <div
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

      {/* Node halo */}
      <NodeHalo active={active} color={node.color} />

      {/* Particle burst */}
      <ParticleBurst active={active} color={node.color} />

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

      {/* Label with scramble */}
      <span
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium font-sans transition-all duration-700"
        style={{
          color: active ? node.color : dimmed ? '#1e293b' : '#94A3B8',
          opacity: dimmed ? 0.2 : 1,
          transform: active ? 'scale(1.15)' : 'scale(1)',
          textShadow: active ? `0 0 10px ${node.glowColor}` : 'none',
        }}
      >
        {labelText}
      </span>

      {/* Orbiting labels */}
      <OrbitingLabels node={node} active={active} dimmed={dimmed} />

      {/* Spider web */}
      <SpiderWebSubNodes
        node={node}
        expanded={active || allExpanded}
        onCaseStudy={setSelectedNode}
        isMobile={isMobile}
        nodeRadius={nodeRadiusWeb}
        webSize={webSize}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function CapabilityMap() {
  const [selectedNode, setSelectedNode] = useState<MainNode | null>(null)
  const [activeNodeIndex, setActiveNodeIndex] = useState<number>(-1)
  const [allExpanded, setAllExpanded] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([])
  const overlayRef = useRef<HTMLDivElement>(null)

  const { size: containerSize, isMobile } = useContainerSize()
  const nodeRadius = isMobile ? 140 : 260

  // Spotlight sequence
  const runSpotlightSequence = useCallback(() => {
    const nodes = capabilityData.mainNodes
    let current = 0

    const highlightNext = () => {
      if (current >= nodes.length) {
        setActiveNodeIndex(-1)
        setAllExpanded(true)
        setTimeout(() => {
          setShowAll(true)
        }, 3500)
        return
      }

      setActiveNodeIndex(current)

      const btn = nodeRefs.current[current]
      if (btn) {
        gsap.fromTo(
          btn,
          { scale: 0.5, opacity: 0.3 },
          { scale: 1.2, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' }
        )
      }

      current++
      setTimeout(highlightNext, 3500)
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

  // Overlay fade in/out
  useEffect(() => {
    if (!overlayRef.current) return
    const shouldShow = (activeNodeIndex >= 0 || allExpanded) && !showAll
    if (shouldShow) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
    } else {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.6, ease: 'power2.in' })
    }
  }, [activeNodeIndex, allExpanded, showAll])

  const totalNodes = capabilityData.mainNodes.length
  const nodePositions = capabilityData.mainNodes.map((_, i) => {
    const angle = (i / totalNodes) * 2 * Math.PI - Math.PI / 2
    const radius = isLoaded ? nodeRadius : 0
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius }
  })

  const activePos = activeNodeIndex >= 0 ? nodePositions[activeNodeIndex] : null
  const activeColor = activeNodeIndex >= 0 ? capabilityData.mainNodes[activeNodeIndex]?.color : undefined

  return (
    <div ref={containerRef} className="relative w-full max-w-4xl mx-auto py-12">
      {/* Spotlight overlay with GSAP fade */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[5] pointer-events-none opacity-0"
        style={{
          background: 'rgba(0, 0, 0, 0.82)',
        }}
      />

      <div className="text-center mb-8 relative z-10">
        <h2 className="text-xl md:text-2xl font-serif text-warm mb-2">能力地图</h2>
        <p className="text-warm-faint text-sm font-sans">核心能力星系 · Core Capabilities</p>
      </div>

      <div
        className="relative mx-auto"
        style={{
          width: containerSize,
          height: containerSize,
        }}
      >
        {/* Floating particles background */}
        <FloatingParticles
          activeNodeIndex={activeNodeIndex}
          allExpanded={allExpanded}
          showAll={showAll}
          nodePositions={nodePositions}
        />

        {/* Constellation lines between main nodes */}
        <ConstellationLines
          positions={nodePositions}
          showAll={showAll}
          allExpanded={allExpanded}
          containerSize={containerSize}
        />

        {/* Hexagon mesh */}
        <HexagonMesh active={activeNodeIndex >= 0 && !showAll} containerSize={containerSize} />

        {/* Shooting stars */}
        <ShootingStars active={activeNodeIndex >= 0 && !showAll} />

        {/* Ripple wave from center when allExpanded */}
        <RippleWave active={allExpanded && !showAll} />

        {/* Energy beam to active node */}
        {activePos && activeColor && (
          <EnergyBeam
            active={activeNodeIndex >= 0 && !showAll}
            fromX={0}
            fromY={0}
            toX={activePos.x}
            toY={activePos.y}
            color={activeColor}
            containerSize={containerSize}
          />
        )}

        {/* Center node */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          style={{
            opacity: activeNodeIndex >= 0 && !showAll ? 1 : 1,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div className="center-node relative w-20 h-20 md:w-24 md:h-24">
            <CenterRings active={activeNodeIndex >= 0 && !showAll} />
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
              <div className="text-center relative">
                <CenterOrbitingParticles active={activeNodeIndex >= 0 && !showAll} />
                <StaticCenterIcon />
                <p className="text-[9px] text-warm font-mono mt-0.5">{capabilityData.center.title}</p>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="text-[9px] font-mono text-energy-light">{capabilityData.center.mbti}</span>
            </div>
          </div>
        </div>

        {/* Main nodes */}
        {capabilityData.mainNodes.map((node, index) => (
          <MainNodeItem
            key={node.id}
            node={node}
            index={index}
            isLoaded={isLoaded}
            activeNodeIndex={activeNodeIndex}
            allExpanded={allExpanded}
            showAll={showAll}
            nodeRefs={nodeRefs}
            setSelectedNode={setSelectedNode}
            isMobile={isMobile}
          />
        ))}
      </div>

      {selectedNode && (
        <CaseStudyModal node={selectedNode} onClose={() => setSelectedNode(null)} />
      )}
    </div>
  )
}

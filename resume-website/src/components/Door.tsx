import { useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import { useDoorState, type DoorPhase } from '@store/doorState'
import { prefersReducedMotion } from '@utils/reducedMotionCheck'

const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)'
const TOTAL_DURATION = 1.8

function CircuitPattern({ side }: { side: 'left' | 'right' }) {
  const seed = useMemo(() => {
    const lines = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      width: 0.3 + Math.random() * 0.8,
      opacity: 0.08 + Math.random() * 0.12,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4,
    }))
    const nodes = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: 0.3 + Math.random() * 0.7,
      opacity: 0.1 + Math.random() * 0.15,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 4,
    }))
    return { lines, nodes }
  }, [])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
      style={{ opacity: 0.6 }}
    >
      <defs>
        <linearGradient
          id={`circuit-fade-${side}`}
          x1={side === 'left' ? '0%' : '100%'}
          y1="0%"
          x2={side === 'left' ? '100%' : '0%'}
          y2="0%"
        >
          <stop offset="0%" stopColor="rgba(0,229,255,0.15)" />
          <stop offset="60%" stopColor="rgba(0,229,255,0.05)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {seed.lines.map((line) => (
        <line
          key={line.id}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={`rgba(0,229,255,${line.opacity})`}
          strokeWidth={line.width}
          style={{
            animation: `circuitPulse ${line.duration}s ease-in-out ${line.delay}s infinite alternate`,
          }}
        />
      ))}
      {seed.nodes.map((node) => (
        <circle
          key={node.id}
          cx={node.cx}
          cy={node.cy}
          r={node.r}
          fill={`rgba(0,229,255,${node.opacity})`}
          style={{
            animation: `circuitPulse ${node.duration}s ease-in-out ${node.delay}s infinite alternate`,
          }}
        />
      ))}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill={`url(#circuit-fade-${side})`}
      />
    </svg>
  )
}

function DataParticles({ side }: { side: 'left' | 'right' }) {
  const particles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: side === 'left' ? Math.random() * 60 + 20 : Math.random() * 60 + 20,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 5,
      direction: side === 'left' ? -1 : 1,
    }))
  }, [side])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: `${p.top}%`,
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: 'rgba(0,229,255,0.5)',
            boxShadow: '0 0 4px rgba(0,229,255,0.4)',
            animation: `dataFlow ${p.duration}s linear ${p.delay}s infinite`,
            ['--direction' as string]: p.direction,
          }}
        />
      ))}
    </div>
  )
}

export default function Door() {
  const phase = useDoorState((s) => s.phase)
  const progress = useDoorState((s) => s.progress)
  const containerRef = useRef<HTMLDivElement>(null)
  const leftDoorRef = useRef<HTMLDivElement>(null)
  const rightDoorRef = useRef<HTMLDivElement>(null)
  const leftInnerRef = useRef<HTMLDivElement>(null)
  const rightInnerRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const phaseRef = useRef<DoorPhase>(phase)

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    if (!leftDoorRef.current || !rightDoorRef.current) return

    const reduced = prefersReducedMotion()

    if (reduced) {
      if (leftDoorRef.current) {
        leftDoorRef.current.style.transform = 'rotateY(-105deg)'
        leftDoorRef.current.style.opacity = '0'
      }
      if (rightDoorRef.current) {
        rightDoorRef.current.style.transform = 'rotateY(105deg)'
        rightDoorRef.current.style.opacity = '0'
      }
      return
    }

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.pointerEvents = 'none'
        }
      },
    })

    tl.to(
      leftDoorRef.current,
      {
        rotateY: -105,
        opacity: 0.15,
        duration: TOTAL_DURATION,
        ease: 'power2.inOut',
      },
      0
    )
      .to(
        rightDoorRef.current,
        {
          rotateY: 105,
          opacity: 0.15,
          duration: TOTAL_DURATION,
          ease: 'power2.inOut',
        },
        0
      )
      .to(
        leftInnerRef.current,
        {
          opacity: 0,
          duration: TOTAL_DURATION * 0.6,
          ease: 'power2.in',
        },
        0
      )
      .to(
        rightInnerRef.current,
        {
          opacity: 0,
          duration: TOTAL_DURATION * 0.6,
          ease: 'power2.in',
        },
        0
      )

    tlRef.current = tl

    return () => {
      tl.kill()
      tlRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!tlRef.current) return
    if (phase === 'OPENING' || phase === 'OPEN' || phase === 'NORMAL_SCROLL') {
      const targetProgress = phase === 'OPENING' ? progress : 1
      tlRef.current.progress(targetProgress)
    }
  }, [progress, phase])

  useEffect(() => {
    if (phase === 'OPEN' || phase === 'NORMAL_SCROLL') {
      if (containerRef.current) {
        containerRef.current.style.pointerEvents = 'none'
      }
    }
  }, [phase])

  const isVisible = phase !== 'NORMAL_SCROLL'

  if (!isVisible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100]"
      style={{ perspective: '1200px' }}
      aria-hidden="true"
    >
      <div
        ref={leftDoorRef}
        className="absolute top-0 left-0 w-1/2 h-full origin-left will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          transition: `transform ${TOTAL_DURATION}s ${EASE}, opacity ${TOTAL_DURATION}s ${EASE}`,
        }}
      >
        <div
          ref={leftInnerRef}
          className="relative w-full h-full overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(20,25,40,0.95) 0%, rgba(10,15,30,0.98) 50%, rgba(15,20,35,0.95) 100%)',
            borderRight: '1px solid rgba(0,229,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,229,255,0.03) 0%, transparent 30%, transparent 70%, rgba(0,229,255,0.03) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,229,255,0.04) 48px, rgba(0,229,255,0.04) 49px)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.2) 100%)',
            }}
          />
          <CircuitPattern side="left" />
          <DataParticles side="left" />
          <div
            className="absolute top-1/2 right-0 w-[2px] h-32 -translate-y-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 12px rgba(0,229,255,0.3)',
            }}
          />
        </div>
      </div>

      <div
        ref={rightDoorRef}
        className="absolute top-0 right-0 w-1/2 h-full origin-right will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          transition: `transform ${TOTAL_DURATION}s ${EASE}, opacity ${TOTAL_DURATION}s ${EASE}`,
        }}
      >
        <div
          ref={rightInnerRef}
          className="relative w-full h-full overflow-hidden"
          style={{
            background:
              'linear-gradient(225deg, rgba(20,25,40,0.95) 0%, rgba(10,15,30,0.98) 50%, rgba(15,20,35,0.95) 100%)',
            borderLeft: '1px solid rgba(0,229,255,0.15)',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0,229,255,0.03) 0%, transparent 30%, transparent 70%, rgba(0,229,255,0.03) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(90deg, transparent, transparent 48px, rgba(0,229,255,0.04) 48px, rgba(0,229,255,0.04) 49px)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)',
            }}
          />
          <CircuitPattern side="right" />
          <DataParticles side="right" />
          <div
            className="absolute top-1/2 left-0 w-[2px] h-32 -translate-y-1/2"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 12px rgba(0,229,255,0.3)',
            }}
          />
        </div>
      </div>

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          opacity: phase === 'LOCKED' ? 1 : Math.max(0, 1 - progress * 3),
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1"
            style={{ borderColor: 'rgba(0,229,255,0.4)' }}
          >
            <div
              className="w-1 h-2 rounded-full"
              style={{
                backgroundColor: 'rgba(0,229,255,0.6)',
                animation: 'scrollHint 1.6s ease-in-out infinite',
              }}
            />
          </div>
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(0,229,255,0.5)' }}
          >
            滚动开启
          </span>
        </div>
      </div>

      <style>{`
        @keyframes circuitPulse {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        @keyframes dataFlow {
          0% {
            transform: translateX(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(var(--direction) * 40px)) scale(0.5);
            opacity: 0;
          }
        }
        @keyframes scrollHint {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(12px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Flame,
  Wind,
  Gauge,
  Cpu,
  Wrench,
  Zap,
  BarChart3,
  Clock,
  Layers,
  Settings,
  Database,
  Microscope,
  CheckCircle2,
  ArrowRight,
  MonitorPlay,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Film,
  Cog,
  Factory,
  HardHat,
  GitBranch,
  PenTool,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const energyNode = capabilityData.mainNodes.find((n) => n.id === 'energy')!

/* ────────────────────────────────────────────────
   Data
   ──────────────────────────────────────────────── */

const platforms = [
  {
    name: '仿真精度',
    followers: '<5%',
    growth: 95,
    content: 'ANSYS Fluent 多物理场耦合',
    representative: '换热器流动传热仿真',
    icon: <Wind size={24} />,
    color: '#C04A1A',
    angle: 0,
  },
  {
    name: '项目数',
    followers: '10+',
    growth: 88,
    content: '从换热器到嵌入式系统',
    representative: '5个完整项目周期',
    icon: <Factory size={24} />,
    color: '#E8703A',
    angle: 120,
  },
  {
    name: '代码行数',
    followers: '8000+',
    growth: 82,
    content: 'STM32/51单片机嵌入式',
    representative: '工业级系统稳定性',
    icon: <Cpu size={24} />,
    color: '#F97316',
    angle: 240,
  },
]

const projects: {
  title: string
  desc: string
  tags: string[]
  workflow?: string[]
  impact?: string[]
  sideStats?: { label: string; value: string }[]
  pullQuote?: string
  highlights?: string[]
  architecture?: { layer: string; tech: string; icon: React.ReactNode }[]
}[] = [
  {
    title: '卧式壳管式换热器建模与仿真',
    desc: '完成卧式壳管式换热器零部件三维建模与装配设计，进行流动、传热等多物理场耦合仿真分析。',
    tags: ['SolidWorks', 'ANSYS Fluent', '热力学', 'CFD'],
    workflow: [
      '需求分析',
      '三维建模(SolidWorks)',
      '网格划分',
      'CFD仿真(ANSYS)',
      '结果分析',
      '报告撰写',
    ],
    impact: [
      '完成换热器完整建模',
      '多物理场耦合仿真',
      '验证误差<5%',
      '仿真周期48h',
    ],
    sideStats: [
      { label: '建模精度', value: '0.1mm' },
      { label: '仿真周期', value: '48h' },
      { label: '验证误差', value: '<5%' },
      { label: '软件数量', value: '4+' },
    ],
    pullQuote:
      '从三维建模到多物理场仿真，完整掌握能源设备设计全流程',
  },
  {
    title: '写字机系统集成',
    desc: '从0到1独立完成写字机项目全流程实施，基于Arduino Uno/STM32控制板，使用GRBL固件进行烧录与参数校准，累计自动化书写500+页A4文档，节省手写时间200+小时。',
    tags: ['Arduino', 'STM32', 'GRBL', '嵌入式', 'C/C++'],
    highlights: [
      '从0到1完整项目落地',
      '对比分析3种主流架构',
      '解决电机丢步等技术问题5+项',
      '优化20+项关键参数',
      '累计书写500+页A4文档',
      '节省手写时间200+小时',
      '书写速度800-1200mm/min',
      '一致性误差<0.5mm',
    ],
    architecture: [
      { layer: '控制层', tech: 'Arduino Uno / STM32', icon: <Cpu size={14} /> },
      { layer: '驱动层', tech: 'A4988 / TMC2208', icon: <Zap size={14} /> },
      { layer: '固件层', tech: 'GRBL / CNCjs', icon: <Settings size={14} /> },
      { layer: '软件层', tech: 'Inkscape / Processing', icon: <MonitorPlay size={14} /> },
      { layer: '执行层', tech: '步进电机+舵机笔架', icon: <Wrench size={14} /> },
    ],
  },
]

const tools = [
  { name: 'ANSYS Fluent', icon: <Wind size={18} />, category: 'CFD仿真', desc: '流动传热燃烧仿真' },
  { name: 'SolidWorks', icon: <Layers size={18} />, category: '三维建模', desc: '零部件设计与装配' },
  { name: 'AutoCAD', icon: <Settings size={18} />, category: '工程制图', desc: '二维工程图纸绘制' },
  { name: 'UG NX', icon: <Wrench size={18} />, category: '设计与加工', desc: '高级曲面与数控' },
  { name: 'Proteus', icon: <Cpu size={18} />, category: '电路仿真', desc: '嵌入式电路验证' },
  { name: 'NI DAQ', icon: <Database size={18} />, category: '数据采集', desc: '传感器信号采集' },
  { name: 'MATLAB', icon: <BarChart3 size={18} />, category: '数学建模', desc: '算法与数值计算' },
  { name: 'Keil', icon: <Microscope size={18} />, category: '嵌入式开发', desc: '单片机程序烧录' },
]

const pipelineSteps = [
  { title: '需求分析', desc: '项目立项与架构选型', icon: <GitBranch size={16} /> },
  { title: '三维建模', desc: 'SolidWorks / UG NX', icon: <Layers size={16} /> },
  { title: '仿真分析', desc: 'ANSYS Fluent / CFD', icon: <Wind size={16} /> },
  { title: '嵌入式开发', desc: 'Arduino / STM32 / GRBL', icon: <Cpu size={16} /> },
  { title: '系统集成', desc: '硬件组装与参数优化', icon: <Cog size={16} /> },
]

const caseStudyTimeline = [
  { time: 'Day 1', event: '项目立项与架构选型', views: '3种方案对比' },
  { time: 'Day 3', event: '硬件组装与接线', views: '完成核心部件配置' },
  { time: 'Day 7', event: 'GRBL固件烧录', views: '解决丢步问题' },
  { time: 'Day 14', event: '参数优化与测试', views: '20+项参数调优' },
  { time: 'Day 30', event: '规模化应用', views: '500+页文档' },
]

const heatmapData = [
  { source: 'SolidWorks建模', value: 30, color: '#C04A1A' },
  { source: 'ANSYS仿真', value: 25, color: '#E8703A' },
  { source: '嵌入式开发', value: 20, color: '#F97316' },
  { source: '参数优化', value: 15, color: '#FB923C' },
  { source: '系统集成', value: 10, color: '#FDBA74' },
]

const timelineData = [
  {
    period: '2024.09 - 2024.12',
    title: '卧式壳管式换热器建模与仿真',
    desc: '完成零部件三维建模与装配设计，进行流动、传热等多物理场耦合仿真分析',
    tags: ['SolidWorks', 'ANSYS Fluent', '热力学'],
  },
  {
    period: '2025.06',
    title: '风电场运维实习',
    desc: '在山西粤电盂县粤鑫风电场进行设备巡检，使用红外测温仪排查隐患，SCADA系统监控',
    tags: ['电力运维', 'SCADA', '风机诊断'],
  },
  {
    period: '2025.02 - 2025.03',
    title: '写字机系统集成',
    desc: '从0到1独立完成写字机项目全流程实施，基于Arduino Uno/STM32控制板，累计自动化书写500+页A4文档',
    tags: ['Arduino', 'STM32', 'GRBL', '嵌入式'],
  },
  {
    period: '2025.06 - 2025.07',
    title: '基于51单片机的多功能智能控制系统',
    desc: '完成LED动态显示、矩阵键盘、UART通信、温度采集报警、PWM电机调速等功能，整合10+种外设模块',
    tags: ['51单片机', 'Keil', '嵌入式'],
  },
  {
    period: '2025.07 - 2025.09',
    title: '基于STM32的嵌入式系统综合开发',
    desc: '系统整合20+种外设模块与通信协议，累计编写代码8000+行，实现工业级系统稳定性',
    tags: ['STM32', 'HAL库', '嵌入式'],
  },
]

/* ────────────────────────────────────────────────
   Hero: Particle Network + Animated Title + Gear
   ──────────────────────────────────────────────── */

function ParticleNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      pulse: number
    }

    const nodes: Node[] = []
    const NODE_COUNT = 80
    const CONNECTION_DIST = 150

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.3 + Math.random() * 0.5,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      const t = Date.now() * 0.001

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.pulse += 0.02

        const pulseAlpha = n.alpha * (0.7 + 0.3 * Math.sin(n.pulse))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 74, 26, ${pulseAlpha})`
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(192, 74, 26, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      for (let i = 0; i < 3; i++) {
        const cx = w * 0.75
        const cy = h * 0.5
        const radius = 80 + i * 50
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(192, 74, 26, ${0.03 + i * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()

        const angle = t * (0.3 + i * 0.15) + i * 2
        const ox = cx + Math.cos(angle) * radius
        const oy = cy + Math.sin(angle) * radius
        ctx.beginPath()
        ctx.arc(ox, oy, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(192, 74, 26, ${0.4 - i * 0.1})`
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

function AnimatedTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    const chars = containerRef.current.querySelectorAll('.char')
    if (!chars || chars.length === 0) return
    gsap.fromTo(
      chars,
      { opacity: 0, y: 40, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    )
  }, [])

  return (
    <div ref={containerRef} className="flex flex-wrap justify-start" style={{ perspective: '600px' }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char inline-block text-5xl md:text-7xl lg:text-8xl font-serif text-warm tracking-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

function RotatingGear() {
  const gearRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!gearRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(gearRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div ref={gearRef} className="relative w-64 h-64 md:w-80 md:h-80">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C04A1A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E8703A" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Outer gear */}
        <g fill="none" stroke="url(#gearGrad)" strokeWidth="1.5">
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 22.5 * Math.PI) / 180
            const x1 = 100 + Math.cos(angle) * 70
            const y1 = 100 + Math.sin(angle) * 70
            const x2 = 100 + Math.cos(angle) * 85
            const y2 = 100 + Math.sin(angle) * 85
            const x3 = 100 + Math.cos(angle + 0.15) * 85
            const y3 = 100 + Math.sin(angle + 0.15) * 85
            const x4 = 100 + Math.cos(angle + 0.15) * 70
            const y4 = 100 + Math.sin(angle + 0.15) * 70
            return (
              <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill="url(#gearGrad)" fillOpacity="0.3" />
            )
          })}
          <circle cx="100" cy="100" r="65" strokeOpacity="0.4" />
          <circle cx="100" cy="100" r="55" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="20" strokeOpacity="0.5" fill="url(#gearGrad)" fillOpacity="0.15" />
          {/* Inner turbine blades */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * 45 * Math.PI) / 180
            const x1 = 100 + Math.cos(angle) * 20
            const y1 = 100 + Math.sin(angle) * 20
            const x2 = 100 + Math.cos(angle + 0.3) * 50
            const y2 = 100 + Math.sin(angle + 0.3) * 50
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity="0.4" />
          })}
        </g>
      </svg>
      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(192,74,26,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-warm-faint text-xs font-mono tracking-widest uppercase">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-warm-ghost/30 flex items-start justify-center p-1.5">
        <div className="w-1 h-2 rounded-full bg-energy-light animate-bounce" />
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Platform Stats: Orbital Dashboard
   ──────────────────────────────────────────────── */

function RadialProgress({ percentage, color, size = 80 }: { percentage: number; color: string; size?: number }) {
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={4} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1.5s ease-out' }}
      />
    </svg>
  )
}

function OrbitalDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !orbitRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
      })

      const cards = orbitRef.current?.querySelectorAll('.orbit-card')
      if (!cards || cards.length === 0) return
      cards.forEach((card) => {
        gsap.to(card, {
          rotation: -360,
          duration: 60,
          repeat: -1,
          ease: 'none',
        })
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => gsap.globalTimeline.play(),
        onLeave: () => gsap.globalTimeline.pause(),
        onEnterBack: () => gsap.globalTimeline.play(),
        onLeaveBack: () => gsap.globalTimeline.pause(),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="relative py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <BarChart3 size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">平台数据仪表盘</h2>
      </div>

      {/* Mobile: simple grid */}
      <div className="md:hidden px-4 space-y-4">
        {platforms.map((plat, idx) => (
          <div key={idx} className="industrial-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span style={{ color: plat.color }}>{plat.icon}</span>
              <h3 className="text-lg font-serif text-warm">{plat.name}</h3>
            </div>
            <p className="text-energy-light text-2xl font-mono font-bold">{plat.followers}</p>
            <p className="text-warm-faint text-xs mb-2">核心指标</p>
            <p className="text-warm-muted text-sm">{plat.content}</p>
          </div>
        ))}
      </div>

      {/* Desktop: Orbital */}
      <div className="hidden md:flex items-center justify-center relative" style={{ height: '500px' }}>
        <div
          className="absolute z-10 flex flex-col items-center justify-center w-40 h-40 rounded-full bg-surface border border-border"
          style={{ boxShadow: '0 0 60px rgba(192,74,26,0.1)' }}
        >
          <p className="text-energy-light text-2xl font-mono font-bold">能动技术</p>
          <p className="text-warm-faint text-xs mt-1">核心能力</p>
        </div>

        <div
          className="absolute rounded-full border border-energy/10"
          style={{ width: '400px', height: '400px' }}
        />

        <div
          ref={orbitRef}
          className="absolute"
          style={{ width: '400px', height: '400px' }}
        >
          {platforms.map((plat, idx) => {
            const angle = (idx * 120 * Math.PI) / 180
            const x = Math.cos(angle) * 200
            const y = Math.sin(angle) * 200

            return (
              <div
                key={idx}
                className="orbit-card absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="industrial-card p-5 w-52 hover:border-energy/20 transition-all"
                  style={{
                    transform: `perspective(600px) rotateY(${idx * 15}deg)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ color: plat.color }}>{plat.icon}</span>
                    <div className="relative">
                      <RadialProgress percentage={plat.growth} color={plat.color} size={50} />
                      <span
                        className="absolute inset-0 flex items-center justify-center text-xs font-mono"
                        style={{ color: plat.color }}
                      >
                        {plat.growth}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-warm mb-1">{plat.name}</h3>
                  <p className="text-energy-light text-xl font-mono font-bold">{plat.followers}</p>
                  <p className="text-warm-faint text-xs mt-2">{plat.content}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Skills Matrix: Hexagonal Honeycomb
   ──────────────────────────────────────────────── */

function HexagonSkill({
  skill,
  index,
}: {
  skill: { id: string; label: string; level?: number }
  index: number
}) {
  const hexRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!hexRef.current) return
    gsap.fromTo(
      hexRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: index * 0.08,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: hexRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, [index])

  const level = skill.level || 0

  return (
    <div
      ref={hexRef}
      className="relative cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '140px',
        height: '160px',
        margin: '-20px 4px',
      }}
    >
      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          background: hovered
            ? 'linear-gradient(135deg, rgba(192,74,26,0.25), rgba(192,74,26,0.1))'
            : 'rgba(28, 33, 40, 0.9)',
          border: hovered ? '1px solid rgba(192,74,26,0.5)' : '1px solid rgba(240,230,216,0.08)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          zIndex: hovered ? 10 : 1,
        }}
      >
        <span className="text-warm text-xs font-medium text-center px-4 leading-tight">{skill.label}</span>
        {hovered && (
          <div className="mt-2 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-energy-light' : 'bg-warm-ghost/20'}`}
              />
            ))}
          </div>
        )}
        {hovered && (
          <span className="text-energy-light text-[10px] font-mono mt-1">Lv.{level}</span>
        )}
      </div>
    </div>
  )
}

function SkillsHoneycomb() {
  const skills = energyNode.subNodes
  const rows: typeof skills[] = []
  let idx = 0
  const rowLengths = [3, 4, 3]
  for (const len of rowLengths) {
    rows.push(skills.slice(idx, idx + len))
    idx += len
  }

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Gauge size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">技能矩阵</h2>
      </div>

      {/* Mobile: simple list */}
      <div className="md:hidden px-4 space-y-3">
        {skills.map((skill) => (
          <div key={skill.id} className="industrial-card p-4 flex items-center justify-between">
            <span className="text-warm text-sm">{skill.label}</span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${i < (skill.level || 0) ? 'bg-energy-light' : 'bg-warm-ghost/20'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Honeycomb */}
      <div className="hidden md:flex flex-col items-center">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="flex justify-center">
            {row.map((skill, skillIdx) => (
              <HexagonSkill
                key={skill.id}
                skill={skill}
                index={rowIdx * 4 + skillIdx}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Projects: Magazine Spread Layout
   ──────────────────────────────────────────────── */

function MagazineSpread({
  expanded,
  onToggle,
}: {
  expanded: boolean
  onToggle: () => void
}) {
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [hoveredNote, setHoveredNote] = useState<number | null>(null)

  useEffect(() => {
    if (!leftRef.current || !rightRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      )
      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const proj1 = projects[0]
  const proj2 = projects[1]

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <HardHat size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">项目展示</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 space-y-4">
        {[proj1, proj2].map((proj, idx) => (
          <div key={idx} className="industrial-card p-5">
            <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
            <p className="text-warm-muted text-sm mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {proj.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Magazine Spread */}
      <div className="hidden md:block max-w-6xl mx-auto px-6">
        <div className="flex relative" style={{ minHeight: '600px' }}>
          {/* Center fold shadow */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(90deg, rgba(0,0,0,0.3), transparent, rgba(0,0,0,0.3))',
            }}
          />

          {/* Left page */}
          <div
            ref={leftRef}
            className="flex-1 industrial-card rounded-r-none border-r-0 p-8 relative overflow-hidden"
            onMouseEnter={() => setHoveredNote(0)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            <div className="text-warm-faint text-xs font-mono uppercase tracking-widest mb-4">
              Featured Project
            </div>
            <h3 className="text-2xl font-serif text-warm mb-4">{proj1.title}</h3>

            {/* Featured image area */}
            <div
              className="w-full h-48 rounded-lg mb-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a0f0a 0%, #2d1810 50%, #1f1208 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Wind size={48} className="text-energy/30" />
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-energy-light text-xs font-mono">
                CFD SIMULATION
              </div>
            </div>

            <p className="text-warm-muted text-sm leading-relaxed mb-6">{proj1.desc}</p>

            {/* Pull quote */}
            {proj1.pullQuote && (
              <blockquote className="border-l-2 border-energy/40 pl-4 my-6">
                <p className="text-warm/80 text-sm italic font-serif">{proj1.pullQuote}</p>
              </blockquote>
            )}

            {/* Sidebar stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {proj1.sideStats?.map((stat, i) => (
                <div key={i} className="p-3 rounded-lg bg-base-elevated border border-border">
                  <p className="text-energy-light text-sm font-mono font-bold">{stat.value}</p>
                  <p className="text-warm-faint text-[10px] uppercase">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Sticky note */}
            <div
              className="absolute top-8 right-8 w-32 p-3 rounded shadow-lg transform rotate-3 transition-all duration-300"
              style={{
                background: '#fef3c7',
                opacity: hoveredNote === 0 ? 1 : 0,
                transform:
                  hoveredNote === 0
                    ? 'rotate(3deg) translateY(0)'
                    : 'rotate(3deg) translateY(-10px)',
              }}
            >
              <p className="text-amber-900 text-xs font-sans">误差&lt;5% 里程碑！</p>
            </div>
          </div>

          {/* Right page */}
          <div
            ref={rightRef}
            className="flex-1 industrial-card rounded-l-none border-l-0 p-8 relative"
            onMouseEnter={() => setHoveredNote(1)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            <div className="text-warm-faint text-xs font-mono uppercase tracking-widest mb-4">
              Technical Project
            </div>
            <h3 className="text-2xl font-serif text-warm mb-4">{proj2.title}</h3>

            {/* Code snippet style */}
            <div className="rounded-lg bg-base-elevated border border-border p-4 mb-6 font-mono text-xs overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-warm-faint ml-2">grbl_config.h</span>
              </div>
              <div className="text-warm-muted space-y-1">
                <p>
                  <span className="text-energy-light">#define</span>{' '}
                  <span className="text-cyan-400">DEFAULT_X_STEPS</span> 80.0
                </p>
                <p>
                  <span className="text-energy-light">#define</span>{' '}
                  <span className="text-cyan-400">DEFAULT_Y_STEPS</span> 80.0
                </p>
                <p>
                  <span className="text-energy-light">#define</span>{' '}
                  <span className="text-cyan-400">DEFAULT_FEED_RATE</span> 1000
                </p>
                <p>
                  <span className="text-energy-light">#define</span>{' '}
                  <span className="text-cyan-400">DEFAULT_ACCEL</span> 50
                </p>
              </div>
            </div>

            {/* Architecture diagram */}
            <div className="mb-6">
              <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-3">
                Architecture
              </p>
              <div className="space-y-2">
                {proj2.architecture?.map((layer, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-base-elevated border border-border"
                  >
                    <span className="text-energy-light">{layer.icon}</span>
                    <div>
                      <p className="text-warm text-xs font-medium">{layer.layer}</p>
                      <p className="text-warm-faint text-[10px]">{layer.tech}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {proj2.highlights?.slice(0, 5).map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-energy-light mt-0.5 shrink-0" />
                  <span className="text-warm-muted text-xs">{h}</span>
                </div>
              ))}
            </div>

            {/* Sticky note */}
            <div
              className="absolute top-8 right-8 w-36 p-3 rounded shadow-lg transform -rotate-2 transition-all duration-300"
              style={{
                background: '#dbeafe',
                opacity: hoveredNote === 1 ? 1 : 0,
                transform:
                  hoveredNote === 1
                    ? 'rotate(-2deg) translateY(0)'
                    : 'rotate(-2deg) translateY(-10px)',
              }}
            >
              <p className="text-blue-900 text-xs font-sans">500+页自动化书写 ✅</p>
            </div>
          </div>
        </div>

        {/* Expand button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface border border-border hover:border-energy/30 transition-all text-energy-light text-sm"
          >
            {expanded ? (
              <>
                收起详情 <ChevronUp size={16} />
              </>
            ) : (
              <>
                展开详情 <ChevronDown size={16} />
              </>
            )}
          </button>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="industrial-card p-6">
              <p className="text-warm-faint text-xs font-mono uppercase mb-3">Workflow</p>
              <div className="flex flex-wrap items-center gap-1">
                {proj1.workflow?.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-warm-muted text-xs">{step}</span>
                    {i < (proj1.workflow?.length ?? 0) - 1 && (
                      <ArrowRight size={10} className="text-warm-faint" />
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {proj1.impact?.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TrendingUp size={14} className="text-energy-light mt-0.5 shrink-0" />
                    <span className="text-warm-muted text-xs">{imp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="industrial-card p-6">
              <p className="text-warm-faint text-xs font-mono uppercase mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {proj2.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {proj2.highlights?.slice(5).map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-energy-light mt-0.5 shrink-0" />
                    <span className="text-warm-muted text-xs">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Tool Stack: Animated Floating Toolbox
   ──────────────────────────────────────────────── */

function FloatingToolbox() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    }
    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)
    return () => container?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    if (!containerRef.current || docked) return
    const icons = containerRef.current.querySelectorAll('.tool-icon')
    if (!icons || icons.length === 0) return
    icons.forEach((icon, i) => {
      const el = icon as HTMLElement
      const baseX = Math.sin(i * 1.5) * 30
      const baseY = Math.cos(i * 1.2) * 20
      gsap.to(el, {
        x: baseX,
        y: baseY,
        duration: 3 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [docked])

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Wrench size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">工具栈</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 grid grid-cols-2 gap-3">
        {tools.map((tool, idx) => (
          <div key={idx} className="industrial-card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-energy-dim flex items-center justify-center text-energy-light">
              {tool.icon}
            </div>
            <p className="text-warm text-sm">{tool.name}</p>
            <p className="text-warm-faint text-xs">{tool.category}</p>
          </div>
        ))}
      </div>

      {/* Desktop */}
      <div
        ref={containerRef}
        className="hidden md:block relative mx-auto"
        style={{ width: '600px', height: '400px' }}
        onMouseEnter={() => setDocked(true)}
        onMouseLeave={() => setDocked(false)}
      >
        {tools.map((tool, idx) => {
          const col = idx % 4
          const row = Math.floor(idx / 4)
          const dockX = 60 + col * 140
          const dockY = 80 + row * 140
          const randomX = 100 + Math.random() * 400
          const randomY = 50 + Math.random() * 300

          const dx = mousePos.x - (docked ? dockX : randomX)
          const dy = mousePos.y - (docked ? dockY : randomY)
          const dist = Math.sqrt(dx * dx + dy * dy)
          const magneticStrength = Math.max(0, 1 - dist / 200) * 15
          const magX = (dx / dist) * magneticStrength || 0
          const magY = (dy / dist) * magneticStrength || 0

          return (
            <div
              key={idx}
              className="tool-icon absolute transition-all duration-700 ease-out group"
              style={{
                left: docked ? `${dockX}px` : `${randomX}px`,
                top: docked ? `${dockY}px` : `${randomY}px`,
                transform: `translate(-50%, -50%) translate(${docked ? magX : 0}px, ${docked ? magY : 0}px)`,
              }}
            >
              <div
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 ${
                  docked
                    ? 'bg-surface border-border hover:border-energy/30'
                    : 'bg-surface/60 border-border/30'
                }`}
                style={{
                  boxShadow: docked ? '0 4px 16px rgba(0,0,0,0.3)' : 'none',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-energy-dim flex items-center justify-center text-energy-light group-hover:scale-110 transition-transform">
                  {tool.icon}
                </div>
                <span className="text-warm text-xs font-medium whitespace-nowrap">{tool.name}</span>
                <span className="text-warm-faint text-[10px]">{tool.category}</span>
              </div>

              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-base-elevated border border-border text-warm-muted text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {tool.desc}
              </div>
            </div>
          )
        })}

        {/* Hint */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-warm-faint text-xs font-mono">
          {docked ? '图标已停靠' : '悬停以停靠工具'}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Content Pipeline: Vertical Cinema Reel
   ──────────────────────────────────────────────── */

function CinemaReel() {
  const reelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!reelRef.current) return
    const ctx = gsap.context(() => {
      const frames = reelRef.current!.querySelectorAll('.reel-frame')
      if (!frames || frames.length === 0) return
      frames.forEach((frame, i) => {
        gsap.fromTo(
          frame,
          { x: i % 2 === 0 ? -40 : 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, reelRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Film size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">内容流水线</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 space-y-3">
        {pipelineSteps.map((step, idx) => (
          <div key={idx} className="industrial-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-energy-dim flex items-center justify-center text-energy-light shrink-0">
              {step.icon}
            </div>
            <div>
              <p className="text-warm text-sm font-medium">{step.title}</p>
              <p className="text-warm-faint text-xs">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Cinema Reel */}
      <div className="hidden md:flex justify-center">
        <div className="relative flex" style={{ width: '500px' }}>
          {/* Left perforations */}
          <div className="w-8 bg-base-elevated border-y border-l border-border rounded-l-lg flex flex-col justify-around py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-3 h-4 bg-base rounded-sm mx-auto" />
            ))}
          </div>

          {/* Film strip */}
          <div
            ref={reelRef}
            className="flex-1 bg-base-elevated border-y border-border py-8 px-6 space-y-6 relative overflow-hidden"
          >
            {/* Projector light effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(192,74,26,0.05) 0%, transparent 30%, transparent 70%, rgba(192,74,26,0.05) 100%)',
              }}
            />

            {pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="reel-frame relative p-5 rounded-lg bg-surface border border-border hover:border-energy/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-energy-dim flex items-center justify-center text-energy-light shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-energy-light text-xs font-mono">
                        STEP {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <p className="text-warm font-medium">{step.title}</p>
                    <p className="text-warm-muted text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right perforations */}
          <div className="w-8 bg-base-elevated border-y border-r border-border rounded-r-lg flex flex-col justify-around py-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="w-3 h-4 bg-base rounded-sm mx-auto" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Case Study: Interactive Data Story
   ──────────────────────────────────────────────── */

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()
          const animate = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

function HeatmapBar({ data }: { data: typeof heatmapData }) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="space-y-3">
      {data.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-warm-muted text-xs w-24 text-right shrink-0">{item.source}</span>
          <div className="flex-1 h-6 bg-base-elevated rounded overflow-hidden relative">
            <div
              className="h-full rounded transition-all duration-1000 ease-out"
              style={{
                width: `${(item.value / max) * 100}%`,
                background: `linear-gradient(90deg, ${item.color}40, ${item.color})`,
              }}
            />
          </div>
          <span className="text-warm text-xs font-mono w-10">{item.value}%</span>
        </div>
      ))}
    </div>
  )
}

function CaseStudyStory() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.timeline-item')
      if (!items || items.length === 0) return
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <PenTool size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">案例研究</h2>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="industrial-card p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-serif text-warm mb-2">写字机系统集成</h3>
          <p className="text-warm-muted text-sm leading-relaxed mb-8">
            从0到1独立完成写字机项目全流程实施，基于Arduino Uno/STM32控制板，使用GRBL固件进行烧录与参数校准，
            累计自动化书写500+页A4文档，节省手写时间200+小时。
          </p>

          {/* Metrics with animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
              <p className="text-energy-light text-2xl md:text-3xl font-mono font-bold">
                <AnimatedCounter target={800} suffix="-1200" />
              </p>
              <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">mm/min 书写速度</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
              <p className="text-energy-light text-2xl md:text-3xl font-mono font-bold">
                <AnimatedCounter target={500} suffix="+" />
              </p>
              <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">页 A4文档</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
              <p className="text-energy-light text-2xl md:text-3xl font-mono font-bold">
                <AnimatedCounter target={200} suffix="+" />
              </p>
              <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">小时 节省时间</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
              <p className="text-energy-light text-2xl md:text-3xl font-mono font-bold">&lt;0.5</p>
              <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">mm 一致性误差</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Heatmap */}
            <div>
              <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-4">
                工作量分布
              </p>
              <HeatmapBar data={heatmapData} />
            </div>

            {/* Timeline */}
            <div>
              <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-4">
                开发时间线
              </p>
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-energy/50 to-transparent" />
                {caseStudyTimeline.map((item, i) => (
                  <div key={i} className="timeline-item relative mb-5 last:mb-0">
                    <div className="absolute left-[-18px] top-1 w-2 h-2 rounded-full bg-energy-light" />
                    <p className="text-energy-light text-xs font-mono">{item.time}</p>
                    <p className="text-warm text-sm">{item.event}</p>
                    <p className="text-warm-muted text-xs">{item.views}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Timeline Section
   ──────────────────────────────────────────────── */

function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll('.timeline-card')
      if (!items || items.length === 0) return
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Clock size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">项目时间轴</h2>
      </div>

      <div ref={sectionRef} className="relative max-w-4xl mx-auto px-4 md:px-6">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-energy/40 via-energy/20 to-transparent" />
        <div className="space-y-10">
          {timelineData.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="hidden md:block md:w-1/2" />
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-energy shadow-[0_0_12px_rgba(192,74,26,0.5)] z-10" />
              <div className="md:w-1/2 ml-10 md:ml-0">
                <div className="industrial-card industrial-card-energy p-5 timeline-card">
                  <span className="text-energy-light text-xs font-mono mb-2 block">
                    {item.period}
                  </span>
                  <h3 className="text-base font-serif text-warm mb-2">{item.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-3 font-sans">
                    {item.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ────────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────────── */

export default function EnergyPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.energy-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2 }
      )
      gsap.fromTo(
        '.energy-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={contentRef} className="relative">
      {/* Hero - Cinematic Split Screen */}
      <div className="relative min-h-screen flex items-center overflow-hidden">
        <ParticleNetworkBg />
        <div
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(192,74,26,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Animated Title */}
          <div className="text-left">
            <div className="energy-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-energy-dim border border-energy/20 mb-6">
              <Flame size={14} className="text-energy-light" />
              <span className="text-energy-light text-xs font-mono tracking-[0.15em] uppercase">
                能源与动力工程
              </span>
            </div>
            <AnimatedTitle text="能动技术" />
            <p className="energy-hero-sub text-warm-muted text-base md:text-lg max-w-lg leading-relaxed font-sans mt-6">
              掌握能源动力领域核心仿真工具链与工程实践能力，包括热力系统建模、CFD仿真、三维设计、
              嵌入式开发与工程管理，具有完成完整实验与热力设备检修的能力。
            </p>
            <div className="energy-hero-sub mt-8 flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-energy/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
              >
                <ArrowLeft size={14} />
                返回首页
              </Link>
            </div>
          </div>

          {/* Right: Rotating Gear */}
          <div className="hidden md:flex items-center justify-center">
            <RotatingGear />
          </div>
        </div>

        <ScrollIndicator />
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <OrbitalDashboard />
          <SkillsHoneycomb />
          <MagazineSpread expanded={expanded} onToggle={toggleExpanded} />
          <FloatingToolbox />
          <CinemaReel />
          <CaseStudyStory />
          <TimelineSection />
        </div>
      </div>
    </div>
  )
}

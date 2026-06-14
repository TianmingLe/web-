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
    if (chars.length === 0) return
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
  // Generate 16 gear teeth as precise paths
  const teeth = 16
  const cx = 100
  const cy = 100
  const outerR = 85
  const innerR = 70
  const toothWidthAngle = (Math.PI * 2) / teeth
  const toothTipAngle = toothWidthAngle * 0.35

  let gearPath = ''
  for (let i = 0; i < teeth; i++) {
    const baseAngle = i * toothWidthAngle - Math.PI / 2
    const a1 = baseAngle
    const a2 = baseAngle + toothTipAngle
    const a3 = baseAngle + toothWidthAngle - toothTipAngle
    const a4 = baseAngle + toothWidthAngle

    const x1 = cx + Math.cos(a1) * innerR
    const y1 = cy + Math.sin(a1) * innerR
    const x2 = cx + Math.cos(a2) * outerR
    const y2 = cy + Math.sin(a2) * outerR
    const x3 = cx + Math.cos(a3) * outerR
    const y3 = cy + Math.sin(a3) * outerR
    const x4 = cx + Math.cos(a4) * innerR
    const y4 = cy + Math.sin(a4) * innerR

    if (i === 0) {
      gearPath += `M ${x1} ${y1}`
    } else {
      gearPath += ` L ${x1} ${y1}`
    }
    gearPath += ` L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4}`
  }
  gearPath += ' Z'

  // Generate 8 curved turbine blades
  const blades = 8
  const bladeInnerR = 18
  const bladeOuterR = 55

  const bladePaths = Array.from({ length: blades }).map((_, i) => {
    const angle = (i * 360) / blades
    const sweep = 28 // degrees of arc sweep

    const r1 = bladeInnerR
    const r2 = bladeOuterR

    const startA = angle - sweep / 2
    const endA = angle + sweep / 2

    const startRad = (startA * Math.PI) / 180
    const endRad = (endA * Math.PI) / 180
    const midRad = (angle * Math.PI) / 180

    const x1 = cx + Math.cos(startRad) * r1
    const y1 = cy + Math.sin(startRad) * r1
    const x2 = cx + Math.cos(endRad) * r2
    const y2 = cy + Math.sin(endRad) * r2
    const x3 = cx + Math.cos(endRad) * r1
    const y3 = cy + Math.sin(endRad) * r1
    const x4 = cx + Math.cos(startRad) * r2
    const y4 = cy + Math.sin(startRad) * r2

    // Curved blade using quadratic bezier
    const cpX = cx + Math.cos(midRad) * (r2 + 12)
    const cpY = cy + Math.sin(midRad) * (r2 + 12)

    return `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2} L ${x3} ${y3} Q ${cx + Math.cos(midRad) * (r1 - 6)} ${cy + Math.sin(midRad) * (r1 - 6)} ${x4} ${y4} Z`
  })

  // Tick marks around outer ring
  const tickCount = 32
  const ticks = Array.from({ length: tickCount }).map((_, i) => {
    const angle = (i * 360) / tickCount
    const rad = (angle * Math.PI) / 180
    const r1 = outerR + 4
    const r2 = outerR + (i % 4 === 0 ? 10 : 7)
    const x1 = cx + Math.cos(rad) * r1
    const y1 = cy + Math.sin(rad) * r1
    const x2 = cx + Math.cos(rad) * r2
    const y2 = cy + Math.sin(rad) * r2
    return { x1, y1, x2, y2, bold: i % 4 === 0 }
  })

  // Direction arrows on outer ring
  const arrowPositions = [0, 120, 240]
  const arrows = arrowPositions.map((deg) => {
    const rad = ((deg - 90) * Math.PI) / 180
    const r = outerR + 14
    const ax = cx + Math.cos(rad) * r
    const ay = cy + Math.sin(rad) * r
    return { cx: ax, cy: ay, rot: deg }
  })

  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      <svg viewBox="0 0 200 200" className="w-full h-full" style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C04A1A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E8703A" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8703A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#C04A1A" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Outer gear ring - rotates CW */}
        <g style={{ transformOrigin: '100px 100px', animation: 'rotate-cw 20s linear infinite' }}>
          <path d={gearPath} fill="url(#gearGrad)" fillOpacity="0.25" stroke="url(#gearGrad)" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="65" fill="none" stroke="url(#gearGrad)" strokeOpacity="0.3" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="58" fill="none" stroke="url(#gearGrad)" strokeOpacity="0.2" strokeWidth="0.5" strokeDasharray="4 4" />

          {/* Tick marks */}
          {ticks.map((t, i) => (
            <line
              key={`tick-${i}`}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke="#C04A1A"
              strokeWidth={t.bold ? 1.5 : 0.8}
              strokeOpacity={0.5}
            />
          ))}

          {/* Direction arrows */}
          {arrows.map((a, i) => (
            <g key={`arrow-${i}`} transform={`translate(${a.cx}, ${a.cy}) rotate(${a.rot + 90})`}>
              <polygon points="0,-4 3,2 -3,2" fill="#C04A1A" fillOpacity="0.6" />
            </g>
          ))}
        </g>

        {/* Inner turbine blades - rotates CCW */}
        <g style={{ transformOrigin: '100px 100px', animation: 'rotate-ccw 3s linear infinite' }}>
          {bladePaths.map((d, i) => (
            <path key={`blade-${i}`} d={d} fill="url(#bladeGrad)" stroke="#C04A1A" strokeWidth="0.8" strokeOpacity="0.4" />
          ))}
        </g>

        {/* Center hub - static */}
        <g>
          <circle cx={cx} cy={cy} r="15" fill="rgba(15,18,24,0.9)" stroke="#C04A1A" strokeWidth="2" strokeOpacity="0.6" />
          <circle cx={cx} cy={cy} r="10" fill="none" stroke="#C04A1A" strokeWidth="0.5" strokeOpacity="0.4" />
          {/* Screw cross */}
          <line x1={cx - 6} y1={cy} x2={cx + 6} y2={cy} stroke="#C04A1A" strokeWidth="1.5" strokeOpacity="0.7" />
          <line x1={cx} y1={cy - 6} x2={cx} y2={cy + 6} stroke="#C04A1A" strokeWidth="1.5" strokeOpacity="0.7" />
          <circle cx={cx} cy={cy} r="2" fill="#C04A1A" fillOpacity="0.5" />
        </g>
      </svg>

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(192,74,26,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* CSS animations */}
      <style>{`
        @keyframes rotate-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-ccw {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
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
      const cardArray = Array.from(cards)
      cardArray.forEach((card) => {
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
   Skills Matrix: Industrial Pipeline Flow
   ──────────────────────────────────────────────── */

function IndustrialPipelineFlow() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const skills = energyNode.subNodes

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !svgRef.current) return
    const ctx = gsap.context(() => {
      if (!svgRef.current) return
      const nodes = svgRef.current.querySelectorAll('.pipeline-node')
      const pipes = svgRef.current.querySelectorAll('.pipeline-path')
      if (nodes.length === 0 || pipes.length === 0) return

      gsap.set(nodes, { opacity: 0, scale: 0 })
      gsap.set(pipes, { strokeDashoffset: 1000 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          pipes.forEach((pipe, i) => {
            gsap.to(pipe, {
              strokeDashoffset: 0,
              duration: 2,
              delay: i * 0.3,
              ease: 'power2.inOut',
            })
          })
          nodes.forEach((node, i) => {
            gsap.to(node, {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.5 + i * 0.15,
              ease: 'back.out(1.7)',
            })
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [isMobile])

  const nodePositions = isMobile
    ? skills.map((_, i) => ({ x: 100, y: 60 + i * 90 }))
    : [
        { x: 80, y: 80 },
        { x: 280, y: 60 },
        { x: 480, y: 90 },
        { x: 680, y: 70 },
        { x: 160, y: 220 },
        { x: 360, y: 200 },
        { x: 560, y: 230 },
        { x: 260, y: 360 },
        { x: 460, y: 340 },
        { x: 360, y: 480 },
      ]

  const connections = isMobile
    ? skills.map((_, i) => (i < skills.length - 1 ? [i, i + 1] : null)).filter(Boolean) as number[][]
    : [
        [0, 1], [1, 2], [2, 3],
        [0, 4], [1, 5], [2, 6], [3, 6],
        [4, 7], [5, 7], [5, 8], [6, 8],
        [7, 9], [8, 9],
      ]

  const nodeShapes = ['circle', 'diamond', 'circle', 'diamond', 'circle', 'circle', 'diamond', 'circle', 'diamond', 'circle']

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
          {/* Engineering grid background */}
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

          <svg
            ref={svgRef}
            viewBox={isMobile ? '0 0 200 950' : '0 0 800 580'}
            className="relative w-full"
            style={{ height: isMobile ? '950px' : '580px' }}
          >
            <defs>
              <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C04A1A" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#C04A1A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#C04A1A" stopOpacity="0.3" />
              </linearGradient>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#C04A1A" opacity="0.6" />
              </marker>
            </defs>

            {/* Pipes */}
            {connections.map(([from, to], i) => {
              const start = nodePositions[from]
              const end = nodePositions[to]
              const midX = (start.x + end.x) / 2
              const midY = (start.y + end.y) / 2
              const path = isMobile
                ? `M ${start.x} ${start.y + 25} L ${end.x} ${end.y - 25}`
                : `M ${start.x} ${start.y} Q ${midX + (i % 2 === 0 ? 30 : -30)} ${midY + (i % 2 === 0 ? -20 : 20)} ${end.x} ${end.y}`

              return (
                <g key={`pipe-${i}`}>
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#pipeGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="pipeline-path"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: 1000,
                    }}
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="#C04A1A"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="8 6"
                    className="pipeline-path"
                    style={{
                      strokeDasharray: 1000,
                      strokeDashoffset: 1000,
                      animation: hoveredNode ? 'flowFast 0.5s linear infinite' : 'flowSlow 2s linear infinite',
                    }}
                  />
                </g>
              )
            })}

            {/* Nodes */}
            {skills.map((skill, i) => {
              const pos = nodePositions[i]
              const isHovered = hoveredNode === skill.id
              const shape = nodeShapes[i]
              const level = skill.level || 0

              return (
                <g
                  key={skill.id}
                  className="pipeline-node cursor-pointer"
                  transform={`translate(${pos.x}, ${pos.y})`}
                  onMouseEnter={() => setHoveredNode(skill.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  {/* Glow effect */}
                  {isHovered && (
                    <circle
                      r="35"
                      fill="none"
                      stroke="#C04A1A"
                      strokeWidth="2"
                      opacity="0.4"
                      filter="url(#nodeGlow)"
                    />
                  )}

                  {/* Node shape */}
                  {shape === 'circle' ? (
                    <>
                      <circle
                        r="28"
                        fill="rgba(15, 18, 24, 0.95)"
                        stroke={isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'}
                        strokeWidth="2"
                      />
                      {/* Screw decorations */}
                      <circle cx="-20" cy="-20" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="20" cy="-20" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="-20" cy="20" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="20" cy="20" r="2" fill="#C04A1A" opacity="0.5" />
                    </>
                  ) : (
                    <>
                      <polygon
                        points="0,-28 28,0 0,28 -28,0"
                        fill="rgba(15, 18, 24, 0.95)"
                        stroke={isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'}
                        strokeWidth="2"
                      />
                      <circle cx="-18" cy="-18" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="18" cy="-18" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="-18" cy="18" r="2" fill="#C04A1A" opacity="0.5" />
                      <circle cx="18" cy="18" r="2" fill="#C04A1A" opacity="0.5" />
                    </>
                  )}

                  {/* Level indicator ring */}
                  <circle
                    r="22"
                    fill="none"
                    stroke="#C04A1A"
                    strokeWidth="1"
                    strokeDasharray={`${level * 13.8} ${69 - level * 13.8}`}
                    opacity="0.6"
                    transform="rotate(-90)"
                  />

                  {/* Label */}
                  <text
                    y="4"
                    textAnchor="middle"
                    fill={isHovered ? '#E8703A' : '#F0E6D8'}
                    fontSize="10"
                    fontWeight="500"
                    style={{ pointerEvents: 'none' }}
                  >
                    {skill.label.length > 8 ? skill.label.slice(0, 7) + '…' : skill.label}
                  </text>

                  {/* Hover tooltip */}
                  {isHovered && (
                    <g transform="translate(0, -45)">
                      <rect
                        x="-60"
                        y="-20"
                        width="120"
                        height="24"
                        rx="4"
                        fill="rgba(192, 74, 26, 0.15)"
                        stroke="#C04A1A"
                        strokeWidth="1"
                      />
                      <text
                        y="-4"
                        textAnchor="middle"
                        fill="#E8703A"
                        fontSize="9"
                        fontFamily="monospace"
                      >
                        Lv.{level} {skill.label}
                      </text>
                    </g>
                  )}
                </g>
              )
            })}
          </svg>

          {/* CSS animations for liquid flow */}
          <style>{`
            @keyframes flowSlow {
              to { stroke-dashoffset: -28; }
            }
            @keyframes flowFast {
              to { stroke-dashoffset: -28; }
            }
          `}</style>
        </div>
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
   Tool Stack: Control Room Dashboard
   ──────────────────────────────────────────────── */

function ScrewCorners() {
  return (
    <>
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-warm-ghost/20" />
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-warm-ghost/20" />
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-warm-ghost/20" />
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-warm-ghost/20" />
    </>
  )
}

function GaugeMeter({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const needleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!needleRef.current) return
    gsap.to(needleRef.current, {
      rotation: -90 + (proficiency / 100) * 180,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: needleRef.current,
        start: 'top 85%',
      },
    })
  }, [proficiency])

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="relative w-24 h-12 mx-auto mb-2 overflow-hidden">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(192,74,26,0.2)" strokeWidth="8" />
          <path
            d="M 10 50 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="#C04A1A"
            strokeWidth="8"
            strokeDasharray={`${(proficiency / 100) * 126} 126`}
            style={{ transition: 'stroke-dasharray 2s ease-out' }}
          />
        </svg>
        <div
          ref={needleRef}
          className="absolute bottom-0 left-1/2 w-0.5 h-10 bg-energy-light origin-bottom transition-transform"
          style={{ transform: 'translateX(-50%) rotate(-90deg)' }}
        />
        <div className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full bg-energy -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function WireframeCube({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const cubeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cubeRef.current) return
    gsap.to(cubeRef.current, {
      rotationX: 360,
      rotationY: 360,
      duration: 8,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="relative w-24 h-24 mx-auto mb-2" style={{ perspective: '200px' }}>
        <div
          ref={cubeRef}
          className="w-full h-full relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face) => (
            <div
              key={face}
              className="absolute inset-0 border border-energy/30 flex items-center justify-center"
              style={{
                background: 'rgba(192,74,26,0.05)',
                transform: {
                  front: 'translateZ(48px)',
                  back: 'translateZ(-48px) rotateY(180deg)',
                  left: 'translateX(-48px) rotateY(-90deg)',
                  right: 'translateX(48px) rotateY(90deg)',
                  top: 'translateY(-48px) rotateX(90deg)',
                  bottom: 'translateY(48px) rotateX(-90deg)',
                }[face],
              }}
            >
              <span className="text-energy/20 text-[8px] font-mono">{face.toUpperCase()}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function DrawingScreen({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!lineRef.current) return
    const length = lineRef.current.getTotalLength()
    gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(lineRef.current, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="relative w-24 h-20 mx-auto mb-2 rounded border border-energy/20 bg-black/40 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(192,74,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(192,74,26,0.05) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
          }}
        />
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <path
            ref={lineRef}
            d="M 10 60 L 30 40 L 50 50 L 70 20 L 90 30"
            fill="none"
            stroke="#C04A1A"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function SevenSegment({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: `.seven-seg-${tool.name.replace(/\s+/g, '-')}`,
      start: 'top 85%',
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: proficiency,
          duration: 2,
          ease: 'power3.out',
          onUpdate: function () {
            setDisplayValue(Math.floor(this.targets()[0].val))
          },
        })
      },
    })
    return () => trigger.kill()
  }, [proficiency, tool.name])

  const digits = String(displayValue).padStart(3, '0').split('')

  const segMap: Record<string, string> = {
    '0': '1111110', '1': '0110000', '2': '1101101', '3': '1111001',
    '4': '0110011', '5': '1011011', '6': '1011111', '7': '1110000',
    '8': '1111111', '9': '1111011',
  }

  return (
    <div
      className={`relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30 seven-seg-${tool.name.replace(/\s+/g, '-')}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="flex items-center justify-center gap-1 mb-2">
        {digits.map((digit, i) => (
          <div key={i} className="relative w-6 h-10">
            {['top', 'topRight', 'bottomRight', 'bottom', 'bottomLeft', 'topLeft', 'middle'].map((seg, si) => {
              const isOn = segMap[digit]?.[si] === '1'
              const styles: Record<string, React.CSSProperties> = {
                top: { top: 0, left: 2, right: 2, height: 2 },
                topRight: { top: 2, right: 0, width: 2, height: 3 },
                bottomRight: { bottom: 2, right: 0, width: 2, height: 3 },
                bottom: { bottom: 0, left: 2, right: 2, height: 2 },
                bottomLeft: { bottom: 2, left: 0, width: 2, height: 3 },
                topLeft: { top: 2, left: 0, width: 2, height: 3 },
                middle: { top: '50%', left: 2, right: 2, height: 2, transform: 'translateY(-50%)' },
              }
              return (
                <div
                  key={seg}
                  className="absolute rounded-sm transition-all"
                  style={{
                    ...styles[seg],
                    background: isOn ? (active ? '#E8703A' : '#C04A1A') : 'rgba(192,74,26,0.1)',
                    boxShadow: isOn && active ? '0 0 6px rgba(192,74,26,0.5)' : 'none',
                  }}
                />
              )
            })}
          </div>
        ))}
        <span className="text-energy-light text-lg font-mono font-bold ml-1">%</span>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function Oscilloscope({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="relative w-24 h-20 mx-auto mb-2 rounded border border-energy/20 bg-black/60 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <path
              d="M 0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30"
              fill="none"
              stroke="#C04A1A"
              strokeWidth="1.5"
              className="oscilloscope-wave"
              style={{
                animation: active ? 'waveFast 1s linear infinite' : 'waveSlow 2s linear infinite',
              }}
            />
          </svg>
        </div>
        <div className="absolute top-1 left-1 text-[6px] text-energy/40 font-mono">50Hz</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function LEDBar({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const leds = 10
  const litCount = Math.round((proficiency / 100) * leds)

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="flex items-end justify-center gap-0.5 h-20 mb-2">
        {Array.from({ length: leds }).map((_, i) => (
          <div
            key={i}
            className="w-2 rounded-sm transition-all duration-300"
            style={{
              height: `${12 + i * 3}%`,
              background: i < litCount
                ? (active ? '#E8703A' : '#C04A1A')
                : 'rgba(192,74,26,0.1)',
              boxShadow: i < litCount && active ? '0 0 8px rgba(192,74,26,0.4)' : 'none',
            }}
          />
        ))}
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function FunctionPlot({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length })
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: pathRef.current,
        start: 'top 85%',
      },
    })
  }, [])

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="relative w-24 h-20 mx-auto mb-2 rounded border border-energy/20 bg-black/40 overflow-hidden">
        <svg viewBox="0 0 100 80" className="w-full h-full">
          <path
            ref={pathRef}
            d="M 10 70 Q 30 70, 40 40 Q 50 10, 60 40 Q 70 70, 90 70"
            fill="none"
            stroke="#C04A1A"
            strokeWidth="2"
          />
          <line x1="10" y1="70" x2="90" y2="70" stroke="rgba(192,74,26,0.2)" strokeWidth="1" />
          <line x1="10" y1="10" x2="10" y2="70" stroke="rgba(192,74,26,0.2)" strokeWidth="1" />
        </svg>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function StatusLight({ tool, proficiency }: { tool: typeof tools[0]; proficiency: number }) {
  const [active, setActive] = useState(false)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative p-4 rounded-lg border border-warm-ghost/10 bg-surface/80 backdrop-blur-sm transition-all duration-300 hover:border-energy/30"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <ScrewCorners />
      <div className="text-warm-faint text-[10px] font-mono uppercase tracking-wider mb-2 text-center">{tool.category}</div>
      <div className="flex flex-col items-center justify-center h-20 mb-2 gap-3">
        <div
          className="w-8 h-8 rounded-full border-2 transition-all duration-300"
          style={{
            background: blink ? 'rgba(192,74,26,0.8)' : 'rgba(192,74,26,0.3)',
            borderColor: active ? '#E8703A' : '#C04A1A',
            boxShadow: blink
              ? (active ? '0 0 20px rgba(192,74,26,0.6)' : '0 0 12px rgba(192,74,26,0.3)')
              : 'none',
          }}
        />
        <span className="text-energy-light text-[10px] font-mono uppercase tracking-wider">
          {blink ? 'RUNNING' : 'STANDBY'}
        </span>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <span className="text-energy-light">{tool.icon}</span>
          <span className="text-warm text-xs font-medium">{tool.name}</span>
        </div>
        <span className="text-energy-light text-lg font-mono font-bold">{proficiency}%</span>
      </div>
      {active && (
        <div className="absolute inset-0 rounded-lg border border-energy/20 pointer-events-none"
          style={{ boxShadow: '0 0 20px rgba(192,74,26,0.1)' }}
        />
      )}
    </div>
  )
}

function ControlRoomDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const toolConfigs = [
    { tool: tools[0], proficiency: 92, component: GaugeMeter },
    { tool: tools[1], proficiency: 88, component: WireframeCube },
    { tool: tools[2], proficiency: 85, component: DrawingScreen },
    { tool: tools[3], proficiency: 80, component: SevenSegment },
    { tool: tools[4], proficiency: 78, component: Oscilloscope },
    { tool: tools[5], proficiency: 75, component: LEDBar },
    { tool: tools[6], proficiency: 82, component: FunctionPlot },
    { tool: tools[7], proficiency: 79, component: StatusLight },
  ]

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return
      const panels = sectionRef.current.querySelectorAll('.control-panel > div')
      if (panels.length === 0) return
      gsap.fromTo(
        panels,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Wrench size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">控制室仪表盘</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 grid grid-cols-2 gap-3">
        {toolConfigs.map(({ tool, proficiency }, idx) => (
          <div key={idx} className="industrial-card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-energy-dim flex items-center justify-center text-energy-light">
              {tool.icon}
            </div>
            <p className="text-warm text-sm">{tool.name}</p>
            <p className="text-warm-faint text-xs">{tool.category}</p>
            <p className="text-energy-light text-lg font-mono font-bold mt-1">{proficiency}%</p>
          </div>
        ))}
      </div>

      {/* Desktop: Control Room Wall */}
      <div className="hidden md:block max-w-5xl mx-auto px-4">
        <div
          className="control-panel relative rounded-xl border border-warm-ghost/10 p-6 md:p-8"
          style={{
            background: 'linear-gradient(135deg, #0f1218 0%, #1a1f28 100%)',
          }}
        >
          {/* Panel frame screws */}
          <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-warm-ghost/10" />
          <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-warm-ghost/10" />
          <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-warm-ghost/10" />
          <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-warm-ghost/10" />

          {/* Dashboard grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {toolConfigs.map(({ tool, proficiency, component: Component }, idx) => (
              <Component key={idx} tool={tool} proficiency={proficiency} />
            ))}
          </div>

          {/* Bottom status bar */}
          <div className="mt-6 pt-4 border-t border-warm-ghost/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-energy animate-pulse" />
                <span className="text-warm-faint text-[10px] font-mono uppercase">System Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-energy/50" />
                <span className="text-warm-faint text-[10px] font-mono uppercase">All Instruments Nominal</span>
              </div>
            </div>
            <span className="text-warm-faint text-[10px] font-mono">
              {new Date().toLocaleTimeString('zh-CN', { hour12: false })}
            </span>
          </div>
        </div>
      </div>

      {/* Oscilloscope wave animation */}
      <style>{`
        @keyframes waveSlow {
          0% { d: path('M 0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30'); }
          50% { d: path('M 0 30 Q 12.5 50, 25 30 T 50 30 T 75 30 T 100 30'); }
          100% { d: path('M 0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30'); }
        }
        @keyframes waveFast {
          0% { d: path('M 0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30'); }
          50% { d: path('M 0 30 Q 12.5 50, 25 30 T 50 30 T 75 30 T 100 30'); }
          100% { d: path('M 0 30 Q 12.5 10, 25 30 T 50 30 T 75 30 T 100 30'); }
        }
      `}</style>
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
      if (!reelRef.current) return
      const frames = reelRef.current.querySelectorAll('.reel-frame')
      if (frames.length === 0) return
      const frameArray = Array.from(frames)
      frameArray.forEach((frame, i) => {
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
      if (!sectionRef.current) return
      const items = sectionRef.current.querySelectorAll('.timeline-item')
      if (items.length === 0) return
      const itemArray = Array.from(items)
      itemArray.forEach((item, i) => {
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
      if (!sectionRef.current) return
      const items = sectionRef.current.querySelectorAll('.timeline-card')
      if (items.length === 0) return
      const itemArray = Array.from(items)
      itemArray.forEach((item, i) => {
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
          <IndustrialPipelineFlow />
          <MagazineSpread expanded={expanded} onToggle={toggleExpanded} />
          <ControlRoomDashboard />
          <CinemaReel />
          <CaseStudyStory />
          <TimelineSection />
        </div>
      </div>
    </div>
  )
}

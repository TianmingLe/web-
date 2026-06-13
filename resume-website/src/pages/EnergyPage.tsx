import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Flame,
  Wind,
  Thermometer,
  Gauge,
  Cpu,
  Wrench,
  Activity,
  Zap,
  BarChart3,
  Clock,
  Layers,
  Settings,
  Database,
  Microscope,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DarkExpandableCard from '@components/DarkExpandableCard'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const energyNode = capabilityData.mainNodes.find((n) => n.id === 'energy')!

const tools = [
  { name: 'ANSYS Fluent', icon: <Wind size={18} />, desc: 'CFD仿真' },
  { name: 'SolidWorks', icon: <Layers size={18} />, desc: '三维建模' },
  { name: 'AutoCAD', icon: <Settings size={18} />, desc: '工程制图' },
  { name: 'UG NX', icon: <Wrench size={18} />, desc: '设计与加工' },
  { name: 'Proteus', icon: <Cpu size={18} />, desc: '电路仿真' },
  { name: 'NI DAQ', icon: <Database size={18} />, desc: '数据采集' },
  { name: 'MATLAB', icon: <BarChart3 size={18} />, desc: '数学建模' },
  { name: 'Keil', icon: <Microscope size={18} />, desc: '嵌入式开发' },
]

const timeline = [
  {
    period: '2024.09 - 2024.12',
    title: '卧式壳管式换热器建模与仿真',
    desc: '完成零部件三维建模与装配设计，进行流动、传热等多物理场耦合仿真分析',
    tags: ['SolidWorks', 'ANSYS Fluent', '热力学'],
  },
  {
    period: '2025.03 - 2025.05',
    title: '太阳能集热器性能测试',
    desc: '设计并执行热工测试实验，使用热电偶、流量计等设备采集数据，分析集热效率',
    tags: ['热工测试', '数据采集', '实验设计'],
  },
  {
    period: '2025.06',
    title: '风电场运维实习',
    desc: '在220kV升压站进行设备巡检，使用红外测温仪排查隐患，SCADA系统监控',
    tags: ['电力运维', 'SCADA', '风机诊断'],
  },
  {
    period: '2025.09 - 2025.12',
    title: '基于51/STM32的智能控制系统',
    desc: '完成LED动态显示、矩阵键盘、UART通信、温度采集报警、PWM电机调速等功能',
    tags: ['STM32', '51单片机', '嵌入式'],
  },
]

const projects = [
  {
    title: '卧式壳管式换热器建模与仿真',
    desc: '完成卧式壳管式换热器零部件三维建模与装配设计，进行流动、传热等多物理场耦合仿真分析。建模精度0.1mm，仿真周期48h，验证误差<5%。',
    metrics: [
      { label: '建模精度', value: '0.1mm' },
      { label: '仿真周期', value: '48h' },
      { label: '验证误差', value: '<5%' },
    ],
  },
  {
    title: '太阳能集热器性能测试',
    desc: '设计完整的实验方案，使用热电偶、热电阻、流量计等设备进行热工测试，采集并分析数据，评估集热器热效率与热损失系数。',
    metrics: [
      { label: '测试精度', value: '±0.5℃' },
      { label: '数据点', value: '10,000+' },
      { label: '效率提升', value: '12%' },
    ],
  },
  {
    title: '太阳能光伏发电系统',
    desc: '参与光伏系统设计，完成组件选型、阵列布局、逆变器配置与发电量估算，理解MPPT控制原理与并网技术。',
    metrics: [
      { label: '设计容量', value: '50kW' },
      { label: '年发电量', value: '65MWh' },
      { label: '系统效率', value: '85%' },
    ],
  },
]

function FlowingLinesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)
    let lines: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    const spawn = () => {
      if (lines.length < 40) {
        lines.push({
          x: Math.random() * w,
          y: h + 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.5 - 0.5,
          life: 0,
          maxLife: 200 + Math.random() * 200,
        })
      }
    }

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      spawn()
      for (let i = lines.length - 1; i >= 0; i--) {
        const p = lines[i]
        p.x += p.vx
        p.y += p.vy
        p.life++
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        ctx.lineTo(p.x - p.vx * 10, p.y - p.vy * 10)
        ctx.strokeStyle = `rgba(192, 74, 26, ${alpha})`
        ctx.lineWidth = 1.5
        ctx.stroke()
        if (p.life > p.maxLife) lines.splice(i, 1)
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

export default function EnergyPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.energy-hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.energy-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.energy-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      )

      const cards = gsap.utils.toArray<HTMLElement>('.energy-animate')
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={contentRef} className="relative">
      {/* Hero */}
      <div
        ref={heroRef}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        <FlowingLinesBg />
        <div className="hero-glow hero-glow-energy absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 text-center px-4">
          <div className="energy-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-energy-dim border border-energy/20 mb-6">
            <Flame size={14} className="text-energy-light" />
            <span className="text-energy-light text-xs font-mono tracking-[0.15em] uppercase">
              能源与动力工程
            </span>
          </div>
          <h1 className="energy-hero-title text-5xl md:text-7xl font-serif text-warm mb-6 tracking-tight">
            能动技术
          </h1>
          <p className="energy-hero-sub text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            掌握能源动力领域核心仿真工具链与工程实践能力，包括热力系统建模、CFD仿真、三维设计、
            嵌入式开发与工程管理，具有完成完整实验与热力设备检修的能力。
          </p>
          <div className="energy-hero-sub mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-energy/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Skills Grid */}
          <div className="energy-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Gauge size={24} className="text-energy-light" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">专业技能矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {energyNode.subNodes.map((skill) => (
                <DarkExpandableCard
                  key={skill.id}
                  title={skill.label}
                  glowColor="energy"
                  keywords={
                    skill.level && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (skill.level || 0)
                                ? 'bg-energy-light'
                                : 'bg-warm-ghost/20'
                            }`}
                          />
                        ))}
                      </div>
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-energy-light/70" />
                    <span className="text-warm-muted text-sm font-sans">
                      熟练度等级 {skill.level}/5
                    </span>
                  </div>
                </DarkExpandableCard>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="energy-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Zap size={24} className="text-energy-light" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">项目展示</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="industrial-card industrial-card-energy p-6"
                >
                  <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-5 font-sans">
                    {proj.desc}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {proj.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="text-center p-3 rounded-lg bg-base-elevated border border-border"
                      >
                        <p className="text-energy-light text-lg font-mono font-medium">
                          {m.value}
                        </p>
                        <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment / Tools */}
          <div className="energy-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Wrench size={24} className="text-energy-light" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">工具与设备</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-5 text-center group hover:border-energy/25 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-energy-dim flex items-center justify-center text-energy-light group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-warm text-sm font-medium font-sans">{tool.name}</p>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="energy-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Clock size={24} className="text-energy-light" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">项目时间轴</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-energy/40 via-energy/20 to-transparent" />
              <div className="space-y-10">
                {timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-energy shadow-[0_0_12px_rgba(192,74,26,0.5)] z-10" />
                    <div className="md:w-1/2 ml-10 md:ml-0">
                      <div className="industrial-card industrial-card-energy p-5">
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

          {/* Case Study from capabilityMap */}
          {energyNode.caseStudy && (
            <div className="energy-animate">
              <div className="industrial-card industrial-card-energy p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Thermometer size={24} className="text-energy-light" />
                  <h3 className="text-xl font-serif text-warm">{energyNode.caseStudy.title}</h3>
                </div>
                <p className="text-warm-muted text-sm leading-relaxed mb-6 font-sans">
                  {energyNode.caseStudy.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(energyNode.caseStudy.metrics || {}).map(([k, v], i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-lg bg-base-elevated border border-border"
                    >
                      <p className="text-energy-light text-xl font-mono font-medium">{v}</p>
                      <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">
                        {k}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

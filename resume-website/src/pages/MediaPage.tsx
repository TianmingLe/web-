import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Play,
  Film,
  Sparkles,
  Wand2,
  UserCircle,
  Clapperboard,
  Palette,
  Mic,
  Scissors,
  Image,
  Video,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  MonitorPlay,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  Zap,
  Database,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const mediaNode = capabilityData.mainNodes.find((n) => n.id === 'media')!

const platforms = [
  {
    name: '哔哩哔哩',
    followers: '12,000+',
    growth: 85,
    content: '技术教程、AI应用、视频修复',
    representative: '《钢铁是怎样炼成的》4K修复（200万+播放）',
    icon: <Play size={24} />,
    color: '#00A1D6',
    angle: 0,
  },
  {
    name: '抖音',
    followers: '4,900+',
    growth: 72,
    content: '短视频技术分享、AI工具演示',
    representative: '切片1500万+',
    icon: <Video size={24} />,
    color: '#FE2C55',
    angle: 120,
  },
  {
    name: '小红书',
    followers: '4,600+',
    growth: 68,
    content: 'AI工具使用攻略、学习心得',
    representative: '笔记总阅读量10万+',
    icon: <Image size={24} />,
    color: '#FF2442',
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
    title: '《钢铁是怎样炼成的》4K修复',
    desc: '独立完成经典影片4K修复与发布，使用AI技术进行画质增强、分辨率提升、色彩校正，全网引发对保尔·柯察金精神的学习热潮。',
    tags: ['Topaz Video AI', '剪映', 'RIFE', '4K修复'],
    workflow: [
      '素材收集',
      'AI超分(Topaz Video AI)',
      '去噪修复',
      '色彩校正(剪映)',
      '帧率提升(25fps→60fps)',
      '发布推广',
    ],
    impact: [
      'B站播放量200万+',
      '抖音切片1500万+',
      '带动话题量10亿+',
    ],
    sideStats: [
      { label: '原始分辨率', value: '480p' },
      { label: '修复后分辨率', value: '4K' },
      { label: '帧率提升', value: '25→60fps' },
      { label: '修复周期', value: '72小时' },
    ],
    pullQuote: '用AI技术让经典重焕光彩，这是对保尔精神最好的致敬。',
  },
  {
    title: 'OmniScraper Pro',
    desc: '从0开始手搓的视频抓取工具，后基于MediaCrawler和omi项目进行AI能力扩展。实现「采集→下载→ASR转写→LLM分析→导出」完整链路，支持抖音等多平台。',
    tags: ['Python', 'yt-dlp', 'Whisper', 'Electron', 'React'],
    highlights: [
      'Desktop端53个测试文件，167个测试全部通过',
      'MediaCrawler 46个测试全部通过',
      '代理可用率从60%提升至90%',
      'CI/CD全流程自动化',
    ],
    architecture: [
      { layer: '采集层', tech: 'yt-dlp / MediaCrawler', icon: <Globe size={14} /> },
      { layer: '处理层', tech: 'Whisper ASR / FFmpeg', icon: <Cpu size={14} /> },
      { layer: '分析层', tech: 'LLM / RAG Pipeline', icon: <Zap size={14} /> },
      { layer: '展示层', tech: 'Electron + React', icon: <MonitorPlay size={14} /> },
      { layer: '数据层', tech: 'SQLite / JSON Export', icon: <Database size={14} /> },
    ],
  },
]

const tools = [
  { name: 'Premiere Pro', icon: <Clapperboard size={18} />, category: '剪辑', desc: '专业视频剪辑与多轨道编辑' },
  { name: 'After Effects', icon: <Sparkles size={18} />, category: '特效', desc: '动态图形与视觉特效合成' },
  { name: 'Photoshop', icon: <Palette size={18} />, category: '图像', desc: '图像处理与平面设计' },
  { name: 'Audition', icon: <Mic size={18} />, category: '音频', desc: '专业音频编辑与降噪' },
  { name: '剪映', icon: <Scissors size={18} />, category: '剪辑', desc: '快速剪辑与智能字幕' },
  { name: 'ComfyUI', icon: <Wand2 size={18} />, category: 'AI工作流', desc: '可视化AI图像生成工作流' },
  { name: 'D-ID', icon: <UserCircle size={18} />, category: '数字人', desc: 'AI数字人视频生成' },
  { name: 'Topaz Video AI', icon: <MonitorPlay size={18} />, category: 'AI修复', desc: 'AI视频增强与超分辨率' },
]

const pipelineSteps = [
  { title: '内容采集', desc: 'OmniScraper / 热点监控', icon: <TrendingUp size={16} /> },
  { title: '素材处理', desc: '4K修复 / AI增强', icon: <Wand2 size={16} /> },
  { title: '内容创作', desc: '剪辑 / 特效 / 配音', icon: <Film size={16} /> },
  { title: 'AI生成', desc: '数字人 / 语音克隆', icon: <Sparkles size={16} /> },
  { title: '多平台分发', desc: 'B站 / 抖音 / 小红书', icon: <Play size={16} /> },
]

const caseStudyTimeline = [
  { time: 'Day 1', event: '视频发布B站', views: '0→5万' },
  { time: 'Day 3', event: '登上热门推荐', views: '5万→50万' },
  { time: 'Day 7', event: '抖音切片爆发', views: '50万→200万' },
  { time: 'Day 14', event: '话题登上热搜', views: '200万→500万' },
  { time: 'Day 30', event: '全平台持续发酵', views: '500万→2000万+' },
]

const heatmapData = [
  { source: 'B站推荐', value: 45, color: '#EC4899' },
  { source: '抖音切片', value: 30, color: '#FE2C55' },
  { source: '小红书', value: 10, color: '#FF2442' },
  { source: '搜索流量', value: 8, color: '#00A1D6' },
  { source: '社交分享', value: 7, color: '#8B5CF6' },
]

/* ────────────────────────────────────────────────
   Hero: Cinematic Split Screen + Particle Network
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

      // Update & draw nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.pulse += 0.02

        const pulseAlpha = n.alpha * (0.7 + 0.3 * Math.sin(n.pulse))
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 72, 153, ${pulseAlpha})`
        ctx.fill()
      }

      // Draw connections
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
            ctx.strokeStyle = `rgba(236, 72, 153, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Social media orbit rings
      for (let i = 0; i < 3; i++) {
        const cx = w * 0.75
        const cy = h * 0.5
        const radius = 80 + i * 50
        ctx.beginPath()
        ctx.arc(cx, cy, radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(236, 72, 153, ${0.03 + i * 0.02})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Orbiting dot
        const angle = t * (0.3 + i * 0.15) + i * 2
        const ox = cx + Math.cos(angle) * radius
        const oy = cy + Math.sin(angle) * radius
        ctx.beginPath()
        ctx.arc(ox, oy, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 72, 153, ${0.4 - i * 0.1})`
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
          className="char inline-block text-5xl md:text-7xl lg:text-8xl font-media-title text-warm tracking-tight"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  )
}

function PlatformCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const platforms_data = [
    { name: 'B站', color: '#00A1D6', icon: <Play size={32} /> },
    { name: '抖音', color: '#FE2C55', icon: <Video size={32} /> },
    { name: '小红书', color: '#FF2442', icon: <Image size={32} /> },
  ]

  return (
    <div ref={carouselRef} className="relative w-64 h-64 md:w-80 md:h-80" style={{ perspective: '800px' }}>
      {platforms_data.map((plat, i) => {
        const offset = i - activeIndex
        const absOffset = ((offset % 3) + 3) % 3
        const isActive = absOffset === 0
        const rotateY = absOffset === 0 ? 0 : absOffset === 1 ? 45 : -45
        const translateZ = isActive ? 100 : 0
        const opacity = isActive ? 1 : 0.4
        const scale = isActive ? 1.1 : 0.85

        return (
          <div
            key={i}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
            style={{
              transform: `rotateY(${rotateY}deg) translateZ(${translateZ}px) scale(${scale})`,
              opacity,
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl flex flex-col items-center justify-center gap-2 border"
              style={{
                background: `${plat.color}15`,
                borderColor: `${plat.color}40`,
                boxShadow: isActive ? `0 0 40px ${plat.color}30` : 'none',
              }}
            >
              <span style={{ color: plat.color }}>{plat.icon}</span>
              <span className="text-sm font-medium" style={{ color: plat.color }}>
                {plat.name}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
      <span className="text-warm-faint text-xs font-mono tracking-widest uppercase">Scroll</span>
      <div className="w-5 h-8 rounded-full border border-warm-ghost/30 flex items-start justify-center p-1.5">
        <div className="w-1 h-2 rounded-full bg-pink-400 animate-bounce" />
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
  const localTimelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!sectionRef.current || !orbitRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 })
      tl.to(orbitRef.current, {
        rotation: 360,
        duration: 60,
        ease: 'none',
      })

      // Counter-rotate cards so they stay upright
      const cards = orbitRef.current?.querySelectorAll('.orbit-card')
      if (cards) {
        cards.forEach((card) => {
          tl.to(
            card,
            {
              rotation: -360,
              duration: 60,
              ease: 'none',
            },
            0
          )
        })
      }

      localTimelineRef.current = tl

      // ScrollTrigger pause/resume
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => localTimelineRef.current?.play(),
        onLeave: () => localTimelineRef.current?.pause(),
        onEnterBack: () => localTimelineRef.current?.play(),
        onLeaveBack: () => localTimelineRef.current?.pause(),
      })
    }, sectionRef)

    return () => {
      localTimelineRef.current?.kill()
      localTimelineRef.current = null
      ctx.revert()
    }
  }, [])

  return (
    <div ref={sectionRef} className="relative py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <BarChart3 size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">平台数据</h2>
      </div>

      {/* Mobile: simple grid */}
      <div className="md:hidden px-4 space-y-4">
        {platforms.map((plat, idx) => (
          <div key={idx} className="industrial-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <span style={{ color: plat.color }}>{plat.icon}</span>
              <h3 className="text-lg font-serif text-warm">{plat.name}</h3>
            </div>
            <p className="text-pink-400 text-2xl font-mono font-bold">{plat.followers}</p>
            <p className="text-warm-faint text-xs mb-2">粉丝</p>
            <p className="text-warm-muted text-sm">{plat.content}</p>
          </div>
        ))}
      </div>

      {/* Desktop: Orbital */}
      <div className="hidden md:flex items-center justify-center relative" style={{ height: '500px' }}>
        {/* Center hub */}
        <div className="absolute z-10 flex flex-col items-center justify-center w-40 h-40 rounded-full bg-surface border border-border"
          style={{ boxShadow: '0 0 60px rgba(236,72,153,0.1)' }}>
          <p className="text-pink-400 text-2xl font-mono font-bold">24,000+</p>
          <p className="text-warm-faint text-xs mt-1">Total Followers</p>
        </div>

        {/* Orbit ring */}
        <div
          className="absolute rounded-full border border-pink-500/10"
          style={{ width: '400px', height: '400px' }}
        />

        {/* Orbiting container */}
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
                  className="industrial-card p-5 w-52 hover:border-pink-400/20 transition-all"
                  style={{
                    transform: `perspective(600px) rotateY(${idx * 15}deg)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ color: plat.color }}>{plat.icon}</span>
                    <div className="relative">
                      <RadialProgress percentage={plat.growth} color={plat.color} size={50} />
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-mono" style={{ color: plat.color }}>
                        {plat.growth}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-serif text-warm mb-1">{plat.name}</h3>
                  <p className="text-pink-400 text-xl font-mono font-bold">{plat.followers}</p>
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
            ? 'linear-gradient(135deg, rgba(236,72,153,0.25), rgba(236,72,153,0.1))'
            : 'rgba(28, 33, 40, 0.9)',
          border: hovered ? '1px solid rgba(236,72,153,0.5)' : '1px solid rgba(240,230,216,0.08)',
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
                className={`w-1.5 h-1.5 rounded-full ${i < level ? 'bg-pink-400' : 'bg-warm-ghost/20'}`}
              />
            ))}
          </div>
        )}
        {hovered && (
          <span className="text-pink-400 text-[10px] font-mono mt-1">Lv.{level}</span>
        )}
      </div>
    </div>
  )
}

function SkillsHoneycomb() {
  const skills = mediaNode.subNodes
  // Arrange in honeycomb rows
  const rows: typeof skills[] = []
  let idx = 0
  const rowLengths = [3, 4, 3, 2]
  for (const len of rowLengths) {
    rows.push(skills.slice(idx, idx + len))
    idx += len
  }

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Sparkles size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">技能矩阵</h2>
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
                  className={`w-2 h-2 rounded-full ${i < (skill.level || 0) ? 'bg-pink-400' : 'bg-warm-ghost/20'}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Honeycomb */}
      <div className="hidden md:flex flex-col items-center">
        {rows.map((row, rowIdx) => (
          <div
            key={rowIdx}
            className="flex justify-center"
            style={{ marginLeft: rowIdx % 2 === 1 ? '70px' : '0' }}
          >
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
        <Clapperboard size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">项目展示</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 space-y-4">
        {[proj1, proj2].map((proj, idx) => (
          <div key={idx} className="industrial-card p-5">
            <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
            <p className="text-warm-muted text-sm mb-4">{proj.desc}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {proj.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
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
          <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-10"
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
            <div className="text-warm-faint text-xs font-mono uppercase tracking-widest mb-4">Featured Project</div>
            <h3 className="text-2xl font-serif text-warm mb-4">{proj1.title}</h3>

            {/* Featured image area */}
            <div
              className="w-full h-48 rounded-lg mb-6 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Film size={48} className="text-pink-400/30" />
              </div>
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-black/50 text-pink-400 text-xs font-mono">
                4K RESTORATION
              </div>
            </div>

            <p className="text-warm-muted text-sm leading-relaxed mb-6">{proj1.desc}</p>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-pink-400/40 pl-4 my-6">
              <p className="text-warm/80 text-sm italic font-serif">{proj1.pullQuote}</p>
            </blockquote>

            {/* Sidebar stats */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {proj1.sideStats?.map((stat, i) => (
                <div key={i} className="p-3 rounded-lg bg-base-elevated border border-border">
                  <p className="text-pink-400 text-sm font-mono font-bold">{stat.value}</p>
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
                transform: hoveredNote === 0 ? 'rotate(3deg) translateY(0)' : 'rotate(3deg) translateY(-10px)',
              }}
            >
              <p className="text-amber-900 text-xs font-sans">200万+播放里程碑！</p>
            </div>
          </div>

          {/* Right page */}
          <div
            ref={rightRef}
            className="flex-1 industrial-card rounded-l-none border-l-0 p-8 relative"
            onMouseEnter={() => setHoveredNote(1)}
            onMouseLeave={() => setHoveredNote(null)}
          >
            <div className="text-warm-faint text-xs font-mono uppercase tracking-widest mb-4">Technical Project</div>
            <h3 className="text-2xl font-serif text-warm mb-4">{proj2.title}</h3>

            {/* Code snippet style */}
            <div className="rounded-lg bg-base-elevated border border-border p-4 mb-6 font-mono text-xs overflow-hidden">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                <span className="text-warm-faint ml-2">omniscraper.py</span>
              </div>
              <div className="text-warm-muted space-y-1">
                <p><span className="text-pink-400">class</span> <span className="text-cyan-400">OmniScraper</span>:</p>
                <p className="pl-4"><span className="text-pink-400">def</span> <span className="text-yellow-400">__init__</span>(self):</p>
                <p className="pl-8">self.pipeline = Pipeline()</p>
                <p className="pl-8">self.asr = WhisperModel()</p>
                <p className="pl-4"><span className="text-pink-400">def</span> <span className="text-yellow-400">scrape</span>(self, url):</p>
                <p className="pl-8"><span className="text-pink-400">return</span> self.pipeline.run(url)</p>
              </div>
            </div>

            {/* Architecture diagram */}
            <div className="mb-6">
              <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-3">Architecture</p>
              <div className="space-y-2">
                {proj2.architecture?.map((layer, i) => (
                  <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-base-elevated border border-border">
                    <span className="text-pink-400">{layer.icon}</span>
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
              {proj2.highlights?.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-pink-400 mt-0.5 shrink-0" />
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
                transform: hoveredNote === 1 ? 'rotate(-2deg) translateY(0)' : 'rotate(-2deg) translateY(-10px)',
              }}
            >
              <p className="text-blue-900 text-xs font-sans">167 tests all passing ✅</p>
            </div>
          </div>
        </div>

        {/* Expand button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface border border-border hover:border-pink-400/30 transition-all text-pink-400 text-sm"
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
          <div className="mt-6 grid grid-cols-2 gap-6">
            <div className="industrial-card p-6">
              <p className="text-warm-faint text-xs font-mono uppercase mb-3">Workflow</p>
              <div className="flex flex-wrap items-center gap-1">
                {proj1.workflow?.map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <span className="text-warm-muted text-xs">{step}</span>
                    {i < (proj1.workflow?.length ?? 0) - 1 && <ArrowRight size={10} className="text-warm-faint" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                {proj1.impact?.map((imp, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TrendingUp size={14} className="text-pink-400 mt-0.5 shrink-0" />
                    <span className="text-warm-muted text-xs">{imp}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="industrial-card p-6">
              <p className="text-warm-faint text-xs font-mono uppercase mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {proj2.tags.map((tag, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    {tag}
                  </span>
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
  const orbitRef = useRef<HTMLDivElement>(null)
  const [docked, setDocked] = useState(false)
  const [hoveredTool, setHoveredTool] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(true)
  const orbitAngleRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // 3D orbit animation
  useEffect(() => {
    if (!orbitRef.current || docked) return

    const animate = () => {
      if (!isVisible) {
        rafRef.current = requestAnimationFrame(animate)
        return
      }

      orbitAngleRef.current += 0.003
      const angle = orbitAngleRef.current
      const icons = orbitRef.current!.querySelectorAll('.tool-icon')

      icons.forEach((icon, i) => {
        const el = icon as HTMLElement
        const count = tools.length
        const t = (i / count) * Math.PI * 2 + angle
        const radiusX = 220
        const radiusY = 80
        const tilt = 0.4 // tilt angle for 3D effect

        // 3D elliptical orbit with depth
        const x = Math.cos(t) * radiusX
        const y = Math.sin(t) * radiusY * Math.cos(tilt)
        const z = Math.sin(t) * Math.sin(tilt)

        // Depth scale: items in back are smaller and dimmer
        const scale = 0.7 + (z + 1) * 0.2
        const opacity = 0.5 + (z + 1) * 0.25
        const zIndex = Math.round((z + 1) * 50)

        el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) scale(${scale})`
        el.style.opacity = `${opacity}`
        el.style.zIndex = `${zIndex}`
        el.style.filter = z < 0 ? 'brightness(0.6)' : 'brightness(1)'
      })

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [docked, isVisible])

  return (
    <div className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Wand2 size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">工具栈</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 grid grid-cols-2 gap-3">
        {tools.map((tool, idx) => (
          <div key={idx} className="industrial-card p-4 text-center">
            <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
              {tool.icon}
            </div>
            <p className="text-warm text-sm">{tool.name}</p>
            <p className="text-warm-faint text-xs">{tool.category}</p>
          </div>
        ))}
      </div>

      {/* Desktop: 3D Orbit */}
      <div
        ref={containerRef}
        className="hidden md:block relative mx-auto"
        style={{
          width: '700px',
          height: '450px',
          perspective: '800px',
        }}
        onMouseEnter={() => setDocked(true)}
        onMouseLeave={() => {
          setDocked(false)
          setHoveredTool(null)
        }}
      >
        {/* 3D Orbit Container */}
        <div
          ref={orbitRef}
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            display: docked ? 'none' : 'block',
          }}
        >
          {/* Orbit rings */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/10"
            style={{ width: '440px', height: '160px' }}
          />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/5"
            style={{ width: '360px', height: '130px' }}
          />

          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="tool-icon absolute left-1/2 top-1/2 transition-all duration-500 group"
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-surface/40 border-border/20 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                  {tool.icon}
                </div>
                <span className="text-warm text-[10px] font-medium whitespace-nowrap">{tool.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2D Docked Grid (shown on hover) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            display: docked ? 'flex' : 'none',
            opacity: docked ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          <div className="grid grid-cols-4 gap-6">
            {tools.map((tool, idx) => {
              return (
                <div
                  key={idx}
                  className="group"
                  onMouseEnter={() => setHoveredTool(idx)}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    animation: docked ? `dockIn 0.5s ease ${idx * 0.05}s both` : 'none',
                  }}
                >
                  <div
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      hoveredTool === idx
                        ? 'bg-surface border-pink-400/30 scale-110'
                        : 'bg-surface/80 border-border/40'
                    }`}
                    style={{
                      boxShadow: hoveredTool === idx ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
                    }}
                  >
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </div>
                    <span className="text-warm text-xs font-medium whitespace-nowrap">{tool.name}</span>
                    <span className="text-warm-faint text-[10px]">{tool.category}</span>
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-base-elevated border border-border text-warm-muted text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  >
                    {tool.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-warm-faint text-xs font-mono transition-opacity duration-500"
          style={{ opacity: docked ? 0 : 0.6 }}
        >
          悬停以展开工具
        </div>
      </div>

      <style>{`
        @keyframes dockIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
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
      const frames = reelRef.current!.querySelectorAll('.reel-frame')
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
        <Film size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">内容生产流水线</h2>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 space-y-3">
        {pipelineSteps.map((step, idx) => (
          <div key={idx} className="industrial-card p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
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
                background: 'linear-gradient(180deg, rgba(236,72,153,0.05) 0%, transparent 30%, transparent 70%, rgba(236,72,153,0.05) 100%)',
              }}
            />

            {pipelineSteps.map((step, idx) => (
              <div
                key={idx}
                className="reel-frame relative p-5 rounded-lg bg-surface border border-border hover:border-pink-400/20 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-pink-400 text-xs font-mono">STEP {String(idx + 1).padStart(2, '0')}</span>
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
          <span className="text-warm-muted text-xs w-20 text-right shrink-0">{item.source}</span>
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
        <MonitorPlay size={24} className="text-pink-400" />
        <h2 className="text-2xl md:text-3xl font-media-title text-warm">案例研究</h2>
      </div>

      {mediaNode.caseStudy && (
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="industrial-card p-6 md:p-10">
            <h3 className="text-xl md:text-2xl font-serif text-warm mb-2">{mediaNode.caseStudy.title}</h3>
            <p className="text-warm-muted text-sm leading-relaxed mb-8">{mediaNode.caseStudy.description}</p>

            {/* Metrics with animated counters */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
                <p className="text-pink-400 text-2xl md:text-3xl font-mono font-bold">
                  <AnimatedCounter target={200} suffix="万+" />
                </p>
                <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">B站播放</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
                <p className="text-pink-400 text-2xl md:text-3xl font-mono font-bold">
                  <AnimatedCounter target={1500} suffix="万+" />
                </p>
                <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">抖音切片</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-base-elevated border border-border">
                <p className="text-pink-400 text-2xl md:text-3xl font-mono font-bold">
                  <AnimatedCounter target={10} suffix="亿+" />
                </p>
                <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">话题量</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Heatmap */}
              <div>
                <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-4">流量来源分布</p>
                <HeatmapBar data={heatmapData} />
              </div>

              {/* Timeline */}
              <div>
                <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-4">传播时间线</p>
                <div className="relative pl-6">
                  <div className="absolute left-2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-400/50 to-transparent" />
                  {caseStudyTimeline.map((item, i) => (
                    <div key={i} className="timeline-item relative mb-5 last:mb-0">
                      <div className="absolute left-[-18px] top-1 w-2 h-2 rounded-full bg-pink-400" />
                      <p className="text-pink-400 text-xs font-mono">{item.time}</p>
                      <p className="text-warm text-sm">{item.event}</p>
                      <p className="text-warm-muted text-xs">{item.views}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ────────────────────────────────────────────────
   Main Page
   ──────────────────────────────────────────────── */

export default function MediaPage() {
  const contentRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.media-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2 }
      )
      gsap.fromTo(
        '.media-hero-sub',
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
            background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Animated Title */}
          <div className="text-left">
            <div className="media-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
              <Film size={14} className="text-pink-400" />
              <span className="text-pink-400 text-xs font-mono tracking-[0.15em] uppercase">
                内容创作与平台运营
              </span>
            </div>
            <AnimatedTitle text="自媒体特种技术" />
            <p className="media-hero-sub text-warm-muted text-base md:text-lg max-w-lg leading-relaxed font-sans mt-6">
              具备完整的自媒体运营能力，从内容采集、视频修复到多平台分发，
              掌握数据驱动的内容策略与粉丝运营方法。
            </p>
            <div className="media-hero-sub mt-8 flex items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-pink-400/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
              >
                <ArrowLeft size={14} />
                返回首页
              </Link>
            </div>
          </div>

          {/* Right: Platform Carousel */}
          <div className="hidden md:flex items-center justify-center">
            <PlatformCarousel />
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
        </div>
      </div>
    </div>
  )
}

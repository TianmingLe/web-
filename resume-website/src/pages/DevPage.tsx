import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Code2,
  Terminal,
  GitBranch,
  Database,
  Server,
  Container,
  Monitor,
  Cpu,
  Braces,
  Layers,
  Box,
  Wifi,
  BarChart3,
  CheckCircle2,
  Star,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DarkExpandableCard from '@components/DarkExpandableCard'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const devNode = capabilityData.mainNodes.find((n) => n.id === 'dev')!

const languages = [
  { name: 'Python', level: 95, icon: <Terminal size={16} />, desc: '数据分析 / 科学计算 / 自动化' },
  { name: 'Java', level: 90, icon: <CoffeeIcon />, desc: 'Web系统 / Spring Boot' },
  { name: 'C/C++', level: 80, icon: <Cpu size={16} />, desc: '嵌入式 / 指针优化' },
  { name: 'JavaScript / TypeScript', level: 85, icon: <Braces size={16} />, desc: '前端 + Electron' },
  { name: 'SQL', level: 80, icon: <Database size={16} />, desc: '数据库操作 / 查询优化' },
]

function CoffeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}

const projects = [
  {
    title: 'OmniScraper Pro',
    desc: '从0开始手搓的视频抓取工具，后基于MediaCrawler和omi项目进行AI能力扩展。实现「采集→下载→ASR转写→LLM分析→导出」完整链路，支持抖音等多平台，包含Electron桌面端与自动化测试。',
    tags: ['Python', 'yt-dlp', 'Whisper', 'Electron', 'React', 'CI/CD'],
    highlights: [
      'Desktop端53个测试文件，167个测试全部通过',
      'MediaCrawler 46个测试全部通过',
      '代理可用率从60%提升至90%',
      'CI/CD从代码提交到安装包生成全流程自动化',
    ],
  },
  {
    title: '个人网站',
    desc: '使用React 18 + TypeScript + Vite + Tailwind CSS构建的响应式个人作品集网站，集成GSAP动画、粒子背景、音乐播放器等交互元素，支持双版本主题切换。',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP'],
    highlights: [
      '响应式设计，支持移动端与桌面端',
      'GSAP ScrollTrigger滚动动画',
      'Canvas粒子背景效果',
      '双版本主题切换（A/B Test）',
    ],
  },
  {
    title: '自动化脚本',
    desc: '开发基于Python的任务调度脚本，实现邮件自动提醒、文件自动备份与数据自动抓取等日常任务，配置定时执行逻辑以优化工作效率；利用自动化工作流API实现批量文档的智能解析与结构化处理。',
    tags: ['Python', 'Schedule', 'API', 'Selenium'],
    highlights: [
      '邮件自动提醒系统',
      '文件自动备份与同步',
      '数据自动抓取与解析',
      '批量文档智能处理',
    ],
  },
  {
    title: '数据库管理系统',
    desc: '参与数据库设计与管理系统开发，完成多表关联查询优化、索引设计、存储过程编写，理解事务隔离级别与锁机制，具备SQL性能调优能力。',
    tags: ['SQL', 'PostgreSQL', 'MySQL', 'Redis'],
    highlights: [
      '多表关联查询优化',
      '索引设计与性能调优',
      '存储过程与触发器',
      'Redis缓存策略',
    ],
  },
]

const toolStack = [
  { name: 'Git', icon: <GitBranch size={18} />, category: '版本控制' },
  { name: 'Docker', icon: <Container size={18} />, category: '容器化' },
  { name: 'Linux', icon: <Server size={18} />, category: '服务器' },
  { name: 'VS Code', icon: <Code2 size={18} />, category: '编辑器' },
  { name: 'Postman', icon: <Wifi size={18} />, category: 'API测试' },
  { name: 'Figma', icon: <Monitor size={18} />, category: '设计' },
  { name: 'Node.js', icon: <Box size={18} />, category: '运行时' },
  { name: 'Vite', icon: <ZapIcon />, category: '构建工具' },
]

function ZapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

// Simulated GitHub contribution grid
const githubWeeks = 26
const githubDays = 7
const githubData = Array.from({ length: githubWeeks }, () =>
  Array.from({ length: githubDays }, () => Math.floor(Math.random() * 5))
)

function CodeRainBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    const chars = '01ABCDEF<>{}[]=+-*/|;:.'
    const fontSize = 14
    const columns = Math.floor(w / fontSize)
    const drops: number[] = Array(columns).fill(0)

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
      drops.length = Math.floor(w / fontSize)
      drops.fill(0)
    }
    window.addEventListener('resize', resize)

    let raf: number
    const loop = () => {
      ctx.fillStyle = 'rgba(13, 17, 23, 0.1)'
      ctx.fillRect(0, 0, w, h)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const alpha = 0.3 + Math.random() * 0.5
        ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
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

export default function DevPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.dev-hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.dev-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.dev-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      )

      const items = gsap.utils.toArray<HTMLElement>('.dev-animate')
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Animate progress bars
      gsap.utils.toArray<HTMLElement>('.dev-progress-bar').forEach((bar) => {
        const width = bar.dataset.width
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${width}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 90%',
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
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <CodeRainBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <div className="dev-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <Code2 size={14} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-mono tracking-[0.15em] uppercase">
              全栈开发能力
            </span>
          </div>
          <h1 className="dev-hero-title text-5xl md:text-7xl font-serif text-warm mb-6 tracking-tight">
            编程开发
          </h1>
          <p className="dev-hero-sub text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            具备多语言编程能力，能利用Python进行数据分析、科学计算及任务自动化；
            掌握Java Web系统开发；熟练使用SQL进行数据库操作，并能在AI辅助下完成复杂开发任务。
          </p>
          <div className="dev-hero-sub mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-purple-400/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Language Proficiency */}
          <div className="dev-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={24} className="text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">语言熟练度</h2>
            </div>
            <div className="industrial-card p-6 space-y-6">
              {languages.map((lang, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-purple-400">{lang.icon}</span>
                      <span className="text-warm font-medium font-sans">{lang.name}</span>
                    </div>
                    <span className="text-purple-400 text-sm font-mono">{lang.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-base-elevated border border-border overflow-hidden">
                    <div
                      className="dev-progress-bar h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-400"
                      data-width={lang.level}
                      style={{ width: '0%' }}
                    />
                  </div>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{lang.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills from capabilityMap */}
          <div className="dev-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Layers size={24} className="text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">技能矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {devNode.subNodes.map((skill) => (
                <DarkExpandableCard
                  key={skill.id}
                  title={skill.label}
                  glowColor="ai"
                  keywords={
                    skill.level && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (skill.level || 0)
                                ? 'bg-purple-400'
                                : 'bg-warm-ghost/20'
                            }`}
                          />
                        ))}
                      </div>
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-purple-400/70" />
                    <span className="text-warm-muted text-sm font-sans">
                      熟练度等级 {skill.level}/5
                    </span>
                  </div>
                </DarkExpandableCard>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="dev-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Terminal size={24} className="text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">项目展示</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 hover:border-purple-400/20 transition-all"
                  style={{ boxShadow: 'none' }}
                >
                  <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-purple-400 mt-0.5 shrink-0" />
                        <span className="text-warm-muted text-xs font-sans">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Contribution Style */}
          <div className="dev-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <GitBranch size={24} className="text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">代码贡献热力图</h2>
            </div>
            <div className="industrial-card p-6 overflow-x-auto">
              <div className="flex gap-1 min-w-max">
                {githubData.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1">
                    {week.map((day, di) => {
                      const colors = [
                        'rgba(240,230,216,0.05)',
                        'rgba(139,92,246,0.2)',
                        'rgba(139,92,246,0.4)',
                        'rgba(139,92,246,0.6)',
                        'rgba(139,92,246,0.8)',
                      ]
                      return (
                        <div
                          key={di}
                          className="w-3 h-3 rounded-sm"
                          style={{ backgroundColor: colors[day] }}
                        />
                      )
                    })}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-warm-faint text-xs font-sans">Less</span>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-sm"
                    style={{
                      backgroundColor: [
                        'rgba(240,230,216,0.05)',
                        'rgba(139,92,246,0.2)',
                        'rgba(139,92,246,0.4)',
                        'rgba(139,92,246,0.6)',
                        'rgba(139,92,246,0.8)',
                      ][i],
                    }}
                  />
                ))}
                <span className="text-warm-faint text-xs font-sans">More</span>
              </div>
            </div>
          </div>

          {/* Tool Stack Grid */}
          <div className="dev-animate">
            <div className="flex items-center gap-3 mb-8">
              <Box size={24} className="text-purple-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">工具栈</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {toolStack.map((tool, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-5 text-center group hover:border-purple-400/20 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-warm text-sm font-medium font-sans">{tool.name}</p>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Play,
  Film,
  Sparkles,
  Wand2,
  UserCircle,
  Factory,
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
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DarkExpandableCard from '@components/DarkExpandableCard'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const mediaNode = capabilityData.mainNodes.find((n) => n.id === 'media')!

const platforms = [
  {
    name: '哔哩哔哩',
    followers: '12,000+',
    content: '技术教程、AI应用、视频修复',
    representative: '《钢铁是怎样炼成的》4K修复（200万+播放）',
    icon: <Play size={24} />,
    color: '#00A1D6',
  },
  {
    name: '抖音',
    followers: '4,900+',
    content: '短视频技术分享、AI工具演示',
    representative: '切片1500万+',
    icon: <Video size={24} />,
    color: '#FE2C55',
  },
  {
    name: '小红书',
    followers: '4,600+',
    content: 'AI工具使用攻略、学习心得',
    representative: '笔记总阅读量10万+',
    icon: <Image size={24} />,
    color: '#FF2442',
  },
]

const projects = [
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
  },
]

const tools = [
  { name: 'Premiere Pro', icon: <Clapperboard size={18} />, category: '剪辑' },
  { name: 'After Effects', icon: <Sparkles size={18} />, category: '特效' },
  { name: 'Photoshop', icon: <Palette size={18} />, category: '图像' },
  { name: 'Audition', icon: <Mic size={18} />, category: '音频' },
  { name: '剪映', icon: <Scissors size={18} />, category: '剪辑' },
  { name: 'ComfyUI', icon: <Wand2 size={18} />, category: 'AI工作流' },
  { name: 'D-ID', icon: <UserCircle size={18} />, category: '数字人' },
  { name: 'Topaz Video AI', icon: <MonitorPlay size={18} />, category: 'AI修复' },
]

const pipelineSteps = [
  { title: '内容采集', desc: 'OmniScraper / 热点监控', icon: <TrendingUp size={16} /> },
  { title: '素材处理', desc: '4K修复 / AI增强', icon: <Wand2 size={16} /> },
  { title: '内容创作', desc: '剪辑 / 特效 / 配音', icon: <Film size={16} /> },
  { title: 'AI生成', desc: '数字人 / 语音克隆', icon: <Sparkles size={16} /> },
  { title: '多平台分发', desc: 'B站 / 抖音 / 小红书', icon: <Play size={16} /> },
]

function MediaParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
    }

    const particles: Particle[] = []
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: 1 + Math.random() * 3,
        alpha: 0.2 + Math.random() * 0.5,
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

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(236, 72, 153, ${p.alpha})`
        ctx.fill()
      }

      // Draw film strips
      const t = Date.now() * 0.001
      for (let i = 0; i < 3; i++) {
        const y = h * 0.3 + i * h * 0.2 + Math.sin(t + i) * 30
        ctx.beginPath()
        ctx.moveTo(0, y)
        for (let x = 0; x < w; x += 10) {
          ctx.lineTo(x, y + Math.sin(x * 0.02 + t * 2 + i) * 5)
        }
        ctx.strokeStyle = `rgba(236, 72, 153, ${0.05 + i * 0.02})`
        ctx.lineWidth = 2
        ctx.stroke()
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

export default function MediaPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.media-hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.media-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.media-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      )

      const items = gsap.utils.toArray<HTMLElement>('.media-animate')
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
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={contentRef} className="relative">
      {/* Hero */}
      <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <MediaParticlesBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <div className="media-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <Film size={14} className="text-pink-400" />
            <span className="text-pink-400 text-xs font-mono tracking-[0.15em] uppercase">
              内容创作与平台运营
            </span>
          </div>
          <h1 className="media-hero-title text-5xl md:text-7xl font-serif text-warm mb-6 tracking-tight">
            自媒体特种技术
          </h1>
          <p className="media-hero-sub text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            具备完整的自媒体运营能力，从内容采集、视频修复到多平台分发，
            掌握数据驱动的内容策略与粉丝运营方法。
          </p>
          <div className="media-hero-sub mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-pink-400/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Platform Stats */}
          <div className="media-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={24} className="text-pink-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">平台数据</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {platforms.map((plat, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 hover:border-pink-400/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-pink-400">{plat.icon}</span>
                    <div>
                      <h3 className="text-lg font-serif text-warm">{plat.name}</h3>
                    </div>
                  </div>
                  <p className="text-pink-400 text-3xl font-mono font-bold mb-1">
                    {plat.followers}
                  </p>
                  <p className="text-warm-faint text-xs font-sans mb-4">粉丝</p>
                  <p className="text-warm-muted text-sm mb-3 font-sans">{plat.content}</p>
                  <div className="pt-3 border-t border-border">
                    <p className="text-warm-faint text-xs font-mono mb-1">代表作品</p>
                    <p className="text-warm text-sm font-sans">{plat.representative}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills from capabilityMap */}
          <div className="media-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={24} className="text-pink-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">技能矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {mediaNode.subNodes.map((skill) => (
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
                                ? 'bg-pink-400'
                                : 'bg-warm-ghost/20'
                            }`}
                          />
                        ))}
                      </div>
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp size={16} className="text-pink-400/70" />
                    <span className="text-warm-muted text-sm font-sans">
                      熟练度等级 {skill.level}/5
                    </span>
                  </div>
                </DarkExpandableCard>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="media-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Clapperboard size={24} className="text-pink-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">项目展示</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 hover:border-pink-400/20 transition-all"
                >
                  <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {proj.workflow && (
                    <div className="mb-4">
                      <p className="text-warm-faint text-xs font-mono uppercase tracking-wider mb-2">
                        工作流
                      </p>
                      <div className="flex flex-wrap items-center gap-1">
                        {proj.workflow.map((step, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <span className="text-warm-muted text-xs font-sans">{step}</span>
                            {i < proj.workflow.length - 1 && (
                              <ArrowRight size={10} className="text-warm-faint" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {proj.impact && (
                    <div className="space-y-2">
                      {proj.impact.map((imp, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <TrendingUp size={14} className="text-pink-400 mt-0.5 shrink-0" />
                          <span className="text-warm-muted text-xs font-sans">{imp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {proj.highlights && (
                    <div className="space-y-2">
                      {proj.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-pink-400 mt-0.5 shrink-0" />
                          <span className="text-warm-muted text-xs font-sans">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tool Stack */}
          <div className="media-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Wand2 size={24} className="text-pink-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">工具栈</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-5 text-center group hover:border-pink-400/20 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400 group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <p className="text-warm text-sm font-medium font-sans">{tool.name}</p>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Content Pipeline */}
          <div className="media-animate">
            <div className="flex items-center gap-3 mb-8">
              <Factory size={24} className="text-pink-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">内容生产流水线</h2>
            </div>
            <div className="industrial-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-2">
                {pipelineSteps.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-2 w-full md:w-auto">
                    <div className="flex-1 md:flex-none text-center p-4 rounded-xl bg-base-elevated border border-border hover:border-pink-400/20 transition-colors">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
                        {step.icon}
                      </div>
                      <p className="text-warm text-sm font-medium font-sans">{step.title}</p>
                      <p className="text-warm-faint text-xs mt-1 font-sans">{step.desc}</p>
                    </div>
                    {idx < pipelineSteps.length - 1 && (
                      <ArrowRight size={16} className="text-warm-faint hidden md:block shrink-0" />
                    )}
                    {idx < pipelineSteps.length - 1 && (
                      <ArrowRight size={16} className="text-warm-faint md:hidden rotate-90 mx-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Case Study */}
          {mediaNode.caseStudy && (
            <div className="media-animate mt-20">
              <div className="industrial-card p-6 md:p-8 hover:border-pink-400/20 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <MonitorPlay size={24} className="text-pink-400" />
                  <h3 className="text-xl font-serif text-warm">{mediaNode.caseStudy.title}</h3>
                </div>
                <p className="text-warm-muted text-sm leading-relaxed mb-6 font-sans">
                  {mediaNode.caseStudy.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(mediaNode.caseStudy.metrics || {}).map(([k, v], i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-lg bg-base-elevated border border-border"
                    >
                      <p className="text-pink-400 text-xl font-mono font-medium">{v}</p>
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

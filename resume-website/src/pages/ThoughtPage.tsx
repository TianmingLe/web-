import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  Brain,
  Compass,
  Lightbulb,
  Target,
  Users,
  Shield,
  Wrench,
  Quote,
  Star,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  Award,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DarkExpandableCard from '@components/DarkExpandableCard'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const thoughtNode = capabilityData.mainNodes.find((n) => n.id === 'thinking')!

const philosophies = [
  {
    title: '辩证唯物主义',
    desc: '以辩证唯物主义与毛泽东思想为指导思想，运用矛盾分析法看待技术发展与工程实践中的问题，把握事物发展的内在规律。',
    icon: <BookOpen size={20} />,
  },
  {
    title: 'Vibe Coding',
    desc: '掌握与AI高效协作的方法论，负责需求分析、架构设计、代码审查；AI负责代码生成、单元测试、文档编写，实现人机协同的最优解。',
    icon: <Lightbulb size={20} />,
  },
  {
    title: '前瞻总体布局',
    desc: '站在行业前沿进行技术选型与职业规划，注重长期价值与可持续发展，在能源+AI交叉领域寻找创新突破点。',
    icon: <Compass size={20} />,
  },
]

const projects = [
  {
    title: '团队协作项目',
    desc: '在多个竞赛中担任核心成员，负责模型构建、数据分析、Web开发、PPT制作与路演，具备出色的项目执行力和团队协作精神。',
    tags: ['数学建模', '市场调查', '英语视频'],
    highlights: [
      '数学建模竞赛省级一等奖（负责模型构建与数据分析）',
      '市场调查与分析大赛省级一等奖',
      '英语高教杯视频制作比赛校级二等奖',
    ],
  },
  {
    title: '技术选型决策',
    desc: 'video-claw → video-tezhong：初版自己手搓耗时半个月功能有限，第二版整合MediaCrawler（成熟爬虫）+ omi（数据框架），开发效率提升3倍，功能更强大。',
    tags: ['技术选型', '开源评估', 'ROI分析'],
    highlights: [
      '成熟度评估：GitHub stars、社区活跃度、文档完整度',
      '可维护性：代码质量、测试覆盖率、更新频率',
      '可扩展性：插件机制、API设计、模块化程度',
    ],
  },
  {
    title: '创新方法论实践',
    desc: '善于运用新技术解决传统问题，在能源动力专业背景下积极探索AI技术应用，形成跨界创新的独特优势。',
    tags: ['跨界创新', 'AI+能源', '方法论'],
    highlights: [
      '能源动力专业背景 + AI技术应用能力',
      '扎实的仿真与设计能力',
      '快速掌握新知识与技能',
    ],
  },
]

const skills = [
  { name: '项目管理', desc: 'PERT / 甘特图 / 进度控制', icon: <Target size={16} />, level: 4 },
  { name: '工程经济学', desc: 'ROI / NPV / 成本效益分析', icon: <TrendingUp size={16} />, level: 4 },
  { name: '风险评估', desc: '风险识别 / 量化分析 / 应对策略', icon: <Shield size={16} />, level: 4 },
  { name: '技术选型', desc: '开源生态评估 / 架构设计', icon: <Wrench size={16} />, level: 5 },
]

const quotes = [
  {
    text: '站在巨人肩膀上，而非重复造轮子。',
    source: '技术选型原则',
  },
  {
    text: '我负责需求分析与架构设计，AI负责代码生成与测试。',
    source: 'Vibe Coding 方法论',
  },
  {
    text: '辩证唯物主义+毛泽东思想（指导思想）。',
    source: '核心指导思想',
  },
]

function MindParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface Orb {
      x: number
      y: number
      r: number
      vx: number
      vy: number
      alpha: number
    }

    const orbs: Orb[] = []
    for (let i = 0; i < 30; i++) {
      orbs.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 20 + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: 0.03 + Math.random() * 0.05,
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

      for (const orb of orbs) {
        orb.x += orb.vx
        orb.y += orb.vy
        if (orb.x < -orb.r) orb.x = w + orb.r
        if (orb.x > w + orb.r) orb.x = -orb.r
        if (orb.y < -orb.r) orb.y = h + orb.r
        if (orb.y > h + orb.r) orb.y = -orb.r

        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r)
        grad.addColorStop(0, `rgba(16, 185, 129, ${orb.alpha})`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2)
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

export default function ThoughtPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.thought-hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.thought-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.thought-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      )

      const items = gsap.utils.toArray<HTMLElement>('.thought-animate')
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
        <MindParticlesBg />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <div className="thought-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <Brain size={14} className="text-emerald-400" />
            <span className="text-emerald-400 text-xs font-mono tracking-[0.15em] uppercase">
              认知升级与方法论沉淀
            </span>
          </div>
          <h1 className="thought-hero-title text-5xl md:text-7xl font-media-title text-warm mb-6 tracking-tight">
            思想领域高度
          </h1>
          <p className="thought-hero-sub text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            不仅关注技术实现，更注重思维模式的构建与认知框架的升级。
            在职业规划、开发方法论、项目管理等领域形成系统化的思考体系。
          </p>
          <div className="thought-hero-sub mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-emerald-400/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Philosophy Cards */}
          <div className="thought-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb size={24} className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">哲学思想</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {philosophies.map((phil, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 hover:border-emerald-400/20 transition-all"
                >
                  <div className="w-12 h-12 mb-4 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    {phil.icon}
                  </div>
                  <h3 className="text-lg font-serif text-warm mb-3">{phil.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed font-sans">
                    {phil.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills from capabilityMap */}
          <div className="thought-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Star size={24} className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">技能矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {thoughtNode.subNodes.map((skill) => (
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
                                ? 'bg-emerald-400'
                                : 'bg-warm-ghost/20'
                            }`}
                          />
                        ))}
                      </div>
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Award size={16} className="text-emerald-400/70" />
                    <span className="text-warm-muted text-sm font-sans">
                      熟练度等级 {skill.level}/5
                    </span>
                  </div>
                </DarkExpandableCard>
              ))}
            </div>
          </div>

          {/* Core Skills */}
          <div className="thought-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Target size={24} className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">核心能力</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-5 text-center hover:border-emerald-400/20 transition-all"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    {skill.icon}
                  </div>
                  <p className="text-warm text-sm font-medium font-sans">{skill.name}</p>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{skill.desc}</p>
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full ${
                          i < skill.level ? 'bg-emerald-400' : 'bg-warm-ghost/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="thought-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Users size={24} className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">项目实践</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 hover:border-emerald-400/20 transition-all"
                >
                  <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-warm-muted text-xs font-sans">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quotes */}
          <div className="thought-animate">
            <div className="flex items-center gap-3 mb-8">
              <Quote size={24} className="text-emerald-400" />
              <h2 className="text-2xl md:text-3xl font-serif text-warm">座右铭</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotes.map((q, idx) => (
                <div
                  key={idx}
                  className="industrial-card p-6 relative hover:border-emerald-400/20 transition-all"
                >
                  <Quote
                    size={32}
                    className="absolute top-4 left-4 text-emerald-400/10"
                  />
                  <p className="text-warm text-base leading-relaxed font-serif italic mb-4 pt-6">
                    "{q.text}"
                  </p>
                  <p className="text-warm-faint text-xs font-mono">— {q.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

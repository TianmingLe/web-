import { useRef, useState, useEffect } from 'react'
import {
  Calendar,
  Layers,
  Zap,
  BookOpen,
  Sparkles,
  Tag,
  Hash,
  Brain,
  Cpu,
  TrendingUp,
  Target,
  Award,
  Quote,
} from 'lucide-react'
import aiData from '@data/ai.json'
import ExpandableCard from '@components/ExpandableCard'
import { useIntersection } from '@hooks/useIntersection'
import ParticleGrid from '@components/ParticleGrid'
import TextScramble from '@components/TextScramble'
import CursorGlow from '@components/CursorGlow'
import ParallaxLayer from '@components/ParallaxLayer'
import GlitchText from '@components/GlitchText'
import MediaBackground from '@components/MediaBackground'
import ProjectShowcase from '@components/ProjectShowcase'

/* ─── 示例媒体数据 ─── */
const heroMedia = {
  src: '/images/ai-hero-bg.jpg',
  type: 'image' as const,
}

const projectMedia: Record<string, { src: string; type: 'image' | 'video'; caption?: string }[]> = {
  smart_glasses: [
    { src: '/images/smart-glasses-1.jpg', type: 'image', caption: '智能眼镜硬件原型' },
    { src: '/images/smart-glasses-demo.mp4', type: 'video', caption: '实时演示视频' },
    { src: '/images/smart-glasses-2.jpg', type: 'image', caption: '系统架构图' },
  ],
  zhixin_ai: [
    { src: '/images/zhixin-ai-1.jpg', type: 'image', caption: '知心AI对话界面' },
    { src: '/images/zhixin-ai-2.jpg', type: 'image', caption: 'RAG检索流程' },
  ],
}

interface Phase {
  name: string
  period: string
  desc: string
}

interface Ability {
  category: string
  items: string[]
}

interface Project {
  id: string
  title: string
  tags: string[]
  summary: string
  period?: string
  version?: string
  keywords?: string
  highlights?: string[]
  phases?: Phase[]
  abilities?: Ability[]
  scenarios?: string[]
  topics?: string[]
}

/* ─── 进化时间线数据 ─── */
const evoSteps = [
  {
    label: '基础探索',
    icon: BookOpen,
    title: '大模型入门',
    description:
      '完成书生·浦语大模型实战营，在A100上训练基于InternLM的微调角色模型，掌握LoRA、DeepSpeed等核心技术。',
  },
  {
    label: '能力进阶',
    icon: Brain,
    title: 'Prompt工程与智能体',
    description:
      '精通CoT、Few-shot等Prompt框架，掌握Agent架构设计，熟悉ComfyUI/n8n工作流编排与MCP工具注册。',
  },
  {
    label: '工程落地',
    icon: Cpu,
    title: '智能体全栈开发',
    description:
      '独立完成知心AI（Spring AI + RAG + ReAct）与智能眼镜系统（ESP32 + Flutter + FastAPI），实现从算法到产品的完整闭环。',
  },
  {
    label: '生态扩展',
    icon: Sparkles,
    title: 'AIGC与多模态',
    description:
      '掌握数字人、语音克隆、AI音乐、Midjourney/SD绘画等AIGC技术，能独立完成从创意到成品的全流程。',
  },
]

/* ─── 统计数字 ─── */
const stats = [
  { label: '项目实践', value: 5, suffix: '', icon: Target },
  { label: '技术标签', value: 20, suffix: '+', icon: Hash },
  { label: '开发阶段', value: 12, suffix: '', icon: Layers },
  { label: '核心指标', value: 14, suffix: '+', icon: TrendingUp },
]

/* ─── 技能进度条数据 ─── */
const skillBars = [
  { label: '大模型微调', value: 85 },
  { label: 'RAG检索系统', value: 92 },
  { label: '智能体开发', value: 90 },
  { label: 'Prompt工程', value: 95 },
  { label: 'AIGC应用', value: 80 },
]

/* ─── 环形指示器 ─── */
function CircularIndicator({
  percentage,
  label,
  color = 'terracotta',
}: {
  percentage: number
  label: string
  color?: 'terracotta' | 'sage' | 'slate'
}) {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.3 })
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = isVisible
    ? circumference - (percentage / 100) * circumference
    : circumference

  const colorMap = {
    terracotta: 'stroke-b-terracotta',
    sage: 'stroke-b-sage',
    slate: 'stroke-b-slate',
  }

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <div className="relative w-20 h-20">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            className="stroke-b-sand"
            strokeWidth="5"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            className={`${colorMap[color]} transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-b-mono text-sm text-b-ink font-semibold">
            {percentage}%
          </span>
        </div>
      </div>
      <span className="font-b-sans text-xs text-b-muted">{label}</span>
    </div>
  )
}

/* ─── 杂志风格 Hero ─── */
function MagazineHero() {
  return (
    <div className="relative mb-16 md:mb-24 b-fade-up">
      {/* 图片/视频背景层 - 替换粒子网格 */}
      <MediaBackground
        src={heroMedia.src}
        type={heroMedia.type}
        overlay
        overlayOpacity={0.85}
        overlayColor="var(--color-b-cream)"
        parallax
        parallaxSpeed={0.3}
        className="absolute inset-0 rounded-2xl"
      />

      {/* 粒子网格叠加 */}
      <ParticleGrid />

      {/* 浮动装饰元素 */}
      <div className="absolute -top-8 -left-4 md:left-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-b-terracotta/[0.04] blur-2xl pointer-events-none" />
      <div className="absolute top-1/2 -right-8 md:-right-12 w-32 h-32 md:w-48 md:h-48 rounded-full bg-b-sage/[0.05] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-4 left-1/3 w-20 h-20 rounded-full bg-b-slate/[0.04] blur-2xl pointer-events-none" />

      {/* 几何装饰 */}
      <div className="absolute top-0 right-0 md:right-8 w-16 h-16 md:w-24 md:h-24 border border-b-terracotta/10 rotate-12 pointer-events-none animate-float-slow" />
      <div className="absolute bottom-4 left-0 md:left-4 w-10 h-10 border border-b-sage/15 -rotate-12 pointer-events-none animate-float-slow-reverse" />
      <div className="absolute top-8 right-1/4 w-2 h-2 rounded-full bg-b-terracotta/20 pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-8 right-1/3 w-1.5 h-1.5 rounded-full bg-b-sage/25 pointer-events-none animate-pulse-soft" style={{ animationDelay: '1s' }} />

      {/* 扫描线效果 */}
      <div className="scanline-overlay rounded-2xl" />

      {/* 装饰性边框容器 */}
      <div className="relative border border-b-border/60 bg-b-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden breathing-border">
        {/* 角落装饰 */}
        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-b-terracotta/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-b-terracotta/20 rounded-tr-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-b-terracotta/20 rounded-bl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-b-terracotta/20 rounded-br-2xl pointer-events-none" />

        {/* 内部纹理线条 */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, var(--color-b-terracotta) 35px, var(--color-b-terracotta) 36px)`
        }} />

        {/* 数据流装饰线 */}
        <div className="absolute top-4 left-0 right-0 h-px data-stream opacity-30" />
        <div className="absolute bottom-4 left-0 right-0 h-px data-stream opacity-30" style={{ animationDelay: '1s' }} />

        <div className="relative z-10">
          {/* 顶部标签栏 */}
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <div className="flex items-center gap-3">
              <span className="b-ornament" />
              <span className="font-b-mono text-[10px] md:text-[11px] tracking-[0.25em] text-b-muted uppercase">
                <TextScramble text={aiData.subtitle} delay={200} duration={800} />
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="w-8 h-px bg-b-sand" />
              <span className="font-b-mono text-[10px] text-b-muted">
                <TextScramble text="Vol. 01" delay={600} duration={600} />
              </span>
            </div>
          </div>

          {/* 大号标题 */}
          <div className="mb-6 md:mb-8">
            <h1 className="font-b-serif text-5xl md:text-7xl lg:text-8xl text-b-ink leading-[1.05] tracking-tight mb-4">
              <GlitchText
                text={aiData.title}
                as="span"
                className="block"
              />
            </h1>
            <div className="flex items-center gap-4">
              <span className="block w-12 md:w-20 h-0.5 bg-gradient-to-r from-b-terracotta to-b-terracotta-light" />
              <span className="font-b-mono text-[10px] text-b-muted tracking-widest uppercase typewriter-cursor">
                Artificial Intelligence Frontier
              </span>
            </div>
          </div>

          {/* 渐变文字描述 */}
          <div className="max-w-2xl">
            <p className="font-b-sans text-base md:text-lg text-b-ink-light leading-relaxed mb-6">
              <span className="text-gradient-magazine">
                {aiData.description.slice(0, 20)}
              </span>
              {aiData.description.slice(20)}
            </p>
          </div>

          {/* 底部装饰线 */}
          <div className="flex items-center gap-3 mt-8">
            <span className="w-2 h-2 rounded-full bg-b-terracotta/30 ripple-effect" />
            <span className="flex-1 h-px bg-gradient-to-r from-b-sand via-b-border to-transparent" />
            <span className="w-2 h-2 rounded-full bg-b-sage/30 ripple-effect" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 数据可视化统计区域 ─── */
function StatsSection() {
  const [ref, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.2 })

  return (
    <div ref={ref} className="b-fade-up mb-16 md:mb-20">
      <div className="relative border border-b-border/50 rounded-2xl p-6 md:p-10 bg-gradient-to-br from-b-card/80 to-b-cream-dark/30 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-b-terracotta/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-b-sage/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
              <TrendingUp size={18} className="text-b-terracotta" />
            </div>
            <div>
              <h3 className="font-b-serif text-xl text-b-ink">能力概览</h3>
              <p className="text-b-muted text-sm font-b-sans">数据驱动的技术成长轨迹</p>
            </div>
          </div>

          {/* 大号数字统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className={`text-center b-fade-up b-stagger-${i + 1}`}
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-b-cream-dark border border-b-border mx-auto mb-3">
                    <Icon size={20} className="text-b-terracotta" />
                  </div>
                  <div className="font-b-serif text-4xl md:text-5xl text-b-ink tracking-tight mb-1">
                    {isVisible ? (
                      <CountUp end={stat.value} duration={1500} />
                    ) : (
                      '0'
                    )}
                    <span className="text-b-terracotta">{stat.suffix}</span>
                  </div>
                  <span className="font-b-sans text-xs text-b-muted uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* 进度条 */}
          <div className="space-y-4 mb-10">
            {skillBars.map((skill, i) => (
              <div key={skill.label} className={`b-fade-up b-stagger-${i + 1}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-b-sans text-sm text-b-ink">{skill.label}</span>
                  <span className="font-b-mono text-xs text-b-muted">{skill.value}%</span>
                </div>
                <div className="b-progress-bar h-2 rounded-full">
                  <div
                    className="b-progress-fill h-full rounded-full transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      width: isVisible ? `${skill.value}%` : '0%',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 环形指示器 */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-6 border-t border-b-border/50">
            <CircularIndicator percentage={92} label="RAG准确率" color="terracotta" />
            <CircularIndicator percentage={98} label="工具调用" color="sage" />
            <CircularIndicator percentage={95} label="用户满意度" color="slate" />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 数字递增动画组件 ─── */
function CountUp({ end, duration = 1500 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const startTime = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp
      const progress = Math.min((timestamp - startTime.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration])

  return <>{count}</>
}

/* ─── 杂志风格引用块 ─── */
function MagazineQuote() {
  return (
    <ParallaxLayer speed={0.3}>
      <div className="b-fade-up my-16 md:my-20">
        <div className="relative max-w-3xl mx-auto px-6 md:px-12">
          {/* 大引号装饰 */}
          <div className="absolute -top-4 left-0 md:-left-4 text-b-terracotta/10 pointer-events-none">
            <Quote size={80} strokeWidth={1} />
          </div>
          <div className="absolute -bottom-4 right-0 md:-right-4 text-b-terracotta/10 pointer-events-none rotate-180">
            <Quote size={80} strokeWidth={1} />
          </div>

          <blockquote className="relative z-10 text-center">
            <p className="font-b-serif text-xl md:text-2xl lg:text-3xl text-b-ink leading-relaxed italic mb-6">
              <TextScramble
                text="在算法与工程的交汇处，构建能够理解世界、辅助决策的智能系统"
                delay={400}
                duration={1500}
              />
            </p>
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-b-terracotta/30" />
              <span className="font-b-mono text-[10px] text-b-muted tracking-[0.2em] uppercase">
                <TextScramble text="AI Engineering Philosophy" delay={800} duration={800} />
              </span>
              <span className="w-8 h-px bg-b-terracotta/30" />
            </div>
          </blockquote>
        </div>
      </div>
    </ParallaxLayer>
  )
}

/* ─── 首字下沉段落 ─── */
function DropCapParagraph({ text }: { text: string }) {
  const firstChar = text.charAt(0)
  const rest = text.slice(1)

  return (
    <p className="font-b-sans text-sm md:text-base text-b-ink-light leading-[1.8]">
      <span className="float-left font-b-serif text-5xl md:text-6xl text-b-terracotta leading-[0.8] mr-3 mt-1">
        {firstChar}
      </span>
      {rest}
    </p>
  )
}

/* ─── 进化时间线（精致版） ─── */
function EvolutionTimeline() {
  const [lineRef, lineVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 })

  return (
    <div className="b-fade-up mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
          <Layers size={18} className="text-b-terracotta" />
        </div>
        <div>
          <h3 className="font-b-serif text-xl text-b-ink">从模型学习到工程落地</h3>
          <p className="text-b-muted text-sm font-b-sans">AI技术能力的渐进式成长路径</p>
        </div>
      </div>

      <div ref={lineRef} className="relative pl-10">
        {/* 动画连接线 */}
        <div
          className="absolute left-[15px] top-0 bottom-0 w-px bg-gradient-to-b from-b-terracotta via-b-terracotta-light to-b-sand origin-top transition-transform duration-[2s] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            transform: lineVisible ? 'scaleY(1)' : 'scaleY(0)',
          }}
        />

        {evoSteps.map((step, i) => {
          const Icon = step.icon
          return (
            <div
              key={step.label}
              className={`relative pb-8 last:pb-0 b-fade-up b-stagger-${i + 1}`}
            >
              {/* 脉冲节点 */}
              <div className="absolute left-[11px] top-[4px]">
                <div className="b-timeline-dot-pulse" />
                <div className="b-timeline-dot" style={{ position: 'relative', left: 0, top: 0 }} />
              </div>

              <div className="b-card b-card-terracotta p-5 ml-4 group hover:translate-y-[-2px]">
                {/* 装饰角标 */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-[var(--radius-lg)]">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-b-terracotta/[0.06] rotate-45 translate-x-6 -translate-y-6 group-hover:bg-b-terracotta/[0.1] transition-colors duration-300" />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-b-terracotta-dim group-hover:scale-110 transition-transform duration-300">
                    <Icon size={15} className="text-b-terracotta" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="b-tag b-tag-terracotta text-[11px]">{step.label}</span>
                    <span className="font-b-serif text-base text-b-ink">{step.title}</span>
                  </div>
                </div>
                <p className="text-b-ink-light text-sm leading-relaxed font-b-sans pl-11">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── 3D 倾斜卡片包装 ─── */
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'
  }

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

/* ─── 光泽扫过效果卡片 ─── */
function ShimmerCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden group ${className}`}>
      {children}
      {/* 光泽扫过层 */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none">
        <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
    </div>
  )
}

/* ─── 重点项目卡片 ─── */
function MajorProjectCard({ project, index }: { project: Project; index: number }) {
  const media = projectMedia[project.id]

  return (
    <div className={`b-fade-up b-stagger-${index + 1}`}>
      <TiltCard>
        <ShimmerCard>
          <ExpandableCard
            title={
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-b-slate-dim">
                  <Cpu size={15} className="text-b-slate" />
                </div>
                <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
                  {project.title}
                </h3>
              </div>
            }
            badges={
              <div className="flex flex-wrap items-center gap-2">
                {project.period && (
                  <span className="b-tag b-tag-slate">
                    <Calendar size={12} />
                    <span className="font-b-mono text-[11px]">{project.period}</span>
                  </span>
                )}
                {project.version && (
                  <span className="font-b-mono text-[11px] text-b-slate-light bg-b-slate-dim px-3 py-1 rounded-full">
                    {project.version}
                  </span>
                )}
              </div>
            }
            keywords={
              <>
                {project.tags.slice(0, 4).map((tag, i) => (
                  <span key={i} className="b-tag b-tag-terracotta">{tag}</span>
                ))}
              </>
            }
            subtitle={
              project.summary.length > 80
                ? project.summary.slice(0, 80) + '…'
                : project.summary
            }
            cardClass="b-card b-card-slate relative"
          >
            {/* 装饰角标 */}
            <div className="absolute top-0 right-0 w-10 h-10 overflow-hidden rounded-tr-[var(--radius-lg)] pointer-events-none">
              <div className="absolute top-0 right-0 w-16 h-16 bg-b-slate/[0.05] rotate-45 translate-x-8 -translate-y-8" />
            </div>

            {/* 项目媒体展示 */}
            {media && media.length > 0 && (
              <div className="mb-5">
                <ProjectShowcase items={media} />
              </div>
            )}

            <p className="text-b-ink-light text-sm leading-[1.8] font-b-sans mb-5 max-w-3xl">
              {project.summary}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Zap size={15} className="text-b-terracotta" />
                  <span className="font-b-serif text-sm text-b-ink">核心指标</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.highlights.map((h, i) => (
                    <span key={i} className="b-tag b-tag-slate">
                      <Zap size={10} className="shrink-0" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.phases && project.phases.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-4">
                  <Layers size={15} className="text-b-slate" />
                  <span className="font-b-serif text-sm text-b-ink">开发阶段</span>
                  <span className="b-ornament" />
                  <span className="font-b-mono text-[11px] text-b-muted">
                    {project.phases.length} phases
                  </span>
                </div>

                <div className="relative pl-7">
                  <div className="b-timeline-line" />

                  {project.phases.map((phase, i) => (
                    <div key={i} className="relative pb-5 last:pb-0">
                      <div className="b-timeline-dot" style={{ top: '4px' }} />
                      <div className="ml-4">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="font-b-serif text-sm text-b-ink">{phase.name}</span>
                          <span className="font-b-mono text-[11px] text-b-muted bg-b-cream-dark px-2 py-0.5 rounded">
                            {phase.period}
                          </span>
                        </div>
                        <p className="text-b-ink-light text-xs leading-relaxed font-b-sans">
                          {phase.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-b-border">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span key={i} className="b-tag b-tag-terracotta">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ExpandableCard>
        </ShimmerCard>
      </TiltCard>
    </div>
  )
}

/* ─── 次要项目卡片 ─── */
function MinorProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`b-fade-up b-stagger-${(index % 4) + 1}`}>
      <TiltCard>
        <ShimmerCard>
          <ExpandableCard
            title={
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-b-sage-dim">
                  <Sparkles size={13} className="text-b-sage" />
                </div>
                <h4 className="font-b-serif text-lg text-b-ink leading-snug">{project.title}</h4>
              </div>
            }
            keywords={
              <>
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="b-tag b-tag-sage">{tag}</span>
                ))}
              </>
            }
            subtitle={
              project.summary.length > 80
                ? project.summary.slice(0, 80) + '…'
                : project.summary
            }
            cardClass="b-card b-card-sage relative"
          >
            {/* 装饰角标 */}
            <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-[var(--radius-lg)] pointer-events-none">
              <div className="absolute top-0 right-0 w-12 h-12 bg-b-sage/[0.05] rotate-45 translate-x-6 -translate-y-6" />
            </div>

            {project.period && (
              <div className="flex items-center gap-1.5 mb-3">
                <Calendar size={12} className="text-b-muted" />
                <span className="font-b-mono text-[11px] text-b-muted">{project.period}</span>
              </div>
            )}

            <p className="text-b-ink-light text-sm leading-relaxed font-b-sans mb-4">
              {project.summary}
            </p>

            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap size={13} className="text-b-terracotta" />
                  <span className="font-b-sans text-xs font-medium text-b-ink">核心成果</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.highlights.map((h, i) => (
                    <span key={i} className="b-tag b-tag-slate text-[11px]">
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.abilities && project.abilities.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-3">
                  <BookOpen size={13} className="text-b-sage" />
                  <span className="font-b-sans text-xs font-medium text-b-ink">能力矩阵</span>
                </div>
                <div className="space-y-3">
                  {project.abilities.map((ability, i) => (
                    <div key={i}>
                      <h5 className="font-b-serif text-sm text-b-sage mb-1.5">{ability.category}</h5>
                      <ul className="space-y-1">
                        {ability.items.map((item, j) => (
                          <li
                            key={j}
                            className="text-b-ink-light text-xs flex items-start gap-2 font-b-sans"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-b-sage mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.scenarios && project.scenarios.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Sparkles size={13} className="text-b-terracotta" />
                  <span className="font-b-sans text-xs font-medium text-b-ink">应用场景</span>
                </div>
                <ul className="space-y-1.5">
                  {project.scenarios.map((scenario, i) => (
                    <li
                      key={i}
                      className="text-b-ink-light text-xs flex items-start gap-2 font-b-sans"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta mt-1.5 shrink-0" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.topics && project.topics.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Tag size={13} className="text-b-sage" />
                  <span className="font-b-sans text-xs font-medium text-b-ink">学习主题</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.topics.map((topic, i) => (
                    <span key={i} className="b-tag b-tag-sage text-[11px]">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-b-border">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag, i) => (
                  <span key={i} className="b-tag b-tag-terracotta text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ExpandableCard>
        </ShimmerCard>
      </TiltCard>
    </div>
  )
}

/* ─── 技术栈云 ─── */
function SkillTagsSection() {
  return (
    <div className="b-fade-up">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
            <Brain size={18} className="text-b-terracotta" />
          </div>
          <h3 className="font-b-serif text-2xl text-b-ink">技术栈</h3>
        </div>
        <p className="text-b-muted text-sm font-b-sans">持续扩展中的AI技术能力图谱</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
        {aiData.skillTags.map((tag, index) => (
          <span
            key={index}
            className={`b-tag b-tag-terracotta b-fade-up b-stagger-${(index % 8) + 1} cursor-default hover:shadow-sm transition-all duration-300 hover:-translate-y-0.5`}
          >
            <Hash size={10} className="shrink-0 opacity-60" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── 分栏布局特色内容 ─── */
function FeatureColumns() {
  return (
    <div className="b-fade-up my-16 md:my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* 左栏：首字下沉段落 */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Award size={16} className="text-b-terracotta" />
            <h4 className="font-b-serif text-lg text-b-ink">技术理念</h4>
          </div>
          <DropCapParagraph text="深入掌握大语言模型、智能体开发、AIGC与嵌入式AI技术，具备从算法研究到工程落地的全链路能力。在实践过程中，始终坚持数据驱动的开发理念，注重系统架构的健壮性与可扩展性。" />
          <div className="mt-4 flex items-center gap-2">
            <span className="w-6 h-px bg-b-terracotta/30" />
            <span className="font-b-mono text-[10px] text-b-muted tracking-wider">ENGINEERING</span>
          </div>
        </div>

        {/* 右栏：分栏列表 */}
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <Target size={16} className="text-b-sage" />
            <h4 className="font-b-serif text-lg text-b-ink">核心方向</h4>
          </div>
          <div className="space-y-3">
            {[
              { label: '大模型应用', desc: '微调、RAG、Agent架构' },
              { label: '全栈开发', desc: 'Spring AI、FastAPI、Flutter' },
              { label: '嵌入式AI', desc: 'ESP32、TFLite Micro、边缘计算' },
              { label: 'AIGC创作', desc: '数字人、语音克隆、AI绘画' },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-3 group"
              >
                <span className="font-b-mono text-xs text-b-terracotta/60 mt-0.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 border-b border-b-border/50 pb-2 group-hover:border-b-terracotta/20 transition-colors duration-300">
                  <span className="font-b-sans text-sm text-b-ink font-medium">{item.label}</span>
                  <span className="font-b-sans text-xs text-b-muted ml-2">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── 主组件 ─── */
export default function AIB() {
  const projects = aiData.projects as Project[]

  const majorProjects = projects.filter((p) => p.phases && p.phases.length > 0)
  const minorProjects = projects.filter((p) => !p.phases || p.phases.length === 0)

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto relative">
      {/* 鼠标跟随光斑 */}
      <CursorGlow />

      {/* 纹理背景 */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-b-ink) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* 装饰线条 */}
      <div className="absolute top-32 left-0 w-px h-48 bg-gradient-to-b from-transparent via-b-terracotta/10 to-transparent pointer-events-none hidden lg:block" />
      <div className="absolute top-48 right-0 w-px h-32 bg-gradient-to-b from-transparent via-b-sage/10 to-transparent pointer-events-none hidden lg:block" />

      <div className="relative z-10">
        {/* 杂志风格 Hero */}
        <MagazineHero />

        {/* 数据可视化统计 */}
        <ParallaxLayer speed={-0.2}>
          <StatsSection />
        </ParallaxLayer>

        {/* 杂志引用块 */}
        <MagazineQuote />

        {/* 进化时间线 */}
        <EvolutionTimeline />

        <div className="b-divider" />

        {/* 分栏特色内容 */}
        <FeatureColumns />

        <div className="b-divider" />

        {/* 重点项目 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 b-fade-up">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-b-slate-dim">
              <Cpu size={16} className="text-b-slate" />
            </div>
            <div>
              <h3 className="font-b-serif text-xl text-b-ink">重点项目</h3>
              <p className="text-b-muted text-xs font-b-sans">从架构设计到工程交付的完整实践</p>
            </div>
          </div>

          <div className="space-y-8 card-stack-3d">
            {majorProjects.map((project, index) => (
              <MajorProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="b-divider-center" />

        {/* 更多探索 */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6 b-fade-up">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-b-sage-dim">
              <Sparkles size={16} className="text-b-sage" />
            </div>
            <div>
              <h3 className="font-b-serif text-xl text-b-ink">更多探索</h3>
              <p className="text-b-muted text-xs font-b-sans">AI领域的多元能力拓展</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {minorProjects.map((project, index) => (
              <MinorProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        <div className="b-divider" />

        {/* 技术栈 */}
        <SkillTagsSection />
      </div>
    </section>
  )
}

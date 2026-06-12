import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Zap, Brain, Code, Rocket, GraduationCap, MapPin, Activity, Phone, Mail, ChevronDown } from 'lucide-react'
import otherData from '@data/other.json'
import CapabilityMap from '@components/CapabilityMap'

const traits = [
  { icon: <Zap size={18} />, label: '工程专业能力', desc: 'ANSYS / AutoCAD / 实践操作技术' },
  { icon: <Brain size={18} />, label: 'AI技术应用', desc: 'Agent开发 / CC / Harness / Prompt工程' },
  { icon: <Code size={18} />, label: '数据驱动思维', desc: 'Python / SQL / 数据分析' },
  { icon: <Rocket size={18} />, label: '项目执行力', desc: '团队协作与竞赛获奖' },
]

const profile = {
  name: '胡亚伟',
  title: 'AI NATIVE GRADUATE',
  subtitle: '一名对能源动力技术与人工智能交叉领域充满热情的工科生',
  school: '山西大学 · 能源与动力工程',
  mbti: 'ENTJ-A',
  tagline: '扎实的专业能力 + 积极拥抱 AI 技术，探索赋能传统工业的创新解决方案',
}

const hudMetrics = [
  { label: '技术栈', value: '能源 × AI', status: 'active' as const },
  { label: '当前阶段', value: '本科在读', status: 'active' as const },
  { label: '核心领域', value: '能动 / AI / 自媒体', status: 'ai' as const },
]

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    case 'bilibili':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <path d="M8 2l3 4" />
          <path d="M16 2l-3 4" />
          <circle cx="9.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'xiaohongshu':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" rx="2" />
          <path d="M9 9l3 6 3-6" />
        </svg>
      )
    case 'douyin':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    default:
      return <span className="text-xs font-sans font-medium">{icon}</span>
  }
}

export default function HomePage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text staggered entrance with expoOut
      gsap.fromTo(
        '.home-title',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.3 }
      )
      gsap.fromTo(
        '.home-name',
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'expo.out', delay: 0.5 }
      )
      gsap.fromTo(
        '.home-subtitle',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.8 }
      )
      gsap.fromTo(
        '.home-tagline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 1.0 }
      )
      gsap.fromTo(
        '.home-meta',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 1.2 }
      )
      gsap.fromTo(
        '.home-traits',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 1.4 }
      )
      gsap.fromTo(
        '.home-hud',
        { y: 30, opacity: 0, scale: 0.98 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: 'expo.out', delay: 1.6 }
      )
    }, contentRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="hero-glow hero-glow-energy hidden md:block" style={{ top: '-20%', left: '10%' }} aria-hidden="true" />
      <div className="hero-glow hero-glow-ai hidden md:block" style={{ bottom: '-15%', right: '5%', opacity: 0.06 }} aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-5 md:px-6 w-full max-w-5xl mx-auto pt-24 pb-16 md:py-36"
      >
        {/* Title badge */}
        <p className="home-title text-[10px] md:text-xs text-energy-light font-mono font-medium tracking-[0.2em] md:tracking-[0.3em] uppercase mb-6 md:mb-8">
          {profile.title}
        </p>

        {/* Name */}
        <h1 className="home-name text-4xl md:text-7xl lg:text-8xl font-serif font-normal text-warm mb-4 md:mb-6 tracking-tight leading-[0.95]">
          <span className="text-gradient-warm">{profile.name}</span>
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle text-sm md:text-lg lg:text-xl text-warm-muted max-w-xl mb-2 md:mb-3 leading-relaxed font-sans">
          {profile.subtitle}
        </p>

        {/* Tagline */}
        <p className="home-tagline text-xs md:text-base text-warm-faint max-w-lg mb-6 md:mb-8 font-sans">
          {profile.tagline}
        </p>

        {/* Meta info */}
        <div className="home-meta flex flex-wrap items-center justify-center gap-2 md:gap-4 text-warm-faint text-xs md:text-sm mb-8 md:mb-12 font-sans">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={14} className="text-energy/60" />
            {profile.school}
          </span>
          <span className="text-warm-ghost">|</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-energy/60" />
            山西 · 太原
          </span>
          <span className="text-warm-ghost">|</span>
          <span className="font-mono text-energy-light/80">{profile.mbti}</span>
        </div>

        {/* Traits */}
        <div className="home-traits grid grid-cols-2 gap-2 md:gap-3 mb-10 md:mb-16 w-full max-w-lg md:max-w-none">
          {traits.map((trait, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 md:gap-2.5 px-3 py-2 md:px-4 md:py-2.5 hud-panel cursor-default"
              role="listitem"
              style={{ animationDelay: `${1.4 + index * 0.1}s` }}
            >
              <span className="text-energy/50 group-hover:text-energy transition-colors duration-300" aria-hidden="true">
                {trait.icon}
              </span>
              <div className="text-left">
                <span className="text-xs text-warm font-medium block leading-tight font-sans">
                  {trait.label}
                </span>
                <span className="text-[11px] text-warm-faint group-hover:text-warm-muted transition-colors duration-300 font-sans">
                  {trait.desc}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="home-hud w-full max-w-2xl mt-10 md:mt-16">
          <div className="hud-panel p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-energy" />
              <span className="section-label">系统状态</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hudMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1.5"
                >
                  <span className="text-[11px] text-warm-faint font-mono uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <span className={`status-indicator ${metric.status === 'active' ? 'status-active' : 'status-ai'} w-fit`}>
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-5 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-warm-faint font-mono uppercase tracking-wider">学习进度</span>
                <span className="text-[11px] text-energy-light font-mono">本科 · 进行中</span>
              </div>
              <div className="h-1 bg-warm-ghost/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-energy to-energy-light rounded-full"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>
        </div>

        <CapabilityMap />

        <div className="flex flex-col items-center gap-3 mt-8 mb-12">
          <span className="text-[10px] text-warm-faint font-mono tracking-[0.2em] uppercase">Scroll</span>
          <ChevronDown 
            size={16} 
            className="text-energy/60 animate-bounce" 
          />
        </div>

        <div className="w-full max-w-2xl">
          <div className="p-5 md:p-6 rounded-xl bg-surface/50 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Phone size={14} className="text-energy" />
              <span className="section-label">联系方式</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 mb-4">
              <div className="flex items-center gap-2">
                <Phone size={13} className="text-warm-faint" />
                <span className="text-warm text-sm font-sans">{otherData.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={13} className="text-warm-faint" />
                <span className="text-warm text-sm font-sans">{otherData.contact.email}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
              {otherData.contact.social.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-warm-ghost/5 border border-white/[0.06] flex items-center justify-center text-warm-faint hover:text-energy hover:border-energy/30 hover:bg-energy/5 transition-all"
                  aria-label={link.name}
                >
                  <SocialIcon icon={link.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

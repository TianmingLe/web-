import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Zap, Brain, Code, Rocket, GraduationCap, MapPin, ChevronDown, Phone, Mail, ExternalLink } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'
import otherData from '@data/other.json'
import CapabilityMapB from '@components/CapabilityMapB'
import MagazineTimeline from '@components/MagazineTimeline'
import BlurText from '@components/BlurText'

const traits = [
  {
    icon: <Zap size={20} />,
    label: '工程专业能力',
    desc: 'ANSYS / AutoCAD / 实践操作技术',
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
  },
  {
    icon: <Brain size={20} />,
    label: 'AI技术应用',
    desc: 'Agent开发 / CC / Harness / Prompt工程',
    cardClass: 'b-card-sage',
    tagClass: 'b-tag-sage',
  },
  {
    icon: <Code size={20} />,
    label: '数据驱动思维',
    desc: 'Python / SQL / 数据分析',
    cardClass: 'b-card-slate',
    tagClass: 'b-tag-slate',
  },
  {
    icon: <Rocket size={20} />,
    label: '项目执行力',
    desc: '团队协作与竞赛获奖',
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
  },
]

function SocialIcon({ icon }: { icon: string }) {
  switch (icon) {
    case 'github':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    case 'bilibili':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="18" height="14" rx="3" />
          <path d="M8 2l3 4" />
          <path d="M16 2l-3 4" />
          <circle cx="9.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="14.5" cy="13" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'xiaohongshu':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16v16H4z" rx="2" />
          <path d="M9 9l3 6 3-6" />
        </svg>
      )
    case 'douyin':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      )
    default:
      return <ExternalLink size={18} />
  }
}

export default function HomeB() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hb-ornament-top',
        { opacity: 0, scale: 0.5, rotate: 45 },
        { opacity: 1, scale: 1, rotate: 45, duration: 0.8, ease: 'back.out(1.7)', delay: 0.1 }
      )

      gsap.fromTo(
        '.hb-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 0.2 }
      )

      gsap.fromTo(
        '.hb-name',
        { y: 60, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'expo.out', delay: 0.4 }
      )

      gsap.fromTo(
        '.hb-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.7 }
      )

      gsap.fromTo(
        '.hb-meta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.9 }
      )

      gsap.fromTo(
        '.hb-tagline',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1.1 }
      )

      gsap.fromTo(
        '.hb-traits',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 1.3 }
      )

      gsap.fromTo(
        '.hb-trait-card',
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out', stagger: 0.12, delay: 1.5 }
      )

      gsap.fromTo(
        '.hb-quote',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 2.0 }
      )

      gsap.fromTo(
        '.hb-contact',
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 2.2 }
      )

      gsap.fromTo(
        '.hb-scroll-indicator',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', delay: 2.4 }
      )

      gsap.to('.hb-scroll-chevron', {
        y: 6,
        duration: 1.2,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 3,
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const existing = document.getElementById('energy-flow-script-b')
    if (!existing) {
      const script = document.createElement('script')
      script.id = 'energy-flow-script-b'
      script.src = '/energy-flow-canvas-b.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  return (
    <CoverLayout id="home-b" aria-label="首页封面" className="bg-b-cream relative overflow-hidden">
      {/* Algorithmic Art Background Canvas */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <canvas id="energy-flow-canvas-b" style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <div className="b-hero-shape b-hero-shape-1" aria-hidden="true" />
      <div className="b-hero-shape b-hero-shape-2" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center px-5 md:px-8 min-h-screen w-full max-w-4xl mx-auto pt-24 pb-16"
      >
        <div className="hb-ornament-top mb-6">
          <span className="b-ornament" />
          <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle" />
          <span className="b-ornament" />
        </div>

        <p className="hb-label font-b-mono text-[11px] md:text-xs text-b-terracotta tracking-[0.25em] uppercase mb-6">
          Energy & AI Cross-Discipline Explorer
        </p>

        <h1 className="hb-name font-b-serif text-6xl md:text-8xl lg:text-9xl text-b-ink leading-[1.05] tracking-tight mb-5">
          <BlurText text="胡亚伟" className="block" delay={0.4} duration={1.2} stagger={0.08} />
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-b-terracotta/40" />
          <span className="b-ornament" style={{ margin: 0 }} />
          <span className="block w-8 h-px bg-b-terracotta/40" />
        </div>

        <p className="hb-subtitle font-b-sans text-lg md:text-xl lg:text-2xl text-b-ink-light max-w-xl mb-5 leading-relaxed">
          <BlurText text="一名对能源动力技术与人工智能交叉领域充满热情的工科生" delay={0.7} duration={0.8} stagger={0.02} />
        </p>

        <div className="hb-meta flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-b-muted text-sm mb-6 font-b-sans">
          <span className="flex items-center gap-1.5">
            <GraduationCap size={15} className="text-b-terracotta/70" />
            <span className="b-underline-hover">山西大学 · 能源与动力工程</span>
          </span>
          <span className="hidden sm:inline text-b-sand">◆</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={15} className="text-b-terracotta/70" />
            <span>山西 · 太原</span>
          </span>
          <span className="hidden sm:inline text-b-sand">◆</span>
          <span className="font-b-mono text-xs text-b-slate bg-b-slate-dim px-2.5 py-1 rounded-full border border-b-slate-dim">
            ENTJ-A
          </span>
        </div>

        <p className="hb-tagline font-b-sans text-sm md:text-base text-b-muted max-w-md mb-10 italic leading-relaxed">
          扎实的专业能力 + 积极拥抱 AI 技术，探索赋能传统工业的创新解决方案
        </p>

        <div className="hb-traits w-full max-w-3xl mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-1">
            {traits.map((trait, index) => (
              <div
                key={index}
                className={`hb-trait-card b-card ${trait.cardClass} p-5 md:p-6 text-left cursor-default group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`b-tag ${trait.tagClass} text-sm`}>
                    {trait.icon}
                  </span>
                  <span className="font-b-serif text-base md:text-lg text-b-ink font-medium">
                    {trait.label}
                  </span>
                </div>
                <p className="font-b-sans text-xs text-b-muted leading-relaxed">
                  {trait.desc}
                </p>
                <div className="mt-3 b-skill-meter">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`b-skill-dot ${i < 4 ? 'b-skill-dot-filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hb-quote relative max-w-lg mx-auto mb-10 px-6">
          <span className="b-quote-mark" aria-hidden="true">"</span>
          <blockquote className="font-b-serif text-base md:text-lg text-b-ink-light leading-relaxed italic pl-4">
            在能源与智能的交汇处，寻找改变世界的支点
          </blockquote>
          <div className="flex items-center gap-2 mt-3 pl-4">
            <span className="block w-6 h-px bg-b-terracotta/40" />
            <span className="font-b-mono text-[10px] text-b-muted tracking-widest uppercase">
              Hu Yawei
            </span>
          </div>
        </div>

        <CapabilityMapB />

        <MagazineTimeline />

        <div className="hb-contact w-full max-w-2xl mx-auto mb-12">
          <div className="b-card b-card-terracotta p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Mail size={20} className="text-b-terracotta" />
              <h3 className="font-b-serif text-xl text-b-ink">联系方式</h3>
              <span className="b-ornament" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-b-terracotta-dim flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-b-terracotta" />
                </div>
                <div className="text-left">
                  <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-0.5">电话</p>
                  <a
                    href={`tel:${otherData.contact.phone}`}
                    className="font-b-sans text-sm text-b-ink b-underline-hover"
                  >
                    {otherData.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-b-sage-dim flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-b-sage" />
                </div>
                <div className="text-left">
                  <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-0.5">邮箱</p>
                  <a
                    href={`mailto:${otherData.contact.email}`}
                    className="font-b-sans text-sm text-b-ink b-underline-hover break-all"
                  >
                    {otherData.contact.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-b-border">
              <p className="font-b-sans text-xs text-b-muted uppercase tracking-wider mb-4 text-left">
                社交平台
              </p>
              <div className="flex flex-wrap gap-3">
                {otherData.contact.social.map((s, i) => (
                  <a
                    key={i}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-b-cream-dark border border-b-border hover:border-b-terracotta/30 hover:bg-b-terracotta/5 transition-all duration-300 group"
                  >
                    <span className="text-b-ink-light group-hover:text-b-terracotta transition-colors duration-300">
                      <SocialIcon icon={s.icon} />
                    </span>
                    <span className="font-b-sans text-sm text-b-ink-light group-hover:text-b-ink transition-colors duration-300">
                      {s.name}
                    </span>
                    <ExternalLink size={11} className="text-b-muted group-hover:text-b-terracotta transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hb-scroll-indicator flex flex-col items-center gap-2 mt-auto">
          <span className="font-b-mono text-[10px] text-b-muted tracking-[0.2em] uppercase">
            Scroll
          </span>
          <ChevronDown size={16} className="hb-scroll-chevron text-b-terracotta/60" />
        </div>
      </div>
    </CoverLayout>
  )
}

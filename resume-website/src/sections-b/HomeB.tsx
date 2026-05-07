import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Zap, Brain, Code, Rocket, GraduationCap, MapPin, ChevronDown } from 'lucide-react'
import CoverLayout from '@layouts/CoverLayout'

const traits = [
  {
    icon: <Zap size={20} />,
    label: '工程专业能力',
    desc: 'ANSYS / AutoCAD / 实践操作',
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
  },
  {
    icon: <Brain size={20} />,
    label: 'AI技术应用',
    desc: 'Agent / RAG / Prompt工程',
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
    desc: '团队协作 / 竞赛获奖',
    cardClass: 'b-card-terracotta',
    tagClass: 'b-tag-terracotta',
  },
]

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

  return (
    <CoverLayout id="home-b" aria-label="首页封面" className="bg-b-cream">
      <div className="b-hero-shape b-hero-shape-1" aria-hidden="true" />
      <div className="b-hero-shape b-hero-shape-2" aria-hidden="true" />

      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center text-center px-5 md:px-8 min-h-screen w-full max-w-4xl mx-auto py-16"
      >
        <div className="hb-ornament-top mb-6">
          <span className="b-ornament" />
          <span className="inline-block w-12 h-px bg-b-terracotta/30 mx-3 align-middle" />
          <span className="b-ornament" />
        </div>

        <p className="hb-label font-b-mono text-[11px] md:text-xs text-b-terracotta tracking-[0.25em] uppercase mb-6">
          Energy & AI Cross-Discipline Explorer
        </p>

        <h1 className="hb-name font-b-serif text-6xl md:text-8xl lg:text-9xl text-b-ink leading-[0.9] tracking-tight mb-5">
          <span className="block">胡亚伟</span>
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-b-terracotta/40" />
          <span className="b-ornament" style={{ margin: 0 }} />
          <span className="block w-8 h-px bg-b-terracotta/40" />
        </div>

        <p className="hb-subtitle font-b-sans text-lg md:text-xl lg:text-2xl text-b-ink-light max-w-xl mb-5 leading-relaxed">
          能源动力技术与人工智能交叉领域探索者
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
          将AI技术深度融入能源工程，以跨界思维驱动创新
        </p>

        <div className="hb-traits w-full max-w-3xl mb-12">
          <div className="b-horizontal-scroll px-1">
            {traits.map((trait, index) => (
              <div
                key={index}
                className={`hb-trait-card b-card ${trait.cardClass} p-5 md:p-6 min-w-[200px] md:min-w-[220px] text-left cursor-default group`}
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

        <div className="hb-quote relative max-w-lg mx-auto mb-16 px-6">
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

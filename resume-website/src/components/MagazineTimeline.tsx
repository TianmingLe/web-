import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  GraduationCap,
  Users,
  Smartphone,
  Award,
  BookOpen,
  Code2,
  Glasses,
  Video,
  TrendingUp,
  Star,
  type LucideIcon,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = '能动' | 'AI' | '自媒体' | '竞赛' | '实习'

interface TimelineEvent {
  month: string
  description: string
  category: Category
  milestone?: boolean
  icon: LucideIcon
}

interface TimelineYear {
  year: string
  events: TimelineEvent[]
  stats?: string
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const timelineData: TimelineYear[] = [
  {
    year: '2023',
    events: [
      {
        month: '09月',
        description: '入学山西大学，担任军训负责人',
        category: '能动',
        icon: GraduationCap,
      },
      {
        month: '10月',
        description: '加入彩虹志愿者协会',
        category: '实习',
        icon: Users,
      },
    ],
  },
  {
    year: '2024',
    events: [
      {
        month: '01月',
        description:
          '开始自媒体创号，首先在小红书上进行初步尝试，一个月内斩获1000+粉丝（刚开始是做哔哩哔哩漫画剪辑推广的）',
        category: '自媒体',
        icon: Smartphone,
      },
      {
        month: '03月',
        description:
          '担任百度网盘校园大使、小红书宣传大使；因积极参与社区AI技术共建交流被推荐参加"2024全球开发者先锋大会"',
        category: '实习',
        icon: Award,
      },
      {
        month: '05月',
        description: 'InternLM学习笔记（About-InternLM-study）',
        category: 'AI',
        icon: BookOpen,
      },
      {
        month: '06月',
        description: 'InternLM-notebook作业提交',
        category: 'AI',
        icon: BookOpen,
      },
      {
        month: '10-11月',
        description: '英语高教杯视频制作比赛（校级二等奖）',
        category: '竞赛',
        icon: Award,
      },
    ],
    stats: '抖音粉丝1600+ · 小红书粉丝3000+ · 快手粉丝1600+ · 哔哩哔哩粉丝800+',
  },
  {
    year: '2025',
    events: [
      {
        month: '02-03月',
        description: '市场调查与分析大赛（校级二等奖）',
        category: '竞赛',
        icon: Award,
      },
      {
        month: '03-05月',
        description: '《钢铁是怎样炼成的》4K修复项目',
        category: '自媒体',
        milestone: true,
        icon: Video,
      },
      {
        month: '06-07月',
        description: '小红书"青草计划"项目实践',
        category: '实习',
        icon: Users,
      },
      {
        month: '09月',
        description: '数学建模竞赛（省级一等奖）',
        category: '竞赛',
        milestone: true,
        icon: Star,
      },
    ],
    stats: '抖音粉丝4600+ · 小红书粉丝4000+ · 快手粉丝2600+ · 哔哩哔哩粉丝9800+',
  },
  {
    year: '2026',
    events: [
      {
        month: '03月',
        description: '市场调查与分析大赛（省级一等奖）；第一版视频抓取工具——video-claw初版开发',
        category: '竞赛',
        milestone: true,
        icon: Star,
      },
      {
        month: '04月',
        description:
          'Altezhong-yanjing智能眼镜v0.1.0-mvp；实现抖音、小红书视频评论抓取，舆情分析——video-tezhong第二版启动',
        category: 'AI',
        milestone: true,
        icon: Glasses,
      },
      {
        month: '05月',
        description:
          'web-niu（Ambient Dream v2）；完成AI特种眼镜软件层开发——AItezhongyanjing-2第二版；video-tezhong 完成',
        category: 'AI',
        milestone: true,
        icon: Code2,
      },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Category styles                                                    */
/* ------------------------------------------------------------------ */

const categoryStyles: Record<
  Category,
  { tagClass: string; dotClass: string; lineColor: string }
> = {
  能动: {
    tagClass: 'b-tag-terracotta',
    dotClass: 'bg-b-terracotta border-b-terracotta',
    lineColor: '#B5654E',
  },
  AI: {
    tagClass: 'b-tag-sage',
    dotClass: 'bg-b-sage border-b-sage',
    lineColor: '#7A8B6F',
  },
  自媒体: {
    tagClass: 'b-tag-slate',
    dotClass: 'bg-b-slate border-b-slate',
    lineColor: '#5B6B7A',
  },
  竞赛: {
    tagClass:
      'bg-b-cream-dark text-b-muted border border-b-border',
    dotClass: 'bg-b-muted border-b-muted',
    lineColor: '#8A8279',
  },
  实习: {
    tagClass:
      'bg-b-terracotta-dim text-b-terracotta border border-b-terracotta/15',
    dotClass: 'bg-b-terracotta-light border-b-terracotta-light',
    lineColor: '#D4896F',
  },
}

/* ------------------------------------------------------------------ */
/*  EventCard                                                          */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  index,
  isLeft,
}: {
  event: TimelineEvent
  index: number
  isLeft: boolean
}) {
  const styles = categoryStyles[event.category]
  const Icon = event.icon

  return (
    <div
      className={`mt-event-card relative ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'} md:w-[calc(50%-40px)] w-full`}
      data-index={index}
    >
      {/* Mobile dot on line */}
      <div
        className={`md:hidden absolute left-[11px] top-6 w-3 h-3 rounded-full border-2 border-b-cream z-10 ${styles.dotClass}`}
      />

      {/* Desktop dot on line */}
      <div
        className={`hidden md:flex absolute top-6 ${isLeft ? '-right-[46px]' : '-left-[46px]'} w-5 h-5 rounded-full border-[3px] border-b-cream z-10 items-center justify-center shadow-sm`}
        style={{ backgroundColor: '#FAF6F0' }}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${styles.dotClass}`} />
      </div>

      <div
        className={`b-card p-5 md:p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-b-hover group ${event.milestone ? 'ring-1 ring-b-terracotta/20' : ''}`}
      >
        {event.milestone && (
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-b-terracotta text-white flex items-center justify-center shadow-md z-10">
            <Star size={12} fill="currentColor" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <span className="font-b-mono text-[11px] text-b-terracotta tracking-wider bg-b-terracotta-dim px-2.5 py-1 rounded-full">
            {event.month}
          </span>
          <span className={`b-tag ${styles.tagClass} text-[11px]`}>
            <Icon size={12} />
            {event.category}
          </span>
          {event.milestone && (
            <span className="b-tag bg-b-terracotta text-white border border-b-terracotta text-[11px]">
              <Award size={12} />
              里程碑
            </span>
          )}
        </div>

        <p className="font-b-sans text-sm text-b-ink-light leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  YearSection                                                        */
/* ------------------------------------------------------------------ */

function YearSection({
  yearData,
  yearIndex,
}: {
  yearData: TimelineYear
  yearIndex: number
}) {
  return (
    <div className="mt-year-section relative" data-year={yearData.year}>
      {/* Year number - desktop alternating */}
      <div className="hidden md:block">
        <div
          className={`mt-year-number absolute top-0 ${yearIndex % 2 === 0 ? 'left-0 text-right pr-12' : 'right-0 text-left pl-12'} w-[calc(50%-40px)] font-b-serif text-7xl lg:text-8xl text-b-ink/5 leading-none select-none pointer-events-none`}
          style={{ transform: 'translateY(-20%)' }}
        >
          {yearData.year}
        </div>
      </div>

      {/* Year label */}
      <div className="flex items-center gap-4 mb-8 md:mb-10">
        <span className="md:hidden font-b-serif text-3xl text-b-ink/10 leading-none">
          {yearData.year}
        </span>
        <span className="hidden md:inline-block font-b-mono text-xs text-b-muted tracking-[0.2em] uppercase">
          Year
        </span>
        <span className="hidden md:inline-block font-b-serif text-2xl text-b-ink">
          {yearData.year}
        </span>
        <span className="flex-1 h-px bg-gradient-to-r from-b-sand to-transparent" />
      </div>

      {/* Events */}
      <div className="relative space-y-6 md:space-y-8">
        {yearData.events.map((event, i) => (
          <EventCard
            key={`${yearData.year}-${i}`}
            event={event}
            index={i}
            isLeft={yearIndex % 2 === 0 ? i % 2 === 0 : i % 2 !== 0}
          />
        ))}
      </div>

      {/* Year stats */}
      {yearData.stats && (
        <div className="mt-8 md:mt-10 flex items-center gap-3 px-4 py-3 rounded-xl bg-b-cream-dark border border-b-border">
          <TrendingUp size={16} className="text-b-terracotta shrink-0" />
          <p className="font-b-sans text-xs text-b-muted leading-relaxed">
            {yearData.stats}
          </p>
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FollowerStatsBar                                                   */
/* ------------------------------------------------------------------ */

function FollowerStatsBar() {
  const stats = [
    { platform: '哔哩哔哩', count: '12,000+', color: '#7B6BAE' },
    { platform: '抖音', count: '4,900+', color: '#B5654E' },
    { platform: '小红书', count: '4,600+', color: '#5B6B7A' },
    { platform: '快手', count: '2,600+', color: '#7A8B6F' },
  ]

  return (
    <div className="mt-16 md:mt-20">
      <div className="b-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp size={20} className="text-b-terracotta" />
          <h4 className="font-b-serif text-lg text-b-ink">自媒体成长数据</h4>
          <span className="b-ornament" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.platform}
              className="text-center p-4 rounded-xl bg-b-cream-dark border border-b-border hover:border-b-terracotta/20 transition-colors duration-300"
            >
              <p
                className="font-b-serif text-2xl md:text-3xl mb-1"
                style={{ color: s.color }}
              >
                {s.count}
              </p>
              <p className="font-b-sans text-xs text-b-muted">{s.platform}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-b-border">
          <div className="flex items-center justify-between text-xs font-b-sans text-b-muted">
            <span>数据截至 2026年5月</span>
            <span className="font-b-mono tracking-wider">
              Total Reach: 24,000+
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function MagazineTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const lineSvgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      /* ---- Section header animation ---- */
      gsap.fromTo(
        '.mt-header',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )

      /* ---- Year numbers parallax ---- */
      gsap.utils.toArray<HTMLElement>('.mt-year-number').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el.closest('.mt-year-section'),
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ---- SVG line draw animation ---- */
      if (lineRef.current && lineSvgRef.current) {
        const line = lineRef.current
        const length = line.getTotalLength()

        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 1,
          },
        })
      }

      /* ---- Event cards stagger ---- */
      gsap.utils.toArray<HTMLElement>('.mt-event-card').forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ---- Year sections stagger ---- */
      gsap.utils.toArray<HTMLElement>('.mt-year-section').forEach((sec, i) => {
        gsap.fromTo(
          sec,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      /* ---- Pulse animation for most recent events ---- */
      const lastYearSection = section.querySelector('.mt-year-section:last-child')
      if (lastYearSection) {
        const recentCards = lastYearSection.querySelectorAll('.mt-event-card')
        recentCards.forEach((card) => {
          const dot = card.querySelector('.md\\:flex')
          if (dot) {
            gsap.to(dot, {
              scale: 1.2,
              duration: 1.2,
              ease: 'power1.inOut',
              yoyo: true,
              repeat: -1,
            })
          }
        })
      }

      /* ---- Stats bar animation ---- */
      gsap.fromTo(
        '.mt-stats-bar',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.mt-stats-bar',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="timeline"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-b-cream"
    >
      <div className="max-w-5xl mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="mt-header text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="block w-10 h-px bg-b-terracotta/30" />
            <span className="b-ornament" style={{ margin: 0 }} />
            <span className="block w-10 h-px bg-b-terracotta/30" />
          </div>
          <p className="font-b-mono text-[11px] text-b-terracotta tracking-[0.25em] uppercase mb-4">
            Growth Trajectory
          </p>
          <h2 className="font-b-serif text-3xl md:text-4xl lg:text-5xl text-b-ink mb-4 tracking-tight">
            成长轨迹
          </h2>
          <p className="font-b-sans text-sm md:text-base text-b-muted max-w-lg mx-auto leading-relaxed">
            从校园萌新到跨界探索者，每一步都记录着突破与成长
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <span className="block w-8 h-px bg-b-terracotta/20" />
            <span className="font-b-mono text-[10px] text-b-muted tracking-widest">
              2023 — 2026
            </span>
            <span className="block w-8 h-px bg-b-terracotta/20" />
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* SVG Gradient Line - desktop */}
          <svg
            ref={lineSvgRef}
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-1 h-full"
            preserveAspectRatio="none"
            style={{ zIndex: 1, overflow: 'visible' }}
          >
            <defs>
              <linearGradient
                id="timelineGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#B5654E" />
                <stop offset="50%" stopColor="#7A8B6F" />
                <stop offset="100%" stopColor="#5B6B7A" />
              </linearGradient>
            </defs>
            <line
              ref={lineRef}
              x1="2"
              y1="0"
              x2="2"
              y2="100%"
              stroke="url(#timelineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          {/* Mobile line */}
          <div
            className="md:hidden absolute left-[15px] top-0 bottom-0 w-px"
            style={{
              background:
                'linear-gradient(to bottom, #B5654E, #7A8B6F 50%, #5B6B7A)',
            }}
          />

          {/* Year Sections */}
          <div className="relative space-y-16 md:space-y-24">
            {timelineData.map((yearData, yearIndex) => (
              <YearSection
                key={yearData.year}
                yearData={yearData}
                yearIndex={yearIndex}
              />
            ))}
          </div>
        </div>

        {/* Follower Stats */}
        <div className="mt-stats-bar">
          <FollowerStatsBar />
        </div>
      </div>
    </section>
  )
}

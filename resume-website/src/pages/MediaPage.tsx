import { Play, FileText, Target, Lightbulb, Clock, MessageCircle, CheckCircle, Wrench, TrendingUp, BookOpen, ListChecks } from 'lucide-react'
import GlassCard from '@components/GlassCard'
import FeatureSection from '@components/FeatureSection'
import mediaData from '@data/media.json'

const platformIcons: Record<string, React.ReactNode> = {
  '哔哩哔哩': <Play size={20} />,
  '抖音': <Play size={20} />,
  '小红书': <FileText size={20} />,
}

const strategyIcons = [Target, Lightbulb, Clock, MessageCircle]

type Project = typeof mediaData.projects[number]

function ProjectDetails({ project }: { project: Project }) {
  switch (project.id) {
    case 'omniscraper':
      return (
        <div className="space-y-2">
          <p className="text-xs text-warm-faint font-mono uppercase tracking-wider">核心指标</p>
          <div className="flex flex-wrap gap-2">
            {project.highlights!.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20 font-sans"
              >
                <CheckCircle size={12} />
                {h}
              </span>
            ))}
          </div>
        </div>
      )
    case 'video_claw':
      return (
        <>
          <div className="space-y-2 mb-4">
            <p className="text-xs text-warm-faint font-mono uppercase tracking-wider">成果</p>
            {project.outcomes!.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-energy mt-0.5 shrink-0" />
                <p className="text-sm text-warm-muted font-sans">{o}</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 rounded-lg bg-energy-dim/30 border border-energy/15">
            <div className="flex items-start gap-2">
              <BookOpen size={14} className="text-energy-light mt-0.5 shrink-0" />
              <p className="text-sm text-warm-muted font-sans">{project.lessons}</p>
            </div>
          </div>
        </>
      )
    case 'steel_4k':
      return (
        <>
          <div className="mb-4">
            <p className="text-xs text-warm-faint font-mono uppercase tracking-wider mb-2">工作流</p>
            {project.workflow!.map((step, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <Wrench size={14} className="text-energy mt-0.5 shrink-0" />
                <p className="text-sm text-warm-muted font-sans">{step}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs text-warm-faint font-mono uppercase tracking-wider mb-2">影响力</p>
            {project.impact!.map((imp, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <TrendingUp size={14} className="text-energy-light mt-0.5 shrink-0" />
                <p className="text-sm text-warm-muted font-sans">{imp}</p>
              </div>
            ))}
          </div>
        </>
      )
    case 'qingcao_plan':
      return (
        <div className="space-y-2">
          <p className="text-xs text-warm-faint font-mono uppercase tracking-wider">实践活动</p>
          {project.activities!.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <ListChecks size={14} className="text-energy mt-0.5 shrink-0" />
              <p className="text-sm text-warm-muted font-sans">{a}</p>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function MediaPage() {
  const majorProjects = mediaData.projects.filter((p) => p.id === 'omniscraper' || p.id === 'steel_4k')
  const minorProjects = mediaData.projects.filter((p) => p.id !== 'omniscraper' && p.id !== 'steel_4k')

  return (
    <div className="relative pt-20 pb-12 md:py-40 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-energy-light/80 text-xs md:text-sm font-mono font-medium tracking-[0.3em] uppercase mb-4">
            {mediaData.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-warm mb-6 tracking-tight">
            {mediaData.title}
          </h2>
          <p className="text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            {mediaData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16">
          {mediaData.platforms.map((platform, index) => (
            <GlassCard key={index} className="flex flex-col" glowColor="energy">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-energy/60">{platformIcons[platform.name]}</span>
                <div>
                  <h3 className="text-lg font-serif text-warm">{platform.name}</h3>
                  <p className="text-xs text-warm-faint font-mono">{platform.nameEn}</p>
                </div>
              </div>
              <p className="text-3xl font-serif text-energy-light mb-1">{platform.followers}</p>
              <p className="text-xs text-warm-faint mb-4 font-mono">粉丝</p>
              <p className="text-sm text-warm-muted mb-3 font-sans">{platform.content}</p>
              <div className="pt-4 border-t border-white/[0.06] mt-auto">
                <p className="text-xs text-warm-faint mb-1 font-mono">代表作品</p>
                <p className="text-sm text-ai-light font-sans">{platform.representative}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="mb-16" glowColor="ai">
          <h3 className="text-lg font-serif text-warm mb-4">内容策略</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {mediaData.contentStrategy.map((strategy, index) => {
              const Icon = strategyIcons[index]
              const colonIdx = strategy.indexOf('：')
              const label = colonIdx > -1 ? strategy.slice(0, colonIdx) : strategy
              const desc = colonIdx > -1 ? strategy.slice(colonIdx + 1) : ''
              return (
                <div key={index} className="flex items-start gap-3 min-w-[220px]">
                  <span className="text-energy/60 mt-0.5"><Icon size={18} /></span>
                  <div>
                    <p className="text-sm font-medium text-warm font-sans">{label}</p>
                    {desc && <p className="text-xs text-warm-faint mt-1 font-sans">{desc}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>

        {majorProjects.map((project, index) => (
          <FeatureSection
            key={project.id}
            title={project.title}
            description={project.summary}
            badge={project.period}
            reverse={index % 2 !== 0}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs rounded-full bg-energy-dim text-energy-light border border-energy/20 font-sans">{tag}</span>
              ))}
            </div>
            <ProjectDetails project={project} />
          </FeatureSection>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {minorProjects.map((project, index) => (
            <GlassCard key={index} glowColor={project.id === 'video_claw' ? 'energy' : 'ai'}>
              <h3 className="text-xl font-serif text-warm mb-1">{project.title}</h3>
              {project.period && (
                <p className="text-xs text-warm-faint mb-3 font-mono">{project.period}</p>
              )}
              <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans">{tag}</span>
                ))}
              </div>
              <ProjectDetails project={project} />
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  )
}

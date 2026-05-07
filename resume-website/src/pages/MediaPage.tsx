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
          <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">核心指标</p>
          <div className="flex flex-wrap gap-2">
            {project.highlights!.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
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
            <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">成果</p>
            {project.outcomes!.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-text-secondary">{o}</p>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 rounded-xl bg-yellow-500/8 border border-yellow-500/15">
            <div className="flex items-start gap-2">
              <BookOpen size={14} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-text-secondary">{project.lessons}</p>
            </div>
          </div>
        </>
      )
    case 'steel_4k':
      return (
        <>
          <div className="mb-4">
            <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-2">工作流</p>
            {project.workflow!.map((step, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <Wrench size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-text-secondary">{step}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mb-2">影响力</p>
            {project.impact!.map((imp, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <TrendingUp size={14} className="text-primary-light mt-0.5 shrink-0" />
                <p className="text-sm text-text-secondary">{imp}</p>
              </div>
            ))}
          </div>
        </>
      )
    case 'qingcao_plan':
      return (
        <div className="space-y-2">
          <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">实践活动</p>
          {project.activities!.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <ListChecks size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-text-secondary">{a}</p>
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
    <div className="relative py-28 md:py-40 px-4 md:px-6 section-divider">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-primary/80 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            {mediaData.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
            {mediaData.title}
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {mediaData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-16">
          {mediaData.platforms.map((platform, index) => (
            <GlassCard key={index} className="p-6" glowColor="blue" hoverEffect>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-primary/70">{platformIcons[platform.name]}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                  <p className="text-xs text-text-muted">{platform.nameEn}</p>
                </div>
              </div>
              <p className="text-3xl font-semibold text-primary mb-1">{platform.followers}</p>
              <p className="text-xs text-text-muted mb-4">粉丝</p>
              <p className="text-sm text-text-secondary mb-3">{platform.content}</p>
              <div className="pt-4 border-t border-white/6">
                <p className="text-xs text-text-muted mb-1">代表作品</p>
                <p className="text-sm text-accent-light">{platform.representative}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6 mb-16" glowColor="purple">
          <h3 className="text-lg font-semibold text-white mb-4">内容策略</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {mediaData.contentStrategy.map((strategy, index) => {
              const Icon = strategyIcons[index]
              const colonIdx = strategy.indexOf('：')
              const label = colonIdx > -1 ? strategy.slice(0, colonIdx) : strategy
              const desc = colonIdx > -1 ? strategy.slice(colonIdx + 1) : ''
              return (
                <div key={index} className="flex items-start gap-3 min-w-[220px]">
                  <span className="text-primary/70 mt-0.5"><Icon size={18} /></span>
                  <div>
                    <p className="text-sm font-medium text-white">{label}</p>
                    {desc && <p className="text-xs text-text-muted mt-1">{desc}</p>}
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
                <span key={i} className="apple-tag text-xs">{tag}</span>
              ))}
            </div>
            <ProjectDetails project={project} />
          </FeatureSection>
        ))}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {minorProjects.map((project, index) => (
            <GlassCard key={index} className="p-6" glowColor={project.id === 'video_claw' ? 'blue' : 'purple'}>
              <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
              {project.period && (
                <p className="text-xs text-text-muted mb-3">{project.period}</p>
              )}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.summary}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="apple-tag text-xs">{tag}</span>
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
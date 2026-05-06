import { Play, FileText, Target, Lightbulb, Clock, MessageCircle, CheckCircle, Wrench, TrendingUp, BookOpen, ListChecks } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
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
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">核心指标</p>
          <div className="flex flex-wrap gap-2">
            {project.highlights!.map((h, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
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
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">成果</p>
            {project.outcomes!.map((o, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{o}</p>
              </div>
            ))}
          </div>
          <div className="px-3 py-2.5 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
            <div className="flex items-start gap-2">
              <BookOpen size={14} className="text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-sm text-gray-300">{project.lessons}</p>
            </div>
          </div>
        </>
      )
    case 'steel_4k':
      return (
        <>
          <div className="mb-4">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">工作流</p>
            {project.workflow!.map((step, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <Wrench size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{step}</p>
              </div>
            ))}
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">影响力</p>
            {project.impact!.map((imp, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5">
                <TrendingUp size={14} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm text-gray-300">{imp}</p>
              </div>
            ))}
          </div>
        </>
      )
    case 'qingcao_plan':
      return (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">实践活动</p>
          {project.activities!.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <ListChecks size={14} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-gray-300">{a}</p>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function Media() {
  const majorProjects = mediaData.projects.filter((p) => p.id === 'omniscraper' || p.id === 'steel_4k')
  const minorProjects = mediaData.projects.filter((p) => p.id !== 'omniscraper' && p.id !== 'steel_4k')

  return (
    <SectionLayout
      id="media"
      title={mediaData.title}
      subtitle={mediaData.subtitle}
      description={mediaData.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mediaData.platforms.map((platform, index) => (
          <GlassCard key={index} className="p-6" glowColor="cyan" hoverEffect>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary">{platformIcons[platform.name]}</span>
              <div>
                <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                <p className="text-xs text-gray-500">{platform.nameEn}</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-primary mb-1">{platform.followers}</p>
            <p className="text-xs text-gray-500 mb-4">粉丝</p>
            <p className="text-sm text-gray-400 mb-3">{platform.content}</p>
            <div className="pt-3 border-t border-white/5">
              <p className="text-xs text-gray-500 mb-1">代表作品</p>
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
                <span className="text-primary mt-0.5"><Icon size={18} /></span>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  {desc && <p className="text-xs text-gray-400 mt-1">{desc}</p>}
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
              <span key={i} className="tag-pill text-xs">{tag}</span>
            ))}
          </div>
          <ProjectDetails project={project} />
        </FeatureSection>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {minorProjects.map((project, index) => (
          <GlassCard key={index} className="p-6" glowColor={project.id === 'video_claw' ? 'blue' : 'purple'}>
            <h3 className="text-xl font-semibold text-white mb-1">{project.title}</h3>
            {project.period && (
              <p className="text-xs text-gray-500 mb-3">{project.period}</p>
            )}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span key={i} className="tag-pill text-xs">{tag}</span>
              ))}
            </div>
            <ProjectDetails project={project} />
          </GlassCard>
        ))}
      </div>
    </SectionLayout>
  )
}

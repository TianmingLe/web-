import { Calendar, Layers, Zap, BookOpen, Sparkles, Tag, Hash } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import aiData from '@data/ai.json'

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

function ProjectCard({ project }: { project: Project }) {
  return (
    <GlassCard className="p-6 flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.title}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          {project.period && (
            <div className="flex items-center gap-1.5 text-gray-400 text-sm">
              <Calendar size={14} />
              <span>{project.period}</span>
            </div>
          )}
          {project.version && (
            <span className="text-primary/70 text-xs font-mono">
              {project.version}
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-3">
        {project.summary}
      </p>

      {project.keywords && (
        <div className="flex items-start gap-2 mb-4">
          <Hash size={14} className="text-gray-500 mt-0.5 shrink-0" />
          <p className="text-gray-500 text-xs leading-relaxed">
            {project.keywords}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.highlights && project.highlights.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={16} className="text-primary" />
            <span className="text-sm font-medium text-white">核心指标</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.highlights.map((h, i) => (
              <span
                key={i}
                className="px-3 py-1.5 text-xs rounded-lg bg-primary/5 text-primary/90 border border-primary/15"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.phases && project.phases.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers size={16} className="text-accent-light" />
            <span className="text-sm font-medium text-white">开发阶段</span>
          </div>
          <div className="relative pl-5 border-l border-white/10 space-y-3">
            {project.phases.map((phase, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-accent-light" />
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white">
                    {phase.name}
                  </span>
                  <span className="text-xs text-gray-500">{phase.period}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.abilities && project.abilities.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-electric-glow" />
            <span className="text-sm font-medium text-white">能力矩阵</span>
          </div>
          <div className="space-y-4">
            {project.abilities.map((ability, i) => (
              <div key={i}>
                <h4 className="text-sm font-medium text-electric-glow mb-2">
                  {ability.category}
                </h4>
                <ul className="space-y-1.5">
                  {ability.items.map((item, j) => (
                    <li
                      key={j}
                      className="text-gray-400 text-xs flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-glow/60 mt-1.5 shrink-0" />
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
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-accent-light" />
            <span className="text-sm font-medium text-white">应用场景</span>
          </div>
          <ul className="space-y-2">
            {project.scenarios.map((scenario, i) => (
              <li
                key={i}
                className="text-gray-400 text-xs flex items-start gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent-light/60 mt-1.5 shrink-0" />
                {scenario}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.topics && project.topics.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={16} className="text-primary" />
            <span className="text-sm font-medium text-white">学习主题</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.topics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 text-xs rounded-full bg-white/5 text-gray-300 border border-white/10"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}

export default function AI() {
  return (
    <SectionLayout
      id="ai"
      title={aiData.title}
      subtitle={aiData.subtitle}
      description={aiData.description}
    >
      <div className="space-y-6 mb-16">
        {aiData.projects.map((project) => (
          <ProjectCard key={project.id} project={project as Project} />
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">技术栈</h3>
        <p className="text-gray-400 text-sm">持续扩展中的AI技术能力图谱</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {aiData.skillTags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-white/5 text-gray-300 border border-white/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </SectionLayout>
  )
}

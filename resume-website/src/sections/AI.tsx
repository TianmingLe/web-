import { Calendar, Layers, Zap, BookOpen, Sparkles, Tag, Hash } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import FeatureSection from '@components/FeatureSection'
import EvolutionTimeline from '@components/EvolutionTimeline'
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

function ProjectHighlights({ highlights }: { highlights: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {highlights.map((h, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-primary/5 text-primary/90 border border-primary/15"
        >
          <Zap size={12} className="text-primary/60" />
          {h}
        </span>
      ))}
    </div>
  )
}

function ProjectPhases({ phases }: { phases: Phase[] }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <Layers size={16} className="text-accent-light" />
        <span className="text-sm font-medium text-white">开发阶段</span>
      </div>
      <div className="relative pl-5 border-l border-white/10 space-y-3">
        {phases.map((phase, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-accent-light" />
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">{phase.name}</span>
              <span className="text-xs text-gray-500">{phase.period}</span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">{phase.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectAbilities({ abilities }: { abilities: Ability[] }) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen size={16} className="text-electric-glow" />
        <span className="text-sm font-medium text-white">能力矩阵</span>
      </div>
      <div className="space-y-4">
        {abilities.map((ability, i) => (
          <div key={i}>
            <h4 className="text-sm font-medium text-electric-glow mb-2">{ability.category}</h4>
            <ul className="space-y-1.5">
              {ability.items.map((item, j) => (
                <li key={j} className="text-gray-400 text-xs flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-electric-glow/60 mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function AI() {
  const projects = aiData.projects as Project[]

  const majorProjects = projects.filter((p) => p.phases)
  const minorProjects = projects.filter((p) => !p.phases)

  const evoSteps = [
    {
      label: '基础探索',
      title: '大模型入门',
      description: '完成书生·浦语大模型实战营，在A100上训练基于InternLM的微调角色模型，掌握LoRA、DeepSpeed等核心技术。',
    },
    {
      label: '能力进阶',
      title: 'Prompt工程与智能体',
      description: '精通CoT、Few-shot等Prompt框架，掌握Agent架构设计，熟悉ComfyUI/n8n工作流编排与MCP工具注册。',
    },
    {
      label: '工程落地',
      title: '智能体全栈开发',
      description: '独立完成知心AI（Spring AI + RAG + ReAct）与智能眼镜系统（ESP32 + Flutter + FastAPI），实现从算法到产品的完整闭环。',
    },
    {
      label: '生态扩展',
      title: 'AIGC与多模态',
      description: '掌握数字人、语音克隆、AI音乐、Midjourney/SD绘画等AIGC技术，能独立完成从创意到成品的全流程。',
    },
  ]

  return (
    <SectionLayout
      id="ai"
      title={aiData.title}
      subtitle={aiData.subtitle}
      description={aiData.description}
    >
      <EvolutionTimeline
        heading="从模型学习到工程落地"
        subheading="AI技术能力的渐进式成长路径"
        steps={evoSteps}
      />

      {majorProjects.map((project, index) => (
        <FeatureSection
          key={project.id}
          title={project.title}
          description={project.summary}
          badge={project.period}
          reverse={index % 2 !== 0}
        >
          {project.keywords && (
            <div className="flex items-start gap-2 mb-3">
              <Hash size={14} className="text-gray-500 mt-0.5 shrink-0" />
              <p className="text-gray-500 text-xs leading-relaxed">{project.keywords}</p>
            </div>
          )}
          {project.version && (
            <p className="text-primary/60 text-xs font-mono mb-3">{project.version}</p>
          )}
          {project.highlights && <ProjectHighlights highlights={project.highlights} />}
          {project.phases && <ProjectPhases phases={project.phases} />}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag-pill text-xs">{tag}</span>
            ))}
          </div>
        </FeatureSection>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {minorProjects.map((project) => (
          <GlassCard key={project.id} className="p-6 flex flex-col h-full" glowColor={project.abilities ? 'blue' : project.scenarios ? 'purple' : 'cyan'}>
            <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
            {project.period && (
              <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                <Calendar size={12} />
                <span>{project.period}</span>
              </div>
            )}
            <p className="text-gray-400 text-sm leading-relaxed mb-3">{project.summary}</p>

            {project.highlights && <ProjectHighlights highlights={project.highlights} />}
            {project.abilities && <ProjectAbilities abilities={project.abilities} />}

            {project.scenarios && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-accent-light" />
                  <span className="text-sm font-medium text-white">应用场景</span>
                </div>
                <ul className="space-y-2">
                  {project.scenarios.map((scenario, i) => (
                    <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-light/60 mt-1.5 shrink-0" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.topics && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-primary" />
                  <span className="text-sm font-medium text-white">学习主题</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.topics.map((topic, i) => (
                    <span key={i} className="tag-pill text-xs">{topic}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">技术栈</h3>
        <p className="text-gray-400 text-sm">持续扩展中的AI技术能力图谱</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {aiData.skillTags.map((tag, index) => (
          <span key={index} className="tag-pill hover:tag-pill-active">
            {tag}
          </span>
        ))}
      </div>
    </SectionLayout>
  )
}

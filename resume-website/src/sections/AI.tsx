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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans"
        >
          <Zap size={12} className="text-ai/70" />
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
        <Layers size={16} className="text-ai-light" />
        <span className="text-sm font-medium text-warm font-sans">开发阶段</span>
      </div>
      <div className="relative pl-5 border-l border-white/[0.08] space-y-3">
        {phases.map((phase, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-[1.35rem] top-1.5 w-2 h-2 rounded-full bg-ai-light" />
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-sm font-medium text-warm font-sans">{phase.name}</span>
              <span className="text-xs text-warm-faint font-mono">{phase.period}</span>
            </div>
            <p className="text-warm-muted text-xs leading-relaxed font-sans">{phase.desc}</p>
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
        <BookOpen size={16} className="text-ai" />
        <span className="text-sm font-medium text-warm font-sans">能力矩阵</span>
      </div>
      <div className="space-y-4">
        {abilities.map((ability, i) => (
          <div key={i}>
            <h4 className="text-sm font-medium text-ai mb-2 font-sans">{ability.category}</h4>
            <ul className="space-y-1.5">
              {ability.items.map((item, j) => (
                <li key={j} className="text-warm-muted text-xs flex items-start gap-2 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-ai/50 mt-1.5 shrink-0" />
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
      label="AI技术"
      glowColor="ai"
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
              <Hash size={14} className="text-warm-faint mt-0.5 shrink-0" />
              <p className="text-warm-faint text-xs leading-relaxed font-sans">{project.keywords}</p>
            </div>
          )}
          {project.version && (
            <p className="text-ai/60 text-xs font-mono mb-3">{project.version}</p>
          )}
          {project.highlights && <ProjectHighlights highlights={project.highlights} />}
          {project.phases && <ProjectPhases phases={project.phases} />}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans">{tag}</span>
            ))}
          </div>
        </FeatureSection>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
        {minorProjects.map((project) => (
          <GlassCard key={project.id} className="flex flex-col h-full" glowColor={project.abilities ? 'ai' : project.scenarios ? 'ai' : 'energy'}>
            <h3 className="text-lg font-serif text-warm mb-2">{project.title}</h3>
            {project.period && (
              <div className="flex items-center gap-1.5 text-warm-faint text-xs mb-3 font-mono">
                <Calendar size={12} />
                <span>{project.period}</span>
              </div>
            )}
            <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">{project.summary}</p>

            {project.highlights && <ProjectHighlights highlights={project.highlights} />}
            {project.abilities && <ProjectAbilities abilities={project.abilities} />}

            {project.scenarios && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={16} className="text-ai-light" />
                  <span className="text-sm font-medium text-warm font-sans">应用场景</span>
                </div>
                <ul className="space-y-2">
                  {project.scenarios.map((scenario, i) => (
                    <li key={i} className="text-warm-muted text-xs flex items-start gap-2 font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-ai-light/50 mt-1.5 shrink-0" />
                      {scenario}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.topics && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={16} className="text-ai" />
                  <span className="text-sm font-medium text-warm font-sans">学习主题</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.topics.map((topic, i) => (
                    <span key={i} className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans">{topic}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 mt-auto pt-3">
              {project.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans">{tag}</span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-serif text-warm mb-2">技术栈</h3>
        <p className="text-warm-muted text-sm font-sans">持续扩展中的AI技术能力图谱</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {aiData.skillTags.map((tag, index) => (
          <span key={index} className="px-3 py-1.5 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans hover:bg-ai/20 transition-colors cursor-default">
            {tag}
          </span>
        ))}
      </div>
    </SectionLayout>
  )
}

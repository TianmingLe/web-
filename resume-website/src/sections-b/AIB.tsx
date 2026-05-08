import { Calendar, Layers, Zap, BookOpen, Sparkles, Tag, Hash, Brain, Cpu } from 'lucide-react'
import aiData from '@data/ai.json'
import ExpandableCard from '@components/ExpandableCard'

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

const evoSteps = [
  {
    label: '基础探索',
    icon: BookOpen,
    title: '大模型入门',
    description: '完成书生·浦语大模型实战营，在A100上训练基于InternLM的微调角色模型，掌握LoRA、DeepSpeed等核心技术。',
  },
  {
    label: '能力进阶',
    icon: Brain,
    title: 'Prompt工程与智能体',
    description: '精通CoT、Few-shot等Prompt框架，掌握Agent架构设计，熟悉ComfyUI/n8n工作流编排与MCP工具注册。',
  },
  {
    label: '工程落地',
    icon: Cpu,
    title: '智能体全栈开发',
    description: '独立完成知心AI（Spring AI + RAG + ReAct）与智能眼镜系统（ESP32 + Flutter + FastAPI），实现从算法到产品的完整闭环。',
  },
  {
    label: '生态扩展',
    icon: Sparkles,
    title: 'AIGC与多模态',
    description: '掌握数字人、语音克隆、AI音乐、Midjourney/SD绘画等AIGC技术，能独立完成从创意到成品的全流程。',
  },
]

function EvolutionTimeline() {
  return (
    <div className="b-fade-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
          <Layers size={18} className="text-b-terracotta" />
        </div>
        <div>
          <h3 className="font-b-serif text-xl text-b-ink">从模型学习到工程落地</h3>
          <p className="text-b-muted text-sm font-b-sans">AI技术能力的渐进式成长路径</p>
        </div>
      </div>

      <div className="relative pl-10">
        <div className="b-timeline-line" />

        {evoSteps.map((step, i) => {
          const Icon = step.icon
          return (
            <div
              key={step.label}
              className={`relative pb-8 last:pb-0 b-fade-up b-stagger-${i + 1}`}
            >
              <div className="b-timeline-dot" style={{ top: '4px' }} />

              <div className="b-card b-card-terracotta p-5 ml-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-b-terracotta-dim">
                    <Icon size={15} className="text-b-terracotta" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="b-tag b-tag-terracotta text-[11px]">{step.label}</span>
                    <span className="font-b-serif text-base text-b-ink">{step.title}</span>
                  </div>
                </div>
                <p className="text-b-ink-light text-sm leading-relaxed font-b-sans pl-11">
                  {step.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MajorProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`b-fade-up b-stagger-${index + 1}`}>
      <ExpandableCard
        title={
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-b-slate-dim">
              <Cpu size={15} className="text-b-slate" />
            </div>
            <h3 className="font-b-serif text-lg md:text-xl text-b-ink leading-snug">
              {project.title}
            </h3>
          </div>
        }
        badges={
          <div className="flex flex-wrap items-center gap-2">
            {project.period && (
              <span className="b-tag b-tag-slate">
                <Calendar size={12} />
                <span className="font-b-mono text-[11px]">{project.period}</span>
              </span>
            )}
            {project.version && (
              <span className="font-b-mono text-[11px] text-b-slate-light bg-b-slate-dim px-3 py-1 rounded-full">
                {project.version}
              </span>
            )}
          </div>
        }
        keywords={
          <>
            {project.tags.slice(0, 4).map((tag, i) => (
              <span key={i} className="b-tag b-tag-terracotta">{tag}</span>
            ))}
          </>
        }
        subtitle={project.summary.length > 80 ? project.summary.slice(0, 80) + '…' : project.summary}
        cardClass="b-card b-card-slate"
      >
        <p className="text-b-ink-light text-sm leading-[1.8] font-b-sans mb-5 max-w-3xl">
          {project.summary}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={15} className="text-b-terracotta" />
              <span className="font-b-serif text-sm text-b-ink">核心指标</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.highlights.map((h, i) => (
                <span key={i} className="b-tag b-tag-slate">
                  <Zap size={10} className="shrink-0" />
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.phases && project.phases.length > 0 && (
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-4">
              <Layers size={15} className="text-b-slate" />
              <span className="font-b-serif text-sm text-b-ink">开发阶段</span>
              <span className="b-ornament" />
              <span className="font-b-mono text-[11px] text-b-muted">
                {project.phases.length} phases
              </span>
            </div>

            <div className="relative pl-7">
              <div className="b-timeline-line" />

              {project.phases.map((phase, i) => (
                <div key={i} className="relative pb-5 last:pb-0">
                  <div className="b-timeline-dot" style={{ top: '4px' }} />
                  <div className="ml-4">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-b-serif text-sm text-b-ink">{phase.name}</span>
                      <span className="font-b-mono text-[11px] text-b-muted bg-b-cream-dark px-2 py-0.5 rounded">
                        {phase.period}
                      </span>
                    </div>
                    <p className="text-b-ink-light text-xs leading-relaxed font-b-sans">
                      {phase.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-b-border">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="b-tag b-tag-terracotta">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </ExpandableCard>
    </div>
  )
}

function MinorProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className={`b-fade-up b-stagger-${(index % 4) + 1}`}>
      <ExpandableCard
        title={
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-b-sage-dim">
              <Sparkles size={13} className="text-b-sage" />
            </div>
            <h4 className="font-b-serif text-lg text-b-ink leading-snug">{project.title}</h4>
          </div>
        }
        keywords={
          <>
            {project.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="b-tag b-tag-sage">{tag}</span>
            ))}
          </>
        }
        subtitle={project.summary.length > 80 ? project.summary.slice(0, 80) + '…' : project.summary}
        cardClass="b-card b-card-sage"
      >
        {project.period && (
          <div className="flex items-center gap-1.5 mb-3">
            <Calendar size={12} className="text-b-muted" />
            <span className="font-b-mono text-[11px] text-b-muted">{project.period}</span>
          </div>
        )}

        <p className="text-b-ink-light text-sm leading-relaxed font-b-sans mb-4">
          {project.summary}
        </p>

        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Zap size={13} className="text-b-terracotta" />
              <span className="font-b-sans text-xs font-medium text-b-ink">核心成果</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.highlights.map((h, i) => (
                <span key={i} className="b-tag b-tag-slate text-[11px]">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {project.abilities && project.abilities.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-3">
              <BookOpen size={13} className="text-b-sage" />
              <span className="font-b-sans text-xs font-medium text-b-ink">能力矩阵</span>
            </div>
            <div className="space-y-3">
              {project.abilities.map((ability, i) => (
                <div key={i}>
                  <h5 className="font-b-serif text-sm text-b-sage mb-1.5">{ability.category}</h5>
                  <ul className="space-y-1">
                    {ability.items.map((item, j) => (
                      <li
                        key={j}
                        className="text-b-ink-light text-xs flex items-start gap-2 font-b-sans"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-b-sage mt-1.5 shrink-0" />
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
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="text-b-terracotta" />
              <span className="font-b-sans text-xs font-medium text-b-ink">应用场景</span>
            </div>
            <ul className="space-y-1.5">
              {project.scenarios.map((scenario, i) => (
                <li
                  key={i}
                  className="text-b-ink-light text-xs flex items-start gap-2 font-b-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-b-terracotta mt-1.5 shrink-0" />
                  {scenario}
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.topics && project.topics.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-1.5 mb-2">
              <Tag size={13} className="text-b-sage" />
              <span className="font-b-sans text-xs font-medium text-b-ink">学习主题</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.topics.map((topic, i) => (
                <span key={i} className="b-tag b-tag-sage text-[11px]">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-b-border">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, i) => (
              <span key={i} className="b-tag b-tag-terracotta text-[11px]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </ExpandableCard>
    </div>
  )
}

function SkillTagsSection() {
  return (
    <div className="b-fade-up">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
            <Brain size={18} className="text-b-terracotta" />
          </div>
          <h3 className="font-b-serif text-2xl text-b-ink">技术栈</h3>
        </div>
        <p className="text-b-muted text-sm font-b-sans">持续扩展中的AI技术能力图谱</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
        {aiData.skillTags.map((tag, index) => (
          <span
            key={index}
            className={`b-tag b-tag-terracotta b-fade-up b-stagger-${(index % 8) + 1} cursor-default hover:shadow-sm transition-shadow`}
          >
            <Hash size={10} className="shrink-0 opacity-60" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AIB() {
  const projects = aiData.projects as Project[]

  const majorProjects = projects.filter((p) => p.phases && p.phases.length > 0)
  const minorProjects = projects.filter((p) => !p.phases || p.phases.length === 0)

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
      <div className="b-section-header b-fade-up">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-b-terracotta-dim">
            <Brain size={20} className="text-b-terracotta" />
          </div>
          <div>
            <span className="font-b-mono text-[11px] tracking-widest text-b-muted uppercase">
              {aiData.subtitle}
            </span>
          </div>
        </div>
        <h2 className="font-b-serif text-4xl md:text-5xl text-b-ink mt-3 mb-3">
          {aiData.title}
        </h2>
        <p className="text-b-ink-light text-base leading-relaxed font-b-sans max-w-2xl">
          {aiData.description}
        </p>
      </div>

      <EvolutionTimeline />

      <div className="b-divider" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6 b-fade-up">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-b-slate-dim">
            <Cpu size={16} className="text-b-slate" />
          </div>
          <div>
            <h3 className="font-b-serif text-xl text-b-ink">重点项目</h3>
            <p className="text-b-muted text-xs font-b-sans">从架构设计到工程交付的完整实践</p>
          </div>
        </div>

        <div className="space-y-8">
          {majorProjects.map((project, index) => (
            <MajorProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="b-divider-center" />

      <div className="mb-8">
        <div className="flex items-center gap-3 mb-6 b-fade-up">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-b-sage-dim">
            <Sparkles size={16} className="text-b-sage" />
          </div>
          <div>
            <h3 className="font-b-serif text-xl text-b-ink">更多探索</h3>
            <p className="text-b-muted text-xs font-b-sans">AI领域的多元能力拓展</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {minorProjects.map((project, index) => (
            <MinorProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="b-divider" />

      <SkillTagsSection />
    </section>
  )
}

import { Layers, Zap, BookOpen, Sparkles, Tag, Hash, Brain, Cpu } from 'lucide-react'
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
  { label: '基础探索', icon: BookOpen },
  { label: '能力进阶', icon: Brain },
  { label: '工程落地', icon: Cpu },
  { label: '生态扩展', icon: Sparkles },
]

const MAJOR_IDS = ['smart_glasses', 'zhixin_ai']

function EvolutionTimeline() {
  return (
    <div className="b-fade-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-b-terracotta-dim">
          <Layers size={18} className="text-b-terracotta" />
        </div>
        <div>
          <h3 className="font-b-serif text-xl text-b-ink">从模型学习到工程落地</h3>
          <p className="text-b-muted text-sm font-b-sans">AI技术能力的渐进式成长路径</p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-wrap">
        {evoSteps.map((step, i) => {
          const Icon = step.icon
          return (
            <div
              key={step.label}
              className={`flex items-center gap-1.5 b-tag b-tag-terracotta b-fade-up b-stagger-${i + 1}`}
            >
              <Icon size={12} />
              <span>{step.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MajorProjectExpanded({ project }: { project: Project }) {
  return (
    <div className="space-y-5">
      <p className="text-b-ink-light text-sm leading-[1.8] font-b-sans max-w-3xl">
        {project.summary}
      </p>

      {project.highlights && project.highlights.length > 0 && (
        <div>
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
        <div>
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
            <span key={i} className="b-tag b-tag-slate">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function MinorProjectExpanded({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <p className="text-b-ink-light text-sm leading-relaxed font-b-sans">
        {project.summary}
      </p>

      {project.abilities && project.abilities.length > 0 && (
        <div>
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
        <div>
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
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Tag size={13} className="text-b-sage" />
            <span className="font-b-sans text-xs font-medium text-b-ink">学习主题</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.topics.map((topic, i) => (
              <span key={i} className="b-tag b-tag-sage text-[11px]">{topic}</span>
            ))}
          </div>
        </div>
      )}

      <div className="pt-3 border-t border-b-border">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag, i) => (
            <span key={i} className="b-tag b-tag-sage text-[11px]">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AIB() {
  const projects = aiData.projects as Project[]
  const majorProjects = projects.filter((p) => MAJOR_IDS.includes(p.id))
  const minorProjects = projects.filter((p) => !MAJOR_IDS.includes(p.id))

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-6xl mx-auto">
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
        <div className="space-y-5">
          {majorProjects.map((project, index) => (
            <div key={project.id} className={`b-fade-up b-stagger-${index + 1}`}>
              <ExpandableCard
                title={project.title}
                icon={<Cpu size={16} />}
                badge={project.period}
                tags={project.tags.slice(0, 3)}
                cardClass="b-card-slate"
                tagClass="b-tag-slate"
              >
                <MajorProjectExpanded project={project} />
              </ExpandableCard>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

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
            <div key={project.id} className={`b-fade-up b-stagger-${(index % 4) + 1}`}>
              <ExpandableCard
                title={project.title}
                icon={<Sparkles size={14} />}
                badge={project.period}
                tags={project.tags.slice(0, 2)}
                cardClass="b-card-sage"
                tagClass="b-tag-sage"
              >
                <MinorProjectExpanded project={project} />
              </ExpandableCard>
            </div>
          ))}
        </div>
      </div>

      <div className="b-divider" />

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
    </section>
  )
}

import { Target, Code2, Kanban, Compass, Lightbulb, Award } from 'lucide-react'
import DarkExpandableCard from '@components/DarkExpandableCard'
import thoughtData from '@data/thought.json'

export default function ThoughtPage() {
  return (
    <div className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-20 md:mb-28 text-center">
          <p className="text-ai-light/60 text-[10px] md:text-xs font-mono font-medium tracking-[0.5em] uppercase mb-8">
            {thoughtData.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-warm mb-8 tracking-tight">
            {thoughtData.title}
          </h2>
          <p className="text-warm-muted text-sm md:text-base max-w-xl mx-auto leading-[1.8] font-sans">
            {thoughtData.description}
          </p>
        </div>

        <DarkExpandableCard
          className="mb-16"
          title="指导思想"
          glowColor="ai"
          defaultExpanded
        >
          <div className="flex items-center gap-4">
            <Lightbulb size={20} className="text-ai shrink-0" />
            <p className="text-warm-muted text-sm leading-relaxed italic font-sans">
              {thoughtData.guidingThought}
            </p>
          </div>
        </DarkExpandableCard>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Target size={24} className="text-ai" />
            <h3 className="text-2xl font-serif text-warm">职业规划时间轴</h3>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ai/40 via-ai/20 to-transparent" />
            <div className="space-y-8">
              {thoughtData.career.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-ai to-ai-light shadow-[0_0_12px_rgba(74,124,155,0.4)] z-10" />
                  <DarkExpandableCard
                    className={`md:w-1/2 ml-10 md:ml-0 ${
                      index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                    }`}
                    title={item.phase}
                    keywords={
                      <div className={`flex flex-wrap gap-2 ${
                        index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                      }`}>
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    }
                    glowColor="ai"
                  >
                    <p className="text-warm-muted text-sm leading-relaxed font-sans">
                      {item.content}
                    </p>
                  </DarkExpandableCard>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-energy-light" />
            <h3 className="text-2xl font-serif text-warm">核心优势</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {thoughtData.coreAdvantages.map((adv, index) => (
              <DarkExpandableCard key={index} className="text-center" title={adv} glowColor="energy">
                <></>
              </DarkExpandableCard>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Code2 size={24} className="text-energy-light" />
            <h3 className="text-2xl font-serif text-warm">
              {thoughtData.vibeCoding.title}
            </h3>
          </div>
          <p className="text-warm-muted text-sm mb-8 font-sans">
            {thoughtData.vibeCoding.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {thoughtData.vibeCoding.steps.map((step, index) => (
              <DarkExpandableCard
                key={index}
                className="relative"
                title={
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-black text-ai/15 font-serif">{index + 1}</span>
                    <span className="text-base font-medium text-warm font-sans">{step.title}</span>
                  </div>
                }
                keywords={step.content.slice(0, 8) + '…'}
                glowColor="ai"
              >
                <p className="text-warm-muted text-sm leading-relaxed font-sans">
                  {step.content}
                </p>
              </DarkExpandableCard>
            ))}
          </div>
          <DarkExpandableCard title="实践案例" glowColor="ai">
            <div className="flex flex-wrap gap-3">
              {thoughtData.vibeCoding.cases.map((c, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm rounded-full bg-warm-ghost/5 text-warm-muted border border-white/[0.06] font-sans"
                >
                  {c}
                </span>
              ))}
            </div>
          </DarkExpandableCard>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Compass size={24} className="text-ai-light" />
            <h3 className="text-2xl font-serif text-warm">
              {thoughtData.techSelection.title}
            </h3>
          </div>
          <p className="text-warm-faint text-sm mb-6 font-sans">{thoughtData.techSelection.subtitle}</p>
          <DarkExpandableCard className="mb-8" title={thoughtData.techSelection.title} glowColor="ai">
            <p className="text-xs uppercase tracking-widest text-ai mb-2 font-mono">案例</p>
            <p className="text-warm-muted text-sm leading-relaxed font-sans">
              {thoughtData.techSelection.caseStudy}
            </p>
          </DarkExpandableCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {thoughtData.techSelection.principles.map((p, index) => (
              <DarkExpandableCard
                key={index}
                title={p.dimension}
                keywords={p.desc.slice(0, 8) + '…'}
                glowColor="energy"
              >
                <p className="text-warm-muted text-sm leading-relaxed font-sans">{p.desc}</p>
              </DarkExpandableCard>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Kanban size={24} className="text-ai" />
            <h3 className="text-2xl font-serif text-warm">
              {thoughtData.projectManagement.title}
            </h3>
          </div>
          <p className="text-warm-muted text-sm mb-8 font-sans">
            {thoughtData.projectManagement.description}
          </p>
          <div className="space-y-4 mb-10">
            {thoughtData.projectManagement.competitions.map((comp, index) => (
              <DarkExpandableCard
                key={index}
                title={comp.name}
                badges={
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-energy-dim text-energy-light border border-energy/25 font-sans">
                    {comp.level}
                  </span>
                }
                subtitle={<span className="text-warm-faint text-xs font-mono">{comp.period}</span>}
                glowColor="energy"
              >
                {'project' in comp && comp.project && (
                  <p className="text-ai/80 text-sm mb-2 font-sans">{comp.project}</p>
                )}
                <p className="text-warm-muted text-sm leading-relaxed mb-2 font-sans">{comp.work}</p>
                <div className="flex flex-wrap gap-3 text-xs text-warm-faint font-sans">
                  <span>角色：{comp.role}</span>
                  {'teamSize' in comp && comp.teamSize && (
                    <span>团队：{comp.teamSize}人</span>
                  )}
                </div>
              </DarkExpandableCard>
            ))}
          </div>
          <div>
            <p className="text-warm-faint text-xs uppercase tracking-widest mb-4 font-mono">团队角色</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {thoughtData.projectManagement.roles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-warm-ghost/5 border border-white/[0.06]"
                >
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-ai/50 shrink-0" />
                  <p className="text-warm-muted text-sm leading-relaxed font-sans">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

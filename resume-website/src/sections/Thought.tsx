import { Target, Code2, Kanban, Compass, Lightbulb, Award } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import thoughtData from '@data/thought.json'

export default function Thought() {
  return (
    <SectionLayout
      id="thought"
      title={thoughtData.title}
      subtitle={thoughtData.subtitle}
      description={thoughtData.description}
    >
      <GlassCard className="mb-16 p-5 flex items-center gap-4 border-primary/20" glowColor="cyan">
        <Lightbulb size={20} className="text-primary shrink-0" />
        <p className="text-gray-300 text-sm leading-relaxed italic">
          {thoughtData.guidingThought}
        </p>
      </GlassCard>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Target size={24} className="text-primary" />
          <h3 className="text-2xl font-bold text-white">职业规划时间轴</h3>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />
          <div className="space-y-8">
            {thoughtData.career.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary border-2 border-base z-10" />
                <GlassCard
                  className={`md:w-1/2 p-6 ml-10 md:ml-0 ${
                    index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                  }`}
                >
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {item.phase}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-3">
                    {item.content}
                  </p>
                  <div
                    className={`flex flex-wrap gap-2 ${
                      index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                    }`}
                  >
                    {item.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-xs rounded bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <Award size={24} className="text-yellow-400" />
          <h3 className="text-2xl font-bold text-white">核心优势</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {thoughtData.coreAdvantages.map((adv, index) => (
            <GlassCard key={index} className="p-5 text-center" glowColor="purple">
              <p className="text-gray-300 text-sm leading-relaxed">{adv}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <Code2 size={24} className="text-accent-light" />
          <h3 className="text-2xl font-bold text-white">
            {thoughtData.vibeCoding.title}
          </h3>
        </div>
        <p className="text-gray-400 text-sm mb-8">
          {thoughtData.vibeCoding.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {thoughtData.vibeCoding.steps.map((step, index) => (
            <GlassCard key={index} className="p-5 relative" glowColor="cyan">
              <span className="absolute top-3 right-3 text-3xl font-black text-primary/20">
                {index + 1}
              </span>
              <h4 className="text-base font-semibold text-white mb-2">
                {step.title}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.content}
              </p>
            </GlassCard>
          ))}
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">实践案例</p>
          <div className="flex flex-wrap gap-3">
            {thoughtData.vibeCoding.cases.map((c, index) => (
              <span
                key={index}
                className="px-4 py-2 text-sm rounded-lg bg-white/5 text-gray-300 border border-white/10"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-16">
        <div className="flex items-center gap-3 mb-2">
          <Compass size={24} className="text-emerald-400" />
          <h3 className="text-2xl font-bold text-white">
            {thoughtData.techSelection.title}
          </h3>
        </div>
        <p className="text-gray-500 text-sm mb-6">{thoughtData.techSelection.subtitle}</p>
        <GlassCard className="p-6 mb-8 border-primary/20" glowColor="blue">
          <p className="text-xs uppercase tracking-widest text-primary mb-2">案例</p>
          <p className="text-gray-200 text-sm leading-relaxed">
            {thoughtData.techSelection.caseStudy}
          </p>
        </GlassCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {thoughtData.techSelection.principles.map((p, index) => (
            <GlassCard key={index} className="p-5" glowColor="purple">
              <h4 className="text-base font-semibold text-white mb-2">
                {p.dimension}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <Kanban size={24} className="text-electric-glow" />
          <h3 className="text-2xl font-bold text-white">
            {thoughtData.projectManagement.title}
          </h3>
        </div>
        <p className="text-gray-400 text-sm mb-8">
          {thoughtData.projectManagement.description}
        </p>
        <div className="space-y-4 mb-10">
          {thoughtData.projectManagement.competitions.map((comp, index) => (
            <GlassCard key={index} className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="text-base font-semibold text-white">{comp.name}</h4>
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-yellow-400/15 text-yellow-400 border border-yellow-400/25">
                    {comp.level}
                  </span>
                </div>
                <span className="text-gray-500 text-xs">{comp.period}</span>
              </div>
              {'project' in comp && comp.project && (
                <p className="text-primary/80 text-sm mb-2">{comp.project}</p>
              )}
              <p className="text-gray-400 text-sm leading-relaxed mb-2">{comp.work}</p>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span>角色：{comp.role}</span>
                {'teamSize' in comp && comp.teamSize && (
                  <span>团队：{comp.teamSize}人</span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-4">团队角色</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {thoughtData.projectManagement.roles.map((role, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-electric-glow shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

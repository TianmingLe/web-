import { Target, Code2, Kanban, Compass, Lightbulb, Award } from 'lucide-react'
import GlassCard from '@components/GlassCard'
import thoughtData from '@data/thought.json'

export default function ThoughtPage() {
  return (
    <div className="relative py-28 md:py-40 px-4 md:px-6 section-divider">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-primary/80 text-xs md:text-sm font-semibold tracking-[0.3em] uppercase mb-4">
            {thoughtData.subtitle}
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-6 tracking-tight">
            {thoughtData.title}
          </h2>
          <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {thoughtData.description}
          </p>
        </div>

        <GlassCard className="mb-16 p-5 flex items-center gap-4 border-primary/20" glowColor="blue">
          <Lightbulb size={20} className="text-primary shrink-0" />
          <p className="text-text-secondary text-sm leading-relaxed italic">
            {thoughtData.guidingThought}
          </p>
        </GlassCard>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Target size={24} className="text-primary" />
            <h3 className="text-2xl md:text-4xl font-semibold text-white">职业规划时间轴</h3>
          </div>
          <div className="relative">
            <div 
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px"
              style={{
                background: 'linear-gradient(180deg, #007aff 0%, #34c759 50%, #af52de 100%)',
                opacity: 0.6,
              }}
            />
            <div className="space-y-16 md:space-y-0">
              {thoughtData.career.map((item, index) => {
                const isLeft = index % 2 === 0
                return (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row gap-4 md:gap-0 md:py-0 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    <div className="hidden md:block md:w-1/2" />
                    
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full z-10 flex items-center justify-center">
                      <div 
                        className="w-full h-full rounded-full"
                        style={{
                          background: 'linear-gradient(135deg, #007aff 0%, #34c759 100%)',
                          boxShadow: '0 0 30px rgba(0, 122, 255, 0.5), 0 0 60px rgba(52, 199, 89, 0.2)',
                        }}
                      />
                      <div 
                        className="absolute w-7 h-7 rounded-full flex items-center justify-center"
                        style={{
                          background: '#0a0a0a',
                          boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5)',
                        }}
                      >
                        <span className="text-xs font-bold text-primary">
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <div className={`md:w-1/2 ml-16 md:ml-0 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                      <div className="inline-block max-w-md">
                        <div 
                          className="relative group"
                          style={{
                            perspective: '1000px',
                          }}
                        >
                          <div 
                            className="relative p-8 rounded-2xl transition-all duration-500 group-hover:scale-[1.02]"
                            style={{
                              background: 'rgba(255, 255, 255, 0.02)',
                              backdropFilter: 'blur(24px)',
                              WebkitBackdropFilter: 'blur(24px)',
                              border: '1px solid rgba(255, 255, 255, 0.06)',
                              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            }}
                          >
                            <div 
                              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                              style={{
                                background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.05) 0%, rgba(52, 199, 89, 0.05) 100%)',
                              }}
                            />
                            
                            <div className="relative z-10">
                              <h4 className="text-xl font-semibold text-white mb-4 leading-tight">
                                {item.phase}
                              </h4>
                              <p className="text-text-secondary text-base leading-relaxed mb-4">
                                {item.content}
                              </p>
                              <div
                                className={`flex flex-wrap gap-2 ${
                                  isLeft ? 'md:justify-end' : 'md:justify-start'
                                }`}
                              >
                                {item.tags.map((tag, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full"
                                    style={{
                                      background: 'linear-gradient(135deg, rgba(0, 122, 255, 0.2) 0%, rgba(52, 199, 89, 0.2) 100%)',
                                      color: '#00d4ff',
                                      border: '1px solid rgba(0, 122, 255, 0.3)',
                                    }}
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-accent-light" />
            <h3 className="text-2xl font-semibold text-white">核心优势</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {thoughtData.coreAdvantages.map((adv, index) => (
              <GlassCard key={index} className="p-5 text-center" glowColor="purple">
                <p className="text-text-secondary text-sm leading-relaxed">{adv}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <Code2 size={24} className="text-accent-light" />
            <h3 className="text-2xl font-semibold text-white">
              {thoughtData.vibeCoding.title}
            </h3>
          </div>
          <p className="text-text-secondary text-sm mb-8">
            {thoughtData.vibeCoding.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            {thoughtData.vibeCoding.steps.map((step, index) => (
              <GlassCard key={index} className="p-5 relative" glowColor="blue">
                <span className="absolute top-3 right-3 text-3xl font-black text-primary/15">
                  {index + 1}
                </span>
                <h4 className="text-base font-semibold text-white mb-2">
                  {step.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.content}
                </p>
              </GlassCard>
            ))}
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-widest mb-3">实践案例</p>
            <div className="flex flex-wrap gap-3">
              {thoughtData.vibeCoding.cases.map((c, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm rounded-full bg-white/3 text-text-secondary border border-white/6"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Compass size={24} className="text-primary-light" />
            <h3 className="text-2xl font-semibold text-white">
              {thoughtData.techSelection.title}
            </h3>
          </div>
          <p className="text-text-muted text-sm mb-6">{thoughtData.techSelection.subtitle}</p>
          <GlassCard className="p-6 mb-8 border-primary/20" glowColor="blue">
            <p className="text-xs uppercase tracking-widest text-primary mb-2">案例</p>
            <p className="text-text-secondary text-sm leading-relaxed">
              {thoughtData.techSelection.caseStudy}
            </p>
          </GlassCard>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {thoughtData.techSelection.principles.map((p, index) => (
              <GlassCard key={index} className="p-5" glowColor="purple">
                <h4 className="text-base font-semibold text-white mb-2">
                  {p.dimension}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Kanban size={24} className="text-primary" />
            <h3 className="text-2xl font-semibold text-white">
              {thoughtData.projectManagement.title}
            </h3>
          </div>
          <p className="text-text-secondary text-sm mb-8">
            {thoughtData.projectManagement.description}
          </p>
          <div className="space-y-4 mb-10">
            {thoughtData.projectManagement.competitions.map((comp, index) => (
              <GlassCard key={index} className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="text-base font-semibold text-white">{comp.name}</h4>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-accent-light/15 text-accent-light border border-accent-light/25">
                      {comp.level}
                    </span>
                  </div>
                  <span className="text-text-muted text-xs">{comp.period}</span>
                </div>
                {'project' in comp && comp.project && (
                  <p className="text-primary/80 text-sm mb-2">{comp.project}</p>
                )}
                <p className="text-text-secondary text-sm leading-relaxed mb-2">{comp.work}</p>
                <div className="flex flex-wrap gap-3 text-xs text-text-muted">
                  <span>角色：{comp.role}</span>
                  {'teamSize' in comp && comp.teamSize && (
                    <span>团队：{comp.teamSize}人</span>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
          <div>
            <p className="text-text-muted text-xs uppercase tracking-widest mb-4">团队角色</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {thoughtData.projectManagement.roles.map((role, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                >
                  <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                  <p className="text-text-secondary text-sm leading-relaxed">{role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
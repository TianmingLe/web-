import { Target, Code2, Kanban } from 'lucide-react'
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Code2 size={24} className="text-accent-light" />
            <h3 className="text-2xl font-bold text-white">
              {thoughtData.vibeCoding.title}
            </h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            {thoughtData.vibeCoding.description}
          </p>
          <div className="space-y-4">
            {thoughtData.vibeCoding.items.map((item, index) => (
              <GlassCard key={index} className="p-5">
                <h4 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.content}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Kanban size={24} className="text-electric-glow" />
            <h3 className="text-2xl font-bold text-white">
              {thoughtData.projectManagement.title}
            </h3>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            {thoughtData.projectManagement.description}
          </p>
          <div className="space-y-4">
            {thoughtData.projectManagement.items.map((item, index) => (
              <GlassCard key={index} className="p-5">
                <h4 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.content}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

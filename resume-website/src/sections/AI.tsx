import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import aiData from '@data/ai.json'

export default function AI() {
  return (
    <SectionLayout
      id="ai"
      title={aiData.title}
      subtitle={aiData.subtitle}
      description={aiData.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {aiData.projects.map((project, index) => (
          <GlassCard key={index} className="p-6 flex flex-col h-full">
            <h3 className="text-xl font-semibold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
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

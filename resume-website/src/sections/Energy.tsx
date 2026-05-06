import { Monitor, Code, Cpu, FlaskConical, ClipboardList } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import energyData from '@data/energy.json'

const iconMap: Record<string, React.ReactNode> = {
  monitor: <Monitor size={28} />,
  code: <Code size={28} />,
  cpu: <Cpu size={28} />,
  'flask-conical': <FlaskConical size={28} />,
  'clipboard-list': <ClipboardList size={28} />,
}

export default function Energy() {
  return (
    <SectionLayout
      id="energy"
      title={energyData.title}
      subtitle={energyData.subtitle}
      description={energyData.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {energyData.skills.map((skill, index) => (
          <GlassCard key={index} className="p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary">{iconMap[skill.icon]}</span>
              <h3 className="text-lg font-semibold text-white">
                {skill.category}
              </h3>
            </div>
            <p className="text-primary/60 text-xs mb-3">{skill.keywords}</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {skill.summary}
            </p>
            <ul className="space-y-2 mb-4">
              {skill.items.map((item, i) => (
                <li
                  key={i}
                  className="text-gray-300 text-sm flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                  <span>
                    <span className="font-medium text-white">{item.name}</span>
                    <span className="text-gray-400"> — {item.desc}</span>
                  </span>
                </li>
              ))}
            </ul>
            {skill.scenarios && (
              <div className="border-t border-white/5 pt-4 mt-auto">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  应用场景
                </h4>
                <ul className="space-y-1.5">
                  {skill.scenarios.map((s, i) => (
                    <li
                      key={i}
                      className="text-gray-400 text-xs flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {skill.practices && (
              <div className="border-t border-white/5 pt-4 mt-auto">
                <h4 className="text-sm font-semibold text-primary mb-2">
                  项目实践
                </h4>
                <ul className="space-y-1.5">
                  {skill.practices.map((p, i) => (
                    <li
                      key={i}
                      className="text-gray-400 text-xs flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {skill.projects && (
              <div className="border-t border-white/5 pt-4 mt-auto">
                <h4 className="text-sm font-semibold text-primary mb-3">
                  项目作品
                </h4>
                <div className="space-y-2">
                  {skill.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-white/5 border border-white/5 px-3 py-2"
                    >
                      <p className="text-white text-sm font-medium">
                        {proj.name}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </SectionLayout>
  )
}

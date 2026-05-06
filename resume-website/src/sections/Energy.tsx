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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {energyData.skills.map((skill, index) => (
          <GlassCard key={index} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-primary">{iconMap[skill.icon]}</span>
              <h3 className="text-lg font-semibold text-white">
                {skill.category}
              </h3>
            </div>
            <ul className="space-y-2">
              {skill.items.map((item, i) => (
                <li
                  key={i}
                  className="text-gray-400 text-sm flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </SectionLayout>
  )
}

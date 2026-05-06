import { Play, FileText } from 'lucide-react'
import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'
import mediaData from '@data/media.json'

const platformIcons: Record<string, React.ReactNode> = {
  B站: <Play size={20} />,
  抖音: <Play size={20} />,
  小红书: <FileText size={20} />,
}

export default function Media() {
  return (
    <SectionLayout
      id="media"
      title={mediaData.title}
      subtitle={mediaData.subtitle}
      description={mediaData.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {mediaData.platforms.map((platform, index) => (
          <GlassCard key={index} className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-primary">{platformIcons[platform.name]}</span>
              <h3 className="text-lg font-semibold text-white">
                {platform.name}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary mb-1">
                  {platform.followers}
                </p>
                <p className="text-xs text-gray-500">粉丝</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">
                  {platform.videos || platform.notes}
                </p>
                <p className="text-xs text-gray-500">
                  {platform.videos ? '视频' : '笔记'}
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">
                  {platform.views || platform.likes}
                </p>
                <p className="text-xs text-gray-500">
                  {platform.views ? '播放' : '点赞'}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mediaData.projects.map((project, index) => (
          <GlassCard key={index} className="p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent-light border border-accent/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionLayout>
  )
}

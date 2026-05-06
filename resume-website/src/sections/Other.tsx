import SectionLayout from '@layouts/SectionLayout'
import GlassCard from '@components/GlassCard'

const awards = [
  { name: '数学建模竞赛', level: '省级一等奖', time: '2025.09' },
  { name: '市场调查与分析大赛', level: '省级一等奖', time: '2026.01-03' },
  { name: '市场调查与分析大赛', level: '校级二等奖', time: '2025.02-03' },
  { name: '英语高教杯视频制作', level: '校级二等奖', time: '2024.10-11' },
]

const certificates = [
  '大学英语四级（CET-4）',
  '机动车驾驶证（C1）',
  '轻型无人机驾驶证',
]

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/TianmingLe',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    label: '哔哩哔哩',
    href: 'https://b23.tv/NPxHvW4',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z"/>
      </svg>
    ),
  },
  {
    label: '小红书',
    href: 'https://xhslink.com/m/5h3GEynfA7n',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.615 14.615h-2.77v-4.615h-3.69v4.615H7.385V7.385h2.77v4.615h3.69V7.385h2.77v9.23z"/>
      </svg>
    ),
  },
  {
    label: '抖音',
    href: 'https://v.douyin.com/mMECQWKw-Vs/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
  },
]

export default function Other() {
  return (
    <SectionLayout
      id="other"
      title="其他"
      subtitle="获奖情况、证书与联系方式"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 获奖情况 */}
        <GlassCard glowColor="cyan">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            获奖情况
          </h3>
          <div className="grid gap-3">
            {awards.map((award, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/20 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{award.name}</p>
                  <p className="text-sm text-gray-400">{award.time}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {award.level}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* 证书与联系方式 */}
        <div className="grid md:grid-cols-2 gap-6">
          <GlassCard glowColor="purple">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              证书情况
            </h3>
            <div className="space-y-2">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-gray-300">{cert}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard glowColor="blue">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric" />
              联系方式
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-12">电话</span>
                <span className="text-white">19935072544</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400 text-sm w-12">邮箱</span>
                <span className="text-white">1767976037@qq.com</span>
              </div>
            </div>

            {/* 社交链接 */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">社交媒体</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </SectionLayout>
  )
}

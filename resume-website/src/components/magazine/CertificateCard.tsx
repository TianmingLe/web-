import { useState } from 'react'

interface CertificateCardProps {
  name: string
  desc: string
}

export default function CertificateCard({ name, desc }: CertificateCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative p-4 rounded transition-all duration-300 cursor-pointer"
      style={{
        background: '#F5E6D3',
        boxShadow: hovered
          ? '0 8px 24px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)'
          : '0 2px 8px rgba(0,0,0,0.15)',
        transform: hovered ? 'translateY(-4px) rotate(-1deg)' : 'rotate(0deg)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 证书内容 */}
      <div className="border border-dashed border-amber-800/30 p-3 rounded">
        <p className="text-amber-900 text-xs font-medium leading-tight">
          {name}
        </p>
        <p className="text-amber-700/60 text-[10px] mt-1">{desc}</p>
      </div>

      {/* 红色印章装饰 */}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border-2 border-red-700/40 flex items-center justify-center"
        style={{ transform: 'rotate(-15deg)' }}
      >
        <span className="text-red-700/40 text-[8px] font-bold">证</span>
      </div>
    </div>
  )
}

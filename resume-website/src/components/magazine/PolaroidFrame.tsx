import { useState } from 'react'
import { type ReactNode } from 'react'

interface PolaroidFrameProps {
  children: ReactNode
  caption?: string
  rotation?: number
}

export default function PolaroidFrame({
  children,
  caption,
  rotation = -3,
}: PolaroidFrameProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative p-3 pb-10 bg-white rounded shadow-lg transition-all duration-300"
      style={{
        transform: `rotate(${hovered ? 0 : rotation}deg) scale(${hovered ? 1.03 : 1})`,
        boxShadow: hovered
          ? '0 12px 32px rgba(0,0,0,0.25)'
          : '0 4px 12px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 胶带装饰 */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 bg-amber-100/80 rounded-sm"
        style={{ transform: 'translateX(-50%) rotate(-2deg)' }}
      />

      {/* 照片区域 */}
      <div className="bg-gray-100 rounded overflow-hidden">{children}</div>

      {/* 底部文字 */}
      {caption && (
        <p className="absolute bottom-2 left-0 right-0 text-center text-gray-600 text-xs font-handwriting">
          {caption}
        </p>
      )}
    </div>
  )
}

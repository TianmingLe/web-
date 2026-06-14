import { useState } from 'react'

interface StickyNoteProps {
  front: string
  back: string
  color?: 'yellow' | 'blue' | 'pink'
  rotation?: number
  className?: string
}

const colorMap = {
  yellow: { bg: '#fef3c7', text: '#92400e', backBg: '#fde68a' },
  blue: { bg: '#dbeafe', text: '#1e40af', backBg: '#bfdbfe' },
  pink: { bg: '#fce7f3', text: '#9d174d', backBg: '#fbcfe8' },
}

export default function StickyNote({
  front,
  back,
  color = 'yellow',
  rotation = 3,
  className = '',
}: StickyNoteProps) {
  const [flipped, setFlipped] = useState(false)
  const colors = colorMap[color]

  return (
    <div
      className={`relative w-36 h-36 cursor-pointer ${className}`}
      style={{ perspective: '400px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="w-full h-full rounded shadow-md transition-transform duration-500 ease-in-out p-3"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : `rotate(${rotation}deg)`,
          background: flipped ? colors.backBg : colors.bg,
        }}
      >
        {/* 正面 */}
        <div
          className="absolute inset-0 p-3 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <p className="text-xs font-sans leading-relaxed" style={{ color: colors.text }}>
            {front}
          </p>
        </div>

        {/* 背面 */}
        <div
          className="absolute inset-0 p-3 flex items-center justify-center rounded"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: colors.backBg,
          }}
        >
          <p className="text-xs font-sans leading-relaxed" style={{ color: colors.text }}>
            {back}
          </p>
        </div>
      </div>
    </div>
  )
}

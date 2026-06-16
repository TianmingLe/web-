import { useState, useRef, useEffect } from 'react'
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react'
import LazyImage from '@components/LazyImage'

interface MediaItem {
  src: string
  type: 'image' | 'video'
  caption?: string
  thumbnail?: string
}

interface ProjectShowcaseProps {
  items: MediaItem[]
  className?: string
}

export default function ProjectShowcase({ items, className = '' }: ProjectShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const activeItem = items[activeIndex]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const navigateLightbox = (dir: number) => {
    setLightboxIndex((prev) => {
      const next = prev + dir
      if (next < 0) return items.length - 1
      if (next >= items.length) return 0
      return next
    })
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') setLightboxIndex((prev) => (prev - 1 + items.length) % items.length)
      if (e.key === 'ArrowRight') setLightboxIndex((prev) => (prev + 1) % items.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [lightboxOpen, items.length])

  if (items.length === 0) return null

  return (
    <>
      {/* 主展示区域 */}
      <div className={`relative rounded-2xl overflow-hidden bg-b-card border border-b-border ${className}`}>
        {/* 主媒体 */}
        <div
          className="relative aspect-video cursor-pointer group"
          onClick={() => openLightbox(activeIndex)}
        >
          {activeItem.type === 'video' ? (
            <>
              <video
                ref={videoRef}
                src={activeItem.src}
                className="w-full h-full object-cover"
                poster={activeItem.thumbnail}
                muted
                loop
                playsInline
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={24} className="text-b-ink ml-1" />
                </div>
              </div>
            </>
          ) : (
            <LazyImage
              src={activeItem.src}
              alt={activeItem.caption || ''}
              aspectRatio="16/9"
              objectFit="cover"
              className="w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          )}

          {/* 悬停提示 */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full font-b-mono">
              点击放大
            </span>
          </div>

          {/* 计数器 */}
          <div className="absolute bottom-3 left-3">
            <span className="bg-black/60 text-white text-xs px-2.5 py-1 rounded-full font-b-mono">
              {activeIndex + 1} / {items.length}
            </span>
          </div>
        </div>

        {/* 缩略图导航 */}
        {items.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto" ref={scrollRef}>
            {items.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIndex
                    ? 'border-b-terracotta ring-2 ring-b-terracotta/20'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                {item.type === 'video' ? (
                  <div className="w-full h-full bg-b-slate-dim flex items-center justify-center">
                    <Play size={16} className="text-b-slate" />
                  </div>
                ) : (
                  <LazyImage
                    src={item.src}
                    alt=""
                    aspectRatio="1/1"
                    objectFit="cover"
                    className="w-full h-full"
                  />
                )}
              </button>
            ))}
          </div>
        )}

        {/* 标题 */}
        {activeItem.caption && (
          <div className="px-4 pb-3 pt-1">
            <p className="text-sm text-b-muted font-b-sans">{activeItem.caption}</p>
          </div>
        )}
      </div>

      {/* Lightbox 全屏查看 */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* 关闭按钮 */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
          >
            <X size={20} className="text-white" />
          </button>

          {/* 导航按钮 */}
          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft size={20} className="text-white" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight size={20} className="text-white" />
              </button>
            </>
          )}

          {/* 媒体内容 */}
          <div
            className="max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {items[lightboxIndex].type === 'video' ? (
              <video
                src={items[lightboxIndex].src}
                className="max-w-full max-h-[85vh] rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <LazyImage
                src={items[lightboxIndex].src}
                alt={items[lightboxIndex].caption || ''}
                aspectRatio="auto"
                objectFit="contain"
                className="max-w-full max-h-[85vh] rounded-lg"
              />
            )}
          </div>

          {/* 底部信息 */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-white/80 text-sm font-b-sans">
              {items[lightboxIndex].caption || `${lightboxIndex + 1} / ${items.length}`}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

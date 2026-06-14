import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { CornerOrnament, PageHeader, PageFooter } from './MagazineDecorations'

interface MagazineSpreadProps {
  leftTitle: ReactNode
  rightTitle: ReactNode
  leftContent: ReactNode
  rightContent: ReactNode
  pageNum: number
  className?: string
}

export default function MagazineSpread({
  leftTitle,
  rightTitle,
  leftContent,
  rightContent,
  pageNum,
  className = '',
}: MagazineSpreadProps) {
  const spreadRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!spreadRef.current || !leftRef.current || !rightRef.current) return

    const ctx = gsap.context(() => {
      // 3D 翻入动画（仅桌面端）
      const isMobile = window.innerWidth < 768

      if (!isMobile) {
        gsap.fromTo(
          leftRef.current,
          { rotateY: -8, opacity: 0, transformOrigin: 'right center' },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: spreadRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )

        gsap.fromTo(
          rightRef.current,
          { rotateY: 8, opacity: 0, transformOrigin: 'left center' },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: spreadRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      } else {
        // 移动端：简单淡入上滑
        gsap.fromTo(
          [leftRef.current, rightRef.current],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: spreadRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, spreadRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={spreadRef}
      className={`py-16 md:py-24 ${className}`}
      style={{ perspective: '1200px' }}
    >
      {/* 中缝阴影（仅桌面端） */}
      <div className="hidden md:block max-w-6xl mx-auto px-6 relative">
        <div className="flex relative" style={{ minHeight: '700px' }}>
          {/* 中缝阴影 */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.15), transparent, rgba(0,0,0,0.15))',
            }}
          />

          {/* 左页 */}
          <div
            ref={leftRef}
            className="flex-1 p-8 relative"
            style={{
              background: '#14110F',
              borderRadius: '8px 0 0 8px',
              borderRight: '1px solid #3D3530',
              transformStyle: 'preserve-3d',
            }}
          >
            <CornerOrnament position="tl" />
            <CornerOrnament position="bl" />
            <PageHeader title={leftTitle} />
            {leftContent}
            <PageFooter pageNum={pageNum} />
          </div>

          {/* 右页 */}
          <div
            ref={rightRef}
            className="flex-1 p-8 relative"
            style={{
              background: '#14110F',
              borderRadius: '0 8px 8px 0',
              transformStyle: 'preserve-3d',
            }}
          >
            <CornerOrnament position="tr" />
            <CornerOrnament position="br" />
            <PageHeader title={rightTitle} />
            {rightContent}
            <PageFooter pageNum={pageNum + 1} />
          </div>
        </div>
      </div>

      {/* 移动端：单栏堆叠 */}
      <div className="md:hidden px-4 space-y-6">
        <div
          ref={leftRef}
          className="p-6 rounded-lg"
          style={{ background: '#14110F' }}
        >
          <PageHeader title={leftTitle} />
          {leftContent}
        </div>
        <div
          ref={rightRef}
          className="p-6 rounded-lg"
          style={{ background: '#14110F' }}
        >
          <PageHeader title={rightTitle} />
          {rightContent}
        </div>
      </div>
    </div>
  )
}

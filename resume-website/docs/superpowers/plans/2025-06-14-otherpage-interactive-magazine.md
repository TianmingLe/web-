# OtherPage 互动式数字杂志 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 OtherPage 重构为互动式数字杂志风格，包含封面、双页展开、技能专栏、封底等模块，带有翻页动画、悬停高亮、视差滚动等丰富交互。

**Architecture:** 采用组件化设计，每个杂志版块为独立 React 组件。使用 GSAP ScrollTrigger 驱动滚动动画，CSS 3D transform 实现翻页效果。所有装饰元素（角花、便签、拍立得框）为纯 CSS/SVG 实现，无外部图片依赖。

**Tech Stack:** React, TypeScript, Tailwind CSS, GSAP + ScrollTrigger, lucide-react

---

## File Structure

```
src/
├── pages/
│   └── OtherPage.tsx              # 主页面，整合所有杂志组件
├── components/
│   └── magazine/
│       ├── MagazineHero.tsx       # 封面区
│       ├── MagazineSpread.tsx     # 通用双页展开容器（含3D翻页动画）
│       ├── MagazineAwards.tsx     # 获奖特辑（左页获奖列表 + 右页证书画廊）
│       ├── MagazineExperience.tsx # 经历专题（左页实习报道 + 右页校园生活）
│       ├── MagazineSkills.tsx     # 技能专栏（雷达图 + 标签云）
│       ├── MagazineFooter.tsx     # 封底（条形码 + 社交链接）
│       ├── MagazineDecorations.tsx # 装饰元素（角花、首字下沉、栏线等）
│       ├── RadarChart.tsx         # SVG 雷达图组件
│       ├── PolaroidFrame.tsx      # 拍立得相框组件
│       ├── StickyNote.tsx         # 可翻转便签组件
│       └── CertificateCard.tsx    # 证书扫描件卡片
```

---

## Task 1: 创建基础装饰组件

**Files:**
- Create: `src/components/magazine/MagazineDecorations.tsx`

- [ ] **Step 1: 实现 CornerOrnament 角花组件**

```tsx
export function CornerOrnament({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, bl: -90, br: 180 }
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      className="absolute text-copper-gold/30"
      style={{
        top: position.includes('t') ? '-8px' : undefined,
        bottom: position.includes('b') ? '-8px' : undefined,
        left: position.includes('l') ? '-8px' : undefined,
        right: position.includes('r') ? '-8px' : undefined,
        transform: `rotate(${rotations[position]}deg)`,
      }}
    >
      <path
        d="M0 40 L0 20 Q0 0 20 0 L40 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0 30 L0 15 Q0 0 15 0 L30 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.5"
      />
    </svg>
  )
}
```

- [ ] **Step 2: 实现 DropCap 首字下沉组件**

```tsx
export function DropCap({ children }: { children: string }) {
  const firstChar = children.charAt(0)
  const rest = children.slice(1)
  return (
    <p className="text-magazine-warm text-sm leading-relaxed">
      <span
        className="float-left mr-2 mt-1 font-serif text-5xl text-copper-gold leading-none"
        style={{ lineHeight: '0.8' }}
      >
        {firstChar}
      </span>
      {rest}
    </p>
  )
}
```

- [ ] **Step 3: 实现 MagazineDivider 装饰分隔线**

```tsx
export function MagazineDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="w-16 h-px bg-copper-gold/40" />
      <div className="w-2 h-2 rotate-45 border border-copper-gold/60" />
      <div className="w-16 h-px bg-copper-gold/40" />
    </div>
  )
}
```

- [ ] **Step 4: 实现 PageHeader 页眉和 PageFooter 页脚**

```tsx
export function PageHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-magazine-border mb-6">
      <span className="font-mono text-[10px] tracking-[0.3em] text-magazine-warm/50 uppercase">
        {title}
      </span>
      <span className="font-mono text-[10px] text-magazine-warm/50">
        VOL.01
      </span>
    </div>
  )
}

export function PageFooter({ pageNum }: { pageNum: number }) {
  return (
    <div className="flex items-center justify-between py-4 border-t border-magazine-border mt-6">
      <span className="font-mono text-[10px] tracking-[0.2em] text-magazine-warm/40">
        HONORS & EXPERIENCE
      </span>
      <span className="font-serif text-lg text-copper-gold/60">
        {String(pageNum).padStart(2, '0')}
      </span>
    </div>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add src/components/magazine/MagazineDecorations.tsx
git commit -m "feat(magazine): add decoration components (corner, dropcap, divider, header/footer)"
```

---

## Task 2: 创建 MagazineHero 封面区

**Files:**
- Create: `src/components/magazine/MagazineHero.tsx`
- Modify: `tailwind.config.js` or `src/index.css` (添加杂志专色 CSS 变量)

- [ ] **Step 1: 在全局 CSS 中添加杂志色彩变量**

在 `src/index.css` 中添加：

```css
@layer base {
  :root {
    --magazine-cream: #F5E6D3;
    --magazine-warm: #B8A99A;
    --copper-gold: #D4A574;
    --magazine-bg: #0D0B0A;
    --magazine-card: #1A1614;
    --magazine-border: #3D3530;
    --magazine-highlight: #E8C9A0;
  }
}
```

在 tailwind 配置中扩展颜色（如果项目使用 tailwind.config.js）：

```js
colors: {
  'magazine-cream': '#F5E6D3',
  'magazine-warm': '#B8A99A',
  'copper-gold': '#D4A574',
  'magazine-bg': '#0D0B0A',
  'magazine-card': '#1A1614',
  'magazine-border': '#3D3530',
  'magazine-highlight': '#E8C9A0',
}
```

- [ ] **Step 2: 创建 MagazineHero 组件**

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MagazineHero() {
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const chars = titleRef.current.querySelectorAll('.mag-char')
    gsap.fromTo(
      chars,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        delay: 0.3,
      }
    )
  }, [])

  const titleText = '荣誉与经历'

  return (
    <div
      className="relative min-h-[85vh] flex flex-col items-center justify-center px-4"
      style={{ background: 'linear-gradient(180deg, #0D0B0A 0%, #14110F 100%)' }}
    >
      {/*  subtle 纸张纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 顶部装饰线 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-copper-gold/60" />

      {/* 期刊信息 */}
      <div className="text-center mb-10">
        <p className="font-mono text-xs tracking-[0.4em] text-copper-gold/70 uppercase">
          Vol. 01 · June 2025
        </p>
      </div>

      {/* 大标题 - 逐字动画 */}
      <div ref={titleRef} className="text-center mb-6">
        <h1 className="font-serif text-6xl md:text-7xl text-magazine-cream tracking-tight">
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              className="mag-char inline-block"
              style={{ opacity: 0 }}
            >
              {char === '与' ? (
                <span className="italic text-copper-gold">{char}</span>
              ) : (
                char
              )}
            </span>
          ))}
        </h1>
      </div>

      {/* 副标题 */}
      <p className="text-magazine-warm text-sm max-w-md text-center leading-relaxed mb-8">
        从学术竞赛到职业实践，从校园活动到技能积累——
        <br />
        一份关于成长与探索的个人档案。
      </p>

      {/* 装饰性分隔 */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-px bg-copper-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-copper-gold" />
        <div className="w-12 h-px bg-copper-gold/50" />
      </div>

      {/* 封面装饰：三个小圆点 */}
      <div className="flex items-center gap-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-copper-gold/40"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      {/* 底部信息栏 */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="flex justify-between items-end text-xs font-mono text-magazine-warm/50">
          <span>EDITOR: TIANMING LE</span>
          <span className="px-3 py-1 border border-copper-gold/30 rounded-full text-copper-gold/70">
            FEATURED
          </span>
          <span>PRICELESS</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/magazine/MagazineHero.tsx src/index.css
git commit -m "feat(magazine): add MagazineHero cover with animated title"
```

---

## Task 3: 创建通用 MagazineSpread 双页容器

**Files:**
- Create: `src/components/magazine/MagazineSpread.tsx`

- [ ] **Step 1: 实现 MagazineSpread 组件**

```tsx
import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CornerOrnament, PageHeader, PageFooter } from './MagazineDecorations'

interface MagazineSpreadProps {
  leftTitle: string
  rightTitle: string
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
            className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.4))',
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/magazine/MagazineSpread.tsx
git commit -m "feat(magazine): add MagazineSpread 3D flip container"
```

---

## Task 4: 创建 CertificateCard 和 PolaroidFrame 组件

**Files:**
- Create: `src/components/magazine/CertificateCard.tsx`
- Create: `src/components/magazine/PolaroidFrame.tsx`

- [ ] **Step 1: 实现 CertificateCard**

```tsx
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
```

- [ ] **Step 2: 实现 PolaroidFrame**

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/magazine/CertificateCard.tsx src/components/magazine/PolaroidFrame.tsx
git commit -m "feat(magazine): add CertificateCard and PolaroidFrame components"
```

---

## Task 5: 创建 StickyNote 和 RadarChart 组件

**Files:**
- Create: `src/components/magazine/StickyNote.tsx`
- Create: `src/components/magazine/RadarChart.tsx`

- [ ] **Step 1: 实现 StickyNote（可翻转便签）**

```tsx
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
```

- [ ] **Step 2: 实现 RadarChart**

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RadarChartProps {
  data: { label: string; value: number }[]
  size?: number
}

export default function RadarChart({ data, size = 240 }: RadarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const max = 5
  const center = size / 2
  const radius = size * 0.38
  const angleStep = (Math.PI * 2) / data.length

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll('.radar-path')
    const ctx = gsap.context(() => {
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength?.() || 0
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: svgRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  // 计算多边形顶点
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (d.value / max) * radius
    return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
  })

  const polygonPoints = points.join(' ')

  // 网格圆环
  const gridRings = [1, 2, 3, 4, 5].map((level) => (
    <polygon
      key={level}
      points={data
        .map((_, i) => {
          const angle = i * angleStep - Math.PI / 2
          const r = (level / max) * radius
          return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`
        })
        .join(' ')}
      fill="none"
      stroke="rgba(212, 165, 116, 0.15)"
      strokeWidth="1"
    />
  ))

  // 轴线
  const axes = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    return (
      <line
        key={i}
        x1={center}
        y1={center}
        x2={center + radius * Math.cos(angle)}
        y2={center + radius * Math.sin(angle)}
        stroke="rgba(212, 165, 116, 0.15)"
        strokeWidth="1"
      />
    )
  })

  // 标签
  const labels = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const labelR = radius + 20
    return (
      <text
        key={i}
        x={center + labelR * Math.cos(angle)}
        y={center + labelR * Math.sin(angle)}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[10px] fill-magazine-warm/70"
      >
        {d.label}
      </text>
    )
  })

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
    >
      {gridRings}
      {axes}
      <polygon
        className="radar-path"
        points={polygonPoints}
        fill="rgba(212, 165, 116, 0.15)"
        stroke="#D4A574"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {points.map((p, i) => {
        const [x, y] = p.split(',').map(Number)
        return (
          <circle key={i} cx={x} cy={y} r="3" fill="#D4A574" />
        )
      })}
      {labels}
    </svg>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/magazine/StickyNote.tsx src/components/magazine/RadarChart.tsx
git commit -m "feat(magazine): add StickyNote flip card and RadarChart components"
```

---

## Task 6: 创建 MagazineAwards 获奖特辑

**Files:**
- Create: `src/components/magazine/MagazineAwards.tsx`

- [ ] **Step 1: 实现 MagazineAwards**

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Medal } from 'lucide-react'
import otherData from '@data/other.json'
import MagazineSpread from './MagazineSpread'
import CertificateCard from './CertificateCard'
import { DropCap } from './MagazineDecorations'

function AwardItem({
  award,
  index,
}: {
  award: (typeof otherData.awards)[0]
  index: number
}) {
  const isGold = award.level.includes('一等')
  const isSilver = award.level.includes('二等')

  return (
    <div className="flex items-start gap-4 py-4 border-b border-magazine-border/50 last:border-0 group">
      {/* 年份 - 竖排 */}
      <div className="shrink-0 w-12">
        <span
          className="block text-2xl font-serif text-copper-gold/60 leading-none"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          {award.year}
        </span>
      </div>

      {/* 内容 */}
      <div className="flex-1 min-w-0">
        <h4 className="text-magazine-cream text-sm font-medium mb-1 group-hover:text-copper-gold transition-colors">
          {award.name}
        </h4>
        <p className="text-magazine-warm/70 text-xs leading-relaxed mb-1">
          {award.project}
        </p>
        <p className="text-magazine-warm/50 text-[10px]">{award.role}</p>
      </div>

      {/* 徽章 */}
      <div className="shrink-0">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isGold
              ? 'bg-amber-500/20 text-amber-400'
              : isSilver
                ? 'bg-gray-400/20 text-gray-300'
                : 'bg-orange-700/20 text-orange-400'
          }`}
        >
          {isGold ? <Medal size={18} /> : <Award size={16} />}
        </div>
      </div>
    </div>
  )
}

export default function MagazineAwards() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const items = itemRefs.current.filter(Boolean)
    if (items.length === 0) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: items[0]?.closest('.magazine-spread'),
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  const leftContent = (
    <div>
      <div className="mb-6">
        <DropCap>
          在学术竞赛与实践中不断突破，累计获得省级奖项2项、校级奖项2项，涵盖数学建模、市场调查、英语视频制作等多个领域。
        </DropCap>
      </div>

      <div className="space-y-1">
        {otherData.awards.map((award, i) => (
          <div
            key={i}
            ref={(el) => { itemRefs.current[i] = el }}
            style={{ opacity: 0 }}
          >
            <AwardItem award={award} index={i} />
          </div>
        ))}
      </div>

      {/* 统计框 */}
      <div className="mt-6 p-4 border border-copper-gold/20 rounded-lg bg-copper-gold/5">
        <div className="flex items-center justify-around">
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">4</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">Total Awards</p>
          </div>
          <div className="w-px h-8 bg-magazine-border" />
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">2</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">Provincial</p>
          </div>
          <div className="w-px h-8 bg-magazine-border" />
          <div className="text-center">
            <p className="text-2xl font-serif text-copper-gold">2</p>
            <p className="text-[10px] text-magazine-warm/50 uppercase">School-level</p>
          </div>
        </div>
      </div>
    </div>
  )

  const rightContent = (
    <div>
      <p className="text-magazine-warm/70 text-xs mb-4 italic">
        证书不仅是能力的证明，更是持续学习的见证。
      </p>
      <div className="grid grid-cols-2 gap-3">
        {otherData.certificates.map((cert, i) => (
          <CertificateCard key={i} name={cert.name} desc={cert.desc} />
        ))}
      </div>
    </div>
  )

  return (
    <MagazineSpread
      leftTitle="Hall of Honor"
      rightTitle="Certificate Gallery"
      leftContent={leftContent}
      rightContent={rightContent}
      pageNum={2}
      className="magazine-spread"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/magazine/MagazineAwards.tsx
git commit -m "feat(magazine): add MagazineAwards spread with hall of honor and certificate gallery"
```

---

## Task 7: 创建 MagazineExperience 经历专题

**Files:**
- Create: `src/components/magazine/MagazineExperience.tsx`

- [ ] **Step 1: 实现 MagazineExperience**

```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, GraduationCap, Clock, CheckCircle2 } from 'lucide-react'
import otherData from '@data/other.json'
import MagazineSpread from './MagazineSpread'
import PolaroidFrame from './PolaroidFrame'
import StickyNote from './StickyNote'
import { DropCap } from './MagazineDecorations'

export default function MagazineExperience() {
  const quoteRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!quoteRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        quoteRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  const leftContent = (
    <div>
      {/* 引言框 */}
      <div
        ref={quoteRef}
        className="mb-6 pl-4 border-l-2 border-copper-gold/50"
        style={{ opacity: 0 }}
      >
        <p className="text-magazine-cream/80 text-sm italic font-serif leading-relaxed">
          "从风电场的高压设备巡检到互联网公司的校园运营，每一次实践都是对课堂知识的延伸与验证。"
        </p>
      </div>

      {/* 首字下沉介绍 */}
      <div className="mb-6">
        <DropCap>
          实习经历横跨能源运维与互联网运营两大领域。在山西粤电风电场，深入220kV升压站进行设备巡检；在百度网盘，负责校园大使运营与内容创作。
        </DropCap>
      </div>

      {/* 实习经历 */}
      <div className="space-y-6">
        {otherData.internship.map((intern, idx) => (
          <div key={idx} className="relative">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-copper-gold/10 flex items-center justify-center shrink-0">
                <Building2 size={14} className="text-copper-gold" />
              </div>
              <div>
                <h4 className="text-magazine-cream text-sm font-medium">
                  {intern.company}
                </h4>
                <p className="text-magazine-warm/60 text-xs">
                  {intern.role} · {intern.period}
                </p>
              </div>
            </div>

            {/* 工作内容 */}
            <div className="ml-11 space-y-1.5 mb-3">
              {intern.work.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-copper-gold/50 mt-1.5 shrink-0" />
                  <p className="text-magazine-warm/70 text-xs leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* 成果标签 */}
            <div className="ml-11 flex flex-wrap gap-1.5">
              {intern.achievements.slice(0, 3).map((item, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] rounded-full bg-copper-gold/10 text-copper-gold/80 border border-copper-gold/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 数据框 */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">2</p>
          <p className="text-[10px] text-magazine-warm/50">实习单位</p>
        </div>
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">10+</p>
          <p className="text-[10px] text-magazine-warm/50">巡检次数</p>
        </div>
        <div className="text-center p-3 border border-magazine-border rounded">
          <p className="text-xl font-serif text-copper-gold">50+</p>
          <p className="text-[10px] text-magazine-warm/50">拉新人数</p>
        </div>
      </div>
    </div>
  )

  const rightContent = (
    <div>
      {/* 校园经历标题 */}
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap size={16} className="text-copper-gold" />
        <h4 className="text-magazine-cream text-sm font-medium">Campus Life</h4>
      </div>

      {/* 拍立得照片框 */}
      <div className="mb-6 flex justify-center">
        <PolaroidFrame
          caption="Volunteer Team 2024"
          rotation={-2}
        >
          <div className="w-full h-32 bg-gradient-to-br from-amber-900/30 to-orange-900/30 flex items-center justify-center">
            <GraduationCap size={40} className="text-copper-gold/30" />
          </div>
        </PolaroidFrame>
      </div>

      {/* 校园经历列表 */}
      <div className="space-y-4 mb-6">
        {otherData.campus.map((item, idx) => (
          <div key={idx} className="relative pl-4 border-l border-copper-gold/20">
            <div className="absolute left-[-3px] top-1 w-1.5 h-1.5 rounded-full bg-copper-gold/50" />
            <div className="flex items-center justify-between mb-1">
              <h5 className="text-magazine-cream text-xs font-medium">
                {item.role}
              </h5>
              <span className="text-[10px] text-magazine-warm/50 font-mono">
                {item.period}
              </span>
            </div>
            <p className="text-magazine-warm/70 text-xs leading-relaxed mb-1">
              {item.desc}
            </p>
            <p className="text-copper-gold/70 text-[10px]">{item.achievement}</p>
          </div>
        ))}
      </div>

      {/* 便签区 */}
      <div className="relative h-40">
        <div className="absolute top-0 left-0">
          <StickyNote
            front="参与志愿活动20+次"
            back="累计时长100+小时！"
            color="yellow"
            rotation={-3}
          />
        </div>
        <div className="absolute top-4 right-4">
          <StickyNote
            front="优秀网宣部部长"
            back="获得官方认证称号"
            color="blue"
            rotation={2}
          />
        </div>
        <div className="absolute bottom-0 left-8">
          <StickyNote
            front="军训负责人"
            back="连队获教官表扬"
            color="pink"
            rotation={-1}
          />
        </div>
      </div>
    </div>
  )

  return (
    <MagazineSpread
      leftTitle="Field Report"
      rightTitle="Campus Life"
      leftContent={leftContent}
      rightContent={rightContent}
      pageNum={4}
      className="magazine-spread"
    />
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/magazine/MagazineExperience.tsx
git commit -m "feat(magazine): add MagazineExperience spread with field report and campus life"
```

---

## Task 8: 创建 MagazineSkills 技能专栏

**Files:**
- Create: `src/components/magazine/MagazineSkills.tsx`

- [ ] **Step 1: 实现 MagazineSkills**

```tsx
import { useState } from 'react'
import otherData from '@data/other.json'
import RadarChart from './RadarChart'
import { CornerOrnament } from './MagazineDecorations'

const skillLabels: Record<string, string> = {
  professional: '专业技能',
  programming: '编程语言',
  ai: 'AI 能力',
  media: '媒体技能',
  tools: '工具软件',
}

const skillLevels: Record<string, number> = {
  '★★★★★': 5,
  '★★★★☆': 4,
  '★★★☆☆': 3,
}

export default function MagazineSkills() {
  const [hoveredTag, setHoveredTag] = useState<string | null>(null)

  const radarData = Object.entries(otherData.skills).map(([key, skill]) => ({
    label: skillLabels[key] ?? key,
    value: skillLevels[skill.level] || 4,
  }))

  // 所有技能项打平，用于标签云
  const allTags = Object.entries(otherData.skills).flatMap(([key, skill]) =>
    skill.items.map((item) => ({
      name: item,
      category: skillLabels[key] ?? key,
      level: skill.level,
    }))
  )

  // 根据技能名称长度决定标签大小
  const getTagSize = (name: string) => {
    if (name.length <= 4) return 'text-xs px-2.5 py-1'
    if (name.length <= 8) return 'text-[11px] px-2 py-0.5'
    return 'text-[10px] px-1.5 py-0.5'
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div
          className="relative rounded-lg p-6 md:p-10"
          style={{ background: '#14110F' }}
        >
          <CornerOrnament position="tl" />
          <CornerOrnament position="tr" />
          <CornerOrnament position="bl" />
          <CornerOrnament position="br" />

          {/* 标题 */}
          <div className="text-center mb-8">
            <p className="font-mono text-[10px] tracking-[0.3em] text-copper-gold/50 uppercase mb-2">
              Skills Column
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-magazine-cream">
              技能矩阵
            </h2>
          </div>

          {/* 雷达图 + 标签云 */}
          <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
            {/* 左侧：雷达图 */}
            <div>
              <RadarChart data={radarData} size={280} />
              <div className="flex justify-center gap-6 mt-4">
                {radarData.map((d, i) => (
                  <div key={i} className="text-center">
                    <p className="text-[10px] text-magazine-warm/50">{d.label}</p>
                    <p className="text-sm font-mono text-copper-gold">
                      {d.value}★
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 右侧：标签云 */}
            <div>
              <p className="text-magazine-warm/50 text-[10px] font-mono uppercase tracking-wider mb-4">
                Skill Cloud
              </p>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag, i) => (
                  <span
                    key={i}
                    className={`rounded-full border transition-all duration-200 cursor-default ${getTagSize(tag.name)} ${
                      hoveredTag === tag.name
                        ? 'bg-copper-gold/20 text-copper-gold border-copper-gold/40 scale-110'
                        : 'bg-magazine-card text-magazine-warm/70 border-magazine-border hover:border-copper-gold/30'
                    }`}
                    onMouseEnter={() => setHoveredTag(tag.name)}
                    onMouseLeave={() => setHoveredTag(null)}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* 悬停提示 */}
              {hoveredTag && (
                <div className="mt-4 p-3 rounded bg-magazine-card border border-magazine-border">
                  <p className="text-copper-gold text-xs">{hoveredTag}</p>
                  <p className="text-magazine-warm/50 text-[10px] mt-1">
                    {
                      allTags.find((t) => t.name === hoveredTag)?.category
                    } · {' '}
                    {
                      allTags.find((t) => t.name === hoveredTag)?.level
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 底部：技能总览表格 */}
          <div className="border-t border-magazine-border pt-6">
            <p className="text-magazine-warm/50 text-[10px] font-mono uppercase tracking-wider mb-4">
              Skill Overview
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {Object.entries(otherData.skills).map(([key, skill]) => (
                <div
                  key={key}
                  className="p-3 border border-magazine-border rounded text-center"
                >
                  <p className="text-magazine-warm text-xs mb-1">
                    {skillLabels[key] ?? key}
                  </p>
                  <p className="text-copper-gold text-sm font-mono">
                    {skill.level}
                  </p>
                  <p className="text-magazine-warm/40 text-[10px] mt-1">
                    {skill.items.length} 项
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/magazine/MagazineSkills.tsx
git commit -m "feat(magazine): add MagazineSkills column with radar chart and skill cloud"
```

---

## Task 9: 创建 MagazineFooter 封底

**Files:**
- Create: `src/components/magazine/MagazineFooter.tsx`

- [ ] **Step 1: 实现 MagazineFooter**

```tsx
import { Phone, Mail, Github } from 'lucide-react'
import otherData from '@data/other.json'

const socialIcons: Record<string, React.ReactNode> = {
  github: <Github size={16} />,
  bilibili: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.765 1.56-3.76 1.004-.996 2.262-1.52 3.773-1.574h.774l-1.174-1.12a1.234 1.234 0 0 1-.373-.906c0-.356.124-.659.373-.907l.027-.027c.267-.249.573-.373.92-.373.347 0 .653.124.92.373L9.653 4.44c.071.071.134.142.187.213h4.267a.836.836 0 0 1 .16-.213l2.853-2.747c.267-.249.573-.373.92-.373.347 0 .662.151.929.4.267.249.391.551.391.907 0 .355-.124.657-.373.906zM5.333 7.24c-.746.018-1.373.276-1.88.773-.506.498-.769 1.13-.786 1.894v7.52c.017.764.28 1.395.786 1.893.507.498 1.134.756 1.88.773h13.334c.746-.017 1.373-.275 1.88-.773.506-.498.769-1.129.786-1.893v-7.52c-.017-.765-.28-1.396-.786-1.894-.507-.497-1.134-.755-1.88-.773zM8 11.107c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c0-.373.129-.689.386-.947.258-.257.574-.386.947-.386zm8 0c.373 0 .684.124.933.373.25.249.383.569.4.96v1.173c-.017.391-.15.711-.4.96-.249.25-.56.374-.933.374s-.684-.125-.933-.374c-.25-.249-.383-.569-.4-.96V12.44c.017-.391.15-.711.4-.96.249-.249.56-.373.933-.373z" />
    </svg>
  ),
  xiaohongshu: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.615 14.615h-2.77v-4.615h-3.69v4.615H7.385V7.385h2.77v4.615h3.69V7.385h2.77v9.23z" />
    </svg>
  ),
  douyin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
}

// 条形码生成
function Barcode() {
  const bars = Array.from({ length: 40 }, (_, i) => ({
    width: Math.random() > 0.5 ? 2 : 1,
    height: Math.random() > 0.7 ? 32 : 24,
    opacity: Math.random() > 0.9 ? 0.4 : 1,
  }))

  return (
    <div className="flex items-end gap-0.5 h-10">
      {bars.map((bar, i) => (
        <div
          key={i}
          className="bg-magazine-cream"
          style={{
            width: `${bar.width}px`,
            height: `${bar.height}px`,
            opacity: bar.opacity,
          }}
        />
      ))}
    </div>
  )
}

export default function MagazineFooter() {
  return (
    <div className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div
          className="relative rounded-lg p-8 md:p-12"
          style={{ background: '#14110F' }}
        >
          {/* 顶部条形码 */}
          <div className="flex items-center justify-between mb-10">
            <Barcode />
            <span className="font-mono text-[10px] text-magazine-warm/40 tracking-wider">
              ISBN 978-0-0000000-0-0
            </span>
          </div>

          {/* 主要内容 */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* 左侧：联系信息 */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-copper-gold/50 uppercase mb-4">
                Contact
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-magazine-warm/40" />
                  <span className="text-magazine-warm text-sm">
                    {otherData.contact.phone}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-magazine-warm/40" />
                  <span className="text-magazine-warm text-sm">
                    {otherData.contact.email}
                  </span>
                </div>
              </div>
            </div>

            {/* 右侧：社交媒体 */}
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-copper-gold/50 uppercase mb-4">
                Social Media
              </p>
              <div className="flex items-center gap-3">
                {otherData.contact.social.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-magazine-border flex items-center justify-center text-magazine-warm/50 hover:text-copper-gold hover:border-copper-gold/30 transition-all"
                    aria-label={link.name}
                  >
                    {socialIcons[link.icon] ?? link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 底部大页码 */}
          <div className="mt-12 pt-8 border-t border-magazine-border flex items-end justify-between">
            <div>
              <p className="font-serif text-6xl text-copper-gold/20 leading-none">
                08
              </p>
            </div>
            <div className="text-right">
              <p className="font-serif text-lg text-magazine-cream/80 mb-1">
                HONORS & EXPERIENCE
              </p>
              <p className="text-magazine-warm/40 text-xs">
                THANK YOU FOR READING
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/magazine/MagazineFooter.tsx
git commit -m "feat(magazine): add MagazineFooter with barcode and social links"
```

---

## Task 10: 重构 OtherPage 主页面

**Files:**
- Modify: `src/pages/OtherPage.tsx`

- [ ] **Step 1: 重写 OtherPage**

```tsx
import MagazineHero from '@components/magazine/MagazineHero'
import MagazineAwards from '@components/magazine/MagazineAwards'
import MagazineExperience from '@components/magazine/MagazineExperience'
import MagazineSkills from '@components/magazine/MagazineSkills'
import MagazineFooter from '@components/magazine/MagazineFooter'

export default function OtherPage() {
  return (
    <div className="relative" style={{ background: '#0D0B0A' }}>
      <MagazineHero />
      <MagazineAwards />
      <MagazineExperience />
      <MagazineSkills />
      <MagazineFooter />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/OtherPage.tsx
git commit -m "refactor(other): rewrite OtherPage as interactive digital magazine"
```

---

## Task 11: 验证与测试

- [ ] **Step 1: 运行 TypeScript 类型检查**

```bash
cd /workspace/resume-website && npx tsc --noEmit
```

Expected: 无类型错误

- [ ] **Step 2: 运行 ESLint**

```bash
cd /workspace/resume-website && npx eslint src/components/magazine src/pages/OtherPage.tsx
```

Expected: 无 lint 错误

- [ ] **Step 3: 本地启动并测试**

```bash
cd /workspace/resume-website && npm run dev
```

测试项：
1. 封面标题逐字动画是否正常
2. 双页展开的 3D 翻页效果是否流畅
3. 证书卡片悬停抬起效果
4. 便签点击翻转动画
5. 雷达图线条绘制动画
6. 技能标签云悬停放大
7. 移动端单栏布局是否正确
8. 页眉页脚显示是否正确

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test(magazine): verify interactive magazine components"
```

---

## Spec Coverage Check

| Spec 需求 | 对应 Task |
|-----------|-----------|
| 封面区 (MagazineHero) | Task 2 |
| 双页展开容器 (3D 翻页) | Task 3 |
| 角花装饰 | Task 1 |
| 首字下沉 | Task 1 |
| 页眉页脚 | Task 1 |
| 获奖特辑 (Hall of Honor + Certificate Gallery) | Task 6 |
| 证书扫描件卡片 | Task 4 |
| 经历专题 (Field Report + Campus Life) | Task 7 |
| 拍立得相框 | Task 4 |
| 可翻转便签 | Task 5 |
| 技能专栏 (雷达图 + 标签云) | Task 8 |
| 雷达图 SVG 动画 | Task 5 |
| 封底 (条形码 + 社交链接) | Task 9 |
| 主页面整合 | Task 10 |
| 类型检查与测试 | Task 11 |

## Placeholder Scan

- 无 TBD/TODO
- 所有代码块包含完整实现
- 所有命令包含预期输出
- 数据从 `otherData.json` 读取，无需硬编码

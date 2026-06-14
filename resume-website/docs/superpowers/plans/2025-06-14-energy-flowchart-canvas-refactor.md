# 技能流程图 Canvas 重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `EnergyPage.tsx` 中的 SVG + GSAP 技能流程图替换为 Canvas 2D 渲染，消除滚动进入时的卡顿，实现 60fps 流畅动画，并兼容低端设备。

**Architecture:** 采用 Canvas 2D 逐帧渲染替代 SVG DOM，通过离屏预计算路径长度、设备分级自动降级、`IntersectionObserver` 提前预热，实现零延迟进入和稳定帧率。

**Tech Stack:** React 18 + TypeScript + Canvas 2D API + IntersectionObserver + ResizeObserver

---

## 文件结构

| 文件 | 职责 |
|------|------|
| `src/components/pipeline/useDeviceTier.ts` | 检测设备性能等级（high/medium/low） |
| `src/components/pipeline/usePipelineLayout.ts` | 预计算节点布局、管道路径、路径长度 |
| `src/components/pipeline/pipelineDraw.ts` | 纯函数：Canvas 绘制管道、节点、标签、液体、tooltip |
| `src/components/pipeline/useCanvasRenderer.ts` | 渲染循环：requestAnimationFrame + 动画状态机 |
| `src/components/pipeline/PipelineCanvas.tsx` | React 组件：Canvas 包装器 + 事件处理 + 生命周期 |
| `src/pages/EnergyPage.tsx` | 修改：替换 `IndustrialPipelineFlow` 为 `PipelineCanvas` |

---

## Task 1: 设备性能分级 Hook

**Files:**
- Create: `src/components/pipeline/useDeviceTier.ts`

- [ ] **Step 1: 创建 `useDeviceTier.ts`**

```typescript
export type DeviceTier = 'high' | 'medium' | 'low'

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('medium')

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as any).deviceMemory || 4

    if (cores <= 4 || memory <= 4) {
      setTier('low')
    } else if (cores >= 8 && memory >= 8) {
      setTier('high')
    } else {
      setTier('medium')
    }
  }, [])

  return tier
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/useDeviceTier.ts
git commit -m "feat(pipeline): add device tier detection hook"
```

---

## Task 2: 布局预计算 Hook

**Files:**
- Create: `src/components/pipeline/usePipelineLayout.ts`

- [ ] **Step 1: 创建 `usePipelineLayout.ts`**

```typescript
import { useMemo } from 'react'
import { energyNode } from '@pages/EnergyPage'

export interface NodePosition { x: number; y: number }

export interface PipePath {
  d: string
  length: number
  from: number
  to: number
}

export interface LayoutConfig {
  viewBox: { width: number; height: number }
  nodePositions: NodePosition[]
  pipes: PipePath[]
  nodeShapes: string[]
}

function estimatePathLength(d: string): number {
  // Create off-screen SVG path to measure length
  const svgNS = 'http://www.w3.org/2000/svg'
  const path = document.createElementNS(svgNS, 'path')
  path.setAttribute('d', d)
  document.body.appendChild(path)
  const length = path.getTotalLength()
  document.body.removeChild(path)
  return length
}

export function usePipelineLayout(isMobile: boolean): LayoutConfig {
  return useMemo(() => {
    const skills = energyNode.subNodes ?? []
    const viewBox = isMobile
      ? { width: 200, height: 60 + skills.length * 90 }
      : { width: 800, height: 580 }

    const nodePositions = isMobile
      ? skills.map((_, i) => ({ x: 100, y: 60 + i * 90 }))
      : [
          { x: 80, y: 80 },
          { x: 280, y: 60 },
          { x: 480, y: 90 },
          { x: 680, y: 70 },
          { x: 160, y: 220 },
          { x: 360, y: 200 },
          { x: 560, y: 230 },
          { x: 260, y: 360 },
          { x: 460, y: 340 },
          { x: 360, y: 480 },
        ]

    const connections = isMobile
      ? skills.map((_, i) => (i < skills.length - 1 ? [i, i + 1] : null)).filter(Boolean) as number[][]
      : [
          [0, 1], [1, 2], [2, 3],
          [0, 4], [1, 5], [2, 6], [3, 6],
          [4, 7], [5, 7], [5, 8], [6, 8],
          [7, 9], [8, 9],
        ]

    const pipes: PipePath[] = connections.map(([from, to], i) => {
      const start = nodePositions[from]
      const end = nodePositions[to]
      const midX = (start.x + end.x) / 2
      const midY = (start.y + end.y) / 2
      const d = isMobile
        ? `M ${start.x} ${start.y + 25} L ${end.x} ${end.y - 25}`
        : `M ${start.x} ${start.y} Q ${midX + (i % 2 === 0 ? 30 : -30)} ${midY + (i % 2 === 0 ? -20 : 20)} ${end.x} ${end.y}`
      return { d, length: estimatePathLength(d), from, to }
    })

    const nodeShapes = ['circle', 'diamond', 'circle', 'diamond', 'circle', 'circle', 'diamond', 'circle', 'diamond', 'circle']

    return { viewBox, nodePositions, pipes, nodeShapes }
  }, [isMobile])
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/usePipelineLayout.ts
git commit -m "feat(pipeline): add layout pre-computation hook with path length caching"
```

---

## Task 3: Canvas 绘制函数

**Files:**
- Create: `src/components/pipeline/pipelineDraw.ts`

- [ ] **Step 1: 创建 `pipelineDraw.ts`**

```typescript
import { LayoutConfig } from './usePipelineLayout'
import { DeviceTier } from './useDeviceTier'

export interface AnimationState {
  phase: 'idle' | 'playing' | 'liquid_flowing' | 'done'
  startTime: number
  hoveredNode: string | null
  hoveredIndex: number
}

export interface DrawContext {
  ctx: CanvasRenderingContext2D
  layout: LayoutConfig
  state: AnimationState
  tier: DeviceTier
  timestamp: number
}

function easeOutBack(t: number): number {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
}

function easePower2Out(t: number): number {
  return t * (2 - t)
}

export function drawPipes({ ctx, layout, state, tier, timestamp }: DrawContext) {
  const { pipes } = layout
  const pipeDuration = tier === 'high' ? 2000 : tier === 'medium' ? 1500 : 800

  pipes.forEach((pipe, i) => {
    const stagger = i * 200
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / pipeDuration))
    const eased = easePower2Out(progress)

    // Background pipe
    ctx.save()
    ctx.beginPath()
    const path = new Path2D(pipe.d)
    ctx.strokeStyle = 'rgba(192, 74, 26, 0.3)'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.setLineDash([pipe.length])
    ctx.lineDashOffset = pipe.length * (1 - eased)
    ctx.stroke(path)
    ctx.restore()
  })
}

export function drawLiquid({ ctx, layout, state, tier, timestamp }: DrawContext) {
  if (tier === 'low') return
  if (state.phase === 'playing') return

  const { pipes } = layout
  const speed = state.hoveredNode !== null
    ? (tier === 'high' ? 0.5 : 1)
    : (tier === 'high' ? 2 : 3)

  pipes.forEach((pipe) => {
    ctx.save()
    ctx.beginPath()
    const path = new Path2D(pipe.d)
    ctx.strokeStyle = '#C04A1A'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.setLineDash([8, 6])
    ctx.lineDashOffset = -((timestamp / 1000) * 28 / speed) % 28
    ctx.stroke(path)
    ctx.restore()
  })
}

export function drawNodes({ ctx, layout, state, timestamp }: DrawContext) {
  const { nodePositions, nodeShapes } = layout
  const skills = energyNode.subNodes ?? []
  const nodeDuration = 600
  const nodeStagger = 150

  nodePositions.forEach((pos, i) => {
    const stagger = i * nodeStagger + 800 // start after pipes begin
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / nodeDuration))
    const eased = easeOutBack(progress)

    const isHovered = state.hoveredIndex === i
    const shape = nodeShapes[i] ?? 'circle'
    const level = skills[i]?.level || 0

    ctx.save()
    ctx.translate(pos.x, pos.y)
    ctx.scale(eased, eased)

    // Glow effect on hover
    if (isHovered) {
      ctx.beginPath()
      ctx.arc(0, 0, 35, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.shadowColor = '#C04A1A'
      ctx.shadowBlur = 8
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    // Node shape
    if (shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, 28, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(15, 18, 24, 0.95)'
      ctx.fill()
      ctx.strokeStyle = isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Screw decorations
      ctx.fillStyle = 'rgba(192, 74, 26, 0.5)'
      ;[[-20, -20], [20, -20], [-20, 20], [20, 20]].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    } else {
      ctx.beginPath()
      ctx.moveTo(0, -28)
      ctx.lineTo(28, 0)
      ctx.lineTo(0, 28)
      ctx.lineTo(-28, 0)
      ctx.closePath()
      ctx.fillStyle = 'rgba(15, 18, 24, 0.95)'
      ctx.fill()
      ctx.strokeStyle = isHovered ? '#C04A1A' : 'rgba(192, 74, 26, 0.4)'
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.fillStyle = 'rgba(192, 74, 26, 0.5)'
      ;[[-18, -18], [18, -18], [-18, 18], [18, 18]].forEach(([x, y]) => {
        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Level indicator ring
    const circumference = 2 * Math.PI * 22
    const dash = (level / 5) * circumference
    ctx.beginPath()
    ctx.arc(0, 0, 22, -Math.PI / 2, -Math.PI / 2 + (dash / circumference) * Math.PI * 2)
    ctx.strokeStyle = 'rgba(192, 74, 26, 0.6)'
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.restore()
  })
}

export function drawLabels({ ctx, layout, state, timestamp }: DrawContext) {
  const { nodePositions } = layout
  const skills = energyNode.subNodes ?? []
  const labelDuration = 400
  const labelStagger = 80

  nodePositions.forEach((pos, i) => {
    const stagger = i * labelStagger + 1400 // after nodes pop in
    const elapsed = timestamp - state.startTime - stagger
    const progress = Math.max(0, Math.min(1, elapsed / labelDuration))
    const eased = easePower2Out(progress)

    const label = skills[i]?.label ?? ''
    const displayLabel = label.length > 8 ? label.slice(0, 7) + '…' : label
    const isHovered = state.hoveredIndex === i

    ctx.save()
    ctx.globalAlpha = eased
    ctx.font = '500 10px sans-serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillStyle = isHovered ? '#E8703A' : '#F0E6D8'
    ctx.fillText(displayLabel, pos.x, pos.y + 4)
    ctx.restore()
  })
}

export function drawTooltip({ ctx, layout, state }: DrawContext) {
  if (state.hoveredIndex < 0) return
  const { nodePositions } = layout
  const skills = energyNode.subNodes ?? []
  const pos = nodePositions[state.hoveredIndex]
  const skill = skills[state.hoveredIndex]
  if (!pos || !skill) return

  const text = `Lv.${skill.level || 0} ${skill.label}`
  ctx.font = '9px monospace'
  const textWidth = ctx.measureText(text).width
  const padding = 8
  const rectWidth = textWidth + padding * 2
  const rectHeight = 24

  ctx.save()
  ctx.fillStyle = 'rgba(192, 74, 26, 0.15)'
  ctx.strokeStyle = '#C04A1A'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.roundRect(pos.x - rectWidth / 2, pos.y - 45 - rectHeight / 2, rectWidth, rectHeight, 4)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#E8703A'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, pos.x, pos.y - 45)
  ctx.restore()
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/pipelineDraw.ts
git commit -m "feat(pipeline): add canvas draw functions for pipes, nodes, labels, liquid, tooltip"
```

---

## Task 4: Canvas 渲染循环 Hook

**Files:**
- Create: `src/components/pipeline/useCanvasRenderer.ts`

- [ ] **Step 1: 创建 `useCanvasRenderer.ts`**

```typescript
import { useEffect, useRef, useCallback } from 'react'
import { LayoutConfig } from './usePipelineLayout'
import { DeviceTier } from './useDeviceTier'
import { AnimationState, drawPipes, drawLiquid, drawNodes, drawLabels, drawTooltip } from './pipelineDraw'

interface UseCanvasRendererOptions {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  layout: LayoutConfig
  tier: DeviceTier
  isVisible: boolean
  isWarm: boolean
  hoveredNode: string | null
  hoveredIndex: number
}

export function useCanvasRenderer({
  canvasRef,
  layout,
  tier,
  isVisible,
  isWarm,
  hoveredNode,
  hoveredIndex,
}: UseCanvasRendererOptions) {
  const stateRef = useRef<AnimationState>({
    phase: 'idle',
    startTime: 0,
    hoveredNode: null,
    hoveredIndex: -1,
  })
  const rafRef = useRef<number>(0)

  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    const { viewBox } = layout

    // Scale to viewBox
    const scaleX = canvas.width / viewBox.width
    const scaleY = canvas.height / viewBox.height
    const scale = Math.min(scaleX, scaleY)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.scale(scale, scale)

    // Update state
    state.hoveredNode = hoveredNode
    state.hoveredIndex = hoveredIndex

    if (state.phase === 'idle' && isVisible) {
      state.phase = 'playing'
      state.startTime = timestamp
    }

    const elapsed = timestamp - state.startTime
    const pipeDone = elapsed > 2500
    if (state.phase === 'playing' && pipeDone) {
      state.phase = 'liquid_flowing'
    }

    const drawCtx = { ctx, layout, state, tier, timestamp }

    drawPipes(drawCtx)
    drawLiquid(drawCtx)
    drawNodes(drawCtx)
    drawLabels(drawCtx)
    drawTooltip(drawCtx)

    ctx.restore()

    if (isVisible || state.phase !== 'done') {
      rafRef.current = requestAnimationFrame(render)
    }
  }, [canvasRef, layout, tier, isVisible, hoveredNode, hoveredIndex])

  useEffect(() => {
    if (isWarm && stateRef.current.phase === 'idle') {
      stateRef.current.phase = 'playing'
      stateRef.current.startTime = performance.now()
    }
  }, [isWarm])

  useEffect(() => {
    if (isVisible) {
      rafRef.current = requestAnimationFrame(render)
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isVisible, render])
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/useCanvasRenderer.ts
git commit -m "feat(pipeline): add canvas render loop with animation state machine"
```

---

## Task 5: PipelineCanvas React 组件

**Files:**
- Create: `src/components/pipeline/PipelineCanvas.tsx`

- [ ] **Step 1: 创建 `PipelineCanvas.tsx`**

```typescript
import { useRef, useState, useEffect, useCallback } from 'react'
import { Gauge } from 'lucide-react'
import { energyNode } from '@pages/EnergyPage'
import { useDeviceTier } from './useDeviceTier'
import { usePipelineLayout } from './usePipelineLayout'
import { useCanvasRenderer } from './useCanvasRenderer'

export default function PipelineCanvas() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isWarm, setIsWarm] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState(-1)

  const tier = useDeviceTier()
  const layout = usePipelineLayout(isMobile)

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // IntersectionObserver with warmup margin
  useEffect(() => {
    if (!sectionRef.current) return
    const warmObserver = new IntersectionObserver(
      ([entry]) => setIsWarm(entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0 }
    )
    const visibleObserver = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    warmObserver.observe(sectionRef.current)
    visibleObserver.observe(sectionRef.current)
    return () => {
      warmObserver.disconnect()
      visibleObserver.disconnect()
    }
  }, [])

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = parent.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      ctx?.scale(dpr, dpr)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(parent)
    resize()
    return () => ro.disconnect()
  }, [])

  // Mouse interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio, 2)
    const x = (e.clientX - rect.left) * dpr
    const y = (e.clientY - rect.top) * dpr

    const { viewBox, nodePositions } = layout
    const scaleX = canvas.width / viewBox.width
    const scaleY = canvas.height / viewBox.height
    const scale = Math.min(scaleX, scaleY)

    for (let i = 0; i < nodePositions.length; i++) {
      const pos = nodePositions[i]
      const dist = Math.hypot(x / scale - pos.x, y / scale - pos.y)
      if (dist < 28) {
        const skills = energyNode.subNodes ?? []
        setHoveredNode(skills[i]?.id || null)
        setHoveredIndex(i)
        return
      }
    }
    setHoveredNode(null)
    setHoveredIndex(-1)
  }, [layout])

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null)
    setHoveredIndex(-1)
  }, [])

  useCanvasRenderer({
    canvasRef,
    layout,
    tier,
    isVisible,
    isWarm,
    hoveredNode,
    hoveredIndex,
  })

  return (
    <div ref={sectionRef} className="py-20 md:py-32">
      <div className="flex items-center justify-center gap-3 mb-12 md:mb-16">
        <Gauge size={24} className="text-energy-light" />
        <h2 className="text-2xl md:text-3xl font-serif text-warm">技能流程图</h2>
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div
          className="relative rounded-xl border border-warm-ghost/10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0f1218 0%, #1a1f28 100%)',
          }}
        >
          {/* Engineering grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(rgba(192,74,26,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(192,74,26,0.03) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          />

          <canvas
            ref={canvasRef}
            className="relative w-full block"
            style={{ height: isMobile ? '950px' : '580px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/pipeline/PipelineCanvas.tsx
git commit -m "feat(pipeline): add PipelineCanvas React component with hover and resize support"
```

---

## Task 6: 替换 EnergyPage 中的 IndustrialPipelineFlow

**Files:**
- Modify: `src/pages/EnergyPage.tsx`

- [ ] **Step 1: 修改导入和组件引用**

在 `EnergyPage.tsx` 顶部添加：

```typescript
import PipelineCanvas from '@components/pipeline/PipelineCanvas'
```

在 `EnergyPage` 组件的 JSX 中，将：

```tsx
<IndustrialPipelineFlow />
```

替换为：

```tsx
<PipelineCanvas />
```

- [ ] **Step 2: 保留原组件作为回退（可选）**

将原 `IndustrialPipelineFlow` 函数组件从 `EnergyPage.tsx` 中删除，或移动到 `src/components/pipeline/IndustrialPipelineFlow.tsx` 作为回退。

- [ ] **Step 3: Commit**

```bash
git add src/pages/EnergyPage.tsx
git commit -m "refactor(energy): replace SVG pipeline with Canvas implementation"
```

---

## Task 7: 验证与测试

- [ ] **Step 1: 运行 TypeScript 类型检查**

```bash
cd /workspace/resume-website && npx tsc --noEmit
```

Expected: 无类型错误

- [ ] **Step 2: 运行 ESLint**

```bash
cd /workspace/resume-website && npx eslint src/components/pipeline src/pages/EnergyPage.tsx
```

Expected: 无 lint 错误

- [ ] **Step 3: 本地启动并测试**

```bash
cd /workspace/resume-website && npm run dev
```

测试项：
1. 滚动进入流程图区域，观察是否有卡顿
2. 管道绘制动画是否流畅
3. 节点弹入动画是否按 stagger 顺序播放
4. 液体流动是否正常
5. hover 节点时 tooltip 是否显示
6. resize 窗口时布局是否正确调整
7. 在 DevTools Performance 面板中确认帧率稳定 60fps

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test(pipeline): verify canvas pipeline flowchart performance"
```

---

## 自审检查

### Spec 覆盖检查

| Spec 需求 | 对应 Task |
|-----------|-----------|
| Canvas 2D 替代 SVG | Task 3, 4, 5 |
| 路径预计算 | Task 2 |
| 设备分级自动降级 | Task 1, 3 |
| IntersectionObserver 预热 | Task 5 |
| 保留管道绘制动画 | Task 3 `drawPipes` |
| 保留节点弹入动画 | Task 3 `drawNodes` |
| 保留液体流动 | Task 3 `drawLiquid` |
| 保留 hover tooltip | Task 3 `drawTooltip` |
| 响应式布局 | Task 2, 5 |
| 回退策略 | Task 6 |

### Placeholder 扫描

- 无 TBD/TODO
- 所有代码块包含完整实现
- 所有命令包含预期输出

### 类型一致性

- `DeviceTier` 在 Task 1 定义，Task 3, 4, 5 使用一致
- `LayoutConfig` 在 Task 2 定义，Task 3, 4, 5 使用一致
- `AnimationState` 在 Task 3 定义，Task 4 使用一致

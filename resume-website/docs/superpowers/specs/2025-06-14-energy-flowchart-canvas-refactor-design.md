# 技能流程图 Canvas 重构设计文档

## 1. 背景与问题

### 1.1 当前实现
技能流程图（`IndustrialPipelineFlow`）位于 `EnergyPage.tsx`，使用 SVG + GSAP 实现：
- 10 个技能节点（圆形/菱形）通过 SVG `<g>` 渲染
- 管道使用 SVG `<path>` + `stroke-dashoffset` 动画
- 液体流动使用 CSS `@keyframes` + `stroke-dashoffset`
- 动画由 GSAP `timeline` 驱动，通过 `ScrollTrigger` 在视口内触发

### 1.2 卡顿根因
1. **SVG DOM 过重**：每次渲染创建大量 SVG 元素（path、circle、polygon、text），React 协调开销大
2. **路径计算阻塞**：`el.getTotalLength()` 在主线程同步计算，对 12 条管道路径逐一调用
3. **GSAP + React 冲突**：`useEffect` 依赖 `isMobile`，resize 时重新初始化整个动画
4. **无预热机制**：滚动到 `top 80%` 时才开始计算和动画，首次进入有明显延迟
5. **低端设备无降级**：所有动画全量执行，未根据设备性能调整

## 2. 设计目标

| 目标 | 指标 |
|------|------|
| 滚动进入无感知延迟 | 从触发到首帧渲染 < 50ms |
| 动画帧率稳定 | 全程保持 60fps（中高端设备），30fps（低端设备） |
| 兼容低端设备 | 自动检测并简化动画 |
| 保留现有视觉 | 管道绘制、节点弹入、液体流动、hover tooltip 全部保留 |
| 可维护性 | 组件职责清晰，不引入外部依赖 |

## 3. 架构设计

### 3.1 总体架构

```
IndustrialPipelineFlow (React Wrapper)
├── PipelineCanvas (Canvas 渲染核心)
│   ├── init(): 预计算布局、路径、动画关键帧
│   ├── renderLoop(): requestAnimationFrame 驱动渲染
│   ├── drawPipes(): 管道绘制（含 stroke-dash 动画）
│   ├── drawNodes(): 节点绘制（含弹入动画）
│   ├── drawLabels(): 标签绘制（含淡入动画）
│   ├── drawLiquid(): 液体流动（虚线偏移动画）
│   └── drawTooltip(): hover 提示框
├── useIntersectionObserver: 提前 200px 预热
├── useDeviceTier: 设备性能分级
└── useCanvasResize: 响应式 Canvas 尺寸
```

### 3.2 渲染分层

| 层级 | 内容 | 渲染方式 |
|------|------|----------|
| Background | 工程网格背景 | CSS `linear-gradient` 保留 |
| Layer 1 | 管道背景 + 绘制动画 | Canvas 2D `stroke()` |
| Layer 2 | 液体流动 | Canvas 2D `stroke()` + `lineDashOffset` |
| Layer 3 | 节点形状 + 弹入动画 | Canvas 2D `arc()` / `lineTo()` |
| Layer 4 | 标签文字 + 淡入动画 | Canvas 2D `fillText()` |
| Layer 5 | Hover tooltip | Canvas 2D 动态绘制 |

### 3.3 动画状态机

```
[idle] --(进入视口-200px)--> [warmup]
[warmup] --(进入视口)--> [playing]
[playing] --(管道绘制完成)--> [liquid_flowing]
[liquid_flowing] --(hover)--> [accelerated]
[accelerated] --(mouseleave)--> [liquid_flowing]
[playing/liquid_flowing/accelerated] --(离开视口)--> [paused]
[paused] --(重新进入)--> [playing]
```

## 4. 详细设计

### 4.1 Canvas 初始化与预热

```typescript
interface LayoutConfig {
  viewBox: { width: number; height: number }
  nodePositions: { x: number; y: number }[]
  connections: [number, number][]
  paths: string[]           // 预计算的 SVG path d 属性
  pathLengths: number[]     // 预计算的 getTotalLength()
}

function usePipelineLayout(isMobile: boolean): LayoutConfig {
  return useMemo(() => {
    // 预计算所有路径和长度，避免运行时计算
    const paths = connections.map(([from, to], i) => {
      const path = isMobile ? ... : ...
      const length = estimatePathLength(path) // 或创建临时 SVG 元素计算
      return { path, length }
    })
    return { ... }
  }, [isMobile])
}
```

### 4.2 设备性能分级

```typescript
type DeviceTier = 'high' | 'medium' | 'low'

function useDeviceTier(): DeviceTier {
  // 综合判断：CPU 核心数、内存、帧率测试
  const cores = navigator.hardwareConcurrency || 2
  const memory = (navigator as any).deviceMemory || 4

  if (cores <= 4 || memory <= 4) return 'low'
  if (cores >= 8 && memory >= 8) return 'high'
  return 'medium'
}
```

### 4.3 动画参数（按设备分级）

| 参数 | high | medium | low |
|------|------|--------|-----|
| 管道绘制时长 | 2s | 1.5s | 0.8s |
| 节点弹入 stagger | 0.15s | 0.1s | 0.05s |
| 液体流动速度 | 2s/cycle | 3s/cycle | 静态 |
| hover 加速 | 0.5s/cycle | 1s/cycle | 无 |
| 粒子/特效 | 完整 | 简化 | 关闭 |

### 4.4 渲染循环

```typescript
function renderLoop(timestamp: number) {
  if (!isVisible) return

  ctx.clearRect(0, 0, width, height)

  const progress = Math.min(1, (timestamp - animationStart) / totalDuration)

  // Layer 1: Pipes (drawn with dashoffset animation)
  drawPipes(ctx, progress, layout)

  // Layer 2: Liquid (only after pipes 80% drawn)
  if (progress > 0.8) {
    drawLiquid(ctx, timestamp, layout, isHovered)
  }

  // Layer 3: Nodes (pop in with stagger)
  drawNodes(ctx, progress, layout, hoveredNode)

  // Layer 4: Labels (fade in after nodes)
  drawLabels(ctx, progress, layout)

  // Layer 5: Tooltip
  if (hoveredNode !== null) {
    drawTooltip(ctx, hoveredNode, layout)
  }

  requestAnimationFrame(renderLoop)
}
```

### 4.5 交互处理

```typescript
// Canvas 鼠标事件转节点检测
function getHoveredNode(mx: number, my: number): string | null {
  for (let i = 0; i < nodePositions.length; i++) {
    const pos = nodePositions[i]
    const dist = Math.hypot(mx - pos.x, my - pos.y)
    if (dist < 28) return skills[i].id
  }
  return null
}
```

### 4.6 路径预计算策略

由于 Canvas 2D 没有 `getTotalLength()`，采用以下策略：

1. **创建离屏 SVG**：在初始化时创建 `document.createElementNS('http://www.w3.org/2000/svg', 'path')`，设置 `d` 属性后调用 `getTotalLength()`
2. **缓存结果**：将路径长度存入 `LayoutConfig`，渲染循环中直接使用
3. **路径解析**：如需更精细控制，可将 SVG path 解析为贝塞尔曲线点序列，手动计算长度和插值

### 4.7 响应式处理

```typescript
function useCanvasResize(canvasRef: RefObject<HTMLCanvasElement>) {
  const [size, setSize] = useState({ width: 800, height: 580 })

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      const dpr = Math.min(window.devicePixelRatio, 2)
      canvasRef.current!.width = width * dpr
      canvasRef.current!.height = height * dpr
      canvasRef.current!.getContext('2d')!.scale(dpr, dpr)
      setSize({ width, height })
    })
    observer.observe(canvasRef.current!.parentElement!)
    return () => observer.disconnect()
  }, [])

  return size
}
```

## 5. 文件结构

```
src/
├── components/
│   └── pipeline/
│       ├── PipelineCanvas.tsx      # React Wrapper + 生命周期
│       ├── usePipelineLayout.ts    # 布局预计算
│       ├── useDeviceTier.ts        # 设备分级
│       ├── useCanvasRenderer.ts    # 渲染循环 + 绘制函数
│       └── pipelineDraw.ts         # 纯绘制函数（Canvas API）
```

## 6. 回退策略

若 Canvas 方案在某浏览器出现异常，保留原 SVG 组件作为回退：

```typescript
const isCanvasSupported = !!document.createElement('canvas').getContext('2d')

return isCanvasSupported ? <PipelineCanvas /> : <IndustrialPipelineFlowSVG />
```

## 7. 性能监控

在开发模式下，通过 `performance.now()` 测量每帧渲染耗时：

```typescript
const frameTime = performance.now() - frameStart
if (frameTime > 16.7) {
  console.warn(`Pipeline frame dropped: ${frameTime.toFixed(2)}ms`)
}
```

## 8. 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| Canvas 文字渲染不如 SVG 清晰 | 中 | 使用 `devicePixelRatio` 缩放，选择合适字体大小 |
| 无障碍支持（屏幕阅读器） | 中 | 保留隐藏的 SVG 作为 a11y 树，或添加 ARIA 标签 |
| 移动端触摸交互精度 | 低 | 增大节点热区至 35px |
| 开发工作量较大 | 高 | 分阶段实施：先核心渲染，再交互，再优化 |

## 9. 实施阶段

### Phase 1: 核心 Canvas 渲染
- 创建 `PipelineCanvas` 组件框架
- 实现路径预计算和布局缓存
- 实现管道绘制 + 节点绘制

### Phase 2: 动画与交互
- 实现滚动触发动画状态机
- 实现液体流动效果
- 实现 hover tooltip

### Phase 3: 性能优化
- 设备分级 + 自动降级
- IntersectionObserver 预热
- 帧率监控与调试

### Phase 4: 集成与测试
- 替换 `EnergyPage.tsx` 中的 `IndustrialPipelineFlow`
- 跨浏览器测试
- 低端设备实测

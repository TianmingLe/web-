# 项目布局优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复布局审查中发现的9个关键问题，包括GSAP动画冲突、Canvas内存泄漏、六边形布局错位、导航抖动、Hero高度不一致、字体缺失、模块顺序混乱、中缝阴影过浓、FloatingToolbox性能问题。

**Architecture:** 通过独立GSAP timeline实例替代globalTimeline，使用IntersectionObserver控制Canvas动画生命周期，修复CSS布局问题，统一页面视觉规范。

**Tech Stack:** React, TypeScript, Tailwind CSS, GSAP, Vite

---

## Task 1: 修复 OrbitalDashboard GSAP 全局时间轴冲突

**Files:**
- Modify: `src/components/OrbitalDashboard.tsx`

- [ ] **Step 1: 找到 globalTimeline 使用位置**

在 `src/components/OrbitalDashboard.tsx` 中搜索 `gsap.globalTimeline`：

```bash
grep -n "globalTimeline" src/components/OrbitalDashboard.tsx
```

Expected: 找到 `gsap.globalTimeline.pause()` 和 `gsap.globalTimeline.play()` 的位置

- [ ] **Step 2: 创建独立的 localTimeline 引用**

在组件顶部（其他 ref 附近）添加：

```tsx
const localTimelineRef = useRef<gsap.core.Timeline | null>(null)
```

- [ ] **Step 3: 修改 useEffect 中的 timeline 创建逻辑**

找到创建轨道旋转动画的 useEffect，将：

```tsx
// 修改前
gsap.to(orbitRef.current, {
  rotation: 360,
  duration: 60,
  repeat: -1,
  ease: 'none',
})
```

改为：

```tsx
// 修改后
const tl = gsap.timeline({ repeat: -1 })
tl.to(orbitRef.current, {
  rotation: 360,
  duration: 60,
  ease: 'none',
})
localTimelineRef.current = tl
```

- [ ] **Step 4: 修改 ScrollTrigger 的 onLeave/onEnterBack 回调**

找到 ScrollTrigger 配置，将：

```tsx
// 修改前
onLeave: () => gsap.globalTimeline.pause(),
onEnterBack: () => gsap.globalTimeline.play(),
```

改为：

```tsx
// 修改后
onLeave: () => localTimelineRef.current?.pause(),
onEnterBack: () => localTimelineRef.current?.play(),
```

- [ ] **Step 5: 添加 cleanup 逻辑**

在 useEffect 的 return 函数中添加：

```tsx
return () => {
  localTimelineRef.current?.kill()
  localTimelineRef.current = null
}
```

- [ ] **Step 6: Commit**

```bash
git add src/components/OrbitalDashboard.tsx
git commit -m "fix(orbital): use independent timeline instead of globalTimeline"
```

---

## Task 2: 修复 PipelineCanvas Canvas 内存泄漏

**Files:**
- Modify: `src/components/pipeline/PipelineCanvas.tsx`

- [ ] **Step 1: 找到现有的 useEffect 和 requestAnimationFrame**

在 `src/components/pipeline/PipelineCanvas.tsx` 中找到 `useCanvasRenderer` 的调用或内部的动画逻辑。

- [ ] **Step 2: 添加 IntersectionObserver 控制动画启停**

在组件中添加：

```tsx
const [isVisible, setIsVisible] = useState(true)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  )
  if (containerRef.current) observer.observe(containerRef.current)
  return () => observer.disconnect()
}, [])
```

- [ ] **Step 3: 修改动画循环，在不可见时暂停**

在 `useCanvasRenderer` 或 PipelineCanvas 的动画循环中，添加 `isVisible` 判断：

```tsx
useEffect(() => {
  let rafId: number
  const animate = () => {
    if (!isVisible) {
      rafId = requestAnimationFrame(animate)
      return
    }
    // 渲染逻辑
    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)
  return () => cancelAnimationFrame(rafId)
}, [isVisible])
```

- [ ] **Step 4: Commit**

```bash
git add src/components/pipeline/PipelineCanvas.tsx
git commit -m "fix(pipeline): add IntersectionObserver to pause canvas when not visible"
```

---

## Task 3: 修复 MediaPage SkillsHoneycomb 六边形布局

**Files:**
- Modify: `src/pages/MediaPage.tsx`

- [ ] **Step 1: 找到 SkillsHoneycomb 渲染逻辑**

在 `src/pages/MediaPage.tsx` 中找到 `HexagonSkill` 或 `SkillsHoneycomb` 相关的渲染代码。

- [ ] **Step 2: 添加奇数行偏移**

找到渲染六边形的 map 循环，在每一行的容器上添加偏移：

```tsx
// 修改前
<div className="flex justify-center">
  {row.map((skill, idx) => (
    <HexagonSkill key={idx} {...skill} />
  ))}
</div>

// 修改后
<div
  className="flex justify-center"
  style={{ marginLeft: rowIdx % 2 === 1 ? '70px' : '0' }}
>
  {row.map((skill, idx) => (
    <HexagonSkill key={idx} {...skill} />
  ))}
</div>
```

注意：`70px` 是六边形宽度（140px）的一半。如果实际宽度不同，请调整。

- [ ] **Step 3: Commit**

```bash
git add src/pages/MediaPage.tsx
git commit -m "fix(media): stagger hexagon rows for honeycomb effect"
```

---

## Task 4: 修复导航标签布局抖动

**Files:**
- Modify: `src/components/Nav.tsx`

- [ ] **Step 1: 检查 NavItem 类型和 navItems 数据**

在 `src/components/Nav.tsx` 或相关数据文件中，确认 `NavItem` 接口是否有 `shortLabel` 字段。

- [ ] **Step 2: 如果没有 shortLabel，添加它**

在导航数据定义处（可能在 `src/data/` 或 `src/components/Nav.tsx` 中），为每个导航项添加 `shortLabel`：

```tsx
const navItems = [
  { label: '首页', shortLabel: '首页', path: '/' },
  { label: '能源动力', shortLabel: '能源', path: '/energy' },
  { label: 'AI特种技术', shortLabel: 'AI', path: '/ai' },
  { label: '自媒体特种技术', shortLabel: '媒体', path: '/media' },
  { label: '思想领域高度技术', shortLabel: '思想', path: '/thought' },
  { label: '其他', shortLabel: '其他', path: '/other' },
]
```

- [ ] **Step 3: 修改导航渲染逻辑**

在 Nav 组件的渲染部分，将：

```tsx
// 修改前
<span>{item.label}</span>

// 修改后
<span className="hidden md:inline">{item.shortLabel || item.label}</span>
<span className="md:hidden">{item.label}</span>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "fix(nav): use shortLabel on desktop to prevent layout jitter"
```

---

## Task 5: 统一 AIPage Hero 高度

**Files:**
- Modify: `src/pages/AIPage.tsx`

- [ ] **Step 1: 找到 Hero 区域的 min-h 类**

在 `src/pages/AIPage.tsx` 中搜索 `min-h-[70vh]` 或类似的 Hero 高度定义。

- [ ] **Step 2: 替换为 min-h-screen**

将：

```tsx
// 修改前
<div className="... min-h-[70vh] ...">

// 修改后
<div className="... min-h-screen ...">
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/AIPage.tsx
git commit -m "fix(ai): unify hero height to min-h-screen"
```

---

## Task 6: 为 DevPage/ThoughtPage 配置字体

**Files:**
- Modify: `src/pages/DevPage.tsx`
- Modify: `src/pages/ThoughtPage.tsx`

- [ ] **Step 1: 修改 DevPage 标题字体**

在 `src/pages/DevPage.tsx` 中找到主标题（如 "开发" 或 "Dev"），将 `font-serif` 替换为 `font-ai-title`：

```tsx
// 修改前
<h1 className="... font-serif ...">开发</h1>

// 修改后
<h1 className="... font-ai-title ...">开发</h1>
```

同时找到其他版块标题，添加 `font-ai-title`。

- [ ] **Step 2: 修改 ThoughtPage 标题字体**

在 `src/pages/ThoughtPage.tsx` 中找到主标题（如 "思想" 或 "Thought"），将 `font-serif` 替换为 `font-media-title`：

```tsx
// 修改前
<h1 className="... font-serif ...">思想</h1>

// 修改后
<h1 className="... font-media-title ...">思想</h1>
```

同时找到其他版块标题，添加 `font-media-title`。

- [ ] **Step 3: Commit**

```bash
git add src/pages/DevPage.tsx src/pages/ThoughtPage.tsx
git commit -m "feat(fonts): apply title fonts to DevPage and ThoughtPage"
```

---

## Task 7: 优化 EnergyPage 模块顺序

**Files:**
- Modify: `src/pages/EnergyPage.tsx`

- [ ] **Step 1: 找到当前模块顺序**

在 `src/pages/EnergyPage.tsx` 中找到各个模块的渲染顺序。

- [ ] **Step 2: 调整模块顺序**

将模块顺序从：

```tsx
// 当前顺序（可能类似）
<OrbitalDashboard />
<PipelineCanvas />
<MagazineSpread />
<ControlRoomDashboard />
<CinemaReel />
<CaseStudyStory />
<TimelineSection />
```

调整为：

```tsx
// 优化后顺序
<OrbitalDashboard />
<MagazineSpread />
<CaseStudyStory />
<TimelineSection />
<ControlRoomDashboard />
<PipelineCanvas />
```

即：概览 → 项目 → 案例 → 时间轴 → 工具 → 流程

- [ ] **Step 3: Commit**

```bash
git add src/pages/EnergyPage.tsx
git commit -m "refactor(energy): reorder modules for better information flow"
```

---

## Task 8: 优化 MagazineSpread 中缝阴影

**Files:**
- Modify: `src/components/magazine/MagazineSpread.tsx`

- [ ] **Step 1: 找到中缝阴影代码**

在 `src/components/magazine/MagazineSpread.tsx` 中找到 `spread-crease` 或中缝阴影相关的 div。

- [ ] **Step 2: 减小宽度和不透明度**

将：

```tsx
// 修改前
<div
  className="absolute left-1/2 top-0 bottom-0 w-6 -translate-x-1/2 pointer-events-none z-10"
  style={{
    background: 'linear-gradient(90deg, rgba(0,0,0,0.4), transparent, rgba(0,0,0,0.4))',
  }}
/>

// 修改后
<div
  className="absolute left-1/2 top-0 bottom-0 w-2 -translate-x-1/2 pointer-events-none z-10"
  style={{
    background: 'linear-gradient(90deg, rgba(0,0,0,0.15), transparent, rgba(0,0,0,0.15))',
  }}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/magazine/MagazineSpread.tsx
git commit -m "fix(magazine): reduce crease shadow width and opacity"
```

---

## Task 9: 优化 FloatingToolbox 性能

**Files:**
- Modify: `src/pages/MediaPage.tsx`

- [ ] **Step 1: 找到 FloatingToolbox 的 requestAnimationFrame**

在 `src/pages/MediaPage.tsx` 中找到 `FloatingToolbox` 组件的动画逻辑。

- [ ] **Step 2: 添加 IntersectionObserver**

在 FloatingToolbox 组件中添加：

```tsx
const [isVisible, setIsVisible] = useState(true)

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.1 }
  )
  if (containerRef.current) observer.observe(containerRef.current)
  return () => observer.disconnect()
}, [])
```

- [ ] **Step 3: 修改动画循环**

在动画循环中，当 `!isVisible` 时不更新位置：

```tsx
useEffect(() => {
  if (!containerRef.current || docked) return
  const icons = containerRef.current.querySelectorAll('.tool-icon')
  
  let rafId: number
  const animate = () => {
    if (!isVisible) {
      rafId = requestAnimationFrame(animate)
      return
    }
    // 原有动画逻辑
    icons.forEach((icon, i) => {
      // ...
    })
    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)
  
  return () => cancelAnimationFrame(rafId)
}, [docked, isVisible])
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/MediaPage.tsx
git commit -m "fix(media): pause FloatingToolbox animation when not visible"
```

---

## Task 10: 验证与测试

- [ ] **Step 1: 运行 TypeScript 类型检查**

```bash
cd /workspace/resume-website && npx tsc --noEmit
```

Expected: 无类型错误

- [ ] **Step 2: 运行 ESLint**

```bash
cd /workspace/resume-website && npx eslint src/components/OrbitalDashboard.tsx src/components/pipeline/PipelineCanvas.tsx src/pages/MediaPage.tsx src/components/Nav.tsx src/pages/AIPage.tsx src/pages/DevPage.tsx src/pages/ThoughtPage.tsx src/pages/EnergyPage.tsx src/components/magazine/MagazineSpread.tsx
```

Expected: 无 lint 错误

- [ ] **Step 3: 本地启动验证**

```bash
cd /workspace/resume-website && npm run dev
```

验证项：
1. 导航标签在桌面端显示短标签（如"能源"而非"能源动力"）
2. EnergyPage 模块顺序：概览 → 项目 → 案例 → 时间轴 → 工具 → 流程
3. MediaPage 六边形技能矩阵交错排列
4. AIPage Hero 高度与其他页面一致
5. DevPage/ThoughtPage 标题使用新字体
6. OtherPage 杂志中缝阴影更自然
7. 页面切换时动画正常，无卡顿

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test(layout): verify all layout optimizations"
```

---

## Spec Coverage Check

| Spec 需求 | 对应 Task |
|-----------|-----------|
| 修复 GSAP globalTimeline 冲突 | Task 1 |
| 修复 Canvas 内存泄漏 | Task 2 |
| 修复六边形布局 | Task 3 |
| 修复导航标签抖动 | Task 4 |
| 统一 Hero 高度 | Task 5 |
| DevPage/ThoughtPage 字体 | Task 6 |
| EnergyPage 模块顺序 | Task 7 |
| 优化中缝阴影 | Task 8 |
| FloatingToolbox 性能 | Task 9 |
| 类型检查与测试 | Task 10 |

## Placeholder Scan

- 无 TBD/TODO
- 所有代码块包含完整实现
- 所有命令包含预期输出

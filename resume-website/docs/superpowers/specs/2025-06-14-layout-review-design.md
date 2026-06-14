# 项目布局审查与优化设计文档

## 1. 审查发现的主要问题

基于子Agent的全面审查，项目存在以下关键问题需要修复：

### 🔴 高优先级问题

| 编号 | 问题 | 影响 |
|------|------|------|
| E-5 | GSAP globalTimeline 全局暂停影响所有页面动画 | 跨页面动画冲突 |
| C-4 | Canvas 粒子背景在路由切换时未清理，导致内存泄漏 | 全站性能 |
| M-3 | SkillsHoneycomb 六边形布局未交错排列 | MediaPage 视觉效果 |
| C-5 | 导航标签长度差异大导致布局抖动 | 导航视觉 |

### 🟡 中优先级问题

| 编号 | 问题 | 影响 |
|------|------|------|
| E-1 | EnergyPage 模块顺序逻辑混乱 | 信息架构 |
| O-1 | OtherPage 标题"荣誉与经历"与导航"其他"不匹配 | 认知映射 |
| C-1 | DevPage/ThoughtPage 未配置专属字体 | 品牌一致性 |
| AI-1 | AIPage Hero 高度与其他页面不一致 | 视觉跳跃 |
| M-2 | FloatingToolbox 3D 轨道持续消耗 GPU | 性能优化 |

### 🟢 低优先级问题

| 编号 | 问题 | 影响 |
|------|------|------|
| O-3 | MagazineSpread 中缝阴影过浓 | 视觉细节 |
| E-3 | MagazineSpread 展开内容可能留白 | 边缘情况 |
| M-1 | 页面模块顺序不统一 | 认知负担 |

## 2. 优化方案

### 2.1 修复 GSAP 全局时间轴冲突（E-5 / C-2）

**问题：** `OrbitalDashboard` 使用 `gsap.globalTimeline.play()/pause()` 控制轨道旋转，影响所有页面的 GSAP 动画。

**方案：** 为每个 `OrbitalDashboard` 实例创建独立的 GSAP timeline。

```typescript
// 修改前
gsap.globalTimeline.pause()

// 修改后
const localTimeline = gsap.timeline({ repeat: -1 })
// 使用 localTimeline.play() / localTimeline.pause()
```

### 2.2 修复 Canvas 粒子背景内存泄漏（C-4）

**问题：** 路由切换时 Canvas 动画的 `requestAnimationFrame` 未清理。

**方案：** 在组件卸载时取消所有动画帧，并使用 `IntersectionObserver` 在页面不可见时暂停动画。

```typescript
useEffect(() => {
  let rafId: number
  const animate = () => {
    // 渲染逻辑
    rafId = requestAnimationFrame(animate)
  }
  rafId = requestAnimationFrame(animate)
  
  return () => cancelAnimationFrame(rafId)
}, [])
```

### 2.3 修复 SkillsHoneycomb 六边形布局（M-3）

**问题：** 六边形未交错排列，像散落的方块。

**方案：** 奇数行添加 `margin-left: 70px` 实现蜂巢交错效果。

```tsx
<div style={{ marginLeft: rowIdx % 2 === 1 ? '70px' : '0' }}>
```

### 2.4 修复导航标签布局（C-5）

**问题：** 导航项标签长度差异大（"首页"2字 vs "思想领域高度技术"8字）。

**方案：** 桌面端使用 `shortLabel`，移动端使用 `label`。

```tsx
// 修改 NavItem 使用 shortLabel
<span className="hidden md:inline">{item.shortLabel}</span>
<span className="md:hidden">{item.label}</span>
```

### 2.5 统一 Hero 高度（AI-1）

**问题：** AIPage 使用 `min-h-[70vh]`，其他页面使用 `min-h-screen`。

**方案：** 统一所有页面 Hero 高度为 `min-h-screen`。

### 2.6 优化 FloatingToolbox 性能（M-2）

**问题：** 3D 轨道持续运行 `requestAnimationFrame`，即使不在视口内。

**方案：** 使用 `IntersectionObserver` 控制动画启停。

### 2.7 为 DevPage/ThoughtPage 配置字体（C-1）

**问题：** 这两个页面仍使用默认 `font-serif`，未配置专属字体。

**方案：**
- DevPage：使用「北岛的心物」作为标题字体（科技感）
- ThoughtPage：使用「半醉半醒半浮生」作为标题字体（文艺感）

### 2.8 优化 EnergyPage 模块顺序（E-1）

**问题：** 当前顺序逻辑混乱，PipelineCanvas 在项目展示之前。

**方案：** 调整为：概览 → 项目 → 案例 → 时间轴 → 工具 → 流程

### 2.9 优化 MagazineSpread 中缝阴影（O-3）

**问题：** 中缝阴影过宽过浓，像裂缝。

**方案：** 减小宽度至 `w-2`，降低不透明度至 `0.15`。

## 3. 文件修改清单

| 文件 | 修改内容 |
|------|----------|
| `src/components/OrbitalDashboard.tsx` | 使用独立 timeline 替代 globalTimeline |
| `src/pages/MediaPage.tsx` | 修复 SkillsHoneycomb 交错布局、优化 FloatingToolbox |
| `src/pages/AIPage.tsx` | 统一 Hero 高度为 min-h-screen |
| `src/pages/DevPage.tsx` | 添加 font-ai-title 字体类 |
| `src/pages/ThoughtPage.tsx` | 添加 font-media-title 字体类 |
| `src/components/Nav.tsx` | 使用 shortLabel 优化导航布局 |
| `src/components/magazine/MagazineSpread.tsx` | 减小中缝阴影 |
| `src/pages/EnergyPage.tsx` | 调整模块顺序 |
| `src/components/pipeline/PipelineCanvas.tsx` | 添加 IntersectionObserver 暂停 |

## 4. 性能优化策略

- 所有 Canvas 组件在 `useEffect` 返回时清理 `requestAnimationFrame`
- 使用 `IntersectionObserver` 在组件离开视口时暂停动画
- GSAP 动画使用独立 timeline 实例
- 避免全局状态污染

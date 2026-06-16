# 设计文档：EnergyB 性能优化与图片加载优化

## 1. 问题分析

### 1.1 EnergyB 卡顿问题
- **现状**：EnergyB 使用 `ExpandableCard` + `IntersectionObserver` + `setTimeout` 错开动画的方式实现技能进度条动画
- **问题**：`setTimeout` + `requestAnimationFrame` 组合在大量 DOM 元素同时动画时仍可能导致主线程阻塞，且 `grid-template-rows` 动画在展开/收起时存在布局抖动
- **目标**：使用 react-bits 的 `AnimatedList` 组件替换现有方案，利用 CSS transform 和 opacity 实现硬件加速动画

### 1.2 图片加载问题
- **现状**：网络图片（如 `https://s1.ax1x.com/...`）直接加载，无占位符、无错误处理、无懒加载优化
- **目标**：添加图片懒加载、骨架屏占位符、错误回退处理

## 2. 方案设计

### 2.1 EnergyB 重构方案

**采用 react-bits 的 `AnimatedList` 组件模式**

- 将技能卡片列表改为 `AnimatedList` 容器
- 每个技能项使用 `motion.div`（framer-motion）或纯 CSS transform 实现入场动画
- 移除 `IntersectionObserver` + `setTimeout` 的复杂逻辑
- 进度条改为纯 CSS 动画，在元素进入视口时触发

**组件结构**：
```
EnergyB
├── AnimatedList (容器，控制 stagger 动画)
│   ├── SkillCard (技能分类卡片)
│   │   ├── SkillHeader (图标 + 标题 + SkillMeter)
│   │   └── SkillItems (技能项列表)
│   │       └── SkillItem (名称 + 进度条)
│   └── ...
└── SkillOverview (技术栈总览，静态展示)
```

### 2.2 图片加载优化方案

**新增 `LazyImage` 组件**：
- 使用 `loading="lazy"` 原生懒加载
- 添加 `blur` 占位符或骨架屏
- `onError` 回退到默认占位图
- 支持 `srcSet` 响应式图片

**应用位置**：
- `AIB.tsx` - 项目媒体展示 (`ProjectShowcase`)
- `OtherB.tsx` - 证书图片、实习图片 (`ImageGallery`)
- `MediaB.tsx` - 项目作品图片（如有）

## 3. 技术选型

| 组件 | 来源 | 用途 |
|------|------|------|
| AnimatedList | react-bits (自定义实现) | EnergyB 技能列表动画 |
| LazyImage | 自定义 | 全站图片懒加载优化 |
| useIntersection | 现有 hooks | 检测元素进入视口 |

## 4. 样式适配

- 保持现有杂志版配色方案（`--color-b-*` 变量）
- 动画时长统一使用 `cubic-bezier(0.16, 1, 0.3, 1)`
- 进度条颜色保持 `var(--color-b-terracotta)`

## 5. 实施步骤

1. 创建 `AnimatedList` 和 `LazyImage` 组件
2. 重构 `EnergyB.tsx` 使用新动画方案
3. 更新 `ProjectShowcase.tsx` 和 `ImageGallery` 使用 `LazyImage`
4. 测试性能（减少主线程阻塞）

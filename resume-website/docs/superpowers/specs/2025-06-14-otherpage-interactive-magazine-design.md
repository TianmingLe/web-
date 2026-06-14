# OtherPage 互动式数字杂志设计文档

## 1. 背景与目标

### 1.1 当前问题
- `OtherPage` 当前使用简单的 `DarkExpandableCard` 折叠卡片，视觉表现力不足
- 与 `EnergyPage` 的工业仪表盘风格相比，"其他"页面显得过于朴素
- 用户明确要求"越复杂越有创造力越好"，且"不要与已有的样式重合"

### 1.2 设计目标
| 目标 | 指标 |
|------|------|
| 独特的杂志美学 | 与 EnergyPage 的工业风、MediaPage 的媒体风形成三足鼎立 |
| 丰富的交互层次 | 翻页、悬停高亮、脚注弹窗、视差滚动 |
| 信息密度与可读性平衡 | 复杂视觉不干扰内容阅读 |
| 移动端适配 | 杂志布局在移动端优雅降级为单栏 |

## 2. 总体架构

```
OtherPage (杂志容器)
├── MagazineHero (封面区)
│   ├── 大标题排版（衬线体 + 装饰线）
│   ├── 期号/日期印章
│   └── 封面图片/插画区域
├── MagazineSpreadAwards (获奖特辑 - 双页展开)
│   ├── LeftPage: 获奖列表（勋章徽章 + 年份标签）
│   └── RightPage: 证书画廊（扫描件样式卡片）
├── MagazineSpreadExperience (经历专题 - 双页展开)
│   ├── LeftPage: 实习经历深度报道（引言框 + 时间轴侧边栏）
│   └── RightPage: 校园经历文化版块（照片框 + 便签）
├── MagazineSkillsColumn (技能专栏 - 单页)
│   ├── 雷达图可视化
│   └── 技能标签云（悬停放大）
├── MagazineContactFooter (封底 - 单页)
│   ├── 条形码样式装饰
│   ├── 社交媒体图标排版
│   └── 页码与期刊信息
└── GlobalEffects (全局效果)
    ├── 页面翻页动画 (CSS 3D)
    ├── 滚动视差
    └── 悬停文字高亮
```

## 3. 视觉风格规范

### 3.1 色彩系统（杂志专色）
| 用途 | 色值 | 说明 |
|------|------|------|
| 主标题 | `#F5E6D3` | 暖米色，替代 Energy 的橙色 |
| 副标题/正文 | `#B8A99A` | 浅驼色 |
| 强调色 | `#D4A574` | 铜金色，用于勋章、边框 |
| 背景 | `#0D0B0A` | 深棕黑，比 EnergyPage 更暖 |
| 卡片背景 | `#1A1614` | 暖灰色 |
| 边框/分割线 | `#3D3530` | 深木色 |
| 高亮悬停 | `#E8C9A0` | 亮金色 |

### 3.2 字体系统
| 层级 | 字体 | 大小 | 字重 |
|------|------|------|------|
| 封面大标题 | Playfair Display / 衬线体 | 48-64px | 700 |
| 版块标题 | Playfair Display | 28-32px | 600 |
| 正文 | Inter / 系统无衬线 | 14px | 400 |
| 标签/页码 | JetBrains Mono | 12px | 500 |
| 引言引用 | Playfair Display Italic | 18px | 400 |

### 3.3 装饰元素（与 EnergyPage 不重复）
- **角花装饰**：页面四角的复古花纹（SVG）
- **段落首字下沉**：文章段落第一个字放大 3 倍
- **栏线分隔**：多栏文本之间的细竖线
- **页眉页脚**：杂志名称 + 日期 + 页码
- **侧边栏注释**：类似《纽约客》的边注
- **便签贴纸**：彩色半透明便签，带旋转角度
- **照片框**：拍立得/宝丽来风格照片框
- **印章/邮戳**：日期印章、"EXCLUSIVE" 等标记

## 4. 组件详细设计

### 4.1 MagazineHero (封面区)

```typescript
function MagazineHero() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center">
      {/* 背景： subtle 的纸张纹理 */}
      <div className="absolute inset-0 opacity-5" 
        style={{ backgroundImage: 'url(/textures/paper-grain.png)' }} />
      
      {/* 顶部装饰线 */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 w-32 h-px bg-copper-gold" />
      
      {/* 期刊信息 */}
      <div className="text-center mb-8">
        <p className="font-mono text-xs tracking-[0.4em] text-warm-copper uppercase">
          Vol. 01 · June 2025
        </p>
      </div>
      
      {/* 大标题 */}
      <h1 className="font-serif text-6xl md:text-7xl text-magazine-cream tracking-tight text-center">
        <span className="block">荣誉与</span>
        <span className="block italic text-copper-gold">经历</span>
      </h1>
      
      {/* 副标题 */}
      <p className="mt-6 text-magazine-warm text-sm max-w-md text-center leading-relaxed">
        从学术竞赛到职业实践，从校园活动到技能积累——
        一份关于成长与探索的个人档案。
      </p>
      
      {/* 装饰性分隔 */}
      <div className="mt-8 flex items-center gap-4">
        <div className="w-12 h-px bg-copper-gold/50" />
        <div className="w-2 h-2 rotate-45 border border-copper-gold" />
        <div className="w-12 h-px bg-copper-gold/50" />
      </div>
      
      {/* 底部：作者信息栏 */}
      <div className="absolute bottom-8 left-0 right-0 px-8">
        <div className="flex justify-between items-end text-xs font-mono text-magazine-warm/60">
          <span>EDITOR: TIANMING LE</span>
          <span className="px-3 py-1 border border-copper-gold/30 rounded-full">
            FEATURED
          </span>
          <span>PRICELESS</span>
        </div>
      </div>
    </div>
  )
}
```

### 4.2 MagazineSpreadAwards (获奖特辑)

**左页 - 获奖殿堂：**
- 顶部："HALL OF HONOR" 标题 + 装饰线
- 每个奖项为一个条目：
  - 左侧：年份（大号数字，旋转 -90 度竖排）
  - 中间：奖项名称 + 项目名
  - 右侧：级别徽章（省级一等奖 = 金徽章，校级 = 铜徽章）
- 底部：累计获奖统计框

**右页 - 证书画廊：**
- 网格布局的证书卡片（2x3）
- 每张卡片为"扫描件"样式：
  - 米色背景（`#F5E6D3`）
  - 细边框 + 阴影
  - 证书名称（深色文字）
  - 底部：红色印章装饰（SVG）
- 悬停：卡片微微抬起 + 阴影加深

### 4.3 MagazineSpreadExperience (经历专题)

**左页 - 实习深度报道：**
- 大标题："FIELD REPORT"（现场报道）
- 首字下沉的段落介绍
- 侧边栏：时间轴（竖线 + 节点）
- 数据框：实习关键数字（3 个带边框的数字卡片）
- 引言框：左侧粗竖线 + 斜体引言

**右页 - 校园生活版块：**
- 标题："CAMPUS LIFE"
- 照片框：拍立得风格卡片（带胶带装饰角）
- 经历列表：带小圆点的简洁列表
- 便签区：彩色便签（黄色、蓝色、粉色）贴在不同位置
- 底部：成就标签云

### 4.4 MagazineSkillsColumn (技能专栏)

- 单页全宽布局
- 左侧：雷达图（Canvas/SVG 绘制，5 个维度：专业技能、编程、AI、媒体、工具）
- 右侧：技能标签云
  - 每个标签为不同大小（根据熟练度）
  - 悬停：标签放大 + 变色 + 显示熟练度星级
- 底部：技能总览表格（极简线框表格）

### 4.5 MagazineContactFooter (封底)

- 顶部：条形码装饰（CSS 绘制的黑白条纹）
- 中间：社交媒体图标（横向排列，杂志排版风格）
- 右侧：二维码占位框（带扫描提示文字）
- 底部：页码（大号数字）+ 杂志名称 + "THANK YOU FOR READING"

## 5. 交互设计

### 5.1 页面翻页动画
- 每个 MagazineSpread 视为一个"跨页"
- 滚动进入时：页面从右侧滑入，带 3D 旋转效果（`rotateY(-5deg)` → `0`）
- 使用 GSAP ScrollTrigger 触发
- 移动端禁用 3D 效果，改为淡入 + 上滑

### 5.2 悬停文字高亮
- 正文段落中，鼠标悬停时当前句子高亮（`background: rgba(212, 165, 116, 0.15)`）
- 过渡动画：`transition: background 0.3s ease`

### 5.3 脚注弹窗
- 某些关键词（如技术术语）带小上标数字
- 点击/悬停：弹出脚注卡片（类似维基百科预览）
- 弹窗位置智能计算（不超出视口）

### 5.4 视差滚动
- 背景装饰元素（角花、线条）以 0.5x 速度滚动
- 内容以 1x 速度滚动
- 创造层次感

### 5.5 便签交互
- 便签可点击：翻转显示背面文字
- 使用 CSS `transform: rotateY(180deg)`
- 翻转动画 0.6s ease

## 6. 动画时序

| 元素 | 触发 | 动画 | 时长 | 缓动 |
|------|------|------|------|------|
| 封面标题 | 页面加载 | 字母逐个淡入 + 上滑 | 0.8s | back.out |
| 跨页进入 | ScrollTrigger | 3D 翻入 (rotateY) | 0.6s | power2.out |
| 奖项条目 | ScrollTrigger | 左侧滑入，stagger 0.1s | 0.5s | power2.out |
| 证书卡片 | 悬停 | 抬起 + 阴影加深 | 0.3s | ease-out |
| 技能标签 | 悬停 | 放大 1.1x + 变色 | 0.2s | ease-out |
| 便签翻转 | 点击 | rotateY 180deg | 0.6s | ease-in-out |
| 雷达图 | ScrollTrigger | 线条逐笔画出 | 1.5s | power2.inOut |

## 7. 文件结构

```
src/
├── pages/
│   └── OtherPage.tsx              # 主页面，整合所有杂志组件
├── components/
│   └── magazine/
│       ├── MagazineHero.tsx       # 封面区
│       ├── MagazineSpread.tsx     # 通用双页展开容器
│       ├── MagazineAwards.tsx     # 获奖特辑
│       ├── MagazineExperience.tsx # 经历专题
│       ├── MagazineSkills.tsx     # 技能专栏
│       ├── MagazineFooter.tsx     # 封底
│       ├── MagazineDecorations.tsx # 装饰元素（角花、线条等）
│       ├── RadarChart.tsx         # 雷达图组件
│       ├── PolaroidFrame.tsx      # 拍立得相框
│       ├── StickyNote.tsx         # 可翻转便签
│       ├── FootnotePopup.tsx      # 脚注弹窗
│       └── CertificateCard.tsx    # 证书扫描件卡片
```

## 8. 依赖

- `gsap` + `ScrollTrigger`（已存在）
- `lucide-react`（已存在）
- 无需新增外部依赖

## 9. 性能考虑

- 3D 翻页动画使用 `transform` 和 `opacity`，触发 GPU 加速
- 视差效果使用 `requestAnimationFrame` 节流
- 移动端减少粒子/复杂 SVG 数量
- 图片懒加载（证书卡片、照片框）

## 10. 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 3D 变换在低端设备卡顿 | 中 | 检测设备性能，低端设备禁用 3D |
| 内容过多导致页面过长 | 低 | 合理控制每个版块高度 |
| 杂志风格与整体网站不协调 | 中 | 保持色彩系统与全局暗色主题一致 |

# 字体美化设计文档

## 1. 背景与目标

### 1.1 当前问题
- 项目目前使用 Google Fonts 在线加载字体（`index.html` 中通过 `<link>` 引入）
- 用户已将 4 款中文字体文件放入 `public/` 文件夹
- 需要将这些本地字体整合到项目中，按页面分配不同字体风格
- 同时按用途分配字体（标题/正文/数据），形成层次分明的排版系统

### 1.2 设计目标
| 目标 | 指标 |
|------|------|
| 每页独特字体风格 | EnergyPage 力量感、MediaPage 艺术感、OtherPage 优雅感 |
| 层次分明的排版 | 标题字体 + 正文字体 + 数据字体 |
| 所有字体都用上 | 4 款字体全部整合到项目中 |
| 性能优化 | 使用 `font-display: swap` 避免 FOIT |

## 2. 字体分析与分配

### 2.1 字体文件清单

| 文件名 | 字体名称 | 风格特征 |
|--------|----------|----------|
| `AaKuangPaiShouShu-2.ttf` | 狂派手书 | 粗犷、力量感、手写毛笔风格 |
| `BanZuiBanXingBanFuSheng-2.ttf` | 半醉半醒半浮生 | 文艺、飘逸、略带洒脱 |
| `BeiDaoDeXinWu-2.ttf` | 北岛的心物 | 现代、简洁、几何感 |
| `Formula1-Black.ttf` | F1 Black | 运动、速度感、粗黑体 |

### 2.2 页面字体分配

| 页面 | 标题字体 | 正文字体 | 数据/标签字体 | 风格定位 |
|------|----------|----------|---------------|----------|
| **EnergyPage** | 狂派手书 | 北岛的心物 | JetBrains Mono | 工业力量感 |
| **MediaPage** | 半醉半醒半浮生 | 北岛的心物 | JetBrains Mono | 艺术创意感 |
| **OtherPage** | 半醉半醒半浮生 | 北岛的心物 | JetBrains Mono | 杂志优雅感 |
| **AIPage** | 北岛的心物 | 北岛的心物 | JetBrains Mono | 科技现代感 |
| **HomePage** | Formula1-Black | 北岛的心物 | JetBrains Mono | 速度冲击感 |
| **全局默认** | 北岛的心物 | 北岛的心物 | JetBrains Mono | 现代简洁 |

### 2.3 字体层级系统

```
页面大标题 (h1):     页面专属标题字体, 48-64px, font-weight: 400
版块标题 (h2):       页面专属标题字体, 28-32px, font-weight: 400
卡片标题 (h3/h4):    页面专属标题字体, 16-20px, font-weight: 400
正文段落 (p):        北岛的心物, 14-16px, font-weight: 400
标签/页码 (span):    JetBrains Mono, 10-12px, font-weight: 500
数据指标 (strong):   JetBrains Mono, 14-16px, font-weight: 500
```

## 3. 技术实现方案

### 3.1 @font-face 配置

在 `src/index.css` 中添加：

```css
/* 狂派手书 - 力量感 */
@font-face {
  font-family: 'KuangPai';
  src: url('/AaKuangPaiShouShu-2.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* 半醉半醒半浮生 - 文艺飘逸 */
@font-face {
  font-family: 'BanZui';
  src: url('/BanZuiBanXingBanFuSheng-2.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* 北岛的心物 - 现代简洁 */
@font-face {
  font-family: 'BeiDao';
  src: url('/BeiDaoDeXinWu-2.ttf') format('truetype');
  font-weight: 400;
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* F1 Black - 运动速度感 */
@font-face {
  font-family: 'F1Black';
  src: url('/Formula1-Black.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### 3.2 CSS 变量更新

更新 `src/index.css` 中的字体变量：

```css
@theme {
  /* 保留原有变量... */

  /* 页面专属字体 */
  --font-energy-title: 'KuangPai', 'Instrument Serif', serif;
  --font-media-title: 'BanZui', 'Playfair Display', serif;
  --font-other-title: 'BanZui', 'Playfair Display', serif;
  --font-ai-title: 'BeiDao', 'Geist', sans-serif;
  --font-home-title: 'F1Black', 'Geist', sans-serif;

  /* 通用字体 */
  --font-body: 'BeiDao', 'Geist', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### 3.3 页面级字体应用

每个页面通过 CSS 类或 style 属性应用专属字体：

**EnergyPage.tsx:**
```tsx
<div className="font-energy-title">
  <h1>能源动力</h1>
</div>
```

**MediaPage.tsx:**
```tsx
<div className="font-media-title">
  <h1>媒体创作</h1>
</div>
```

**OtherPage.tsx:**
```tsx
<div className="font-other-title">
  <h1>荣誉与经历</h1>
</div>
```

## 4. 各页面字体应用细节

### 4.1 EnergyPage（工业力量感）
- **大标题**: 狂派手书 — 粗犷有力，契合工业/能源主题
- **仪表盘标签**: JetBrains Mono — 保持工业仪表盘的数据感
- **管道标签**: 北岛的心物 — 清晰可读

### 4.2 MediaPage（艺术创意感）
- **大标题**: 半醉半醒半浮生 — 飘逸文艺，契合媒体/创意主题
- **工具栈标题**: 半醉半醒半浮生 — 艺术感
- **项目卡片标题**: 北岛的心物 — 现代简洁

### 4.3 OtherPage（杂志优雅感）
- **封面大标题**: 半醉半醒半浮生 — 优雅飘逸，契合杂志美学
- **版块标题**: 半醉半醒半浮生 — 一致性
- **正文**: 北岛的心物 — 清晰可读

### 4.4 HomePage（速度冲击感）
- **大标题**: F1 Black — 运动速度感，视觉冲击力强
- **副标题**: 北岛的心物 — 平衡可读性

### 4.5 AIPage（科技现代感）
- **所有标题**: 北岛的心物 — 现代几何感，契合科技主题
- **代码块**: JetBrains Mono — 保持技术感

## 5. 文件修改清单

| 文件 | 修改内容 |
|------|----------|
| `src/index.css` | 添加 @font-face 和字体变量 |
| `src/pages/EnergyPage.tsx` | 标题应用 font-energy-title |
| `src/pages/MediaPage.tsx` | 标题应用 font-media-title |
| `src/pages/OtherPage.tsx` | 标题应用 font-other-title |
| `src/pages/HomePage.tsx` | 标题应用 font-home-title |
| `src/pages/AIPage.tsx` | 标题应用 font-ai-title |
| `index.html` | 移除不必要的 Google Fonts（可选） |

## 6. 性能考虑

- 所有字体使用 `font-display: swap` 避免 FOIT（Flash of Invisible Text）
- 字体文件放在 `public/` 目录，Vite 不会处理，直接原样复制到构建输出
- 建议后续对 .ttf 文件进行子集化（仅保留常用汉字）以减小文件体积

## 7. 回退策略

每款字体都配置了回退字体栈：
- 中文字体 → 系统默认中文字体
- 标题字体 → 对应的 Google Fonts 或系统字体
- 确保字体加载失败时仍有可读的回退显示

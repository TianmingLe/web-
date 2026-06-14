# 字体美化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 public 文件夹中的 4 款本地中文字体整合到项目中，按页面分配不同字体风格，形成层次分明的排版系统。

**Architecture:** 通过 @font-face 在 CSS 中注册字体，使用 CSS 变量定义页面专属字体，然后在各页面组件中应用对应的字体类。所有字体文件放在 public/ 目录直接引用。

**Tech Stack:** React, TypeScript, Tailwind CSS, Vite

---

## File Structure

```
src/
├── index.css              # 添加 @font-face 和字体变量
└── pages/
    ├── EnergyPage.tsx     # 应用 font-energy-title
    ├── MediaPage.tsx      # 应用 font-media-title
    ├── OtherPage.tsx      # 应用 font-other-title
    ├── HomePage.tsx       # 应用 font-home-title
    └── AIPage.tsx         # 应用 font-ai-title
```

---

## Task 1: 在 index.css 中添加 @font-face 和字体变量

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: 在 @theme 块之前添加 @font-face 声明**

在 `src/index.css` 文件开头（`@import "tailwindcss";` 之后，`@theme {` 之前）添加：

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

- [ ] **Step 2: 在 @theme 块中添加字体变量**

在 `src/index.css` 的 `@theme {` 块中，在现有字体变量之后添加：

```css
  /* Page-specific title fonts */
  --font-energy-title: 'KuangPai', 'Instrument Serif', Georgia, serif;
  --font-media-title: 'BanZui', 'Playfair Display', Georgia, serif;
  --font-other-title: 'BanZui', 'Playfair Display', Georgia, serif;
  --font-ai-title: 'BeiDao', 'Geist', -apple-system, sans-serif;
  --font-home-title: 'F1Black', 'Geist', -apple-system, sans-serif;

  /* Body font - modern Chinese */
  --font-body: 'BeiDao', 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
```

- [ ] **Step 3: 在 @layer utilities 中添加字体工具类**

在 `src/index.css` 的 `@layer utilities {` 块中，在现有工具类之后添加：

```css
  .font-energy-title {
    font-family: var(--font-energy-title);
  }

  .font-media-title {
    font-family: var(--font-media-title);
  }

  .font-other-title {
    font-family: var(--font-other-title);
  }

  .font-ai-title {
    font-family: var(--font-ai-title);
  }

  .font-home-title {
    font-family: var(--font-home-title);
  }

  .font-body {
    font-family: var(--font-body);
  }
```

- [ ] **Step 4: 更新 base 层的 body 字体**

在 `src/index.css` 的 `@layer base {` 块中，找到 `body` 的样式，确保使用新的 body 字体：

```css
  body {
    background-color: var(--color-base);
    color: var(--color-warm);
    font-family: var(--font-body);
    font-weight: 400;
    letter-spacing: -0.01em;
    overflow-x: hidden;
    line-height: 1.6;
  }
```

如果 body 已经有 `font-family: var(--font-sans);`，将其改为 `font-family: var(--font-body);`。

- [ ] **Step 5: Commit**

```bash
git add src/index.css
git commit -m "feat(fonts): add @font-face declarations and font utility classes"
```

---

## Task 2: 修改 EnergyPage 应用狂派手书字体

**Files:**
- Modify: `src/pages/EnergyPage.tsx`

- [ ] **Step 1: 找到 EnergyPage 的大标题**

在 EnergyPage.tsx 中搜索主标题（通常是 `<h1>` 或包含 "能源" 的标题元素）。找到类似：

```tsx
<h1 className="text-4xl md:text-5xl font-serif text-warm">能源动力</h1>
```

- [ ] **Step 2: 给大标题添加 font-energy-title 类**

将大标题的 className 中添加 `font-energy-title`：

```tsx
<h1 className="text-4xl md:text-5xl font-energy-title text-warm">能源动力</h1>
```

如果标题使用了 `font-serif`，替换为 `font-energy-title`。

- [ ] **Step 3: 给版块标题添加字体类**

找到 EnergyPage 中的其他标题（如 "技能流程图"、"项目展示" 等），给它们添加 `font-energy-title`：

```tsx
<h2 className="text-2xl md:text-3xl font-energy-title text-warm">技能流程图</h2>
```

- [ ] **Step 4: Commit**

```bash
git add src/pages/EnergyPage.tsx
git commit -m "feat(fonts): apply KuangPai font to EnergyPage titles"
```

---

## Task 3: 修改 MediaPage 应用半醉半醒半浮生字体

**Files:**
- Modify: `src/pages/MediaPage.tsx`

- [ ] **Step 1: 找到 MediaPage 的大标题**

在 MediaPage.tsx 中搜索主标题（通常是 `<h1>` 或包含 "媒体" 的标题元素）。找到类似：

```tsx
<h1 className="text-4xl md:text-5xl font-serif text-warm">媒体创作</h1>
```

- [ ] **Step 2: 给大标题添加 font-media-title 类**

将大标题的 className 中添加 `font-media-title`：

```tsx
<h1 className="text-4xl md:text-5xl font-media-title text-warm">媒体创作</h1>
```

- [ ] **Step 3: 给工具栈标题添加字体类**

找到 FloatingToolbox 组件中的 "工具栈" 标题：

```tsx
<h2 className="text-2xl md:text-3xl font-media-title text-warm">工具栈</h2>
```

- [ ] **Step 4: 给其他版块标题添加字体类**

找到 MediaPage 中的其他标题（如 "内容流水线"、"平台矩阵" 等），给它们添加 `font-media-title`：

```tsx
<h2 className="text-2xl md:text-3xl font-media-title text-warm">内容流水线</h2>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/MediaPage.tsx
git commit -m "feat(fonts): apply BanZui font to MediaPage titles"
```

---

## Task 4: 修改 OtherPage 应用半醉半醒半浮生字体

**Files:**
- Modify: `src/pages/OtherPage.tsx`

- [ ] **Step 1: 找到 OtherPage 的大标题**

OtherPage 现在使用杂志组件。找到 MagazineHero 组件调用处，或直接在 MagazineHero.tsx 中修改。

在 `src/components/magazine/MagazineHero.tsx` 中找到标题：

```tsx
<h1 className="font-serif text-6xl md:text-7xl text-magazine-cream tracking-tight">
```

- [ ] **Step 2: 给 MagazineHero 标题添加字体类**

将 `font-serif` 替换为 `font-other-title`：

```tsx
<h1 className="font-other-title text-6xl md:text-7xl text-magazine-cream tracking-tight">
```

- [ ] **Step 3: 给其他杂志版块标题添加字体类**

在 `src/components/magazine/MagazineAwards.tsx` 中找到 "Hall of Honor" 标题，添加 `font-other-title`。

在 `src/components/magazine/MagazineExperience.tsx` 中找到 "Field Report" 和 "Campus Life" 标题，添加 `font-other-title`。

在 `src/components/magazine/MagazineSkills.tsx` 中找到 "技能矩阵" 标题，添加 `font-other-title`。

在 `src/components/magazine/MagazineFooter.tsx` 中找到封底标题，添加 `font-other-title`。

- [ ] **Step 4: Commit**

```bash
git add src/components/magazine/MagazineHero.tsx src/components/magazine/MagazineAwards.tsx src/components/magazine/MagazineExperience.tsx src/components/magazine/MagazineSkills.tsx src/components/magazine/MagazineFooter.tsx
git commit -m "feat(fonts): apply BanZui font to OtherPage magazine titles"
```

---

## Task 5: 修改 HomePage 应用 F1 Black 字体

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: 找到 HomePage 的大标题**

在 HomePage.tsx 中搜索主标题（通常是 `<h1>` 或包含姓名的标题元素）。找到类似：

```tsx
<h1 className="text-4xl md:text-6xl font-serif text-warm">胡亚伟</h1>
```

- [ ] **Step 2: 给大标题添加 font-home-title 类**

将大标题的 className 中添加 `font-home-title`：

```tsx
<h1 className="text-4xl md:text-6xl font-home-title text-warm">胡亚伟</h1>
```

- [ ] **Step 3: 给副标题和版块标题添加字体类**

找到 HomePage 中的其他标题，给它们添加 `font-home-title` 或保持 `font-body`（根据设计选择）。

- [ ] **Step 4: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat(fonts): apply F1Black font to HomePage titles"
```

---

## Task 6: 修改 AIPage 应用北岛的心物字体

**Files:**
- Modify: `src/pages/AIPage.tsx`

- [ ] **Step 1: 找到 AIPage 的大标题**

在 AIPage.tsx 中搜索主标题。找到类似：

```tsx
<h1 className="text-4xl md:text-5xl font-serif text-warm">人工智能</h1>
```

- [ ] **Step 2: 给大标题添加 font-ai-title 类**

将大标题的 className 中添加 `font-ai-title`：

```tsx
<h1 className="text-4xl md:text-5xl font-ai-title text-warm">人工智能</h1>
```

- [ ] **Step 3: 给其他标题添加字体类**

找到 AIPage 中的其他标题，给它们添加 `font-ai-title`。

- [ ] **Step 4: Commit**

```bash
git add src/pages/AIPage.tsx
git commit -m "feat(fonts): apply BeiDao font to AIPage titles"
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
cd /workspace/resume-website && npx eslint src/index.css src/pages/EnergyPage.tsx src/pages/MediaPage.tsx src/pages/OtherPage.tsx src/pages/HomePage.tsx src/pages/AIPage.tsx src/components/magazine/
```

Expected: 无 lint 错误

- [ ] **Step 3: 本地启动验证**

```bash
cd /workspace/resume-website && npm run dev
```

访问各页面验证字体是否正确加载：
1. http://localhost:5173/energy — 标题应为狂派手书风格
2. http://localhost:5173/media — 标题应为半醉半醒半浮生风格
3. http://localhost:5173/other — 标题应为半醉半醒半浮生风格
4. http://localhost:5173/ — 标题应为 F1 Black 风格
5. http://localhost:5173/ai — 标题应为北岛的心物风格

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "test(fonts): verify font integration across all pages"
```

---

## Spec Coverage Check

| Spec 需求 | 对应 Task |
|-----------|-----------|
| @font-face 注册 4 款字体 | Task 1 |
| CSS 变量定义页面专属字体 | Task 1 |
| 工具类 font-energy-title | Task 1 |
| EnergyPage 应用狂派手书 | Task 2 |
| MediaPage 应用半醉半醒半浮生 | Task 3 |
| OtherPage 应用半醉半醒半浮生 | Task 4 |
| HomePage 应用 F1 Black | Task 5 |
| AIPage 应用北岛的心物 | Task 6 |
| 类型检查与测试 | Task 7 |

## Placeholder Scan

- 无 TBD/TODO
- 所有代码块包含完整实现
- 所有命令包含预期输出

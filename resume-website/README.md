# 胡亚伟 - 个人简历网站

基于 React + TypeScript + Vite 构建的个人简历/作品集网站，支持暗黑版与杂志版双版本切换。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式**: Tailwind CSS v4（CSS-first 配置）
- **动画**: GSAP + ScrollTrigger
- **状态管理**: Zustand（localStorage 持久化）
- **路由**: React Router v6（BrowserRouter）
- **图标**: Lucide React

## 项目结构

```
src/
├── components/       # 通用组件（Nav, GlassCard, EvolutionTimeline 等）
├── sections/         # 暗黑版（版本A）各板块内容
├── sections-b/       # 杂志版（版本B）各板块内容
├── pages/            # 暗黑版页面包装器
├── pages-b/          # 杂志版页面包装器
├── layouts/          # 布局组件（CoverLayout, SectionLayout）
├── data/             # JSON 数据源（ai.json, energy.json 等）
├── store/            # Zustand 状态（version.ts, audio.ts 等）
├── hooks/            # 自定义 Hooks
├── utils/            # 工具函数
├── App.tsx           # 应用入口（版本路由切换）
├── index.css         # 全局样式 + Tailwind @theme 设计令牌
└── main.tsx          # 渲染入口
```

## 版本切换

- 右上角切换按钮可在 **暗黑版**（版本A）与 **杂志版**（版本B）之间切换
- 版本选择自动保存到 localStorage，刷新后保持

## 视频背景

### 放置位置

```
public/
  videos/
    hero-bg.mp4        ← 视频文件放这里
    hero-bg.webm       ← 可选，WebM 格式备用
```

选择 `public/` 目录的原因：Vite 对 `public/` 下的文件原样输出到构建产物，不经过编译或哈希处理，可直接用 `/videos/hero-bg.mp4` 绝对路径引用。

### 视频要求

| 项目 | 建议 |
|------|------|
| 格式 | MP4（H.264 编码，兼容性最好）+ 可选 WebM（VP9，体积更小） |
| 分辨率 | 1080p（1920×1080），4K 体积太大影响加载 |
| 时长 | 10-30 秒循环短片 |
| 文件大小 | 控制在 5MB 以内，最好 2-3MB |
| 帧率 | 24fps 或 30fps |
| 音频 | 移除音轨（背景视频不需要声音），可大幅减小体积 |
| 码率 | 用 FFmpeg 压缩：`ffmpeg -i input.mp4 -vcodec h264 -crf 28 -an -movflags +faststart hero-bg.mp4` |

### 引用方式

```tsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover -z-10"
>
  <source src="/videos/hero-bg.mp4" type="video/mp4" />
  <source src="/videos/hero-bg.webm" type="video/webm" />
</video>
```

关键属性说明：
- `muted` — 浏览器要求静音才允许自动播放
- `playsInline` — iOS Safari 需要此属性才内联播放
- `autoPlay loop` — 自动循环播放
- `-z-10` — 确保视频在内容层之下

### 注意事项

1. **不要提交大文件到 Git** — 在 `.gitignore` 中加 `public/videos/*.mp4`，改用 Git LFS 或 CDN 托管
2. **提供降级方案** — 视频加载前或失败时显示静态背景图
3. **移动端慎用** — 手机流量和性能有限，建议移动端用 `@media (max-width)` 回退到静态背景
4. **`-movflags +faststart`** — 编码时加此参数，让视频元数据在文件头部，浏览器可以边下边播

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
npm run preview
```

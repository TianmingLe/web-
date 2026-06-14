import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowLeft,
  BrainCircuit,
  Bot,
  Eye,
  Database,
  Network,
  Zap,
  TrendingUp,
  BarChart3,
  Layers,
  Code2,
  CheckCircle2,
  Activity,
  Terminal,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import DarkExpandableCard from '@components/DarkExpandableCard'
import { capabilityData } from '@data/capabilityMap'

gsap.registerPlugin(ScrollTrigger)

const aiNode = capabilityData.mainNodes.find((n) => n.id === 'ai')!

const stats = [
  { label: 'RAG检索准确率', value: '92%', icon: <Database size={16} /> },
  { label: '工具调用成功率', value: '>98%', icon: <Terminal size={16} /> },
  { label: '音频传输延迟', value: '<100ms', icon: <Zap size={16} /> },
  { label: 'OTA成功率', value: '>95%', icon: <TrendingUp size={16} /> },
  { label: 'QPS', value: '200+', icon: <Activity size={16} /> },
  { label: '上下文准确率', value: '>95%', icon: <CheckCircle2 size={16} /> },
]

const projects = [
  {
    title: 'Altezhong-yanjing 智能眼镜系统',
    desc: '基于「轻眼镜+重后端」架构的智能眼镜系统，实现眼镜-手机-PC-云的多条链路。包含ESP32-S3固件（BLE音频/视觉特征提取）、Flutter移动应用、FastAPI后端和PC中继服务，支持断点续传与OTA升级。',
    tags: ['ESP32-S3', 'Flutter', 'FastAPI', 'TFLite Micro', 'BLE', 'WebSocket'],
    highlights: [
      '音频传输延迟<100ms',
      '视觉特征提取耗时<50ms，RAM占用<2MB',
      'OTA成功率>95%，回滚保护100%有效',
      'App连接成功率>98%',
    ],
  },
  {
    title: '多Agent协同系统（知心AI）',
    desc: '基于Spring AI框架构建AI智能体应用，实现多轮情感咨询与自主规划两大核心功能。支持知识库问答、动态工具调用、任务自主分解执行，完成从用户指令到行动交付的完整闭环。',
    tags: ['Spring AI', 'RAG', 'PGvector', 'MCP', 'ReAct', 'Tool Calling'],
    highlights: [
      'RAG检索准确率92%',
      '工具调用成功率>98%',
      '支持10轮以上连续对话',
      '知识库500+文档，检索响应<100ms',
    ],
  },
  {
    title: '知识库问答系统',
    desc: '向量+BM25混合检索、查询重写、Cross-Encoder重排序。支持500+文档的知识库，检索响应<100ms，RAG检索准确率92%。',
    tags: ['RAG', '向量数据库', 'Embedding', '重排序'],
    highlights: ['混合检索', '查询重写', 'Cross-Encoder重排序', '响应<100ms'],
  },
  {
    title: 'AIGC内容工厂',
    desc: '熟悉数字人技术、语音克隆、多语种复制、AI音乐及Midjourney、Stable Diffusion等AI绘画技术，能独立完成从创意到成品的全流程。',
    tags: ['数字人', '语音克隆', 'Suno AI', 'Midjourney', 'Stable Diffusion'],
    highlights: ['数字人视频制作', '多语种语音合成', 'AI音乐生成', '概念设计/插画'],
  },
]

const techStack = [
  { name: 'Spring AI', category: '框架' },
  { name: 'LangChain', category: '框架' },
  { name: 'OpenClaw', category: '框架' },
  { name: 'PyTorch', category: '深度学习' },
  { name: 'LoRA', category: '微调' },
  { name: 'DeepSpeed', category: '训练' },
  { name: 'PGvector', category: '数据库' },
  { name: 'Redis', category: '缓存' },
  { name: 'FastAPI', category: '后端' },
  { name: 'Flutter', category: '移动端' },
  { name: 'ESP32', category: '嵌入式' },
  { name: 'TFLite Micro', category: '端侧' },
  { name: 'ComfyUI', category: '工作流' },
  { name: 'n8n', category: '自动化' },
  { name: 'ReAct', category: '架构' },
  { name: 'MCP', category: '协议' },
]

function NeuralNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    interface Node {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }

    const nodes: Node[] = []
    const nodeCount = 50

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: 2 + Math.random() * 3,
      })
    }

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', resize)

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.15
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(74, 124, 155, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw and update nodes
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > w) node.vx *= -1
        if (node.y < 0 || node.y > h) node.vy *= -1

        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(107, 163, 196, 0.6)'
        ctx.fill()
      }

      // Data flow particles
      const t = Date.now() * 0.001
      for (let i = 0; i < 5; i++) {
        const startIdx = Math.floor(Math.abs(Math.sin(t + i * 1.3)) * nodes.length)
        const endIdx = Math.floor(Math.abs(Math.cos(t + i * 2.1)) * nodes.length)
        if (startIdx === endIdx) continue
        const s = nodes[startIdx]
        const e = nodes[endIdx]
        const progress = (t * 0.5 + i * 0.2) % 1
        const px = s.x + (e.x - s.x) * progress
        const py = s.y + (e.y - s.y) * progress
        ctx.beginPath()
        ctx.arc(px, py, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(107, 163, 196, 0.8)'
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function AIPage() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ai-hero-title',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        '.ai-hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        '.ai-hero-badge',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6 }
      )

      const items = gsap.utils.toArray<HTMLElement>('.ai-animate')
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={contentRef} className="relative">
      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <NeuralNetworkBg />
        <div className="hero-glow hero-glow-ai absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative z-10 text-center px-4">
          <div className="ai-hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ai-dim border border-ai/20 mb-6">
            <BrainCircuit size={14} className="text-ai-light" />
            <span className="text-ai-light text-xs font-mono tracking-[0.15em] uppercase">
              人工智能前沿探索
            </span>
          </div>
          <h1 className="ai-hero-title text-5xl md:text-7xl font-ai-title text-warm mb-6 tracking-tight">
            AI特种技术
          </h1>
          <p className="ai-hero-sub text-warm-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-sans">
            深入掌握大语言模型、智能体开发、AIGC与嵌入式AI技术，具备从算法研究到工程落地的全链路能力。
          </p>
          <div className="ai-hero-sub mt-8 flex items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface border border-border hover:border-ai/30 hover:bg-surface-hover transition-all text-warm text-sm font-sans"
            >
              <ArrowLeft size={14} />
              返回首页
            </Link>
          </div>
        </div>
      </div>

      <div className="relative pt-16 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Dashboard */}
          <div className="ai-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={24} className="text-ai-light" />
              <h2 className="text-2xl md:text-3xl font-ai-title text-warm">核心指标</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="industrial-card industrial-card-ai p-5 text-center"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-ai-dim flex items-center justify-center text-ai-light">
                    {stat.icon}
                  </div>
                  <p className="text-ai-light text-2xl font-mono font-bold">{stat.value}</p>
                  <p className="text-warm-faint text-xs mt-1 font-sans">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Matrix */}
          <div className="ai-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Network size={24} className="text-ai-light" />
              <h2 className="text-2xl md:text-3xl font-ai-title text-warm">技能矩阵</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {aiNode.subNodes.map((skill) => (
                <DarkExpandableCard
                  key={skill.id}
                  title={skill.label}
                  glowColor="ai"
                  keywords={
                    skill.level && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < (skill.level || 0)
                                ? 'bg-ai-light'
                                : 'bg-warm-ghost/20'
                            }`}
                          />
                        ))}
                      </div>
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Activity size={16} className="text-ai-light/70" />
                    <span className="text-warm-muted text-sm font-sans">
                      熟练度等级 {skill.level}/5
                    </span>
                  </div>
                </DarkExpandableCard>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="ai-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Bot size={24} className="text-ai-light" />
              <h2 className="text-2xl md:text-3xl font-ai-title text-warm">项目展示</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="industrial-card industrial-card-ai p-6"
                >
                  <h3 className="text-lg font-serif text-warm mb-3">{proj.title}</h3>
                  <p className="text-warm-muted text-sm leading-relaxed mb-4 font-sans">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {proj.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-ai-dim text-ai-light border border-ai/20 font-sans"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {proj.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 size={14} className="text-ai-light mt-0.5 shrink-0" />
                        <span className="text-warm-muted text-xs font-sans">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Visualization */}
          <div className="ai-animate mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Layers size={24} className="text-ai-light" />
              <h2 className="text-2xl md:text-3xl font-ai-title text-warm">技术栈</h2>
            </div>
            <div className="industrial-card p-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {Array.from(new Set(techStack.map((t) => t.category))).map((cat) => (
                  <div key={cat}>
                    <p className="text-ai-light text-xs font-mono uppercase tracking-wider mb-3">
                      {cat}
                    </p>
                    <div className="space-y-2">
                      {techStack
                        .filter((t) => t.category === cat)
                        .map((t, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-elevated border border-border hover:border-ai/20 transition-colors"
                          >
                            <Code2 size={12} className="text-ai-light/60" />
                            <span className="text-warm text-sm font-sans">{t.name}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Case Study */}
          {aiNode.caseStudy && (
            <div className="ai-animate">
              <div className="industrial-card industrial-card-ai p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Eye size={24} className="text-ai-light" />
                  <h3 className="text-xl font-ai-title text-warm">{aiNode.caseStudy.title}</h3>
                </div>
                <p className="text-warm-muted text-sm leading-relaxed mb-6 font-sans">
                  {aiNode.caseStudy.description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(aiNode.caseStudy.metrics || {}).map(([k, v], i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-lg bg-base-elevated border border-border"
                    >
                      <p className="text-ai-light text-xl font-mono font-medium">{v}</p>
                      <p className="text-warm-faint text-[10px] font-mono mt-1 uppercase">
                        {k}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

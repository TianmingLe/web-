export interface SubNode {
  id: string
  label: string
  level?: number
  highlight?: boolean
}

export interface MainNode {
  id: string
  label: string
  icon: string
  color: string
  glowColor: string
  subNodes: SubNode[]
  caseStudy?: {
    title: string
    description: string
    metrics?: Record<string, string>
  }
}

export interface CapabilityData {
  center: {
    name: string
    title: string
    mbti: string
  }
  mainNodes: MainNode[]
}

export const capabilityData: CapabilityData = {
  center: {
    name: '胡亚伟',
    title: 'AI NATIVE GRADUATE',
    mbti: 'ENTJ-A'
  },
  mainNodes: [
    {
      id: 'energy',
      label: '能动技术',
      icon: '⚙️',
      color: '#F97316',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      subNodes: [
        { id: 'cfd', label: 'CFD仿真 (ANSYS Fluent)', level: 5 },
        { id: 'cad', label: '三维设计 (AutoCAD/SolidWorks/UG)', level: 5 },
        { id: 'proteus', label: 'Proteus仿真', level: 4 },
        { id: 'thermal', label: '热工测试与实验操作', level: 4 }
      ],
      caseStudy: {
        title: '卧式壳管式换热器建模与仿真',
        description: '完成对卧式壳管式换热器零部件三维建模与装配设计，并进行流动、传热等多物理场耦合仿真分析',
        metrics: { '建模精度': '0.1mm', '仿真周期': '48h', '验证误差': '<5%' }
      }
    },
    {
      id: 'ai',
      label: 'AI特种技术',
      icon: '🤖',
      color: '#06B6D4',
      glowColor: 'rgba(6, 182, 212, 0.3)',
      subNodes: [
        { id: 'agent', label: 'Agent开发 (LangChain/OpenClaw)', level: 5 },
        { id: 'springai', label: '大模型应用 (Spring AI/RAG/MCP)', level: 5 },
        { id: 'aigc', label: 'AIGC (数字人/语音克隆/SD)', level: 4 },
        { id: 'prompt', label: 'Prompt/Harness Engineering', level: 5 },
        { id: 'glasses', label: '智能眼镜系统 (ESP32)', level: 4 }
      ],
      caseStudy: {
        title: 'Altezhong-yanjing 智能眼镜系统',
        description: '基于「轻眼镜+重后端」架构的智能眼镜系统，实现眼镜-手机-PC-云的多条链路，支持BLE音频、视觉特征提取与OTA升级',
        metrics: { '音频延迟': '<100ms', 'OTA成功率': '>95%', '连接成功率': '>98%' }
      }
    },
    {
      id: 'dev',
      label: '编程开发',
      icon: '💻',
      color: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.3)',
      subNodes: [
        { id: 'python', label: 'Python', level: 5 },
        { id: 'java', label: 'Java', level: 5 },
        { id: 'cpp', label: 'C/C++', level: 4 },
        { id: 'js', label: 'JS/TS', level: 4 },
        { id: 'sql', label: 'SQL', level: 4 },
        { id: 'devops', label: 'Git / Docker / Linux', level: 4 }
      ]
    },
    {
      id: 'media',
      label: '自媒体特种技术',
      icon: '🎬',
      color: '#EC4899',
      glowColor: 'rgba(236, 72, 153, 0.3)',
      subNodes: [
        { id: 'scraper', label: 'OmniScraper Pro (视频抓取分析)', level: 5 },
        { id: 'video', label: 'AI视频/4K修复', level: 5 },
        { id: 'social', label: '新媒体运营 (B站12k+/抖音4.9k+/小红书4.6k+)', level: 4 },
        { id: 'editing', label: 'PR/AE/PS/Au', level: 4 }
      ],
      caseStudy: {
        title: '《钢铁是怎样炼成的》4K修复',
        description: '独立完成经典影片4K修复与发布，使用AI技术进行画质增强、分辨率提升、色彩校正',
        metrics: { 'B站播放': '200万+', '抖音切片': '1500万+', '话题量': '10亿+' }
      }
    },
    {
      id: 'thinking',
      label: '思想领域高度',
      icon: '🧠',
      color: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      subNodes: [
        { id: 'dialectics', label: '辩证唯物主义', level: 5 },
        { id: 'pm', label: '项目管理 (PERT/甘特图)', level: 4 },
        { id: 'economics', label: '工程经济学 (ROI/NPV)', level: 4 },
        { id: 'vibe', label: 'Vibe Coding 技术方法论', level: 5 }
      ]
    }
  ]
}

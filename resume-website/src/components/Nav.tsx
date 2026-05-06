import { useState, useEffect } from 'react'
import { Home, Zap, Brain, Image, Lightbulb, MoreHorizontal } from 'lucide-react'

interface NavItem {
  id: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { id: 'home', label: '首页', icon: <Home size={18} /> },
  { id: 'energy', label: '能源', icon: <Zap size={18} /> },
  { id: 'ai', label: 'AI', icon: <Brain size={18} /> },
  { id: 'media', label: '媒体', icon: <Image size={18} /> },
  { id: 'thought', label: '思考', icon: <Lightbulb size={18} /> },
  { id: 'other', label: '其他', icon: <MoreHorizontal size={18} /> },
]

interface NavProps {
  activeId?: string
  onNavigate?: (id: string) => void
}

export default function Nav({ activeId = 'home', onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-base/80 backdrop-blur-xl border-b border-surface-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <ul className="flex items-center justify-center gap-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavigate?.(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeId === item.id
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

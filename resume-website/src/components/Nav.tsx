import { useState, useEffect } from 'react'
import { useNavState } from '@store/navActive'
import navData from '@data/nav.json'

interface NavItem {
  id: string
  label: string
  shortLabel: string
}

const navItems: NavItem[] = [
  { id: 'home', label: '首页', shortLabel: '首页' },
  { id: 'energy', label: '能动技术', shortLabel: '能源' },
  { id: 'ai', label: 'AI特种技术', shortLabel: 'AI' },
  { id: 'media', label: '自媒体特种技术', shortLabel: '媒体' },
  { id: 'thought', label: '思想领域高度技术', shortLabel: '思想' },
  { id: 'other', label: '其他', shortLabel: '其他' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const { activeId, setActiveId } = useNavState()

  void navData

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.id))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [setActiveId])

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - 80
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-base/70 backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
      aria-label="主导航"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <ul className="flex items-center justify-center gap-1 md:gap-2" role="menubar">
          {navItems.map((item) => {
            const isActive = activeId === item.id
            return (
              <li key={item.id} role="none">
                <button
                  onClick={() => handleNavigate(item.id)}
                  className="group relative flex items-center gap-1.5 px-2 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300"
                  role="menuitem"
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-primary shadow-[0_0_6px_#38bdf8] scale-100'
                        : 'bg-white/20 scale-75 group-hover:bg-white/40'
                    }`}
                    aria-hidden="true"
                  />

                  <span
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-white/60 group-hover:text-white/90'
                    }`}
                  >
                    <span className="hidden md:inline">{item.label}</span>
                    <span className="md:hidden">{item.shortLabel}</span>
                  </span>

                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      isActive
                        ? 'w-full opacity-100'
                        : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'
                    }`}
                    aria-hidden="true"
                  />

                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-primary/5 border border-primary/10" aria-hidden="true" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

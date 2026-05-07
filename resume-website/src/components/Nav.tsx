import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import navData from '@data/nav.json'

interface NavItem {
  id: string
  label: string
  shortLabel: string
  path: string
}

const navItems: NavItem[] = [
  { id: 'home', label: '首页', shortLabel: '首页', path: '/' },
  { id: 'energy', label: '能动技术', shortLabel: '能源', path: '/energy' },
  { id: 'ai', label: 'AI特种技术', shortLabel: 'AI', path: '/ai' },
  { id: 'media', label: '自媒体特种技术', shortLabel: '媒体', path: '/media' },
  { id: 'thought', label: '思想领域高度技术', shortLabel: '思想', path: '/thought' },
  { id: 'other', label: '其他', shortLabel: '其他', path: '/other' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  void navData

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-base/80 backdrop-blur-2xl border-b border-white/8'
          : 'bg-transparent'
      }`}
      aria-label="主导航"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <ul className="flex items-center justify-center gap-1 md:gap-2" role="menubar">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-1.5 px-3 md:px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-350 ${
                    isActive ? 'text-white font-semibold' : 'text-white/60 hover:text-white/90'
                  }`
                }
                role="menuitem"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-350 ${
                        isActive
                          ? 'bg-primary shadow-[0_0_8px_#007aff] scale-100'
                          : 'bg-white/30 scale-75 group-hover:bg-white/50'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">{item.label}</span>
                    <span className="md:hidden">{item.shortLabel}</span>
                    {isActive && (
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20" aria-hidden="true" />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
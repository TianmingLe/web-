import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

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
          ? 'bg-base/90 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      aria-label="主导航"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Brand */}
          <NavLink
            to="/"
            className="font-serif text-lg md:text-xl text-warm tracking-tight hover:text-energy-light transition-colors duration-300"
          >
            胡亚伟
          </NavLink>

          {/* Nav Items */}
          <ul className="flex items-center gap-0.5 md:gap-1" role="menubar">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-1.5 px-2.5 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-warm'
                        : 'text-warm-faint hover:text-warm-muted'
                    }`
                  }
                  role="menuitem"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-1 h-1 rounded-full transition-all duration-300 ${
                          isActive
                            ? 'bg-energy shadow-[0_0_6px_rgba(192,74,26,0.5)]'
                            : 'bg-warm-ghost group-hover:bg-warm-faint'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="hidden md:inline font-sans">{item.label}</span>
                      <span className="md:hidden font-sans">{item.shortLabel}</span>
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-md bg-energy-dim border border-energy/20"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

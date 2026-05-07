import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useVersionState } from '@store/version'
import { ArrowLeftRight } from 'lucide-react'

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
  const { version, toggleVersion } = useVersionState()

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

  const isVersionB = version === 'B'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? isVersionB
            ? 'bg-b-cream/90 backdrop-blur-2xl border-b border-b-sand'
            : 'bg-base/90 backdrop-blur-2xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
      aria-label="主导航"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14 md:h-16">
          <NavLink
            to="/"
            className={`font-serif text-lg md:text-xl tracking-tight transition-colors duration-300 ${
              isVersionB
                ? 'text-b-ink hover:text-b-terracotta'
                : 'text-warm hover:text-energy-light'
            }`}
          >
            胡亚伟
          </NavLink>

          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-0.5 md:gap-1" role="menubar">
              {navItems.map((item) => (
                <li key={item.id} role="none">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-1.5 px-2.5 md:px-4 py-2 rounded-md text-xs md:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? isVersionB ? 'text-b-ink' : 'text-warm'
                          : isVersionB
                            ? 'text-b-muted hover:text-b-ink'
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
                              ? isVersionB
                                ? 'bg-b-terracotta shadow-[0_0_6px_rgba(181,101,78,0.4)]'
                                : 'bg-energy shadow-[0_0_6px_rgba(192,74,26,0.5)]'
                              : isVersionB
                                ? 'bg-b-sand group-hover:bg-b-muted'
                                : 'bg-warm-ghost group-hover:bg-warm-faint'
                          }`}
                          aria-hidden="true"
                        />
                        <span className={`hidden md:inline ${isVersionB ? 'font-b-serif' : 'font-sans'}`}>{item.label}</span>
                        <span className={`md:hidden ${isVersionB ? 'font-b-serif' : 'font-sans'}`}>{item.shortLabel}</span>
                        {isActive && (
                          <span
                            className={`absolute inset-0 rounded-md ${
                              isVersionB
                                ? 'bg-b-cream-dark border border-b-sand'
                                : 'bg-energy-dim border border-energy/20'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={toggleVersion}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                isVersionB
                  ? 'bg-b-ink text-b-cream hover:bg-b-ink/85'
                  : 'bg-warm/10 text-warm border border-white/[0.08] hover:bg-warm/15'
              }`}
              aria-label={`切换到版本${isVersionB ? 'A' : 'B'}`}
              title={`切换到版本${isVersionB ? 'A' : 'B'}`}
            >
              <ArrowLeftRight size={12} />
              <span>{isVersionB ? '暗黑版' : '杂志版'}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

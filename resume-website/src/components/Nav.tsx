import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useVersionState } from '@store/version'
import { ArrowLeftRight, Menu, X } from 'lucide-react'

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
  const [menuOpen, setMenuOpen] = useState(false)
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

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isVersionB = version === 'B'

  return (
    <>
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
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-[72px]">
            <div className="w-20 md:w-auto" />

            <div className="hidden md:flex items-center gap-4">
              <ul className="flex items-center gap-2" role="menubar">
                {navItems.map((item) => (
                  <li key={item.id} role="none">
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-all duration-300 ${
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
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? isVersionB
                                  ? 'bg-b-terracotta shadow-[0_0_8px_rgba(181,101,78,0.5)]'
                                  : 'bg-energy shadow-[0_0_8px_rgba(192,74,26,0.6)]'
                                : isVersionB
                                  ? 'bg-b-sand group-hover:bg-b-muted'
                                  : 'bg-warm-ghost group-hover:bg-warm-faint'
                            }`}
                            aria-hidden="true"
                          />
                          <span className={isVersionB ? 'font-b-serif' : 'font-sans'}>{item.label}</span>
                          {isActive && (
                            <span
                              className={`absolute inset-0 rounded-lg ${
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

              <div className="w-px h-5 bg-current opacity-10" aria-hidden="true" />

              <button
                onClick={toggleVersion}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer ${
                  isVersionB
                    ? 'bg-b-ink text-b-cream hover:bg-b-ink/85'
                    : 'bg-warm/10 text-warm border border-white/[0.08] hover:bg-warm/15'
                }`}
                aria-label={`切换到版本${isVersionB ? 'A' : 'B'}`}
                title={`切换到版本${isVersionB ? 'A' : 'B'}`}
              >
                <ArrowLeftRight size={13} />
                <span>{isVersionB ? '暗黑版' : '杂志版'}</span>
              </button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleVersion}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-300 cursor-pointer ${
                  isVersionB
                    ? 'bg-b-ink text-b-cream hover:bg-b-ink/85'
                    : 'bg-warm/10 text-warm border border-white/[0.08] hover:bg-warm/15'
                }`}
                aria-label={`切换到版本${isVersionB ? 'A' : 'B'}`}
              >
                <ArrowLeftRight size={11} />
                <span>{isVersionB ? '暗黑版' : '杂志版'}</span>
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isVersionB
                    ? 'text-b-ink hover:bg-b-sand/50'
                    : 'text-warm hover:bg-white/5'
                }`}
                aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-14 right-0 bottom-0 z-30 md:hidden w-64 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: isVersionB ? 'var(--color-b-cream)' : 'var(--color-base)',
          borderLeft: isVersionB ? '1px solid var(--color-b-sand)' : '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="flex flex-col py-6 px-4">
          <ul className="flex flex-col gap-1" role="menu">
            {navItems.map((item) => (
              <li key={item.id} role="none">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? isVersionB ? 'text-b-ink bg-b-cream-dark' : 'text-warm bg-energy-dim'
                        : isVersionB
                          ? 'text-b-muted hover:text-b-ink hover:bg-b-sand/30'
                          : 'text-warm-faint hover:text-warm hover:bg-white/5'
                    }`
                  }
                  role="menuitem"
                  onClick={() => setMenuOpen(false)}
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`w-2 h-2 rounded-full transition-all ${
                          isActive
                            ? isVersionB
                              ? 'bg-b-terracotta'
                              : 'bg-energy'
                            : isVersionB
                              ? 'bg-b-sand'
                              : 'bg-warm-ghost'
                        }`}
                        aria-hidden="true"
                      />
                      <span className={isVersionB ? 'font-b-serif' : 'font-sans'}>{item.label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

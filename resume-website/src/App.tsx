import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from '@components/Nav'
import ParticleCanvas from '@components/ParticleCanvas'
import MusicDock from '@components/MusicDock'
import { useVersionState } from '@store/version'

// Lazy load pages to reduce initial bundle size
const HomePage = lazy(() => import('@pages/HomePage'))
const EnergyPage = lazy(() => import('@pages/EnergyPage'))
const AIPage = lazy(() => import('@pages/AIPage'))
const MediaPage = lazy(() => import('@pages/MediaPage'))
const ThoughtPage = lazy(() => import('@pages/ThoughtPage'))
const DevPage = lazy(() => import('@pages/DevPage'))

const HomeBPage = lazy(() => import('@pages-b/HomeBPage'))
const EnergyBPage = lazy(() => import('@pages-b/EnergyBPage'))
const AIBPage = lazy(() => import('@pages-b/AIBPage'))
const MediaBPage = lazy(() => import('@pages-b/MediaBPage'))
const ThoughtBPage = lazy(() => import('@pages-b/ThoughtBPage'))
const OtherBPage = lazy(() => import('@pages-b/OtherBPage'))

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-energy/30 border-t-energy rounded-full animate-spin" />
    </div>
  )
}

function AppContent() {
  const location = useLocation()
  const { version } = useVersionState()
  const isVersionB = version === 'B'

  useEffect(() => {
    if (isVersionB) {
      document.body.classList.add('version-b')
    } else {
      document.body.classList.remove('version-b')
    }
    return () => {
      document.body.classList.remove('version-b')
    }
  }, [isVersionB])

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${isVersionB ? 'bg-b-cream' : location.pathname === '/' ? 'bg-base' : 'bg-base dark-atmosphere'}`}>
      {!isVersionB && location.pathname === '/' && <ParticleCanvas />}
      <Nav />
      <main className="relative z-10" key={`${isVersionB ? 'b' : 'a'}-${location.pathname}`}>
        <Suspense fallback={<PageLoader />}>
          {isVersionB ? (
            <Routes>
              <Route path="/" element={<HomeBPage />} />
              <Route path="/energy" element={<EnergyBPage />} />
              <Route path="/ai" element={<AIBPage />} />
              <Route path="/media" element={<MediaBPage />} />
              <Route path="/thought" element={<ThoughtBPage />} />
              <Route path="/other" element={<OtherBPage />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/energy" element={<EnergyPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="/media" element={<MediaPage />} />
              <Route path="/thought" element={<ThoughtPage />} />
              <Route path="/other" element={<DevPage />} />
            </Routes>
          )}
        </Suspense>
      </main>
      <MusicDock />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App

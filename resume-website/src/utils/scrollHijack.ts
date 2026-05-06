export function scrollToSection(sectionId: string, offset = 80) {
  const element = document.getElementById(sectionId)
  if (!element) return

  const top = element.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({
    top,
    behavior: 'smooth',
  })
}

export function lockScroll() {
  const body = document.body
  const html = document.documentElement
  body.style.overflow = 'hidden'
  body.style.touchAction = 'none'
  html.style.overflow = 'hidden'
}

export function unlockScroll() {
  const body = document.body
  const html = document.documentElement
  body.style.overflow = ''
  body.style.touchAction = ''
  html.style.overflow = ''
}

export interface ScrollHijackOptions {
  onProgress: (progress: number) => void
  onComplete: () => void
  threshold?: number
}

export function createScrollHijack(options: ScrollHijackOptions) {
  const { onProgress, onComplete, threshold = 1200 } = options

  let accumulated = 0
  let isActive = true
  let lastTouchY = 0

  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

  function handleWheel(e: WheelEvent) {
    if (!isActive) return
    e.preventDefault()

    const delta = Math.abs(e.deltaY) + Math.abs(e.deltaX)
    accumulated += delta

    const rawProgress = Math.min(accumulated / threshold, 1)
    const easedProgress = easeOutCubic(rawProgress)

    onProgress(easedProgress)

    if (rawProgress >= 1) {
      isActive = false
      onComplete()
    }
  }

  function handleTouchStart(e: TouchEvent) {
    if (!isActive) return
    lastTouchY = e.touches[0].clientY
  }

  function handleTouchMove(e: TouchEvent) {
    if (!isActive) return
    e.preventDefault()

    const currentY = e.touches[0].clientY
    const delta = Math.abs(currentY - lastTouchY)
    lastTouchY = currentY

    accumulated += delta

    const rawProgress = Math.min(accumulated / threshold, 1)
    const easedProgress = easeOutCubic(rawProgress)

    onProgress(easedProgress)

    if (rawProgress >= 1) {
      isActive = false
      onComplete()
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (!isActive) return
    const scrollKeys = [
      'ArrowDown',
      'ArrowUp',
      'PageDown',
      'PageUp',
      'Home',
      'End',
      ' ',
    ]
    if (scrollKeys.includes(e.key)) {
      e.preventDefault()
      accumulated += threshold * 0.08
      const rawProgress = Math.min(accumulated / threshold, 1)
      const easedProgress = easeOutCubic(rawProgress)
      onProgress(easedProgress)
      if (rawProgress >= 1) {
        isActive = false
        onComplete()
      }
    }
  }

  function attach() {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    lockScroll()
  }

  function detach() {
    isActive = false
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchmove', handleTouchMove)
    window.removeEventListener('keydown', handleKeyDown)
    unlockScroll()
  }

  function reset() {
    accumulated = 0
    isActive = true
  }

  return {
    attach,
    detach,
    reset,
    get isActive() {
      return isActive
    },
  }
}

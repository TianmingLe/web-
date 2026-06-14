import { useState, useEffect } from 'react'

export type DeviceTier = 'high' | 'medium' | 'low'

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>('medium')

  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4

    if (cores <= 4 || memory <= 4) {
      setTier('low')
    } else if (cores >= 8 && memory >= 8) {
      setTier('high')
    } else {
      setTier('medium')
    }
  }, [])

  return tier
}

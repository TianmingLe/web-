import { useState, useCallback, type ImgHTMLAttributes } from 'react'

interface LazyImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill'
}

/**
 * LazyImage - Optimized image component with lazy loading,
 * skeleton placeholder, and error fallback
 */
export default function LazyImage({
  src,
  alt,
  aspectRatio = '16/9',
  objectFit = 'cover',
  className = '',
  style,
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true)
      onLoad?.(e)
    },
    [onLoad]
  )

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setError(true)
      onError?.(e)
    },
    [onError]
  )

  return (
    <div
      className={`relative overflow-hidden bg-b-cream-dark ${className}`}
      style={{
        aspectRatio,
        ...style,
      }}
    >
      {/* Skeleton placeholder */}
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-b-cream-dark via-b-sand/30 to-b-cream-dark bg-[length:200%_100%]" 
          style={{
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-b-cream-dark">
          <div className="text-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="mx-auto mb-2 text-b-muted"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="text-xs text-b-muted font-b-sans">图片加载失败</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!error && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            objectFit,
            willChange: 'opacity',
          }}
          {...props}
        />
      )}
    </div>
  )
}

import { useState } from 'react'

export default function Photo({ src, alt, className = '', priority = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-graphite ${className}`}>
      {failed ? (
        // If the image can't load, show a striped panel instead of a broken-image icon
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0"
          style={{ background: 'repeating-linear-gradient(-45deg, #222 0 14px, #161616 14px 28px)' }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover grayscale contrast-[1.08]"
        />
      )}
    </div>
  )
}
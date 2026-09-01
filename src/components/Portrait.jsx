export function Portrait({ photo, className = '', eager = false, enabled = true, sizes = '(max-width: 767px) 92vw, 44vw' }) {
  if (!enabled) {
    return (
      <div className={`portrait portrait--placeholder ${className}`} role="img" aria-label={`${photo.alt}; portrait unavailable`}>
        <span>S</span>
      </div>
    )
  }

  const base = `/images/sonu/${photo.id}`

  return (
    <picture className={`portrait ${className}`} data-photo-id={photo.id}>
      <img
        src={`${base}.webp`}
        srcSet={`${base}-480.webp 480w, ${base}-768.webp 768w, ${base}-1200.webp 1200w, ${base}.webp 1440w`}
        sizes={sizes}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        style={{ objectPosition: photo.position }}
      />
    </picture>
  )
}


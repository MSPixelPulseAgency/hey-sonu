export function BotanicalDivider({ light = false }) {
  return (
    <div className={`botanical-divider${light ? ' botanical-divider--light' : ''}`} aria-hidden="true">
      <span />
      <svg viewBox="0 0 88 34" fill="none">
        <path d="M4 26c21 0 27-18 40-18s19 18 40 18M23 20c-1-8 3-13 10-15M65 20c1-8-3-13-10-15" />
        <path d="M29 8c-6-1-9 2-9 8 6 1 10-2 9-8ZM59 8c6-1 9 2 9 8-6 1-10-2-9-8Z" />
      </svg>
      <span />
    </div>
  )
}


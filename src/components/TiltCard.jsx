import { useRef } from 'react'

export function TiltCard({ children, className = '', as: Tag = 'article' }) {
  const ref = useRef(null)

  const onPointerMove = (event) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    ref.current?.style.setProperty('--tilt-x', `${(-y * 3.5).toFixed(2)}deg`)
    ref.current?.style.setProperty('--tilt-y', `${(x * 3.5).toFixed(2)}deg`)
  }

  const reset = () => {
    ref.current?.style.setProperty('--tilt-x', '0deg')
    ref.current?.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} onPointerMove={onPointerMove} onPointerLeave={reset}>
      {children}
    </Tag>
  )
}


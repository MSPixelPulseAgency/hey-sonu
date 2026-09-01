import { Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'

export function SectionHeading({ eyebrow, title, copy, align = 'left' }) {
  return (
    <Reveal className={`section-heading section-heading--${align}`}>
      <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-heading__copy">{copy}</p>}
    </Reveal>
  )
}


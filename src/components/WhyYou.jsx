import { ArrowUpRight } from 'lucide-react'
import { photos, whyCards } from '../data/sonuData'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TiltCard } from './TiltCard'

export function WhyYou({ photosEnabled }) {
  return (
    <section className="section section--why">
      <div className="wrap why-layout">
        <div>
          <SectionHeading eyebrow="the part that actually mattered" title="Why you?" />
          <div className="why-list">
            {whyCards.map(([title, copy], index) => (
              <Reveal key={title} delay={Math.min(index * 0.045, 0.18)}>
                <TiltCard className="why-card">
                  <span>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="why-portrait-panel">
          <Portrait photo={photos[2]} enabled={photosEnabled} className="portrait--supporting" sizes="(max-width: 899px) 90vw, 38vw" />
          <p>So yes, the pictures helped.</p>
          <strong>But this is why I stayed curious.</strong>
        </Reveal>
      </div>
    </section>
  )
}


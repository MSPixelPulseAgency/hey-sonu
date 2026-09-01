import { Check, FlaskConical } from 'lucide-react'
import { compatibility } from '../data/sonuData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

export function CompatibilityReport() {
  return (
    <section className="section section--compatibility">
      <div className="wrap compatibility-layout">
        <SectionHeading eyebrow="no fake soulmate percentages" title="Compatibility report" copy="A highly serious technical review of the available evidence." />
        <Reveal className="report-card">
          <div className="report-card__topline"><FlaskConical size={20} aria-hidden="true" /><span>Field notes · v1.0</span></div>
          <dl>
            {compatibility.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd><Check size={15} aria-hidden="true" />{description}</dd>
              </div>
            ))}
          </dl>
          <div className="report-card__conclusion">
            <span>Technical conclusion</span>
            <p>We have enough data for one real-world experiment.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


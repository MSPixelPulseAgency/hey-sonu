import { useState } from 'react'
import { Check, Gift } from 'lucide-react'
import { sonuFile } from '../data/sonuData'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'
import { TeaSteam } from './TeaSteam'
import { TiltCard } from './TiltCard'

export function SonuFile() {
  const [birthdayNoted, setBirthdayNoted] = useState(false)

  return (
    <section className="section section--file" id="sonu-file">
      <div className="wrap">
        <SectionHeading eyebrow="observations, carefully collected" title="The Sonu file" copy="A few little things I was, in fact, listening to." />
        <div className="file-grid">
          {sonuFile.map(({ label, copy, Icon, easterEgg, steam }, index) => (
            <Reveal key={label} delay={Math.min(index * 0.035, 0.18)}>
              <TiltCard className="file-card">
                <div className="file-card__icon">
                  <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
                  {steam && <TeaSteam />}
                </div>
                <p className="file-card__label">{label}</p>
                <p>{copy}</p>
                {easterEgg && (
                  <button
                    className="date-note"
                    type="button"
                    aria-pressed={birthdayNoted}
                    onClick={() => setBirthdayNoted((value) => !value)}
                  >
                    {birthdayNoted ? <Check size={15} aria-hidden="true" /> : <Gift size={15} aria-hidden="true" />}
                    {birthdayNoted ? 'Noted. Quietly.' : '14 · 10'}
                  </button>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal className="spa-note">
          <span aria-hidden="true">S</span>
          <p>Apparently making people feel good is becoming your profession too.</p>
        </Reveal>
      </div>
    </section>
  )
}


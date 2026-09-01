import { useState } from 'react'
import { Check, Gift, Heart } from 'lucide-react'
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
        <SectionHeading eyebrow="the details were not wasted on me" title="A few things I noticed" copy="Not a profile. Just proof that I was actually listening." />
        <div className="file-grid">
          {sonuFile.map(({ label, copy, Icon, easterEgg, steam }, index) => (
            <Reveal key={label} delay={Math.min(index * 0.03, 0.15)}>
              <TiltCard className="file-card">
                <div className="file-card__icon">
                  <Icon size={20} strokeWidth={1.7} aria-hidden="true" />
                  {steam && <TeaSteam />}
                </div>
                <p className="file-card__label">{label}</p>
                <p>{copy}</p>
                {easterEgg && (
                  <button className="date-note" type="button" aria-pressed={birthdayNoted} onClick={() => setBirthdayNoted((value) => !value)}>
                    {birthdayNoted ? <Check size={15} aria-hidden="true" /> : <Gift size={15} aria-hidden="true" />}
                    {birthdayNoted ? 'Noted. Quietly.' : '14 · 10'}
                  </button>
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="hand-note file-love-note"><Heart size={18} aria-hidden="true" />I’m collecting reasons to like you faster than I expected 😌</p>
      </div>
    </section>
  )
}

import { Flower2, HeartHandshake, Sparkles } from 'lucide-react'
import { BotanicalDivider } from './BotanicalDivider'
import { Reveal } from './Reveal'
import { TeaSteam } from './TeaSteam'

export function SpaMoment() {
  return (
    <section className="section section--spa">
      <div className="wrap spa-layout">
        <Reveal className="spa-copy">
          <p className="eyebrow"><Sparkles size={14} aria-hidden="true" />a very fitting new chapter</p>
          <h2>Future Spa Manager Energy</h2>
          <BotanicalDivider />
          <p>You choosing Esthetician / Spa Management actually makes sense. You already have that calm, caring way of making people comfortable.</p>
          <p className="hand-note">So one day making people relax will literally be your job… meanwhile you’ve been distracting me for free 😂</p>
        </Reveal>
        <Reveal className="spa-still-life">
          <div className="spa-still-life__halo" aria-hidden="true" />
          <div className="spa-icon spa-icon--flower"><Flower2 size={34} strokeWidth={1.25} aria-hidden="true" /></div>
          <div className="spa-icon spa-icon--heart"><HeartHandshake size={31} strokeWidth={1.25} aria-hidden="true" /></div>
          <div className="spa-cup" aria-hidden="true"><TeaSteam /><span /></div>
          <svg className="spa-botanical" viewBox="0 0 180 220" fill="none" aria-hidden="true">
            <path d="M88 216C82 152 92 88 138 18M91 170c-29-9-43-30-42-61 29 8 44 28 42 61ZM104 121c31-3 50-20 57-51-31 2-51 19-57 51ZM120 75c-18-14-23-32-15-54 19 13 24 31 15 54Z" />
          </svg>
        </Reveal>
      </div>
    </section>
  )
}

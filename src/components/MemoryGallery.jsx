import { Camera, Heart } from 'lucide-react'
import { photos } from '../data/sonuData'
import { BotanicalDivider } from './BotanicalDivider'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'

export function MemoryGallery({ photosEnabled }) {
  return (
    <section className="section section--memory">
      <div className="wrap memory-layout">
        <Reveal className="memory-copy">
          <p className="eyebrow"><Camera size={14} aria-hidden="true" />less proof, more living</p>
          <h2>The pictures were nice.<br />This is what I liked more.</h2>
          <BotanicalDivider light />
          <p>You told me you do not care much about showing off. Honestly, same.</p>
          <p>I would rather collect a few moments worth remembering than a gallery full of proof.</p>
          <blockquote>
            “So no, this page is not about how photogenic you are. Although… you really did not help my case there.”
          </blockquote>
        </Reveal>
        <Reveal className="memory-photo-card">
          <Portrait photo={photos[1]} enabled={photosEnabled} className="portrait--memory" sizes="(max-width: 799px) 90vw, 46vw" />
          <div className="memory-photo-card__caption">
            <Heart size={16} aria-hidden="true" />
            <p>You said you do not take many pictures. Maybe that is why the ones you do have feel more real.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}


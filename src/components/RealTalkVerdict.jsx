import { Heart } from 'lucide-react'
import { verdictNotes } from '../data/sonuData'
import { Portrait } from './Portrait'
import { Reveal } from './Reveal'

export function RealTalkVerdict({ photo, photosEnabled }) {
  return (
    <section className="section section--verdict">
      <div className="wrap verdict-layout">
        <Reveal className="verdict-photo-wrap">
          <span className="tape tape--verdict" aria-hidden="true" />
          <Portrait photo={photo} enabled={photosEnabled} className="portrait--verdict" sizes="(max-width: 899px) 82vw, 34vw" />
          <span className="hand-note verdict-photo-note">respectfully distracted</span>
        </Reveal>
        <div className="verdict-copy">
          <Reveal>
            <p className="eyebrow"><Heart size={14} aria-hidden="true" />real talk, one minute</p>
            <h2>Why I stayed curious</h2>
          </Reveal>
          <div className="verdict-list">
            {verdictNotes.map(([title, copy], index) => (
              <Reveal key={title} delay={index * 0.035} className={`verdict-card${index === verdictNotes.length - 1 ? ' verdict-card--final' : ''}`}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


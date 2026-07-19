// A comic-style story panel with subtle motion (zoom / parallax / fade / rise /
// flicker), an accent-tinted illustrated backdrop, and an optional speaker.
// Reused by onboarding and by mystery intros to make learning feel immersive.

import { useState } from 'react'
import Speak from './Speak.jsx'
import { GameIcon } from './icons.jsx'
import { photoUrl, photoAlt } from '../data/photos.js'

export default function ComicPanel({ scene, children }) {
  const { art, accent, anim = 'fade', kicker, title, text, speaker, photo } = scene
  const [photoFailed, setPhotoFailed] = useState(false)
  const src = photo && photoUrl(photo)
  const showPhoto = src && !photoFailed
  return (
    <div className={`comic-panel anim-${anim}`} style={{ '--accent': accent }} key={scene.id}>
      <div className="comic-art" aria-hidden>
        {showPhoto ? (
          <img
            className="comic-photo"
            src={src}
            alt={photoAlt(photo)}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
          />
        ) : (
          <span className="comic-emoji comic-glyph">
            <GameIcon glyph={art} size={84} />
          </span>
        )}
        <span className="comic-parallax comic-parallax-1" />
        <span className="comic-parallax comic-parallax-2" />
      </div>
      <div className="comic-body">
        {kicker && <span className="comic-kicker">{kicker}</span>}
        {speaker && <span className="comic-speaker">{speaker}</span>}
        {title && <h2 className="comic-title">{title}</h2>}
        {text && (
          <p className="comic-text">
            {text}
            <Speak text={`${title}. ${text}`} />
          </p>
        )}
        {children}
      </div>
    </div>
  )
}

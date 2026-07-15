// A comic-style story panel with subtle motion (zoom / parallax / fade / rise /
// flicker), an accent-tinted illustrated backdrop, and an optional speaker.
// Reused by onboarding and by mystery intros to make learning feel immersive.

import Speak from './Speak.jsx'

export default function ComicPanel({ scene, children }) {
  const { art, accent, anim = 'fade', kicker, title, text, speaker } = scene
  return (
    <div className={`comic-panel anim-${anim}`} style={{ '--accent': accent }} key={scene.id}>
      <div className="comic-art" aria-hidden>
        <span className="comic-emoji">{art}</span>
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

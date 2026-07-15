import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill, Reward } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { activeEvents, hiddenArtifactOfWeek } from '../data/events.js'
import { allCollectibles } from '../content/store.js'

export default function Events() {
  const { state, dispatch } = useGame()
  const events = activeEvents()
  const hiddenId = hiddenArtifactOfWeek()
  const hidden = allCollectibles()[hiddenId]
  const alreadyFound = state.foundHidden.includes(hiddenId)

  // Deterministic hiding spot for the week (stable across reloads).
  const weekSeed = Math.floor(Date.now() / (86_400_000 * 7))
  const correctSpot = weekSeed % 6
  const [revealed, setRevealed] = useState(alreadyFound ? correctSpot : null)

  function search(i) {
    if (alreadyFound || revealed !== null) return
    if (i === correctSpot) {
      setRevealed(i)
      audio.play('unlock')
      dispatch({ type: 'FIND_HIDDEN', id: hiddenId })
    } else {
      setRevealed(i)
      audio.play('wrong')
      setTimeout(() => setRevealed(null), 700)
    }
  }

  const found = alreadyFound || revealed === correctSpot

  return (
    <div className="view">
      <PageHeader
        icon="🎁"
        title="Events"
        subtitle="Weekend double-XP, holiday celebrations, and a weekly hidden-artifact hunt. Something new is always happening."
      />

      <h3 className="section-label">Happening now</h3>
      {events.length === 0 ? (
        <p className="empty-note">
          No special event is active this moment. Double-XP runs every weekend, and holiday events
          arrive on Juneteenth, MLK Day, Black History Month, and Kwanzaa.
        </p>
      ) : (
        <div className="grid grid-two">
          {events.map((e) => (
            <article key={e.id} className="event-card">
              <div className="event-icon">{e.icon}</div>
              <div>
                <div className="event-head">
                  <h3>{e.name}</h3>
                  <Pill tone="accent">{e.xp}× XP</Pill>
                </div>
                <p className="muted">{e.blurb}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      <h3 className="section-label">Hidden Artifact Hunt · new every week</h3>
      <div className="card hunt-card">
        {found ? (
          <div className="hunt-found">
            <span className="hunt-found-icon">{hidden.icon}</span>
            <div>
              <h3>You found the {hidden.name}!</h3>
              <p className="muted">{hidden.blurb}</p>
              {revealed === correctSpot && !alreadyFound && (
                <Reward points={15}>Hidden artifact recovered! +30 XP</Reward>
              )}
              {alreadyFound && (
                <p className="muted small">Come back next week for a new hidden artifact.</p>
              )}
            </div>
          </div>
        ) : (
          <>
            <p className="muted">
              A hidden artifact is tucked away somewhere. Search the spots below to find it.
            </p>
            <div className="hunt-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <button
                  key={i}
                  className={`hunt-spot ${revealed === i ? 'miss' : ''}`}
                  onClick={() => search(i)}
                >
                  {revealed === i ? '∅' : '🔍'}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

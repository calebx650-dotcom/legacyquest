import { useState } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { audio } from '../audio/engine.js'
import { allEras } from '../content/store.js'
import { Icon } from '../components/icons.jsx'
import { photoUrl, photoAlt, photoCredit } from '../data/photos.js'

// Real period photograph banner for an era card. Hides itself entirely if the
// image cannot load (offline or blocked), leaving the standard card design.
function EraArt({ eraId }) {
  const [failed, setFailed] = useState(false)
  const src = photoUrl(`era-${eraId}`)
  if (!src || failed) return null
  return (
    <div className="era-art">
      <img
        src={src}
        alt={photoAlt(`era-${eraId}`)}
        title={photoCredit(`era-${eraId}`)}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  )
}

export default function Eras() {
  const { state, dispatch } = useGame()
  const ERAS = allEras()

  function restore(era) {
    audio.setEraMood(era.id)
    audio.play('unlock')
    dispatch({ type: 'UNLOCK_ERA', id: era.id })
  }

  return (
    <div className="view">
      <PageHeader
        icon="🧭"
        title="Eras"
        subtitle="Travel the timeline. Restore an era with Legacy Points to open its mysteries, figures, and stories."
      />

      <div className="era-rail">
        {ERAS.map((era) => {
          const unlocked = state.unlockedEras.includes(era.id)
          const affordable = state.legacyPoints >= era.unlockCost
          return (
            <article
              key={era.id}
              className={`era-card ${unlocked ? 'era-unlocked' : 'era-locked'}`}
              style={{ '--accent': era.accent }}
            >
              <EraArt eraId={era.id} />
              <div className="era-top">
                <div>
                  <h3>{era.name}</h3>
                  <span className="era-years">{era.years}</span>
                </div>
                {unlocked ? (
                  <Pill tone="good">Restored</Pill>
                ) : (
                  <Pill tone="lock"><Icon name="lock" size={12} /> {era.unlockCost} pts</Pill>
                )}
              </div>
              <p className="era-tagline">{era.tagline}</p>
              <p className="era-summary">{era.summary}</p>

              {!unlocked && (
                <button
                  className="btn btn-primary"
                  disabled={!affordable}
                  onClick={() => restore(era)}
                >
                  {affordable
                    ? `Restore this era (−${era.unlockCost} pts)`
                    : `Need ${era.unlockCost - state.legacyPoints} more pts`}
                </button>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

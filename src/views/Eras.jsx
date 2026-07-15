import { useGame } from '../state/GameContext.jsx'
import { PageHeader, Pill } from '../components/ui.jsx'
import { ERAS } from '../data/eras.js'

export default function Eras() {
  const { state, dispatch } = useGame()

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
              <div className="era-top">
                <div>
                  <h3>{era.name}</h3>
                  <span className="era-years">{era.years}</span>
                </div>
                {unlocked ? (
                  <Pill tone="good">Restored</Pill>
                ) : (
                  <Pill tone="lock">🔒 {era.unlockCost} pts</Pill>
                )}
              </div>
              <p className="era-tagline">{era.tagline}</p>
              <p className="era-summary">{era.summary}</p>

              {!unlocked && (
                <button
                  className="btn btn-primary"
                  disabled={!affordable}
                  onClick={() => dispatch({ type: 'UNLOCK_ERA', id: era.id })}
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

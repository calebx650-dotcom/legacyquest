import { useGame } from '../state/GameContext.jsx'
import { PageHeader, EmptyNote } from '../components/ui.jsx'
import { COLLECTIBLES } from '../data/collectibles.js'

const ALL = Object.values(COLLECTIBLES)

export default function Museum() {
  const { state, dispatch } = useGame()
  const owned = new Set(state.collectibles)

  return (
    <div className="view">
      <PageHeader
        icon="🖼️"
        title="Legacy Museum"
        subtitle="Everything you recover is preserved here — documents, patents, photographs, recordings, and mentor cards."
      />

      <div className="museum-count">
        <strong>{owned.size}</strong> of {ALL.length} artifacts recovered
      </div>

      <div className="grid grid-museum">
        {ALL.map((c) => {
          const has = owned.has(c.id)
          return (
            <article key={c.id} className={`relic ${has ? 'has' : 'ghost'}`}>
              <div className="relic-icon" aria-hidden>
                {has ? c.icon : '❔'}
              </div>
              {has ? (
                <>
                  <span className="relic-cat">{c.category}</span>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                </>
              ) : (
                <>
                  <span className="relic-cat">Undiscovered</span>
                  <h3>Lost to the Eraser</h3>
                  <p className="muted">
                    Solve mysteries, clear puzzles, and keep your Daily streak to recover this
                    artifact.
                  </p>
                </>
              )}
            </article>
          )
        })}
      </div>

      <div className="danger-zone">
        <button
          className="btn btn-ghost"
          onClick={() => {
            if (window.confirm('Reset all progress? This clears your saved game.')) {
              dispatch({ type: 'RESET' })
            }
          }}
        >
          Reset progress
        </button>
      </div>
    </div>
  )
}

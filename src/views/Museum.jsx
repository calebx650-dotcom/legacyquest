import { useGame } from '../state/GameContext.jsx'
import { PageHeader } from '../components/ui.jsx'
import { COLLECTIBLES, RARITY, RARITY_ORDER } from '../data/collectibles.js'

const ALL = Object.values(COLLECTIBLES).sort(
  (a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity),
)

export default function Museum() {
  const { state, dispatch } = useGame()
  const owned = new Set(state.collectibles)

  const overallPct = Math.round((owned.size / ALL.length) * 100)

  // Completion by rarity, for the "collections" feel.
  const byRarity = RARITY_ORDER.map((r) => {
    const all = ALL.filter((c) => c.rarity === r)
    const have = all.filter((c) => owned.has(c.id)).length
    return { rarity: r, have, total: all.length }
  })

  return (
    <div className="view">
      <PageHeader
        icon="🖼️"
        title="Legacy Museum"
        subtitle="Everything you recover is preserved here — documents, patents, photographs, recordings, speeches, and mentor cards."
      />

      <section className="collection-summary">
        <div className="collection-overall">
          <div className="ring" style={{ '--pct': `${overallPct}%` }}>
            <span>{overallPct}%</span>
          </div>
          <div>
            <strong>
              {owned.size} / {ALL.length}
            </strong>
            <span className="muted"> artifacts recovered</span>
          </div>
        </div>
        <div className="rarity-bars">
          {byRarity.map((b) => (
            <div key={b.rarity} className="rarity-bar-row">
              <span className="rarity-dot" style={{ background: RARITY[b.rarity].color }} />
              <span className="rarity-name">{RARITY[b.rarity].label}</span>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{
                    width: `${(b.have / b.total) * 100}%`,
                    background: RARITY[b.rarity].color,
                  }}
                />
              </div>
              <span className="rarity-count">
                {b.have}/{b.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-museum">
        {ALL.map((c) => {
          const has = owned.has(c.id)
          const rar = RARITY[c.rarity]
          return (
            <article
              key={c.id}
              className={`relic ${has ? 'has' : 'ghost'} rarity-${c.rarity}`}
              style={{ '--rarity': rar.color }}
            >
              <div className="relic-icon" aria-hidden>
                {has ? c.icon : '❔'}
              </div>
              {has ? (
                <>
                  <span className="relic-rarity" style={{ color: rar.color }}>
                    {rar.label}
                  </span>
                  <span className="relic-cat">{c.category}</span>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                </>
              ) : (
                <>
                  <span className="relic-rarity" style={{ color: rar.color }}>
                    {rar.label}
                  </span>
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
            if (window.confirm('Reset all progress? This clears your saved game and onboarding.')) {
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

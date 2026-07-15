import { useState, useRef } from 'react'
import { useGame } from '../state/GameContext.jsx'
import { PageHeader } from '../components/ui.jsx'
import { RARITY, RARITY_ORDER } from '../data/collectibles.js'
import { allCollectibles, allEras } from '../content/store.js'

export default function Museum() {
  const { state } = useGame()
  const owned = new Set(state.collectibles)
  const [openId, setOpenId] = useState(null)

  const ALL = Object.values(allCollectibles()).sort(
    (a, b) => RARITY_ORDER.indexOf(a.rarity) - RARITY_ORDER.indexOf(b.rarity),
  )
  const overallPct = Math.round((owned.size / ALL.length) * 100)

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
        subtitle="Everything you recover is preserved here. Tap an artifact to examine it in 3D, hear its story, and see where it sits in history."
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
                  style={{ width: `${(b.have / b.total) * 100}%`, background: RARITY[b.rarity].color }}
                />
              </div>
              <span className="rarity-count">
                {b.have}/{b.total}
              </span>
            </div>
          ))}
        </div>
      </section>

      {RARITY_ORDER.map((rarity) => {
        const hall = ALL.filter((c) => c.rarity === rarity)
        if (hall.length === 0) return null
        const rar = RARITY[rarity]
        const hallNames = {
          legendary: 'Legendary Hall',
          rare: 'Rare Wing',
          common: 'Main Gallery',
        }
        const have = hall.filter((c) => owned.has(c.id)).length
        return (
          <section key={rarity} className="museum-hall" style={{ '--hall': rar.color }}>
            <div className="hall-label">
              <h3>{hallNames[rarity]}</h3>
              <span className="hall-count">
                {have} of {hall.length} on display
              </span>
            </div>
            <div className="grid grid-museum">
              {hall.map((c) => {
                const has = owned.has(c.id)
                return (
                  <article
                    key={c.id}
                    className={`relic ${has ? 'has' : 'ghost'} rarity-${c.rarity}`}
                    style={{ '--rarity': rar.color }}
                    onClick={() => has && setOpenId(c.id)}
                    role={has ? 'button' : undefined}
                  >
                    <div className="relic-icon" aria-hidden>
                      {has ? c.icon : '❔'}
                    </div>
                    <span className="relic-rarity" style={{ color: rar.color }}>
                      {rar.label}
                    </span>
                    {has ? (
                      <>
                        <span className="relic-cat">{c.category}</span>
                        <h3>{c.name}</h3>
                        <p>{c.blurb}</p>
                        <span className="relic-examine">Tap to examine →</span>
                      </>
                    ) : (
                      <>
                        <span className="relic-cat">Undiscovered</span>
                        <h3>Lost to the Eraser</h3>
                        <p className="muted">
                          Solve mysteries, clear puzzles, and keep your Daily streak to recover
                          this artifact.
                        </p>
                      </>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}

      {openId && (
        <ArtifactModal
          artifact={allCollectibles()[openId]}
          owned={owned}
          onOpen={setOpenId}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  )
}

function ArtifactModal({ artifact, owned, onOpen, onClose }) {
  const eras = allEras()
  const rar = RARITY[artifact.rarity] || RARITY.common
  const [rot, setRot] = useState({ x: -12, y: 20 })
  const drag = useRef(null)

  function handlePointerMove(e) {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    const dy = e.clientY - drag.current.y
    setRot({
      x: Math.max(-60, Math.min(60, drag.current.rx - dy * 0.4)),
      y: drag.current.ry + dx * 0.5,
    })
  }
  function startDrag(e) {
    drag.current = { x: e.clientX, y: e.clientY, rx: rot.x, ry: rot.y }
  }
  function endDrag() {
    drag.current = null
  }

  function readAloud() {
    if (!('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const u = new SpeechSynthesisUtterance(
      `${artifact.name}. ${rar.label} ${artifact.category}. ${artifact.blurb}`,
    )
    u.rate = 0.98
    window.speechSynthesis.speak(u)
  }

  const eraObj = eras.find((e) => e.id === artifact.era)
  const related = Object.values(allCollectibles()).filter(
    (c) => c.id !== artifact.id && (c.era === artifact.era || c.category === artifact.category),
  )

  return (
    <div className="modal-scrim" onClick={onClose}>
      <div
        className="modal artifact-modal"
        onClick={(e) => e.stopPropagation()}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <div className="artifact-viewer">
          <div className="artifact-stage" onPointerDown={startDrag}>
            <div
              className="artifact-3d"
              style={{
                transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
                '--rarity': rar.color,
              }}
            >
              {['front', 'back', 'right', 'left', 'top', 'bottom'].map((face) => (
                <div key={face} className={`face face-${face}`}>
                  <span className="face-emoji">{artifact.icon}</span>
                </div>
              ))}
            </div>
          </div>
          <span className="drag-hint">↔ Drag to rotate in 3D</span>
        </div>

        <div className="artifact-info">
          <span className="relic-rarity" style={{ color: rar.color }}>
            {rar.label} · {artifact.category}
          </span>
          <h2>{artifact.name}</h2>
          <p>{artifact.blurb}</p>
          <button className="btn" onClick={readAloud}>
            🔊 Audio description
          </button>

          <h4 className="block-label">Timeline placement</h4>
          <div className="mini-timeline">
            {eras.map((e) => (
              <div
                key={e.id}
                className={`tl-node ${e.id === artifact.era ? 'here' : ''}`}
                title={e.name}
              >
                <span className="tl-dot" style={{ background: e.accent }} />
                {e.id === artifact.era && <span className="tl-label">{e.name}</span>}
              </div>
            ))}
          </div>
          {eraObj && <p className="muted small">{eraObj.years}</p>}
        </div>

        {related.length > 0 && (
          <div className="related">
            <h4 className="block-label">Related artifacts</h4>
            <div className="related-row">
              {related.map((r) => {
                const has = owned.has(r.id)
                return (
                  <button
                    key={r.id}
                    className={`related-chip ${has ? '' : 'locked'}`}
                    disabled={!has}
                    onClick={() => has && onOpen(r.id)}
                  >
                    <span>{has ? r.icon : '❔'}</span>
                    {has ? r.name : 'Undiscovered'}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

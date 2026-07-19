// Small presentational helpers shared across views.

import { Icon, GameIcon } from './icons.jsx'

export function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="page-header">
      <div className="page-icon" aria-hidden>
        <GameIcon glyph={icon} size={30} />
      </div>
      <div>
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}

export function Reward({ points, children }) {
  return (
    <div className="reward" role="status">
      <span className="reward-star">
        <Icon name="star" size={18} />
      </span>
      <span>
        {children} <strong>+{points} coins</strong>
      </span>
    </div>
  )
}

export function Pill({ tone = 'default', children }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

// The significance layer: shown after a mystery or story is completed.
// `why` states what the events changed and why they still matter; `truth`
// connects the game's fictional Eraser to the real history of erasure; and
// `reflect` asks one ungraded question to think about. Text-only teaching —
// no points attached, by design.
export function Significance({ why, truth, reflect }) {
  if (!why && !truth && !reflect) return null
  return (
    <div className="significance">
      {why && (
        <div className="why-block">
          <span className="sig-kicker">Why it mattered</span>
          <p>{why}</p>
        </div>
      )}
      {truth && (
        <div className="truth-note">
          <span className="sig-kicker">The Eraser is fiction. The erasing was real.</span>
          <p>{truth}</p>
        </div>
      )}
      {reflect && (
        <div className="reflect-block">
          <span className="sig-kicker">Think about it</span>
          <p>{reflect}</p>
        </div>
      )}
    </div>
  )
}

export function EmptyNote({ children }) {
  return <p className="empty-note">{children}</p>
}

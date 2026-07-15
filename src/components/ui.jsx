// Small presentational helpers shared across views.

export function PageHeader({ icon, title, subtitle }) {
  return (
    <div className="page-header">
      <div className="page-icon" aria-hidden>
        {icon}
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
      <span className="reward-star">✦</span>
      <span>
        {children} <strong>+{points} Legacy Points</strong>
      </span>
    </div>
  )
}

export function Pill({ tone = 'default', children }) {
  return <span className={`pill pill-${tone}`}>{children}</span>
}

export function EmptyNote({ children }) {
  return <p className="empty-note">{children}</p>
}

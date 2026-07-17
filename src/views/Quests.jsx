import { useGame } from '../state/GameContext.jsx'
import { PageHeader } from '../components/ui.jsx'
import { DAILY_QUESTS, WEEKLY_QUESTS } from '../data/quests.js'
import { Icon } from '../components/icons.jsx'

function QuestList({ quests, scopeKey, counters }) {
  const claimed = scopeKey === 'day' ? counters.claimedDaily : counters.claimedWeekly
  const bucket = scopeKey === 'day' ? counters.day : counters.week
  return (
    <div className="quest-list">
      {quests.map((q) => {
        const progress = Math.min(bucket[q.counter] || 0, q.target)
        const done = claimed.includes(q.id) || progress >= q.target
        const pct = Math.round((progress / q.target) * 100)
        return (
          <div key={q.id} className={`quest-row ${done ? 'done' : ''}`}>
            <div className="quest-check">{done ? <Icon name="check" size={14} /> : null}</div>
            <div className="quest-main">
              <div className="quest-name">{q.name}</div>
              <div className="bar">
                <div className="bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="quest-meta">
                {progress}/{q.target} · reward +{q.reward.xp} XP, +{q.reward.points} pts
              </div>
            </div>
            <div className={`quest-status ${done ? 'claimed' : ''}`}>
              {done ? 'Claimed' : 'In progress'}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Quests() {
  const { state } = useGame()
  return (
    <div className="view">
      <PageHeader
        icon="🎯"
        title="Quests"
        subtitle="Daily and weekly goals that reward XP and Legacy Points. Complete them just by playing — they claim automatically."
      />

      <h3 className="section-label">Daily quests · reset each day</h3>
      <QuestList quests={DAILY_QUESTS} scopeKey="day" counters={state.counters} />

      <h3 className="section-label">Weekly quests · reset each week</h3>
      <QuestList quests={WEEKLY_QUESTS} scopeKey="week" counters={state.counters} />
    </div>
  )
}

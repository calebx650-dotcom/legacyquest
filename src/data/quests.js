// Daily and weekly quests. Each reads a counter that the reducer increments as
// the player acts, and resets when the day/week key changes. Completing a quest
// grants a one-time bonus (auto-claimed by the QuestWatcher).

export const DAILY_QUESTS = [
  {
    id: 'dq-daily',
    scope: 'day',
    counter: 'dailyDone',
    target: 1,
    name: 'Answer today’s Daily Legacy',
    reward: { xp: 20, points: 5 },
  },
  {
    id: 'dq-puzzle',
    scope: 'day',
    counter: 'puzzles',
    target: 1,
    name: 'Clear a Puzzle Lab challenge',
    reward: { xp: 25, points: 5 },
  },
  {
    id: 'dq-clues',
    scope: 'day',
    counter: 'clues',
    target: 3,
    name: 'Collect 3 clues in an investigation',
    reward: { xp: 20, points: 5 },
  },
]

export const WEEKLY_QUESTS = [
  {
    id: 'wq-mysteries',
    scope: 'week',
    counter: 'mysteries',
    target: 2,
    name: 'Solve 2 History Mysteries',
    reward: { xp: 80, points: 20 },
  },
  {
    id: 'wq-build',
    scope: 'week',
    counter: 'buildings',
    target: 2,
    name: 'Rebuild 2 community landmarks',
    reward: { xp: 70, points: 15 },
  },
  {
    id: 'wq-xp',
    scope: 'week',
    counter: 'xp',
    target: 200,
    name: 'Earn 200 XP this week',
    reward: { xp: 60, points: 20 },
  },
]

export const ALL_QUESTS = [...DAILY_QUESTS, ...WEEKLY_QUESTS]

// ISO-ish week key, e.g. "2026-W29". Good enough to reset weekly quests.
export function weekKey(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - dayNum + 3)
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4))
  const week =
    1 +
    Math.round(
      ((d - firstThursday) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7,
    )
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, '0')}`
}

export function dayKey(date = new Date()) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${dd}`
}

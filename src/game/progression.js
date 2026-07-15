// Progression math: XP → level, titles, and difficulty tiers.
// Keeping these pure and in one place makes them easy to test and tune.

// Level curve: level N requires 100 * N^1.4 total XP (rounded). Gentle early,
// steeper later — the classic "one more level" feel.
export function levelForXp(xp) {
  let level = 1
  while (xp >= xpForLevel(level + 1)) level++
  return level
}

export function xpForLevel(level) {
  if (level <= 1) return 0
  return Math.round(100 * Math.pow(level - 1, 1.4))
}

// Progress within the current level, for the XP bar.
export function levelProgress(xp) {
  const level = levelForXp(xp)
  const start = xpForLevel(level)
  const next = xpForLevel(level + 1)
  const into = xp - start
  const span = next - start
  return { level, into, span, pct: Math.round((into / span) * 100), next }
}

// Difficulty tiers broaden the audience without changing the history.
// `xpMult` rewards harder modes; `freeClues` is how many mystery clues are
// revealed for free (Explorer sees them all, Legacy Keeper earns them).
export const DIFFICULTIES = {
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    audience: 'Kids',
    blurb: 'Extra guidance, all clues revealed, generous hints.',
    xpMult: 0.75,
    freeCluesRatio: 1,
    icon: '🧭',
  },
  scholar: {
    id: 'scholar',
    name: 'Scholar',
    audience: 'Standard',
    blurb: 'The balanced way to play and learn.',
    xpMult: 1,
    freeCluesRatio: 0.5,
    icon: '📖',
  },
  historian: {
    id: 'historian',
    name: 'Historian',
    audience: 'Challenging',
    blurb: 'Fewer free clues. Think like a researcher.',
    xpMult: 1.25,
    freeCluesRatio: 0.25,
    icon: '🔬',
  },
  keeper: {
    id: 'keeper',
    name: 'Legacy Keeper',
    audience: 'Expert',
    blurb: 'No free clues. Earn every conclusion.',
    xpMult: 1.5,
    freeCluesRatio: 0,
    icon: '🔥',
  },
}

export const DEFAULT_DIFFICULTY = 'scholar'

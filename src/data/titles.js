// Titles the player earns and can display next to their Keeper name.
// Each unlocks when a condition over game state is met.

export const TITLES = [
  { id: 'novice-keeper', name: 'Novice Keeper', req: () => true, hint: 'Begin your journey.' },
  {
    id: 'master-detective',
    name: 'Master Detective',
    req: (s) => s.solvedMysteries.length >= 3,
    hint: 'Solve 3 History Mysteries.',
  },
  {
    id: 'puzzle-master',
    name: 'Puzzle Master',
    req: (s) => s.solvedPuzzles.length >= 3,
    hint: 'Clear 3 Puzzle Lab challenges.',
  },
  {
    id: 'community-architect',
    name: 'Community Architect',
    req: (s) => s.builtBuildings.length >= 4,
    hint: 'Rebuild 4 Greenwood landmarks.',
  },
  {
    id: 'legacy-scholar',
    name: 'Legacy Scholar',
    req: (s) => s.visitedCulture.length >= 4 && s.unlockedEras.length >= 3,
    hint: 'Explore 4 music eras and restore 3 historical eras.',
  },
  {
    id: 'timekeeper',
    name: 'Timekeeper',
    req: (s) => (s.daily?.streak || 0) >= 7,
    hint: 'Reach a 7-day Daily streak.',
  },
  {
    id: 'curator',
    name: 'Curator of Legacies',
    req: (s) => s.collectibles.length >= 8,
    hint: 'Recover 8 artifacts for your museum.',
  },
]

export function earnedTitles(state) {
  return TITLES.filter((t) => {
    try {
      return t.req(state)
    } catch {
      return false
    }
  })
}

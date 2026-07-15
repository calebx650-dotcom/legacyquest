// Achievement badges. Each has a predicate over game state. The app checks them
// after every state change and shows a toast the first time one is earned.

export const ACHIEVEMENTS = [
  {
    id: 'first-artifact',
    name: 'First Light',
    icon: '🕯️',
    desc: 'Recover your very first artifact.',
    req: (s) => s.collectibles.length >= 1,
  },
  {
    id: 'first-mystery',
    name: 'Case Cracked',
    icon: '🔍',
    desc: 'Solve your first History Mystery.',
    req: (s) => s.solvedMysteries.length >= 1,
  },
  {
    id: 'all-puzzles',
    name: 'Lab Legend',
    icon: '🧪',
    desc: 'Clear every Puzzle Lab challenge.',
    req: (s) => s.solvedPuzzles.length >= 3,
  },
  {
    id: 'mentor-3',
    name: 'Well Mentored',
    icon: '⚔️',
    desc: 'Recruit 3 mentors.',
    req: (s) => s.unlockedMentors.length >= 3,
  },
  {
    id: 'greenwood-restored',
    name: 'Black Wall Street Reborn',
    icon: '🏙️',
    desc: 'Rebuild all of Greenwood.',
    req: (s) => s.builtBuildings.length >= 6,
  },
  {
    id: 'streak-7',
    name: 'Faithful Keeper',
    icon: '🔥',
    desc: 'Reach a 7-day Daily streak.',
    req: (s) => (s.daily?.streak || 0) >= 7,
  },
  {
    id: 'level-5',
    name: 'Rising Keeper',
    icon: '⭐',
    desc: 'Reach Level 5.',
    req: (s, ctx) => ctx.level >= 5,
  },
  {
    id: 'era-explorer',
    name: 'Time Traveler',
    icon: '🧭',
    desc: 'Restore 4 historical eras.',
    req: (s) => s.unlockedEras.length >= 4,
  },
  {
    id: 'legendary-find',
    name: 'Legend Hunter',
    icon: '👑',
    desc: 'Recover a legendary artifact.',
    req: (s, ctx) => ctx.hasLegendary,
  },
  {
    id: 'culture-complete',
    name: 'The Whole Song',
    icon: '🎶',
    desc: 'Explore every Culture Journey entry.',
    req: (s) => s.visitedCulture.length >= 6,
  },
]

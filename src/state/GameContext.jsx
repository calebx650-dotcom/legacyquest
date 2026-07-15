import { createContext, useContext, useEffect, useReducer } from 'react'
import { MYSTERIES } from '../data/mysteries.js'
import { PUZZLES } from '../data/puzzles.js'
import { COMMUNITY } from '../data/community.js'
import { STREAK_REWARDS } from '../data/collectibles.js'
import { ONBOARDING } from '../data/onboarding.js'
import { STORIES } from '../data/stories.js'
import { ALL_QUESTS, dayKey, weekKey } from '../data/quests.js'
import { DIFFICULTIES, DEFAULT_DIFFICULTY } from '../game/progression.js'
import { xpMultiplierForDate } from '../data/events.js'
import { allEras } from '../content/store.js'

const STORAGE_KEY = 'legacyquest.save.v2'

const emptyCounters = () => ({
  dayKey: dayKey(),
  weekKey: weekKey(),
  day: { dailyDone: 0, puzzles: 0, clues: 0 },
  week: { mysteries: 0, buildings: 0, xp: 0, puzzles: 0 },
  claimedDaily: [],
  claimedWeekly: [],
})

const defaultSettings = {
  music: false,
  sfx: true,
  tts: false,
  dyslexia: false,
  textScale: 1,
  contrast: false,
  colorblind: false,
  captions: true,
  reducedMotion: false,
}

const initialState = {
  legacyPoints: 0,
  xp: 0,
  onboarded: false,
  difficulty: DEFAULT_DIFFICULTY,
  settings: defaultSettings,
  activeTitle: 'novice-keeper',
  account: { signedIn: false, provider: null, name: 'Guest Keeper' },
  activeCompanion: null,
  achievements: [],
  unlockedEras: ['reconstruction'],
  unlockedMentors: [],
  solvedMysteries: [],
  solvedPuzzles: [],
  builtBuildings: [],
  visitedCulture: [],
  completedStories: [],
  foundHidden: [],
  collectibles: [],
  daily: { lastCompleted: null, streak: 0 },
  thisDayClaimed: null,
  counters: emptyCounters(),
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    const saved = JSON.parse(raw)
    return {
      ...initialState,
      ...saved,
      settings: { ...defaultSettings, ...(saved.settings || {}) },
      counters: rollover(saved.counters || emptyCounters()),
    }
  } catch {
    return initialState
  }
}

const addUnique = (arr, value) => (arr.includes(value) ? arr : [...arr, value])
const xpMult = (state) => DIFFICULTIES[state.difficulty]?.xpMult ?? 1

// Reset daily/weekly counters when the calendar day or week has changed.
function rollover(counters) {
  const c = { ...emptyCounters(), ...counters }
  const dk = dayKey()
  const wk = weekKey()
  let next = c
  if (c.dayKey !== dk) {
    next = { ...next, dayKey: dk, day: emptyCounters().day, claimedDaily: [] }
  }
  if (c.weekKey !== wk) {
    next = { ...next, weekKey: wk, week: emptyCounters().week, claimedWeekly: [] }
  }
  return next
}

// Add XP (scaled by difficulty AND any active event, e.g. double-XP weekends)
// and mirror it into the weekly XP counter.
function addXp(state, baseXp) {
  const gain = Math.round(baseXp * xpMult(state) * xpMultiplierForDate())
  const counters = rollover(state.counters)
  return {
    xp: state.xp + gain,
    counters: { ...counters, week: { ...counters.week, xp: counters.week.xp + gain } },
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SYNC_PERIOD':
      return { ...state, counters: rollover(state.counters) }

    case 'AWARD_POINTS':
      return { ...state, legacyPoints: state.legacyPoints + action.points }

    case 'COLLECT':
      return { ...state, collectibles: addUnique(state.collectibles, action.id) }

    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.id }

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.patch } }

    case 'SET_TITLE':
      return { ...state, activeTitle: action.id }

    case 'SET_ACCOUNT':
      return { ...state, account: { ...state.account, ...action.patch } }

    case 'SET_COMPANION':
      return { ...state, activeCompanion: action.id }

    case 'IMPORT_SAVE': {
      // Replace the whole save with an imported one (from a sync code),
      // defensively merged so missing fields fall back to defaults.
      const s = action.state || {}
      return {
        ...initialState,
        ...s,
        settings: { ...defaultSettings, ...(s.settings || {}) },
        account: { ...initialState.account, ...(s.account || {}) },
        counters: rollover(s.counters || emptyCounters()),
      }
    }

    case 'COMPLETE_STORY': {
      const story = STORIES.find((st) => st.id === action.id)
      if (!story || state.completedStories.includes(action.id)) return state
      const { xp, counters } = addXp(state, story.rewardXp)
      return {
        ...state,
        legacyPoints: state.legacyPoints + story.rewardPoints,
        completedStories: addUnique(state.completedStories, action.id),
        collectibles: story.artifact
          ? addUnique(state.collectibles, story.artifact)
          : state.collectibles,
        xp,
        counters,
      }
    }

    case 'FIND_HIDDEN': {
      if (state.foundHidden.includes(action.id)) return state
      const { xp, counters } = addXp(state, 30)
      return {
        ...state,
        foundHidden: addUnique(state.foundHidden, action.id),
        collectibles: addUnique(state.collectibles, action.id),
        legacyPoints: state.legacyPoints + 15,
        xp,
        counters,
      }
    }

    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.id)) return state
      const { xp, counters } = addXp(state, 25)
      return { ...state, achievements: addUnique(state.achievements, action.id), xp, counters }
    }

    case 'COMPLETE_ONBOARDING': {
      if (state.onboarded) return state
      const { xp, counters } = addXp(state, ONBOARDING.rewardXp)
      return {
        ...state,
        onboarded: true,
        legacyPoints: state.legacyPoints + ONBOARDING.rewardPoints,
        collectibles: addUnique(state.collectibles, ONBOARDING.rewardArtifact),
        xp,
        counters,
      }
    }

    case 'CLAIM_THIS_DAY': {
      if (state.thisDayClaimed === action.id) return state
      const { xp, counters } = addXp(state, 15)
      return {
        ...state,
        thisDayClaimed: action.id,
        legacyPoints: state.legacyPoints + 10,
        xp,
        counters,
      }
    }

    case 'COLLECT_CLUE': {
      const counters = rollover(state.counters)
      return { ...state, counters: { ...counters, day: { ...counters.day, clues: counters.day.clues + 1 } } }
    }

    case 'CLAIM_QUEST': {
      const quest = ALL_QUESTS.find((q) => q.id === action.id)
      if (!quest) return state
      const listKey = quest.scope === 'day' ? 'claimedDaily' : 'claimedWeekly'
      const counters0 = rollover(state.counters)
      if (counters0[listKey].includes(action.id)) return state
      const { xp, counters } = addXp(state, quest.reward.xp)
      return {
        ...state,
        legacyPoints: state.legacyPoints + quest.reward.points,
        xp,
        counters: { ...counters, [listKey]: addUnique(counters0[listKey], action.id) },
      }
    }

    case 'UNLOCK_ERA': {
      const era = allEras().find((e) => e.id === action.id)
      if (!era || state.unlockedEras.includes(action.id)) return state
      if (state.legacyPoints < era.unlockCost) return state
      const { xp, counters } = addXp(state, 15)
      return {
        ...state,
        legacyPoints: state.legacyPoints - era.unlockCost,
        unlockedEras: addUnique(state.unlockedEras, action.id),
        xp,
        counters,
      }
    }

    case 'UNLOCK_MENTOR': {
      const { mentor } = action
      if (state.unlockedMentors.includes(mentor.id)) return state
      if (state.legacyPoints < mentor.unlockCost) return state
      const { xp, counters } = addXp(state, 20)
      return {
        ...state,
        legacyPoints: state.legacyPoints - mentor.unlockCost,
        unlockedMentors: addUnique(state.unlockedMentors, mentor.id),
        xp,
        counters,
      }
    }

    case 'SOLVE_MYSTERY': {
      if (state.solvedMysteries.includes(action.id)) return state
      const mystery = MYSTERIES.find((m) => m.id === action.id)
      if (!mystery) return state
      const { xp, counters } = addXp(state, mystery.reward)
      return {
        ...state,
        legacyPoints: state.legacyPoints + mystery.reward,
        solvedMysteries: addUnique(state.solvedMysteries, action.id),
        collectibles: mystery.unlocks
          ? addUnique(state.collectibles, mystery.unlocks)
          : state.collectibles,
        xp,
        counters: { ...counters, week: { ...counters.week, mysteries: counters.week.mysteries + 1 } },
      }
    }

    case 'SOLVE_PUZZLE': {
      if (state.solvedPuzzles.includes(action.id)) return state
      const puzzle = PUZZLES.find((p) => p.id === action.id)
      if (!puzzle) return state
      const { xp, counters } = addXp(state, puzzle.reward)
      return {
        ...state,
        legacyPoints: state.legacyPoints + puzzle.reward,
        solvedPuzzles: addUnique(state.solvedPuzzles, action.id),
        xp,
        counters: {
          ...counters,
          day: { ...counters.day, puzzles: counters.day.puzzles + 1 },
          week: { ...counters.week, puzzles: counters.week.puzzles + 1 },
        },
      }
    }

    case 'BUILD': {
      const building = COMMUNITY.buildings.find((b) => b.id === action.id)
      if (!building || state.builtBuildings.includes(action.id)) return state
      if (state.legacyPoints < action.cost) return state
      const { xp, counters } = addXp(state, 20)
      return {
        ...state,
        legacyPoints: state.legacyPoints - action.cost,
        builtBuildings: addUnique(state.builtBuildings, action.id),
        xp,
        counters: { ...counters, week: { ...counters.week, buildings: counters.week.buildings + 1 } },
      }
    }

    case 'VISIT_CULTURE': {
      if (state.visitedCulture.includes(action.id)) return state
      const { xp, counters } = addXp(state, 10)
      return { ...state, visitedCulture: addUnique(state.visitedCulture, action.id), xp, counters }
    }

    case 'COMPLETE_DAILY': {
      if (state.daily.lastCompleted === action.date) return state
      const streak =
        state.daily.lastCompleted === action.yesterday ? state.daily.streak + 1 : 1
      let collectibles = state.collectibles
      const reward = STREAK_REWARDS[streak]
      if (reward) collectibles = addUnique(collectibles, reward)
      const { xp, counters } = addXp(state, action.points)
      return {
        ...state,
        legacyPoints: state.legacyPoints + action.points,
        collectibles,
        daily: { lastCompleted: action.date, streak },
        xp,
        counters: { ...counters, day: { ...counters.day, dailyDone: 1 } },
      }
    }

    case 'RESET':
      return { ...initialState, counters: emptyCounters() }

    default:
      return state
  }
}

const GameContext = createContext(null)

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable (private mode); app still runs in-memory */
    }
  }, [state])

  // Reset daily/weekly counters if the app is open across a boundary.
  useEffect(() => {
    dispatch({ type: 'SYNC_PERIOD' })
  }, [])

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}

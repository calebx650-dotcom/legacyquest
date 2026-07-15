import { createContext, useContext, useEffect, useReducer } from 'react'
import { ERAS } from '../data/eras.js'
import { MYSTERIES } from '../data/mysteries.js'
import { PUZZLES } from '../data/puzzles.js'
import { COMMUNITY } from '../data/community.js'
import { STREAK_REWARDS } from '../data/collectibles.js'

const STORAGE_KEY = 'legacyquest.save.v1'

// The first era is always available so a new player can start immediately.
const initialState = {
  legacyPoints: 0,
  unlockedEras: ['reconstruction'],
  unlockedMentors: [],
  solvedMysteries: [],
  solvedPuzzles: [],
  builtBuildings: [],
  visitedCulture: [],
  collectibles: [],
  daily: { lastCompleted: null, streak: 0 },
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    // Merge so new fields added in later versions don't break old saves.
    return { ...initialState, ...JSON.parse(raw) }
  } catch {
    return initialState
  }
}

// Add a value to an array only if it's not already present (idempotent unlocks).
const addUnique = (arr, value) => (arr.includes(value) ? arr : [...arr, value])

function reducer(state, action) {
  switch (action.type) {
    case 'AWARD_POINTS':
      return { ...state, legacyPoints: state.legacyPoints + action.points }

    case 'COLLECT':
      return { ...state, collectibles: addUnique(state.collectibles, action.id) }

    case 'UNLOCK_ERA': {
      const era = ERAS.find((e) => e.id === action.id)
      if (!era || state.unlockedEras.includes(action.id)) return state
      if (state.legacyPoints < era.unlockCost) return state
      return {
        ...state,
        legacyPoints: state.legacyPoints - era.unlockCost,
        unlockedEras: addUnique(state.unlockedEras, action.id),
      }
    }

    case 'UNLOCK_MENTOR': {
      const { mentor } = action
      if (state.unlockedMentors.includes(mentor.id)) return state
      if (state.legacyPoints < mentor.unlockCost) return state
      return {
        ...state,
        legacyPoints: state.legacyPoints - mentor.unlockCost,
        unlockedMentors: addUnique(state.unlockedMentors, mentor.id),
      }
    }

    case 'SOLVE_MYSTERY': {
      if (state.solvedMysteries.includes(action.id)) return state
      const mystery = MYSTERIES.find((m) => m.id === action.id)
      if (!mystery) return state
      return {
        ...state,
        legacyPoints: state.legacyPoints + mystery.reward,
        solvedMysteries: addUnique(state.solvedMysteries, action.id),
        collectibles: mystery.unlocks
          ? addUnique(state.collectibles, mystery.unlocks)
          : state.collectibles,
      }
    }

    case 'SOLVE_PUZZLE': {
      if (state.solvedPuzzles.includes(action.id)) return state
      const puzzle = PUZZLES.find((p) => p.id === action.id)
      if (!puzzle) return state
      return {
        ...state,
        legacyPoints: state.legacyPoints + puzzle.reward,
        solvedPuzzles: addUnique(state.solvedPuzzles, action.id),
      }
    }

    case 'BUILD': {
      const building = COMMUNITY.buildings.find((b) => b.id === action.id)
      if (!building || state.builtBuildings.includes(action.id)) return state
      if (state.legacyPoints < action.cost) return state
      return {
        ...state,
        legacyPoints: state.legacyPoints - action.cost,
        builtBuildings: addUnique(state.builtBuildings, action.id),
      }
    }

    case 'VISIT_CULTURE':
      return { ...state, visitedCulture: addUnique(state.visitedCulture, action.id) }

    case 'COMPLETE_DAILY': {
      if (state.daily.lastCompleted === action.date) return state // already done today
      // Continue the streak only if the last completion was exactly yesterday.
      const streak =
        state.daily.lastCompleted === action.yesterday ? state.daily.streak + 1 : 1
      let collectibles = state.collectibles
      const reward = STREAK_REWARDS[streak]
      if (reward) collectibles = addUnique(collectibles, reward)
      return {
        ...state,
        legacyPoints: state.legacyPoints + action.points,
        collectibles,
        daily: { lastCompleted: action.date, streak },
      }
    }

    case 'RESET':
      return initialState

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
      /* storage may be unavailable (private mode); the app still runs in-memory */
    }
  }, [state])

  return <GameContext.Provider value={{ state, dispatch }}>{children}</GameContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}

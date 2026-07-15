import { levelForXp, levelProgress } from './progression.js'
import { COLLECTIBLES } from '../data/collectibles.js'

export function getLevel(state) {
  return levelForXp(state.xp)
}

export function getLevelInfo(state) {
  return levelProgress(state.xp)
}

export function hasLegendary(state) {
  return state.collectibles.some((id) => COLLECTIBLES[id]?.rarity === 'legendary')
}

// Context object passed to achievement predicates that need derived values.
export function achievementCtx(state) {
  return { level: getLevel(state), hasLegendary: hasLegendary(state) }
}

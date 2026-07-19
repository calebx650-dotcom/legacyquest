// Quest Path builder. Lays all playable content out as one linear, chronological
// journey through the eras (the Duolingo-style backbone): Defend the Timeline
// rounds, puzzles, stories, community building, era-boss mysteries, and
// milestone chests. Node status is derived entirely from existing game state,
// so nothing here duplicates progress tracking.

import { ERAS } from '../data/eras.js'

// Node blueprint per era, in play order. Only listed content becomes nodes;
// every era opens with a Defend round.
const ERA_NODES = {
  'ancient-africa': [],
  'slave-trade': [],
  reconstruction: [
    { type: 'puzzle', id: 'railroad-decode', label: 'Decode the Railroad Message' },
    { type: 'story', id: 'follow-the-north-star', label: 'Follow the North Star' },
    { type: 'puzzle', id: 'photo-restore', label: 'Restore the Photograph' },
    { type: 'boss', id: 'underground-railroad', label: 'Mystery: The Underground Railroad' },
    { type: 'chest', id: 'chest-reconstruction', label: 'Era Chest' },
  ],
  'black-wall-street': [
    { type: 'build', id: 'greenwood', label: 'Rebuild Greenwood (2 buildings)' },
    { type: 'chest', id: 'chest-greenwood', label: 'Era Chest' },
  ],
  'harlem-renaissance': [],
  'great-migration': [],
  wwii: [],
  'civil-rights': [
    { type: 'puzzle', id: 'civil-rights-timeline', label: 'Order the Milestones' },
    { type: 'story', id: 'stay-off-the-buses', label: 'Stay Off the Buses' },
    { type: 'boss', id: 'montgomery-bus-boycott', label: 'Mystery: The Bus Boycott' },
    { type: 'chest', id: 'chest-civil-rights', label: 'Era Chest' },
  ],
  'space-age': [
    { type: 'puzzle', id: 'inventors-match', label: 'Match the Inventors' },
    { type: 'boss', id: 'hidden-inventor', label: 'Mystery: The Hidden Inventor' },
    { type: 'chest', id: 'chest-space-age', label: 'Era Chest' },
  ],
  'modern-innovators': [
    { type: 'puzzle', id: 'mentor-memory', label: 'Mentor Memory Match' },
  ],
  afrofuturism: [{ type: 'chest', id: 'chest-finale', label: 'Keeper’s Chest' }],
}

const NODE_ICON = {
  defend: 'shield',
  puzzle: 'puzzle',
  story: 'book',
  boss: 'search',
  build: 'city',
  chest: 'chest',
}

function nodeDone(node, state) {
  switch (node.type) {
    case 'defend':
      return state.defendWins.includes(node.era)
    case 'puzzle':
      return state.solvedPuzzles.includes(node.id)
    case 'story':
      return state.completedStories.includes(node.id)
    case 'boss':
      return state.solvedMysteries.includes(node.id)
    case 'build':
      return state.builtBuildings.length >= 2
    case 'chest':
      return state.pathChests.includes(node.id)
    default:
      return false
  }
}

// Returns the full path with per-node status: 'done' | 'current' | 'locked'.
export function buildPath(state) {
  const nodes = []
  for (const era of ERAS) {
    nodes.push({
      type: 'defend',
      id: `defend-${era.id}`,
      era: era.id,
      eraName: era.name,
      accent: era.accent,
      label: `Defend the Timeline: ${era.name}`,
      icon: NODE_ICON.defend,
      eraStart: true,
    })
    for (const n of ERA_NODES[era.id] || []) {
      nodes.push({ ...n, era: era.id, eraName: era.name, accent: era.accent, icon: NODE_ICON[n.type] })
    }
  }

  let currentAssigned = false
  return nodes.map((n) => {
    const done = nodeDone(n, state)
    let status = 'locked'
    if (done) status = 'done'
    else if (!currentAssigned) {
      status = 'current'
      currentAssigned = true
    }
    return { ...n, status }
  })
}

export function pathStats(nodes) {
  const done = nodes.filter((n) => n.status === 'done').length
  return { done, total: nodes.length, pct: Math.round((done / nodes.length) * 100) }
}

// Legacy Museum collectibles. Recovered by completing mysteries, puzzles, daily
// challenges, and onboarding. Each has a `rarity` (common / rare / legendary)
// and a real primary-source `category`.

export const RARITY = {
  common: { label: 'Common', color: '#9a90b8' },
  rare: { label: 'Rare', color: '#4a7dd6' },
  legendary: { label: 'Legendary', color: '#f4b942' },
}

export const COLLECTIBLES = {
  'north-star-map': {
    id: 'north-star-map',
    name: 'The North Star Map',
    category: 'Map',
    rarity: 'rare',
    icon: '⭐',
    era: 'reconstruction',
    blurb:
      'The first fragment of history you restored — a route north by the Big Dipper and the North Star, the guiding light of the Underground Railroad.',
  },
  'letter-mia': {
    id: 'letter-mia',
    name: 'Montgomery Improvement Association Leaflet',
    category: 'Document',
    rarity: 'common',
    icon: '📜',
    era: 'civil-rights',
    blurb:
      'A reproduction of the leaflet calling Montgomery’s Black residents to stay off the buses — the kind Jo Ann Robinson and the Women’s Political Council mimeographed by the tens of thousands.',
  },
  'diagram-railroad': {
    id: 'diagram-railroad',
    name: 'Underground Railroad Route Map',
    category: 'Map',
    rarity: 'rare',
    icon: '🗺️',
    era: 'reconstruction',
    blurb:
      'A schematic of “stations” and northbound routes toward free states and Canada, with William Still’s Philadelphia office as a key hub.',
  },
  'patent-signal': {
    id: 'patent-signal',
    name: 'Garrett Morgan’s Traffic Signal Patent',
    category: 'Patent',
    rarity: 'rare',
    icon: '📐',
    era: 'space-age',
    blurb:
      'U.S. Patent 1,475,024 (1923) for the three-position traffic signal that added a warning interval between “stop” and “go.”',
  },
  'photo-harlem': {
    id: 'photo-harlem',
    name: 'Savoy Ballroom Photograph',
    category: 'Photograph',
    rarity: 'common',
    icon: '📷',
    era: 'harlem-renaissance',
    blurb:
      'A night at Harlem’s Savoy Ballroom, where the Lindy Hop was born and big bands like Chick Webb’s traded sets before integrated crowds.',
  },
  'recording-spiritual': {
    id: 'recording-spiritual',
    name: 'Spiritual: “Wade in the Water”',
    category: 'Audio',
    rarity: 'common',
    icon: '🎵',
    era: 'reconstruction',
    blurb:
      'A spiritual passed down through oral tradition, later associated in folklore with guidance along escape routes and long a staple of the Black church.',
  },
  'card-johnson': {
    id: 'card-johnson',
    name: 'Mentor Card: Katherine Johnson',
    category: 'Mentor Card',
    rarity: 'legendary',
    icon: '🃏',
    era: 'space-age',
    blurb:
      'Commemorates the NASA mathematician whose calculations John Glenn personally trusted before his 1962 orbital flight.',
  },
  'manuscript-timbuktu': {
    id: 'manuscript-timbuktu',
    name: 'Timbuktu Manuscript',
    category: 'Manuscript',
    rarity: 'legendary',
    icon: '📖',
    era: 'ancient-africa',
    blurb:
      'One of the hundreds of thousands of scholarly manuscripts on astronomy, law, and medicine preserved in Timbuktu, a center of learning in the Mali Empire.',
  },
  'front-page-tulsa': {
    id: 'front-page-tulsa',
    name: 'Tulsa Star Front Page',
    category: 'Newspaper',
    rarity: 'rare',
    icon: '🗞️',
    era: 'black-wall-street',
    blurb:
      'A front page from Greenwood’s Black-owned press, chronicling the businesses and civic life of “Black Wall Street.”',
  },
  'speech-dream': {
    id: 'speech-dream',
    name: '“I Have a Dream” Speech',
    category: 'Speech',
    rarity: 'legendary',
    icon: '🎙️',
    era: 'civil-rights',
    blurb:
      'Dr. King’s address at the 1963 March on Washington, delivered to some 250,000 people at the Lincoln Memorial.',
  },
  'letter-equiano': {
    id: 'letter-equiano',
    name: 'Equiano’s Narrative',
    category: 'Book',
    rarity: 'rare',
    icon: '✒️',
    era: 'slave-trade',
    blurb:
      'Olaudah Equiano’s 1789 autobiography, a bestseller that fueled the British abolition movement.',
  },
  'badge-tuskegee': {
    id: 'badge-tuskegee',
    name: 'Tuskegee Airmen Insignia',
    category: 'Artifact',
    rarity: 'rare',
    icon: '✈️',
    era: 'wwii',
    blurb:
      'The emblem of the Tuskegee Airmen, the first Black military aviators in the U.S. Army Air Forces, who flew with distinction in World War II.',
  },

  // --- Streak reward artifacts ---
  'streak-30': {
    id: 'streak-30',
    name: 'Lantern of Persistence',
    category: 'Streak Relic',
    rarity: 'rare',
    icon: '🏮',
    era: 'reconstruction',
    blurb: 'Awarded for a 30-day streak — a light kept burning night after night.',
  },
  'streak-100': {
    id: 'streak-100',
    name: 'Centennial Flame',
    category: 'Streak Relic',
    rarity: 'legendary',
    icon: '🔥',
    era: 'reconstruction',
    blurb: 'A 100-day streak. Few Keepers carry the flame this far.',
  },
  'streak-365': {
    id: 'streak-365',
    name: 'Eternal Beacon',
    category: 'Streak Relic',
    rarity: 'legendary',
    icon: '🌟',
    era: 'afrofuturism',
    blurb: 'A full year, unbroken. The Eraser has no power over a memory kept this faithfully.',
  },

  // --- Event / hidden artifacts ---
  'event-juneteenth': {
    id: 'event-juneteenth',
    name: 'Juneteenth Freedom Flag',
    category: 'Event',
    rarity: 'legendary',
    icon: '🎉',
    era: 'reconstruction',
    blurb: 'A commemorative artifact of Juneteenth — the day freedom finally reached Galveston.',
  },
  'hidden-lantern': {
    id: 'hidden-lantern',
    name: 'Signal Lantern',
    category: 'Hidden',
    rarity: 'rare',
    icon: '🪔',
    era: 'reconstruction',
    blurb: 'A hidden lantern, once used to signal that a station on the Railroad was safe.',
  },
  'hidden-quilt': {
    id: 'hidden-quilt',
    name: 'Freedom Quilt',
    category: 'Hidden',
    rarity: 'rare',
    icon: '🧵',
    era: 'reconstruction',
    blurb:
      'A quilt of the kind folklore associates with the Underground Railroad — its patterns a subject of oral tradition.',
  },
  'hidden-almanac': {
    id: 'hidden-almanac',
    name: 'Banneker’s Almanac',
    category: 'Hidden',
    rarity: 'rare',
    icon: '📔',
    era: 'reconstruction',
    blurb:
      'A hidden edition of Benjamin Banneker’s almanac, filled with astronomical calculations by the self-taught scientist.',
  },
}

// Awarded by the Daily Legacy streak system at these thresholds.
export const STREAK_REWARDS = {
  3: 'recording-spiritual',
  7: 'photo-harlem',
  30: 'streak-30',
  100: 'streak-100',
  365: 'streak-365',
}

// Streak milestones surfaced in the UI (label + optional artifact).
export const STREAK_MILESTONES = [
  { days: 7, label: 'One week', artifact: 'photo-harlem' },
  { days: 30, label: 'One month', artifact: 'streak-30' },
  { days: 100, label: '100 days', artifact: 'streak-100' },
  { days: 365, label: 'One year', artifact: 'streak-365' },
]

export const RARITY_ORDER = ['legendary', 'rare', 'common']

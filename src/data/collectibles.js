// Legacy Museum collectibles. Recovered by completing mysteries, puzzles, and
// daily challenges. Each is a real category of primary source. `icon` is an
// emoji used as lightweight art in the prototype.

export const COLLECTIBLES = {
  'letter-mia': {
    id: 'letter-mia',
    name: 'Montgomery Improvement Association Leaflet',
    category: 'Document',
    icon: '📜',
    era: 'civil-rights',
    blurb:
      'A reproduction of the leaflet calling Montgomery’s Black residents to stay off the buses — the kind Jo Ann Robinson and the Women’s Political Council mimeographed by the tens of thousands.',
  },
  'diagram-railroad': {
    id: 'diagram-railroad',
    name: 'Underground Railroad Route Map',
    category: 'Map',
    icon: '🗺️',
    era: 'reconstruction',
    blurb:
      'A schematic of “stations” and northbound routes toward free states and Canada, with William Still’s Philadelphia office as a key hub.',
  },
  'patent-signal': {
    id: 'patent-signal',
    name: 'Garrett Morgan’s Traffic Signal Patent',
    category: 'Patent',
    icon: '📐',
    era: 'space-age',
    blurb:
      'U.S. Patent 1,475,024 (1923) for the three-position traffic signal that added a warning interval between “stop” and “go.”',
  },
  'photo-harlem': {
    id: 'photo-harlem',
    name: 'Savoy Ballroom Photograph',
    category: 'Photograph',
    icon: '📷',
    era: 'harlem-renaissance',
    blurb:
      'A night at Harlem’s Savoy Ballroom, where the Lindy Hop was born and big bands like Chick Webb’s traded sets before integrated crowds.',
  },
  'recording-spiritual': {
    id: 'recording-spiritual',
    name: 'Spiritual: “Wade in the Water”',
    category: 'Audio',
    icon: '🎵',
    era: 'reconstruction',
    blurb:
      'A spiritual passed down through oral tradition, later associated in folklore with guidance along escape routes and long a staple of the Black church.',
  },
  'card-johnson': {
    id: 'card-johnson',
    name: 'Mentor Card: Katherine Johnson',
    category: 'Mentor Card',
    icon: '🃏',
    era: 'space-age',
    blurb:
      'Commemorates the NASA mathematician whose calculations John Glenn personally trusted before his 1962 orbital flight.',
  },
}

// Awarded by the Daily Legacy streak system at these thresholds.
export const STREAK_REWARDS = {
  3: 'recording-spiritual',
  7: 'photo-harlem',
  14: 'card-johnson',
}

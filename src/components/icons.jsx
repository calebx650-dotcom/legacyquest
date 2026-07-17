// LegacyQuest icon system. A single inline-SVG set (24x24, monoline,
// currentColor) replaces all emoji used as interface art. Data files may still
// store legacy glyph strings; GameIcon maps those to icons so content renders
// consistently without a data migration. Unknown glyphs fall back to "sparkle".

const P = {
  flame:
    'M12 2.5c2.2 3.4.3 5.4-.9 7.1-1.2 1.7-2.6 3.2-2.6 5.4a5.5 5.5 0 0 0 11 0c0-2.6-1.2-4.2-2.2-5.8-.4 1.3-1.1 2.1-2.1 2.7.6-3-.4-6.3-3.2-9.4z',
  bank: 'M3 10h18M4.5 10 12 4l7.5 6M6.5 10v7M10.2 10v7M13.8 10v7M17.5 10v7M4 20h16',
  calendar: 'M4 6.5h16v13H4zM4 10.5h16M8.5 4v4M15.5 4v4',
  target: 'M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0-16 0M12 12m-4.2 0a4.2 4.2 0 1 0 8.4 0a4.2 4.2 0 1 0-8.4 0M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0',
  gift: 'M4 8.5h16V12H4zM5.5 12v8h13v-8M12 8.5V20M12 8.5C9 8.5 7 7.5 7 5.7 7 4 9 3.6 10.2 4.8 11.3 5.8 12 8.5 12 8.5zm0 0c3 0 5-1 5-2.8 0-1.7-2-2.1-3.2-.9C12.7 5.8 12 8.5 12 8.5z',
  compass:
    'M12 12m-8.5 0a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0M15 9l-1.8 4.6L8.6 15l1.8-4.6z',
  search: 'M10.5 10.5m-5.7 0a5.7 5.7 0 1 0 11.4 0a5.7 5.7 0 1 0-11.4 0M14.8 14.8 20 20',
  book: 'M12 6.2C10 4.8 7 4.3 4 4.7V19c3-.4 6 .1 8 1.5 2-1.4 5-1.9 8-1.5V4.7c-3-.4-6 .1-8 1.5zM12 6.2v14.3',
  puzzle:
    'M5 5h5.5v2a1.7 1.7 0 1 0 3 0V5H19v5.5h-2a1.7 1.7 0 1 0 0 3h2V19h-5.5v-2a1.7 1.7 0 1 0-3 0v2H5v-5.5h2a1.7 1.7 0 1 0 0-3H5z',
  shield: 'M12 3l7.5 3v5.8c0 4.6-3.1 7.6-7.5 9.2-4.4-1.6-7.5-4.6-7.5-9.2V6z',
  city: 'M3 20V9.5h5.5V20M8.5 20V4h7v16M15.5 20v-7.5H21V20M2.5 20h19M11 7.5h2M11 11h2M11 14.5h2',
  music: 'M9 17.5a2.4 2.4 0 1 1-1.4-2.2V6.2l10-2v10.9a2.4 2.4 0 1 1-1.4-2.2',
  frame: 'M4 4.5h16v15H4zM7 16l3.5-4 2.5 2.5L15.5 11l1.5 2M8.7 8.7m-1.2 0a1.2 1.2 0 1 0 2.4 0a1.2 1.2 0 1 0-2.4 0',
  medal: 'M12 14.5m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0M9.2 10.3 6 3.5h4.2L12 7.4l1.8-3.9H18l-3.2 6.8',
  trophy:
    'M7.5 4h9v5a4.5 4.5 0 0 1-9 0zM7.5 5.5H4.5A3 3 0 0 0 7.8 9M16.5 5.5h3A3 3 0 0 1 16.2 9M12 13.5v3.5M8.5 20h7M9.5 17h5',
  cap: 'M2.5 9.5 12 5.5l9.5 4L12 13.5zM6.5 11.5v3.7c0 1.6 11 1.6 11 0v-3.7M21 10v4.5',
  chart: 'M4.5 4v15.5H20M8.5 16v-4.5M12.5 16V8.5M16.5 16V6',
  wrench:
    'M14.7 6.3a4.2 4.2 0 0 0-5.6 5.2L4 16.6 7.4 20l5.1-5.1a4.2 4.2 0 0 0 5.2-5.6l-2.8 2.8-2.7-.6-.6-2.7z',
  download: 'M12 4v10M7.5 10.5 12 15l4.5-4.5M5 19.5h14',
  user: 'M12 8m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M4.5 20c1.5-3.5 4.3-5 7.5-5s6 1.5 7.5 5',
  gear: 'M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18',
  speaker: 'M4.5 10v4h3.5l5 4V6l-5 4zM16 9.2a4.2 4.2 0 0 1 0 5.6M18.3 7a7.2 7.2 0 0 1 0 10',
  speakerOff: 'M4.5 10v4h3.5l5 4V6l-5 4zM16.5 9.5l5 5M21.5 9.5l-5 5',
  star: 'M12 3.5l2.5 5.2 5.7.7-4.2 3.9 1.1 5.6L12 16.1l-5.1 2.8 1.1-5.6-4.2-3.9 5.7-.7z',
  sparkle: 'M12 3l1.9 6.1L20 11l-6.1 1.9L12 19l-1.9-6.1L4 11l6.1-1.9zM18.5 15.5l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9z',
  vase: 'M9.5 3h5M10.5 3c0 2-.6 3-1.9 4.4C7.2 8.9 6.5 10.6 6.5 13a5.5 5.5 0 0 0 11 0c0-2.4-.7-4.1-2.1-5.6C14.1 6 13.5 5 13.5 3M8 20.5h8',
  lock: 'M5.5 11h13v9h-13zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  map: 'M9 4 4 6v14l5-2 6 2 5-2V4l-5 2zM9 4v14M15 6v14',
  scroll:
    'M6.5 4H17a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8.5a2 2 0 0 1-2-2zM6.5 4a2 2 0 0 0-2 2v2h4M9.5 9h6M9.5 12.5h6M9.5 16h4',
  camera: 'M3.5 7.5h17V20h-17zM12 13.5m-3.7 0a3.7 3.7 0 1 0 7.4 0a3.7 3.7 0 1 0-7.4 0M8.5 7.5 10 4h4l1.5 3.5',
  card: 'M5.5 3.5h13v17h-13zM12 9l1.2 2.4 2.6.4-1.9 1.8.4 2.6-2.3-1.2-2.3 1.2.4-2.6-1.9-1.8 2.6-.4z',
  newspaper: 'M3.5 5h17v14.5h-17zM7 9h6.5M7 12.2h10M7 15.4h10M16.5 9H17',
  feather:
    'M19.5 4.5c-5.5 0-10 3.5-12 9l-2.8 5.5 1.3 1.3 5.5-2.8c5.5-2 9-6.5 9-12zM6.5 17.5 17.5 6.5',
  plane: 'M21 4l-8.5 8.5L6 10.5l-2 2 5.5 2.7L12 20.5l2-2-2-6.5z',
  lantern: 'M9.5 3.5h5M12 3.5v2.7M12 6.2c-3 0-4.7 2.8-4.7 6.3s1.7 6.3 4.7 6.3 4.7-2.8 4.7-6.3S15 6.2 12 6.2zM12 6.2v12.6M7.5 12.5h9M9.5 20.5h5',
  ruler: 'M3 16.8 16.8 3 21 7.2 7.2 21zM7.5 12.5l2 2M10.5 9.5l2 2M13.5 6.5l2 2',
  bulb: 'M12 3.5a5.8 5.8 0 0 0-3.4 10.5c.8.6 1.1 1.3 1.1 2h4.6c0-.7.3-1.4 1.1-2A5.8 5.8 0 0 0 12 3.5zM9.7 18.5h4.6M10.5 21h3',
  moon: 'M20 13.5A8 8 0 1 1 10.5 4a6.8 6.8 0 0 0 9.5 9.5z',
  bolt: 'M13 2.5 5 13.5h5l-2 8 9-11.5h-5z',
  rocket:
    'M12 2.5c2.8 2 4.6 5.6 4.6 9.4l2.9 2.9-3.7 1-1.9-1.9c-1.1.5-2.7.5-3.8 0l-1.9 1.9-3.7-1 2.9-2.9c0-3.8 1.8-7.4 4.6-9.4zM12 9m-1.4 0a1.4 1.4 0 1 0 2.8 0a1.4 1.4 0 1 0-2.8 0M9.5 18.5 8.5 22M14.5 18.5l1 3.5',
  signal: 'M8.5 2.5h7v19h-7zM12 6.3m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M12 12m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0M12 17.7m-1.5 0a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0',
  question:
    'M8.8 9a3.2 3.2 0 1 1 4.9 2.7c-.9.6-1.6 1.1-1.6 2.5M12 18.2v.2',
  controller:
    'M3.5 12.5a4.5 4.5 0 0 1 4.5-4.5h8a4.5 4.5 0 1 1-1.5 8.7L12 15.5l-2.5 1.2A4.5 4.5 0 0 1 3.5 12.5zM8 10.5v4M6 12.5h4M15.5 11.5h.01M17.8 13.7h.01',
  church: 'M12 2.5v4M10 4.5h4M6 21V11.5l6-4.3 6 4.3V21M4.5 21h15M10.5 21v-3.8a1.5 1.5 0 0 1 3 0V21',
  mic: 'M9.5 3.5h5v8a2.5 2.5 0 0 1-5 0zM6 11.5a6 6 0 0 0 12 0M12 17.5V21M9 21h6',
  clock: 'M12 12m-8.5 0a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0M12 6.8V12l3.4 2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  check: 'M4.5 12.5 9.8 17.8 19.5 6.8',
  print: 'M7 8V3.5h10V8M5 8h14v8h-3.5M8.5 13h7v7.5h-7zM5 16h3.5',
  masks: 'M4 5c2.5-1 5-1 7 0v7a3.5 3.5 0 0 1-7 0zM13 8c2-1 4.5-1 7 0v7a3.5 3.5 0 0 1-7 0zM6 8.5h.01M9 8.5h.01M15.5 11.5h.01M18.5 11.5h.01',
}

// Icons drawn filled rather than stroked.
const FILLED = new Set(['flame', 'star', 'sparkle', 'bolt', 'plane'])

export function Icon({ name, size = 20, className = '', label }) {
  const d = P[name] || P.sparkle
  const filled = FILLED.has(P[name] ? name : 'sparkle')
  return (
    <svg
      className={`lq-icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={d} />
    </svg>
  )
}

// Legacy glyph strings (stored in data files) mapped to icon names.
const GLYPHS = {
  '🔥': 'flame', '🏛️': 'bank', '📅': 'calendar', '🗓️': 'calendar', '🎯': 'target',
  '🎁': 'gift', '🧭': 'compass', '🕵️': 'search', '🔍': 'search', '📖': 'book',
  '📚': 'book', '📔': 'book', '🧩': 'puzzle', '⚔️': 'shield', '🏙️': 'city',
  '🏢': 'city', '🏨': 'city', '🎵': 'music', '🎶': 'music', '🖼️': 'frame',
  '🎭': 'masks', '🏅': 'medal', '🏆': 'trophy', '🎓': 'cap', '📊': 'chart',
  '📈': 'chart', '🛠️': 'wrench', '📥': 'download', '👤': 'user', '⚙️': 'gear',
  '🔊': 'speaker', '🎧': 'speaker', '🔇': 'speakerOff', '⭐': 'star', '✦': 'star',
  '🌟': 'sparkle', '🎉': 'sparkle', '✨': 'sparkle', '🕊️': 'sparkle', '🏺': 'vase',
  '🔒': 'lock', '🗺️': 'map', '📜': 'scroll', '📷': 'camera', '🃏': 'card',
  '🗞️': 'newspaper', '📰': 'newspaper', '✒️': 'feather', '🖋️': 'feather',
  '✈️': 'plane', '🏮': 'lantern', '🪔': 'lantern', '🕯️': 'flame', '📐': 'ruler',
  '💡': 'bulb', '🌑': 'moon', '⚡': 'bolt', '🚀': 'rocket', '🚦': 'signal',
  '❔': 'question', '🎮': 'controller', '⛪': 'church', '🎙️': 'mic', '🕰️': 'clock',
  '🏫': 'bank', '🧵': 'sparkle', '🧪': 'bulb', '🪶': 'feather', '🎬': 'frame',
  '🕐': 'clock', '🖨️': 'print', '🔬': 'search',
}

export function GameIcon({ glyph, size = 20, className = '', label }) {
  return <Icon name={GLYPHS[glyph] || 'sparkle'} size={size} className={className} label={label} />
}

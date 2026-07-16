// Professor Sankofa's face — an original SVG character: a warm, wild-haired
// Black physicist with round gold spectacles and a lab coat, holding the
// Chrono-Compass. Drawn inline so it works offline and scales crisply.

export default function MascotFace({ size = 52 }) {
  return (
    <svg
      className="mascot-face"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Professor Sankofa"
    >
      <defs>
        <radialGradient id="msk-bg" cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#3b2a63" />
          <stop offset="100%" stopColor="#181126" />
        </radialGradient>
      </defs>
      {/* backdrop */}
      <circle cx="50" cy="50" r="48" fill="url(#msk-bg)" stroke="#e9b949" strokeWidth="2.5" />

      {/* wild gray hair — the genius silhouette */}
      <g fill="#d8d4d0">
        <circle cx="24" cy="34" r="11" />
        <circle cx="34" cy="24" r="12" />
        <circle cx="50" cy="20" r="13" />
        <circle cx="66" cy="24" r="12" />
        <circle cx="76" cy="34" r="11" />
        <circle cx="20" cy="46" r="8" />
        <circle cx="80" cy="46" r="8" />
      </g>

      {/* face */}
      <ellipse cx="50" cy="52" rx="24" ry="26" fill="#8a5a3b" />
      {/* ears */}
      <circle cx="25" cy="54" r="5" fill="#8a5a3b" />
      <circle cx="75" cy="54" r="5" fill="#8a5a3b" />

      {/* round gold spectacles */}
      <g stroke="#e9b949" strokeWidth="2.6" fill="rgba(246,212,124,0.12)">
        <circle cx="40" cy="50" r="8.5" />
        <circle cx="60" cy="50" r="8.5" />
        <line x1="48.5" y1="50" x2="51.5" y2="50" />
      </g>
      {/* eyes — bright and kind */}
      <circle cx="40" cy="50" r="3" fill="#1d1420" />
      <circle cx="60" cy="50" r="3" fill="#1d1420" />
      <circle cx="41.2" cy="48.8" r="1" fill="#fff" />
      <circle cx="61.2" cy="48.8" r="1" fill="#fff" />
      {/* brows peeking above the frames */}
      <path d="M32 41 q8 -5 15 -1" stroke="#d8d4d0" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M53 40 q8 -4 15 1" stroke="#d8d4d0" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* nose */}
      <path d="M50 54 q-3 6 1 8" stroke="#6e4426" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* the famous mustache + warm smile */}
      <path d="M38 67 q12 8 24 0 q-6 7 -12 7 q-6 0 -12 -7" fill="#d8d4d0" />
      <path d="M43 73 q7 4 14 0" stroke="#4a2c16" strokeWidth="2.2" fill="none" strokeLinecap="round" />

      {/* lab-coat collar + gold bowtie */}
      <path d="M28 88 l14 -10 8 6 8 -6 14 10 z" fill="#efeae2" />
      <path d="M46 82 l4 -3 4 3 -4 3 z" fill="#e9b949" />
    </svg>
  )
}

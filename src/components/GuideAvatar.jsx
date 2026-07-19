// Rosa Parks companion avatar — a real archival photograph, following the
// app's established real-art pattern (see data/photos.js). Falls back to her
// initials if the image can't load, so offline play still works.

import { useState } from 'react'
import { photoUrl, photoAlt } from '../data/photos.js'

export default function GuideAvatar({ size = 54 }) {
  const [failed, setFailed] = useState(false)
  const src = photoUrl('rosa-parks')

  if (!src || failed) {
    return (
      <div className="guide-avatar guide-avatar-fallback" style={{ width: size, height: size }}>
        RP
      </div>
    )
  }

  return (
    <img
      className="guide-avatar"
      src={src}
      alt={photoAlt('rosa-parks')}
      title={photoAlt('rosa-parks')}
      style={{ width: size, height: size }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

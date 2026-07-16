// Real historical photographs — all public domain (pre-1930 portraits and U.S.
// government works), served from Wikimedia Commons. Every use in the app has a
// graceful fallback (initials/emoji) when an image can't load, so offline play
// still works. To make photos fully offline, download these files into
// public/photos/<id>.jpg and set LOCAL = true.

const LOCAL = false

const COMMONS = (file) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=560`

export const PHOTOS = {
  'harriet-tubman': {
    file: 'Harriet Tubman by Squyer, NPG, c1885.jpg',
    alt: 'Photographic portrait of Harriet Tubman, circa 1885',
    credit: 'Squyer studio, c. 1885 — public domain',
  },
  'frederick-douglass': {
    file: 'Frederick Douglass (circa 1879).jpg',
    alt: 'Photographic portrait of Frederick Douglass, circa 1879',
    credit: 'George K. Warren, c. 1879 — public domain (U.S. National Archives)',
  },
  'katherine-johnson': {
    file: 'Katherine Johnson 1983.jpg',
    alt: 'NASA portrait of mathematician Katherine Johnson, 1983',
    credit: 'NASA, 1983 — public domain',
  },
  'madam-cj-walker': {
    file: 'Madam CJ Walker face circa 1914.jpg',
    alt: 'Photographic portrait of Madam C. J. Walker, circa 1914',
    credit: 'Scurlock Studio, c. 1914 — public domain',
  },
  'ida-b-wells': {
    file: 'Mary Garrity - Ida B. Wells-Barnett - Google Art Project.jpg',
    alt: 'Photographic portrait of Ida B. Wells, circa 1893',
    credit: 'Mary Garrity, c. 1893 — public domain',
  },
}

export function photoUrl(id) {
  const p = PHOTOS[id]
  if (!p) return null
  return LOCAL ? `photos/${id}.jpg` : COMMONS(p.file)
}

export function photoAlt(id) {
  return PHOTOS[id]?.alt ?? ''
}

export function photoCredit(id) {
  return PHOTOS[id]?.credit ?? ''
}

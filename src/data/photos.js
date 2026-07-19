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

  // Era artwork — real period photographs shown on era cards. Any that fail to
  // load simply hide, leaving the standard card design.
  'era-reconstruction': {
    file: 'Hiram Rhodes Revels - Brady-Handy.jpg',
    alt: 'Portrait of Senator Hiram Revels, the first Black U.S. Senator',
    credit: 'Brady-Handy studio — public domain (Library of Congress)',
  },
  'era-harlem-renaissance': {
    file: 'Duke Ellington - publicity.JPG',
    alt: 'Publicity photograph of Duke Ellington',
    credit: 'Publicity photograph — public domain',
  },
  'era-wwii': {
    file: 'Tuskegee airmen 2.jpg',
    alt: 'Tuskegee Airmen during World War II',
    credit: 'U.S. Army Air Forces — public domain',
  },
  'era-civil-rights': {
    file: 'Civil Rights March on Washington, D.C. (Aerial view of Washington Monument showing marchers) - NARA - 542045.jpg',
    alt: 'Aerial view of the 1963 March on Washington',
    credit: 'U.S. Information Agency — public domain (National Archives)',
  },
  'era-space-age': {
    file: 'Katherine Johnson at NASA, in 1966.jpg',
    alt: 'Katherine Johnson at her desk at NASA in 1966',
    credit: 'NASA, 1966 — public domain',
  },
  'era-ancient-africa': {
    file: 'Sankore Moske Timbuktu.jpg',
    alt: 'The Sankoré Mosque and center of learning in Timbuktu, Mali',
    credit: 'Historic photograph of the Sankoré complex — public domain',
  },
  'era-slave-trade': {
    file: 'Olaudah Equiano.jpg',
    alt: 'Portrait engraving of Olaudah Equiano, from his 1789 narrative',
    credit: 'Frontispiece portrait, 1789 — public domain',
  },
  // Reused portraits: both mentors are directly tied to these eras, and using
  // an already-verified figure avoids guessing at unverified event-photo
  // filenames for sensitive history (the Tulsa Race Massacre in particular).
  'era-great-migration': {
    file: 'Mary Garrity - Ida B. Wells-Barnett - Google Art Project.jpg',
    alt: 'Photographic portrait of Ida B. Wells, circa 1893',
    credit: 'Mary Garrity, c. 1893 — public domain',
  },
  'era-black-wall-street': {
    file: 'Madam CJ Walker face circa 1914.jpg',
    alt: 'Photographic portrait of Madam C. J. Walker, circa 1914',
    credit: 'Scurlock Studio, c. 1914 — public domain',
  },
  'era-modern-innovators': {
    file: 'Mae C. Jemison.jpg',
    alt: 'NASA portrait of astronaut Dr. Mae Jemison',
    credit: 'NASA — public domain',
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

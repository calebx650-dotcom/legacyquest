// Historical eras the Legacy Keeper can travel to, in chronological order.
// `unlockCost` is in Legacy Points. The first era is free; later eras unlock as
// the player earns points, tracing the timeline from antiquity to Afrofuturism.
//
// All descriptions are grounded in verified history. Dates are inclusive ranges
// used for orientation, not hard bounds.

export const ERAS = [
  {
    id: 'ancient-africa',
    name: 'Ancient African Civilizations',
    years: 'c. 3000 BCE–1500 CE',
    unlockCost: 30,
    accent: '#e0a93b',
    tagline: 'Empires, universities, and libraries that shaped the world.',
    summary:
      'From Kemet (ancient Egypt) and the Kingdom of Kush to Mali under Mansa Musa and the scholarly city of Timbuktu with its Sankoré university and manuscript libraries, Africa was home to powerful states, trade networks, and centers of learning.',
    figures: [],
  },
  {
    id: 'slave-trade',
    name: 'The Transatlantic Slave Trade',
    years: '1500s–1800s',
    unlockCost: 40,
    accent: '#8a5a3b',
    tagline: 'Survival, resistance, and the fight for freedom.',
    summary:
      'Over roughly four centuries, millions of Africans were forcibly transported across the Atlantic. Amid this brutality, people preserved culture, resisted, and rebelled — from maroon communities to figures like Olaudah Equiano, whose 1789 narrative fueled the abolition movement.',
    figures: [],
  },
  {
    id: 'reconstruction',
    name: 'Reconstruction',
    years: '1865–1877',
    unlockCost: 0,
    accent: '#e05a3b',
    tagline: 'A nation remade — and the first Black members of Congress.',
    summary:
      'After the Civil War and the Thirteenth Amendment, formerly enslaved people built schools, churches, and political power. Hiram Revels became the first Black U.S. Senator in 1870, and roughly 2,000 Black men held public office before the era was rolled back.',
    figures: ['hiram-revels', 'frederick-douglass'],
  },
  {
    id: 'black-wall-street',
    name: 'Black Wall Street (Greenwood)',
    years: '1906–1921',
    unlockCost: 70,
    accent: '#c9761f',
    tagline: 'A self-made district of Black prosperity.',
    summary:
      'The Greenwood district of Tulsa, Oklahoma, grew into one of the wealthiest Black communities in America, with its own businesses, schools, and newspapers — until a white mob destroyed it in the 1921 Tulsa Race Massacre. Its people rebuilt.',
    figures: [],
  },
  {
    id: 'harlem-renaissance',
    name: 'Harlem Renaissance',
    years: '1918–1937',
    unlockCost: 90,
    accent: '#f4b942',
    tagline: 'A flowering of literature, art, and jazz in upper Manhattan.',
    summary:
      'Centered in Harlem, New York, this cultural movement gave the world Langston Hughes, Zora Neale Hurston, Duke Ellington, and the music of the Cotton Club and Savoy Ballroom. It reshaped American art and asserted a proud, modern Black identity.',
    figures: ['langston-hughes', 'zora-neale-hurston'],
  },
  {
    id: 'great-migration',
    name: 'The Great Migration',
    years: '1916–1970',
    unlockCost: 120,
    accent: '#2ea36b',
    tagline: 'Six million people in search of freedom and opportunity.',
    summary:
      'Roughly six million Black Americans left the rural South for cities in the North, Midwest, and West, reshaping places like Chicago’s Bronzeville and building new communities, newspapers, and industries away from Jim Crow.',
    figures: ['ida-b-wells'],
  },
  {
    id: 'wwii',
    name: 'World War II & the Home Front',
    years: '1939–1945',
    unlockCost: 150,
    accent: '#5a7d5a',
    tagline: 'Fighting for democracy abroad and at home.',
    summary:
      'Black Americans served with distinction — the Tuskegee Airmen, the 761st Tank Battalion — while the “Double V” campaign demanded victory over fascism abroad and racism at home, setting the stage for the Civil Rights Movement.',
    figures: [],
  },
  {
    id: 'civil-rights',
    name: 'Civil Rights Movement',
    years: '1954–1968',
    unlockCost: 190,
    accent: '#4a7dd6',
    tagline: 'Nonviolent resistance that changed the law of the land.',
    summary:
      'From the Montgomery Bus Boycott (1955–56) to the March on Washington (1963) and the Voting Rights Act (1965), organizers won landmark victories against segregation through boycotts, marches, and legal challenges.',
    figures: ['rosa-parks', 'martin-luther-king', 'john-lewis'],
  },
  {
    id: 'space-age',
    name: 'The Space Age',
    years: '1958–1972',
    unlockCost: 230,
    accent: '#9b6dd6',
    tagline: 'Hidden figures who put humans in orbit and on the Moon.',
    summary:
      'At NASA, mathematicians like Katherine Johnson calculated the trajectories for the first American in space and John Glenn’s orbital flight, while a generation of Black scientists and engineers powered the era of human spaceflight.',
    figures: ['katherine-johnson'],
  },
  {
    id: 'modern-innovators',
    name: 'Modern Innovators',
    years: '1970–present',
    unlockCost: 280,
    accent: '#3bb0c9',
    tagline: 'Pioneers in science, tech, medicine, and the arts.',
    summary:
      'From Dr. Mark Dean’s foundational personal-computer work and Dr. Patricia Bath’s laser cataract surgery to Mae Jemison in space and a generation of founders, artists, and Nobel laureates, Black innovators continue to shape the modern world.',
    figures: [],
  },
  {
    id: 'afrofuturism',
    name: 'Afrofuturism',
    years: 'Ongoing',
    unlockCost: 340,
    accent: '#b06dd6',
    tagline: 'Imagining Black futures across art, music, and science.',
    summary:
      'A cultural movement spanning the cosmic jazz of Sun Ra, the science fiction of Octavia Butler, the sound of George Clinton and Janelle Monáe, and beyond — Afrofuturism reimagines history and technology to envision liberated Black futures.',
    figures: [],
  },
]

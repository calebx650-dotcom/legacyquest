// Per-era metadata for Defend the Timeline: a short "why it mattered" passage
// shown on the result screen (win or lose — the history doesn't require a
// perfect score to be worth reading), and the artifact awarded on a player's
// first win for that era. Wiring first-win rewards here also gives every
// artifact in the Museum a real, reachable unlock path.

export const ERA_SIGNIFICANCE = {
  'ancient-africa': 'Centuries before European colonization, Mali and Kush were centers of trade, scholarship, and governance — a reminder that African history did not begin with slavery, and Timbuktu’s libraries preserved knowledge Europe would not rival for generations.',
  'slave-trade': 'Even under the transatlantic slave trade’s brutality, people organized, preserved culture, and resisted — Equiano’s published narrative helped turn abolition from a fringe cause into a mass movement in Britain and beyond.',
  reconstruction: 'For a brief window after the Civil War, formerly enslaved people held real political power — nearly 2,000 held office. Studying how that progress was rolled back is as important as studying how it was won.',
  'black-wall-street': 'Greenwood proved a self-sufficient Black economy could thrive under Jim Crow — and its destruction in 1921 shows how fragile that progress was against organized violence the law did nothing to stop.',
  'harlem-renaissance': 'Harlem in the 1920s asserted that Black art, thought, and identity belonged at the center of American culture, not its margins — a claim that reshaped literature, music, and how the nation saw itself.',
  'great-migration': 'Six million people relocating over five decades reshaped the entire map of Black America — the cities, music, and political power built during the Great Migration still define the country today.',
  wwii: 'Black soldiers fought a war for freedoms they were denied at home, and came back organized, decorated, and unwilling to accept the old order — the Double V campaign is a direct throughline to the Civil Rights Movement.',
  'civil-rights': 'The movement won its victories through sustained, unglamorous organizing — carpools, mass meetings, legal strategy — proving that durable change is built by many hands, not granted by a few famous ones.',
  'space-age': 'Katherine Johnson’s calculations put America in orbit while she was, by law, treated as a second-class citizen — a contradiction that shows why crediting the people behind the achievement is not optional.',
  'modern-innovators': 'From Bath’s laser surgery to Jemison in orbit, this era shows the same drive for discovery continuing unbroken — history is not a closed chapter, it is still being written by people alive today.',
  afrofuturism: 'Afrofuturism insists that imagining the future is also a form of remembering — reclaiming a past that was erased means also claiming the right to picture what comes next.',
}

export const ERA_DEFEND_ARTIFACT = {
  'ancient-africa': 'manuscript-timbuktu',
  'slave-trade': 'letter-equiano',
  'black-wall-street': 'front-page-tulsa',
  wwii: 'badge-tuskegee',
  'space-age': 'card-johnson',
  'civil-rights': 'speech-dream',
}

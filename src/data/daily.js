// Daily Legacy — a rotating pool of quick daily challenges. The app picks one
// deterministically from the calendar date (so everyone sees the same challenge
// on the same day) and tracks a streak. Each item bundles a surprising fact and
// a "guess the source" quote question.

export const DAILY_POOL = [
  {
    id: 'd1',
    fact: 'Dr. Charles Drew pioneered techniques for storing blood plasma and organized the first large-scale blood banks during World War II — work that has saved countless lives.',
    quotePrompt: 'Who said: “The way to right wrongs is to turn the light of truth upon them.”?',
    options: ['Ida B. Wells', 'Harriet Tubman', 'Rosa Parks', 'Sojourner Truth'],
    answer: 'Ida B. Wells',
  },
  {
    id: 'd2',
    fact: 'Shirley Chisholm became the first Black woman elected to the U.S. Congress in 1968 and, in 1972, the first to seek a major party’s nomination for President.',
    quotePrompt: 'Who declared: “I am not the catch of the century, but I am unbought and unbossed.”?',
    options: ['Shirley Chisholm', 'Fannie Lou Hamer', 'Angela Davis', 'Barbara Jordan'],
    answer: 'Shirley Chisholm',
  },
  {
    id: 'd3',
    fact: 'Benjamin Banneker, a self-taught astronomer and mathematician, helped survey the boundaries of what became Washington, D.C., in 1791 and published widely used almanacs.',
    quotePrompt: 'Who wrote: “Of all the forms of inequality, injustice in health is the most shocking and inhuman.”?',
    options: ['Martin Luther King Jr.', 'Frederick Douglass', 'W.E.B. Du Bois', 'Malcolm X'],
    answer: 'Martin Luther King Jr.',
  },
  {
    id: 'd4',
    fact: 'The 761st Tank Battalion, an all-Black unit nicknamed the “Black Panthers,” fought for 183 days across Europe in World War II and was awarded a Presidential Unit Citation.',
    quotePrompt: 'Who said: “If they don’t give you a seat at the table, bring a folding chair.”?',
    options: ['Shirley Chisholm', 'Rosa Parks', 'Coretta Scott King', 'Mary McLeod Bethune'],
    answer: 'Shirley Chisholm',
  },
  {
    id: 'd5',
    fact: 'Bessie Coleman became the first African American woman to earn a pilot’s license in 1921 — traveling to France to train because U.S. schools would not admit her.',
    quotePrompt: 'Who is credited with: “The air is the only place free from prejudice.”?',
    options: ['Bessie Coleman', 'Mae Jemison', 'Katherine Johnson', 'Harriet Tubman'],
    answer: 'Bessie Coleman',
  },
  {
    id: 'd6',
    fact: 'Mae Jemison became the first Black woman to travel to space aboard the Space Shuttle Endeavour in 1992. She is also a physician and engineer.',
    quotePrompt: 'Who said: “Never be limited by other people’s limited imaginations.”?',
    options: ['Mae Jemison', 'Katherine Johnson', 'Bessie Coleman', 'Dorothy Vaughan'],
    answer: 'Mae Jemison',
  },
  {
    id: 'd7',
    fact: 'Thurgood Marshall argued Brown v. Board of Education before the Supreme Court in 1954 and, in 1967, became the first Black Justice of that Court.',
    quotePrompt: 'Who observed: “In recognizing the humanity of our fellow beings, we pay ourselves the highest tribute.”?',
    options: ['Thurgood Marshall', 'Frederick Douglass', 'Barack Obama', 'W.E.B. Du Bois'],
    answer: 'Thurgood Marshall',
  },
]

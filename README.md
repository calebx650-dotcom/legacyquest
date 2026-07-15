# LegacyQuest 🔥

**Don't just learn Black history — live it.**

LegacyQuest is an educational adventure game that blends a **mystery game, RPG,
city builder, puzzles, and daily challenges** into one experience. A mysterious
force called **The Eraser** is making Black history disappear from the timeline.
You are a **Legacy Keeper**: travel through eras, solve mysteries, recruit
historical mentors, rebuild lost communities, and preserve everything you
recover in your personal **Legacy Museum**.

Every mission is built from **verified historical sources** — the gameplay is
fictional, but the history is accurate.

> This repository is a **playable prototype** built with React + Vite. It runs
> entirely in the browser with no backend and saves progress to `localStorage`,
> so it also works offline (a core goal for classrooms with limited internet).

---

## What's in the prototype

### First 5 minutes
- 🎬 **Cinematic onboarding** — a short comic-panel intro where history begins to
  vanish, you're named a Legacy Keeper, **Harriet Tubman** guides your first
  mission, and you **unlock your first artifact in ~2 minutes**.

### Game modes
| Mode | What you do |
|---|---|
| 🏛️ **Keeper's Hall** | Dashboard, progress, recommended missions, and **This Day in Black History** with a daily bonus |
| 📅 **Daily Legacy** | A daily fact + "identify the quote" challenge with a streak that unlocks exclusive artifacts |
| 🎯 **Quests** | Auto-claiming **daily and weekly quests** for XP and Legacy Points |
| 🧭 **Eras** | Travel a timeline from **Ancient African Civilizations → Afrofuturism** (11 eras); spend points to restore each |
| 🕵️ **History Mysteries** | Collect clues, interview figures, and reach a verdict on real events |
| 🧩 **Puzzle Lab** | Match inventors to inventions, order milestones, and decode an Underground Railroad message |
| ⚔️ **Mentors (Legacy RPG)** | Recruit figures like Harriet Tubman and Katherine Johnson — each grants an ability |
| 🏙️ **Community Builder** | Rebuild Greenwood ("Black Wall Street"), recovering a true story per building |
| 🎵 **Culture Journey** | Black music from spirituals to hip-hop and how each met its moment |
| 🖼️ **Legacy Museum** | Gallery of recovered artifacts with **rarity** (common/rare/legendary) and **collection completion %** |
| 🏅 **Progression** | **XP, levels, achievement badges, and titles** ("Master Detective", "Legacy Scholar", …) |
| 🏆 **Leaderboards & Seasons** | Weekly mystery competitions, monthly artifact hunts, and a school-wide challenge |
| 🎓 **Teacher Mode** | Class progress dashboard, quiz reports, assignment creation, and **printable worksheets** |

### Systems
- **Progression:** Legacy Points (unlock content) + XP/levels (mastery), with a
  satisfying "one more level" curve.
- **Difficulty tiers:** Explorer (kids) · Scholar (standard) · Historian
  (challenging) · Legacy Keeper (expert). These change hint/clue availability
  and XP rewards **without changing the history**.
- **Audio:** an original, **generated** (royalty-free) Web Audio engine — gentle
  era themes whose mood shifts by era, plus SFX for unlocks, puzzles, and
  level-ups. Fully mutable.
- **Accessibility:** text-to-speech (read-aloud), dyslexia-friendly font,
  adjustable text size, high-contrast mode, colorblind-friendly status colors,
  and caption options — all in Settings.

---

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev      # start the dev server (Vite prints a local URL)
```

Production build & preview:

```bash
npm run build
npm run preview
```

The `dist/` build is fully static and can be hosted anywhere or opened offline.

---

## Project structure

```
src/
  data/         Verified content: eras, mentors, mysteries, puzzles,
                collectibles, community, culture, daily, quests, titles,
                achievements, onboarding, thisday (This Day in Black History)
  game/         progression (XP/level/difficulty math) + selectors
  audio/        engine.js — generative Web Audio music + SFX
  state/        GameContext — reducer + localStorage persistence
  components/   Layout, Onboarding, ComicPanel, SettingsPanel, GameSystems
                (achievements/quests/level-ups/accessibility), Speak (TTS)
  views/        One file per screen
```

All game state lives in `src/state/GameContext.jsx`; points, XP, quests,
achievements, and collectibles are awarded centrally in the reducer.

---

## Historical accuracy

Content is grounded in the historical record. The framing story (The Eraser,
Legacy Keepers) is fictional, but names, dates, quotations, inventions, and
events are drawn from verified history. The Teacher Mode roster and the
leaderboard competitors are clearly labeled **sample data** (there is no
backend); your own stats are real. Corrections and sourcing are welcome via
issues or pull requests.

## Roadmap (from the full concept)

Beyond this prototype: fully voiced figures and cinematic cutscenes, licensed
music clips, real multiplayer (co-op mysteries, trivia tournaments, museum
visits, artifact trading), optional augmented reality, a live backend for real
classroom leaderboards and teacher accounts, and continual expansion toward the
long-term vision of 50+ eras, 500+ mysteries, and thousands of artifacts.

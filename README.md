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

> This repository is a **playable prototype / vertical slice** of the concept,
> built with React + Vite. It runs entirely in the browser with no backend, and
> saves progress to `localStorage` — so it also works offline (a core goal for
> classrooms with limited internet).

---

## Features in this prototype

| Mode | What you do |
|---|---|
| 🏛️ **Keeper's Hall** | Dashboard of your progress and recommended next missions |
| 📅 **Daily Legacy** | A daily fact + "identify the quote" challenge with a streak system that unlocks exclusive artifacts |
| 🧭 **Eras** | Travel the timeline (Reconstruction → the Space Age); spend Legacy Points to restore each era |
| 🕵️ **History Mysteries** | Collect clues, interview figures, and reach a verdict on real events (Montgomery Bus Boycott, the Underground Railroad, and more) |
| 🧩 **Puzzle Lab** | Match inventors to inventions, order civil-rights milestones, and decode an Underground Railroad message |
| ⚔️ **Mentors (Legacy RPG)** | Recruit figures like Harriet Tubman and Katherine Johnson as mentors — each grants an ability |
| 🏙️ **Community Builder** | Rebuild Greenwood ("Black Wall Street"), recovering a true story with each building |
| 🎵 **Culture Journey** | Follow Black music from spirituals to hip-hop and how each sound met its moment |
| 🖼️ **Legacy Museum** | A gallery of every document, patent, photograph, recording, and mentor card you recover |

**Progression** is by **Legacy Points** (not levels), earned from missions and
spent to unlock eras, mentors, and community buildings.

---

## Running locally

Requires Node.js 18+.

```bash
npm install
npm run dev      # start the dev server (Vite prints a local URL)
```

To create a production build and preview it:

```bash
npm run build
npm run preview
```

The build in `dist/` is fully static and can be hosted anywhere (or opened
offline).

---

## Project structure

```
src/
  data/         Verified historical content (eras, mentors, mysteries,
                puzzles, collectibles, community, culture, daily)
  state/        GameContext — reducer + localStorage persistence
  components/   Layout (sidebar/topbar) and small UI helpers
  views/        One file per game mode
```

All game state lives in `src/state/GameContext.jsx`; points and collectibles are
awarded centrally in the reducer so views stay simple.

---

## Historical accuracy

Content is grounded in the historical record. The framing story (The Eraser,
Legacy Keepers) is fictional, but names, dates, quotations, inventions, and
events are drawn from verified history. Corrections and additional sourcing are
welcome via issues or pull requests.

## Roadmap (from the full concept)

Not yet in the prototype but part of the LegacyQuest vision: fully voiced
figures and cinematic cutscenes, licensed music clips, multiplayer co-op
mysteries and trivia tournaments, museum visits and artifact trading, optional
augmented reality, and teacher/parent tools (assignable missions, progress
tracking, discussion questions, offline classroom mode).

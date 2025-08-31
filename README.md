# Sports Standings App

## Technologies used

- Vite, React, Typescript
- Tailwind CSS
- Zustand for state managment

Check out the live demo on [GitHub Pages](https://imantasprecas.github.io/sports-standings-app/)

---

## Features

- Add teams/players for each tournament
- Input match results and auto-update standings
- Prevent duplicate matches
- Persistent data (local storage)
- Responsive, mobile-friendly design
- Three tournament modes: Premier League, Eurobasket, Wimbledon

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
git clone https://github.com/ImantasPrecas/sports-standings-app.git
cd sports-standings-app
npm install
npm run dev
```

### Folder Structure

Give a quick overview of your project organization.

```markdown
## Folder Structure

src/
assets # App Assets
components/ # React components
hooks/ # Custom hooks
interfaces/ # TypeScript interfaces
lib/ # Utility functions
store/ # Zustand stores
App.tsx # Main app component
main.tsx # Entry point
```

---

## Task Instuctions

### Goal

Build a **Single Page Application (SPA)** to manage sports tournaments. There should be three
tables: Premier League, Eurobasket, Wimbledon. Users can add teams/players, input match results,
and view a dynamically updated standings table.

---

### Requirements

#### Functionality

- Users can **add teams/players** (start at 0 points).
- Each team/player can play **only once** against any other.
- **Scoring system:**
  - Win: 3 pts
  - Draw: 1 pt
  - Loss: 0 pts
- **Standings table** auto-updates and sorts by points.
- Table shows: Matches Played (P/M), Wins (W), Draws (D), Losses (L), Points (Pts)
- **Data must persist** after refresh.
- Use **React** or **React + Redux**.
- Must follow **SPA principles**.
- Frequent commits. Host code on **GitHub**.

---

### Designs

#### 1.Clean & Minimal

- Layout: 3 columns – Add Team, Add Score, Standings Table
- Style: Neutral colors (white, gray, blue), modern sans-serif (Inter, Roboto)

#### 2. Sporty & Energetic

- Layout: 3 columns – Add buttons, Match Results, Standings
- Style: Bold colors (green/orange), athletic fonts (Montserrat, Bebas Neue), flag icons

#### 3. Table-Centric

- Layout: 2 columns – Add buttons, Standings
- Style: Cool neutrals, monospace font (Space Mono), icons for win/loss

All designs must be **responsive** and support **auto-scroll** if many teams.

### Bonus

- Typescript
- Mobile-first design
- Modular component stricture

### Submission

- Deploy the app (e.g. GitHub Pages, Vercel, Netlify).
- Share the **GitHub repo** with setup instructions.

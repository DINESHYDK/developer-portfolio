# Coding Stats Dashboard - Architecture Guide

## 📁 Folder Structure

```
src/components/sections/dashboard/
 ┣ coding-stats-section.tsx    # Main wrapper with hover cards & overview
 ┣ platform-selector.tsx       # Apple-style animated segmented control
 ┗ platforms/                  # Strategy Pattern - platform-specific views
   ┣ leetcode-view.tsx         # Recharts circular donut chart
   ┣ codechef-view.tsx         # Star rating view
   ┣ codeforces-view.tsx       # Contest-focused view
   ┗ geeksforgeeks-view.tsx    # Streak/score view
```

## ✨ Key Features

### 1. **Hover Card (Desktop Only)**
- Hover over "Problems Solved" card to see platform-by-platform breakdown
- Uses Framer Motion spring physics for smooth reveal
- **Not a modal** — stays non-intrusive

### 2. **Apple-Style Segmented Control**
- Sliding background pill animation with `layoutId="activePlatformPill"`
- Smooth spring transition (stiffness: 380, damping: 30)
- Color-coded per platform
- **Mobile (< md)**: Native select dropdown with custom styling and color-coded chevron
- **Desktop (≥ md)**: Horizontal segmented control with sliding pill animation

### 3. **Strategy Pattern Component Registry**
- **O(1) lookup** for platform views
- No giant switch/if-else statements
- Defined in `coding-stats-section.tsx`:

```typescript
const PLATFORM_COMPONENTS = {
  leetcode: LeetCodeView,
  codechef: CodeChefView,
  codeforces: CodeforcesView,
  geeksforgeeks: GeeksforGeeksView,
  // Add new platforms here
};
```

### 4. **Platform-Specific Views**
- Each platform has its own unique layout optimized for its data
- **LeetCode**: Recharts circular donut chart (Easy/Medium/Hard distribution) + contest rating + global ranking
- **Codeforces**: Recharts Bar Chart visualizing problem index distribution (A, B, C, D+) + current/max rating + rank badge
- **CodeChef**: Bento-box grid layout with large rating card, star display, division badge, certificates, and max streak
- **GeeksforGeeks**: Gamified UI with massive glowing POTD streak counter, coding score, institute rank progress bar to #1

## 🚀 How to Add a New Platform (e.g., HackerRank)

### Platform-Specific Data Requirements

Each platform uses different fields from the `CodingPlatform` interface:

**LeetCode:**
- `rating`, `globalRanking`, `contestsAttended`
- `breakdown` array: `{ label, solved, total, color }`

**Codeforces:**
- `rating`, `rank`, `maxRating`, `contestsAttended`
- `indexDistribution` array: `{ index, count, color }` for A, B, C, D+ problems

**CodeChef:**
- `rating`, `division`, `stars`, `totalSolved`, `contestsAttended`
- `maxStreak`, `certificates` array

**GeeksforGeeks:**
- `codingScore`, `potdStreak`, `instituteRank`, `totalSolved`, `contestsAttended`

### Step 1: Add data to `src/data/coding-stats.ts`

```typescript
{
  id: "hackerrank",
  name: "HackerRank",
  username: "dineshydk",
  profileUrl: "https://www.hackerrank.com/dineshydk",
  accentColor: "#00EA64",
  totalSolved: 120,
  totalProblems: 500,
  rating: 2500,
  rank: "Gold",
  contestsAttended: 5,
  breakdown: [
    { label: "Easy", solved: 80, total: 200, color: "#52C41A" },
    { label: "Medium", solved: 30, total: 200, color: "#FAAD14" },
    { label: "Hard", solved: 10, total: 100, color: "#F5222D" },
  ],
}
```

### Step 2: Create view component `hackerrank-view.tsx`

```typescript
import type { CodingPlatform } from "@/types";

interface HackerRankViewProps {
  platform: CodingPlatform;
}

const HackerRankView = ({ platform }: HackerRankViewProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Your custom layout here */}
    </div>
  );
};

export default HackerRankView;
```

### Step 3: Register in `PLATFORM_COMPONENTS`

In `coding-stats-section.tsx`:

```typescript
import HackerRankView from "./platforms/hackerrank-view";

const PLATFORM_COMPONENTS = {
  leetcode: LeetCodeView,
  codechef: CodeChefView,
  codeforces: CodeforcesView,
  geeksforgeeks: GeeksforGeeksView,
  hackerrank: HackerRankView, // ✅ Add here
};
```

**That's it!** The UI will automatically:
- Add the platform to the segmented control
- Include it in the hover card breakdown
- Render your custom view when selected

## 🎨 Design Tokens

- **Border Radius**: All cards use `rounded-3xl` (Apple-like)
- **Spacing**: 8pt grid (p-4, p-6, p-8, gap-4, gap-8)
- **Colors**: Platform accent colors from `CODING_STATS.platforms[].accentColor`
- **Typography**: Poppins (headings), Plus Jakarta Sans (body), Fira Code (mono)

## 🧪 Backend Integration

When you connect to real APIs:

1. Update `src/services/coding-stats-service.ts` with actual fetch calls
2. The component already handles async state with `currentPlatform` lookup
3. Form follows the NoSQL document structure — ready for MongoDB

---

**Zero changes needed in JSX when adding platforms — just data + view component!**


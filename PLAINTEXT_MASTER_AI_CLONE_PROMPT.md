# 🌾 PLAINTEXT / PLAINSYT — 100% REPLICA MASTER AI SYSTEM PROMPT
> **Use this prompt with any advanced AI (Claude 3.7 Sonnet, GPT-4o, Gemini 2.0 Pro, Cursor, Bolt, Lovable, v0) to build an exact 100% clone of the Plainsyt Agri-Tech Media & Community Platform.**

---

```markdown
You are an elite principal frontend engineer and UI/UX designer. Your objective is to build a 100% pixel-perfect, fully functional, and ultra-responsive replica of **Plainsyt** (প্লেইনসাইট) — an elite modern agriculture, biotechnology, precision farming, and agri-tech digital media & community platform for Bangladesh.

Plainsyt merges high-end editorial newsprint typography with a modern tactile Facebook-style social community interface. It features a dual-mode responsive layout: a balanced 3-column desktop layout (Left Sidebar + Centered Feed + Right Sidebar) and an ultra-mobile-friendly interface modeled precisely after Facebook Mobile (mobile icon tab bar, "What's on your mind?" input, story reel carousel with "+ Create story", and social post cards with live preview dialog).

---

## 1. TECH STACK & ARCHITECTURE

- **Framework**: React 18/19 with TypeScript & Vite
- **Styling**: Tailwind CSS v4 with custom theme tokens & CSS-based tactile block shadows
- **Icons**: `lucide-react`
- **Fonts**:
  - Editorial Serif Display: `Fraunces` (Google Font)
  - UI Sans (Bengali & English): `Hind Siliguri` + `Inter`
  - Monospace (Metadata, citations, timestamps): `JetBrains Mono`
- **State Management**: React `useState` & `useMemo` with decoupled pure logic functions in `utils/pureLogic.ts`.

---

## 2. DESIGN SYSTEM & DESIGN TOKENS

### Color Palette:
```css
/* Custom Tailwind Theme Tokens */
--color-pine-950: #021a11;
--color-pine-900: #04301f; /* Primary Brand Dark Pine */
--color-pine-800: #09472e;
--color-pine-700: #0f5e3e;
--color-pine-600: #17754f;
--color-pine-500: #218f62;
--color-pine-400: #38b17e;
--color-pine-200: #bbf0d8;
--color-pine-100: #e2f5ec;
--color-pine-50:  #f0faf5;

/* Canvas & Backgrounds */
--color-canvas:        #fdfaf5; /* Warm creamy paper background */
--color-canvas-card:   #ffffff;
--color-canvas-subtle: #f5f1e8;
--color-canvas-border: #e6dfd1;
```

### Tactile 3D Block Shadows:
Plainsyt uses hard, brutalist/tactile block drop-shadows matching its retro-modern editorial identity:
```css
.shadow-tactile-xs { box-shadow: 1.5px 1.5px 0px #04301f; }
.shadow-tactile-sm { box-shadow: 2px 2px 0px #04301f; }
.shadow-tactile    { box-shadow: 3px 3px 0px #04301f; }
.shadow-tactile-lg { box-shadow: 4px 4px 0px #04301f; }

.shadow-tactile-hover:hover {
  transform: translate(-1.5px, -1.5px);
  box-shadow: 4px 4px 0px #04301f;
}
.shadow-tactile-hover:active {
  transform: translate(1px, 1px);
  box-shadow: 1.5px 1.5px 0px #04301f;
}
```

### Mobile Global Rules:
```css
html, body {
  overflow-x: hidden;
  max-width: 100vw;
  -webkit-tap-highlight-color: transparent;
  background-color: #FDFAF5;
  color: #04301F;
}
```

---

## 3. FILE AND FOLDER STRUCTURE

```
plainsyt/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── pureLogic.ts
│   ├── data/
│   │   └── mockData.ts
│   └── components/
│       ├── PlainsytLogo.tsx
│       ├── Header.tsx
│       ├── LeftSidebar.tsx
│       ├── CentralFeed.tsx
│       ├── RightSidebar.tsx
│       ├── PostCreatorBar.tsx
│       ├── TopicStoriesCarousel.tsx
│       ├── CommunityPostCard.tsx
│       ├── IntegratedReelCard.tsx
│       ├── FacebookCreatePostModal.tsx
│       ├── AskAIModal.tsx
│       ├── ArticleReaderModal.tsx
│       ├── ReelPlayerModal.tsx
│       ├── SavedArticlesModal.tsx
│       ├── CreatePostModal.tsx
│       ├── ImageGraphic.tsx
│       └── Footer.tsx
```

---

## 4. TYPE DEFINITIONS (`src/types/index.ts`)

```typescript
export type ArticleCategory = 
  | 'সকল'
  | 'শস্য ও কৃষিবিজ্ঞান'
  | 'এগ্রি-টেক ও ড্রোন'
  | 'গবেষণা সহজ ভাষায়'
  | 'খাদ্য ও কোল্ড চেইন'
  | 'জলবায়ু ও স্থায়িত্ব'
  | 'স্টার্টআপ ও উদ্ভাবন'
  | 'মৎস্য ও প্রাণিসম্পদ';

export type FeedFilter = 'trending' | 'latest' | 'research' | 'field-stories';

export interface Comment {
  id: string;
  author: string;
  avatar: string;
  role: string;
  text: string;
  timestamp: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  category: ArticleCategory;
  categoryEn: string;
  imageType: 'drone' | 'lab' | 'solar' | 'floating' | 'biotech' | 'sensor' | 'water' | 'fisheries';
  author: {
    name: string;
    designation: string;
    organization: string;
    avatar: string;
  };
  publishedAt: string;
  readTimeMinutes: number;
  featured?: boolean;
  content: string[];
  takeaways: string[];
  researchBasis?: {
    journalOrInst: string;
    doiOrSource: string;
    keyMetric: string;
  };
  stats: {
    views: number;
    likes: number;
    commentsCount: number;
    shares: number;
  };
  comments: Comment[];
  userLiked?: boolean;
  userBookmarked?: boolean;
}

export interface StoryReel {
  id: string;
  title: string;
  creator: string;
  creatorAvatar: string;
  location: string;
  duration: string;
  views: number;
  gradientTheme: string;
  videoType: 'soil-ph' | 'drone-tips' | 'solar-onion' | 'hydroponic-berry' | 'greenhouse-iot';
  likes: number;
}

export interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    isVerified?: boolean;
  };
  timestamp: string;
  content: string;
  images?: string[];
  sharedPost?: {
    authorName: string;
    authorAvatar: string;
    timestamp: string;
    text: string;
  };
  stats: {
    likes: number;
    commentsCount: number;
    shares: number;
  };
  reactionsSummary?: string;
  comments: Comment[];
  userLiked?: boolean;
  userSaved?: boolean;
}

export interface TopicStory {
  id: string;
  title: string;
  category: ArticleCategory;
  imageUrl: string;
  iconName: 'drone' | 'seedling' | 'climate' | 'food' | 'rural' | 'policy' | 'soil' | 'tech';
  readsCount?: string;
  authorName?: string;
  authorAvatar?: string;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  dateMonth: string;
  dateDay: string;
  location: string;
  attendeesCount: string;
  isRegistered?: boolean;
}

export interface TrendingRankedItem {
  id: string;
  rank: string;
  title: string;
  reads: string;
  comments: number;
  imageUrl: string;
  category: ArticleCategory;
}

export interface FeaturedScientist {
  id: string;
  name: string;
  role: string;
  organization: string;
  focusArea: string;
  publicationsCount: number;
  isFollowing?: boolean;
}

export interface ResearchPaper {
  id: string;
  institution: string;
  institutionCode: 'BAU' | 'BRRI' | 'BARI' | 'SAU';
  title: string;
  summary: string;
  practicalImpact: string;
  publishedDate: string;
  researchers: string[];
}
```

---

## 5. PURE LOGIC UTILITIES (`src/utils/pureLogic.ts`)

```typescript
export const toBengaliNumerals = (num: number | string): string => {
  const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num
    .toString()
    .split('')
    .map((char) => {
      const parsed = parseInt(char, 10);
      return !isNaN(parsed) ? bengaliDigits[parsed] : char;
    })
    .join('');
};

export const formatBengaliNumberCompact = (num: number): string => {
  if (num >= 1000000) {
    return `${toBengaliNumerals((num / 1000000).toFixed(1))}M`;
  }
  if (num >= 1000) {
    return `${toBengaliNumerals((num / 1000).toFixed(1))}k`;
  }
  return toBengaliNumerals(num);
};

export const toggleBookmarkId = (existingIds: string[], targetId: string): string[] => {
  return existingIds.includes(targetId)
    ? existingIds.filter((id) => id !== targetId)
    : [...existingIds, targetId];
};

export const toggleArticleReaction = (article: Article): Article => {
  const nextUserLiked = !article.userLiked;
  const nextLikesCount = nextUserLiked ? article.stats.likes + 1 : Math.max(0, article.stats.likes - 1);

  return {
    ...article,
    userLiked: nextUserLiked,
    stats: {
      ...article.stats,
      likes: nextLikesCount,
    },
  };
};

export const appendArticleComment = (article: Article, newComment: Comment): Article => {
  return {
    ...article,
    comments: [newComment, ...article.comments],
    stats: {
      ...article.stats,
      commentsCount: article.stats.commentsCount + 1,
    },
  };
};
```

---

## 6. COMPONENT SPECIFICATIONS

### 1. `Header.tsx`:
- **Desktop 3-Column Symmetrical Layout**:
  - Left column (`w-60 lg:w-72`): Plainsyt Logo + compact circular search button (`rounded-full p-2.5`). Clicking it or pressing `⌘ K` opens a popover search input with quick clear `✕`.
  - Center column (`flex-1 max-w-[620px] lg:max-w-[640px] xl:max-w-[660px] mx-auto`): Navbar tabs (`Home`, `Explore`, `Events`, `Store`, `Ideas`) positioned in the **EXACT horizontal middle** of the header, matching the width of the central feed. Active tab features an emerald-700 underline pill.
  - Right column (`w-60 lg:w-72`): Sun/Moon theme toggle, Bookmark drawer button (with badge counter), Bell notification button (with red badge `3` and dropdown popover of recent research alerts), and User Profile avatar with green online status dot.
- **Mobile Facebook Icon Nav Bar** (visible `< md` directly below header):
  - 6 full-width touch tabs:
    - `Home` (with bottom active green indicator)
    - `Explore`
    - `Reels (Video)` with red `15+` pill badge
    - `Events`
    - `Notifications` with red `3` badge
    - `Profile` avatar with green active status dot
  - Strictly no live-calling or messaging options.

### 2. `LeftSidebar.tsx`:
- Sits on the left (`w-60 xl:w-72`, hidden on mobile, visible on desktop).
- Features:
  - User profile shortcut card with green online dot.
  - Quick navigation shortcuts: নিউজফিড ও পোস্ট, ভিডিও রিলস ও মাঠের দৃশ্য (with `15+` badge), সংরক্ষিত তালিকা (with saved count badge), and Plainsyt AI কৃষি সহকারী (with `24/7` badge).
  - OpenAlex 6 Strategic Agriculture Pillars (Agri-Tech & Drones, Crops & Agronomy, Research Explained, Climate & Salinity, Food Cold Chain, Startups & IoT).
  - Institutional Research Network tiles: BRRI, BAU, BARI, SAU.
  - Editorial policy & ethics link.

### 3. `PostCreatorBar.tsx`:
- Located at top of central feed.
- User avatar with green online dot.
- Rounded input pill button: `"What's on your mind, {userName}?"` + green photo icon. Clicking this triggers `onOpenCreatePost` (the Facebook Create Post Modal).
- Clean action buttons below: `Write Article`, `Create Post`, `Upload Video`, `Ask AI`. (No "Live Event" option).

### 4. `TopicStoriesCarousel.tsx`:
- Responsive horizontal carousel:
  - **Desktop**: Left and right chevron hover buttons to scroll smoothly. Cards display agricultural category cover, category icon, title, and reads count.
  - **Mobile (Facebook-style)**:
    - First card is `+ Create Story`: user photo at top, prominent circular `+` button, and "Create Story" label.
    - Subsequent cards: 9:16 vertical ratio, circular author avatar at top-left with emerald border ring, and topic name at bottom with dark gradient scrim.

### 5. `CentralFeed.tsx`:
- Width matches navbar buttons: `max-w-[620px] lg:max-w-[640px] xl:max-w-[660px] mx-auto w-full`.
- Clean, continuous social feed stream with NO category filters and NO feed mode tabs (`For You`/`Following` removed).
- Items in Stream:
  1. `PostCreatorBar`
  2. `TopicStoriesCarousel`
  3. **Lead Story Hero Article**: Visual header graphic, category pill, reading time, headline in editorial serif, author byline, like counter, bookmark, and inline comment form.
  4. **Community Post 1**: Mehedi Hasan IoT field visit with 3-photo grid and `+3` badge.
  5. **In-Feed Integrated Reel Card**: Dr. Nusrat Jahan vertical video card with play overlay, floating like/bookmark/share counters, and follow toggle.
  6. **Community Post 2**: AL Amin Nur quote post quoting A.S.M Anas Ferdous in a nested shared-box.
  7. **Institutional Research Discovery Card**: IRCB (International Research Collaboration Bangladesh) verified card with "Open Call & Guidelines" action button.
  8. **Subsequent Articles & Community Posts**.

### 6. `CommunityPostCard.tsx`:
- Author avatar with green online dot, verified badge, timestamp, and globe icon `🌐`.
- Formatted post content with expandable "See more".
- Optional shared post quote box.
- Optional 3-photo grid layout with `+3` overlay.
- Reaction summary: `❤️👍😮 Sijan Rahman and 86 others`.
- 3-segment action bar: `👍 Like`, `💬 Comment`, `↗ Share`.
- Expandable inline comments stream and instant submission form.

### 7. `FacebookCreatePostModal.tsx`:
- Dark Facebook aesthetic (`bg-[#242526] text-[#E4E6EB]`) with 2-column desktop layout:
  - **Left Column (Editor)**:
    - User avatar, name ("Hasan Zubair"), audience selector (`Public 🌐`).
    - Tag pills: `People`, `Feeling/activity`, `Location`, `Collaborator`.
    - Textarea with `Aa` colorful gradient theme switcher and quick agro emoji bar (`🌱`, `🌾`, `🚜`, `🔬`, `💡`).
    - Dashed media upload dropzone with 4 preset field photo thumbnails.
    - Share Settings: `Add AI label` toggle, `Share to story` toggle.
    - Bottom schedule button + active `Post` button.
  - **Right Column (Live Preview)**:
    - Real-time rendering of the post as typed: displays avatar, name, "Just now • 🌐", styled gradient text or plain text, attached image preview, and like/comment/share footer.
  - Submitting prepends the new post immediately to the active community feed.

### 8. `AskAIModal.tsx`:
- Intelligent agricultural AI advisor answering in Bengali on soil salinity, biochar, drone spraying, rice blast, and soil pH. Includes suggested prompt pills and typing simulator.

### 9. `RightSidebar.tsx`:
- Sits on the right (`w-72 xl:w-80`, hidden `< xl`, visible on desktop).
- Features:
  - **Trending Now (01–05)**: Ranked list with index, headline, reads, comment count, and thumbnail.
  - **Upcoming Events**: Date badge (`DEC 12`), event title, location, and one-click `Register` / `Registered ✓` toggle.
  - **Who to Follow**: Featured agricultural scientists with toggleable `Follow` / `Following` buttons.

---

## 7. MOCK DATA HIGHLIGHTS (`src/data/mockData.ts`)

Must include realistic Bengali agricultural content:
1. `INITIAL_ARTICLES`:
   - "হাওরের আগাম বন্যা ও ব্রি-১০২: জিংকসমৃদ্ধ ধানের নতুন বিপ্লব" (BRRI-102 Zinc biofortified rice).
   - "মাটির পুষ্টি ও ড্রোন সেন্সিং: নাইট্রোজেনের অপচয় রোধে ১৮% সাশ্রয়".
   - "সৌরচালিত কোল্ড চেম্বার: পাবনার পেঁয়াজ চাষিদের পোস্ট-হার্ভেস্ট বিপ্লব".
2. `COMMUNITY_POSTS`:
   - Mehedi Hasan: IoT Soil Moisture project in Mymensingh with 3 field photos.
   - AL Amin Nur: Quoting A.S.M Anas Ferdous on career potential in agricultural engineering.
   - Dr. Nusrat Jahan: Coastal saline soil biochar & Trichoderma microbiome results.
3. `STORY_REELS`:
   - Dr. Nusrat Jahan: "The Science Behind Healthier Soil" (vertical video).
   - Rajib: "৩ মিনিটে মাটির পিএইচ (pH) মাপার সহজ পদ্ধতি".
4. `UPCOMING_EVENTS`:
   - AgriTech Innovation Summit 2026 (Dhaka).
   - Sustainable Farming & Drone Workshop (Online).

---

## 8. STEP-BY-STEP IMPLEMENTATION MANDATE

1. Setup Tailwind v4 with all tokens and tactile block shadow utilities in `src/index.css`.
2. Configure Google Fonts (`Fraunces`, `Hind Siliguri`, `Inter`, `JetBrains Mono`) in `index.html`.
3. Create `src/types/index.ts` with all interfaces.
4. Create `src/utils/pureLogic.ts` with Bengali numerals and immutable state helpers.
5. Populate `src/data/mockData.ts` with authentic Bengali agri-tech data.
6. Build all 14 components strictly respecting the responsive layout:
   - Header with exact middle navigation tabs & compact circular search.
   - Left Sidebar with Facebook-style shortcuts & OpenAlex pillars.
   - Central Feed constrained to match navbar width with no filter tabs.
   - Right Sidebar with 01-05 Trending & Events.
   - FacebookCreatePostModal with live preview and share settings.
   - PostCreatorBar with no live event button.
7. Verify with `npx tsc --noEmit` (0 errors) and `npm run build` (clean Vite bundle).
```

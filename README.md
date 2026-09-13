<div align="center">

# 🗄️ Prompt Vault

### *Save What Inspires You — The Ultimate Neo-Brutalist Sanctuary for AI Prompts, Workflows & Skills*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-1ECC62?style=for-the-badge&logo=vercel&logoColor=002D0F)](https://prompt-vault-by-harsh.vercel.app/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

<br />

<p align="center">
  <a href="https://prompt-vault-by-harsh.vercel.app/">
    <img src="./public/Thumbnail.png" alt="Prompt Vault Preview Banner" width="100%" style="border-radius: 16px; border: 2px solid #002D0F;" />
  </a>
</p>

<p align="center">
  <strong>Prompt Vault</strong> is an editorial Neo-Brutalist web application crafted for developers, creators, and AI practitioners. It provides a seamless, unified sanctuary to curate, search, organize, copy, and export high-impact AI prompts, web bookmarks, and agentic <code>skills.md</code> workflows.
</p>

[**Explore Live Demo ↗**](https://prompt-vault-by-harsh.vercel.app/) • [**Report Bug**](https://github.com/panduthegang/Prompt-Vault/issues) • [**Request Feature**](https://github.com/panduthegang/Prompt-Vault/issues)

</div>

---

## ✨ Core Highlights & Features

### 🗃️ Vault Library (`/vault`)
- **Multi-Type Artifact Management**: Organize items across **AI Prompts**, **Agent Skill Rules** (`skill.md`), and **Website Documentation Bookmarks**.
- **Instant Client-Side Markdown Export (`Download .md`)**: One-click download button on Skill cards that converts prompt rules into clean `.md` files with sanitized kebab-case slugs (`<title>.md`).
- **Universal Community Publishing**: Toggle any prompt, skill, or website link to community status (`isPublished`) with active Vault Green badges and pulsing **`Live`** status indicators.
- **Sleek 3-Dots Action Menu (`•••`)**: Decluttered card action trays featuring primary actions (`Download .md`, `Copy`) alongside a floating Neo-Brutalist menu housing Publish, Edit, and Delete actions with auto-dismiss on outside click or Escape.
- **Real-time Search & Category Filtering**: Instant debounced full-text search across titles, instructions, and target tools, with pill filters for 9 categories.
- **1-Click Copy with Dynamic Toast Feedback**: Copy prompts or website URLs instantly with animated top-center toast notifications featuring hover-to-pause and timeout indicators.

### 🛡️ Admin Category Masters & Governance (`/admin/masters`)
- **Centralized Taxonomy Management**: Admins can manage, create, and refine categories across **Prompts**, **Skills**, and **Websites**.
- **Dual View Modes**: Seamless toggle between responsive Neo-Brutalist **Card Grid** and dense **Table View**.
- **Live Metrics Dashboard**: Real-time KPI summary tracking category counts per domain with instant one-click filtering.
- **Interactive Create & Edit Modal Sheet**: Physics-based draggable bottom sheet on mobile and centered modal on desktop with smooth touch gestures.
- **Protected Category Deletion**: Safe deletion workflow with confirmation dialog and scrollbar compensation to eliminate layout jumps.

### ⚡ Pure Skeleton Shimmer Loading (Zero Spinners)
- **Eliminated Spinners**: Replaced generic loading spinners with bespoke Neo-Brutalist skeleton shimmer cards (`VaultSkeletonCard`, `CommunitySkeletonCard`, `AdminMastersSkeletonCard`).
- **KPI Metrics Shimmer**: Integrated `AdminMastersStatsSkeleton` preserving 4-card metric dimensions during loading without layout shift.
- **Pure CSS Shimmer**: Smooth `animate-pulse` animations using custom palette tokens (`bg-vault-dark/15`, `bg-vault-cream/20`).

### 📱 Responsive Mobile Gestures & Viewport Safeguards
- **Draggable Mobile Bottom Sheets**: On mobile viewports (`< 768px`), all dialogs adapt into smooth, gesture-driven bottom sheets with dedicated grab handles, spring physics (`damping: 28, stiffness: 300`), and swipe-down dismissal via `useDragControls`.
- **Zero Scrollbar Jumps**: Dynamic scrollbar-width compensation applied to body overflow locks prevents sticky sidebars from shifting when dialogs open.
- **Single-Line Invariance Across Viewports**: Enforced `whitespace-nowrap shrink-0` across buttons, icons, and timestamps to eliminate awkward word-wrapping on narrow mobile screens.
- **Flexbox Compression Protection**: Form toggle switches use `shrink-0` and `min-w-0 flex-1` label containers, preventing pill distortion across all device aspect ratios.
- **Contextual Mobile Floating Dock**: Quick-access bottom dock with navigation buttons and role-aware admin controls.

### 🧩 Clean Modular Architecture (Responsibility-Based Splitting)
- **Domain-Decoupled Component Folders**:
  - `Users-Page/`: User domain modules (`Dashboard-Page/`, `Vault-Page/`, `Community-Page/`, `Settings-Page/`).
  - `Admin-Pages/`: Admin domain modules (`Admin-Dashboard/`, `Admin-Users/`, `Admin-Masters/`).
  - `Landing-Page/`: Landing page sections, benchmarks, and CSS module.
  - `Prompts-Page/`: Public curated catalog, terminal prompt cards, and locked teaser states.
  - `Legal/`: Shared presentational legal components rendering `/privacy` and `/terms` with exact design parity.
- **Ultra-Clean Page Orchestrators**: Pages are grouped into `Admin-Pages/`, `Auth-Pages/`, `Static-Pages/`, and `User-Pages/` as lightweight orchestrators (~40–250 lines).

### 🎨 Neo-Brutalist Design System
- **Signature Aesthetics**: 2px high-contrast solid borders (`border-vault-dark`), bold drop shadows, rounded pill containers (`rounded-full`, `rounded-[28px]`), and curated color palettes (`#F1F78C` Vault Yellow, `#F8F9E9` Vault Cream, `#1ECC62` Vault Green, `#002D0F` Forest Dark).
- **Impactful Typography**: Google Fonts **Instrument Serif** for editorial headlines and **Manrope** for crisp, readable UI text and code blocks.
- **Two-Tone Expanding Buttons**: Layered primary CTA pill buttons with tucked overlap capsules (`-ml-6` to `-ml-7`, `pl-7` to `pl-8`) and spring physics.

---

## 🎨 Design System Tokens

| Token | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| `--color-vault-yellow` | `#F1F78C` | Hero highlights, active tab badges, tooltip tags, accent buttons |
| `--color-vault-cream` | `#F8F9E9` | Global canvas background, card body surfaces, navigation background |
| `--color-vault-green` | `#1ECC62` | Primary brand CTA buttons, active state indicators, scrollbar thumb, stat highlights |
| `--color-vault-dark` | `#002D0F` | Deep forest green for borders, primary text, wordmark, and footer surface |
| `--color-vault-darker` | `#012F12` | Darker capsule tone used in expanding button hover states |

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Animations & Gestures**: [Framer Motion](https://www.framer.com/motion/) (Spring physics, draggable controls, bottom sheets)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Typography**: [Google Fonts](https://fonts.google.com/) (*Instrument Serif* & *Manrope*)
- **Backend & Auth**: [Supabase](https://supabase.com/) (Email/Password Auth, RLS-secured Profiles, Role triggers)
- **Analytics & Hosting**: [Vercel](https://vercel.com/) with SPA rewrite configuration (`vercel.json`)

---

## 📁 Project Architecture

```
Prompt-Vault/
├── public/
│   ├── avatars/                          # Preset user avatar SVGs (avatar-1.svg … avatar-5.svg)
│   ├── Hero.png                          # Visual photo artwork for landing page Hero
│   ├── Thumbnail.png                     # Full-resolution OpenGraph preview banner
│   └── Thumbnail.jpg                     # Compressed OpenGraph thumbnail
├── supabase/
│   └── schema.sql                        # Single-pass clean schema (profiles table, RLS, triggers)
├── src/
│   ├── lib/
│   │   ├── supabase.ts                   # Supabase client singleton (createClient)
│   │   └── avatars.ts                    # PRESET_AVATARS static reference array
│   ├── types/
│   │   └── auth.ts                       # Profile, Role, AuthContextType TypeScript interfaces
│   ├── context/
│   │   └── AuthContext.tsx               # Global auth context: session, user, profile, refreshProfile()
│   ├── services/
│   │   └── profileService.ts             # updateProfile(), updatePassword() — Supabase mutations
│   ├── components/
│   │   ├── Landing-Page/                 # Landing page domain components & vanilla CSS
│   │   │   ├── landingData.ts            # Centralized TypeScript models, constants & datasets
│   │   │   ├── Landing.module.css        # Vanilla CSS module with clear section headers
│   │   │   ├── Hero.tsx                  # Hero section with 2-tone expanding CTA
│   │   │   ├── Stats.tsx                 # 4-column metric statistics bar
│   │   │   ├── Process.tsx               # "Our Process" 12-column grid section
│   │   │   ├── Comparison.tsx            # "Chaos in Notion vs. Order in the Vault"
│   │   │   └── FAQ.tsx                   # Interactive FAQ accordion with animated eye
│   │   ├── Users-Page/                   # Authenticated user domain components
│   │   │   ├── Dashboard-Page/           # Dashboard domain components
│   │   │   │   ├── dashboardData.ts      # PromptItem, CommunityItem types & mock datasets
│   │   │   │   ├── DashboardHeader.tsx   # Welcome greeting, notifications & avatar button
│   │   │   │   ├── DashboardStats.tsx    # 4 KPI metric cards (Total, Published, Links, Skills)
│   │   │   │   ├── DashboardPrompts.tsx  # Saved prompts gallery with category pill filters
│   │   │   │   └── DashboardCommunityTable.tsx # Community published snapshots table
│   │   │   ├── Vault-Page/               # Vault Library modular components
│   │   │   │   ├── vaultData.ts          # VaultItem, VaultItemType models, presets & localStorage helpers
│   │   │   │   ├── VaultHeader.tsx       # Title ("Vault Library"), count badge & "+ Add to Vault" button
│   │   │   │   ├── VaultFilters.tsx      # 5 filter tabs (all, prompt, skill, website, starred), search & pills
│   │   │   │   ├── VaultCard.tsx         # Responsive card with header badges, code preview, action tray & menu
│   │   │   │   ├── VaultSkeletonCard.tsx # Animated Neo-Brutalist skeleton shimmer card
│   │   │   │   ├── VaultModalSheet.tsx   # Desktop centered modal + mobile draggable bottom sheet
│   │   │   │   └── VaultDeleteDialog.tsx # Neo-Brutalist confirmation modal with scrollbar jump lock
│   │   │   ├── Community-Page/           # Community Vault modular components
│   │   │   │   ├── communityData.ts      # CommunityItem, CommunityTab types, tabs & master datasets
│   │   │   │   ├── CommunityHeader.tsx   # Yellow top banner with live status badge & template counter
│   │   │   │   ├── CommunityFilters.tsx  # Tab pills (all, prompt, skill, website, my-shares) & search bar
│   │   │   │   ├── CommunityCard.tsx     # Single template card with like, copy, clone & inspect actions
│   │   │   │   ├── CommunitySkeletonCard.tsx # Animated Neo-Brutalist skeleton shimmer card
│   │   │   │   ├── CommunityModalSheet.tsx # Mobile draggable bottom sheet + desktop centered modal
│   │   │   │   └── CommunityStates.tsx   # Error with retry, blank search state & End-of-Vault milestone
│   │   │   └── Settings-Page/            # Settings domain components
│   │   │       ├── SettingsHeader.tsx    # Title, @username live badge & section tab switcher
│   │   │       ├── SettingsProfileSection.tsx # Profile display card & interactive edit form (Supabase-backed)
│   │   │       └── SettingsSecuritySection.tsx # Password reset form with eye toggles, validation & Supabase update
│   │   ├── Prompts-Page/                 # Public Prompts gallery domain components & CSS
│   │   │   ├── promptsData.ts            # Prompts catalog, model badge styles & metrics
│   │   │   ├── Prompts.module.css        # Vanilla CSS module with zero @apply
│   │   │   ├── PromptHero.tsx            # Header & catalog introduction
│   │   │   ├── PromptsGrid.tsx           # Responsive prompts cards grid layout
│   │   │   ├── PromptCard.tsx            # Terminal-style code card with 1-click copy
│   │   │   └── PromptsCurveLock.tsx      # Locked vault blur teaser with unlock CTA
│   │   ├── Legal/                        # Shared presentational legal components & vanilla CSS
│   │   │   ├── privacyData.ts            # PrivacyPolicy clause data models & principles
│   │   │   ├── termsData.ts              # Terms & Conditions clause data models & metrics
│   │   │   ├── Legal.module.css          # Shared vanilla CSS module with zero @apply
│   │   │   ├── LegalSubHeader.tsx        # Breadcrumbs & document switcher
│   │   │   ├── LegalHero.tsx             # Title, lead narrative & creator meta card
│   │   │   ├── LegalPillars.tsx          # 4 Core Pillars / Guarantees matrix
│   │   │   ├── LegalContent.tsx          # 2-column sidebar navigation & section accordions
│   │   │   ├── LegalSectionCard.tsx      # Interactive expandable policy drawer with animated eye
│   │   │   ├── LegalSidebar.tsx          # Quick Index table of contents & creator card
│   │   │   └── LegalCTA.tsx              # Bottom community banner with expanding pill buttons
│   │   ├── Admin-Pages/                  # Admin domain components
│   │   │   ├── Admin-Dashboard/          # Admin Dashboard modular components & datasets
│   │   │   │   ├── adminDashboardData.ts # AdminUserItem, TopPromptLeaderboardItem, velocity & category datasets
│   │   │   │   ├── AdminDashboardHeader.tsx # Title, subtitle & profile avatar trigger
│   │   │   │   ├── AdminDashboardStats.tsx  # 4 KPI metric cards (Total Creators, Clones, Registry, Health)
│   │   │   │   ├── AdminDashboardVelocity.tsx # Daily velocity bar chart & category distribution breakdown
│   │   │   │   ├── AdminDashboardLeaderboard.tsx # Top Cloned Community Templates real-time leaderboard
│   │   │   │   ├── AdminDashboardCreatorsTable.tsx # Platform Creators directory table with search & filter
│   │   │   │   └── index.ts              # Barrel exports
│   │   │   ├── Admin-Users/              # Admin Creator Directory modular components & datasets
│   │   │   │   ├── adminUsersData.ts     # AdminUser, AdminUsersMetrics, mock datasets & sort options
│   │   │   │   ├── AdminUsersHeader.tsx  # Header with title, author count badge & profile avatar
│   │   │   │   ├── AdminUsersStats.tsx   # 4 content-focused metrics cards (Creators, Clones, Rules, Upvotes)
│   │   │   │   ├── AdminUsersToolbar.tsx # Search input, CustomSelect sort dropdown & view switcher
│   │   │   │   ├── CreatorCard.tsx       # Reusable creator card for mobile and desktop grid
│   │   │   │   ├── AdminUsersTable.tsx   # Desktop creator directory data table
│   │   │   │   ├── AdminUserInspectModal.tsx # View-only inspection modal & mobile bottom sheet
│   │   │   │   └── index.ts              # Barrel exports
│   │   │   └── Admin-Masters/            # Category Masters governance modular components & datasets
│   │   │       ├── adminMastersData.ts   # MasterCategory, MasterItemType, TYPE_CONFIG & storage helpers
│   │   │       ├── AdminMastersHeader.tsx # Header with title, category counter & "+ Add Category"
│   │   │       ├── AdminMastersStats.tsx  # 4 KPI cards (All, Prompts, Skills, Websites)
│   │   │       ├── AdminMastersToolbar.tsx # Type filter tabs, search & view switcher (grid vs. table)
│   │   │       ├── AdminMastersCard.tsx  # Neo-Brutalist category card with action buttons
│   │   │       ├── AdminMastersTable.tsx # Desktop category table view
│   │   │       ├── AdminMasterModalSheet.tsx # Smooth draggable mobile bottom sheet + desktop centered modal
│   │   │       ├── AdminMasterDeleteDialog.tsx # Delete confirmation dialog with scrollbar jump lock
│   │   │       ├── AdminMastersSkeletonCard.tsx # Skeleton card + AdminMastersStatsSkeleton suite
│   │   │       └── index.ts              # Barrel exports
│   │   ├── ui/                           # Reusable design system primitives
│   │   │   ├── Select.tsx                # Neo-Brutalist select with in-flow mobile expansion
│   │   │   └── Toast.tsx                 # Floating toast notification system with auto-dismiss
│   │   ├── ProtectedRoute.tsx            # Auth guard: redirects to /signin or renders 404 for role mismatches
│   │   ├── Navbar.tsx                    # Sticky top navigation with mobile drawer
│   │   ├── Sidebar.tsx                   # Collapsible desktop sidebar; admin items first for admin role
│   │   ├── BottomBar.tsx                 # Mobile floating dock & physics-based draggable bottom sheet; admin-aware
│   │   ├── WorkspaceLayout.tsx           # Persistent workspace layout orchestrating Sidebar & BottomBar
│   │   └── Footer.tsx                    # Footer with links, watermark & creator attribution
│   ├── pages/
│   │   ├── Static-Pages/                 # Marketing & legal pages
│   │   │   ├── LandingPage.tsx           # Clean page orchestrator for landing page
│   │   │   ├── NotFound.tsx              # Editorial Neo-Brutalist 404 page
│   │   │   ├── Privacy.tsx               # Clean page orchestrator for Privacy Policy
│   │   │   ├── Prompts.tsx               # Public curated prompt catalog orchestrator
│   │   │   └── Terms.tsx                 # Clean page orchestrator for Terms & Conditions
│   │   ├── Auth-Pages/                   # Auth flows
│   │   │   ├── Signin.tsx                # Neo-Brutalist sign-in; queries profile for role on success → /admin or /dashboard
│   │   │   └── Signup.tsx                # Neo-Brutalist account registration
│   │   ├── Admin-Pages/                  # Role-gated admin pages (requireRole="admin" in ProtectedRoute)
│   │   │   ├── AdminDashboard.tsx        # Admin overview, metrics & velocity
│   │   │   ├── AdminUsers.tsx            # User directory — lists all platform creators
│   │   │   └── AdminMasters.tsx          # Category masters governance — Prompt, Skill & Website taxonomies
│   │   └── User-Pages/                   # Authenticated user workspaces
│   │       ├── Community.tsx             # Clean page orchestrator for Community Vault
│   │       ├── Dashboard.tsx             # Clean workspace dashboard orchestrator
│   │       ├── Settings.tsx              # Settings orchestrator — profile & security, fully Supabase-backed
│   │       └── Vault.tsx                 # Clean page orchestrator for Vault Library
│   ├── utils/
│   │   └── clipboard.ts                  # Clipboard copy helper with browser fallbacks
│   ├── App.tsx                           # Global router, route definitions & AnimatePresence
│   ├── main.tsx                          # React root entry point
│   └── index.css                         # Global CSS, theme tokens & custom scrollbars
├── index.html                            # HTML template with Google Fonts preload
├── vercel.json                           # Vercel SPA routing rewrites
├── package.json                          # Dependencies & NPM scripts
├── vite.config.ts                        # Vite configuration
├── DESIGN.md                             # Design tokens, typography & interaction rules
├── CONTEXT.md                            # Architecture & repository context
└── MEMORY.md                             # Agent memory, decisions & changelog
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (`v18.0` or higher recommended)
- `npm`, `pnpm`, `yarn`, or `bun`

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/panduthegang/Prompt-Vault.git
   cd Prompt-Vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

To test or generate the production bundle:

```bash
npm run build
npm run preview
```

---

## 🚢 Deployment

The project is configured for continuous zero-config deployment on [Vercel](https://vercel.com/):

1. Connect your repository to Vercel.
2. The included [`vercel.json`](file:///c:/Users/Lenovo/Documents/Prompt-Vault/vercel.json) automatically directs all SPA routes to `index.html`.
3. Production builds run `vite build` and serve from the `dist/` directory.

---

## 👨‍💻 Author

Crafted with care by **Harsh Rathod**

- **Portfolio**: [harshrathod-portfolio.vercel.app](https://harshrathod-portfolio.vercel.app/)
- **Live Demo**: [prompt-vault-by-harsh.vercel.app](https://prompt-vault-by-harsh.vercel.app/)
- **GitHub**: [@panduthegang](https://github.com/panduthegang)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

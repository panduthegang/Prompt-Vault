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
  <strong>Prompt Vault</strong> is an editorial Neo-Brutalist web application crafted for developers, creators, and AI practitioners. It provides a seamless, unified sanctuary to curate, search, organize, copy, and export high-impact AI prompts, web bookmarks, and agentic <code>skill.md</code> workflows.
</p>

[**Explore Live Demo ↗**](https://prompt-vault-by-harsh.vercel.app/) • [**Report Bug**](https://github.com/panduthegang/Prompt-Vault/issues) • [**Request Feature**](https://github.com/panduthegang/Prompt-Vault/issues)

</div>

---

## ✨ Core Highlights & Features

### 🗃️ Vault Library (`/vault`)
- **Multi-Type Artifact Management**: Organize items across **AI Prompts**, **Agent Skill Rules** (`skill.md`), and **Website Documentation Bookmarks**.
- **Real-time Search & Multi-Tag Filtering**: Instant debounced full-text search across titles, instructions, categories, and target tools. Filter seamlessly by category (Agent Skills, Frontend, Backend, IDE Rules, AI Docs, DevOps, Reasoning, Marketing).
- **Favorites & Star System**: Quick-toggle star markers to curate and isolate your most vital system prompts.
- **1-Click Copy with Dynamic Toast Feedback**: Copy prompts or website URLs instantly with animated top-center toast notifications featuring hover-to-pause and timeout indicators.

### 📱 Responsive Mobile Gestures & Draggable Sheets
- **Instagram / YouTube-Style Draggable Bottom Sheets**: On mobile viewports (`< 768px`), modal dialogs automatically adapt into smooth, gesture-driven bottom sheets with dedicated grab handle pills, spring physics (`damping: 28, stiffness: 300`), and swipe-down dismissal.
- **Dedicated Drag Controls (`useDragControls`)**: Dragging is bound strictly to the top grab handle thumb, allowing fluid, unlocked momentum scrolling through long forms, code snippets, and action buttons without accidental sheet closures.
- **Zero Double-Scroll Mobile Dropdowns**: Replaced nested scrollbars with in-flow option expansion on mobile screens so all 9 categories and target tool selections are fully visible without scroll collisions.
- **Contextual Mobile Floating Dock**: When browsing `/vault`, the mobile bottom navigation bar dynamically rearranges to: `Dashboard` | `Vault` | `More` | **Wide `+ Add to Vault` Button** (uniform `h-11` height), empowering users to capture new prompts without scrolling back to the top of the page.

### 🎨 Neo-Brutalist Design System
- **Signature Aesthetics**: Defined by 2px high-contrast solid borders (`border-vault-dark`), bold drop shadows, rounded pill containers (`rounded-full`, `rounded-[28px]`), and curated color palettes (`#F1F78C` Vault Yellow, `#F8F9E9` Vault Cream, `#1ECC62` Vault Green, `#002D0F` Forest Dark).
- **Impactful Typography**: Expressive pairings of Google Fonts **Instrument Serif** for dramatic, editorial display headlines and **Manrope** for clean body readability and code-like precision.
- **Bespoke UI Components**: Custom Neo-Brutalist `CustomSelect` dropdown with tool badges (Cursor, Claude 3.7, Antigravity, Windsurf, Copilot) and a custom Neo-Brutalist delete confirmation dialog replacing generic browser alerts.
- **Background Scroll Locking**: Automatic body and document scroll locking during active modal and sheet states, preserving layout stability and hiding exposed scrollbars.

### 📊 Dashboard & Workspace Navigation
- **Workspace Metric Cards**: Instant high-level metrics for total saved prompts, active workflows, curated collections, and community saves.
- **Collapsible Desktop Sidebar & Floating Mobile Dock**: Desktop sidebar supports smooth collapsed icon mode with elevated, non-clipped hover tooltips (`z-50`), expanding drawer sheet for mobile screens, and quick navigation.

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
- **Analytics & Hosting**: [Vercel](https://vercel.com/) with SPA rewrite configuration (`vercel.json`)

---

## 📁 Project Architecture

```
Prompt-Vault/
├── public/
│   ├── avatars/                  # Default user profile avatar SVGs
│   ├── Hero.png                  # Visual artwork panel used in Hero section
│   ├── Thumbnail.png             # Full-resolution OpenGraph social preview banner
│   └── Thumbnail.jpg             # Compressed OpenGraph thumbnail
├── src/
│   ├── components/
│   │   ├── Landing-Page/
│   │   │   ├── Hero.tsx          # Centered editorial hero section with CTAs
│   │   │   ├── Stats.tsx         # 4-column metric statistics showcase
│   │   │   ├── Process.tsx       # 3-column process & interactive feature grid
│   │   │   └── FAQ.tsx           # Accordion FAQ section with interactive eye indicators
│   │   ├── ui/
│   │   │   ├── Select.tsx        # Bespoke Neo-Brutalist select dropdown with in-flow mobile expansion
│   │   │   └── Toast.tsx         # Floating dynamic toast notification system
│   │   ├── Navbar.tsx            # Sticky top navigation with mobile drawer
│   │   ├── Sidebar.tsx           # Collapsible desktop sidebar + contextual mobile bottom dock & sheet
│   │   └── Footer.tsx            # Footer with link grids, watermark & attribution
│   ├── pages/
│   │   ├── LandingPage.tsx       # Marketing landing page orchestrator
│   │   ├── Vault.tsx             # Main Vault library with search, filter, CRUD & bottom sheets
│   │   ├── Dashboard.tsx         # User workspace overview, prompt stats & community feed
│   │   ├── Settings.tsx          # Profile management, password reset & workspace options
│   │   ├── Signin.tsx            # Neo-Brutalist authentication sign-in view
│   │   └── Signup.tsx            # Account registration view
│   ├── utils/
│   │   └── clipboard.ts          # Async clipboard copy helper with fallbacks
│   ├── App.tsx                   # Top-level client router and route definitions
│   ├── main.tsx                  # React DOM entry point
│   └── index.css                 # Tailwind v4 theme variables, custom scrollbars & utilities
├── index.html                    # HTML5 entry with preconnected Google Fonts & meta tags
├── vercel.json                   # Vercel SPA routing rewrites
├── package.json                  # Dependencies, scripts, and build configuration
└── vite.config.ts                # Vite build pipeline and plugin configuration
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

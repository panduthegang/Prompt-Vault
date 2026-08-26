<div align="center">

# 🗄️ Prompt Vault

### *Save What Inspires You — The Ultimate Sanctuary for AI Prompts, Workflows & Skills*

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-1ECC62?style=for-the-badge&logo=vercel&logoColor=002D0F)](https://prompt-vault-by-harsh.vercel.app/)
[![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)

<br />

<p align="center">
  <a href="https://prompt-vault-by-harsh.vercel.app/">
    <img src="./public/Thumbnail.png" alt="Prompt Vault Preview Banner" width="100%" style="border-radius: 16px; border: 2px solid #002D0F;" />
  </a>
</p>

<p align="center">
  <strong>Prompt Vault</strong> is an editorial neo-brutalist web application crafted for developers, creators, and AI practitioners. It provides a seamless, unified sanctuary to save, organize, search, and export high-impact AI prompts, web discovery bookmarks, and custom <code>skill.md</code> workflows.
</p>

[**Explore Live Demo ↗**](https://prompt-vault-by-harsh.vercel.app/) • [**Report Bug**](https://github.com/panduthegang/Prompt-Vault/issues) • [**Request Feature**](https://github.com/panduthegang/Prompt-Vault/issues)

</div>

---

## ✨ Key Features

- 🏛️ **Editorial Neo-Brutalist Aesthetic**: Built with a luxury editorial aesthetic, pairing high-contrast 2px solid borders, curated color palettes (`#F1F78C` Vault Yellow, `#F8F9E9` Vault Cream, `#1ECC62` Vault Green, `#002D0F` Forest Dark), and typography.
- ✒️ **Impactful Typography**: Featuring **Instrument Serif** for dramatic, editorial display headings and **Manrope** for crisp, modern body readability.
- ⚡ **Interactive Hero Viewport**: Center-aligned typography with dynamic spring-eased expanding two-tone CTA buttons and verified creator social proof.
- 📊 **Real-time Statistics Bar**: 4-column metric showcase with highlighted key figures.
- 🔄 **3-Column Process Workflow**: Interactive feature grid showcasing instant 1-click prompt capture, personal vault organization, full-text search, and multi-format exports.
- 👁️ **Interactive FAQ Accordion**: Custom interactive status indicators featuring stylized closed eyelids when collapsed and glowing green open eyes when active.
- 📱 **Fully Responsive Layout**: Mobile-first architecture with collapsible drawer navigation and responsive typography across phones, tablets, and ultra-wide displays.
- 🎛️ **Custom Vault Green Scrollbars**: Bespoke webkit and Firefox scrollbar styling integrated directly into the brand identity.

---

## 🎨 Design System Tokens

| Token | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| `--color-vault-yellow` | `#F1F78C` | Hero left column background, Process & FAQ sections, warm energetic accents |
| `--color-vault-cream` | `#F8F9E9` | Global canvas background, card body surfaces, navigation background |
| `--color-vault-green` | `#1ECC62` | Primary brand CTA buttons, active state indicators, scrollbar thumb, stat highlights |
| `--color-vault-dark` | `#002D0F` | Deep forest green for borders, primary text, wordmark, and footer surface |
| `--color-vault-darker` | `#012F12` | Darker capsule tone used in expanding button hover states |

---

## 🛠️ Technology Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/vite`
- **Iconography**: [Lucide React](https://lucide.dev/)
- **Typography**: Google Fonts ([Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) & [Manrope](https://fonts.google.com/specimen/Manrope))
- **Deployment & Hosting**: [Vercel](https://vercel.com/) with SPA rewrites (`vercel.json`)

---

## 📁 Project Architecture

```
Prompt-Vault/
├── public/
│   ├── Hero.png                  # Visual artwork panel used in Hero section
│   ├── Thumbnail.png             # Full-resolution OpenGraph social preview banner
│   └── Thumbnail.jpg             # Compressed OpenGraph thumbnail
├── src/
│   ├── components/
│   │   ├── Landing-Page/
│   │   │   ├── Hero.tsx          # Centered editorial hero section with CTAs
│   │   │   ├── Stats.tsx         # 4-column metric statistics bar
│   │   │   ├── Process.tsx       # 3-column process & feature container
│   │   │   └── FAQ.tsx           # Accordion FAQ section with interactive eye indicators
│   │   ├── Navbar.tsx            # Sticky top navigation with mobile drawer
│   │   └── Footer.tsx            # Footer with link grids, watermark & attribution
│   ├── pages/
│   │   └── LandingPage.tsx       # Page orchestrator assembling all sections
│   ├── App.tsx                   # App shell mounting Navbar and LandingPage
│   ├── main.tsx                  # React DOM entry point
│   └── index.css                 # Tailwind theme variables & custom scrollbar
├── index.html                    # HTML entry with preconnected Google Fonts & meta tags
├── vercel.json                   # Vercel SPA build & routing configuration
├── package.json                  # Dependencies and scripts
└── vite.config.ts                # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.0` or higher recommended)
- `npm` or `yarn` / `pnpm` / `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/panduthegang/Prompt-Vault.git
   cd Prompt-Vault
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` to view the application.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 🚢 Deployment

This project is configured for one-click deployment on [Vercel](https://vercel.com/):

1. Push your code to your GitHub repository.
2. Import the project in Vercel.
3. The included [`vercel.json`](file:///c:/Users/Lenovo/Documents/Prompt-Vault/vercel.json) will automatically handle the build commands (`npm run build`), output directory (`dist`), and single-page application (SPA) rewrites.

---

## 👨‍💻 Author

Crafted with care by **Harsh Rathod**

- **Portfolio**: [harshrathod-portfolio.vercel.app](https://harshrathod-portfolio.vercel.app/)
- **Project Link**: [prompt-vault-by-harsh.vercel.app](https://prompt-vault-by-harsh.vercel.app/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">

# Developer Toolbox

### 40+ Premium Developer Utilities — Zero Server, 100% Client-Side

A comprehensive suite of developer tools that run entirely in your browser. JSON formatter, JWT decoder, regex tester, QR generator, password generator, RSA keypair creator, and 33 more — all offline-first with zero data leaving your machine.

[![Live Demo](https://img.shields.io/badge/Live_Demo-developer--toolbox-1.vercel.app-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=863bff)](https://developer-toolbox-1.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-0a0a0a?style=for-the-badge&labelColor=0a0a0a&color=22c55e)](LICENSE)
[![React 19](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite_5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## Overview

Developer Toolbox is a privacy-first, offline-capable developer utility suite. Every tool processes data locally in the browser — nothing is sent to any backend. Built with React 19, Vite, and a shadcn/ui-inspired component system, it provides a fast, beautiful experience for everyday developer tasks.

---

## Tools

### Encoding & Conversion
Base64 | URL Encoder | Number Base Converter | Text Case Converter | JSON-CSV Converter | Env Converter | cURL Converter | CBOR/MessagePack

### JSON & Data
JSON Formatter | Mock Data Generator

### Authentication & Security
JWT Decoder | JWT Generator | Hash Generator | Password Generator | RSA Key Generator | X.509 Certificate Decoder

### Code & Text
Regex Tester | Diff Checker | Code Assistant | Markdown Preview | HTML Preview | Lorem Ipsum Generator

### CSS & Design
Color Picker | Color Palette | Gradient Generator | CSS Playground | Flexbox/Grid Visualizer | CSS Unit Converter | CSS Purger | SVG Optimizer

### Networking & Infrastructure
IP Lookup | CIDR Calculator | GraphQL Visualizer | DDL Parser | Kubernetes YAML Splitter

### Generators & Utilities
QR Code Generator | UUID Generator | Timestamp Converter | Unicode Inspector | Cron Expression Parser

---

## Tech Stack

| Layer | Technologies |
|:------|:-------------|
| **Framework** | React 19, React Router DOM 7 |
| **Language** | TypeScript 5.7 |
| **Build** | Vite 5.4 |
| **Styling** | Tailwind CSS 4.3 |
| **UI** | Radix UI (11 primitives), cmdk, CVA |
| **State** | Zustand 5 |
| **Crypto** | js-md5, pkijs, asn1js |
| **Code** | highlight.js, marked, DOMPurify |
| **Icons** | Lucide React |

---

## Project Structure

```
Developer-toolbox/
├── src/
│   ├── App.tsx                 # Root routing
│   ├── Dashboard.tsx           # Tool listing dashboard
│   ├── ToolPage.tsx            # Generic tool page wrapper
│   ├── components/
│   │   ├── layout/             # Sidebar, header, command palette
│   │   ├── shared/             # Copy button, tool headers
│   │   └── ui/                 # 12 shadcn/ui components
│   ├── lib/
│   │   ├── constants.ts        # Tool registry
│   │   ├── hooks/              # useCommandPalette
│   │   └── utils.ts            # cn() utility
│   ├── tools/                  # 40 tool implementations
│   │   ├── base64-tool/
│   │   ├── jwt-decoder/
│   │   ├── regex-tester/
│   │   ├── qr-generator/
│   │   └── ... (36 more)
│   └── types/
│       └── tool.ts             # Tool type definitions
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## Key Architecture Decisions

### 100% Client-Side Processing
Every tool runs entirely in the browser. No API calls, no server processing, no data transmission. This is critical for security-sensitive tools like the JWT decoder, password generator, and RSA keypair creator.

### Command Palette (Cmd+K)
A `cmdk`-based command palette provides instant keyboard navigation to any tool across the entire suite.

### FOUC Prevention
An inline script in `index.html` reads the theme preference from `localStorage` before React loads, preventing flash of incorrect theme on page load.

### Modular Tool Architecture
Each tool is a self-contained `page.tsx` file registered in a centralized `constants.ts` registry. Adding a new tool requires only creating one file and adding an entry to the registry.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18.0.0

### Installation

```bash
git clone https://github.com/mohammadhossein-asadi/Developer-toolbox.git
cd Developer-toolbox
npm install
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

---

## Scripts

| Command | Description |
|:--------|:------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint (zero warnings) |
| `npm run lint:fix` | Auto-fix lint issues |

---

## SEO & Performance

- OpenGraph + Twitter Card meta tags
- Canonical URL, robots.txt, sitemap.xml
- PWA manifest for installability
- Static site — instant load, zero server latency
- Theme color: `#863bff`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Mohammadhossein Asadi** — Frontend & Full-Stack Engineer

[![GitHub](https://img.shields.io/badge/GitHub-mohammadhossein--asadi-0a0a0a?style=flat-square&logo=github)](https://github.com/mohammadhossein-asadi)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-mohammadhossein--asadi-0a66c2?style=flat-square&logo=linkedin)](https://linkedin.com/in/mohammadhossein-asadi)

</div>
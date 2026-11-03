# Developer Toolbox (ابزارک توسعه‌دهنده)

<div align="center">

![Developer Toolbox Logo](public/logo.png)

**All-in-One Developer Utilities — Encode, Decode, Format, Generate, Convert**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-16161D?logo=radixui&logoColor=white)](https://www.radix-ui.com/)
[![React Router](https://img.shields.io/badge/React_Router-7.18-CA4245?logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[🇬🇧 English](#-developer-toolbox-ابزارک-توسعه‌دهنده) • [🇮🇷 فارسی](README.fa.md) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start) • [🤝 Contributing](#-contributing)

</div>

---

## 🌟 Overview

**Developer Toolbox** is a comprehensive, offline-first collection of **developer utilities** — encoding/decoding, formatting, generation, conversion, and inspection tools — all in one beautiful, fast, React-based web application. No internet required after first load.

### 🎯 Why Developer Toolbox?

| Problem | Developer Toolbox Solution |
|---------|----------------------------|
| Scattered online tools | **Single app** with 50+ utilities |
| Privacy concerns with online tools | **100% client-side** — no data leaves browser |
| Slow, ad-filled websites | **Instant, offline-first** with Service Worker |
| No Persian/RTL support | **Full RTL** with Vazirmatn font |
| Context switching | **Tabbed interface** with keyboard shortcuts |

---

## ✨ Features

### 🔐 **Encoding & Decoding**
- **Base64** / Base64URL / Base32 / Base58
- **URL** encoding/decoding (RFC 3986)
- **HTML** entity encoding/decoding
- **JWT** decoder (header + payload + signature verification)
- **Unicode** escape/unescape (\\uXXXX, &#xXXXX;)

### 🔑 **Cryptography & Security**
- **Hash**: MD5, SHA-1, SHA-256, SHA-512, BLAKE2b, BLAKE3
- **HMAC**: SHA-256, SHA-512 with key
- **bcrypt** / **Argon2** / **PBKDF2** password hashing
- **UUID** v1/v4/v7 generator & validator
- **JWT** generator with custom claims
- **X.509** / **PKCS#7** / **ASN.1** certificate parser (pkijs/asn1js)

### 📝 **Formatters & Beautifiers**
- **JSON** formatter/validator/minifier (with JSONPath query)
- **XML** / **HTML** formatter
- **SQL** formatter (multiple dialects)
- **Markdown** renderer with GitHub Flavored Markdown
- **YAML** / **TOML** / **CSV** ↔ JSON converter
- **GraphQL** formatter

### 🎨 **Generators**
- **Color** palette generator (harmonies, accessibility)
- **Gradient** CSS generator (linear, radial, conic)
- **Shadow** CSS generator (layered, colored)
- **Border radius** CSS generator
- **TypeScript** interface from JSON
- **Zod** schema from JSON/TypeScript
- **Regex** builder & tester
- **Cron** expression generator & explainer
- **Lorem Ipsum** / **Faker.js** data generator

### 🔄 **Converters**
- **Timestamp** ↔ Date (Unix, ISO, RFC, Jalali)
- **Number bases**: Binary, Octal, Decimal, Hex (with Persian numerals)
- **Units**: Length, Weight, Temperature, Time, Data, Speed
- **Color spaces**: HEX, RGB, HSL, HSV, LCH, OKLCH, CMYK
- **Image**: Base64 ↔ File, WebP ↔ PNG ↔ JPEG ↔ AVIF

### 🔍 **Inspectors & Validators**
- **JWT** inspector (exp, iat, claims, algorithm)
- **Certificate** viewer (subject, issuer, SAN, validity)
- **HTTP** status code reference
- **MIME** type reference
- **Port** reference
- **Regex** tester with explanation
- **Cron** expression visualizer

### 🌍 **Persian-First Experience**
| Feature | Implementation |
|---------|----------------|
| **RTL Layouts** | Tailwind RTL + React Router |
| **Typography** | Vazirmatn for Persian, JetBrains Mono for code |
| **Calendar** | Jalali date picker & timestamp converter |
| **Numerals** | Persian digits (۱۲۳) in all numeric displays |
| **Keyboard** | Persian layout awareness for shortcuts |

---

## 🏗️ Architecture

### Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| **Framework** | React + Vite | 19 / 5.4 |
| **Language** | TypeScript | 5.7 (Strict) |
| **Styling** | Tailwind CSS | 4.3 |
| **Routing** | React Router | 7.18 |
| **UI Primitives** | Radix UI | Latest |
| **Forms** | React Hook Form + Zod | 7.52 / 3.23 |
| **State** | Zustand | 5.0 |
| **Crypto** | Web Crypto API + pkijs/asn1js | Native / 3.4 |
| **Date** | date-fns + date-fns-jalali | 4.4 / 3.6 |
| **Markdown** | marked | 18.0 |
| **Syntax Highlight** | highlight.js | 11.11 |
| **QR Code** | qrcode | 1.5 |
| **Testing** | Vitest | Latest |
| **PWA** | Vite PWA Plugin | Latest |
| **Deployment** | Vercel / Netlify / Static | - |

### Project Structure

```
Developer-toolbox/
├── public/                     # Static assets + SW
├── src/
│   ├── app/                    # Vite entry
│   │   ├── main.tsx
│   │   ├── App.tsx             # Router + Layout
│   │   └── styles.css          # Tailwind + globals
│   ├── pages/                  # Route pages
│   │   ├── encode/             # Encoding tools
│   │   ├── crypto/             # Crypto tools
│   │   ├── format/             # Formatters
│   │   ├── generate/           # Generators
│   │   ├── convert/            # Converters
│   │   ├── inspect/            # Inspectors
│   │   └── settings/           # Preferences
│   ├── components/
│   │   ├── ui/                 # Radix-based UI (20+)
│   │   ├── tools/              # Tool-specific components
│   │   └── layout/             # Sidebar, Header, Tabs
│   ├── hooks/
│   │   ├── useTools.ts
│   │   ├── useClipboard.ts
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   ├── lib/
│   │   ├── crypto.ts           # Crypto utilities
│   │   ├── encoding.ts         # Encoding utilities
│   │   ├── formatters.ts       # Formatters
│   │   ├── converters.ts       # Converters
│   │   ├── generators.ts       # Generators
│   │   ├── validators.ts       # Validators
│   │   └── utils.ts            # Shared utilities
│   ├── store/                  # Zustand stores
│   └── types/                  # TypeScript types
├── .env.example
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── vitest.config.ts
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20+
- **npm** 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/mohammadhossein-asadi/Developer-toolbox.git
cd Developer-toolbox

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

```env
# App
VITE_APP_NAME="Developer Toolbox"
VITE_APP_URL=http://localhost:5173

# Optional: Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

---

## 🛠️ Development

### Available Commands

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview production build

# Code Quality
npm run lint         # ESLint
npm run lint:fix     # ESLint + auto-fix

# Testing
npm test             # Run Vitest tests
npm run test:watch   # Watch mode
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm test -- --coverage
```

**Test Coverage:**
- Encoding/decoding round-trips
- Crypto hash/HMAC verification
- Formatter output validation
- Converter accuracy
- Generator output schema
- Persian date/number formatting

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [Architecture](docs/ARCHITECTURE.md) | System design |
| [Tools Reference](docs/TOOLS_REFERENCE.md) | All 50+ tools documented |
| [Adding Tools](docs/ADDING_TOOLS.md) | Guide for new tools |
| [PWA Setup](docs/PWA.md) | Service Worker config |
| [Persian UX](docs/PERSIAN_UX.md) | RTL, numerals guidelines |

---

## 🚀 Deployment

### Static Hosting (Vercel/Netlify/Cloudflare Pages)

```bash
# Build
npm run build

# Output: dist/
# Deploy dist/ to any static host
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

---

## 🌐 PWA Support

- **Service Worker** for offline caching
- **Install prompt** for desktop/mobile
- **Background sync** for settings
- **App manifest** with Persian name

---

## 🔒 Security

- **100% client-side** — no server, no data transmission
- **Web Crypto API** for secure operations
- **No eval/Function** — safe parsing only
- **Content Security Policy** via meta tags
- **Dependency scanning** via Dependabot

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) first.

### Adding a New Tool

1. Create component in `src/pages/<category>/<tool>.tsx`
2. Implement logic in `src/lib/<category>.ts`
2. Add route in `src/app/App.tsx`
3. Add to sidebar navigation
4. Write tests in `src/__tests__/`
5. Document in `docs/TOOLS_REFERENCE.md`

---

## 📋 Roadmap

### ✅ Completed

- [x] Vite + React 19 + TypeScript
- [x] 20+ Radix UI components
- [x] Encoding/Decoding tools
- [x] Crypto tools (hash, HMAC, JWT, certs)
- [x] Formatters (JSON, SQL, Markdown, etc.)
- [x] Generators (color, gradient, regex, cron)
- [x] Converters (timestamp, units, color, base)
- [x] Inspectors (JWT, cert, HTTP, regex)
- [x] Persian RTL + Jalali + Vazirmatn
- [x] PWA with offline support

### 🔄 In Progress

- [ ] GraphQL formatter/validator
- [ ] OpenAPI/Swagger viewer
- [ ] Database schema visualizer
- [ ] API testing client (like Postman lite)

### 📅 Planned

- [ ] Plugin system for custom tools
- [ ] Team shared snippets
- [ ] VS Code extension
- [ ] Raycast/Alfred workflow
- [ ] Mobile app (Capacitor)

---

## 📄 License

**MIT License** — See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- **Radix UI** — Accessible component primitives
- **Tailwind CSS** — Utility-first styling
- **React Router** — Declarative routing
- **pkijs/asn1js** — PKI/ASN.1 parsing
- **date-fns** — Modern date utility
- **Vazirmatn Font** — Persian typography by Rastikerdar

---

## 📞 Support & Community

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/mohammadhossein-asadi/Developer-toolbox/issues)
- **Discussions**: [GitHub Discussions](https://github.com/mohammadhossein-asadi/Developer-toolbox/discussions)

---

<div align="center">

**Built with ❤️ for developers who value privacy and efficiency**

[🇬🇧 English](README.md) • [🇮🇷 فارسی](README.fa.md) • [⭐ Star us on GitHub](https://github.com/mohammadhossein-asadi/Developer-toolbox)

</div>
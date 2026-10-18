# ⚡️ Personal Portfolio — Muhammad Naufal Arif

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A high-performance, fluid, and responsive personal portfolio web application designed with **Apple-inspired UI/UX principles**, hardware-accelerated ambient animations, and multi-language support.

**Live Demo:** [https://naufalarif.vercel.app/en](https://naufalarif.vercel.app/en)

---

## ✨ Key Features

* **🍏 Apple-Inspired Interface:** Fluid spring animations, translucent glassmorphism (`backdrop-filter`), optical type tracking, and physical interaction feedback (`apple-active-scale`).
* **✈️ Hardware-Accelerated Ambient Canvas:** Custom SVG wave path generation and paper plane loop driven via GPU transforms without triggering React render cycles.
* **🌐 Internationalization (i18n):** Native multi-language routing (`en` / `id`) powered by `next-intl`.
* **🌓 Dynamic Theme Switching:** Instant Light/Dark mode toggling using `next-themes` with zero flash on initial load (*FOUC-free*).
* **♿️ Accessible & Vestibular-Safe:** Full compliance with `prefers-reduced-motion` and keyboard accessibility standards.
* **⚡️ Optimized Performance:** Server Components, image optimization via `next/image`, and automated Tailwind CSS v4 utility purging.

---

## 🛠️ Tech Stack

### Core Framework & Logic
* **Framework:** Next.js (App Router)
* **Language:** TypeScript (`strict: true`)
* **Localization:** `next-intl`
* **Theme Management:** `next-themes`

### Styling & Animation
* **Styling Engine:** Tailwind CSS v4 (`@theme` token configuration)
* **Animation Engine:** Framer Motion (Spring physics & MotionValues)
* **Icons:** Lucide React

---

## 📁 Project Structure

```text
naufal-portfolio/
├── app/
│   ├── [locale]/          # Next-intl localized route handlers
│   │   ├── layout.tsx     # Root layout with Theme & Intl Provider
│   │   └── page.tsx       # Main landing page composition
│   └── globals.css        # Tailwind CSS v4 setup & custom utilities
├── components/
│   ├── ui/                # Reusable UI primitives (NavBar, AmbientBackground)
│   ├── sections/          # Page sections (Hero, Timeline, ProjectSlider, Stack, Contact)
│   └── ThemeProvider.tsx  # Theme context wrapper
├── messages/              # i18n translation dictionaries
│   ├── en.json            # English translations
│   └── id.json            # Indonesian translations
├── public/                # Static assets & images
├── LICENSE                # MIT License
└── package.json

```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed locally:

* **Node.js:** `>= 18.18.0` (Recommended Node 20 LTS or higher)
* **Package Manager:** `pnpm` / `npm` / `yarn`

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/naufallariff/naufal-portfolio.git
cd naufal-portfolio

```


2. **Install dependencies:**
```bash
npm install
# or
pnpm install

```


3. **Run the development server:**
```bash
npm run dev
# or
pnpm dev

```


4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to view the project.

---

## 🏗️ Production Build

To build the application for production deployment:

```bash
npm run build
npm run start

```

---

## 📄 License

This project is open-source under the terms of the [MIT License](https://www.google.com/search?q=LICENSE).

---

## 📬 Contact & Connect

* **Author:** Muhammad Naufal Arif
* **LinkedIn:** [linkedin.com/in/muhammadnaufalarif](https://www.linkedin.com/in/muhammadnaufalarif/)
* **Instagram:** [@naufalariff_09](https://www.google.com/search?q=https://www.instagram.com/naufalariff_09/)
* **Location:** Jakarta, Indonesia
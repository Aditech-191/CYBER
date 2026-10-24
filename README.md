# SafeShield Uganda (ChildSafe AI)

> **A Privacy-Preserving, Zero-Surveillance Multi-Agent AI System for Child Cyberbullying and Harm Safety in Uganda**  
> *Developed as a University Research Prototype in collaboration with Ugandan Child Protection Frameworks.*

[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Helpline 116](https://img.shields.io/badge/Uganda_Helpline-116_Toll--Free-red)](https://mglsd.go.ug/uganda-child-helpline-116/)
[![Privacy](https://img.shields.io/badge/Privacy-Zero--Surveillance-10B981)](#zero-surveillance-guarantee)

---

## 📑 Core Documentation Suite

All 6 core architectural and engineering specifications are located in the [`docs/`](./docs) directory:

| # | Specification Document | Description | Direct Link |
| :-: | :--- | :--- | :--- |
| **1** | **Product Requirements Document (PRD)** | Defines *what* is being built: 9 core principles, user personas (Grace, Brian, Florence, Mr. Okello), functional requirements, and risk policy bands. | [View PRD](./docs/01_PRODUCT_REQUIREMENTS_DOCUMENT.md) |
| **2** | **Technical Requirements Document (TRD)** | Defines *how* it is built: Kotlin/Compose Android stack, MobileBERT quantization (<25MB), inference latencies (<45ms), and MGLSD 116 integration. | [View TRD](./docs/02_TECHNICAL_REQUIREMENTS_DOCUMENT.md) |
| **3** | **App Flow and User Journeys** | Maps the complete user experience: Mermaid sequence diagrams for peer banter vs crisis extortion, screen-by-screen hierarchy. | [View App Flow](./docs/03_APP_FLOW_AND_JOURNEYS.md) |
| **4** | **UI/UX Design Brief** | Visual look & feel guide: trauma-informed aesthetics, design tokens, color palette, accessible typography, and 20 features blueprint. | [View UI/UX Brief](./docs/04_UI_UX_DESIGN_BRIEF.md) |
| **5** | **Backend & Local Schema** | Data structure: SQLCipher on-device tables (`app_preferences`, `trusted_contacts`, `safety_action_log`), zero-knowledge contracts, and pilot REST APIs. | [View Schema](./docs/05_BACKEND_AND_LOCAL_SCHEMA.md) |
| **6** | **Implementation Plan** | Step-by-step 6-sprint build order, verification criteria, and test acceptance checklist. | [View Plan](./docs/06_IMPLEMENTATION_PLAN.md) |

---

## 🤖 The 5-Agent Multi-Agent Assessment Engine

Unlike monolithic black-box systems, SafeShield delegates child safety evaluation across five specialized, decoupled agents:

1. **Agent A — Cyberbullying Detection:** Identifies insults, threats, humiliation, and group exclusion using quantized MobileBERT.
2. **Agent B — Online Sexual-Safety Signals:** Detects grooming dynamics, coercion, sextortion, and demands for intimate images with strict image storage prohibition.
3. **Agent C — Context & Uncertainty Assessor:** Evaluates adolescent sarcasm, gaming banter, and local Ugandan slang (e.g., Luganda expressions like *"omusira"*), penalizing false alarms.
4. **Agent D — Child Support Coach:** Generates calm, age-appropriate, non-judgmental counsel that puts the child in control of next steps without shame.
5. **Agent E — Risk & Privacy Coordinator:** Enforces deterministic safety rules, decouples severity from model confidence, and executes strict memory purges.

---

## ✨ 20 Essential UI/UX Features Implemented

The running application implements all 20 essential UI/UX features:

1. **Dark mode toggle:** Smooth sun/moon switch with `localStorage` persistence.
2. **Simple cookie & privacy banner:** Compliant with the Uganda Data Protection and Privacy Act 2019.
3. **Site search:** Command palette modal searching across features, FAQs, agents, and contacts.
4. **Scroll back to top button:** Floating action button with visibility threshold.
5. **Mobile menus:** Accessible responsive navigation drawer with touch targets $\ge 44$px.
6. **Loading animations:** Sequential agent pulse nodes and progress indicators.
7. **Hover states:** Tactile elevation, radiant border glows, and micro-interactions.
8. **Scroll progress bar:** Ultra-thin gradient line at the top tracking scroll depth.
9. **Copy to clipboard button:** One-click copy for crisis scripts and reason codes with toast feedback.
10. **Print stylesheet:** `@media print` rules generating clean, non-intrusive safety reports.
11. **Sticky headers:** Fixed glassmorphic navigation with `backdrop-filter: blur(16px)`.
12. **Skip to content link:** Keyboard-accessible anchor (`#main-content`) for screen readers.
13. **Password / PIN visibility toggle:** Show/hide toggle on parental safeguarding settings.
14. **UTM tracking:** Automatically parses `utm_source`, `utm_medium`, and `utm_campaign` URL parameters.
15. **Form success state:** Vibrant animated checkmark card confirming saved preferences.
16. **Form error state:** Compassionate inline validation badges when inputs are empty.
17. **Confirmation modals:** Accessible dialog with backdrop blur before wiping volatile RAM buffers.
18. **Last updated date:** Dynamic metadata badges displaying recent verification dates.
19. **Expandable FAQ sections:** Collapsible accordion answering legal and technical questions.
20. **Floating emergency contact button:** Persistent quick dialer for the **Uganda Child Helpline (116)**.

---

## 🚀 Running the Interactive Application Locally

### Prerequisites
- Node.js v20+ / npm v10+

### Development Server
```bash
# In the project root (/home/adi-tech/Desktop/CYBER)
npm run dev
```
Open **[http://localhost:5173/](http://localhost:5173/)** in your browser.

### Production Build
```bash
npm run build
npm run preview
```

---

## 🇺🇬 Ugandan Safeguarding Context

- **Uganda Child Helpline:** Dial **116** (Toll-free on MTN, Airtel, and all national networks).
- **Ministry of Gender, Labour and Social Development (MGLSD):** Official child protection guidelines.
- **Uganda Children Act (Cap. 59):** Statutory provisions protecting children against online exploitation and physical danger.
- **Uganda Personal Data Protection Office (PDPO):** Compliance with 2019 Data Protection principles.

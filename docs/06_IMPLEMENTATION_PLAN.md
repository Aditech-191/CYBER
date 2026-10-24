# Implementation Plan

## Project: SafeShield Uganda (ChildSafe AI)
**Step-by-Step Engineering Roadmap, Sprint Milestones, and Verification Criteria**  
*Document Version:* 1.0.0  
*Execution Model:* Phased Agile Build (6 Core Sprints)  
*Status:* Execution Ready

---

## 1. Roadmap Overview & Logical Build Order

To guarantee that the engineering team and AI development agents build the system logically without architectural guesswork, the project is structured into six sequential phases:

```
┌────────────────────────────────────────────────────────┐
│ Phase 1: Foundation, Design System & Privacy Gateway   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 2: Multi-Agent Assessment Engine (Agents A - E)  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 3: Child Presentation & Interactive Simulator    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 4: Uganda 116 Safeguarding & Relay System        │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 5: 20 Essential UI/UX Features & Accessibility   │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ Phase 6: Ethics Verification, Auditing & Pilot Launch  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Sprint Milestones & Technical Deliverables

### Phase 1: Core Foundation, Privacy Gateway & Security Baseline
- [x] **Task 1.1:** Initialize project architecture (React 19 / Vite 8 for web simulation; Kotlin/Compose modules for Android).
- [x] **Task 1.2:** Configure design system tokens (colors, accessible typography, dark/light theme switching variables).
- [x] **Task 1.3:** Build `LocalPrivacyGateway`: implement input normalization, character limits (512 tokens), in-memory string scrubbing.
- [x] **Task 1.4:** Define SQLite / Room schemas with SQLCipher encryption, strict zero-raw-message constraints, and automated integrity validation.

### Phase 2: Multi-Agent Assessment Engine Implementation
- [x] **Task 2.1:** **Agent A (Cyberbullying):** Implement token classification for insults, threats, and targeted peer exclusion.
- [x] **Task 2.2:** **Agent B (Online Sexual Safety):** Implement rule-based and neural checks for grooming stages, photo coercion, and secrecy demands.
- [x] **Task 2.3:** **Agent C (Context & Uncertainty):** Build context balancer to distinguish friendly banter from sustained bullying, incorporating Ugandan slang expressions.
- [x] **Task 2.4:** **Agent D (Child Support Coach):** Implement conversational advice generator with reassuring, non-shaming response templates.
- [x] **Task 2.5:** **Agent E (Risk & Privacy Coordinator):** Code deterministic risk policy table, severity vs. confidence decider, and data-sharing allowlist.

### Phase 3: Presentation UI & Interactive Simulator
- [x] **Task 3.1:** Build Child Safety Hub (Dashboard) with instant status cards and quick navigation.
- [x] **Task 3.2:** Develop "Check a Message" interface supporting custom input and pre-configured test scenarios (benign banter, cyberbullying, crisis extortion).
- [x] **Task 3.3:** Implement live multi-agent execution pipeline visualizer showing real-time progress across all 5 agents.
- [x] **Task 3.4:** Build Peer Coach Interactive Drawer allowing the child to choose next steps (Mute, Block, Talk to Counselor).

### Phase 4: Uganda Safeguarding & National Helpline 116 Bridge
- [x] **Task 4.1:** Build Uganda Child Helpline 116 direct-dial action card with MGLSD operational guidelines.
- [x] **Task 4.2:** Construct `SafeNetRelay` to generate masked, non-surveillance conversation prompts for parents/guardians.
- [x] **Task 4.3:** Implement dual-mode switcher: Demonstration Sandbox Mode vs. Controlled Pilot Mode.
- [x] **Task 4.4:** Integrate local crisis playbooks (evidence documentation guide, offline safety steps).

### Phase 5: The 20 Essential UI/UX Features Integration
- [x] **Feature 1:** Dark mode toggle with instant persistence in `localStorage`.
- [x] **Feature 2:** Cookie & consent banner compliant with Uganda Data Protection Act 2019.
- [x] **Feature 3:** Site search modal / palette for searching resources, FAQs, and docs.
- [x] **Feature 4:** Scroll back to top floating button with smooth scroll.
- [x] **Feature 5:** Mobile responsive navigation drawer with touch targets $\ge 44$px.
- [x] **Feature 6:** Polished loading animations & agent processing spinners.
- [x] **Feature 7:** Micro-interaction hover states with elevation and glows.
- [x] **Feature 8:** Viewport scroll progress bar at top edge.
- [x] **Feature 9:** One-click copy to clipboard buttons with toast feedback.
- [x] **Feature 10:** Comprehensive `@media print` stylesheet for clean reporting.
- [x] **Feature 11:** Sticky glassmorphic header with blur effect.
- [x] **Feature 12:** Accessible "Skip to main content" link for screen readers.
- [x] **Feature 13:** Password / PIN visibility toggle for settings protection.
- [x] **Feature 14:** UTM parameter parser and campaign notification display.
- [x] **Feature 15:** Form submission success states with animated badges.
- [x] **Feature 16:** Inline form error states with compassionate correction guidance.
- [x] **Feature 17:** Confirmation dialog modals before sensitive memory actions.
- [x] **Feature 18:** Automated "Last Updated" metadata indicators.
- [x] **Feature 19:** Expandable accordion FAQ sections.
- [x] **Feature 20:** Persistent floating emergency contact button for Uganda 116.

### Phase 6: Privacy Audits, Ethics Review & Pilot Deployment
- [ ] **Task 6.1:** Run network packet analysis to prove 0 raw text bytes leave the device during local analysis.
- [ ] **Task 6.2:** Conduct university institutional ethics review board (IRB) review with child safeguarding advisors in Uganda.
- [ ] **Task 6.3:** Partner school pilot onboarding in Kampala & Wakiso districts with designated counseling staff.
- [ ] **Task 6.4:** Differential privacy federated learning simulation benchmark evaluation.

---

## 3. Testing & Verification Checklist

| Test Suite | Target Acceptance Criterion | Verification Method |
| :--- | :--- | :--- |
| **Privacy Zero-Leak** | 0 outbound HTTP calls during local message analysis | Wireshark / Charles Proxy packet inspection |
| **Inference Latency** | $< 250$ ms end-to-end multi-agent evaluation | Benchmark profiler on mobile and desktop |
| **Banter Precision** | $\ge 90\%$ benign banter correctly marked without alert | Evaluated against Ugandan teenage chat corpus |
| **Extortion Recall** | $100\%$ critical extortion scenarios trigger crisis protocol | Unit tests with synthetic exploitation datasets |
| **Accessibility** | 100% WCAG 2.1 AA compliance; full keyboard navigation | Lighthouse audit & Axe-Core accessibility scan |
| **Helpline 116 Telephony** | Direct dial intent opens system telephone dialer to 116 | Device integration test |

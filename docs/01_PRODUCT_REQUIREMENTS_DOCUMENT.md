# Product Requirements Document (PRD)

## Project: SafeShield Uganda (ChildSafe AI)
**A Privacy-Preserving, Zero-Surveillance Multi-Agent AI System for Child Cyberbullying and Harm Safety in Uganda**  
*Document Version:* 1.0.0  
*Status:* Approved for Prototype & Pilot Architecture  
*Lead Institution:* University Child Safety & AI Ethics Lab (in collaboration with Ugandan Safeguarding Frameworks)  
*Applicable Regulatory Framework:* Uganda Children Act (Cap. 59 as amended), Uganda Data Protection and Privacy Act (2019), MGLSD Safeguarding Guidelines.

---

## 1. Executive Summary & Vision

Children and adolescents in Uganda increasingly interact through digital platforms (WhatsApp, TikTok, Instagram, Snapchat, Discord, Telegram, and gaming lobbies). While connectivity empowers education and socialization, it exposes children to digital harms: cyberbullying, exclusionary hostility, online sexual exploitation and abuse (OCSEA), sextortion, and coercion.

Existing parental control products operate as intrusive spyware: they log keystrokes, intercept screen feeds, transmit raw chat logs to cloud servers, and alert parents automatically. This surveillance dynamic breaks down parental trust, pushes youth toward hidden secondary devices or unmonitored accounts, and risks disastrous false positives or retaliation in homes where domestic friction exists.

**SafeShield Uganda** is a pioneering, local-first multi-agent AI safety application designed for Android and mobile web environments. It empowers the child with localized intelligence, non-judgmental guidance, and optional, safe escalation pathways—retaining absolute privacy on the physical device unless the child or an imminent crisis triggers an authorized safeguarding intervention.

---

## 2. Core Design Principles

| Principle | Architectural & Product Requirement |
| :--- | :--- |
| **Local-First Privacy** | Routine natural language and multimodal evaluation takes place entirely on-device (RAM). No raw chat text, media, or contact identity is streamed to remote cloud infrastructure. |
| **Zero-Surveillance / Child Agency** | The app does not secretly record background keystrokes or scrape private feeds. Analysis occurs when a child intentionally pastes, shares, or checks content. The child controls the advice flow. |
| **Data Minimization & Ephemeral Buffers** | Evaluated buffers are purged immediately upon interaction completion. Persistent storage is strictly limited to local encrypted preferences and anonymous reason codes. |
| **Multi-Agent Decoupled Assessment** | Responsibilities are isolated across five specialized agents (Cyberbullying, Sexual Safety, Context/Uncertainty, Peer Coach, Risk/Privacy Coordinator). |
| **Human Oversight & No Stigmatization** | AI models identify behavioral signals; they never establish criminal guilt, diagnose clinical conditions, or shame/blame the victim. |
| **Context-Aware Cultural Inclusivity** | Linguistic understanding accounts for Ugandan English, urban Luganda slang, local expressions of banter vs. malicious intimidation. |
| **Safe Escalation to National Infrastructure** | Direct integration pathways to the Uganda Child Helpline (116) under the Ministry of Gender, Labour and Social Development (MGLSD), alongside trusted adult contacts. |
| **Offline Resilience** | Complete detection, heuristic risk appraisal, and safety planning function without requiring mobile data or active Wi-Fi. |

---

## 3. Scope Boundary: Prototype vs. Pilot Mode

### 3.1. What the App DOES
- Provides a dedicated "Check a Message" interface where children paste text, upload message screenshots, or trigger safe share-sheet actions.
- Runs 5 localized agents in a deterministic sequence to evaluate toxicity, harassment, extortion, and immediate danger.
- Displays empathetic, actionable, child-centric advice (e.g., how to mute, block, document evidence without forwarding intimate imagery, take a breather).
- Offers a structured decision matrix with child-controlled next steps.
- Provides one-touch access to the **Uganda National Child Helpline (116)**.
- Features dual-mode deployment:
  1. *Demonstration Mode:* Realistic simulations with synthetic contacts and sandboxed alerts for evaluation, workshops, and ethics review.
  2. *Controlled Pilot Mode:* Authenticated, encrypted notifications to verified school safeguarding liaisons or pre-approved trusted adults following verified onboarding.

### 3.2. What the App NEVER Does (Explicit Out-of-Scope)
- **No Background Keylogging:** Does not hook system input methods to secretly capture keystrokes.
- **No Stealth Screenshotting:** Does not silently capture device frames while other applications run.
- **No Direct Parental Eavesdropping:** Parents never receive raw transcripts of child banter or private conversations.
- **No Mandatory Automatic Reporting for Non-Imminent Harm:** The child is not forced into confrontation or exposed to parental punishment for seeking guidance.

---

## 4. User Personas

### Persona A: Grace (Age 13, Primary 7 Student in Kampala)
- **Context:** Active on WhatsApp school study groups and TikTok.
- **Problem:** Receiving passive-aggressive insults and exclusion messages from classmates threatening to isolate her during term exams.
- **Need:** Wants to know if this is "just jokes" or actual bullying, needs reassuring guidance without fear that her phone will be confiscated by her parents.

### Persona B: Brian (Age 15, Secondary 2 Student in Jinja)
- **Context:** Plays online games and uses Discord/Instagram.
- **Problem:** An unknown contact online befriended him, requested intimate pictures, and is now threatening exposure if more photos are not sent.
- **Need:** Panicked, afraid of police or family reaction. Needs immediate, calm, non-judgmental crisis coaching and emergency access to the Sauti 116 helpline.

### Persona C: Florence (Parent / Guardian in Entebbe)
- **Context:** Working professional, wants to keep her daughter safe online without invading her personal space or provoking secrecy.
- **Need:** Wants assurance that high-risk harm is caught, and values receiving conversation-starter prompts rather than raw invasive transcripts.

### Persona D: Mr. Okello (School Child Protection Officer / Counselor)
- **Context:** Designated safeguarding lead at a secondary school in Wakiso.
- **Need:** Clear incident reason codes, standardized severity tiers, and structured logs that protect child anonymity while enabling supportive interventions.

---

## 5. Functional Requirements Breakdown

### Module 1: Child Presentation & Interactive Dashboard
- **FR-1.1:** *Safe Check-In:* Minimalist, welcoming dashboard with instant "Check a Message" prompt.
- **FR-1.2:** *Context Selector:* Ability to select source platform (WhatsApp, Instagram, TikTok, Snapchat, Discord, SMS) for tailored heuristics.
- **FR-1.3:** *Direct Paste & Local OCR:* Clean text input area with support for local screenshot processing via on-device Tesseract/ML Kit.
- **FR-1.4:** *Interactive Peer Coach Drawer:* Conversational guidance displaying tailored coping strategies and action choices.
- **FR-1.5:** *Safety Toolkit & Action Plans:* Downloadable/savable offline steps (evidence capture guide, blocking instructions, distress reduction exercises).

### Module 2: Multi-Agent Assessment Engine
- **FR-2.1 (Agent A - Cyberbullying Detection):** Detects insults, threats, humiliation, group exclusion, and repeated harassment patterns.
- **FR-2.2 (Agent B - Online Sexual Safety & Coercion):** Identifies grooming dynamics, demands for secrecy, requests for intimate photos, financial sextortion, and meeting arrangements.
- **FR-2.3 (Agent C - Context & Uncertainty Engine):** Analyzes conversational tone, distinguishes friendly teasing from systemic abuse, identifies linguistic ambiguity, and lowers false-alarm rates.
- **FR-2.4 (Agent D - Child Support & Safety Coach):** Translates risk assessments into supportive, age-tiered counsel emphasizing that the child is not at fault.
- **FR-2.5 (Agent E - Risk & Privacy Coordinator):** Deterministic policy engine that evaluates severity vs. confidence, enforces the data-sharing allowlist, and triggers escalation paths.

### Module 3: Safeguarding Escalation & National Helplines
- **FR-3.1:** *National Helpline 116 Integration:* Prominent direct-dial action card with operational hours, toll-free indicator, and guidance on what happens during a call.
- **FR-3.2:** *Trusted Adult Safe Relay:* Generates an anonymized discussion prompt for parents/guardians that conceals the raw message text while highlighting the concern category.
- **FR-3.3:** *Mode Switcher:* Distinct visual and operational toggle between Demonstration Mode (sandbox) and Controlled Pilot Mode.

### Module 4: Privacy Gateway & Security Controls
- **FR-4.1:** *Zero-Knowledge Memory Purge:* In-memory buffers wiped when the user exits the evaluation screen or taps "Clear & Reset".
- **FR-4.2:** *Encrypted Vault:* Local storage of trusted contacts and app preferences encrypted with Android Keystore AES-GCM 256-bit keys.
- **FR-4.3:** *PIN & Biometric Lock:* Optional stealth PIN protection to safeguard the child's dashboard from peers or unauthorized access.

---

## 6. Risk Scoring & Policy Bands

| Risk Band | Trigger Indicators | System Behavior & Child Action Options |
| :--- | :--- | :--- |
| **Low (Green)** | Isolated disagreement, light banter, low-confidence slang | Educational explanation; suggestions to mute or take a digital pause. No escalation. |
| **Moderate (Yellow)** | Repeated insults, name-calling, exclusion, minor persistent hostility | Empathetic validation; guidance on boundary setting, blocking, and saving screenshots. |
| **High (Orange)** | Threats of physical violence, severe persistent harassment, blackmail hints | Recommends connecting with a trusted adult or school counselor. Generates masked conversation starter. |
| **Critical (Red)** | Imminent physical danger, child sexual exploitation and abuse (OCSEA), sextortion | Immediate crisis alert; prioritized 116 helpline dialer, step-by-step emergency safety plan, safeguarding contact alert. |

---

## 7. Compliance & Regulatory Matrix

- **Uganda Data Protection and Privacy Act (2019):** Adheres to Section 3 (Principles of Data Protection), specifically data minimization, storage limitation, and purpose limitation.
- **Uganda Children Act (Cap 59):** Complies with the best interests of the child standard (Section 3) and mandatory reporting frameworks for institutional leads without exposing children to domestic harm.
- **UN Convention on the Rights of the Child (UNCRC):** Respects Article 12 (Right to be heard), Article 16 (Right to privacy), and Article 19 (Protection from all forms of violence).

---

## 8. Success Metrics & Key Performance Indicators (KPIs)

1. **Privacy Invariance:** 0 raw text bytes transmitted over the network during routine analysis.
2. **Detection Precision:** >88% precision on cyberbullying and OCSEA benchmarks with low false-positive rates on local Ugandan English/Luganda banter.
3. **Child Perceived Safety:** >90% of prototype participants reporting feelings of empowerment rather than surveillance anxiety.
4. **Escalation Integrity:** 100% adherence to masked-payload constraints (zero disclosure of sensitive raw messages to parent relays).

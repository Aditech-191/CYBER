# App Flow and User Journeys

## Project: SafeShield Uganda (ChildSafe AI)
**Interactive Experience Flowcharts, Decision Trees, and Journey Maps**  
*Document Version:* 1.0.0  
*Status:* Approved UX Architecture

---

## 1. High-Level App Flow Architecture

SafeShield is designed with a non-linear, reassuring navigation structure. Unlike disciplinary apps, every transition minimizes anxiety, maximizes child autonomy, and provides immediate emergency exists.

```mermaid
flowchart TD
    Launch([App Launch]) --> Splash[Privacy Status Screen<br/>'Protected On-Device']
    Splash --> Home[Child Safety Hub / Dashboard]

    Home --> NavCheck[Check a Message]
    Home --> NavTips[Safety Playbook & Guides]
    Home --> NavContacts[Trusted Adults & 116 Emergency]
    Home --> NavPrivacy[Privacy & Memory Controls]
    Home --> NavSpecs[System Specs & PRD/TRD Viewer]

    NavCheck --> InputForm[Input Text / Screenshot Snippet]
    InputForm --> RunAudit{Run On-Device Analysis}
    
    RunAudit --> G1[Ambient Guardian Filter]
    G1 -->|Benign / Safe| LowRiskResult[Comforting Feedback<br/>'Looks harmless or friendly']
    G1 -->|Flagged| Assessor[Agent B & C: Multi-Vector Risk Assessment]
    
    Assessor --> Coordinator[Agent E: Risk & Privacy Coordinator]
    
    Coordinator -->|Low/Moderate| CoachGuidance[Agent D: Peer Coach Advice<br/>Take a Break, Mute, or Block]
    Coordinator -->|High/Critical| CrisisProtocol[Urgent Safeguarding Protocol<br/>Uganda 116 Helpline + Safe Adult Alert]

    CoachGuidance --> ChildActionChoice{Child Selects Action}
    ChildActionChoice --> ActionMute[Guide: How to Mute / Block]
    ChildActionChoice --> ActionCounselor[Prepare Anonymized Parent / Counselor Note]
    ChildActionChoice --> ActionPurge[Purge & Clear Memory]
    
    CrisisProtocol --> Dial116[Direct Dial Uganda 116]
    CrisisProtocol --> RelayPrompt[Generate Masked Conversation Starter]

    LowRiskResult --> ActionPurge
    ActionMute --> Home
    ActionCounselor --> Home
    ActionPurge --> Home
    Dial116 --> Home
```

---

## 2. Detailed User Journey 1: Checking Ambiguous Classmate Banter

**Actor:** Grace (13 years old, Primary school pupil)  
**Scenario:** A peer writes: *"You're useless, don't show your face at basketball practice today or else."*

```mermaid
sequenceDiagram
    autonumber
    actor Grace as Child (Grace)
    participant UI as Child Dashboard
    participant PG as Local Privacy Gateway
    participant AgA as Agent A (Cyberbullying)
    participant AgC as Agent C (Context/Slang)
    participant AgE as Agent E (Coordinator)
    participant AgD as Agent D (Peer Coach)

    Grace->>UI: Pastes text from WhatsApp group
    Grace->>UI: Taps "Analyze Message"
    UI->>PG: Ingests text into ephemeral RAM
    PG->>AgA: Inferences severity & toxic vocabulary
    AgA-->>PG: Flag: 'possible_intimidation', Severity: 0.72
    PG->>AgC: Evaluates context & peer dynamics
    AgC-->>PG: Assessment: 'repeated_exclusion_signal', Uncertainty: Low
    PG->>AgE: Enforces Risk Matrix
    AgE-->>UI: Output Policy: MODERATE_HARASSMENT
    PG->>PG: Overwrites raw message in RAM with null bytes
    UI->>AgD: Triggers Child Guidance Screen
    AgD->>Grace: Displays empathetic reassurance: "This message sounds mean and exclusionary. You did nothing wrong."
    Grace->>UI: Selects "Show me how to mute this group"
    UI->>Grace: Step-by-step pictorial guide for WhatsApp settings
```

---

## 3. Detailed User Journey 2: Critical Extortion & Sextortion Crisis

**Actor:** Brian (15 years old)  
**Scenario:** An online stranger demands intimate photographs and threatens public humiliation.

```mermaid
sequenceDiagram
    autonumber
    actor Brian as Child (Brian)
    participant UI as Child Dashboard
    participant AgB as Agent B (Sexual Safety)
    participant AgE as Agent E (Risk Coordinator)
    participant SafeNet as SafeNet Escalation Engine
    participant Helpline as Uganda Child Helpline 116

    Brian->>UI: Submits message: "Send the photos or I will leak your contacts"
    UI->>AgB: Rapid on-device evaluation
    AgB-->>AgE: Threat Category: SEXTORTION / EXPLOITATION (Critical)
    AgE->>UI: Locks UI into Safe Crisis Mode (Suppresses shame)
    UI->>Brian: Calm Alert: "You are not in trouble. Someone is trying to scare you illegally."
    UI->>Brian: Displays 3 Critical Options:
    Note over UI,Brian: 1. Call Uganda Child Helpline (116) Toll-Free<br/>2. Involve Trusted Adult without showing raw text<br/>3. Emergency Evidence Vault (Preserves date/time, hides image)
    Brian->>UI: Taps "Call Helpline 116"
    UI->>Helpline: Launches native dialer to 116 (MGLSD Sauti Helpline)
    Brian->>UI: Taps "Create Parent Conversation Starter"
    UI->>SafeNet: Synthesizes masked parent script
    SafeNet-->>Brian: "Share this text with Mom: 'Someone online is threatening me, and I need help. The safety app recommended we talk right now.'"
```

---

## 4. Screen-by-Screen Navigation Hierarchy

| Screen ID | Screen Title | Primary User Actions | Accessible Sub-Actions |
| :--- | :--- | :--- | :--- |
| **SCR-01** | **Safety Dashboard** | Check a message; view safety status; emergency dial 116 | Dark mode toggle; site search; cookie preferences; quick safety tips |
| **SCR-02** | **Message Checker** | Paste text; select platform; trigger multi-agent pipeline | Clear input; load demo scenario; toggle privacy details |
| **SCR-03** | **Agent Inspection Lab** | Step through Agent A -> B -> C -> D -> E live execution | View JSON output; inspect confidence vectors; verify zero-cloud payload |
| **SCR-04** | **Peer Coach Guidance** | Select empathetic action; review step-by-step advice | Copy safe response; launch mute guide; request adult support |
| **SCR-05** | **Uganda 116 Gateway** | Dial 116 toll-free; learn what helpline counselors do | View MGLSD details; read Children Act rights; offline emergency steps |
| **SCR-06** | **Trusted Contact Relay** | Generate masked SMS for guardian; configure trusted contact | Test notification simulator; lock settings with PIN |
| **SCR-07** | **Privacy & Cryptography** | Immediate RAM wipe; inspect Keystore status; view local DB audit | Verify zero-knowledge guarantee; clear all offline caches |
| **SCR-08** | **Interactive TRD/PRD Docs** | Search technical docs; print documentation; copy specs | Filter sections; expand architecture diagrams |

---

## 5. Error Handling & Edge Cases

1. **Empty / Non-Text Input:** UI triggers gentle inline error banner (`"Please paste a message or select a test scenario"`).
2. **Offline Mode:** App displays green `"100% Offline Active"` indicator; telephone dialer relies on GSM voice call which requires no internet data.
3. **App Minimization / Backgrounding:** Sensitive guidance automatically hides and scrubs temporary text fields to prevent shoulder-surfing.
4. **Child Panic Button:** Floating persistent button instantly switches the screen to a discreet educational/calculator screen or returns home safely.

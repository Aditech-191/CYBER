# Technical Requirements Document (TRD)

## Project: SafeShield Uganda (ChildSafe AI)
**System Architecture, Engineering Specifications, and Infrastructure Blueprint**  
*Document Version:* 1.0.0  
*Target Environments:* Native Android 11+ (API Level 30+) & High-Fidelity Web Simulation (React 19 + Vite)  
*Status:* Technical Baseline

---

## 1. System Architecture Overview

SafeShield Uganda implements a four-tier, local-first architecture designed to decouple detection, contextual judgment, guidance, and escalation. The technical design enforces a strict unidirectional data flow through a **Privacy Gateway**, ensuring that machine learning agents have zero network socket access.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Layer 1: Presentation Layer                          │
│   [Child Dashboard]  [Check Message UI]  [Safety Tips]  [Contacts]     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (User Initiated Input)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Layer 2: Local Privacy Gateway                       │
│   • Input Sanitization & Normalization   • Token Truncation (max 512) │
│   • RAM-Only Working Memory Buffer       • Ephemeral Data Cleaner      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌──────────────┐             ┌──────────────┐             ┌──────────────┐
│   Agent A    │             │   Agent B    │             │   Agent C    │
│Cyberbullying │             │Online Sexual │             │  Context &   │
│  (MobileBERT)│             │Safety (TFLite│             │ Uncertainty  │
└──────┬───────┘             └──────┬───────┘             └──────┬───────┘
       │                            │                            │
       └────────────────────────────┼────────────────────────────┘
                                    │ (Structured Agent Outputs)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Layer 3: Multi-Agent Assessment                      │
│                Agent E: Risk and Privacy Coordinator                   │
│   • Deterministic Policy Matrix          • Uncertainty Penalty         │
│   • Severity vs. Confidence Decoupling   • Data-Sharing Allowlist      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Policy Decision Record)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Layer 4: Safety Decision Router                      │
│   [Agent D: Child Guidance UI]   │   [Safeguarding Relay]              │
│   • Non-judgmental advice        │   • Uganda 116 Helpline Bridge      │
│   • Coping strategies            │   • Anonymized Guardian Alert       │
│   • Offline safety plan          │   • Demo Sandbox vs Pilot Mode      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack Specification

### 2.1. Native Android Implementation Stack
- **Language & Runtime:** Kotlin 2.0+ targeting Java 17 bytecode.
- **UI Toolkit:** Jetpack Compose (Material3 design system with custom child-friendly accessible components).
- **On-Device Inference Engine:** TensorFlow Lite (TFLite) 2.16 with Android Neural Networks API (NNAPI) delegate and GPU fallback.
- **Local Database:** Room Database backed by **SQLCipher** for 256-bit AES database encryption at rest.
- **Key Management:** Android Keystore System (`KeyGenParameterSpec` with `PURPOSE_ENCRYPT | PURPOSE_DECRYPT`, AES-GCM-NoPadding).
- **Concurrency & Flow:** Kotlin Coroutines & Asynchronous StateFlow pipelines.
- **Background Work:** WorkManager with strict network and battery constraint policies (restricted to maintenance only; no cloud ML inference).

### 2.2. Web Demonstration & Interactive Simulation Stack
- **Framework:** React 19 (ESModules) bundled with Vite 8.
- **State Architecture:** React Hooks (`useReducer`, `useMemo`, `useCallback`) with persistent encrypted local state adapters.
- **Iconography:** Lucide Icons.
- **Styling Architecture:** Modern responsive CSS with custom design tokens, dark/light theme variables, glassmorphic filters, and accessibility compliance.
- **Client Processing:** In-memory heuristic pipeline replicating on-device agent inference contracts and differential privacy federated learning math.

---

## 3. Agent Responsibilities & Machine Learning Specifications

### Agent A: Cyberbullying Detector
- **Model Architecture:** Quantized MobileBERT (`mobilebert-uncased-quantized`), fine-tuned on adolescent social media datasets and Ugandan colloquial English.
- **Input:** Tokenized message string ($L \le 256$ tokens).
- **Model Footprint:** $\le 24.5$ MB TFLite flatbuffer.
- **Inference Latency Target:** $< 45$ ms on mid-range Snapdragon 680 / MediaTek Helio G88.
- **Output Schema:**
  ```json
  {
    "agent_id": "cyberbullying_detector",
    "categories": ["insult", "exclusion", "threat", "humiliation"],
    "severity": "low | moderate | high | critical",
    "confidence": 0.88,
    "indicators": ["repeated_targeting_signal", "coercive_tone"]
  }
  ```

### Agent B: Online Sexual Safety & Coercion Detector
- **Model Architecture:** Dual-head hybrid classifier (DistilBERT + Behavioral Finite State Machine for grooming patterns).
- **Target Patterns:** Inappropriate adult-to-child contact, requests for private photos, secrecy demands ("don't tell your parents"), blackmail, location extraction.
- **Safety Boundary:** Strict prohibition against storing, caching, or rendering illicit imagery. Image inspection is restricted to on-device perceptual hash matching and local nudity suppression classifiers without persistent buffer storage.
- **Output Schema:**
  ```json
  {
    "agent_id": "sexual_safety_detector",
    "categories": ["grooming_attempt", "sextortion", "secrecy_demand", "unsafe_meeting"],
    "severity": "high | critical",
    "confidence": 0.94,
    "indicators": ["demands_photo", "threatens_public_leak"]
  }
  ```

### Agent C: Context & Uncertainty Assessor
- **Purpose:** Prevent destructive false positives arising from teenage sarcasm, gaming banter ("I'm gonna destroy you in FIFA"), or Ugandan slang (e.g., "Kwegayirira", "okulwanyisa").
- **Logic:**
  1. Detects isolated banter vs. systemic multi-message hostility.
  2. Penalizes confidence if conversational context is missing.
  3. Returns context vectors: `context_supports_concern`, `context_unclear`, or `context_reduces_concern`.

### Agent D: Child Support & Safety Coach
- **Purpose:** Child-facing empathetic counselor.
- **Rules:**
  - Zero shame or victim-blaming language.
  - Never guarantees unrealistic secrecy that compromises immediate physical safety.
  - Offers actionable micro-steps: "Take a 5-minute breather", "Block & Mute", "Save proof safely", "Talk to Mr. Okello".

### Agent E: Risk & Privacy Coordinator (Deterministic Enforcer)
- **Purpose:** Final arbiter and security gatekeeper.
- **Responsibilities:**
  - Combines agent vectors using deterministic rule matrices (never leaves safety decisions to uncontrolled LLM hallucination).
  - Enforces the **Data Sharing Allowlist**: prevents raw text from passing to external interfaces.
  - Initiates local buffer wipe upon decision completion.

---

## 4. Hardware Budgets & Performance Bounds

| Metric | Target Budget | Upper Bound Threshold |
| :--- | :--- | :--- |
| **Peak RAM Usage** | $\le 110$ MB | 160 MB |
| **Model Disk Size** | $\le 45$ MB (combined) | 65 MB |
| **Evaluation Latency** | $< 250$ ms end-to-end | 600 ms |
| **Battery Consumption** | $< 1.8\%$ over 24 hrs | 3.0% |
| **Minimum Android OS** | Android 10 (API 29) | Android 8.1 (API 27 with fallback) |
| **Network Data Required** | 0 KB (100% offline capable) | 0 KB |

---

## 5. Security & Cryptographic Safeguards

1. **Memory Invalidation:** JVM byte arrays holding raw text are overwritten with zero-bytes (`Arrays.fill(charArray, '\0')`) following inference completion.
2. **Android Keystore Protection:** Cryptographic keys reside inside hardware-backed Trusted Execution Environment (TEE) / StrongBox.
3. **No Backup Exemption:** `android:allowBackup="false"` in `AndroidManifest.xml` prevents ADB extraction or Google Drive cloud exposure of cached preferences.
4. **Screenshot Guard:** Sensitive safety coaching views toggle `FLAG_SECURE` to prevent unauthorized background OS capture or spyware screen recording.

---

## 6. Uganda Telephony & Safeguarding Bridge

SafeShield integrates with the **Uganda Child Helpline 116 (Sauti Helpline)** administered by the Ministry of Gender, Labour and Social Development (MGLSD):
- **Direct Dial Intent:** `Intent(Intent.ACTION_DIAL, Uri.parse("tel:116"))` (requires no privileged SMS/call log permissions).
- **Pilot Safeguarding Push API:** For controlled pilots with partner schools, anonymized payloads use ECDSA P-256 signatures over HTTPS with certificate pinning:
  ```json
  {
    "pilot_institution_code": "UG-KLA-SCH-041",
    "case_uuid": "e83f2a1b-9d4e-4f76-bc3a-9281a17fcd02",
    "threat_category": "sextortion",
    "risk_band": "CRITICAL",
    "timestamp_utc": "2026-10-24T09:40:00Z",
    "disclosure_payload": {
      "raw_text_included": false,
      "recommended_action": "Urgent in-person counseling required",
      "helpline_alerted": true
    }
  }
  ```

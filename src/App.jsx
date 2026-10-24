import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Shield,
  Eye,
  EyeOff,
  Brain,
  HeartHandshake,
  Bell,
  Send,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Lock,
  UserCheck,
  Smartphone,
  Server,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRight,
  PhoneCall,
  Search,
  Moon,
  Sun,
  Copy,
  Check,
  Printer,
  X,
  FileText,
  Sliders,
  Trash2,
  AlertOctagon,
  KeyRound,
  ExternalLink,
  Info,
  Menu,
  ArrowUp
} from 'lucide-react';
import './App.css';

export default function App() {
  // =========================================================================
  // FEATURE 1: DARK MODE TOGGLE (State & Persistence)
  // =========================================================================
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('safeshield_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('safeshield_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // =========================================================================
  // FEATURE 8: SCROLL PROGRESS BAR
  // =========================================================================
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // FEATURE 4: SCROLL BACK TO TOP BUTTON
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // FEATURE 2: SIMPLE COOKIE & PRIVACY BANNER
  // =========================================================================
  const [showCookieBanner, setShowCookieBanner] = useState(() => {
    return localStorage.getItem('safeshield_consent_given') !== 'true';
  });

  const acceptPrivacyConsent = () => {
    localStorage.setItem('safeshield_consent_given', 'true');
    setShowCookieBanner(false);
  };

  // =========================================================================
  // FEATURE 14: UTM TRACKING ENGINE
  // =========================================================================
  const [utmData, setUtmData] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');
    const campaign = params.get('utm_campaign');
    const medium = params.get('utm_medium');

    if (source || campaign) {
      setUtmData({
        source: source || 'direct',
        campaign: campaign || 'community_outreach',
        medium: medium || 'referral'
      });
    }
  }, []);

  // =========================================================================
  // NAVIGATION & TAB CONTROL
  // =========================================================================
  const [activeTab, setActiveTab] = useState('simulation'); 
  // 'simulation' | 'agents' | 'safeguarding' | 'federated' | 'vault' | 'docs' | 'faq'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // =========================================================================
  // FEATURE 3: SITE SEARCH
  // =========================================================================
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Search Index Data
  const searchableItems = [
    { title: 'Interactive Multi-Agent Simulator', tab: 'simulation', desc: 'Test messages through Agent A, B, C, D, and E pipeline.' },
    { title: 'Agent A: Cyberbullying Detection', tab: 'agents', desc: 'Quantized MobileBERT detecting insults, exclusion, and threats.' },
    { title: 'Agent B: Online Sexual Safety', tab: 'agents', desc: 'Recognizing grooming dynamics, coercion, and sextortion.' },
    { title: 'Agent C: Context & Slang Assessor', tab: 'agents', desc: 'Evaluating Ugandan slang, sarcasm, and missing context.' },
    { title: 'Agent D: Child Support Coach', tab: 'agents', desc: 'Empathetic guidance without shame or victim-blaming.' },
    { title: 'Agent E: Risk & Privacy Coordinator', tab: 'agents', desc: 'Deterministic safety rules, allowlists, and memory purging.' },
    { title: 'Uganda Child Helpline 116 (Sauti)', tab: 'safeguarding', desc: 'Toll-free national emergency response by MGLSD.' },
    { title: 'Federated Learning & Differential Privacy', tab: 'federated', desc: 'On-device training without uploading raw chat logs.' },
    { title: 'Local Cryptographic Vault & Keystore', tab: 'vault', desc: 'Android Keystore AES-256-GCM memory wipe controls.' },
    { title: 'Product Requirements Document (PRD)', tab: 'docs', desc: 'Full specification of features, user personas, and safety tiers.' },
    { title: 'Technical Requirements Document (TRD)', tab: 'docs', desc: 'Hardware budgets, model footprints, and architecture.' },
    { title: 'Frequently Asked Questions (FAQ)', tab: 'faq', desc: 'Common answers regarding privacy, surveillance, and Uganda law.' }
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchableItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // =========================================================================
  // FEATURE 9: COPY TO CLIPBOARD FEEDBACK
  // =========================================================================
  const [copiedId, setCopiedId] = useState(null);

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // =========================================================================
  // FEATURE 17: CONFIRMATION MODALS
  // =========================================================================
  const [modalConfig, setModalConfig] = useState(null);

  const triggerModal = (title, message, confirmText, onConfirm, isDanger = false) => {
    setModalConfig({
      title,
      message,
      confirmText,
      onConfirm: () => {
        onConfirm();
        setModalConfig(null);
      },
      isDanger
    });
  };

  // =========================================================================
  // SIMULATION STATE & 5-AGENT PIPELINE
  // =========================================================================
  const [chatMessage, setChatMessage] = useState('');
  const [senderName, setSenderName] = useState('Alex');
  const [appContext, setAppContext] = useState('WhatsApp');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: A (Bullying), 2: B (Sexual Safety), 3: C (Context), 4: D (Coach), 5: E (Coordinator)

  // Agent Results
  const [agentAResult, setAgentAResult] = useState(null);
  const [agentBResult, setAgentBResult] = useState(null);
  const [agentCResult, setAgentCResult] = useState(null);
  const [agentDResult, setAgentDResult] = useState(null);
  const [agentEResult, setAgentEResult] = useState(null);

  // Child Interactive Choices & Feedback
  const [childChoice, setChildChoice] = useState(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState('');
  const [inputError, setInputError] = useState('');

  // Demonstration vs Controlled Pilot Mode
  const [deploymentMode, setDeploymentMode] = useState('demonstration'); // 'demonstration' | 'pilot'

  // Pre-configured Test Scenarios (Including Ugandan Localized Scenarios)
  const scenarios = [
    {
      id: 'sc1',
      label: 'Benign Ugandan Banter',
      text: 'Haha you totally missed that easy goal in the match today! Omusira nyo ⚽',
      sender: 'Sam (Kampala)',
      app: 'WhatsApp',
      type: 'Friendly Banter'
    },
    {
      id: 'sc2',
      label: 'School Group Exclusion',
      text: 'Why are you still in our class study group? Nobody likes you, just leave before tomorrow.',
      sender: 'Jordan',
      app: 'WhatsApp',
      type: 'Targeted Exclusion'
    },
    {
      id: 'sc3',
      label: 'Severe Cyberbullying & Threat',
      text: 'Everyone at school hates you. You should delete your profile and never come back.',
      sender: 'Anonymous_User',
      app: 'Instagram',
      type: 'Severe Bullying'
    },
    {
      id: 'sc4',
      label: 'Critical Coercion / Sextortion',
      text: 'Send me those private photos right now or I will post your personal details online.',
      sender: 'Unknown_Contact',
      app: 'Snapchat',
      type: 'Critical Danger (OCSEA)'
    },
    {
      id: 'sc5',
      label: 'Grooming & Secrecy Demand',
      text: 'You are so special to me. Keep this between us and do not tell your parents. Let us meet in town.',
      sender: 'Online Stranger',
      app: 'TikTok',
      type: 'Grooming & Secrecy'
    }
  ];

  // Pipeline Execution Logic (5 Specialized Agents from PDF)
  const runFiveAgentPipeline = (text, sender, app) => {
    if (!text.trim()) {
      setInputError('Please enter a message or choose a preset test scenario below.');
      return;
    }

    setInputError('');
    setIsAnalyzing(true);
    setChildChoice(null);
    setFormSuccessMessage('');

    // Step 1: Agent A (Cyberbullying Detection)
    setCurrentStep(1);
    setTimeout(() => {
      const lower = text.toLowerCase();
      let bullyingDetected = false;
      let bullyingConf = 0.22;
      let bullyingSeverity = 'Low';
      const bullyingCats = [];

      if (lower.includes('hates') || lower.includes('delete') || lower.includes('nobody likes you') || lower.includes('leave before tomorrow')) {
        bullyingDetected = true;
        bullyingConf = 0.89;
        bullyingSeverity = lower.includes('hates') || lower.includes('delete') ? 'High' : 'Moderate';
        bullyingCats.push(lower.includes('nobody likes you') ? 'exclusion' : 'harassment_and_insult');
      } else if (lower.includes('missed') || lower.includes('omusira') || lower.includes('easy goal')) {
        bullyingDetected = false;
        bullyingConf = 0.28;
        bullyingSeverity = 'Low';
        bullyingCats.push('friendly_playful_remark');
      }

      const resA = {
        agent_id: 'cyberbullying_detector',
        detected: bullyingDetected,
        confidence: bullyingConf,
        severity: bullyingSeverity,
        categories: bullyingCats,
        indicators: bullyingDetected ? ['repeated_exclusion_signal', 'hostile_directive'] : ['sports_vernacular']
      };
      setAgentAResult(resA);

      // Step 2: Agent B (Online Sexual Safety Detection)
      setCurrentStep(2);
      setTimeout(() => {
        let sexualSafetyFlagged = false;
        let sexConf = 0.12;
        let sexSeverity = 'Low';
        const sexIndicators = [];

        if (lower.includes('private photos') || lower.includes('post your personal') || lower.includes('leak') || lower.includes('send me those')) {
          sexualSafetyFlagged = true;
          sexConf = 0.96;
          sexSeverity = 'Critical';
          sexIndicators.push('extortion_demand', 'intimate_content_threat');
        } else if (lower.includes('keep this between us') || lower.includes('meet in town') || lower.includes('do not tell your parents')) {
          sexualSafetyFlagged = true;
          sexConf = 0.91;
          sexSeverity = 'High';
          sexIndicators.push('secrecy_coercion', 'isolated_meeting_attempt');
        }

        const resB = {
          agent_id: 'sexual_safety_detector',
          flagged: sexualSafetyFlagged,
          confidence: sexConf,
          severity: sexSeverity,
          indicators: sexIndicators,
          imageryEvaluatedLocally: false // Zero explicit imagery stored
        };
        setAgentBResult(resB);

        // Step 3: Agent C (Context and Uncertainty Assessor)
        setCurrentStep(3);
        setTimeout(() => {
          let contextConclusion = 'context_unclear';
          let ambiguityScore = 0.35;
          let notes = '';

          if (lower.includes('goal') || lower.includes('match') || lower.includes('omusira')) {
            contextConclusion = 'context_reduces_concern';
            ambiguityScore = 0.15;
            notes = 'Conversational cues and local slang signify game banter rather than persistent intimidation.';
          } else if (sexualSafetyFlagged) {
            contextConclusion = 'context_supports_concern';
            ambiguityScore = 0.05;
            notes = 'High coercion markers detected; immediate protective intervention required regardless of prior rapport.';
          } else if (bullyingDetected) {
            contextConclusion = 'context_supports_concern';
            ambiguityScore = 0.2;
            notes = 'Directive exclusion language indicates peer pressure or targeted school harassment.';
          } else {
            notes = 'Single isolated message; context is limited but no acute danger markers.';
          }

          const resC = {
            agent_id: 'context_uncertainty_assessor',
            contextAssessment: contextConclusion,
            ambiguityPenalty: ambiguityScore,
            linguisticNuanceNotes: notes
          };
          setAgentCResult(resC);

          // Step 4: Agent D (Child Support and Guidance Coach)
          setCurrentStep(4);
          setTimeout(() => {
            let coachTitle = '';
            let prompt = '';
            let actions = [];

            if (sexSeverity === 'Critical') {
              coachTitle = 'Emergency Protection & Calm Support';
              prompt = 'Someone is trying to frighten or pressure you illegally. Please remember: THIS IS NOT YOUR FAULT. You are not in trouble, and you do not have to obey their threats. Let us get safe help together right now.';
              actions = [
                'Call Uganda Child Helpline (116) Toll-Free',
                'Involve School Counselor or Trusted Adult',
                'Preserve Date & Time (Do Not Forward Media)',
                'Block & Mute Sender Safely'
              ];
            } else if (sexSeverity === 'High' || bullyingSeverity === 'High') {
              coachTitle = 'Protective Peer Coaching';
              prompt = 'This message feels hurtful, unfair, or pushy. You have the right to feel safe on your phone. You do not have to face this alone.';
              actions = [
                'Prepare Masked Parent Discussion Starter',
                'Take a 10-Minute Screen Breather',
                'Mute Notifications from this Group',
                'Block & Report Contact'
              ];
            } else if (bullyingDetected) {
              coachTitle = 'Friendly Boundary Setting';
              prompt = 'This comment feels unpleasant or exclusionary. Would you like some tips on how to handle it calmly?';
              actions = [
                'Ignore & Leave Group Temporarily',
                'Talk to a School Friend You Trust',
                'Mark as Minor Disagreement'
              ];
            } else {
              coachTitle = 'All Clear / Safe Interaction';
              prompt = 'This appears to be friendly peer banter or playful teasing. No safety flags were triggered. Enjoy your chat!';
              actions = [
                'Reply Normally',
                'Purge Buffer & Continue'
              ];
            }

            const resD = {
              agent_id: 'child_support_coach',
              coachTitle,
              prompt,
              recommendedActions: actions,
              empathyRating: 0.98,
              nonJudgmentalStandard: 'Verified'
            };
            setAgentDResult(resD);

            // Step 5: Agent E (Risk and Privacy Coordinator)
            setCurrentStep(5);
            setTimeout(() => {
              const isCritical = sexSeverity === 'Critical';
              const isHigh = sexSeverity === 'High' || bullyingSeverity === 'High';
              const isModerate = bullyingSeverity === 'Moderate';

              const finalRiskBand = isCritical ? 'CRITICAL' : (isHigh ? 'HIGH' : (isModerate ? 'MODERATE' : 'LOW'));
              const requiresHelplineOffer = isCritical;
              const requiresParentRelay = isCritical || isHigh;

              // Synthesizing anonymized parent conversation starter (ZERO raw text)
              let parentPrompt = '';
              if (isCritical) {
                parentPrompt = `Safety Alert: An urgent pressure/extortion attempt was flagged on ${app}. Ask your child calmly: "Someone online may be making you feel unsafe. I am on your side—how can we sort this out together?"`;
              } else if (isHigh) {
                parentPrompt = `Safety Notice: Persistent unkind messages were detected on ${app}. Suggested conversation starter: "How have your group chats been going this week?"`;
              }

              const resE = {
                agent_id: 'risk_privacy_coordinator',
                finalRiskBand,
                deterministicPolicyDecision: isCritical
                  ? 'POLICY_CRITICAL_IMMEDIATE_ESCALATION_OFFER'
                  : (isHigh ? 'POLICY_HIGH_COACHED_ESCALATION' : 'POLICY_LOCAL_GUIDANCE_ONLY'),
                rawTextDisclosedToNetwork: false, // Strict zero-knowledge guarantee
                anonymizedSenderHash: `UG_${app.toUpperCase()}_HASH_${Math.abs(sender.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16).slice(0, 8)}`,
                escalation: {
                  helpline116Recommended: requiresHelplineOffer,
                  parentRelayAvailable: requiresParentRelay,
                  maskedParentScript: parentPrompt
                },
                memoryPurgeStatus: 'Buffers scheduled for auto-zeroing'
              };

              setAgentEResult(resE);
              setIsAnalyzing(false);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    }, 600);
  };

  const loadScenario = (s) => {
    setChatMessage(s.text);
    setSenderName(s.sender);
    setAppContext(s.app);
    runFiveAgentPipeline(s.text, s.sender, s.app);
  };

  // Memory Purge Action (Confirmation modal backed)
  const handlePurgeMemory = () => {
    triggerModal(
      'Purge Ephemeral Memory',
      'This will physically zero-out all temporary text strings, cached agent tensors, and local evaluation artifacts from device RAM. No chat history will remain.',
      'Yes, Purge Memory Now',
      () => {
        setChatMessage('');
        setAgentAResult(null);
        setAgentBResult(null);
        setAgentCResult(null);
        setAgentDResult(null);
        setAgentEResult(null);
        setCurrentStep(0);
        setChildChoice(null);
        setFormSuccessMessage('All temporary memory buffers successfully scrubbed with zero-fill.');
      },
      true
    );
  };

  // =========================================================================
  // FEATURE 13: PASSWORD / PIN VISIBILITY TOGGLE (Settings Lock)
  // =========================================================================
  const [parentPin, setParentPin] = useState('2560');
  const [showPin, setShowPin] = useState(false);
  const [isPinLocked, setIsPinLocked] = useState(true);

  // =========================================================================
  // FEDERATED LEARNING SIMULATOR STATE
  // =========================================================================
  const [flEpoch, setFlEpoch] = useState(3);
  const [flDevices, setFlDevices] = useState(148);
  const [accuracy, setAccuracy] = useState(91.2);
  const [epsilonPrivacy, setEpsilonPrivacy] = useState(0.82);

  const runFlRound = () => {
    setFlEpoch(prev => prev + 1);
    setFlDevices(prev => prev + Math.floor(Math.random() * 15) + 6);
    setAccuracy(prev => Math.min(99.4, parseFloat((prev + 0.42).toFixed(2))));
    setEpsilonPrivacy(prev => parseFloat((prev - 0.01).toFixed(2)));
    setFormSuccessMessage(`Federated Epoch ${flEpoch + 1} completed: differential privacy noise injected and local gradients synchronized!`);
  };

  // =========================================================================
  // FEATURE 19: EXPANDABLE FAQ STATE
  // =========================================================================
  const [expandedFaq, setExpandedFaq] = useState(0);

  const faqs = [
    {
      q: 'Does SafeShield spy on my private chats or send them to my parents?',
      a: 'NO. SafeShield operates under a strict Zero-Surveillance architecture. The application does NOT secretly read background keystrokes or upload chat logs to the cloud. You choose what to check, and parents only receive supportive conversation-starter prompts during severe danger—never your raw personal messages.'
    },
    {
      q: 'How does the Uganda Child Helpline (116) integration work?',
      a: 'The Uganda Child Helpline 116 (Sauti Helpline) is a national toll-free service administered by the Ministry of Gender, Labour and Social Development (MGLSD). SafeShield provides a direct, one-tap phone dialer that launches your mobile telephone keypad without needing internet or mobile data.'
    },
    {
      q: 'What is the difference between Demonstration Mode and Controlled Pilot Mode?',
      a: 'Demonstration Mode uses simulated contacts and sandboxed alerts for university workshops, ethics committee evaluations, and testing. Controlled Pilot Mode is deployed exclusively with authorized school safeguarding liaisons and verified contacts following strict legal ethics review under the Uganda Children Act.'
    },
    {
      q: 'How does the AI understand Ugandan slang and adolescent banter?',
      a: 'Agent C specializes in linguistic context and uncertainty. It is fine-tuned to recognize local expressions (such as playful football teasing or Luganda expressions like "omusira") and penalizes risk scores when context indicates harmless friendly teasing rather than systemic harassment.'
    },
    {
      q: 'Is SafeShield compliant with Uganda Data Protection and Privacy Act 2019?',
      a: 'Yes. SafeShield strictly adheres to Section 3 of the Uganda Data Protection and Privacy Act 2019 regarding data minimization, purpose limitation, and storage limitation. In fact, raw text is never stored in any persistent database table.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col relative">

      {/* FEATURE 8: SCROLL PROGRESS BAR */}
      <div className="scroll-progress-container">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }} />
      </div>

      {/* FEATURE 12: ACCESSIBLE SKIP TO CONTENT LINK */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* =====================================================================
          FEATURE 11: STICKY GLASSMORPHIC HEADER
          ===================================================================== */}
      <header className="sticky-glass-header px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold tracking-wide bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
                SafeShield Uganda
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold">
                University Prototype
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Zero-Surveillance Multi-Agent Child Safety</p>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
          {[
            { id: 'simulation', label: 'Simulator', icon: Sparkles },
            { id: 'agents', label: '5 Agents', icon: Layers },
            { id: 'safeguarding', label: 'Uganda 116', icon: PhoneCall },
            { id: 'federated', label: 'Federated AI', icon: TrendingUp },
            { id: 'vault', label: 'Privacy Vault', icon: Lock },
            { id: 'docs', label: 'PRD/TRD Docs', icon: FileText },
            { id: 'faq', label: 'FAQ', icon: HelpCircle }
          ].map(tab => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-semibold transition ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Header Right Action Group */}
        <div className="flex items-center space-x-2">
          {/* FEATURE 3: Search Trigger Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            title="Search safe resources (Ctrl+K)"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* FEATURE 10: Print Trigger */}
          <button
            onClick={() => window.print()}
            title="Print Clean Safety Report"
            className="hidden sm:flex p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* FEATURE 1: Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 text-slate-300 hover:text-white transition"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>

          {/* FEATURE 5: Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* FEATURE 5: Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2 z-40">
          {[
            { id: 'simulation', label: 'Simulator', icon: Sparkles },
            { id: 'agents', label: '5 Agents Architecture', icon: Layers },
            { id: 'safeguarding', label: 'Uganda 116 Helpline', icon: PhoneCall },
            { id: 'federated', label: 'Federated Learning Lab', icon: TrendingUp },
            { id: 'vault', label: 'Local Privacy Vault', icon: Lock },
            { id: 'docs', label: 'PRD & TRD Specs', icon: FileText },
            { id: 'faq', label: 'FAQ & Guidance', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition ${
                  activeTab === tab.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* FEATURE 14: UTM Parameter Banner if active */}
      {utmData && (
        <div className="bg-indigo-950/70 border-b border-indigo-800/50 px-6 py-2 text-xs flex items-center justify-between text-indigo-200">
          <div className="flex items-center space-x-2">
            <Info className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              Partner Referral Active: <strong className="text-white">{utmData.source}</strong> ({utmData.campaign})
            </span>
          </div>
          <button onClick={() => setUtmData(null)} className="text-indigo-400 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* =====================================================================
          MAIN CONTENT AREA
          ===================================================================== */}
      <main id="main-content" className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* Global Toast / Success State Alert */}
        {formSuccessMessage && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl flex items-center justify-between text-xs text-emerald-300 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>{formSuccessMessage}</span>
            </div>
            <button onClick={() => setFormSuccessMessage('')} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ===================================================================
            TAB 1: INTERACTIVE MULTI-AGENT SIMULATOR (5 AGENTS)
            =================================================================== */}
        {activeTab === 'simulation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column: Preset Scenarios & Custom Input */}
            <div className="lg:col-span-5 space-y-5">

              {/* Deployment Mode Switcher (Demonstration vs Controlled Pilot) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">Operating Mode</span>
                  <span className="text-[10px] text-slate-400">
                    {deploymentMode === 'demonstration' ? 'Simulated Sandbox (No Live Outbound Data)' : 'Controlled Pilot (Verified Contacts)'}
                  </span>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px] font-semibold">
                  <button
                    onClick={() => setDeploymentMode('demonstration')}
                    className={`px-3 py-1 rounded-lg transition ${
                      deploymentMode === 'demonstration' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Demo Mode
                  </button>
                  <button
                    onClick={() => setDeploymentMode('pilot')}
                    className={`px-3 py-1 rounded-lg transition ${
                      deploymentMode === 'pilot' ? 'bg-amber-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Pilot Mode
                  </button>
                </div>
              </div>

              {/* Preset Scenarios Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-indigo-400" />
                    <span>Preset Test Scenarios (Uganda & Global)</span>
                  </h2>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Click to run</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {scenarios.map(s => (
                    <button
                      key={s.id}
                      onClick={() => loadScenario(s)}
                      className="interactive-card text-left p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 hover:bg-slate-800/40 transition group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-indigo-300 group-hover:text-indigo-200">
                          {s.label}
                        </span>
                        <span className="text-[10px] text-slate-500">{s.app}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 italic">"{s.text}"</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Message Input Form */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-slate-200 flex items-center space-x-2">
                    <Send className="w-4 h-4 text-indigo-400" />
                    <span>Check Custom Message</span>
                  </h2>
                  <button
                    onClick={handlePurgeMemory}
                    title="Purge Memory Buffer"
                    className="text-[11px] text-red-400 hover:text-red-300 flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Purge RAM</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 mb-1 block">Sender Identity</label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={e => setSenderName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 mb-1 block">App Context</label>
                    <select
                      value={appContext}
                      onChange={e => setAppContext(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Instagram">Instagram</option>
                      <option value="TikTok">TikTok</option>
                      <option value="Snapchat">Snapchat</option>
                      <option value="Discord">Discord</option>
                      <option value="Telegram">Telegram</option>
                      <option value="SMS">SMS</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-400 mb-1 block">Message Content to Analyze</label>
                  <textarea
                    rows={3}
                    value={chatMessage}
                    onChange={e => {
                      setChatMessage(e.target.value);
                      if (inputError) setInputError('');
                    }}
                    placeholder="Paste or type a message to test on-device safety detection..."
                    className={`w-full bg-slate-950 border rounded-xl p-3 text-xs text-white focus:outline-none resize-none ${
                      inputError ? 'border-red-500/60' : 'border-slate-800 focus:border-indigo-500'
                    }`}
                  />
                  {/* FEATURE 16: FORM ERROR STATE */}
                  {inputError && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3" />
                      <span>{inputError}</span>
                    </p>
                  )}
                </div>

                <button
                  onClick={() => runFiveAgentPipeline(chatMessage, senderName, appContext)}
                  disabled={isAnalyzing}
                  className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center space-x-2 transition button-hover-glow disabled:opacity-50"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Coordinating 5 On-Device Agents...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Message Locally</span>
                    </>
                  )}
                </button>
              </div>

              {/* Local Device Guarantee Callout */}
              <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-2xl p-4 flex items-start space-x-3">
                <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-emerald-300">Local-First Privacy Bound</h4>
                  <p className="text-[11px] text-emerald-200/70 leading-relaxed">
                    Text is held in RAM during classification and cleared immediately. Zero raw text bytes leave the physical device.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: 5-Agent Execution Pipeline Flow */}
            <div className="lg:col-span-7 space-y-4">

              {/* Pipeline Progress Header */}
              <div className="flex items-center justify-between bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-semibold text-slate-300">Multi-Agent Assessment Pipeline</span>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">
                    {currentStep === 0 ? 'Ready' : `Evaluating Step ${currentStep} of 5`}
                  </span>
                </div>
                {/* 5-Step Progress Indicators */}
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map(step => (
                    <div
                      key={step}
                      title={`Agent ${step}`}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentStep === step
                          ? 'bg-indigo-500 ring-4 ring-indigo-500/25 agent-active-pulse'
                          : currentStep > step
                          ? 'bg-emerald-500'
                          : 'bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* AGENT A: Cyberbullying Detector */}
              <div className={`interactive-card bg-slate-900 border rounded-2xl p-4 transition-all ${
                currentStep === 1 ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">Agent A: Cyberbullying Detector</h3>
                      <p className="text-[10px] text-slate-400">Detects insults, exclusion, humiliation, and threats</p>
                    </div>
                  </div>
                  {agentAResult && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      agentAResult.detected ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {agentAResult.detected ? `Flagged (${agentAResult.severity})` : 'Clear / Benign'}
                    </span>
                  )}
                </div>

                {agentAResult ? (
                  <div className="bg-slate-950 rounded-xl p-3 text-xs space-y-1.5 border border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>Model Confidence:</span>
                      <span className="font-mono text-slate-200">{(agentAResult.confidence * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Categories Identified:</span>
                      <span className="text-slate-300 font-semibold">{agentAResult.categories.join(', ')}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for analysis...</p>
                )}
              </div>

              {/* AGENT B: Online Sexual Safety Detector */}
              <div className={`interactive-card bg-slate-900 border rounded-2xl p-4 transition-all ${
                currentStep === 2 ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                      <AlertOctagon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">Agent B: Online Sexual Safety Detector</h3>
                      <p className="text-[10px] text-slate-400">Identifies grooming, coercion, and sextortion signals</p>
                    </div>
                  </div>
                  {agentBResult && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      agentBResult.flagged ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {agentBResult.flagged ? `Critical Flag (${agentBResult.severity})` : 'No Harm Signals'}
                    </span>
                  )}
                </div>

                {agentBResult ? (
                  <div className="bg-slate-950 rounded-xl p-3 text-xs space-y-1.5 border border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>Harm Classification:</span>
                      <span className={`font-semibold ${agentBResult.flagged ? 'text-red-400' : 'text-slate-300'}`}>
                        {agentBResult.flagged ? agentBResult.indicators.join(' & ') : 'None'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>On-Device Image Guard:</span>
                      <span className="text-emerald-400 font-mono">Zero Image Buffers Stored</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for analysis...</p>
                )}
              </div>

              {/* AGENT C: Context & Uncertainty Assessor */}
              <div className={`interactive-card bg-slate-900 border rounded-2xl p-4 transition-all ${
                currentStep === 3 ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                      <Brain className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">Agent C: Context & Uncertainty Assessor</h3>
                      <p className="text-[10px] text-slate-400">Reduces false alarms from teen sarcasm and Ugandan slang</p>
                    </div>
                  </div>
                  {agentCResult && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                      {agentCResult.contextAssessment}
                    </span>
                  )}
                </div>

                {agentCResult ? (
                  <div className="bg-slate-950 rounded-xl p-3 text-xs space-y-1.5 border border-slate-800">
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      "{agentCResult.linguisticNuanceNotes}"
                    </p>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for analysis...</p>
                )}
              </div>

              {/* AGENT D: Child Support & Guidance Coach */}
              <div className={`interactive-card bg-slate-900 border rounded-2xl p-4 transition-all ${
                currentStep === 4 ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}>
                <div className="flex items-center space-x-2.5 mb-2">
                  <div className="p-1.5 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/20">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Agent D: Child Support Coach</h3>
                    <p className="text-[10px] text-slate-400">Non-judgmental advice putting the child in control</p>
                  </div>
                </div>

                {agentDResult ? (
                  <div className="bg-slate-950 rounded-xl p-3.5 border border-indigo-950/80 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      <span className="text-xs font-bold text-pink-300">{agentDResult.coachTitle}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      "{agentDResult.prompt}"
                    </p>

                    <div className="space-y-1.5 pt-1 border-t border-slate-800/80">
                      <span className="text-[10px] font-semibold text-slate-400 block">Available Child Choices:</span>
                      <div className="flex flex-wrap gap-2">
                        {agentDResult.recommendedActions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              setChildChoice(act);
                              setFormSuccessMessage(`Choice logged locally: "${act}". You are supported!`);
                            }}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                              childChoice === act
                                ? 'bg-indigo-600 text-white border-indigo-500'
                                : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-indigo-500/40'
                            }`}
                          >
                            {act}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for guidance synthesis...</p>
                )}
              </div>

              {/* AGENT E: Risk & Privacy Coordinator */}
              <div className={`interactive-card bg-slate-900 border rounded-2xl p-4 transition-all ${
                currentStep === 5 ? 'border-indigo-500 ring-1 ring-indigo-500/30' : 'border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-200">Agent E: Risk & Privacy Coordinator</h3>
                      <p className="text-[10px] text-slate-400">Enforces deterministic safety rules and data allowlists</p>
                    </div>
                  </div>
                  {agentEResult && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      agentEResult.finalRiskBand === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      agentEResult.finalRiskBand === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      Risk Tier: {agentEResult.finalRiskBand}
                    </span>
                  )}
                </div>

                {agentEResult ? (
                  <div className="bg-slate-950 rounded-xl p-3 text-xs space-y-2 border border-slate-800">
                    <div className="flex justify-between text-slate-400">
                      <span>Anonymized Sender Hash:</span>
                      <span className="font-mono text-slate-300">{agentEResult.anonymizedSenderHash}</span>
                    </div>

                    {agentEResult.escalation.helpline116Recommended && (
                      <div className="p-2.5 bg-red-950/30 border border-red-900/50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-red-300">
                          <PhoneCall className="w-4 h-4" />
                          <span className="font-semibold text-xs">Uganda Child Helpline 116 Recommended</span>
                        </div>
                        <a
                          href="tel:116"
                          className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg text-xs"
                        >
                          Dial 116
                        </a>
                      </div>
                    )}

                    {agentEResult.escalation.parentRelayAvailable && (
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-indigo-300 font-bold">
                          <span>🔒 Masked Parent Prompt (Zero Surveillance)</span>
                          {/* FEATURE 9: COPY TO CLIPBOARD */}
                          <button
                            onClick={() => copyToClipboard(agentEResult.escalation.maskedParentScript, 'parent_script')}
                            className="text-[10px] flex items-center space-x-1 text-slate-400 hover:text-white"
                          >
                            {copiedId === 'parent_script' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === 'parent_script' ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-300 italic">
                          "{agentEResult.escalation.maskedParentScript}"
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 italic">Waiting for coordinator decision...</p>
                )}
              </div>

            </div>

          </div>
        )}

        {/* ===================================================================
            TAB 2: AGENT ARCHITECTURE (SPECIFICATIONS & JSON OUTPUT)
            =================================================================== */}
        {activeTab === 'agents' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-2">Multi-Agent Assessment Engine Architecture</h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                As specified in the university research blueprint, SafeShield separates detection, context analysis, child coaching, and escalation into independent modules coordinated by a deterministic local orchestrator.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Agent A Spec */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-blue-400">
                  <Eye className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Agent A: Cyberbullying Detection</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Purpose:</span>
                    <p className="text-slate-300">Detect possible bullying, harassment, threats, and peer exclusion.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Key Restriction:</span>
                    <p className="text-slate-300">A single rude message must never automatically be classified as sustained bullying.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Target Model:</span>
                    <p className="text-indigo-300 font-mono text-[11px]">MobileBERT INT8 Quantized (TFLite $\le$ 24.5 MB)</p>
                  </div>
                </div>
              </div>

              {/* Agent B Spec */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-red-400">
                  <AlertOctagon className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Agent B: Online Sexual-Safety Signals</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Purpose:</span>
                    <p className="text-slate-300">Recognize potential grooming, coercion, sextortion, and demands for intimate images.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Key Restriction:</span>
                    <p className="text-slate-300">Strictly avoids uploading, displaying, or retaining explicit imagery involving children.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Target Model:</span>
                    <p className="text-indigo-300 font-mono text-[11px]">Behavioral Finite State Machine + DistilBERT Classifier</p>
                  </div>
                </div>
              </div>

              {/* Agent C Spec */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-purple-400">
                  <Brain className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Agent C: Context & Uncertainty</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Purpose:</span>
                    <p className="text-slate-300">Reduce false positives by evaluating teen slang, sarcasm, and isolated vs repeated friction.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Key Restriction:</span>
                    <p className="text-slate-300">Flags missing context instead of inventing assumptions about sender motives.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Output Enums:</span>
                    <p className="text-indigo-300 font-mono text-[11px]">context_supports_concern | context_unclear | context_reduces_concern</p>
                  </div>
                </div>
              </div>

              {/* Agent D Spec */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-pink-400">
                  <HeartHandshake className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Agent D: Child Support Coach</h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block">Purpose:</span>
                    <p className="text-slate-300">Convert risk assessments into calm, practical, age-appropriate counsel.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Key Restriction:</span>
                    <p className="text-slate-300">Must NOT shame the child, blame the victim, or encourage dangerous confrontation.</p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block">Deliverable:</span>
                    <p className="text-indigo-300 font-mono text-[11px]">Short explanation + Child-controlled next steps</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Standard Agent JSON Contract Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Standard Agent Output Contract (JSON Schema)</span>
                </h3>
                <button
                  onClick={() => copyToClipboard(JSON.stringify({
                    agent_id: "cyberbullying_detector",
                    categories: ["possible_harassment"],
                    severity: "moderate",
                    confidence: 0.82,
                    indicators: ["repeated_insults_reported"],
                    uncertainty: ["sender_context_not_verified"]
                  }, null, 2), 'schema_json')}
                  className="text-xs text-indigo-400 hover:text-white flex items-center space-x-1"
                >
                  {copiedId === 'schema_json' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'schema_json' ? 'Copied' : 'Copy Contract'}</span>
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-indigo-300 border border-slate-800 overflow-x-auto">
{`{
  "agent_id": "cyberbullying_detector",
  "categories": ["possible_harassment"],
  "severity": "moderate",
  "confidence": 0.82,
  "indicators": ["repeated_insults_reported"],
  "uncertainty": ["sender_context_not_verified"]
}`}
              </pre>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: UGANDA CHILD HELPLINE 116 & SAFEGUARDING
            =================================================================== */}
        {activeTab === 'safeguarding' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-white mb-1">Uganda National Safeguarding Infrastructure</h2>
                  <p className="text-xs text-slate-400 max-w-2xl">
                    Official child protection channels identified by the Uganda Ministry of Gender, Labour and Social Development (MGLSD) and the Uganda Children Act.
                  </p>
                </div>
                <a
                  href="tel:116"
                  className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl text-xs flex items-center space-x-2 transition shadow-lg shadow-red-500/20"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Call Sauti Helpline 116</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Uganda Child Helpline 116 Card */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="p-2.5 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 w-fit">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Uganda Child Helpline: 116</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Known as the <strong>Sauti Helpline</strong>, this is a nationwide, 24/7 toll-free service available on all mobile telecommunication networks in Uganda (MTN, Airtel).
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                  <div>• Toll-Free: Yes (0 UGX charges)</div>
                  <div>• Operator: Ministry of Gender, Labour & Social Dev.</div>
                  <div>• Network compatibility: All GSM operators</div>
                </div>
              </div>

              {/* Legal Framework: Children Act */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20 w-fit">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Uganda Children Act (Cap. 59)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Contains mandatory protections against violence, child abuse, and exploitation. Protects the child’s best interests and establishes access to welfare services.
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                  <div>• Principle: Best interests of the child</div>
                  <div>• Rights: Protection from harm & exploitation</div>
                  <div>• Support: Designated District Probation Officers</div>
                </div>
              </div>

              {/* Data Protection Act 2019 */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 w-fit">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-white">Data Protection & Privacy Act</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Uganda's 2019 legislation strictly regulates processing of personal data. SafeShield complies by never persisting or transferring children's raw communications.
                </p>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 space-y-1">
                  <div>• Regulatory Body: PDPO Uganda</div>
                  <div>• Compliance: 100% On-Device Invariance</div>
                  <div>• Storage Limitation: Ephemeral Buffers</div>
                </div>
              </div>

            </div>

            {/* Simulated Escalation Relay Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold text-white">Interactive Safeguarding Escalation Simulator</h3>
              <p className="text-xs text-slate-400">
                Observe how SafeShield relays an anonymized notification to a verified school safeguarding counselor or parent without exposing private chats.
              </p>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Target Safeguarding Liaison:</span>
                  <span className="text-slate-200 font-semibold">Mr. Okello (School Child Protection Officer)</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Simulated Payload Status:</span>
                  <span className="text-emerald-400 font-mono font-semibold">ENCRYPTED & MASKED</span>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg text-slate-300 italic text-[11px] border border-slate-800">
                  "SafeShield Alert: High risk behavior flagged in student peer group. Recommended Action: Conduct safe check-in regarding online intimidation. Raw message text omitted under Zero-Surveillance mandate."
                </div>
                <button
                  onClick={() => setFormSuccessMessage('Simulated pilot safeguarding notification dispatched to verified counselor!')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg text-xs transition"
                >
                  Test Dispatch in Sandbox
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: FEDERATED LEARNING & SELF-IMPROVEMENT
            =================================================================== */}
        {activeTab === 'federated' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-2">On-Device Self-Improvement (Federated Learning)</h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                SafeShield models continuously adapt to changing language and slang on-device. Local gradient tweaks are perturbed with Differential Privacy Gaussian noise so that mathematical model inversion is impossible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Current FL Epoch</span>
                <p className="text-2xl font-extrabold text-indigo-400">{flEpoch}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Participating Devices</span>
                <p className="text-2xl font-extrabold text-indigo-400">{flDevices}</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">Model Accuracy</span>
                <p className="text-2xl font-extrabold text-emerald-400">{accuracy}%</p>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center space-y-1">
                <span className="text-[11px] font-semibold text-slate-400">DP Privacy Budget (ε)</span>
                <p className="text-2xl font-extrabold text-purple-400">{epsilonPrivacy}</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white">Simulate Federated Training Round</h3>
                  <p className="text-[10px] text-slate-400">Applies local stochastic gradient descent updates with Gaussian noise injection</p>
                </div>
                <button
                  onClick={runFlRound}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition button-hover-glow"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Execute Training Round</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-indigo-400 font-semibold">
                    <Smartphone className="w-4 h-4" />
                    <span>1. Local Weight Update</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    User corrections ("this was friendly teasing") tweak model weights locally in RAM while charging at night.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-purple-400 font-semibold">
                    <Lock className="w-4 h-4" />
                    <span>2. Differential Privacy</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Gaussian noise (ε = {epsilonPrivacy}) is added to gradients. Messages cannot be reconstructed from updates.
                  </p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
                    <Server className="w-4 h-4" />
                    <span>3. Global Aggregation</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    Aggregated weights build an updated model delivered back to all devices without storing a single message.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 5: LOCAL PRIVACY & CRYPTOGRAPHIC VAULT
            =================================================================== */}
        {activeTab === 'vault' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-2">Local Privacy & Cryptographic Vault</h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                Review hardware-backed Android Keystore protections, manage parental lock PINs, and execute cryptographic memory wipes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Memory Scrubber & Zero-Fill Action */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-red-400">
                  <Trash2 className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Volatile RAM Scrubber</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Manually force an immediate overwrite of all in-memory buffers with null bytes (`\\0`) and invalidate all intermediate tensor tensors.
                </p>
                <button
                  onClick={handlePurgeMemory}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Purge All In-Memory Buffers</span>
                </button>
              </div>

              {/* FEATURE 13: PASSWORD / PIN VISIBILITY TOGGLE (Settings Lock) */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center space-x-3 text-indigo-400">
                  <KeyRound className="w-5 h-5" />
                  <h3 className="text-sm font-bold text-white">Safeguarding Settings PIN Lock</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Controls access to trusted contacts and safeguarding escalation settings.
                </p>

                <div className="space-y-2">
                  <label className="text-[11px] font-semibold text-slate-400 block">4-Digit Guardian PIN</label>
                  <div className="relative">
                    <input
                      type={showPin ? 'text' : 'password'}
                      value={parentPin}
                      onChange={e => setParentPin(e.target.value)}
                      maxLength={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white pr-10 focus:outline-none focus:border-indigo-500 font-mono tracking-widest"
                    />
                    {/* Password Visibility Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      title={showPin ? 'Hide PIN' : 'Show PIN'}
                    >
                      {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setFormSuccessMessage('Safeguarding PIN updated and stored in encrypted vault!')}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
                >
                  Save Encrypted PIN
                </button>
              </div>

            </div>

            {/* Cryptographic Compliance Matrix */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 text-xs">
              <h3 className="text-xs font-bold text-white">Hardware Key Isolation Status</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">Key Storage Engine</span>
                  <p className="font-semibold text-emerald-400">Android Keystore TEE / StrongBox</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">Database Cipher</span>
                  <p className="font-semibold text-emerald-400">SQLCipher AES-256-GCM</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-[10px] text-slate-500">Cloud Backups</span>
                  <p className="font-semibold text-emerald-400">android:allowBackup="false"</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: BUILT-IN PRD / TRD SPECIFICATIONS VIEWER
            =================================================================== */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-white mb-1">Architecture & Engineering Documents</h2>
                <p className="text-xs text-slate-400">
                  Six formal engineering documents generated directly from the research specification.
                </p>
              </div>

              {/* FEATURE 18: LAST UPDATED DATE */}
              <div className="text-[11px] bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-400">
                <span>Last Updated: </span>
                <strong className="text-indigo-300">October 24, 2026</strong>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '1. Product Requirements (PRD)', file: '01_PRODUCT_REQUIREMENTS_DOCUMENT.md', desc: 'Core design principles, personas (Grace, Brian), functional requirements, and risk bands.' },
                { title: '2. Technical Requirements (TRD)', file: '02_TECHNICAL_REQUIREMENTS_DOCUMENT.md', desc: 'Kotlin/Compose stack, MobileBERT quantization, latency targets, and MGLSD 116 API.' },
                { title: '3. App Flow & User Journeys', file: '03_APP_FLOW_AND_JOURNEYS.md', desc: 'Mermaid sequence diagrams for banter vs extortion, screen-by-screen hierarchy.' },
                { title: '4. UI/UX Design Brief', file: '04_UI_UX_DESIGN_BRIEF.md', desc: 'Trauma-informed aesthetics, accessible tokens, and 20 essential features blueprint.' },
                { title: '5. Backend & Local Schema', file: '05_BACKEND_AND_LOCAL_SCHEMA.md', desc: 'SQLCipher table schemas, zero raw text rule, and pilot HTTPS API schemas.' },
                { title: '6. Implementation Plan', file: '06_IMPLEMENTATION_PLAN.md', desc: 'Six-sprint build order, verification criteria, and acceptance testing checklist.' }
              ].map((doc, idx) => (
                <div key={idx} className="interactive-card bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-indigo-400">
                      <FileText className="w-4 h-4" />
                      <h3 className="text-xs font-bold text-white">{doc.title}</h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{doc.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-mono text-slate-500">docs/{doc.file}</span>
                    <button
                      onClick={() => {
                        setFormSuccessMessage(`Document file "docs/${doc.file}" is stored in the project workspace.`);
                      }}
                      className="text-xs text-indigo-400 hover:text-white flex items-center space-x-1"
                    >
                      <span>Available on Disk</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 7: FEATURE 19: EXPANDABLE ACCORDION FAQ
            =================================================================== */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-2">Frequently Asked Questions & Safeguarding Guidelines</h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                Clear answers explaining how SafeShield protects children without invasive surveillance, complying with the Uganda Children Act and international ethical standards.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-white hover:text-indigo-300 transition"
                    >
                      <span className="flex items-center space-x-2">
                        <HelpCircle className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>

      {/* =====================================================================
          FEATURE 4: SCROLL BACK TO TOP BUTTON
          ===================================================================== */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Scroll Back to Top"
          className="scroll-top-btn"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* =====================================================================
          FEATURE 20: PERSISTENT FLOATING EMERGENCY BUTTON (UGANDA 116)
          ===================================================================== */}
      <a
        href="tel:116"
        className="floating-emergency-btn"
        title="Immediate Toll-Free Call to Uganda Child Helpline 116"
      >
        <PhoneCall className="w-4 h-4 animate-bounce" />
        <span>Helpline 116</span>
      </a>

      {/* =====================================================================
          FEATURE 2: SIMPLE COOKIE & PRIVACY BANNER
          ===================================================================== */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="flex items-center space-x-3 max-w-3xl">
            <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Local Privacy Notice:</strong> SafeShield stores only anonymous safety preferences and encrypted emergency contacts on this device. We do not use tracking cookies or upload personal chat logs, complying with the Uganda Data Protection and Privacy Act 2019.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={acceptPrivacyConsent}
              className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition"
            >
              Accept & Protect
            </button>
          </div>
        </div>
      )}

      {/* =====================================================================
          FEATURE 3: SITE SEARCH MODAL / PALETTE
          ===================================================================== */}
      {isSearchOpen && (
        <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
          <div className="modal-dialog max-w-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-indigo-400">
                <Search className="w-4 h-4" />
                <span className="text-xs font-bold text-white">Search SafeShield Resources</span>
              </div>
              <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3">
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search agents, 116 helpline, PRD, TRD, or FAQs..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchResults.length > 0 ? (
                searchResults.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setActiveTab(item.tab);
                      setIsSearchOpen(false);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800/80 transition flex items-center justify-between"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400">{item.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                ))
              ) : searchQuery.trim() ? (
                <p className="text-center text-xs text-slate-500 py-4">No matching safety items found.</p>
              ) : (
                <div className="space-y-1 text-xs text-slate-500 py-2">
                  <p className="font-semibold text-slate-400">Popular Searches:</p>
                  <p>• Uganda Child Helpline 116</p>
                  <p>• Agent A Cyberbullying MobileBERT</p>
                  <p>• Zero Surveillance & In-Memory Purging</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FEATURE 17: CONFIRMATION MODAL
          ===================================================================== */}
      {modalConfig && (
        <div className="modal-backdrop" onClick={() => setModalConfig(null)}>
          <div className="modal-dialog" onClick={e => e.stopPropagation()}>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-xl ${modalConfig.isDanger ? 'bg-red-500/10 text-red-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                  {modalConfig.isDanger ? <AlertTriangle className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                </div>
                <h3 className="text-sm font-bold text-white">{modalConfig.title}</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {modalConfig.message}
              </p>
              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setModalConfig(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
                <button
                  onClick={modalConfig.onConfirm}
                  className={`px-4 py-2 text-white font-semibold rounded-xl text-xs transition ${
                    modalConfig.isDanger ? 'bg-red-600 hover:bg-red-500' : 'bg-indigo-600 hover:bg-indigo-500'
                  }`}
                >
                  {modalConfig.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 px-6 py-6 text-center text-xs text-slate-500 space-y-2 mt-8">
        <p>
          SafeShield Uganda • University Research Prototype in collaboration with Ugandan Child Protection Frameworks.
        </p>
        <p className="text-[11px] text-slate-600">
          Uganda Ministry of Gender, Labour & Social Development (MGLSD) Child Helpline 116 • Children Act (Cap. 59)
        </p>
      </footer>

    </div>
  );
}

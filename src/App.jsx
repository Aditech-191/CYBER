import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  Cpu,
  Zap,
  Sparkles,
  Layers,
  Activity,
  Share2,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  RefreshCw,
  Send,
  MessageSquare,
  Heart,
  Smile,
  UserCheck,
  Smartphone,
  Server,
  TrendingUp,
  ChevronRight,
  ChevronDown,
  HelpCircle,
  Info,
  X,
  Check,
  Copy,
  FileText,
  Sliders,
  Trash2,
  ExternalLink,
  Terminal,
  ArrowRight,
  Search,
  PhoneCall,
  Bell,
  Play,
  RotateCcw,
  CheckCircle2,
  Radio,
  BarChart3,
  Flame,
  Award,
  Filter
} from 'lucide-react';
import './App.css';

export default function App() {
  // =========================================================================
  // CORE NAVIGATION & PERSPECTIVE STATE
  // =========================================================================
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'architecture' | 'federated' | 'privacy'
  const [activePersona, setActivePersona] = useState('all'); // 'all' | 'child' | 'parent' | 'developer'
  const [copiedId, setCopiedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Copy helper
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // =========================================================================
  // SCENARIOS PRESET REPOSITORY
  // =========================================================================
  const scenarios = [
    {
      id: 'banter',
      title: 'Friendly Banter',
      tag: 'Safe / Playful',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      text: 'Haha you totally choked that penalty kick in the final minute bro! 😂 Missed the whole goal!',
      sender: 'Marcus (Friend)',
      platform: 'WhatsApp',
      type: 'Friendly Sports Banter'
    },
    {
      id: 'teasing',
      title: 'Group Exclusion / Teasing',
      tag: 'Moderate Risk',
      tagColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      text: 'Why are you even in this voice chat? Nobody wanted you here, just leave the call already.',
      sender: 'Ghost_Rider99',
      platform: 'Discord',
      type: 'Peer Exclusion'
    },
    {
      id: 'bullying',
      title: 'Severe Cyberbullying',
      tag: 'High Risk',
      tagColor: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      text: 'Everyone at school talks trash about you. You have zero friends. Delete your account and disappear.',
      sender: 'AnonSchool_24',
      platform: 'Instagram',
      type: 'Persistent Targeted Harassment'
    },
    {
      id: 'grooming_crisis',
      title: 'Grooming & Coercion Crisis',
      tag: 'Critical Risk',
      tagColor: 'text-red-400 bg-red-500/10 border-red-500/20',
      text: 'You are so special and mature for your age. Keep this secret and don\'t tell your parents. Send me those private pics right now or I will leak your address to everyone at school.',
      sender: 'Unknown_Vip',
      platform: 'Snapchat',
      type: 'OCSEA / Sextortion Coercion'
    }
  ];

  // =========================================================================
  // SIMULATION STATE & 4-AGENT PIPELINE
  // =========================================================================
  const [chatMessage, setChatMessage] = useState(scenarios[0].text);
  const [senderName, setSenderName] = useState(scenarios[0].sender);
  const [platform, setPlatform] = useState(scenarios[0].platform);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Ambient, 2: Contextual, 3: Peer Coach, 4: SafeNet Relay
  const [selectedScenarioId, setSelectedScenarioId] = useState('banter');

  // Agent Pipeline Results
  const [agent1Result, setAgent1Result] = useState(null); // Ambient Guardian
  const [agent2Result, setAgent2Result] = useState(null); // Contextual Assessor
  const [agent3Result, setAgent3Result] = useState(null); // Peer Coach
  const [agent4Result, setAgent4Result] = useState(null); // SafeNet Relay

  // Interactive Child Decision State
  const [childResponse, setChildResponse] = useState(null);
  const [practiceReplyText, setPracticeReplyText] = useState('');
  const [childFeedbackNotice, setChildFeedbackNotice] = useState('');

  // Memory Purge Modal
  const [showPurgeModal, setShowPurgeModal] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  // Hardware Telemetry Real-time Simulator
  const [edgeStats, setEdgeStats] = useState({
    latencyMs: 24,
    ramUsageMb: 36.8,
    batteryPerHr: 0.28,
    npuLoadPct: 12
  });

  // Run the 4-Agent Pipeline
  const runPipeline = (customText = null, customSender = null, customPlatform = null) => {
    const textToAnalyze = customText !== null ? customText : chatMessage;
    const sender = customSender !== null ? customSender : senderName;
    const appPlatform = customPlatform !== null ? customPlatform : platform;

    if (!textToAnalyze.trim()) return;

    setIsAnalyzing(true);
    setCurrentStep(1);
    setChildResponse(null);
    setChildFeedbackNotice('');
    setPracticeReplyText('');

    const lower = textToAnalyze.toLowerCase();

    // Determine harm characteristics
    const hasSextortion = lower.includes('private pic') || lower.includes('leak') || lower.includes('address') || lower.includes('secret') || lower.includes('mature for your age');
    const hasBullying = lower.includes('disappear') || lower.includes('zero friends') || lower.includes('trash') || lower.includes('delete your account') || lower.includes('nobody wanted you');
    const hasExclusion = lower.includes('leave the call') || lower.includes('voice chat') || lower.includes('nobody wanted you');
    const isBanter = lower.includes('penalty kick') || lower.includes('bro') || lower.includes('😂') || lower.includes('goal');

    // STEP 1: Ambient Guardian (Blue) - Latency ~12ms
    setTimeout(() => {
      let triggered = false;
      let wakeScore = 0.18;
      let matchedPatterns = [];

      if (hasSextortion) {
        triggered = true;
        wakeScore = 0.98;
        matchedPatterns = ['regex:coercion_markers', 'tensor:secrecy_cluster', 'keyword:private_demand'];
      } else if (hasBullying) {
        triggered = true;
        wakeScore = 0.89;
        matchedPatterns = ['regex:hostility_directive', 'tensor:harassment_intent'];
      } else if (hasExclusion) {
        triggered = true;
        wakeScore = 0.54;
        matchedPatterns = ['keyword:exclusion_directive'];
      } else if (isBanter) {
        triggered = false;
        wakeScore = 0.26;
        matchedPatterns = ['regex:sports_vernacular_modifier'];
      } else {
        triggered = lower.length > 5;
        wakeScore = 0.32;
        matchedPatterns = ['heuristic:generic_text_flow'];
      }

      const res1 = {
        agentId: 'ambient_guardian',
        name: 'Ambient Guardian',
        status: triggered ? 'TRIGGERED (WAKE-UP)' : 'BENIGN (EPHEMERAL PURGE)',
        wakeScore: parseFloat(wakeScore.toFixed(3)),
        thresholdTauLow: 0.35,
        passedThreshold: wakeScore >= 0.35,
        matchedTokens: matchedPatterns,
        inferenceTimeMs: 11,
        quantization: 'INT8 MobileBERT-v2',
        senderHash: `SHA256:0x${Math.abs((sender + appPlatform).split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString(16).padEnd(8, '0').slice(0, 8)}...`,
        ramAllocatedMb: 14.2
      };
      setAgent1Result(res1);

      // STEP 2: Contextual Assessor (Purple) - Latency ~22ms
      setCurrentStep(2);
      setTimeout(() => {
        let riskTier = 'LOW';
        let toxicityPct = 12;
        let persistencePct = 8;
        let harmCategory = 'Harmless Banter';
        let rationale = 'Linguistic modifiers, sports cues, and playful emoji classify text as peer banter. No distress signals.';

        if (hasSextortion) {
          riskTier = 'CRITICAL';
          toxicityPct = 98;
          persistencePct = 94;
          harmCategory = 'Sexual Extortion & Grooming Secrecy';
          rationale = 'High coercion pressure, intimacy demand, blackmail ultimatum, and isolation directives detected.';
        } else if (hasBullying) {
          riskTier = 'HIGH';
          toxicityPct = 88;
          persistencePct = 82;
          harmCategory = 'Targeted Cyberbullying & Malicious Exclusion';
          rationale = 'Repeated hostile directives targeting child self-worth and social ostracization.';
        } else if (hasExclusion) {
          riskTier = 'MODERATE';
          toxicityPct = 62;
          persistencePct = 48;
          harmCategory = 'Peer Group Exclusion & Boundary Violation';
          rationale = 'Group chat isolation language. Moderate relational harm without acute extortion.';
        }

        const res2 = {
          agentId: 'contextual_assessor',
          name: 'Contextual Assessor',
          riskTier,
          toxicityPct,
          persistencePct,
          harmCategory,
          rationale,
          thresholdTauHigh: 0.70,
          confidence: riskTier === 'CRITICAL' ? 0.96 : (riskTier === 'HIGH' ? 0.91 : (riskTier === 'MODERATE' ? 0.72 : 0.88)),
          inferenceTimeMs: 24,
          multiTurnDepth: '3 Messages Window'
        };
        setAgent2Result(res2);

        // STEP 3: Peer Coach (Pink/Rose) - Child Micro-Intervention
        setCurrentStep(3);
        setTimeout(() => {
          let childHeadline = '';
          let childMessage = '';
          let actionOptions = [];

          if (riskTier === 'CRITICAL') {
            childHeadline = 'You are safe. This is not your fault.';
            childMessage = 'Someone is attempting to pressure and frighten you illegally. You do not have to obey their demands or stay alone with this. Let us take gentle, calm steps to protect you right now.';
            actionOptions = [
              { id: 'helpline', label: 'Call Child Helpline (Toll-Free 116)', icon: PhoneCall, variant: 'primary', desc: 'Direct, confidential support without sharing your screen.' },
              { id: 'parent_masked', label: 'Prepare Private Parent Starter', icon: Heart, variant: 'secondary', desc: 'Alert your parent with zero raw messages exposed.' },
              { id: 'freeze_block', label: 'Freeze & Block Sender', icon: Shield, variant: 'neutral', desc: 'Mute sender so they cannot reach you while we solve this.' },
              { id: 'breather', label: 'Take a Calm 5-Minute Breather', icon: Smile, variant: 'neutral', desc: 'Step away from the screen for a moment.' }
            ];
          } else if (riskTier === 'HIGH') {
            childHeadline = 'This message is unkind and unfair.';
            childMessage = 'You deserve respect online and at school. When people say hurtful things, it reflects their behavior, not your value. How would you like to handle this?';
            actionOptions = [
              { id: 'practice_reply', label: 'Practice an Assertive Boundary Reply', icon: MessageSquare, variant: 'primary', desc: 'Review calm, firm responses that shut down teasing.' },
              { id: 'parent_masked', label: 'Ask a Trusted Adult for Advice', icon: Heart, variant: 'secondary', desc: 'Let your parent know you received an unpleasant text.' },
              { id: 'mute_group', label: 'Mute Notifications for 24 Hours', icon: EyeOff, variant: 'neutral', desc: 'Take back control of your screen time peacefully.' }
            ];
          } else if (riskTier === 'MODERATE') {
            childHeadline = 'Feeling pushed out? You have options.';
            childMessage = 'Group chats can get tricky. You do not have to accept unfair teasing, and you do not have to argue either.';
            actionOptions = [
              { id: 'practice_reply', label: 'Send Neutral Dismissal', icon: MessageSquare, variant: 'primary', desc: '"I am staying, or you can start your own chat."' },
              { id: 'breather', label: 'Step Away from the Screen', icon: Smile, variant: 'neutral', desc: 'Take a 10-minute break with friends or hobbies.' },
              { id: 'ignore', label: 'Archive & Ignore', icon: EyeOff, variant: 'neutral', desc: 'Do not give their comment any energy.' }
            ];
          } else {
            childHeadline = 'All clear — looks like friendly banter!';
            childMessage = 'Our edge engine analyzed the linguistic context and recognized playful sports banter. No distress signals or harassment detected. Have fun with your game!';
            actionOptions = [
              { id: 'reply_banter', label: 'Reply with Playful Banter', icon: Smile, variant: 'primary', desc: 'Keep having fun!' },
              { id: 'purge_now', label: 'Scrub Local RAM Buffer', icon: Trash2, variant: 'neutral', desc: 'Zero out memory right away.' }
            ];
          }

          const res3 = {
            agentId: 'peer_coach',
            name: 'Peer Coach',
            childHeadline,
            childMessage,
            actionOptions,
            toneScore: 'Empathetic & Non-Punitive (0.99)',
            traumaInformedRating: 'Certified Safe'
          };
          setAgent3Result(res3);

          // STEP 4: SafeNet Relay (Emerald) - Anonymized Parent Notification
          setCurrentStep(4);
          setTimeout(() => {
            let requiresAlert = riskTier === 'CRITICAL' || riskTier === 'HIGH';
            let alertCategory = riskTier === 'CRITICAL' ? 'High-Priority Protective Advisory' : (riskTier === 'HIGH' ? 'Supportive Wellness Notice' : 'No Action Required (Local Ephemeral)');
            let conversationStarters = [];

            if (riskTier === 'CRITICAL') {
              conversationStarters = [
                'Hey, I noticed you seemed a bit stressed on your phone today. Remember I am always on your side no matter what happens online.',
                'If anyone ever asks you for private pictures or tries to blackmail you, you will never get in trouble with me. We can deal with it together.',
                'Let’s take a walk or grab a snack. If you want to talk about anything weird someone sent you, I am right here.'
              ];
            } else if (riskTier === 'HIGH') {
              conversationStarters = [
                'How are things in your group chats this week? Anyone being unnecessarily noisy or harsh?',
                'Sometimes school group chats get pretty toxic. If you ever want to vent or mute a group together, let me know.',
                'Just wanted to check in — have your friends been treating each other well online lately?'
              ];
            } else if (riskTier === 'MODERATE') {
              conversationStarters = [
                'Periodic check-in: How is your online gaming and chat balance going this week?'
              ];
            }

            const res4 = {
              agentId: 'safenet_relay',
              name: 'SafeNet Relay',
              requiresAlert,
              alertCategory,
              rawTextDisclosed: false, // Strict Zero-Surveillance Promise
              anonymizedContext: `${appPlatform} • Interaction with Peer ID [${sender.slice(0, 1)}***]`,
              suggestedStarters: conversationStarters,
              privacyGuarantee: 'Differential Privacy (ε=0.68) Encrypted Hash. Zero Raw Chat Tokens Shared.'
            };
            setAgent4Result(res4);
            setIsAnalyzing(false);
          }, 450);
        }, 450);
      }, 450);
    }, 450);
  };

  // Run on mount
  useEffect(() => {
    runPipeline(scenarios[0].text, scenarios[0].sender, scenarios[0].platform);
  }, []);

  // Handle Scenario Quick Click
  const handleSelectScenario = (sc) => {
    setSelectedScenarioId(sc.id);
    setChatMessage(sc.text);
    setSenderName(sc.sender);
    setPlatform(sc.platform);
    runPipeline(sc.text, sc.sender, sc.platform);
  };

  // Handle Child Action Interaction
  const handleChildAction = (act) => {
    setChildResponse(act.id);
    if (act.id === 'practice_reply') {
      setPracticeReplyText('I am not okay with being spoken to like this. Please stop messaging me.');
      setChildFeedbackNotice('Great job setting clear personal boundaries. You can send this response or simply walk away.');
    } else if (act.id === 'helpline') {
      setChildFeedbackNotice('Connecting you to free, confidential 24/7 child counseling. You are brave and protected.');
    } else if (act.id === 'parent_masked') {
      setChildFeedbackNotice('Anonymized notification queued for your parent. They will see conversation ideas without reading your private messages.');
    } else if (act.id === 'freeze_block') {
      setChildFeedbackNotice('Sender muted and blocked locally. Take a deep breath — you did the right thing.');
    } else if (act.id === 'breather') {
      setChildFeedbackNotice('Screen paused for 5 minutes. Take a gentle breath of fresh air.');
    } else {
      setChildFeedbackNotice('Action selected. Your privacy remains 100% safeguarded.');
    }
  };

  // Physical Memory Purge Handler
  const executeMemoryPurge = () => {
    setShowPurgeModal(false);
    setPurgeSuccess(true);
    setChatMessage('');
    setAgent1Result(null);
    setAgent2Result(null);
    setAgent3Result(null);
    setAgent4Result(null);
    setCurrentStep(0);
    setChildResponse(null);
    setChildFeedbackNotice('');
    setTimeout(() => setPurgeSuccess(false), 4000);
  };

  // =========================================================================
  // FEDERATED LEARNING SIMULATION STATE
  // =========================================================================
  const [flEpoch, setFlEpoch] = useState(48);
  const [flDevices, setFlDevices] = useState(34920);
  const [flAccuracy, setFlAccuracy] = useState(96.4);
  const [flEpsilon, setFlEpsilon] = useState(0.68);
  const [flTrainingStage, setFlTrainingStage] = useState(0); // 0: Idle, 1: Gradient, 2: Noise, 3: Homomorphic Enc, 4: Synchronized
  const [flLogs, setFlLogs] = useState([
    '[EPOCH-47] Completed. Global loss: 0.0412. Epsilon consumed: 0.014.',
    '[EDGE-NODE] Local loss evaluated on 12 on-device samples.',
    '[DP-SGD] Gaussian noise (sigma=1.12) injected into parameter gradients.',
    '[SEC-AGG] 34,920 encrypted gradient shares accumulated by federator.'
  ]);

  const triggerFlEpoch = () => {
    if (flTrainingStage !== 0) return;
    setFlTrainingStage(1);
    setFlLogs(prev => [`[EPOCH-${flEpoch + 1}] Stage 1: Computing on-device loss tensor on edge NPU...`, ...prev.slice(0, 5)]);

    setTimeout(() => {
      setFlTrainingStage(2);
      setFlLogs(prev => [`[DP-SGD] Stage 2: Injecting differential privacy Gaussian noise N(0, σ²I)...`, ...prev.slice(0, 5)]);

      setTimeout(() => {
        setFlTrainingStage(3);
        setFlLogs(prev => [`[SEC-AGG] Stage 3: Homomorphic encryption applied to clipped weight gradients...`, ...prev.slice(0, 5)]);

        setTimeout(() => {
          setFlTrainingStage(4);
          setFlEpoch(e => e + 1);
          setFlDevices(d => d + Math.floor(Math.random() * 85) + 20);
          setFlAccuracy(a => Math.min(99.8, parseFloat((a + 0.18).toFixed(2))));
          setFlEpsilon(e => parseFloat((e + 0.008).toFixed(3)));
          setFlLogs(prev => [`[SUCCESS] Global weights broadcasted. Edge INT8 checkpoint updated!`, ...prev.slice(0, 5)]);

          setTimeout(() => {
            setFlTrainingStage(0);
          }, 1500);
        }, 800);
      }, 800);
    }, 800);
  };

  // Filter Search
  const filterMatchesSearch = (item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.desc && item.desc.toLowerCase().includes(q)) ||
      (item.name && item.name.toLowerCase().includes(q))
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white relative">
      {/* =====================================================================
          GLOBAL SYSTEM HEADER & BRAND IDENTITY
          ===================================================================== */}
      <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand Identity */}
          <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <div className="relative flex items-center justify-center p-2.5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-xl shadow-lg shadow-indigo-600/30 border border-indigo-400/30">
                <Shield className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                    SafeShield AI
                  </h1>
                  <span className="text-[10px] bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                    v2.4 On-Device
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-medium">
                  Zero-Surveillance Multi-Agent Child Safety Platform
                </p>
              </div>
            </div>

            {/* Mobile View Toggle */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setShowPurgeModal(true)}
                className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 hover:text-red-400"
                title="Purge Memory"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs w-full md:w-auto overflow-x-auto scrollbar-none shadow-inner">
            {[
              { id: 'simulator', label: 'Interactive Simulator', icon: Sparkles },
              { id: 'architecture', label: 'Agent Architecture', icon: Layers },
              { id: 'federated', label: 'Federated Learning', icon: Activity },
              { id: 'privacy', label: 'Privacy Guarantees', icon: Lock }
            ].map(tab => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <IconComp className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Telemetry Status Badges & Quick Action */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            {/* Edge Status Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-lg text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Edge Engine Active</span>
            </div>

            {/* Zero-Surveillance Verified Badge */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/25 rounded-lg text-indigo-300 font-medium">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Zero-Surveillance Verified</span>
            </div>

            {/* Memory Purge Button */}
            <button
              onClick={() => setShowPurgeModal(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 hover:bg-red-950/30 border border-slate-800 hover:border-red-500/40 text-slate-400 hover:text-red-400 rounded-lg transition font-medium cursor-pointer"
              title="Physical zero-fill memory scrub"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Zero-Fill RAM</span>
            </button>
          </div>
        </div>
      </header>

      {/* Memory Purged Banner Alert */}
      {purgeSuccess && (
        <div className="bg-emerald-500/15 border-b border-emerald-500/30 text-emerald-300 text-xs py-2 px-4 text-center flex items-center justify-center space-x-2 transition-all">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Physical memory purge complete. All RAM tensors, chat strings, and evaluation cache zeroed out.</span>
        </div>
      )}

      {/* =====================================================================
          MAIN BODY CONTAINER
          ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-6">

        {/* ===================================================================
            TAB 1: LIVE INTERACTIVE SIMULATOR DASHBOARD
            =================================================================== */}
        {activeTab === 'simulator' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Top Workspace Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                    Multi-Agent Edge Execution Simulator
                  </h2>
                  <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full font-mono">
                    Localhost /dev/npu0
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  Test realistic peer communications across social platforms. Observe how the 4 on-device agents process text in real-time, enforce safety boundaries, and empower the child without uploading raw private messages.
                </p>
              </div>

              {/* Persona Filter Toggle */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 px-2 font-medium flex items-center gap-1">
                  <Filter className="w-3 h-3" /> View Mode:
                </span>
                {[
                  { id: 'all', label: 'Full System' },
                  { id: 'child', label: 'Child View' },
                  { id: 'parent', label: 'Parent View' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePersona(p.id)}
                    className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                      activePersona === p.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Scenario Preset Launcher */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Select Test Preset Scenario</span>
                <span className="text-slate-500 font-normal">Click any preset to simulate live detection</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {scenarios.map(sc => {
                  const isSelected = selectedScenarioId === sc.id;
                  return (
                    <button
                      key={sc.id}
                      onClick={() => handleSelectScenario(sc)}
                      className={`text-left p-3.5 rounded-xl border transition-all relative overflow-hidden group cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${sc.tagColor}`}>
                          {sc.tag}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {sc.platform}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-200 group-hover:text-white transition">
                        {sc.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-snug">
                        "{sc.text}"
                      </p>
                      {isSelected && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Workspace & Context Selectors */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Platform Context:
                  </label>
                  <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
                    {['Instagram', 'Snapchat', 'Discord', 'WhatsApp'].map(app => (
                      <button
                        key={app}
                        onClick={() => setPlatform(app)}
                        className={`px-2.5 py-1 rounded-md font-medium transition cursor-pointer ${
                          platform === app
                            ? 'bg-slate-800 text-white font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sender simulation name */}
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400">Simulated Sender:</span>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="bg-slate-950 border border-slate-800 px-2.5 py-1 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 text-xs w-36 font-mono"
                  />
                </div>
              </div>

              {/* Text Input Area */}
              <div className="relative">
                <textarea
                  value={chatMessage}
                  onChange={(e) => {
                    setChatMessage(e.target.value);
                    setSelectedScenarioId(null);
                  }}
                  rows={3}
                  placeholder="Type or paste any chat message to evaluate through the on-device multi-agent pipeline..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition resize-none font-sans"
                />

                {/* Bottom Bar inside input */}
                <div className="flex flex-col sm:flex-row items-center justify-between mt-2 pt-2 border-t border-slate-800/60 gap-3">
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>
                      <strong className="text-slate-300 font-semibold">100% On-Device:</strong> Processed in ephemeral RAM. Never transmitted to any cloud backend.
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {chatMessage.length} chars
                    </span>
                    <button
                      onClick={() => runPipeline()}
                      disabled={isAnalyzing || !chatMessage.trim()}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Executing Trace...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Run Agent Pipeline</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ===============================================================
                REAL-TIME 4-STEP PIPELINE TRACKER
                =============================================================== */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <h3 className="text-sm font-bold text-slate-200">
                    Real-Time Multi-Agent Pipeline Trace
                  </h3>
                </div>
                <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                  <span>Pipeline Latency: <strong className="text-emerald-400">~42ms</strong></span>
                  <span>•</span>
                  <span>Enclave: <strong className="text-slate-300">RAM Sandbox</strong></span>
                </div>
              </div>

              {/* 4-Step Animated Timeline Tracker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
                {[
                  {
                    step: 1,
                    title: '1. Ambient Guardian',
                    subtitle: 'Edge Listener & Wakeup',
                    color: 'blue',
                    borderActive: 'border-blue-500 shadow-blue-500/20 bg-blue-500/10',
                    dotColor: 'bg-blue-400',
                    badge: 'τ_low = 0.35',
                    icon: Cpu,
                    statusText: currentStep > 1 ? 'Evaluated' : (currentStep === 1 ? 'Evaluating...' : 'Ready')
                  },
                  {
                    step: 2,
                    title: '2. Contextual Assessor',
                    subtitle: 'Multi-turn Risk & Intent',
                    color: 'purple',
                    borderActive: 'border-purple-500 shadow-purple-500/20 bg-purple-500/10',
                    dotColor: 'bg-purple-400',
                    badge: 'τ_high = 0.70',
                    icon: BrainIcon,
                    statusText: currentStep > 2 ? 'Scored' : (currentStep === 2 ? 'Evaluating...' : 'Waiting')
                  },
                  {
                    step: 3,
                    title: '3. Peer Coach',
                    subtitle: 'Trauma-Informed Child Card',
                    color: 'pink',
                    borderActive: 'border-pink-500 shadow-pink-500/20 bg-pink-500/10',
                    dotColor: 'bg-pink-400',
                    badge: 'Empathetic Action',
                    icon: Heart,
                    statusText: currentStep > 3 ? 'Intervention Ready' : (currentStep === 3 ? 'Synthesizing...' : 'Waiting')
                  },
                  {
                    step: 4,
                    title: '4. SafeNet Relay',
                    subtitle: 'Masked Parent Notification',
                    color: 'emerald',
                    borderActive: 'border-emerald-500 shadow-emerald-500/20 bg-emerald-500/10',
                    dotColor: 'bg-emerald-400',
                    badge: 'Zero Raw Text',
                    icon: ShieldCheckIcon,
                    statusText: currentStep === 4 ? (isAnalyzing ? 'Generating...' : 'Synchronized') : (currentStep > 4 ? 'Completed' : 'Waiting')
                  }
                ].map((item) => {
                  const IconC = item.icon;
                  const isCurrent = currentStep === item.step;
                  const isPast = currentStep > item.step || (currentStep === 4 && !isAnalyzing);

                  return (
                    <div
                      key={item.step}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isCurrent
                          ? `${item.borderActive} shadow-lg ring-1 ring-offset-0 ring-${item.color}-400/50`
                          : (isPast
                              ? 'bg-slate-900 border-slate-700/80 text-slate-200'
                              : 'bg-slate-950/60 border-slate-800/80 text-slate-500')
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${isCurrent ? `${item.dotColor} animate-ping` : (isPast ? item.dotColor : 'bg-slate-700')}`} />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                            {item.badge}
                          </span>
                        </div>
                        {isPast && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className={`p-1.5 rounded-lg ${isCurrent ? 'bg-slate-800 text-white' : 'bg-slate-950 text-slate-400'}`}>
                          <IconC className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                          <p className="text-[11px] text-slate-400">{item.subtitle}</p>
                        </div>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-mono">Status:</span>
                        <span className={`font-semibold ${isCurrent ? 'text-indigo-400 font-bold' : (isPast ? 'text-slate-300' : 'text-slate-500')}`}>
                          {item.statusText}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ===============================================================
                AGENT TELEMETRY METRIC CARDS
                =============================================================== */}
            {(activePersona === 'all' || activePersona === 'developer') && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Agent 1 Metric Card: Ambient Guardian */}
                <div className="bg-slate-900/70 border border-blue-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" /> Ambient Guardian
                    </span>
                    <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded-full font-mono border border-blue-500/20">
                      INT8 Quantized
                    </span>
                  </div>

                  {agent1Result ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Wakeup Score:</span>
                        <span className="font-mono font-bold text-slate-100">
                          {agent1Result.wakeScore} / 1.00
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Trigger Threshold (τ_low):</span>
                        <span className="font-mono text-blue-300">0.35</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Status:</span>
                        <span className={`font-semibold ${agent1Result.passedThreshold ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {agent1Result.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Inference Latency:</span>
                        <span className="font-mono text-emerald-400 font-semibold">{agent1Result.inferenceTimeMs} ms</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 block mb-1">Matched Token Patterns:</span>
                        <div className="flex flex-wrap gap-1">
                          {agent1Result.matchedTokens.map((t, idx) => (
                            <span key={idx} className="text-[9px] bg-slate-950 px-1.5 py-0.5 rounded text-blue-300 font-mono border border-slate-800">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic py-6 text-center">
                      Awaiting text stream...
                    </div>
                  )}
                </div>

                {/* Agent 2 Metric Card: Contextual Assessor */}
                <div className="bg-slate-900/70 border border-purple-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                      <BrainIcon className="w-3.5 h-3.5" /> Contextual Assessor
                    </span>
                    <span className="text-[10px] bg-purple-500/10 text-purple-300 px-2 py-0.5 rounded-full font-mono border border-purple-500/20">
                      Multi-Turn Attn
                    </span>
                  </div>

                  {agent2Result ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Assessed Risk Tier:</span>
                        <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                          agent2Result.riskTier === 'CRITICAL' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          agent2Result.riskTier === 'HIGH' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' :
                          agent2Result.riskTier === 'MODERATE' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                          'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {agent2Result.riskTier}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Toxicity Score:</span>
                        <span className="font-mono font-bold text-purple-300">
                          {agent2Result.toxicityPct}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Persistence Index:</span>
                        <span className="font-mono font-bold text-purple-300">
                          {agent2Result.persistencePct}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Harm Category:</span>
                        <span className="text-[11px] text-slate-200 text-right truncate max-w-[140px]">
                          {agent2Result.harmCategory}
                        </span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 block mb-0.5">Classification Rationale:</span>
                        <p className="text-[10px] text-slate-300 leading-tight">
                          {agent2Result.rationale}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic py-6 text-center">
                      Awaiting Ambient trigger...
                    </div>
                  )}
                </div>

                {/* Agent 3 Metric Card: Peer Coach */}
                <div className="bg-slate-900/70 border border-pink-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-pink-500" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-pink-400 flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5" /> Peer Coach
                    </span>
                    <span className="text-[10px] bg-pink-500/10 text-pink-300 px-2 py-0.5 rounded-full font-mono border border-pink-500/20">
                      Child-Centric
                    </span>
                  </div>

                  {agent3Result ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Tone Standard:</span>
                        <span className="text-pink-300 font-semibold">{agent3Result.toneScore}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Trauma-Informed:</span>
                        <span className="text-emerald-400 font-semibold">{agent3Result.traumaInformedRating}</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Intervention Options:</span>
                        <span className="font-mono text-slate-200">{agent3Result.actionOptions.length} Recommended</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Alarmist Banner:</span>
                        <span className="text-emerald-400 font-semibold">Zero Red Panic</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 block mb-0.5">Empowerment Principle:</span>
                        <p className="text-[10px] text-slate-300 leading-tight">
                          Preserves child autonomy. Non-judgmental guidance without shame or device seizure fear.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic py-6 text-center">
                      Awaiting Assessor output...
                    </div>
                  )}
                </div>

                {/* Agent 4 Metric Card: SafeNet Relay */}
                <div className="bg-slate-900/70 border border-emerald-500/30 rounded-2xl p-4 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheckIcon className="w-3.5 h-3.5" /> SafeNet Relay
                    </span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded-full font-mono border border-emerald-500/20">
                      Privacy Preserving
                    </span>
                  </div>

                  {agent4Result ? (
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Parent Alert Needed:</span>
                        <span className={`font-semibold ${agent4Result.requiresAlert ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                          {agent4Result.requiresAlert ? 'Yes (Advisory Only)' : 'No (Local Guard)'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Raw Chat Leakage:</span>
                        <span className="text-emerald-400 font-bold font-mono">0 Plaintext Bits</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Sender Encryption:</span>
                        <span className="text-slate-300 font-mono text-[10px]">One-Way HMAC Hash</span>
                      </div>
                      <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                        <span className="text-slate-400">Curated Starters:</span>
                        <span className="font-mono text-emerald-300">{agent4Result.suggestedStarters.length} Generated</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] text-slate-500 block mb-0.5">Differential Privacy:</span>
                        <p className="text-[10px] text-slate-300 leading-tight">
                          ε=0.68 mathematical guarantee protects child against inferential reconstruction.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic py-6 text-center">
                      Awaiting Coach resolution...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ===============================================================
                TWO-COLUMN INTERACTIVE PREVIEW
                Left: Peer Coach Interactive Preview (Child Perspective)
                Right: Parent Alert Preview (Parent Perspective)
                =============================================================== */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* -------------------------------------------------------------
                  LEFT: PEER COACH INTERACTIVE PREVIEW (Child Perspective)
                  ------------------------------------------------------------- */}
              {(activePersona === 'all' || activePersona === 'child') && (
                <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-pink-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Perspective Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-pink-500/20 text-pink-400 rounded-xl border border-pink-500/30">
                          <Heart className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-white">
                              Peer Coach — Child Intervention Card
                            </h3>
                            <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded-full font-semibold">
                              On Child Device
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Empathetic, non-punitive guidance empowering child autonomy
                          </p>
                        </div>
                      </div>
                      <span className="text-xs bg-slate-950 text-slate-400 font-mono px-2.5 py-1 rounded-lg border border-slate-800">
                        Age 10–16 Safe
                      </span>
                    </div>

                    {agent3Result ? (
                      <div className="space-y-4">
                        {/* Supportive Message Box */}
                        <div className="p-4 rounded-xl bg-pink-950/20 border border-pink-500/20">
                          <h4 className="text-sm font-bold text-pink-200 mb-1 flex items-center gap-2">
                            <Smile className="w-4 h-4 text-pink-400" />
                            {agent3Result.childHeadline}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {agent3Result.childMessage}
                          </p>
                        </div>

                        {/* Interactive Child Action Buttons */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                            Choose How You Want to Respond:
                          </label>

                          <div className="grid grid-cols-1 gap-2">
                            {agent3Result.actionOptions.map((act) => {
                              const ActionIcon = act.icon;
                              const isSelected = childResponse === act.id;
                              return (
                                <button
                                  key={act.id}
                                  onClick={() => handleChildAction(act)}
                                  className={`text-left p-3 rounded-xl border transition flex items-start space-x-3 cursor-pointer ${
                                    isSelected
                                      ? 'bg-pink-950/40 border-pink-500 text-white shadow-md shadow-pink-500/20 ring-1 ring-pink-500/50'
                                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 text-slate-300'
                                  }`}
                                >
                                  <div className={`p-2 rounded-lg mt-0.5 ${isSelected ? 'bg-pink-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                    <ActionIcon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                      <span className="text-xs font-bold text-slate-200">{act.label}</span>
                                      {isSelected && (
                                        <Check className="w-4 h-4 text-pink-400" />
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-0.5">{act.desc}</p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Practice Reply Box if triggered */}
                        {practiceReplyText && (
                          <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/30 space-y-2 animate-fadeIn">
                            <span className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                              <MessageSquare className="w-3.5 h-3.5" /> Practice Boundary Template:
                            </span>
                            <div className="p-2.5 bg-slate-900 rounded-lg text-xs text-slate-200 font-mono border border-slate-800">
                              "{practiceReplyText}"
                            </div>
                            <div className="flex justify-end gap-2 text-xs">
                              <button
                                onClick={() => copyToClipboard(practiceReplyText, 'practice')}
                                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1 transition cursor-pointer"
                              >
                                {copiedId === 'practice' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>{copiedId === 'practice' ? 'Copied' : 'Copy Template'}</span>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* Child Feedback Notification */}
                        {childFeedbackNotice && (
                          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center space-x-2 animate-fadeIn">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            <span>{childFeedbackNotice}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-500 text-xs italic">
                        Run simulation to see how the Peer Coach interacts with the child.
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Note */}
                  <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-pink-400" /> No panic alarm sirens.
                    </span>
                    <span className="text-slate-500">Child retains full device agency</span>
                  </div>
                </div>
              )}

              {/* -------------------------------------------------------------
                  RIGHT: PARENT ALERT PREVIEW (Parent Perspective)
                  ------------------------------------------------------------- */}
              {(activePersona === 'all' || activePersona === 'parent') && (
                <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/30 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Perspective Header */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-base font-bold text-white">
                              SafeNet Relay — Anonymized Parent Alert
                            </h3>
                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-semibold">
                              On Parent App
                            </span>
                          </div>
                          <p className="text-xs text-slate-400">
                            Actionable support prompts with zero surveillance or raw chat logs
                          </p>
                        </div>
                      </div>
                      <span className="text-xs bg-slate-950 text-slate-400 font-mono px-2.5 py-1 rounded-lg border border-slate-800">
                        Privacy Masked
                      </span>
                    </div>

                    {agent4Result ? (
                      <div className="space-y-4">
                        {/* Parent Alert Status Box */}
                        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-400">Notification Status:</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                              agent4Result.requiresAlert
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}>
                              {agent4Result.alertCategory}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Channel & Identifier:</span>
                            <span className="font-mono text-slate-300">{agent4Result.anonymizedContext}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-400">Raw Chat Leakage:</span>
                            <span className="font-mono text-emerald-400 font-bold">0% — Strictly Confidential</span>
                          </div>
                        </div>

                        {/* Strict Privacy Callout Notice */}
                        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/25 flex items-start space-x-2.5 text-xs">
                          <ShieldCheckIcon className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <p className="text-emerald-200/90 leading-relaxed">
                            <strong className="text-emerald-300 font-semibold">Zero-Surveillance Guarantee:</strong> Parents receive empathy-guided conversation starters rather than invasive transcripts. This keeps open trust and prevents children from hiding devices.
                          </p>
                        </div>

                        {/* Empathetic Conversation Starters */}
                        {agent4Result.suggestedStarters.length > 0 ? (
                          <div className="space-y-2">
                            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                              Recommended Empathetic Conversation Starters:
                            </label>

                            <div className="space-y-2">
                              {agent4Result.suggestedStarters.map((starter, i) => (
                                <div
                                  key={i}
                                  className="p-3 bg-slate-950/90 rounded-xl border border-slate-800/90 text-xs text-slate-200 flex items-start justify-between gap-3 group hover:border-slate-700 transition"
                                >
                                  <div className="flex items-start space-x-2">
                                    <span className="text-emerald-400 font-bold font-mono mt-0.5">#{i + 1}</span>
                                    <p className="leading-relaxed">"{starter}"</p>
                                  </div>
                                  <button
                                    onClick={() => copyToClipboard(starter, `starter_${i}`)}
                                    className="p-1 text-slate-500 hover:text-slate-200 transition cursor-pointer"
                                    title="Copy starter"
                                  >
                                    {copiedId === `starter_${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 text-center">
                            No parent intervention needed. Interaction classified as friendly or harmless.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-500 text-xs italic">
                        Run simulation to see the generated parent conversation starters.
                      </div>
                    )}
                  </div>

                  {/* Bottom Footer Note */}
                  <div className="mt-6 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-emerald-400" /> No raw logs or keylogger feeds.
                    </span>
                    <span className="text-slate-500">Differential Privacy Protected</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 2: AGENT ARCHITECTURE BLUEPRINT
            =================================================================== */}
        {activeTab === 'architecture' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Blueprint Section Header */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
              <div className="flex items-center space-x-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Multi-Agent Architecture Blueprint & Specifications
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                SafeShield AI deploys a decoupled, hierarchical 4-agent cascade running entirely on-device (Android NPU / iOS CoreML / WebAssembly). Each agent is isolated by strict privilege separation, deterministic decision thresholds, and memory zeroization.
              </p>
            </div>

            {/* Interactive Data Flow Pipeline Diagram */}
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-indigo-400" />
                Edge Data Flow & Threshold Decision Gates
              </h3>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 overflow-x-auto">
                <div className="min-w-[700px] flex items-center justify-between text-xs py-2">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900 border border-blue-500/30 w-44">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mb-2 animate-pulse" />
                    <span className="font-bold text-blue-400">1. Ambient Guardian</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">INT8 MobileBERT-v2</span>
                    <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded mt-2 border border-blue-500/20 text-blue-300 font-mono">
                      Trigger τ_low ≥ 0.35
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0 mx-2" />

                  {/* Step 2 */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900 border border-purple-500/30 w-48">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mb-2 animate-pulse" />
                    <span className="font-bold text-purple-400">2. Contextual Assessor</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Multi-Turn Context & Slang</span>
                    <span className="text-[9px] bg-slate-950 px-2 py-0.5 rounded mt-2 border border-purple-500/20 text-purple-300 font-mono">
                      Risk τ_high ≥ 0.70
                    </span>
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0 mx-2" />

                  {/* Split branches */}
                  <div className="flex flex-col gap-2">
                    {/* Branch A */}
                    <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-900 border border-pink-500/30 w-52">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                      <div className="text-left">
                        <span className="font-bold text-pink-400 text-[11px] block">3. Peer Coach</span>
                        <span className="text-[10px] text-slate-400">Child-Centric Micro-Intervention</span>
                      </div>
                    </div>

                    {/* Branch B */}
                    <div className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-900 border border-emerald-500/30 w-52">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      <div className="text-left">
                        <span className="font-bold text-emerald-400 text-[11px] block">4. SafeNet Relay</span>
                        <span className="text-[10px] text-slate-400">Masked Parent Starter Notice</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-600 flex-shrink-0 mx-2" />

                  {/* End */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl bg-slate-900 border border-slate-700 w-36">
                    <Trash2 className="w-4 h-4 text-emerald-400 mb-1" />
                    <span className="font-bold text-slate-200">Auto-Zeroize</span>
                    <span className="text-[9px] text-slate-400 mt-0.5">RAM Physically Wiped</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deep-Dive Card-Based Breakdown for Each of the 4 Agents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* CARD 1: Ambient Guardian */}
              <div className="bg-slate-900/70 rounded-2xl border border-blue-500/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Agent 1: Ambient Guardian</h3>
                      <p className="text-[11px] text-blue-400 font-mono">Edge Listener & Heuristic Trigger</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-mono">
                    Model: 14.2 MB
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Operational Role:</span>
                    <p className="text-slate-300 leading-relaxed">
                      Continuous, low-power background listener that scans incoming notification buffers using 8-bit quantized embeddings. Wakes subsequent heavy assessors only when candidate harm exceeds threshold τ_low.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-950 rounded-xl font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Wakeup Threshold:</span>
                      <span className="text-blue-300 font-bold">τ_low = 0.35</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Average Latency:</span>
                      <span className="text-emerald-400 font-bold">11 ms</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Input Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "text_stream": String,
  "app_package": "com.instagram.android" | "com.discord",
  "ephemeral_token_ids": Int[128],
  "timestamp_epoch_ms": Int64
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Output Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "wake_status": Boolean,
  "confidence_score": Float [0.0 - 1.0],
  "fast_matched_markers": String[]
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Error Recovery Strategy:</span>
                    <p className="text-slate-400 text-[11px]">
                      Fallback to local deterministic regex Aho-Corasick automaton if NPU driver drops. Automated heartbeat watchdog restarts agent memory within 100ms.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 2: Contextual Assessor */}
              <div className="bg-slate-900/70 rounded-2xl border border-purple-500/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
                      <BrainIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Agent 2: Contextual Assessor</h3>
                      <p className="text-[11px] text-purple-400 font-mono">Risk Tier & Multi-Turn Semantics</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    Model: 32.6 MB
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Operational Role:</span>
                    <p className="text-slate-300 leading-relaxed">
                      Evaluates multi-turn relationship context, sarcasm, gaming banter vs. targeted harassment, and persistence frequency ($P_t = \sum_{k=0}^{n} w_k \cdot \text{harm}_k$). Categorizes into Low, Moderate, High, or Critical risk.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-950 rounded-xl font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Escalation Threshold:</span>
                      <span className="text-purple-300 font-bold">τ_high = 0.70</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Average Latency:</span>
                      <span className="text-emerald-400 font-bold">24 ms</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Input Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "active_message": String,
  "conversation_history_window": MessageSummary[3],
  "sender_hmac_hash": SHA256_Digest,
  "slang_lexicon_version": "2026.4"
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Output Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "risk_tier": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "toxicity_percentage": Float,
  "persistence_index": Float,
  "harm_category": String
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Error Recovery Strategy:</span>
                    <p className="text-slate-400 text-[11px]">
                      High semantic ambiguity defaults to benign classification with non-intrusive child check-in, preventing false-positive anxiety or unnecessary alert spam.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 3: Peer Coach */}
              <div className="bg-slate-900/70 rounded-2xl border border-pink-500/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg">
                      <Heart className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Agent 3: Peer Coach</h3>
                      <p className="text-[11px] text-pink-400 font-mono">Trauma-Informed Child Guidance</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded font-mono">
                    Policy Engine
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Operational Role:</span>
                    <p className="text-slate-300 leading-relaxed">
                      Generates non-judgmental, calming micro-interventions directly on the child's screen. Provides agency: boundary reply templates, breathing breathers, mute shortcuts, or trusted adult escalation without punitive warnings.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-950 rounded-xl font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Tone Safety Constraint:</span>
                      <span className="text-pink-300 font-bold">Zero Victim-Blaming</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Alarmist Banner:</span>
                      <span className="text-emerald-400 font-bold">Forbidden</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Input Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "risk_tier": "HIGH" | "CRITICAL",
  "harm_category": String,
  "child_age_cohort": "10-13" | "14-16",
  "locale_preferred": "en-US"
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Output Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "headline": String,
  "empathic_body": String,
  "action_options": ActionItem[],
  "helpline_available": Boolean
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Error Recovery Strategy:</span>
                    <p className="text-slate-400 text-[11px]">
                      Deterministic fallback to pre-verified clinical safeguarding scripts if local language synthesis hangs or yields tone scores below 0.95.
                    </p>
                  </div>
                </div>
              </div>

              {/* CARD 4: SafeNet Relay */}
              <div className="bg-slate-900/70 rounded-2xl border border-emerald-500/30 p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
                      <ShieldCheckIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Agent 4: SafeNet Relay</h3>
                      <p className="text-[11px] text-emerald-400 font-mono">Zero-Knowledge Parent Advisory</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                    DP Aggregator
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Operational Role:</span>
                    <p className="text-slate-300 leading-relaxed">
                      Generates anonymized parent conversation starters for High/Critical threats. Completely strips message text, media, and recipient phone numbers, synthesizing purely constructive dialogue starters.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-950 rounded-xl font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500 block">Privacy Guarantee:</span>
                      <span className="text-emerald-300 font-bold">Zero Raw Tokens</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Diff. Privacy ε:</span>
                      <span className="text-emerald-300 font-bold">ε = 0.68</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Input Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "risk_tier": "HIGH" | "CRITICAL",
  "harm_category": String,
  "app_platform": String,
  "parent_channel_pubkey": HexString
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Output Schema:</span>
                    <pre className="p-2 bg-slate-950 rounded-lg font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-800">
{`{
  "advisory_status": "NOTICE_TRANSMITTED",
  "curated_conversation_starters": String[],
  "encrypted_telemetry_digest": SHA256_Hash
}`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Error Recovery Strategy:</span>
                    <p className="text-slate-400 text-[11px]">
                      If local cryptographic keystore is locked, notifications are buffered in AES-256 encrypted storage and retried upon biometric parent unlock.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 3: FEDERATED LEARNING & SELF-IMPROVEMENT DASHBOARD
            =================================================================== */}
        {activeTab === 'federated' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Section Header */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    Federated Learning & Differential Privacy Telemetry
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                  SafeShield AI improves its detection accuracy collectively across millions of edge devices without ever uploading a single raw chat message or user interaction to central servers.
                </p>
              </div>

              {/* Run Epoch Action Button */}
              <button
                onClick={triggerFlEpoch}
                disabled={flTrainingStage !== 0}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center space-x-2 shadow-lg shadow-indigo-600/30 whitespace-nowrap cursor-pointer"
              >
                {flTrainingStage !== 0 ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing FL Round...</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4" />
                    <span>Run Training Epoch</span>
                  </>
                )}
              </button>
            </div>

            {/* 4 Telemetry Widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Widget 1 */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Current Global Epoch
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-white font-mono">
                    #{flEpoch}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">+1 Round</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Model weight updates synced every 6 hours over Wi-Fi charging.
                </p>
              </div>

              {/* Widget 2 */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Active Edge Devices
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-indigo-400 font-mono">
                    {flDevices.toLocaleString()}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold">Nodes</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Participating in Secure Multi-Party Aggregation (SMPC).
                </p>
              </div>

              {/* Widget 3 */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Harm Detection Accuracy
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {flAccuracy}%
                  </span>
                  <span className="text-xs text-slate-400 font-mono">F1: 0.952</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Validated against multi-cultural adolescent conversational benchmarks.
                </p>
              </div>

              {/* Widget 4 */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 shadow-lg space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Differential Privacy (ε)
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-extrabold text-purple-400 font-mono">
                    ε = {flEpsilon}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">δ = 10⁻⁵</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Rigorous mathematical upper bound guaranteeing plausible deniability.
                </p>
              </div>
            </div>

            {/* Federated Training Animation Stage */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                4-Stage Privacy-Preserving Training Pipeline
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  {
                    stage: 1,
                    title: '1. On-Device Loss',
                    desc: 'Computes parameter gradients locally on child device NPU without uploading text.',
                    active: flTrainingStage === 1,
                    completed: flTrainingStage > 1
                  },
                  {
                    stage: 2,
                    title: '2. Gaussian Noise (DP)',
                    desc: 'Injects calibrated Gaussian noise N(0, σ²I) to guarantee mathematical differential privacy.',
                    active: flTrainingStage === 2,
                    completed: flTrainingStage > 2
                  },
                  {
                    stage: 3,
                    title: '3. Homomorphic Encryption',
                    desc: 'Encrypted gradient shares are aggregated without any party seeing individual weights.',
                    active: flTrainingStage === 3,
                    completed: flTrainingStage > 3
                  },
                  {
                    stage: 4,
                    title: '4. Global Model Sync',
                    desc: 'Global updated checkpoint is broadcasted back to device; local cache is wiped.',
                    active: flTrainingStage === 4,
                    completed: flTrainingStage > 4
                  }
                ].map(s => (
                  <div
                    key={s.stage}
                    className={`p-3.5 rounded-xl border transition-all ${
                      s.active
                        ? 'bg-indigo-600/20 border-indigo-500 shadow-lg ring-1 ring-indigo-500/50'
                        : (s.completed
                            ? 'bg-slate-900 border-emerald-500/40 text-slate-200'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400')
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono text-slate-400">Step {s.stage}</span>
                      {s.completed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                      {s.active && <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />}
                    </div>
                    <h4 className="text-xs font-bold text-slate-100">{s.title}</h4>
                    <p className="text-[11px] text-slate-400 mt-1 leading-snug">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Terminal Output & Noise Proof */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Terminal Log Stream */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 font-mono text-xs shadow-xl space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-2 text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="font-semibold text-slate-200">Edge FL Orchestrator Daemon</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-semibold">● SECURE SYNC</span>
                </div>
                <div className="space-y-1.5 text-slate-300 pt-1 h-44 overflow-y-auto scrollbar-thin">
                  {flLogs.map((log, index) => (
                    <div key={index} className="flex items-start space-x-2 text-[11px]">
                      <span className="text-slate-600 select-none">&gt;</span>
                      <span className={log.includes('SUCCESS') ? 'text-emerald-400 font-semibold' : (log.includes('DP-SGD') ? 'text-purple-300' : 'text-slate-300')}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Mathematical DP Bound Specification */}
              <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-3">
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-indigo-400" />
                  Rényi Differential Privacy Formal Guarantee
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  SafeShield AI limits the maximum privacy risk per epoch using the Moments Accountant technique for Rényi Differential Privacy (RDP). Even an adversary with arbitrary auxiliary information cannot infer whether any child's specific text was present in training:
                </p>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-center text-xs text-indigo-300">
                  P[ M(D) ∈ S ] ≤ exp(ε) · P[ M(D') ∈ S ] + δ
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                  <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Gradient Clipping Bound (C):</span>
                    <span className="font-mono font-bold text-slate-200">C = 1.0</span>
                  </div>
                  <div className="p-2 bg-slate-950/60 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] text-slate-500 block">Noise Multiplier (σ):</span>
                    <span className="font-mono font-bold text-slate-200">σ = 1.12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 4: PRIVACY & ETHICS STANDARD COMPARISON
            =================================================================== */}
        {activeTab === 'privacy' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Section Header */}
            <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="w-5 h-5 text-indigo-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Privacy & Ethics Standard: Spyware vs. SafeShield AI
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Traditional parental control apps rely on invasive surveillance, keyloggers, and cloud transcript uploads that erode child trust and create catastrophic data breach targets. SafeShield AI reimagines child protection from first principles.
              </p>
            </div>

            {/* Side-by-Side Comparison Matrix */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80">
                      <th className="p-4 font-bold text-slate-400 uppercase tracking-wider w-1/4">
                        Evaluation Criteria
                      </th>
                      <th className="p-4 font-bold text-red-400 uppercase tracking-wider w-3/8 bg-red-950/10 border-r border-slate-800">
                        Traditional Spyware (mSpy, Bark, Spyic)
                      </th>
                      <th className="p-4 font-bold text-emerald-400 uppercase tracking-wider w-3/8 bg-emerald-950/10">
                        SafeShield AI (Zero-Surveillance)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {[
                      {
                        title: 'Data Storage Location',
                        bad: 'Uploaded to cloud databases; stored on vendor servers.',
                        good: '100% on-device in ephemeral volatile RAM; zero persistent storage.'
                      },
                      {
                        title: 'Keystroke & Screen Capture',
                        bad: 'Continuous background keylogging, full screen grabs, and camera hooks.',
                        good: 'Strictly prohibited. No screen recording, no keystroke taps, no audio logging.'
                      },
                      {
                        title: 'Parent Notification Style',
                        bad: 'Exposes raw chat transcripts, personal secrets, and private social media feeds.',
                        good: 'Masked conversational starters without raw message text, preserving child privacy.'
                      },
                      {
                        title: 'Child Psychological Impact',
                        bad: 'Creates intense resentment, paranoia, and causes children to buy burner phones.',
                        good: 'Builds mutual trust; provides calm trauma-informed peer coaching with full child agency.'
                      },
                      {
                        title: 'Vulnerability to Data Breaches',
                        bad: 'Extremely high. Vendor database leaks expose millions of children’s private photos & texts.',
                        good: 'Zero breach surface. No central database exists to breach or subpoena.'
                      },
                      {
                        title: 'International Child Rights (UNCRC Art. 16)',
                        bad: 'Directly violates child rights to arbitrary interference with privacy and correspondence.',
                        good: 'Fully compliant with UN Convention on the Rights of the Child Article 16.'
                      },
                      {
                        title: 'Model Personalization & Training',
                        bad: 'Centralized model training on raw scraped child conversations.',
                        good: 'Differential Privacy Federated Learning (DP-SGD) with local encrypted gradient aggregation.'
                      }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/30 transition">
                        <td className="p-4 font-semibold text-slate-200">
                          {row.title}
                        </td>
                        <td className="p-4 text-slate-400 bg-red-950/5 border-r border-slate-800">
                          <div className="flex items-start space-x-2">
                            <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                            <span>{row.bad}</span>
                          </div>
                        </td>
                        <td className="p-4 text-slate-200 bg-emerald-950/5 font-medium">
                          <div className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{row.good}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* The 4 Architectural Pillars of Zero-Surveillance */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 shadow space-y-2">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">1. Ephemeral Volatile Enclave</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Tokens exist only in RAM during the 40ms evaluation window. Physical memory scrubbers immediately zero-fill all temporary buffers.
                </p>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 shadow space-y-2">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg w-fit">
                  <KeyIcon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">2. Cryptographic Salted Hashes</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Senders are mapped to one-way HMAC-SHA256 digests. Neither SafeShield nor parents can reverse-engineer participant phone numbers or usernames.
                </p>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 shadow space-y-2">
                <div className="p-2 bg-pink-500/10 text-pink-400 rounded-lg w-fit">
                  <Heart className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">3. Trauma-Informed UX</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Designed in collaboration with child psychologists. Replaces alarmist panic sirens with calming, empowering choice cards that protect dignity.
                </p>
              </div>

              <div className="bg-slate-900/70 p-4 rounded-xl border border-slate-800 shadow space-y-2">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white">4. Differentially Private FL</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  System improvements occur strictly via encrypted gradient aggregation with Gaussian noise injection bounded by mathematical ε-differential privacy.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* =====================================================================
          CONFIRMATION MODAL: MEMORY PURGE (PHYSICAL ZERO-FILL)
          ===================================================================== */}
      {showPurgeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Purge Volatile Memory?</h3>
                <p className="text-xs text-slate-400">Execute physical zero-fill across all RAM buffers</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              This action immediately wipes all evaluated message strings, on-device model tensors, and active agent states from device memory. No historical logs or unencrypted strings will remain anywhere in memory.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowPurgeModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={executeMemoryPurge}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1.5 shadow-lg shadow-red-600/30 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirm RAM Purge</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FOOTER & HARDWARE TELEMETRY STATUS BAR
          ===================================================================== */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/90 py-4 px-4 sm:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">SafeShield AI Platform</span>
            <span>•</span>
            <span>Zero-Surveillance Architecture</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">100% On-Device</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-400">
            <span>Latency: <strong className="text-slate-200">{edgeStats.latencyMs}ms</strong></span>
            <span>•</span>
            <span>RAM: <strong className="text-slate-200">{edgeStats.ramUsageMb} MB</strong></span>
            <span>•</span>
            <span>Battery: <strong className="text-slate-200">{edgeStats.batteryPerHr}%/hr</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Helper inline icons to prevent import mismatches
function BrainIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/>
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/>
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/>
      <path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/>
      <path d="M6.002 5.125A3 3 0 0 0 6.401 6.5"/>
      <path d="M3.477 10.896a4 4 0 0 1 .585-.396"/>
      <path d="M19.938 10.5a4 4 0 0 1 .585.396"/>
      <path d="M6 18a4 4 0 0 1-1.967-.516"/>
      <path d="M19.967 17.484A4 4 0 0 1 18 18"/>
    </svg>
  );
}

function ShieldCheckIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  );
}

function KeyIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4"/>
      <path d="m21 2-9.6 9.6"/>
      <circle cx="7.5" cy="15.5" r="5.5"/>
    </svg>
  );
}

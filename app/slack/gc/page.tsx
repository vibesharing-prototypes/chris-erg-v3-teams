"use client";

import { useState, useRef, useEffect, useCallback } from "react";

/* ================================================================== */
/*  Types                                                              */
/* ================================================================== */

interface CardButton { label: string; style?: "primary" | "default"; href?: string }
interface AdaptiveCard {
  title?: string;
  fields?: { label: string; value: string; color?: string }[];
  bullets?: string[];
  buttons?: CardButton[];
  file?: { name: string; size: string };
  statusRows?: { icon: "check" | "pending" | "clock"; text: string; color?: string }[];
}

interface Msg {
  from: "user" | "bot" | string;
  text: string;
  time: string;
  card?: AdaptiveCard;
  reactions?: string[];
  thinking?: boolean;
}

interface Step {
  prompt: string;
  userMsg: Msg;
  botMsgs: Msg[];
}

interface FakeChat {
  name: string;
  avatar: string;
  preview: string;
  time: string;
}

/* ================================================================== */
/*  Helpers                                                            */
/* ================================================================== */

const AVATARS: Record<string, string> = {
  "sarah-mitchell": "https://randomuser.me/api/portraits/med/women/65.jpg",
};

function Avatar({ src, name, size = 32, className = "" }: { src?: string; name: string; size?: number; className?: string }) {
  const initials = name.split(" ").map(n => n[0]).join("");
  return src ? (
    <img src={src} alt={name} className={`rounded-lg object-cover shrink-0 ${className}`} style={{ width: size, height: size }} />
  ) : (
    <div className={`rounded-lg flex items-center justify-center text-white font-bold shrink-0 bg-[#4A154B] ${className}`} style={{ width: size, height: size, fontSize: size * 0.3 }}>{initials}</div>
  );
}

function DiligentBotIcon({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <div className={`shrink-0 rounded-lg overflow-hidden ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 48 48" width={size} height={size}>
        <rect width="48" height="48" rx="8" fill="#1A1A1A"/>
        <g transform="translate(6,6) scale(0.16)">
          <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64 c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
          <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01 h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
          <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66 C107.95,219.89,142.75,12.83,142.75,12.83z"/>
        </g>
        <path d="M34 10l1.2 2.8L38 14l-2.8 1.2L34 18l-1.2-2.8L30 14l2.8-1.2z" fill="white"/>
        <path d="M39 18l0.6 1.4 1.4 0.6-1.4 0.6L39 22l-0.6-1.4L37 20l1.4-0.6z" fill="white" opacity="0.7"/>
      </svg>
    </div>
  );
}

const FAKE_TEAM_CHATS: FakeChat[] = [
  { name: "Tom Henderson", avatar: "https://randomuser.me/api/portraits/med/men/32.jpg", preview: "Sure, I'll send the updated deck by EOD", time: "9:41 AM" },
  { name: "Priya Sharma", avatar: "https://randomuser.me/api/portraits/med/women/26.jpg", preview: "Can you review the contract redlines?", time: "Yesterday" },
  { name: "Alex Kim", avatar: "https://randomuser.me/api/portraits/med/men/75.jpg", preview: "Thanks for the heads up on the filing", time: "Yesterday" },
  { name: "Rachel Green", avatar: "https://randomuser.me/api/portraits/med/women/17.jpg", preview: "Risk register updated — see attached", time: "Yesterday" },
  { name: "Michael Torres", avatar: "https://randomuser.me/api/portraits/med/men/45.jpg", preview: "Budget approved for Q2 audit", time: "Mon" },
  { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/med/women/51.jpg", preview: "Drafted the board resolution — LMK", time: "Mon" },
  { name: "Kevin Liu", avatar: "https://randomuser.me/api/portraits/med/men/22.jpg", preview: "FYI the vendor responded to our RFP", time: "Mon" },
  { name: "Angela Brooks", avatar: "https://randomuser.me/api/portraits/med/women/68.jpg", preview: "Lunch Thursday?", time: "Mar 7" },
];

/* ================================================================== */
/*  GC End-to-End Steps                                                */
/* ================================================================== */

const GC_STEPS: Step[] = [
  {
    prompt: "Notify all recommended risk owners",
    userMsg: { from: "user", text: "Notify all recommended risk owners", time: "10:02 AM" },
    botMsgs: [
      { from: "bot", text: "", time: "10:02 AM", card: {
        title: "Risk Owners Assigned",
        statusRows: [
          { icon: "check", text: "Diana Reyes notified — Taiwan Strait", color: "#2BAC76" },
          { icon: "check", text: "Marcus Webb notified — Vendor Breach", color: "#2BAC76" },
          { icon: "check", text: "James Park notified — EU DMA", color: "#2BAC76" },
        ],
        bullets: ["All 3 owners have been sent investigation requests via Slack. They'll be interviewed by the AI Risk Manager and asked to respond within 48 hours.", "I'll notify you as each investigation is completed."],
      }},
    ],
  },
  {
    prompt: "What's the status?",
    userMsg: { from: "user", text: "What's the status on the investigations?", time: "11:30 AM" },
    botMsgs: [
      { from: "bot", text: "", time: "11:30 AM", card: {
        title: "Investigation Status",
        statusRows: [
          { icon: "check", text: "Diana Reyes — Interview complete", color: "#2BAC76" },
          { icon: "pending", text: "CRO — Reviewing Diana's responses, assessing severity", color: "#E8912D" },
          { icon: "pending", text: "Marcus Webb — Investigation in progress", color: "#E8912D" },
          { icon: "clock", text: "James Park — Not yet started", color: "#616061" },
        ],
      }},
      { from: "bot", text: "Diana finished her interview about Taiwan Strait — the CRO is reviewing it now and will submit his severity assessment shortly. I'll ping you as soon as all inputs are in so we can move to disclosure drafting.", time: "11:30 AM" },
    ],
  },
  {
    prompt: "All inputs are in — show me the draft",
    userMsg: { from: "user", text: "All inputs are in? Show me what you've drafted.", time: "2:30 PM" },
    botMsgs: [
      { from: "bot", text: "", time: "2:30 PM", card: {
        title: "CRO Evaluation Complete — All 3 Risks Assessed",
        statusRows: [
          { icon: "check", text: "Diana Reyes completed risk owner interview", color: "#2BAC76" },
          { icon: "check", text: "CRO severity assessment submitted — HIGH likelihood, CRITICAL impact", color: "#2BAC76" },
          { icon: "check", text: "Moody's geopolitical signals integrated", color: "#2BAC76" },
          { icon: "check", text: "Peer benchmark analysis complete", color: "#2BAC76" },
        ],
      }},
      { from: "bot", text: "All inputs are in. I've drafted a 10-K risk factor disclosure incorporating Diana's interview, the CRO's assessment, Moody's signals, and peer filings.\n\nYou can review, edit, and refine it in the Disclosure Writer before routing for approval.", time: "2:30 PM", card: {
        buttons: [
          { label: "Open Disclosure Writer", style: "primary", href: "/superhero/writer?risk=risk-taiwan&owner=diana-reyes" },
        ],
      }},
    ],
  },
  {
    prompt: "I've reviewed the draft — looks good. Send to CEO.",
    userMsg: { from: "user", text: "I've reviewed the draft — looks good. Send to Jennifer Walsh for approval.", time: "3:30 PM" },
    botMsgs: [
      { from: "bot", text: ":white_check_mark: Sent to Jennifer Walsh (CEO) for approval. She'll receive an approval request in Slack with the 10-K Risk Factor Draft, ERM Board Deck, and AI verification summary.\n\nI'll notify you when she responds.", time: "3:30 PM" },
    ],
  },
  {
    prompt: "Any updates from the CEO?",
    userMsg: { from: "user", text: "Any updates from Jennifer?", time: "4:45 PM" },
    botMsgs: [
      { from: "bot", text: "", time: "4:45 PM", card: {
        title: "CEO Approved — All Disclosures",
        statusRows: [
          { icon: "check", text: "Jennifer Walsh approved all 3 disclosures at 4:30 PM", color: "#2BAC76" },
          { icon: "check", text: "She requested routing to Audit, Risk, Compliance, and Cybersecurity committees", color: "#2BAC76" },
          { icon: "check", text: "All 5 committee members have been notified in #disclosure-committee", color: "#2BAC76" },
        ],
        bullets: ["Committee members are reviewing now. I'll let you know when all confirmations are in."],
      }},
    ],
  },
  {
    prompt: "Is everything confirmed?",
    userMsg: { from: "user", text: "Is everything confirmed?", time: "5:30 PM" },
    botMsgs: [
      { from: "bot", text: "", time: "5:30 PM", card: {
        title: "All Reviews Complete",
        statusRows: [
          { icon: "check", text: "David Patel (Audit) — No changes", color: "#2BAC76" },
          { icon: "check", text: "Linda Nakamura (Risk) — No changes", color: "#2BAC76" },
          { icon: "check", text: "James Thornton (Independent) — No changes", color: "#2BAC76" },
          { icon: "check", text: "Patricia Wells (Cybersecurity) — No changes", color: "#2BAC76" },
          { icon: "check", text: "Michael Okafor (Compliance) — No changes", color: "#2BAC76" },
        ],
        bullets: ["CEO + CFO certifications received. Filing package assembled with full audit trail."],
      }},
    ],
  },
  {
    prompt: "Submit to EDGAR",
    userMsg: { from: "user", text: "Submit to EDGAR.", time: "6:05 PM" },
    botMsgs: [
      { from: "bot", text: "Submitting the 10-K filing package to EDGAR now.\n\nPackage includes:\n• Updated Item 1A Risk Factors (Taiwan Strait, Vendor Breach, EU DMA)\n• Officer certifications (CEO + CFO)\n• Full audit trail and committee sign-offs", time: "6:05 PM", card: {
        statusRows: [
          { icon: "check", text: "Filing package assembled", color: "#2BAC76" },
          { icon: "check", text: "CEO certification — Jennifer Walsh", color: "#2BAC76" },
          { icon: "check", text: "CFO certification — Robert Tanaka", color: "#2BAC76" },
          { icon: "pending", text: "EDGAR submission in progress...", color: "#E8912D" },
        ],
      }},
    ],
  },
  {
    prompt: "Is the filing confirmed?",
    userMsg: { from: "user", text: "Is the filing confirmed?", time: "6:15 PM" },
    botMsgs: [
      { from: "bot", text: "", time: "6:15 PM", card: {
        title: "EDGAR Filing Accepted",
        statusRows: [
          { icon: "check", text: "10-K filing accepted by EDGAR at 6:12 PM EST", color: "#2BAC76" },
          { icon: "check", text: "Accession number: 0001234567-26-000142", color: "#2BAC76" },
          { icon: "check", text: "All parties notified — audit trail archived", color: "#2BAC76" },
        ],
        bullets: ["The complete governance trail — from initial risk detection through committee review and officer certification — has been archived in Diligent for your records.", "Total time from risk detection to EDGAR acceptance: 8 hours 12 minutes."],
      }},
    ],
  },
];

const GC_INTRO_DETECTION: Msg = {
  from: "bot", text: "", time: "10:00 AM", card: {
    title: "3 Emerging Risks Detected",
    fields: [
      { label: "Source", value: "Diligent AI Risk Scanner" },
      { label: "Scan completed", value: "Today at 9:58 AM" },
    ],
    statusRows: [
      { icon: "check", text: "Taiwan Strait Geopolitical Tensions — Critical", color: "#E01E5A" },
      { icon: "check", text: "Third-Party Vendor Data Breach — High", color: "#E8912D" },
      { icon: "check", text: "EU Digital Markets Act — High", color: "#E8912D" },
    ],
    bullets: [
      "All 3 risks cross the disclosure threshold based on SEC materiality guidance",
      "No current 10-K language covers these risks",
    ],
  },
};

const GC_INTRO_THINKING: Msg = {
  from: "bot", text: "Identifying risk owners based on role, domain expertise, and past assignment history...", time: "10:00 AM", thinking: true,
};

const GC_INTRO_OWNERS: Msg = {
  from: "bot", text: "Here are my recommendations:", time: "10:01 AM", card: {
    title: "Recommended Risk Owners",
    statusRows: [
      { icon: "check", text: "Taiwan Strait → Diana Reyes, VP Supply Chain", color: "#1264A3" },
      { icon: "check", text: "Vendor Breach → Marcus Webb, CISO", color: "#1264A3" },
      { icon: "check", text: "EU DMA → James Park, Chief Compliance Officer", color: "#1264A3" },
    ],
    bullets: ["Risk owners will be interviewed by the Diligent AI Risk Manager to provide context, assess severity, and confirm disclosure recommendations."],
    buttons: [{ label: "Assign Recommended Owners", style: "primary" }, { label: "Choose Different Owners" }],
  },
};

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function SlackGCPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [sending, setSending] = useState(false);
  const [introPhase, setIntroPhase] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const introStarted = useRef(false);

  const currentStep = GC_STEPS[stepIdx];
  const hasMore = stepIdx < GC_STEPS.length;

  const scroll = useCallback(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, []);

  useEffect(() => {
    if (introStarted.current) return;
    introStarted.current = true;
    setTimeout(() => { setMessages(prev => [...prev, GC_INTRO_DETECTION]); scroll(); }, 800);
    setTimeout(() => { setMessages(prev => [...prev, GC_INTRO_THINKING]); setIntroPhase(2); scroll(); }, 2500);
    setTimeout(() => { setMessages(prev => prev.filter(m => !m.thinking).concat(GC_INTRO_OWNERS)); setIntroPhase(3); scroll(); }, 5000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSend = () => {
    if (introPhase < 3 || !currentStep || sending) return;
    setSending(true);
    const step = currentStep;
    setMessages(prev => [...prev, step.userMsg]);
    setTimeout(scroll, 50);
    setTimeout(() => {
      setMessages(prev => [...prev, ...step.botMsgs]);
      setStepIdx(prev => prev + 1);
      setSending(false);
      setTimeout(scroll, 50);
    }, 1200);
  };

  return (
    <div className="h-screen bg-[#F5F5F5] flex flex-col items-center p-5 gap-3">
      {/* Header — GC context + platform switcher */}
      <div className="w-full max-w-[1360px] shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-white rounded-lg border border-[#DDD] p-0.5 shrink-0">
            <a href="/teams/gc" className="px-3 py-1 rounded-md text-[11px] font-medium text-[#888] hover:bg-[#F0F0F0] transition-colors">Teams</a>
            <span className="px-3 py-1 rounded-md bg-[#4A154B] text-white text-[11px] font-semibold">Slack</span>
          </div>
          <div className="h-4 w-px bg-[#DDD] mx-1" />
          <a href="/slack" className="text-[11px] text-[#4A154B] hover:underline font-medium whitespace-nowrap">← Multi-persona view</a>
          <div className="flex-1" />
        </div>
        <div className="flex items-center gap-3">
          <Avatar src={AVATARS["sarah-mitchell"]} name="Sarah Mitchell" size={36} />
          <div>
            <p className="text-[13px] font-bold text-[#1D1D1D]">Sarah Mitchell — General Counsel</p>
            <p className="text-[11px] text-[#888]">End-to-end ERG workflow from risk detection to EDGAR filing — all from Sarah&apos;s Slack DM</p>
          </div>
        </div>
      </div>

      {/* Slack App Window */}
      <div className="w-full max-w-[1360px] flex-1 min-h-0 rounded-xl overflow-hidden flex flex-col" style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.3), 0 0 0 0.5px rgba(0,0,0,0.12)" }}>
        {/* macOS Title Bar */}
        <div className="h-[32px] bg-[#350D36] flex items-center px-3 shrink-0 relative">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <span className="text-[12px] text-white/60 font-medium">Acme Corp.</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Avatar src={AVATARS["sarah-mitchell"]} name="Sarah Mitchell" size={22} />
          </div>
        </div>

        <div className="flex-1 flex min-h-0">
          {/* Slack Sidebar */}
          <div className="w-[260px] bg-[#3F0E40] flex flex-col shrink-0 min-h-0">
            <div className="px-4 pt-3 pb-2 shrink-0">
              <div className="flex items-center justify-between">
                <h1 className="text-[15px] font-bold text-white">Acme Corp.</h1>
                <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.6"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2 bg-white/10 rounded-md px-2.5 py-1.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" opacity="0.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                <span className="text-[12px] text-white/50">Search Acme Corp.</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 px-2 py-1">
              {[
                { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4", label: "Home" },
                { icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z", label: "DMs" },
                { icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9", label: "Activity" },
              ].map(item => (
                <button key={item.label} className={`w-full flex items-center gap-2 px-2 py-1.5 rounded text-left transition-colors ${item.label === "DMs" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10"}`}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                  <span className="text-[13px] font-medium">{item.label}</span>
                </button>
              ))}

              <div className="mt-3">
                <p className="text-[11px] text-white/40 font-semibold px-2 mb-1 uppercase tracking-wider flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white" opacity="0.4"><path d="M6 9l6 6 6-6" /></svg>
                  Channels
                </p>
                {["general", "risk-governance", "disclosure-committee", "audit-updates"].map(ch => (
                  <button key={ch} className="w-full flex items-center gap-1.5 px-2 py-1 rounded text-left text-white/60 hover:bg-white/10 transition-colors">
                    <span className="text-[13px] text-white/40">#</span>
                    <span className="text-[13px]">{ch}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3">
                <p className="text-[11px] text-[#E01E5A] font-semibold px-2 mb-1 uppercase tracking-wider flex items-center gap-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="#E01E5A"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  Urgent
                </p>
                <div className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-left bg-[#1264A3] text-white">
                  <DiligentBotIcon size={20} />
                  <div className="flex-1 min-w-0">
                    <span className="text-[13px] font-medium truncate block">Diligent Risk Agent</span>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#E01E5A] shrink-0" />
                </div>
              </div>

              <div className="mt-3">
                <p className="text-[11px] text-white/40 font-semibold px-2 mb-1 uppercase tracking-wider flex items-center gap-1">
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="white" opacity="0.4"><path d="M6 9l6 6 6-6" /></svg>
                  Direct Messages
                </p>
                {FAKE_TEAM_CHATS.map(fc => (
                  <div key={fc.name} className="w-full flex items-center gap-2 px-2 py-1 rounded text-left text-white/50">
                    <div className="relative">
                      <Avatar src={fc.avatar} name={fc.name} size={20} className="opacity-60" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#3F0E40] border border-[#3F0E40]"><div className="w-full h-full rounded-full border border-white/30" /></div>
                    </div>
                    <span className="text-[13px] truncate">{fc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0 bg-white">
            <div className="h-[49px] bg-white flex items-center justify-between px-4 shrink-0 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-2">
                <DiligentBotIcon size={24} />
                <span className="text-[16px] text-[#1D1C1D] font-bold">Diligent Risk Agent</span>
                <span className="text-[11px] text-white bg-[#4A154B] rounded px-1.5 py-0.5 font-bold uppercase">App</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="w-7 h-7 rounded flex items-center justify-center hover:bg-[#F0F0F0] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#616061" strokeWidth="1.5"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0">
              <div className="h-2" />
              <div className="max-w-[820px] mx-auto space-y-1">
                {messages.map((msg, i) => {
                  const isUser = msg.from === "user";
                  return (
                    <div key={i} className="flex gap-2 py-1 px-2 rounded-lg hover:bg-[#F8F8F8] group">
                      <div className="shrink-0 mt-0.5">
                        {isUser ? (
                          <Avatar src={AVATARS["sarah-mitchell"]} name="Sarah Mitchell" size={36} />
                        ) : (
                          <DiligentBotIcon size={36} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[14px] font-bold text-[#1D1C1D]">{isUser ? "Sarah Mitchell" : "Diligent Risk Agent"}</span>
                          {!isUser && <span className="text-[10px] text-white bg-[#4A154B] rounded px-1 py-px font-bold uppercase">App</span>}
                          <span className="text-[11px] text-[#616061]">{msg.time}</span>
                        </div>
                        {msg.thinking ? (
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="text-[14px] text-[#616061] italic">{msg.text}</p>
                            <div className="flex items-center gap-1 shrink-0">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#4A154B] animate-bounce" style={{ animationDelay: "0ms" }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#4A154B] animate-bounce" style={{ animationDelay: "150ms" }} />
                              <div className="w-1.5 h-1.5 rounded-full bg-[#4A154B] animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                          </div>
                        ) : msg.text ? (
                          <p className="text-[14px] text-[#1D1C1D] leading-relaxed whitespace-pre-wrap mt-0.5">
                            {msg.text.split(/(\*[^*]+\*)/).map((part, pi) =>
                              part.startsWith("*") && part.endsWith("*") ? (
                                <strong key={pi} className="font-bold">{part.slice(1, -1)}</strong>
                              ) : (<span key={pi}>{part}</span>)
                            )}
                          </p>
                        ) : null}
                        {msg.card && (
                          <div className={`${msg.text ? "mt-2" : "mt-0.5"} rounded-lg border border-[#E0E0E0] overflow-hidden bg-white`} style={{ borderLeft: "4px solid #4A154B" }}>
                            {msg.card.title && <div className="px-3 py-2 border-b border-[#E8E8E8]"><p className="text-[14px] font-bold text-[#1D1C1D]">{msg.card.title}</p></div>}
                            <div className="px-3 py-2 space-y-2">
                              {msg.card.fields && (
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                                  {msg.card.fields.map((f, fi) => (
                                    <div key={fi}>
                                      <p className="text-[11px] text-[#616061] font-semibold uppercase tracking-wider">{f.label}</p>
                                      <p className="text-[13px] font-medium" style={{ color: f.color ?? "#1D1C1D" }}>{f.value}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {msg.card.statusRows && (
                                <div className="space-y-1">
                                  {msg.card.statusRows.map((sr, si) => (
                                    <div key={si} className="flex items-center gap-2">
                                      {sr.icon === "check" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sr.color ?? "#2BAC76"} strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>}
                                      {sr.icon === "pending" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sr.color ?? "#E8912D"} strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>}
                                      {sr.icon === "clock" && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sr.color ?? "#616061"} strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>}
                                      <p className="text-[12px]" style={{ color: sr.color ?? "#1D1C1D" }}>{sr.text}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {msg.card.bullets && (
                                <div className="space-y-0.5">
                                  {msg.card.bullets.map((b, bi) => (
                                    <div key={bi} className="flex items-start gap-1.5">
                                      <span className="text-[#616061] text-[10px] mt-1">•</span>
                                      <p className="text-[12px] text-[#616061] leading-relaxed">{b}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                              {msg.card.file && (
                                <div className="flex items-center gap-3 bg-[#F8F8F8] rounded-lg p-2 border border-[#E0E0E0]">
                                  <div className="w-9 h-9 rounded-lg bg-[#4A154B] flex items-center justify-center shrink-0">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                                  </div>
                                  <div>
                                    <p className="text-[13px] text-[#1264A3] font-medium">{msg.card.file.name}</p>
                                    <p className="text-[11px] text-[#616061]">{msg.card.file.size}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            {msg.card.buttons && (
                              <div className="flex items-center gap-2 px-3 py-2 border-t border-[#E8E8E8] flex-wrap">
                                {msg.card.buttons.map((btn, bi) => {
                                  const isLastMsg = i === messages.length - 1 || (i === messages.length - 2 && messages[messages.length - 1]?.card?.buttons);
                                  const canAdvance = isLastMsg && !sending && currentStep;
                                  return btn.href ? (
                                    <a key={bi} href={btn.href} target="_blank" rel="noopener noreferrer" className={`px-3 py-1.5 rounded text-[12px] font-bold transition-colors cursor-pointer ${btn.style === "primary" ? "bg-[#007A5A] text-white hover:bg-[#148567]" : "border border-[#D0D0D0] text-[#1D1C1D] hover:bg-[#F0F0F0]"}`}>{btn.label}</a>
                                  ) : (
                                    <button key={bi} onClick={canAdvance ? handleSend : undefined} className={`px-3 py-1.5 rounded text-[12px] font-bold transition-colors ${canAdvance ? "cursor-pointer" : ""} ${btn.style === "primary" ? "bg-[#007A5A] text-white hover:bg-[#148567]" : "border border-[#D0D0D0] text-[#1D1C1D] hover:bg-[#F0F0F0]"}`}>{btn.label}</button>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>
            </div>

            {/* Input — Slack style */}
            <div className="bg-white border-t border-[#E0E0E0] px-5 py-3 shrink-0">
              <div className="border border-[#D0D0D0] rounded-lg overflow-hidden focus-within:border-[#1264A3] focus-within:shadow-[0_0_0_1px_#1264A3] transition-all">
                <div className="flex items-center gap-0.5 px-2 py-1 border-b border-[#E8E8E8]">
                  {["B", "I", "S", "🔗", "📎", "📋"].map((t, ti) => (
                    <button key={ti} className="w-7 h-7 rounded flex items-center justify-center text-[12px] text-[#616061] hover:bg-[#F0F0F0] font-bold transition-colors">{t}</button>
                  ))}
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                  {introPhase < 3 ? (
                    <span className="flex-1 text-[14px] text-[#B0B0B0]">Message Diligent Risk Agent</span>
                  ) : hasMore ? (
                    <button onClick={handleSend} className="flex-1 text-left text-[14px] text-[#1D1C1D] truncate cursor-pointer hover:text-[#4A154B] transition-colors">{currentStep?.prompt}</button>
                  ) : (
                    <span className="flex-1 text-[14px] text-[#2BAC76] font-medium">✓ Workflow complete — EDGAR filing accepted</span>
                  )}
                  <div className="flex items-center gap-1 shrink-0">
                    <button className="w-7 h-7 rounded flex items-center justify-center text-[#616061] hover:bg-[#F0F0F0] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" /><line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" /></svg>
                    </button>
                    <button className="w-7 h-7 rounded flex items-center justify-center text-[#616061] hover:bg-[#F0F0F0] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </button>
                    <button
                      onClick={handleSend}
                      disabled={sending || introPhase < 3 || !hasMore}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${(!sending && introPhase >= 3 && hasMore) ? "bg-[#007A5A] hover:bg-[#148567] text-white cursor-pointer" : "bg-[#F0F0F0] text-[#B0B0B0] cursor-default"}`}
                    >
                      {sending ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

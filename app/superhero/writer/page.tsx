"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ReturnToChat from "@/app/components/ReturnToChat";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function DiligentLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 222 222" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
        <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
        <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
      </g>
    </svg>
  );
}

const DiligentAgentIcon = () => (
  <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
    <path d="M20.1006 15.6877C20.0186 15.8056 19.9338 15.9211 19.8467 16.0364C19.5697 16.4006 19.2675 16.7474 18.9443 17.0706C17.5077 18.5072 15.6393 19.5107 13.5459 19.8596L6.03223 12.345L8.3877 9.98755H8.38965L8.39258 9.98462L20.1006 15.6877Z" fill="#D3222A"/>
    <path d="M20.0259 4.21263C21.1905 5.84672 21.8735 7.84495 21.8735 9.99974C21.8735 12.116 21.2194 14.0737 20.1011 15.6872L8.39209 9.98412L20.0259 4.21263Z" fill="#EE312E"/>
    <path d="M13.5454 19.8581C13.0018 19.9504 12.4428 19.9997 11.8735 19.9997H3.69971L4.89307 13.4802L6.03174 12.3445L13.5454 19.8581Z" fill="#AF292E"/>
    <path d="M13.5435 0.141312C16.0395 0.559546 18.2228 1.90387 19.7261 3.80733C19.8311 3.94057 19.9311 4.07423 20.0259 4.2126L8.39209 9.98409H8.38623L6.04443 7.63936L13.5435 0.141312Z" fill="#D3222A"/>
    <path d="M11.8735 0C12.4429 2.15682e-05 12.9997 0.0482901 13.5435 0.140625L6.04443 7.63965L4.88232 6.47754L3.69971 0H11.8735Z" fill="#AF292E"/>
    <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
  </svg>
);

/** Per-risk prior-year language, gap, and default draft — so GC sees what they had and what's missing */
const RISK_DISCLOSURE_DATA: Record<
  string,
  { label: string; priorYearTitle: string; priorYearBody: string; gap: string; defaultTitle: string; defaultBody: string }
> = {
  "risk-taiwan": {
    label: "Taiwan Strait",
    priorYearTitle: "Operational and Supply Chain Risks",
    priorYearBody:
      "Our operations depend on the continuous and uninterrupted performance of our supply chain and key operational processes. Disruptions caused by natural disasters, geopolitical events, or failures of key vendors could adversely affect our ability to deliver products and services to our customers.",
    gap: "No geographic concentration disclosure. Current language does not address Taiwan Strait exposure, semiconductor supplier concentration (47% Taiwan-based), or board-level diversification initiatives.",
    defaultTitle: "Semiconductor Supply Chain and Geopolitical Risks",
    defaultBody: `We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. We are pursuing supplier diversification initiatives, including evaluation of alternative sourcing regions as discussed at the board level; however, qualification of alternative suppliers typically requires 12-18 months.`,
  },
  "risk-vendor": {
    label: "Vendor Breach",
    priorYearTitle: "Cybersecurity and Data Privacy Risks",
    priorYearBody:
      "We face risks related to cybersecurity threats and data privacy obligations across multiple jurisdictions. A breach of our information systems could result in the loss of confidential information, disruption to our business operations, and significant reputational harm. We invest in security infrastructure and employee training programs; however, no assurance can be given that our measures will prevent all cyber incidents.",
    gap: "No third-party vendor concentration disclosure. Current language focuses on internal systems; does not address critical vendor incidents (e.g., CloudSecure ransomware), DPA exposure, or vendor-specific breach response.",
    defaultTitle: "Third-Party Vendor Cybersecurity Risks",
    defaultBody: `We face risks related to cybersecurity threats affecting our operations and those of our critical vendors. A breach of our information systems or those of key third-party service providers could result in the loss of confidential information, disruption to our business operations, and significant reputational harm. We rely on third-party vendors for data processing and cloud infrastructure; we maintain vendor risk assessments and incident response procedures; however, no assurance can be given that our measures or those of our vendors will prevent all cyber incidents.`,
  },
  "risk-dma": {
    label: "EU DMA",
    priorYearTitle: "Regulatory and Compliance Risks",
    priorYearBody:
      "We are subject to a wide range of laws and regulations in the jurisdictions in which we operate. Changes in these laws, or our failure to comply with existing requirements, could result in fines, penalties, litigation, or restrictions on our business activities. Regulatory developments may also increase our compliance costs and operational complexity.",
    gap: "No EU Digital Markets Act disclosure. Current language is generic; does not address DMA enforcement, EC scrutiny of peer companies, or our 23% EU revenue exposure.",
    defaultTitle: "EU Digital Markets Act and Regulatory Risks",
    defaultBody: `We are subject to a wide range of laws and regulations in the jurisdictions in which we operate, including the EU Digital Markets Act (DMA). Enforcement actions by the European Commission against companies in our sector may affect our regulatory approach and compliance obligations. We derive approximately 23% of annual revenue from EU operations. Changes in these laws, or our failure to comply with existing requirements, could result in fines, penalties, litigation, or restrictions on our business activities. Regulatory developments may also increase our compliance costs and operational complexity.`,
  },
};

const RISK_IDS = ["risk-taiwan", "risk-vendor", "risk-dma"] as const;

const RISK_METADATA: Record<string, {
  avgWordCount: number;
  shortDraftSuggestions: string[];
  riskLibraryMentions: string[];
  peerInsights: { count: number; examples: string[] };
}> = {
  "risk-taiwan": {
    avgWordCount: 142,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or diversification plans.",
      "Consider adding the supplier diversification timeline (e.g., 12–18 month qualification).",
      "Consider mentioning board-level initiatives discussed in prior materials.",
    ],
    riskLibraryMentions: ["supplier diversification timeline", "geographic concentration percentage", "lead time / qualification period", "board-level initiatives"],
    peerInsights: { count: 4, examples: [
      "TechCorp: \"Approximately 52% of our semiconductor procurement is sourced from Taiwan-based facilities.\"",
      "GlobalChip: \"We are evaluating alternative sourcing in Vietnam and Malaysia; qualification typically requires 12–18 months.\"",
      "MegaElectronics: \"Geopolitical tensions in the Taiwan Strait could materially disrupt our supply chain.\"",
    ]},
  },
  "risk-vendor": {
    avgWordCount: 128,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or incident response procedures.",
      "Consider adding vendor risk assessment or DPA coverage.",
      "Consider mentioning third-party concentration or reliance on key vendors.",
    ],
    riskLibraryMentions: ["third-party / vendor concentration", "incident response procedures", "DPA / data processing agreements", "vendor risk assessments"],
    peerInsights: { count: 3, examples: [
      "SecureData Inc: \"A breach affecting our key cloud infrastructure vendor could disrupt operations across multiple business lines.\"",
      "CloudFirst: \"We maintain incident response procedures with critical vendors; however, vendor compliance cannot be guaranteed.\"",
    ]},
  },
  "risk-dma": {
    avgWordCount: 118,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or compliance readiness.",
      "Consider adding EU revenue exposure or geographic breakdown.",
      "Consider mentioning EC enforcement actions or peer designation.",
    ],
    riskLibraryMentions: ["EU revenue exposure", "EC enforcement actions", "designation / gatekeeper status", "compliance costs"],
    peerInsights: { count: 3, examples: [
      "EuroTech: \"The European Commission has designated three companies in our sector under the DMA; we are monitoring implications.\"",
      "GlobalPlatform: \"Approximately 28% of revenue is derived from EU operations; regulatory changes could materially impact our business model.\"",
    ]},
  },
};

type CroAssessment = {
  riskName?: string;
  ownerName?: string;
  userContext?: string;
  likelihood?: string;
  impact?: string;
  controls?: string;
  mitigations?: string;
  additionalAssessment?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const PROMPT_SUGGESTIONS = [
  "Strengthen Taiwan risk language",
  "Add supplier diversification timeline",
  "Add controls and mitigations disclosure",
  "Tone down severity",
  "Align with CRO assessment",
];

/* ------------------------------------------------------------------ */
/*  Text Selection Popup (adapted from Connected Compliance editor)    */
/* ------------------------------------------------------------------ */

interface SelectionPopup {
  x: number;
  y: number;
  text: string;
}

function useTextSelectionPopup(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [popup, setPopup] = useState<SelectionPopup | null>(null);

  const handleMouseUp = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
    if (containerRef.current && !containerRef.current.contains(sel.anchorNode)) return;

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    setPopup({
      x: rect.left + rect.width / 2 - containerRect.left,
      y: rect.top - containerRect.top - 8,
      text: sel.toString().trim(),
    });
  }, [containerRef]);

  const dismiss = useCallback(() => setPopup(null), []);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-selection-popup]")) return;
      setPopup(null);
    };
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseUp]);

  return { popup, dismiss };
}

function generateRewrite(original: string, mode: "formal" | "concise" | "example"): string {
  const lower = original.toLowerCase();
  if (mode === "formal") {
    if (lower.includes("taiwan") || lower.includes("semiconductor") || lower.includes("supply chain")) {
      return "The Corporation faces material risks arising from geopolitical instability in the Taiwan Strait region, upon which approximately 47% of the Corporation's semiconductor procurement is concentrated. Escalation of tensions may result in significant disruption to the Corporation's supply chain, materially adverse extension of component lead times, and impairment of the Corporation's capacity to fulfill its obligations to customers and partners.";
    }
    return "The Corporation hereby acknowledges and discloses the following risk factor, which may materially affect the Corporation's financial condition, results of operations, and future prospects, and which investors should carefully consider.";
  }
  if (mode === "concise") {
    if (lower.includes("taiwan") || lower.includes("semiconductor") || lower.includes("supply chain")) {
      return "47% of chip suppliers operate in Taiwan. Escalating tensions risk supply chain disruption, extended lead times, and inability to source critical components. Diversification underway; 12–18 month qualification timeline.";
    }
    return "This risk could materially impact operations and financial results. Mitigations are in progress but may not fully offset exposure.";
  }
  if (lower.includes("taiwan") || lower.includes("semiconductor") || lower.includes("supply chain")) {
    return original + "\n\nFor example, in Q3 2025, a 72-hour military exercise near the Taiwan Strait caused a 14-day shipping delay for 3 of our top 10 chip suppliers, temporarily reducing available inventory by 22% and triggering expedited sourcing at a 35% cost premium.";
  }
  return original + "\n\nFor example, a comparable company in our sector experienced a $42M revenue impact when a single vendor disruption cascaded across three product lines over two quarters.";
}

function SelectionToolbar({ popup, onAction, onDismiss }: { popup: SelectionPopup; onAction: (action: string, result?: string) => void; onDismiss: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [rewriteMode, setRewriteMode] = useState<"formal" | "concise" | "example" | null>(null);
  const selectedSnippet = popup.text.length > 80 ? popup.text.slice(0, 77) + "..." : popup.text;

  const actions = [
    { id: "edit", icon: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7", label: "Edit directly", color: "#58a6ff" },
    { id: "source", icon: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", label: "See AI source", color: "#a78bfa" },
    { id: "peers", icon: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75", label: "How peers phrase this", color: "#fbbf24" },
  ];

  const rewriteActions: { id: "formal" | "concise" | "example"; label: string; color: string }[] = [
    { id: "formal", label: "More formal", color: "#a78bfa" },
    { id: "concise", label: "More concise", color: "#3fb950" },
    { id: "example", label: "Add example", color: "#fbbf24" },
  ];

  const sourceContent: Record<string, { title: string; body: string }> = {
    source: {
      title: "AI Source & Reasoning",
      body: "This language was generated from Moody's geopolitical risk signals, Diana Reyes's risk owner interview, the CRO's severity assessment, SEC 10-K disclosure guidance, and peer filings from 4 comparable companies with Taiwan semiconductor exposure.",
    },
    peers: {
      title: "How Peers Phrase This",
      body: "Among 4 peer companies with Taiwan supply chain exposure, 3 out of 4 explicitly quantify their supplier concentration percentage. 3 out of 4 mention diversification timelines. Average disclosure length for this risk factor is 142 words.",
    },
  };

  const rewriteResult = rewriteMode ? generateRewrite(popup.text, rewriteMode) : null;
  const rewriteLabels: Record<string, string> = { formal: "More Formal", concise: "More Concise", example: "With Example" };

  return (
    <div
      data-selection-popup
      className="absolute z-50"
      style={{ left: popup.x, top: popup.y, transform: "translate(-50%, -100%)" }}
    >
      {expanded && expanded !== "edit" && sourceContent[expanded] && !rewriteMode && (
        <div className="mb-2 w-[340px] rounded-lg border border-[#30363d] bg-[#161b22] p-4 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[12px] font-bold text-[#f0f6fc]">{sourceContent[expanded].title}</h4>
            <button onClick={() => setExpanded(null)} className="text-[#484f58] hover:text-[#8b949e] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <p className="text-[11px] text-[#8b949e] leading-relaxed mb-3">{sourceContent[expanded].body}</p>
          <div className="rounded-md bg-[#0d1117] border border-[#21262d] px-3 py-2">
            <p className="text-[10px] text-[#484f58] mb-1">Selected text</p>
            <p className="text-[11px] text-[#c9d1d9] italic">&ldquo;{selectedSnippet}&rdquo;</p>
          </div>
        </div>
      )}

      {rewriteMode && rewriteResult && (
        <div className="mb-2 w-[400px] rounded-lg border border-[#30363d] bg-[#161b22] p-4 shadow-xl shadow-black/40">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[12px] font-bold text-[#f0f6fc]">AI Rewrite — {rewriteLabels[rewriteMode]}</h4>
            <button onClick={() => setRewriteMode(null)} className="text-[#484f58] hover:text-[#8b949e] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="rounded-md bg-[#0d1117] border border-[#21262d] px-3 py-2 mb-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#484f58] mb-1">Original</p>
            <p className="text-[11px] text-[#6e7681] leading-relaxed line-through">{selectedSnippet}</p>
          </div>
          <div className="rounded-md border border-[#a78bfa]/30 bg-[#a78bfa]/5 px-3 py-2 mb-3">
            <p className="text-[9px] font-bold uppercase tracking-widest text-[#a78bfa] mb-1">Suggested rewrite</p>
            <p className="text-[11px] text-[#c9d1d9] leading-relaxed whitespace-pre-line">{rewriteResult}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { onAction("accept-rewrite", rewriteResult); onDismiss(); }}
              className="flex items-center gap-1.5 rounded-md bg-[#238636]/20 text-[#3fb950] text-[11px] font-semibold px-3 py-1.5 hover:bg-[#238636]/30 transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
              Accept rewrite
            </button>
            <button onClick={() => setRewriteMode(null)} className="rounded-md text-[#8b949e] text-[11px] font-medium px-3 py-1.5 hover:bg-[#21262d] transition-colors">Try another</button>
          </div>
        </div>
      )}

      <div className="rounded-lg border border-[#30363d] bg-[#161b22] shadow-xl shadow-black/40 overflow-hidden">
        <div className="flex items-center gap-0.5 p-1">
          {actions.map((a) => (
            <button
              key={a.id}
              onClick={() => {
                if (a.id === "edit") { onAction("edit"); onDismiss(); }
                else { setRewriteMode(null); setExpanded(expanded === a.id ? null : a.id); }
              }}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-[#21262d]"
              style={{ color: expanded === a.id && !rewriteMode ? a.color : "#8b949e" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={a.icon} /></svg>
              {a.label}
            </button>
          ))}
        </div>
        <div className="h-px bg-[#21262d]" />
        <div className="flex items-center gap-0.5 p-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#30363d] px-2">Rewrite</span>
          {rewriteActions.map((a) => (
            <button
              key={a.id}
              onClick={() => { setExpanded(null); setRewriteMode(rewriteMode === a.id ? null : a.id); }}
              className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-colors hover:bg-[#21262d]"
              style={{ color: rewriteMode === a.id ? a.color : "#6e7681" }}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center -mt-px">
        <div className="w-2 h-2 rotate-45 bg-[#161b22] border-r border-b border-[#30363d]" />
      </div>
    </div>
  );
}

function LeftRailMini() {
  return (
    <div className="flex items-center gap-1">
      <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-[#21262d] transition-colors" title="Home">
        <DiligentLogo className="h-4 w-4" />
      </Link>
      <Link href="/superhero/risk-essentials" className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors" title="Risk Essentials">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
      </Link>
      <Link href="/superhero/cro-review" className="flex h-8 w-8 items-center justify-center rounded-lg text-[#8b949e] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors" title="CRO Review">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
      </Link>
      <div className="h-5 w-px bg-[#30363d] mx-1" />
    </div>
  );
}

function WriterContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Defer URL params until after mount to avoid hydration mismatch (useSearchParams can differ on server vs client)
  useEffect(() => setMounted(true), []);

  const urlRiskId = mounted ? (searchParams?.get("risk") || "risk-taiwan") : "risk-taiwan";
  const fromParam = mounted ? searchParams?.get("from") : null;
  const chatBase = fromParam === "slack" ? "/slack" : "/teams";

  const [activeRiskId, setActiveRiskId] = useState<string>("risk-taiwan");
  const [croAssessment, setCroAssessment] = useState<CroAssessment | null>(null);
  const [draftsByRisk, setDraftsByRisk] = useState<Record<string, { title: string; body: string }>>(() =>
    Object.fromEntries(RISK_IDS.map((id) => [id, { title: RISK_DISCLOSURE_DATA[id].defaultTitle, body: RISK_DISCLOSURE_DATA[id].defaultBody }]))
  );

  const riskId = activeRiskId;
  const riskData = RISK_DISCLOSURE_DATA[riskId];
  const draftTitle = draftsByRisk[riskId]?.title ?? riskData?.defaultTitle ?? "";
  const draftBody = draftsByRisk[riskId]?.body ?? riskData?.defaultBody ?? "";
  const setDraftTitle = (v: string) =>
    setDraftsByRisk((prev) => ({ ...prev, [riskId]: { title: v, body: prev[riskId]?.body ?? riskData?.defaultBody ?? "" } }));
  const setDraftBody = (v: string) =>
    setDraftsByRisk((prev) => ({ ...prev, [riskId]: { title: prev[riskId]?.title ?? riskData?.defaultTitle ?? "", body: v } }));
  const [promptInput, setPromptInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const { popup, dismiss } = useTextSelectionPopup(editorRef);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = sessionStorage.getItem("croAssessment");
        if (stored) setCroAssessment(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && RISK_IDS.includes(urlRiskId as (typeof RISK_IDS)[number])) setActiveRiskId(urlRiskId);
  }, [mounted, urlRiskId]);

  const handleSendPrompt = () => {
    const trimmed = promptInput.trim();
    if (!trimmed || isLoading) return;

    const ts = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: `u-${Date.now()}`, role: "user", content: trimmed, timestamp: ts },
    ]);
    setPromptInput("");
    setIsLoading(true);

    // Simulated AI response and draft update
    const lower = trimmed.toLowerCase();
    let suggestedEdit = "";
    let newBody = draftBody;

    if (lower.includes("strengthen") || lower.includes("taiwan")) {
      suggestedEdit = "I've strengthened the Taiwan-specific language and added the 47% supplier concentration figure more prominently.";
      newBody = "We face significant risks related to semiconductor supply chain concentration and geopolitical exposure in the Taiwan Strait region. Approximately 47% of our chip suppliers have Taiwan-based operations, creating material concentration risk. Escalating tensions may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. We are pursuing supplier diversification initiatives, including evaluation of alternative sourcing regions as discussed at the board level; however, qualification of alternative suppliers typically requires 12-18 months.";
    } else if (lower.includes("diversification") || lower.includes("timeline")) {
      suggestedEdit = "I've added language about the supplier diversification timeline, including board-level initiatives.";
      newBody = "We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. We have initiated a supplier diversification program aligned with initiatives discussed at the board level; qualification of alternative suppliers is in progress, with a typical timeline of 12-18 months to complete.";
    } else if (lower.includes("controls") || lower.includes("mitigation")) {
      suggestedEdit = "I've incorporated the CRO's controls and mitigations into the draft.";
      newBody = "We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. We maintain dual-sourcing arrangements for certain critical components and are pursuing supplier diversification initiatives as discussed at the board level; however, qualification of alternative suppliers typically requires 12-18 months.";
    } else if (lower.includes("tone down") || lower.includes("severity")) {
      suggestedEdit = "I've softened the severity language and added appropriate qualifiers.";
      newBody = "We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. In the event of escalating tensions in the Taiwan Strait, our semiconductor supply chain could be disrupted, potentially extending lead times and adversely affecting our ability to source certain critical components. We are pursuing supplier diversification initiatives as discussed at the board level; however, qualification of alternative suppliers typically requires 12-18 months.";
    } else if (lower.includes("align") || lower.includes("cro")) {
      suggestedEdit = "I've aligned the draft with the CRO assessment. Review the updated language.";
      newBody = croAssessment?.controls
        ? `We face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and materially impact our ability to source critical components. ${croAssessment.controls} We are pursuing supplier diversification initiatives as discussed at the board level; however, qualification of alternative suppliers typically requires 12-18 months.`
        : draftBody;
    } else {
      suggestedEdit = "I've reviewed your request and updated the draft. Please review the changes in the editable panel.";
    }

    setTimeout(() => {
      setDraftBody(newBody);
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: suggestedEdit,
          timestamp: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        },
      ]);
      setIsLoading(false);
      scrollToBottom();
    }, 600);
  };

  const handleSuggestionClick = (s: string) => {
    setPromptInput(s);
    inputRef.current?.focus();
  };

  const [adviceTab, setAdviceTab] = useState<"suggestions" | "research" | "peers">("suggestions");
  const meta = riskData ? RISK_METADATA[riskId] : null;
  const wordCount = (draftTitle + " " + draftBody).trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <ReturnToChat />
      {/* Browser chrome wrapper */}
      <div className="w-full max-w-[1200px] h-[85vh] rounded-xl border border-[#3a3a3a] bg-[#0d1117] shadow-2xl shadow-black/50 flex flex-col overflow-hidden">

        {/* macOS title bar */}
        <div className="h-10 bg-[#2b2b2b] border-b border-[#3a3a3a] flex items-center px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Link href="/" className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors" title="Close" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-md px-3 py-1 min-w-[360px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              <span className="text-[11px] text-[#999]">risk-essentials.diligent.com/disclosure-writer</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" className="ml-auto"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
            </div>
          </div>
          <div className="w-[52px]" />
        </div>

        {/* App top bar: logo + submit */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] shrink-0">
          <LeftRailMini />
          <Link
            href={`${chatBase}?chat=draft-review`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3fb950] px-4 py-1.5 text-xs font-semibold text-[#0d1117] hover:bg-[#46c35a] transition-colors"
          >
            Submit draft
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </div>

        {/* Risk tabs — inside content, controls what's below */}
        <div className="flex items-center gap-0 px-4 bg-[#0d1117] border-b border-[#30363d] shrink-0">
          {RISK_IDS.map((id) => (
            <button
              key={id}
              onClick={() => setActiveRiskId(id)}
              className={cn(
                "px-4 py-2.5 text-[12px] font-medium transition-colors border-b-2 -mb-px",
                activeRiskId === id
                  ? "border-[#58a6ff] text-[#58a6ff]"
                  : "border-transparent text-[#8b949e] hover:text-[#f0f6fc]"
              )}
            >
              {RISK_DISCLOSURE_DATA[id].label}
            </button>
          ))}
        </div>

        {/* Two columns: Original | New (editable with selection popover) */}
        <div className="flex-1 flex min-h-0 overflow-hidden">

          {/* Left: Original text (read-only) */}
          <div className="w-[42%] shrink-0 flex flex-col border-r border-[#30363d]">
            <div className="px-5 py-2 bg-[#161b22] border-b border-[#30363d] shrink-0">
              <span className="text-[11px] font-medium text-[#6e7681] uppercase tracking-wider">Original — Prior Year Language</span>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {riskData && (
                <div>
                  <h3 className="text-[14px] font-semibold text-[#f0f6fc] mb-3">{riskData.priorYearTitle}</h3>
                  <p className="text-[13px] text-[#8b949e] leading-[1.8]">{riskData.priorYearBody}</p>
                  <div className="mt-4 rounded-lg border border-[#d29922]/40 bg-[#d29922]/5 p-3">
                    <p className="text-[10px] font-semibold text-[#d29922] uppercase tracking-wider mb-1">Disclosure Gap</p>
                    <p className="text-[12px] text-[#f0f6fc] leading-relaxed">{riskData.gap}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: editable draft (contentEditable for selection popover) + prompt */}
          <div className="flex-1 flex flex-col min-w-0">

            {/* Header with formatting toolbar */}
            <div className="px-4 py-2 bg-[#161b22] border-b border-[#30363d] shrink-0 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-medium text-[#6e7681] uppercase tracking-wider">New — AI-Drafted Disclosure</span>
                <span className="rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30 px-2 py-0.5 text-[9px] text-[#3fb950] font-semibold">EDITABLE</span>
              </div>
              <div className="flex items-center gap-0.5 bg-[#0d1117] border border-[#30363d] rounded-md px-1 py-0.5">
                {[
                  { label: "Bold", path: "M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z" },
                  { label: "Italic", path: "M19 4h-9M14 20H5M15 4L9 20" },
                  { label: "Heading", path: "M6 4v16M18 4v16M6 12h12" },
                  { label: "List", path: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" },
                ].map((btn) => (
                  <button key={btn.label} title={btn.label} className="w-6 h-6 flex items-center justify-center rounded text-[#6e7681] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors">
                    <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d={btn.path} /></svg>
                  </button>
                ))}
                <div className="w-px h-3.5 bg-[#30363d] mx-0.5" />
                <button title="Undo" className="w-6 h-6 flex items-center justify-center rounded text-[#6e7681] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors">
                  <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10h10a5 5 0 015 5v0a5 5 0 01-5 5H3" /><path d="M7 6l-4 4 4 4" /></svg>
                </button>
                <button title="Redo" className="w-6 h-6 flex items-center justify-center rounded text-[#6e7681] hover:text-[#f0f6fc] hover:bg-[#21262d] transition-colors">
                  <svg width={12} height={12} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10H11a5 5 0 00-5 5v0a5 5 0 005 5h10" /><path d="M17 6l4 4-4 4" /></svg>
                </button>
              </div>
            </div>

            {/* contentEditable draft — supports text selection + popover */}
            <div ref={editorRef} className="relative flex-1 overflow-y-auto p-5">
              {popup && (
                <SelectionToolbar
                  popup={popup}
                  onAction={(action, result) => {
                    if (action === "accept-rewrite" && result) {
                      setDraftBody(draftBody.replace(popup.text, result));
                    }
                  }}
                  onDismiss={dismiss}
                />
              )}
              <div
                className="text-[14px] font-semibold text-[#f0f6fc] mb-3 focus:outline-none"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setDraftTitle(e.currentTarget.textContent || "")}
              >
                {draftTitle}
              </div>
              <div
                className="text-[13px] text-[#f0f6fc] leading-[1.8] focus:outline-none whitespace-pre-wrap min-h-[120px]"
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setDraftBody(e.currentTarget.textContent || "")}
              >
                {draftBody}
              </div>
            </div>

            {/* Advice tray: tabbed — inside right column, above prompt */}
            <div className="shrink-0 border-t border-[#30363d] bg-[#161b22]">
              <div className="flex items-center gap-0 px-4 border-b border-[#30363d]">
                {([
                  { id: "suggestions" as const, label: "Suggestions", color: "#EE312E" },
                  { id: "research" as const, label: "Supporting Research", color: "#58a6ff" },
                  { id: "peers" as const, label: "Peer 10-K Insights", color: "#58a6ff" },
                ]).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setAdviceTab(tab.id)}
                    className={cn(
                      "px-4 py-2 text-[11px] font-medium transition-colors border-b-2 -mb-px",
                      adviceTab === tab.id
                        ? tab.id === "suggestions" ? "border-[#EE312E] text-[#f0f6fc] bg-[#EE312E]/10" : "border-[#58a6ff] text-[#58a6ff]"
                        : "border-transparent text-[#8b949e] hover:text-[#f0f6fc]"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
                {meta && (
                  <span className="ml-auto text-[10px] text-[#6e7681]">
                    {wordCount} words <span className={wordCount < meta.avgWordCount ? "text-[#d29922]" : "text-[#3fb950]"}>({wordCount < meta.avgWordCount ? `${meta.avgWordCount - wordCount} below` : "at"} avg)</span>
                  </span>
                )}
              </div>
              <div className="px-5 py-2.5 max-h-[130px] overflow-y-auto">
                {adviceTab === "suggestions" && meta && (
                  <ul className="space-y-1">
                    {meta.shortDraftSuggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[12px] text-[#c9d1d9]">
                        <span className="text-[#3fb950] mt-0.5">•</span><span>{s}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {adviceTab === "research" && meta && (
                  <div>
                    <p className="text-[11px] text-[#8b949e] mb-1.5">Other risk libraries highlighting {riskData?.label.toLowerCase()} risks also mention:</p>
                    <ul className="space-y-1">
                      {meta.riskLibraryMentions.map((m, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[12px] text-[#f0f6fc]">
                          <span className="text-[#58a6ff] mt-0.5">•</span><span className="font-medium">{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {adviceTab === "peers" && meta && (
                  <div>
                    <p className="text-[11px] text-[#8b949e] mb-1.5">{meta.peerInsights.count} of your peers mentioned similar risks in recent 10-Ks:</p>
                    <div className="space-y-1.5">
                      {meta.peerInsights.examples.map((ex, i) => (
                        <p key={i} className="text-[11px] text-[#c9d1d9] leading-relaxed italic border-l-2 border-[#30363d] pl-2">{ex}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt / chat */}
            <div className="shrink-0 border-t border-[#30363d] bg-[#0d1117]">
              {messages.length > 0 && (
                <div className="px-4 pt-2 max-h-[72px] overflow-y-auto space-y-1">
                  {messages.map((m) => (
                    <div key={m.id} className={cn("text-[11px] px-2 py-1 rounded", m.role === "user" ? "text-[#8b949e]" : "text-[#c9d1d9] bg-[#21262d]")}>
                      <span className="font-medium text-[#6e7681]">{m.role === "user" ? "You: " : "AI: "}</span>{m.content}
                    </div>
                  ))}
                  {isLoading && <div className="text-[11px] text-[#8b949e] flex items-center gap-1"><div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff] animate-pulse" /> Updating draft...</div>}
                  <div ref={messagesEndRef} />
                </div>
              )}
              <div className="px-4 pt-2 pb-1 flex flex-wrap gap-1">
                {PROMPT_SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => handleSuggestionClick(s)} className="rounded-full border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[10px] text-[#8b949e] hover:border-[#58a6ff]/50 hover:text-[#f0f6fc] transition-colors">{s}</button>
                ))}
              </div>
              <div className="flex gap-2 items-end px-4 pb-3 pt-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white flex-shrink-0 p-1"><DiligentAgentIcon /></div>
                <textarea ref={inputRef} value={promptInput} onChange={(e) => setPromptInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendPrompt())} placeholder="Ask AI to edit the disclosure..." rows={1} className="flex-1 bg-[#161b22] border border-[#30363d] rounded-lg px-3 py-2 text-[12px] text-[#f0f6fc] placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] resize-none" disabled={isLoading} />
                <button onClick={handleSendPrompt} disabled={!promptInput.trim() || isLoading} className={cn("rounded-lg px-4 py-2 text-[11px] font-semibold transition-colors shrink-0", promptInput.trim() && !isLoading ? "bg-[#58a6ff] text-white hover:bg-[#79c0ff]" : "bg-[#21262d] text-[#484f58] cursor-not-allowed")}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WriterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#58a6ff] border-t-transparent rounded-full animate-spin" /></div>}>
      <WriterContent />
    </Suspense>
  );
}

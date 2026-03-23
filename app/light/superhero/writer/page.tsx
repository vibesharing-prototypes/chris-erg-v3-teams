"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LeftRail } from "../LeftRail";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

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

const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

/** Metadata for right rail — away from work area, extra resources for GC */
const RISK_METADATA: Record<
  string,
  {
    avgWordCount: number;
    shortDraftSuggestions: string[];
    riskLibraryMentions: string[];
    peerInsights: { count: number; examples: string[] };
  }
> = {
  "risk-taiwan": {
    avgWordCount: 142,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or diversification plans.",
      "Consider adding the supplier diversification timeline (e.g., 12–18 month qualification).",
      "Consider mentioning board-level initiatives discussed in prior materials.",
    ],
    riskLibraryMentions: [
      "supplier diversification timeline",
      "geographic concentration percentage",
      "lead time / qualification period",
      "board-level initiatives",
    ],
    peerInsights: {
      count: 4,
      examples: [
        "TechCorp: \"Approximately 52% of our semiconductor procurement is sourced from Taiwan-based facilities.\"",
        "GlobalChip: \"We are evaluating alternative sourcing in Vietnam and Malaysia; qualification typically requires 12–18 months.\"",
        "MegaElectronics: \"Geopolitical tensions in the Taiwan Strait could materially disrupt our supply chain.\"",
      ],
    },
  },
  "risk-vendor": {
    avgWordCount: 128,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or incident response procedures.",
      "Consider adding vendor risk assessment or DPA coverage.",
      "Consider mentioning third-party concentration or reliance on key vendors.",
    ],
    riskLibraryMentions: [
      "third-party / vendor concentration",
      "incident response procedures",
      "DPA / data processing agreements",
      "vendor risk assessments",
    ],
    peerInsights: {
      count: 3,
      examples: [
        "SecureData Inc: \"A breach affecting our key cloud infrastructure vendor could disrupt operations across multiple business lines.\"",
        "CloudFirst: \"We maintain incident response procedures with critical vendors; however, vendor compliance cannot be guaranteed.\"",
      ],
    },
  },
  "risk-dma": {
    avgWordCount: 118,
    shortDraftSuggestions: [
      "Consider describing additional mitigations or compliance readiness.",
      "Consider adding EU revenue exposure or geographic breakdown.",
      "Consider mentioning EC enforcement actions or peer designation.",
    ],
    riskLibraryMentions: [
      "EU revenue exposure",
      "EC enforcement actions",
      "designation / gatekeeper status",
      "compliance costs",
    ],
    peerInsights: {
      count: 3,
      examples: [
        "EuroTech: \"The European Commission has designated three companies in our sector under the DMA; we are monitoring implications.\"",
        "GlobalPlatform: \"Approximately 28% of revenue is derived from EU operations; regulatory changes could materially impact our business model.\"",
      ],
    },
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

function WriterContent() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Defer URL params until after mount to avoid hydration mismatch (useSearchParams can differ on server vs client)
  useEffect(() => setMounted(true), []);

  const urlRiskId = mounted ? (searchParams?.get("risk") || "risk-taiwan") : "risk-taiwan";
  const ownerId = mounted ? (searchParams?.get("owner") || "diana-reyes") : "diana-reyes";
  const layout = mounted ? (searchParams?.get("layout") || "primary") : "primary"; // "primary" = prompt full width, "sidebar" = prompt in third column

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
  const [showPolicyManagerUpsell, setShowPolicyManagerUpsell] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Meta-Prototype-Info blue banner */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Risk Detection → 10K Update → Board Notification</span>
            <Link
              href={`/light/superhero/writer?risk=${activeRiskId}&owner=${ownerId}&layout=${layout === "sidebar" ? "primary" : "sidebar"}`}
              className="text-xs font-medium text-[#0369a1] hover:underline"
            >
              {layout === "sidebar" ? "View Cursor-style layout" : "View alternative layout"}
            </Link>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: General Counsel
          </span>
        </div>
      </div>

      {/* Main layout: Left rail + content */}
      <div className="flex-1 flex overflow-hidden min-h-0 min-w-0">
        {!focusMode && <LeftRail actorLabel="General Counsel" activeRiskId={riskId} />}

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Breadcrumb + risk tabs */}
          <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-6 py-2.5 flex items-center justify-between flex-shrink-0 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs text-[#6b7280]">
              <Link href="/light/superhero/coordinator" className="hover:text-[#111827]">Assign Owners</Link>
              <span>›</span>
              <Link href="/light/superhero/cro-review" className="hover:text-[#111827]">CRO Review</Link>
              <span>›</span>
              <span className="text-[#111827] font-medium">10-K Draft</span>
            </div>
            <div className="flex rounded-lg border border-[#e5e7eb] bg-white p-0.5">
              {RISK_IDS.map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveRiskId(id)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                    activeRiskId === id
                      ? "bg-[#3b82f6]/20 text-[#2563eb] border border-[#3b82f6]/30"
                      : "text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]"
                  )}
                >
                  {RISK_DISCLOSURE_DATA[id].label}
                </button>
              ))}
            </div>
          </div>

          {/* Split view content */}
          <div className="flex-1 flex overflow-hidden min-h-0">
            {layout === "primary" ? (
              /* Cursor-style: left working column (readable) + right editable document */
              <>
                {/* Left: Working column — prior year, gap, context, chat, prompt (contained) */}
                <div className="w-[420px] flex-shrink-0 flex flex-col border-r border-[#e5e7eb] bg-[#f9fafb] overflow-hidden">
                  <div className="flex-1 overflow-y-auto">
                    <div className="p-5 max-w-[380px] space-y-5">
                      {riskData && (
                        <>
                          <div>
                            <h2 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">
                              Prior year — language we&apos;re updating
                            </h2>
                            <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                              <div className="font-semibold text-[#111827] text-[13px] mb-1.5 leading-snug">{riskData.priorYearTitle}</div>
                              <p className="text-[13px] text-[#6b7280] leading-relaxed" style={{ lineHeight: 1.6 }}>{riskData.priorYearBody}</p>
                            </div>
                          </div>

                          <div>
                            <h2 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Disclosure gap</h2>
                            <div className="rounded-lg border border-[#d29922]/40 bg-[#d29922]/5 p-3">
                              <p className="text-[13px] text-[#111827] leading-relaxed" style={{ lineHeight: 1.6 }}>{riskData.gap}</p>
                            </div>
                          </div>
                        </>
                      )}

                      <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                        <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Context from workflow</h3>
                        <div className="text-[13px] text-[#6b7280] space-y-1 leading-relaxed">
                          <p><span className="text-[#111827]">Risk:</span> {croAssessment?.riskName || riskData?.priorYearTitle || "—"}</p>
                          <p><span className="text-[#111827]">Owner:</span> {croAssessment?.ownerName || "—"}</p>
                          {croAssessment?.likelihood && <p><span className="text-[#111827]">CRO likelihood:</span> {croAssessment.likelihood}</p>}
                          {croAssessment?.impact && <p><span className="text-[#111827]">CRO impact:</span> {croAssessment.impact}</p>}
                          {croAssessment?.controls && <p className="mt-1"><span className="text-[#111827]">Controls:</span> {croAssessment.controls.slice(0, 80)}...</p>}
                          {!croAssessment && <p className="text-[#9ca3af] italic">CRO assessment not yet available for this risk</p>}
                        </div>
                      </div>

                      {messages.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider">AI conversation</h3>
                          {messages.map((m) => (
                            <div
                              key={m.id}
                              className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}
                            >
                              {m.role === "user" ? (
                                <img src={GC_AVATAR_URL} alt="General Counsel" className="h-7 w-7 shrink-0 rounded-full object-cover" />
                              ) : (
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1">
                                  <DiligentAgentIcon />
                                </div>
                              )}
                              <div
                                className={cn(
                                  "flex-1 min-w-0 rounded-lg px-3 py-2 text-[13px] leading-relaxed",
                                  m.role === "user"
                                    ? "bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#111827]"
                                    : "bg-[#f3f4f6] border border-[#e5e7eb] text-[#374151]"
                                )}
                              >
                                <p className="font-medium text-[#6b7280] mb-0.5 text-[11px]">{m.role === "user" ? "You" : "Diligent AI"}</p>
                                <p>{m.content}</p>
                              </div>
                            </div>
                          ))}
                          {isLoading && (
                            <div className="flex items-center gap-2 text-[13px] text-[#6b7280]">
                              <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                              AI is updating the draft...
                            </div>
                          )}
                          <div ref={messagesEndRef} />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contained prompt box — not full width, Cursor-style */}
                  <div className="flex-shrink-0 p-4 border-t border-[#e5e7eb] bg-white">
                    <div className="max-w-[380px] space-y-2">
                      <div className="flex flex-wrap gap-1.5">
                        {PROMPT_SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSuggestionClick(s)}
                            className="rounded-md border border-[#e5e7eb] bg-[#f3f4f6] px-2 py-1 text-[11px] text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-2.5 shadow-sm">
                        <div className="flex gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white flex-shrink-0 p-1">
                            <DiligentAgentIcon />
                          </div>
                          <textarea
                            ref={inputRef}
                            value={promptInput}
                            onChange={(e) => setPromptInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendPrompt())}
                            placeholder="Ask AI to add or change disclosure language..."
                            rows={2}
                            className="flex-1 bg-transparent text-[13px] text-[#111827] placeholder-[#9ca3af] focus:outline-none resize-none leading-relaxed"
                            disabled={isLoading}
                          />
                        </div>
                        <button
                          onClick={handleSendPrompt}
                          disabled={!promptInput.trim() || isLoading}
                          className={cn(
                            "mt-2 w-full rounded-lg py-2 text-[12px] font-medium transition-colors",
                            promptInput.trim() && !isLoading
                              ? "bg-[#3b82f6] text-white hover:bg-[#79c0ff]"
                              : "bg-[#f3f4f6] text-[#d1d5db] cursor-not-allowed"
                          )}
                        >
                          Apply changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center: Editable document — prominent, like Cursor editor */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
                  <div className="flex-shrink-0 px-6 py-3 border-b border-[#e5e7eb] bg-[#f9fafb] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider">10-K Draft — Item 1A</span>
                      <span className="ml-2 rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30 px-2 py-0.5 text-[10px] text-[#16a34a] font-medium">EDITABLE</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setFocusMode(!focusMode)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                          focusMode
                            ? "border-[#3b82f6]/50 bg-[#3b82f6]/20 text-[#2563eb]"
                            : "border-[#e5e7eb] bg-[#f3f4f6] text-[#6b7280] hover:border-[#6e7681] hover:text-[#111827]"
                        )}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {focusMode ? "Exit Focus mode" : "Enter Focus mode"}
                      </button>
                      <Link
                        href="/light/superhero/gc-review/notification"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#3fb950] px-4 py-2 text-sm font-medium text-[#0d1117] hover:bg-[#46c35a] transition-colors"
                      >
                        Submit draft
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="max-w-3xl mx-auto">
                      <input
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        className="w-full bg-transparent text-lg font-semibold text-[#111827] mb-4 focus:outline-none placeholder-[#9ca3af] leading-tight"
                        placeholder="Risk factor title..."
                      />
                      <textarea
                        value={draftBody}
                        onChange={(e) => setDraftBody(e.target.value)}
                        rows={16}
                        className="w-full bg-transparent text-[15px] text-[#111827] placeholder-[#9ca3af] focus:outline-none resize-none leading-relaxed"
                        placeholder="Draft disclosure text..."
                        style={{ lineHeight: 1.7 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Right rail: Metadata & resources — away from work area (hidden in focus mode) */}
                {!focusMode && riskData && RISK_METADATA[riskId] && (
                  <div className="w-[300px] flex-shrink-0 flex flex-col border-l border-[#e5e7eb] bg-[#f9fafb] overflow-y-auto">
                    <div className="p-4 border-b border-[#e5e7eb]">
                      <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Resources</h3>
                    </div>
                    <div className="p-4 space-y-4">
                      {/* Word count */}
                      {(() => {
                        const wordCount = (draftTitle + " " + draftBody).trim().split(/\s+/).filter(Boolean).length;
                        const meta = RISK_METADATA[riskId];
                        const diff = meta.avgWordCount - wordCount;
                        return (
                          <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                            <h4 className="text-[11px] font-medium text-[#6b7280] mb-2">Word count</h4>
                            <p className="text-[13px] text-[#111827] leading-relaxed">
                              Your average risk disclosure: <span className="font-medium">{meta.avgWordCount} words</span>.
                              {diff > 0 ? (
                                <>
                                  <span className="block mt-1 text-[#ca8a04]">This draft: {wordCount} words.</span>
                                  <span className="block mt-2 text-[#6b7280] text-[12px]">Suggestions:</span>
                                  <ul className="mt-1 space-y-1 text-[12px] text-[#374151]">
                                    {meta.shortDraftSuggestions.map((s, i) => (
                                      <li key={i} className="flex items-start gap-1.5">
                                        <span className="text-[#16a34a] mt-0.5">•</span>
                                        <span>{s}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              ) : (
                                <span className="block mt-1 text-[#16a34a]">This draft: {wordCount} words.</span>
                              )}
                            </p>
                          </div>
                        );
                      })()}

                      {/* Risk library mentions */}
                      <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                        <h4 className="text-[11px] font-medium text-[#6b7280] mb-2">Risk libraries also mention</h4>
                        <p className="text-[13px] text-[#6b7280] mb-2">
                          Other risk libraries highlighting {riskData.label.toLowerCase()} risks also mention:
                        </p>
                        <ul className="space-y-1 text-[13px] text-[#111827]">
                          {RISK_METADATA[riskId].riskLibraryMentions.map((m, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#2563eb] mt-0.5">•</span>
                              <span>{m}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Peer 10-K insights */}
                      <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                        <h4 className="text-[11px] font-medium text-[#6b7280] mb-2">Peer 10-K insights</h4>
                        <p className="text-[13px] text-[#6b7280] mb-2">
                          {RISK_METADATA[riskId].peerInsights.count} of your peers mentioned similar risks in recent 10-Ks:
                        </p>
                        <div className="space-y-2">
                          {RISK_METADATA[riskId].peerInsights.examples.map((ex, i) => (
                            <p key={i} className="text-[12px] text-[#374151] leading-relaxed italic border-l-2 border-[#e5e7eb] pl-2">
                              {ex}
                            </p>
                          ))}
                        </div>
                      </div>

                      {/* In-situ: Policy upload for Vietnam-affiliated third parties → Policy Manager upsell */}
                      {riskId === "risk-taiwan" && (
                        <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                          <h4 className="text-[11px] font-medium text-[#6b7280] mb-2">Supporting policy</h4>
                          <p className="text-[13px] text-[#6b7280] mb-3">
                            Attach policy for Vietnam-affiliated third parties to support the disclosure.
                          </p>
                          <div className="space-y-2">
                            <button
                              onClick={() => setShowPolicyManagerUpsell(true)}
                              className="flex w-full items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2.5 text-left text-sm text-[#111827] hover:border-[#3b82f6]/50 hover:bg-[#f3f4f6]/80 transition-colors"
                            >
                              <span className="text-lg">📄</span>
                              <span>Upload from desktop</span>
                              <span className="ml-auto text-[10px] text-[#9ca3af]">.doc, .docx</span>
                            </button>
                            <button
                              onClick={() => setShowPolicyManagerUpsell(true)}
                              className="flex w-full items-center gap-3 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2.5 text-left text-sm text-[#111827] hover:border-[#3b82f6]/50 hover:bg-[#f3f4f6]/80 transition-colors"
                            >
                              <span className="text-lg">📁</span>
                              <span>Browse SharePoint</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Alternative layout: prompt in third column */
              <>
                <div className="flex-1 overflow-y-auto border-r border-[#e5e7eb]">
                  <div className="p-6 space-y-6">
                    {/* Risk tabs for sidebar layout */}
                    <div className="flex rounded-lg border border-[#e5e7eb] bg-white p-0.5">
                      {RISK_IDS.map((id) => (
                        <button
                          key={id}
                          onClick={() => setActiveRiskId(id)}
                          className={cn(
                            "flex-1 rounded-md px-2 py-1.5 text-xs font-medium transition-colors",
                            activeRiskId === id
                              ? "bg-[#3b82f6]/20 text-[#2563eb] border border-[#3b82f6]/30"
                              : "text-[#6b7280] hover:text-[#111827] hover:bg-[#f3f4f6]"
                          )}
                        >
                          {RISK_DISCLOSURE_DATA[id].label}
                        </button>
                      ))}
                    </div>

                    {riskData && (
                      <>
                        <div>
                          <h2 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Prior year — language we&apos;re updating</h2>
                          <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 max-h-32 overflow-y-auto">
                            <div className="font-semibold text-[#111827] text-sm mb-2">{riskData.priorYearTitle}</div>
                            <p className="text-xs text-[#6b7280] leading-relaxed">{riskData.priorYearBody}</p>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Disclosure gap</h2>
                          <div className="rounded-xl border border-[#d29922]/40 bg-[#d29922]/5 p-3">
                            <p className="text-xs text-[#111827] leading-relaxed">{riskData.gap}</p>
                          </div>
                        </div>
                      </>
                    )}

                    <div>
                      <h2 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-3 flex items-center gap-2">
                        Draft — New/updated disclosure
                        <span className="rounded-full bg-[#3fb950]/10 border border-[#3fb950]/30 px-1.5 py-0 text-[9px] text-[#16a34a] font-medium">EDITABLE</span>
                      </h2>
                      <div className="rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/5 p-4">
                        <input
                          value={draftTitle}
                          onChange={(e) => setDraftTitle(e.target.value)}
                          className="w-full bg-transparent text-sm font-semibold text-[#111827] mb-3 focus:outline-none placeholder-[#9ca3af]"
                          placeholder="Risk factor title..."
                        />
                        <textarea
                          value={draftBody}
                          onChange={(e) => setDraftBody(e.target.value)}
                          rows={8}
                          className="w-full rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2 text-sm text-[#111827] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none resize-none"
                          placeholder="Draft disclosure text..."
                        />
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          onClick={() => setFocusMode(!focusMode)}
                          className={cn(
                            "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                            focusMode
                              ? "border-[#3b82f6]/50 bg-[#3b82f6]/20 text-[#2563eb]"
                              : "border-[#e5e7eb] bg-[#f3f4f6] text-[#6b7280] hover:border-[#6e7681] hover:text-[#111827]"
                          )}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          {focusMode ? "Exit Focus mode" : "Enter Focus mode"}
                        </button>
                        <Link
                          href="/light/superhero/gc-review/notification"
                          className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#3fb950] px-4 py-2 text-sm font-medium text-[#0d1117] hover:bg-[#46c35a] transition-colors"
                        >
                          Submit draft
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {!focusMode && (
                <div className="w-[380px] flex-shrink-0 flex flex-col border-l border-[#e5e7eb] bg-[#f9fafb]">
                  <div className="p-4 border-b border-[#e5e7eb]">
                    <h3 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Context from workflow</h3>
                    <div className="text-xs text-[#6b7280] space-y-1">
                      <p><span className="text-[#111827]">Risk:</span> {croAssessment?.riskName || "Taiwan Strait Geopolitical Tensions"}</p>
                      <p><span className="text-[#111827]">Owner:</span> {croAssessment?.ownerName || "Diana Reyes"}</p>
                      {croAssessment?.likelihood && <p><span className="text-[#111827]">CRO likelihood:</span> {croAssessment.likelihood}</p>}
                      {croAssessment?.impact && <p><span className="text-[#111827]">CRO impact:</span> {croAssessment.impact}</p>}
                      {croAssessment?.controls && <p className="mt-1"><span className="text-[#111827]">Controls:</span> {croAssessment.controls.slice(0, 80)}...</p>}
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4">
                    <h3 className="text-xs font-medium text-[#9ca3af] uppercase tracking-wider mb-2">Work with AI</h3>
                    <p className="text-xs text-[#6b7280] mb-3">
                      Edit the draft directly or prompt AI to suggest changes.
                    </p>

                    {messages.length > 0 && (
                      <div className="space-y-3 mb-4">
                        {messages.map((m) => (
                          <div
                            key={m.id}
                            className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}
                          >
                            {m.role === "user" ? (
                              <img src={GC_AVATAR_URL} alt="General Counsel" className="h-7 w-7 shrink-0 rounded-full object-cover" />
                            ) : (
                              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white p-1">
                                <DiligentAgentIcon />
                              </div>
                            )}
                            <div
                              className={cn(
                                "flex-1 min-w-0 rounded-lg px-3 py-2 text-xs",
                                m.role === "user"
                                  ? "bg-[#3b82f6]/10 border border-[#3b82f6]/20 text-[#111827]"
                                  : "bg-[#f3f4f6] border border-[#e5e7eb] text-[#374151]"
                              )}
                            >
                              <p className="font-medium text-[#6b7280] mb-0.5">{m.role === "user" ? "You" : "Diligent AI"}</p>
                              <p className="leading-relaxed">{m.content}</p>
                            </div>
                          </div>
                        ))}
                        {isLoading && (
                          <div className="flex items-center gap-2 text-xs text-[#6b7280]">
                            <div className="h-1.5 w-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
                            AI is updating the draft...
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[10px] text-[#9ca3af]">Try:</span>
                      {PROMPT_SUGGESTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => handleSuggestionClick(s)}
                          className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2.5 py-1 text-[10px] text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-xl border border-[#e5e7eb] bg-white p-2">
                      <div className="flex gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white flex-shrink-0 p-1">
                          <DiligentAgentIcon />
                        </div>
                        <textarea
                          ref={inputRef}
                          value={promptInput}
                          onChange={(e) => setPromptInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSendPrompt())}
                          placeholder="Ask AI to add or change disclosure language..."
                          rows={2}
                          className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none resize-none"
                          disabled={isLoading}
                        />
                      </div>
                      <button
                        onClick={handleSendPrompt}
                        disabled={!promptInput.trim() || isLoading}
                        className={cn(
                          "mt-2 w-full rounded-lg py-2 text-xs font-medium transition-colors",
                          promptInput.trim() && !isLoading
                            ? "bg-[#3b82f6] text-white hover:bg-[#79c0ff]"
                            : "bg-[#f3f4f6] text-[#d1d5db] cursor-not-allowed"
                        )}
                      >
                        Apply changes
                      </button>
                    </div>
                  </div>
                </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <StakeholderFooter label="Continue as General Counsel to advance the workflow">
        <PrototypeControlLink href="/light/superhero/gc-review-feedback">
          Continue to GC review →
        </PrototypeControlLink>
      </StakeholderFooter>

      {/* In-situ Policy Manager upsell — appears when GC tries to upload policy for Vietnam third parties */}
      {showPolicyManagerUpsell && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowPolicyManagerUpsell(false)}>
          <div
            className="max-w-md rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3b82f6]/20">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Try Policy Manager</h3>
                <p className="text-xs text-[#6b7280]">Instead of static uploads</p>
              </div>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed mb-5">
              Before you upload a Word doc or browse SharePoint—consider Policy Manager. Automate drafting, approval chains, attestation, and version control instead of managing static files.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPolicyManagerUpsell(false)}
                className="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2.5 text-sm font-medium text-[#6b7280] hover:border-[#6e7681] hover:text-[#111827] transition-colors"
              >
                Continue with upload
              </button>
              <button
                onClick={() => setShowPolicyManagerUpsell(false)}
                className="flex-1 rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#79c0ff] transition-colors"
              >
                Try Policy Manager
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WriterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" /></div>}>
      <WriterContent />
    </Suspense>
  );
}

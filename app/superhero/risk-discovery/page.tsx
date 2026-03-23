"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";
import ReturnToChat from "@/app/components/ReturnToChat";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RiskCard {
  id: string;
  title: string;
  source: string;
  category: string;
  severity: "Critical" | "High" | "Medium";
  description: string;
  isNew: boolean;
  aiGenerated: boolean;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const RISKS: RiskCard[] = [
  {
    id: "taiwan",
    title: "Taiwan Strait Geopolitical Tensions — Semiconductor Supply Chain Disruption",
    source: "Reuters, TSMC filings, defense intelligence",
    category: "Supply Chain Disruption",
    severity: "Critical",
    description:
      "Escalating military posturing in the Taiwan Strait creates material risk to semiconductor supply chains. Approximately 47% of critical chip suppliers operate in Taiwan. Disruption could impact $1.8B in annual product revenue across two major product lines.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "vendor",
    title: "Critical Vendor Cybersecurity Breach — CloudSecure Inc. Ransomware Incident",
    source: "CloudSecure Inc. disclosure, internal vendor monitoring",
    category: "Cybersecurity / Data Privacy",
    severity: "High",
    description:
      "CloudSecure Inc. (primary data processing vendor) disclosed a ransomware incident affecting customer data pipelines. They process customer PII under 3 of our data processing agreements. Elevated per CRO assessment; added to Top 5 risk register.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "eu-dma",
    title: "EU Digital Markets Act Enforcement Pattern — Regulatory Compliance Exposure",
    source: "EC enforcement filings, peer 10-K analysis",
    category: "Regulatory Compliance",
    severity: "High",
    description:
      "EC initiated enforcement actions against 3 companies in our sector for DMA non-compliance. Pattern analysis suggests our EU operations may face similar scrutiny. Potential fines up to 10% of global turnover.",
    isNew: true,
    aiGenerated: true,
  },
  {
    id: "ai-reg",
    title: "AI Regulatory Compliance — EU AI Act Implementation Uncertainty",
    source: "EU regulatory filings, peer disclosures",
    category: "Technology Regulation",
    severity: "Medium",
    description:
      "EU AI Act enforcement timeline creates uncertainty for AI product launches. Compliance assessment is incomplete. Peer companies have begun disclosing AI regulatory risk in 10-K filings.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "climate",
    title: "SEC Climate Disclosure Requirements — Reporting Readiness Gap",
    source: "SEC rule filings, internal readiness audit",
    category: "ESG / Reporting",
    severity: "Medium",
    description:
      "New SEC climate disclosure rules require Scope 1 and 2 emissions reporting. Internal audit identified gaps in data collection and assurance processes. Compliance deadline within 18 months.",
    isNew: false,
    aiGenerated: true,
  },
  {
    id: "rates",
    title: "Interest Rate Sensitivity — Refinancing Exposure in Current Rate Environment",
    source: "Fed minutes, internal treasury analysis",
    category: "Financial Risk",
    severity: "Medium",
    description:
      "Current rate environment increases refinancing costs for $2.3B in maturing debt instruments. Treasury analysis indicates 40bps spread widening may impact capital allocation strategy.",
    isNew: false,
    aiGenerated: false,
  },
];

const SEVERITY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  Critical: { text: "#f87171", bg: "#450a0a", border: "#7f1d1d" },
  High: { text: "#fbbf24", bg: "#422006", border: "#92400e" },
  Medium: { text: "#60a5fa", bg: "#1e3a5f", border: "#1e40af" },
};

/* ------------------------------------------------------------------ */
/*  Diligent Logo                                                      */
/* ------------------------------------------------------------------ */

function DiligentLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 222 222" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z" />
      <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z" />
      <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Left Icon Sidebar                                                  */
/* ------------------------------------------------------------------ */

function IconSidebar() {
  const icons = [
    { id: "home", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> },
    { id: "grc", active: true, el: <span className="text-[11px] font-extrabold">G</span> },
    { id: "chart", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" /></svg> },
    { id: "board", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg> },
    { id: "chat", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg> },
    { id: "help", active: false, el: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> },
  ];

  return (
    <div className="w-12 bg-[#0d0d1a] flex flex-col items-center py-3 gap-1 flex-shrink-0 border-r border-[#21262d]">
      <button className="h-9 w-9 flex items-center justify-center text-[#6e7681] hover:text-[#c9d1d9] rounded-lg hover:bg-white/5">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
      </button>
      <div className="h-9 w-9 flex items-center justify-center my-1">
        <DiligentLogo size={20} />
      </div>
      <div className="w-6 h-px bg-white/10 my-1" />
      {icons.map((ic) => (
        <button
          key={ic.id}
          className={`h-9 w-9 flex items-center justify-center rounded-lg transition-colors ${
            ic.active ? "bg-[#ef4444] text-white" : "text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5"
          }`}
        >
          {ic.el}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  AI Sparkle Icon                                                    */
/* ------------------------------------------------------------------ */

function AISparkle({ size = 16, color = "#6e7681" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk Card Component (Dark)                                         */
/* ------------------------------------------------------------------ */

function RiskCardItem({ risk }: { risk: RiskCard }) {
  const sc = SEVERITY_COLORS[risk.severity];
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col hover:border-[#484f58] transition-colors relative">
      <div className="flex items-center justify-between mb-3">
        <div className="relative">
          {risk.aiGenerated && (
            <button
              onMouseEnter={() => setTooltipOpen(true)}
              onMouseLeave={() => setTooltipOpen(false)}
              className="flex items-center justify-center"
            >
              <AISparkle size={18} color="#6e7681" />
            </button>
          )}
          {tooltipOpen && (
            <div className="absolute left-0 bottom-full mb-2 z-10 w-48 rounded-lg bg-[#30363d] text-[#c9d1d9] text-[11px] px-3 py-2 shadow-lg border border-[#484f58]">
              This result was created with the help of AI.
              <div className="absolute left-4 top-full w-2 h-2 bg-[#30363d] transform rotate-45 -translate-y-1" />
            </div>
          )}
        </div>
        <span
          className="inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold border"
          style={{ color: sc.text, background: sc.bg, borderColor: sc.border }}
        >
          {risk.category}
        </span>
      </div>

      {risk.isNew && (
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex rounded-full bg-[#ef4444] text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            New
          </span>
          <span
            className="inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border"
            style={{ color: sc.text, background: sc.bg, borderColor: sc.border }}
          >
            {risk.severity}
          </span>
        </div>
      )}

      <h3 className="text-sm font-semibold text-[#58a6ff] leading-snug mb-1 hover:underline cursor-pointer">
        {risk.title}
      </h3>

      <p className="text-[11px] text-[#6e7681] mb-2">{risk.source}</p>

      <p className="text-[12px] text-[#8b949e] leading-relaxed flex-1 mb-4">
        {risk.description.length > 220 ? risk.description.slice(0, 220) + "..." : risk.description}
      </p>

      <div className="flex items-center gap-3 pt-3 border-t border-[#21262d]">
        <button className="flex items-center gap-1.5 text-[12px] text-[#c9d1d9] font-medium hover:text-[#f0f6fc] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
          Edit details
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-[#c9d1d9] font-medium hover:text-[#f0f6fc] transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          Quick add
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskDiscoveryPage() {
  const [filter, setFilter] = useState<"all" | "new">("all");
  const [toasterVisible, setToasterVisible] = useState(true);
  const router = useRouter();
  const displayed = filter === "new" ? RISKS.filter((r) => r.isNew) : RISKS;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col relative">
      <ReturnToChat />
      {/* Toaster notification */}
      {toasterVisible && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
          <div
            role="button"
            tabIndex={0}
            onClick={() => router.push("/superhero/cro-review?risk=risk-taiwan&owner=diana-reyes")}
            onKeyDown={(e) => { if (e.key === "Enter") router.push("/superhero/cro-review?risk=risk-taiwan&owner=diana-reyes"); }}
            className="flex items-start gap-3 w-[380px] rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3.5 shadow-lg hover:shadow-xl hover:border-[#58a6ff]/40 transition-all text-left group cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3fb950]/10 flex-shrink-0 mt-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#f0f6fc] mb-0.5 group-hover:text-[#58a6ff] transition-colors">Interview submitted</p>
              <p className="text-xs text-[#8b949e] leading-relaxed">Diana Reyes has completed her risk owner interview regarding <span className="font-medium text-[#c9d1d9]">Taiwan Strait Geopolitical Tensions</span>. Ready for intake processing.</p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setToasterVisible(false); }}
              className="text-[#484f58] hover:text-[#8b949e] flex-shrink-0 mt-0.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <IconSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top nav bar */}
          <div className="h-12 bg-[#161b22] border-b border-[#21262d] flex items-center justify-between px-4 flex-shrink-0">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
              <span className="text-sm font-medium text-[#c9d1d9]">Acme Co.</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>
            <button className="h-8 w-8 rounded-full bg-[#21262d] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 px-8 py-6 overflow-y-auto">
            <div className="max-w-[1280px] mx-auto">
            <div className="flex items-center gap-2 text-[12px] text-[#6e7681] mb-4">
              <span className="text-[#c9d1d9]">AI Risk Essentials</span>
              <span>›</span>
              <span>Risk Identification</span>
            </div>

            {/* Page nav */}
            <div className="flex items-center gap-1 mb-6 border-b border-[#21262d] pb-3">
              <span className="rounded-lg px-3 py-1.5 text-[11px] font-medium bg-white/10 text-[#f0f6fc] border border-white/10">
                Risk Essentials
              </span>
              <div className="w-px h-4 bg-[#21262d] mx-1" />
              <Link href="/superhero/risk-analysis" className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                AI Risk Simulator
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-[#f0f6fc]">AI risk discovery</h1>
            </div>
            <p className="text-sm text-[#8b949e] mb-6">
              Risks identified from company filings, news, and regulatory sources that may require disclosure review.
            </p>

            {/* Stats banner */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 mb-8">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-sm font-bold text-[#f0f6fc]">Risks identified</h2>
              </div>
              <p className="text-[12px] text-[#6e7681] mb-4">
                Source information from 10-K reports, regulatory filings, and real-time news intelligence
              </p>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-[11px] text-[#484f58] font-medium mb-0.5">Discovered risks</div>
                  <div className="text-lg font-bold text-[#f0f6fc]">41,200 risks</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#484f58] font-medium mb-0.5">Companies</div>
                  <div className="text-lg font-bold text-[#f0f6fc]">1,180 companies</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#484f58] font-medium mb-0.5">Industries</div>
                  <div className="text-lg font-bold text-[#f0f6fc]">64</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#484f58] font-medium mb-0.5">Data last updated</div>
                  <div className="text-lg font-bold text-[#f0f6fc]">18 Feb 2026</div>
                </div>
              </div>
            </div>

            {/* AI Risk Impact Simulator promo banner */}
            <div className="rounded-lg border border-[#1f6feb]/20 bg-gradient-to-r from-[#1f6feb]/5 via-[#161b22] to-[#a371f7]/5 px-4 py-3 mb-6 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1f6feb] to-[#a371f7] flex-shrink-0">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] text-[#c9d1d9]">
                  <span className="font-semibold text-[#f0f6fc]">Try the AI Risk Impact Simulator</span>
                  <span className="mx-1.5 text-[#30363d]">·</span>
                  Evaluate how Taiwan Strait risk cascades across your enterprise with one complimentary simulation. See gravity maps, shockwave propagation, and full pipeline traceability.
                </p>
              </div>
              <Link
                href="/superhero/risk-analysis"
                className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#1f6feb] to-[#a371f7] px-3.5 py-1.5 text-[11px] font-semibold text-white hover:opacity-90 transition-opacity flex-shrink-0 whitespace-nowrap"
              >
                Launch Simulator
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            {/* Risk suggestions header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-[#f0f6fc]">
                Risk suggestions <span className="text-[#6e7681] font-normal">({displayed.length})</span>
              </h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  <input
                    type="text"
                    placeholder="Search risks..."
                    className="h-9 w-56 rounded-lg border border-[#30363d] bg-[#0d1117] pl-9 pr-3 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#58a6ff]/20 focus:border-[#58a6ff]"
                  />
                </div>
                <div className="flex items-center rounded-lg border border-[#30363d] overflow-hidden">
                  <button
                    onClick={() => setFilter("all")}
                    className={`h-9 px-3 text-[12px] font-medium transition-colors ${
                      filter === "all" ? "bg-[#f0f6fc] text-[#0d1117]" : "bg-[#161b22] text-[#c9d1d9] hover:bg-[#21262d]"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter("new")}
                    className={`h-9 px-3 text-[12px] font-medium transition-colors border-l border-[#30363d] ${
                      filter === "new" ? "bg-[#f0f6fc] text-[#0d1117]" : "bg-[#161b22] text-[#c9d1d9] hover:bg-[#21262d]"
                    }`}
                  >
                    New
                    <span className="ml-1 inline-flex items-center justify-center rounded-full bg-[#ef4444] text-white text-[9px] font-bold h-4 w-4">
                      3
                    </span>
                  </button>
                </div>
                <button className="flex items-center gap-1.5 h-9 rounded-lg border border-[#30363d] bg-[#161b22] px-3 text-[12px] font-medium text-[#c9d1d9] hover:bg-[#21262d]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg>
                  Filter
                  <span className="inline-flex items-center justify-center rounded-full bg-[#30363d] text-[#c9d1d9] text-[9px] font-bold h-4 w-4">3</span>
                </button>
              </div>
            </div>

            {/* Risk card grid */}
            <div className="grid grid-cols-3 gap-5 mb-8">
              {displayed.map((risk) => (
                <RiskCardItem key={risk.id} risk={risk} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-[12px] text-[#6e7681] pb-6">
              <span>1–{displayed.length} of {displayed.length}</span>
              <div className="flex items-center gap-1">
                <button className="h-8 w-8 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#484f58]" disabled>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button className="h-8 w-8 rounded-lg bg-[#f0f6fc] text-[#0d1117] flex items-center justify-center text-[12px] font-bold">1</button>
                <button className="h-8 w-8 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#c9d1d9] hover:bg-[#21262d] text-[12px]">2</button>
                <button className="h-8 w-8 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#c9d1d9] hover:bg-[#21262d] text-[12px]">3</button>
                <span className="px-1 text-[#484f58]">…</span>
                <button className="h-8 w-8 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#c9d1d9] hover:bg-[#21262d] text-[12px]">23</button>
                <button className="h-8 w-8 rounded-lg border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#c9d1d9] hover:bg-[#21262d]">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — AI Risk Discovery">
        <PrototypeControlLink href="/superhero/risk-discovery-dark">
          View in Light Mode →
        </PrototypeControlLink>
        <PrototypeControlLink href="/superhero/reviewer">
          Continue to Review Sources →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

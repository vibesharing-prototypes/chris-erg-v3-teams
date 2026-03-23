"use client";

import React, { useState } from "react";
import Link from "next/link";

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

function Card({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-5 shadow-sm", className)}>{children}</div>
  );
}

const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

const RISKS = [
  { id: "risk-taiwan", label: "Taiwan Strait Geopolitical Tensions", severity: "critical" as const, owner: "diana-reyes" },
  { id: "risk-vendor", label: "Critical Vendor Cybersecurity Breach", severity: "high" as const, owner: "marcus-webb" },
  { id: "risk-dma", label: "EU Digital Markets Act Enforcement", severity: "high" as const, owner: "james-park" },
];

const WORKFLOW_STAGES = [
  { id: "detect", label: "Risk Detected", status: "completed" as const },
  { id: "assign", label: "Assign", status: "completed" as const },
  { id: "draft", label: "Draft Updates", status: "completed" as const },
  { id: "review", label: "Legal Review", status: "current" as const },
  { id: "notify", label: "Notify Board", status: "pending" as const },
  { id: "file", label: "File/Disclose", status: "pending" as const },
];

const AGENTS = [
  { name: "Risk Intelligence", lastRun: "8 minutes ago", nextRun: "in 7 minutes" },
  { name: "Regulatory Watch", lastRun: "15 minutes ago", nextRun: "in 15 minutes" },
  { name: "Vendor Intelligence", lastRun: "32 minutes ago", nextRun: "in 28 minutes" },
  { name: "Board Materials Monitor", lastRun: "1 hour ago", nextRun: "in 30 minutes" },
  { name: "10K Disclosure Tracker", lastRun: "2 hours ago", nextRun: "in 1 hour" },
];

const ACTIVITY_LOG = [
  "🚨 Risk Intelligence: 3 emerging risks in legal review (8:47 AM)",
  "📋 GC Review Feedback: Team suggestions from Diana, Rachel, Davis Polk ready",
  "📊 10K Disclosure Tracker: Drafts submitted for GC finalization",
  "📝 Board Materials Monitor: Risk briefing slot reserved for Feb 28",
];

const RECENT_APPS = [
  { name: "Boards", description: "Finalized Q1 board meeting agenda and uploaded supporting materials.", lastUsed: "Jan 16" },
  { name: "Entities", description: "Verified annual report filings for 3 subsidiaries; all jurisdictions current.", lastUsed: "Jan 15" },
  { name: "Policy Manager", description: "Reviewed attestation status for updated Code of Conduct; 94% completion.", lastUsed: "Jan 14" },
];

export default function GcPostReviewPage() {
  const [activityOpen, setActivityOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pb-28">
      {/* PrototypeNav — same structure as gc-commandcenter */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe]">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="w-full border-b border-[#0ea5e9]/20 bg-[#e0f2fe]">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
              <span className="text-sm font-semibold text-[#0c4a6e]">GC post-review — work in progress</span>
              <span className="rounded-full border border-[#dc2626]/50 bg-[#fecaca] px-2 py-0.5 text-[10px] font-medium text-[#b91c1c]">Scenario</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/light/gc-commandcenter" className="text-xs text-[#0369a1] hover:underline">
                ← Step 1 (initial state)
              </Link>
              <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
                Viewing as: General Counsel
              </span>
            </div>
          </div>
        </div>
        <div className="w-full border-b border-[#0ea5e9]/20 bg-[#e0f2fe]">
          <div className="mx-auto max-w-7xl px-4 py-3">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fecaca]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-[#0c4a6e]">
                  <span className="font-medium text-[#075985]">Scenario:</span> Disclosure drafts are in legal review. The GC reviews team feedback, finalizes the 10-K updates, and routes to the CEO for approval before outside counsel and audit committee sign-off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] px-4 py-2">
        <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">
          ↓ Prototype starts below (Diligent logo & GRC Command Center)
        </p>
      </div>

      {/* Dashboard — same structure as gc-commandcenter */}
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
      <div className="rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] shadow-sm overflow-hidden">
        <div className="px-6">
          {/* TopNav — gc-commandcenter style with GC avatar */}
          <div className="sticky top-0 z-10 -mx-6 mb-8 border-b border-[#e5e7eb] bg-white/90 px-6 py-4 backdrop-blur">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DiligentLogo className="h-7 w-auto" />
                  <span className="text-sm font-semibold text-[#111827]">GRC Command Center</span>
                </div>
                <span className="rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-2 py-0.5 text-[10px] font-medium text-[#2563eb]">
                  General Counsel
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActivityOpen(!activityOpen)}
                  className={cn(
                    "inline-flex h-10 items-center gap-2 rounded-xl border bg-[#f9fafb] px-3 text-sm text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]",
                    activityOpen ? "border-[#3b82f6]" : "border-[#e5e7eb]"
                  )}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6h12M9 12h12M9 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                  <span className="font-medium">Recent activity</span>
                  <span className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-xs text-[#6b7280]">({ACTIVITY_LOG.length})</span>
                </button>
                <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]" aria-label="Notifications">
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-[#da3633] ring-2 ring-white" />
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8a6 6 0 10-12 0c0 7-3 7-3 7h18s-3 0-3-7" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-[#f9fafb] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]" aria-label="More">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2" />
                    <circle cx="12" cy="12" r="2" />
                    <circle cx="12" cy="19" r="2" />
                  </svg>
                </button>
                <img src={GC_AVATAR_URL} alt="General Counsel" className="h-10 w-10 rounded-full object-cover" />
              </div>
            </div>
          </div>

          {activityOpen && (
            <div className="-mt-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9ca3af]">Recent activity</p>
                  <button className="rounded-lg border border-[#e5e7eb] bg-[#f9fafb] px-2 py-1 text-xs text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]" onClick={() => setActivityOpen(false)}>Close</button>
                </div>
                <div className="mt-3 space-y-2">
                  {ACTIVITY_LOG.map((entry) => (
                    <div key={entry} className="flex items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-2">
                      <div className="mt-1 h-2 w-2 rounded-full bg-[#3fb950]" />
                      <p className="text-sm text-[#6b7280]">{entry}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Hero — same style as gc-commandcenter but "3 risks pending approval" */}
          <header className="rounded-3xl border border-[#3b82f6]/40 bg-gradient-to-br from-[#58a6ff]/10 to-white p-10 shadow-sm">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/50 bg-[#3b82f6]/20 px-4 py-1.5 text-sm font-medium text-[#2563eb]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                </span>
                Disclosure in Legal Review
              </span>
            </div>
            <h1 className="text-center text-4xl font-semibold tracking-tight text-[#111827]">
              3 risks pending approval
            </h1>
            <p className="mt-4 text-center text-sm text-[#6b7280] max-w-2xl mx-auto">
              Disclosure drafts are in legal review. Review team feedback, finalize, and route to CEO for approval.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <div className="rounded-xl border border-[#da3633]/40 bg-[#da3633]/10 px-4 py-2 text-center">
                <p className="text-2xl font-semibold text-[#dc2626]">1</p>
                <p className="text-xs text-[#6b7280]">Critical</p>
              </div>
              <div className="rounded-xl border border-[#d29922]/40 bg-[#d29922]/10 px-4 py-2 text-center">
                <p className="text-2xl font-semibold text-[#ca8a04]">2</p>
                <p className="text-xs text-[#6b7280]">High</p>
              </div>
              <div className="rounded-xl border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-4 py-2 text-center">
                <p className="text-2xl font-semibold text-[#2563eb]">3</p>
                <p className="text-xs text-[#6b7280]">Filings Affected</p>
              </div>
            </div>
            <div className="mt-8 border-t border-[#e5e7eb] pt-6">
              <p className="text-xs text-center uppercase tracking-wider text-[#9ca3af] mb-4">Response Workflow</p>
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {WORKFLOW_STAGES.map((stage, idx) => (
                  <React.Fragment key={stage.id}>
                    <div className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs",
                      stage.status === "completed" && "bg-[#3fb950]/20 text-[#16a34a]",
                      stage.status === "current" && "bg-[#3b82f6]/20 text-[#2563eb] ring-2 ring-[#58a6ff]/50",
                      stage.status === "pending" && "bg-[#f3f4f6] text-[#9ca3af]"
                    )}>
                      {stage.status === "completed" && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      )}
                      {stage.status === "current" && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3b82f6] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3b82f6]"></span>
                        </span>
                      )}
                      <span className="font-medium">{stage.label}</span>
                    </div>
                    {idx < WORKFLOW_STAGES.length - 1 && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stage.status === "completed" ? "#16a34a" : "#e5e7eb"} strokeWidth="2">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </header>

          {/* Agent ticker */}
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2 mt-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 text-xs font-medium uppercase tracking-[0.2em] text-[#9ca3af]">Legal Monitoring Agents</span>
              <div className="flex-1">
                <div className="flex items-center gap-6 overflow-x-auto">
                  {AGENTS.map((agent) => (
                    <span key={agent.name} className="whitespace-nowrap text-sm text-[#6b7280]">
                      <span className="font-medium text-[#111827]">{agent.name}</span>
                      <span className="mx-2 text-[#9ca3af]">·</span>
                      <span className="text-[#9ca3af]">Last {agent.lastRun}, next {agent.nextRun}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Risks under review — single consolidated panel */}
          <section className="mt-8">
            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#e5e7eb]">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm font-semibold text-[#111827]">Risks Under Review</h2>
                  <span className="rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-2 py-0.5 text-xs font-medium text-[#2563eb]">
                    {RISKS.length} risks
                  </span>
                </div>
                <Link
                  href="/light/superhero/gc-review/notification"
                  className="text-xs font-medium text-[#2563eb] hover:text-[#3b82f6] hover:underline"
                >
                  Review team feedback →
                </Link>
              </div>
              <div className="divide-y divide-[#30363d]">
                {RISKS.map((risk) => (
                  <div
                    key={risk.id}
                    className={cn(
                      "flex items-center justify-between gap-4 px-5 py-2.5 hover:bg-white/30",
                      risk.severity === "critical" && "bg-[#da3633]/5",
                      risk.severity === "high" && "bg-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "h-2 w-2 rounded-full shrink-0",
                        risk.severity === "critical" && "bg-[#da3633]",
                        risk.severity === "high" && "bg-[#d29922]"
                      )} />
                      <span className="text-sm font-medium text-[#111827]">{risk.label}</span>
                    </div>
                    <Link
                      href={`/light/superhero/writer?risk=${risk.id}&owner=${risk.owner}`}
                      className="text-xs font-medium text-[#2563eb] hover:text-[#3b82f6] hover:underline shrink-0"
                    >
                      View disclosure draft →
                    </Link>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Entities + Policy Manager — manual task first, then speed-up pitch */}
          <section className="mt-8">
            <Card className="border-[#3b82f6]/30 bg-[#3b82f6]/5">
              <p className="text-sm text-[#374151] leading-relaxed mb-3">
                <span className="font-medium text-[#111827]">Map leadership and subsidiary structure</span> for your Vietnamese entities (and other subsidiaries) before the next filing—who&apos;s in charge, what&apos;s registered where, and how it aligns with your attestation policies.
              </p>
              <p className="text-sm text-[#374151] leading-relaxed mb-4">
                With Diligent Entities, you can do this in minutes instead of hours—automatically sync org structure with Policy Manager and keep regulatory filings current.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white hover:bg-[#79c0ff] transition-colors"
              >
                Start your 90-day full feature trial now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </Card>
          </section>

          {/* Pick up where you left off */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-[#111827]">Pick up where you left off</h2>
            <p className="mt-2 text-sm text-[#6b7280]">Continue working in your Diligent applications</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {RECENT_APPS.map((app) => (
                <a key={app.name} href="#" className="block rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] px-4 py-3 shadow-sm transition hover:-translate-y-[1px] hover:border-[#3b82f6]/50 hover:bg-[#f3f4f6]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-[#111827]">{app.name}</h3>
                        <span className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-[11px] text-[#6b7280]">{app.lastUsed}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#6b7280]">{app.description}</p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#9ca3af] opacity-0 group-hover:opacity-100">Open</span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-14 border-t border-[#e5e7eb] bg-white px-5 py-5 -mx-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#9ca3af]">System log</p>
            <p className="mt-1 text-sm text-[#6b7280]">Recent system activity (last 24 hours)</p>
            <div className="mt-4 grid gap-2">
              {ACTIVITY_LOG.map((entry) => (
                <div key={entry} className="flex items-start gap-3 text-sm text-[#6b7280]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3fb950]" />
                  <span>{entry}</span>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
      </div>

      {/* Pinned prompt — gc-commandcenter style */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pb-4 pt-8 z-50">
        <div className="mx-auto max-w-4xl px-6">
          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
            <span className="text-[10px] text-[#9ca3af]">Advance:</span>
            <Link
              href="/light/superhero/gc-review/notification"
              className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1 text-xs text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
            >
              Review team feedback
            </Link>
            <Link
              href="/light/superhero/ceo-review/notification"
              className="rounded-full border border-[#3b82f6]/50 bg-[#3b82f6]/10 px-3 py-1 text-xs font-medium text-[#2563eb] hover:bg-[#3b82f6]/20 transition-colors"
            >
              Finalize and send to CEO →
            </Link>
            <Link
              href="/light/superhero/board-governance"
              className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1 text-xs text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
            >
              Summarize for the board
            </Link>
          </div>
          <div className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-2 shadow-xl shadow-black/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white flex-shrink-0 p-1.5">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" className="h-5 w-auto">
                  <path d="M20.1006 15.6877C20.0186 15.8056 19.9338 15.9211 19.8467 16.0364C19.5697 16.4006 19.2675 16.7474 18.9443 17.0706C17.5077 18.5072 15.6393 19.5107 13.5459 19.8596L6.03223 12.345L8.3877 9.98755H8.38965L8.39258 9.98462L20.1006 15.6877Z" fill="#D3222A"/>
                  <path d="M20.0259 4.21263C21.1905 5.84672 21.8735 7.84495 21.8735 9.99974C21.8735 12.116 21.2194 14.0737 20.1011 15.6872L8.39209 9.98412L20.0259 4.21263Z" fill="#EE312E"/>
                  <path d="M13.5454 19.8581C13.0018 19.9504 12.4428 19.9997 11.8735 19.9997H3.69971L4.89307 13.4802L6.03174 12.3445L13.5454 19.8581Z" fill="#AF292E"/>
                  <path d="M13.5435 0.141312C16.0395 0.559546 18.2228 1.90387 19.7261 3.80733C19.8311 3.94057 19.9311 4.07423 20.0259 4.2126L8.39209 9.98409H8.38623L6.04443 7.63936L13.5435 0.141312Z" fill="#D3222A"/>
                  <path d="M11.8735 0C12.4429 2.15682e-05 12.9997 0.0482901 13.5435 0.140625L6.04443 7.63965L4.88232 6.47754L3.69971 0H11.8735Z" fill="#AF292E"/>
                  <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Ask me anything about these risks..."
                className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none"
              />
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3f4f6] text-[#d1d5db] hover:bg-[#f3f4f6] hover:text-[#111827]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LeftRail } from "../LeftRail";
import { StakeholderFooter, PrototypeControlButton } from "../StakeholderFooter";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GC_NAME = "Sarah Mitchell";
const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

// Highlight colors per comment (Word/Docs style)
const HIGHLIGHT_COLORS: Record<string, string> = {
  "1": "bg-[#fef08a]/60 border-b-2 border-[#eab308]",      // Diana - yellow
  "2": "bg-[#93c5fd]/60 border-b-2 border-[#3b82f6]",      // Rachel - blue
  "3": "bg-[#d8b4fe]/60 border-b-2 border-[#a855f7]",     // Davis Polk - purple
};
const COMMENT_BORDER_COLORS: Record<string, string> = {
  "1": "border-l-[#eab308]",
  "2": "border-l-[#3b82f6]",
  "3": "border-l-[#a855f7]",
};

type FeedbackItem = {
  id: string;
  from: string;
  role: string;
  avatarUrl: string;
  originalText: string;
  replacementText: string;
  suggestion: string;
  status: "pending" | "accepted" | "declined";
};

type ErmDeckFeedbackItem = {
  id: string;
  from: string;
  role: string;
  avatarUrl: string;
  slideOrSection: string;
  suggestion: string;
  status: "pending" | "accepted" | "declined";
};

const ERM_DECK_FEEDBACK: ErmDeckFeedbackItem[] = [
  {
    id: "e1",
    from: "Rachel Green",
    role: "VP Risk Management",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/32.jpg",
    slideOrSection: "Slide 2: Top 5 Risks",
    suggestion: "Add vendor breach to Top 5 — CloudSecure incident qualifies per CRO assessment.",
    status: "pending",
  },
  {
    id: "e2",
    from: "Marcus Webb",
    role: "CISO",
    avatarUrl: "https://i.pravatar.cc/150?u=marcus-webb",
    slideOrSection: "Slide 3: Risk Trends (YoY)",
    suggestion: "Include year-over-year cyber risk trend (up 23%) from vendor intelligence.",
    status: "pending",
  },
];

const TEAM_FEEDBACK: FeedbackItem[] = [
  {
    id: "1",
    from: "Diana Reyes",
    role: "VP Supply Chain",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/44.jpg",
    originalText: "evaluation of alternative sourcing regions as discussed at the board level",
    replacementText: "evaluation of alternative sourcing regions as discussed at the board level (Vietnam noted in Q3 materials)",
    suggestion: "Add explicit mention of Vietnam as diversification target from Q3 board materials.",
    status: "pending",
  },
  {
    id: "2",
    from: "Rachel Green",
    role: "VP Risk Management",
    avatarUrl: "https://randomuser.me/api/portraits/med/women/32.jpg",
    originalText: "impact",
    replacementText: "materially impact",
    suggestion: "Consider adding 'materially' before 'impact' to align with CRO assessment severity.",
    status: "pending",
  },
  {
    id: "3",
    from: "Davis Polk",
    role: "Outside Counsel",
    avatarUrl: "https://randomuser.me/api/portraits/med/men/52.jpg",
    originalText: "qualification of alternative suppliers",
    replacementText: "qualification of alternative suppliers typically requires 12-18 months",
    suggestion: "We recommend including the 12-18 month qualification timeline for alternative suppliers.",
    status: "pending",
  },
];

type DocPart = { type: "text"; content: string } | { type: "highlight"; commentId: string };
const DOC_PARTS: DocPart[] = [
  { type: "text", content: "Semiconductor Supply Chain and Geopolitical Risks\n\nWe face risks related to semiconductor supply chain concentration and geopolitical exposure. Approximately 47% of our chip suppliers have Taiwan-based operations. Escalating tensions in the Taiwan Strait may disrupt our semiconductor supply chain, extend lead times, and " },
  { type: "highlight", commentId: "2" },
  { type: "text", content: " our ability to source critical components.\n\nWe are pursuing supplier diversification initiatives, including " },
  { type: "highlight", commentId: "1" },
  { type: "text", content: "; however, " },
  { type: "highlight", commentId: "3" },
  { type: "text", content: "." },
];

function GcReviewFeedbackContent() {
  const router = useRouter();
  const [feedback, setFeedback] = useState<FeedbackItem[]>(TEAM_FEEDBACK);
  const [ermFeedback, setErmFeedback] = useState<ErmDeckFeedbackItem[]>(ERM_DECK_FEEDBACK);
  const [activeTab, setActiveTab] = useState<"10k" | "erm">("10k");
  const [showContextPacketModal, setShowContextPacketModal] = useState(false);

  const pending10k = feedback.filter((f) => f.status === "pending").length;
  const pendingErm = ermFeedback.filter((f) => f.status === "pending").length;
  const pendingCount = pending10k + pendingErm;
  const allResolved = pendingCount === 0;

  const handleAccept = (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "accepted" as const } : f)));
  };
  const handleDecline = (id: string) => {
    setFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "declined" as const } : f)));
  };
  const handleErmAccept = (id: string) => {
    setErmFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "accepted" as const } : f)));
  };
  const handleErmDecline = (id: string) => {
    setErmFeedback((prev) => prev.map((f) => (f.id === id ? { ...f, status: "declined" as const } : f)));
  };

  const handleContinue = () => {
    setShowContextPacketModal(true);
  };

  const handleAcceptContextPacket = () => {
    setShowContextPacketModal(false);
    router.push("/light/superhero/context-packet");
  };

  const handleSkipContextPacket = () => {
    setShowContextPacketModal(false);
    router.push("/light/superhero/ceo-review/notification");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Review & Approval</span>
            <Link href="/light/superhero/gc-review/notification" className="text-xs font-medium text-[#0369a1] hover:underline">
              ← Notification
            </Link>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {GC_NAME} (General Counsel)
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <LeftRail actorLabel={GC_NAME} activeWorkflowStep="Review Feedback" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-6 py-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src={GC_AVATAR_URL} alt="GC" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-semibold text-[#111827]">Review team feedback</h1>
                <p className="text-xs text-[#6b7280]">Edits, corrections, and additions from your team</p>
              </div>
            </div>
          </div>

          {/* Stepper: 1 ✓ Review Document → 2 ☐ Review Slides → Continue */}
          <div className="flex-shrink-0 border-b border-[#e5e7eb] bg-white px-6 py-3">
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab("10k")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === "10k"
                    ? "border-[#3b82f6]/50 bg-[#3b82f6]/15 text-[#2563eb]"
                    : "border-[#e5e7eb] bg-[#f3f4f6] text-[#374151] hover:border-[#6e7681]"
                )}
              >
                <span className={cn("text-base font-semibold", pending10k === 0 ? "text-[#16a34a]" : "text-[#6b7280]")}>
                  {pending10k === 0 ? "1 ✓" : "1 ☐"}
                </span>
                Review Document
              </button>
              <span className="text-[#9ca3af]">→</span>
              <button
                onClick={() => setActiveTab("erm")}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  activeTab === "erm"
                    ? "border-[#3b82f6]/50 bg-[#3b82f6]/15 text-[#2563eb]"
                    : "border-[#e5e7eb] bg-[#f3f4f6] text-[#374151] hover:border-[#6e7681]"
                )}
              >
                <span className={cn("text-base font-semibold", pendingErm === 0 ? "text-[#16a34a]" : "text-[#6b7280]")}>
                  {pendingErm === 0 ? "2 ✓" : "2 ☐"}
                </span>
                Review Slides
              </button>
              <span className="text-[#9ca3af]">→</span>
              <button
                onClick={handleContinue}
                disabled={!allResolved}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
                  allResolved
                    ? "border-[#3fb950]/50 bg-[#3fb950] text-[#0d1117] hover:bg-[#46c35a]"
                    : "border-[#e5e7eb] bg-[#f3f4f6] text-[#d1d5db] cursor-not-allowed"
                )}
              >
                Continue
              </button>
            </div>
          </div>

          {/* Tabs: Review 10K | Review ERM Slides — tab bar styling (not segmented toggle) */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-shrink-0 border-b border-[#e5e7eb] bg-white">
              <div className="flex gap-0">
                <button
                  onClick={() => setActiveTab("10k")}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    activeTab === "10k"
                      ? "border-[#3b82f6] text-[#111827]"
                      : "border-transparent text-[#6b7280] hover:text-[#374151]"
                  )}
                >
                  Review 10K {pending10k > 0 && <span className="ml-1.5 rounded-full bg-[#d29922]/30 px-1.5 py-0.5 text-[10px] font-normal">{pending10k}</span>}
                </button>
                <button
                  onClick={() => setActiveTab("erm")}
                  className={cn(
                    "px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px",
                    activeTab === "erm"
                      ? "border-[#3b82f6] text-[#111827]"
                      : "border-transparent text-[#6b7280] hover:text-[#374151]"
                  )}
                >
                  Review ERM Slides {pendingErm > 0 && <span className="ml-1.5 rounded-full bg-[#d29922]/30 px-1.5 py-0.5 text-[10px] font-normal">{pendingErm}</span>}
                </button>
              </div>
            </div>

            {/* Centered working area — doc/slides + comments, max-width for spatial connection */}
            <div className="flex-1 flex min-h-0 overflow-hidden">
              <div className="flex-1 flex justify-center min-w-0 overflow-hidden px-6 lg:px-12">
                <div className="w-full max-w-6xl flex min-h-0 min-w-0">
              {activeTab === "10k" ? (
                /* Tab 1: 10-K — full focus */
                <>
                  <div className="flex-1 min-w-0 p-6 border-r border-[#e5e7eb] overflow-y-auto">
                    <div className="rounded-lg border border-[#e5e7eb] bg-white p-5">
                      <p className="text-sm text-[#374151] leading-relaxed font-sans">
                        {DOC_PARTS.map((part, i) => {
                          if (part.type === "text") return <span key={i}>{part.content}</span>;
                          const item = feedback.find((f) => f.id === part.commentId)!;
                          const displayText = item.status === "accepted" ? item.replacementText : item.originalText;
                          const isPending = item.status === "pending";
                          return (
                            <span
                              key={i}
                              className={cn(
                                "rounded-sm px-0.5 cursor-default",
                                isPending && HIGHLIGHT_COLORS[part.commentId],
                                item.status === "accepted" && "bg-[#3fb950]/30 border-b-2 border-[#3fb950]",
                                item.status === "declined" && "bg-transparent border-transparent"
                              )}
                              title={item.from}
                            >
                              {item.status === "declined" ? (
                                <span className="line-through opacity-60">{displayText}</span>
                              ) : (
                                displayText
                              )}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="w-[320px] flex-shrink-0 p-4 overflow-y-auto">
                    <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Comments ({pending10k} pending)</h3>
                    <div className="space-y-3">
                      {feedback.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "rounded-lg border border-l-4 p-3 transition-colors",
                            COMMENT_BORDER_COLORS[item.id],
                            item.status === "accepted" && "border-[#3fb950]/40 bg-[#3fb950]/5 border-l-[#3fb950]",
                            item.status === "declined" && "border-[#e5e7eb] bg-white/50 opacity-60 border-l-[#30363d]",
                            item.status === "pending" && "border-[#e5e7eb] bg-white/30"
                          )}
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <img src={item.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
                            <p className="text-[11px] font-semibold text-[#111827]">{item.from}</p>
                          </div>
                          <p className="text-[11px] text-[#9ca3af] font-mono mb-1">&ldquo;{item.originalText}&rdquo;</p>
                          <p className="text-xs text-[#374151] mb-2">{item.suggestion}</p>
                          {item.status === "pending" ? (
                            <div className="flex gap-1">
                              <button onClick={() => handleAccept(item.id)} className="rounded bg-[#3fb950] px-2 py-0.5 text-[10px] font-medium text-[#0d1117]">Accept</button>
                              <button onClick={() => handleDecline(item.id)} className="rounded border border-[#e5e7eb] px-2 py-0.5 text-[10px] font-medium text-[#6b7280]">Decline</button>
                            </div>
                          ) : (
                            <span className={cn("text-[10px] font-medium", item.status === "accepted" ? "text-[#16a34a]" : "text-[#6b7280]")}>
                              {item.status === "accepted" ? "✓ Accepted" : "Declined"}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Tab 2: ERM deck — each slide in its own row/column for focus */
                <>
                  <div className="flex-1 min-w-0 p-6 border-r border-[#e5e7eb] overflow-y-auto">
                    <p className="text-xs text-[#6b7280] mb-4">Generated by the Producer from validated risk owner context and approvals. Each slide in its own cell for focused review.</p>
                    <div className="grid grid-cols-1 gap-8">
                      {/* Slide 1 — 16:9 */}
                      <div className="w-full max-w-3xl aspect-video rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                        <div className="w-full h-full p-5 flex flex-col justify-center">
                          <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-1">Slide 1</p>
                          <h3 className="text-lg font-semibold text-[#0d1117]">Enterprise Risk Management</h3>
                          <p className="text-sm text-[#d1d5db] mt-1">Q1 2026 Board Briefing</p>
                          <p className="text-xs text-[#6b7280] mt-2">Prepared for Feb 28 Board Meeting</p>
                        </div>
                      </div>
                      {/* Slide 2 — 16:9 */}
                      <div className="w-full max-w-3xl aspect-video rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                        <div className="w-full h-full p-5 flex flex-col">
                          <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Slide 2 — Top 5 Risks</p>
                          <div className="space-y-2 flex-1">
                          {[
                            { name: "Taiwan Strait / Supply Chain", score: 94, sev: "Critical" },
                            { name: "Vendor Cybersecurity Breach", score: 91, sev: "High" },
                            { name: "EU Digital Markets Act", score: 87, sev: "High" },
                            { name: "Regulatory Compliance", score: 72, sev: "Medium" },
                            { name: "Geopolitical Instability", score: 68, sev: "Medium" },
                          ].map((r, i) => (
                            <div key={i} className="flex items-center justify-between gap-2 text-xs">
                              <span className="text-[#0d1117] truncate">{r.name}</span>
                              <span className={cn(
                                "shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium",
                                r.sev === "Critical" && "bg-[#da3633]/20 text-[#dc2626]",
                                r.sev === "High" && "bg-[#d29922]/20 text-[#ca8a04]",
                                r.sev === "Medium" && "bg-[#8b949e]/20 text-[#6b7280]"
                              )}>{r.sev}</span>
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                      {/* Slide 3 — 16:9 */}
                      <div className="w-full max-w-3xl aspect-video rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                        <div className="w-full h-full p-5 flex flex-col">
                          <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Slide 3 — Risk Trends (YoY)</p>
                          <div className="space-y-2 mt-2 flex-1">
                          {[
                            { label: "Cybersecurity", curr: 78, prev: 55, chg: "+23%" },
                            { label: "Supply Chain", curr: 82, prev: 71, chg: "+11%" },
                            { label: "Regulatory", curr: 65, prev: 58, chg: "+7%" },
                            { label: "Geopolitical", curr: 91, prev: 62, chg: "+29%" },
                          ].map((t, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="w-16 text-[10px] text-[#d1d5db] shrink-0">{t.label}</span>
                              <div className="flex-1 flex gap-1">
                                <div className="flex-1 h-4 bg-[#e5e7eb] rounded overflow-hidden">
                                  <div className="h-full bg-[#94a3b8]" style={{ width: `${t.prev}%` }} />
                                </div>
                                <div className="flex-1 h-4 bg-[#e5e7eb] rounded overflow-hidden">
                                  <div className="h-full bg-[#3b82f6]" style={{ width: `${t.curr}%` }} />
                                </div>
                              </div>
                              <span className="text-[10px] font-medium text-[#dc2626] w-8 shrink-0">{t.chg}</span>
                            </div>
                          ))}
                        </div>
                          <p className="text-[10px] text-[#6b7280] mt-2 flex gap-4">
                            <span><span className="inline-block w-2 h-2 rounded-sm bg-[#94a3b8] align-middle mr-1" />Prior</span>
                            <span><span className="inline-block w-2 h-2 rounded-sm bg-[#3b82f6] align-middle mr-1" />Current</span>
                          </p>
                        </div>
                      </div>
                      {/* Slide 4 — 16:9 */}
                      <div className="w-full max-w-3xl aspect-video rounded-xl border border-[#e5e7eb] bg-white shadow-sm overflow-hidden">
                        <div className="w-full h-full p-5 flex flex-col">
                          <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Slide 4 — Changes from Prior Cycle</p>
                          <ul className="text-xs text-[#0d1117] space-y-1 list-disc list-inside">
                            <li>Taiwan Strait elevated to Critical (new)</li>
                            <li>CloudSecure vendor breach — added to Top 5</li>
                            <li>EU DMA enforcement — increased scrutiny</li>
                            <li>Supply chain diversification (Vietnam) — in progress</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-[320px] flex-shrink-0 p-4 overflow-y-auto border-l border-[#e5e7eb]">
                    <h3 className="text-[11px] font-medium text-[#9ca3af] uppercase tracking-wider mb-3">Comments ({pendingErm} pending)</h3>
                    <div className="space-y-3">
                      {ermFeedback.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "rounded-lg border border-l-4 p-3 transition-colors",
                            item.id === "e1" && "border-l-[#3b82f6]",
                            item.id === "e2" && "border-l-[#f0883e]",
                            item.status === "accepted" && "border-[#3fb950]/40 bg-[#3fb950]/5 border-l-[#3fb950]",
                            item.status === "declined" && "border-[#e5e7eb] bg-white/50 opacity-60 border-l-[#30363d]",
                            item.status === "pending" && "border-[#e5e7eb] bg-white/30"
                          )}
                        >
                          <div className="flex items-start gap-2 mb-1">
                            <img src={item.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
                            <p className="text-[11px] font-semibold text-[#111827]">{item.from}</p>
                          </div>
                          <p className="text-[10px] text-[#9ca3af] font-mono mb-1">{item.slideOrSection}</p>
                          <p className="text-xs text-[#374151] mb-2">{item.suggestion}</p>
                          {item.status === "pending" ? (
                            <div className="flex gap-1">
                              <button onClick={() => handleErmAccept(item.id)} className="rounded bg-[#3fb950] px-2 py-0.5 text-[10px] font-medium text-[#0d1117]">Accept</button>
                              <button onClick={() => handleErmDecline(item.id)} className="rounded border border-[#e5e7eb] px-2 py-0.5 text-[10px] font-medium text-[#6b7280]">Decline</button>
                            </div>
                          ) : (
                            <span className={cn("text-[10px] font-medium", item.status === "accepted" ? "text-[#16a34a]" : "text-[#6b7280]")}>
                              {item.status === "accepted" ? "✓ Accepted" : "Declined"}
                            </span>
                        )}
                      </div>
                    ))}
                    </div>
                  </div>
                </>
              )}
                </div>
              </div>
            </div>
          </div>

          {/* GC CTA: Approve edits and advance — within dark UI, not for demo stakeholder */}
          <div className="flex-shrink-0 border-t border-[#e5e7eb] bg-[#f9fafb] px-6 py-4 flex items-center justify-between gap-4">
            <p className="text-sm text-[#374151]">
              {allResolved ? "All feedback resolved." : `Resolve ${pendingCount} remaining (10-K: ${pending10k}, ERM: ${pendingErm}).`}
            </p>
            <button
              onClick={handleContinue}
              disabled={!allResolved}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors",
                allResolved
                  ? "bg-[#3fb950] text-[#0d1117] hover:bg-[#46c35a] shadow-sm"
                  : "bg-[#f3f4f6] text-[#d1d5db] cursor-not-allowed border border-[#e5e7eb]"
              )}
            >
              Approve edits and send to CEO
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Continue as General Counsel to advance the workflow">
        <PrototypeControlButton onClick={handleContinue} disabled={!allResolved}>
          Continue →
        </PrototypeControlButton>
      </StakeholderFooter>

      {/* Step 3: Context Packet recommendation modal */}
      {showContextPacketModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={handleSkipContextPacket}>
          <div
            className="max-w-lg rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3b82f6]/20">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Create Context Packet</h3>
                <p className="text-xs text-[#6b7280]">Recommended before sending to Disclosure Committee</p>
              </div>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed mb-4">
              You have reviewed the 10-K filing and ERM deck. Prior to sending to the Disclosure Committee (CEO, CFO, Audit Committee), Diligent recommends creating a Context Packet that will include:
            </p>
            <ul className="text-sm text-[#374151] space-y-2 list-disc list-inside mb-4">
              <li>Peer 10-K filings</li>
              <li>Relevant transcripts of recent earnings calls of your peers on similar risks</li>
              <li>Related news about these risks</li>
              <li>Additional questions and suggested responses to help you prepare for disclosure</li>
              <li>A press release for your review with your CMO and IRO</li>
            </ul>
            <p className="text-sm text-[#6b7280] leading-relaxed mb-5">
              If you accept this next step, next time we&apos;ll do it automatically and you can just review the Context Packet if you choose.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleSkipContextPacket}
                className="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2.5 text-sm font-medium text-[#6b7280] hover:border-[#6e7681] hover:text-[#111827] transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleAcceptContextPacket}
                className="flex-1 rounded-lg bg-[#3b82f6] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#79c0ff] transition-colors"
              >
                Create Context Packet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GcReviewFeedbackPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" /></div>}>
      <GcReviewFeedbackContent />
    </Suspense>
  );
}

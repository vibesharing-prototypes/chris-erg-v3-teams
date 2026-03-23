"use client";

import React from "react";
import { useRouter } from "next/navigation";
import SimulatorShell from "../components/SimulatorShell";
import { Badge, Card, SectionLabel, ProgressBar, CircularProgress } from "../components/ui";
import { useSimulation } from "../SimulationContext";

function TimelineIcon({ icon, color }: { icon: string; color: string }) {
  const props = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "radar") return <svg {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>;
  if (icon === "link") return <svg {...props}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
  if (icon === "user") return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  return <svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}

const PRIORITY_STYLES = {
  Urgent: { color: "#f87171", bg: "#450a0a", border: "#7f1d1d" },
  High: { color: "#fbbf24", bg: "#422006", border: "#92400e" },
  Required: { color: "#60a5fa", bg: "#1e3a5f", border: "#1e40af" },
};

export default function SimulatorHomeDynamic() {
  const { result } = useSimulation();
  const router = useRouter();

  if (!result) {
    router.push("/risk-simulator");
    return null;
  }

  const d = result.home;

  return (
    <SimulatorShell>
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-bold text-[#f0f6fc]">AI Risk Impact Simulator</h1>
      </div>
      <p className="text-sm text-[#8b949e] mb-3">{d.description}</p>
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <Badge color="#8b949e" bg="#21262d" border="#30363d">Last updated: Today</Badge>
        <Badge color="#a78bfa" bg="#2e1065" border="#5b21b6">AI Confidence: {d.aiConfidence}%</Badge>
        <Badge color="#60a5fa" bg="#1e3a5f" border="#1e40af">Owner: {d.riskOwner.title}</Badge>
        <Badge color="#fbbf24" bg="#422006" border="#92400e">Disclosure: Pending</Badge>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* 1. Risk Discovery */}
        <Card>
          <SectionLabel>1 · Risk Discovery</SectionLabel>
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-[#f0f6fc] mb-2">{d.riskTitle}</h2>
              <div className="flex items-center gap-2 mb-4">
                <Badge color="#f87171" bg="#450a0a" border="#7f1d1d">{d.riskCategory}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1.5">Likelihood</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2.5 rounded-full bg-[#21262d] overflow-hidden">
                      <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: `${d.likelihood}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#fbbf24]">{d.likelihoodLabel}</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1.5">Impact</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2.5 rounded-full bg-[#21262d] overflow-hidden">
                      <div className="h-full rounded-full bg-[#ef4444]" style={{ width: `${d.impact}%` }} />
                    </div>
                    <span className="text-xs font-bold text-[#f87171]">{d.impactLabel}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-[#8b949e] leading-relaxed">{d.description}</p>
            </div>
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <CircularProgress value={d.aiConfidence} />
              <span className="text-[10px] font-semibold text-[#a78bfa]">AI CONFIDENCE</span>
            </div>
          </div>
        </Card>

        {/* 2. Control Coverage */}
        <Card>
          <SectionLabel>2 · Control Coverage</SectionLabel>
          <div className="space-y-4 mb-6">
            {d.controls.map((ctrl) => (
              <div key={ctrl.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-[#c9d1d9]">{ctrl.label}</span>
                </div>
                <ProgressBar value={ctrl.value} max={100} color={ctrl.color} bg={ctrl.bg} />
              </div>
            ))}
          </div>
          <div className="border-t border-[#21262d] pt-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#f87171] mb-3">Missing Controls</div>
            <div className="space-y-2">
              {d.missingControls.map((ctrl) => (
                <div key={ctrl} className="flex items-center gap-2.5 rounded-lg border border-[#7f1d1d]/50 bg-[#450a0a]/30 px-3 py-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  <span className="text-xs text-[#fca5a5]">{ctrl}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 3. Exposure Summary */}
        <Card span>
          <SectionLabel>3 · Exposure Summary</SectionLabel>
          <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-5 mb-4">
            <p className="text-sm text-[#c9d1d9] leading-relaxed mb-3">{d.supplyChainSummary}</p>
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-[#065f46] bg-[#052e16] px-4 py-2">
                <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-0.5">Total Exposure</div>
                <div className="text-xl font-extrabold text-[#34d399]">{d.exposureTotal}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* 4. AI Investigation Timeline */}
        <Card span>
          <SectionLabel>4 · AI Investigation Flow</SectionLabel>
          <div className="relative flex items-start justify-between px-4">
            <div className="absolute top-5 left-[60px] right-[60px] h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ef4444]" />
            {d.timeline.map((step) => (
              <div key={step.date} className="relative flex flex-col items-center text-center" style={{ width: "22%" }}>
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2" style={{ borderColor: step.color, background: "#161b22" }}>
                  <TimelineIcon icon={step.icon} color={step.color} />
                </div>
                <div className="mt-3 text-xs font-bold" style={{ color: step.color }}>{step.date}</div>
                <div className="mt-1 text-[11px] text-[#8b949e] leading-snug max-w-[140px]">{step.label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* 5. Risk Owner Response */}
        <Card>
          <SectionLabel>5 · Risk Owner Response</SectionLabel>
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-full bg-[#1e3a5f] border border-[#1e40af] flex items-center justify-center text-sm font-bold text-[#60a5fa]">
              {d.riskOwner.initials}
            </div>
            <div>
              <div className="text-sm font-semibold text-[#f0f6fc]">{d.riskOwner.title}</div>
              <Badge color="#fbbf24" bg="#422006" border="#92400e">{d.riskOwner.status}</Badge>
            </div>
          </div>
          <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4 mb-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Current Mitigation</div>
                <div className="text-sm font-bold text-[#f0f6fc]">{d.mitigationCurrent}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Qualification Timeline</div>
                <div className="text-sm font-bold text-[#f0f6fc]">{d.mitigationTimeline}</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Recommended Actions</div>
          <div className="space-y-2">
            {d.recommendedActions.map((action, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-[#30363d] bg-[#0d1117]">
                  <span className="text-[10px] font-bold text-[#6e7681]">{i + 1}</span>
                </div>
                <span className="text-xs text-[#c9d1d9] leading-relaxed">{action}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 6. Disclosure Readiness */}
        <Card>
          <SectionLabel>6 · Disclosure Readiness</SectionLabel>
          <div className="flex items-center gap-2 mb-5">
            <Badge color="#f87171" bg="#450a0a" border="#7f1d1d">Potential Material Risk</Badge>
            <Badge color="#fbbf24" bg="#422006" border="#92400e">GC Review: Pending</Badge>
          </div>
          <div className="mb-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#a78bfa] mb-2">AI Draft Recommendation</div>
            <blockquote className="rounded-lg border-l-[3px] border-[#7c3aed] bg-[#2e1065]/30 px-4 py-3">
              <p className="text-sm text-[#c4b5fd] leading-relaxed italic">&ldquo;{d.disclosureAiDraft}&rdquo;</p>
            </blockquote>
          </div>
          <div className="mb-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Peer Benchmarking</div>
            <div className="space-y-2">
              {d.peers.map((peer) => (
                <div key={peer.name} className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-4 py-2.5">
                  <span className="text-sm font-semibold text-[#f0f6fc]">{peer.name}</span>
                  <span className="text-xs font-bold" style={{ color: peer.color }}>{peer.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4 flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <div className="text-xs text-[#c9d1d9]">{d.peerInsight}</div>
          </div>
        </Card>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 rounded-xl border-2 border-[#7c3aed] bg-[#161b22] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c3aed]/20">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[#f0f6fc]">Bottom Line — What This Means for {result.input.company}</h2>
        </div>
        <p className="text-sm text-[#c9d1d9] leading-relaxed">{d.bottomLine}</p>
      </div>

      {/* What You Should Do */}
      <div className="mt-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-4">What You Should Do</h3>
        <div className="space-y-4">
          {d.actions.map((action, i) => {
            const s = PRIORITY_STYLES[action.priority];
            return (
              <div key={i} className="rounded-xl border bg-[#161b22] p-5 flex items-start gap-4" style={{ borderColor: s.border }}>
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border" style={{ background: s.bg, borderColor: s.border }}>
                  <span className="text-sm font-extrabold" style={{ color: s.color }}>{i + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm font-bold text-[#f0f6fc]">{action.title}</span>
                    <Badge color={s.color} bg={s.bg} border={s.border}>{action.priority}</Badge>
                  </div>
                  <p className="text-sm text-[#8b949e] leading-relaxed">{action.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Who Needs to Know */}
      <div className="mt-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-4">Who Needs to Know</h3>
        <div className="grid grid-cols-4 gap-4">
          {d.stakeholders.map((person) => (
            <div key={person.initials} className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 flex flex-col items-center text-center">
              <div className="h-11 w-11 rounded-full flex items-center justify-center text-sm font-bold mb-3 border" style={{ color: person.color, background: person.bg, borderColor: person.border }}>
                {person.initials}
              </div>
              <div className="text-sm font-semibold text-[#f0f6fc] mb-0.5">{person.name}</div>
              <div className="text-[11px] text-[#6e7681] mb-2">{person.role}</div>
              <div className="text-[11px] font-medium leading-snug" style={{ color: person.color }}>{person.task}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex items-center gap-4">
        <button className="rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
          Share Full Simulation
        </button>
        <button className="rounded-lg border border-[#30363d] bg-[#161b22] px-5 py-2.5 text-sm font-semibold text-[#c9d1d9] hover:border-[#6e7681] transition-colors">
          Schedule Committee Review
        </button>
        <button className="rounded-lg border border-[#5b21b6] bg-[#161b22] px-5 py-2.5 text-sm font-semibold text-[#a78bfa] hover:bg-[#2e1065]/30 transition-colors">
          Begin Disclosure Process
        </button>
      </div>
    </SimulatorShell>
  );
}

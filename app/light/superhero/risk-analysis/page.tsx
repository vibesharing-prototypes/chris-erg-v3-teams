"use client";

import React from "react";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

function cn(...c: Array<string | false | null | undefined>) {
  return c.filter(Boolean).join(" ");
}

function DiligentLogo({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 222 222" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
      <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
      <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
    </svg>
  );
}

function Badge({ children, color, bg, border }: { children: React.ReactNode; color: string; bg: string; border: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
      style={{ color, background: bg, border: `1px solid ${border}` }}
    >
      {children}
    </span>
  );
}

function Card({ children, className, span }: { children: React.ReactNode; className?: string; span?: boolean }) {
  return (
    <div className={cn("rounded-xl border border-[#30363d] bg-[#161b22] p-6", span && "col-span-2", className)}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-4">{children}</h3>
  );
}

function ProgressBar({ value, max, color, bg }: { value: number; max: number; color: string; bg: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: bg }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-semibold tabular-nums" style={{ color, minWidth: 32, textAlign: "right" }}>{pct}%</span>
    </div>
  );
}

function CircularProgress({ value, size = 72, stroke = 6 }: { value: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#21262d" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#a78bfa" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        className="transition-all duration-1000"
      />
      <text
        x={size / 2} y={size / 2}
        textAnchor="middle" dominantBaseline="central"
        className="fill-[#f0f6fc] text-sm font-bold transform rotate-90"
        style={{ transformOrigin: "center", fontSize: 14, fontWeight: 800 }}
      >
        {value}%
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CONTROLS = [
  { label: "Preventive", value: 65, color: "#3b82f6", bg: "#1e3a5f" },
  { label: "Detective", value: 80, color: "#22c55e", bg: "#052e16" },
  { label: "Response", value: 40, color: "#f59e0b", bg: "#422006" },
  { label: "Monitoring", value: 85, color: "#8b5cf6", bg: "#2e1065" },
];

const MISSING_CONTROLS = [
  "Secondary supplier qualification",
  "Emergency logistics rerouting",
  "Crisis supplier financing",
];

const TIMELINE = [
  { date: "Jan 12", label: "Geopolitical escalation detected by AI", icon: "radar", color: "#3b82f6" },
  { date: "Jan 13", label: "Supplier dependency identified", icon: "link", color: "#8b5cf6" },
  { date: "Jan 14", label: "Risk owner notified", icon: "user", color: "#f59e0b" },
  { date: "Jan 15", label: "Board committee alert recommended", icon: "alert", color: "#ef4444" },
];

const RECOMMENDED_ACTIONS = [
  "Begin secondary supplier qualification process",
  "Expand inventory reserves to 120-day buffer",
  "Initiate disclosure review with General Counsel",
];

const PEERS = [
  { name: "Apple", status: "Disclosed", color: "#22c55e" },
  { name: "Nvidia", status: "Disclosed", color: "#22c55e" },
  { name: "AMD", status: "Pending", color: "#f59e0b" },
];

/* ------------------------------------------------------------------ */
/*  Timeline Icon                                                      */
/* ------------------------------------------------------------------ */

function TimelineIcon({ icon, color }: { icon: string; color: string }) {
  const props = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (icon === "radar") return <svg {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>;
  if (icon === "link") return <svg {...props}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
  if (icon === "user") return <svg {...props}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  return <svg {...props}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskAnalysisPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <div className="flex-1">

        {/* ============================================================ */}
        {/*  HEADER                                                       */}
        {/* ============================================================ */}
        <header className="border-b border-[#21262d] bg-[#161b22]">
          <div className="max-w-[1280px] mx-auto px-6 py-5">
            <div className="flex items-center gap-3 mb-3">
              <DiligentLogo size={28} />
              <h1 className="text-lg font-bold text-[#f0f6fc] tracking-tight">Enterprise Risk Governance Command Center</h1>
            </div>
            <p className="text-sm text-[#8b949e] mb-3">
              AI-detected geopolitical escalation affecting semiconductor supply chains
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Badge color="#8b949e" bg="#21262d" border="#30363d">Last updated: Feb 18, 2026</Badge>
              <Badge color="#a78bfa" bg="#2e1065" border="#5b21b6">AI Confidence: 92%</Badge>
              <Badge color="#60a5fa" bg="#1e3a5f" border="#1e40af">Owner: Chief Supply Chain Officer</Badge>
              <Badge color="#fbbf24" bg="#422006" border="#92400e">Disclosure: Pending</Badge>
            </div>
          </div>
        </header>

        {/* ============================================================ */}
        {/*  CONTENT GRID                                                 */}
        {/* ============================================================ */}
        <div className="max-w-[1280px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 gap-6">

            {/* -------------------------------------------------------- */}
            {/*  1. RISK DISCOVERY                                        */}
            {/* -------------------------------------------------------- */}
            <Card>
              <SectionLabel>1 · Risk Discovery</SectionLabel>

              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-[#f0f6fc] mb-2">Taiwan Strait Instability</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge color="#f87171" bg="#450a0a" border="#7f1d1d">Supply Chain Disruption</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1.5">Likelihood</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 rounded-full bg-[#21262d] overflow-hidden">
                          <div className="h-full rounded-full bg-[#f59e0b]" style={{ width: "80%" }} />
                        </div>
                        <span className="text-xs font-bold text-[#fbbf24]">High</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1.5">Impact</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2.5 rounded-full bg-[#21262d] overflow-hidden">
                          <div className="h-full rounded-full bg-[#ef4444]" style={{ width: "95%" }} />
                        </div>
                        <span className="text-xs font-bold text-[#f87171]">Critical</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#8b949e] leading-relaxed">
                    Escalating military posturing in the Taiwan Strait creates material risk to semiconductor supply chains.
                    Approximately 47% of critical chip suppliers operate in Taiwan. Disruption could impact $1.8B in annual
                    product revenue across two major product lines with lead-time extensions of 6–12 months.
                  </p>
                </div>

                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <CircularProgress value={92} />
                  <span className="text-[10px] font-semibold text-[#a78bfa]">AI CONFIDENCE</span>
                </div>
              </div>
            </Card>

            {/* -------------------------------------------------------- */}
            {/*  2. CONTROL COVERAGE                                      */}
            {/* -------------------------------------------------------- */}
            <Card>
              <SectionLabel>2 · Control Coverage</SectionLabel>

              <div className="space-y-4 mb-6">
                {CONTROLS.map((ctrl) => (
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
                  {MISSING_CONTROLS.map((ctrl) => (
                    <div
                      key={ctrl}
                      className="flex items-center gap-2.5 rounded-lg border border-[#7f1d1d]/50 bg-[#450a0a]/30 px-3 py-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                      </svg>
                      <span className="text-xs text-[#fca5a5]">{ctrl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* -------------------------------------------------------- */}
            {/*  3. SUPPLY CHAIN DEPENDENCY MAP                           */}
            {/* -------------------------------------------------------- */}
            <Card span>
              <SectionLabel>3 · Supply Chain Dependency Map</SectionLabel>

              <div className="relative bg-[#0d1117] rounded-xl border border-[#21262d] p-6 mb-5">
                <svg viewBox="0 0 900 220" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Connection lines */}
                  <line x1="200" y1="110" x2="350" y2="65" stroke="#30363d" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="200" y1="110" x2="350" y2="155" stroke="#30363d" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="480" y1="65" x2="620" y2="65" stroke="#30363d" strokeWidth="2" strokeDasharray="6 4" />
                  <line x1="480" y1="155" x2="620" y2="155" stroke="#30363d" strokeWidth="2" strokeDasharray="6 4" />

                  {/* Glow effects */}
                  <circle cx="200" cy="110" r="50" fill="#f59e0b" opacity="0.05" />
                  <circle cx="415" cy="65" r="40" fill="#3b82f6" opacity="0.05" />
                  <circle cx="415" cy="155" r="40" fill="#3b82f6" opacity="0.05" />

                  {/* TSMC node */}
                  <rect x="100" y="75" width="200" height="70" rx="12" fill="#161b22" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="200" y="102" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700" letterSpacing="1">TAIWAN SEMICONDUCTOR</text>
                  <text x="200" y="122" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="700" letterSpacing="1">MANUFACTURING (TSMC)</text>
                  <text x="200" y="138" textAnchor="middle" fill="#92400e" fontSize="9" fontWeight="600">47% SUPPLY CONCENTRATION</text>

                  {/* Chip A */}
                  <rect x="350" y="40" width="130" height="50" rx="10" fill="#161b22" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="415" y="62" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="700">Chip A</text>
                  <text x="415" y="78" textAnchor="middle" fill="#3b82f6" fontSize="9">Advanced Logic</text>

                  {/* Chip B */}
                  <rect x="350" y="130" width="130" height="50" rx="10" fill="#161b22" stroke="#3b82f6" strokeWidth="1.5" />
                  <text x="415" y="152" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="700">Chip B</text>
                  <text x="415" y="168" textAnchor="middle" fill="#3b82f6" fontSize="9">Power Management</text>

                  {/* Product X */}
                  <rect x="620" y="35" width="180" height="60" rx="10" fill="#161b22" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="710" y="58" textAnchor="middle" fill="#f0f6fc" fontSize="12" fontWeight="700">Product X</text>
                  <text x="710" y="78" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="800">$950M</text>
                  <text x="710" y="90" textAnchor="middle" fill="#065f46" fontSize="8">ANNUAL REVENUE</text>

                  {/* Product Y */}
                  <rect x="620" y="125" width="180" height="60" rx="10" fill="#161b22" stroke="#22c55e" strokeWidth="1.5" />
                  <text x="710" y="148" textAnchor="middle" fill="#f0f6fc" fontSize="12" fontWeight="700">Product Y</text>
                  <text x="710" y="168" textAnchor="middle" fill="#22c55e" fontSize="14" fontWeight="800">$850M</text>
                  <text x="710" y="180" textAnchor="middle" fill="#065f46" fontSize="8">ANNUAL REVENUE</text>

                  {/* Total exposure label */}
                  <rect x="660" y="195" width="140" height="24" rx="6" fill="#052e16" stroke="#065f46" strokeWidth="1" />
                  <text x="730" y="211" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="700">TOTAL: $1.8B EXPOSED</text>

                  {/* Flow arrows */}
                  <polygon points="345,63 335,58 335,68" fill="#30363d" />
                  <polygon points="345,153 335,148 335,158" fill="#30363d" />
                  <polygon points="615,63 605,58 605,68" fill="#30363d" />
                  <polygon points="615,153 605,148 605,158" fill="#30363d" />
                </svg>
              </div>

              {/* Control status pills */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-[#065f46] bg-[#052e16] px-3.5 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span className="text-xs font-medium text-[#34d399]">Inventory buffer · Active</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#065f46] bg-[#052e16] px-3.5 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span className="text-xs font-medium text-[#34d399]">Geopolitical monitoring · Active</span>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#7f1d1d] bg-[#450a0a]/40 px-3.5 py-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
                  <span className="text-xs font-medium text-[#fca5a5]">Secondary supplier · Missing</span>
                </div>
              </div>
            </Card>

            {/* -------------------------------------------------------- */}
            {/*  4. AI INVESTIGATION TIMELINE                             */}
            {/* -------------------------------------------------------- */}
            <Card span>
              <SectionLabel>4 · AI Investigation Flow</SectionLabel>

              <div className="relative flex items-start justify-between px-4">
                {/* Connecting line */}
                <div className="absolute top-5 left-[60px] right-[60px] h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#ef4444]" />

                {TIMELINE.map((step, i) => (
                  <div key={step.date} className="relative flex flex-col items-center text-center" style={{ width: "22%" }}>
                    <div
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2"
                      style={{ borderColor: step.color, background: "#161b22" }}
                    >
                      <TimelineIcon icon={step.icon} color={step.color} />
                    </div>
                    <div className="mt-3 text-xs font-bold" style={{ color: step.color }}>{step.date}</div>
                    <div className="mt-1 text-[11px] text-[#8b949e] leading-snug max-w-[140px]">{step.label}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* -------------------------------------------------------- */}
            {/*  5. RISK OWNER RESPONSE                                   */}
            {/* -------------------------------------------------------- */}
            <Card>
              <SectionLabel>5 · Risk Owner Response</SectionLabel>

              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-[#1e3a5f] border border-[#1e40af] flex items-center justify-center text-sm font-bold text-[#60a5fa]">
                  SC
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#f0f6fc]">Chief Supply Chain Officer</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge color="#fbbf24" bg="#422006" border="#92400e">Reviewing</Badge>
                    <span className="text-[11px] text-[#6e7681]">Supplier diversification options</span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-4 mb-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Current Mitigation</div>
                    <div className="text-lg font-bold text-[#f0f6fc]">90-day</div>
                    <div className="text-xs text-[#8b949e]">Inventory buffer</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Qualification Timeline</div>
                    <div className="text-lg font-bold text-[#f0f6fc]">60–90 days</div>
                    <div className="text-xs text-[#8b949e]">Secondary supplier capability exists</div>
                  </div>
                </div>
              </div>

              <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Recommended Actions</div>
              <div className="space-y-2">
                {RECOMMENDED_ACTIONS.map((action, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border border-[#30363d] bg-[#0d1117]">
                      <span className="text-[10px] font-bold text-[#6e7681]">{i + 1}</span>
                    </div>
                    <span className="text-xs text-[#c9d1d9] leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* -------------------------------------------------------- */}
            {/*  6. DISCLOSURE READINESS                                   */}
            {/* -------------------------------------------------------- */}
            <Card>
              <SectionLabel>6 · Disclosure Readiness</SectionLabel>

              <div className="flex items-center gap-2 mb-5">
                <Badge color="#f87171" bg="#450a0a" border="#7f1d1d">Potential Material Risk</Badge>
                <Badge color="#fbbf24" bg="#422006" border="#92400e">GC Review: Pending</Badge>
              </div>

              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a78bfa] mb-2">AI Draft Recommendation</div>
                <blockquote className="rounded-lg border-l-[3px] border-[#7c3aed] bg-[#2e1065]/30 px-4 py-3">
                  <p className="text-sm text-[#c4b5fd] leading-relaxed italic">
                    &ldquo;Escalating geopolitical tensions in the Taiwan Strait could disrupt semiconductor supply chains
                    that support several of our products and may impact manufacturing timelines,
                    component availability, and associated revenue.&rdquo;
                  </p>
                </blockquote>
              </div>

              <div className="mb-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Peer Benchmarking</div>
                <div className="space-y-2">
                  {PEERS.map((peer) => (
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
                <div>
                  <div className="text-xs font-medium text-[#c9d1d9]">2 of 3 peers have already disclosed Taiwan Strait exposure</div>
                  <div className="text-[11px] text-[#6e7681] mt-0.5">Delayed disclosure may signal governance weakness to analysts</div>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — Risk Impact Visualization">
        <PrototypeControlLink href="/light/superhero/approval-status">
          View Approval Status →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

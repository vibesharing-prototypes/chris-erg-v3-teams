"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface WaveOutput {
  label: string;
  value: string;
  status?: "active" | "missing" | "pending" | "complete";
}

interface Wave {
  id: number;
  title: string;
  finding: string;
  decision: string;
  color: string;
  glowColor: string;
  bgColor: string;
  borderColor: string;
  timestamp: string;
  elapsed: string;
  outputs: WaveOutput[];
  recommendation: string;
  action: { label: string; person: string; role: string };
}

const WAVES: Wave[] = [
  {
    id: 1,
    title: "Signal Detected",
    finding: "Geopolitical escalation in Taiwan Strait threatens 47% of your semiconductor supply chain",
    decision: "Concentration exceeds risk threshold — mapping exposure across business units",
    color: "#f87171",
    glowColor: "#ef4444",
    bgColor: "#450a0a",
    borderColor: "#7f1d1d",
    timestamp: "08:43 UTC",
    elapsed: "+0 min",
    outputs: [
      { label: "Taiwan semiconductor suppliers flagged", value: "47% concentration", status: "complete" },
      { label: "3 of 5 key suppliers on negative credit watch", value: "Deteriorating", status: "complete" },
      { label: "Sector sovereign risk elevated", value: "Stable → Negative", status: "complete" },
    ],
    recommendation: "Review supplier diversification strategy with Supply Chain VP",
    action: { label: "Share signal with Supply Chain", person: "David Chen", role: "VP Supply Chain" },
  },
  {
    id: 2,
    title: "Exposure Mapped",
    finding: "3 business units affected — $1.8B in revenue depends on at-risk suppliers",
    decision: "Financial materiality confirmed — evaluating whether existing controls can absorb this",
    color: "#fb923c",
    glowColor: "#f97316",
    bgColor: "#431407",
    borderColor: "#9a3412",
    timestamp: "08:51 UTC",
    elapsed: "+8 min",
    outputs: [
      { label: "Product X manufacturing exposure", value: "$950M", status: "complete" },
      { label: "Product Y manufacturing exposure", value: "$850M", status: "complete" },
      { label: "Current inventory runway", value: "63 days", status: "active" },
    ],
    recommendation: "Initiate contingency sourcing for top-exposure product lines",
    action: { label: "Request contingency plan", person: "Sarah Lin", role: "Head of Operations" },
  },
  {
    id: 3,
    title: "Controls Assessed",
    finding: "Gap found — no secondary supplier qualified. 2 of 3 controls active but insufficient",
    decision: "Existing mitigations won\u2019t contain this — escalating to governance",
    color: "#fbbf24",
    glowColor: "#f59e0b",
    bgColor: "#422006",
    borderColor: "#92400e",
    timestamp: "09:02 UTC",
    elapsed: "+19 min",
    outputs: [
      { label: "Inventory buffer control", value: "Active", status: "active" },
      { label: "Geopolitical monitoring", value: "Active", status: "active" },
      { label: "Secondary supplier qualification", value: "Missing", status: "missing" },
    ],
    recommendation: "Prioritize secondary supplier qualification — this is the critical gap",
    action: { label: "Flag control gap for committee", person: "Marcus Webb", role: "Risk Committee Chair" },
  },
  {
    id: 4,
    title: "Governance Escalated",
    finding: "Materiality threshold exceeded — risk committee and CSCO automatically notified",
    decision: "Regulatory disclosure likely required — initiating disclosure assessment",
    color: "#60a5fa",
    glowColor: "#3b82f6",
    bgColor: "#1e3a5f",
    borderColor: "#1e40af",
    timestamp: "09:14 UTC",
    elapsed: "+31 min",
    outputs: [
      { label: "Risk owner notified (CSCO)", value: "Done", status: "complete" },
      { label: "Enterprise risk committee alert", value: "Triggered", status: "complete" },
      { label: "Scenario modeling", value: "Running", status: "pending" },
    ],
    recommendation: "Schedule emergency risk committee session within 24 hours",
    action: { label: "Convene Risk Committee", person: "Marcus Webb", role: "Risk Committee Chair" },
  },
  {
    id: 5,
    title: "Disclosure Required",
    finding: "2 of 3 peer companies have already disclosed Taiwan supply chain exposure",
    decision: "Delayed disclosure weakens legal defensibility — GC review initiated",
    color: "#a78bfa",
    glowColor: "#8b5cf6",
    bgColor: "#2e1065",
    borderColor: "#5b21b6",
    timestamp: "09:20 UTC",
    elapsed: "+37 min",
    outputs: [
      { label: "10-Q / 10-K risk factor update", value: "Flagged", status: "complete" },
      { label: "AI-drafted disclosure language", value: "Ready for review", status: "complete" },
      { label: "General Counsel review", value: "Pending", status: "pending" },
    ],
    recommendation: "Begin GC review of draft disclosure language within 48 hours",
    action: { label: "Send to General Counsel", person: "Diana Reyes", role: "General Counsel" },
  },
];

/* ------------------------------------------------------------------ */
/*  Shared Components                                                  */
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

function StatusDot({ status }: { status?: string }) {
  const color =
    status === "active" || status === "complete"
      ? "#22c55e"
      : status === "missing"
        ? "#ef4444"
        : "#f59e0b";
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

/* ------------------------------------------------------------------ */
/*  Concentric Ring Visualization                                      */
/* ------------------------------------------------------------------ */

function ShockwaveRings({
  activeWave,
  onSelectWave,
}: {
  activeWave: number;
  onSelectWave: (id: number) => void;
}) {
  const CX = 400;
  const CY = 280;
  const BASE_R = 40;
  const RING_STEP = 48;

  return (
    <svg viewBox="-60 -20 920 620" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {WAVES.map((w) => (
          <React.Fragment key={w.id}>
            <radialGradient id={`sw-grad-${w.id}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={w.glowColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={w.glowColor} stopOpacity="0" />
            </radialGradient>
            <filter id={`sw-glow-${w.id}`}>
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </React.Fragment>
        ))}
        <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#7f1d1d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle background grid */}
      <pattern id="sw-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#21262d" strokeWidth="0.4" strokeOpacity="0.3" />
      </pattern>
      <rect x="-60" y="-20" width="920" height="620" fill="url(#sw-grid)" />

      {/* Wave rings — outer to inner for layering */}
      {(() => {
        const LABEL_ANGLES = [-20, 25, -50, 60, -75];
        const ELAPSED_ANGLES = [160, -155, 130, -120, 105];
        const FINDINGS_SHORT = [
          "47% supply chain concentrated in Taiwan",
          "$1.8B revenue at risk across 3 units",
          "Control gap: no secondary supplier",
          "Materiality threshold exceeded",
          "Peers already disclosed — GC review needed",
        ];
        return [...WAVES].reverse().map((w) => {
          const r = BASE_R + w.id * RING_STEP;
          const isReached = w.id <= activeWave;
          const isActive = w.id === activeWave;
          const labelAngle = LABEL_ANGLES[w.id - 1] ?? 0;
          const labelRad = (labelAngle * Math.PI) / 180;
          const lx = CX + (r + 12) * Math.cos(labelRad);
          const ly = CY + (r + 12) * Math.sin(labelRad);
          const elAngle = ELAPSED_ANGLES[w.id - 1] ?? 180;
          const elRad = (elAngle * Math.PI) / 180;
          const ex = CX + (r + 6) * Math.cos(elRad);
          const ey = CY + (r + 6) * Math.sin(elRad);
          const labelOnLeft = Math.abs(labelAngle) > 90;
          const titleText = `${w.id}. ${w.title}`;
          const findingText = FINDINGS_SHORT[w.id - 1];
          const labelW = Math.max(titleText.length * 5.8, findingText.length * 4.6) + 20;
          return (
            <g
              key={w.id}
              onClick={() => onSelectWave(w.id)}
              className="cursor-pointer"
            >
              {isReached && (
                <circle cx={CX} cy={CY} r={r + 20} fill={`url(#sw-grad-${w.id})`} opacity={isActive ? 1 : 0.4} />
              )}

              <circle
                cx={CX} cy={CY} r={r} fill="none"
                stroke={w.glowColor}
                strokeWidth={isActive ? 2.5 : isReached ? 1.5 : 0.5}
                strokeOpacity={isReached ? (isActive ? 0.9 : 0.4) : 0.12}
                strokeDasharray={isReached ? "none" : "4 8"}
                filter={isActive ? `url(#sw-glow-${w.id})` : undefined}
              />

              <line
                x1={CX + r * Math.cos(labelRad)} y1={CY + r * Math.sin(labelRad)}
                x2={lx} y2={ly}
                stroke={isReached ? w.color : "#30363d"} strokeWidth={0.8} strokeOpacity={isReached ? 0.5 : 0.2}
              />

              <g transform={`translate(${lx}, ${ly})`}>
                <rect
                  x={labelOnLeft ? -labelW : 0} y="-12"
                  width={labelW} height={isReached ? 32 : 22} rx="4"
                  fill={isReached ? w.bgColor : "#161b22"} fillOpacity={isReached ? 0.92 : 0.6}
                  stroke={isReached ? w.borderColor : "#30363d"} strokeWidth={isActive ? 1.5 : 0.5}
                />
                <text
                  x={labelOnLeft ? -(labelW - 8) : 8} y="2"
                  fill={isReached ? w.color : "#484f58"} fontSize="9.5"
                  fontWeight={isActive ? "800" : "600"} letterSpacing="0.2"
                >
                  {titleText}
                </text>
                {isReached && (
                  <text
                    x={labelOnLeft ? -(labelW - 8) : 8} y="15"
                    fill="#8b949e" fontSize="7.5" fontWeight="500"
                  >
                    {findingText}
                  </text>
                )}
              </g>

              {isReached && (
                <text x={ex} y={ey} fill={w.color} fontSize="9" fontWeight="700" textAnchor="middle" opacity={0.7}>
                  {w.elapsed}
                </text>
              )}

              {isActive && (
                <circle cx={CX} cy={CY} r={r + 6} fill="none" stroke={w.glowColor} strokeWidth={1} strokeDasharray="6 6" strokeOpacity={0.4}>
                  <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="30s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        });
      })()}

      {/* Core event */}
      <circle cx={CX} cy={CY} r={BASE_R} fill="url(#core-grad)" />
      <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />
      <circle cx={CX} cy={CY} r={BASE_R * 0.55} fill="#7f1d1d" fillOpacity="0.5" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />

      {/* Core label */}
      <text x={CX} y={CY - 8} textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="800" letterSpacing="1">
        EVENT
      </text>
      <text x={CX} y={CY + 6} textAnchor="middle" fill="#f0f6fc" fontSize="9" fontWeight="700">
        Taiwan Strait
      </text>
      <text x={CX} y={CY + 18} textAnchor="middle" fill="#8b949e" fontSize="7" fontWeight="600">
        Jan 12 · 08:43 UTC
      </text>

      {/* Pulse animation on core */}
      {activeWave >= 1 && (
        <>
          <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0">
            <animate attributeName="r" from={`${BASE_R}`} to={`${BASE_R + 25}`} dur="2s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Detail Panel                                                       */
/* ------------------------------------------------------------------ */

function WaveDetailPanel({ wave }: { wave: Wave }) {
  return (
    <div
      className="rounded-xl border p-5 transition-all duration-300"
      style={{ borderColor: wave.borderColor, background: "#161b22" }}
    >
      {/* Wave header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="h-9 w-9 rounded-lg flex items-center justify-center text-sm font-extrabold flex-shrink-0"
          style={{ background: wave.bgColor, color: wave.color, border: `1px solid ${wave.borderColor}` }}
        >
          {wave.id}
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#f0f6fc]">{wave.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-semibold" style={{ color: wave.color }}>{wave.timestamp}</span>
            <span className="text-[10px] text-[#6e7681]">{wave.elapsed}</span>
          </div>
        </div>
      </div>

      {/* What we found */}
      <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-1.5">What we found</div>
        <p className="text-xs text-[#f0f6fc] leading-relaxed font-medium">{wave.finding}</p>
      </div>

      {/* Why it matters */}
      <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-1.5">Why it matters</div>
        <p className="text-xs text-[#c9d1d9] leading-relaxed">{wave.decision}</p>
      </div>

      {/* Evidence */}
      <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Evidence</div>
      <div className="space-y-1.5 mb-3">
        {wave.outputs.map((o, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
            <StatusDot status={o.status} />
            <span className="text-[11px] text-[#c9d1d9] flex-1 min-w-0">{o.label}</span>
            <span className="text-[11px] font-bold text-[#f0f6fc] flex-shrink-0">{o.value}</span>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="rounded-lg border border-[#1f6feb]/30 bg-[#1f6feb]/5 p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#58a6ff] mb-1.5">Recommended action</div>
        <p className="text-xs text-[#c9d1d9] leading-relaxed">{wave.recommendation}</p>
      </div>

      {/* Action CTA */}
      <button className="w-full flex items-center gap-3 rounded-lg border border-[#30363d] bg-[#21262d] hover:bg-[#30363d] px-3.5 py-2.5 transition-colors group">
        <div className="h-7 w-7 rounded-full bg-[#0d1117] border border-[#30363d] flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </div>
        <div className="flex-1 text-left min-w-0">
          <div className="text-[11px] font-semibold text-[#f0f6fc] group-hover:text-white">{wave.action.label}</div>
          <div className="text-[10px] text-[#6e7681]">{wave.action.person} · {wave.action.role}</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="2" className="flex-shrink-0 group-hover:stroke-[#c9d1d9] transition-colors"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Playback Controls                                                  */
/* ------------------------------------------------------------------ */

function PlaybackControls({
  activeWave,
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onReset,
}: {
  activeWave: number;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onStep: (dir: number) => void;
  onReset: () => void;
}) {
  const btnCls =
    "h-9 rounded-lg border border-[#30363d] bg-[#161b22] px-3 text-xs font-semibold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f0f6fc] transition-colors flex items-center gap-1.5";

  return (
    <div className="flex items-center gap-2">
      <button className={btnCls} onClick={onReset}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
        Reset
      </button>
      <button className={btnCls} onClick={() => onStep(-1)} disabled={activeWave <= 0}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" /></svg>
        Prev
      </button>
      {isPlaying ? (
        <button className={btnCls} onClick={onPause}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
          Pause
        </button>
      ) : (
        <button className={btnCls} onClick={onPlay}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          Play
        </button>
      )}
      <button className={btnCls} onClick={() => onStep(1)} disabled={activeWave >= 5}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" /></svg>
        Next
      </button>

      {/* Progress dots */}
      <div className="ml-3 flex items-center gap-1.5">
        {WAVES.map((w) => (
          <div
            key={w.id}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: w.id === activeWave ? 20 : 8,
              background: w.id <= activeWave ? w.glowColor : "#30363d",
              opacity: w.id <= activeWave ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Wave counter */}
      <span className="ml-2 text-[11px] text-[#6e7681] font-medium tabular-nums">
        Wave {activeWave} / {WAVES.length}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/*  Icon Sidebar (matches Risk Essentials)                             */
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RiskShockwavePage() {
  const [activeWave, setActiveWave] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = useCallback(
    (dir: number) => {
      setActiveWave((prev) => Math.max(0, Math.min(WAVES.length, prev + dir)));
    },
    [],
  );

  useEffect(() => {
    if (!isPlaying) return;
    if (activeWave >= WAVES.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => step(1), 1800);
    return () => clearTimeout(timer);
  }, [isPlaying, activeWave, step]);

  const handlePlay = () => {
    if (activeWave >= WAVES.length) setActiveWave(0);
    setIsPlaying(true);
  };

  const currentWave = WAVES.find((w) => w.id === activeWave) ?? null;

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
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
          <div className="flex-1 px-6 py-6 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[12px] text-[#6e7681] mb-4">
              <Link href="/superhero/risk-discovery" className="hover:text-[#58a6ff] cursor-pointer">AI Risk Essentials</Link>
              <span>›</span>
              <Link href="/superhero/risk-analysis" className="hover:text-[#58a6ff] cursor-pointer">AI Risk Impact Simulator</Link>
              <span>›</span>
              <span className="text-[#c9d1d9]">Risk Shockwave</span>
            </div>

            {/* Simulator nav */}
            <div className="flex items-center gap-1 mb-6 border-b border-[#21262d] pb-3">
              <Link href="/superhero/risk-discovery" className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors">
                ← Risk Essentials
              </Link>
              <div className="w-px h-4 bg-[#21262d] mx-1" />
              <Link href="/superhero/risk-analysis" className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors">
                Simulator Home
              </Link>
              <Link href="/superhero/risk-gravity" className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors">
                Gravity Map
              </Link>
              <span className="rounded-lg px-3 py-1.5 text-[11px] font-medium bg-[#60a5fa]/10 text-[#60a5fa] border border-[#60a5fa]/20">
                Risk Shockwave
              </span>
              <Link href="/superhero/risk-pipeline" className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors">
                Risk Pipeline
              </Link>
            </div>

            {/* Title */}
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-xl font-bold text-[#f0f6fc]">Risk Shockwave</h1>
            </div>
            <p className="text-sm text-[#8b949e] mb-4">
              Watch how a single geopolitical signal cascades into a disclosure decision in 37 minutes — and what the system found at each step
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Total time</span>
                <span className="text-sm font-extrabold text-[#a78bfa]">37 min</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Exposure found</span>
                <span className="text-sm font-extrabold text-[#f87171]">$1.8B</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Control gaps</span>
                <span className="text-sm font-extrabold text-[#fbbf24]">1 critical</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
                <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Actions needed</span>
                <span className="text-sm font-extrabold text-[#60a5fa]">3</span>
              </div>
            </div>

            <div>
          {/* Playback controls */}
          <div className="mb-5 flex items-center justify-between">
            <PlaybackControls
              activeWave={activeWave}
              isPlaying={isPlaying}
              onPlay={handlePlay}
              onPause={() => setIsPlaying(false)}
              onStep={step}
              onReset={() => {
                setIsPlaying(false);
                setActiveWave(0);
              }}
            />
          </div>

          <div className="flex gap-6">
            {/* Left: Shockwave visualization */}
            <div className="flex-1 min-w-0">
              <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-2 mb-5">
                <ShockwaveRings
                  activeWave={activeWave}
                  onSelectWave={(id) => {
                    setIsPlaying(false);
                    setActiveWave(id);
                  }}
                />
              </div>

              {/* Summary & Actions — visible after all waves */}
              {activeWave >= 5 && (
                <div className="space-y-4 transition-all duration-500">
                  {/* Summary banner */}
                  <div className="rounded-xl border border-[#5b21b6] bg-[#2e1065]/30 p-5">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-[#2e1065] border border-[#7c3aed] flex items-center justify-center flex-shrink-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#c4b5fd] mb-1">Analysis Complete — 37 minutes, signal to disclosure</h3>
                        <p className="text-[13px] text-[#8b949e] leading-relaxed">
                          A geopolitical signal was detected, traced to $1.8B in exposure, a critical control gap was identified,
                          governance was escalated, and disclosure review was initiated — all before the first meeting of the day.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-[#5b21b6]/30 pt-4">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#a78bfa] mb-3">What needs to happen now</div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 rounded-lg bg-[#0d1117]/60 border border-[#30363d] px-3.5 py-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#f87171]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-[#f87171]">1</span>
                          </div>
                          <span className="text-xs text-[#c9d1d9] flex-1">Qualify a secondary semiconductor supplier to close the critical control gap</span>
                          <span className="text-[10px] text-[#f87171] font-semibold flex-shrink-0">Urgent</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-[#0d1117]/60 border border-[#30363d] px-3.5 py-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-[#fbbf24]">2</span>
                          </div>
                          <span className="text-xs text-[#c9d1d9] flex-1">Convene emergency risk committee session within 24 hours</span>
                          <span className="text-[10px] text-[#fbbf24] font-semibold flex-shrink-0">High</span>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-[#0d1117]/60 border border-[#30363d] px-3.5 py-2.5">
                          <div className="w-5 h-5 rounded-full bg-[#60a5fa]/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[9px] font-bold text-[#60a5fa]">3</span>
                          </div>
                          <span className="text-xs text-[#c9d1d9] flex-1">General Counsel to review AI-drafted disclosure language within 48 hours</span>
                          <span className="text-[10px] text-[#60a5fa] font-semibold flex-shrink-0">Required</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#1f6feb] to-[#388bfd] px-4 py-3 text-xs font-semibold text-white hover:opacity-90 transition-opacity">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                      Share Full Analysis
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-3 text-xs font-semibold text-[#c9d1d9] hover:bg-[#30363d] transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                      Convene Committee
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#5b21b6] bg-[#2e1065]/40 px-4 py-3 text-xs font-semibold text-[#c4b5fd] hover:bg-[#2e1065]/60 transition-colors">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                      Begin Disclosure Review
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Detail Panel */}
            <div className="w-[360px] flex-shrink-0 space-y-4">
              {/* Origin Event — always visible */}
              <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Origin Event</div>
                <div className="rounded-lg border border-[#7f1d1d] bg-[#450a0a]/40 p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                    <span className="text-[10px] font-bold text-[#f87171]">GEOPOLITICAL ESCALATION</span>
                  </div>
                  <h4 className="text-[13px] font-bold text-[#f0f6fc] mb-0.5">Taiwan Strait — Semiconductor Risk</h4>
                  <p className="text-[11px] text-[#8b949e] leading-relaxed">
                    Jan 12 at 08:43 UTC · Military posturing threatens 47% of semiconductor supply
                  </p>
                </div>

                {/* Live status indicators */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                    <span className="text-[10px] text-[#8b949e]">Exposure</span>
                    <span className="text-[10px] font-bold" style={{ color: activeWave >= 2 ? "#f87171" : "#484f58" }}>
                      {activeWave >= 2 ? "$1.8B across 3 units" : activeWave >= 1 ? "Mapping..." : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                    <span className="text-[10px] text-[#8b949e]">Controls</span>
                    <span className="text-[10px] font-bold" style={{ color: activeWave >= 3 ? "#fbbf24" : "#484f58" }}>
                      {activeWave >= 3 ? "2 of 3 active · Gap found" : activeWave >= 1 ? "Evaluating..." : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                    <span className="text-[10px] text-[#8b949e]">Governance</span>
                    <span className="text-[10px] font-bold" style={{ color: activeWave >= 4 ? "#22c55e" : "#484f58" }}>
                      {activeWave >= 4 ? "Committee alerted" : activeWave >= 1 ? "Pending" : "—"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                    <span className="text-[10px] text-[#8b949e]">Disclosure</span>
                    <span className="text-[10px] font-bold" style={{ color: activeWave >= 5 ? "#a78bfa" : "#484f58" }}>
                      {activeWave >= 5 ? "GC review initiated" : activeWave >= 1 ? "Not yet" : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Wave Detail */}
              {currentWave && <WaveDetailPanel wave={currentWave} />}

              {/* Start prompt */}
              {activeWave === 0 && (
                <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 text-center">
                  <div className="h-12 w-12 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center mx-auto mb-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                  <p className="text-sm text-[#8b949e] mb-1">
                    Press <span className="font-bold text-[#c9d1d9]">Play</span> to watch the risk propagate
                  </p>
                  <p className="text-[11px] text-[#484f58]">
                    Each wave shows what the system found and why it escalated further
                  </p>
                </div>
              )}

              {/* Narrative trail — visible after wave 1 */}
              {activeWave >= 1 && (
                <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Propagation narrative</div>
                  <div className="space-y-0">
                    {WAVES.filter((w) => w.id <= activeWave).map((w, idx) => (
                      <div key={w.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: w.color }} />
                          {idx < Math.min(activeWave, WAVES.length) - 1 && (
                            <div className="w-px flex-1 my-1" style={{ background: `${w.color}33` }} />
                          )}
                        </div>
                        <div className="pb-3 min-w-0">
                          <div className="text-[10px] font-bold" style={{ color: w.color }}>{w.title} <span className="font-normal text-[#6e7681]">{w.elapsed}</span></div>
                          <div className="text-[10px] text-[#8b949e] leading-relaxed mt-0.5">
                            {w.id < activeWave ? w.decision : w.finding}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — AI Risk Impact Simulator">
        <PrototypeControlLink href="/superhero/risk-analysis">
          ← Back to Simulator Home
        </PrototypeControlLink>
        <PrototypeControlLink href="/superhero/risk-gravity">
          Gravity Map →
        </PrototypeControlLink>
        <PrototypeControlLink href="/superhero/risk-pipeline">
          Risk Pipeline →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

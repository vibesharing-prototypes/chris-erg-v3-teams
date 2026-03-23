"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import SimulatorShell from "../components/SimulatorShell";
import { useSimulation } from "../SimulationContext";

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
    id: 1, title: "Signal Detected",
    finding: "Geopolitical escalation in Taiwan Strait threatens 47% of your semiconductor supply chain",
    decision: "Concentration exceeds risk threshold — mapping exposure across business units",
    color: "#f87171", glowColor: "#ef4444", bgColor: "#450a0a", borderColor: "#7f1d1d",
    timestamp: "08:43 UTC", elapsed: "+0 min",
    outputs: [
      { label: "Taiwan semiconductor suppliers flagged", value: "47% concentration", status: "complete" },
      { label: "3 of 5 key suppliers on negative credit watch", value: "Deteriorating", status: "complete" },
      { label: "Sector sovereign risk elevated", value: "Stable → Negative", status: "complete" },
    ],
    recommendation: "Review supplier diversification strategy with Supply Chain VP",
    action: { label: "Share signal with Supply Chain", person: "David Chen", role: "VP Supply Chain" },
  },
  {
    id: 2, title: "Exposure Mapped",
    finding: "3 business units affected — $1.8B in revenue depends on at-risk suppliers",
    decision: "Financial materiality confirmed — evaluating whether existing controls can absorb this",
    color: "#fb923c", glowColor: "#f97316", bgColor: "#431407", borderColor: "#9a3412",
    timestamp: "08:51 UTC", elapsed: "+8 min",
    outputs: [
      { label: "Product X manufacturing exposure", value: "$950M", status: "complete" },
      { label: "Product Y manufacturing exposure", value: "$850M", status: "complete" },
      { label: "Current inventory runway", value: "63 days", status: "active" },
    ],
    recommendation: "Initiate contingency sourcing for top-exposure product lines",
    action: { label: "Request contingency plan", person: "Sarah Lin", role: "Head of Operations" },
  },
  {
    id: 3, title: "Controls Assessed",
    finding: "Gap found — no secondary supplier qualified. 2 of 3 controls active but insufficient",
    decision: "Existing mitigations won\u2019t contain this — escalating to governance",
    color: "#fbbf24", glowColor: "#f59e0b", bgColor: "#422006", borderColor: "#92400e",
    timestamp: "09:02 UTC", elapsed: "+19 min",
    outputs: [
      { label: "Inventory buffer control", value: "Active", status: "active" },
      { label: "Geopolitical monitoring", value: "Active", status: "active" },
      { label: "Secondary supplier qualification", value: "Missing", status: "missing" },
    ],
    recommendation: "Prioritize secondary supplier qualification — this is the critical gap",
    action: { label: "Flag control gap for committee", person: "Marcus Webb", role: "Risk Committee Chair" },
  },
  {
    id: 4, title: "Governance Escalated",
    finding: "Materiality threshold exceeded — risk committee and CSCO automatically notified",
    decision: "Regulatory disclosure likely required — initiating disclosure assessment",
    color: "#60a5fa", glowColor: "#3b82f6", bgColor: "#1e3a5f", borderColor: "#1e40af",
    timestamp: "09:14 UTC", elapsed: "+31 min",
    outputs: [
      { label: "Risk owner notified (CSCO)", value: "Done", status: "complete" },
      { label: "Enterprise risk committee alert", value: "Triggered", status: "complete" },
      { label: "Scenario modeling", value: "Running", status: "pending" },
    ],
    recommendation: "Schedule emergency risk committee session within 24 hours",
    action: { label: "Convene Risk Committee", person: "Marcus Webb", role: "Risk Committee Chair" },
  },
  {
    id: 5, title: "Disclosure Required",
    finding: "2 of 3 peer companies have already disclosed Taiwan supply chain exposure",
    decision: "Delayed disclosure weakens legal defensibility — GC review initiated",
    color: "#a78bfa", glowColor: "#8b5cf6", bgColor: "#2e1065", borderColor: "#5b21b6",
    timestamp: "09:20 UTC", elapsed: "+37 min",
    outputs: [
      { label: "10-Q / 10-K risk factor update", value: "Flagged", status: "complete" },
      { label: "AI-drafted disclosure language", value: "Ready for review", status: "complete" },
      { label: "General Counsel review", value: "Pending", status: "pending" },
    ],
    recommendation: "Begin GC review of draft disclosure language within 48 hours",
    action: { label: "Send to General Counsel", person: "Diana Reyes", role: "General Counsel" },
  },
];

function StatusDot({ status }: { status?: string }) {
  const color = status === "active" || status === "complete" ? "#22c55e" : status === "missing" ? "#ef4444" : "#f59e0b";
  return <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />;
}

function ShockwaveRings({ activeWave, onSelectWave }: { activeWave: number; onSelectWave: (id: number) => void }) {
  const CX = 400, CY = 280, BASE_R = 40, RING_STEP = 48;

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
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </React.Fragment>
        ))}
        <radialGradient id="core-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
          <stop offset="60%" stopColor="#7f1d1d" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
        </radialGradient>
      </defs>

      <pattern id="sw-grid" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#21262d" strokeWidth="0.4" strokeOpacity="0.3" />
      </pattern>
      <rect x="-60" y="-20" width="920" height="620" fill="url(#sw-grid)" />

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
            <g key={w.id} onClick={() => onSelectWave(w.id)} className="cursor-pointer">
              {isReached && <circle cx={CX} cy={CY} r={r + 20} fill={`url(#sw-grad-${w.id})`} opacity={isActive ? 1 : 0.4} />}
              <circle cx={CX} cy={CY} r={r} fill="none" stroke={w.glowColor} strokeWidth={isActive ? 2.5 : isReached ? 1.5 : 0.5} strokeOpacity={isReached ? (isActive ? 0.9 : 0.4) : 0.12} strokeDasharray={isReached ? "none" : "4 8"} filter={isActive ? `url(#sw-glow-${w.id})` : undefined} />
              <line x1={CX + r * Math.cos(labelRad)} y1={CY + r * Math.sin(labelRad)} x2={lx} y2={ly} stroke={isReached ? w.color : "#30363d"} strokeWidth={0.8} strokeOpacity={isReached ? 0.5 : 0.2} />
              <g transform={`translate(${lx}, ${ly})`}>
                <rect x={labelOnLeft ? -labelW : 0} y="-12" width={labelW} height={isReached ? 32 : 22} rx="4" fill={isReached ? w.bgColor : "#161b22"} fillOpacity={isReached ? 0.92 : 0.6} stroke={isReached ? w.borderColor : "#30363d"} strokeWidth={isActive ? 1.5 : 0.5} />
                <text x={labelOnLeft ? -(labelW - 8) : 8} y="2" fill={isReached ? w.color : "#484f58"} fontSize="9.5" fontWeight={isActive ? "800" : "600"} letterSpacing="0.2">{titleText}</text>
                {isReached && <text x={labelOnLeft ? -(labelW - 8) : 8} y="15" fill="#8b949e" fontSize="7.5" fontWeight="500">{findingText}</text>}
              </g>
              {isReached && <text x={ex} y={ey} fill={w.color} fontSize="9" fontWeight="700" textAnchor="middle" opacity={0.7}>{w.elapsed}</text>}
              {isActive && (
                <circle cx={CX} cy={CY} r={r + 6} fill="none" stroke={w.glowColor} strokeWidth={1} strokeDasharray="6 6" strokeOpacity={0.4}>
                  <animateTransform attributeName="transform" type="rotate" from={`0 ${CX} ${CY}`} to={`360 ${CX} ${CY}`} dur="30s" repeatCount="indefinite" />
                </circle>
              )}
            </g>
          );
        });
      })()}

      <circle cx={CX} cy={CY} r={BASE_R} fill="url(#core-grad)" />
      <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.6" />
      <circle cx={CX} cy={CY} r={BASE_R * 0.55} fill="#7f1d1d" fillOpacity="0.5" stroke="#ef4444" strokeWidth="1" strokeOpacity="0.3" />
      <text x={CX} y={CY - 8} textAnchor="middle" fill="#f87171" fontSize="8" fontWeight="800" letterSpacing="1">EVENT</text>
      <text x={CX} y={CY + 6} textAnchor="middle" fill="#f0f6fc" fontSize="9" fontWeight="700">Taiwan Strait</text>
      <text x={CX} y={CY + 18} textAnchor="middle" fill="#8b949e" fontSize="7" fontWeight="600">Jan 12 · 08:43 UTC</text>

      {activeWave >= 1 && (
        <circle cx={CX} cy={CY} r={BASE_R} fill="none" stroke="#ef4444" strokeWidth="1" strokeOpacity="0">
          <animate attributeName="r" from={`${BASE_R}`} to={`${BASE_R + 25}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

function WaveDetailPanel({ wave }: { wave: Wave }) {
  return (
    <div className="rounded-xl border p-5 transition-all duration-300" style={{ borderColor: wave.borderColor, background: "#161b22" }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-9 w-9 rounded-lg flex items-center justify-center text-sm font-extrabold flex-shrink-0" style={{ background: wave.bgColor, color: wave.color, border: `1px solid ${wave.borderColor}` }}>{wave.id}</div>
        <div>
          <h3 className="text-sm font-bold text-[#f0f6fc]">{wave.title}</h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-semibold" style={{ color: wave.color }}>{wave.timestamp}</span>
            <span className="text-[10px] text-[#6e7681]">{wave.elapsed}</span>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-1.5">What we found</div>
        <p className="text-xs text-[#f0f6fc] leading-relaxed font-medium">{wave.finding}</p>
      </div>
      <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-1.5">Why it matters</div>
        <p className="text-xs text-[#c9d1d9] leading-relaxed">{wave.decision}</p>
      </div>
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
      <div className="rounded-lg border border-[#1f6feb]/30 bg-[#1f6feb]/5 p-3 mb-3">
        <div className="text-[9px] font-bold uppercase tracking-widest text-[#58a6ff] mb-1.5">Recommended action</div>
        <p className="text-xs text-[#c9d1d9] leading-relaxed">{wave.recommendation}</p>
      </div>
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

function PlaybackControls({ activeWave, isPlaying, onPlay, onPause, onStep, onReset }: { activeWave: number; isPlaying: boolean; onPlay: () => void; onPause: () => void; onStep: (dir: number) => void; onReset: () => void }) {
  const btnCls = "h-9 rounded-lg border border-[#30363d] bg-[#161b22] px-3 text-xs font-semibold text-[#c9d1d9] hover:bg-[#21262d] hover:text-[#f0f6fc] transition-colors flex items-center gap-1.5";

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
      <div className="ml-3 flex items-center gap-1.5">
        {WAVES.map((w) => (
          <div key={w.id} className="h-2 rounded-full transition-all duration-300" style={{ width: w.id === activeWave ? 20 : 8, background: w.id <= activeWave ? w.glowColor : "#30363d", opacity: w.id <= activeWave ? 1 : 0.4 }} />
        ))}
      </div>
      <span className="ml-2 text-[11px] text-[#6e7681] font-medium tabular-nums">Wave {activeWave} / {WAVES.length}</span>
    </div>
  );
}

export default function RiskShockwavePage() {
  const { result } = useSimulation();
  const router = useRouter();

  const wavesData = result?.shockwave?.waves ?? WAVES;
  const eventName = result?.shockwave?.eventName ?? "Taiwan Strait";
  const eventDate = result?.shockwave?.eventDate ?? "Jan 12";

  const [activeWave, setActiveWave] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const step = useCallback((dir: number) => {
    setActiveWave((prev) => Math.max(0, Math.min(wavesData.length, prev + dir)));
  }, [wavesData.length]);

  useEffect(() => {
    if (!isPlaying) return;
    if (activeWave >= wavesData.length) { setIsPlaying(false); return; }
    const timer = setTimeout(() => step(1), 1800);
    return () => clearTimeout(timer);
  }, [isPlaying, activeWave, step, wavesData.length]);

  if (!result) {
    router.push("/risk-simulator");
    return null;
  }

  const handlePlay = () => {
    if (activeWave >= wavesData.length) setActiveWave(0);
    setIsPlaying(true);
  };

  const currentWave = wavesData.find((w) => w.id === activeWave) ?? null;

  return (
    <SimulatorShell breadcrumb="Risk Shockwave">
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

      <div className="mb-5 flex items-center justify-between">
        <PlaybackControls activeWave={activeWave} isPlaying={isPlaying} onPlay={handlePlay} onPause={() => setIsPlaying(false)} onStep={step} onReset={() => { setIsPlaying(false); setActiveWave(0); }} />
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-2 mb-5">
            <ShockwaveRings activeWave={activeWave} onSelectWave={(id) => { setIsPlaying(false); setActiveWave(id); }} />
          </div>

          {activeWave >= 5 && (
            <div className="space-y-4 transition-all duration-500">
              <div className="rounded-xl border border-[#5b21b6] bg-[#2e1065]/30 p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-[#2e1065] border border-[#7c3aed] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
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
                      <div className="w-5 h-5 rounded-full bg-[#f87171]/20 flex items-center justify-center flex-shrink-0"><span className="text-[9px] font-bold text-[#f87171]">1</span></div>
                      <span className="text-xs text-[#c9d1d9] flex-1">Qualify a secondary semiconductor supplier to close the critical control gap</span>
                      <span className="text-[10px] text-[#f87171] font-semibold flex-shrink-0">Urgent</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-[#0d1117]/60 border border-[#30363d] px-3.5 py-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#fbbf24]/20 flex items-center justify-center flex-shrink-0"><span className="text-[9px] font-bold text-[#fbbf24]">2</span></div>
                      <span className="text-xs text-[#c9d1d9] flex-1">Convene emergency risk committee session within 24 hours</span>
                      <span className="text-[10px] text-[#fbbf24] font-semibold flex-shrink-0">High</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-[#0d1117]/60 border border-[#30363d] px-3.5 py-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#60a5fa]/20 flex items-center justify-center flex-shrink-0"><span className="text-[9px] font-bold text-[#60a5fa]">3</span></div>
                      <span className="text-xs text-[#c9d1d9] flex-1">General Counsel to review AI-drafted disclosure language within 48 hours</span>
                      <span className="text-[10px] text-[#60a5fa] font-semibold flex-shrink-0">Required</span>
                    </div>
                  </div>
                </div>
              </div>
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

        <div className="w-[360px] flex-shrink-0 space-y-4">
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
            <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Origin Event</div>
            <div className="rounded-lg border border-[#7f1d1d] bg-[#450a0a]/40 p-3 mb-3">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ef4444] animate-pulse" />
                <span className="text-[10px] font-bold text-[#f87171]">GEOPOLITICAL ESCALATION</span>
              </div>
              <h4 className="text-[13px] font-bold text-[#f0f6fc] mb-0.5">Taiwan Strait — Semiconductor Risk</h4>
              <p className="text-[11px] text-[#8b949e] leading-relaxed">Jan 12 at 08:43 UTC · Military posturing threatens 47% of semiconductor supply</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                <span className="text-[10px] text-[#8b949e]">Exposure</span>
                <span className="text-[10px] font-bold" style={{ color: activeWave >= 2 ? "#f87171" : "#484f58" }}>{activeWave >= 2 ? "$1.8B across 3 units" : activeWave >= 1 ? "Mapping..." : "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                <span className="text-[10px] text-[#8b949e]">Controls</span>
                <span className="text-[10px] font-bold" style={{ color: activeWave >= 3 ? "#fbbf24" : "#484f58" }}>{activeWave >= 3 ? "2 of 3 active · Gap found" : activeWave >= 1 ? "Evaluating..." : "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                <span className="text-[10px] text-[#8b949e]">Governance</span>
                <span className="text-[10px] font-bold" style={{ color: activeWave >= 4 ? "#22c55e" : "#484f58" }}>{activeWave >= 4 ? "Committee alerted" : activeWave >= 1 ? "Pending" : "—"}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-1.5">
                <span className="text-[10px] text-[#8b949e]">Disclosure</span>
                <span className="text-[10px] font-bold" style={{ color: activeWave >= 5 ? "#a78bfa" : "#484f58" }}>{activeWave >= 5 ? "GC review initiated" : activeWave >= 1 ? "Not yet" : "—"}</span>
              </div>
            </div>
          </div>

          {currentWave && <WaveDetailPanel wave={currentWave} />}

          {activeWave === 0 && (
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 text-center">
              <div className="h-12 w-12 rounded-full bg-[#21262d] border border-[#30363d] flex items-center justify-center mx-auto mb-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="1.5"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <p className="text-sm text-[#8b949e] mb-1">Press <span className="font-bold text-[#c9d1d9]">Play</span> to watch the risk propagate</p>
              <p className="text-[11px] text-[#484f58]">Each wave shows what the system found and why it escalated further</p>
            </div>
          )}

          {activeWave >= 1 && (
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Propagation narrative</div>
              <div className="space-y-0">
                {WAVES.filter((w) => w.id <= activeWave).map((w, idx) => (
                  <div key={w.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5" style={{ background: w.color }} />
                      {idx < Math.min(activeWave, WAVES.length) - 1 && <div className="w-px flex-1 my-1" style={{ background: `${w.color}33` }} />}
                    </div>
                    <div className="pb-3 min-w-0">
                      <div className="text-[10px] font-bold" style={{ color: w.color }}>{w.title} <span className="font-normal text-[#6e7681]">{w.elapsed}</span></div>
                      <div className="text-[10px] text-[#8b949e] leading-relaxed mt-0.5">{w.id < activeWave ? w.decision : w.finding}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </SimulatorShell>
  );
}

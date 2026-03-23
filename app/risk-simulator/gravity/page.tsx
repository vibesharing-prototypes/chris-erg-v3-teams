"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SimulatorShell from "../components/SimulatorShell";
import { useSimulation } from "../SimulationContext";

type RiskId = string;

interface BusinessNode {
  label: string;
  revenue: string;
  angle: number;
  distance: number;
}

interface Control {
  label: string;
  active: boolean;
}

interface Risk {
  id: RiskId;
  title: string;
  shortTitle: string;
  exposure: number;
  severity: "Critical" | "High" | "Medium";
  controlStrength: number;
  residualRisk: number;
  region: string;
  nodes: BusinessNode[];
  controls: Control[];
  description: string;
}

const RISKS: Risk[] = [
  {
    id: "taiwan",
    title: "Taiwan Strait Semiconductor Risk",
    shortTitle: "Taiwan Strait",
    exposure: 1800,
    severity: "Critical",
    controlStrength: 45,
    residualRisk: 82,
    region: "Asia-Pacific",
    description: "Escalating geopolitical tensions threaten 47% of semiconductor supply. Disruption could halt production across two major product lines with 6–12 month lead-time extensions.",
    nodes: [
      { label: "Product X", revenue: "$950M", angle: -30, distance: 1 },
      { label: "Product Y", revenue: "$850M", angle: 30, distance: 1 },
    ],
    controls: [
      { label: "Inventory Buffer (90 days)", active: true },
      { label: "Geopolitical Monitoring", active: true },
      { label: "Secondary Supplier", active: false },
    ],
  },
  {
    id: "energy",
    title: "Energy Price Volatility",
    shortTitle: "Energy Prices",
    exposure: 900,
    severity: "High",
    controlStrength: 60,
    residualRisk: 55,
    region: "Global",
    description: "Volatile energy markets driven by OPEC policy shifts and renewables transition uncertainty. Manufacturing costs directly exposed across 3 factory regions.",
    nodes: [
      { label: "Factory Ops", revenue: "$520M", angle: -25, distance: 1 },
      { label: "Logistics", revenue: "$380M", angle: 35, distance: 1 },
    ],
    controls: [
      { label: "Hedging Program", active: true },
      { label: "Energy Diversification", active: true },
      { label: "Demand Response", active: false },
    ],
  },
  {
    id: "eu",
    title: "EU Regulatory Compliance Risk",
    shortTitle: "EU Compliance",
    exposure: 700,
    severity: "High",
    controlStrength: 35,
    residualRisk: 68,
    region: "Europe",
    description: "EC enforcement actions against 3 sector peers for DMA non-compliance. Pattern analysis suggests our EU operations face similar scrutiny within 6 months.",
    nodes: [
      { label: "Data Hosting", revenue: "$410M", angle: -20, distance: 1 },
      { label: "Customer Storage", revenue: "$290M", angle: 40, distance: 1 },
    ],
    controls: [
      { label: "Compliance Monitoring", active: true },
      { label: "DMA Gap Assessment", active: false },
      { label: "EU Legal Counsel", active: true },
    ],
  },
];

interface Simulation {
  id: string;
  label: string;
  riskId: RiskId;
  exposureDelta: number;
  residualDelta: number;
  controlDelta: number;
}

const SIMULATIONS: Simulation[] = [
  { id: "taiwan-halt", label: "Simulate 90-day Taiwan export halt", riskId: "taiwan", exposureDelta: 400, residualDelta: 12, controlDelta: -15 },
  { id: "add-supplier", label: "Add secondary supplier control", riskId: "taiwan", exposureDelta: -350, residualDelta: -25, controlDelta: 20 },
  { id: "recalc", label: "Recalculate residual exposure", riskId: "taiwan", exposureDelta: -150, residualDelta: -10, controlDelta: 8 },
];

const SEVERITY_COLORS: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  Critical: { text: "#f87171", bg: "#450a0a", border: "#7f1d1d", glow: "#ef4444" },
  High: { text: "#fbbf24", bg: "#422006", border: "#92400e", glow: "#f59e0b" },
  Medium: { text: "#60a5fa", bg: "#1e3a5f", border: "#1e40af", glow: "#3b82f6" },
};

function fmt(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}B`;
  return `$${n}M`;
}

function GravityMap({ risks, selected, onSelect }: { risks: Risk[]; selected: RiskId; onSelect: (id: RiskId) => void }) {
  const W = 900;
  const H = 520;
  const wells: Array<{ risk: Risk; cx: number; cy: number; r: number }> = [
    { risk: risks[0], cx: 320, cy: 250, r: 90 },
    { risk: risks[1], cx: 660, cy: 180, r: 60 },
    { risk: risks[2], cx: 620, cy: 370, r: 52 },
  ];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {wells.map((w) => {
          const sc = SEVERITY_COLORS[w.risk.severity];
          return (
            <React.Fragment key={w.risk.id}>
              <radialGradient id={`grad-${w.risk.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={sc.glow} stopOpacity="0.25" />
                <stop offset="50%" stopColor={sc.glow} stopOpacity="0.08" />
                <stop offset="100%" stopColor={sc.glow} stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`core-${w.risk.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={sc.glow} stopOpacity="0.4" />
                <stop offset="70%" stopColor={sc.bg} stopOpacity="0.9" />
                <stop offset="100%" stopColor="#161b22" stopOpacity="1" />
              </radialGradient>
              <filter id={`glow-${w.risk.id}`}>
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </React.Fragment>
          );
        })}
        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#30363d" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#30363d" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#30363d" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#21262d" strokeWidth="0.5" strokeOpacity="0.4" />
      </pattern>
      <rect width={W} height={H} fill="url(#grid)" rx="12" />

      {wells.map((w) => {
        const isSel = w.risk.id === selected;
        return (
          <React.Fragment key={`field-${w.risk.id}`}>
            <circle cx={w.cx} cy={w.cy} r={w.r * 2.8} fill={`url(#grad-${w.risk.id})`} opacity={isSel ? 1 : 0.6} />
            {[2.2, 1.7, 1.3].map((m, i) => (
              <circle key={i} cx={w.cx} cy={w.cy} r={w.r * m} fill="none" stroke={SEVERITY_COLORS[w.risk.severity].glow} strokeWidth={0.5} strokeOpacity={isSel ? 0.25 - i * 0.06 : 0.12 - i * 0.03} strokeDasharray="4 6" />
            ))}
          </React.Fragment>
        );
      })}

      {wells.map((w) => {
        const sc = SEVERITY_COLORS[w.risk.severity];
        return w.risk.nodes.map((node, ni) => {
          const a = (node.angle * Math.PI) / 180;
          const dist = w.r * 1.9;
          const nx = w.cx + Math.cos(a) * dist;
          const ny = w.cy + Math.sin(a) * dist;
          return <line key={`${w.risk.id}-${ni}`} x1={w.cx} y1={w.cy} x2={nx} y2={ny} stroke={sc.glow} strokeWidth={w.risk.id === selected ? 1.5 : 0.8} strokeOpacity={w.risk.id === selected ? 0.5 : 0.2} strokeDasharray="3 5" />;
        });
      })}

      {wells.map((w) => {
        const sc = SEVERITY_COLORS[w.risk.severity];
        const isSel = w.risk.id === selected;
        return w.risk.nodes.map((node, ni) => {
          const a = (node.angle * Math.PI) / 180;
          const dist = w.r * 1.9;
          const nx = w.cx + Math.cos(a) * dist;
          const ny = w.cy + Math.sin(a) * dist;
          return (
            <g key={`node-${w.risk.id}-${ni}`} opacity={isSel ? 1 : 0.65}>
              <circle cx={nx} cy={ny} r={26} fill="#161b22" stroke={sc.border} strokeWidth={isSel ? 1.5 : 1} />
              <text x={nx} y={ny - 5} textAnchor="middle" fill={sc.text} fontSize="9" fontWeight="600">{node.label}</text>
              <text x={nx} y={ny + 8} textAnchor="middle" fill="#f0f6fc" fontSize="11" fontWeight="800">{node.revenue}</text>
            </g>
          );
        });
      })}

      {wells.map((w) => {
        const sc = SEVERITY_COLORS[w.risk.severity];
        const isSel = w.risk.id === selected;
        return (
          <g key={`well-${w.risk.id}`} onClick={() => onSelect(w.risk.id)} className="cursor-pointer" filter={isSel ? `url(#glow-${w.risk.id})` : undefined}>
            <circle cx={w.cx} cy={w.cy} r={w.r} fill={`url(#core-${w.risk.id})`} stroke={sc.glow} strokeWidth={isSel ? 2 : 1} strokeOpacity={isSel ? 0.8 : 0.4} />
            <circle cx={w.cx} cy={w.cy} r={w.r * 0.6} fill="none" stroke={sc.glow} strokeWidth={0.5} strokeOpacity={0.2} />
            <text x={w.cx} y={w.cy - 14} textAnchor="middle" fill="#f0f6fc" fontSize={w.r > 70 ? "22" : "16"} fontWeight="800">{fmt(w.risk.exposure)}</text>
            <text x={w.cx} y={w.cy + 6} textAnchor="middle" fill={sc.text} fontSize={w.r > 70 ? "11" : "9"} fontWeight="700" letterSpacing="0.5">{w.risk.shortTitle.toUpperCase()}</text>
            <text x={w.cx} y={w.cy + 22} textAnchor="middle" fill={sc.text} fontSize="8" fontWeight="600" opacity="0.7">{w.risk.severity.toUpperCase()}</text>
            {isSel && (
              <circle cx={w.cx} cy={w.cy} r={w.r + 4} fill="none" stroke={sc.glow} strokeWidth={1.5} strokeDasharray="4 4" strokeOpacity={0.6}>
                <animateTransform attributeName="transform" type="rotate" from={`0 ${w.cx} ${w.cy}`} to={`360 ${w.cx} ${w.cy}`} dur="20s" repeatCount="indefinite" />
              </circle>
            )}
          </g>
        );
      })}

      <g transform="translate(20, 20)">
        <rect width="130" height="70" rx="8" fill="#161b22" fillOpacity="0.85" stroke="#30363d" strokeWidth="0.5" />
        <circle cx="16" cy="18" r="5" fill="#ef4444" fillOpacity="0.6" />
        <text x="28" y="22" fill="#8b949e" fontSize="9">Critical Exposure</text>
        <circle cx="16" cy="38" r="5" fill="#f59e0b" fillOpacity="0.6" />
        <text x="28" y="42" fill="#8b949e" fontSize="9">High Exposure</text>
        <circle cx="16" cy="58" r="4" fill="#30363d" stroke="#6e7681" strokeWidth="0.5" />
        <text x="28" y="62" fill="#8b949e" fontSize="9">Business Asset</text>
      </g>
    </svg>
  );
}

function DetailPanel({ risk, simActive }: { risk: Risk; simActive: Set<string> }) {
  const sc = SEVERITY_COLORS[risk.severity];
  let exposure = risk.exposure;
  let residual = risk.residualRisk;
  let control = risk.controlStrength;

  SIMULATIONS.forEach((sim) => {
    if (simActive.has(sim.id) && sim.riskId === risk.id) {
      exposure += sim.exposureDelta;
      residual = Math.max(0, Math.min(100, residual + sim.residualDelta));
      control = Math.max(0, Math.min(100, control + sim.controlDelta));
    }
  });

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ color: sc.text, background: sc.bg, border: `1px solid ${sc.border}` }}>{risk.severity}</span>
          <span className="text-[10px] font-semibold text-[#6e7681] uppercase tracking-wider">{risk.region}</span>
        </div>
        <h3 className="text-base font-bold text-[#f0f6fc] mb-1">{risk.title}</h3>
        <p className="text-xs text-[#8b949e] leading-relaxed">{risk.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 text-center">
          <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Exposure</div>
          <div className="text-lg font-extrabold text-[#f0f6fc]">{fmt(exposure)}</div>
        </div>
        <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 text-center">
          <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Controls</div>
          <div className="text-lg font-extrabold" style={{ color: control >= 60 ? "#22c55e" : control >= 40 ? "#fbbf24" : "#f87171" }}>{control}%</div>
        </div>
        <div className="rounded-lg border border-[#21262d] bg-[#0d1117] p-3 text-center">
          <div className="text-[10px] font-semibold text-[#6e7681] uppercase mb-1">Residual</div>
          <div className="text-lg font-extrabold" style={{ color: residual >= 70 ? "#f87171" : residual >= 40 ? "#fbbf24" : "#22c55e" }}>{residual}%</div>
        </div>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Impacted Business Areas</div>
        <div className="space-y-1.5">
          {risk.nodes.map((n) => (
            <div key={n.label} className="flex items-center justify-between rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2">
              <span className="text-xs font-medium text-[#c9d1d9]">{n.label}</span>
              <span className="text-xs font-bold text-[#f0f6fc]">{n.revenue}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">Controls</div>
        <div className="space-y-1.5">
          {risk.controls.map((c) => (
            <div key={c.label} className="flex items-center gap-2.5 rounded-lg border px-3 py-2" style={{ borderColor: c.active ? "#065f46" : "#7f1d1d50", background: c.active ? "#052e1640" : "#450a0a20" }}>
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: c.active ? "#22c55e" : "#ef4444" }} />
              <span className="text-xs" style={{ color: c.active ? "#34d399" : "#fca5a5" }}>{c.label}</span>
              <span className="ml-auto text-[10px] font-semibold uppercase" style={{ color: c.active ? "#065f46" : "#7f1d1d" }}>{c.active ? "Active" : "Missing"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GravityMapPage() {
  const { result } = useSimulation();
  const router = useRouter();

  const dynamicRisks: Risk[] | null = result?.gravity?.risks?.map((r) => ({
    ...r,
    severity: r.severity as "Critical" | "High" | "Medium",
    nodes: r.nodes.map((n) => ({ ...n, distance: 1 })),
  })) ?? null;
  const dynamicSims = result?.gravity?.simulations ?? null;

  const risksData = dynamicRisks ?? RISKS;
  const simsData = dynamicSims ?? SIMULATIONS;

  const [selected, setSelected] = useState<RiskId>(risksData[0]?.id ?? "taiwan");
  const [simActive, setSimActive] = useState<Set<string>>(new Set());

  if (!result) {
    router.push("/risk-simulator");
    return null;
  }

  const toggleSim = (id: string) => {
    setSimActive((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applySimulations = (risk: Risk) => {
    let exposure = risk.exposure;
    simsData.forEach((sim) => {
      if (simActive.has(sim.id) && sim.riskId === risk.id) {
        exposure += sim.exposureDelta;
      }
    });
    return { ...risk, exposure };
  };

  const modifiedRisks = risksData.map(applySimulations);
  const totalExposure = modifiedRisks.reduce((s, r) => s + r.exposure, 0);
  const selectedRisk = risksData.find((r) => r.id === selected)!;

  return (
    <SimulatorShell breadcrumb="Gravity Map">
      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-xl font-bold text-[#f0f6fc]">Gravity Map</h1>
      </div>
      <p className="text-sm text-[#8b949e] mb-4">
        Visualize how major enterprise risks pull financial exposure into their orbit — stronger gravity means higher impact
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
          <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Total Exposure</span>
          <span className="text-sm font-extrabold text-[#f0f6fc]">{fmt(totalExposure)}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
          <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Material Risks</span>
          <span className="text-sm font-extrabold text-[#f87171]">3</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#0d1117] px-3.5 py-2">
          <span className="text-[10px] font-semibold text-[#6e7681] uppercase">Highest Concentration</span>
          <span className="text-sm font-extrabold text-[#fbbf24]">Asia-Pacific</span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <div className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4 mb-5">
            <GravityMap risks={modifiedRisks} selected={selected} onSelect={setSelected} />
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-7 w-7 rounded-lg bg-[#2e1065] border border-[#5b21b6] flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#f0f6fc]">Scenario Simulation</h3>
                <p className="text-[11px] text-[#6e7681]">Toggle scenarios to see how exposure and controls shift</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {simsData.map((sim) => {
                const active = simActive.has(sim.id);
                return (
                  <button key={sim.id} onClick={() => toggleSim(sim.id)} className="rounded-lg border p-3 text-left transition-all" style={{ borderColor: active ? "#7c3aed" : "#30363d", background: active ? "#2e106540" : "#0d1117" }}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0" style={{ borderColor: active ? "#a78bfa" : "#484f58", background: active ? "#7c3aed" : "transparent" }}>
                        {active && <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <span className="text-xs font-medium" style={{ color: active ? "#c4b5fd" : "#8b949e" }}>{sim.label}</span>
                    </div>
                    <div className="flex items-center gap-2 pl-5">
                      <span className="text-[10px]" style={{ color: sim.exposureDelta > 0 ? "#f87171" : "#34d399" }}>{sim.exposureDelta > 0 ? "+" : ""}{fmt(Math.abs(sim.exposureDelta))} exposure</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button className="flex-1 rounded-lg bg-gradient-to-r from-[#2563eb] to-[#3b82f6] px-4 py-2.5 text-xs font-bold text-white hover:from-[#1d4ed8] hover:to-[#2563eb] transition-all shadow-lg shadow-blue-500/20">Share Gravity Analysis</button>
            <button className="flex-1 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2.5 text-xs font-bold text-[#c9d1d9] hover:border-[#484f58] hover:bg-[#1c2128] transition-all">Export to Committee Deck</button>
          </div>
        </div>

        <div className="w-[340px] flex-shrink-0">
          <div className="flex gap-2 mb-4">
            {risksData.map((r) => {
              const sc = SEVERITY_COLORS[r.severity];
              const isSel = r.id === selected;
              return (
                <button key={r.id} onClick={() => setSelected(r.id)} className="flex-1 rounded-lg border px-2 py-2 text-center transition-all" style={{ borderColor: isSel ? sc.glow : "#30363d", background: isSel ? sc.bg : "#161b22" }}>
                  <div className="text-[10px] font-bold" style={{ color: isSel ? sc.text : "#6e7681" }}>{r.shortTitle}</div>
                  <div className="text-xs font-extrabold mt-0.5" style={{ color: isSel ? "#f0f6fc" : "#8b949e" }}>{fmt(r.exposure)}</div>
                </button>
              );
            })}
          </div>

          <DetailPanel risk={selectedRisk} simActive={simActive} />

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-lg bg-[#0c2d6b] border border-[#1e40af] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
              </div>
              <h4 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider">What This Tells You</h4>
            </div>
            <p className="text-xs text-[#8b949e] leading-relaxed">
              Taiwan Strait pulls the most financial weight — $1.8B in exposure with the weakest control coverage (45%). Energy and EU compliance risks compound the picture, but Taiwan is where the gap between exposure and protection is widest.
            </p>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-6 w-6 rounded-lg bg-[#14532d] border border-[#166534] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
              </div>
              <h4 className="text-xs font-bold text-[#f0f6fc] uppercase tracking-wider">Recommended Actions</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2.5">
                <span className="mt-0.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#450a0a] text-[#f87171] border border-[#7f1d1d] flex-shrink-0">Urgent</span>
                <span className="text-xs text-[#c9d1d9] leading-relaxed">Close the secondary supplier gap</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2.5">
                <span className="mt-0.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#422006] text-[#fbbf24] border border-[#92400e] flex-shrink-0">High</span>
                <span className="text-xs text-[#c9d1d9] leading-relaxed">Run the 90-day export halt scenario to quantify worst case</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2.5">
                <span className="mt-0.5 inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[#1e3a5f] text-[#60a5fa] border border-[#1e40af] flex-shrink-0">Recommended</span>
                <span className="text-xs text-[#c9d1d9] leading-relaxed">Share gravity analysis with risk committee</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 mt-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-3">Involve</div>
            <div className="space-y-2">
              <div className="flex items-center gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2.5">
                <div className="h-7 w-7 rounded-full bg-[#1e3a5f] border border-[#1e40af] flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-[#60a5fa]">DC</span></div>
                <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-[#c9d1d9]">David Chen</div><div className="text-[10px] text-[#6e7681]">VP Supply Chain</div></div>
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[10px] font-semibold text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58] transition-colors">Notify</button>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] px-3 py-2.5">
                <div className="h-7 w-7 rounded-full bg-[#2e1065] border border-[#5b21b6] flex items-center justify-center flex-shrink-0"><span className="text-[10px] font-bold text-[#a78bfa]">MW</span></div>
                <div className="flex-1 min-w-0"><div className="text-xs font-semibold text-[#c9d1d9]">Marcus Webb</div><div className="text-[10px] text-[#6e7681]">Risk Committee Chair</div></div>
                <button className="rounded-md border border-[#30363d] bg-[#21262d] px-2.5 py-1 text-[10px] font-semibold text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58] transition-colors">Notify</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SimulatorShell>
  );
}

"use client";

/* ------------------------------------------------------------------ */
/*  MOODY'S EVIDENCE LAYER — Shared Components                        */
/*                                                                     */
/*  Where Moody's influences each view:                                */
/*                                                                     */
/*  1. Risk Discovery — source attribution chips on risk cards;        */
/*     stats banner adjusts coverage metrics with/without Moody's      */
/*  2. Risk Shockwave — financial vulnerability annotations inside     */
/*     wave detail panels (supplier credit, sector stress, default     */
/*     likelihood); Moody's evidence card after wave 2+                */
/*  3. Risk Gravity Map — external risk indicators panel in detail     */
/*     sidebar (sector stress, credit watch, concentration risk);      */
/*     header stat shows Moody's intelligence source count             */
/*  4. GC Command Center — External Risk Evidence module with          */
/*     Moody's industry outlook, credit signal, concentration insight  */
/*  5. Risk-to-Disclosure Pipeline — Moody's inputs at Stage 1         */
/*     (signal detection), Stage 2 (exposure mapping), Stage 6         */
/*     (disclosure assessment); Moody's evidence artifacts in drawer   */
/* ------------------------------------------------------------------ */

import React, { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "prototype-moodys-mode";

/**
 * Shared hook — returns [withMoodys, toggle].
 * Persists to localStorage so the choice survives navigation.
 */
export function useMoodysMode(): [boolean, () => void] {
  const [on, setOn] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (stored === "off") setOn(false);
  }, []);

  const toggle = useCallback(() => {
    setOn((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
      return next;
    });
  }, []);

  return [on, toggle];
}

/**
 * Compact toggle bar. Sits at the top of pages that have Moody's integration.
 * Dark-mode styling to match the prototype chrome.
 */
export function MoodysToggle({
  withMoodys,
  onToggle,
}: {
  withMoodys: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#21262d] bg-[#161b22]">
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6e7681]">
            Data Partnership Mode
          </span>
          <div className="flex items-center rounded-lg border border-[#30363d] overflow-hidden">
            <button
              onClick={withMoodys ? undefined : onToggle}
              className={`h-7 px-3 text-[11px] font-semibold transition-colors flex items-center gap-1.5 ${
                withMoodys
                  ? "bg-[#238636] text-white border-r border-[#2ea043]"
                  : "bg-[#0d1117] text-[#8b949e] hover:text-[#c9d1d9] border-r border-[#30363d]"
              }`}
            >
              <MoodysLogo size={12} />
              With Moody&apos;s
            </button>
            <button
              onClick={withMoodys ? onToggle : undefined}
              className={`h-7 px-3 text-[11px] font-semibold transition-colors ${
                !withMoodys
                  ? "bg-[#da3633]/20 text-[#f85149]"
                  : "bg-[#0d1117] text-[#8b949e] hover:text-[#c9d1d9]"
              }`}
            >
              Without Moody&apos;s
            </button>
          </div>
        </div>

        {!withMoodys && (
          <span className="text-[10px] text-[#f85149] font-medium">
            Moody&apos;s data layer disabled — reduced coverage and confidence
          </span>
        )}
        {withMoodys && (
          <span className="text-[10px] text-[#3fb950] font-medium flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
            Moody&apos;s credit intelligence active
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Light-mode variant of the toggle for pages with white backgrounds.
 */
export function MoodysToggleLight({
  withMoodys,
  onToggle,
}: {
  withMoodys: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-[#e5e7eb] bg-white">
      <div className="max-w-[1400px] mx-auto px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]">
            Data Partnership Mode
          </span>
          <div className="flex items-center rounded-lg border border-[#d1d5db] overflow-hidden">
            <button
              onClick={withMoodys ? undefined : onToggle}
              className={`h-7 px-3 text-[11px] font-semibold transition-colors flex items-center gap-1.5 ${
                withMoodys
                  ? "bg-[#16a34a] text-white border-r border-[#15803d]"
                  : "bg-white text-[#6b7280] hover:text-[#374151] border-r border-[#d1d5db]"
              }`}
            >
              <MoodysLogo size={12} />
              With Moody&apos;s
            </button>
            <button
              onClick={withMoodys ? onToggle : undefined}
              className={`h-7 px-3 text-[11px] font-semibold transition-colors ${
                !withMoodys
                  ? "bg-[#fef2f2] text-[#dc2626]"
                  : "bg-white text-[#6b7280] hover:text-[#374151]"
              }`}
            >
              Without Moody&apos;s
            </button>
          </div>
        </div>

        {!withMoodys && (
          <span className="text-[10px] text-[#dc2626] font-medium">
            Moody&apos;s data layer disabled — reduced coverage and confidence
          </span>
        )}
        {withMoodys && (
          <span className="text-[10px] text-[#16a34a] font-medium flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
            Moody&apos;s credit intelligence active
          </span>
        )}
      </div>
    </div>
  );
}

/** Compact Moody's wordmark */
export function MoodysLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#002B5C" />
      <text x="12" y="16" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Arial, sans-serif">
        M
      </text>
    </svg>
  );
}

/** Small inline Moody's badge for use inside cards */
export function MoodysBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#002B5C] px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
      <MoodysLogo size={10} />
      Moody&apos;s
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Reusable Evidence Components                                       */
/* ------------------------------------------------------------------ */

/** Source chip — e.g. "Moody's sector outlook" — dark mode */
export function MoodysSourceChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#002B5C]/50 bg-[#002B5C]/15 px-2 py-0.5 text-[9px] font-semibold text-[#79c0ff]">
      <MoodysLogo size={9} />
      {label}
    </span>
  );
}

/** Source chip — light variant for white backgrounds */
export function MoodysSourceChipLight({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[#002B5C]/20 bg-[#002B5C]/5 px-2 py-0.5 text-[9px] font-semibold text-[#002B5C]">
      <MoodysLogo size={9} />
      {label}
    </span>
  );
}

/** Evidence card — concise Moody's intelligence insight (dark mode) */
export function MoodysEvidenceCard({
  title,
  detail,
  type,
}: {
  title: string;
  detail: string;
  type?: string;
}) {
  return (
    <div className="rounded-lg border border-[#002B5C]/40 bg-[#002B5C]/10 p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <MoodysLogo size={12} />
        <span className="text-[10px] font-bold text-[#79c0ff] uppercase tracking-wider">
          {type ?? "Moody\u2019s Intelligence"}
        </span>
      </div>
      <div className="text-xs font-semibold text-[#c9d1d9] mb-0.5">{title}</div>
      <p className="text-[11px] text-[#8b949e] leading-relaxed">{detail}</p>
    </div>
  );
}

/** Evidence card — light variant */
export function MoodysEvidenceCardLight({
  title,
  detail,
  type,
}: {
  title: string;
  detail: string;
  type?: string;
}) {
  return (
    <div className="rounded-lg border border-[#002B5C]/15 bg-[#f0f4f8] p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <MoodysLogo size={12} />
        <span className="text-[10px] font-bold text-[#002B5C] uppercase tracking-wider">
          {type ?? "Moody\u2019s Intelligence"}
        </span>
      </div>
      <div className="text-xs font-semibold text-[#1e293b] mb-0.5">{title}</div>
      <p className="text-[11px] text-[#64748b] leading-relaxed">{detail}</p>
    </div>
  );
}

/** Confidence rationale panel — shows how Moody's data impacts confidence */
export function MoodysConfidencePanel({
  items,
}: {
  items: Array<{ label: string; status: "confirmed" | "elevated" | "warning" }>;
}) {
  const statusStyles = {
    confirmed: { color: "#34d399", icon: "✓", bg: "#052e16", border: "#065f46" },
    elevated: { color: "#fbbf24", icon: "▲", bg: "#422006", border: "#92400e" },
    warning: { color: "#f87171", icon: "!", bg: "#450a0a", border: "#7f1d1d" },
  };
  return (
    <div className="rounded-lg border border-[#002B5C]/30 bg-[#0d1117] p-3">
      <div className="flex items-center gap-2 mb-2.5">
        <MoodysLogo size={12} />
        <span className="text-[10px] font-bold text-[#79c0ff] uppercase tracking-wider">
          External Risk Indicators
        </span>
      </div>
      <div className="space-y-1.5">
        {items.map((item, i) => {
          const s = statusStyles[item.status];
          return (
            <div
              key={i}
              className="flex items-center gap-2 rounded-md border px-2.5 py-1.5"
              style={{ borderColor: s.border, background: s.bg }}
            >
              <span className="text-[10px] font-bold" style={{ color: s.color }}>
                {s.icon}
              </span>
              <span className="text-[11px]" style={{ color: s.color }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

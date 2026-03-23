"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ------------------------------------------------------------------ */
/*  Diligent Logo                                                      */
/* ------------------------------------------------------------------ */

function DiligentLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 222 222" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
        <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
        <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Icon Components                                                    */
/* ------------------------------------------------------------------ */

function IconBoards() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function IconBook() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
  );
}

function IconArchive() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="21 8 21 21 3 21 3 8" /><rect x="1" y="3" width="22" height="5" /><line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  );
}

function IconFolder() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
    </svg>
  );
}

function IconBarChart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  );
}

function IconGraduationCap() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-5L2 10l10 5 10-5z" /><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}

function IconNewspaper() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" /><line x1="10" y1="6" x2="18" y2="6" /><line x1="10" y1="10" x2="18" y2="10" /><line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function IconClipboard() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconExternalLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function IconChevronDown() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
    </svg>
  );
}

function IconMessageCircle() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
    </svg>
  );
}

function IconHelp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function IconFileText() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function IconMoreVertical() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" />
    </svg>
  );
}

function IconSparkles() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" fill="#7c3aed" stroke="#7c3aed" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type NavItem = {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  external?: boolean;
  separator?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { icon: <IconBoards />, label: "Walmart U.S", external: true },
  { separator: true, icon: null, label: "" },
  { icon: <IconBook />, label: "Books" },
  { icon: <IconFolder />, label: "Resource Center" },
  { separator: true, icon: null, label: "" },
  { icon: <IconClock />, label: "Minutes", external: true },
  { icon: <IconFileText />, label: "Data Room", external: true },
  { icon: <IconClipboard />, label: "Questionnaires", external: true },
  { separator: true, icon: null, label: "" },
  { icon: <IconBarChart />, label: "GRC Reporting" },
  { icon: <IconGraduationCap />, label: "Education & Templates" },
  { icon: <IconCalendar />, label: "Calendar" },
  { separator: true, icon: null, label: "" },
  { icon: <IconUsers />, label: "Open Director View", external: true },
  { icon: <IconSettings />, label: "Site Management", external: true },
];

const NEWS_ARTICLES = [
  {
    title: "Alaska-Hawaiian merger gets pushback from United Airlines",
    source: "Samoa News",
    date: "Sep 4, 2024",
    summary: "United Airlines is opposing the proposed merger between Alaska Airlines and Hawaiian Airlines.",
  },
  {
    title: "Elliott Crosses 10% Threshold In Southwest To Call For Special Meeting",
    source: "RTT News - Breaking News",
    date: "Sep 3, 2024",
    summary: "Activist investor Elliott Management has increased its stake in Southwest Airlines to over 10%, allowing it to call for a special shareholder meeting.",
  },
  {
    title: "Air France-KLM snatches up 20 percent of SAS Airline",
    source: "NL Times",
    date: "Aug 31, 2024",
    summary: "Air France-KLM has acquired a 20% stake in Scandinavian Airlines (SAS).",
  },
];

const BOOKS = [
  {
    id: "1",
    title: "Strategic Vision 2025: Global Growth and Innovation Roadmap",
    meeting: "Meeting: September 14, 2023 • Marketing and Branding Subcommittee",
    badges: ["New", "Approval required"],
    extra: "+1",
  },
  {
    id: "2",
    title: "Strategic Vision 2025: Global Growth and Innovation Roadmap",
    meeting: "Meeting: September 14, 2023 • Marketing and Branding Subcommittee",
    badges: ["New"],
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export default function BoardsHomePage() {
  const [booksTab, setBooksTab] = useState<"all" | "books" | "reports">("all");
  const [demoPanelOpen, setDemoPanelOpen] = useState(true);
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Demo controls — matching gc-commandcenter */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2 flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">
            Demo controls — not part of prototype
          </p>
          <button
            onClick={() => setDemoPanelOpen(!demoPanelOpen)}
            className="flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-medium text-[#0369a1] hover:bg-[#7dd3fc]/30 transition-colors"
          >
            {demoPanelOpen ? "Hide" : "Show"}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={cn("transition-transform", demoPanelOpen ? "" : "rotate-180")}><polyline points="6 9 12 15 18 9" /></svg>
          </button>
        </div>

        {demoPanelOpen && (
          <>
            <div className="w-full border-b border-[#0ea5e9]/20 bg-[#e0f2fe]">
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 flex-wrap gap-2">
                <div className="flex items-center gap-4">
                  <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
                    Viewing as: Change-Averse General Counsel using Boards
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-[#0ea5e9]/40 bg-white p-1">
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium transition bg-[#0ea5e9] text-white">
                    Near-Term: Boards Entry
                  </button>
                  <button
                    onClick={() => router.push("/light/gc-commandcenter")}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition text-[#0369a1] hover:bg-[#bae6fd]"
                  >
                    Full Vision: Command Center
                  </button>
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
                      <span className="font-medium text-[#075985]">Scenario:</span> The General Counsel opens the standard Boards system enhanced with the GRC Command Center panel and sees that monitoring agents have detected 
                      emerging risks not captured in upcoming Board materials or regulatory filings. The GC will assess the risks, 
                      coordinate with stakeholders, update 10K risk disclosures, and notify the Board.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] px-4 py-2">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">
                ↓ Prototype starts below (Diligent Boards with GRC Command Center sidebar)
              </p>
            </div>
          </>
        )}
      </div>

      {/* Main layout row */}
      <div className="flex flex-1 min-h-0 overflow-hidden">
      {/* Boards section (header + body) */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f0f2f5]">
      {/* Top bar */}
      <header className="h-12 bg-white border-b border-[#e2e5e9] flex items-center px-4 flex-shrink-0 z-10">
        <div className="flex items-center gap-2.5 pl-1">
          <DiligentLogo className="h-6 w-6" />
          <span className="text-sm font-semibold text-[#374151]">Boards</span>
          <span className="text-xs text-[#9ca3af]">(GC view)</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-1">
          {[<IconBell key="bell" />, <IconMessageCircle key="msg" />, <IconHelp key="help" />, <IconSettings key="set" />].map((icon, i) => (
            <button key={i} className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6b7280] hover:bg-[#f3f4f6] transition-colors">
              {icon}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-y-auto">
        {/* ------------------------------------------------------------------ */}
        {/*  Left Sidebar                                                       */}
        {/* ------------------------------------------------------------------ */}
        <aside className="w-[210px] flex-shrink-0 bg-white border-r border-[#e2e5e9] flex flex-col self-stretch">
          <div className="px-4 py-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-[#2563eb]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>
            </div>
            <span className="text-sm font-bold text-[#2563eb]">Walmart</span>
            <span className="text-sm text-[#f59e0b]">✳</span>
          </div>
          <nav className="flex-1 py-1 px-2">
            {NAV_ITEMS.map((item, i) => {
              if (item.separator) return <div key={i} className="my-2 mx-3 border-t border-[#e2e5e9]" />;
              return (
                <button
                  key={item.label}
                  className={cn(
                    "flex items-center gap-3 w-full rounded-lg px-3 py-2 text-sm transition-colors text-left",
                    item.active
                      ? "bg-[#eff6ff] text-[#2563eb] font-medium"
                      : "text-[#374151] hover:bg-[#f3f4f6]"
                  )}
                >
                  <span className={cn(item.active ? "text-[#2563eb]" : "text-[#6b7280]")}>{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.external && <span className="text-[#2563eb]"><IconExternalLink /></span>}
                </button>
              );
            })}
          </nav>
          <div className="px-4 py-3 border-t border-[#e2e5e9] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <DiligentLogo className="h-4 w-4" />
              <span className="text-xs font-semibold text-[#111827]">Diligent</span>
            </div>
            <span className="text-[10px] text-[#9ca3af]">1.25…</span>
          </div>
        </aside>

        {/* ------------------------------------------------------------------ */}
        {/*  Main Content                                                       */}
        {/* ------------------------------------------------------------------ */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[780px] mx-auto px-6 py-6 space-y-5">

            {/* Search bar */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                <IconSearch />
              </div>
              <input
                type="text"
                placeholder="Search all your board books, decisions, minutes, and even voting records..."
                className="w-full rounded-lg border border-[#d1d5db] bg-white pl-10 pr-4 py-2 text-sm text-[#374151] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
              />
            </div>

            {/* Awaiting review */}
            <div className="rounded-xl border border-[#e2e5e9] bg-white px-4 py-3">
              <h2 className="text-sm font-semibold text-[#111827] mb-1">Awaiting review</h2>
              <div>
                {[
                  { icon: <IconClipboard />, label: "Questionnaires", count: 1 },
                  { icon: <IconCheckCircle />, label: "Approvals", count: 1 },
                  { icon: <IconClock />, label: "Minutes", count: 1 },
                ].map((item) => (
                  <button key={item.label} className="flex items-center justify-between w-full rounded-lg px-2 py-2 hover:bg-[#f9fafb] transition-colors group">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[#6b7280]">{item.icon}</span>
                      <span className="text-sm font-medium text-[#374151]">{item.label}</span>
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#dc2626] px-1.5 text-[11px] font-semibold text-white">
                        {item.count}
                      </span>
                    </div>
                    <span className="text-[#d1d5db] group-hover:text-[#9ca3af]">
                      <IconChevronDown />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Books and reports */}
            <div>
              <h2 className="text-base font-semibold text-[#111827] mb-3">Books and reports</h2>
              <div className="flex items-center gap-1 mb-4 border-b border-[#e2e5e9]">
                {(["all", "books", "reports"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setBooksTab(tab)}
                    className={cn(
                      "px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors",
                      booksTab === tab
                        ? "border-[#2563eb] text-[#2563eb]"
                        : "border-transparent text-[#6b7280] hover:text-[#374151]"
                    )}
                  >
                    {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {BOOKS.map((book) => (
                  <div key={book.id} className="rounded-xl border border-[#e2e5e9] bg-white p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#6b7280]"><IconFileText /></span>
                      {book.badges.map((badge) => (
                        <span
                          key={badge}
                          className={cn(
                            "rounded px-2 py-0.5 text-xs font-medium",
                            badge === "Approval required"
                              ? "bg-[#fef2f2] text-[#dc2626]"
                              : "bg-[#eff6ff] text-[#2563eb]"
                          )}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-1">{book.title}</h3>
                    <p className="text-xs text-[#6b7280]">
                      {book.meeting}
                      {(book as any).extra && <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e5e7eb] text-[10px] font-medium text-[#6b7280]">{(book as any).extra}</span>}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#f3f4f6]">
                      <button className="rounded-lg border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                        Open book
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#374151] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
                        Summary
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#374151] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h10M4 18h6" /></svg>
                        Insights
                      </button>
                      <button className="ml-auto text-[#9ca3af] hover:text-[#6b7280]">
                        <IconMoreVertical />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* ------------------------------------------------------------------ */}
        {/*  Right Sidebar                                                      */}
        {/* ------------------------------------------------------------------ */}
        <aside className="w-[320px] flex-shrink-0 border-l border-[#e2e5e9] bg-white">
          <div className="p-5 space-y-6">

            {/* News and Insights */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#111827]">News and Insights</h2>
                <button className="text-[#d1d5db] hover:text-[#9ca3af]"><IconChevronDown /></button>
              </div>
              <div className="flex items-center gap-1.5 mb-4">
                <IconSparkles />
                <span className="text-xs font-medium text-[#374151]">Articles summarized by AI</span>
                <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold text-[#7c3aed] bg-[#f5f3ff]">BETA</span>
              </div>

              <div className="space-y-4">
                {NEWS_ARTICLES.map((article, i) => (
                  <div key={i} className="pb-4 border-b border-[#f3f4f6] last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <a href="#" className="text-sm font-medium text-[#2563eb] hover:underline leading-snug">{article.title}</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-1.5">
                      <span>{article.source}</span>
                      <span>{article.date}</span>
                    </div>
                    <p className="text-xs text-[#6b7280] leading-relaxed">{article.summary}</p>
                  </div>
                ))}
              </div>

              <button className="w-full mt-3 rounded-lg border border-[#d1d5db] bg-white py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                Load more
              </button>
              <p className="text-[10px] text-[#9ca3af] mt-2 text-center">
                AI-generated content may have inaccuracies.{" "}
                <button className="font-medium underline hover:text-[#6b7280]">Learn more</button>
              </p>
            </div>

            {/* Certifications and templates */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-[#111827]">Certifications and templates</h2>
                <button className="text-[#d1d5db] hover:text-[#9ca3af]"><IconChevronDown /></button>
              </div>
              <div className="rounded-xl border border-[#e2e5e9] bg-[#f9fafb] p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-lg bg-[#e2e5e9] flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#374151] mb-3 leading-relaxed">
                  Explore our newest certification programs and best practice templates
                </p>
                <button className="w-full rounded-lg border border-[#d1d5db] bg-white py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">
                  Browse learning library
                </button>
              </div>
            </div>

          </div>
        </aside>
      </div>
      </div>{/* end Boards section */}

      {/* ------------------------------------------------------------------ */}
      {/*  GRC Command Center Column — full browser height                     */}
      {/* ------------------------------------------------------------------ */}
      <aside className="w-[340px] flex-shrink-0 border-l border-[#1e293b] bg-[#0f172a] flex flex-col overflow-y-auto">
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e293b] border border-[#334155] p-1">
                  <DiligentLogo className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold text-white">GRC Command Center</h2>
              </div>
              <Link href="/light/gc-commandcenter" className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e293b] transition-colors" title="Open full screen">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
              </Link>
            </div>
            <div className="border-t border-[#334155]/60" />

            {/* Emerging risks alert */}
            <div className="rounded-xl border border-[#dc2626]/30 bg-[#1c1017] p-4 space-y-3 mx-4">
              <div className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#dc2626] flex-shrink-0">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6z" /><rect x="11" y="10" width="2" height="4" fill="white" /><rect x="11" y="16" width="2" height="2" fill="white" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#fca5a5]">Agents Detected Emerging Risks</p>
                  <p className="text-xs font-medium text-[#f87171]/70 mt-0.5">3 risks require disclosure review</p>
                </div>
              </div>

              <p className="text-xs text-[#e2e8f0]/60 leading-relaxed">
                Your monitoring agents detected emerging risks that may not be adequately disclosed in current SEC filings or Board meeting materials. Review recommended before the Feb 28 Board meeting.
              </p>

              {/* Risk severity list with tooltips */}
              <div className="space-y-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-[#dc2626] px-2 py-0.5 text-[10px] font-bold text-white">1 Critical</span>
                  </div>
                  <div className="group relative inline-flex items-center gap-1.5 pl-1 cursor-help">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:stroke-[#93c5fd] transition-colors"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    <p className="text-xs text-[#e2e8f0]/80 leading-relaxed">Taiwan Strait Geopolitical Tensions</p>
                    <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-[#334155] bg-[#1e293b] p-3 text-xs text-[#cbd5e1] leading-relaxed shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-20">
                      Escalating tensions in the Taiwan Strait may disrupt semiconductor supply chain. 47% of our chip suppliers have Taiwan-based operations. Prior board materials (Q3) referenced Vietnam as diversification target under evaluation.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center rounded-full bg-[#f97316] px-2 py-0.5 text-[10px] font-bold text-white">2 High</span>
                  </div>
                  <div className="space-y-1 pl-1">
                    <div className="group relative inline-flex items-center gap-1.5 cursor-help">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:stroke-[#93c5fd] transition-colors"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                      <p className="text-xs text-[#e2e8f0]/80 leading-relaxed">Critical Vendor Cybersecurity Breach</p>
                      <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-[#334155] bg-[#1e293b] p-3 text-xs text-[#cbd5e1] leading-relaxed shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-20">
                        CloudSecure Inc. (our primary data processing vendor) disclosed a ransomware incident. They process customer PII under 3 of our data processing agreements.
                      </div>
                    </div>
                    <div className="group relative inline-flex items-center gap-1.5 cursor-help">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 group-hover:stroke-[#93c5fd] transition-colors"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                      <p className="text-xs text-[#e2e8f0]/80 leading-relaxed">EU Digital Markets Act Enforcement Pattern</p>
                      <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-[#334155] bg-[#1e293b] p-3 text-xs text-[#cbd5e1] leading-relaxed shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-20">
                        EC initiated enforcement actions against 3 companies in our sector for DMA non-compliance. Pattern analysis suggests our EU operations may face similar scrutiny.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Sources */}
              <div className="pt-1">
                <Link href="/light/superhero/reviewer" className="inline-flex items-center gap-1.5 rounded-lg border border-[#475569] bg-[#1e293b] px-3 py-1.5 text-xs font-medium text-[#60a5fa] hover:bg-[#334155] hover:border-[#60a5fa] transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  Review Sources
                </Link>
              </div>

              {/* Recommendation */}
              <div className="border-t border-[#334155] pt-3">
                <p className="text-xs font-semibold text-[#f87171] mb-1.5">Recommendation:</p>
                <div className="space-y-1.5 text-xs text-[#e2e8f0]/70 leading-relaxed">
                  <div className="flex gap-1.5">
                    <span className="flex-shrink-0">1.</span>
                    <span>Assign Risk Owners to provide context and point of view</span>
                  </div>
                  <div className="flex gap-1.5">
                    <span className="flex-shrink-0">2.</span>
                    <span>Decide if these new risks should be disclosed in upcoming 10-Q to be filed in <span className="font-semibold text-[#f87171]">13 days</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#334155]" />

            {/* Other things on your plate */}
            <div className="px-4">
              <h3 className="text-sm font-semibold text-[#e2e8f0] mb-3">Other things on your plate</h3>
              <div className="space-y-2">
                <button className="flex items-center gap-2.5 w-full rounded-lg border border-[#334155] bg-[#1e293b] px-3.5 py-2.5 text-left hover:border-[#3b82f6] hover:bg-[#1e293b]/80 transition-all group">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e3a5f] flex-shrink-0 group-hover:bg-[#1e40af]/40 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" /></svg>
                  </div>
                  <span className="text-xs text-[#cbd5e1]">Begin new director appointment</span>
                </button>
                <button className="flex items-center gap-2.5 w-full rounded-lg border border-[#334155] bg-[#1e293b] px-3.5 py-2.5 text-left hover:border-[#3b82f6] hover:bg-[#1e293b]/80 transition-all group">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e3a5f] flex-shrink-0 group-hover:bg-[#1e40af]/40 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                  </div>
                  <span className="text-xs text-[#cbd5e1]">Review latest M&A opportunities</span>
                </button>
                <button className="flex items-center gap-2.5 w-full rounded-lg border border-[#334155] bg-[#1e293b] px-3.5 py-2.5 text-left hover:border-[#3b82f6] hover:bg-[#1e293b]/80 transition-all group">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e3a5f] flex-shrink-0 group-hover:bg-[#1e40af]/40 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
                  </div>
                  <span className="text-xs text-[#cbd5e1]">New audit report available</span>
                </button>
              </div>
            </div>
          </div>

          {/* Prompt box pinned to bottom */}
          <div className="border-t border-[#334155] bg-[#1e293b] p-4">
            <div className="relative">
              <input
                type="text"
                defaultValue="Show me suggested Risk Owners..."
                className="w-full rounded-full border border-[#475569] bg-[#0f172a] pl-4 pr-10 py-2.5 text-xs text-[#e2e8f0] placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
              />
              <button
                onClick={() => router.push("/light/superhero/coordinator")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
              </button>
            </div>
            <p className="text-[9px] text-[#64748b] mt-1.5 text-center">
              AI-generated content may have inaccuracies.{" "}
              <button className="font-medium underline hover:text-[#94a3b8]">Learn more</button>
            </p>
          </div>
        </aside>
      </div>{/* end main layout row */}
    </div>
  );
}

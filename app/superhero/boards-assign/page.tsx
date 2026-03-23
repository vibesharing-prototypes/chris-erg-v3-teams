"use client";

import React, { useState, useEffect } from "react";
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
/*  Icon Components (subset needed for this page)                      */
/* ------------------------------------------------------------------ */

function IconBoards() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>; }
function IconBook() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>; }
function IconFolder() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" /></svg>; }
function IconBarChart() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></svg>; }
function IconGraduationCap() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10l-10-5L2 10l10 5 10-5z" /><path d="M6 12v5c0 1 3 3 6 3s6-2 6-3v-5" /></svg>; }
function IconUsers() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>; }
function IconClock() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>; }
function IconFileText() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>; }
function IconClipboard() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" /></svg>; }
function IconCalendar() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>; }
function IconSettings() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" /></svg>; }
function IconExternalLink() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>; }
function IconChevronDown() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>; }
function IconSearch() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>; }
function IconBell() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" /></svg>; }
function IconMessageCircle() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>; }
function IconHelp() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>; }
function IconCheckCircle() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; }
function IconMoreVertical() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="12" cy="19" r="1" /></svg>; }
function IconSparkles() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" fill="#7c3aed" stroke="#7c3aed" /></svg>; }

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

type NavItem = { icon: React.ReactNode; label: string; active?: boolean; external?: boolean; separator?: boolean };

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
  { title: "Alaska-Hawaiian merger gets pushback from United Airlines", source: "Samoa News", date: "Sep 4, 2024", summary: "United Airlines is opposing the proposed merger between Alaska Airlines and Hawaiian Airlines." },
  { title: "Elliott Crosses 10% Threshold In Southwest To Call For Special Meeting", source: "RTT News - Breaking News", date: "Sep 3, 2024", summary: "Activist investor Elliott Management has increased its stake in Southwest Airlines to over 10%, allowing it to call for a special shareholder meeting." },
  { title: "Air France-KLM snatches up 20 percent of SAS Airline", source: "NL Times", date: "Aug 31, 2024", summary: "Air France-KLM has acquired a 20% stake in Scandinavian Airlines (SAS)." },
];

const BOOKS = [
  { id: "1", title: "Strategic Vision 2025: Global Growth and Innovation Roadmap", meeting: "Meeting: September 14, 2023 • Marketing and Branding Subcommittee", badges: ["New", "Approval required"], extra: "+1" },
  { id: "2", title: "Strategic Vision 2025: Global Growth and Innovation Roadmap", meeting: "Meeting: September 14, 2023 • Marketing and Branding Subcommittee", badges: ["New"] },
];

/* ------------------------------------------------------------------ */
/*  Assign Risks Data                                                  */
/* ------------------------------------------------------------------ */

const AVATARS: Record<string, string> = {
  "diana-reyes": "https://randomuser.me/api/portraits/med/women/44.jpg",
  "marcus-webb": "https://i.pravatar.cc/150?u=marcus-webb",
  "james-park": "https://i.pravatar.cc/150?u=james-park",
};

const RISKS_TO_ASSIGN = [
  {
    id: "taiwan",
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical" as const,
    suggestedOwner: "Diana Reyes",
    suggestedTitle: "VP, Supply Chain",
    avatarUrl: AVATARS["diana-reyes"],
  },
  {
    id: "cyber",
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High" as const,
    suggestedOwner: "Marcus Webb",
    suggestedTitle: "CISO",
    avatarUrl: AVATARS["marcus-webb"],
  },
  {
    id: "dma",
    name: "EU Digital Markets Act Enforcement",
    severity: "High" as const,
    suggestedOwner: "James Park",
    suggestedTitle: "Chief Compliance Officer",
    avatarUrl: AVATARS["james-park"],
  },
];

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

type AssignPhase = "ready" | "notifying" | "done";

export default function BoardsAssignPage() {
  const [booksTab, setBooksTab] = useState<"all" | "books" | "reports">("all");
  const [demoPanelOpen, setDemoPanelOpen] = useState(true);
  const [demoPanelHydrated, setDemoPanelHydrated] = useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("demo-panel-open");
    if (stored !== null) setDemoPanelOpen(stored === "true");
    setDemoPanelHydrated(true);
  }, []);

  React.useEffect(() => {
    if (demoPanelHydrated) localStorage.setItem("demo-panel-open", String(demoPanelOpen));
  }, [demoPanelOpen, demoPanelHydrated]);
  const [editing, setEditing] = useState<string | null>(null);
  const [phase, setPhase] = useState<AssignPhase>("ready");
  const router = useRouter();

  function handleAssignAll() {
    setPhase("notifying");
  }

  useEffect(() => {
    if (phase !== "notifying") return;
    const t = setTimeout(() => router.push("/superhero/boards-status"), 2000);
    return () => clearTimeout(t);
  }, [phase, router]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Demo controls */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2 flex items-center justify-between">
          <Link href="/" className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1] hover:text-[#075985] transition-colors">
            Diligent Prototype — For illustrative and alignment purposes
          </Link>
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
                    Viewing as: General Counsel assigning risk owners
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-[#0ea5e9]/40 bg-white p-1">
                  <button
                    onClick={() => router.push("/superhero/boards-home")}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium transition text-[#0369a1] hover:bg-[#bae6fd]"
                  >
                    ← Back to Boards
                  </button>
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium transition bg-[#0ea5e9] text-white">
                    Step 2: Assign Owners
                  </button>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] px-4 py-2">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">
                ↓ Prototype starts below — GC assigns risk owners from the sidebar
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
        {/* Left Sidebar */}
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
                    item.active ? "bg-[#eff6ff] text-[#2563eb] font-medium" : "text-[#374151] hover:bg-[#f3f4f6]"
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

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-[780px] mx-auto px-6 py-6 space-y-5">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]"><IconSearch /></div>
              <input type="text" placeholder="Search all your board books, decisions, minutes, and even voting records..." className="w-full rounded-lg border border-[#d1d5db] bg-white pl-10 pr-4 py-2 text-sm text-[#374151] placeholder-[#9ca3af] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]" />
            </div>

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
                      <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#dc2626] px-1.5 text-[11px] font-semibold text-white">{item.count}</span>
                    </div>
                    <span className="text-[#d1d5db] group-hover:text-[#9ca3af]"><IconChevronDown /></span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#111827] mb-3">Books and reports</h2>
              <div className="flex items-center gap-1 mb-4 border-b border-[#e2e5e9]">
                {(["all", "books", "reports"] as const).map((tab) => (
                  <button key={tab} onClick={() => setBooksTab(tab)} className={cn("px-3 py-2 text-sm font-medium capitalize border-b-2 -mb-px transition-colors", booksTab === tab ? "border-[#2563eb] text-[#2563eb]" : "border-transparent text-[#6b7280] hover:text-[#374151]")}>
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
                        <span key={badge} className={cn("rounded px-2 py-0.5 text-xs font-medium", badge === "Approval required" ? "bg-[#fef2f2] text-[#dc2626]" : "bg-[#eff6ff] text-[#2563eb]")}>{badge}</span>
                      ))}
                    </div>
                    <h3 className="text-sm font-semibold text-[#111827] mb-1">{book.title}</h3>
                    <p className="text-xs text-[#6b7280]">
                      {book.meeting}
                      {(book as any).extra && <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e5e7eb] text-[10px] font-medium text-[#6b7280]">{(book as any).extra}</span>}
                    </p>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#f3f4f6]">
                      <button className="rounded-lg border border-[#d1d5db] bg-white px-3 py-1.5 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">Open book</button>
                      <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#374151] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h10" /></svg>
                        Summary
                      </button>
                      <button className="flex items-center gap-1.5 text-xs font-medium text-[#6b7280] hover:text-[#374151] transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 10h16M4 14h10M4 18h6" /></svg>
                        Insights
                      </button>
                      <button className="ml-auto text-[#9ca3af] hover:text-[#6b7280]"><IconMoreVertical /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-[320px] flex-shrink-0 border-l border-[#e2e5e9] bg-white">
          <div className="p-5 space-y-6">
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
              <button className="w-full mt-3 rounded-lg border border-[#d1d5db] bg-white py-2 text-xs font-medium text-[#374151] hover:bg-[#f9fafb] transition-colors">Load more</button>
              <p className="text-[10px] text-[#9ca3af] mt-2 text-center">
                AI-generated content may have inaccuracies.{" "}
                <button className="font-medium underline hover:text-[#6b7280]">Learn more</button>
              </p>
            </div>
          </div>
        </aside>
      </div>
      </div>{/* end Boards section */}

      {/* ------------------------------------------------------------------ */}
      {/*  GRC Command Center — Assign Risk Owners                            */}
      {/* ------------------------------------------------------------------ */}
      <aside className="w-[340px] flex-shrink-0 border-l border-[#1e293b] bg-[#0f172a] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e293b] border border-[#334155] p-1">
              <DiligentLogo className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">GRC Command Center</h2>
          </div>
          <Link href="/gc-commandcenter" className="flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#1e293b] transition-colors" title="Open full screen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" /></svg>
          </Link>
        </div>
        <div className="border-t border-[#334155]/60 flex-shrink-0" />

        {/* Notifying state */}
        {phase === "notifying" ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 gap-4">
            <div className="w-5 h-5 border-2 border-[#60a5fa] border-t-transparent rounded-full animate-spin" />
            <div className="text-center">
              <p className="text-sm font-semibold text-white mb-1">Notifying owners now...</p>
              <p className="text-[11px] text-[#64748b]">Sending assignments to Diana, Marcus, and James</p>
            </div>
          </div>
        ) : (

        <div className="flex-1 flex flex-col">
          <div className="flex-1 px-4 pt-4 space-y-4">

            {/* Title */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Assign Risk Owners</h3>
              <p className="text-[11px] text-[#94a3b8] leading-relaxed">
                Recommended owners based on role and expertise. Risk owners will be notified to complete an interview with the Diligent AI Risk Manager to provide context and assess severity, likelihood, and any controls or mitigations already in place. This will factor into whether the company updates its regulatory disclosures as required by law.
              </p>
            </div>

            {/* Risk assignment cards */}
            <div className="space-y-3">
              {RISKS_TO_ASSIGN.map((risk) => (
                <div key={risk.id} className="rounded-lg border border-[#334155] bg-[#1e293b] p-3">
                  {/* Risk name + severity */}
                  <div className="flex items-start gap-2 mb-2.5">
                    <span className={cn(
                      "mt-0.5 inline-flex items-center rounded-full px-1.5 py-px text-[9px] font-bold uppercase flex-shrink-0",
                      risk.severity === "Critical" ? "bg-[#dc2626] text-white" : "bg-[#f97316] text-white"
                    )}>
                      {risk.severity}
                    </span>
                    <p className="text-xs font-medium text-[#e2e8f0] leading-snug">{risk.name}</p>
                  </div>

                  {/* Owner row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={risk.avatarUrl} alt={risk.suggestedOwner} className="h-6 w-6 rounded-full object-cover flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[11px] font-medium text-[#e2e8f0] truncate">{risk.suggestedOwner}</p>
                        <p className="text-[10px] text-[#64748b] truncate">{risk.suggestedTitle}</p>
                      </div>
                    </div>

                    {editing === risk.id ? (
                      <button
                        onClick={() => setEditing(null)}
                        className="flex-shrink-0 rounded-md border border-[#475569] px-2 py-0.5 text-[10px] font-medium text-[#94a3b8] hover:text-white hover:border-[#60a5fa] transition-colors"
                      >
                        Done
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditing(risk.id)}
                        className="flex-shrink-0 text-[10px] text-[#475569] hover:text-[#94a3b8] transition-colors"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Assign all button */}
            <button
              onClick={handleAssignAll}
              className="w-full rounded-lg bg-[#3b82f6] py-2.5 text-xs font-semibold text-white hover:bg-[#2563eb] transition-colors"
            >
              Assign recommended owners
            </button>
          </div>

          {/* Prompt box pinned to bottom */}
          <div className="border-t border-[#334155] bg-[#1e293b] p-4 flex-shrink-0">
            <div className="relative">
              <input
                type="text"
                defaultValue="Assign recommended owners"
                className="w-full rounded-full border border-[#475569] bg-[#0f172a] pl-4 pr-10 py-2.5 text-xs text-[#e2e8f0] placeholder-[#64748b] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
              />
              <button
                onClick={handleAssignAll}
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
        </div>
        )}
      </aside>
      </div>{/* end main layout row */}
    </div>
  );
}

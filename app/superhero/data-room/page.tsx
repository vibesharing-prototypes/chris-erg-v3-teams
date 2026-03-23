"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import ReturnToChat from "@/app/components/ReturnToChat";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const GC_NAME = "Sarah Mitchell";
const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

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

const LOADING_STEPS = [
  "Establishing secure connection",
  "Verifying credentials",
  "Loading data room",
];

const SIDEBAR_SECTIONS = [
  {
    id: "my-data-room",
    label: "My data room",
    icon: "clock" as const,
    expandable: true,
    items: [
      { label: "Files", active: true },
      { label: "Shared with me", active: false },
      { label: "Shared by me", active: false },
      { label: "Deleted items", active: false },
    ],
  },
  { id: "main-committee", label: "Main Committee", icon: "users" as const, expandable: true },
  { id: "deal-room", label: "Deal room", icon: "briefcase" as const, expandable: true },
  { id: "flows", label: "Flows", icon: "flow" as const, expandable: false },
  { id: "admin", label: "Administration", icon: "settings" as const, expandable: false },
];

type OfficialDoc = {
  id: string;
  name: string;
  ext: "docx" | "pptx";
  lastModified: string;
  size: string;
};

type ContextPacketFolder = {
  id: string;
  riskLabel: string;
  severity: "Critical" | "High";
  fileCount: number;
  lastModified: string;
  href: string | null;
};

const OFFICIAL_DOCS: OfficialDoc[] = [
  { id: "od1", name: "10-K Risk Factor Draft — FY2025 (Final).docx", ext: "docx", lastModified: "today, 2:47 PM", size: "478 KB" },
  { id: "od2", name: "ERM Board Deck — Q1 2026.pptx", ext: "pptx", lastModified: "today, 2:47 PM", size: "2.4 MB" },
];

const CONTEXT_PACKETS: ContextPacketFolder[] = [
  { id: "cp1", riskLabel: "Taiwan Strait — Supply Chain", severity: "Critical", fileCount: 8, lastModified: "today, 2:49 PM", href: "/superhero/data-room/taiwan-strait" },
  { id: "cp2", riskLabel: "Vendor Cybersecurity Breach", severity: "High", fileCount: 6, lastModified: "today, 2:49 PM", href: null },
  { id: "cp3", riskLabel: "EU Digital Markets Act", severity: "High", fileCount: 5, lastModified: "today, 2:49 PM", href: null },
];

const EXT_COLORS = { docx: "text-[#3b82f6]", pptx: "text-[#f0883e]" };

function SidebarIcon({ icon }: { icon: string }) {
  const cls = "w-4 h-4 text-[#8080a0]";
  switch (icon) {
    case "clock": return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="1.5" /><path strokeLinecap="round" strokeWidth="1.5" d="M12 6v6l4 2" /></svg>;
    case "users": return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
    case "briefcase": return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
    case "flow": return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case "settings": return <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><circle cx="12" cy="12" r="3" strokeWidth="1.5" /></svg>;
    default: return null;
  }
}

function DataRoomSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ "my-data-room": true });
  const toggle = (id: string) => setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <aside className="w-[200px] flex-shrink-0 bg-[#1a1a2e] border-r border-[#2a2a3e] flex flex-col">
      <div className="px-4 py-3 border-b border-[#2a2a3e]">
        <button className="flex items-center gap-2 text-xs text-[#a0a0b8] hover:text-white">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Secure File Sharing
        </button>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        {SIDEBAR_SECTIONS.map((section) => (
          <div key={section.id}>
            <button
              onClick={() => section.expandable && toggle(section.id)}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-[#c8c8d8] hover:bg-[#2a2a3e] transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <SidebarIcon icon={section.icon} />
                {section.label}
              </span>
              {section.expandable && (
                <svg className={cn("w-3.5 h-3.5 transition-transform text-[#8080a0]", openSections[section.id] && "rotate-180")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
            {section.items && openSections[section.id] && (
              <div className="pl-4">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm transition-colors rounded-l-md",
                      item.active ? "bg-[#ee312e] text-white font-medium" : "text-[#a0a0b8] hover:bg-[#2a2a3e]"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

function DiligentHeader() {
  return (
    <header className="flex items-center justify-between px-4 py-2.5 bg-[#1a1a2e] border-b border-[#2a2a3e] flex-shrink-0">
      <div className="flex items-center gap-3">
        <button className="text-[#8080a0] hover:text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
        <div className="flex items-center gap-1.5">
          <DiligentLogo className="h-5 w-auto" />
          <span className="text-sm font-semibold text-white tracking-tight">Diligent</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="text-[#8080a0] hover:text-white p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </button>
        <img src={GC_AVATAR_URL} alt={GC_NAME} className="h-7 w-7 rounded-full object-cover ring-2 ring-[#2a2a3e]" />
      </div>
    </header>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 700);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="flex-1 bg-[#1a1a2e] flex flex-col items-center justify-center relative">
      <div className="flex flex-col items-center gap-6">
        <DiligentLogo className="h-14 w-auto" />
        <h2 className="text-xl font-semibold text-white">Diligent Data Room</h2>
        <div className="w-64 h-1 rounded-full bg-[#2a2a3e] overflow-hidden">
          <div
            className="h-full bg-[#ee312e] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((step + 1) / LOADING_STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex flex-col items-center gap-2 min-h-[60px]">
          {LOADING_STEPS.map((label, i) => (
            <p
              key={label}
              className={cn(
                "text-sm transition-opacity duration-300",
                i < step ? "text-[#3fb950]" : i === step ? "text-[#a0a0b8]" : "text-transparent"
              )}
            >
              {i < step && "✓ "}{label}{i === step && "..."}
            </p>
          ))}
        </div>
      </div>
      <p className="absolute bottom-6 text-[10px] text-[#4a4a6a]">256-bit AES encrypted &middot; SOC 2 Type II certified</p>
    </div>
  );
}

function PromptBox({ onSubmit }: { onSubmit: () => void }) {
  const [value, setValue] = useState("Approve materials in Diligent Boards");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onSubmit();
  };

  return (
    <div className="flex-shrink-0 max-w-2xl mx-auto w-full px-6 pb-4 pt-2">
      <div className="relative rounded-2xl shadow-sm overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-1 rounded-l-2xl" style={{ background: "linear-gradient(to bottom, #e8b4d8, #b8a9e8, #a0c4f0, #8dd8d0)" }} />
        <div className="rounded-2xl border border-[#e5e7eb] bg-white overflow-hidden pl-2">
          <div className="px-3 pt-3 pb-2">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full text-sm text-[#111827] bg-transparent outline-none placeholder:text-[#9ca3af]"
              placeholder="Ask Diligent anything..."
            />
          </div>
          <div className="px-3 pb-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-full text-[#9ca3af] hover:bg-[#f3f4f6] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
              </button>
              <button className="flex items-center gap-1 px-2 py-1 rounded-md text-[#6b7280] hover:bg-[#f3f4f6] transition-colors text-xs">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                Tools
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-1.5">
              <button className="p-1.5 rounded-full text-[#9ca3af] hover:bg-[#f3f4f6] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <button
                onClick={onSubmit}
                className="p-1.5 rounded-full bg-[#1a1a2e] text-white hover:bg-[#2a2a3e] transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] text-[#9ca3af] mt-2">AI-generated content may have inaccuracies. <button className="underline hover:text-[#6b7280]">Learn more</button></p>
    </div>
  );
}

function DataRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from");
  const [loading, setLoading] = useState(true);

  const handleNotifyCrisisCohort = () => {
    router.push("/superhero/board-governance" + (fromParam ? `?from=${fromParam}` : ""));
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <ReturnToChat />
      {/* Browser chrome wrapper */}
      <div className="w-full max-w-[1200px] h-[85vh] rounded-xl border border-[#3a3a3a] bg-white shadow-2xl shadow-black/50 flex flex-col overflow-hidden">

        {/* macOS title bar */}
        <div className="h-10 bg-[#2b2b2b] border-b border-[#3a3a3a] flex items-center px-4 shrink-0">
          <div className="flex items-center gap-2">
            <Link href="/" className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors" title="Close" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 bg-[#1a1a1a] rounded-md px-3 py-1 min-w-[360px]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
              <span className="text-[11px] text-[#999]">data-room.diligent.com/disclosure-committee/undisclosed-risks</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" className="ml-auto"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
            </div>
          </div>
          <div className="w-[52px]" />
        </div>

        {loading ? (
          <LoadingScreen onComplete={() => setLoading(false)} />
        ) : (<>
        <DiligentHeader />

        <div className="flex-1 flex overflow-hidden min-h-0">
          <DataRoomSidebar />

          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
          {/* Breadcrumb */}
          <div className="px-6 pt-4 pb-0 flex-shrink-0">
            <nav className="flex items-center gap-1.5 text-xs">
              <button className="text-[#3b82f6] hover:underline">My data room / Files</button>
              <span className="text-[#9ca3af]">&gt;</span>
              <button className="text-[#6b7280] hover:underline">Disclosure Committee</button>
              <span className="text-[#9ca3af]">&gt;</span>
              <span className="text-[#6b7280]">Undisclosed Risks</span>
            </nav>
          </div>

          {/* Page title */}
          <div className="px-6 pt-3 pb-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link href="/superhero/context-packet" className="text-[#374151] hover:text-[#111827]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </Link>
              <h1 className="text-xl font-semibold text-[#111827]">Undisclosed Risks</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 rounded-md bg-[#1a1a2e] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#2a2a3e] transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                New
              </button>
              <button className="p-1.5 rounded text-[#6b7280] hover:bg-[#f3f4f6]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-6 pb-3 flex items-center gap-4 flex-shrink-0">
            <div className="flex items-center gap-2 rounded-md border border-[#d1d5db] px-3 py-1.5 bg-white w-56">
              <svg className="w-3.5 h-3.5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" strokeWidth="2" /><path strokeLinecap="round" strokeWidth="2" d="M21 21l-4.35-4.35" /></svg>
              <span className="text-xs text-[#9ca3af]">Search</span>
            </div>
            <button className="flex items-center gap-1.5 text-xs text-[#374151] hover:text-[#111827]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filter
            </button>
            <button className="flex items-center gap-1.5 text-xs text-[#374151] hover:text-[#111827]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>
              Columns
            </button>
            <button className="flex items-center gap-1.5 text-xs text-[#374151] hover:text-[#111827]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Export
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {/* Official Documents section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                <h2 className="text-xs font-semibold text-[#374151] uppercase tracking-wider">Official Documents</h2>
              </div>
              <div className="rounded-lg border border-[#e5e7eb] overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#f9fafb] border-b border-[#e5e7eb]">
                      <th className="w-10 py-2 pl-3 pr-2"><input type="checkbox" className="rounded border-[#d1d5db] h-3.5 w-3.5" readOnly /></th>
                      <th className="py-2 text-left text-xs font-medium text-[#6b7280]">Name</th>
                      <th className="py-2 text-left text-xs font-medium text-[#6b7280] w-36">Last modified</th>
                      <th className="py-2 text-left text-xs font-medium text-[#6b7280] w-24">Size</th>
                      <th className="w-8" />
                    </tr>
                  </thead>
                  <tbody>
                    {OFFICIAL_DOCS.map((doc) => (
                      <tr key={doc.id} className="border-b border-[#f3f4f6] last:border-0 hover:bg-[#f9fafb] transition-colors group">
                        <td className="py-2.5 pl-3 pr-2"><input type="checkbox" className="rounded border-[#d1d5db] h-3.5 w-3.5" readOnly /></td>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2.5">
                            <div className="relative w-5 h-5 flex items-center justify-center">
                              <svg className="w-5 h-5 text-[#d1d5db]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                                <path d="M14 2v6h6" fill="white" stroke="currentColor" strokeWidth="0.5" />
                              </svg>
                              <span className={cn("absolute bottom-0 text-[5px] font-bold leading-none", EXT_COLORS[doc.ext])}>{doc.ext.toUpperCase()}</span>
                            </div>
                            <span className="text-sm text-[#374151] font-medium">{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-2.5 text-xs text-[#6b7280]">{doc.lastModified}</td>
                        <td className="py-2.5 text-xs text-[#6b7280]">{doc.size}</td>
                        <td className="py-2.5 pr-2">
                          <button className="p-1 rounded text-[#9ca3af] hover:bg-[#f3f4f6] opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Context Packets section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#6b7280]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                <h2 className="text-xs font-semibold text-[#374151] uppercase tracking-wider">Context Packets</h2>
                <span className="rounded-full bg-[#3fb950]/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#3fb950] uppercase tracking-wider">New</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CONTEXT_PACKETS.map((packet) => {
                  const isClickable = packet.href !== null;
                  const cardClass = cn(
                    "rounded-lg border p-4 transition-all",
                    isClickable
                      ? "border-[#d1d5db] bg-white hover:border-[#3b82f6] hover:shadow-md cursor-pointer"
                      : "border-[#e5e7eb] bg-[#f9fafb] opacity-75 cursor-default"
                  );
                  const inner = (
                    <>
                      <div className="flex items-start justify-between mb-3">
                        <svg className="w-8 h-8 text-[#d29922]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
                        </svg>
                        <span className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                          packet.severity === "Critical" ? "bg-[#da3633]/15 text-[#da3633]" : "bg-[#d29922]/15 text-[#d29922]"
                        )}>
                          {packet.severity}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#111827] mb-1">{packet.riskLabel}</h3>
                      <p className="text-xs text-[#6b7280]">{packet.fileCount} files &middot; {packet.lastModified}</p>
                      {!isClickable && <p className="text-[10px] text-[#9ca3af] mt-2 italic">Coming soon</p>}
                    </>
                  );
                  return isClickable ? (
                    <Link key={packet.id} href={packet.href!} className={cardClass}>{inner}</Link>
                  ) : (
                    <div key={packet.id} className={cardClass}>{inner}</div>
                  );
                })}
              </div>
            </div>

          </div>
          <PromptBox onSubmit={handleNotifyCrisisCohort} />
        </div>
      </div>
      </>)}

      </div>{/* end browser chrome wrapper */}
    </div>
  );
}

export default function DataRoomPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center"><DiligentLogoFallback /></div>}>
      <DataRoomContent />
    </Suspense>
  );
}

function DiligentLogoFallback() {
  return (
    <svg className="h-10 w-auto" viewBox="0 0 222 222" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
        <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
        <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
      </g>
    </svg>
  );
}

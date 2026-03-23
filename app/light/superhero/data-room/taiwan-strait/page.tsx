"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StakeholderFooter, PrototypeControlButton } from "../../StakeholderFooter";

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

type FileIcon = "folder" | "pdf" | "docx" | "xlsx";

type DataRoomFile = {
  id: string;
  name: string;
  icon: FileIcon;
  isFolder: boolean;
  lastModified: string;
  size?: string;
};

const FILES: DataRoomFile[] = [
  { id: "f1", name: "Peer 10-K Filings", icon: "folder", isFolder: true, lastModified: "today, 2:48 PM" },
  { id: "f2", name: "Earnings Call Transcripts", icon: "folder", isFolder: true, lastModified: "today, 2:48 PM" },
  { id: "f3", name: "News & Market Analysis", icon: "folder", isFolder: true, lastModified: "today, 2:48 PM" },
  { id: "f4", name: "Risk Summary — Taiwan Strait Supply Chain.pdf", icon: "pdf", isFolder: false, lastModified: "today, 2:49 PM", size: "342 KB" },
  { id: "f5", name: "Q&A Prep — Disclosure Readiness.pdf", icon: "pdf", isFolder: false, lastModified: "today, 2:49 PM", size: "218 KB" },
  { id: "f6", name: "Suggested Board Responses — Semiconductor Risk.docx", icon: "docx", isFolder: false, lastModified: "today, 2:49 PM", size: "156 KB" },
  { id: "f7", name: "Draft Press Release — Supply Chain Risk Disclosure.docx", icon: "docx", isFolder: false, lastModified: "today, 2:49 PM", size: "89 KB" },
  { id: "f8", name: "Peer Comparison Matrix — Risk Factors FY2025.xlsx", icon: "xlsx", isFolder: false, lastModified: "today, 2:49 PM", size: "1.2 MB" },
];

const ICON_COLORS: Record<FileIcon, string> = {
  folder: "text-[#d29922]",
  pdf: "text-[#da3633]",
  docx: "text-[#3b82f6]",
  xlsx: "text-[#3fb950]",
};

function FileIconSvg({ type }: { type: FileIcon }) {
  if (type === "folder") {
    return (
      <svg className={cn("w-5 h-5", ICON_COLORS[type])} fill="currentColor" viewBox="0 0 24 24">
        <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
      </svg>
    );
  }
  return (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <svg className="w-5 h-5 text-[#d1d5db]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6" fill="white" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className={cn("absolute bottom-0 text-[5px] font-bold leading-none", ICON_COLORS[type])}>{type.toUpperCase()}</span>
    </div>
  );
}

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

function PromptBox({ onSubmit }: { onSubmit: () => void }) {
  const [value, setValue] = useState("Send the context packet to everyone in the Disclosure Committee");

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

function TaiwanStraitContent() {
  const router = useRouter();
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const toggleFile = (id: string) => {
    setSelectedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleNotifyCrisisCohort = () => {
    router.push("/light/superhero/ceo-review/notification");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Demo controls */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Diligent Data Room</span>
            <Link href="/light/superhero/data-room" className="text-xs font-medium text-[#0369a1] hover:underline">
              ← Undisclosed Risks
            </Link>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {GC_NAME} (General Counsel)
          </span>
        </div>
      </div>

      {/* Diligent header */}
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
              <Link href="/light/superhero/data-room" className="text-[#6b7280] hover:underline">Undisclosed Risks</Link>
              <span className="text-[#9ca3af]">&gt;</span>
              <span className="text-[#6b7280]">Taiwan Strait — Supply Chain</span>
            </nav>
          </div>

          {/* Page title */}
          <div className="px-6 pt-3 pb-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <Link href="/light/superhero/data-room" className="text-[#374151] hover:text-[#111827]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </Link>
              <h1 className="text-xl font-semibold text-[#111827]">Taiwan Strait — Supply Chain</h1>
              <span className="rounded px-1.5 py-0.5 text-[10px] font-semibold bg-[#da3633]/15 text-[#da3633]">Critical</span>
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

          {/* File table */}
          <div className="flex-1 overflow-y-auto px-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="w-10 py-2.5 pl-1 pr-2"><input type="checkbox" className="rounded border-[#d1d5db] h-3.5 w-3.5" readOnly /></th>
                  <th className="py-2.5 text-left text-xs font-medium text-[#6b7280]">
                    <div className="flex items-center gap-1">
                      Name
                      <svg className="w-3 h-3 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                    </div>
                  </th>
                  <th className="w-16" />
                  <th className="py-2.5 text-left text-xs font-medium text-[#6b7280] w-36">Last modified</th>
                  <th className="py-2.5 text-left text-xs font-medium text-[#6b7280] w-24">Size</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {FILES.map((file) => (
                  <tr
                    key={file.id}
                    className={cn(
                      "border-b border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors group",
                      selectedFiles.has(file.id) && "bg-[#eff6ff]"
                    )}
                  >
                    <td className="py-2.5 pl-1 pr-2">
                      <input
                        type="checkbox"
                        checked={selectedFiles.has(file.id)}
                        onChange={() => toggleFile(file.id)}
                        className="rounded border-[#d1d5db] text-[#3b82f6] h-3.5 w-3.5"
                      />
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <FileIconSvg type={file.icon} />
                        <span className={cn("text-sm", file.isFolder ? "font-medium text-[#111827]" : "text-[#374151]")}>
                          {file.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3.5 h-3.5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <svg className="w-3.5 h-3.5 text-[#9ca3af]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                    </td>
                    <td className="py-2.5 text-xs text-[#6b7280]">{file.lastModified}</td>
                    <td className="py-2.5 text-xs text-[#6b7280]">{file.size || ""}</td>
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
          <PromptBox onSubmit={handleNotifyCrisisCohort} />
        </div>
      </div>

      <StakeholderFooter label="Continue as General Counsel to advance the workflow">
        <Link href="/light/superhero/data-room" className="text-sm text-[#6b7280] hover:text-[#374151]">
          ← Back to Undisclosed Risks
        </Link>
        <PrototypeControlButton onClick={handleNotifyCrisisCohort}>
          Notify Disclosure Committee →
        </PrototypeControlButton>
      </StakeholderFooter>
    </div>
  );
}

export default function TaiwanStraitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#ee312e] border-t-transparent rounded-full animate-spin" /></div>}>
      <TaiwanStraitContent />
    </Suspense>
  );
}

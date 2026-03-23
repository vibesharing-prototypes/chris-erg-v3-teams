"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DiligentLogo } from "./ui";
import { useSimulation } from "../SimulationContext";

/* ------------------------------------------------------------------ */
/*  Icon Sidebar (matches Risk Essentials chrome)                      */
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
/*  Top nav bar                                                        */
/* ------------------------------------------------------------------ */

function TopNav() {
  const { result } = useSimulation();
  const companyName = result?.input?.company || "Company";

  return (
    <div className="h-12 bg-[#161b22] border-b border-[#21262d] flex items-center justify-between px-4 flex-shrink-0">
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
        <span className="text-sm font-medium text-[#c9d1d9]">{companyName}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6e7681" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/risk-simulator"
          className="rounded-lg border border-[#30363d] bg-[#21262d] px-3 py-1.5 text-[11px] font-medium text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#484f58] transition-colors"
        >
          + New Simulation
        </Link>
        <div className="h-8 w-8 rounded-full bg-[#21262d] flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Simulator tab navigation                                           */
/* ------------------------------------------------------------------ */

const TABS = [
  { label: "Simulator Home", href: "/risk-simulator/home" },
  { label: "Gravity Map", href: "/risk-simulator/gravity" },
  { label: "Risk Shockwave", href: "/risk-simulator/shockwave" },
  { label: "Risk Pipeline", href: "/risk-simulator/pipeline" },
];

function SimulatorNav() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 mb-6 border-b border-[#21262d] pb-3">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return active ? (
          <span
            key={tab.href}
            className="rounded-lg px-3 py-1.5 text-[11px] font-medium bg-white/10 text-[#f0f6fc] border border-white/10"
          >
            {tab.label}
          </span>
        ) : (
          <Link
            key={tab.href}
            href={tab.href}
            className="rounded-lg px-3 py-1.5 text-[11px] font-medium text-[#6e7681] hover:text-[#c9d1d9] hover:bg-white/5 transition-colors"
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SimulatorShell — wraps all simulator pages                         */
/* ------------------------------------------------------------------ */

export default function SimulatorShell({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb?: string;
}) {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <IconSidebar />

        <div className="flex-1 flex flex-col overflow-y-auto">
          <TopNav />

          <div className="flex-1 px-8 py-6 overflow-y-auto">
            <div className="max-w-[1280px] mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] text-[#6e7681] mb-4">
                <span>AI Risk Essentials</span>
                <span>›</span>
                <Link href="/risk-simulator" className="hover:text-[#58a6ff] cursor-pointer">AI Risk Impact Simulator</Link>
                {breadcrumb && (
                  <>
                    <span>›</span>
                    <span className="text-[#c9d1d9]">{breadcrumb}</span>
                  </>
                )}
              </div>

              <SimulatorNav />

              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

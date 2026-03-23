"use client";

import React from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../../superhero/StakeholderFooter";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const AVATARS: Record<string, string> = {
  "diana-reyes": "https://randomuser.me/api/portraits/med/women/44.jpg",
  "marcus-webb": "https://i.pravatar.cc/150?u=marcus-webb",
  "james-park": "https://i.pravatar.cc/150?u=james-park",
};

const ASSIGNED_RISKS = [
  {
    id: "taiwan",
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "Critical" as const,
    owner: "Diana Reyes",
    title: "VP, Supply Chain",
    avatarUrl: AVATARS["diana-reyes"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
  {
    id: "cyber",
    name: "Critical Vendor Cybersecurity Breach",
    severity: "High" as const,
    owner: "Marcus Webb",
    title: "CISO",
    avatarUrl: AVATARS["marcus-webb"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
  {
    id: "dma",
    name: "EU Digital Markets Act Enforcement",
    severity: "High" as const,
    owner: "James Park",
    title: "Chief Compliance Officer",
    avatarUrl: AVATARS["james-park"],
    notifiedAt: "10:00 AM",
    status: "Awaiting response",
  },
];

function DiligentLogoFull() {
  return (
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
      <path d="M20.1006 15.6877C20.0186 15.8056 19.9338 15.9211 19.8467 16.0364C19.5697 16.4006 19.2675 16.7474 18.9443 17.0706C17.5077 18.5072 15.6393 19.5107 13.5459 19.8596L6.03223 12.345L8.3877 9.98755H8.38965L8.39258 9.98462L20.1006 15.6877Z" fill="#D3222A"/>
      <path d="M20.0259 4.21263C21.1905 5.84672 21.8735 7.84495 21.8735 9.99974C21.8735 12.116 21.2194 14.0737 20.1011 15.6872L8.39209 9.98412L20.0259 4.21263Z" fill="#EE312E"/>
      <path d="M13.5454 19.8581C13.0018 19.9504 12.4428 19.9997 11.8735 19.9997H3.69971L4.89307 13.4802L6.03174 12.3445L13.5454 19.8581Z" fill="#AF292E"/>
      <path d="M7.40379 10.0005L4.93727 11.2296L3.69979 13.7003L2.46653 11.2296L0 10.0005L2.46653 8.76302L3.69979 6.29649L3.71242 6.31754L4.93727 8.76302L7.40379 10.0005Z" fill="#1E1E1E"/>
      <path d="M13.5435 0.141312C16.0395 0.559546 18.2228 1.90387 19.7261 3.80733C19.8311 3.94057 19.9311 4.07423 20.0259 4.2126L8.39209 9.98409H8.38623L6.04443 7.63936L13.5435 0.141312Z" fill="#D3222A"/>
      <path d="M11.8735 0C12.4429 2.15682e-05 12.9997 0.0482901 13.5435 0.140625L6.04443 7.63965L4.88232 6.47754L3.69971 0H11.8735Z" fill="#AF292E"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.65975 9.99958L4.55273 4.89256V6.5949L7.53183 9.99958L4.55273 12.9787V15.1066L9.65975 9.99958Z" fill="#F8F8FA"/>
      <path d="M9.66016 9.99998L4.55273 15.1064V12.9785L7.53223 9.99998L4.55273 6.59471V4.89256L9.66016 9.99998Z" fill="#F8F8FA"/>
    </svg>
  );
}

function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22]", className)}>
      {children}
    </div>
  );
}

export default function CommandCenterStatusPage() {
  const [demoPanelOpen, setDemoPanelOpen] = React.useState(true);
  const [demoPanelHydrated, setDemoPanelHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem("demo-panel-open");
    if (stored !== null) setDemoPanelOpen(stored === "true");
    setDemoPanelHydrated(true);
  }, []);

  React.useEffect(() => {
    if (demoPanelHydrated) localStorage.setItem("demo-panel-open", String(demoPanelOpen));
  }, [demoPanelOpen, demoPanelHydrated]);

  return (
    <div className="min-h-screen bg-[#0d1117]">
      {/* Demo banner */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe]">
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
                    Viewing as: General Counsel — risk owners assigned &amp; notified
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-xl border border-[#0ea5e9]/40 bg-white p-1">
                  <Link href="/gc-commandcenter" className="rounded-lg px-3 py-1.5 text-xs font-medium transition text-[#0369a1] hover:bg-[#bae6fd]">← Command Center</Link>
                  <button className="rounded-lg px-3 py-1.5 text-xs font-medium transition bg-[#0ea5e9] text-white">Risks Underway</button>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] px-4 py-2">
              <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">↓ Prototype starts below — GC sees risk investigations are underway</p>
            </div>
          </>
        )}
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-6xl px-6 py-6">
        <Card>
          {/* Top bar */}
          <div className="px-6 py-4 border-b border-[#30363d] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white p-1">
                <DiligentLogoFull />
              </div>
              <div>
                <h1 className="text-sm font-semibold text-[#f0f6fc]">GRC Command Center</h1>
                <p className="text-[10px] text-[#6e7681]">Risk monitoring &amp; governance</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src="https://randomuser.me/api/portraits/med/women/65.jpg" alt="Sarah Mitchell" className="h-7 w-7 rounded-full object-cover" />
              <div>
                <p className="text-xs font-medium text-[#f0f6fc]">Sarah Mitchell</p>
                <p className="text-[10px] text-[#6e7681]">General Counsel</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Success banner */}
            <div className="rounded-xl border border-[#3fb950]/30 bg-[#3fb950]/5 p-5">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3fb950]/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3fb950" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-[#3fb950]">Risk owners notified</h2>
                  <p className="text-xs text-[#8b949e]">Today at 10:00 AM</p>
                </div>
              </div>
              <p className="text-sm text-[#c9d1d9] ml-11">
                All 3 owners have been notified and will complete an AI-guided interview to assess severity, likelihood, and existing controls. You&apos;ll receive updates as they respond.
              </p>
            </div>

            {/* Risk cards — subdued, underway state */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-[#6e7681] mb-3">Risk assessments underway</h3>
              <div className="space-y-3">
                {ASSIGNED_RISKS.map((risk) => (
                  <div key={risk.id} className="rounded-xl border border-[#30363d] bg-[#0d1117] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase flex-shrink-0",
                          risk.severity === "Critical" ? "bg-[#da3633]/20 text-[#ff7b72]" : "bg-[#d29922]/20 text-[#d29922]"
                        )}>
                          {risk.severity}
                        </span>
                        <p className="text-sm font-medium text-[#c9d1d9] truncate">{risk.name}</p>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-2">
                          <img src={risk.avatarUrl} alt={risk.owner} className="h-6 w-6 rounded-full object-cover" />
                          <div>
                            <p className="text-xs font-medium text-[#e6edf3]">{risk.owner}</p>
                            <p className="text-[10px] text-[#484f58]">{risk.title}</p>
                          </div>
                        </div>
                        <button className="text-[11px] text-[#58a6ff] hover:text-[#79b8ff] transition-colors">
                          Follow up
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-[#21262d]">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      <span className="text-[10px] text-[#484f58]">Notified today at {risk.notifiedAt} · {risk.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
              <h3 className="text-sm font-semibold text-[#f0f6fc] mb-3">What happens next</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#58a6ff]/10 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#58a6ff]">1</span>
                  </div>
                  <p className="text-xs text-[#8b949e]">Each risk owner completes an AI-guided interview about severity, likelihood, and existing controls or mitigations.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#58a6ff]/10 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#58a6ff]">2</span>
                  </div>
                  <p className="text-xs text-[#8b949e]">The system will evaluate whether the company needs to update its regulatory disclosures (10-K, 10-Q, 8-K).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#58a6ff]/10 flex-shrink-0 mt-0.5">
                    <span className="text-[10px] font-bold text-[#58a6ff]">3</span>
                  </div>
                  <p className="text-xs text-[#8b949e]">You&apos;ll be notified when assessments are complete and disclosure recommendations are ready for your review.</p>
                </div>
              </div>
            </div>

            {/* Prompt box */}
            <div className="border-t border-[#30363d] pt-5">
              <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] p-2 shadow-xl shadow-black/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white flex-shrink-0 p-1.5">
                    <DiligentLogoFull />
                  </div>
                  <input
                    type="text"
                    placeholder="Ask about risk status, follow up with owners..."
                    className="flex-1 bg-transparent text-sm text-[#f0f6fc] placeholder-[#484f58] focus:outline-none"
                  />
                  <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21262d] text-[#6e7681] hover:text-[#f0f6fc] hover:bg-[#30363d] transition-colors flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <StakeholderFooter label="Next in the prototype: Diana Reyes receives her risk owner notification">
        <PrototypeControlLink href="/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes">
          View Diana Reyes&apos; notification →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

/* ------------------------------------------------------------------ */
/*  Shared Utilities & Components                                      */
/* ------------------------------------------------------------------ */

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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
/*  Workflow stages for progress indicator                             */
/* ------------------------------------------------------------------ */

type WorkflowStage = {
  id: string;
  label: string;
  status: "completed" | "current" | "pending";
  href: string;
};

const workflowStages: WorkflowStage[] = [
  { id: "detect", label: "Detect", status: "completed", href: "/light/gc-commandcenter" },
  { id: "review", label: "Review Sources", status: "completed", href: "/light/superhero/reviewer" },
  { id: "assign", label: "Assign Owners", status: "current", href: "/light/superhero/coordinator" },
  { id: "investigate", label: "Investigate", status: "pending", href: "/light/superhero/investigator" },
  { id: "draft", label: "Draft 10-K", status: "pending", href: "/light/superhero/writer" },
  { id: "notify", label: "Notify Board", status: "pending", href: "/light/superhero/board-governance" },
];

/* ------------------------------------------------------------------ */
/*  GC Scenario: Risks to Assign Owners                                */
/* ------------------------------------------------------------------ */

type RiskToAssign = {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium";
  summary: string;
  suggestedOwners: SuggestedOwner[];
  assignedOwner?: AssignedOwner | null;
  disclosureImpact: string[];
};

type SuggestedOwner = {
  id: string;
  name: string;
  title: string;
  department: string;
  reason: string;
  avatar: string;
  avatarUrl?: string;
};

type AssignedOwner = {
  id: string;
  name: string;
  title: string;
  assignedAt: string;
  status: "pending" | "investigating" | "complete";
  dueDate: string;
};

// Professional avatar URLs
const AVATARS = {
  "diana-reyes": "https://randomuser.me/api/portraits/med/women/44.jpg",
  "marcus-webb": "https://i.pravatar.cc/150?u=marcus-webb",
  "james-park": "https://i.pravatar.cc/150?u=james-park",
};
const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

const SUGGESTED_OWNERS: SuggestedOwner[] = [
  { id: "sarah-chen", name: "Sarah Chen", title: "Deputy General Counsel", department: "Legal", reason: "Securities law expertise, handles 10-K filings", avatar: "from-[#58a6ff] to-[#a371f7]" },
  { id: "marcus-webb", name: "Marcus Webb", title: "CISO", department: "Information Security", reason: "Vendor cybersecurity oversight, breach response lead", avatar: "from-[#f85149] to-[#f0883e]", avatarUrl: AVATARS["marcus-webb"] },
  { id: "diana-reyes", name: "Diana Reyes", title: "VP Supply Chain", department: "Operations", reason: "Supplier relationships, geographic risk assessment", avatar: "from-[#3fb950] to-[#58a6ff]", avatarUrl: AVATARS["diana-reyes"] },
  { id: "james-park", name: "James Park", title: "Chief Compliance Officer", department: "Compliance", reason: "Regulatory matters, EU compliance lead", avatar: "from-[#a371f7] to-[#bc8cff]", avatarUrl: AVATARS["james-park"] },
  { id: "michael-torres", name: "Michael Torres", title: "CFO", department: "Finance", reason: "Financial impact assessment, materiality determination", avatar: "from-[#d29922] to-[#f0883e]" },
  { id: "rachel-green", name: "Rachel Green", title: "VP Risk Management", department: "Enterprise Risk", reason: "Risk register owner, enterprise risk coordinator", avatar: "from-[#58a6ff] to-[#3fb950]" },
];

const RISKS_TO_ASSIGN: RiskToAssign[] = [
  {
    id: "risk-taiwan",
    name: "Taiwan Strait Geopolitical Tensions",
    severity: "critical",
    summary: "47% of chip suppliers have Taiwan operations. Escalating tensions may disrupt semiconductor supply chain. Prior board materials referenced Vietnam as diversification target.",
    suggestedOwners: [
      SUGGESTED_OWNERS.find(o => o.id === "diana-reyes")!,
      SUGGESTED_OWNERS.find(o => o.id === "michael-torres")!,
      SUGGESTED_OWNERS.find(o => o.id === "rachel-green")!,
    ],
    disclosureImpact: ["10-K Item 1A Risk Factors", "10-Q MD&A", "Supply Chain Disclosure"],
  },
  {
    id: "risk-vendor",
    name: "Critical Vendor Cybersecurity Breach",
    severity: "high",
    summary: "CloudSecure Inc. ransomware incident affects 3 data processing agreements with 2.3M customer records.",
    suggestedOwners: [
      SUGGESTED_OWNERS.find(o => o.id === "marcus-webb")!,
      SUGGESTED_OWNERS.find(o => o.id === "james-park")!,
      SUGGESTED_OWNERS.find(o => o.id === "sarah-chen")!,
    ],
    disclosureImpact: ["Potential 8-K (Materiality TBD)", "10-K Risk Factors", "Privacy Policy"],
  },
  {
    id: "risk-dma",
    name: "EU Digital Markets Act Enforcement",
    severity: "high",
    summary: "EC enforcement actions against 3 peer companies. Our EU operations (23% of revenue) may face similar scrutiny.",
    suggestedOwners: [
      SUGGESTED_OWNERS.find(o => o.id === "james-park")!,
      SUGGESTED_OWNERS.find(o => o.id === "sarah-chen")!,
      SUGGESTED_OWNERS.find(o => o.id === "michael-torres")!,
    ],
    disclosureImpact: ["10-K Item 1A Risk Factors", "Geographic Revenue Disclosure"],
  },
];

/* ------------------------------------------------------------------ */
/*  Owner Avatar (image or gradient fallback)                          */
/* ------------------------------------------------------------------ */

function OwnerAvatar({ owner, size = "h-8 w-8", className }: { owner: SuggestedOwner; size?: string; className?: string }) {
  if (owner.avatarUrl) {
    return (
      <img
        src={owner.avatarUrl}
        alt={owner.name}
        className={cn(size, "rounded-full object-cover flex-shrink-0", className)}
      />
    );
  }
  return (
    <div className={cn(size, "rounded-full bg-gradient-to-br flex-shrink-0", owner.avatar, className)} />
  );
}

/* ------------------------------------------------------------------ */
/*  Diligent Pinned Prompt Box                                        */
/* ------------------------------------------------------------------ */

function PinnedPromptBox({ onBulkConfirm, canBulkConfirm, allAssigned }: { onBulkConfirm?: () => void; canBulkConfirm?: boolean; allAssigned?: boolean }) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const bulkConfirmSuggestion = "Confirm all suggested risk owners";
  const suggestions = canBulkConfirm
    ? [bulkConfirmSuggestion, "Confirm everyone", "Who should review Taiwan risk?", "What's the disclosure timeline?", "Summarize for the board"]
    : allAssigned
      ? ["View email sent to Diana", "Who should review Taiwan risk?", "What's the disclosure timeline?", "Summarize for the board"]
      : ["Who should review Taiwan risk?", "What's the disclosure timeline?", "Summarize for the board"];

  const handleSubmit = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault();
    const trimmed = input.trim();
    // Empty input + Enter = use default prompt (Confirm all suggested / View email)
    const effectiveInput = trimmed || (canBulkConfirm ? "Confirm all suggested risk owners" : allAssigned ? "View email sent to Diana" : "");
    const lower = effectiveInput.toLowerCase();
    const triggersBulkConfirm = canBulkConfirm && (
      lower.includes("confirm") ||
      lower.includes("accept all") ||
      lower.includes("bulk")
    );
    const triggersViewEmail = allAssigned && (
      lower.includes("view email") ||
      lower.includes("show email") ||
      lower.includes("email") ||
      lower.includes("notification")
    );
    if (triggersBulkConfirm) {
      onBulkConfirm?.();
    } else if (triggersViewEmail) {
      router.push("/light/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes");
    }
    setInput("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion === bulkConfirmSuggestion && onBulkConfirm) {
      onBulkConfirm();
      return;
    }
    if (suggestion === "Confirm everyone" && onBulkConfirm) {
      onBulkConfirm();
      return;
    }
    if (suggestion === "View email sent to Diana" && allAssigned) {
      router.push("/light/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes");
      return;
    }
    setInput(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-[#e5e7eb] bg-[#f9fafb] py-6 mt-6">
      <div className="mx-auto max-w-4xl px-6">
        {suggestions.length > 0 && !input && (
          <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
            <span className="text-[10px] text-[#9ca3af]">Try:</span>
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1 text-xs text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-2 shadow-xl shadow-black/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white flex-shrink-0 p-1.5">
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
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={canBulkConfirm ? "Confirm all suggested risk owners" : "Ask me anything about these risks..."}
              className="flex-1 bg-transparent text-sm text-[#111827] placeholder-[#9ca3af] focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className={cn(
                "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-colors",
                input.trim() ? "bg-[#3b82f6] text-white hover:bg-[#79c0ff] cursor-pointer" : "bg-[#f3f4f6] text-[#d1d5db] cursor-default"
              )}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </form>
        <div className="text-center mt-2">
          <span className="text-[10px] text-[#d1d5db]">
            AI assistant powered by Tambo · Press Enter to send
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Risk Assignment Card                                               */
/* ------------------------------------------------------------------ */

function RiskAssignmentCard({
  risk,
  onAssign,
  assignedOwner,
  onViewVendorList,
}: {
  risk: RiskToAssign;
  onAssign: (riskId: string, owner: SuggestedOwner) => void;
  assignedOwner?: AssignedOwner | null;
  onViewVendorList?: () => void;
}) {
  const recommendedOwner = risk.suggestedOwners[0];
  const [expanded, setExpanded] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<SuggestedOwner | null>(recommendedOwner);

  const handleAssign = () => {
    if (selectedOwner) {
      onAssign(risk.id, selectedOwner);
      setExpanded(false);
    }
  };

  const handleConfirmRecommended = () => {
    if (recommendedOwner) {
      onAssign(risk.id, recommendedOwner);
    }
  };

  return (
    <div className={cn(
      "rounded-xl border bg-[#f9fafb] overflow-hidden",
      risk.severity === "critical" && "border-[#da3633]/40",
      risk.severity === "high" && "border-[#d29922]/40",
      assignedOwner && "border-[#3fb950]/40"
    )}>
      <div className={cn(
        "px-5 py-4",
        risk.severity === "critical" && !assignedOwner && "bg-gradient-to-r from-[#da3633]/10 to-transparent",
        risk.severity === "high" && !assignedOwner && "bg-gradient-to-r from-[#d29922]/10 to-transparent",
        assignedOwner && "bg-gradient-to-r from-[#3fb950]/10 to-transparent"
      )}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              assignedOwner ? "bg-[#3fb950]/20" : (risk.severity === "critical" ? "bg-[#da3633]/20" : "bg-[#d29922]/20")
            )}>
              {assignedOwner ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={risk.severity === "critical" ? "#da3633" : "#d29922"} strokeWidth="2">
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <path d="M12 9v4M12 17h.01" />
                </svg>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-[#111827]">{risk.name}</h3>
                <span className={cn(
                  "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase",
                  assignedOwner ? "border-[#3fb950]/50 bg-[#3fb950]/20 text-[#16a34a]" : risk.severity === "critical" ? "border-[#da3633]/50 bg-[#da3633]/20 text-[#dc2626]" : "border-[#d29922]/50 bg-[#d29922]/20 text-[#ca8a04]"
                )}>
                  {assignedOwner ? "Assigned" : risk.severity}
                </span>
              </div>
              <p className="mt-1 text-sm text-[#6b7280]">{risk.summary}</p>
              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-[#9ca3af]">Affects:</span>
                {risk.disclosureImpact.map((item) => (
                  <span key={item} className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2 py-0.5 text-[10px] text-[#6b7280]">
                    {item}
                  </span>
                ))}
              </div>
              {risk.id === "risk-vendor" && onViewVendorList && (
                <button
                  onClick={onViewVendorList}
                  className="mt-3 flex items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1.5 text-xs text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
                >
                  <span>📊</span>
                  <span>View vendor list</span>
                  <span className="text-[10px] text-[#9ca3af]">Excel</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex-shrink-0">
            {assignedOwner ? (
              <div className="flex items-center gap-3 rounded-lg border border-[#3fb950]/30 bg-[#3fb950]/10 px-3 py-2">
                <OwnerAvatar owner={SUGGESTED_OWNERS.find(o => o.id === assignedOwner.id) ?? { id: "", name: "", title: "", department: "", reason: "", avatar: "from-[#58a6ff] to-[#a371f7]" }} />
                <div>
                  <p className="text-sm font-medium text-[#111827]">{assignedOwner.name}</p>
                  <p className="text-[10px] text-[#6b7280]">{assignedOwner.title}</p>
                </div>
                <Link href={`/light/superhero/owner-investigation/notification?risk=${risk.id}&owner=${assignedOwner.id}`} className="ml-2 rounded-lg border border-[#3b82f6] bg-[#3b82f6]/10 px-2 py-1 text-[10px] font-medium text-[#2563eb] hover:bg-[#3b82f6]/20">
                  View notification →
                </Link>
              </div>
            ) : recommendedOwner ? (
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3 rounded-lg border border-[#3b82f6]/30 bg-[#3b82f6]/5 px-3 py-2">
                  <OwnerAvatar owner={recommendedOwner} />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-medium text-[#111827]">{recommendedOwner.name}</p>
                      <span className="rounded bg-[#3b82f6]/20 px-1.5 py-0.5 text-[9px] font-medium text-[#2563eb]">AI Recommended</span>
                    </div>
                    <p className="text-[10px] text-[#6b7280]">{recommendedOwner.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpanded(true)}
                    className="rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1.5 text-xs font-medium text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
                  >
                    Change
                  </button>
                  <button
                    onClick={handleConfirmRecommended}
                    className="rounded-lg bg-[#3fb950] px-4 py-1.5 text-xs font-medium text-[#0d1117] hover:bg-[#56d364] transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                className="rounded-lg border border-[#3b82f6] bg-[#3b82f6]/10 px-4 py-2 text-xs font-medium text-[#2563eb] hover:bg-[#3b82f6]/20"
              >
                Assign Owner
              </button>
            )}
          </div>
        </div>
      </div>

      {expanded && !assignedOwner && (
        <div className="border-t border-[#e5e7eb] bg-white p-5">
          <div className="text-xs font-medium uppercase tracking-wider text-[#9ca3af] mb-3">
            Choose a different owner (AI-recommended based on role & expertise)
          </div>
          <div className="space-y-2">
            {risk.suggestedOwners.map((owner) => (
              <div
                key={owner.id}
                onClick={() => setSelectedOwner(selectedOwner?.id === owner.id ? null : owner)}
                className={cn(
                  "flex items-center gap-4 rounded-lg border p-3 cursor-pointer transition-all",
                  selectedOwner?.id === owner.id ? "border-[#3b82f6] bg-[#3b82f6]/10" : "border-[#e5e7eb] hover:border-[#3b82f6]/50 hover:bg-[#f3f4f6]"
                )}
              >
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full overflow-hidden">
                  <OwnerAvatar owner={owner} size="h-10 w-10" />
                  {selectedOwner?.id === owner.id && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-[#3b82f6]/80">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#111827]">{owner.name}</p>
                  <p className="text-xs text-[#6b7280]">{owner.title} · {owner.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#9ca3af] max-w-[200px]">{owner.reason}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-[#e5e7eb] pt-3">
            <button onClick={() => setExpanded(false)} className="text-xs text-[#6b7280] hover:text-[#111827]">
              Cancel
            </button>
            <button
              onClick={handleAssign}
              disabled={!selectedOwner}
              className={cn(
                "rounded-lg px-4 py-2 text-xs font-medium transition",
                selectedOwner ? "bg-[#3b82f6] text-white hover:bg-[#79c0ff]" : "bg-[#f3f4f6] text-[#d1d5db] cursor-not-allowed"
              )}
            >
              Assign {selectedOwner?.name.split(" ")[0] || "Owner"} →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

const VENDOR_LIST_DATA = [
  { vendor: "CloudSecure Inc.", category: "Data Processing", riskLevel: "High", contract: "DPA-2024-001" },
  { vendor: "TechVendor LLC", category: "Cloud Infrastructure", riskLevel: "Medium", contract: "MSA-2023-089" },
  { vendor: "SecureLogix", category: "Logging & Analytics", riskLevel: "Low", contract: "SLA-2024-012" },
];

export default function CoordinatorPage() {
  const [assignments, setAssignments] = useState<Record<string, AssignedOwner>>({});
  const [showVendorListModal, setShowVendorListModal] = useState(false);
  const [show3PMUpsell, setShow3PMUpsell] = useState(false);

  const handleAssign = (riskId: string, owner: SuggestedOwner) => {
    setAssignments(prev => ({
      ...prev,
      [riskId]: {
        id: owner.id,
        name: owner.name,
        title: owner.title,
        assignedAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
        status: "pending",
        dueDate: "Feb 5, 2026",
      }
    }));
  };

  const handleBulkConfirm = () => {
    setAssignments((prev) => {
      const next = { ...prev };
      RISKS_TO_ASSIGN.forEach((risk) => {
        if (!next[risk.id] && risk.suggestedOwners[0]) {
          const owner = risk.suggestedOwners[0];
          next[risk.id] = {
            id: owner.id,
            name: owner.name,
            title: owner.title,
            assignedAt: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
            status: "pending",
            dueDate: "Feb 5, 2026",
          };
        }
      });
      return next;
    });
  };

  const assignedCount = Object.keys(assignments).length;
  const allAssigned = assignedCount === RISKS_TO_ASSIGN.length;
  const unassignedCount = RISKS_TO_ASSIGN.length - assignedCount;
  const canBulkConfirm = unassignedCount > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Meta-Prototype-Info blue banner */}
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe]">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">
            Demo controls — not part of prototype
          </p>
        </div>
        <div className="w-full border-b border-[#0ea5e9]/20 bg-[#e0f2fe]">
          <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 flex-wrap gap-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
              <span className="text-sm font-semibold text-[#0c4a6e]">Risk Detection → 10K Update → Board Notification</span>
              <span className="rounded-full border border-[#dc2626]/50 bg-[#fecaca] px-2 py-0.5 text-[10px] font-medium text-[#b91c1c]">
                Step 2: Assign Owners
              </span>
            </div>
            <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
              Viewing as: General Counsel
            </span>
          </div>
        </div>
        <div className="border-t-2 border-[#0ea5e9] bg-[#0c4a6e] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#7dd3fc]">
            ↓ Prototype starts below (Assign Risk Owners)
          </p>
        </div>
      </div>

      <main className="flex-1 min-h-0 overflow-y-auto min-w-0 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 min-h-full">
        <div className="rounded-3xl border border-[#e5e7eb] bg-[#f9fafb] shadow-sm">
          <div className="border-b border-[#e5e7eb] bg-white/90 px-6 py-4 rounded-t-3xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <DiligentLogo className="h-7 w-auto" />
                  <span className="text-sm font-semibold text-[#111827]">GRC Command Center</span>
                </div>
                <span className="rounded-full border border-[#3b82f6]/40 bg-[#3b82f6]/10 px-2 py-0.5 text-[10px] font-medium text-[#2563eb]">
                  General Counsel
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/light/gc-commandcenter" className="text-xs text-[#6b7280] hover:text-[#111827]">
                  ← Back to Dashboard
                </Link>
                <img src={GC_AVATAR_URL} alt="General Counsel" className="h-8 w-8 rounded-full object-cover" />
              </div>
            </div>
          </div>

          <div className="border-b border-[#e5e7eb] bg-white/50 px-6 py-3">
            <div className="flex items-center justify-center gap-2">
              {workflowStages.map((stage, idx) => (
                <React.Fragment key={stage.id}>
                  <Link
                    href={stage.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors",
                      stage.status === "completed" && "bg-[#3fb950]/10 text-[#16a34a] hover:bg-[#3fb950]/20",
                      stage.status === "current" && "bg-[#d29922]/20 text-[#ca8a04] ring-1 ring-[#d29922]/50",
                      stage.status === "pending" && "bg-[#f3f4f6] text-[#9ca3af] hover:text-[#6b7280]"
                    )}
                  >
                    {stage.status === "completed" && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    )}
                    {stage.status === "current" && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d29922] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d29922]"></span>
                      </span>
                    )}
                    <span className="font-medium">{stage.label}</span>
                  </Link>
                  {idx < workflowStages.length - 1 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={stage.status === "completed" ? "#16a34a" : "#e5e7eb"} strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="px-6 py-6">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-[#111827]">Assign Risk Owners</h1>
              <p className="mt-1 text-sm text-[#6b7280]">
                Select owners to investigate each risk and provide context before drafting disclosure updates.
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#d1d5db]">Risks to Assign</div>
                <div className="mt-1 text-2xl font-bold text-[#111827]">{RISKS_TO_ASSIGN.length}</div>
                <div className="mt-1 text-xs text-[#6b7280]">From detection analysis</div>
              </div>
              <div className={cn("rounded-xl border p-4", allAssigned ? "border-[#3fb950]/30 bg-[#3fb950]/5" : "border-[#e5e7eb] bg-white")}>
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#d1d5db]">Assigned</div>
                <div className={cn("mt-1 text-2xl font-bold", allAssigned ? "text-[#16a34a]" : "text-[#111827]")}>{assignedCount}</div>
                <div className="mt-1 text-xs text-[#6b7280]">
                  {allAssigned ? "All risks assigned!" : `${RISKS_TO_ASSIGN.length - assignedCount} remaining`}
                </div>
              </div>
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#d1d5db]">Suggested Owners</div>
                <div className="mt-1 text-2xl font-bold text-[#111827]">{SUGGESTED_OWNERS.length}</div>
                <div className="mt-1 text-xs text-[#6b7280]">AI-recommended by role</div>
              </div>
              <div className="rounded-xl border border-[#e5e7eb] bg-white p-4">
                <div className="text-[10px] font-medium uppercase tracking-wider text-[#d1d5db]">Investigation Due</div>
                <div className="mt-1 text-2xl font-bold text-[#111827]">Feb 5</div>
                <div className="mt-1 text-xs text-[#6b7280]">Before Feb 28 Board</div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-[#111827]">Detected Risks</h2>
                <p className="text-xs text-[#6b7280] mt-0.5">Assign an owner to investigate each risk and provide additional context</p>
              </div>
              {canBulkConfirm && (
                <button
                  type="button"
                  onClick={handleBulkConfirm}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#3fb950] px-4 py-2 text-sm font-medium text-[#0d1117] hover:bg-[#56d364] transition-colors cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Confirm all suggested
                </button>
              )}
            </div>

            <div className="space-y-4 mb-8">
              {RISKS_TO_ASSIGN.map((risk) => (
                <RiskAssignmentCard
                  key={risk.id}
                  risk={risk}
                  onAssign={handleAssign}
                  assignedOwner={assignments[risk.id]}
                  onViewVendorList={risk.id === "risk-vendor" ? () => setShowVendorListModal(true) : undefined}
                />
              ))}
            </div>

            {allAssigned && (
              <div className="rounded-xl border border-[#3fb950]/30 bg-[#3fb950]/5 p-5 mb-8">
                <h3 className="text-sm font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Notifications sent
                </h3>
                <p className="text-xs text-[#6b7280] mb-4">
                  Risk owners have been notified. Here is the email sent to Diana Reyes (Taiwan Strait risk):
                </p>
                <div className="rounded-xl border border-[#e5e7eb] bg-[#f9fafb] overflow-hidden">
                  <div className="border-b border-[#e5e7eb] bg-white px-4 py-3">
                    <div className="flex items-center gap-2 text-[#9ca3af] text-xs mb-1">
                      <span>From:</span>
                      <span className="text-[#111827]">GRC Command Center &lt;noreply@diligent.com&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af] text-xs mb-1">
                      <span>To:</span>
                      <span className="text-[#111827]">Diana Reyes &lt;diana.reyes@company.com&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#9ca3af] text-xs">
                      <span>Subject:</span>
                      <span className="text-[#111827] font-medium">Risk investigation required: Taiwan Strait Geopolitical Tensions</span>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-[#111827]">Hi Diana,</p>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      The General Counsel has assigned you to investigate an emerging risk that requires your domain expertise.
                      Your input is needed before the team can draft 10-K disclosure updates.
                    </p>
                    <div className="rounded-lg border border-[#e5e7eb] bg-white p-3">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-[#9ca3af] mb-0.5">Assigned risk</p>
                      <p className="text-sm font-semibold text-[#111827]">Taiwan Strait Geopolitical Tensions</p>
                    </div>
                    <p className="text-sm text-[#6b7280] leading-relaxed">
                      Please review the AI analysis, add context from your expertise, and validate the severity and disclosure recommendations.
                      The investigation is due by Feb 5, 2026.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {assignedCount > 0 && !allAssigned && (
              <div className="rounded-xl border border-[#3b82f6]/30 bg-[#3b82f6]/5 p-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]/20">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#111827]">What happens next?</h3>
                    <p className="mt-1 text-xs text-[#6b7280]">
                      Assigned owners will receive a notification to investigate their assigned risk. Confirm all suggested owners to send notifications.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-6">
              {allAssigned && (
                <span className="text-xs text-[#16a34a] flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  All owners assigned
                </span>
              )}
              {!allAssigned && (
                <span className="text-xs text-[#6b7280]">
                  Assign {RISKS_TO_ASSIGN.length - assignedCount} more owners to continue
                </span>
              )}
            </div>

            <PinnedPromptBox onBulkConfirm={handleBulkConfirm} canBulkConfirm={canBulkConfirm} allAssigned={allAssigned} />
          </div>
        </div>
      </div>
      </main>

      {/* In-situ: Vendor list (Excel) → 3PM upsell */}
      {showVendorListModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setShowVendorListModal(false)}>
          <div
            className="w-full max-w-2xl rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="border-b border-[#e5e7eb] bg-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <h3 className="text-base font-semibold text-[#111827]">Vendor list</h3>
                <span className="rounded border border-[#6e7681] bg-[#f3f4f6] px-1.5 py-0.5 text-[10px] text-[#6b7280]">Excel</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShow3PMUpsell(true)}
                  className="rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-3 py-1.5 text-xs text-[#6b7280] hover:border-[#3b82f6]/50 hover:text-[#111827] transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={() => setShow3PMUpsell(true)}
                  className="rounded-lg bg-[#3fb950] px-3 py-1.5 text-xs font-medium text-[#0d1117] hover:bg-[#46c35a] transition-colors"
                >
                  + Add vendor
                </button>
                <button onClick={() => setShowVendorListModal(false)} className="rounded-lg p-1.5 text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#e5e7eb] bg-white">
                    <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">Vendor</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">Category</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">Risk Level</th>
                    <th className="px-4 py-2.5 text-left text-[10px] font-medium uppercase tracking-wider text-[#9ca3af]">Contract</th>
                  </tr>
                </thead>
                <tbody>
                  {VENDOR_LIST_DATA.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#e5e7eb] hover:bg-[#f3f4f6]/50 cursor-pointer"
                      onClick={() => setShow3PMUpsell(true)}
                    >
                      <td className="px-4 py-2.5 text-[#111827]">{row.vendor}</td>
                      <td className="px-4 py-2.5 text-[#6b7280]">{row.category}</td>
                      <td className="px-4 py-2.5">
                        <span className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-medium",
                          row.riskLevel === "High" && "bg-[#da3633]/20 text-[#dc2626]",
                          row.riskLevel === "Medium" && "bg-[#d29922]/20 text-[#ca8a04]",
                          row.riskLevel === "Low" && "bg-[#3fb950]/20 text-[#16a34a]"
                        )}>
                          {row.riskLevel}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-[#6b7280]">{row.contract}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-[#e5e7eb] px-4 py-2 bg-white">
              <p className="text-[10px] text-[#9ca3af]">Vendor_List_Q1_2026.xlsx · Last saved 9:12 AM</p>
            </div>
          </div>
        </div>
      )}

      {/* 3PM in-situ upsell — appears when user interacts with vendor list */}
      {show3PMUpsell && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" onClick={() => setShow3PMUpsell(false)}>
          <div
            className="max-w-md rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3fb950]/20">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">Try Diligent 3PM</h3>
                <p className="text-xs text-[#6b7280]">Third-Party Risk Management</p>
              </div>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed mb-5">
              Managing vendors in Excel? 3PM centralizes screening, due diligence, and AI Media Monitor—so you get real-time alerts (like the CloudSecure breach) instead of manual tracking.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShow3PMUpsell(false)}
                className="flex-1 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-4 py-2.5 text-sm font-medium text-[#6b7280] hover:border-[#6e7681] hover:text-[#111827] transition-colors"
              >
                Keep using Excel
              </button>
              <button
                onClick={() => { setShow3PMUpsell(false); setShowVendorListModal(false); }}
                className="flex-1 rounded-lg bg-[#3fb950] px-4 py-2.5 text-sm font-medium text-[#0d1117] hover:bg-[#46c35a] transition-colors"
              >
                Try 3PM
              </button>
            </div>
          </div>
        </div>
      )}

      <StakeholderFooter label={allAssigned ? "Continue as General Counsel to advance the workflow" : "Complete owner assignments above to continue"}>
        <Link href="/light/superhero/reviewer" className="text-sm text-[#6b7280] hover:text-[#374151]">
          ← Back to Detection Sources
        </Link>
        {allAssigned && (
          <PrototypeControlLink href="/light/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes">
            Continue to owner investigation →
          </PrototypeControlLink>
        )}
      </StakeholderFooter>
    </div>
  );
}

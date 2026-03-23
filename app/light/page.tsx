"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "Entry Points",
    steps: [
      {
        id: "A",
        title: "Boards Home (Near-Term Vision)",
        description: "GC opens the standard Boards system enhanced with the GRC Command Center panel.",
        href: "/light/superhero/boards-home",
      },
      {
        id: "A2",
        title: "Boards Home — Dark (Near-Term Vision)",
        description: "Dark-mode variant of the Boards system with GRC Command Center panel.",
        href: "/light/superhero/boards-dark",
      },
      {
        id: "B",
        title: "GRC Command Center (Full Vision)",
        description: "GC opens the full GRC Command Center — agents have detected emerging risks.",
        href: "/light/gc-commandcenter",
      },
      {
        id: "C",
        title: "AI Risk Discovery (Light)",
        description: "Diligent product view — AI-scanned risks from 98K+ filings with 3 new emerging risks flagged.",
        href: "/superhero/risk-discovery",
      },
      {
        id: "C2",
        title: "AI Risk Discovery (Dark)",
        description: "Dark-mode variant of the AI Risk Discovery product view.",
        href: "/superhero/risk-discovery-dark",
      },
    ],
  },
  {
    heading: "General Counsel — Detection & Assignment",
    steps: [
      {
        id: 1,
        title: "Review Detection Sources",
        description: "GC reviews what agents scanned and where the emerging risks originated.",
        href: "/light/superhero/reviewer",
      },
      {
        id: 2,
        title: "Assign Risk Owners",
        description: "GC assigns owners to each detected risk and kicks off investigation workflows.",
        href: "/light/superhero/coordinator",
      },
    ],
  },
  {
    heading: "Risk Owner & CRO",
    steps: [
      {
        id: 3,
        title: "Owner Investigation Notification",
        description: "Diana Reyes receives an email notification to investigate Taiwan Strait risk.",
        href: "/light/superhero/owner-investigation/notification?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 4,
        title: "Owner Investigation",
        description: "Risk owner investigates the risk, provides context, validates severity.",
        href: "/light/superhero/owner-investigation?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 5,
        title: "CRO Review",
        description: "Chief Risk Officer reviews the owner's findings and adds assessment.",
        href: "/light/superhero/cro-review?risk=risk-taiwan&owner=diana-reyes",
      },
    ],
  },
  {
    heading: "General Counsel — Drafting & Review",
    steps: [
      {
        id: 6,
        title: "Draft 10-K Risk Disclosures",
        description: "AI-assisted drafting of updated risk disclosure language for all 3 risks.",
        href: "/light/superhero/writer?risk=risk-taiwan&owner=diana-reyes",
      },
      {
        id: 7,
        title: "GC Notification — Draft Ready",
        description: "GC receives notification that the 10-K draft is ready for review.",
        href: "/light/superhero/gc-review/notification",
      },
      {
        id: 8,
        title: "GC Review & Feedback",
        description: "GC reviews the 10-K and ERM deck, then creates a Context Packet.",
        href: "/light/superhero/gc-review-feedback",
      },
      {
        id: 9,
        title: "Context Packet",
        description: "Build a Context Packet with peer filings, transcripts, news, and Q&A prep.",
        href: "/light/superhero/context-packet",
      },
    ],
  },
  {
    heading: "Data Room & CEO Approval",
    steps: [
      {
        id: 10,
        title: "Diligent Data Room",
        description: "View the Context Packet and official documents in the Data Room.",
        href: "/light/superhero/data-room",
      },
      {
        id: 11,
        title: "Taiwan Strait — Detail",
        description: "Drill into the Taiwan Strait context packet files.",
        href: "/light/superhero/data-room/taiwan-strait",
      },
      {
        id: 12,
        title: "CEO Notification",
        description: "CEO receives consolidated notification for all undisclosed risks.",
        href: "/light/superhero/ceo-review/notification",
      },
      {
        id: 13,
        title: "CEO Approval",
        description: "CEO reviews disclosures, approves, and suggests additional committee routing.",
        href: "/light/superhero/ceo-review",
      },
      {
        id: "13b",
        title: "Approval Status",
        description: "CEO disclosure approval page with pipeline status, documents, AI verification, and risk cards.",
        href: "/light/superhero/approval-status",
      },
    ],
  },
  {
    heading: "Committee Review & Filing",
    steps: [
      {
        id: 14,
        title: "GC Mobile Notification — CEO Approved",
        description: "GC notified that CEO approved and wants additional committees to review.",
        href: "/light/superhero/gc-notification/ceo-approved",
      },
      {
        id: 15,
        title: "Board Director Reviews in Boards",
        description: "Board Director reviews 10-K risk factor update in Boards with GovernAI.",
        href: "/light/superhero/board-governance",
      },
      {
        id: 16,
        title: "GC — All Committee Members Reviewed",
        description: "GC sees all committee members reviewed, EDGAR filing package is ready.",
        href: "/light/superhero/gc-committee-complete",
      },
    ],
  },
  {
    heading: "Standalone Visualizations",
    steps: [
      {
        id: "13c",
        title: "Risk Impact Visualization",
        description: "AI-detected Taiwan Strait risk — supply chain dependency map, control coverage, and disclosure readiness.",
        href: "/light/superhero/risk-analysis",
      },
      {
        id: "13d",
        title: "Risk Gravity Map",
        description: "Cinematic visualization of financial exposure pulled toward major enterprise risks with scenario simulation.",
        href: "/superhero/risk-gravity",
      },
      {
        id: "13e",
        title: "Risk Shockwave",
        description: "Animated propagation from geopolitical signal to disclosure — 37 minutes across 5 enterprise functions.",
        href: "/superhero/risk-shockwave",
      },
      {
        id: "13f",
        title: "Risk-to-Disclosure Pipeline",
        description: "7-stage pipeline from external signal to GC decision — traceability, evidence chain, and AI-drafted disclosure.",
        href: "/superhero/risk-pipeline",
      },
    ],
  },
];

export default function LightModeIndex() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827]">
      <header className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center rounded-full bg-[#f3f4f6] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#374151] border border-[#e5e7eb]">
              Light Mode
            </span>
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-[#1f2937] px-3 py-1 text-[11px] font-medium text-[#9ca3af] hover:bg-[#111827] hover:text-white transition-colors"
            >
              Switch to Dark Mode →
            </Link>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-[#6b7280] mb-2">
            Prototype Navigation — Not Part of Demo
          </p>
          <h1 className="text-xl font-semibold text-[#111827]">
            GC Emerging Risk Response — Page Index
          </h1>
          <p className="text-sm text-[#6b7280] mt-2 leading-relaxed">
            Jump to any page in the prototype. Use this as a cheat sheet to skip
            ahead or revisit a specific step without clicking through the full flow.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8 space-y-8">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af] mb-3">
              {section.heading}
            </h2>
            <div className="rounded-lg border border-[#e5e7eb] bg-white divide-y divide-[#f3f4f6] overflow-hidden">
              {section.steps.map((step) => (
                <Link
                  key={step.id}
                  href={step.href}
                  className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#f9fafb] transition-colors group"
                >
                  <span className="flex-shrink-0 h-7 w-7 rounded-full bg-[#f3f4f6] flex items-center justify-center text-xs font-medium text-[#6b7280] group-hover:bg-[#e5e7eb] transition-colors">
                    {step.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-[#111827] group-hover:text-[#2563eb] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#9ca3af] mt-0.5 truncate">{step.description}</p>
                  </div>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#d1d5db"
                    strokeWidth="2"
                    className="flex-shrink-0 group-hover:stroke-[#2563eb] transition-colors"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-[#e5e7eb] text-center">
          <p className="text-xs text-[#d1d5db]">
            Prototype built with Next.js · Hosted on VibeSharing
          </p>
        </div>
      </main>
    </div>
  );
}

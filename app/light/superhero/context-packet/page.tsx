"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LeftRail } from "../LeftRail";
import { StakeholderFooter, PrototypeControlButton } from "../StakeholderFooter";

const GC_NAME = "Sarah Mitchell";
const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

const BUILD_STEPS = [
  "Gathering peer 10-K filings",
  "Processing earnings call transcripts",
  "Collecting related news and analysis",
  "Preparing Q&A and suggested responses",
  "Drafting press release for review",
];

function ContextPacketContent() {
  const router = useRouter();
  const [isBuilding, setIsBuilding] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= BUILD_STEPS.length - 1) {
          clearInterval(stepInterval);
          setTimeout(() => setIsBuilding(false), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(stepInterval);
  }, []);

  const handleNotifyCrisisCohort = () => {
    router.push("/light/superhero/ceo-review/notification");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">Review & Approval</span>
            <Link href="/light/superhero/gc-review-feedback" className="text-xs font-medium text-[#0369a1] hover:underline">
              ← Review Feedback
            </Link>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {GC_NAME} (General Counsel)
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        <LeftRail actorLabel={GC_NAME} activeWorkflowStep="Review Feedback" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="border-b border-[#e5e7eb] bg-[#f9fafb] px-6 py-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <img src={GC_AVATAR_URL} alt="GC" className="h-8 w-8 rounded-full object-cover" />
              <div>
                <h1 className="text-lg font-semibold text-[#111827]">Context Packet</h1>
                <p className="text-xs text-[#6b7280]">Peer filings, transcripts, and disclosure prep materials</p>
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
            <div className="w-full max-w-2xl rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-8">
              {isBuilding ? (
                <>
                  <p className="text-sm text-[#374151] leading-relaxed mb-6">
                    Creating your Context Packet. It will only take a few moments.
                  </p>
                  <div className="flex items-start gap-3 mb-6">
                    <div className="h-6 w-6 shrink-0 mt-0.5">
                      <div className="h-6 w-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
                    </div>
                    <ul className="space-y-2">
                      {BUILD_STEPS.map((step, i) => (
                        <li
                          key={step}
                          className={`text-sm ${
                            i < currentStep
                              ? "text-[#16a34a]"
                              : i === currentStep
                                ? "text-[#2563eb] font-medium"
                                : "text-[#9ca3af]"
                          }`}
                        >
                          {i < currentStep && "✓ "}
                          {i === currentStep && "● "}
                          {step}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3fb950]/20">
                      <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-[#111827]">Context Packet is ready</h2>
                  </div>
                  <p className="text-sm text-[#374151] leading-relaxed mb-6">
                    Your Context Packet includes peer 10-K filings, earnings call transcripts, related news, Q&A prep, and a draft press release. You can review it now or proceed to notify the Disclosure Committee.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/light/superhero/data-room"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#3b82f6] bg-[#3b82f6]/10 px-5 py-2.5 text-sm font-semibold text-[#2563eb] hover:bg-[#3b82f6]/20 transition-colors"
                    >
                      View in Diligent Data Room
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </Link>
                    <button
                      onClick={handleNotifyCrisisCohort}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#3fb950] px-5 py-2.5 text-sm font-semibold text-[#0d1117] hover:bg-[#46c35a] transition-colors"
                    >
                      Notify Disclosure Committee
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <StakeholderFooter label="Continue as General Counsel to advance the workflow">
        {!isBuilding && (
          <PrototypeControlButton onClick={handleNotifyCrisisCohort}>
            Notify Disclosure Committee →
          </PrototypeControlButton>
        )}
      </StakeholderFooter>
    </div>
  );
}

export default function ContextPacketPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><div className="h-8 w-8 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" /></div>}>
      <ContextPacketContent />
    </Suspense>
  );
}

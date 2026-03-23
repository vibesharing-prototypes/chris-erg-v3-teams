"use client";

import React from "react";
import Link from "next/link";

export default function InterstitialPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#6b7280] mb-2">
          Not part of prototype
        </p>
        <h1 className="text-2xl font-semibold text-[#111827] mb-2">
          Part 1 complete — take a breath
        </h1>
        <p className="text-base text-[#4b5563] leading-relaxed mb-12">
          Here&apos;s a summary of what we&apos;ve covered so far, and what happens next.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-sm font-semibold text-[#374151] uppercase tracking-wider mb-4">
              What happened (Part 1)
            </h2>
            <ol className="space-y-3 text-[15px] text-[#4b5563] leading-relaxed">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-medium text-[#10b981]">1</span>
                <span><strong className="text-[#111827]">Detection</strong> — AI scanned news, regulatory filings, and board materials; flagged Taiwan Strait, Vendor Breach, and EU DMA risks.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-medium text-[#10b981]">2</span>
                <span><strong className="text-[#111827]">Review & assign owners</strong> — GC assigned Diana Reyes (Taiwan), Marcus Webb (Vendor), James Park (EU DMA) to investigate.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-medium text-[#10b981]">3</span>
                <span><strong className="text-[#111827]">Owner investigations</strong> — Risk owners added context, validated severity, and confirmed disclosure recommendations.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-medium text-[#10b981]">4</span>
                <span><strong className="text-[#111827]">CRO review</strong> — Chief Risk Officer assessed likelihood, impact, controls, and mitigations; submitted assessment.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#10b981]/10 text-xs font-medium text-[#10b981]">5</span>
                <span><strong className="text-[#111827]">10-K draft</strong> — GC prepared disclosure updates with prior-year language, gap analysis, and AI-assisted drafting; submitted draft.</span>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-sm font-semibold text-[#374151] uppercase tracking-wider mb-4">
              What&apos;s next (Part 2)
            </h2>
            <p className="text-[15px] text-[#4b5563] leading-relaxed mb-4">
              Part 2 covers the filing workflow: counsel review, audit committee sign-off, CEO/CFO certification, and EDGAR submission. EDGAR approval happens in the Command Center — agents prepare the package, GC approves.
            </p>
            <ul className="space-y-2 text-[15px] text-[#4b5563]">
              <li className="flex gap-2">
                <span className="text-[#f59e0b]">•</span>
                Filing checklist and audit trail
              </li>
              <li className="flex gap-2">
                <span className="text-[#f59e0b]">•</span>
                Diligent Entities + Policy Manager upsell
              </li>
              <li className="flex gap-2">
                <span className="text-[#f59e0b]">•</span>
                Board notification flow
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-14 pt-10 border-t border-[#e5e7eb]">
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/superhero/gc-review/notification"
              className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-6 py-3 text-sm font-semibold text-white hover:bg-[#1f2937] transition-colors"
            >
              Continue to Part 2
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/superhero/writer"
              className="text-sm text-[#6b7280] hover:text-[#374151]"
            >
              ← Back to 10-K draft
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

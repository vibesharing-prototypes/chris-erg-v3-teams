"use client";

import React from "react";
import { useRouter } from "next/navigation";

const GC_NAME = "Sarah Mitchell";
const GC_AVATAR_URL = "https://randomuser.me/api/portraits/med/women/65.jpg";

export default function GcNotificationCeoApprovedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="border-b-2 border-[#0ea5e9]/40 bg-[#e0f2fe] flex-shrink-0">
        <div className="border-b border-[#0ea5e9]/30 bg-[#bae6fd] px-4 py-2">
          <p className="text-[10px] font-medium uppercase tracking-widest text-[#0369a1]">Demo controls — not part of prototype</p>
        </div>
        <div className="px-4 py-2 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-[#0369a1]">Prototype</span>
            <span className="text-sm font-semibold text-[#0c4a6e]">CEO Approved → GC Notification</span>
          </div>
          <span className="rounded-full border-2 border-[#0c4a6e] bg-[#7dd3fc]/30 px-3 py-1 text-xs font-semibold text-[#0c4a6e]">
            Viewing as: {GC_NAME} (General Counsel)
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-6">
          <p className="text-center text-sm text-[#6b7280] max-w-md">
            {GC_NAME}&apos;s iPhone. A Diligent notification arrives after the CEO approves the 10-K updates. Tap it to continue.
          </p>

          {/* iPhone mockup */}
          <div className="relative w-[280px] rounded-[3rem] border-[14px] border-[#1c1c1e] bg-[#1c1c1e] shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-[#1c1c1e] rounded-b-[20px] z-20" />
            {/* Screen */}
            <div className="relative w-full aspect-[9/19.5] rounded-[2.25rem] overflow-hidden bg-[#000]">
              {/* Dummy home screen / lock screen background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#2d2d2d] via-[#1a1a1a] to-[#0a0a0a]" />
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: "radial-gradient(circle at 50% 30%, #3b82f6 0%, transparent 50%)",
              }} />

              {/* Status bar (time, battery, etc.) */}
              <div className="absolute top-0 left-0 right-0 pt-11 px-6 flex justify-between items-center text-white text-[11px] font-medium z-10">
                <span>9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="18" height="10" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="1" y="2" width="18" height="8" rx="2" />
                    <path d="M20 4h2v4h-2z" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Diligent notification - iOS style banner */}
              <button
                onClick={() => router.push("/light/superhero/board-governance")}
                className="absolute top-[70px] left-2 right-2 z-30 text-left rounded-2xl border border-white/20 bg-black/70 backdrop-blur-xl overflow-hidden shadow-xl hover:bg-black/80 active:scale-[0.98] transition-transform"
              >
                <div className="p-3 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EE312E]/90">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[13px] font-semibold text-white">Diligent</span>
                      <span className="text-[11px] text-white/60">now</span>
                    </div>
                    <p className="text-[13px] text-white/90 leading-snug">
                      CEO has approved disclosures and wants you to forward to additional committees for review. Tap to see details.
                    </p>
                  </div>
                </div>
              </button>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[100px] h-[5px] rounded-full bg-white/40" />
            </div>
          </div>

          <p className="text-xs text-[#9ca3af]">
            Tap the notification above to open Command Center (same start screen as step 1) →
          </p>
        </div>
      </div>
    </div>
  );
}

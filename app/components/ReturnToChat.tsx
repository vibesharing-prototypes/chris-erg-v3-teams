"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ReturnButton() {
  const params = useSearchParams();
  const from = params?.get("from");
  if (from !== "teams" && from !== "slack") return null;

  const isTeams = from === "teams";
  const label = isTeams ? "Return to Teams" : "Return to Slack";
  const href = isTeams ? "/teams" : "/slack";
  const bg = isTeams ? "#6264A7" : "#4A154B";
  const hoverBg = isTeams ? "#7B7FBF" : "#5E2060";

  return (
    <a
      href={href}
      className="fixed top-4 right-4 z-[9999] flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[13px] font-semibold shadow-lg transition-all hover:scale-105"
      style={{ backgroundColor: bg }}
      onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverBg)}
      onMouseLeave={e => (e.currentTarget.style.backgroundColor = bg)}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 12H5M12 19l-7-7 7-7" />
      </svg>
      {label}
    </a>
  );
}

export default function ReturnToChat() {
  return (
    <Suspense fallback={null}>
      <ReturnButton />
    </Suspense>
  );
}

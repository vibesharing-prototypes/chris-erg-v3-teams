"use client";

import React from "react";
import Link from "next/link";

/**
 * White footer at the bottom of the app where stakeholder navigation lives.
 * The app content stops above it; prototype control buttons are pink to stand out from in-app blue.
 */
export function StakeholderFooter({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <footer className="flex-shrink-0 border-t-2 border-[#e5e7eb] bg-white">
      <div className="mx-auto max-w-4xl px-4 py-5">
        <p className="text-xs text-[#6b7280] mb-3">{label}</p>
        <div className="flex flex-wrap items-center gap-3">{children}</div>
      </div>
    </footer>
  );
}

const PROTOTYPE_BUTTON_CLASS =
  "inline-flex items-center gap-2 rounded-lg border-2 border-[#ec4899] bg-[#ec4899]/10 px-5 py-2.5 text-sm font-semibold text-[#ec4899] hover:bg-[#ec4899]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

/** Pink prototype control button — use for stakeholder navigation to advance the narrative */
export function PrototypeControlButton({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${PROTOTYPE_BUTTON_CLASS} ${className}`}
    >
      {children}
    </button>
  );
}

/** Pink prototype control link — use for stakeholder navigation to advance the narrative */
export function PrototypeControlLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${PROTOTYPE_BUTTON_CLASS} ${className}`}>
      {children}
    </Link>
  );
}

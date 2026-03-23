"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

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

const COMMITTEE_MEMBERS = [
  { name: "David Patel", title: "Audit Committee Chair", avatar: "DP", reviewedAt: "10:12 AM", action: "No changes" },
  { name: "Linda Nakamura", title: "Risk Committee Chair", avatar: "LN", reviewedAt: "10:34 AM", action: "No changes" },
  { name: "James Thornton", title: "Independent Director", avatar: "JT", reviewedAt: "11:07 AM", action: "No changes" },
  { name: "Patricia Wells", title: "Cybersecurity Committee Chair", avatar: "PW", reviewedAt: "11:22 AM", action: "No changes" },
  { name: "Michael Okafor", title: "Compliance Committee Chair", avatar: "MO", reviewedAt: "10:48 AM", action: "No changes" },
];

const RISKS_REVIEWED = [
  { name: "Taiwan Strait Geopolitical Tensions", severity: "Critical", color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
  { name: "Critical Vendor Cybersecurity Breach", severity: "High", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
  { name: "EU Digital Markets Act Enforcement", severity: "High", color: "#D97706", bg: "#FEF3C7", border: "#FDE68A" },
];

export default function GCCommitteeCompletePage() {
  const [loading, setLoading] = useState(true);
  const [edgarReady, setEdgarReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setLoading(false), 1800);
    const t2 = setTimeout(() => setEdgarReady(true), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <DiligentLogo className="w-12 h-12 mx-auto mb-4" />
          <div style={{ fontSize: 16, color: "#111827", fontWeight: 500, marginBottom: 8 }}>
            Loading Committee Review Status...
          </div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Checking review status across all committee members
          </div>
          <div style={{ marginTop: 24, width: 200, height: 3, background: "#e5e7eb", borderRadius: 2, overflow: "hidden", margin: "24px auto 0" }}>
            <div style={{ width: "70%", height: "100%", background: "#16a34a", borderRadius: 2, animation: "pulse 1.5s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#111827" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #21262d", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <DiligentLogo className="w-6 h-6" />
          <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>GRC Command Center</span>
          <span style={{ fontSize: 11, color: "#6b7280" }}>›</span>
          <span style={{ fontSize: 13, color: "#6b7280" }}>Committee Review Complete</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #3fb950, #58a6ff)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff" }}>SC</div>
          <span style={{ fontSize: 12, color: "#6b7280" }}>Sarah Chen, General Counsel</span>
        </div>
      </header>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>

        {/* Success Hero */}
        <div style={{
          padding: 32, borderRadius: 16, textAlign: "center", marginBottom: 32,
          background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 100%)",
          border: "1px solid rgba(59,130,246,0.2)"
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%", background: "#059669",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, color: "#fff", margin: "0 auto 16px"
          }}>✓</div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#111827", marginBottom: 8 }}>
            All Committee Members Have Reviewed
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", maxWidth: 500, margin: "0 auto" }}>
            All 5 committee members reviewed the updated risk disclosures. No changes were requested. The filing is cleared to proceed.
          </p>
        </div>

        {/* Committee Members */}
        <div style={{
          padding: 20, borderRadius: 12, marginBottom: 24,
          background: "#f9fafb", border: "1px solid #30363d"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Committee Review Status</div>
            <span style={{
              fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 12,
              background: "#059669", color: "#fff"
            }}>5 / 5 Complete</span>
          </div>

          <div style={{ display: "grid", gap: 8 }}>
            {COMMITTEE_MEMBERS.map((m, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 12px", borderRadius: 8,
                background: "#ffffff", border: "1px solid #21262d"
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%", background: "#059669",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0
                }}>✓</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#6b7280" }}>{m.title}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#16a34a", fontWeight: 500 }}>{m.action}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>Reviewed at {m.reviewedAt}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risks Reviewed */}
        <div style={{
          padding: 20, borderRadius: 12, marginBottom: 24,
          background: "#f9fafb", border: "1px solid #30363d"
        }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 12 }}>Disclosures Reviewed</div>
          <div style={{ display: "grid", gap: 8 }}>
            {RISKS_REVIEWED.map((r, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 8,
                background: "#ffffff", border: "1px solid #21262d"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span style={{ fontSize: 13, color: "#111827" }}>{r.name}</span>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
                  color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}40`
                }}>{r.severity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Diligent AI — Next Steps */}
        <div style={{
          padding: 20, borderRadius: 12, marginBottom: 24,
          background: "linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)",
          border: "1px solid #30363d"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <DiligentLogo className="w-5 h-5" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Diligent AI — Next Steps</span>
          </div>

          <div style={{ display: "grid", gap: 12 }}>
            {/* EDGAR Submission */}
            <div style={{
              padding: 14, borderRadius: 10,
              background: edgarReady ? "#3fb95010" : "#ffffff",
              border: edgarReady ? "1px solid #3fb95040" : "1px solid #21262d",
              transition: "all 0.5s ease"
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>EDGAR Filing Package</div>
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 10,
                  background: edgarReady ? "#16a34a" : "#f0883e20",
                  color: edgarReady ? "#fff" : "#f0883e",
                  border: edgarReady ? "none" : "1px solid #f0883e40"
                }}>
                  {edgarReady ? "Ready" : "Preparing..."}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
                {edgarReady
                  ? "Filing package assembled with all approved risk factor disclosures. CEO/CFO certification will be requested before final transmit to SEC."
                  : "Diligent AI is assembling the EDGAR filing package with approved disclosures..."
                }
              </div>
            </div>

            {/* Verification */}
            <div style={{
              padding: 14, borderRadius: 10,
              background: "#ffffff", border: "1px solid #21262d"
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 8 }}>AI Verification Summary</div>
              <div style={{ display: "grid", gap: 6 }}>
                {[
                  "Consistency with financial reporting",
                  "Alignment with MD&A commentary",
                  "No conflicts with audited financial statements",
                  "Peer disclosure language benchmarked",
                  "All committee members reviewed — no changes"
                ].map((check, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#16a34a" }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: "50%", background: "#3fb95020",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 9, flexShrink: 0, border: "1px solid #3fb95040"
                    }}>✓</span>
                    {check}
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Trail */}
            <div style={{
              padding: 14, borderRadius: 10,
              background: "#ffffff", border: "1px solid #21262d"
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 8 }}>Complete Audit Trail</div>
              <div style={{ display: "grid", gap: 4 }}>
                {[
                  { time: "Feb 10", event: "Emerging risks detected by monitoring agents" },
                  { time: "Feb 11", event: "Risk owners assigned: Diana Reyes, Marcus Webb, James Park" },
                  { time: "Feb 13", event: "Owner investigations completed — severity confirmed" },
                  { time: "Feb 15", event: "10-K risk factor drafts finalized" },
                  { time: "Feb 18", event: "General Counsel reviewed and approved" },
                  { time: "Feb 20", event: "CEO approved disclosures" },
                  { time: "Feb 22", event: "Context packets sent to Disclosure Committee" },
                  { time: "Feb 28", event: "All committee members reviewed — no changes" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, fontSize: 12, padding: "4px 0" }}>
                    <span style={{ color: "#9ca3af", fontWeight: 500, minWidth: 50, flexShrink: 0 }}>{item.time}</span>
                    <span style={{ color: "#374151" }}>{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button style={{
            padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer",
            background: edgarReady ? "#059669" : "#e5e7eb",
            border: "none", color: edgarReady ? "#fff" : "#6b7280",
            display: "flex", alignItems: "center", gap: 8,
            opacity: edgarReady ? 1 : 0.6,
            transition: "all 0.5s ease"
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            Submit EDGAR Filing
          </button>
          <Link
            href="/light/gc-commandcenter"
            style={{
              padding: "12px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer",
              background: "transparent", border: "1px solid #30363d", color: "#6b7280",
              textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
            }}
          >
            Return to Command Center
          </Link>
        </div>
      </div>
    </div>
  );
}

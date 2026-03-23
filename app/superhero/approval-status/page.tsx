"use client";

import React, { useState } from "react";
import Link from "next/link";
import { StakeholderFooter, PrototypeControlLink } from "../StakeholderFooter";

function DiligentLogo({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 222 222" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <g>
        <path fill="#EE312E" d="M200.87,110.85c0,33.96-12.19,61.94-33.03,81.28c-0.24,0.21-0.42,0.43-0.66,0.64c-15.5,14.13-35.71,23.52-59.24,27.11l-1.59-1.62l35.07-201.75l1.32-3.69C178.64,30.36,200.87,65.37,200.87,110.85z"/>
        <path fill="#AF292E" d="M142.75,12.83l-0.99,1.47L0.74,119.34L0,118.65c0,0,0-0.03,0-0.06V0.45h85.63c5.91,0,11.64,0.34,17.19,1.01h0.21c14.02,1.66,26.93,5.31,38.48,10.78C141.97,12.46,142.75,12.83,142.75,12.83z"/>
        <path fill="#D3222A" d="M142.75,12.83L0,118.65v99.27v3.62h85.96c7.61,0,14.94-0.58,21.99-1.66C107.95,219.89,142.75,12.83,142.75,12.83z"/>
      </g>
    </svg>
  );
}

const APPROVAL_STEPS = [
  { label: "General Counsel approved", status: "completed" as const },
  { label: "CEO approval (you)", status: "current" as const },
  { label: "Outside counsel", status: "pending" as const },
  { label: "Audit committee", status: "pending" as const },
];

const DOCUMENTS = [
  { name: "10-K Risk Factor Draft — FY2025 (Final)", size: "478 KB", action: "Review", actionEnabled: true },
  { name: "ERM Board Deck — Q1 2026", size: "2.4 MB", action: "View only", actionEnabled: false },
];

const VERIFICATION_CHECKS = [
  "Consistency with financial reporting",
  "Alignment with MD&A commentary",
  "No conflicts with audited financial statements",
];

const RISKS = [
  {
    name: "Taiwan Strait — Supply Chain",
    severity: "Critical",
    severityColor: "#f87171",
    severityBg: "#450a0a",
    description: "47% chip supplier concentration in Taiwan. Escalating geopolitical tensions threaten semiconductor supply chain continuity.",
  },
  {
    name: "Vendor Cybersecurity Breach",
    severity: "High",
    severityColor: "#fbbf24",
    severityBg: "#422006",
    description: "CloudSecure incident affecting vendor data pipeline. Elevated per CRO assessment; added to Top 5 risk register.",
  },
  {
    name: "EU Digital Markets Act",
    severity: "High",
    severityColor: "#fbbf24",
    severityBg: "#422006",
    description: "EC initiated enforcement actions against 3 sector companies for DMA non-compliance. Pattern analysis suggests EU operations may face similar scrutiny.",
  },
];

export default function ApprovalStatusPage() {
  const [approved, setApproved] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#0d1117", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}>
        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 32px", borderBottom: "1px solid #21262d",
          background: "#161b22"
        }}>
          <DiligentLogo size={32} />
          <span style={{ fontSize: 14, fontWeight: 500, color: "#8b949e" }}>Disclosure Approval</span>
        </header>

        {/* Content */}
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 24px" }}>

          {/* Approval Status Pipeline */}
          <div style={{
            padding: "20px 24px", background: "#161b22", borderRadius: 12,
            border: "1px solid #30363d", marginBottom: 32
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 14 }}>
              Approval Status
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              {APPROVAL_STEPS.map((step, i) => (
                <React.Fragment key={step.label}>
                  {i > 0 && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#484f58" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                  )}
                  {step.status === "completed" ? (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "6px 14px", borderRadius: 20,
                      background: approved ? "#052e16" : "#052e16", border: "1px solid #065f46",
                      fontSize: 13, fontWeight: 600, color: "#34d399"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      {step.label}
                    </span>
                  ) : step.status === "current" ? (
                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "6px 14px", borderRadius: 20,
                      background: approved ? "#052e16" : "#1e3a5f",
                      border: approved ? "1px solid #065f46" : "1px solid #1e40af",
                      fontSize: 13, fontWeight: 600,
                      color: approved ? "#34d399" : "#93c5fd"
                    }}>
                      {approved && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      {step.label}
                    </span>
                  ) : (
                    <span style={{
                      fontSize: 13, color: "#6e7681"
                    }}>
                      {step.label}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Main heading */}
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f0f6fc", marginBottom: 8 }}>
            Approve undisclosed risk filings
          </h1>
          <p style={{ fontSize: 14, color: "#8b949e", marginBottom: 32, lineHeight: 1.6 }}>
            Review the documents and risks below, then approve or request changes.
          </p>

          {/* Documents for Review */}
          <div style={{
            padding: "20px 24px", background: "#161b22", borderRadius: 12,
            border: "1px solid #30363d", marginBottom: 24
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 8, marginBottom: 16
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b949e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#c9d1d9", letterSpacing: "0.5px", textTransform: "uppercase" }}>Documents for Review</span>
            </div>

            {DOCUMENTS.map((doc, i) => (
              <div key={doc.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "14px 16px",
                background: i === 0 ? "#1a1f2e" : "transparent",
                borderRadius: 8,
                marginBottom: i < DOCUMENTS.length - 1 ? 4 : 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={i === 0 ? "#58a6ff" : "#484f58"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <span style={{ fontSize: 14, color: "#f0f6fc", fontWeight: 500 }}>{doc.name}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#6e7681" }}>{doc.size}</span>
                  {doc.actionEnabled ? (
                    <button style={{
                      padding: "5px 14px", borderRadius: 6, fontSize: 12, fontWeight: 600,
                      background: "transparent", border: "1px solid #30363d", color: "#c9d1d9",
                      cursor: "pointer"
                    }}>
                      {doc.action}
                    </button>
                  ) : (
                    <span style={{ fontSize: 12, color: "#484f58" }}>{doc.action}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Diligent AI Verification */}
          <div style={{
            padding: "16px 20px", background: "#052e16", borderRadius: 12,
            border: "1px solid #065f46", marginBottom: 40
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>Diligent AI Verification</span>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                background: "#065f46", color: "#6ee7b7", textTransform: "uppercase"
              }}>Passed</span>
            </div>
            <p style={{ fontSize: 12, color: "#6ee7b7", marginBottom: 10, opacity: 0.8 }}>
              Automated review of the 10-K risk factor draft found:
            </p>
            <div style={{ display: "grid", gap: 6 }}>
              {VERIFICATION_CHECKS.map((check, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#34d399" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {check}
                </div>
              ))}
            </div>
          </div>

          {/* Risks Being Disclosed */}
          <div style={{ marginBottom: 40 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#8b949e", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 16 }}>
              Risks Being Disclosed
            </div>

            <div style={{ display: "grid", gap: 12 }}>
              {RISKS.map((risk) => (
                <div key={risk.name} style={{
                  padding: "18px 20px", background: "#161b22", borderRadius: 12,
                  border: "1px solid #30363d"
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: "#f0f6fc" }}>{risk.name}</span>
                    <span style={{
                      fontSize: 12, fontWeight: 700, color: risk.severityColor,
                      padding: "3px 10px", borderRadius: 6, background: risk.severityBg
                    }}>
                      {risk.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#8b949e", lineHeight: 1.6 }}>
                    {risk.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Approve / Reject buttons */}
          {!approved ? (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "20px 0", borderTop: "1px solid #21262d"
            }}>
              <button
                onClick={() => setApproved(true)}
                style={{
                  padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: "#059669", border: "none", color: "#fff", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 8
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                Approve All Disclosures
              </button>
              <button style={{
                padding: "12px 28px", borderRadius: 8, fontSize: 14, fontWeight: 600,
                background: "transparent", border: "1px solid #30363d", color: "#c9d1d9", cursor: "pointer"
              }}>
                Request Changes
              </button>
            </div>
          ) : (
            <div style={{
              padding: "16px 20px", background: "#052e16", borderRadius: 12,
              border: "1px solid #065f46", display: "flex", alignItems: "center", gap: 12
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#34d399" }}>Disclosures approved</div>
                <div style={{ fontSize: 12, color: "#6ee7b7", marginTop: 2 }}>Routing to Outside Counsel and Audit Committee for review.</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <StakeholderFooter label="Prototype navigation — CEO reviewing disclosure approval">
        <PrototypeControlLink href="/superhero/gc-notification/ceo-approved">
          Continue as GC →
        </PrototypeControlLink>
      </StakeholderFooter>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSimulation } from "./SimulationContext";
import { DiligentLogo } from "./components/ui";

const SAMPLE_RISKS = [
  "Supply chain concentration in Taiwan semiconductors",
  "AI regulation and compliance risk (EU AI Act)",
  "Cybersecurity breach / data exfiltration",
  "Climate-related transition risk",
  "Third-party vendor dependency",
  "Geopolitical sanctions exposure",
  "Key person / talent retention risk",
  "Interest rate and refinancing risk",
];

const RESEARCH_STEPS = [
  "Analyzing company profile and industry context...",
  "Mapping risk exposure across business units...",
  "Evaluating existing control frameworks...",
  "Benchmarking against peer disclosures...",
  "Modeling cascade scenarios...",
  "Generating risk visualizations...",
  "Preparing governance recommendations...",
];

export default function RiskSimulatorInputPage() {
  const router = useRouter();
  const { generate, loading, error, result } = useSimulation();
  const [company, setCompany] = useState("");
  const [riskTopic, setRiskTopic] = useState("");
  const [researchStep, setResearchStep] = useState(0);

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setResearchStep((prev) => (prev + 1) % RESEARCH_STEPS.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [loading]);

  useEffect(() => {
    if (result && !loading) {
      router.push("/risk-simulator/home");
    }
  }, [result, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !riskTopic.trim()) return;
    setResearchStep(0);
    await generate(company.trim(), riskTopic.trim());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="max-w-lg w-full text-center px-6">
          <div className="relative mx-auto mb-8 w-20 h-20">
            <div className="absolute inset-0 rounded-full border-2 border-[#30363d]" />
            <div className="absolute inset-0 rounded-full border-2 border-t-[#a78bfa] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <DiligentLogo size={28} />
            </div>
          </div>

          <h2 className="text-lg font-bold text-[#f0f6fc] mb-2">
            Researching {company}
          </h2>
          <p className="text-sm text-[#8b949e] mb-8">
            Building your risk simulation...
          </p>

          <div className="space-y-3 text-left">
            {RESEARCH_STEPS.map((step, i) => {
              const done = i < researchStep;
              const active = i === researchStep;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 transition-all duration-500"
                  style={{ opacity: done ? 0.5 : active ? 1 : 0.2 }}
                >
                  <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center">
                    {done ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : active ? (
                      <div className="w-3 h-3 rounded-full bg-[#a78bfa] animate-pulse" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-[#30363d]" />
                    )}
                  </div>
                  <span className={`text-sm ${active ? "text-[#f0f6fc] font-medium" : "text-[#6e7681]"}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        {/* Logo + title */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <DiligentLogo size={32} />
            <h1 className="text-2xl font-bold text-[#f0f6fc]">AI Risk Impact Simulator</h1>
          </div>
          <p className="text-sm text-[#8b949e] max-w-md mx-auto">
            Enter a company and a risk scenario. The AI will research the company, model the risk cascade,
            and generate a complete simulation you can explore.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">
              Company
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Apple, Boeing, JPMorgan Chase..."
              className="w-full rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3.5 text-sm text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 transition-colors"
            />
          </div>

          {/* Risk topic input */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#6e7681] mb-2">
              Risk Scenario
            </label>
            <textarea
              value={riskTopic}
              onChange={(e) => setRiskTopic(e.target.value)}
              placeholder="e.g. Supply chain concentration in Taiwan semiconductors..."
              rows={3}
              className="w-full rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3.5 text-sm text-[#f0f6fc] placeholder:text-[#484f58] focus:outline-none focus:border-[#a78bfa] focus:ring-1 focus:ring-[#a78bfa]/30 transition-colors resize-none"
            />
          </div>

          {/* Quick-pick chips */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#484f58] mb-2">
              Or try a sample
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_RISKS.map((risk) => (
                <button
                  key={risk}
                  type="button"
                  onClick={() => setRiskTopic(risk)}
                  className="rounded-lg border border-[#21262d] bg-[#161b22] px-3 py-1.5 text-[11px] text-[#8b949e] hover:text-[#c9d1d9] hover:border-[#30363d] hover:bg-[#1c2128] transition-colors"
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-[#7f1d1d] bg-[#450a0a]/30 px-4 py-3">
              <p className="text-sm text-[#f87171]">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!company.trim() || !riskTopic.trim()}
            className="w-full rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            Generate Risk Simulation
          </button>
        </form>
      </div>
    </div>
  );
}

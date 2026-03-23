"use client";

import React, { useState, Suspense } from "react";

const DAISY_THEMES = [
  "light","dark","cupcake","bumblebee","emerald","corporate","synthwave","retro",
  "cyberpunk","valentine","halloween","garden","forest","aqua","lofi","pastel",
  "fantasy","wireframe","black","luxury","dracula","cmyk","autumn","business",
  "acid","lemonade","night","coffee","winter","dim","nord","sunset",
] as const;

const AGENTS = [
  { name: "Director Appointments", detail: "2 in progress • 1 action required", icon: "👤" },
  { name: "Regulatory Forms", detail: "1 signature required • 2 awaiting board approval", icon: "📋" },
  { name: "Entity Sync", detail: "Last sync 2 hours ago • 3 records updated", icon: "🔄" },
];

const ACTIVITIES = [
  { person: 'Wei "David" Chen', company: "VitaPlast Solutions", status: "Board approved 4 of 6 • In progress", badge: "info" },
  { person: "Lim Pei Shan", company: "Acme Circular Technologies", status: "Awaiting signed regulatory forms • In progress", badge: "info" },
  { person: "James Sterling", company: "Acme Feedstock & Monomer", status: "Regulatory form signature required • Action required", badge: "warning" },
  { person: "Priya Nair", company: "Pacific Polymer Logistics", status: "All documents filed, entity records updated • Completed", badge: "success" },
  { person: "Elena Rossi", company: "DuraFlow Composites", status: "Board approved, regulatory forms filed • Completed", badge: "success" },
  { person: "Kenji Tanaka", company: "Acme Advanced Materials", status: "Successfully completed all steps • Completed", badge: "success" },
];

const QUICK_ACTIONS = [
  { label: "Appoint a Director", icon: "👤" },
  { label: "Open Application...", icon: "📂" },
  { label: "Boards", icon: "📊" },
  { label: "Entities", icon: "🏢" },
  { label: "Risk Manager", icon: "⚠️" },
];

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

function ThemeShowcase() {
  const [currentTheme, setCurrentTheme] = useState<string>("corporate");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");

  return (
    <div data-theme={currentTheme} className="min-h-screen bg-base-100 text-base-content transition-all duration-300">
      {/* Theme Switcher — fixed pill */}
      <div className="fixed bottom-6 left-6 z-[9999] flex items-center gap-2 rounded-xl border-2 border-yellow-400 bg-black px-4 py-3 shadow-2xl shadow-yellow-400/20">
        <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Theme</span>
        <select
          value={currentTheme}
          onChange={(e) => setCurrentTheme(e.target.value)}
          style={{ color: "#000", backgroundColor: "#facc15" }}
          className="rounded-md px-2 py-1 text-sm font-semibold cursor-pointer"
        >
          {DAISY_THEMES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Top Nav */}
      <div className="navbar bg-base-200 border-b border-base-300 px-6 shadow-sm">
        <div className="flex-1 gap-3">
          <DiligentLogo className="h-6 w-auto" />
          <span className="font-semibold text-base-content/90">Diligent</span>
          <div className="divider divider-horizontal mx-1" />
          <span className="text-sm opacity-60">Director View</span>
        </div>
        <div className="flex-none flex items-center gap-3">
          <span className="text-sm font-medium">Acme, Inc.</span>
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-8">
              <span className="text-xs">A</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-base-200 border-r border-base-300 min-h-[calc(100vh-4rem)] p-4 gap-4">
          <button className="btn btn-primary btn-sm gap-2 w-full justify-start">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            View recent chats
          </button>
          <p className="text-xs opacity-40">4 updates • 1 running process</p>

          <div className="divider my-0" />

          {QUICK_ACTIONS.map((a) => (
            <button key={a.label} className="btn btn-ghost btn-sm justify-start gap-2 w-full font-normal">
              <span>{a.icon}</span> {a.label}
            </button>
          ))}

          <div className="divider my-0" />
          <button className="btn btn-ghost btn-sm justify-start gap-2 w-full font-normal text-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            View Assist Tools
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 max-w-4xl">
          {/* Hero */}
          <div className="mb-10">
            <h1 className="text-2xl font-bold mb-2">Your director appointments are on track.</h1>
            <p className="text-sm opacity-60">
              3 appointments in progress, 1 signature required. Review the Agent Activity below to complete pending steps or start a new appointment with Assist.
            </p>
          </div>

          {/* Assist Agents */}
          <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-4">Assist Agents</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {AGENTS.map((agent) => (
                <div key={agent.name} className="card bg-base-200 border border-base-300 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="card-body p-4 gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{agent.icon}</span>
                      <h3 className="font-semibold text-sm">{agent.name}</h3>
                    </div>
                    <p className="text-xs opacity-60">{agent.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ask AI */}
          <div className="card bg-base-200 border border-base-300 shadow-sm mb-10">
            <div className="card-body p-5 gap-4">
              <h2 className="font-bold text-lg">Ask your AI assistant anything.</h2>
              <p className="text-sm opacity-50">Type a request or view the Assist Tools available below</p>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="input input-bordered join-item flex-1"
                />
                <button className="btn btn-primary join-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((a) => (
                  <button key={a.label} className="btn btn-outline btn-sm gap-1">
                    <span>{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="btn btn-ghost btn-sm text-primary w-fit"
              >
                {toolsOpen ? "Hide" : "View"} Assist Tools {toolsOpen ? "▲" : "▼"}
              </button>

              {toolsOpen && (
                <div className="bg-base-300 rounded-xl p-5 space-y-3 mt-2">
                  <div className="badge badge-ghost">Assist Capabilities</div>
                  <p className="text-xs opacity-50">We&apos;re early in creating these features. More assist capabilities will be available soon!</p>
                  <div className="card bg-base-100 border border-base-300 p-4 space-y-2">
                    <h4 className="font-bold text-sm">Appoint a Director</h4>
                    <p className="text-xs opacity-60">
                      Automate the entire director appointment process. I&apos;ll guide you through selecting the company, identifying the director, choosing the appointee, and managing approvals.
                    </p>
                    <p className="text-xs font-semibold mt-2 opacity-50">Try these prompts:</p>
                    <ul className="text-xs space-y-1 opacity-60">
                      <li>• Type &quot;Appoint &lt;Director Name&gt; to &lt;Company Name&gt;&quot;</li>
                      <li>• Type &quot;Replace Director &lt;Director Name&gt;&quot;</li>
                      <li>• Click &quot;Appoint a Director&quot; and follow instructions</li>
                      <li>• Upload a &quot;Consent to Act&quot; document</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Agent Activity */}
          <div>
            <h2 className="font-bold text-lg mb-4">Agent Activity</h2>
            <div className="space-y-3">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="card bg-base-200 border border-base-300 shadow-sm">
                  <div className="card-body p-4 flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="avatar placeholder flex-shrink-0">
                        <div className="bg-neutral text-neutral-content rounded-full w-10">
                          <span className="text-xs">{a.person.split(" ").map(n => n[0]).join("").slice(0,2)}</span>
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">
                          {a.person} <span className="font-normal opacity-50">appointed to</span> {a.company}
                        </p>
                        <p className="text-xs opacity-50 flex items-center gap-2 mt-0.5">
                          <span className={`badge badge-xs badge-${a.badge}`} />
                          {a.status}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-ghost btn-sm flex-shrink-0">Review</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-24" />
        </main>

        {/* Right Panel */}
        <aside className="hidden xl:flex flex-col w-80 bg-base-200 border-l border-base-300 min-h-[calc(100vh-4rem)] p-6">
          <h3 className="font-bold text-lg mb-1">New Conversation</h3>
          <div className="divider mt-1 mb-4" />
          <div className="card bg-base-300 border border-base-content/5 p-4 mb-4">
            <h4 className="font-semibold text-sm mb-2">Appoint Director</h4>
            <p className="text-xs opacity-50">Additional context and details will appear here.</p>
          </div>
          <div className="mt-auto">
            <div className="form-control">
              <input type="text" placeholder="Send a message..." className="input input-bordered input-sm w-full" />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg" />
      </div>
    }>
      <ThemeShowcase />
    </Suspense>
  );
}

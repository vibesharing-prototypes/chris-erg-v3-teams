# Enterprise Risk Governance — Prototype Context

## Current State
- **Version**: ERG v3.1 Teams + Slack
- **Last updated**: March 13, 2026
- **Stack**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Deployment**: VibeSharing (prototype hosting)

## Deployment URLs (do not guess — use these)
- **Vercel domain**: `https://vs-step-1-general-counsel-alerted-m.vercel.app`
- **Vercel project**: `vs-step-1-general-counsel-alerted-mljple8d`
- **GitHub repo**: `https://github.com/vibesharing-prototypes/174f24af-step-1-general-counsel-alerted-to-emerging-risks`
- **VibeSharing (ERG v3 Teams)**: `https://vibesharing.app/dashboard/projects/82f9616e-a6fb-48ba-b165-b67453c68eca`
- **VibeSharing (HUC 6 parent)**: prototype ID `901d5591-242c-41cb-aa36-f2f765755e94`
- **VibeSharing collection (All Hero Use Cases)**: collection ID `bacc3877-a34e-475e-9832-5f0119828e53`

## What Was Built

### The Big Idea
A complete end-to-end simulation of how Diligent's platform could orchestrate Enterprise Risk Governance — from the moment an AI agent detects an emerging risk, through risk owner interviews, CRO assessment, GC disclosure drafting, CEO/CFO certification, committee review, and EDGAR filing. The workflow spans multiple Diligent products (Risk Essentials, Boards, Data Room) and a Microsoft Teams simulation showing AI agents working alongside people in real-time chat.

### Narrative Arc
The story follows a fictional company ("Acme Co.") discovering that 47% of their semiconductor suppliers have Taiwan-based operations — a material concentration risk that needs to be disclosed in their 10-K filing within 13 days.

**Characters:**
- **Sarah Mitchell** — General Counsel (the primary protagonist)
- **Diana Reyes** — VP Supply Chain & Operations (risk owner)
- **Chief Risk Officer** — Assesses severity and likelihood
- **Jennifer Walsh** — CEO (approves disclosures)
- **Robert Tanaka** — CFO (certifies financials)
- **Disclosure Committee** — 5 board members who review before filing
- **Diligent AI Risk Agent** — The AI that orchestrates everything

### Pages & Workflows

#### Story Flow A — Boards Workflow (`/superhero/boards-*`)
GC opens Diligent Boards, sees the GRC Command Center detect 3 emerging risks via animated scan sequence, assigns recommended risk owners in one click, and gets confirmation they've been notified. Features a skip button for demo flow.

#### Story Flow B — GRC Command Center (`/gc-commandcenter`)
Full-vision command center with agent activity ticker, real-time risk detection animation, and consolidated owner assignment. Converges with Flow A at the risk owner investigation.

#### Risk Owner Investigation (`/superhero/owner-investigation`)
Diana Reyes receives an email notification and completes an AI-guided interview about the Taiwan Strait risk — answering structured questions about severity, controls, and mitigation timeline.

#### CRO — AI Risk Essentials (`/superhero/risk-discovery`)
Dark-mode dashboard where the CRO reviews Diana's interview findings, sees a toaster alert, and can launch the AI Risk Impact Simulator. Includes light-mode variant.

#### AI Risk Impact Simulator (`/superhero/risk-analysis`, `risk-gravity`, `risk-shockwave`, `risk-pipeline`)
Four visualization pages embedded in the Risk Essentials UI frame:
- **Simulator Home** — Taiwan Strait cascade analysis across 6 dimensions
- **Gravity Map** — How major risks pull financial exposure into orbit
- **Risk Shockwave** — Animated propagation from geopolitical signal to disclosure with cause-and-effect narrative, findings, decisions, and recommended actions at each wave
- **Risk Pipeline** — Full traceability across 7 stages from signal to GC decision

Each page includes "So what?", next best actions, who needs to know, and collaboration hooks.

#### GC Disclosure Drafting (`/superhero/writer`)
AI-assisted 10-K risk factor editor wrapped in macOS browser chrome (1200px max, 85vh). Features:
- Two-column layout: prior year language vs. AI-drafted disclosure
- Risk tabs (Taiwan Strait, Vendor Breach, EU DMA) switching content
- Text selection popover with AI rewrite options (more formal, more concise, add example)
- Tabbed advice tray (Suggestions, Supporting Research, Peer 10-K Insights)
- Integrated AI prompt/chat
- "Submit Draft" navigates to Teams group review

#### Data Room (`/superhero/data-room`)
Diligent Data Room with browser chrome wrapper, loading animation inside the chrome, sidebar navigation, official documents table, and context packet folders. Prompt navigates to Boards.

#### Board Governance (`/superhero/board-governance`)
Diligent Boards with browser chrome wrapper, white/light theme. Slide-based board book viewer with:
- Toned-down risk summary cards (board-appropriate, not dashboard-y)
- Expandable suggested questions with Strong/Weak answer examples
- GovernAI right panel with contextual insights, reputational/governance implications
- "This looks good — I approve" prompt navigating to Teams certification

#### Microsoft Teams Simulation (`/teams`)
The centerpiece — a full macOS Teams desktop simulation with 8 tabbed perspectives:

| Step | Persona | Chat | What Happens |
|------|---------|------|-------------|
| 1 | Sarah Mitchell (GC) | `gc` | AI detects 3 risks, recommends owners, Sarah assigns them |
| 2 | Diana Reyes | `diana` | AI interviews Diana about Taiwan Strait risk (structured Q&A) |
| 3 | Chief Risk Officer | `cro` | CRO assesses severity; AI shares its own point of view on likelihood |
| 4 | Sarah Mitchell (GC) | `gc-draft` | AI pings Sarah that CRO is done, draft is ready ("Review Draft" / "Remind me at 1pm" buttons) |
| 5 | Sarah Mitchell (Group) | `draft-review` | GC, CRO, Diana, CFO review the draft together |
| 6 | Jennifer Walsh (CEO) | `ceo` | CEO reviews, approves, routes to committees. "View Documents" → Data Room |
| 7 | Disclosure Committee | `committee` | 5 committee members review and approve |
| 8 | Sarah Mitchell (Group) | `certification` | CEO + CFO certify under SOX 302/906, AI submits to EDGAR |

Each chat features:
- Animated intro sequences (messages appear with realistic delays)
- Adaptive cards with status rows, fields, and interactive buttons
- Context-sensitive sidebars (URGENT section + Team chats)
- Consistent avatars from `randomuser.me` (gender-matched)
- `useSearchParams` support for deep linking (e.g., `?chat=draft-review`)
- **Step completion flow**: when a persona's steps are done, a green divider shows "Step N complete — continue to Step N+1: [Name] →" with a clickable link to advance
- **Cross-page navigation**: all outbound links to superhero pages append `?from=teams` (or `?from=slack`), and those pages show a floating "Return to Teams/Slack" button to navigate back

#### Slack Simulation (`/slack`)
Complete duplicate of the Teams simulation adapted to Slack's design language — aubergine sidebar, Block Kit cards, flat message layout, Slack formatting toolbar. Same 8-step workflow and step completion flow.

#### GC End-to-End Pages (`/teams/gc`, `/slack/gc`)
Sarah Mitchell's complete journey in a single continuous chat — no persona tabs. Covers risk detection through EDGAR filing acceptance (8 prompt clicks). Designed for demos where you want to show the full GC experience without switching perspectives.

#### Platform Switcher
All 4 simulation pages (Teams multi, Slack multi, Teams GC, Slack GC) include a **Teams | Slack** toggle pill at the top, plus a link to the GC End-to-End or multi-persona variant. This means a single VibeSharing entry point (e.g., `/teams`) gives access to all four views.

### Other Pages
- **Context Packet** (`/superhero/context-packet`) — Peer filings, transcripts, news, Q&A prep
- **CEO Review** (`/superhero/ceo-review`) — CEO approval with pipeline status
- **GC Committee Complete** (`/superhero/gc-committee-complete`) — Final status before filing
- **Light mode variants** (`/light/*`) for several pages

## Key Decisions

- **Browser chrome wrapper** used for Data Room, Writer, and Boards pages to simulate navigating between Teams and browser-based Diligent products
- **White/light backgrounds** for Data Room and Boards to feel like real product UIs (vs. the dark theme used in Risk Essentials and Command Center)
- **Teams/Slack simulation as the connective tissue** — the entire ERG workflow can be experienced as a series of chats, with "View in Diligent" links breaking out to the traditional UI when deeper interaction is needed
- **AI has a point of view** — the agent doesn't just present data, it recommends actions, compares against peers, and pushes when it disagrees with assessments
- **Board-appropriate tone** — the Boards page deliberately tones down dashboard intensity (smaller cards, pastel backgrounds, expandable questions with answer quality guidance)
- **contentEditable divs** (not textareas) used in the Writer page to enable `window.getSelection()` for the text selection popover
- **Separated GC end-to-end from multi-persona** — the GC's chat in multi-persona stops after assigning owners (1 step), while `/teams/gc` and `/slack/gc` have the full 8-step GC journey. This avoids confusion where one persona's tab covers the entire arc.
- **`?from=` param for cross-page navigation** — all outbound links from Teams/Slack append `?from=teams` or `?from=slack`. Superhero pages read this to show a "Return to [Platform]" button and route back correctly (writer → draft-review, board-governance → certification, etc.)

## Known Issues

- Pravatar URLs for some minor characters may occasionally serve inconsistent images (randomuser.me is more reliable)
- React Strict Mode in development can cause intro animations to behave differently than production — refs guard against double-firing
- The Writer page's `contentEditable` areas don't persist rich formatting on re-render (acceptable for prototype)
- Next.js 14.2.0 has a known security advisory — fine for prototype, would upgrade for production

## Technical Notes

### File Structure
```
app/
├── page.tsx                          # Prototype index (dark mode)
├── light/                            # Light mode variants
├── teams/page.tsx                    # Teams multi-persona simulation
├── teams/gc/page.tsx                 # Teams GC end-to-end
├── slack/page.tsx                    # Slack multi-persona simulation
├── slack/gc/page.tsx                 # Slack GC end-to-end
├── components/ReturnToChat.tsx       # Shared "Return to Teams/Slack" floating button
├── gc-commandcenter/                 # GRC Command Center workflow
├── superhero/
│   ├── boards-home/                  # Boards workflow entry
│   ├── boards-assign/                # Risk owner assignment
│   ├── boards-status/                # Post-assignment status
│   ├── owner-investigation/          # Risk owner AI interview
│   ├── risk-discovery/               # CRO Risk Essentials dashboard
│   ├── risk-analysis/                # Risk Simulator home
│   ├── risk-gravity/                 # Gravity Map visualization
│   ├── risk-shockwave/              # Shockwave propagation
│   ├── risk-pipeline/               # Pipeline traceability
│   ├── cro-review/                  # CRO assessment review
│   ├── writer/page.tsx              # 10-K disclosure editor (browser chrome)
│   ├── data-room/                   # Diligent Data Room (browser chrome)
│   ├── board-governance/page.tsx    # Diligent Boards (browser chrome)
│   ├── context-packet/              # Context Packet builder
│   ├── ceo-review/                  # CEO approval flow
│   ├── gc-review-feedback/          # GC review & feedback
│   ├── gc-committee-complete/       # Final committee status
│   ├── LeftRail.tsx                 # Shared navigation component
│   └── StakeholderFooter.tsx        # Shared prototype controls
```

### Key Patterns
- **Animated intros**: `useRef` + `useEffect` with `setTimeout` chains, guarded by refs to prevent re-triggering in Strict Mode
- **State-driven conversations**: `CHATS` array with `steps[]` containing `prompt`, `userMsg`, and `botMsgs` — `stepIdx` tracks progress per chat
- **Adaptive cards**: TypeScript interfaces for `fields`, `statusRows`, `bullets`, `buttons` rendered as styled card components
- **Browser chrome**: Reusable pattern — white bg page > fixed-size wrapper > macOS title bar > content area
- **Avatar consistency**: `AVATARS` and `PERSON_AVATAR` maps ensure the same face appears everywhere a character shows up

### Running Locally
```bash
npm install
npx next dev -p 3001
```

## Session Log

### March 13, 2026
- Separated GC end-to-end experience into dedicated pages (`/teams/gc`, `/slack/gc`) with full 8-step journey
- Trimmed GC chat in multi-persona views to 1 step (assign owners only) — status check moved to GC-only pages
- Added step completion dividers with clickable "advance to next persona" links
- Added `?from=teams`/`?from=slack` param to all outbound superhero links
- Created `ReturnToChat` component (floating "Return to Teams/Slack" button) added to 6 superhero pages
- Made board-governance and writer pages dynamically route back to the correct platform
- Added "Review Draft" / "Remind me at 1pm" buttons to GC draft notification (Step 4)
- Added platform switcher (Teams/Slack toggle) across all 4 simulation pages
- Updated prototype index with nested GC-only links under each platform

---
*Updated on March 13, 2026*

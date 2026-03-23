import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM_PROMPT = `You are an enterprise risk analyst AI. Given a company name and a risk topic, generate a complete risk simulation dataset. You must return ONLY valid JSON (no markdown, no code fences) matching the exact schema below.

Be specific and realistic:
- Use real industry context for the company (what they actually make/do, real supply chains, real regulatory environment)
- Reference real peer companies in their industry
- Use plausible financial figures based on the company's actual scale
- Create a believable cascade narrative for how the risk propagates
- Use realistic control frameworks and governance structures

COLOR PALETTE — use these exact hex values:
- Critical/Red: text "#f87171", bg "#450a0a", border "#7f1d1d", glow "#ef4444"
- High/Amber: text "#fbbf24", bg "#422006", border "#92400e", glow "#f59e0b"
- Medium/Blue: text "#60a5fa", bg "#1e3a5f", border "#1e40af", glow "#3b82f6"
- Green: text "#34d399", bg "#052e16", border "#065f46", glow "#22c55e"
- Purple: text "#a78bfa", bg "#2e1065", border "#5b21b6", glow "#8b5cf6"
- Orange: text "#fb923c", bg "#431407", border "#9a3412", glow "#f97316"
- Pink: text "#f0abfc", bg "#4a044e", border "#86198f", glow "#d946ef"

TIMELINE ICON OPTIONS: "radar", "link", "user", "alert"
STAGE ICON OPTIONS: "radar", "map", "shield", "user", "alert", "file", "gavel"

JSON SCHEMA:
{
  "input": { "company": string, "riskTopic": string },
  "home": {
    "riskTitle": string,
    "riskCategory": string (short tag like "Supply Chain Disruption"),
    "likelihood": number (0-100),
    "likelihoodLabel": "Low" | "Medium" | "High" | "Very High",
    "impact": number (0-100),
    "impactLabel": "Low" | "Medium" | "High" | "Critical",
    "aiConfidence": number (0-100),
    "description": string (2-3 sentences),
    "controls": [{ "label": string, "value": number (0-100), "color": hex, "bg": hex }] (exactly 4),
    "missingControls": [string] (2-3 items),
    "supplyChainSummary": string,
    "exposureTotal": string (like "$1.8B"),
    "timeline": [{ "date": string, "label": string, "icon": string, "color": hex }] (exactly 4),
    "riskOwner": { "initials": string, "title": string, "status": string },
    "mitigationCurrent": string,
    "mitigationTimeline": string,
    "recommendedActions": [string] (exactly 3),
    "disclosureAiDraft": string (1-2 sentence disclosure language),
    "peers": [{ "name": string, "status": "Disclosed" | "Pending" | "Not Disclosed", "color": hex }] (exactly 3),
    "peerInsight": string,
    "bottomLine": string (2-3 sentences, compelling),
    "actions": [{ "title": string, "description": string, "priority": "Urgent" | "High" | "Required" }] (exactly 3),
    "stakeholders": [{ "initials": string, "name": string, "role": string, "task": string, "color": hex, "bg": hex, "border": hex }] (exactly 4)
  },
  "gravity": {
    "risks": [
      {
        "id": string,
        "title": string,
        "shortTitle": string (2-3 words),
        "exposure": number (millions),
        "severity": "Critical" | "High" | "Medium",
        "controlStrength": number (0-100),
        "residualRisk": number (0-100),
        "region": string,
        "description": string,
        "nodes": [{ "label": string, "revenue": string (like "$950M"), "angle": number (-80 to 80) }] (2 per risk),
        "controls": [{ "label": string, "active": boolean }] (3 per risk)
      }
    ] (exactly 3 risks, first is the primary/largest),
    "simulations": [
      { "id": string, "label": string, "riskId": string (matches a risk id), "exposureDelta": number (millions, positive=worse negative=better) }
    ] (exactly 3)
  },
  "shockwave": {
    "eventName": string,
    "eventDate": string (like "Jan 12"),
    "waves": [
      {
        "id": number (1-5),
        "title": string,
        "finding": string,
        "decision": string,
        "color": hex, "glowColor": hex, "bgColor": hex, "borderColor": hex,
        "timestamp": string (like "08:43 UTC"),
        "elapsed": string (like "+0 min"),
        "outputs": [{ "label": string, "value": string, "status": "active" | "missing" | "pending" | "complete" }] (exactly 3),
        "recommendation": string,
        "action": { "label": string, "person": string, "role": string }
      }
    ] (exactly 5 waves)
  },
  "pipeline": {
    "stages": [
      {
        "id": number (1-7),
        "title": string,
        "icon": string,
        "color": hex, "glow": hex, "bg": hex, "border": hex,
        "inputs": [string] (2-3),
        "transformation": string,
        "outputs": [{ "label": string, "value": string (optional), "status": "complete" | "active" | "missing" | "pending" | "ai" }] (2-4),
        "status": "complete" | "active" | "pending",
        "aiAssisted": boolean
      }
    ] (exactly 7 stages),
    "evidence": [
      { "id": string, "title": string, "type": string, "stage": number, "summary": string }
    ] (exactly 5)
  }
}

The 5 shockwave waves should use these colors in order:
Wave 1: color "#f87171", glowColor "#ef4444", bgColor "#450a0a", borderColor "#7f1d1d"
Wave 2: color "#fb923c", glowColor "#f97316", bgColor "#431407", borderColor "#9a3412"
Wave 3: color "#fbbf24", glowColor "#f59e0b", bgColor "#422006", borderColor "#92400e"
Wave 4: color "#60a5fa", glowColor "#3b82f6", bgColor "#1e3a5f", borderColor "#1e40af"
Wave 5: color "#a78bfa", glowColor "#8b5cf6", bgColor "#2e1065", borderColor "#5b21b6"

The 7 pipeline stages should use these colors in order:
Stage 1: color "#f87171", glow "#ef4444", bg "#450a0a", border "#7f1d1d"
Stage 2: color "#fb923c", glow "#f97316", bg "#431407", border "#9a3412"
Stage 3: color "#fbbf24", glow "#f59e0b", bg "#422006", border "#92400e"
Stage 4: color "#34d399", glow "#22c55e", bg "#052e16", border "#065f46"
Stage 5: color "#60a5fa", glow "#3b82f6", bg "#1e3a5f", border "#1e40af"
Stage 6: color "#a78bfa", glow "#8b5cf6", bg "#2e1065", border "#5b21b6"
Stage 7: color "#f0abfc", glow "#d946ef", bg "#4a044e", border "#86198f"

Stages 1-6 should have status "complete", stage 7 should be "active".
Stages 1,2,3,5,6 should have aiAssisted true, stages 4,7 false.
Stage icons in order: "radar", "map", "shield", "user", "alert", "file", "gavel".`;

export async function POST(req: NextRequest) {
  try {
    const { company, riskTopic } = await req.json();

    if (!company || !riskTopic) {
      return NextResponse.json(
        { error: "company and riskTopic are required" },
        { status: 400 },
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY not configured" },
        { status: 500 },
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 8000,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Company: ${company}\nRisk Topic: ${riskTopic}\n\nGenerate the complete risk simulation JSON.`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 502 },
      );
    }

    const data = JSON.parse(content);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Simulation API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Shared types for a dynamically-generated risk simulation.
 * The API route returns a SimulationResult; all four viz pages consume it.
 */

export interface SimulationInput {
  company: string;
  riskTopic: string;
}

/* ------------------------------------------------------------------ */
/*  Simulator Home — risk overview                                     */
/* ------------------------------------------------------------------ */

export interface ControlBar {
  label: string;
  value: number; // 0-100
  color: string;
  bg: string;
}

export interface TimelineStep {
  date: string;
  label: string;
  icon: "radar" | "link" | "user" | "alert";
  color: string;
}

export interface PeerCompany {
  name: string;
  status: string;
  color: string;
}

export interface ActionItem {
  title: string;
  description: string;
  priority: "Urgent" | "High" | "Required";
}

export interface StakeholderNotify {
  initials: string;
  name: string;
  role: string;
  task: string;
  color: string;
  bg: string;
  border: string;
}

export interface SimulatorHomeData {
  riskTitle: string;
  riskCategory: string;
  likelihood: number; // 0-100
  likelihoodLabel: string;
  impact: number; // 0-100
  impactLabel: string;
  aiConfidence: number; // 0-100
  description: string;
  controls: ControlBar[];
  missingControls: string[];
  supplyChainSummary: string;
  exposureTotal: string;
  timeline: TimelineStep[];
  riskOwner: { initials: string; title: string; status: string };
  mitigationCurrent: string;
  mitigationTimeline: string;
  recommendedActions: string[];
  disclosureAiDraft: string;
  peers: PeerCompany[];
  peerInsight: string;
  bottomLine: string;
  actions: ActionItem[];
  stakeholders: StakeholderNotify[];
}

/* ------------------------------------------------------------------ */
/*  Gravity Map                                                        */
/* ------------------------------------------------------------------ */

export interface GravityRisk {
  id: string;
  title: string;
  shortTitle: string;
  exposure: number; // in millions
  severity: "Critical" | "High" | "Medium";
  controlStrength: number; // 0-100
  residualRisk: number; // 0-100
  region: string;
  description: string;
  nodes: { label: string; revenue: string; angle: number }[];
  controls: { label: string; active: boolean }[];
}

export interface GravityMapData {
  risks: GravityRisk[];
  simulations: {
    id: string;
    label: string;
    riskId: string;
    exposureDelta: number;
  }[];
}

/* ------------------------------------------------------------------ */
/*  Shockwave                                                          */
/* ------------------------------------------------------------------ */

export interface ShockwaveOutput {
  label: string;
  value: string;
  status: "active" | "missing" | "pending" | "complete";
}

export interface ShockwaveWave {
  id: number;
  title: string;
  finding: string;
  decision: string;
  color: string;
  glowColor: string;
  bgColor: string;
  borderColor: string;
  timestamp: string;
  elapsed: string;
  outputs: ShockwaveOutput[];
  recommendation: string;
  action: { label: string; person: string; role: string };
}

export interface ShockwaveData {
  eventName: string;
  eventDate: string;
  waves: ShockwaveWave[];
}

/* ------------------------------------------------------------------ */
/*  Pipeline                                                           */
/* ------------------------------------------------------------------ */

export interface PipelineStageOutput {
  label: string;
  value?: string;
  status: "complete" | "active" | "missing" | "pending" | "ai";
}

export interface PipelineStage {
  id: number;
  title: string;
  icon: string;
  color: string;
  glow: string;
  bg: string;
  border: string;
  inputs: string[];
  transformation: string;
  outputs: PipelineStageOutput[];
  status: "complete" | "active" | "pending";
  aiAssisted: boolean;
}

export interface PipelineEvidence {
  id: string;
  title: string;
  type: string;
  stage: number;
  summary: string;
}

export interface PipelineData {
  stages: PipelineStage[];
  evidence: PipelineEvidence[];
}

/* ------------------------------------------------------------------ */
/*  Full simulation result                                             */
/* ------------------------------------------------------------------ */

export interface SimulationResult {
  input: SimulationInput;
  home: SimulatorHomeData;
  gravity: GravityMapData;
  shockwave: ShockwaveData;
  pipeline: PipelineData;
}

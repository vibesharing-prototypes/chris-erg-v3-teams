"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { SimulationResult } from "./types";

interface SimulationState {
  result: SimulationResult | null;
  loading: boolean;
  error: string | null;
  generate: (company: string, riskTopic: string) => Promise<void>;
  clear: () => void;
}

const SimulationContext = createContext<SimulationState>({
  result: null,
  loading: false,
  error: null,
  generate: async () => {},
  clear: () => {},
});

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (company: string, riskTopic: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ company, riskTopic }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `API error ${res.status}`);
      }
      const data: SimulationResult = await res.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return (
    <SimulationContext.Provider value={{ result, loading, error, generate, clear }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  return useContext(SimulationContext);
}

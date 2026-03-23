import { SimulationProvider } from "./SimulationContext";

export default function RiskSimulatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SimulationProvider>{children}</SimulationProvider>;
}

import type { PointsCurrency } from "./types";

/** Cents per point — TPG-style benchmarks when user leaves target blank (PRD §5). */
export const CPP_BENCHMARKS: Record<PointsCurrency, number> = {
  MR: 2.0,
  UR: 1.8,
  C1: 1.85,
  Bonvoy: 0.7,
};

export const CPP_PRESETS = [1.5, 1.8, 2.0, 2.5] as const;

export const CPP_BENCHMARK_LABEL = "Using standard CPP benchmarks";

/**
 * cpp = cents per point = (usd / points) * 100
 */
export function cppFromUsd(points: number, usd: number): number {
  if (points <= 0 || usd <= 0) return 0;
  return (usd / points) * 100;
}

function thresholdForCurrency(
  currency: PointsCurrency,
  userTargetCpp?: number | null,
): number {
  if (currency === "Bonvoy") {
    return CPP_BENCHMARKS.Bonvoy;
  }
  if (userTargetCpp != null && !Number.isNaN(userTargetCpp)) {
    return userTargetCpp;
  }
  return CPP_BENCHMARKS[currency];
}

export function evaluateCpp(
  pointsCost: number,
  cashValueUsd: number,
  currency: PointsCurrency,
  userTargetCpp?: number | null,
): { cpp: number; meetsTarget: boolean; benchmarkUsed: boolean } {
  const cpp = cppFromUsd(pointsCost, cashValueUsd);
  const benchmarkUsed =
    userTargetCpp == null ||
    Number.isNaN(userTargetCpp) ||
    currency === "Bonvoy";
  const threshold = thresholdForCurrency(currency, userTargetCpp);
  return {
    cpp,
    meetsTarget: cpp >= threshold,
    benchmarkUsed,
  };
}

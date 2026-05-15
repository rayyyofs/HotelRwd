import { describe, expect, it } from "vitest";
import { evaluateCpp } from "../cpp";

describe("evaluateCpp", () => {
  it("flags redemption above user target", () => {
    const r = evaluateCpp(50000, 1100, "MR", 2.0);
    expect(r.cpp).toBeCloseTo(2.2, 5);
    expect(r.meetsTarget).toBe(true);
    expect(r.benchmarkUsed).toBe(false);
  });

  it("uses Bonvoy benchmark when user target would be unrealistic", () => {
    const r = evaluateCpp(35000, 245, "Bonvoy", 2.0);
    expect(r.cpp).toBeCloseTo(0.7, 5);
    expect(r.meetsTarget).toBe(true);
    expect(r.benchmarkUsed).toBe(true);
  });

  it("uses MR benchmark when no user target", () => {
    const r = evaluateCpp(50000, 900, "MR", null);
    expect(r.cpp).toBeCloseTo(1.8, 5);
    expect(r.meetsTarget).toBe(false);
    expect(r.benchmarkUsed).toBe(true);
  });
});

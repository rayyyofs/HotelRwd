import { describe, expect, it } from "vitest";
import { getEligibleHotels } from "../eligibility";

describe("getEligibleHotels", () => {
  const dates = { checkIn: "2026-06-01", checkOut: "2026-06-04" };

  it("returns Kimpton with FHR and EDIT when user holds Amex and Chase", () => {
    const rows = getEligibleHotels(
      "Salt Lake City",
      dates,
      ["amex_platinum", "chase_csr"],
    );
    const kimpton = rows.find((h) => h.id === "kimpton-monaco-slc");
    expect(kimpton).toBeDefined();
    expect(kimpton?.programs).toEqual(
      expect.arrayContaining(["FHR", "EDIT"]),
    );
  });

  it("returns no rows when no cards selected", () => {
    expect(getEligibleHotels("Salt Lake City", dates, [])).toHaveLength(0);
  });

  it("matches city case-insensitively", () => {
    const a = getEligibleHotels("CHICAGO", dates, ["amex_platinum"]);
    const b = getEligibleHotels("Chicago", dates, ["amex_platinum"]);
    expect(a.length).toBe(b.length);
    expect(a.length).toBeGreaterThan(0);
  });
});

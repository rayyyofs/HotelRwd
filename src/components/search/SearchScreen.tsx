"use client";

import { useMemo, useState } from "react";
import qualityData from "@/data/quality.json";
import { useUserPrefs } from "@/hooks/useUserPrefs";
import { getEligibleHotels } from "@/lib/eligibility";
import type { HotelRecord, Program } from "@/lib/types";
import { CardSelector } from "./CardSelector";
import { CppTargetInput } from "./CppTargetInput";
import styles from "./search.module.css";
import { SearchForm, type SearchFields } from "./SearchForm";

const qualityByHotel = qualityData as Record<string, ("NEW" | "RENOVATED")[]>;

function programLabel(p: Program): string {
  if (p === "CERT_35K") return "CERT · 35K";
  if (p === "CERT_50K") return "CERT · 50K";
  if (p === "C1_PREMIER") return "C1 PREMIER";
  return p;
}

export function SearchScreen() {
  const { hydrated, selectedCards, setSelectedCards, cppTarget, setCppTarget } =
    useUserPrefs();
  const [fields, setFields] = useState<SearchFields>({
    city: "",
    checkIn: "",
    checkOut: "",
  });
  const [results, setResults] = useState<HotelRecord[] | null>(null);

  const canSubmit = useMemo(() => {
    const cityOk = fields.city.trim().length > 0;
    const datesOk =
      Boolean(fields.checkIn && fields.checkOut) &&
      fields.checkOut > fields.checkIn;
    const cardsOk = selectedCards.length > 0;
    return cityOk && datesOk && cardsOk;
  }, [fields, selectedCards]);

  function handleSearch() {
    const rows = getEligibleHotels(fields.city.trim(), {
      checkIn: fields.checkIn,
      checkOut: fields.checkOut,
    }, selectedCards);
    setResults(rows);
  }

  if (!hydrated) {
    return (
      <main className={styles.section}>
        <p className="mono-label">Loading preferences…</p>
      </main>
    );
  }

  return (
    <main className={styles.section}>
      <div className={styles.titleBlock}>
        <h1
          className="hero-serif"
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.35rem)",
            margin: "0 0 8px",
          }}
        >
          Search
        </h1>
        <p
          style={{
            margin: 0,
            maxWidth: "52ch",
            color: "var(--muted)",
            fontSize: "13px",
          }}
        >
          Select your cards, optionally set a CPP target, then search a destination.
          Retail estimates and full comparison panels arrive in later MVP tasks.
        </p>
      </div>

      <section aria-labelledby="cards-heading">
        <h2 id="cards-heading" className="mono-label" style={{ marginBottom: "10px" }}>
          Cards you carry
        </h2>
        <CardSelector selected={selectedCards} onChange={setSelectedCards} />
      </section>

      <section style={{ marginTop: "28px" }} aria-labelledby="cpp-heading">
        <h2 id="cpp-heading" className="mono-label" style={{ marginBottom: "10px" }}>
          CPP target
        </h2>
        <CppTargetInput cppTarget={cppTarget} onChange={setCppTarget} />
      </section>

      <section style={{ marginTop: "28px" }} aria-labelledby="trip-heading">
        <h2 id="trip-heading" className="mono-label" style={{ marginBottom: "10px" }}>
          Trip
        </h2>
        <SearchForm
          value={fields}
          onChange={setFields}
          onSubmit={handleSearch}
          canSubmit={canSubmit}
        />
        {selectedCards.length === 0 && (
          <p style={{ marginTop: "12px", fontSize: "12px", color: "var(--amber)" }}>
            Select at least one card to run a search.
          </p>
        )}
      </section>

      {results !== null && (
        <section className={styles.resultStrip} aria-live="polite">
          <p className="mono-label" style={{ marginBottom: "4px" }}>
            Discovery preview
          </p>
          <p style={{ margin: 0, fontSize: "13px" }}>
            {results.length} hotel{results.length === 1 ? "" : "s"} in{" "}
            {fields.city.trim()} matching your stack
            {results.length === 0
              ? " — try another city or add different cards."
              : "."}
          </p>
          {results.length > 0 && (
            <ul className={styles.hotelList}>
              {results.map((h) => (
                <li key={h.id}>
                  <div style={{ fontWeight: 500 }}>{h.name}</div>
                  <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                    {h.brand}
                    {h.neighborhood ? ` · ${h.neighborhood}` : ""}
                  </div>
                  <div className={styles.badgeRow}>
                    {h.programs.map((p) => (
                      <span key={p} className={styles.pillProgram}>
                        {programLabel(p)}
                      </span>
                    ))}
                    {(qualityByHotel[h.id] ?? []).map((q) => (
                      <span key={q} className={styles.pillQuality}>
                        {q}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}

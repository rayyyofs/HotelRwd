"use client";

import { useState } from "react";
import { CPP_BENCHMARK_LABEL, CPP_PRESETS } from "@/lib/cpp";
import styles from "./search.module.css";

type Props = {
  cppTarget: number | null;
  onChange: (next: number | null) => void;
  disabled?: boolean;
};

export function CppTargetInput({ cppTarget, onChange, disabled }: Props) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customDraft, setCustomDraft] = useState("");

  function applyPreset(value: number) {
    setCustomOpen(false);
    onChange(value);
  }

  function applyCustom() {
    const n = Number(customDraft);
    if (!Number.isFinite(n) || n <= 0) return;
    onChange(Number(n.toFixed(2)));
    setCustomOpen(false);
  }

  function clearTarget() {
    setCustomOpen(false);
    setCustomDraft("");
    onChange(null);
  }

  const presetActive = (v: number) => cppTarget !== null && Math.abs(cppTarget - v) < 1e-6;

  return (
    <div>
      <span className="mono-label" style={{ marginBottom: "8px", display: "block" }}>
        My CPP target (optional)
      </span>
      <div className={styles.cppRow}>
        {CPP_PRESETS.map((v) => (
          <button
            key={v}
            type="button"
            className={styles.chip}
            data-active={presetActive(v)}
            disabled={disabled}
            onClick={() => applyPreset(v)}
          >
            {v}¢
          </button>
        ))}
        <button
          type="button"
          className={styles.chip}
          data-active={customOpen}
          disabled={disabled}
          onClick={() => {
            setCustomOpen(true);
            if (cppTarget != null) setCustomDraft(String(cppTarget));
          }}
        >
          Custom
        </button>
        <button
          type="button"
          className={styles.chip}
          disabled={disabled || cppTarget === null}
          onClick={clearTarget}
        >
          Clear
        </button>
      </div>
      {customOpen && (
        <div className={styles.row} style={{ marginTop: "10px", alignItems: "center" }}>
          <label style={{ fontSize: "12px", color: "var(--muted)" }}>
            Custom ¢ / pt{" "}
            <input
              className={styles.customCpp}
              inputMode="decimal"
              value={customDraft}
              disabled={disabled}
              onChange={(e) => setCustomDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") applyCustom();
              }}
            />
          </label>
          <button
            type="button"
            className={styles.chip}
            disabled={disabled}
            onClick={applyCustom}
          >
            Apply
          </button>
        </div>
      )}
      <p style={{ margin: "10px 0 0", fontSize: "12px", color: "var(--muted)" }}>
        {cppTarget === null ? CPP_BENCHMARK_LABEL : `Using ${cppTarget}¢ / pt`}
      </p>
    </div>
  );
}

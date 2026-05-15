"use client";

import { useEffect, useState } from "react";

function formatClock(d: Date) {
  const date = d.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const time = d.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  return { date, time };
}

export function AppHeader() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const clock =
    now === null ? { date: "…", time: "…" } : formatClock(now);

  return (
    <header
      className="hairline"
      style={{
        borderWidth: "0 0 1px",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <nav style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
        <span className="mono-label">SEARCH</span>
      </nav>
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          marginLeft: "auto",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--muted)",
        }}
      >
        <span>{clock.date}</span>
        <span>{clock.time}</span>
        <span style={{ color: "var(--teal)", letterSpacing: "0.02em" }}>
          ● RATES LIVE
        </span>
      </div>
    </header>
  );
}

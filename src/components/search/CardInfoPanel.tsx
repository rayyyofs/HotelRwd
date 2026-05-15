"use client";

import { useEffect, useRef } from "react";
import type { CardDefinition } from "@/lib/types";

type Props = {
  card: CardDefinition | null;
  onClose: () => void;
};

export function CardInfoPanel({ card, onClose }: Props) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, onClose]);

  if (!card) return null;

  return (
    <div
      ref={backdropRef}
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,25,23,0.35)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "48px 16px",
        zIndex: 50,
      }}
      onMouseDown={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="card-info-title"
        className="hairline"
        style={{
          background: "var(--bg)",
          maxWidth: 440,
          width: "100%",
          padding: "20px",
          borderWidth: "1px",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2
          id="card-info-title"
          className="hero-serif"
          style={{ margin: "0 0 12px", fontSize: "1.25rem" }}
        >
          {card.infoPanel.title}
        </h2>
        <ul
          style={{
            margin: 0,
            paddingLeft: "1.1rem",
            color: "var(--muted)",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {card.infoPanel.bullets.map((b) => (
            <li key={b} style={{ marginBottom: "8px" }}>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

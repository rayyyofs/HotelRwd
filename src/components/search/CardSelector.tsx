"use client";

import { useMemo, useState } from "react";
import { getCards } from "@/lib/cards";
import type { CardDefinition, CardId } from "@/lib/types";
import { CardInfoPanel } from "./CardInfoPanel";
import styles from "./search.module.css";

type Props = {
  selected: CardId[];
  onChange: (next: CardId[]) => void;
  disabled?: boolean;
};

export function CardSelector({ selected, onChange, disabled }: Props) {
  const cards = useMemo(() => getCards(), []);
  const [infoCard, setInfoCard] = useState<CardDefinition | null>(null);

  function toggle(id: CardId) {
    if (disabled) return;
    const set = new Set(selected);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    onChange(Array.from(set));
  }

  return (
    <>
      <div className={`${styles.row} ${styles.cardRow}`}>
        {cards.map((card) => {
          const active = selected.includes(card.id);
          return (
            <div key={card.id} style={{ display: "flex", alignItems: "center" }}>
              <button
                type="button"
                className={styles.cardToggle}
                data-active={active}
                disabled={disabled}
                onClick={() => toggle(card.id)}
              >
                {card.label}
              </button>
              <button
                type="button"
                className={styles.infoBtn}
                aria-label={`About ${card.label}`}
                disabled={disabled}
                onClick={() => setInfoCard(card)}
              >
                ⓘ
              </button>
            </div>
          );
        })}
      </div>
      <CardInfoPanel card={infoCard} onClose={() => setInfoCard(null)} />
    </>
  );
}

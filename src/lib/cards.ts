import cardsData from "@/data/cards.json";
import type { CardDefinition, CardId, Program } from "./types";

const cards = cardsData as CardDefinition[];

export function getCards(): CardDefinition[] {
  return cards;
}

export function getCardById(id: CardId): CardDefinition | undefined {
  return cards.find((c) => c.id === id);
}

/** Union of programs unlocked by the selected cards. */
export function programsForCards(selected: CardId[]): Program[] {
  const set = new Set<Program>();
  for (const id of selected) {
    const card = getCardById(id);
    if (!card) continue;
    for (const p of card.programs) set.add(p);
  }
  return Array.from(set);
}

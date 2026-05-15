import type { CardId } from "./types";

export const STORAGE_KEYS = {
  cards: "hotelrwd:cards",
  cppTarget: "hotelrwd:cppTarget",
} as const;

function parseCards(raw: string | null): CardId[] | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as unknown;
    if (!Array.isArray(v)) return null;
    return v as CardId[];
  } catch {
    return null;
  }
}

export function readSelectedCards(): CardId[] | null {
  if (typeof window === "undefined") return null;
  return parseCards(window.localStorage.getItem(STORAGE_KEYS.cards));
}

export function writeSelectedCards(cards: CardId[]): void {
  window.localStorage.setItem(STORAGE_KEYS.cards, JSON.stringify(cards));
}

export function readCppTarget(): number | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEYS.cppTarget);
  if (raw === null) return null;
  try {
    const v = JSON.parse(raw) as unknown;
    if (v === null) return null;
    if (typeof v === "number" && !Number.isNaN(v)) return v;
    return null;
  } catch {
    return null;
  }
}

export function writeCppTarget(target: number | null): void {
  window.localStorage.setItem(STORAGE_KEYS.cppTarget, JSON.stringify(target));
}

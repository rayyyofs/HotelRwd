import eligibilityData from "@/data/eligibility.json";
import type { CardId, HotelRecord, Program, SearchDates } from "./types";
import { programsForCards } from "./cards";

const hotels = eligibilityData as HotelRecord[];

function normalizeCity(city: string): string {
  return city.trim().toLowerCase();
}

function intersects(programsA: Program[], programsB: Program[]): boolean {
  const b = new Set(programsB);
  return programsA.some((p) => b.has(p));
}

/**
 * Hotels in the given city that qualify for at least one program
 * unlocked by the selected cards.
 */
export function getEligibleHotels(
  city: string,
  _dates: SearchDates,
  selectedCardIds: CardId[],
): HotelRecord[] {
  const userPrograms = programsForCards(selectedCardIds);
  if (userPrograms.length === 0) return [];

  const target = normalizeCity(city);
  return hotels.filter((h) => {
    if (normalizeCity(h.city) !== target) return false;
    return intersects(h.programs, userPrograms);
  });
}

export function getAllHotels(): HotelRecord[] {
  return hotels;
}

"use client";

import { useCallback, useEffect, useState } from "react";
import type { CardId } from "@/lib/types";
import {
  readCppTarget,
  readSelectedCards,
  writeCppTarget,
  writeSelectedCards,
} from "@/lib/storage";

export function useUserPrefs() {
  const [hydrated, setHydrated] = useState(false);
  const [selectedCards, setSelectedCardsState] = useState<CardId[]>([]);
  const [cppTarget, setCppTargetState] = useState<number | null>(null);

  useEffect(() => {
    setSelectedCardsState(readSelectedCards() ?? []);
    setCppTargetState(readCppTarget());
    setHydrated(true);
  }, []);

  const setSelectedCards = useCallback((next: CardId[]) => {
    setSelectedCardsState(next);
    writeSelectedCards(next);
  }, []);

  const setCppTarget = useCallback((next: number | null) => {
    setCppTargetState(next);
    writeCppTarget(next);
  }, []);

  return {
    hydrated,
    selectedCards,
    setSelectedCards,
    cppTarget,
    setCppTarget,
  };
}

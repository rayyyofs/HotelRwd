export type Program =
  | "FHR"
  | "EDIT"
  | "CERT_35K"
  | "CERT_50K"
  | "C1_PREMIER"
  | "DIRECT";

export type CardId =
  | "amex_platinum"
  | "chase_csr"
  | "capital_one_venture_x"
  | "marriott_boundless";

export interface CardDefinition {
  id: CardId;
  label: string;
  programs: Program[];
  infoPanel: { title: string; bullets: string[] };
}

export type PointsCurrency = "MR" | "UR" | "C1" | "Bonvoy";

export interface HotelRecord {
  id: string;
  name: string;
  brand: string;
  city: string;
  neighborhood?: string;
  starRating?: number;
  programs: Program[];
  /** Marriott award category when CERT applies */
  marriottCategory?: number;
}

export interface SearchDates {
  checkIn: string;
  checkOut: string;
}

"use client";

import styles from "./search.module.css";

export type SearchFields = {
  city: string;
  checkIn: string;
  checkOut: string;
};

type Props = {
  value: SearchFields;
  onChange: (next: SearchFields) => void;
  onSubmit: () => void;
  canSubmit: boolean;
  disabled?: boolean;
};

export function SearchForm({
  value,
  onChange,
  onSubmit,
  canSubmit,
  disabled,
}: Props) {
  return (
    <form
      className={styles.searchGrid}
      onSubmit={(e) => {
        e.preventDefault();
        if (canSubmit && !disabled) onSubmit();
      }}
    >
      <div>
        <label className={`mono-label ${styles.fieldLabel}`} htmlFor="city">
          Destination city
        </label>
        <input
          id="city"
          className={styles.textInput}
          placeholder="Buenos Aires"
          value={value.city}
          disabled={disabled}
          onChange={(e) => onChange({ ...value, city: e.target.value })}
          autoComplete="off"
        />
      </div>
      <div>
        <label className={`mono-label ${styles.fieldLabel}`} htmlFor="checkIn">
          Check-in
        </label>
        <input
          id="checkIn"
          type="date"
          className={styles.textInput}
          value={value.checkIn}
          disabled={disabled}
          onChange={(e) => onChange({ ...value, checkIn: e.target.value })}
        />
      </div>
      <div>
        <label className={`mono-label ${styles.fieldLabel}`} htmlFor="checkOut">
          Check-out
        </label>
        <input
          id="checkOut"
          type="date"
          className={styles.textInput}
          value={value.checkOut}
          disabled={disabled}
          onChange={(e) => onChange({ ...value, checkOut: e.target.value })}
        />
      </div>
      <div>
        <button
          type="submit"
          className={styles.primaryBtn}
          disabled={disabled || !canSubmit}
        >
          Search hotels
        </button>
      </div>
    </form>
  );
}

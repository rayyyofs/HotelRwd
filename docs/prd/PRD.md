# HotelRwd PRD

**Version 0.7 · May 2026 · Status: Internal**

---

## Table of Contents

1. [Value Proposition](#1-value-proposition)  
2. [The Problem — Precisely Stated](#2-the-problem--precisely-stated)  
3. [The Solution — Core Concept](#3-the-solution--core-concept)  
4. [Target Users](#4-target-users)  
5. [Core Features — MVP](#5-core-features--mvp)  
6. [Phase 2 Features](#6-phase-2-features)  
7. [What HotelRwd Is Not](#7-what-pointspath-is-not)  
8. [Data Architecture](#8-data-architecture)  
9. [User Flow](#9-user-flow)  
10. [UX Principles](#10-ux-principles)  
11. [Design Language](#11-design-language)  
12. [Navigation](#12-navigation)  
13. [Phased Delivery Plan](#13-phased-delivery-plan)  
14. [Market Feedback Strategy](#14-market-feedback-strategy)  
15. [Open Questions](#15-open-questions)  
16. [Backlog](#16-backlog)  
17. [Glossary](#17-glossary)

---

## What Changed in v7

Three focused changes based on feedback from the product review:

- **Simon's persona corrected.** He is not a business traveler. The secondary persona is now 'The CPP Optimizer' — a frequent traveler who evaluates hotel value using cents-per-point thresholds and has preferences around hotel recency and quality. All business-travel and expense-reimbursement framing has been removed.  
- **Card setup moved to Phase 2 backlog.** For MVP, the user simply selects which cards they hold on the search screen. Each card shows an info icon (ⓘ) that opens a quick-reference panel of its hotel program benefits. No balance tracking, no credit remaining, no cert status — those are deferred.  
- **CPP target made optional and contextual.** Rather than a setup screen, the CPP target is an optional field on the search screen with easy preset suggestions. If left blank, HotelRwd applies industry-standard defaults (TPG benchmark values) and labels them clearly so the user understands what threshold is being used.

---

## 1\. Value Proposition

**Primary tagline**

"Let your cards fund the trip. Not your wallet."

**Backup tagline**

"Maximum rewards. Minimum overthinking."

**Supporting body copy**

HotelRwd shows you every hotel at your destination that your cards unlock — FHR, The Edit, Marriott certs, Capital One Premier — in one place, ranked by value. Compare portal rates, direct booking, and points redemptions side by side. Stop browsing 5 portals. Start with the answer.

---

## 2\. The Problem — Precisely Stated

Premium travel cardholders face two compounding problems when booking hotels:

### Problem 1 — Discovery

There is no single place to see which hotels in a city qualify for which card programs. Each portal shows only its own inventory. A user holding Amex Platinum, Chase Sapphire Reserve, Capital One Venture X, and Marriott Bonvoy Boundless must browse all four portals separately and mentally track the overlap.

### Problem 2 — Comparison

The same hotel often appears across multiple booking paths — portal rates, direct booking, and points redemptions — at significantly different effective costs. The user only discovers this by holding multiple tabs open simultaneously and comparing manually. No tool shows this side by side.

**The direct booking blind spot:** Direct booking is often ignored because it's not visible in portal searches — yet for users with loyalty status, it can offer better earning rates and on-property benefits that portals don't match.

### Problem 3 — Value Verification

Users cannot easily tell whether a points redemption is good value without doing mental math. A redemption at 1.2¢/point feels different from one at 2.4¢/point, but portals show only the point price — not the CPP. There is no tool that flags "this exceeds a good redemption threshold" at the moment of decision.

### The Result

Booking a hotel requires browsing 4–5 portals simultaneously, mentally cross-referencing program eligibility, holding prices in working memory, and making a decision under uncertainty. This takes 30–60 minutes per trip even for a sophisticated user who knows exactly what they're doing.

**Primary user's own words:** "I intentionally browse both portals at the same time — and if this tool can allow me not to mentally do this action it would be helpful."

---

## 3\. The Solution — Core Concept

HotelRwd is a hotel eligibility discovery tool with a retail price baseline and a three-path comparison engine.

For any destination and date range, it shows the user every hotel that qualifies for at least one of their card programs — FHR, The Edit, Marriott cert, Capital One Premier — ranked by estimated value, in a single unified view. Retail price (from a legitimate API) appears alongside each program's benefit summary, and the direct booking path is shown alongside portal and points paths so the user can compare all three simultaneously.

**The Kimpton SLC example, solved:**

Today: user opens Amex Travel, finds Kimpton, notes price. Opens Chase Travel, finds Kimpton, notes price. Opens Kimpton.com to check direct rate and IHG status earning. Opens Google Hotels for retail reference. Compares mentally. Decides.

With HotelRwd: user searches Salt Lake City. Kimpton appears with EDIT ✔ · FHR ✔ badges, retail price, and a direct booking comparison row. If the user has set a CPP target, redemption paths are flagged accordingly. User taps the winning path. Books.

---

## 4\. Target Users

### Primary — The Active Optimizer

A frequent leisure traveler (4–12 trips/year) holding 3–6 premium travel credit cards across multiple point currencies. They already know their programs and roughly how they work. Their pain is the time and cognitive load of manually cross-referencing multiple portals on every booking.

**Confirmed behaviors:**

- Almost always has a destination in mind; sometimes flexible on city within a region  
- Has 4–5 hotel options in mind as serious contenders, not browsing 50 hotels  
- Has brand preferences (Kimpton, W, Waldorf, JW Marriott) that appear across programs  
- Browses Amex Travel and Chase Travel simultaneously today to spot overlap  
- Finds the Marriott cert the most painful to optimize — no good discovery tool exists  
- Will compare portal price vs. retail before booking — does not want to be "trapped" in a high-markup portal  
- Books hotels for both specific trips and flexible regional trips

### Secondary — The CPP Optimizer

A frequent traveler who evaluates hotel redemptions using a personal cents-per-point threshold rather than browsing programs intuitively. Holds multiple cards but approaches booking decisions analytically: if a redemption doesn't hit a target CPP, they'll pay cash and keep their points for better opportunities.

**Distinct behaviors and priorities:**

- Uses CPP as the primary filter for points redemptions — has a personal threshold (e.g. \~2.0¢) below which they won't redeem  
- Cares about hotel quality signals (recently renovated, newly opened) alongside reward math — a high-value redemption at a dated property may not be worth it  
- Treats direct booking vs. portal as a meaningful comparison, especially when loyalty status affects earning rates  
- Wants to see whether card benefit credits apply and how much of the room cost they offset — but does not need the tool to track remaining balances

**What this means for the product:**

- CPP threshold should be available as an optional input, with sensible defaults if left blank  
- Hotel quality signals (NEW / RENOVATED) must appear in the discovery list  
- Direct booking must be a first-class comparison path  
- Card benefit credits should be shown as fixed values (e.g. "includes up to $300 FHR credit") rather than requiring balance tracking

---

## 5\. Core Features — MVP

### Feature 1 — Search Screen with Card Selection

The entry point to every search. Card selection lives here — not in a separate settings screen. This keeps the tool light and immediately useful without a setup flow.

**Card selection:**

- User selects which cards they hold from a list of supported cards  
- Selection is saved locally and persists across sessions  
- Each card displays an info icon (ⓘ) that opens a quick-reference panel showing: which hotel programs the card unlocks, the credit amount and terms (e.g. "$300 semi-annual hotel credit" for FHR), and any minimum stay requirements  
- No balance entry, no credit remaining, no cert status — deferred to Phase 2

**CPP target (optional):**

- An optional field: "My CPP target" with easy preset chips: `1.5¢ · 1.8¢ · 2.0¢ · 2.5¢ · Custom`  
- If left blank, HotelRwd uses TPG benchmark values per currency as defaults, clearly labeled in the UI as "Using standard CPP benchmarks"  
- Default benchmarks: MR 2.0¢ · UR 1.8¢ · C1 Miles 1.85¢ · Bonvoy 0.7¢  
- CPP target applies to the comparison panel — redemption paths are flagged ✔ (meets target) or ⚠ (below target)

**Search inputs:**

- Destination city  
- Check-in / check-out dates

**Design principle:** The search screen should feel like a Bloomberg terminal, not a settings page. Card selection is a quick toggle, not a form. The user should be searching within 30 seconds of opening the app.

---

### Feature 2 — Program-Eligible Hotel Discovery

For any destination and date range, shows every hotel qualifying for at least one card program in a single unified list.

**Each hotel card shows:**

- Hotel name, brand, star rating, neighborhood  
- Program badges: `FHR · EDIT · CERT (35K/50K) · C1 PREMIER` — all programs the hotel qualifies for  
- Quality chips: `NEW · RENOVATED` — distinct color from program badges  
- Retail price per night (from Amadeus/Expedia API, labeled as estimate)  
- Best available benefit summary (e.g. "includes up to $300 hotel credit" for the top-ranked path)  
- CPP indicator on points paths — ✔ if redemption meets CPP target, ⚠ if below  
- View on \[Portal\] → link for the recommended booking path

**Sorting options:**

- Best value (default — hotels with the most benefit relative to retail price)  
- By program (group by FHR / Edit / Cert / C1 Premier / Direct)  
- By retail price  
- By quality (newest / recently renovated first)

**Filtering:**

- Program filter: FHR · Edit · Cert-eligible · C1 Premier · Direct · any combination  
- Price range (retail estimate)  
- Brand filter (Kimpton, W, Marriott, etc.)  
- Cert filter: 35K only / 50K only (shown only when user has selected a Marriott card)  
- Quality filter: Newly opened · Recently renovated · Any  
- CPP filter: Show only redemptions meeting target (for points paths)

**Key design principle:** A hotel appearing on multiple programs shows ALL its badges. Program overlap — a hotel on both Edit and FHR — is currently invisible without opening two portals. HotelRwd surfaces it immediately. Marriott cert eligibility appears here as a badge alongside other program badges, not in a separate finder.

---

### Feature 3 — Per-Hotel Three-Path Comparison Panel

When a user taps a hotel in the list, a detail panel expands showing a side-by-side comparison of every booking path available for that property.

| Path | Retail / portal est. | Card benefit | CPP | Notes |
| :---- | :---- | :---- | :---- | :---- |
| Chase The Edit | — check portal | Includes up to $250 credit (2-night min) | — | 8× UR earned · breakfast incl |
| Amex FHR | — check portal | Includes up to $300 credit (no min) | — | 5× MR · breakfast incl |
| Marriott Cert | Award: 35K pts | Cert covers room · \~$45 resort fees | 2.1¢ ✔ | Cert valid · meets target |
| Direct booking | From hotel.com | — | — | Status credit · loyalty earning |
| Cash (retail best) | $380/night | — | — | Earn 3× UR on CSR |

**Card benefit column:** Shows the fixed benefit value for that card's program (e.g. "includes up to $300 FHR credit"). This is the full benefit value — not the user's remaining balance, which is not tracked in MVP. Users are expected to know their own credit status.

**CPP column:** Shown only for points redemption paths. ✔ means the redemption meets the user's CPP target (or the default benchmark if none set). ⚠ means below target. Blank for cash and credit paths.

**Portal estimate column:** Since live portal pricing is not available in MVP, this column shows "— check portal" with a direct deep link to that hotel on that portal. The user confirms the final price before booking.

**Direct booking row:** Shows the hotel's own rate where available. Notes column surfaces loyalty earning differences vs. portal (e.g. "Status credit earned · no portal earning"). Tapping "View on hotel site →" takes the user directly to the property page.

**Overlap callout:** This hotel appears on both Chase The Edit and Amex FHR. Portal prices often differ — check both before booking.

---

### Feature 4 — Retail Price Baseline

For every hotel in the list, HotelRwd shows the retail price sourced from a legitimate hotel API (Amadeus, Expedia Rapid, or Hotelbeds). This lets the user quickly sanity-check whether a portal is likely to be good value without visiting it.

If the retail price is $200/night and the hotel qualifies for an FHR credit up to $300 on a 2-night stay, the math is obvious: the credit path likely offsets the full room cost. The user goes to Amex Travel to confirm and book.

⚠ **Important:** Retail prices are estimates. A small label under every retail figure reads "Retail est. · verify on portal before booking." The comparison panel never claims to show an exact net cost.

---

## 6\. Phase 2 Features

### Card Setup — Balance and Credit Tracking

Deferred from MVP. In Phase 2, users can optionally enter per-card details: points balance, remaining credit for the current benefit period, and free night cert status. This enables the comparison panel to show a personalized net cost estimate rather than the full benefit value.

Phase 2 also introduces CPP targets as a persistent per-currency setting rather than a per-search input.

### Explore — "Where Should I Go?"

For the user who has a region but not a city. Input: region \+ travel window \+ flexibility level. Output: a ranked list of cities ranked by card stack value.

**Ranking logic:**

- Number of FHR properties × quality of retail prices  
- Number of Marriott cert-eligible properties (quantity × caliber)  
- Number of Edit-eligible and C1 Premier properties

**Example:** In South America, Buenos Aires has 3 FHR properties averaging $280/night retail — the $300 credit covers a full night at 2 of them. Santiago has 2 FHR properties at $420/night average — the credit covers 71% of one night. Buenos Aires is the stronger FHR play.

### Live Portal Price Integration

If a browser extension model becomes viable (user-permissioned, client-side), the "— check portal" column gets replaced with actual portal prices. Estimated benefit offsets become exact net costs. This is the full vision — but not required for genuine utility.

### Flight Search

Separate mode for flights. Uses Amadeus / Skyscanner API for retail prices. Comparison engine evaluates: Amex Travel (5× MR on flights) · Chase portal (Points Boost if eligible) · Capital One (fixed 1¢/mile) · transfer partner award (manual input) · cash.

---

## 7\. What HotelRwd Is Not

- **Not a booking tool.** No transactions. Research and recommendation only.  
- **Not a price guarantee.** Retail prices are estimates. Portal prices vary. Users confirm before booking.  
- **Not a points or balance manager.** HotelRwd does not track remaining credits, points balances, or cert status in MVP.  
- **Not a replacement for the portals.** HotelRwd tells the user where to go and which portal to use. The portal itself is where they book.  
- **Not a loyalty program manager.** HotelRwd does not track status tier, elite qualifying nights, or program-specific benefits beyond what's needed for hotel comparison.

---

## 8\. Data Architecture

### Source 1 — Retail Hotel Prices

- **Source:** Amadeus Hotel Search API or Expedia Rapid API  
- **What it gives:** live retail prices for hotels at a destination, by date  
- **Refresh:** real-time, per search  
- **Legal status:** fully legitimate — designed for exactly this use case

### Source 2 — Direct Booking Rates

- **Source:** Amadeus direct-rate data where available; hotel brand APIs for major chains; fallback to hotel website  
- **What it gives:** the hotel's own rate, which may differ from retail aggregator prices  
- **Earning rate delta:** a curated reference table showing loyalty program earning rates for direct vs. portal bookings, by brand  
- **Coverage note:** major chains (Marriott, IHG, Hilton, Hyatt) have structured data; independent hotels may not. Direct row shown with fallback "Check hotel site" when data is unavailable

### Source 3 — Program Eligibility Database

- **What it contains:** for each hotel property globally — which programs it qualifies for (FHR, The Edit, Marriott cert category, Capital One Premier), brand, city, category  
- **How it's built:** compiled from publicly available sources (TPG, AwardTravel.co for Edit; Amex for FHR/THC; Marriott for award categories; Capital One portal for Premier Collection)  
- **Refresh cadence:** monthly — these lists change slowly

### Source 4 — Hotel Quality Signals

- **What it contains:** opening date (for NEW badge) and last major renovation date (for RENOVATED badge) per property  
- **Sources:** Google Places API; hotel brand press releases; curated tagging for high-traffic markets  
- **Refresh cadence:** quarterly  
- **Coverage note:** quality signals will have better coverage in major markets at launch

### Source 5 — User-Provided Data (MVP only)

- Cards selected by the user — saved locally, never on HotelRwd servers  
- CPP target (optional) — saved per session, persisted locally  
- No balance, credit remaining, or cert tracking in MVP — deferred to Phase 2

**Explicitly out of scope:** Server-side scraping of authenticated portal sessions. This is legally risky, technically fragile, and operationally unsustainable for a small team.

---

## 9\. User Flow

### First-Time User

1. Land on search screen  
2. Select cards from the list — tap ⓘ on any card to see what hotel programs it unlocks  
3. Optionally set a CPP target, or tap a preset chip (1.5¢ / 1.8¢ / 2.0¢)  
4. Enter destination and dates → see ranked hotel list

### Returning User (Most Common)

1. Open HotelRwd → cards already selected, CPP target remembered  
2. Enter: Buenos Aires · Nov 3–8  
3. See ranked hotel list: program badges, quality signals, retail prices, benefit summaries  
4. Spot: "Alvear Palace — FHR ✔ · RENOVATED · retail $310/night · includes up to $300 FHR credit"  
5. Tap hotel → comparison panel opens → sees FHR vs. Edit vs. direct vs. cash/points side by side  
6. CPP indicator flags Marriott points redemption as 2.1¢ ✔ (above target)  
7. Tap "View on Amex Travel →" → confirms portal price, books

**Time in HotelRwd:** 3–5 minutes · Portals visited: 1 · Tabs open simultaneously: 1

### CPP Optimizer Flow

1. Open HotelRwd → set CPP target to 2.0¢ (or already saved)  
2. Enter destination and dates  
3. Filter: CPP ✔ only — see only hotels where at least one points path hits the target  
4. Tap hotel → comparison panel → direct booking row shows loyalty earning delta vs. portal  
5. Card credit row shows "includes up to $250 Edit credit" — user knows whether they have credit remaining  
6. Decides best path, taps deep link, books

### Marriott Cert Flow

1. Search destination  
2. Filter: CERT badge active (in main filter bar — not a separate page)  
3. See only properties within cert cap alongside other program results  
4. Tap property → cert row in comparison panel: "35K cert · room rate covered · \~$45 resort fee"  
5. Tap "View on Marriott →" → books

---

## 10\. UX Principles

- **Discovery first, calculation second.** The primary job is showing which hotels qualify for which programs. The math supports that — it doesn't lead it.  
- **No setup wall.** The user should be searching within 30 seconds of opening the app. Card selection is a quick toggle on the search screen, not a setup flow.  
- **Show overlap explicitly.** A hotel on both Edit and FHR gets both badges, always. Program overlap is the single most valuable piece of information HotelRwd provides.  
- **Three paths, always visible.** Portal, direct booking, and points redemption are shown together in the comparison panel — never siloed.  
- **CPP at the point of decision.** The CPP indicator is visible in the comparison panel. A user should never have to calculate CPP mentally. If no target is set, benchmarks are used and labeled.  
- **Benefits shown as fixed values, not personalized balances.** "Includes up to $300 FHR credit" rather than "$185 remaining." MVP does not track remaining balances.  
- **Retail price as a reference, not a recommendation.** Always labeled "Retail est. · verify on portal."  
- **Quality signals as first-class filters.** Hotel recency and renovation status appear in the list and filter bar.  
- **5 contenders, not 50\.** Default sort surfaces the top 5–8 hotels by estimated value.  
- **One tap to the right portal.** Every hotel's "View on \[Portal\] →" link goes to that specific hotel on the specific portal — not the portal homepage.  
- **No jargon at the surface.** "FHR credit applied" not "semi-annual Amex Fine Hotels & Resorts benefit." Jargon lives in tooltips and ⓘ panels.

---

## 11\. Design Language

Locked from Claude Design prototype (May 2026). All screens maintain:

- Background: warm off-white `#F7F5F0`  
- Serif italic for destination and hotel hero text  
- Monospaced for all data, prices, balances, labels  
- Teal `#0F6E56` for winning path, primary CTAs, best value badges, CPP ✔ indicator  
- Amber for CPP ⚠ flag (below target) — visible but not alarming  
- Hairline rules, no drop shadows or heavy borders  
- Program badges as small pill chips: `FHR · EDIT · CERT · C1 · DIRECT`  
- Quality chips: `NEW · RENOVATED` — distinct color from program badges to avoid confusion  
- ⓘ info icon on each card — tappable, opens a lightweight panel, dismisses with a tap outside  
- Tone: financial terminal meets editorial travel — precise, confident, never salesy

---

## 12\. Navigation (MVP)

Single screen for MVP:

- **SEARCH** — card selection \+ CPP target \+ destination/dates \+ results list

EXPLORE tab added in Phase 2\. CARDS (detailed setup) added in Phase 2\. ITINERARIES and WATCHLIST deferred indefinitely.

Right of nav: date · time · "● RATES LIVE" (indicates retail price data is current).

---

## 13\. Phased Delivery Plan

| Phase | Name | What ships | Success gate |
| :---- | :---- | :---- | :---- |
| 0 — Landing | Waitlist page | "Let your cards fund the trip." \+ email capture. No functionality. | 200 waitlist emails |
| 1 — MVP | Hotel discovery | Card selection with ⓘ info icons · optional CPP target with presets · program eligibility database · retail price API · direct booking path · CPP indicator (default benchmarks if no target set) · quality signals · ranked hotel list · per-hotel 3-path comparison panel · deep links to portals | Creator books next trip using only HotelRwd — visits 1 portal |
| 2 — Card Setup | Balance tracking | Per-card balance entry · credit remaining · cert status · persistent CPP targets per currency · personalized net cost in comparison panel | 70% of beta users complete card setup |
| 3 — Explore | Regional discovery | City-level rankings by card stack value · "Where should I go?" for flexible travelers | 70% of beta users use Explore at least once |
| 4 — Beta | Multi-user \+ Reddit | Multi-user card setup · shareable result links · Reddit launch (r/churning, r/awardtravel) | 50+ upvotes, 20 beta signups |
| 5 — Flights | Flight search | Retail flight prices via API · portal comparison · transfer partner path (manual award input) | — |
| 6 — Live prices | Portal price layer | Browser extension reading portal prices from user's active sessions — if legally/technically viable | All comparison cells show exact portal prices |

---

## 14\. Market Feedback Strategy

### Phase 0 — Validate the Problem Statement

Landing page copy: "Stop browsing 5 portals every time you book a hotel. HotelRwd shows you every hotel at your destination that your cards unlock — FHR, The Edit, Marriott certs — in one place."

If this generates 200+ emails, the problem resonates. If not, the framing needs work before building.

### Phase 4 — Reddit Launch

- **r/churning:** lead with the Kimpton SLC example (Edit \+ FHR overlap). Exact optimization this community cares about.  
- **r/awardtravel:** lead with the Marriott cert discovery problem and the CPP indicator. "There's finally a tool that flags whether your redemption hits 2¢/point without doing the math yourself."  
- **r/CreditCards:** broader framing — "one place to see all your hotel benefits, compare portal vs. direct booking, and know if your points are actually good value."

Post framing: problem-first. "I got tired of having Amex Travel and Chase Travel open at the same time trying to spot overlap. I built a tool."

### What to Learn from Beta Users

- Which programs do you use most? → prioritizes database accuracy for that program  
- Did the direct booking comparison change any decisions? → validates Feature 3 expansion  
- Was the CPP indicator useful at decision time? → validates the threshold UI  
- Did the default CPP benchmarks feel right, or did you set your own? → informs Phase 2 CPP design  
- Did quality signals (NEW / RENOVATED) affect which hotel you chose? → validates data investment  
- Was the retail price estimate close to what you found on the portal? → validates API accuracy  
- Would you use balance tracking if it were available? → validates Phase 2 card setup priority

---

## 15\. Open Questions

**1\. Database maintenance** Who keeps the FHR/Edit/Cert property lists updated monthly? This is an ongoing operational cost. Could be automated (diff against public sources) or manual (curated). How much drift is acceptable before user trust erodes?

**2\. Direct booking data coverage** Major chains have APIs or structured data. Independent hotels may not. V1 decision: show direct row with "Check hotel site" fallback when data is unavailable, or suppress the row entirely? Suppressing is cleaner; fallback is more honest.

**3\. CPP default benchmark source** TPG publishes monthly CPP valuations. Should HotelRwd pull these dynamically (requires a data feed) or use static values updated quarterly by the team? Dynamic is more accurate but adds infrastructure complexity.

**4\. Retail price accuracy** Hotel API prices can differ from portal prices by 5–15%. Is "Retail est. · verify on portal" sufficient disclosure, or does this erode trust if the gap is consistently large?

**5\. Hotel quality signal coverage** Quality signals will be patchy at launch — good in major markets, sparse in secondary ones. Show quality chips only when confident, or show a "No quality data" state to be transparent about gaps?

**6\. CPP preset calibration** The suggested CPP presets (1.5¢, 1.8¢, 2.0¢, 2.5¢) are reasonable for most currencies but Bonvoy points are typically valued much lower (\~0.7¢). Should presets adapt based on which redemption currency is in view?

**7\. Marriott top-up logic** When a hotel exceeds the cert cap by a small amount, the cert can be topped up with up to 15K additional points. Should HotelRwd surface "top up 8,000 pts" options, or keep cert filter binary (valid/invalid)? Top-up requires knowing the user's points balance, which is Phase 2 territory.

**8\. Monetization** Free forever (builds trust, hard to sustain) · freemium (Explore behind paywall) · affiliate (earn commission when users click "View on portal →" links) · subscription. Affiliate model is most natural given the deep-link structure already exists.

**9\. Multi-city trips** User going to both Santiago and Buenos Aires on one trip. Does HotelRwd handle this as two separate searches, or is there a multi-city trip mode? Deferred, but worth noting for Phase 3 roadmap.

---

## 16\. Backlog

Features defined and desirable but explicitly deferred from MVP.

### Card Setup — Balance and Credit Tracking (Phase 2\)

- Per-card points balance entry  
- Credit remaining for current benefit period (e.g. $185 of $300 FHR credit remaining)  
- Free night cert status: NONE / 35K / 50K  
- Persistent CPP target per points currency  
- Personalized net cost estimates in comparison panel (replaces "includes up to $X" language)  
- Marriott top-up logic (requires points balance)

### Explore Mode (Phase 3\)

- Regional city rankings by card stack value  
- "Where should I go?" flow for flexible travelers

### Flight Search (Phase 5\)

- Retail flight prices via API  
- Portal comparison (Amex 5× MR, Chase Points Boost, C1 fixed rate)  
- Transfer partner award path (manual input)

### Live Portal Price Integration (Phase 6\)

- Browser extension reading portal prices from user's active sessions  
- Replaces "— check portal" with exact portal price  
- Exact net cost calculation replaces estimated benefit offset

---

## 17\. Glossary

| Term | Definition |
| :---- | :---- |
| **CPP** | Cents per point — dollar value per reward point redeemed. HotelRwd uses TPG benchmark values as defaults when no user target is set, labeled clearly in the UI. |
| **Card benefit credit** | A fixed dollar amount that a card program applies to qualifying hotel bookings (e.g. the $300 semi-annual hotel credit on Amex Platinum's FHR program). Shown in HotelRwd as "includes up to $X credit". Not tracked by HotelRwd in MVP. |
| **MR** | Amex Membership Rewards — transferable points from Amex Platinum and Gold. TPG default: 2.0¢/point. |
| **UR** | Chase Ultimate Rewards — transferable points from CSR, CSP, and Ink cards. Shared pool when both held. TPG default: 1.8¢/point. |
| **FHR** | Fine Hotels & Resorts — Amex Platinum hotel program. Up to $300 semi-annual hotel credit, breakfast, $100 property credit, upgrades at 3,100+ properties. No minimum stay. |
| **THC** | The Hotel Collection — Amex Platinum broader hotel benefit. $100 property credit at 1,300+ properties. 2-night minimum stay. Shares $300 semi-annual credit with FHR. |
| **The Edit** | Chase Sapphire Reserve hotel program. Up to $500 annual hotel credit ($250 per transaction max), breakfast, $100 property credit, upgrades. 2-night minimum. |
| **Points Boost** | Chase Travel variable-rate redemption. Eligible properties: up to 2.0¢ per UR. Non-eligible: 1.0¢ baseline. |
| **C1 Premier** | Capital One Premier Collection — hotel program for Venture X cardholders. $100 experience credit per stay. |
| **Cert** | Marriott Bonvoy free night certificate. Annual cert: ≤35K points. Welcome bonus cert: ≤50K points. Tops up with up to 15K additional points. Covers room rate only — resort fees separate. |
| **Program overlap** | When a hotel qualifies for more than one card program simultaneously (e.g. Edit \+ FHR). Currently invisible without opening multiple portals — HotelRwd surfaces it explicitly. |
| **Direct booking** | Booking made directly through the hotel's own website or brand portal. May offer different earning rates, status credit, and on-property benefits vs. third-party portals. First-class comparison path in HotelRwd. |
| **Retail est.** | Hotel retail price sourced from Amadeus/Expedia API. Used as a reference baseline. Always labeled as an estimate — portal and direct prices may differ. |
| **NEW / RENOVATED** | Quality signal badges. NEW: property opened within the last 3 years. RENOVATED: major renovation completed within the last 2 years. |


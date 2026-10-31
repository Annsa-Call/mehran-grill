# Menu extraction and verification

Source: https://share.google/3GxDRvmB2a2FiBBbS

Original PDF SHA-256: `76e33d820b4141554b74f7d2d50ce507c501eb1c9fb63b66959ad7447687a20b`

All 14 pages were read, including cover/contact pages1/14 and the dense drinks page13. Pages2–13 contain **143 source listings,169 priced variants,24 categories**. This count retains repeated source listings; it is not a claim of143 distinct recipes.

The JSON retains source names, descriptions, portion names, source-page references and verification notes. CSV has169 rows (one per priced portion); integer paisa is authoritative. The owner UI uses friendly title casing, not renamed dishes. Exact source prices were manually transcribed and checked against PDF text and page renders. Automated invariants check counts, valid pages, unique IDs and positive integer prices; this is not an OCR-only claim of correctness. Restaurant approval of current operational prices is still required.

## Per-category reconciliation

| Category | Source listings | Priced variants | PDF pages |
|---|---:|---:|---|
| Appetizer | 6 | 6 | 2 |
| New Arrivals | 4 | 4 | 2 |
| Soups | 2 | 4 | 3 |
| Sajji | 3 | 3 | 3 |
| Handi | 7 | 14 | 4 |
| Chicken Karahi | 7 | 14 | 5 |
| Mutton Karahi | 7 | 14 | 6 |
| BBQ Platters | 4 | 4 | 7 |
| Chargha | 2 | 4 | 7 |
| BBQ Temptations | 16 | 16 | 8, 9 |
| Chinese | 9 | 9 | 10 |
| Tawa | 4 | 4 | 11 |
| Add-ons | 3 | 3 | 11 |
| Sidelines | 2 | 2 | 12 |
| Tandoor | 6 | 6 | 12 |
| Dessert | 3 | 3 | 12 |
| Milk-based Mocktails | 6 | 6 | 13 |
| Fresh Juices | 6 | 6 | 13 |
| Craft Shakes | 5 | 5 | 13 |
| Beverages | 6 | 6 | 13 |
| Signature Mocktails | 7 | 7 | 13 |
| Coffee Frappes | 6 | 6 | 13 |
| Hot Coffee | 11 | 12 | 13 |
| Iced Coffee | 11 | 11 | 13 |

## Source ambiguities and deliberate treatment

- Signature kebab appears in New Arrivals and BBQ Temptations, both PKR1430; retained with distinct source IDs. Classic platter also appears in two source sections; retained, not silently deduplicated. Owner can hide one after approval.
- Half/full dishes remain distinct priced variants. Soup single/family bowls and espresso single/double are modeled, not flattened to one arbitrary price.
- Gulshan-only Tawa/add-ons and Lahori fried chargha remain in full data but unavailable at Garden. Garden grilled chargha remains available. Salim Bakra PKR38500 is preorder-only; not silently checkout-enabled.
- All source food prices are exclusive of tax. No tax rate was inferred. Demo0% visibly unconfirmed; live ordering requires confirmation.
- Source descriptions for Hot & Sour Soup and Paneer Reshmi Handi look copied from unrelated dishes. Preserved with source notes, not corrected by invention.
- Source typographic errors in drinks were retained in canonical names. Human-friendly display casing does not change their meaning or price.
- Food menu has no individual dish photos. Logo/hero artwork came from the official website, not falsely labeled as actual served-dish photographs. Authorization is a launch gate.
- Menu cover says Garden shop2; website says shop3. Address shop number remains unconfirmed.
- All source text was readable with extraction plus rendered-page inspection; no item price was guessed from an unreadable source.

## Complete extracted menu

The authoritative editable seed is `data/menu.json`; full exported portion list `data/menu.csv`; unmodified extracted text `docs/menu.txt`. Initial imported records have `source_page`/`source_note`. Owner price edits after initialization are explicitly configured restaurant prices and do not rewrite historic order snapshots. Re-running initial menu seed will not overwrite them.

## Per-item notes

- p2 MEHRAN SIGNATURE KEBAB:  Also listed on page 2 / page 9 at the same price.
- p3 HOT & SOUR SOUP:  Description appears mismatched in source PDF; owner confirmation needed.
- p3 SALIM BAKRA: Pre-order: approx. 10 kg, served with Kabuli rice; arrange with staff.
- p4 PANEER RESHMI HANDI:  Description appears mismatched in source PDF; owner confirmation needed.
- p7 MEHRAN CLAASSIC BBQ PLATTER:  Original spelling preserved; appears similar to New Arrivals classic platter.
- p7 LAHORI FRIED CHARGHA: Gulshan branch only; unavailable for Garden.
- p9 MEHRAN SIGNATURE KEBAB:  Also listed on page 2 / page 9 at the same price.
- p11 KATAKAT: Gulshan branch only; unavailable for Garden.
- p11 BRAIN MASALA: Gulshan branch only; unavailable for Garden.
- p11 CHICKEN BONELESS KATAKAT: Gulshan branch only; unavailable for Garden.
- p11 TAWA KARAHI: Gulshan branch only; unavailable for Garden.
- p11 SINGLE MUTTON PIECE: Gulshan branch only; unavailable for Garden.
- p11 SINGLE MUTTON BRAIN: Gulshan branch only; unavailable for Garden.
- p11 EXTRA BUTTER: Gulshan branch only; unavailable for Garden.

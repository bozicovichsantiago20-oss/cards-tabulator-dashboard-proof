# C.A.R.D.S. Pro Dashboard Tabulator Proof

Standalone proof for the `$1,000 Tabulator Gig` scope.

## What It Covers

- Vanilla JS plus Tabulator CDN.
- Synthetic NBA card JSON.
- Sorting on Value, Grade, and Date columns.
- Global search by Player Name.
- Pagination at 20 rows per page.
- Filter-aware inventory metrics.
- CSV export for the active table.
- Image/avatar, bold title, grade badge, currency value, status tag.
- Dark navy theme with orange and gold accents.

## Integration Notes

- Replace the synthetic `players` array in `app.js` with the private repo's mock JSON or API payload.
- Keep the `value` field numeric so Tabulator sorting and CSV export stay correct.
- Keep the table-only boundary: no backend, auth, payment data, customer data, or unrelated pages are required.

## Run Locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Files

- `index.html` loads the Tabulator CDN and dashboard shell.
- `styles.css` contains the dark dashboard and table styling.
- `app.js` contains mock card data, formatters, search, metrics, and table setup.

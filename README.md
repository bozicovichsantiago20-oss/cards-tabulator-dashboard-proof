# C.A.R.D.S. Pro Dashboard Tabulator Proof

Standalone proof for the `$1,000 Tabulator Gig` scope.

## What It Covers

- Vanilla JS plus Tabulator CDN.
- Synthetic NBA card JSON.
- Sorting on Value, Grade, and Date columns.
- Global search by Player Name.
- Pagination at 20 rows per page.
- Image/avatar, bold title, grade badge, currency value, status tag.
- Dark navy theme with orange and gold accents.

## Run Locally

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Files

- `index.html` loads the Tabulator CDN and dashboard shell.
- `styles.css` contains the dark dashboard and table styling.
- `app.js` contains mock card data, formatters, search, metrics, and table setup.

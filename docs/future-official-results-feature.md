# Future feature: fetch official results for a category to compute the conversion ratio

## Idea

Instead of (or in addition to) manually entering reference lap times, let the
user pick a racing category (e.g. Moto2, WorldSSP) and two circuits, then
have the app fetch official results for that category on both circuits and
compute the conversion factor from a sample of best times, rather than a
single manually-typed reference lap.

## Feasibility

Feasible, but the difficulty is entirely in **data availability**, not in the
app itself — the ratio math is already implemented and trivial.

- There is no free, structured, official API for MotoGP/Moto2/Moto3/WorldSBK/
  WorldSSP results. Championships publish results as PDF timing sheets or on
  their own results pages (motogp.com, worldsbk.com), not as open data.
- This makes it fundamentally a **web-scraping problem**: fetching HTML/PDF
  pages and parsing rider/lap/time tables, then normalizing circuit names and
  session types (race vs. qualifying vs. best lap).
- **Legal/ToS**: scraping these sites is a grey area — likely fine for
  personal/non-commercial use, but re-publishing their data as a service
  needs each site's terms checked first.
- **CORS**: since this app is a static client-side page, browser-side fetches
  to these result sites will very likely be blocked by CORS. A small
  backend/proxy is needed to fetch and cache results server-side.
- **Data quality/definition**: "best result" needs a clear definition
  (fastest race lap? qualifying pole? average of top N riders?), and results
  vary year to year (weather, tyre rules, track layout changes), so any
  cross-circuit ratio derived this way is inherently approximate — same
  caveat that already applies to manual entry today.

**Conclusion**: feasible, but it turns the project from a pure static
frontend into a small app with a backend (or a scheduled scraper producing a
static dataset), plus ongoing maintenance whenever a source site changes its
page layout.

## Very high-level plan (for later)

1. **Data sourcing** — pick the source(s) (official site scraping, or a
   community-maintained results archive if one exists) and confirm usage is
   allowed under their terms.
2. **Backend/collector** — a small service or scheduled job that fetches,
   parses, and normalizes results (circuit, category, session, rider, lap
   time) into a simple dataset (JSON/DB).
3. **API layer** — a thin endpoint the frontend can call (solves CORS, hides
   scraping details) to get "best times at circuit X for category Y".
4. **Frontend feature** — UI to pick category + two circuits + sample
   size/criteria, fetch the two time sets, compute the ratio (reusing the
   existing conversion logic), and show it alongside manual entry.
5. **Caching/maintenance** — cache results (a race weekend's results don't
   change once published), and expect occasional scraper breakage when
   source sites redesign.

This is intentionally high-level and not an implementation plan — meant as a
starting point for whenever this gets picked up.

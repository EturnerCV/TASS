# HSC — HubSpot Multi-Portal Consolidation

## What This Is
A consulting deliverable for consolidating 3-4 separate HubSpot portals (one per product line) into a single Enterprise portal with Business Units. Built as a BBL-branded report with full architecture documentation.

## Why It Exists
A potential employer runs multiple HubSpot accounts that duplicate customer data across product lines. This project demonstrates the consolidation strategy and serves as the implementation guide if hired.

## Key Files
- `deliverables/hubspot-consolidation-guide.html` — Main BBL-branded report (open in browser)
- `docs/architecture/` — Technical architecture docs (migration strategy, data mapping, platform overview)
- `docs/reference/` — Reference checklists (email domains, sandbox testing, risk register)

## Rules
1. All deliverables use BBL brand styling (dark theme, Bebas Neue headings, emerald accents)
2. Write for a non-technical audience — plain language, no jargon without explanation
3. Every claim about HubSpot capabilities must be verified against current documentation
4. Migration strategy must prioritize data integrity over speed
5. Never recommend deleting source portals — keep read-only for 90 days minimum

## Board
- Sprint board: `board/hsc/` in dev-studio
- Sprint naming: `HSC-S{N}`
- Ticket naming: `HSC-S{N}-{NNN}`

## Session End Protocol
Create `handoffs/handoff-YYYY-MM-DD.md` with:
1. Session Focus
2. What Got Done
3. Files Created / Modified
4. What's NOT Done
5. Quick Context for Next Session

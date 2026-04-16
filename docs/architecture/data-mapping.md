# Data Mapping — Cross-Portal Property Alignment

## Overview

Before migrating data from multiple HubSpot portals into one, you need to understand how the same information is stored differently across portals. Different teams may have named fields differently, used different field types, or created properties that don't exist in other portals.

This document provides templates for mapping properties across source portals and deciding how they should be handled in the target portal.

---

## Property Mapping Table — Contacts

Fill in for each custom contact property across all portals.

| Property Name (Portal 1) | Property Name (Portal 2) | Property Name (Portal 3) | Field Type | Target Name | Action |
|--------------------------|--------------------------|--------------------------|-----------|-------------|--------|
| `phone_number` | `phone` | `contact_phone` | Text | `phone` | Merge (same data) |
| `customer_tier` | — | — | Dropdown | `customer_tier` | Keep (Portal 1 only) |
| — | `account_level` | `tier` | Dropdown | `customer_tier` | Merge (same data, rename) |
| `signup_source` | `signup_source` | `signup_source` | Text vs Dropdown | ??? | **CONFLICT — resolve before migration** |
| | | | | | |

### Action Types
| Action | Meaning |
|--------|---------|
| **Merge** | Same data, different names → use one name in target |
| **Keep** | Only exists in one portal → bring into target as-is |
| **Rename** | Property name changes in target portal |
| **CONFLICT** | Same name, different field type → must resolve manually (cannot auto-migrate) |
| **Drop** | Property is unused/irrelevant → don't migrate |

---

## Property Mapping Table — Companies

| Property Name (Portal 1) | Property Name (Portal 2) | Property Name (Portal 3) | Field Type | Target Name | Action |
|--------------------------|--------------------------|--------------------------|-----------|-------------|--------|
| | | | | | |
| | | | | | |

---

## Property Mapping Table — Deals

| Property Name (Portal 1) | Property Name (Portal 2) | Property Name (Portal 3) | Field Type | Target Name | Action |
|--------------------------|--------------------------|--------------------------|-----------|-------------|--------|
| | | | | | |
| | | | | | |

---

## Property Mapping Table — Tickets

| Property Name (Portal 1) | Property Name (Portal 2) | Property Name (Portal 3) | Field Type | Target Name | Action |
|--------------------------|--------------------------|--------------------------|-----------|-------------|--------|
| | | | | | |
| | | | | | |

---

## Pipeline Mapping

### Deal Pipelines
Map existing pipelines from each portal to the target portal's pipeline structure:

| Source Portal | Source Pipeline | Source Stages | Target Pipeline | Target Stages | Notes |
|--------------|---------------|---------------|-----------------|---------------|-------|
| Portal 1 | Sales Pipeline | Lead → Qualified → Demo → Proposal → Won/Lost | Product A Sales | (same) | Keep stages as-is |
| Portal 2 | Deal Pipeline | New → Assessment → Quote → Negotiation → Closed | Product B Sales | (same) | Keep stages as-is |
| Portal 3 | Main Pipeline | Inquiry → Consultation → Contract → Active | Product C Sales | (same) | Keep stages as-is |

### Ticket Pipelines
| Source Portal | Source Pipeline | Source Stages | Target Pipeline | Target Stages | Notes |
|--------------|---------------|---------------|-----------------|---------------|-------|
| Portal 1 | Support | New → In Progress → Waiting → Resolved | Product A Support | (same) | |
| Portal 2 | Help Desk | Open → Investigating → Pending → Closed | Product B Support | (same) | |
| Portal 3 | Tickets | Submitted → Assigned → Working → Done | Product C Support | (same) | |

---

## Lifecycle Stage Mapping

If portals use different lifecycle stage definitions:

| Lifecycle Stage | Portal 1 Meaning | Portal 2 Meaning | Portal 3 Meaning | Target Meaning |
|----------------|------------------|------------------|------------------|----------------|
| Subscriber | Newsletter signup | — | Blog subscriber | Email subscriber |
| Lead | Form fill | Any new contact | Downloaded content | Form submission |
| MQL | Score > 50 | — | Score > 30 | Score > 50 (standardise) |
| SQL | Sales accepted | Responded to outreach | Meeting booked | Sales accepted |
| Opportunity | Deal created | — | Deal created | Deal created |
| Customer | Deal won | Deal won | Deal won | Deal won |
| Evangelist | Referral given | — | — | Referral given |

---

## Field Type Conflicts

These are the dangerous ones. If two portals have a property with the same internal name but different field types, the migration tool CANNOT auto-merge them.

| Property Internal Name | Portal 1 Type | Portal 2 Type | Resolution |
|-----------------------|---------------|---------------|------------|
| | | | |

### Resolution Options
1. **Rename one property before migration** — change the internal name in the source portal so they don't conflict
2. **Convert field type before migration** — change one portal's property to match the other's type (if possible)
3. **Create a new property in target** — use a new name, map both source properties to it via import
4. **Accept data loss** — if one portal's version is more accurate, keep that one and lose the other

---

## Workflow Mapping

Document which workflows exist in each portal and how they should translate to the target:

| Source Portal | Workflow Name | Trigger | Actions | Target Equivalent | Notes |
|--------------|---------------|---------|---------|-------------------|-------|
| Portal 1 | New Lead Welcome | Form submission | Send email, set lifecycle | Keep — add BU filter | Add "Business Unit = Product A" filter |
| Portal 1 | Deal Stage Notification | Deal reaches Proposal | Notify manager | Keep — update to Product A pipeline | |
| Portal 2 | Lead Scoring | Page views + email clicks | Update score | Merge with Portal 1's scoring | Consolidate into one scoring workflow |
| | | | | | |

### Workflow Decisions
For each workflow, decide:
1. **Keep as-is** — migrates automatically, just add Business Unit filter
2. **Merge** — combine similar workflows from different portals into one (with BU branching)
3. **Rebuild** — too different to merge, recreate from scratch in target
4. **Drop** — no longer needed after consolidation

---

## Integration Mapping

| Integration | Portal 1 | Portal 2 | Portal 3 | Target Plan |
|-------------|----------|----------|----------|-------------|
| | ✓ / — | ✓ / — | ✓ / — | Reconnect / Skip |
| | | | | |

### Per-Integration Checklist
For each integration that needs reconnecting:
- [ ] Verify the app supports connecting to a new HubSpot portal
- [ ] Check if re-authentication is needed (OAuth, API key, etc.)
- [ ] Identify if field mappings will need updating (property names may have changed)
- [ ] Test sync in sandbox first if possible
- [ ] Plan for data sync direction (one-way vs bidirectional)

---

## Checklist Before Migration

- [ ] All property mapping tables completed
- [ ] All CONFLICT properties resolved
- [ ] Pipeline mapping confirmed
- [ ] Lifecycle stage definitions aligned
- [ ] Workflow decisions made (keep/merge/rebuild/drop)
- [ ] Integration reconnection plan documented
- [ ] Stakeholders have reviewed and approved all mapping decisions

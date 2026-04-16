# Current State Analysis — Multi-Portal Setup

## Overview

The company currently operates 3-4 separate HubSpot portals, each dedicated to a single product line. Each portal is its own isolated instance with its own database, workflows, email domains, integrations, and user seats.

This document is a template for auditing each portal before consolidation.

---

## The Problem in Plain Language

Imagine you run a company that sells 4 different products. Instead of having one filing cabinet for all your customers, you have 4 separate filing cabinets — one in each department. When a customer buys Product A, their folder goes in Cabinet 1. When that same customer later buys Product B, a brand new folder is created in Cabinet 2. Nobody in Department B knows about the customer's history with Department A.

That's what's happening with separate HubSpot portals.

---

## What Breaks

### 1. Duplicate Customer Records
- **Customer Jane** buys Product A → Contact record created in Portal 1
- Jane later buys Product B → NEW contact record created in Portal 2
- Portal 1 has no idea Jane also bought Product B
- Portal 2 has no idea about Jane's Product A history
- **Result:** Two (or more) incomplete pictures of the same customer

### 2. Blind Spot in Service
- Jane opens a support ticket about Product B in Portal 2
- Service rep in Portal 2 cannot see that Jane had a previous issue with Product A (Portal 1)
- Jane has to repeat her history every time
- **Result:** Poor customer experience, longer resolution times

### 3. Duplicate Marketing Emails
- Portal 1's marketing team sends Jane a promotional email
- Portal 2's marketing team sends Jane a different email the same day
- Jane gets annoyed, unsubscribes from one — but still gets emails from the other
- **Result:** Email fatigue, unsubscribes, potential spam complaints

### 4. No Cross-Sell Visibility
- Product A team doesn't know which of their customers also bought Product B
- No way to run "customers who bought A but not B" campaigns
- No unified view of total customer lifetime value across products
- **Result:** Missed revenue opportunities

### 5. Inflated Costs
- Jane's contact record exists in Portal 1 AND Portal 2
- HubSpot charges per marketing contact in each portal
- Paying for the same person twice (or 3-4 times)
- Paying for 3-4 separate subscriptions instead of 1
- **Result:** Overpaying for HubSpot licensing

### 6. Impossible Company-Wide Reporting
- Revenue per customer? Can't calculate — data is in separate databases
- Total active customers? Must manually combine counts and deduplicate
- Which product line is growing fastest? Each portal reports independently
- Customer acquisition cost across all products? No single source of truth
- **Result:** Leadership decisions based on incomplete data

---

## Portal Inventory Template

Fill this out for EACH portal before starting migration.

### Portal Details
| Field | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|-------|----------|----------|----------|----------|
| Portal ID | | | | |
| Portal name | | | | |
| Product line | | | | |
| HubSpot tier | | | | |
| Hubs active | | | | |
| Created date | | | | |
| Account owner | | | | |

### Record Counts
| Object | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|--------|----------|----------|----------|----------|
| Contacts (total) | | | | |
| Contacts (marketing) | | | | |
| Companies | | | | |
| Deals (total) | | | | |
| Deals (open) | | | | |
| Deals (won) | | | | |
| Tickets (total) | | | | |
| Tickets (open) | | | | |
| Custom objects | | | | |
| Lists | | | | |
| Workflows | | | | |

### Properties Audit
| Category | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|----------|----------|----------|----------|----------|
| Contact properties (custom) | | | | |
| Company properties (custom) | | | | |
| Deal properties (custom) | | | | |
| Ticket properties (custom) | | | | |

### Marketing Assets
| Asset Type | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|-----------|----------|----------|----------|----------|
| Email templates | | | | |
| Landing pages | | | | |
| Forms | | | | |
| CTAs | | | | |
| Blog posts | | | | |
| Website pages | | | | |

### Email Configuration
| Setting | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|---------|----------|----------|----------|----------|
| Sending domain(s) | | | | |
| DKIM configured? | | | | |
| SPF configured? | | | | |
| DMARC configured? | | | | |
| Dedicated IP? | | | | |
| Monthly send volume | | | | |
| Average open rate | | | | |
| Average click rate | | | | |
| Bounce rate | | | | |

### Integrations
| Integration | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|-------------|----------|----------|----------|----------|
| (List each connected app) | | | | |

### Users & Teams
| Role/Team | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|-----------|----------|----------|----------|----------|
| Super Admins | | | | |
| Sales seats | | | | |
| Service seats | | | | |
| Core seats | | | | |
| View-only | | | | |

### Deal Pipelines
| Pipeline | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|----------|----------|----------|----------|----------|
| Pipeline name | | | | |
| Stages (list) | | | | |
| Open deals | | | | |
| Avg deal value | | | | |

### Ticket Pipelines
| Pipeline | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|----------|----------|----------|----------|----------|
| Pipeline name | | | | |
| Stages (list) | | | | |
| Open tickets | | | | |
| Avg resolution time | | | | |

---

## Duplicate Contact Estimation

Before migration, estimate how many contacts overlap across portals:

1. Export contact email lists from each portal (CSV)
2. Compare lists using Excel VLOOKUP or a dedup tool
3. Count matches

| Overlap | Count | % of smaller portal |
|---------|-------|-------------------|
| Portal 1 ∩ Portal 2 | | |
| Portal 1 ∩ Portal 3 | | |
| Portal 1 ∩ Portal 4 | | |
| Portal 2 ∩ Portal 3 | | |
| Portal 2 ∩ Portal 4 | | |
| Portal 3 ∩ Portal 4 | | |
| All portals | | |

This number directly impacts:
- How many duplicate merges will be needed post-migration
- How much you're currently overpaying on contact-based pricing
- The complexity of the deduplication phase

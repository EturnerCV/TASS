# HubSpot Platform Architecture

## Overview

HubSpot is a customer platform made up of 7 products (called "Hubs") that all plug into one shared database (the Smart CRM). Each hub handles a different part of the customer lifecycle — marketing, sales, service, content, data, and commerce. An AI layer called Breeze sits on top of everything.

The key thing: **all hubs share the same customer database.** When a contact interacts with marketing, then talks to sales, then opens a support ticket — it's all on one record. No syncing, no duplicates, no "which system has the right data?" questions.

---

## The 7 Hubs

### Smart CRM (The Foundation)
**What it is:** The shared database that all other hubs plug into.
**What it stores:** Contacts, Companies, Deals, Tickets, Custom Objects, and all the relationships between them.
**Why it matters for consolidation:** This is why consolidating to one portal works — instead of 4 separate databases, you get one. Every hub reads from and writes to the same place.

**Core objects:**
| Object | What it represents | Key identifiers |
|--------|-------------------|-----------------|
| Contacts | Individual people | Email address (primary dedup key) |
| Companies | Businesses | Domain name (primary dedup key) |
| Deals | Sales opportunities | Pipeline + Stage |
| Tickets | Support requests | Pipeline + Stage |
| Custom Objects | Anything else you need | Enterprise only, up to 2M records each |

**Associations:** Any object can be linked to any other object. A Contact can be associated with multiple Companies, multiple Deals, and multiple Tickets. This is how you see the full customer picture.

---

### Marketing Hub
**What it does:** Attracts leads and nurtures them until they're ready to buy.

**Key features:**
- Email marketing (drag-and-drop builder, templates, A/B testing)
- Marketing automation (workflows triggered by behaviour)
- Forms and landing pages (lead capture)
- Ad management (Google, Facebook, LinkedIn, Instagram with ROI tracking)
- Social media publishing and monitoring
- Lead scoring (automatic and manual)
- Multi-touch attribution reporting
- **Business Units / Brands** — manage multiple brands from one portal (Enterprise only)

**Pricing tiers:**
| Tier | Price | What you get |
|------|-------|-------------|
| Free | $0 | Basic email and forms |
| Starter | $20/mo | Small team basics |
| Professional | $890/mo | Automation, workflows, A/B testing |
| Enterprise | $3,600/mo | Business Units, advanced reporting, predictive scoring |

**Critical for consolidation:** Business Units (the feature that lets you run multiple brands from one portal) requires Marketing Hub Enterprise. This is the cornerstone of the entire consolidation strategy.

---

### Sales Hub
**What it does:** Helps sales teams manage deals, automate outreach, and forecast revenue.

**Key features:**
- Deal pipelines (customisable stages, drag-and-drop boards)
- Email sequences (automated follow-up chains)
- Meeting scheduling (syncs to calendar)
- Revenue forecasting
- Quotes and proposals
- Playbooks (guided selling scripts)
- Account-based marketing (ABM) tools

**Pricing tiers:**
| Tier | Price | What you get |
|------|-------|-------------|
| Free | $0 | Basic pipeline |
| Starter | $20/seat/mo | Small teams |
| Professional | $100/seat/mo | Sequences, forecasting |
| Enterprise | $150/seat/mo | Advanced permissions, custom objects |

**Note:** Sales Hub uses per-seat pricing. Each rep needs their own seat.

---

### Service Hub
**What it does:** Customer support — ticketing, knowledge base, customer feedback.

**Key features:**
- Help desk with ticket routing and SLA tracking
- Knowledge base (self-service articles)
- Customer portal (clients can track their own tickets)
- Customer feedback surveys (NPS, CSAT, CES)
- Shared inbox for team conversations
- AI-powered Customer Agent (handles routine enquiries)

**Pricing tiers:**
| Tier | Price | What you get |
|------|-------|-------------|
| Free | $0 | Basic ticketing |
| Starter | $20/seat/mo | Small teams |
| Professional | $100/seat/mo | Knowledge base, AI, SLAs |
| Enterprise | $150/seat/mo | Advanced SLAs, custom objects |

**Critical for consolidation:** Each product line likely has its own service team and ticket pipeline. After consolidation, all teams work from one Service Hub with separate pipelines per product line, but shared customer history.

---

### Content Hub (formerly CMS Hub)
**What it does:** Website, blog, and content management with built-in SEO.

**Key features:**
- Drag-and-drop website builder
- Blog management with SEO tools
- Smart content (personalises pages based on who's viewing)
- AI content generation (Breeze Content Agent)
- Multi-language support
- Membership content (gated pages)

**Pricing tiers:**
| Tier | Price | What you get |
|------|-------|-------------|
| Starter | $20/mo | Basic website |
| Professional | $500/mo | Smart content, SEO |
| Enterprise | $1,500/mo | Advanced personalisation |

---

### Data Hub (formerly Operations Hub)
**What it does:** Data governance, integration, and cleanup across HubSpot and external tools.

**Key features:**
- Data sync with 100+ third-party apps (real-time, bidirectional)
- AI-powered data quality (deduplication, formatting, validation)
- Programmable automation (custom-coded workflow actions)
- Warehouse connectors (Snowflake, BigQuery, Databricks)
- Data Studio for custom reports and visualisations
- Curated datasets (reusable data collections)

**Pricing tiers:**
| Tier | Price | What you get |
|------|-------|-------------|
| Free | $0 | Basic data sync |
| Starter | $20/mo | Small teams |
| Professional | $800/mo | Custom code actions, data quality |
| Enterprise | $2,000/mo | Warehouse connectors, advanced sync |

**Critical for consolidation:** Data Hub Professional or Enterprise is essential for post-migration deduplication and ongoing data quality. The native dedup tool catches basic duplicates, but for cross-portal matching you'll want the advanced tools.

---

### Commerce Hub
**What it does:** B2B payments — quotes, invoices, subscriptions.

**Key features:**
- Quotes with e-signature and approval workflows
- Invoicing from deal records
- Payment processing via Stripe
- Subscription management (recurring billing)
- Payment links (embeddable)
- Revenue reporting tied to pipeline

**Pricing:**
- Core features: Free
- Transaction processing: 2.9% + $0.30 per transaction (Stripe rates)

**Note:** Commerce Hub is NOT a storefront (no shopping cart, no inventory). It's for B2B transactions — sending quotes, collecting payment, managing subscriptions.

---

### Breeze AI (Intelligence Layer)
**What it is:** AI capabilities embedded across all hubs. Not a separate hub — it's an overlay.

**Key features:**
- **Copilot** (free with paid plans): Writing, research, summarisation
- **Customer Agent**: Handles routine support tickets automatically
- **Prospecting Agent**: Researches leads and writes outreach
- **Content Agent**: Generates content in brand voice
- **Breeze Intelligence**: Data enrichment and buyer intent signals
- **Predictive lead scoring**

**Pricing:**
- Copilot: Included in all paid plans
- Agents: Require Professional-tier hubs
- Intelligence: From $30/mo (credit-based enrichment)

---

## How the Hubs Connect

```
                    ┌─────────────────┐
                    │   BREEZE AI     │
                    │  (Intelligence  │
                    │    Layer)       │
                    └────────┬────────┘
                             │
    ┌────────────┬───────────┼───────────┬────────────┐
    │            │           │           │            │
┌───▼───┐  ┌────▼───┐  ┌────▼───┐  ┌────▼───┐  ┌────▼───┐
│MARKET-│  │ SALES  │  │SERVICE │  │CONTENT │  │COMMERCE│
│  ING  │  │  HUB   │  │  HUB   │  │  HUB   │  │  HUB   │
│  HUB  │  │        │  │        │  │        │  │        │
└───┬───┘  └────┬───┘  └────┬───┘  └────┬───┘  └────┬───┘
    │           │           │           │            │
    └───────────┴───────────┼───────────┴────────────┘
                            │
                    ┌───────▼────────┐
                    │   SMART CRM    │◄──── DATA HUB
                    │  (Shared DB)   │     (Sync & Clean)
                    └────────────────┘
```

**Data flow example:**
1. Visitor downloads a guide → **Content Hub** tracks the visit
2. Form submission → **Marketing Hub** scores the lead and starts nurture
3. Lead reaches threshold → **Marketing Hub** routes to sales rep
4. Rep works the deal → **Sales Hub** tracks pipeline progress
5. Deal closes with quote → **Commerce Hub** sends invoice
6. Customer needs help → **Service Hub** creates ticket with full history
7. Throughout → **Data Hub** keeps everything clean and synced
8. Throughout → **Breeze AI** assists with writing, research, routing

---

## Key Limits & Constraints

| Constraint | Detail |
|-----------|--------|
| Custom properties per object | 1,000 (higher on Enterprise) |
| Custom objects | Enterprise only, up to 2M records each |
| Business Units | Marketing Hub Enterprise only, add-on purchase |
| API rate limits | Varies by tier — Enterprise gets highest limits |
| Workflows | 500 (Pro), 1,000 (Enterprise) |
| Email sending | Based on marketing contact tier, not total contacts |
| Sandbox | Enterprise only — Standard Sandbox with Deploy to Production |
| Dedup tool results | 2,000 (Pro), 5,000 (Ops Pro), 10,000 (Enterprise) |

---

## Pricing Summary (Typical Mid-Market)

| Configuration | Monthly Cost |
|--------------|-------------|
| Marketing Hub Pro | $890 |
| Sales Hub Pro (per seat) | $100 |
| Service Hub Pro (per seat) | $100 |
| Content Hub Pro | $500 |
| Data Hub Pro | $800 |
| Commerce Hub | Free + transaction fees |
| **Customer Platform Bundle** | **Significant discount** |

HubSpot offers a "Customer Platform" bundle that discounts all hubs purchased together. Enterprise bundles can save 20-40% vs buying individually.

**Business Units add-on:** Pricing is per-brand, available on Marketing Hub Enterprise only. Contact HubSpot sales for current pricing as it's not publicly listed.

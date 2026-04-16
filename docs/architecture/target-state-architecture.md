# Target State Architecture — Single Enterprise Portal with Business Units

## Overview

After consolidation, all product lines operate from a single HubSpot Enterprise portal. Each product line becomes a "Business Unit" (HubSpot now calls these "Brands") within that portal. Everyone shares one CRM database, but each brand maintains its own marketing identity.

---

## What Changes

| Aspect | Before (Multi-Portal) | After (Single Portal + Brands) |
|--------|----------------------|-------------------------------|
| Customer database | 3-4 separate databases | 1 unified database |
| Contact record for Jane | 3-4 duplicates | 1 record, tagged with all her brands |
| Deal history | Split across portals | All deals on one timeline |
| Service tickets | Split across portals | All tickets visible to all teams |
| Email domains | Separate per portal | All domains in one portal, brand-separated |
| Marketing emails | Separate campaigns | Brand-specific campaigns from one system |
| Subscription preferences | Separate per portal | One subscription center, per-brand preferences |
| Reporting | Per-portal only | Cross-brand + per-brand views |
| Billing | 3-4 invoices | 1 invoice |
| Contact charges | Paying for duplicates | Paying once per person |

---

## Business Units (Brands) — How They Work

Think of it as "departments within one office" instead of "separate offices."

### What Each Brand Gets (Separated)
- **Logo and colours** — Brand kit with unique visual identity
- **Email templates** — Branded email designs per product line
- **Forms** — Brand-specific lead capture forms
- **Landing pages** — Branded pages per product line
- **Email subscription preferences** — Customers choose which brands they want to hear from
- **Blog** — Separate blog per brand (if using Content Hub)
- **Reporting dashboards** — Performance metrics per brand
- **Marketing campaigns** — Run independently per brand
- **Social media accounts** — Connect different social profiles per brand

### What All Brands Share (Unified)
- **CRM database** — One set of contacts, companies, deals, tickets
- **Deal pipelines** — All pipelines visible (filtered by brand/team as needed)
- **Service pipelines** — All ticket pipelines in one place
- **Workflows** — Can be brand-specific (filtered by Business Unit property) or global
- **Users and permissions** — One user list, with brand-level access controls
- **Integrations** — Connected once, available to all brands
- **Custom objects** — Shared across brands
- **Reporting** — Cross-brand dashboards alongside per-brand views

### How Contacts Are Tagged
- A custom contact property (multiple checkboxes) tracks which brands a contact belongs to
- One contact can be associated with multiple brands
- Example: Jane is tagged with "Product A" AND "Product B"
- Marketing emails filter by this property — Jane only gets Product A emails from the Product A brand
- Cross-sell campaigns can target "has Product A but not Product B"

---

## Portal Architecture Design

### Object Model

```
                    ┌──────────────────────┐
                    │      COMPANY         │
                    │  (deduplied by       │
                    │   domain name)       │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │      CONTACT         │
                    │  (deduped by email)  │
                    │                      │
                    │  Business Unit:      │
                    │  ☑ Product A         │
                    │  ☑ Product B         │
                    │  ☐ Product C         │
                    │  ☐ Product D         │
                    └──┬────┬────┬────┬────┘
                       │    │    │    │
              ┌────────┘    │    │    └────────┐
              │             │    │             │
       ┌──────▼──────┐  ┌──▼────▼──┐  ┌──────▼──────┐
       │   DEAL      │  │  DEAL    │  │   TICKET    │
       │ Pipeline:   │  │Pipeline: │  │ Pipeline:   │
       │ Product A   │  │Product B │  │ Product A   │
       │ Stage: Won  │  │Stage:    │  │ Status:     │
       │ $5,000      │  │Proposal  │  │ Resolved    │
       └─────────────┘  │ $3,000   │  └─────────────┘
                        └──────────┘
```

### Deal Pipelines (One Per Product Line)
Each product line keeps its own deal pipeline with custom stages:

| Pipeline | Stages | Team |
|----------|--------|------|
| Product A Sales | Qualified → Demo → Proposal → Negotiation → Won/Lost | Team A |
| Product B Sales | Lead → Assessment → Quote → Closed | Team B |
| Product C Sales | Inquiry → Consultation → Contract → Active | Team C |
| Product D Sales | (if applicable) | Team D |

### Ticket Pipelines (One Per Product Line)
Each product line keeps its own service pipeline:

| Pipeline | Stages | Team |
|----------|--------|------|
| Product A Support | New → In Progress → Waiting → Resolved | Support Team A |
| Product B Support | Open → Investigating → Pending → Closed | Support Team B |
| Product C Support | Submitted → Assigned → Working → Done | Support Team C |

### Teams & Permissions Structure

```
Super Admin (company-wide)
├── Product A Team
│   ├── Sales (Sales Seats)
│   ├── Service (Service Seats)
│   └── Marketing (access to Brand A assets only)
├── Product B Team
│   ├── Sales
│   ├── Service
│   └── Marketing
├── Product C Team
│   ├── Sales
│   ├── Service
│   └── Marketing
└── Leadership (view all brands, all data)
```

**Permission rules:**
- Each team can only see/edit deals and tickets in their product line's pipeline
- Marketing users can only access their brand's email templates, forms, and campaigns
- Leadership/management can see everything across all brands
- Super Admins manage Business Unit configuration

---

## Custom Properties Design

### Contact-Level Properties (Shared Across All Brands)
| Property | Type | Purpose |
|----------|------|---------|
| Business Unit | Multiple checkboxes | Which brands this contact belongs to |
| Source Portal | Single-line text | Which portal this contact originally came from (migration audit trail) |
| Migration ID | Single-line text | Original record ID from source portal |
| Migration Date | Date | When this record was migrated |
| Primary Product | Dropdown | Main product relationship |
| Cross-Sell Status | Dropdown | None / Offered / Accepted / Declined |
| Lifetime Value (All Products) | Calculated | Sum of all closed-won deals |

### Deal-Level Properties
| Property | Type | Purpose |
|----------|------|---------|
| Product Line | Dropdown | Which product this deal is for |
| Source Portal | Single-line text | Migration audit trail |
| Migration ID | Single-line text | Original deal ID |

### Company-Level Properties
| Property | Type | Purpose |
|----------|------|---------|
| Active Products | Multiple checkboxes | Which products this company uses |
| Account Tier | Dropdown | Based on total spend across all products |
| Source Portal | Single-line text | Migration audit trail |

---

## Reporting Design

### Cross-Brand Dashboards (Leadership)
- Total revenue across all product lines (trend over time)
- Customer count by product combination (A only, B only, A+B, etc.)
- Cross-sell conversion rate
- Total lifetime value distribution
- Unified sales pipeline value
- Overall customer satisfaction scores

### Per-Brand Dashboards (Product Teams)
- Revenue for this product line
- Pipeline value and velocity
- New contacts/leads this month
- Email campaign performance
- Ticket volume and resolution time
- Customer satisfaction (this product only)

### Cross-Sell Specific
- Customers with 1 product only (cross-sell opportunity)
- Customers with 2+ products (retention priority)
- Cross-sell offer → acceptance rate by product combination
- Revenue from cross-sold customers vs single-product customers

---

## Email Architecture

### Subscription Management
One subscription centre with per-brand opt-in/opt-out:

```
Email Preferences for [Customer Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Product A Updates
  ☑ Product news and updates
  ☑ Tips and best practices
  ☐ Promotional offers

Product B Updates
  ☑ Product news and updates
  ☐ Tips and best practices
  ☐ Promotional offers

Product C Updates
  ☐ Product news and updates
  ☐ Tips and best practices
  ☐ Promotional offers

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ Unsubscribe from all
```

### Email Sending Domains
Each brand sends from its own domain:
- Product A: `marketing@producta.com`
- Product B: `marketing@productb.com`
- Product C: `marketing@productc.com`

All domains authenticated in the same portal with DKIM, SPF, and DMARC.

### Workflow Segmentation
All marketing workflows include a Business Unit filter:
- "Send Product A newsletter" → only contacts with Business Unit = Product A
- "Cross-sell Product B to Product A customers" → contacts with Business Unit = Product A AND Business Unit ≠ Product B

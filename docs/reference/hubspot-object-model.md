# HubSpot Object Model Reference

## Overview

HubSpot's CRM is built on "objects" — these are the different types of records you can create and manage. Think of each object as a type of filing card. Each card has "properties" (fields of information) and "associations" (links to other cards).

---

## Standard Objects

### Contacts
**What it is:** An individual person.
**Primary identifier:** Email address (HubSpot auto-deduplicates by email).
**Common properties:** First name, last name, email, phone, job title, lifecycle stage, lead status, owner.
**Associations:** Can be linked to Companies, Deals, Tickets, and any Custom Object.

### Companies
**What it is:** A business or organisation.
**Primary identifier:** Company domain name (HubSpot auto-deduplicates by domain).
**Common properties:** Name, domain, industry, annual revenue, number of employees, owner.
**Associations:** Can be linked to Contacts, Deals, Tickets, and any Custom Object.

### Deals
**What it is:** A sales opportunity (potential or actual revenue).
**Lives in:** A Deal Pipeline with defined Stages.
**Common properties:** Deal name, amount, close date, stage, pipeline, owner.
**Associations:** Linked to Contacts and Companies involved in the deal.

### Tickets
**What it is:** A customer support request.
**Lives in:** A Ticket Pipeline with defined Statuses.
**Common properties:** Subject, description, status, priority, category, owner, SLA deadline.
**Associations:** Linked to the Contact who submitted it and their Company.

### Products
**What it is:** A product or service you sell.
**Common properties:** Name, description, unit price, SKU, billing frequency.
**Used in:** Line items on Deals and Quotes.

### Line Items
**What it is:** A specific product added to a deal (with quantity, discount, etc.).
**Lives on:** Deals. Created when you add a Product to a Deal.

---

## Custom Objects (Enterprise Only)

You can create your own object types for data that doesn't fit the standard objects.

**Examples:**
- Subscriptions (ongoing service agreements)
- Locations (physical sites)
- Vehicles (for automotive businesses)
- Projects (for agencies)
- Courses (for education businesses)

**Limits:**
- Available on Enterprise tier only
- Up to 2 million records per custom object
- Custom properties can be added (up to 1,000 per object)
- Can be associated with any standard or other custom object

---

## Properties (Fields)

Every object has properties — these are the individual fields that store information.

### Property Types
| Type | What it stores | Example |
|------|---------------|---------|
| Single-line text | Short text | "John Smith" |
| Multi-line text | Long text | Notes, descriptions |
| Number | Numeric values | Revenue, count |
| Dropdown (select) | One choice from a list | "Enterprise", "SMB", "Startup" |
| Multiple checkboxes | Multiple choices from a list | "Product A", "Product B" |
| Date picker | A date | "2026-04-16" |
| Checkbox (boolean) | Yes or No | "Is Customer: Yes" |
| Calculation | Computed from other properties | "Total Revenue = Sum of Deal Amounts" |
| Score | Numeric score based on rules | Lead score |

### Default vs Custom Properties
- **Default properties** come with HubSpot (email, name, lifecycle stage, etc.) — you can't delete these
- **Custom properties** are ones you create — up to 1,000 per object
- Custom properties can be grouped into "property groups" for organisation

### Property Internal Names
Every property has:
- **Label** (display name): "Phone Number" — what users see
- **Internal name** (API name): `phone_number` — what the system uses

When migrating, internal names matter. Two portals with `phone_number` will merge cleanly. One with `phone_number` and another with `contact_phone` need manual mapping.

---

## Associations (Links Between Records)

Associations are the relationships between objects. They're what connect a Contact to their Company, Deals, and Tickets.

### Standard Associations
| From | To | Relationship |
|------|------|-------------|
| Contact | Company | Works at |
| Contact | Deal | Involved in |
| Contact | Ticket | Submitted / Related to |
| Company | Deal | Company on deal |
| Company | Ticket | Company on ticket |
| Deal | Line Item | Products on deal |

### Custom Association Labels (Enterprise)
You can label associations for more context:
- Contact → Company: "Decision Maker" vs "End User"
- Contact → Deal: "Primary Contact" vs "Stakeholder"

### Association Cardinality
- A Contact can belong to multiple Companies
- A Company can have multiple Contacts
- A Contact can have multiple Deals
- A Deal can have multiple Contacts
- Everything is many-to-many

---

## Object Hierarchy

```
Company (top level)
├── Contact 1
│   ├── Deal A (Product Line 1)
│   ├── Deal B (Product Line 2)
│   ├── Ticket #100
│   └── Ticket #200
├── Contact 2
│   ├── Deal C (Product Line 1)
│   └── Ticket #300
└── Contact 3
    └── Deal D (Product Line 3)
```

After consolidation, this is what "Customer Jane" looks like — one contact record with all her deals, tickets, and engagement history across every product line, all on one timeline.

---

## What Auto-Deduplicates

| Object | Dedup Key | How it works |
|--------|-----------|-------------|
| Contacts | Email address | Two contacts with same email = flagged as duplicate |
| Companies | Domain name | Two companies with same domain = flagged as duplicate |
| Deals | None | Deals are NOT auto-deduped (can have duplicates) |
| Tickets | None | Tickets are NOT auto-deduped |

### Native Dedup Tool
- Location: Data Management → Data Quality → Manage Duplicates
- Scans daily using email, name, phone, country, zip (contacts) and domain (companies)
- Shows pairs ranked by confidence score
- **Limits:** Professional = 2,000 results, Ops Pro = 5,000, Enterprise = 10,000

### Third-Party Dedup Tools (for scale)
- **Koalify** — Best for HubSpot-native dedup. Custom matching rules, bulk merge, works across all objects including custom objects.
- **Insycle** — Field-level merge control, scheduled dedup (hourly/daily/weekly), deep data retention settings.
- **Dedupely** — Simpler option for basic dedup needs.

---

## Limits Reference

| Limit | Value | Tier |
|-------|-------|------|
| Custom properties per object | 1,000 | All paid tiers |
| Custom objects | 10 definitions | Enterprise only |
| Records per custom object | 2,000,000 | Enterprise |
| Association types | 40+ standard, unlimited custom | Enterprise for custom labels |
| Pipelines (deal) | 50 | Enterprise |
| Pipelines (ticket) | 50 | Enterprise |
| Pipeline stages | 100 per pipeline | All tiers |
| Workflows | 1,000 | Enterprise |
| Lists | 2,000 (active) | Enterprise |

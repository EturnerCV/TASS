# Migration Strategy — 6-Phase Consolidation Plan

## Overview

Consolidating 3-4 HubSpot portals into one Enterprise portal with Business Units. Total timeline: 6-8 weeks from kickoff to full email volume.

**Core principle:** Data integrity over speed. Every phase has a verification gate before moving to the next.

---

## Phase 1: Audit & Map (Week 1-2)

### Goal
Know exactly what exists in every portal before touching anything.

### Actions

**1.1 Inventory each portal**
Fill out the Portal Inventory Template (see `current-state-analysis.md`) for every portal:
- Record counts (contacts, companies, deals, tickets, custom objects)
- Custom properties (names, types, which object they belong to)
- Workflows (count, what they do, are they active?)
- Email templates and marketing assets
- Forms and landing pages
- Integrations (every connected app)
- Email domains and authentication status
- Users and their seat types

**1.2 Map properties across portals**
Create the Property Mapping Table (see `data-mapping.md`):
- Same data, different field names? (e.g., "Phone Number" vs "Phone" vs "Contact Phone")
- Same field name, different types? (e.g., "Status" as text in Portal 1 but dropdown in Portal 2)
  - WARNING: Properties with the same name but different types CANNOT be migrated automatically
- Properties that exist in one portal but not others
- Properties that should be merged vs kept separate

**1.3 Estimate duplicate overlap**
- Export email lists from each portal
- Compare across portals to count overlapping contacts
- This number determines the scale of post-migration deduplication

**1.4 Document integrations**
For each integration across all portals:
- What app is connected?
- What data does it sync?
- Which direction (HubSpot → app, app → HubSpot, or both)?
- Does the app support connecting to a different HubSpot portal?
- Will reconnecting require re-authentication?

### Gate
- [ ] All portals inventoried
- [ ] Property mapping table complete
- [ ] Duplicate estimate calculated
- [ ] Integration inventory complete
- [ ] No surprises — stakeholders sign off on scope

---

## Phase 2: Choose Target Portal (Week 2)

### Goal
Decide which portal becomes the consolidated "home" for all data.

### Three Options

#### Option A: Keep the Biggest Portal
**Best when:** One portal has significantly more data, workflows, and configuration than the others.

| Pro | Con |
|-----|-----|
| Least data to migrate | Might have messiest data |
| Email reputation preserved | Existing workflows may conflict with incoming data |
| Users already set up | Business Units still need configuration |

#### Option B: Keep the Best-Configured Portal
**Best when:** One portal has cleaner data, better workflow design, and stronger email reputation — even if it's not the biggest.

| Pro | Con |
|-----|-----|
| Cleanest foundation | More data to migrate |
| Best workflows survive | Some users need to switch portals |
| Strongest email reputation | Bigger migration window |

#### Option C: Fresh Enterprise Portal
**Best when:** All existing portals are messy, no one portal is clearly better, or the company wants a clean start.

| Pro | Con |
|-----|-----|
| Cleanest possible start | ALL data must be migrated |
| No legacy mess | ALL workflows must be recreated |
| Design from scratch | Email domains need full warm-up |
| Everyone starts equal | Longest timeline |

### Decision Matrix
Score each portal 1-5 on these criteria:

| Criteria | Weight | Portal 1 | Portal 2 | Portal 3 | Portal 4 |
|----------|--------|----------|----------|----------|----------|
| Record count (more = better) | 20% | | | | |
| Data quality (cleaner = better) | 25% | | | | |
| Workflow sophistication | 20% | | | | |
| Email domain reputation age | 15% | | | | |
| Integration count | 10% | | | | |
| Team familiarity | 10% | | | | |
| **Weighted Total** | | | | | |

Highest score = recommended target portal.

### Gate
- [ ] Target portal chosen and documented
- [ ] Decision reviewed with stakeholders
- [ ] Migration scope confirmed (which portals migrate into target)

---

## Phase 3: Sandbox Testing (Week 3-4)

### Goal
Run a complete test migration in a sandbox before touching production data.

### Prerequisites
- Target portal must be on Enterprise tier (sandbox requires Enterprise)
- HubSpot-to-HubSpot Migrator app installed (Datawarehouse.io, available in HubSpot App Marketplace)

### Actions

**3.1 Create sandbox environment**
- In target portal: Settings → Account Management → Sandbox
- Create a Standard Sandbox (legacy sandboxes were sunset March 2026)
- The sandbox is a copy of your production portal's configuration

**3.2 Run test migration**
- Install the HubSpot-to-HubSpot Migrator in both the source portal and the sandbox
- Run the migration tool to move data from ONE source portal into the sandbox
- The tool automatically creates matching properties in the destination — no manual field mapping needed
- The tool writes unique migration IDs as custom properties for audit trail

**3.3 Verify migrated data**
Check each object type:
- [ ] Contacts: count matches, custom properties populated, email addresses correct
- [ ] Companies: count matches, domain names correct
- [ ] Deals: count matches, pipeline/stage correct, amounts correct
- [ ] Tickets: count matches, pipeline/status correct
- [ ] Custom objects: count matches, properties correct
- [ ] Associations: contacts linked to correct companies, deals, tickets
- [ ] Engagements: notes, calls, meetings, emails attached to correct records
- [ ] Files/attachments: documents accessible
- [ ] Workflows: migrated and functional (test with sample records)
- [ ] Lists: membership correct

**3.4 Test Business Unit assignment**
- Create Business Units in sandbox (one per product line)
- Assign migrated contacts to appropriate Business Unit
- Verify brand-specific filtering works in lists and workflows

**3.5 Test email sending**
- Connect all brand domains to sandbox
- Send test emails from each brand
- Verify DKIM/SPF/DMARC authentication
- Verify correct "From" address per brand

**3.6 Document what doesn't migrate**
These will need manual recreation in Phase 4:
- Marketing email campaign performance data
- Historical web traffic data
- Reports and dashboards
- CTAs
- Landing page designs (schema only migrates)
- Knowledge base articles
- Chatflows
- Meeting links
- Custom surveys
- Brand kits
- Playbooks and snippets
- Views and saved filters
- Team structure and permissions

### Gate
- [ ] Test migration completed successfully
- [ ] All object counts verified
- [ ] Associations verified
- [ ] Business Units tested
- [ ] Email sending tested
- [ ] "Doesn't migrate" list documented and accepted
- [ ] Stakeholder sign-off to proceed with production migration

---

## Phase 4: Pre-Migration Prep (Week 4-5)

### Goal
Set up everything in the target portal that can't be auto-migrated, BEFORE the data migration window.

### Actions

**4.1 Configure Business Units**
- Settings → Business Units → Create one per product line
- Set up brand kits (logo, colours) for each unit
- Name them clearly (product line names)

**4.2 Set up email sending domains**
For each brand's email domain:
1. Settings → Email → Sending Domains → Add Domain
2. Create DKIM CNAME records (2 per domain) in DNS
3. Add HubSpot to existing SPF record (don't create a new one)
4. Verify DMARC policy is set
5. Wait for DNS propagation
6. Send test email to verify authentication
7. See `email-domain-checklist.md` for detailed steps

**CRITICAL:** Do NOT remove email domains from source portals yet. Both old and new portals must be authenticated during the transition.

**4.3 Recreate non-migratable assets**
Work through the "doesn't migrate" list from Phase 3:
- Rebuild reports and dashboards (this is an opportunity to design cross-brand dashboards)
- Recreate landing page designs
- Rebuild knowledge base articles
- Set up chatflows
- Configure meeting links
- Rebuild playbooks and snippets

**4.4 Set up teams and permissions**
- Create team structure in target portal (see `target-state-architecture.md`)
- Configure per-brand access for marketing users
- Set up pipeline-level permissions for sales/service teams

**4.5 Install deduplication tool**
- Install Insycle or Koalify from HubSpot App Marketplace
- Configure matching rules (email-based for contacts, domain-based for companies)
- Run a preview to see what will be merged (don't execute yet)

**4.6 Create migration audit properties**
On contacts, companies, deals, and tickets:
- `Source Portal` (single-line text) — which portal this record came from
- `Migration ID` (single-line text) — original record ID
- `Migration Date` (date) — when migrated
- Note: The HubSpot-to-HubSpot Migrator creates its own tracking properties automatically

**4.7 Freeze source portals**
- Notify all teams: from [date], no new records should be created in source portals
- Set a hard freeze date (ideally a weekend)
- All new activity goes into the target portal from freeze date forward
- Disable form submissions in source portals (redirect to target)
- Pause all scheduled marketing emails in source portals

**4.8 Export safety backups**
- Export ALL data from ALL source portals as CSV
- Store exports in a safe location (shared drive, not in HubSpot)
- These are your "break glass" recovery option

### Gate
- [ ] Business Units configured with brand kits
- [ ] All email domains authenticated in target portal
- [ ] Non-migratable assets rebuilt
- [ ] Teams and permissions configured
- [ ] Dedup tool installed and preview reviewed
- [ ] Migration audit properties created
- [ ] Source portals frozen
- [ ] CSV safety backups stored

---

## Phase 5: Execute Migration (Week 5-6)

### Goal
Move all data from source portals into the target portal and deduplicate.

### Migration Order
Migrate one portal at a time, verify, then move to the next:

```
Source Portal 1 ──migrate──► Target Portal ──verify──► ✓
Source Portal 2 ──migrate──► Target Portal ──verify──► ✓
Source Portal 3 ──migrate──► Target Portal ──verify──► ✓
(Source Portal 4 ──migrate──► Target Portal ──verify──► ✓)
```

### Per-Portal Migration Steps

**5.1 Run the migration tool**
- Install HubSpot-to-HubSpot Migrator in source portal (if not already)
- Connect to target portal
- Start full migration
- Monitor progress (large datasets may take hours)

**5.2 Verify record counts**
| Object | Source Count | Target Count (after) | Match? |
|--------|-------------|---------------------|--------|
| Contacts | | | |
| Companies | | | |
| Deals | | | |
| Tickets | | | |
| Custom Objects | | | |
| Engagements | | | |

**5.3 Assign Business Unit**
- All contacts from this source portal → tag with appropriate Business Unit
- Use a workflow or bulk update: "Where Source Portal = [Portal Name] → Set Business Unit = [Product Line]"

**5.4 Spot-check associations**
Pick 10 random contacts and verify:
- Linked to correct company
- All deals attached
- All tickets attached
- All engagements (notes, calls, emails) present
- Custom properties populated correctly

### After All Portals Migrated

**5.5 Run deduplication**
- Execute the dedup tool (Insycle or Koalify)
- Start with contacts: match by email address
- Then companies: match by domain name
- Review merge previews before executing
- The tool should keep the most complete record and merge data from duplicates
- **CRITICAL:** Set merge rules — which record's data wins when values conflict?
  - Most recently updated value wins? Or original value wins?
  - Document the decision for audit purposes

**5.6 Verify cross-brand contacts**
After deduplication:
- Contacts who existed in multiple source portals should now have multiple Business Unit checkboxes
- Their deal history from all products should be on one timeline
- Their ticket history from all products should be on one timeline

**5.7 Reconnect integrations**
For each integration from the inventory:
- Connect to target portal
- Verify data sync works
- Test both directions (if bidirectional)

**5.8 Invite/reassign users**
- Invite users to target portal (same email addresses)
- Assign correct seat types (Core, Sales, Service)
- Assign to correct teams
- Configure permissions per team/Business Unit

### Gate
- [ ] All source portal data migrated
- [ ] Record counts verified per portal
- [ ] Business Units assigned
- [ ] Spot-checks passed
- [ ] Deduplication complete
- [ ] Cross-brand contacts verified
- [ ] Integrations reconnected
- [ ] Users invited and assigned

---

## Phase 6: Email Warm-Up & Go-Live (Week 6-8)

### Goal
Restore full email sending volume without damaging domain reputation.

### Why Warm-Up Is Necessary
Even though the email domains are authenticated, the new portal is sending from a new IP (HubSpot's shared pool assigns IPs per portal). Mailbox providers (Gmail, Outlook, etc.) need to see a gradual increase in volume from this new sending source, otherwise they'll flag it as suspicious and send emails to spam.

### Warm-Up Schedule

| Week | Who to email | Approx. volume |
|------|-------------|----------------|
| Week 1 | Contacts who opened/clicked in last 30 days | ~25% of normal |
| Week 2 | Expand to 60-day engaged contacts | ~50% of normal |
| Week 3 | Expand to 90-day engaged contacts | ~75% of normal |
| Week 4 | Full contact list (excluding hard bounces/unsubscribes) | 100% |

### Daily Monitoring During Warm-Up
| Metric | Healthy | Warning | Stop & Investigate |
|--------|---------|---------|-------------------|
| Bounce rate | < 2% | 2-5% | > 5% |
| Spam complaint rate | < 0.1% | 0.1-0.3% | > 0.3% |
| Open rate | > 20% | 10-20% | < 10% |
| Unsubscribe rate | < 0.5% | 0.5-1% | > 1% |

### Post-Go-Live

**Keep source portals read-only for 90 days:**
- Don't delete them
- Don't let anyone create new records in them
- Use them as reference if anything looks wrong in the target portal
- After 90 days, archive/downgrade (save on licensing costs)

**Monitor for 30 days:**
- Daily check on email deliverability metrics
- Weekly review of workflow triggers (are automations firing correctly?)
- Check integration sync logs for errors
- Verify new form submissions are creating records correctly
- Spot-check new deals and tickets are going to correct pipelines

### Gate
- [ ] Email warm-up completed (4 weeks, full volume)
- [ ] Deliverability metrics healthy
- [ ] All workflows verified
- [ ] All integrations stable
- [ ] 30-day monitoring period complete
- [ ] Source portals archived/downgraded
- [ ] Project complete

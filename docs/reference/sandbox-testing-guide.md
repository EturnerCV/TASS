# Sandbox Testing Guide

## Overview

HubSpot Enterprise includes a sandbox environment — a copy of your portal where you can test changes before applying them to production. For portal consolidation, this is where you run your test migration to verify everything works before touching real data.

---

## What Is a Sandbox?

Think of it as a "practice copy" of your HubSpot portal. You can break things, test migrations, try new workflows — all without affecting your real data or real customers.

**Key facts:**
- Available on Enterprise tier only
- Creates a copy of your portal's configuration (not all data)
- Changes in sandbox don't affect production until you deploy them
- Has a "Deploy to Production" feature for pushing tested changes live
- Legacy sandboxes were sunset on March 16, 2026 — only Standard Sandboxes are available now

---

## Setting Up a Sandbox

### Step 1: Create the Sandbox
1. Go to **Settings** (gear icon)
2. Click **Account Management** in the left sidebar
3. Click **Sandboxes**
4. Click **Create Sandbox** (top right)
5. Choose "Standard Sandbox"
6. Give it a name (e.g., "Migration Test")
7. Click **Create**

### Step 2: Access the Sandbox
- After creation, you'll see the sandbox listed in Settings → Sandboxes
- Click the sandbox name to switch into it
- The portal header will show a banner indicating you're in the sandbox
- To switch back to production: click the banner or go to Settings → Sandboxes

### Step 3: What Gets Copied
The sandbox copies your portal's **configuration**, including:
- Custom properties and property groups
- Pipelines and pipeline stages
- Workflows (paused in sandbox)
- Forms
- Lists
- Email templates
- Team structure and permissions

The sandbox does NOT copy:
- Contact/company/deal/ticket records (the sandbox starts empty)
- Marketing email performance data
- Analytics data
- Integration connections (must reconnect in sandbox)

---

## Using Sandbox for Migration Testing

### Why Test in Sandbox First
Running a test migration in sandbox lets you:
1. Verify the migration tool works correctly
2. See what data comes across and what doesn't
3. Test Business Unit setup with real(ish) data
4. Test email sending from brand domains
5. Find problems BEFORE they affect production

### Test Migration Steps

**Step 1: Install the Migration Tool**
- Install the HubSpot-to-HubSpot Migrator (by Datawarehouse.io) from the HubSpot App Marketplace
- Install it in BOTH the source portal AND your sandbox

**Step 2: Run the Migration**
- In the migration tool, set the source as one of your source portals
- Set the destination as your sandbox
- Start the migration
- Let it complete fully (may take hours for large datasets)

**Step 3: Verify the Results**
Check each category:

| Check | What to verify | Pass? |
|-------|---------------|-------|
| Contact count | Source count matches destination count | |
| Company count | Source count matches destination count | |
| Deal count | Source count matches destination count | |
| Ticket count | Source count matches destination count | |
| Custom objects | All custom object records present | |
| Properties | All custom properties created in destination | |
| Associations | Contacts linked to correct companies | |
| Deals | Associated with correct contacts and companies | |
| Tickets | Associated with correct contacts | |
| Engagements | Notes, calls, emails attached to correct records | |
| Files | Attachments accessible | |
| Workflows | Present and functional (trigger a test) | |
| Lists | Membership correct | |

**Step 4: Test Business Units**
1. Create Business Units in sandbox (one per product line)
2. Bulk-update migrated contacts to assign the correct Business Unit
3. Create a test list filtered by Business Unit — verify correct contacts appear
4. Create a test workflow with Business Unit as a trigger filter

**Step 5: Test Email Sending**
1. Connect at least one brand domain to the sandbox
2. Create a test email using that brand's template
3. Send to internal addresses
4. Verify delivery, from address, and branding

**Step 6: Document Issues**
Create a list of everything that didn't work as expected:
- [ ] Missing records? Which ones?
- [ ] Broken associations? Which objects?
- [ ] Properties with wrong values? Which fields?
- [ ] Workflows that don't trigger? Which ones?
- [ ] Anything else unexpected?

---

## Deploy to Production

After testing, the Standard Sandbox has a "Deploy to Production" feature. This pushes supported configuration changes from sandbox to your live portal.

### What Can Be Deployed
- Schema changes (new properties, modified properties)
- Workflows
- Lists
- Forms
- Automated marketing emails

### What Cannot Be Deployed
- CRM records (contacts, deals, etc.)
- Manually sent emails
- Reports and dashboards
- Integration connections
- User/team configuration

### How to Deploy
1. In the sandbox, go to **Settings → Sandboxes**
2. Click **Deploy to Production**
3. Select which changes to deploy
4. Review the changes
5. Click **Deploy**
6. Changes appear in production immediately

---

## Alternative: Developer Portal

If you need to test but don't have Enterprise (no sandbox access), you can create a free HubSpot Developer Portal.

### How to Get One
1. Go to developers.hubspot.com
2. Create a developer account
3. You get a free test portal with limited functionality

### Limitations
- No Business Units feature (that requires Enterprise)
- Limited API access
- Not a true replica of your production environment
- Good for testing API integrations and basic data flows, not full migration testing

---

## Sandbox Best Practices

1. **Always test the full migration in sandbox first** — never run the migration tool directly on production without testing
2. **Test one source portal at a time** — don't try to migrate all portals into sandbox simultaneously
3. **Document everything** — keep a running log of what works and what doesn't
4. **Clear sandbox between tests** — if you need to re-run, create a fresh sandbox (old data can cause false results)
5. **Test deduplication** — if you migrate two source portals into sandbox, run the dedup tool to see how it handles duplicates
6. **Involve stakeholders** — let team leads verify their data looks correct in sandbox before approving production migration

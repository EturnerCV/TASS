# Email Domain Migration Checklist

## Overview

When consolidating HubSpot portals, each product line's email sending domain must be connected to the target portal with full authentication. Getting this wrong means emails go to spam.

**Golden rule:** Add the domain to the new portal BEFORE removing it from the old portal. Running both in parallel during transition is safe and expected.

---

## Per-Domain Setup Steps

Repeat this for every email sending domain (e.g., `producta.com`, `productb.com`, `productc.com`).

### Step 1: Add the Sending Domain
1. In the target portal, go to **Settings → Email → Sending Domains**
2. Click **Connect a domain**
3. Enter the domain name (e.g., `producta.com`)
4. HubSpot will generate the DNS records you need to add

### Step 2: Set Up DKIM (2 CNAME Records)
DKIM (DomainKeys Identified Mail) proves that emails actually came from your domain and weren't tampered with.

HubSpot will give you 2 CNAME records to add to your DNS:

| Record Type | Host | Points to |
|-------------|------|-----------|
| CNAME | (provided by HubSpot) | (provided by HubSpot) |
| CNAME | (provided by HubSpot) | (provided by HubSpot) |

**Where to add these:**
- Log into your domain registrar (GoDaddy, Namecheap, VentraIP, etc.)
- Go to DNS management for the domain
- Add both CNAME records exactly as HubSpot specifies

**Important:** The exact values are unique per portal. Don't copy values from the old portal — use the new ones HubSpot generates.

### Step 3: Set Up SPF (TXT Record)
SPF (Sender Policy Framework) tells email providers which servers are allowed to send email for your domain.

**If you DON'T have an existing SPF record:**
Add a new TXT record:
```
v=spf1 include:hubspot.com ~all
```

**If you ALREADY have an SPF record (most likely):**
Add `include:hubspot.com` to your existing record. For example:
```
# Before
v=spf1 include:zoho.com ~all

# After
v=spf1 include:zoho.com include:hubspot.com ~all
```

**CRITICAL:** You can only have ONE SPF record per domain. Adding a second SPF record will break email authentication entirely. Always edit the existing record.

### Step 4: Set Up DMARC (TXT Record)
DMARC (Domain-based Message Authentication, Reporting & Conformance) tells email providers what to do with emails that fail SPF/DKIM checks.

**If you DON'T have an existing DMARC record:**
Add a TXT record for `_dmarc.yourdomain.com`:
```
v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com
```

Start with `p=none` (monitor only). Move to `p=quarantine` or `p=reject` after verifying everything works.

**If you ALREADY have a DMARC record:**
No changes needed — it applies to all email sources.

### Step 5: Wait for DNS Propagation
- Usually takes 10-70 minutes
- Some DNS providers can take up to 48 hours
- HubSpot will show a green checkmark when verified

### Step 6: Verify in HubSpot
1. Go back to **Settings → Email → Sending Domains**
2. Click **Verify** next to your domain
3. All 3 checks (DKIM, SPF, DMARC) should show green
4. If any show red, double-check the DNS records

### Step 7: Send a Test Email
1. Create a test marketing email
2. Set the "From" address to use the newly connected domain
3. Send to yourself (and a few colleagues with different email providers — Gmail, Outlook, Yahoo)
4. Check:
   - [ ] Email arrives in inbox (not spam)
   - [ ] "From" address shows correctly
   - [ ] Links work
   - [ ] Unsubscribe link works
   - [ ] Email header shows DKIM pass (check "Show original" in Gmail)

---

## Migration Sequence (Order Matters)

```
Week 1: Add all domains to target portal + set up DNS records
         ↓ (keep old portals running normally)
Week 2: Verify all domains authenticated in target portal
         ↓ (both old and new portals can send — this is safe)
Week 3: Start sending from target portal (warm-up phase)
         ↓ (old portals still active as backup)
Week 4-5: Gradual volume increase from target portal
         ↓ (reduce sends from old portals)
Week 6+: All sending from target portal
         ↓ (old portals go read-only)
Week 8+: Remove domains from old portals (optional)
```

**Never:** Remove a domain from the old portal before it's fully warmed up on the new portal.

---

## Warm-Up Schedule After Domain Connection

Even authenticated domains need volume warm-up when sending from a new HubSpot portal (different IP pool).

| Day/Week | Volume | Target Audience |
|----------|--------|----------------|
| Day 1-3 | 50-100 emails | Internal team + most engaged contacts |
| Day 4-7 | 500-1,000 | Contacts who clicked in last 14 days |
| Week 2 | 2,000-5,000 | Contacts who opened in last 30 days |
| Week 3 | 10,000-25,000 | Contacts who engaged in last 60 days |
| Week 4 | Full volume | All eligible contacts |

### Metrics to Watch
| Metric | Healthy | Pause & Investigate |
|--------|---------|-------------------|
| Bounce rate | < 2% | > 5% |
| Spam complaints | < 0.1% | > 0.3% |
| Open rate | > 20% | < 10% |

---

## Dedicated IP Considerations

**Shared IP (default):**
- HubSpot sends your email from a shared pool of IP addresses
- Your reputation is partially influenced by other senders on the same pool
- Fine for most businesses

**Dedicated IP (add-on):**
- Your own IP address, reputation is entirely yours
- Requires consistent volume (minimum ~100K emails/month)
- HubSpot provides an automated 40-day warm-up program
- If consolidating portals, you may qualify for dedicated IP with combined volume
- **Don't transfer a dedicated IP between portals** — the IP is tied to the portal

---

## Transactional Email

If any portal uses HubSpot's Transactional Email add-on (order confirmations, password resets, etc.):
- Transactional emails use a separate sending infrastructure
- The add-on must be purchased on the target portal
- API keys will need to be regenerated and updated in your application code
- Test transactional sends thoroughly before go-live

---

## Checklist Per Domain

- [ ] Domain added to target portal
- [ ] DKIM CNAME records created in DNS
- [ ] SPF record updated (added `include:hubspot.com`)
- [ ] DMARC record verified
- [ ] DNS propagation complete
- [ ] HubSpot shows all green checks
- [ ] Test email received in inbox (not spam)
- [ ] Test email DKIM passes (checked in email headers)
- [ ] Warm-up schedule started
- [ ] Volume at 100% and metrics healthy
- [ ] Domain removed from old portal (only after full warm-up)

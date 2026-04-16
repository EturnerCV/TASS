# Risk Register — HubSpot Portal Consolidation

## How to Read This

Each risk is rated by:
- **Likelihood:** How likely is this to happen? (Low / Medium / High)
- **Impact:** If it happens, how bad is it? (Low / Medium / High / Critical)
- **Overall Risk:** Combination of likelihood and impact

---

## Data Risks

### R1: Duplicate Contacts Not Fully Resolved
| Field | Value |
|-------|-------|
| Likelihood | High |
| Impact | High |
| Overall Risk | High |
| What happens | After migration, some contacts exist as duplicates in the target portal. Marketing sends them double emails, reporting counts them twice, deal history is split. |
| Why it happens | Different email addresses for the same person (e.g., `jane@company.com` in Portal 1, `j.smith@company.com` in Portal 2). Email-based dedup only catches exact matches. |
| Mitigation | Run dedup tool BEFORE migration (identify cross-portal duplicates early). After migration, run dedup again with fuzzy matching (name + company + phone). Use Insycle or Koalify for advanced matching beyond email. Schedule monthly dedup sweeps. |
| Owner | Migration lead |

### R2: Lost Deal or Ticket Associations
| Field | Value |
|-------|-------|
| Likelihood | Low |
| Impact | Critical |
| What happens | Deals or tickets arrive in the target portal but aren't linked to the correct contacts or companies. Revenue reporting breaks, customer history is incomplete. |
| Why it happens | Association errors during migration. Different data structures across portals. |
| Mitigation | Verify association counts pre-migration vs post-migration. Spot-check 20+ random records after each portal migration. The migration tool writes tracking IDs that can be used to audit. |
| Owner | Migration lead |

### R3: Property Type Conflicts
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | High |
| What happens | A property exists in two source portals with the same name but different field types (e.g., "Status" as free text in one, dropdown in another). The migration tool cannot merge them — data loss for one version. |
| Why it happens | Different teams configured the same concept differently. |
| Mitigation | Complete the property mapping table BEFORE migration. Identify ALL conflicts. Resolve by renaming, converting, or creating new target properties. |
| Owner | Data architect |

### R4: Custom Object Migration Failure
| Field | Value |
|-------|-------|
| Likelihood | Low |
| Impact | High |
| What happens | Custom objects don't migrate correctly — records missing, properties empty, associations broken. |
| Why it happens | Custom objects have different schemas across portals. API differences between standard and custom objects. |
| Mitigation | Test custom object migration thoroughly in sandbox. Document custom object schemas from each portal. Be prepared to import custom object data via CSV as a fallback. |
| Owner | Migration lead |

---

## Email & Communication Risks

### R5: Email Deliverability Drop
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | Critical |
| What happens | Marketing emails start going to spam after migration. Open rates plummet, leads stop coming in, customer communications fail. |
| Why it happens | New portal sends from different IP pool. Email providers don't recognise the new sending source. High-volume blast on day one triggers spam filters. Stale contacts from imported lists generate bounces and complaints. |
| Mitigation | Follow the 4-week warm-up schedule strictly. Start with most engaged contacts only. Monitor bounce and complaint rates daily. Have a rollback plan (old portals still active). Set up email health monitoring alerts. |
| Owner | Email/marketing ops |

### R6: DNS Misconfiguration
| Field | Value |
|-------|-------|
| Likelihood | Low |
| Impact | Critical |
| What happens | DKIM, SPF, or DMARC records configured incorrectly. All emails from that domain fail authentication and go to spam — or worse, get rejected entirely. |
| Why it happens | Duplicate SPF records, wrong CNAME values, typos in DNS entries. |
| Mitigation | Follow the email domain checklist exactly. Verify each domain shows green in HubSpot BEFORE sending any email. Send test emails to Gmail/Outlook/Yahoo and check headers for authentication pass. Only one person should manage DNS changes. |
| Owner | IT/DNS admin |

### R7: Duplicate Marketing Emails During Transition
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | Medium |
| What happens | During the transition period (both old and new portals active), a customer receives the same campaign from both portals. |
| Why it happens | Teams continue sending from old portals while new portal campaigns start. No coordination of send schedules during overlap. |
| Mitigation | Define a hard "freeze" date for old portal sending. Pause all scheduled sends in old portals before migration. Assign one person as "email traffic controller" during transition. |
| Owner | Marketing manager |

---

## Operational Risks

### R8: Workflow Conflicts
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | High |
| What happens | Migrated workflows fire incorrectly in the new portal — wrong emails sent, records updated incorrectly, pipeline stages changed unexpectedly. |
| Why it happens | Workflows from different portals have conflicting logic. Same trigger fires multiple workflows. Workflows reference properties or lists that don't exist in the target. |
| Mitigation | Migrate ALL workflows in PAUSED state. Review each workflow before activating. Activate one at a time, test with sample records, then move to the next. Add Business Unit filters to prevent cross-brand triggers. |
| Owner | RevOps / automation lead |

### R9: Integration Failures
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | Medium |
| What happens | Third-party tools connected to old portals stop receiving data. New portal integrations have wrong field mappings. |
| Why it happens | Integrations are portal-specific — they don't follow data to a new portal. API keys, OAuth tokens, and field IDs change. |
| Mitigation | Document every integration before migration. Reconnect each integration in the target portal. Test bidirectional sync. Plan for 1-2 days of integration debugging post-migration. |
| Owner | IT / integration lead |

### R10: User Adoption Resistance
| Field | Value |
|-------|-------|
| Likelihood | Medium |
| Impact | Medium |
| What happens | Team members struggle to find their data in the new portal. Productivity drops during adjustment period. People create workarounds that undermine the consolidated structure. |
| Why it happens | New portal has different layout, different URLs, different saved views. Muscle memory from old portals doesn't transfer. |
| Mitigation | Run training sessions BEFORE go-live (not after). Create per-team guides showing "where to find your stuff" in the new portal. Set up saved views per team/Business Unit. Assign a "migration champion" per team for first-week support. |
| Owner | Project lead / team managers |

---

## Financial Risks

### R11: Licensing Cost Spike During Transition
| Field | Value |
|-------|-------|
| Likelihood | High |
| Impact | Low |
| What happens | During the transition period, you're paying for BOTH the old portals AND the new enterprise portal. Monthly costs temporarily increase. |
| Why it happens | Old portals must remain active during migration and warm-up (6-8 weeks). Can't cancel old subscriptions until migration is verified. |
| Mitigation | Plan the budget for 2-3 months of overlap. Negotiate with HubSpot for migration support credits. Downgrade old portals to free tier as soon as each is fully migrated and verified (keeps them read-only for reference). |
| Owner | Finance / procurement |

### R12: Migration Tool Costs
| Field | Value |
|-------|-------|
| Likelihood | High |
| Impact | Low |
| What happens | Migration tools (Datawarehouse.io, Insycle, Koalify) have licensing costs that weren't budgeted. |
| Why it happens | Self-service tools are cheaper but require more manual work. Managed migration services are expensive but lower risk. |
| Mitigation | Get pricing quotes during Phase 1 audit. Budget for: migration tool license (one-time or monthly), dedup tool (monthly during transition), and optionally managed migration service. Factor these into the ROI calculation against long-term savings from consolidation. |
| Owner | Finance / project lead |

---

## Rollback Plan

**If migration goes critically wrong:**

1. **Stop all activity in the target portal** — pause workflows, stop email sends
2. **Re-activate source portals** — they should still be read-only but functional
3. **Resume operations from source portals** — teams go back to their original portals
4. **Diagnose the issue** — what went wrong? Data? Workflows? Email?
5. **Fix in sandbox** — resolve the issue in sandbox, test again
6. **Retry migration** — run again with the fix in place

**Key requirement for rollback:** DO NOT delete or modify source portal data during migration. Source portals must remain unchanged until migration is fully verified.

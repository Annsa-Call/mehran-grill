# Known limitations and launch gates

This is a tested, runnable restaurant demo and deployment-ready source package, **not a claim of completed live rollout**. The following items are explicit, not hidden setup steps.

## Requires the owner/developer before public launch

- Real Cloudflare account, D1 database ID, deployment/domain, account billing and backup/restore plan. No GitHub push or Cloudflare deployment was performed in this session.
- Correct Garden address/shop number and restaurant approval of current menu prices, Gulshan restrictions and preorder policy. PDF and website shop numbers conflict.
- Actual applicable tax/fees and accounting advice; production ordering is blocked while tax unconfirmed. No legal/tax compliance certification.
- Verified Google review-request URL. Review experience exists but destination/real review automation are not activated.
- Meta credentials, approved templates, sending-number setup, opt-in evidence and webhook verification. No live message, delivery or scheduler execution was tested against Meta.
- Brand/imagery permission. Logo and hero artwork came from the official restaurant site; public availability does not itself grant redistribution rights. The artwork is not claimed as a verified photograph of a specific ordered dish. Item-level food photos are not fabricated; absent photos show clean typographic menu cards.
- Restaurant-specific privacy contact, retention schedule and lawful accounting deletion policy. Current delete action cascades orders/history and affects historic metrics. Assess legal retention before exposing this workflow to operational staff.
- Scope/acceptance of five-paid-coffees-then-reward semantics, eligible coffee list and no stamps on reward-bearing orders.

## Functional limits, not claimed features

- No online gateway, refunds, split bills, kitchen printer, fiscal/POS integration, delivery logistics, inventory, reservations, multi-location tenancy, developer billing or subscriptions.
- Dashboard provides genuine metrics and exact tables, including daily sales; **interactive chart widgets are not implemented**.
- Menu items and portions can be created/edited; items retired via availability. Per-portion retirement/deletion and category deletion are not exposed, preserving history.
- Staff can redeem earned rewards and verify paid orders; there is no unrestricted manual stamp-adjustment button. Stamps are issued from validated qualifying purchases only. Changing target after issuance is blocked to avoid corrupting history.
- Optional birthday is day/month, exact birthday eligibility only, no configurable birthday window/catch-up. Birthday offer type is an eligible-coffee treat, not an arbitrary dynamic offer builder.
- Existing customer on a new browser requires in-person staff-issued code, not self-service OTP. No self-service password-reset email or MFA. Setup script can securely reset owner password; disable/recreate staff as necessary.
- Owner orders show latest300; reward list500 and campaign list100. Other queries are not paginated and may become expensive. Suitable for a controlled single-restaurant pilot, not demonstrated at large scale. Add pagination/bounded analytics before substantial growth.
- Preparing a campaign reserves that eligibility/cooldown before delivery; no draft-cancel/release interface is included. Review/birthday preparations should be reviewed carefully before committing them.
- Campaign sends50/request; scheduler drains bounded queues. Unknown transport results need provider reconciliation. No automatic failed-message retry console or verified customer review-submission integration.
- Cron may prepare empty campaign records on eligible scheduled passes; monitor and prune/archive old records under a retention policy.
- Customer session token is long-lived and treated as a possession credential. Use device revocation when lost. On public/shared phones do not leave card open. Anonymous orders can still be abused; rate limiting is not proof that a person is physically at a table.
- JavaScript source is compact; Node syntax and TS project checks are included but full static type coverage is not claimed. Consider formatting/splitting the backend modules as the product grows.

## Testing limits

Automated local D1/HTTP/Chromium checks are real; physical Android/iOS devices, printed QR physical scanning, public-domain SSL/DNS, Cloudflare production resource limits, provider billing/delivery and live scheduled execution were not tested. No independent penetration test or accessibility certification. Browser accessibility checks cover selected rendered states, not every interaction or assistive technology. No claim of production load/performance certification.

Use `PRODUCTION-CHECKLIST.md` as release gates. Core ordering, authentication, menu, loyalty, persistent storage and campaign preparation do not depend on Meta or a Google review link and can be demonstrated immediately after local setup.

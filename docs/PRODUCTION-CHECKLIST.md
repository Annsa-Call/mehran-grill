# Launch checklist

## Owner confirmations
- [ ] Confirm exact Garden branch identity, shop/address, mobile, hours, branding rights and artwork use.
- [ ] Compare every menu listing/portion against the supplied PDF and current restaurant prices; approve duplicates, typo descriptions and branch restrictions.
- [ ] Confirm coffee eligibility, five-stamp wording, reward expiry/terms, offer value and birthday policy.
- [ ] Confirm actual tax/accounting rules; save Tax confirmed only after verification.
- [ ] Provide verified Google Business Profile Ask-for-reviews URL for this branch.
- [ ] Approve privacy notice, retention period, deletion/export authorization and marketing opt-in wording.

## Infrastructure
- [ ] Restaurant-owned Cloudflare and GitHub access; separate demo and production resources.
- [ ] D1 created and correct ID bound; migrations applied; menu seeded; **no synthetic production data**.
- [ ] Strong unique owner password; least-privilege staff accounts; no credentials committed.
- [ ] Worker deployed; production mode/manual messaging/automation disabled initially.
- [ ] Final HTTPS domain configured and app origin saved in owner Settings.
- [ ] D1 backup exported securely; restore rehearsal; monitoring/incident contact and capacity assessment.

## Smoke acceptance on deployed domain
- [ ] Unauthorized owner APIs blocked; correct staff restrictions; owner login/logout tested.
- [ ] Scan physical table QR on Android and iPhone; correct table/menu; correct table change flow.
- [ ] Place order; server totals match approved menu/tax; pending persists after refresh.
- [ ] Owner sees order; mark preparing/ready/completed; only actual payment is marked paid.
- [ ] Visits/stamps issued once; repeat submit doesn't duplicate; reward redeems once; metrics update.
- [ ] Existing-phone different device cannot read card; one-time staff linking and revocation work.
- [ ] Test no-data/error/slow-network states, portrait/landscape, keyboard focus, reduced motion.
- [ ] Confirm Google link opens correct branch without claiming submission or rewarding positive sentiment.
- [ ] Test export/deletion in a nonproduction fixture before granting operational use.

## Optional live WhatsApp
- [ ] Business/sender approved; template bodies/variables/language and opt-in evidence verified.
- [ ] Secrets stored in Cloudflare; webhook challenge/signature accepted; STOP tested on consenting number.
- [ ] Explicit small test campaign: provider sent vs delivered/read reconciled; no uncontrolled bulk messages.
- [ ] Unknown/failed outcomes handled by operator; budget/permissions agreed; an enforceable total cap is not implemented and must be added/tested if required.
- [ ] Enable automation only after successful manual live validation; check real scheduled run and deduplication.

## Handover and commercial
- [ ] Owner training, maintenance/backup responsibility and incident process recorded.
- [ ] One-time scope, three-month support start/end and change-request terms agreed.
- [ ] Third-party recurring charges paid directly by restaurant; no hidden developer subscription.
- [ ] Record acceptance and unresolved limitations; retain the original CafeDesk repository/history privately as a provenance backup.

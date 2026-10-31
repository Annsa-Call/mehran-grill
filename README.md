# Mehran Grill

Single-restaurant QR ordering, owner/staff operations, customer loyalty and campaign preparation. Vanilla JavaScript frontend, Cloudflare Worker API, D1/SQLite and Worker Static Assets.

**Start here: [New GitHub → Cloudflare setup](docs/NEW-REPOSITORY-SETUP.md).** This clean package is for a NEW repository/Worker named `mehran-grill`, not the old `cafedesk` connection.

## Before deployment

Node.js 24, Git, Cloudflare account and an actual D1 database ID are required. The placeholder ID must be configured. No credentials, default owner password, customer database or live WhatsApp connection is included. Default mode is synthetic-demo/manual/automation-off. A real operational trial requires a clean database and confirmed restaurant/tax settings.

```sh
npm ci
npx wrangler login
npx wrangler d1 create mehran-grill
npm run configure:cloudflare -- YOUR_REAL_D1_DATABASE_ID
npm run deploy:cloudflare
npm run owner:remote
```

Create the database only if it does not already exist in your intended account. Replace the placeholder argument with the UUID returned by Cloudflare. The deploy helper builds assets, applies remote migrations, inserts missing menu rows and publishes code. It does not seed fake customer activity or create a default owner.

## Local demonstration

```sh
npm ci
npm run db:local
npm run seed:local
npm run demo:local
npm run owner:local
node scripts/build.mjs
npm run dev
```

Open `http://127.0.0.1:8787/order?table=T01` and `/owner`. Owner credentials are chosen interactively. The demo generator uses synthetic records and is never part of a routine production deployment. Keep local and remote data separate.

## Validation

```sh
npm run check
npm test
npx playwright install --with-deps chromium
npm run test:e2e
npm run build
```

Isolated HTTP/browser tests use port 8788 and a temporary local database. Linux/macOS/WSL recommended for the process-group test runner. CI runs the same checks. Build generates `public/customer.js` and `public/owner.js`; these are intentionally not committed. Menu/demo SQL and test reports are also generated/ignored. JavaScript syntax and TS project checks are not exhaustive static typing. No live provider or remote deployment test is implied.

## GitHub-connected Cloudflare builds

After initial CLI initialization, connect the NEW Worker `mehran-grill` to the new private repo, branch main, root `/`, build `node scripts/build.mjs`, deploy `npx wrangler deploy`. Routine connected builds do not apply database migrations. For schema changes, use a deliberately coordinated migration/release and `npm run deploy:cloudflare` with authorized CLI access. Read the full setup guide before changing this process.

## Functional scope

- Complete menu data: 143 source listings, 169 portions, 24 categories; owner price/availability/category management.
- QR table routes, search/cart/checkout, persistent unpaid orders, server-authoritative integer-paisa totals and idempotency.
- Owner/staff login and server authorization, customer matching/consent and private loyalty cards.
- Stamps and one-time rewards tied to qualifying paid/completed purchases.
- Database-derived analytics, campaign audience preparation, manual/demo modes and direct Meta approved-template adapter with signed webhooks.

**Not activated/implemented:** live WhatsApp account/templates, verified Google review URL, online payment gateway, browser push, chatbot/voice/calling, enforced trial expiry or exact 21/45/90 reminder stages. Existing comeback campaigns use 21+ day eligibility/cooldown/offer codes. A simple inactivity reminder remains re-engagement marketing under Meta policy; do not pretend the proposed staged no-offer workflow exists already.

## Security and rights

Keep repository private until restaurant/code ownership and asset permissions are confirmed. Do not commit `.dev.vars`, real `.env`, tokens, passwords, local D1, dependency folders or customer exports. Runtime secrets go into Cloudflare Worker Secrets, not public data or build-only variables. `.env.example` is intentionally safe to commit. Separate synthetic demo and real operation databases.

See [launch gates](docs/PRODUCTION-CHECKLIST.md), [known limitations](docs/KNOWN-LIMITATIONS.md), [menu verification](docs/MENU-VERIFICATION.md), and [asset provenance](docs/ASSET-SOURCES.md). Public availability of restaurant artwork is not a redistribution licence.

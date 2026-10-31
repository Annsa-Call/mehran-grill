# Mehran Grill — new GitHub repository to Cloudflare

Use this guide with **Mehran-Grill-Clean-New-Repository.zip**, not the earlier CafeDesk upload. This package targets a NEW Worker named `mehran-grill`; the earlier `cafedesk` deployment is separate. No remote repository or Cloudflare resource has been created by this handover.

## 1. What you need

- Your GitHub and Cloudflare accounts, with recovery/2FA configured.
- Node.js **24 LTS**, npm (included with Node), and Git installed on your computer. Use their official installers: https://nodejs.org/ and https://git-scm.com/ . Reopen your terminal after installation.
- The new cleaned ZIP. Keep it separate from the old CafeDesk folder so old files do not get mixed back in.
- For real restaurant operation: owner permission, confirmed menu/branch/contact/tax, privacy notice and secure staff credentials. WhatsApp credentials are **not required** for menu, ordering, loyalty or the silent demo.

These commands run on your computer. Nothing is typed into Supabase. This application uses **Cloudflare Workers + D1/SQLite + Static Assets**, not Pages-only hosting.

## 2. Create the NEW GitHub repository

1. Sign into GitHub → **+** → **New repository**.
2. Recommended repository name: **mehran-grill**.
3. Choose **Private**. The app contains restaurant branding/menu assets; obtain permission before publishing them or transferring code rights.
4. Leave **Add a README**, **Add .gitignore**, and **Choose a licence** unselected. The ZIP contains the first two, and you should not grant an open-source licence without confirming ownership.
5. Do not request Copilot to generate a new app; this project already exists.
6. Click **Create repository**. Leave its Quick Setup page open. Copy the HTTPS repository address it actually shows.

Reference: https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

## 3. Extract and open the project correctly

7. Extract the new ZIP to a fresh folder, for example `C:\Projects\Mehran-Grill`. Do not put it inside the old CafeDesk repository.
8. Open that folder. At its top level you must see `package.json`, `wrangler.jsonc`, `README.md`, and the folders `src`, `frontend`, `public`, `migrations`, `scripts` and `tests`.
9. Show hidden files so you can see `.gitignore`, `.env.example` and `.github`. They are important and safe to commit. `.env.example` has names/placeholders, not real secrets.
10. Open PowerShell/Terminal **in this folder**. On Windows you can right-click inside the folder and choose **Open in Terminal**. Check:

```sh
node --version
npm --version
git --version
npm ci
npm run check
npm test
```

Node should report v24.x. If PowerShell blocks `npm.ps1`, use Command Prompt in the same directory or use `npm.cmd`/`npx.cmd` instead of changing your computer's security settings broadly.

Do not upload the ZIP file itself to GitHub; commit its extracted source. The ZIP intentionally omits generated browser bundles. Build commands recreate them from `frontend/`.

## 4. Create the D1 database FIRST

Your supplied screenshot says **You have no D1 Databases**. You need to create one; your Cloudflare account ID is not a database ID.

11. In your terminal:

```sh
npx wrangler login
```

A browser opens. Sign into the Cloudflare account you intend to use and approve Wrangler's requested access. Never send the login password or access token to someone in chat.

12. List databases to avoid accidental duplication:

```sh
npx wrangler d1 list
```

If none named `mehran-grill` exists in that account, create it:

```sh
npx wrangler d1 create mehran-grill
```

**Alternative:** on the screenshot's D1 page, click **Create Database**, enter `mehran-grill`, follow the location/default prompts, then open the new database's settings/details. Do either CLI or dashboard creation, not both blindly.

13. Copy the resulting **Database ID**: a hyphenated UUID. It is not the database name, Worker name, account ID or Supabase project ID.
14. Configure the project:

```sh
npm run configure:cloudflare -- YOUR_REAL_D1_DATABASE_ID
```

Replace `YOUR_REAL_D1_DATABASE_ID` with your actual UUID. Do not type that placeholder literally. The helper validates the format, writes the ID, and preserves Worker name `mehran-grill`.

Open `wrangler.jsonc` and check:

- `name`: `mehran-grill` — the NEW Cloudflare Worker.
- `binding`: `DB` — code uses this exact name.
- `database_name`: `mehran-grill` — scripts target this name.
- `database_id`: actual UUID, no `REPLACE_WITH...` text.

A D1 ID can be committed to your private repository; it is not an API credential. Leave database_name unchanged unless you update all database/owner/seed scripts too.

Reference: https://developers.cloudflare.com/d1/get-started/

## 5. Choose the initial mode

The new ZIP is intentionally safe by default:

```json
"APP_MODE": "demo",
"MESSAGING_MODE": "manual",
"AUTOMATION_ENABLED": "false"
```

- **Sales demonstration:** keep these defaults. Synthetic customers/orders are optional, explicitly labelled and not real restaurant activity.
- **Operational restaurant trial:** use a **clean database**, set APP_MODE to `production`, keep messaging `manual` and automation `false`. Do not insert synthetic demo customers/orders.

Make this decision before seeding. Do not seed a demo, then relabel its database as real operation. Simultaneous demo and live deployments require separate database bindings/configurations and preferably separate Workers. Do not point both at the same D1 database.

Keep these non-secret flags in `wrangler.jsonc` so future deployments use the same settings. Leave all Meta credentials unset for the silent demo.

## 6. Initialize and deploy from your computer

15. From the same project folder, run:

```sh
npm run deploy:cloudflare
```

This command:

1. Checks that the D1 ID and Worker name have valid formats.
2. Builds the customer and owner browser code.
3. Generates menu seed SQL from `data/menu.json`.
4. Applies all three migrations to **remote D1**.
5. Inserts missing menu records without overwriting existing owner edits.
6. Deploys the Worker and public assets.

This is the initial provisioning/deployment path. A dry-run build is not sufficient. If Cloudflare asks you to select an account, choose the account where you created D1.

16. Create the remote owner login:

```sh
npm run owner:remote
```

Enter your chosen email and a password of at least 12 characters. Password input is hidden; store it in a password manager. There is **no shared default password**. Local owner accounts do not automatically exist remotely.

17. Wrangler prints the real public Worker URL, typically a `workers.dev` address. Copy that exact URL; do not guess the account subdomain.

Open these paths on that URL:

- `/api/health` — expect initialized/healthy response, not 503.
- `/order?table=T01` — customer menu.
- `/owner` — owner login.

A successful health check confirms database initialization checks, not the complete business workflow. Check menu counts and place/process an order too.

18. For a **synthetic sales demo only**, with the binding verified to point at the demo database:

```sh
node scripts/demo.mjs
npx wrangler d1 execute mehran-grill --remote --file=data/demo-seed.sql
```

Never run those two commands on the real operational-trial database. They are not included in automatic deployments. The demo generation script is retained because it is useful for repeatable demonstrations and isolated tests; generated sample SQL is not shipped or committed.

## 7. Set up the restaurant and verify on a phone

19. Sign into `/owner`. Check branch, contact, opening hours, menu prices, table list and availability.
20. For real ordering, confirm tax with the owner/accountant and save **Tax confirmed**. Demo 0% is not tax advice; production checkout is intentionally blocked until tax is confirmed.
21. Save the actual HTTPS app origin in owner Settings, without `/order` or another path.
22. Open **Table QR**, generate/download or print the table cards. Test one on a phone using mobile data. The decoded URL must use the public domain, not localhost.
23. Place a small test order. Verify correct table, stored items, server total and **unpaid** status. Process it as authorized staff, confirm payment only if actually received/appropriately recorded, then verify customer/loyalty/analytics updates.
24. Keep the review request disabled until the owner supplies the verified Google “Ask for reviews” destination. Do not invent a review link.

## 8. Push the clean source to the NEW GitHub repo

25. In the project terminal:

```sh
git init
git branch -M main
git add .
git status --short
git diff --cached --stat
```

Review this list before committing. It should contain source, required configuration, migrations, menu data, tests, documentation and authorized public assets. It must not contain secrets, dependency directories, databases, screenshots or old app files.

26. If Git asks for your identity, configure your own name and a verified GitHub/noreply email; these are commit attribution, not a login password:

```sh
git config user.name "YOUR NAME"
git config user.email "YOUR VERIFIED OR GITHUB NOREPLY EMAIL"
```

27. Commit and connect the address copied from GitHub's new repository page:

```sh
git commit -m "Initial Mehran Grill application"
git remote add origin https://github.com/YOUR-USERNAME/mehran-grill.git
git push -u origin main
```

Replace the remote address with your actual new repo address. GitHub may open browser authentication. Do not use your account password as a Git HTTPS password or put a token inside the URL. If `origin` already exists in this supposedly fresh extracted folder, run `git remote -v` and stop to verify you are not working inside the old repository.

28. Refresh GitHub. At repository root, verify `package.json`, `wrangler.jsonc`, `.github`, `src`, `frontend`, `public`, `migrations`, `scripts` and `tests`. The real database ID should now be in the configuration; the Meta token must not be anywhere.

Do not upload both the old ZIP and this one. Windows/GitHub browser drag-and-drop can miss hidden files and empty directories; the Git commands above are the recommended path.

## 9. Connect Cloudflare to GitHub for FUTURE updates

The initial Worker and D1 are already created by step 6. Connecting the existing Worker avoids an uninitialized first Git build.

29. Cloudflare → Workers & Pages → select **mehran-grill**, not the old `cafedesk` Worker.
30. Open **Settings → Build / Builds → Connect Git** (wording can vary). Authorize Cloudflare's GitHub integration for only the new repository where possible.
31. Select your GitHub account, new repo and production branch `main`.
32. Configure:

| Setting | Value |
|---|---|
| Worker/project name | `mehran-grill` — must match wrangler.jsonc |
| Production branch | `main` |
| Root directory | `/` — package.json is at root |
| Build command | `node scripts/build.mjs` |
| Deploy command | `npx wrangler deploy` |

Cloudflare installs dependencies automatically. No Pages output-directory setting is needed. **Use these two commands for the connected build**, not the old helper from the previous cafedesk guide.

Why is the deploy command different from the initial `npm run deploy:cloudflare`? The initial helper creates the remote schema/menu state using your authenticated CLI. Routine Git builds only rebuild assets and publish code; they do not need D1 edit permission to apply migrations. This avoids the earlier permission trap with automatically generated build tokens. The Worker still has its configured D1 runtime binding.

**Whenever a future update adds migrations or missing menu seed rows**, back up the target D1 and deliberately run `npm run deploy:cloudflare` from your authorized computer before marking that update live. For a mature release process, make backward-compatible migrations and coordinate their order with the code release. Do not assume a plain `wrangler deploy` executes SQL migrations.

33. Keep automatic deployment limited to main. Leave production-mutating migration/seed commands out of preview builds. Do not give untrusted pull-request code production secrets or the real production DB in an improvised preview setup.
34. Save and trigger the first connected build. Open its log and verify success, then repeat `/api/health` and a test customer journey.

Reference: https://developers.cloudflare.com/workers/ci-cd/builds/configuration/

The included GitHub Actions workflow checks tests/builds but does **not** deploy, require Cloudflare secrets, or make real WhatsApp sends. Review GitHub account usage/Actions limits if applicable.

## 10. Secrets and costs

No WhatsApp keys are needed at this stage. Later, install Meta tokens/app secrets/verify token in the **running Worker's Variables and Secrets** or with `wrangler secret put`; Build variables alone are not runtime values. Never place them in `public/`, menu data, GitHub, screenshots or chat.

Do not assume free hosting is unlimited. Check actual Workers/D1 limits and paid-plan requirements for password hashing, traffic and scheduler execution before an operational launch. The workers.dev domain means a custom domain is optional initially. Enabling a paid plan is the account owner's decision, not a hidden development fee.

Reference: https://developers.cloudflare.com/workers/platform/pricing/

## 11. Your 21 / 45 / 90-day reminder idea

### Policy: a reminder can still be marketing

A business-initiated “We haven't seen you for 21 days; come visit us” message is customer re-engagement/relationship-building. **Removing a discount or the word offer does not make it a utility message.** Meta's marketing definition covers retargeting and prompting new conversations; utility is tied to specific user actions/requests/transactions. Submit the proposed reminder as marketing unless Meta actually approves an eligible alternative category. It is not a loophole for free messaging.

References:
- https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/template-categorization
- https://developers.facebook.com/documentation/business-messaging/whatsapp/getting-opt-in

Obtain permission to receive these messages from Mehran Grill and honor STOP. A phone number supplied for an order is not by itself permission for recurring re-engagement. A real order-status or confirmed-booking reminder is different from an inactivity reminder; do not relabel one as the other.

### Recommended product rule—proposal, NOT implemented here

Define your intervals as **21, 45 and 90 elapsed days** after the last completed-and-paid qualifying order. “1.5 months” is interpreted as 45 days; calendar months are not all equal.

- Day 21: one gentle text-only reminder.
- Day 45: one second reminder, only if no newer qualifying visit.
- Day 90: one final reminder, then stop until a new qualifying visit and continued consent.
- A new qualifying visit resets the cycle. Cancel any prepared old-cycle reminders before sending.
- A send worker rechecks consent, last visit, stage and quiet-hours policy immediately before sending.
- Use a uniqueness key such as `(customer_id, last_qualifying_order_id, stage_days)` to prevent repeated sends from duplicate jobs.
- If a job first sees someone already 90 days inactive, send at most the latest appropriate stage, not all three together. Record the skipped stages. Do not flood an old customer import.
- Failed/unknown delivery is not automatically retried without reconciliation; never turn repeated retries into repeated customer messages.
- Keep sent/delivered/failed/opted-out audit records and a real owner-approved budget cap.

Suggested text, subject to Meta approval:

> Assalam o Alaikum {{1}}. A friendly hello from Mehran Grill—we would be happy to welcome you again whenever you feel like visiting. Reply STOP if you do not want these reminders.

This has no discount or reward. **It is still re-engagement marketing for budgeting/approval purposes.** The current sender expects different parameter mappings for its comeback template, so this one-variable proposal cannot simply replace the existing template without a code change.

**Current ZIP status:** existing 21+ day comeback eligibility, cooldown and offer-code sender are preserved. It does NOT implement exact 21/45/90 stages or a separate no-offer reminder engine. Do not enable the existing automation expecting those exact dates; a cooldown-based recurring campaign is not the staged plan above. This task's source changes concern clean new-repository deployment, not an untested campaign rewrite.

### What about marketing through notifications?

- **In-app notices/offers:** visible while the customer opens the application; no WhatsApp delivery fee, but no promise they will return and see it.
- **Web push:** a separate feature requiring HTTPS, explicit browser permission, service worker/push subscriptions, device support, unsubscribe handling and an actual send backend. It is **not implemented** in this package. Background push is not the same as showing a toast inside an open page. Some mobile platforms impose extra installation/permission requirements.
- **WhatsApp notifications/messages:** remain WhatsApp messages; changing the label to “notification” does not avoid Meta classification or cost.

Recommendation: first launch reliable QR ordering/loyalty and owner-visible inactivity lists with messaging OFF. Show offers inside the app. If the owner buys, scope and test the three-stage text-only reminder feature, secure consent/templates, and let the owner pay provider charges directly. Add web push only if customers are willing to grant permission and it demonstrates value. None of these require audio or voice.

## 12. Clean ZIP contents and exclusions

Retained: application frontend/backend, authorized public brand assets, complete structured menu, migrations, seed/demo generators, secure owner setup, package/lock/config, tests, CI, useful technical documentation and `.env.example`.

Removed from the upload package: old CafeDesk root interfaces/admin/payment-tracking files; original blueprint/menu PDFs; reference spreadsheets; commercial pricing/trial-sales documents; extracted reference text; historical QA logs/screenshots; old deployment guides; generated bundles/menu SQL/demo SQL; dependencies; local D1 databases; `.git` history; temporary output and ZIPs. Keep your original reference materials privately outside the repository.

`.gitignore` also excludes these generated/private categories so normal `git add .` does not re-add them. It is not a secret scanner and does not untrack already-committed files. This is a new repository, so start with the cleaned source and inspect staged files every time.

## 13. Troubleshooting

| Problem | Fix |
|---|---|
| No D1 database | Create it first; screenshot showed none |
| Error 10021 / invalid database_id | Configure actual D1 UUID and commit wrangler.jsonc |
| Worker-name mismatch | New Worker and config both `mehran-grill`; do not attach this repo to old `cafedesk` by accident |
| Supabase PRAGMA error | Wrong database engine; use D1, not Supabase |
| D1 permission denied | Check Wrangler account and login; do initial migrations with CLI; if using migration commands in CI, explicitly grant scoped D1 edit permission |
| Missing tables / health 503 | Run initial helper against the intended REMOTE database; local setup is separate |
| Missing customer.js/owner.js after extracting ZIP | Expected until `node scripts/build.mjs` runs; generated bundles are intentionally excluded from Git |
| Main page loads but owner login fails | Run owner:remote, use the credentials you chose; no default login |
| Checkout blocked in production | Confirm actual tax/settings and availability with restaurant |
| GitHub contains just one ZIP | Extract and commit source files, not the archive |
| Public QR opens localhost | Save real deployed origin and regenerate cards |
| Silent demo sends no WhatsApp | Correct; live provider configuration/approval is not completed |

Keep `docs/KNOWN-LIMITATIONS.md` and `docs/PRODUCTION-CHECKLIST.md` as launch gates. Local passing tests are not proof of successful remote deployment, legal/tax compliance, Meta approval or real delivery.

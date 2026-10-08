# ReadEasy Kids — founder prototype

An aspirational Vietnamese learning platform for children who struggle with reading, including children with dyslexia. Inspired by the learning-platform model of Khan Academy; no affiliation or clinical validation is claimed.

The existing React 18 / TypeScript / Vite architecture, React Router, context providers, purple identity, and original fox/cat assets are retained. The app now has seven Vietnamese reading lessons and a real guardian account service. Sample interactions are not learner outcome metrics.

## GitHub Pages deployment

The `.github/workflows/pages.yml` workflow tests, builds, and deploys `main` or `codex/readeasy-presentation` to **https://readeasy.pswork.dev/**. GitHub Pages must use the GitHub Actions publishing source. The workflow reads Pages metadata for the asset base, so both a custom subdomain and a repository URL work.

Set the six public `VITE_FIREBASE_*` repository variables from `.env.example` (the four required fields must be populated). No Firebase Admin credential or server API key belongs in GitHub variables or the frontend. Firebase continues to provide authentication and saved progress; Pages hosts only the frontend. Add the deployed domain to the Firebase Auth authorized domain list. The `github-pages` environment permits the two deployment branches.

## Learning and accounts

- Seven distinct stories, two suggested reading levels, three suggested practice stages, and 21 comprehension questions. See [content provenance](CONTENT-NOTES.md). Every question has a manually reviewed answer, explanation, and supporting story sentence.
- No-account entry remains available. Read → answer → feedback with highlighted evidence → score and review → next lesson or reset. Attempts resume while navigating within the same page session.
- `/lessons` organizes an open path: find details → follow events → understand reasons. Every lesson offers optional original sentence-order practice; the reading hint points to a supporting sentence without selecting an answer. Home suggests unfinished session work, supported rereading after 0–1 correct answers, then the next unread story. These suggestions do not lock lessons or imply mastery.
- `/guardian` shows current-account completed scores or explicitly labeled session-only results, completion/revisit filters, a next-story suggestion, and reading support for adults. It is a shared-account view, without child profiles, class roster or teacher permissions. Account reports wait for data and expose load failures.
- Large text, line spacing, keyboard focus, skip link, reduced motion, responsive layout.
- Real `/signup`, `/login`, `/account` hash routes: guardian email/password signup, login, logout, and explicitly requested reset email through Firebase Authentication. Passwords are never stored by application code.
- Completed lesson scores save to Firestore and recover after sign-in/reload. Demo progress and unfinished attempts live only in memory. Auth changes clear the prior session's attempts; demo completions do not silently become account data.
- Clear loading, provider failure, save failure, retry states. No AI, analytics, or historical learner-data queries.

## Configure, run, and build

```sh
npm ci --no-audit --no-fund
# Supply .env.local from .env.example before building.
npm run dev -- --host 127.0.0.1 --port 5192
npm test
npm run lint
npm run build
npm run build:embedded
npm run preview -- --host 127.0.0.1 --port 5193
```

Required public Firebase client configuration: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`. Optional: storage bucket and messaging sender ID. This is client configuration, not an Admin credential. `.env.local` is ignored. Without configuration, account submission is disabled with an honest explanation; lessons still work.

Configured review project: **readeasykids**. Email/Password is enabled. New-namespace Firestore rules were published by the owner session and independently checked with disposable live accounts. Rules and receipts are in sibling `readeasy-evidence/`. Configure deployed origins as required by Firebase Auth and any API-key restrictions; no Admin key belongs in this frontend.

Serve **dist/** at the origin root. Serve **dist-embedded/** at **/demos/readeasy/**. HashRouter supports static hosting without rewrite rules; images and Vite assets honor `import.meta.env.BASE_URL`.

Only **public-demo/** is copied: fox, cat, favicon. Original **public/** datasets, recordings, unused illustrations remain source references and never enter either artifact. No historical Firebase files or exposed Gemini key are imported into the build. Nunito uses Google Fonts with Segoe UI fallback.

## Progress schema and access

The app uses only `readingUsers/{authenticatedUid}/progress/{lessonId}`. Each document has exactly `lessonId`, integer `score` 0–3, `total: 3`, `completed: true`, and server `completedAt`. Rules require UID ownership, known lesson IDs, exact schema. No parent profile, child name, age, or health data is written.

`firestore.rules` is a standalone reference that denies other namespaces. **Do not replace existing project rules blindly.** The deployed owner merge preserves historical behavior and excludes `readingUsers` from the old broad catchall. Historical collections outside this namespace still have legacy public rules; this app never queries them. Their separate remediation is outside this work.

## Verification

Nineteen Vitest tests cover content/evidence keys, progress validation, SDK account boundaries/errors, answer gating, incorrect scoring, reset, next lesson, stage coverage, sentence-order correction/reset, recommendations and truthful guardian filters. The emulator rule test is opt-in with `FIRESTORE_EMULATOR_HOST` and skipped in the normal run. Initial live SDK QA verified sixteen checks for signup, login/logout, save/read/resume, other UID/anonymous denial, invalid-schema denial. A second sixteen-check live REST run confirmed the deployed access rules and persistence after dependency patching. Actual browser SDK signup, logout, failed/successful login and saved-score recovery were also verified. All disposable QA documents/accounts were deleted.

`node scripts/verify-live.mjs` repeats authorized disposable QA using native REST and writes a credential-free receipt. The browser app uses Firebase's modular SDK; native REST avoids an old SDK transport incompatibility with Node 24. Only run this script against a project where disposable account creation/deletion is authorized.

Root and embedded builds, lint, actual Chrome exercise/account/responsive checks are recorded in the evidence receipt. QA screenshots contain only a reserved example.com account.

## Limits

Founder prototype, not a standardized curriculum, diagnostic assessment, or clinically evaluated intervention. No narration, AI tutor, class dashboard, verified-email gating, multi-child profiles, guardian consent/legal workflow, or cloud resume of unfinished questions. Latest completed score is saved per lesson, not a longitudinal assessment or best-score record. Production privacy, retention, account deletion, email delivery, educator/user evaluation, original-art licensing review need dedicated work. Reset email wiring is implemented but no email was sent in QA.

Unused Bootstrap and FirebaseUI dependencies were removed and compatible dependency fixes applied. The retained Firebase 10 stack still has npm audit findings: 13 production advisories (8 moderate, 5 high, no critical) at handoff. These are recorded in the evidence folder; a broader dependency migration remains separate work. Build output warns about the Firebase-inclusive JavaScript chunk size.

Branch **codex/readeasy-presentation**. Nothing pushed to original repository. Hosting managed separately.

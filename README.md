# nilkanthprojects.site

Portfolio and content admin for Nilkanth Miyani, built with Next.js 15, MongoDB
and Tailwind v4.

One deployment serves two hostnames:

| Host | Serves |
|---|---|
| `nilkanthprojects.site` | The public portfolio |
| `admin.nilkanthprojects.site` | Password-gated content admin |

`middleware.ts` routes on the `Host` header: the `admin.` subdomain is rewritten
into `/admin/*` and gated on a signed session cookie, while `/admin` on the
public host returns 404.

## Local development

```bash
npm install
cp .env.example .env.local     # then fill it in
npm run hash-password 'a-long-password'   # paste result into .env.local
npm run seed                   # load resume content into MongoDB
npm run dev
```

- Portfolio: <http://localhost:3000>
- Admin: <http://admin.localhost:3000> (resolves without an `/etc/hosts` entry)

## Content

MongoDB is the source of truth. `scripts/seed-data.ts` holds the canonical
content and `npm run seed` upserts it; `npm run seed:reset` wipes first.

Everything is editable in the admin panel: profile and hero copy, experience,
projects, skills, education, certifications, résumé file, and the contact-form
inbox.

Public pages read through `lib/content.ts`, which wraps each collection in
`unstable_cache` under its own tag. Admin writes call `revalidateTag`, so an
edit is live on the next request with no rebuild.

> Editing MongoDB directly (via `mongosh` or the seed script) bypasses that
> revalidation, so those changes only appear after the next deploy or an admin
> save. Edits made *through the admin panel* appear immediately.

## Deploying to Vercel

1. Import the repository into a new Vercel project.
2. Add every variable from `.env.example` under Settings → Environment Variables.
   Use a **different** `ADMIN_SESSION_SECRET` than the local one.
3. Create a Blob store (Storage → Blob) for résumé uploads; it sets
   `BLOB_READ_WRITE_TOKEN` automatically.
4. Add both domains under Settings → Domains:
   - `nilkanthprojects.site`
   - `admin.nilkanthprojects.site`
5. Point DNS at Vercel:

   | Type | Name | Value |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `admin` | `cname.vercel-dns.com` |

6. In MongoDB Atlas → Network Access, allow Vercel's egress (`0.0.0.0/0` is the
   pragmatic choice for serverless; the connection is still credentialed).
7. Disable the old GitHub Pages deployment (Settings → Pages → Source: None) so
   it cannot serve a stale copy.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and serve |
| `npm run seed` | Upsert canonical content |
| `npm run seed:reset` | Wipe collections, then seed |
| `npm run hash-password '…'` | Generate `ADMIN_PASSWORD_HASH` |

## Admin authentication

A single password, deliberately. It is stored only as a scrypt `salt:hash`,
verified in constant time, rate-limited to 5 attempts per IP per 15 minutes, and
exchanged for an HMAC-signed HttpOnly cookie valid for 7 days. There is no 2FA
and no recovery flow — rotate by re-running `hash-password` and updating the
environment variable.

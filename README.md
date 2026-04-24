# RivoRent

A rental-property marketplace for the US housing market. Users browse listings,
view photos and amenities, and submit a complete rental application online —
ID uploads, co-applicant details, and an electronic signature are bundled into
a generated PDF and stored alongside the application record.

Live site: <https://www.rivo.rent>

---

## What's in here

This repo contains the full Next.js app (App Router) plus a small set of
maintenance scripts I use to keep prices and property URLs in sync with the
database.

Core features:

- **Property search** with filters by city, bedrooms, price range and amenities
- **Detail pages** with photo galleries, descriptions and similar listings
- **Rental application flow** — two applicants, occupants, vehicles, references,
  document uploads (ID, paystubs, etc.) and an in-browser signature pad
- **PDF generation** of the signed application with `pdf-lib`, uploaded to
  Cloudinary and linked from the application record
- **Admin-friendly Mongoose models** for properties, rental applications and posts
- **Vercel Analytics + Speed Insights** on every route
- **SEO basics** — metadata, OpenGraph/Twitter cards and JSON-LD schema for
  `RealEstateAgent`

## Tech stack

| Area           | Choice                                           |
| -------------- | ------------------------------------------------ |
| Framework      | Next.js 16 (App Router, React 19, React Compiler)|
| Styling        | Tailwind CSS v4                                  |
| Database       | MongoDB + Mongoose                               |
| Media / PDFs   | Cloudinary                                       |
| Animations     | Framer Motion                                    |
| Signatures     | `signature_pad`                                  |
| PDF building   | `pdf-lib`                                        |
| Hosting        | Vercel                                           |

## Project layout

```
src/
├── app/
│   ├── api/                # Route handlers (apply, properties, upload, …)
│   ├── details/[id]/       # Property detail page
│   ├── search/             # Search results
│   ├── apply/              # Rental application flow
│   └── …                   # about, contact, privacy-policy, form
├── components/             # Navbar, Footer, SearchPageClient, SignaturePad, …
├── lib/                    # mongodb.js, cloudinary.js, cleanData.js
├── models/                 # Mongoose schemas
├── pages/                  # Shared page sections used by the App Router
└── utils/                  # Small helpers (random reviews/amenities, …)
public/                     # Static assets
price-update/               # Standalone Node scripts for bulk DB maintenance
```

## Getting started

### Prerequisites

- Node.js 20+
- A MongoDB database (Atlas works great)
- A Cloudinary account

### Setup

```bash
git clone https://github.com/<your-username>/rivo-rent.git
cd rivo-rent
npm install
cp .env.example .env.local
# then fill in the values in .env.local
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

See [`.env.example`](./.env.example) for the full list. The essentials:

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Scripts

```bash
npm run dev     # local dev server with Turbopack
npm run build   # production build
npm run start   # start the built app
npm run lint    # eslint
```

## Maintenance scripts (`price-update/`)

Standalone Node scripts I run against the production database when prices or
URLs need bulk changes. They read `MONGODB_URI` from the root `.env` file.

```bash
cd price-update
npm install

# Generate property-urls.txt from the properties collection
node generate-urls.js

# Apply a flat percentage cut to every rentMin/rentMax (default -20%)
node reduce-prices.js

# Bulk-update rentMin/rentMax from a CSV (requires missing.csv)
node update-prices.js
```

> These scripts write to the database. Point them at a staging cluster before
> running them against production.

## Deployment

The project is built to run on Vercel — push to the connected branch and
Vercel handles the build. Set `MONGODB_URI`, `CLOUDINARY_CLOUD_NAME`,
`CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` in the project's environment
variables before the first deploy.

## Notes

- Images are served through `next/image` with `unoptimized: true` so large
  external photo CDNs (`*.apartments.com`) can be displayed without hitting
  Vercel's optimizer quota. Revisit this if you start hosting your own photos.
- The keyword list in `src/app/layout.js` is intentionally broad — it's aimed
  at long-tail rental queries and will be pruned once SEO data comes in.
- Secrets live only in environment variables. `.env*` files are gitignored and
  `.env.example` is the only committed template.

## License

This project is source-available on GitHub for portfolio purposes. It isn't
licensed for redistribution or commercial reuse — open an issue if you'd like
to discuss use.

# EventOcean — Complete Project Documentation

> **A full-stack event management & ticketing platform built with Next.js 14, MongoDB, Clerk, Stripe, and UploadThing.**

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Key Features](#2-key-features)
3. [Tech Stack](#3-tech-stack)
4. [System Architecture](#4-system-architecture)
5. [Prerequisites](#5-prerequisites)
6. [Environment Variables](#6-environment-variables)
7. [Getting Started (Local Development)](#7-getting-started-local-development)
8. [Project Folder Structure](#8-project-folder-structure)
9. [Routing & Pages](#9-routing--pages)
10. [Database Models](#10-database-models)
11. [Server Actions (Business Logic Layer)](#11-server-actions-business-logic-layer)
12. [API Routes (Webhooks)](#12-api-routes-webhooks)
13. [Authentication — Clerk](#13-authentication--clerk)
14. [Payments — Stripe](#14-payments--stripe)
15. [Image Uploads — UploadThing](#15-image-uploads--uploadthing)
16. [UI Component Library](#16-ui-component-library)
17. [Shared Components Reference](#17-shared-components-reference)
18. [Utility Functions](#18-utility-functions)
19. [Form Validation (Zod)](#19-form-validation-zod)
20. [Styling System](#20-styling-system)
21. [TypeScript Types Reference](#21-typescript-types-reference)
22. [Data Flow Diagrams](#22-data-flow-diagrams)
23. [Deployment on Vercel](#23-deployment-on-vercel)
24. [Common Issues & Troubleshooting](#24-common-issues--troubleshooting)
25. [Contributing](#25-contributing)

---

## 1. Project Overview

**EventOcean** is a production-ready, full-stack web application that lets users:

- **Discover** events posted by other users on an explore feed.
- **Create & manage** their own events with rich details (image, date, price, location, category, URL).
- **Purchase tickets** securely through Stripe Checkout.
- **Track** tickets they have bought and events they have organised from a personal profile dashboard.
- **Search & filter** events by title keyword or category with real-time URL-synced state.

The project follows the **Next.js App Router** paradigm (Next.js 14) with a clear separation between:

| Layer | Technology |
|---|---|
| Rendering | React Server Components + Client Components |
| Routing | Next.js App Router (file-system based) |
| Data access | Mongoose Server Actions (no separate REST API) |
| Authentication | Clerk |
| Payments | Stripe |
| File Storage | UploadThing (wraps AWS S3) |
| Database | MongoDB Atlas |
| Styling | Tailwind CSS + shadcn/ui |

---

## 2. Key Features

| Feature | Description |
|---|---|
| **Authentication** | Sign-up / sign-in via Clerk (supports email, Google, GitHub OAuth). User profile synced to MongoDB via webhook. |
| **Event CRUD** | Authenticated users can create, read, update, and delete their own events. |
| **Rich Event Form** | Title, description, image upload, location, start/end date-time pickers, price/free toggle, external URL. |
| **Category System** | Events belong to user-created categories; new categories can be added inline in the form. |
| **Event Detail Page** | Full event info, checkout button, and related events from the same category. |
| **Stripe Checkout** | Secure payment flow. Free events bypass payment. Stripe webhook updates the order database automatically. |
| **Orders Dashboard** | Event organisers can view a table of all orders (buyer name, amount, date) for any event they own. |
| **Profile Page** | Shows tickets purchased (linked to events) and events created by the signed-in user, each with pagination. |
| **Search & Filter** | Debounced full-text title search and category dropdown filter — state stored in URL query params. |
| **Pagination** | Server-side pagination with a reusable `Pagination` component. |
| **Responsive Design** | Mobile-first layout; collapsible sheet menu on small screens. |
| **Image Hosting** | Event banners uploaded directly to UploadThing CDN (`utfs.io`). |

---

## 3. Tech Stack

### Core

| Technology | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/) | 14.0.4 | Full-stack React framework (App Router, Server Actions, SSR) |
| [React](https://react.dev/) | 18 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5 | Static typing |
| [Node.js](https://nodejs.org/) | 18+ | JavaScript runtime |

### Database & ORM

| Technology | Version | Purpose |
|---|---|---|
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud | NoSQL document database |
| [Mongoose](https://mongoosejs.com/) | 8.0.3 | ODM — schema definitions, queries, relationships |

### Authentication

| Technology | Version | Purpose |
|---|---|---|
| [@clerk/nextjs](https://clerk.com/) | 4.28.1 | Authentication provider (sign-in, sign-up, session management, user webhooks) |

### Payments

| Technology | Version | Purpose |
|---|---|---|
| [Stripe](https://stripe.com/) | 14.9.0 | Payment processing — Stripe Checkout Sessions |
| [@stripe/stripe-js](https://stripe.com/) | 2.2.2 | Stripe browser-side JS |
| [svix](https://svix.com/) | 1.15.0 | Webhook signature verification (Clerk webhooks) |

### File Uploads

| Technology | Version | Purpose |
|---|---|---|
| [UploadThing](https://uploadthing.com/) | 6.1.0 | Type-safe file uploads to S3-backed CDN |
| [@uploadthing/react](https://uploadthing.com/) | 6.0.2 | React hooks & components for UploadThing |

### Styling

| Technology | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com/) | 3.3+ | Utility-first CSS framework |
| [tailwind-merge](https://github.com/dcastil/tailwind-merge) | 2.1.0 | Merge Tailwind class names without conflicts |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | 1.0.7 | Animation utilities |
| [clsx](https://github.com/lukeed/clsx) | 2.0.0 | Conditional class name builder |

### UI Components

| Technology | Version | Purpose |
|---|---|---|
| [shadcn/ui](https://ui.shadcn.com/) | — | Pre-built accessible component recipes |
| [@radix-ui/react-*](https://www.radix-ui.com/) | various | Headless, accessible UI primitives |
| [lucide-react](https://lucide.dev/) | 0.297.0 | Icon library |
| [class-variance-authority](https://cva.style/) | 0.7.0 | Variant-based component styling |

### Forms & Validation

| Technology | Version | Purpose |
|---|---|---|
| [react-hook-form](https://react-hook-form.com/) | 7.49.2 | Performant form state management |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 3.3.2 | Bridge between react-hook-form and Zod |
| [Zod](https://zod.dev/) | 3.22.4 | Schema validation |

### Other Libraries

| Technology | Version | Purpose |
|---|---|---|
| [react-datepicker](https://reactdatepicker.com/) | 4.25.0 | Date/time picker component |
| [query-string](https://github.com/sindresorhus/query-string) | 8.1.0 | URL query param serialisation/parsing |

---

## 4. System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Browser (Client)                      │
│                                                              │
│  React Client Components  ◄──────►  Next.js Server Components│
│  (EventForm, Search, etc.)          (Home, EventDetails, etc.)│
└────────────────┬────────────────────────────┬───────────────┘
                 │  Server Actions             │  Page data (RSC)
                 ▼                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   Next.js Server (App Router)                 │
│                                                              │
│  /lib/actions/*.ts  ──────────────►  MongoDB Atlas           │
│  (Server Actions)                    via Mongoose            │
│                                                              │
│  /app/api/webhook/clerk  ◄──────────  Clerk (user events)    │
│  /app/api/webhook/stripe ◄──────────  Stripe (payment events)│
│  /app/api/uploadthing    ◄──────────  UploadThing (file ops)  │
└─────────────────────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                   External Services                          │
│                                                              │
│  Clerk    — Authentication & user management                 │
│  Stripe   — Payment processing                               │
│  UploadThing — Image/file storage (CDN backed by S3)         │
│  MongoDB Atlas — Cloud database                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Architectural Decisions

1. **No traditional REST API** — Data fetching uses Next.js 14 Server Actions (`"use server"`) called directly from components. This eliminates boilerplate API routes for CRUD operations.
2. **React Server Components by default** — Pages are async Server Components that fetch data at request time, keeping JavaScript bundles small.
3. **Client Components only where needed** — Interactive components (forms, date pickers, file uploaders, search) are marked `"use client"`.
4. **Webhook-driven user sync** — Clerk fires webhooks on user create/update/delete; the `/api/webhook/clerk` route syncs changes to MongoDB. Same pattern for Stripe order creation.
5. **Mongoose connection caching** — A single `connectToDatabase()` helper caches the Mongoose connection across serverless function invocations to avoid connection pool exhaustion.

---

## 5. Prerequisites

Before running the project locally, ensure you have:

| Tool | Minimum Version | How to Check |
|---|---|---|
| Node.js | 18.x | `node -v` |
| npm | 9.x | `npm -v` |
| Git | 2.x | `git --version` |
| A MongoDB Atlas account | — | [cloud.mongodb.com](https://cloud.mongodb.com) |
| A Clerk account | — | [clerk.com](https://clerk.com) |
| A Stripe account | — | [stripe.com](https://stripe.com) |
| An UploadThing account | — | [uploadthing.com](https://uploadthing.com) |

> **Tip:** All four services offer free tiers sufficient for development and small-scale production use.

---

## 6. Environment Variables

Create a `.env.local` file in the project root. **Never commit this file to version control** (it is already in `.gitignore`).

```bash
# ─── MongoDB ──────────────────────────────────────────────────
# Connection string from MongoDB Atlas (include /event-ocean as db name or omit — Mongoose sets it in code)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# ─── Clerk (Authentication) ───────────────────────────────────
# Found in Clerk Dashboard → API Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clerk redirect URLs after sign-in / sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Clerk Webhook Secret (from Clerk Dashboard → Webhooks → Signing Secret)
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── Stripe (Payments) ────────────────────────────────────────
# Found in Stripe Dashboard → Developers → API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Stripe Webhook Secret (from Stripe CLI or Dashboard → Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ─── UploadThing (File Uploads) ───────────────────────────────
# Found in UploadThing Dashboard → API Keys
UPLOADTHING_SECRET=sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
UPLOADTHING_APP_ID=xxxxxxxxxxxxxxxxxxxx

# ─── App ──────────────────────────────────────────────────────
# Used for Stripe success/cancel redirect URLs
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### How to Obtain Each Key

#### MongoDB URI
1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create a free cluster.
2. Click **Connect** → **Drivers** → copy the connection string.
3. Replace `<username>` and `<password>` with your database user credentials.
4. Whitelist your IP address (or `0.0.0.0/0` for all IPs in development).

#### Clerk Keys
1. Create a new application at [dashboard.clerk.com](https://dashboard.clerk.com).
2. Go to **API Keys** → copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`.
3. For the webhook secret: **Webhooks** → **Add Endpoint** → set the URL to `https://<your-domain>/api/webhook/clerk` → copy the **Signing Secret**.
4. Subscribe to events: `user.created`, `user.updated`, `user.deleted`.

#### Stripe Keys
1. Log in to [dashboard.stripe.com](https://dashboard.stripe.com).
2. **Developers** → **API Keys** → copy publishable and secret keys.
3. For the webhook secret locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
   Copy the `whsec_...` secret printed to your terminal.

#### UploadThing Keys
1. Sign in at [uploadthing.com](https://uploadthing.com) → create a new app.
2. Go to **API Keys** → copy `UPLOADTHING_SECRET` and `UPLOADTHING_APP_ID`.

---

## 7. Getting Started (Local Development)

Follow these steps **in order** to get EventOcean running on your machine.

### Step 1 — Clone the Repository

```bash
git clone https://github.com/AbhishekSinghDev/event-ocean.git
cd event-ocean
```

### Step 2 — Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json` into `node_modules/`.

### Step 3 — Set Up Environment Variables

```bash
cp .env.example .env.local   # if an example file exists, otherwise create manually
```

Populate `.env.local` with all the keys described in [Section 6](#6-environment-variables).

### Step 4 — Configure Clerk (userId session claim)

EventOcean reads `sessionClaims.userId` (a MongoDB `_id`) from the Clerk session token. To make this work:

1. In the Clerk Dashboard go to **Sessions** → **Customize session token**.
2. Add the following JSON to the **Claims** object:
   ```json
   {
     "userId": "{{user.public_metadata.userId}}"
   }
   ```
   This is populated by the `createUser` webhook handler which stores the MongoDB `_id` in Clerk's public metadata.

### Step 5 — Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 6 — (Optional) Forward Stripe Webhooks Locally

In a second terminal:

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Copy the printed `whsec_...` value into `STRIPE_WEBHOOK_SECRET` in `.env.local` and restart the dev server.

### Available npm Scripts

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Next.js in dev mode with hot reload |
| Production build | `npm run build` | Compile & optimise for production |
| Production start | `npm run start` | Start the production server (after build) |
| Lint | `npm run lint` | Run ESLint via `next lint` |

---

## 8. Project Folder Structure

```
event-ocean/
├── app/                          # Next.js App Router root
│   ├── (auth)/                   # Route group — authentication pages
│   │   ├── layout.tsx            # Auth layout (centered card)
│   │   ├── sign-in/              # Clerk <SignIn /> page
│   │   └── sign-up/              # Clerk <SignUp /> page
│   │
│   ├── (root)/                   # Route group — main application
│   │   ├── layout.tsx            # Root layout with <Header> and <Footer>
│   │   ├── page.tsx              # Home page — event listing + hero section
│   │   ├── events/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx      # Event detail page
│   │   │   └── create/
│   │   │       └── page.tsx      # Create event page
│   │   ├── orders/
│   │   │   └── page.tsx          # Orders table for event organisers
│   │   └── profile/
│   │       └── page.tsx          # User profile (tickets + organised events)
│   │
│   ├── api/                      # API route handlers
│   │   ├── uploadthing/          # UploadThing file router endpoint
│   │   └── webhook/
│   │       ├── clerk/            # Clerk user lifecycle webhooks
│   │       └── stripe/           # Stripe payment webhooks
│   │
│   ├── favicon.ico
│   ├── globals.css               # Global CSS (Tailwind base + custom vars)
│   └── layout.tsx                # Root HTML layout — ClerkProvider, Poppins font
│
├── components/
│   ├── shared/                   # Reusable domain components
│   │   ├── Card.tsx              # Event card shown in collections
│   │   ├── CategoryFilter.tsx    # Category dropdown filter
│   │   ├── Checkout.tsx          # Stripe Checkout form trigger
│   │   ├── CheckoutButton.tsx    # Buy ticket / Checkout wrapper
│   │   ├── Collection.tsx        # Grid of event cards with empty state
│   │   ├── DeleteConfirmation.tsx# Alert dialog for event deletion
│   │   ├── Dropdown.tsx          # Category selector (with add new)
│   │   ├── EventForm.tsx         # Create / update event form
│   │   ├── FileUploader.tsx      # Drag-and-drop image uploader
│   │   ├── Footer.tsx            # Site footer
│   │   ├── Header.tsx            # Site header / navigation
│   │   ├── MobileNav.tsx         # Sheet-based mobile navigation
│   │   ├── NavItems.tsx          # Navigation link list
│   │   ├── Pagination.tsx        # Page navigation component
│   │   └── Search.tsx            # Debounced search input
│   │
│   └── ui/                       # shadcn/ui generated components
│       ├── alert-dialog.tsx
│       ├── button.tsx
│       ├── checkbox.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       └── textarea.tsx
│
├── constants/
│   └── index.ts                  # Navigation links, event form default values
│
├── lib/
│   ├── actions/                  # Next.js Server Actions (data layer)
│   │   ├── category.actions.ts
│   │   ├── events.actions.ts
│   │   ├── order.actions.ts
│   │   └── user.actions.ts
│   │
│   ├── database/
│   │   ├── index.ts              # Mongoose connection helper
│   │   └── models/               # Mongoose schemas & models
│   │       ├── category.model.ts
│   │       ├── event.model.ts
│   │       ├── order.model.ts
│   │       └── user.model.ts
│   │
│   ├── uploadthing.ts            # UploadThing hooks & helpers
│   ├── utils.ts                  # General utilities (cn, formatDateTime, etc.)
│   └── validator.ts              # Zod schemas for form validation
│
├── middleware.ts                  # Clerk auth middleware (route protection)
├── next.config.js                # Next.js config (allowed image domains)
├── postcss.config.js             # PostCSS config for Tailwind
├── tailwind.config.ts            # Tailwind theme + custom colours/fonts
├── tsconfig.json                 # TypeScript configuration
├── components.json               # shadcn/ui configuration
├── types/
│   └── index.ts                  # Global TypeScript type definitions
└── public/
    └── assets/
        ├── icons/                # SVG icons (logo, calendar, location, etc.)
        └── images/               # Static images (hero.png, dotted-pattern.png)
```

---

## 9. Routing & Pages

EventOcean uses **Next.js App Router** with two route groups.

### Route Groups Overview

| URL Pattern | File | Auth Required | Description |
|---|---|---|---|
| `/` | `app/(root)/page.tsx` | No | Home — hero section + event listing |
| `/events/[id]` | `app/(root)/events/[id]/page.tsx` | No | Event detail + checkout button |
| `/events/create` | `app/(root)/events/create/page.tsx` | **Yes** | Create a new event |
| `/events/[id]/update` | *(via EventForm)* | **Yes (organiser only)** | Update an existing event |
| `/profile` | `app/(root)/profile/page.tsx` | **Yes** | User tickets + organised events |
| `/orders` | `app/(root)/orders/page.tsx` | **Yes** | Order management for organisers |
| `/sign-in` | `app/(auth)/sign-in/` | No | Clerk sign-in page |
| `/sign-up` | `app/(auth)/sign-up/` | No | Clerk sign-up page |
| `/api/webhook/clerk` | `app/api/webhook/clerk/` | Public (signed) | Clerk user lifecycle webhooks |
| `/api/webhook/stripe` | `app/api/webhook/stripe/` | Public (signed) | Stripe payment webhooks |
| `/api/uploadthing` | `app/api/uploadthing/` | Public | UploadThing file router |

### Route Group: `(root)`

The `(root)` group uses a shared layout (`app/(root)/layout.tsx`) that renders the `<Header>` and `<Footer>` around every page.

```tsx
// app/(root)/layout.tsx
export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
```

### Route Group: `(auth)`

The `(auth)` group provides a clean centred layout for Clerk's hosted sign-in and sign-up components:

```tsx
// app/(auth)/layout.tsx
export default function AuthLayout({ children }) {
  return (
    <main className="flex-center min-h-screen w-full bg-primary-50">
      {children}
    </main>
  );
}
```

### Middleware & Route Protection

`middleware.ts` uses Clerk's `authMiddleware` to protect routes:

```ts
export default authMiddleware({
  publicRoutes: [
    "/",
    "/events/:id",
    "/api/webhook/clerk",
    "/api/webhook/stripe",
    "/api/uploadthing",
  ],
});
```

Any route **not** in `publicRoutes` automatically redirects unauthenticated users to `/sign-in`.

---

## 10. Database Models

EventOcean uses **MongoDB** (via **Mongoose**). The database name is `event-ocean` (set in `lib/database/index.ts`).

### User Model

**File:** `lib/database/models/user.model.ts`

```
Collection: users
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `clerkId` | String | required, unique | Clerk's internal user ID |
| `email` | String | required, unique | User's email address |
| `username` | String | required, unique | Display username |
| `firstName` | String | required | First name |
| `lastName` | String | required | Last name |
| `photo` | String | required | Profile image URL (from Clerk) |

**Relationships:**
- One user → many Events (as organiser)
- One user → many Orders (as buyer)

---

### Category Model

**File:** `lib/database/models/category.model.ts`

```
Collection: categories
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `name` | String | required, unique | Category name (e.g., "Music", "Tech") |

---

### Event Model

**File:** `lib/database/models/event.model.ts`

```
Collection: events
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `title` | String | required | Event title |
| `description` | String | — | Full event description |
| `location` | String | — | Physical address or "Online" |
| `createdAt` | Date | default: `Date.now` | Creation timestamp |
| `imageUrl` | String | required | Banner image URL (UploadThing CDN) |
| `startDateTime` | Date | default: `Date.now` | Event start time |
| `endDateTime` | Date | default: `Date.now` | Event end time |
| `price` | String | — | Ticket price in USD |
| `isFree` | Boolean | default: `false` | Free event flag |
| `url` | String | — | External event URL |
| `category` | ObjectId | ref: `Category` | Linked category |
| `organiser` | ObjectId | ref: `User` | Event creator |

**Populated fields** (via `populateEvent` helper):
- `organiser` → `{ _id, firstName, lastName }`
- `category` → `{ _id, name }`

---

### Order Model

**File:** `lib/database/models/order.model.ts`

```
Collection: orders
```

| Field | Type | Constraints | Description |
|---|---|---|---|
| `createdAt` | Date | default: `Date.now` | Purchase timestamp |
| `stripeId` | String | required, unique | Stripe Payment Intent / Session ID |
| `totalAmount` | String | — | Amount paid in USD |
| `event` | ObjectId | ref: `Event` | Purchased event |
| `buyer` | ObjectId | ref: `User` | Purchasing user |

---

### Entity Relationship Diagram

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  User    │       │  Event   │       │ Category │
│──────────│       │──────────│       │──────────│
│ clerkId  │◄──┐  │ title    │──────►│ name     │
│ email    │   │  │ imageUrl │       └──────────┘
│ username │   │  │ location │
│firstName │   │  │ price    │
│ lastName │   │  │ isFree   │
│ photo    │   └──│organiser │
└────┬─────┘      └─────┬────┘
     │                  │
     │    ┌─────────┐   │
     └───►│  Order  │◄──┘
          │─────────│
          │stripeId │
          │ amount  │
          │ buyer   │
          │ event   │
          └─────────┘
```

---

## 11. Server Actions (Business Logic Layer)

Server Actions (`"use server"`) are Next.js 14 functions that run exclusively on the server. They replace traditional REST API routes for CRUD operations and are called directly from components.

### `lib/actions/user.actions.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `createUser` | `CreateUserParams` | `User` | Creates a new user document in MongoDB. Called from the Clerk webhook handler. |
| `getUserById` | `userId: string` | `User` | Finds a user by their MongoDB `_id`. |
| `updateUser` | `clerkId: string, UpdateUserParams` | `User` | Updates user fields by Clerk ID. |
| `deleteUser` | `clerkId: string` | `User \| null` | Deletes a user and unlinks their events and orders. |

### `lib/actions/events.actions.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `createEvent` | `CreateEventParams` | `Event` | Creates a new event document linked to the organiser user. |
| `getEventById` | `eventId: string` | `Event` (populated) | Fetches a single event with organiser and category populated. |
| `getAllEvents` | `GetAllEventsParams` | `{ data, totalPages }` | Paginated, filtered, searched list of all events. |
| `updateEvent` | `UpdateEventParams` | `Event` | Updates an event (only if `userId` matches the organiser). Revalidates the path. |
| `deleteEvent` | `DeleteEventParams` | `void` | Deletes an event by ID. Revalidates the path. |
| `getRelatedEventsByCategory` | `GetRelatedEventsByCategoryParams` | `{ data, totalPages }` | Events in the same category, excluding the current event. |
| `getEventsByUser` | `GetEventsByUserParams` | `{ data, totalPages }` | Paginated events created by a specific user. |

#### `getAllEvents` — How Search & Filter Work

```ts
const titleCondition = query ? { title: { $regex: query, $options: "i" } } : {};
const categoryCondition = category ? await getCategoryByName(category) : null;
const conditions = {
  $and: [
    titleCondition,
    categoryCondition ? { category: categoryCondition._id } : {},
  ],
};
```

- `query` → performs a **case-insensitive regex** search on the `title` field.
- `category` → first looks up the category by name (also regex-insensitive), then filters by `_id`.
- Both conditions are combined with `$and` so they can stack.

### `lib/actions/order.actions.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `checkoutOrder` | `CheckoutOrderParams` | `redirect()` | Creates a Stripe Checkout Session and redirects the user to Stripe's hosted payment page. |
| `createOrder` | `CreateOrderParams` | `Order` | Saves an order to MongoDB. Called by the Stripe webhook after successful payment. |
| `getOrdersByEvent` | `GetOrdersByEventParams` | `IOrderItem[]` | Aggregation pipeline returning all orders for a given event, with buyer name search support. |
| `getOrdersByUser` | `GetOrdersByUserParams` | `{ data, totalPages }` | Paginated orders placed by a user (returns distinct events purchased). |

#### `getOrdersByEvent` — Aggregation Pipeline

```ts
Order.aggregate([
  { $lookup: { from: "users", localField: "buyer", foreignField: "_id", as: "buyer" } },
  { $unwind: "$buyer" },
  { $lookup: { from: "events", localField: "event", foreignField: "_id", as: "event" } },
  { $unwind: "$event" },
  { $project: { _id, totalAmount, createdAt, eventTitle: "$event.title", eventId: "$event._id",
      buyer: { $concat: ["$buyer.firstName", " ", "$buyer.lastName"] } } },
  { $match: { $and: [{ eventId: eventObjectId }, { buyer: { $regex: searchString, "i" } }] } },
])
```

### `lib/actions/category.actions.ts`

| Function | Parameters | Returns | Description |
|---|---|---|---|
| `createCategory` | `{ categoryName: string }` | `Category` | Adds a new category to the database. |
| `getAllCategories` | — | `Category[]` | Returns all categories for dropdown population. |

---

## 12. API Routes (Webhooks)

Unlike Server Actions (called from components), API Routes handle incoming HTTP requests from external services.

### Clerk Webhook — `/api/webhook/clerk`

**Purpose:** Keeps the MongoDB `users` collection in sync with Clerk's user store.

**Triggered by:** Clerk events `user.created`, `user.updated`, `user.deleted`.

**How it works:**
1. Verifies the request signature using `svix` and `CLERK_WEBHOOK_SECRET`.
2. Parses the event type and payload.
3. Calls the appropriate Server Action (`createUser`, `updateUser`, `deleteUser`).
4. On `user.created`, updates Clerk's public metadata to store the MongoDB `_id` so that `sessionClaims.userId` resolves to the correct database record.

### Stripe Webhook — `/api/webhook/stripe`

**Purpose:** Records a completed purchase as an `Order` document in MongoDB.

**Triggered by:** Stripe event `checkout.session.completed`.

**How it works:**
1. Verifies the request signature using `stripe.webhooks.constructEvent` and `STRIPE_WEBHOOK_SECRET`.
2. Reads `session.metadata.eventId` and `session.metadata.buyerId` (set when creating the checkout session in `checkoutOrder`).
3. Calls `createOrder` to persist the order.

### UploadThing Route — `/api/uploadthing`

**Purpose:** Defines the file upload router (what file types are allowed, max size, auth).

**Implementation:** Standard UploadThing `createNextRouteHandler` with an `imageUploader` route that accepts images up to a configured size limit.

---

## 13. Authentication — Clerk

### How Clerk is Integrated

| Layer | Integration |
|---|---|
| Root layout | `<ClerkProvider>` wraps the entire app in `app/layout.tsx` |
| Route protection | `authMiddleware` in `middleware.ts` |
| UI components | `<SignedIn>`, `<SignedOut>`, `<UserButton>` from `@clerk/nextjs` |
| Server-side session | `auth()` from `@clerk/nextjs` inside Server Components |
| User sync | Webhooks → `createUser` / `updateUser` / `deleteUser` |

### Accessing the Current User

In a **Server Component** or **Server Action**:

```ts
import { auth } from "@clerk/nextjs";

const { sessionClaims } = auth();
const userId = sessionClaims?.userId as string; // MongoDB _id (set via Clerk metadata)
```

### Public vs Protected Routes

```
Public  → /, /events/[id], /sign-in, /sign-up, /api/webhook/*
Protected → /events/create, /profile, /orders
```

Unauthenticated users hitting a protected route are automatically redirected to `/sign-in` by the Clerk middleware.

---

## 14. Payments — Stripe

### Checkout Flow

```
User clicks "Buy Ticket"
  → <CheckoutButton> renders <Checkout> (client component)
  → calls checkoutOrder() Server Action
    → stripe.checkout.sessions.create({ metadata: { eventId, buyerId } })
    → redirect(session.url)  ← user is sent to Stripe hosted page
  
User completes payment on Stripe
  → Stripe fires checkout.session.completed webhook
    → /api/webhook/stripe verifies signature
    → createOrder() saves order to MongoDB
  
User is redirected to /profile (success_url)
```

### Free Events

When `isFree === true`, the `price` is set to `0` in the checkout session. The user still goes through a Stripe "checkout" flow but no card is charged. Alternatively, the `<CheckoutButton>` can be customised to skip Stripe entirely for free events.

### Currency

All prices are stored as strings (e.g., `"25.00"`) and converted to **USD cents** (`* 100`) when passed to Stripe:

```ts
const price = order.isFree ? 0 : Number(order.price) * 100;
```

---

## 15. Image Uploads — UploadThing

### How It Works

1. The user selects an image in `<FileUploader>` (drag-and-drop or click).
2. On form submit, `startUpload(files)` (from `useUploadThing("imageUploader")`) uploads the file directly from the browser to UploadThing's CDN.
3. UploadThing returns a URL (`uploadedImages[0].url`) on the `utfs.io` domain.
4. This URL is stored as `imageUrl` on the Event document in MongoDB.
5. Next.js is configured to allow `utfs.io` as a remote image host in `next.config.js`:

```js
images: {
  remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
},
```

### File Uploader Component

`components/shared/FileUploader.tsx` provides:
- Drag-and-drop zone
- Preview of the selected image
- Passes the `File[]` array up to `EventForm` for upload on submit

---

## 16. UI Component Library

EventOcean uses **shadcn/ui** — a collection of copy-pasteable, Radix-UI-based components styled with Tailwind CSS. These live in `components/ui/`.

### Available UI Primitives

| Component | File | Based On | Use |
|---|---|---|---|
| `Button` | `button.tsx` | Radix Slot | Buttons with size/variant props |
| `Input` | `input.tsx` | HTML input | Styled text input |
| `Textarea` | `textarea.tsx` | HTML textarea | Multi-line text input |
| `Label` | `label.tsx` | Radix Label | Form field labels |
| `Checkbox` | `checkbox.tsx` | Radix Checkbox | Binary toggle (e.g., "Free ticket") |
| `Select` | `select.tsx` | Radix Select | Dropdown select |
| `AlertDialog` | `alert-dialog.tsx` | Radix AlertDialog | Confirmation modals |
| `Sheet` | `sheet.tsx` | Radix Dialog | Slide-in side panel (mobile nav) |
| `Separator` | `separator.tsx` | Radix Separator | Visual divider |
| `Form` | `form.tsx` | react-hook-form | Accessible form field wrappers |

### Adding New shadcn Components

```bash
npx shadcn-ui@latest add <component-name>
```

---

## 17. Shared Components Reference

### `<Header />`

- Displays the EventOcean logo and brand name (links to `/`).
- Shows navigation links (`<NavItems />`) when the user is signed in.
- Shows `<UserButton />` (Clerk) and `<MobileNav />` for authenticated users.
- Shows a **Login** button for unauthenticated users.

### `<NavItems />`

Renders the links from `constants/index.ts`:
- **Home** → `/`
- **Create Event** → `/events/create`
- **My Profile** → `/profile`

### `<MobileNav />`

A `<Sheet>` (slide-in from the left) containing `<NavItems />` for small screens, toggled by a hamburger icon.

### `<Collection />`

A flexible grid component that renders a list of events. Accepts:

| Prop | Type | Description |
|---|---|---|
| `data` | `IEvent[]` | Array of events to display |
| `emptyTitle` | `string` | Heading when `data` is empty |
| `emptyStateSubtext` | `string` | Subtext when `data` is empty |
| `collectionType` | `"All_Events" \| "My_Tickets" \| "Events_Organized"` | Controls which action buttons appear on cards |
| `limit` | `number` | Items per page |
| `page` | `number \| string` | Current page number |
| `totalPages` | `number` | Total number of pages |
| `urlParamName` | `string?` | Query param name for pagination |

### `<Card />`

Renders a single event card with:
- Event image (Next.js `<Image />`)
- Start date/time
- Title
- Price badge (free/paid)
- Category badge
- Organiser name
- Edit/Delete buttons (visible only to the event organiser)

### `<EventForm />`

A comprehensive form used for both **Create** and **Update** operations. Key fields:
- Title (text input)
- Category (Dropdown with add-new capability)
- Description (textarea)
- Image (FileUploader)
- Location (text input)
- Start & End DateTime (react-datepicker)
- Price (number input) + Free checkbox
- URL (text input)

Validated with Zod schema (`eventFormSchema`).

### `<Search />`

- Debounced (300ms) search input.
- Updates the `query` URL parameter using `formUrlQuery` utility.
- Clears the param when the input is emptied using `removeKeysFromQuery`.

### `<CategoryFilter />`

- Dropdown (`<Select>`) populated by `getAllCategories()`.
- Updates the `category` URL parameter on selection.
- Shows an "All" option to reset the filter.

### `<Pagination />`

- Previous / Next buttons.
- Updates the page URL parameter.
- Disabled when at the first or last page.

### `<CheckoutButton />`

- If the event has already ended, shows "Event has ended".
- If the user is not signed in, shows a "Get Tickets" link to `/sign-in`.
- If the event is free, renders `<Checkout>` with `isFree: true`.
- If the event is paid, renders `<Checkout>` with the event price.

### `<Checkout />`

Calls the `checkoutOrder` Server Action, which triggers a Stripe redirect.

### `<DeleteConfirmation />`

An `<AlertDialog>` that asks the user to confirm event deletion before calling `deleteEvent`.

### `<Dropdown />`

A custom category selector built on Radix `<Select>`. Includes an "Add new category" option that triggers a dialog to create a new `Category` document inline.

### `<FileUploader />`

Drag-and-drop image uploader using UploadThing's `useDropzone`. Shows a preview of the uploaded image.

---

## 18. Utility Functions

**File:** `lib/utils.ts`

| Function | Signature | Description |
|---|---|---|
| `cn` | `(...inputs: ClassValue[]) => string` | Merges Tailwind classes (clsx + tailwind-merge) |
| `formatDateTime` | `(date: Date) => { dateTime, dateOnly, timeOnly }` | Formats a date into human-readable strings |
| `convertFileToUrl` | `(file: File) => string` | Creates an object URL for a local file (image preview) |
| `formatPrice` | `(price: string) => string` | Formats a numeric string as `$XX.XX` USD |
| `formUrlQuery` | `({ params, key, value }) => string` | Adds/updates a query param in the current URL |
| `removeKeysFromQuery` | `({ params, keysToRemove }) => string` | Removes specified query params from the current URL |
| `handleError` | `(error: unknown) => never` | Logs and re-throws any error |

### `formatDateTime` Example

```ts
const { dateTime, dateOnly, timeOnly } = formatDateTime(new Date("2024-03-15T18:30:00"));
// dateTime → "Fri, Mar 15, 6:30 PM"
// dateOnly → "Fri, Mar 15, 2024"
// timeOnly → "6:30 PM"
```

---

## 19. Form Validation (Zod)

**File:** `lib/validator.ts`

```ts
const eventFormSchema = z.object({
  title:         z.string().min(3, "Title must be at least 3 characters"),
  description:   z.string().min(3).max(400),
  location:      z.string().min(3).max(400),
  imageUrl:      z.string(),
  startDateTime: z.date(),
  endDateTime:   z.date(),
  categoryId:    z.string(),
  price:         z.string(),
  isFree:        z.boolean(),
  url:           z.string().url(),
});
```

This schema is used with `react-hook-form` via `zodResolver`:

```ts
const form = useForm<z.infer<typeof eventFormSchema>>({
  resolver: zodResolver(eventFormSchema),
  defaultValues: eventDefaultValues,
});
```

Validation errors are displayed inline next to each field via `<FormMessage />`.

---

## 20. Styling System

### Tailwind Configuration Highlights

**Custom Colours** (defined in `tailwind.config.ts`):

| Token | Hex | Usage |
|---|---|---|
| `primary-500` | `#624CF5` | Buttons, links, highlights |
| `primary-50` | `#F6F8FD` | Section backgrounds |
| `coral-500` | `#15BF59` | Free ticket badge |
| `grey-600` | `#545454` | Body text |
| `grey-500` | `#757575` | Subdued text |
| `grey-400` | `#AFAFAF` | Disabled state |
| `grey-50` | `#F6F6F6` | Input backgrounds |

**Custom Font:**

```ts
fontFamily: { poppins: ["var(--font-poppins)"] }
```

Loaded from Google Fonts in `app/layout.tsx` using `next/font/google`.

**Custom Background:**

```ts
backgroundImage: {
  "dotted-pattern": "url('/assets/images/dotted-pattern.png')",
}
```

Used in section headers: `className="bg-dotted-pattern bg-contain"`.

### Global CSS — `app/globals.css`

Defines base Tailwind layers, CSS custom properties for Radix UI theming (border radius, colours), and reusable utility classes such as `.wrapper`, `.h1-bold`, `.p-regular-20`, `.button`, `.input-field`, `.textarea`, and more.

### Class Naming Conventions

The project uses semantic class aliases:

```
h1-bold, h2-bold, h3-bold          — heading styles
p-bold-20, p-medium-16, p-regular-20 — paragraph styles
input-field                          — form input base style
textarea                             — textarea base style
button                               — primary button style
wrapper                              — max-width container with horizontal padding
flex-center, flex-between            — flexbox shortcuts
```

---

## 21. TypeScript Types Reference

**File:** `types/index.ts`

### User Types

```ts
type CreateUserParams = {
  clerkId: string; firstName: string; lastName: string;
  username: string; email: string; photo: string;
};

type UpdateUserParams = {
  firstName: string; lastName: string; username: string; photo: string;
};
```

### Event Types

```ts
type CreateEventParams = {
  userId: string;
  event: { title, description, location, imageUrl, startDateTime,
           endDateTime, categoryId, price, isFree, url };
  path: string;
};

type UpdateEventParams = { userId: string; event: { _id, ...CreateEventParams["event"] }; path: string };
type DeleteEventParams = { eventId: string; path: string };

type GetAllEventsParams = { query: string; category: string; limit: number; page: number };
type GetEventsByUserParams = { userId: string; limit?: number; page: number };
type GetRelatedEventsByCategoryParams = { categoryId, eventId, limit?, page };
```

### Order Types

```ts
type CheckoutOrderParams = {
  eventTitle: string; eventDescription?: string;
  eventId: string; price: string; isFree: boolean; buyerId: string;
};

type CreateOrderParams = {
  stripeId: string; eventId: string; buyerId: string;
  totalAmount: string; createdAt: Date;
};

type GetOrdersByEventParams = { eventId: string; searchString: string };
type GetOrdersByUserParams = { userId: string | null; limit?: number; page: string | number | null };
```

### URL & Search Types

```ts
type UrlQueryParams       = { params: string; key: string; value: string | null };
type RemoveUrlQueryParams = { params: string; keysToRemove: string[] };
type SearchParamProps     = { params: { id: string }; searchParams: { [key: string]: string | string[] | undefined } };
```

---

## 22. Data Flow Diagrams

### Create Event Flow

```
User fills EventForm (client component)
  → react-hook-form + Zod validation
  → onSubmit():
      1. startUpload(files) → UploadThing CDN → returns imageUrl
      2. createEvent({ event: { ...values, imageUrl }, userId, path })
         → (Server Action) connectToDatabase()
         → Event.create({ ...event, category: event.categoryId, organizer: userId })
         → revalidatePath not needed (new resource)
         → returns JSON-serialised event
      3. router.push(`/events/${newEvent._id}`)
```

### Purchase Ticket Flow

```
User clicks "Buy Ticket" on /events/[id]
  → <CheckoutButton> → <Checkout> component
  → form.action = checkoutOrder Server Action
  → checkoutOrder({ eventTitle, eventId, price, isFree, buyerId })
      → stripe.checkout.sessions.create({
            line_items: [{ price_data: { currency: "usd", unit_amount: price*100 } }],
            metadata: { eventId, buyerId },
            success_url: "/profile",
            cancel_url: "/"
        })
      → redirect(session.url)  ← browser navigates to Stripe hosted page

[User completes payment]
  → Stripe fires POST to /api/webhook/stripe
      → verifySignature(STRIPE_WEBHOOK_SECRET)
      → on "checkout.session.completed":
          createOrder({ stripeId, eventId, buyerId, totalAmount, createdAt })
      → 200 OK response to Stripe

[Stripe redirects user to /profile]
  → Profile page shows new ticket
```

### Search & Filter Flow

```
User types in <Search /> input
  → 300ms debounce
  → formUrlQuery({ params: searchParams, key: "query", value: searchText })
  → router.push(newUrl)  ← URL updates (e.g., /?query=music)

Next.js re-renders Home page (Server Component)
  → getAllEvents({ query: "music", category: "", page: 1, limit: 6 })
  → MongoDB: Event.find({ title: { $regex: "music", $options: "i" } })
  → Returns matching events

<Collection /> re-renders with new data
```

---

## 23. Deployment on Vercel

Vercel is the recommended platform for deploying Next.js applications.

### Step 1 — Push Code to GitHub

```bash
git add .
git commit -m "ready for deployment"
git push origin main
```

### Step 2 — Import Project on Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Click **Import Git Repository** → select `event-ocean`.
3. Vercel auto-detects Next.js — no build configuration needed.

### Step 3 — Add Environment Variables

In the Vercel project dashboard → **Settings** → **Environment Variables**, add **all** the variables from `.env.local`:

- `MONGODB_URI`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL` → `/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_UP_URL` → `/sign-up`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` → `/`
- `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` → `/`
- `CLERK_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `UPLOADTHING_SECRET`
- `UPLOADTHING_APP_ID`
- `NEXT_PUBLIC_SERVER_URL` → your Vercel domain, e.g. `https://event-ocean.vercel.app`

### Step 4 — Deploy

Click **Deploy**. Vercel builds and deploys automatically.

### Step 5 — Update Webhook URLs

After deployment, update external services to point to your live domain:

| Service | Where to Update | New URL |
|---|---|---|
| Clerk | Dashboard → Webhooks → Edit Endpoint | `https://your-domain.vercel.app/api/webhook/clerk` |
| Stripe | Dashboard → Webhooks → Edit Endpoint (or add new) | `https://your-domain.vercel.app/api/webhook/stripe` |

### Step 6 — MongoDB Network Access

If using MongoDB Atlas, make sure to whitelist Vercel's outbound IPs or set access to `0.0.0.0/0` (allow all) in **Network Access**.

### Subsequent Deployments

Every `git push` to the `main` branch automatically triggers a new Vercel deployment. Preview deployments are created for every pull request.

---

## 24. Common Issues & Troubleshooting

### `MONGODB_URI is missing`
**Cause:** `.env.local` is not loaded or `MONGODB_URI` is not set.
**Fix:** Ensure `.env.local` exists in the project root and contains a valid `MONGODB_URI`. Restart the dev server after changes.

### `User not found` when creating an event
**Cause:** The Clerk webhook has not fired yet, so the user does not exist in MongoDB.
**Fix:** Ensure the Clerk webhook endpoint is reachable (use the Stripe CLI or `ngrok` for local testing) and that `CLERK_WEBHOOK_SECRET` is correct.

### `sessionClaims.userId` is `undefined`
**Cause:** The `userId` public metadata has not been set on the Clerk user (happens after `createUser` in the webhook).
**Fix:** Verify the Clerk session token customisation in the Clerk Dashboard (see [Section 7, Step 4](#step-4--configure-clerk-userid-session-claim)).

### Stripe redirect does not work locally
**Cause:** `NEXT_PUBLIC_SERVER_URL` is set to a non-localhost URL, or the Stripe CLI is not forwarding webhooks.
**Fix:** Set `NEXT_PUBLIC_SERVER_URL=http://localhost:3000` in `.env.local` and run `stripe listen --forward-to localhost:3000/api/webhook/stripe`.

### Images not displayed (Next.js Image error)
**Cause:** Image hostname not in the `remotePatterns` allowlist.
**Fix:** Add the hostname to `next.config.js`:
```js
images: {
  remotePatterns: [{ protocol: "https", hostname: "utfs.io" }],
},
```

### Build fails: `Type error: ...`
**Cause:** TypeScript type mismatch.
**Fix:** Run `npm run lint` to identify errors. Ensure all types in `types/index.ts` match the expected shapes.

### `Module not found: Can't resolve '@/...'`
**Cause:** Path alias `@/` is not resolving.
**Fix:** Ensure `tsconfig.json` contains:
```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./*"] }
  }
}
```

---

## 25. Contributing

### Development Workflow

1. **Fork** the repository and clone it locally.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following the conventions below.
4. Run `npm run lint` to catch code style issues.
5. Test your changes manually (there are no automated tests at this time).
6. Commit using a descriptive message: `git commit -m "feat: add event sharing feature"`
7. Push and open a **Pull Request** against `main`.

### Code Conventions

| Area | Convention |
|---|---|
| **Components** | PascalCase filenames; default export; `.tsx` extension |
| **Server Actions** | camelCase function names; `"use server"` directive at top of file |
| **Types** | Defined in `types/index.ts`; use `type` not `interface` for parameter objects |
| **Imports** | Use `@/` path alias for all project imports |
| **Styling** | Tailwind utility classes; custom utilities defined in `globals.css` |
| **Validation** | Zod schemas in `lib/validator.ts`; used with `react-hook-form` |
| **Error Handling** | Use `handleError(err)` from `lib/utils.ts` inside try/catch blocks |

### Project Roadmap Ideas

- [ ] Event search by location / map view
- [ ] Email notifications on ticket purchase
- [ ] QR code generation for tickets
- [ ] Event ratings and reviews
- [ ] Admin dashboard for platform management
- [ ] Multi-language support (i18n)
- [ ] Dark mode support
- [ ] Recurring events
- [ ] Waitlist for sold-out events

---

*This documentation was written to cover the full EventOcean project — from zero to production — for academic submission. All sections reflect the actual codebase as committed in this repository.*

<p align="center">
  <h1 align="center">🚗 Admin Car</h1>
  <p align="center">Car dealership management platform built with Laravel, React, Inertia & shadcn/ui.</p>
</p>

## Features

- **Role-based dashboards** — Admin, Seller, and Buyer views with Spatie RBAC
- **Car inventory** — Full CRUD with makes, models, categories, images, history, warranties
- **Orders & pre-orders** — Lifecycle tracking (pending → confirmed → completed) + transactions
- **Real-time messaging** — Buyer-seller chat with Pusher, read receipts, typing indicators
- **Inquiries & offers** — Buyers inquire, sellers accept/reject/counter
- **Admin analytics** — Revenue trends, top sellers, order stats via Recharts
- **Auth** — Register (Buyer/Seller), login, password reset, email verification, 2FA, passkeys
- **Theme switcher** — Light, Dark, System mode

## Tech Stack

| Layer | Stack |
|---|---|
| **Backend** | Laravel 13, Fortify (auth), JWT (API), Spatie Permissions |
| **Frontend** | React 19, TypeScript, Inertia.js 3, Tailwind CSS 4, shadcn/ui, Radix UI |
| **Real-Time** | Laravel Echo + Pusher |
| **Database** | PostgreSQL (Neon), SQLite (dev), Cloudflare D1 |
| **Build** | Vite 8 |
| **CI/CD** | GitHub Actions, Vercel |

## Quick Start

```bash
composer install && npm install
cp .env.example .env && php artisan key:generate
touch database/database.sqlite && php artisan migrate --seed
composer dev           # Runs server + queue + logs + Vite concurrently
```

## Scripts

| Command | Description |
|---|---|
| `composer dev` | Start all dev servers |
| `composer test` | Run PHPUnit + lint check |
| `composer lint` | Fix PHP code style (Pint) |
| `npm run build` | Build frontend |
| `npm run lint` | Fix JS/TS (ESLint) |
| `npm run format` | Format with Prettier |
| `npm run types:check` | TypeScript check |

## Project Structure

```
├── api/                            # Vercel serverless entry
├── app/
│   ├── Actions/Fortify/            # Auth actions (CreateNewUser, ResetUserPassword)
│   ├── Concerns/                   # Shared traits (PasswordValidationRules)
│   ├── Console/Commands/           # Artisan commands (InstallFeaturesCommand)
│   ├── Database/Connectors/        # Custom PostgresConnector
│   ├── Events/                     # Broadcast events (MessageCreated, UserOnline, etc.)
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/              # 17 controllers — Car, Category, Order, Employee, etc.
│   │   │   ├── Api/                # 8 controllers — Auth, Listing, Offer, Message, etc.
│   │   │   ├── Buyer/              # 6 controllers — Dashboard, Orders, Saved, etc.
│   │   │   ├── Seller/             # 8 controllers — Dashboard, Cars, Inquiries, etc.
│   │   │   └── Settings/           # Profile + Security controllers
│   │   ├── Middleware/             # RoleMiddleware, HandleAppearance, HandleInertiaRequests
│   │   └── Requests/              # Form request validation
│   ├── Listeners/Message/          # Message read receipt listeners
│   ├── Models/                     # 30 Eloquent models (User, CarListing, Order, Message, etc.)
│   └── Providers/                  # App, Auth, Events, Fortify, Route service providers
├── bootstrap/                      # Laravel bootstrapping
├── config/                         # 15 config files (app, auth, database, fortify, jwt, etc.)
├── database/
│   ├── factories/                  # UserFactory, UserRoleFactory
│   ├── migrations/                 # 32 migrations (users, car_listings, orders, messages, etc.)
│   └── seeders/                    # 14 seeders with demo data
├── public/                         # Web root (index.php, compiled assets)
├── resources/
│   ├── js/
│   │   ├── components/             # shadcn/ui (Button, Dialog, Select, etc.) + custom
│   │   ├── hooks/                  # useAppearance, useClipboard, useMobile, etc.
│   │   ├── layouts/                # AppLayout, AuthLayout, SettingsLayout
│   │   ├── lib/                    # utils.ts, sidebar config
│   │   ├── pages/                  # Inertia pages (admin/, seller/, buyer/, auth/, settings/)
│   │   ├── routes/                 # Frontend route definitions
│   │   └── types/                  # TypeScript type definitions
│   └── views/                      # Blade templates (root app.blade.php)
├── routes/
│   ├── web.php                     # Web routes (Inertia SPA)
│   ├── api.php                     # API routes (JWT auth)
│   ├── settings.php                # Settings routes
│   ├── channels.php                # Broadcasting channels
│   └── console.php                 # Artisan console routes
├── storage/                        # Logs, cache, sessions
├── tests/
│   ├── Feature/Auth/               # Authentication tests (login, 2FA, registration, etc.)
│   ├── Feature/Settings/           # Profile + security tests
│   └── Unit/                       # Unit tests
├── .github/workflows/              # CI: tests.yml (PHP 8.3/8.4/8.5) + lint.yml
├── composer.json
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json                     # Vercel deployment config
```

## API Endpoints (`/api/v1/`)

| Group | Endpoints |
|---|---|
| **Auth** | `auth/login`, `register`, `refresh`, `me`, `logout` |
| **Listings** | `makes`, `listings` (CRUD), `listings/{id}/images` |
| **User** | `saved`, `inquiries`, `offers`, `offers/{id}/{accept\|reject\|counter}` |
| **Messaging** | `conversations`, `conversations/{id}/{messages\|reply\|read}` |
| **Dashboard** | `seller/dashboard` |

## Database

30 tables across 8 domains:

| Domain | Tables |
|---|---|
| **Auth** | `users`, `password_reset_tokens`, `sessions`, `personal_access_tokens`, `passkeys` |
| **RBAC** | `roles`, `permissions`, `model_has_roles`, `model_has_permissions`, `role_has_permissions` |
| **Inventory** | `car_makes`, `car_models`, `categories`, `conditions`, `fuel_types`, `transmissions`, `car_listings`, `listing_images`, `listing_features` |
| **Commerce** | `orders`, `order_items`, `transactions`, `pre_orders`, `pre_order_payments` |
| **Chat** | `conversations`, `messages` |
| **Inquiries** | `inquiries`, `offers` |
| **User Actions** | `saved_listings`, `seller_reviews`, `seller_verifications`, `admin_actions` |
| **Vehicle** | `vehicle_histories`, `warranties`, `service_appointments`, `documents` |

## Testing

PHPUnit 12 with SQLite in-memory database.

```bash
composer test          # Runs lint check + PHPUnit
php artisan test       # Run tests only
```

```
tests/
├── Feature/
│   ├── Auth/          # login, 2FA, registration, password reset, email verification
│   ├── Settings/      # profile update, security
│   └── DashboardTest.php
└── Unit/
```

Factories: `UserFactory`, `UserRoleFactory` (states: `unverified`, `withTwoFactor`, `dealer`).

## Screenshots

> *(Add screenshots here — admin dashboard, car listings, messaging, etc.)*

## Contributing

1. Fork the repo
2. Create a branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes
4. Run `composer test` to verify
5. Push and open a Pull Request

## License

MIT — see [LICENSE](LICENSE).

---

<p align="center">
  Built by <a href="https://github.com/LENGSOKNAO">LENGSOKNAO</a> &nbsp;|&nbsp; <a href="https://github.com/LENGSOKNAO/admin-car">GitHub</a>
</p>

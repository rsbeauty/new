# Rs Beauty Parlour — Website package

A responsive salon website with a separate public page and admin page, using Supabase for authentication and database storage.

## Package contents

- `index.html` — public salon website, service catalogue, customer sign-in/sign-up, booking and enquiry UI.
- `admin.html` — separate admin login and dashboard.
- `styles.css` — shared blush / rose-gold responsive styling.
- `app.js` — public site, customer auth, booking and WhatsApp integration.
- `admin.js` — admin authentication, appointment status management and inquiries.
- `config.js` — Supabase URL, anon key and salon WhatsApp number.
- `supabase.sql` — fresh-install schema, supplied menu seed, triggers and RLS policies.
- `supabase-menu-migration.sql` — add the supplied menu to an existing Supabase project.

## 1. Create and configure Supabase

1. Create a project at https://supabase.com.
2. Open **SQL Editor** in the Supabase dashboard.
3. For a new project, run `supabase.sql`. For your existing project from the earlier package, run `supabase-menu-migration.sql` instead.
4. In **Project Settings → API**, copy the Project URL and anon/publishable key.
5. Paste them into `config.js`. Do not use the `service_role` key in browser code.
6. The WhatsApp number from your uploaded menu is preconfigured as `919625447178` in `config.js`.

## 2. Create the admin account

1. Open the website and create a customer account using the email that should own admin access.
2. Verify the email if Supabase email confirmation is enabled.
3. In Supabase SQL Editor, run the admin promotion query at the bottom of `supabase.sql`, replacing `YOUR-ADMIN-EMAIL@example.com` with that exact email.
4. Open `admin.html` and log in with that email/password.

The admin page checks the `profiles.role` value server-side through Supabase RLS. There is no hardcoded master password.

## 3. Run locally

Supabase Auth redirects and browser security work best from a local web server, not by opening `file://`.

With Python installed, run this in the extracted folder:

```bash
python -m http.server 8000
```

Then open:
- Public site: http://localhost:8000/index.html
- Admin page: http://localhost:8000/admin.html

For hosted deployment, upload the complete folder to Netlify, Vercel, Cloudflare Pages, or any static web host. Configure the deployed site URL in Supabase **Authentication → URL Configuration** (Site URL and allowed redirect URLs).

## Booking flow

- Customers sign up / sign in with email and password; their WhatsApp number and name are stored in `profiles`.
- A logged-in customer selects a service, date and time.
- The booking is inserted into Supabase with `requested` status and `pending` payment.
- The browser opens WhatsApp with a prefilled message to the salon.
- Admin can see all bookings and inquiries and change booking status to confirmed, completed or cancelled.

## Important production notes

- This is a static frontend backed by Supabase. RLS is enabled and is the security boundary; never put a Supabase service-role key in `config.js`.
- Configure Supabase SMTP/email confirmation before launch.
- Add a server-side booking availability check to prevent double-booking; the current UI collects a preferred slot but does not lock it.
- Prices and service names are sent by the client. For production payments, validate price/service on the server (e.g. Edge Function) and integrate a payment provider.
- Add CAPTCHA / rate limiting for public inquiries and consider spam protection.
- Customer passwords are handled by Supabase Auth, not stored in browser localStorage.
- WhatsApp opens only after the booking has been successfully saved. The salon must manually confirm the requested slot.
- Add your real salon address, business hours, phone, policies and genuine customer photos/reviews before publishing.

## Troubleshooting

- “Invalid API key” — check the Supabase URL and anon/publishable key in `config.js`.
- “No admin access” — run the role promotion SQL for the exact account email.
- Services show fallback menu — confirm `supabase.sql` ran and the `services` table has active rows.
- WhatsApp does not open — set `SALON_WHATSAPP` in `config.js` to country code + phone digits only.


## Imported salon menu

The public service menu now uses all 60 menu items from your uploaded `services.html`, across Cleanup, Facial, Makeup, Waxing, Waxing (Rica), Basic Work, Hair Services, Hair Cut, D-Tan and Pre-Bridal. Names and prices are preserved as supplied. The source menu did not specify durations, so the public page says “Ask salon” rather than displaying invented durations.

For an existing Supabase database, run `supabase-menu-migration.sql` once. It deactivates the earlier starter/demo categories and inserts the supplied menu while leaving profiles and bookings untouched.

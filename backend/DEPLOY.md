# Deploying the API to your VPS

Your frontend is already live on Vercel. This covers the other half: running
`/server` (Express + Postgres) on your own VPS, with Postgres also on that
VPS instead of Neon, fronted by Nginx with a free SSL certificate.

Nothing in the code needs to change to move databases — `DATABASE_URL` just
points at a different Postgres instance either way.

Assumes Ubuntu 22.04/24.04. Run these as a non-root sudo user, not directly
as root.

---

## 1. Basic server setup

```bash
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

node -v   # should print v20.x
npm -v
```

Firewall — only allow SSH, HTTP, HTTPS:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

---

## 2. Install Postgres on the VPS

```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql --now
```

Create the database and a dedicated app user (don't use the `postgres`
superuser for the app):

```bash
sudo -u postgres psql
```

Inside the `psql` prompt:

```sql
CREATE USER srikala WITH PASSWORD 'pick-a-strong-password-here';
CREATE DATABASE srikala OWNER srikala;
\q
```

Your `DATABASE_URL` will be:

```
postgresql://srikala:pick-a-strong-password-here@localhost:5432/srikala
```

No `?sslmode=require` needed — that flag is only for Neon. Local Postgres on
the same box doesn't need SSL for the connection, and `server/src/db.js`
already only turns SSL on when it sees `sslmode=require` in the string, so
this just works without touching code.

**Migrating your existing Neon data over (optional):** if you already have
real products/orders/reviews in Neon you want to keep, dump and restore
instead of re-seeding from scratch:

```bash
# On your local machine / wherever you have the Neon URL:
pg_dump "postgresql://user:pass@ep-xxxx-pooler.../srikala?sslmode=require" \
  --no-owner --no-privileges -f srikala.sql

# Copy it to the VPS, then on the VPS:
psql "postgresql://srikala:yourpassword@localhost:5432/srikala" -f srikala.sql
```

If you're fine starting fresh on the VPS, skip this and just run
`npm run seed` in step 4 instead.

---

## 3. Get the code onto the VPS

Easiest is a private Git repo:

```bash
cd /var/www          # or wherever you keep apps
sudo mkdir -p /var/www && sudo chown $USER:$USER /var/www
git clone <your-repo-url> srikala
cd srikala/backend
```

No repo yet? `scp` the `backend/` folder up directly:

```bash
# from your local machine
scp -r backend your-user@your-vps-ip:/var/www/srikala-backend
```

---

## 4. Configure and start the API

```bash
cd /var/www/srikala/backend        # adjust path to wherever you put it
cp .env.example .env
nano .env
```

Fill in:
- `DATABASE_URL` — the local Postgres URL from step 2
- `CLIENT_URL` — your Vercel URL(s), comma-separated if you have more than
  one (e.g. `https://srikala.vercel.app,https://your-custom-domain.com`)
- `JWT_SECRET` — a long random string (`openssl rand -hex 32` works well)
- `ADMIN_EMAIL`, Razorpay keys, Resend keys — same as before

Then:

```bash
npm install
npm run seed     # creates tables + seed data, or restores from your dump above
```

Run it once directly to check it boots cleanly:

```bash
npm start
# should print: Sri Kala API listening on http://localhost:4000
# Ctrl+C once you've confirmed it, then use PM2 below for real
```

### Keep it running with PM2

```bash
sudo npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup       # prints a command — copy/paste and run it, so PM2
                   # survives a server reboot
```

Useful PM2 commands going forward:

```bash
pm2 status
pm2 logs srikala-api
pm2 restart srikala-api    # after deploying new code
```

---

## 5. Nginx reverse proxy + SSL (Full Stack on VPS — No Vercel)

Both the frontend React SPA and the Express backend can be hosted directly on your VPS, eliminating the need for Vercel entirely.

### A. Point your Domain DNS directly to the VPS
In your domain registrar (GoDaddy, Hostinger, Cloudflare, Namecheap, etc.):
1. **A Record**: Host `@` (or `ravichandratextiles.com`) -> Point to your **VPS IP Address**
2. **A Record** (or CNAME): Host `www` -> Point to your **VPS IP Address**
3. **A Record**: Host `api` -> Point to your **VPS IP Address**
4. Delete any old Vercel DNS records (e.g. `cname.vercel-dns.com` or `76.76.21.21`).

### B. Build the Frontend on the VPS
```bash
cd /var/www/srikala/frontend
npm install
npm run build
# Creates optimized production files in /var/www/srikala/frontend/dist
```

### C. Configure Nginx
Copy the pre-configured Nginx file from the repository:
```bash
sudo cp /var/www/srikala/nginx-ravichandra.conf /etc/nginx/sites-available/ravichandra.conf
sudo ln -sf /etc/nginx/sites-available/ravichandra.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### D. Generate Free SSL Certificate (HTTPS)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ravichandratextiles.com -d www.ravichandratextiles.com -d api.ravichandratextiles.com
```

Certbot will automatically install the SSL certificates and configure automatic renewals.

---

## 6. Removing Code / Project from Vercel

Once your domain's DNS is pointing to the VPS:
1. Log into your [Vercel Dashboard](https://vercel.com).
2. Go to your **Project Settings** → **Domains**.
3. Remove `ravichandratextiles.com` and `www.ravichandratextiles.com` from Vercel so there is no conflict.
4. Go to **Settings** → **Advanced** → **Delete Project** (or simply leave it disconnected / paused).

Your site is now 100% self-hosted on your own high-performance VPS.

---

## 7. Deploying updates on the VPS

Whenever you push new changes to GitHub:

```bash
cd /var/www/srikala

# 1. Pull latest changes
git pull origin main

# 2. Build frontend
cd frontend
npm install
npm run build

# 3. Restart API
cd ../backend
npm install
pm2 restart ravichandra-api
```

---

## Checklist before going fully live

- [ ] Changed the seeded admin password
- [ ] Razorpay keys switched from Test to Live
- [ ] Resend sending domain verified
- [ ] `JWT_SECRET` is a real random value
- [ ] Postgres password is strong
- [ ] Domain DNS points to VPS IP
- [ ] SSL active on `ravichandratextiles.com`, `www.`, and `api.`


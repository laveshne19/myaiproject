# Add GitHub Secrets for Android AAB Build

The Android release keystore has already been generated for this app. You do NOT need to create a new one.

---

## Step 1 — Add GitHub Secrets

Go to: **https://github.com/laveshne19/myaiproject/settings/secrets/actions/new**

Add these 3 secrets exactly:

| Secret Name | Value |
|---|---|
| `KEYSTORE_BASE64` | *(full contents of `keystore_b64.txt` downloaded from Claude — one long line, no spaces)* |
| `KEYSTORE_PASSWORD` | `fa6Lwd5ensEV` |
| `KEY_PASSWORD` | `fa6Lwd5ensEV` |

The `keystore_b64.txt` file was sent to you as a download by Claude. If you no longer have it, ask Claude to resend it.

---

## Step 2 — Trigger the Android Build

After adding all 3 secrets:

Go to: **https://github.com/laveshne19/myaiproject/actions/workflows/build-android.yml**  
Click **"Run workflow"** → **"Run workflow"**

The AAB file will appear as a downloadable artifact (build takes ~5–8 minutes).

---

## Step 3 — Upload to Play Console

1. Go to **https://play.google.com/console**
2. Create new app → "Shiv AI"
3. Internal Testing → Upload AAB → download `shiv-ai-android-aab.zip` from GitHub Actions artifacts
4. Fill in store listing:
   - App name: **Shiv AI — Talk to Lord Shiva**
   - Short description: Chat with Lord Shiva. Share your problems, seek divine guidance.
   - Category: Lifestyle
   - Content rating: Everyone
5. Publish to Internal Testing first to test the app
6. Then submit for review and publish to Production

---

## Keystore Information (keep this safe forever)

| Field | Value |
|---|---|
| Alias | `my-key-alias` |
| Password | `fa6Lwd5ensEV` |
| SHA-256 Fingerprint | `2E:49:95:E3:CC:00:53:D0:4F:8F:30:38:EB:E0:D4:ED:EC:59:60:ED:0C:1B:3D:A9:42:2E:B4:B1:06:9F:7B:F2` |
| Package name | `in.shivaaionline.twa` |

**Store the keystore file securely — you need it for all future app updates.**

---

## Step 4 — Set Up Supabase (Server-Side User Accounts)

1. Go to **https://supabase.com** → New project (free tier)
2. In the SQL editor, run:

```sql
create table profiles (
  id uuid references auth.users primary key,
  name text,
  avatar text,
  join_date date default current_date
);
alter table profiles enable row level security;
create policy "Users own profile" on profiles for all using (auth.uid() = id);

create table chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  role text not null,
  content text not null,
  created_at timestamptz default now()
);
alter table chats enable row level security;
create policy "Users own chats" on chats for all using (auth.uid() = user_id);
```

3. Go to **Netlify → Site settings → Environment variables** and add:
   - `SUPABASE_URL` → your project URL (e.g. `https://xxxxx.supabase.co`)
   - `SUPABASE_ANON_KEY` → your project's anon/public key (found in Project Settings → API)

4. Redeploy Netlify (or push any small change to trigger auto-deploy).

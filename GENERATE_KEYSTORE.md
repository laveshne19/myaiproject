# Generate Android Keystore & Add GitHub Secrets

Run these 3 steps ONE TIME on your computer (Windows/Mac/Linux with Java installed).

---

## Step 1 — Generate the keystore

Open Terminal / Command Prompt and run:

**Mac/Linux:**
```bash
keytool -genkeypair \
  -alias my-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -keystore shivai-release.keystore \
  -storepass fa6Lwd5ensEV \
  -keypass fa6Lwd5ensEV \
  -dname "CN=Shiv AI, OU=App, O=ShivaaionlineIn, L=India, ST=India, C=IN"
```

**Windows (Command Prompt):**
```cmd
keytool -genkeypair -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000 -keystore shivai-release.keystore -storepass fa6Lwd5ensEV -keypass fa6Lwd5ensEV -dname "CN=Shiv AI, OU=App, O=ShivaaionlineIn, L=India, ST=India, C=IN"
```

This creates a file called `shivai-release.keystore`.

---

## Step 2 — Encode it as base64

**Mac/Linux:**
```bash
base64 -i shivai-release.keystore | tr -d '\n' > keystore_b64.txt
cat keystore_b64.txt
```

**Windows (PowerShell):**
```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("shivai-release.keystore")) | Out-File keystore_b64.txt
Get-Content keystore_b64.txt
```

Copy the full text from `keystore_b64.txt`.

---

## Step 3 — Add these 3 GitHub Secrets

Go to: **https://github.com/laveshne19/myaiproject/settings/secrets/actions/new**

Add each secret exactly:

| Secret Name | Value |
|---|---|
| `KEYSTORE_BASE64` | *(paste full text from keystore_b64.txt)* |
| `KEYSTORE_PASSWORD` | `fa6Lwd5ensEV` |
| `KEY_PASSWORD` | `fa6Lwd5ensEV` |

---

## Step 4 — Trigger the Android Build

After adding all 3 secrets, go to:  
**https://github.com/laveshne19/myaiproject/actions/workflows/build-android.yml**  
Click **"Run workflow"** → **"Run workflow"**

The AAB file will appear as a downloadable artifact (~2 min build).

---

## Step 5 — Upload to Play Console

1. Go to https://play.google.com/console
2. Create new app → "Shiv AI"
3. Internal Testing → Upload AAB → download from GitHub Actions
4. Fill in store listing, screenshots, description
5. Publish to production

---

## IMPORTANT — Keep the keystore file safe

Store `shivai-release.keystore` somewhere safe forever. You need it for all future app updates.

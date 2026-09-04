# 🚀 Quick Start — Get Your CV Live in 15 Minutes

You only need to do **3 things** to get your Digital CV live on the internet.
No coding required — just click, paste, and deploy.

---

## Thing 1: Create GitHub Account + Repository (5 min)

### 1A. Create GitHub Account
1. Open **https://github.com/signup**
2. Enter your email: `4hantrea@gmail.com`
3. Create a password and username
4. Verify your email

### 1B. Create a Personal Access Token
1. Go to **https://github.com/settings/tokens/new**
2. Note: `cv-app-deploy`
3. Expiration: `90 days`
4. Select scope: ✅ **repo** (full control of private repositories)
5. Click **Generate token**
6. ⚠️ **COPY THE TOKEN NOW** — you won't see it again!

### 1C. Create the Repository
1. Go to **https://github.com/new**
2. Repository name: `chantrea-cv-app`
3. Select: **Private** ✅
4. ❌ Do NOT check "Add a README file"
5. Click **Create repository**

---

## Thing 2: Upload Your App to GitHub (5 min)

### Easy Method: Using the Deploy Script

Open Terminal (or Command Prompt) on your computer, navigate to the `cv-app` folder, and run:

```bash
./deploy.sh YOUR_GITHUB_USERNAME YOUR_GITHUB_TOKEN
```

Replace with your actual username and token. For example:
```bash
./deploy.sh chantrea ghp_abc123def456
```

### Manual Method: If the script doesn't work

```bash
cd cv-app
git remote add origin https://github.com/YOUR-USERNAME/chantrea-cv-app.git
git push -u origin main
```

When prompted, use your **Personal Access Token** as the password.

---

## Thing 3: Deploy on Render (5 min)

1. Open **https://render.com**
2. Click **"Get Started"**
3. Sign up using your **GitHub account** ← use the same one!
4. Click **"New +"** in the top right
5. Select **"Web Service"**
6. Find `chantrea-cv-app` in the list and click **Connect**
7. Fill in these settings:

   | Setting | Type This |
   |---------|------------|
   | Name | `chantrea-cv-app` |
   | Runtime | **Node** |
   | Build Command | `npm install` |
   | Start Command | `npm start` |
   | Instance Type | **Free** |

8. Scroll to **Environment Variables** and click **Add**:

   | Key | Value |
   |-----|-------|
   | `ADMIN_PASSWORD` | `Chantrea2024!Secure` |

9. Click **"Create Web Service"** 🎉

Wait 2-3 minutes. Render will build and deploy your app automatically.

---

## ✅ You're Live!

Once Render shows **"Live"** status:

- 🌐 **Your CV**: https://chantrea-cv-app.onrender.com
- 🔧 **Admin Panel**: https://chantrea-cv-app.onrender.com/admin
- 🔑 **Password**: `Chantrea2024!Secure` (or whatever you set)

---

## After First Login — Important!

1. Log into the admin panel
2. Go to **Settings → Export JSON** and save the file
3. Keep this file safe — it's your backup
4. If the app restarts and your changes disappear, use **Import JSON** to restore

---

## Need Help?

| Problem | Solution |
|---------|----------|
| App won't load | Wait 30 seconds — free tier apps sleep when idle |
| Can't log in | Use the ADMIN_PASSWORD you set in Render |
| Changes disappeared | Import your saved JSON backup (Settings → Import) |
| Push rejected | Make sure the GitHub repo exists and token is valid |
| Build failed on Render | Check Render logs — usually a missing file |

---

*Made for Chantrea MEAS — IT Manager, Luxury Hospitality, Phnom Penh*
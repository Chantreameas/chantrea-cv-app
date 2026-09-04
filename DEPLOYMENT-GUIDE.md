# 🚀 Deploy Your Digital CV App to Render (Free Hosting)

This guide will walk you through deploying your CV app to **Render.com** — a free cloud hosting platform that supports Node.js applications with HTTPS and automatic deployment from GitHub.

---

## ⚠️ Important: How Free Cloud Hosting Works

Render's **free tier** has an **ephemeral filesystem** — this means:

- ✅ Your app runs live on the internet with a real URL
- ✅ HTTPS is automatic
- ✅ Deploys automatically when you push to GitHub
- ⚠️ **Files reset on every deploy or restart** — your edits via the admin panel will be lost after a restart
- 💡 **Solution**: Use the Export/Import feature in the admin panel to save your changes as JSON, then import them back after a restart

---

## Step 1: Create a GitHub Account & Repository

1. Go to [github.com](https://github.com) and sign up (if you don't have an account)
2. Click **"New repository"** (the + icon in the top right)
3. Name it `chantrea-cv-app`
4. Make it **Private** (recommended — your CV data stays private)
5. Click **Create repository**

---

## Step 2: Upload Your App to GitHub

### Option A: Using GitHub Desktop (Easiest for Non-Technical Users)

1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in with your GitHub account
3. Clone your new repository to your computer
4. Copy ALL the files from the `cv-app` folder into the cloned repository folder
5. In GitHub Desktop, you'll see the changes listed
6. Write a commit message like "Initial CV app"
7. Click **Commit** then **Push origin**

### Option B: Using Git Command Line

```bash
# Navigate to the cv-app folder
cd cv-app

# Initialize git
git init
git add .
git commit -m "Initial CV app"

# Add your GitHub remote (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/chantrea-cv-app.git
git branch -M main
git push -u origin main
```

---

## Step 3: Create a Render Account & Deploy

1. Go to [render.com](https://render.com) and click **"Get Started"**
2. Sign up using your **GitHub account** (this makes it easy to connect)
3. Click **"New +"** in the top right
4. Select **"Web Service"**
5. Find and select your `chantrea-cv-app` repository
   - If you don't see it, click **"Configure account"** and grant access
6. Fill in the deployment settings:

   | Setting | Value |
   |---------|-------|
   | **Name** | `chantrea-cv-app` |
   | **Runtime** | Node |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

7. Scroll down to **Environment Variables** and add:

   | Key | Value |
   |-----|-------|
   | `ADMIN_PASSWORD` | Choose a strong password (e.g., `Chantrea2024!Secure`) |

8. Click **"Create Web Service"** 🎉

Render will now build and deploy your app. This takes about 2-3 minutes.

---

## Step 4: Access Your Live CV

Once deployed, Render gives you a URL like:
```
https://chantrea-cv-app.onrender.com
```

- **Your CV**: `https://chantrea-cv-app.onrender.com/`
- **Admin Panel**: `https://chantrea-cv-app.onrender.com/admin`
- **Password**: The one you set in the `ADMIN_PASSWORD` environment variable

---

## Step 5: Customize Your CV Content

1. Go to `https://chantrea-cv-app.onrender.com/admin`
2. Enter your password (the `ADMIN_PASSWORD` you set)
3. Edit any section using the left sidebar
4. Click **Save** after each section
5. **IMPORTANT**: After editing, go to **Settings → Export JSON** to download a backup
6. Visit your live CV to see the changes instantly

---

## 🔄 How to Persist Your Changes Across Restarts

Since the free tier resets files, here's your workflow:

1. **Edit** your CV content in the admin panel
2. **Export** the data (Settings → Export JSON) → saves `cv-data.json` to your computer
3. **To make changes permanent**: Update the defaults in `server.js` (the `getDefaultData()` function) with your new data, push to GitHub, and Render auto-redeploys
4. **Quick restore**: After a restart, import the JSON backup (Settings → Import JSON)

### Making Edits Permanent (Recommended)

If you've edited your CV and want those changes to survive restarts:

1. Export the JSON from the admin panel
2. Open the exported `cv-data.json` file
3. Copy the entire content
4. Open `server.js` and find the `getDefaultData()` function
5. Replace the `return { ... }` with your updated data
6. Commit and push to GitHub
7. Render will auto-redeploy with your new defaults

---

## 🔧 Updating Your App

Any time you push changes to your GitHub repository, Render automatically redeploys:

```bash
# Make changes to files...
git add .
git commit -m "Updated CV content"
git push
```

Render detects the push and redeploys within 1-2 minutes.

---

## 💡 Tips & Troubleshooting

### App goes to sleep
- Free tier apps **sleep after 15 minutes of inactivity**
- First request after sleep takes ~30 seconds to wake up
- This is normal — just wait a moment

### Can't log in
- Make sure you're using the `ADMIN_PASSWORD` you set in Render's environment variables
- If you changed the password in the admin panel, it only lasts until the next restart
- Always set your permanent password in Render → Environment → ADMIN_PASSWORD

### Changes disappeared
- This means the app restarted (which resets files on free tier)
- Import your saved JSON backup via Settings → Import JSON
- To make changes permanent, update `getDefaultData()` in `server.js` and push to GitHub

### Photo doesn't show after restart
- Photos are stored as base64 in the data JSON — they survive as long as the data file survives
- If the data resets, the default photo (empty) will show
- Re-upload your photo and export the JSON to keep a backup

### Custom domain
- Free tier doesn't support custom domains
- Your URL will be `your-app-name.onrender.com`
- Choose a professional name when creating the service (e.g., `chantrea-meas-cv`)

---

## 📊 Free Tier Limits

| Feature | Limit |
|---------|-------|
| Runtime | 750 hours/month (enough for 1 app 24/7) |
| RAM | 512 MB |
| Disk | Ephemeral (resets on restart) |
| Sleep | After 15 min inactivity |
| Custom domain | Not available |
| Bandwidth | 100 GB/month |

---

## 🛡️ Security Notes

1. **Set a strong ADMIN_PASSWORD** in Render environment variables
2. **Make your GitHub repo private** so your code isn't public
3. The CV page itself is public (that's the point!) — only the admin panel needs protection
4. Never commit `auth.json` or `cv-data.json` with sensitive data to GitHub (they're in `.gitignore`)

---

## ✅ Quick Deployment Checklist

- [ ] GitHub account created
- [ ] Repository created (`chantrea-cv-app`)
- [ ] App files pushed to GitHub
- [ ] Render account created (via GitHub sign-in)
- [ ] Web Service created on Render
- [ ] `ADMIN_PASSWORD` environment variable set
- [ ] App deployed successfully
- [ ] Live CV URL works
- [ ] Admin panel login works
- [ ] CV content customized and exported as backup

---

**Your live CV URL will be:** `https://YOUR-APP-NAME.onrender.com`

**Need help?** Check the [Render documentation](https://render.com/docs) or reach out to your IT network.

---

*Built with ❤️ for Chantrea MEAS — IT Manager, Luxury Hospitality*
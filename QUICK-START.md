# ⚡ Go Live in 3 Minutes

Your code is already on GitHub: **https://github.com/Chantreameas/chantrea-cv-app**

## One-Click Deploy

1. Open this link (it reads `render.yaml` automatically):

   👉 **https://render.com/deploy?repo=https://github.com/Chantreameas/chantrea-cv-app**

2. Sign in to Render — choose **"Sign in with GitHub"** (free, no card needed).
3. Render shows a Blueprint page with the service `chantrea-cv-app` already configured
   (Node, free plan, `npm install`, `npm start`).
4. It will ask you for one value:

   | Variable | What to enter |
   |----------|---------------|
   | `ADMIN_PASSWORD` | Any strong password you'll remember — this is your admin login |

5. Click **Apply / Create Resources**. Wait ~2–3 minutes for the build.

## Your URLs

After the build turns green:

- **Public CV:** `https://chantrea-cv-app.onrender.com`
- **Admin panel:** `https://chantrea-cv-app.onrender.com/admin`
- **Login:** the `ADMIN_PASSWORD` you typed in step 4

(If the name is taken, Render appends a suffix — the exact URL is shown at the top of your service page.)

## Good to Know

- **First visit after idle is slow.** Free services sleep after ~15 minutes of no traffic and take ~30 seconds to wake. Normal.
- **Back up your edits.** The free plan has no permanent disk, so admin-panel changes reset when the service restarts. After editing, go to **Settings → Export JSON** and keep the file. Restore with **Import JSON**.
- **To make edits permanent**, paste your exported data into the `getDefaultData()` function in `server.js`, then commit and push — Render redeploys automatically.
- **Every `git push` redeploys.** No extra steps.

## Changing Your Admin Password Later

Render dashboard → your service → **Environment** → edit `ADMIN_PASSWORD` → **Save**. The service restarts with the new password.

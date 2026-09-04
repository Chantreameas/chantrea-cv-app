# 🏨 Chantrea MEAS — Digital CV App

A stunning, interactive digital CV with a full admin panel — built for **Chantrea MEAS**, IT Manager in the luxury hospitality industry, Phnom Penh Cambodia.

## ✨ Features

- 🌟 **Dynamic CV Frontend** — Animated hero, skill bars, timeline, particle effects, custom cursor
- 🔐 **Admin Panel** — Full CRUD editor for every CV section
- 📸 **Photo Upload** — Profile photo with auto-resize (stored as base64 for cloud compatibility)
- 🛡️ **Authentication** — Token-based auth with environment variable support
- ☁️ **Cloud-Ready** — Works on Render free tier (ephemeral filesystem safe)
- 📱 **Responsive** — Works on desktop, tablet, and mobile
- 🖨️ **Print-friendly** — Clean print layout for PDF export
- 📤 **Export/Import** — Backup and restore CV data as JSON

## 🚀 Quick Start (Local)

```bash
npm install
npm start
```

- **CV**: http://localhost:3000
- **Admin**: http://localhost:3000/admin
- Password is auto-generated on first run (shown in console)

## ☁️ Cloud Deployment

See **[DEPLOYMENT-GUIDE.md](./DEPLOYMENT-GUIDE.md)** for step-by-step instructions to deploy on Render (free).

### Environment Variables

| Variable | Description | Default |
|----------|-------------|--------|
| `PORT` | Server port | 3000 |
| `ADMIN_PASSWORD` | Admin login password | Auto-generated |
| `RENDER` | Auto-detected on Render | — |

### How Cloud Mode Works

When deployed on Render (`RENDER=1`), the app:
- Stores data in `/tmp` (ephemeral but writable)
- Reads `ADMIN_PASSWORD` from environment variables
- Stores photos as base64 data URLs in the JSON (no file dependency)
- Auto-seeds default data on every startup

**Tip**: Use the Export/Import feature to persist your changes across restarts.

## 📁 Project Structure

```
cv-app/
├── server.js           # Express API + auth + CRUD
├── package.json        # Dependencies
├── render.yaml         # Render blueprint
├── .gitignore          # Git exclusions
├── .node-version       # Node.js version
├── DEPLOYMENT-GUIDE.md # Step-by-step deploy guide
├── public/
│   ├── cv.html         # Dynamic CV frontend
│   └── admin.html      # Admin panel
└── data/               # Local data (auto-created)
    └── cv-data.json    # CV content (seeded from defaults)
```

## 🛠 Tech Stack

- **Backend**: Express.js, Multer (file upload), Sharp (image resize, optional)
- **Frontend**: Vanilla HTML/CSS/JS, Google Fonts (Inter + Playfair Display)
- **Auth**: Token-based with environment variable support
- **Hosting**: Render.com free tier

## 📝 License

Personal project for Chantrea MEAS. All rights reserved.

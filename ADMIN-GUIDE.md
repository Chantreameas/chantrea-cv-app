# 📝 Updating Your CV Content — Admin Panel Guide

A plain-language walkthrough for editing every part of your digital CV. No coding required.

---

## 1. Signing In

1. Open your admin panel:
   - **Live site:** `https://chantrea-cv-app.onrender.com/admin`
   - **On your own computer:** `http://localhost:3000/admin`
2. Type your password and press **Enter** (or click **Sign In**).
   - On the live site this is the `ADMIN_PASSWORD` you entered when deploying.
   - Running locally, the password is printed in the terminal the first time you start the app.
3. You stay signed in on that browser until you click **Logout** or the server restarts.

If the page says *Invalid password*, double-check for stray spaces or a caps-lock slip. To look up or change the live password: Render dashboard → your service → **Environment** → `ADMIN_PASSWORD`.

---

## 2. How the Panel Works

The left sidebar lists the ten sections of your CV. Click one to open its editor.

| Section | What it controls |
|---------|------------------|
| 👤 Personal Info | Photo, name, job title, summary, about text, contact details |
| 📊 Stats | The four big numbers on the profile section |
| 🛠 Skills | Skill groups with progress bars, plus technology tags |
| 💼 Experience | Your job history timeline |
| 🎓 Education | Degrees and studies |
| 🏅 Certifications | Professional certificates |
| 🏆 Achievements | Highlighted project cards |
| 🌍 Languages | Languages with proficiency dots |
| 🔗 Social Links | Footer icons and links |
| ⚙️ Settings | Password, export and import |

**Three rules that apply everywhere:**

- **Each section saves separately.** Click the gold **💾 Save** button at the top right before switching sections, or your typing is lost.
- **A green toast means it worked.** "Saved!" appears bottom-right. A red toast means something failed — try again.
- **Changes appear instantly** on the public CV. Use **👁 Preview CV** to open it in a new tab.

---

## 3. Personal Information

### Profile photo

Click **Choose File** under Profile Photo and pick an image. It uploads immediately — you don't need to press Save for the photo itself.

- Accepted: JPG, PNG, WebP, GIF — max 5 MB
- The image is cropped to a square and resized to 400×400, so pick a photo where your face is roughly centred
- Portrait shots with plain backgrounds look best against the dark theme

### Text fields

| Field | Tips |
|-------|------|
| First / Last Name | Shown as the big heading; initials also become the site logo |
| Job Title | Appears in gold caps under your name. Keep it short — around 40 characters |
| Summary | The paragraph on the opening screen. Two or three sentences reads best |
| About Paragraphs | **One paragraph per line.** Press Enter to start a new paragraph — do not leave blank lines between them |
| Email / Phone / Location | Shown on both the profile cards and the contact section |
| LinkedIn URL | Paste the full address including `https://` |
| Availability | Short status line, e.g. "Open to opportunities" |
| Specialization | Short focus line, e.g. "Luxury Hotel IT" |

Click **💾 Save** when finished.

---

## 4. Stats

These are the four animated numbers under your profile.

- **Value** must be a plain number (`10`, `99`, `500`) — the counting animation needs it
- **Suffix** is the character after the number, usually `+` or `%`
- **Label** is the caption underneath, e.g. "Years Experience"
- **+ Add Stat** adds another; the **✕** button removes one

Four stats fit the layout neatly. More than six starts to look crowded on phones.

---

## 5. Skills

### Skill groups

Each group is one card on the CV.

1. **Category** is the card heading, e.g. "Infrastructure & Security"
2. **Icon** is a single emoji — paste one in (🏨 🔧 💡 🔒 ☁️)
3. Inside each group, every skill has a **name** and a **level from 0 to 100**, which becomes the length of the gold bar
4. **+ Add Skill** adds a row to that group; **+ Add Skill Category** adds a whole new card

On honest levels: keep your strongest skills in the 90s and reserve 100 for nothing. A page where every bar is full reads as marketing rather than information.

### Technology tags

The rounded chips below the skill cards. Type a name in the box and press **Enter** (or click **Add**). Click the **×** on a chip to delete it. Twelve to eighteen tags fill the row nicely.

---

## 6. Experience

Your timeline, newest first.

| Field | Example |
|-------|---------|
| Date Range | `2021 — Present` |
| Job Title | `IT Manager` |
| Company · Location | `The Royal Palace Hotel & Resort · Phnom Penh` |
| Bullet Points | One achievement per bullet |

- **+ Add Bullet** adds a line; **✕** next to a bullet removes it
- **↑ ↓** reorder positions — keep the most recent job at the top
- **✕** in the item header deletes the whole position

Four to six bullets per role works well. Lead with the outcome and include a number where you have one: *"Led migration to Opera Cloud, cutting check-in time 60%"* lands harder than *"Responsible for PMS migration."*

---

## 7. Education

One card per qualification: **Year**, **Degree**, **School**, and a short **Description** for your GPA, focus area, or thesis. Two or three entries is plenty.

---

## 8. Certifications

Compact two-line cards.

- **Certification Name** — e.g. `ITIL v4 Foundation`
- **Organization · Year** — e.g. `Axelos / PeopleCert · 2022`

Using the `Organisation · Year` pattern consistently keeps the grid tidy. Six entries fills the layout evenly.

---

## 9. Achievements

The project cards that tilt when you hover over them — the most persuasive part of the page.

| Field | Guidance |
|-------|----------|
| Icon | One emoji, e.g. 🏗️ 🔒 🌐 🤖 |
| Title | Name the project, not the task: "Full PMS Cloud Migration" |
| Description | Two or three sentences: the problem, what you did, the measurable result |
| Tags | Technologies or methods used — type and press Enter |

Four cards is the sweet spot: enough to show range, few enough that each gets read.

---

## 10. Languages

For each language, enter the **name** and a **level** label (`Native`, `Fluent`, `Intermediate`, `Conversational`), then **click the dots** to set proficiency from one to five. The dots you click turn gold.

A useful convention: 5 = native, 4 = fluent/professional, 3 = intermediate, 2 = conversational, 1 = basic.

---

## 11. Social Links

The icon row in the footer. Each entry needs an **emoji icon**, a **label** (the tooltip on hover), and a **URL**.

Use full addresses:

- LinkedIn — `https://www.linkedin.com/in/your-profile/`
- Email — `mailto:4hantrea@gmail.com`
- WhatsApp — `https://wa.me/85586860986`
- Telegram — `https://t.me/yourusername`

Delete any link you don't use rather than leaving `#` in place — a dead icon looks unfinished.

---

## 12. Settings

### Changing your password

Enter a new password (minimum six characters) and click **Update Password**.

**On the live site this is temporary.** The free hosting plan resets to the `ADMIN_PASSWORD` environment variable whenever the service restarts. To change it permanently: Render dashboard → your service → **Environment** → edit `ADMIN_PASSWORD` → **Save**.

### Export and import

- **⬇️ Export JSON** downloads your entire CV as `cv-data.json`
- **⬆️ Import JSON** uploads a saved file and replaces everything

---

## 13. Protecting Your Edits — Read This One

The free hosting plan has no permanent storage. Your edits live in temporary memory and **disappear whenever the service restarts** — which happens after periods of inactivity and on every deploy.

**So make this a habit: after any editing session, click Export JSON.** It takes two seconds and it's your only safety net.

### Restoring after a reset

Open the admin panel → **Settings** → **Import JSON** → choose your saved file. Everything comes back, photo included.

### Making your changes truly permanent

When you're happy with the content and want it to survive every restart, bake it into the code:

1. Export the JSON and open the file in a text editor
2. Open `server.js` and find the function `getDefaultData()`
3. Replace the object it returns with your exported data
4. Commit and push:
   ```bash
   git add server.js
   git commit -m "Update CV content"
   git push
   ```
5. Render redeploys automatically in a minute or two, and your content is now the permanent baseline

---

## Troubleshooting

**My changes vanished.** The service restarted. Import your JSON backup, then consider baking the content into `server.js` as above.

**Nothing happens when I click Save.** Your session expired. Reload the page, sign in again, and redo that section.

**The photo upload fails.** The file is over 5 MB or isn't an image. Resize it or export it as a JPG.

**The public CV shows old content.** Your browser cached it. Hard-refresh with `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac).

**The site takes 30 seconds to load.** Normal on the free plan — the service was asleep and is waking up. Only the first visit after an idle period is slow.

**A number stat shows `NaN`.** The Value field contains something other than digits. Move `+` or `%` into the Suffix field.

---

## Suggested Routine

1. Sign in to the admin panel
2. Edit one section, click **Save**, confirm the green toast
3. Repeat for other sections
4. Click **👁 Preview CV** and read the result on both desktop and your phone
5. **Settings → Export JSON** — keep the file somewhere safe
6. Click **Logout** when you're done on a shared computer

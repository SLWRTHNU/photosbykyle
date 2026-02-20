# photosbykyle.ca — Deployment Guide

## Your Files

```
photosbykyle/
├── index.html        ← Homepage
├── food.html         ← Food portfolio
├── branding.html     ← Branding portfolio
├── services.html     ← Services page
├── process.html      ← The Process page
├── contact.html      ← Contact form (with Netlify Forms)
├── netlify.toml      ← Netlify config (auto-detected)
├── css/
│   └── style.css     ← All shared styles
└── js/
    └── main.js       ← All shared JavaScript
```

---

## Step 1 — Deploy to Netlify (Free)

### Option A: Drag & Drop (Easiest)

1. Go to **https://netlify.com** and create a free account
2. From the dashboard, look for the **"Deploy manually"** section
3. **Drag the entire `photosbykyle` folder** onto that drop zone
4. Netlify will deploy and give you a temporary URL like `random-name-123.netlify.app`
5. Test it — everything should work including the contact form

### Option B: GitHub (Best for ongoing updates)

1. Create a free account at **https://github.com**
2. Create a new repository called `photosbykyle`
3. Upload all files (drag and drop into the GitHub interface works)
4. In Netlify, choose **"Import from Git"** → connect GitHub → select your repo
5. Leave all build settings blank (no build command needed for static HTML)
6. Click Deploy

Option B is better long-term because to update the site you just update the file on GitHub and Netlify redeploys automatically.

---

## Step 2 — Connect Your Domain

### If your domain is registered through Wix:
You have two options:
- **Transfer the domain out** to a registrar like Namecheap (~$12/yr for .ca)
- **Point DNS to Netlify** while keeping it registered at Wix (easier, no transfer needed)

### To point DNS to Netlify (while keeping domain at Wix):
1. In Netlify: Go to **Site Settings → Domain Management → Add custom domain**
2. Type `photosbykyle.ca` and click Verify
3. Netlify will show you two nameserver addresses like:
   - `dns1.p01.nsone.net`
   - `dns2.p01.nsone.net`
4. Log into Wix → Domains → your domain → **Advanced DNS Settings**
5. Change the nameservers to the ones Netlify gave you
6. Wait 24–48 hours for DNS to propagate worldwide

### SSL/HTTPS:
Netlify provides free SSL via Let's Encrypt — it activates automatically once your domain is connected. Nothing to do.

---

## Step 3 — Verify Contact Form

The contact form uses **Netlify Forms** — it's completely free (up to 100 submissions/month).

To verify it's working:
1. After deploying, go to your live site → Contact page
2. Submit a test message
3. In Netlify dashboard → **Forms** → you should see the submission

To get email notifications for new submissions:
1. Netlify Dashboard → Forms → your form → **Form notifications**
2. Add your email address
3. You'll get an email every time someone fills out the form

---

## Making Updates

### To update text or content:
Open the relevant `.html` file in any text editor (VS Code is great — free from https://code.visualstudio.com), make your changes, save, and re-upload/push.

### To update styles (colours, fonts, spacing):
Edit `css/style.css`

### To add new photos to the gallery:
In `food.html` or `branding.html`, find the `<div class="full-grid">` section and add a new `grid-item` block following the same pattern. Replace the image URLs with your actual Wix image URLs (or upload images directly to your host).

### To eventually host your own images (recommended):
Right now the site loads images from Wix's CDN — this works but Wix could theoretically change URLs in future. Eventually you can:
1. Download your photos from Wix
2. Create an `images/` folder in your project
3. Upload photos there
4. Update the `src` attributes in the HTML

---

## Monthly Cost Summary

| Item                    | Cost            |
|-------------------------|-----------------|
| Netlify hosting         | **$0/month**    |
| Netlify forms (100/mo)  | **$0/month**    |
| SSL certificate         | **$0/month**    |
| photosbykyle.ca domain  | ~$15–20/year    |
| **Total**               | **~$1.50/mo**   |

vs. Wix which runs $17–35/month depending on your plan.

---

## Need Help?

If anything breaks or you want to make changes, just ask Claude — paste the relevant HTML/CSS and describe what you want changed. The file structure is intentionally simple so edits are easy to make.

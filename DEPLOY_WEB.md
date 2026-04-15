# Deploy Palm2Pay Web to Vercel

## Quick Deploy (5 minutes)

### Step 1: Push to GitHub

Open your terminal and run:

```bash
cd "C:\Users\suhayl sekander\Downloads\PALM2PAY"

git init
git add .
git commit -m "Palm2Pay Web - Ready for Vercel"
git remote add origin https://github.com/su763/palm2pay.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to **https://vercel.com**
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Select your **palm2pay** repository
5. **Root Directory**: `apps/web`
6. Click **"Deploy"**

### Step 3: Get Your Link!

After deployment (2-3 minutes), you'll get a link like:

```
https://palm2pay-abc123.vercel.app
```

Share this with your friends! 🎉

---

## What's Included

✅ Landing page with hero section
✅ "How It Works" features
✅ Security section
✅ **Interactive demo** - click through payment flow
✅ Responsive design (works on mobile)
✅ Smooth animations

---

## Troubleshooting

### Build Failed

In Vercel settings:
- **Framework Preset**: Next.js
- **Build Command**: `cd apps/web && npm run build`
- **Output Directory**: `.next`
- **Install Command**: `cd apps/web && npm install`

### Still Failing?

1. Delete the project on Vercel
2. Re-import the repository
3. Make sure Root Directory is `apps/web`

---

## Update After Changes

After making changes:

```bash
git add .
git commit -m "Updated Palm2Pay"
git push
```

Vercel will automatically redeploy!

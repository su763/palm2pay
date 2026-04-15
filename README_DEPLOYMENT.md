# 🚀 Quick Deploy Guide

## Get Your Shareable Link in 5 Minutes!

### Step 1: Push to GitHub (2 min)

Open your terminal and run:

```bash
cd "C:\Users\suhayl sekander\Downloads\PALM2PAY"

git init
git add .
git commit -m "Palm2Pay - Biometric Payment System"

# Then create a repo at github.com and push:
git remote add origin https://github.com/YOUR_USERNAME/palm2pay.git
git push -u origin main
```

### Step 2: Deploy to Vercel (2 min)

1. Go to **[vercel.com](https://vercel.com)**
2. Sign up with GitHub
3. Click **"Add New Project"**
4. Select your `palm2pay` repository
5. Set **Root Directory** to `apps/web`
6. Click **"Deploy"**

That's it! Vercel will give you a URL like:
```
https://palm2pay-xxx.vercel.app
```

### Step 3: Share with Friends! 🎉

Copy your Vercel URL and share it with your friends!

---

## Full Deployment (Backend + Frontend)

For a fully working app with payments, you'll also need to deploy the backend:

### Deploy Backend to Render

1. Go to **[render.com](https://render.com)**
2. Click **New +** → **Web Service**
3. Connect your GitHub repo
4. Configure:
   - **Name**: palm2pay-api
   - **Root Directory**: `packages/api`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

5. Add a **PostgreSQL** database (New + → PostgreSQL)
6. Add environment variables from `.env.example`

### Update Vercel

In Vercel project settings, add:
```
API_URL=https://your-api.onrender.com
```

Then redeploy.

---

## URLs You'll Get

| Service | URL Format |
|---------|------------|
| Web App | `https://palm2pay-xxx.vercel.app` |
| Merchant | `https://palm2pay-merchant-xxx.vercel.app` |
| API | `https://palm2pay-api.onrender.com` |

---

## Need Help?

See full instructions in `DEPLOYMENT.md`

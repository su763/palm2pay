# Deploy Palm2Pay to the Cloud

Follow these steps to deploy Palm2Pay and get a shareable link for your friends!

---

## Option 1: Deploy to Vercel + Render (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git repo
cd "C:\Users\suhayl sekander\Downloads\PALM2PAY"
git init
git add .
git commit -m "Initial Palm2Pay commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/palm2pay.git
git push -u origin main
```

### Step 2: Deploy Web Apps to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure for **Web App**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Environment Variables**:
     - `API_URL`: (will add after Render deployment)
5. Deploy!
6. Repeat for **Merchant Dashboard**:
   - **Root Directory**: `apps/merchant`

### Step 3: Deploy Backend to Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:

**API Service:**
- Name: `palm2pay-api`
- Region: Oregon
- Branch: main
- Root Directory: `packages/api`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment: Node

**Biometric Service:**
- Name: `palm2pay-biometric`
- Region: Oregon
- Root Directory: `packages/biometric`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
- Environment: Python

5. Add a **PostgreSQL Database**:
   - New → PostgreSQL
   - Name: `palm2pay-db`
   - Copy the connection string

6. Add a **Redis** instance:
   - New → Redis
   - Name: `palm2pay-redis`

### Step 4: Configure Environment Variables

In Render, for the API service, add these env vars:

```
DATABASE_URL=postgresql://... (from your PostgreSQL)
REDIS_URL=redis://... (from your Redis)
JWT_SECRET=your-random-secret-key
ENCRYPTION_KEY=your-32-character-random-key
BIOMETRIC_SERVICE_URL=https://palm2pay-biometric.onrender.com
BIOMETRIC_API_KEY=your-random-api-key
```

### Step 5: Update Vercel Environment Variables

Go back to Vercel and update:
```
API_URL=https://palm2pay-api.onrender.com
```

### Step 6: Redeploy

Redeploy all services to apply changes.

---

## Your Shareable Links

After deployment, you'll get:

| Service | Example URL |
|---------|-------------|
| Web App | `https://palm2pay-web.vercel.app` |
| Merchant Dashboard | `https://palm2pay-merchant.vercel.app` |
| API | `https://palm2pay-api.onrender.com` |

**Share the Web App URL with your friends!**

---

## Option 2: Deploy to Railway (Alternative)

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your Palm2Pay repository
4. Railway will auto-detect the Docker Compose setup
5. Add environment variables from `.env.example`
6. Deploy!

Railway will give you a URL like: `https://palm2pay-production.up.railway.app`

---

## Option 3: Quick Demo with ngrok (Temporary)

For quick testing (2-hour sessions):

```bash
# Install ngrok
npm install -g ngrok

# Run your app locally
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# Expose to internet
ngrok http 3000
ngrok http 4000
```

You'll get temporary URLs like: `https://abc123.ngrok.io`

---

## Tips for Sharing

1. **Create a demo account** - Pre-populate a test user your friends can use
2. **Record a demo video** - Use Loom or screen recording to show how it works
3. **Add a landing page** - The web app already has one!
4. **Mobile app** - For iOS/Android, use TestFlight or Google Play beta testing

---

## Troubleshooting

### Cold Starts on Free Tier
Render/Railway free tier has cold starts. First request may take 30-50 seconds.

### Database Migrations
Run the init SQL script after deploying PostgreSQL:
```bash
psql $DATABASE_URL -f infrastructure/docker/init.sql
```

### Environment Variables
Make sure all services have correct URLs pointing to each other.

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Railway Docs: https://docs.railway.app

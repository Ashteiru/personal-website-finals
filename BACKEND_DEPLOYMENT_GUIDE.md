# Backend Deployment Guide

## Current Issue: Network Error

You're getting a "Network Error" because the frontend is trying to connect to:
```
https://personal-website-finals-backend-4ezjh60jz.vercel.app
```

But this backend might not be deployed yet or the URL is incorrect.

## Solution Options:

### Option 1: Deploy Backend to Vercel (Recommended)

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel
   ```
   
3. **Get the deployment URL** from Vercel (it will look like: `https://your-backend-xxx.vercel.app`)

4. **Update frontend .env file** with the correct backend URL:
   ```
   VITE_API_URL=https://your-actual-backend-url.vercel.app
   ```

5. **Add environment variables to Vercel backend project:**
   - Go to Vercel Dashboard → Your Backend Project → Settings → Environment Variables
   - Add these variables:
     - `SUPABASE_URL` = `https://ysyqsnuomkszwrkqxaar.supabase.co`
     - `SUPABASE_KEY` = (your service role key from backend/.env)
     - `FRONTEND_URL` = `https://personal-website-finals-alpha.vercel.app`
     - `NODE_ENV` = `production`

6. **Redeploy backend** after adding environment variables:
   ```bash
   vercel --prod
   ```

7. **Redeploy frontend** with updated .env:
   ```bash
   vercel --prod
   ```

### Option 2: Test Locally First

1. **Run backend locally:**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

2. **Update frontend .env to use localhost:**
   ```
   VITE_API_URL=http://localhost:3001
   ```

3. **Run frontend locally:**
   ```bash
   cd ..
   npm run dev
   ```

## Checking Backend Deployment Status

Visit your backend URL in the browser:
```
https://personal-website-finals-backend-4ezjh60jz.vercel.app
```

**If deployed successfully:** You should see some JSON response or message
**If NOT deployed:** You'll see "404: NOT_FOUND" or connection timeout

## Verifying Environment Variables

The backend logs will show on startup:
```
=================================================
🚀 Starting NestJS Backend Server...
=================================================
Supabase URL: ✓ Configured
Supabase Key: ✓ Configured
=================================================
```

If you see ❌ instead of ✓, the environment variables are not set in Vercel.

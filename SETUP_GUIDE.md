# 🚀 Complete Setup Guide

Follow these steps to get your Fallout-themed portfolio up and running!

## 📋 Table of Contents

1. [Initial Setup](#1-initial-setup)
2. [Supabase Configuration](#2-supabase-configuration)
3. [Local Development](#3-local-development)
4. [Adding Your Content](#4-adding-your-content)
5. [Deployment](#5-deployment)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Initial Setup

### Step 1.1: Verify Installation
Check that you have the required software:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version

# Check git
git --version
```

If missing, install from:
- **Node.js**: https://nodejs.org/
- **Git**: https://git-scm.com/

### Step 1.2: Clone & Install

The repository should already be cloned. Now install dependencies:

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

---

## 2. Supabase Configuration

### Step 2.1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click **"New Project"**
3. Fill in:
   - **Name**: `ashteiru-portfolio` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"** (takes ~2 minutes)

### Step 2.2: Get Your Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJhbG...` (long string)
   - **service_role key**: `eyJhbG...` (different long string)

### Step 2.3: Setup Database

1. In Supabase, go to **SQL Editor**
2. Click **"New Query"**
3. Open the file `supabase-schema.sql` from your project
4. Copy the entire SQL content
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (bottom right)
7. You should see: "Success. No rows returned"

### Step 2.4: Verify Table Creation

1. Go to **Table Editor** in Supabase
2. You should see a table called `guestbook`
3. Click on it to verify the structure (id, name, email, message, created_at)

### Step 2.5: Configure Environment Variables

#### Frontend (.env)

1. In your project root, copy the example:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbG...your_anon_key_here
   VITE_API_URL=http://localhost:3001
   ```

#### Backend (backend/.env)

1. In the backend folder:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `backend/.env`:
   ```env
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=eyJhbG...your_service_role_key_here
   PORT=3001
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

⚠️ **Important**: Use `service_role` key for backend, `anon` key for frontend!

---

## 3. Local Development

### Step 3.1: Start the Backend

Open a terminal:

```bash
cd backend
npm run start:dev
```

You should see:
```
🚀 Backend server running on port 3001
✓ Supabase client initialized
```

Keep this terminal open!

### Step 3.2: Start the Frontend

Open a **NEW** terminal (keep backend running):

```bash
# From project root
npm run dev
```

You should see:
```
  VITE v5.1.5  ready in XXX ms

  ➜  Local:   http://localhost:3000/
```

### Step 3.3: Open in Browser

1. Open http://localhost:3000
2. You should see your Fallout-themed portfolio!
3. Check if the guestbook section loads

---

## 4. Adding Your Content

### Step 4.1: Add Your Profile Photo

1. Find a good photo of yourself (400x400px recommended)
2. Save it as `profile.jpg`
3. Place it in `/public/assets/images/profile.jpg`
4. Refresh your browser

### Step 4.2: Update Your Information

Edit `/src/components/CharacterSheet.vue`:

1. Find the `data()` section (around line 67)
2. Update the `character` object:

```javascript
character: {
  name: 'YOUR FULL NAME',
  age: 'YOUR AGE',
  sex: 'MALE/FEMALE',
  role: 'Your Job Title',
  status: 'AVAILABLE FOR MISSIONS',
  experience: {
    total: 'X YEARS',
    specific: 'X YEARS',
    roleType: 'YOUR SPECIALTY'
  },
  // Continue updating...
}
```

3. Save the file (frontend will auto-reload)

### Step 4.3: Update Skills & Attributes

In the same file, update:

- `attributes` array (around line 78)
- `skills` array (around line 87)
- `perks` array (around line 99)

Match them to your actual experience!

### Step 4.4: Update Contact Information

Edit `/src/components/Footer.vue`:

1. Update your social links (around line 8)
2. Update email address
3. Update any other personal info

---

## 5. Deployment

### Step 5.1: Prepare for Deployment

1. Test everything locally first
2. Make sure guestbook works (try posting a message)
3. Verify your info is correct
4. Check mobile responsiveness (use Chrome DevTools)

### Step 5.2: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio setup"

# Push to GitHub
git push origin main
```

### Step 5.3: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon key
   - `VITE_API_URL`: (Leave empty for now, update after backend deploy)
6. Click **"Deploy"**

### Step 5.4: Deploy Backend to Vercel

1. In Vercel, click **"Add New..."** → **"Project"** again
2. Select same repository
3. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm install && npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variables:
   - `SUPABASE_URL`: Your Supabase URL
   - `SUPABASE_KEY`: Your **service_role** key (not anon!)
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: Your frontend Vercel URL
5. Click **"Deploy"**

### Step 5.5: Update Frontend with Backend URL

1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` to your backend Vercel URL:
   - Example: `https://your-backend.vercel.app`
4. Redeploy frontend (Deployments → click "..." → Redeploy)

### Step 5.6: Test Production

1. Visit your frontend URL
2. Try posting a guestbook message
3. Verify it saves and displays correctly
4. Test on mobile device

---

## 6. Troubleshooting

### Issue: "Failed to fetch messages"

**Cause**: Supabase not configured or wrong credentials

**Fix**:
1. Check `.env` files have correct URLs and keys
2. Verify Supabase project is running
3. Check browser console for specific errors

### Issue: "CORS Error"

**Cause**: Backend not allowing frontend origin

**Fix**:
1. Check `backend/.env` has correct `FRONTEND_URL`
2. Restart backend server after changing .env
3. In production, verify Vercel environment variables

### Issue: Images not showing

**Cause**: Images not in correct folder

**Fix**:
1. Ensure images are in `/public/assets/images/`
2. Check file names match code (case-sensitive)
3. Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Issue: "Module not found"

**Cause**: Dependencies not installed

**Fix**:
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### Issue: Port already in use

**Cause**: Another app using port 3000 or 3001

**Fix**:
```bash
# Find and kill process (Windows)
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# Or change port in vite.config.js or backend/.env
```

### Issue: Guestbook messages not saving

**Cause**: Database table not created or RLS policies wrong

**Fix**:
1. Re-run `supabase-schema.sql` in Supabase SQL Editor
2. Check Table Editor shows `guestbook` table
3. Verify Row Level Security policies are created

---

## 🎉 You're Done!

Your Fallout-themed portfolio is now live! 

### Next Steps:

- Share your URL with friends
- Add to your resume/LinkedIn
- Keep updating with new skills and projects
- Monitor guestbook for messages

### Need Help?

- Check the main `README.md`
- Review code comments
- Contact: asgarcia@student.apc.edu.ph

---

**War... War never changes. But your career can!** ☢️

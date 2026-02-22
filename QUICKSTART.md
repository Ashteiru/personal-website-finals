# 🎮 Quick Start Commands

## First Time Setup

```bash
# 1. Install frontend dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. Setup environment files
cp .env.example .env
cp backend/.env.example backend/.env

# 4. Edit .env files with your Supabase credentials
# Then continue with development
```

## Development

### Start Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Then open http://localhost:3000

### Individual Commands

#### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

#### Backend
```bash
cd backend
npm run start:dev    # Development mode with hot-reload
npm run build        # Build TypeScript
npm run start:prod   # Production mode
```

## Deployment

### Push to GitHub
```bash
git add .
git commit -m "Your message"
git push origin main
```

### Deploy to Vercel

**Frontend:**
1. Import repo on Vercel
2. Set environment variables (see .env.example)
3. Deploy

**Backend:**
1. Create new Vercel project
2. Set Root Directory to `backend`
3. Set environment variables
4. Deploy

Full deployment guide: See [SETUP_GUIDE.md](SETUP_GUIDE.md)

## Updating Your Content

1. **Profile Photo**: Add to `/public/assets/images/profile.jpg`
2. **Personal Info**: Edit `/src/components/CharacterSheet.vue`
3. **Contact Links**: Edit `/src/components/Footer.vue`
4. **Colors/Theme**: Edit `/src/assets/styles.css`

## Database Setup

```bash
# 1. Create Supabase project at https://app.supabase.com
# 2. Run SQL from supabase-schema.sql in SQL Editor
# 3. Update .env files with your credentials
```

## Common Issues

**Port 3000 in use?**
```bash
# Kill port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**Dependencies out of sync?**
```bash
# Reinstall everything
rm -rf node_modules backend/node_modules
npm install
cd backend && npm install
```

## Need Help?

- 📖 Full Setup: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- 📚 Documentation: [README.md](README.md)
- 📧 Contact: asgarcia@student.apc.edu.ph

---

**"War never changes, but your code should."** ☢️

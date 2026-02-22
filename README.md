# 🎮 Ashteiru Portfolio - Fallout Edition

A **Fallout-inspired personal portfolio website** featuring a character sheet design, built with modern web technologies and full-stack capabilities.

![Status](https://img.shields.io/badge/Status-Available%20for%20Missions-brightgreen)
![Vue.js](https://img.shields.io/badge/Vue.js-3.4-4FC08D?logo=vue.js)
![NestJS](https://img.shields.io/badge/NestJS-10.0-E0234E?logo=nestjs)
![Supabase](https://img.shields.io/badge/Supabase-Enabled-3ECF8E?logo=supabase)

## 📋 Features

### ✨ Core Features
- **Fallout RPG-Style Design** - Terminal aesthetic with scanlines and CRT effects
- **Character Sheet Profile** - S.P.E.C.I.A.L. attributes and skill system
- **Interactive Guestbook** - Real-time comments with Supabase integration
- **REST API Backend** - NestJS server with GET/POST endpoints
- **Responsive Design** - Optimized for mobile and desktop
- **Modern Stack** - Vue.js 3, NestJS, Supabase
- 

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- Vercel account (for deployment)

### 1. Clone the Repository
```bash
git clone https://github.com/Ashteiru/personal-website-finals.git
cd personal-website-finals
```

### 2. Setup Frontend
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your Supabase credentials
# VITE_SUPABASE_URL=your_project_url
# VITE_SUPABASE_ANON_KEY=your_anon_key

# Run development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### 3. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
# SUPABASE_URL=your_project_url
# SUPABASE_KEY=your_service_role_key
# PORT=3001

# Run development server
npm run start:dev
```

Backend API will be available at `http://localhost:3001`

### 4. Setup Supabase Database

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Go to SQL Editor
4. Run the SQL from `supabase-schema.sql`
5. Copy your project URL and keys to `.env` files

## 📁 Project Structure

```
personal-website-finals/
├── public/                     # Static assets
│   └── assets/
│       └── images/            # Your photos go here
│           └── profile.jpg    # Main profile photo
├── src/                       # Vue.js source code
│   ├── components/           
│   │   ├── Header.vue        # Site header
│   │   ├── CharacterSheet.vue # Main profile
│   │   ├── Attributes.vue    # S.P.E.C.I.A.L. stats
│   │   ├── Skills.vue        # Skills list
│   │   ├── Guestbook.vue     # Interactive guestbook
│   │   └── Footer.vue        # Site footer
│   ├── assets/
│   │   └── styles.css        # Global Fallout-themed styles
│   ├── App.vue               # Root component
│   └── main.js               # App entry point
├── backend/                   # NestJS backend
│   ├── src/
│   │   ├── guestbook/        # Guestbook module
│   │   │   ├── guestbook.controller.ts  # REST endpoints
│   │   │   ├── guestbook.service.ts     # Business logic
│   │   │   └── guestbook.module.ts      # Module definition
│   │   ├── app.module.ts     # Root module
│   │   └── main.ts           # Server entry point
│   ├── package.json
│   └── vercel.json           # Backend deployment config
├── .env.example              # Environment template
├── package.json              # Frontend dependencies
├── vite.config.js            # Vite configuration
├── vercel.json               # Frontend deployment config
└── supabase-schema.sql       # Database schema
```

## 🖼️ Adding Your Images

Place your images in `/public/assets/images/`:

- **profile.jpg** - Your main profile photo (recommended: 400x400px)
- **background.webp** - Optional background image
- Use online tools to convert images to optimized formats

## 🎨 Customization

### Update Your Information

Edit `/src/components/CharacterSheet.vue`:

```javascript
character: {
  name: 'YOUR NAME',
  age: 'XX',
  role: 'Your Role/Title',
  // ... update all fields
}
```

### Modify Skills & Attributes

In `CharacterSheet.vue`, update the `attributes` and `skills` arrays with your own data.

### Change Colors

Edit CSS variables in `/src/assets/styles.css`:

```css
:root {
  --primary-green: #00ff41;   /* Main accent color */
  --secondary-green: #00cc33;
  --bg-dark: #0a0a0a;
}
```

## 🌐 API Endpoints

### Backend REST API

**Base URL**: `http://localhost:3001/api`

#### Get All Messages
```http
GET /api/guestbook
```

Response:
```json
{
  "success": true,
  "data": [...],
  "count": 10
}
```

#### Create Message
```http
POST /api/guestbook
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Great portfolio!"
}
```

Response:
```json
{
  "success": true,
  "message": "Message created successfully",
  "data": {...}
}
```

## 🚢 Deployment

### Deploy Frontend to Vercel

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository
4. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_API_URL` (your backend URL)
5. Deploy!

### Deploy Backend to Vercel

1. In Vercel, create a new project
2. Point to the `/backend` folder
3. Add environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `FRONTEND_URL`
4. Deploy!

### Alternative: Deploy Backend to Render

1. Go to [Render Dashboard](https://render.com)
2. Create new Web Service
3. Connect repository, point to `/backend`
4. Build command: `npm install && npm run build`
5. Start command: `npm run start:prod`
6. Add environment variables
7. Deploy!

## 🧪 Testing

### Frontend
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Backend
```bash
cd backend
npm run start:dev     # Development mode with hot reload
npm run start:prod    # Production mode
```

## 📊 Database Schema

```sql
guestbook (
  id: BIGSERIAL PRIMARY KEY
  name: VARCHAR(50) NOT NULL
  email: VARCHAR(100) NULLABLE
  message: TEXT NOT NULL (max 500 chars)
  created_at: TIMESTAMP WITH TIME ZONE
)
```

## 🛠️ Technologies Used

### Frontend
- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next-generation build tool
- **Supabase Client** - Real-time database client

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Typed JavaScript
- **Supabase** - PostgreSQL database

### Deployment
- **Vercel** - Frontend & backend hosting
- **Supabase** - Database hosting

## 📝 License

This project is open source and available for personal and educational use.

## 👤 Author

**Ashton Brian S. Garcia**
- LinkedIn: [ashton-brian-s-garcia](https://www.linkedin.com/in/ashton-brian-s-garcia-445783384/)
- GitHub: [@Ashteiru](https://github.com/Ashteiru)
- Email: asgarcia@student.apc.edu.ph

---

**Built with** ☢️ **by a Vault Dweller** | Inspired by the Fallout Universe

# Aegis | Disaster Emergency Guidance & Support AI

A production-ready full-stack disaster response and emergency preparedness web application. Aegis combines real-time Gemini AI assistance with interactive life-safety tools: verified disaster action guides, critical first-aid protocols, offline-first family safety plans, dynamic emergency kit checklists, and official emergency hotline directories.

---

## ⚠️ Security Notice

> **CRITICAL SECURITY RULE:**  
> Never commit `.env` or `.env.local` to Git or GitHub.  
> Your `GEMINI_API_KEY` must remain strictly on the backend server. The React frontend never has access to, nor does it bundle, your secret API key.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy the template file `.env.example` to create your local `.env.local` file:

```bash
cp .env.example .env.local
```

### 3. Add Your Gemini API Key
Open `.env.local` and configure your credentials:

```env
GEMINI_API_KEY="your-key-here"
GEMINI_MODEL="gemini-3.6-flash"
PORT=3000
```
> Obtain a Gemini API key at [Google AI Studio](https://aistudio.google.com/).

### 4. Run Locally in Development Mode
To run both the Express backend and the Vite React frontend with live hot-reloading:

```bash
npm run dev
```

- Frontend runs at: `http://localhost:5173`
- Backend API runs at: `http://localhost:3000`
- API calls to `/api/*` are automatically proxied from Vite to the Express backend.

### 5. Build for Production
To build the optimized Vite frontend bundle and compile the TypeScript Express backend:

```bash
npm run build
```

This compiles:
- Frontend assets into `dist/client/`
- Backend server bundle into `dist/server.js`

### 6. Run the Production Server
```bash
npm start
```
The unified Express server will listen on port 3000, serving the static frontend and handling all `/api/chat` and `/api/health` requests.

---

## 🌐 Deploying to Vercel

The application is structured for zero-config Vercel deployment:
- Entry point `server.ts` is placed at the project root and exports the Express `app` (`export default app`).
- No complicated or unnecessary `vercel.json` configurations are required.
- The build script (`npm run build`) builds both frontend and backend.

### Deployment Steps:

1. **Push your code to GitHub** (verify that `.env.local` is ignored and NOT pushed).
2. Go to your [Vercel Dashboard](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. **Configure Environment Variables** in the Vercel project settings:
   - Name: `GEMINI_API_KEY`
   - Value: `your-real-gemini-api-key`
   - *(Optional)* Name: `GEMINI_MODEL`
   - Value: `gemini-3.6-flash`
5. Click **Deploy**. Vercel will run `npm run build` and automatically route requests to the Express server.

---

## 🛡️ Core Features

- **Real Gemini AI Chat**:
  - Direct communication through backend with `@google/genai` official SDK.
  - Life-safety system instruction emphasizing concise, numbered, actionable survival steps.
  - Natural greeting detection and situational emergency triage.
  - Multi-language support (English, Hindi, Spanish, Bengali, Tamil, Telugu, Marathi).
  - Speech Synthesis (Text-to-Speech) for hands-free audio listening in urgent moments.
  - One-click copy and quick situational prompt buttons.
  - Honest error handling: clear JSON errors if API key is invalid or unavailable (no simulated responses).
- **Emergency Dashboard**:
  - Real calculated readiness score dynamically derived from packed kit items and completed safety plan data (zero fake statistics).
  - Instant crisis triage pills to trigger AI guidance in one tap.
- **Disaster Action Guides**:
  - Detailed Before, During, and After protocols for:
    - 🔥 Fire (Kitchen, structural, wildfires)
    - 🌎 Earthquake (Drop, Cover, Hold On)
    - 🌊 Flood & Flash Flood (Turn Around Don't Drown)
    - 🌀 Cyclone & Hurricane (Eye of the storm safety, high-wind shelter)
    - ⛈️ Severe Weather & Thunderstorms (Lightning crouch, surge safety)
    - 🚗 Road Accidents (Scene safety, triage, spinal precautions)
  - Critical DO NOT safety warnings.
- **First Aid Protocols**:
  - Educational guidance for CPR (hands-only and AED), Severe Bleeding, Choking (Heimlich), Burns, Fractures, and Fainting.
  - Prominent emergency disclaimers directing life-threatening trauma to 112.
- **Emergency Contacts**:
  - India National Emergency Number **112** highlighted with one-tap dialing.
  - Official helplines: Fire (101), Ambulance (102/108), Disaster Helpline NDMA (1078), Women Helpline (1091), Highway Emergency (1033).
  - Ability to add and save local personal/family emergency contacts stored on-device.
- **Family Safety Plan**:
  - 100% confidential and stored strictly in browser `localStorage`.
  - Predetermined meeting points, evacuation refuge address, out-of-town contact, family medical roster.
  - One-click print / PDF export to post on home bulletin boards or keep in go-bags.
- **Instant SOS Modal**:
  - Rapid one-tap access to 112 and urgent emergency checklists from anywhere in the app.

---

## 📡 API Endpoints

### `GET /api/health`
Checks server and deployment status.
```json
{
  "status": "ok"
}
```

### `POST /api/chat`
Sends user emergency queries and conversation history to Gemini.
```json
// Request
{
  "message": "There is a fire in my kitchen",
  "history": [],
  "language": "English"
}

// Response
{
  "reply": "1. Evacuate everyone from the kitchen immediately..."
}
```

---

## 📁 Project Structure

```
disaster-emergency-guidance/
├── src/
│   ├── components/
│   │   ├── AIChat.tsx             # Real-time Gemini AI chat interface
│   │   ├── Dashboard.tsx          # Real dynamic readiness score & supply tracker
│   │   ├── DisasterGuides.tsx     # 6 Disaster types with Before/During/After phases
│   │   ├── EmergencyContacts.tsx  # 112 & official hotlines with personal contacts
│   │   ├── FamilySafetyPlan.tsx   # Local offline-first family safety plan & print
│   │   ├── FirstAid.tsx           # Educational medical emergency steps
│   │   ├── Navbar.tsx             # Responsive header with SOS trigger
│   │   └── SOSModal.tsx           # Emergency overlay with one-tap 112 calling
│   ├── data/
│   │   ├── disasterGuides.ts      # Comprehensive disaster protocol data
│   │   ├── emergencyContacts.ts   # Official national emergency numbers & kit items
│   │   └── firstAidData.ts        # First-aid procedures & life-safety guidelines
│   ├── App.tsx                    # Main layout and tab coordinator
│   ├── index.css                  # Tailwind CSS styling and emergency animations
│   ├── main.tsx                   # React root entry point
│   └── types.ts                   # Unified TypeScript interfaces
├── server.ts                      # Express backend with Google GenAI SDK
├── package.json                   # Build and development scripts
├── tsconfig.json                  # Frontend TypeScript configuration
├── tsconfig.server.json           # Backend TypeScript configuration
├── vite.config.ts                 # Vite config with /api proxy to port 3000
├── tailwind.config.js             # Tailwind theme configuration
├── postcss.config.js              # PostCSS plugins
├── index.html                     # HTML root template
├── .gitignore                     # Git ignore rules (.env, dist, node_modules)
├── .env.example                   # Safe environment variable template
└── README.md                      # Documentation
```

# Credarsh (Zerodha Clone) Deployment Guide

This guide walks you through deploying the complete Credarsh platform into production.

---

## 🏗️ Architecture Overview

The system consists of three distinct services:

| Component | Technology | Recommended Host | Production URL Example |
| :--- | :--- | :--- | :--- |
| **Backend** | Node.js / Express / MongoDB | **Render** / **Railway** | `https://credarsh-api.onrender.com` |
| **Frontend** | React (SPA) | **Vercel** / **Netlify** | `https://credarsh.vercel.app` |
| **Dashboard** | React (Kite UI SPA) | **Vercel** / **Netlify** | `https://credarsh-dashboard.vercel.app` |

---

## 🔑 Environment Variables Matrix

### 1. Backend (`backend/`)
Configure these variables in your hosting provider's dashboard (e.g., Render Environment settings):

| Key | Description | Example Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Sets production mode (enables secure cookies and reverse proxy) | `production` |
| `PORT` | Port Express listens on (auto-injected by Render/Railway/Heroku) | `3002` or auto |
| `MONGO_URL` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/zerodha?retryWrites=true&w=majority` |
| `FRONTEND_URL` | Public URL of the frontend landing/auth application | `https://credarsh.vercel.app` |
| `DASHBOARD_URL` | Public URL of the Kite trading dashboard | `https://credarsh-dashboard.vercel.app` |
| `ALLOWED_ORIGINS` | Comma-separated list of any additional allowed origins (optional) | `https://mycustomdomain.com` |

> [!NOTE]
> `backend/package.json` contains:
> - `"start": "node index.js"` (production start command)
> - `"dev": "nodemon index.js"` (local development)

---

### 2. Frontend (`frontend/`)
Configure these in Vercel/Netlify build environment settings:

| Key | Description | Example Value |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | Base URL of deployed backend (without trailing slash) | `https://credarsh-api.onrender.com` |
| `REACT_APP_DASHBOARD_URL` | Base URL of deployed Kite dashboard | `https://credarsh-dashboard.vercel.app` |

---

### 3. Dashboard (`dashboard/`)
Configure these in Vercel/Netlify build environment settings:

| Key | Description | Example Value |
| :--- | :--- | :--- |
| `REACT_APP_API_URL` | Base URL of deployed backend (without trailing slash) | `https://credarsh-api.onrender.com` |
| `REACT_APP_FRONTEND_URL` | Base URL of deployed frontend landing page | `https://credarsh.vercel.app` |

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Prepare MongoDB Atlas (Database)
1. Log into your [MongoDB Atlas Console](https://cloud.mongodb.com/).
2. Navigate to **Network Access** in the sidebar.
3. Click **Add IP Address** and select **Allow Access from Anywhere** (`0.0.0.0/0`).
   *(Required because cloud platforms like Render/Railway/Vercel allocate dynamic outbound IPs).*
4. Navigate to **Database Access** and verify your database user has read/write permissions to the `zerodha` database.
5. Copy your connection URI (`mongodb+srv://...`).

---

### Step 2: Deploy Backend to Render

1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New + > Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name**: `credarsh-backend` (or your choice)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. In the **Environment Variables** section, add:
   - `NODE_ENV` = `production`
   - `MONGO_URL` = `<your_mongodb_atlas_connection_string>`
   - `FRONTEND_URL` = `<your_frontend_url>` *(can be updated after Step 3)*
   - `DASHBOARD_URL` = `<your_dashboard_url>` *(can be updated after Step 4)*
5. Click **Create Web Service**.
6. Once deployed, test the health check route:
   `https://<your-backend-url>/health`
   Should return:
   ```json
   {
     "status": "ok",
     "environment": "production",
     "timestamp": "2026-09-06T..."
   }
   ```

---

### Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New... > Project**.
2. Select your repository.
3. In **Project Settings**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click edit and select `frontend`
4. Expand **Environment Variables** and add:
   - `REACT_APP_API_URL` = `https://<your-render-backend-url>`
   - `REACT_APP_DASHBOARD_URL` = `https://<your-dashboard-url>` *(or temporary placeholder until step 4)*
5. Click **Deploy**.
6. Once deployed, copy your production frontend URL (e.g. `https://credarsh.vercel.app`).

---

### Step 4: Deploy Dashboard to Vercel

1. In [Vercel Dashboard](https://vercel.com/dashboard), click **Add New... > Project**.
2. Select the same repository.
3. In **Project Settings**:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: Click edit and select `dashboard`
4. Expand **Environment Variables** and add:
   - `REACT_APP_API_URL` = `https://<your-render-backend-url>`
   - `REACT_APP_FRONTEND_URL` = `https://<your-frontend-url-from-step-3>`
5. Click **Deploy**.
6. Once deployed, copy your production dashboard URL (e.g. `https://credarsh-dashboard.vercel.app`).

---

### Step 5: Final Cross-Linking Update
1. Update `FRONTEND_URL` and `DASHBOARD_URL` in **Render (Backend)** environment variables with the actual Vercel URLs.
2. If you used temporary placeholders in Step 3 for `REACT_APP_DASHBOARD_URL`, update it in Vercel and redeploy `frontend`.

---

## 🔒 Authentication & Cross-Domain Cookies

- The backend automatically configures:
  - `trust proxy`: Enabled in production for HTTPS forwarding.
  - `sameSite: "none"` + `secure: true`: Enables cross-domain cookies between Vercel and Render.
  - Axios interceptors in both frontend and dashboard automatically attach `Authorization: Bearer <sessionId>` and `x-session-id: <sessionId>` as fallbacks to guarantee authentication even if browser third-party cookies are blocked by default.

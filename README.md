<div align="center">

# 📈 Credarsh — Zerodha & Kite Full-Stack Clone

An enterprise-grade, full-stack clone of India's premier discount broking platform **Zerodha** and its high-performance trading dashboard **Kite**. Built with the modern MERN stack, featuring real-time portfolio tracking, order placement, dynamic analytics charts, and robust session authentication.

[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_%26_Mongoose_9-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Chart.js](https://img.shields.io/badge/Charts-Chart.js_%26_React--Chartjs-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)
[![Material UI](https://img.shields.io/badge/UI-MUI_Icons_%26_Material-007FFF?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Features](#-key-features) • [Architecture](#-project-architecture) • [Getting Started](#-getting-started) • [Environment Variables](#-environment-variables) • [API Reference](#-api-endpoints) • [Deployment](#-deployment)

</div>

---

## 🌟 Key Features

### 🏢 1. Credarsh Landing & Marketing Portal (`frontend`)
- **Pixel-Perfect UI**: Faithfully replicates Zerodha's clean, minimalist aesthetic with responsive navigation and fast page loads.
- **Product Suite Showcase**: Dedicated landing pages for Zerodha Universe, Kite, Console, Coin, and Varsity.
- **Interactive Brokerage Calculator**: Real-time fee breakdowns for Equity Delivery, Intraday, F&O, and Currency trades.
- **Support & Ticket Desk**: Searchable help topics and instant ticket creation workflows.
- **Integrated User Onboarding**: Seamless registration and login flows connecting directly to trading accounts.

### 📊 2. Kite Trading Dashboard (`dashboard`)
- **Live Market Watchlist**: Search, filter, and track real-time stock quotes with dynamic price indicators.
- **Order Execution Modal**: Buy and Sell action windows with quantity and limit price inputs, custom mode toggles, and instant order routing.
- **Order Book**: Real-time order ledger displaying active and filled orders with 1-click cancellation.
- **Holdings & Positions Tracking**: Detailed portfolio breakdown with P&L analysis, Net ROI, and Day changes.
- **Interactive Financial Visualizations**:
  - Vertical Bar Charts for stock performance metrics.
  - Doughnut Charts displaying portfolio asset allocation.
- **Funds & Margins View**: Available cash margins, used collateral, and balance management.
- **Apps & Integrations Center**: Categorized directory for algorithmic trading tools, screener integrations, and API keys.

### 🔐 3. Security & Authentication Architecture (`backend`)
- **Password Security**: Salted hash encryption using `bcryptjs` (cost factor: 10).
- **Dual-Channel Session Layer**:
  - Secure, HTTP-only session cookies with dynamic `SameSite` and HTTPS attributes.
  - `Bearer` Authorization token fallback for cross-origin environments and restrictive browsers.
- **Production CORS**: Strict origin whitelisting with wildcard support for local dev and cloud previews.
- **Reverse Proxy Ready**: `trust proxy` enabled for deployment behind Cloudflare, Render, AWS, and Railway.

---

## 🏗️ Project Architecture

```
Zerodha Clone/
├── backend/                  # Node.js & Express REST API
│   ├── middleware/           # Auth & session verification middlewares
│   ├── model/                # Mongoose schemas (Users, Orders, Holdings, Positions, Sessions)
│   ├── schemas/              # Joi / validation schemas
│   ├── index.js              # Server entry point, routes, CORS & MongoDB connection
│   ├── package.json          # Dependencies & deployment scripts
│   ├── .env.example          # Backend environment variables blueprint
│   └── .env                  # Local environment file (git-ignored)
│
├── frontend/                 # Customer-facing marketing & onboarding app
│   ├── public/               # Static assets, logos & favicon
│   ├── src/
│   │   ├── landing_page/     # Modular pages: home, about, pricing, products, signup, support
│   │   ├── utils/            # Auth storage & session hooks
│   │   ├── config.js         # Centralized API & Dashboard URL resolution
│   │   └── index.js          # React router setup
│   ├── vercel.json           # SPA rewrites for Vercel
│   └── .env.example          # Frontend environment variables blueprint
│
├── dashboard/                # Kite trading web terminal
│   ├── public/               # Trading icons, charts metadata
│   ├── src/
│   │   ├── components/       # WatchList, Orders, Holdings, Positions, Funds, TopBar, Menu
│   │   ├── data/             # Market mock feeds and watchlist seeds
│   │   ├── config.js         # Centralized API & Frontend URL resolution
│   │   └── index.js          # Router & global Axios interceptors
│   ├── vercel.json           # SPA rewrites for Vercel
│   └── .env.example          # Dashboard environment variables blueprint
│
├── DEPLOYMENT.md             # Production cloud deployment guide (Render + Vercel)
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: `v9.0.0` or higher
- **MongoDB**: A free [MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas) or local MongoDB instance

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/DivyanshuTripathi1/Credarsh.git
cd Credarsh
```

---

### Step 2: Configure & Start the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create your `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Fill in your MongoDB connection string in `.env`:
   ```env
   PORT=3002
   NODE_ENV=development
   MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/zerodha?retryWrites=true&w=majority
   FRONTEND_URL=http://localhost:3001
   DASHBOARD_URL=http://localhost:3000
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start listening at `http://localhost:3002`.*

---

### Step 3: Configure & Start the Frontend (Landing Page)

1. Open a new terminal and navigate to `frontend`:
   ```bash
   cd frontend
   npm install
   ```
2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Ensure the environment variables point to your local backend and dashboard:
   ```env
   REACT_APP_API_URL=http://localhost:3002
   REACT_APP_DASHBOARD_URL=http://localhost:3000
   ```
4. Start the frontend:
   ```bash
   npm start
   ```
   *The frontend will launch at `http://localhost:3001` (or `3000`).*

---

### Step 4: Configure & Start the Dashboard (Kite)

1. Open a new terminal and navigate to `dashboard`:
   ```bash
   cd dashboard
   npm install
   ```
2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```
3. Ensure the environment variables point to your local backend and frontend:
   ```env
   REACT_APP_API_URL=http://localhost:3002
   REACT_APP_FRONTEND_URL=http://localhost:3001
   ```
4. Start the dashboard:
   ```bash
   npm start
   ```
   *The dashboard will launch at `http://localhost:3000` (or `3001`).*

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
| Key | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `PORT` | API port | `3002` | `3002` (or auto-assigned) |
| `NODE_ENV` | Environment mode | `development` | `production` |
| `MONGO_URL` | MongoDB connection URI | Atlas URI | Atlas URI |
| `FRONTEND_URL` | Landing page URL | `http://localhost:3001` | `https://credarsh.vercel.app` |
| `DASHBOARD_URL` | Kite terminal URL | `http://localhost:3000` | `https://credarsh-dashboard.vercel.app` |
| `ALLOWED_ORIGINS` | Extra CORS origins | `""` | `https://customdomain.com` |

### Frontend (`frontend/.env`)
| Key | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3002` | `https://credarsh-api.onrender.com` |
| `REACT_APP_DASHBOARD_URL` | Kite dashboard URL | `http://localhost:3000` | `https://credarsh-dashboard.vercel.app` |

### Dashboard (`dashboard/.env`)
| Key | Description | Default (Local) | Production Example |
| :--- | :--- | :--- | :--- |
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:3002` | `https://credarsh-api.onrender.com` |
| `REACT_APP_FRONTEND_URL` | Landing page URL | `http://localhost:3001` | `https://credarsh.vercel.app` |

---

## 📡 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/health` | Service health status & uptime check | ❌ |
| `POST` | `/signup` | Create new trading account and initiate session | ❌ |
| `POST` | `/login` | Authenticate credentials & create session | ❌ |
| `POST` | `/logout` | Terminate session & clear cookies | ❌ |
| `GET` | `/me` | Get active user profile and session data | ✅ |
| `GET` | `/check-auth` | Verify current session validity | ✅ |
| `GET` | `/allHoldings` | Retrieve long-term portfolio stock holdings | ✅ |
| `GET` | `/allPositions`| Retrieve active intraday & F&O positions | ✅ |
| `GET` | `/allOrders` | Retrieve user order book history | ✅ |
| `POST` | `/newOrder` | Submit buy/sell order | ✅ |
| `DELETE` | `/deleteOrder/:id`| Cancel an active order by ID | ✅ |

---

## 🧪 Testing

Both client applications come with automated test suites using Jest and React Testing Library.

```bash
# Run Frontend Tests
cd frontend
npm test -- --watchAll=false

# Run Dashboard Tests
cd dashboard
npm test -- --watchAll=false
```

---

## 🌐 Deployment

This project is pre-configured for instant zero-configuration deployment:
- **Backend**: Ready for **[Render](https://render.com/)** or **[Railway](https://railway.app/)** with `npm start` (`node index.js`).
- **Frontend & Dashboard**: Ready for **[Vercel](https://vercel.com/)** or **[Netlify](https://www.netlify.com/)** with built-in SPA redirect rules (`vercel.json` & `_redirects`).

👉 For a step-by-step walkthrough, check out the comprehensive [DEPLOYMENT.md](DEPLOYMENT.md) guide.

---

## 👨‍💻 Author

**Divyanshu Tripathi**  
- GitHub: [@DivyanshuTripathi1](https://github.com/DivyanshuTripathi1)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

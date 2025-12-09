
# ⚔ Territory War — Real-Time Strategy Multiplayer Game

A real-time territory capture game built using **Node.js**, **Express**, **Socket.IO**, **MongoDB**, and **Vite React**.  
Players start with randomly assigned bases on a 30x30 grid, gather resources, build armies (Infantry, Archer, Cavalry, Siege), and fight to dominate the map.

---

## 🚀 Tech Stack

| Category | Technology |
|---------|-----------|
Backend | Node.js, Express, Socket.IO |
Frontend | Vite + React |
Database | MongoDB Atlas (BSON/JSON) |
Auth | JWT Authentication |
Email | Nodemailer (verification, notifications) |
Version Control | GitHub (PR workflow, branches) |

---

## 📦 Project Structure


war-territory-game/
├── server/         # Backend
└── client/         # Frontend


---

## 🛠 Setup Instructions

### 1. Clone the Repository
git clone https://github.com/<username>/war-territory-game.git
cd war-territory-game

### 2. Backend Setup
cd server
npm install

### 3. Environment Configuration

Create `.env` inside `/server`:

MONGO_URI=your-mongo-connection-string
JWT_SECRET=your-secret-key
EMAIL_USER=your-email
EMAIL_PASS=your-email-password


Use the `.env.example` as reference.

### 4. Start Backend
npm run dev

Default port: **3000**

---

## 🎨 Frontend Setup


cd ../client
npm install
npm run dev


Runs on default **Vite dev server**.

---

## 🧩 Git Workflow

### Branch Strategy


main        → production ready
dev         → integration branch
feature/*   → new features & tasks


### Creating a new feature branch


git checkout dev
git pull
git checkout -b feature/<feature-name>


### Submitting work


git add .
git commit -m "Description of update"
git push -u origin feature/<feature-name>


Then open a **Pull Request to `dev`**.

---

## 📌 Project Features (Planned)

| Feature                          | Status     |
| -------------------------------- | ---------- |
| User Auth + Email Verification   | 🟡 Planned |
| 30x30 Map Grid                   | 🟡 Planned |
| Real-time Tile Capture           | 🟡 Planned |
| Resource Generation              | 🟡 Planned |
| Army Units & Battle Engine       | 🟡 Planned |
| Real-time Chat                   | 🟡 Planned |
| Offline Battle Summary via Email | 🟡 Planned |
| Deployment (Render / Vercel)     | 🟡 Planned |

---

## 📅 Development Roadmap

| Phase | Goal                                  |
| ----- | ------------------------------------- |
| 1     | Repo setup & database connection      |
| 2     | Auth system + email                   |
| 3     | Map system + socket real-time updates |
| 4     | Resource & unit mechanics             |
| 5     | Battle system                         |
| 6     | Chat, alliances, ranking              |
| 7     | UI polish + Deployment                |

---

## 🤝 Contribution Guidelines

* Commit frequently and clearly
* PRs must be reviewed before merge
* Do not push directly to `main`
* Do not commit `.env` or secrets

---

## 📄 License

MIT License — free to use and modify.

---

## 💬 Contact / Collaboration

For suggestions, improvements or issues → open an Issue ticket in the repository.


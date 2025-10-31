# 🏛️ ARCHIVIEW – 3D Architecture Model Repository
## 📌 Overview

ARCHIVIEW is a full-stack 3D architectural visualization platform that enables users to upload, view, and interact with 3D architectural models (.glb files) directly in the web browser.
It provides an immersive experience for architects, designers, and enthusiasts to explore architectural projects in a visually rich and interactive environment.

## Project video Link :
https://youtu.be/EBkB5JMIVYM

## Repository Link :
https://github.com/kanyas03/3D_ARCHIVIEW-Models/tree/main


## ✨ Key Features

- 🌐 3D Model Upload: Upload .glb format models with titles and descriptions.

- 🧠 Interactive 3D Viewer: Explore models in real time — rotate, zoom, and pan using WebGL & Three.js (via React Three Fiber).

- 🗂 Model Management: Secure storage in MongoDB with Multer for file uploads.

- 🏗 Architecture Gallery: Beautifully categorized views — Luxury Villa, Corporate Tower, Urban Apartment, etc.

- ⚙️ Backend Integration: Node.js + Express.js server handles uploads, retrieval, and API endpoints.

- 💾 Database: MongoDB stores metadata (title, description, file path, and type).

- 🎨 Frontend: React.js + Tailwind CSS + Framer Motion for smooth, modern UI animations.



## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```
git clone git@github.com:kanyas03/3D_Architecture_ARCHIVIEW-.git
cd 3D_Architecture_ARCHIVIEW-
```


### 2️⃣ Backend Setup
```
cd backend
npm install
```



### Start the backend server:
```

npm start

```

🖥 Backend runs at: http://localhost:8009


### 3️⃣ Frontend Setup
```
cd ../frontend
npm install
npm run dev
```
💻 Frontend runs at: http://localhost:5173

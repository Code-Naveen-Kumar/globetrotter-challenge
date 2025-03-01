# 🌍 The Globetrotter Challenge – The Ultimate Travel Guessing Game! 🧩

The **Globetrotter Challenge** is a fun and interactive **full-stack web application** where players receive **cryptic clues** about famous destinations and must guess the correct city. It includes **real-time scoring, fun fact reveals, animations**, and a **Challenge a Friend** feature for social gameplay.

---

## 🚀 **Live Demo**
## **Frontend**
🔗 https://client-c0it6nxty-code-naveen-kumars-projects.vercel.app 

## **Backend**
🔗 https://globetrotter-challenge.onrender.com

---

## 🎯 **Features**
✅ **AI-Enhanced Dataset** – Over 100+ destinations with clues, fun facts, and trivia.  
✅ **Multiple-Choice Gameplay** – Users guess destinations from given clues.  
✅ **Instant Feedback** – 🎉 **Confetti animation for correct answers**, 😢 **Shake effect for incorrect answers**.  
✅ **Score Tracking** – Players can track their scores after each round.  
✅ **"Challenge a Friend" Mode** – Generates an invite link to play against friends.  
✅ **Responsive & Interactive UI** – Engaging animations and smooth navigation.  

---

## 🛠️ **Tech Stack**
### **Frontend (React.js)**
- **React.js** (Vite) – Fast & modern framework  
- **React Router** – For page navigation  
- **Axios** – API requests  
- **Framer Motion & Confetti** – For animations  
- **CSS (Tailwind/Custom CSS)** – Enhanced styling  

### **Backend (Node.js & Express)**
- **Express.js** – Backend API  
- **MongoDB (Mongoose)** – Stores game data  
- **Cors & Dotenv** – Security & environment variables  

---

## 📂 **Project Structure**
globetrotter/ 
│── backend/ # Backend server files 
│ ├── server.js # Express API & database connection 
│ ├── models/City.js # Mongoose model for destinations 
│ ├── routes/gameRoutes.js # API routes for game logic 
│ │── client/ # Frontend React app 
│ ├── src/ 
│ │ ├── components/ # UI components (Header, ClueCard, ScoreBoard, etc.) 
│ │ ├── pages/ # Main pages (Home, Game, Challenge) 
│ │ ├── styles/ # CSS files for styling 
│ │ ├── App.jsx # Main app file with navigation 
│ │ ├── main.jsx # React entry point 
│ │── .env # Environment variables 
│── package.json # Project dependencies 
│── README.md # Documentation (You are here!) 
│── scraped_dataset.json # AI-enhanced dataset of destinations

---

## ⚙️ **Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/yourusername/globetrotter-challenge.git
cd globetrotter-challenge

---
```  
### **2️⃣ Backend Setup**
```sh
Copy
Edit
cd backend
npm install
Set up MongoDB Atlas and add your connection string in .env:

---

ini
Copy
Edit
MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/globetrotter
PORT=5000
Start the Backend Server

---

sh
Copy
Edit
node server.js
```
✅ Backend runs at http://localhost:5000/.

### **3️⃣ Frontend Setup**
```sh
Copy
Edit
cd client
npm install
npm run dev
```
✅ Open the app in http://localhost:5173/.


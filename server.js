const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
  })
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Define Schema
const CitySchema = new mongoose.Schema({
  city: String,
  country: String,
  clues: [String],
  fun_fact: [String],
  trivia: [String],
});

const City = mongoose.model("City", CitySchema);

// ✅ Import dataset into MongoDB (Run once if needed)
async function insertData() {
  try {
    const data = JSON.parse(fs.readFileSync("scraped_dataset.json", "utf-8"));
    await City.insertMany(data);
    console.log("✅ Dataset Inserted into MongoDB!");
  } catch (error) {
    console.log("❌ Error inserting data:", error);
  }
}

// Uncomment below to insert data once
// insertData();

// ✅ API: Check if Backend is Running
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// ✅ API: Fetch a Random Destination
app.get("/random-destination", async (req, res) => {
  const randomCity = await City.aggregate([{ $sample: { size: 1 } }]);
  res.json(randomCity);
});

// ✅ Challenge Feature (WebSockets)
const challenges = {}; // Store active challenges

// 🔹 Create a New Challenge
app.post("/create-challenge", async (req, res) => {
  const challengeId = uuidv4();
  const randomCity = await City.aggregate([{ $sample: { size: 1 } }]);

  challenges[challengeId] = {
    players: {},
    destination: randomCity[0],
  };

  res.json({ challengeId });
});

// 🔹 Handle Players & Answers via WebSockets
io.on("connection", (socket) => {
  socket.on("join-challenge", ({ challengeId, playerName }) => {
    if (challenges[challengeId]) {
      challenges[challengeId].players[playerName] = { answer: null, score: 0 };
      socket.join(challengeId);
      io.to(challengeId).emit("update", challenges[challengeId]); // Sync all players
    }
  });

  socket.on("submit-answer", ({ challengeId, playerName, answer, correct }) => {
    if (
      challenges[challengeId] &&
      challenges[challengeId].players[playerName]
    ) {
      challenges[challengeId].players[playerName].answer = answer;
      if (correct) {
        challenges[challengeId].players[playerName].score += 1;
      }
      io.to(challengeId).emit("update", challenges[challengeId]); // Sync scores & answers instantly
    }
  });
});

// ✅ Start Server on `process.env.PORT`
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});

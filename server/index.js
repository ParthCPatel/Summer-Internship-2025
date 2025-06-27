const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

// ✅ CORS setup to allow frontend access
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/pavi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
  });

// ✅ Health check route
app.get("/ping", (_req, res) => {
  return res.json({ msg: "Ping Successful" });
});

// ✅ Avatar proxy route with character-based avatars
app.get("/api/avatar/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Use DiceBear API for character-based avatars
    const avatarStyles = ['avataaars', 'bottts', 'personas', 'adventurer', 'big-smile', 'fun-emoji'];
    const selectedStyle = avatarStyles[parseInt(id) % avatarStyles.length];
    
    // Generate seed based on ID for consistent avatars
    const seed = `user${id}`;
    
    const avatarUrl = `https://api.dicebear.com/7.x/${selectedStyle}/svg?seed=${seed}&size=200`;
    
    const response = await axios.get(avatarUrl, {
      responseType: "text",
      timeout: 8000,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Accept": "image/svg+xml,image/*,*/*;q=0.8"
      },
    });

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(response.data);
    
  } catch (error) {
    console.error("❌ Avatar fetch error:", error.response?.status, error.message);
    
    // Fallback: Generate a custom character SVG avatar
    const { id } = req.params;
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#ef4444', '#f97316', '#10b981', '#06b6d4', '#3b82f6'];
    const bgColor = colors[parseInt(id) % colors.length];
    
    const customAvatar = `
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="100" cy="100" r="100" fill="${bgColor}"/>
        <!-- Head -->
        <circle cx="100" cy="80" r="30" fill="#fdbcb4"/>
        <!-- Eyes -->
        <circle cx="90" cy="75" r="3" fill="#000"/>
        <circle cx="110" cy="75" r="3" fill="#000"/>
        <!-- Nose -->
        <path d="M100 80 L102 85 L100 85 Z" fill="#000"/>
        <!-- Mouth -->
        <path d="M95 90 Q100 95 105 90" stroke="#000" stroke-width="2" fill="none"/>
        <!-- Hair -->
        <path d="M70 60 Q100 50 130 60 Q130 70 125 75 Q100 65 75 75 Q70 70 70 60" fill="#8B4513"/>
        <!-- Body -->
        <rect x="85" y="110" width="30" height="40" fill="#4A90E2" rx="15"/>
        <!-- Arms -->
        <circle cx="70" cy="125" r="8" fill="#fdbcb4"/>
        <circle cx="130" cy="125" r="8" fill="#fdbcb4"/>
        <!-- Legs -->
        <rect x="90" y="150" width="8" height="25" fill="#2C3E50"/>
        <rect x="102" y="150" width="8" height="25" fill="#2C3E50"/>
        <text x="100" y="190" text-anchor="middle" fill="white" font-family="Arial" font-size="12" font-weight="bold">User ${id}</text>
      </svg>
    `;
    
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(customAvatar);
  }
});

// ✅ Main API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server started on ${PORT}`)
);

// ✅ Socket.io for real-time chat
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

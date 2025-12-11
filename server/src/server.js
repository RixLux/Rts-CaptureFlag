require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");

// Express app
const app = express();
const server = http.createServer(app);

// Socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: { origin: "*" }
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use("/auth", require("./routes/auth"));

// Connect DB
connectDB();

// Test route
app.get("/ping", (req, res) => {
    res.send("pong");
});

// Load sockets
require("./sockets/mapSocket")(io);

// Start server
server.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});


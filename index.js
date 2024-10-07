const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user.router'); // Adjust the path if necessary
const cors = require('cors');
const path = require('path');
const http = require('http');

const socket = require('./websocket'); // Import the setup function

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3002;

// Middleware setup
app.use(cors());
app.use(express.json());

const server = http.createServer(app); // Create HTTP server

// Initialize a new instance of Socket.IO by passing the HTTP server
const io = socket.init(server); 


// Listen for incoming Socket.IO connections
io.on("connection", (socket) => {
    console.log("User connected ", socket.id); // Log the socket ID of the connected user

    // Listen for "send_message" events from the connected client
    socket.on("send_message", (data) => {
        console.log("Message Received ", data); // Log the received message data

        // Emit the received message data to all connected clients
        io.emit("receive_message", data);
    });
});

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the user router for API endpoints
app.use('/api', userRouter);


server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB
const DB = process.env.MONGO_URI;
mongoose.connect(DB)
    .then(() => {
        console.log('Connection to MongoDB successful');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process on MongoDB connection error
    });

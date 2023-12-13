const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./router/user.router');
const cors = require('cors');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the router
app.use('/api', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const DB = process.env.MONGO_URI;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connection to MongoDB successful');
    })
    // .catch((err) => console.log('Error connecting to MongoDB:', err.message));
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit the process on MongoDB connection error
    });

const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./schema/user-schema');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

// Get Request (default)
app.get('/', (req, res) => {
    res.send('Welcome to the Electrum Server!');
});

// User Authentication...
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, role } = req.body;

        const newUser = new User({ name, email, role });
        await newUser.save();
        res.status(201).send('User sign-up successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).send('Error registering user');
    }
});

// Getting All User
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



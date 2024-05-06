const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./schema/user-schema');
const Components = require("./schema/component-schema");

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
        res.status(200).json(newUser);
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

// Get user by email
app.get('/api/user', async (req, res) => {
    const email = req.query.email; // Extracting email from query parameters
    if (!email) {
        return res.status(400).send('Email parameter is required');
    }

    // Find the user with email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }

    res.status(200).json(user);
});


// Component 
app.post('/api/post-component', async (req, res) => {
    try {
        const { name, description, img_URL, selling_price, buying_price, quantity, owner_id, type, date } = req.body;

        const newComponent = new Components({ name, description, img_URL, selling_price, buying_price, quantity, owner_id, type, date });
        await newComponent.save();
    } catch (error) {
        console.error('Error saving component:', error);
        res.status(500).send('Error adding component');
    }
})

app.get('/api/my-components/:owner_id', async (req, res) => {
    const owner_id = req.params.owner_id;

    // Find components with the owner_id
    const components = await Components.find({ owner_id });
    if (!components || components.length === 0) {
        return res.status(404).send('No components found for the given owner_id');
    }

    res.status(200).json(components);
});



app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});



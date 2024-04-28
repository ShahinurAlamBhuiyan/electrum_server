const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config();

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
    res.send('Welcome to the Electrum server!');
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

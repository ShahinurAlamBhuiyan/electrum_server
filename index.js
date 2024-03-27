const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express()
app.use(bodyParser.json());
app.use(cors());

// branch created by sabbir
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
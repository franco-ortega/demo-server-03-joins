require('dotenv').config();
const express = require('express');
const app = express();
// const cors = require('cors');

app.use(express.json());
// app.use(cors());

app.use('/api/v1/tiles', require('./controllers/tiles'));
app.use('/api/v1/floors', require('./controllers/floors'));

module.exports = app;
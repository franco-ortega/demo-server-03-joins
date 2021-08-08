const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/tiles', require('./controllers/tiles'));

module.exports = app;
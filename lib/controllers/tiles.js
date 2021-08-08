const { Router, response } = require('express');
const app = require('../app');
const Tile = require('../models/Tile');

module.exports = Router()
    .post('/', (req, res, next) => {
        Tile
        .insert(req.body)
        .then(tile => res.send(tile))
        .catch(next);
    });

const { Router } = require('express');
const app = require('../app');
const Tile = require('../models/Tile');

module.exports = Router()
    .post('/', (req, res, next) => {
        Tile
          .insert(req.body)
          .then(tile => res.send(tile))
          .catch(next);
    })
    .get('/', (req, res, next) => {
        Tile
          .findAll()
          .then(tiles => res.send(tiles))
          .catch(next);
    })
    .put('/:id', (req, res, next) => {
        console.log(typeof req.params.id);
        console.log(req.body);
        Tile
          .update(req.params.id, req.body)
          .then(tile => res.send(tile))
          .catch(next);
    });

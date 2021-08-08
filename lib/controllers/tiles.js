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
    .get('/:id', (req, res, next) => {
        Tile
          .findById(req.params.id)
          .then(tile => res.send(tile))
          .catch(next);
    })
    .put('/:id', (req, res, next) => {
        Tile
          .update(req.params.id, req.body)
          .then(tile => res.send(tile))
          .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Tile
          .delete(req.params.id)
          .then(tile => res.json(tile))
          .catch(next);
    });

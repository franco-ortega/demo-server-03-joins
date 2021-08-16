const { Router } = require('express');
const app = require('../app');
const Floor = require('../models/Floor');

module.exports = Router()
    .post('/', (req, res, next) => {
        Floor
          .insert(req.body)
          .then(floor => res.send(floor))
          .catch(next)
    })
    .get('/', (req, res, next) => {
        Floor
          .findAll()
          .then(floors => res.send(floors))
          .catch(next)
    })
    .get('/:id', (req, res, next) => {
        Floor
          .findById(req.params.id)
          .then(floor => res.send(floor))
          .catch(next)
    })
    .put('/:id', (req, res, next) => {
        Floor
          .update(req.params.id, req.body)
          .then(floor => res.send(floor))
          .catch(next);
    })
    .delete('/:id', (req, res, next) => {
        Floor
          .delete(req.params.id)
          .then(floor => res.send(floor))
          .catch(next);
    });
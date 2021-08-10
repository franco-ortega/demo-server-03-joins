const { Router } = require('express');
const app = require('../app');
const Floor = require('../models/Floor');

module.exports = Router()
    .post('/', (req, res, next) => {
        Floor
          .insert(req.body)
          .then(floor => res.json(floor))
          .catch(next)
    });
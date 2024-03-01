const express = require('express')
const { getAllPlays } = require('../controllers/play.controllers')
const playRoutes = express.Router();

playRoutes.get('/getAllPlays)', getAllPlays)

module.exports = playRoutes
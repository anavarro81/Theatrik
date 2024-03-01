const router = require('express').router()

const { getAllPlays } = require('../controllers/play.controllers')

router.get('/getAllPlays)', getAllPlays)

module.exports = router
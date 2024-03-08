const express = require("express")
const {getAllPlays, putPlay, postPlay } = require('../controllers/play.controllers' );

const playRoutes = express.Router();

playRoutes.get("/getAllPlays", getAllPlays);
playRoutes.put("/update/:id", putPlay);
playRoutes.post("/new", postPlay);


module.exports= playRoutes;
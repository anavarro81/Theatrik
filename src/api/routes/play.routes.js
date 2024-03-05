const express = require("express")
const {getAllPlays} = require('../controllers/play.controllers' );
const { putPlay, postPlay } = require("../controllers/play.sara.controllers");

const playRoutes = express.Router();

playRoutes.get("/getAllPlays", getAllPlays);
playRoutes.put("/update/:id", putPlay);
playRoutes.post("/new", postPlay);


module.exports= playRoutes;
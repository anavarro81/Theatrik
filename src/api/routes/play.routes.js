const express = require("express")
const {getAllPlays, getPlaybyID, putPlay, postPlay, deletePlay } = require('../controllers/play.controllers' );

const playRoutes = express.Router();

playRoutes.get("/getAllPlays", getAllPlays);
playRoutes.get("/getPlay/:id", getPlaybyID);
playRoutes.put("/update/:id", putPlay);
playRoutes.post("/new", postPlay);
playRoutes.delete("/delete/:id", deletePlay);

module.exports= playRoutes;
const express = require("express")
const { getAllPlays, getPlaybyID, putPlay, postPlay, deletePlay, sendEmail } = require('../controllers/play.controllers' );
const upload = require('../../middlewares/upload.file');

const playRoutes = express.Router();

playRoutes.get("/getAllPlays", getAllPlays);
playRoutes.get("/getPlay/:id", getPlaybyID);
playRoutes.put("/update/:id", putPlay);
playRoutes.delete("/delete/:id", deletePlay);
//Incluimos el middleware en la ruta post
playRoutes.post("/new", upload.single('cartel'), postPlay);

//ruta para enviar el email de confirmacion en el controlador play
playRoutes.post("/sendEmail/:email", sendEmail);




module.exports= playRoutes;
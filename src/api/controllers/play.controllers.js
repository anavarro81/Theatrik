const Play = require('../models/play.models')

async function getAllPlays(req, res) {
    try {
        const plays = await Play.find()
        console.log(plays);
        if(plays) {
            return res.status(200).json(plays);
        } else {
            return res.status(404).send("No se encontraron registros")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { getAllPlays }
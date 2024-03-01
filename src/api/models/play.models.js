const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaySchema = new Schema(
    {
        cartel: String,
        asociacion: String,
        titulo: String,
        genero: String,
        fecha: Date,
        hora: String,
        teatro: String,
        sinopsis: String,
        interpretes: String,
        dirección: String,
        escenografía: String,
        vestuario: String
    },
    { collection: 'plays' }

);

const Play = mongoose.model('plays', PlaySchema)
module.exports = Play;
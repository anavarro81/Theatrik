const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaySchema = new Schema(
    {
        cartel: String,
        company: String,
        title: String,
        genre: String,
        date: Date,
        time: String,
        place: String,
        synopsis: String,
        actors: String,
        director: String,
        setDesing: String,
        costume: String
    },
    { collection: 'plays' }

);

const Play = mongoose.model('plays', PlaySchema)
module.exports = Play;
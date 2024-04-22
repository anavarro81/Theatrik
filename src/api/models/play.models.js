const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaySchema = new Schema(
    {
        cartel: String,
        company_name: String,
        title: String,
        genre: String,
        date: Date,
        time: String,
        place: String,
        synopsis: String,
        actors: String,
        director: String,
        setDesing: String,
        costume: String,
        company: [{ type: Schema.Types.ObjectId, ref: 'companies' }]
    },
    { collection: 'plays' }

);

const Play = mongoose.model('plays', PlaySchema)
module.exports = Play;
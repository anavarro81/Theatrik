const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Play = require ("../back/src/api/models/play.models")
const Plays = require("./plays.json")




const DB_URL= process.env.BD_URI;

mongoose.connect(DB_URL)


.then(async()=> {
    const allPlays = await Play.find();
    if (allPlays.length > 0) {
        await Play.collection.drop();
        console.log("Se han borrado las obras");
    }
})
.catch((error)=> console.log("Error al borrar las obras",error))
.then(async ()=> {
    const playsMap = Plays.map((play) => new Play(play));
    await Play.insertMany(playsMap);
    console.log("Obras insertadas correctamente");
})
.catch((error) => console.log("Error al insertar las obras", error))



// desconectar 

.finally(()=> mongoose.disconnect());
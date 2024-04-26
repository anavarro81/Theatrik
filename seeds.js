const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Play = require("./src/api/models/play.models")
const Plays = require("./plays.json")
const Company = require ("../back/src/api/models/company.models")
const Companies = require("./companies.json")

const DB_URL = process.env.BD_URI;

mongoose.connect(DB_URL)

    // Utilizamos ".then()" para manejar la resolución exitosa de la promesa anterior
    .then(async () => {
        // Dentro de la función async, realizamos operaciones asíncronas de manera síncrona usando "await"

        // Realizamos una consulta a la base de datos para encontrar todas las obras
        const allPlays = await Play.find();

        // Verificamos si se encontraron obras en la consulta anterior
        if (allPlays.length > 0) {            
            await Play.collection.drop();

            // Imprimimos un mensaje en la consola indicando que las obras han sido borradas con éxito
            console.log("Se han borrado las obras");
        }


        const allCompanies = await Company.find();

        if (allCompanies.length > 0) {            
            await Company.collection.drop();            
            console.log("Se han borrado todas las compañias");
        }

    })
    // Utilizamos ".catch()" para manejar cualquier error que ocurra durante el proceso de la promesa anterior
    .catch((error) => console.log("Error al borrar las obras", error))
    // Utilizamos otro ".then()" para manejar la resolución exitosa de la promesa anterior
    .then(async () => {
        // Dentro de la función async, realizamos operaciones asíncronas de manera síncrona usando "await"

        // Mapeamos las obras existentes para crear nuevos objetos Play con cada una
        const playsMap = Plays.map((play) => new Play(play));

        const compeniesMap = Companies.map((companie) => new Company(companie));

        for (const play of playsMap) {

            
            console.log('play.company > ', play.company_name);
            
            const companyFoundes = compeniesMap.find(company => company.name === play.company_name);

            console.log('companyFoundes > ', companyFoundes);

            if (companyFoundes) {
                
                play.company = []
                play.company.push(companyFoundes._id)
            } else  {
                console.log('No se ha encontrado la compañia: ', play.company_name);
            }
        }


        

        console.log('compeniesMap > ', compeniesMap );


        const result = await Company.insertMany(compeniesMap);

        
      
        // Insertamos las obras mapeadas en la base de datos
        await Play.insertMany(playsMap);

        // Imprimimos un mensaje en la consola indicando que las obras han sido insertadas correctamente
        console.log("Obras insertadas correctamente");
    })
    // Utilizamos ".catch()" para manejar cualquier error que ocurra durante el proceso de la promesa anterior
    .catch((error) => console.log("Error al insertar las obras", error))
    // Utilizamos ".finally()" para ejecutar la desconexión de la base de datos, independientemente del resultado de las promesas anteriores
    .finally(() => mongoose.disconnect());

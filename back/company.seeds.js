const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Company = require ("../back/src/api/models/company.models")
const Companies = require("./companies.json")




const DB_URL= process.env.BD_URI;

mongoose.connect(DB_URL)


.then(async()=> {
    const allCompanies = await Company.find();
    if (allCompanies.length > 0) {
        await Company.collection.drop();
        console.log("Se han borrado las asociaciones");
    }
})
.catch((error)=> console.log("Error al borrar las asociaciones",error))
.then(async ()=> {
    const companiesMap = Companies.map((company) => new Company(company));
    await Company.insertMany(companiesMap);
    console.log("Asociaciones insertadas correctamente");
})
.catch((error) => console.log("Error al insertar las asociaciones", error))



// desconectar 

.finally(()=> mongoose.disconnect());
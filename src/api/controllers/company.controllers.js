// importamos el modelo al que queremos acceder
const Company = require('../models/company.models')

// CREATE
const newCompany = async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        const createdCompany = await newCompany.save();
        return res.status(201).json(createdCompany);
    } catch (error) {
        return res.status(500).json(error)
    }
};

// UPDATE
const updateCompany = async (req, res) => {
    console.log('Estoy en updateCompany');

    try {
        const { id } = req.params;/* se está utilizando la desestructuración de objetos de JavaScript para extraer el valor de la propiedad id del objeto params del objeto req (request). */
        const updated = await Company.findByIdAndUpdate( // Company es el modelo donde vamos a buscar el registro
            id,
            {
                $set: {
                    logo: req.body.logo,
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    web: req.body.web,
                }
            },
            { new: true } /* asegura que el objeto updated contenga la versión actualizada del documento después de la actualización, permitiéndote trabajar con los datos actualizados */
        );
        // if ternaria
        return !updated ? res.status(404).json({ message: "no existe la company" }) : res.status(200).json(updated);

    } catch (error) {
        console.log("Error ", error);
        return res.status(500).json(error);
    }
};

// DELETE
const deleteCompany = async (req, res) => {
    console.log("Estoy en deleteCompany");
    try {
        const {id} = req.params;
        const deleted = await Company.findByIdAndDelete(id);
        if(!deleted) {
            return res.status(404).json({message: "este id no existe"});
        }
        console.log("El registro ha sido eliminado");
        return res.status(200).json(deleted);
    } catch (error) {
        console.log("error", error);
        return res.status(500).json(error);
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const company = await Company.find()
        console.log(company);
        if (company) {
            return res.status(200).json(company);
        } else {
            return res.status(404).send("No se encontraron registros")
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
};


const getCompnanyByID = async (req, res) => {
    try {
        const { id } = req.params;
        const selectedCompany = await Company.findById(id).populate("plays")
        if (!selectedCompany) {
            return res.status(404).json({ message: `No encontrada la obra con id: ${id}` })
        }
        return res.status(200).json(selectedCompany)
    } catch (error) {
        return res.status(500).json(error);
    }
};


module.exports = { newCompany, updateCompany, deleteCompany, getAllCompanies, getCompnanyByID }


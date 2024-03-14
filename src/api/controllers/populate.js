const Company = require('../models/company.models')
const { sendEmail } = require("../utils/mailer.config");


const getAllCompanies = async (req, res) => {
    try {
        const company = await Company.find().populate("plays")
        console.log(company);
        if (company) {
            sendEmail();
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


module.exports = { getAllCompanies, getCompnanyByID };


/*
Ejemplo
const allShops = await Shop.find()
.populate('products', 'title artist image year genre price');*/

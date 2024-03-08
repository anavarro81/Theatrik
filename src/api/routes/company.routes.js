const express = require('express');
const { newCompany, updateCompany, deleteCompany  } = require('../controllers/company.controllers');
const { getCompnanyByID} = require('../controllers/populate');



const companyRoutes = express.Router();
companyRoutes.post('/company/new', newCompany);
companyRoutes.put('/company/update/:id', updateCompany);
companyRoutes.delete('/company/delete/:id', deleteCompany);

companyRoutes.get('/company/:id', getCompnanyByID)

module.exports = companyRoutes;
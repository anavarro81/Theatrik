const express = require('express');
const { newCompany, updateCompany, deleteCompany  } = require('../controllers/company.controllers');



const companyRoutes = express.Router();
companyRoutes.post('/company/new', newCompany);
companyRoutes.put('/company/update/:id', updateCompany);
companyRoutes.delete('/company/delete/:id', deleteCompany);

module.exports = companyRoutes;
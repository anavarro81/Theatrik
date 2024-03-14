const express = require('express');
const { newCompany, updateCompany, deleteCompany, confirmationEmail  } = require('../controllers/company.controllers');
const { getCompnanyByID} = require('../controllers/populate');

const companyRoutes = express.Router();
companyRoutes.post('/company/new', newCompany);
companyRoutes.put('/company/update/:id', updateCompany);
companyRoutes.delete('/company/delete/:id', deleteCompany);

companyRoutes.get('/company/:id', getCompnanyByID)

// //nodemailer
// companyRoutes.post('/company/confirmation-email', confirmationEmail);

module.exports = companyRoutes;
const express = require('express');
const { sendEmail  } = require('../controllers/email.controllers');


const mailRoutes = express.Router();
mailRoutes.post('/sendmail', sendEmail);


module.exports = mailRoutes;
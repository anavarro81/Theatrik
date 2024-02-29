const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
    {
        logo: String,
        name: String,
        email: String,
        phone: String,
        web: String,
    },
    { collection: 'companies' }

);

const Company = mongoose.model('companies', CompanySchema)
module.exports = Company;
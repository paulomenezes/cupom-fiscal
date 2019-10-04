const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({}, { strict: false });

const Company = mongoose.model('Company', companySchema);

module.exports = Company;

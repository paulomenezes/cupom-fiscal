const mongoose = require('mongoose');

const coupomSchema = new mongoose.Schema({}, { strict: false });

const Coupom = mongoose.model('Coupom', coupomSchema);

module.exports = Coupom;

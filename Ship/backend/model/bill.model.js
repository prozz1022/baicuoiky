const mongoose = require('mongoose');

var billSchema = new mongoose.Schema({id: Number,nameUser: String, ad: String, sdt: String, price: Number, status: Number});
var Bill = mongoose.model('Bill', billSchema, 'bill');

module.exports = Bill;
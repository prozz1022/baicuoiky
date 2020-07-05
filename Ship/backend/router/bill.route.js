const express = require('express');
const billController = require('../controllers/bill.controller');
const billRoute = express.Router();

billRoute.get('/',billController.getBill);
billRoute.post('/addBill',billController.addBill);
billRoute.post('/handleStatus',billController.handleStatus)
billRoute.post('/handleDelete',billController.handleDelete)

module.exports = billRoute;
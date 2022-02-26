'use strict';

const mongoose = require('mongoose');

const gpOrdersSchema = mongoose.Schema({
  orderNumber: { type: String },
  customerNumber: { type: String },
  market: { type: String },
  currencyCode: { type: String },
  orderDate: { type: Date },
  warehouse: { type: String },
  shipToName: { type: String },
  shipDate: { type: Date },
  shipMethod: { type: String },
  orderTotalAmount: { type: Number },
  freightAmount: { type: Number },
  freightTaxAmount: { type: Number },
  taxAmount: { type: Number },
  orderNotes: { type: String },
  createdDate: { type: Date },
  errorMessage: { type: String },
  crmPullOrderStatus: { type: String },
  orderlines: [{}],
  payments: [{}],
  status: { type: String, default: null }
});

const gpOrders = mongoose.model('GpOrders', gpOrdersSchema);

module.exports = gpOrders;

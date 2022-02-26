'use strict';

const mongoose = require('mongoose');

const crmOrderSchema = mongoose.Schema({
  // orderId: { type: Number },
  orderNumber: { type: String },
  customerNumber: { type: String },
  market: { type: String },
  currencyCode: { type: String },
  orderDate: { type: Date },
  warehouse: { type: String },
  shipToName: { type: String },
  shipDate: { type: Date },
  shipMethod: { type: String },
  orderTotalAmount: { type: Number},
  freightAmount: { type: Number },
  freightTaxAmount: { type: Number },
  taxAmount: { type: Number },
  orderNotes: { type: String },
  createdDate: { type: Date },
  errorMessage: { type: String },
  crmPullOrderStatus: { type: String },
  orderlines: [{}],
  payments: [{}],
  
  // The following are fields for failed CRM orders.
  id: { type: Number },
  at: { type: Date },
  status: { type: String, default: null }
});

const crmOrder = mongoose.model('CrmOrders', crmOrderSchema);

module.exports = crmOrder;

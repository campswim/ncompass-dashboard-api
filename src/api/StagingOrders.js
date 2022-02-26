'use strict';

const mongoose = require('mongoose');

const stagingOrdersSchema = mongoose.Schema({
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
  
  // The following pairs are for orders that failed at staging.
  stagingImportDate: { type: String },
  gpBatchId: { type: Number },
  errorCode: { type: Number },
  status: { type: String, default: null }, // i.e., 'failed'.
  gpPushStatusType: { type: Number } // 0 = unpushed; 1 = pushed; 2 = push failed; 3 = push ignored.
});

const stagingOrders = mongoose.model('StagingOrders', stagingOrdersSchema);

module.exports = stagingOrders;

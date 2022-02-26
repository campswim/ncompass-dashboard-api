'use strict';

const mongoose = require('mongoose');

const mapsSchema = mongoose.Schema({
  id: { type: Number },
  isoCountryCode: { type: String },
  gpCompanyId: { type: String },
  sourceWarehouse: { type: String },
  sourceShipMethod: { type: String },
  gpWarehouse: { type: String },
  rm00201Classid: { type: String },
  gP_CHEKBKID: { type: String },
  isoCurrencyCode: { type: String },
  gpCurrencyCode: { type: String },
  processingSequence: { type: Number },
  activatedAt: { type: Date },
  deactivatedAt: { type: Date },
  createdAt: { type: Date },
  createdBy: { type: String },
  modifiedAt: { type: Date },
  modifiedBy: { type: Date }
});

const maps = mongoose.model('maps', mapsSchema);

module.exports = maps;

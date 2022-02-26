'use strict';

const mongoose = require('mongoose');

const paramsSchema = mongoose.Schema({
  name: { type: String },
  value: { type: String, },
  moduleName: { type: String },
  category: { type: String },
  subCategory: { type: String },
  valueType: { type: String },
  notes: { type: String },
  enabledDate: { type: Date },
  createdAt: { type: Date },
  createdBy: { type: String },
  modifiedAt: { type: Date },
  modifiedBy: { type: Date },
});

const params = mongoose.model('params', paramsSchema);

module.exports = params;

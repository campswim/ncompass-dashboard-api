'use strict';

// Used to check for a mongodb id or a dashboard id.
const ObjectID = require('mongoose').Types.ObjectId;

// It takes in a schema in the constructor and uses that instead of every collection being the same and requiring its own schema.

class DataCollection {
  constructor(model) {
    this.model = model;
  }
  
  // Create
  create(record) {
    const newRecord = new this.model(record);
    return newRecord.save();
  }
  
  // Read
  get(_id, status) {
    if (_id) {
      if (!ObjectID.isValid(_id)) {
        if (parseInt(_id)) {
          return this.model.findOne({ orderNumber: _id })
        }
        else {
          const query = _id.toLowerCase();
          if (query === 'summary') {
            return this.model.find({ gpPushStatusType: parseInt(status) }); // For the dashboard page.
          } else return this.model.find({ status: query }); // For failed CRM and staged orders on the order-view page.
        }
      } else {
        return this.model.findById(_id);
      }
    } else {
      return this.model.find({});
    }
  }

  // Update
  update(_id, record) {
    if (!ObjectID.isValid(_id)) {
      return this.model.findOneAndUpdate( {orderNumber: _id }, record, { new: true, useFindAndModify: false });
    }
    else 
      return this.model.findByIdAndUpdate(_id, record, { new: true, useFindAndModify: false });
  }

  // Delete
  delete(_id) {
    if (!ObjectID.isValid(_id))
        return this.model.findOneAndDelete({ orderNumber: _id });
    else 
      return this.model.findByIdAndDelete({ _id });
  }
}

module.exports = DataCollection;

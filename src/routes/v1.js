'use strict';

// V1 = Without authorization
const fs = require('fs');
const express = require('express');
const Collection = require('../auth/models/data-collection');
const router = express.Router();
const models = new Map();

router.param('model', (req, res, next) => {
  try {
    let modelName = req.params.model;
    const baseUrl = req.baseUrl;

    if (modelName === 'summary') modelName = baseUrl.split('/')[2];
    
    // console.log('1):', {modelName});
    // console.log('2) req.params:', req.params);

    if (models.has(modelName)) {
      req.model = models.get(modelName);
      next();
    } else {
      const fileName = `${__dirname}/..${baseUrl}/${modelName}.js`;

      // console.log({fileName});

      if (fs.existsSync(fileName)) {
        const model = require(fileName); // This brings in the relevant schema.
        models.set(modelName, new Collection(model));
        req.model = models.get(modelName);
        next();
      } else {
        next('Invalid Model, dood.');
      }
    }
  } catch (e) {
    console.error(e);
  }
});

/* READ */
// Failed Orders => CrmOrders/Failed, StagingOrders/Failed; Settings => Config/maps.js, Config/params.js
router.get('/:model', handleGetAll);
// Order View => CrmOrders/{id}, StagingOrders/{id}, GpOrders/{id}
router.get('/:model/:id', handleGetOne);
// Dashboard => StagingOrders/summary/{gpPushStatusType: 0, 1, 2, or 3}/{daysBack}
router.get('/:model/:query/:type/:days', handleGetSummary); 

/* CREATE */
router.post('/:model', handleCreate);
router.post('/:model/:status', handleCreate);

/* UPDATE */
router.put('/:model/:id', handleUpdate);

/* DELETE */
router.delete('/:model/:id', handleDelete);

/* Proof-of-life */
// router.get('/', (req, res) => res.send('Howdy, pardner!'));

async function handleGetAll(req, res) {
  try {
    const allRecords = await req.model.get();
    if (allRecords) res.status(200).json(allRecords);
    else res.status(404).json(allRecords);
  } catch (e) {
    console.error(e);
  }
}

async function handleGetOne(req, res) {
  try {
    const id = req.params.id;
    const record = await req.model.get(id);
    if (record) res.status(200).json(record);
    else res.status(404).json(record);
  } catch (e) {
    console.error(e);
  }
}

async function handleGetSummary(req, res) {
  try {
    const responseArray = [];
    const query = req.params.query;
    const gpPushStatusType = req.params.type;
    const daysBack = parseInt(req.params.days);
    const oneDayInMS = 8.64e+7; // Number of milliseconds in a single day.
    const todayInDays = Date.now() / oneDayInMS; // Today's date in milliseconds. 
    const allRelevantRecords = await req.model.get(query, gpPushStatusType);

    if (allRelevantRecords && allRelevantRecords.length > 0) {
      allRelevantRecords.forEach(record => {

        const response = {
          market: record.market,
          orderCount: 1,
          totalAmount: record.orderTotalAmount,
        };

        const createdDateInDays = Date.parse(record.createdDate) / oneDayInMS;
        const diffOfDays = todayInDays - createdDateInDays;

        // 1. If daysBack === -1, diffOfDays doesn't matter => get all as far back as possible. 
        if (daysBack === -1) {
          if (responseArray.length === 0) responseArray.push(response);
          else {
            responseArray.forEach(response => {
              if (record.market === response.market) {
                response.orderCount++;
                response.totalAmount = response.totalAmount + record.orderTotalAmount;
              }
            })
          }
        } 
        // 2. If daysBack === 0 or 1, get all for 0 <= diffOfDays <= 1.
        else if (daysBack >= 0 && daysBack <= 1) {
          if (diffOfDays <= 1) {
            if (responseArray.length === 0) responseArray.push(response);
            else {
              responseArray.forEach(response => {
                if (record.market === response.market) {
                  response.orderCount++;
                  response.totalAmount = response.totalAmount + record.orderTotalAmount;
                }
              })
            }
          }
        }
        // 3. If daysBack > 1, get all for diffOfDays <= daysBack.
        else if (daysBack > 1 && diffOfDays <= daysBack) {
          if (responseArray.length === 0) responseArray.push(response);
          else {
            responseArray.forEach(response => {
              if (record.market === response.market) {
                response.orderCount++;
                response.totalAmount = response.totalAmount + record.orderTotalAmount;
              }
            })
          }
        }          
      });
    }
    res.status(200).json(responseArray);
  } catch (e) {
    console.error(e);
  }
}

async function handleCreate(req, res) {
  try {
    const obj = req.body;
    const newRecord = await req.model.create(obj);
    if (newRecord) res.status(201).json(newRecord);
    else res.status(404).json(newRecord);
  } catch (e) {
    console.error(e);
  }
}

async function handleUpdate(req, res) {
  try {
    const id = req.params.id;
    const obj = req.body;
    const updatedRecord = await req.model.update(id, obj);
    if (updatedRecord) res.status(200).json(updatedRecord);
    else res.status(404).json(updatedRecord);
  } catch (e) {
    console.error(e);
  }
}

async function handleDelete(req, res) {
  try {
    const id = req.params.id;
    const deletedRecord = await req.model.delete(id);
    if (deletedRecord) res.status(200).json(deletedRecord);
    else res.status(404).json(deletedRecord);
  } catch (e) {
    console.error(e);
  }
}

module.exports = router;

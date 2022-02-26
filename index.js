'use strict';

require('dotenv').config();

// Start the database
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MONGODB_URI, options);

// Start the web server
require('./src/server').start(process.env.PORT || 3001);

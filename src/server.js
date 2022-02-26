'use strict';

// 3rd-party Resources
const express = require('express');
const cors = require('cors');

// http request logger-middleware for node.js
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./auth/middleware/logger.js');
const authRoutes = require('./routes/auth-routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app
const app = express();
app.use(cors());

// App-level middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// V1 Routes
app.use('/api/config', v1Routes);
app.use('/api', v1Routes);

// V2 Routes
// app.use('/api/Config', v2Routes);
// app.use('/api/CrmOrders', v2Routes);
// app.use('/api/StagingOrders', v2Routes);
// app.use('/api/GPOrders', v2Routes);
// app.use('/api/Purge', v2Routes);

app.use(authRoutes);

// Proof of life
app.get('/', (req, res) => res.send('Howdy, folks!'));

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    if (!port) throw new Error('The port is missing.');
    app.listen(port, () => console.log(`Order Up on ${port}`));
  },
};

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { scopePerRequest } = require('awilix-express');
const bodyParser = require('body-parser');
const compression = require('compression');

import configureContainer from './config/configureContainer';
const container = configureContainer();

const app = express();
app.use(bodyParser.json({ 'limit': '100mb' }));
app.use(bodyParser.urlencoded({
  'limit': '100mb',
  'extended' : false
}));

app.use(cors());
app.options('*', cors());
app.use(compression());
app.use(scopePerRequest(container));

//  Connect all our routes to our application
const routes = require('./routes');
app.use('/api/', routes);

module.exports = app;

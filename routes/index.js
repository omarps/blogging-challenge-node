const routes = require('express').Router();

// required routes

// root
routes.get('/', (req, res) => {
  res.json({'error' : false, 'message': 'Connected!'});
});

// health check
routes.get('/health', (req, res) => {
  res.sendStatus(200);
});

// using routes

module.exports = routes;